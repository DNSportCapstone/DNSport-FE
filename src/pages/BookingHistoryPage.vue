<template>
  <div class="section">
    <div class="section-title"></div>
    <div class="container mt-4">
      <!-- Header with search and filters -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="mb-0 fw-bold text-primary">
          <i class="bi bi-calendar-check me-2"></i>{{ t("BookingHistory") }}
        </h2>
        <div class="d-flex gap-2">
          <div class="input-group">
            <input
              type="text"
              v-model="searchQuery"
              class="form-control"
              placeholder=""
            />
            <button class="btn btn-outline-primary" type="button">
              <i class="bi bi-search"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Main content card -->
      <div class="card border-0 shadow-sm rounded-3 overflow-hidden">
        <!-- Loading state -->
        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">{{ t("loading") }}</span>
          </div>
          <p class="mt-3 text-muted">{{ t("loading") }}</p>
        </div>

        <!-- Empty state -->
        <div
          v-else-if="paginatedBookings.length === 0"
          class="text-center py-5"
        >
          <i class="bi bi-calendar-x display-1 text-muted"></i>
          <p class="mt-3 text-muted">{{ t("NoBookingHistory") }}</p>
        </div>

        <!-- Table with data -->
        <div v-else class="table-responsive">
          <table class="table table-hover mb-0">
            <thead class="table-light">
              <tr>
                <th class="fw-semibold border-0">{{ t("BookingDate") }}</th>
                <th class="fw-semibold border-0">{{ t("Status") }}</th>
                <th class="fw-semibold border-0">{{ t("TotalAmount") }}</th>
                <th class="fw-semibold border-0">{{ t("Field") }}</th>
                <th class="fw-semibold border-0">{{ t("Time") }}</th>
                <th class="fw-semibold border-0">{{ t("Stadium") }}</th>
                <th class="fw-semibold border-0">{{ t("Hành động") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="booking in paginatedBookings"
                :key="booking.BookingId"
                class="align-middle"
              >
                <td>{{ formatDate(booking.BookingDate) }}</td>
                <td>
                  <span
                    class="badge"
                    :class="getStatusBadgeClass(booking.Status)"
                  >
                    {{ booking.Status }}
                  </span>
                </td>
                <td class="fw-semibold">
                  {{ formatCurrency(booking.TotalPrice) }}
                </td>
                <td>{{ booking.FieldId }}</td>
                <td>
                  <div class="d-flex align-items-center">
                    <i class="bi bi-clock me-1 text-muted"></i>
                    {{ formatTime(booking.StartTime) }} -
                    {{ formatTime(booking.EndTime) }}
                  </div>
                </td>
                <td>{{ booking.StadiumName }}</td>
                <td>
                  <button
                    class="btn btn-outline-primary btn-sm me-2"
                    @click="openRefundModal(booking.BookingId)"
                  >
                    Refund
                  </button>
                  <button
                    class="btn btn-outline-secondary btn-sm"
                    @click="goToFeedback(booking.BookingId)"
                  >
                    Feedback
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination footer -->
        <div class="card-footer bg-white py-3 border-0">
          <div class="d-flex justify-content-between align-items-center">
            <small class="text-muted"
              >{{ t("Show") }} {{ paginatedBookings.length }} {{ t("On") }}
              {{ bookings.length }} {{ t("Result") }}</small
            >
            <nav aria-label="Điều hướng trang">
              <ul class="pagination pagination-sm mb-0">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                  <button
                    class="page-link rounded-start"
                    @click="currentPage--"
                  >
                    <i class="bi bi-chevron-left"></i> Trước
                  </button>
                </li>
                <li
                  v-for="page in totalPages"
                  :key="page"
                  class="page-item"
                  :class="{ active: currentPage === page }"
                >
                  <button class="page-link" @click="currentPage = page">
                    {{ page }}
                  </button>
                </li>
                <li
                  class="page-item"
                  :class="{ disabled: currentPage === totalPages }"
                >
                  <button class="page-link rounded-end" @click="currentPage++">
                    Tiếp <i class="bi bi-chevron-right"></i>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- Refund Modal -->
    <div v-if="showRefundModal" class="modal-overlay">
      <div class="modal-background"></div>
      <div class="modal-content">
        <h3>Điều khoản hoàn tiền</h3>
        <ul>
          <li>
            <i class="fas fa-check-circle"></i> Hoàn 100% nếu hủy trước 24 giờ.
          </li>
          <li>
            <i class="fas fa-check-circle"></i> Hoàn 70% nếu hủy trước 12 giờ.
          </li>
          <li>
            <i class="fas fa-check-circle"></i> Hoàn 50% nếu hủy trước 6 giờ.
          </li>
          <li>
            <i class="fas fa-times-circle"></i> Không hoàn nếu hủy sau 6 giờ.
          </li>
          <li>
            <i class="fas fa-clock"></i> Thời gian hoàn tiền: 3-5 ngày làm việc.
          </li>
        </ul>
        <label>
          <input type="checkbox" v-model="agreedToRefundTerms" />
          Tôi đồng ý với điều khoản hoàn tiền
        </label>
        <div class="modal-actions">
          <button
            @click="confirmRefund"
            :disabled="!agreedToRefundTerms"
            class="btn btn-success"
          >
            Xác nhận
          </button>
          <button @click="showRefundModal = false" class="btn btn-danger">
            Hủy
          </button>
        </div>
      </div>
    </div>
  </div>
  <div style="margin-bottom: 93px"></div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<script>
import API from "@/utils/axios";
import CommonHelper from "@/utils/common";
import "@fortawesome/fontawesome-free/css/all.css";

export default {
  data() {
    return {
      bookings: [],
      loading: true,
      currentPage: 1,
      itemsPerPage: 10,
      searchQuery: "",
      showRefundModal: false, // Trạng thái hiển thị modal
      agreedToRefundTerms: false, // Trạng thái checkbox đồng ý
      bookingId: "",
    };
  },
  computed: {
    filteredBookings() {
      if (!this.searchQuery.trim()) return this.bookings;
      return this.bookings.filter((booking) =>
        Object.values(booking).some((value) =>
          String(value).toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      );
    },
    paginatedBookings() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredBookings.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredBookings.length / this.itemsPerPage);
    },
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return "";
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString("vi-VN", options);
    },
    formatTime(timeString) {
      if (!timeString) return "";
      const options = { hour: "2-digit", minute: "2-digit" };
      return new Date(timeString).toLocaleTimeString("vi-VN", options);
    },
    formatCurrency(value) {
      return CommonHelper.formatVND(value);
    },
    getStatusBadgeClass(status) {
      switch (status?.toLowerCase()) {
        case "success":
        case "đã thanh toán":
        case "đã xác nhận":
          return "bg-success";
        case "pending":
        case "chờ xác nhận":
        case "đang xử lý":
          return "bg-warning text-dark";
        case "Fail":
        case "đã hủy":
          return "bg-danger";
        default:
          return "bg-secondary";
      }
    },
    async fetchBookings() {
      this.loading = true;
      try {
        const userId = CommonHelper.getCurrentUserId();
        const response = await API.get(`Booking/history/${userId}`);
        this.bookings = this.bookings.concat(
          response.data.map((b) => ({
            BookingId: b.bookingId,
            TotalPrice: b.totalPrice,
            BookingDate: b.bookingDate,
            Status: b.status,
            FieldId: b.description,
            StartTime: b.startTime,
            EndTime: b.endTime,
            StadiumName: b.stadiumName,
          }))
        );
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      } finally {
        this.loading = false;
      }
    },
    goToRefundRequest(bookingId) {
      this.$router.push({ name: "refund-request", params: { bookingId } });
    },
    goToFeedback(bookingId) {
      this.$router.push({ name: "rate", params: { bookingId } });
    },
    openRefundModal(bookingId) {
      this.bookingId = bookingId;
      this.showRefundModal = true;
      this.agreedToRefundTerms = false; // Reset checkbox khi mở modal
    },
    confirmRefund() {
      if (!this.agreedToRefundTerms) return;

      // Chuyển hướng đến trang refund-request với bookingId đã chọn
      this.goToRefundRequest(this.bookingId);

      // Đóng modal sau khi xác nhận
      this.showRefundModal = false;
      this.agreedToRefundTerms = false;
    },
  },
  mounted() {
    this.fetchBookings();
  },
};
</script>

<style sc>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css");
/* Custom styles */
.table th {
  font-weight: 600;
  color: #495057;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.5px;
}

.table td {
  padding: 1rem 0.75rem;
  vertical-align: middle;
}

.card {
  border-radius: 0.75rem;
  transition: all 0.2s ease;
}

.pagination .page-link {
  border-radius: 0;
  margin: 0;
  color: #6c757d;
  border-color: #dee2e6;
  transition: all 0.2s ease;
}

.pagination .page-item.active .page-link {
  background-color: #0d6efd;
  border-color: #0d6efd;
  color: white;
}

.pagination .page-link:hover {
  background-color: #f8f9fa;
  color: #0d6efd;
}

.pagination .page-item.active .page-link:hover {
  background-color: #0d6efd;
  color: white;
}

.badge {
  padding: 0.5em 0.8em;
  font-weight: 500;
  border-radius: 0.25rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  font-size: 0.7rem;
}

.table-hover tbody tr:hover {
  background-color: rgba(13, 110, 253, 0.03);
  cursor: pointer;
}

@media (max-width: 768px) {
  .d-flex.justify-content-between {
    flex-direction: column;
    gap: 1rem;
  }

  .pagination {
    margin-top: 0.5rem;
  }

  .table th,
  .table td {
    font-size: 0.9rem;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.table-responsive {
  animation: fadeIn 0.3s ease-in-out;
}

/* Custom scrollbar */
.table-responsive::-webkit-scrollbar {
  height: 8px;
}

.table-responsive::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.table-responsive::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 4px;
}

.table-responsive::-webkit-scrollbar-thumb:hover {
  background: #999;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Đảm bảo modal nằm trên các phần tử khác */
}

.modal-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Màu nền tối với độ trong suốt */
  z-index: 999; /* Đặt nền dưới nội dung modal */
}

.modal-content {
  background-color: white !important; /* Màu nền trắng cho modal */
  border-radius: 8px; /* Bo góc cho modal */
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); /* Đổ bóng cho modal */
  max-width: 500px; /* Chiều rộng tối đa của modal */
  width: 90%; /* Chiều rộng 90% cho các màn hình nhỏ */
  position: relative; /* Để nội dung nằm trên nền */
  z-index: 1000; /* Đảm bảo nội dung nằm trên nền */
  animation: fadeIn 0.3s; /* Hiệu ứng xuất hiện */
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

h3 {
  margin-bottom: 15px;
  text-align: center; /* Căn giữa tiêu đề */
  font-size: 24px; /* Kích thước chữ tiêu đề */
  color: #333; /* Màu chữ tiêu đề */
}

ul {
  list-style-type: none; /* Bỏ dấu đầu dòng */
  padding: 0; /* Bỏ khoảng cách bên trong */
  margin-bottom: 20px; /* Khoảng cách dưới cho danh sách */
}

ul li {
  margin-bottom: 10px; /* Khoảng cách giữa các mục trong danh sách */
  font-size: 16px; /* Kích thước chữ cho các mục */
  display: flex; /* Sử dụng flexbox để căn giữa biểu tượng và văn bản */
  align-items: center; /* Căn giữa theo chiều dọc */
}
ul li i {
  margin-right: 10px; /* Khoảng cách giữa biểu tượng và văn bản */
  color: #28a745; /* Màu sắc cho biểu tượng thành công */
  font-size: 18px; /* Kích thước biểu tượng */
}

ul li i.fa-times-circle {
  color: #dc3545; /* Màu sắc cho biểu tượng không thành công */
}

label {
  display: flex;
  align-items: center; /* Căn giữa các phần tử trong label */
  margin-bottom: 20px; /* Khoảng cách dưới cho label */
}

label input {
  margin-right: 10px; /* Khoảng cách giữa checkbox và văn bản */
}

.modal-actions {
  display: flex;
  justify-content: space-between; /* Căn giữa các nút */
}

.btn {
  padding: 10px 15px; /* Khoảng cách cho nút */
  border: none;
  border-radius: 5px; /* Bo góc cho nút */
  cursor: pointer; /* Hiệu ứng con trỏ khi hover */
  transition: background-color 0.3s, transform 0.2s; /* Hiệu ứng chuyển màu nền và hiệu ứng nhấn */
}

.btn-success {
  background-color: #28a745; /* Màu nền cho nút xác nhận */
  color: white; /* Màu chữ cho nút xác nhận */
}

.btn-danger {
  background-color: #dc3545; /* Màu nền cho nút hủy */
  color: white; /* Màu chữ cho nút hủy */
}

.btn-success:disabled {
  background-color: #c6e1b6; /* Màu nền cho nút xác nhận khi bị vô hiệu hóa */
  cursor: not-allowed; /* Hiệu ứng con trỏ khi nút bị vô hiệu hóa */
}

.btn:hover:not(:disabled) {
  opacity: 0.9; /* Hiệu ứng mờ khi hover */
  transform: scale(1.05); /* Hiệu ứng phóng to khi hover */
}
</style>
