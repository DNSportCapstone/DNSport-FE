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
              placeholder="Search bookings..."
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
          <table class="table table-hover mb-0 align-middle">
            <thead class="table-light">
              <tr>
                <th class="fw-semibold border-0 text-uppercase">
                  {{ t("BookingDate") }}
                </th>
                <th class="fw-semibold border-0 text-uppercase">
                  {{ t("Stadium") }}
                </th>
                <th class="fw-semibold border-0 text-uppercase">
                  {{ t("Field") }}
                </th>
                <th class="fw-semibold border-0 text-uppercase">
                  {{ t("StartTime") }}
                </th>
                <th class="fw-semibold border-0 text-uppercase">
                  {{ t("EndTime") }}
                </th>
                <th class="fw-semibold border-0 text-uppercase">
                  {{ t("TotalAmount") }}
                </th>
                <th class="fw-semibold border-0 text-uppercase">
                  {{ t("Status") }}
                </th>
                <th class="fw-semibold border-0 text-uppercase">
                  {{ t("Action") }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="booking in paginatedBookings"
                :key="booking.BookingId"
                class="align-middle border-bottom"
              >
                <td>
                  <div class="d-flex align-items-center">
                    <div
                      class="date-icon bg-light rounded-circle p-2 me-2 d-flex align-items-center justify-content-center"
                      style="width: 40px; height: 40px"
                    >
                      <i class="bi bi-calendar-date text-primary"></i>
                    </div>
                    <span>{{ formatTime(booking.BookingDate) }}</span>
                  </div>
                </td>
                <td>
                  <div class="d-flex align-items-center">
                    <i class="bi bi-building me-1 text-muted"></i>
                    {{ booking.StadiumName }}
                  </div>
                </td>
                <td>
                  <div class="d-flex align-items-center">
                    <i class="bi bi-geo-alt me-1 text-muted"></i>
                    {{ booking.FieldId }}
                  </div>
                </td>
                <td>
                  <div class="d-flex align-items-center">
                    <i class="bi bi-clock me-1 text-muted"></i>
                    {{ formatTime(booking.StartTime) }}
                  </div>
                </td>
                <td>
                  <div class="d-flex align-items-center">
                    <i class="bi bi-clock me-1 text-muted"></i>
                    {{ formatTime(booking.EndTime) }}
                  </div>
                </td>
                <td class="fw-semibold text-primary">
                  {{ formatCurrency(booking.TotalPrice) }}
                </td>
                <td>
                  <span
                    class="badge rounded-pill"
                    :class="getStatusBadgeClass(booking.Status)"
                  >
                    {{ booking.Status }}
                  </span>
                </td>
                <td>
                  <div class="dropdown">
                    <button
                      class="btn btn-outline-primary btn-sm dropdown-toggle rounded-pill px-3"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i class="bi bi-three-dots-vertical me-1"></i> Actions
                    </button>
                    <ul class="dropdown-menu shadow border-0">
                      <li>
                        <a
                          class="dropdown-item d-flex align-items-center"
                          @click="getInvoice(booking.BookingId)"
                        >
                          <i
                            class="bi bi-file-earmark-text me-2 text-primary"
                          ></i>
                          Get invoice
                        </a>
                      </li>
                      <li>
                        <a
                          class="dropdown-item d-flex align-items-center"
                          @click="openRefundModal(booking.BookingId)"
                        >
                          <i
                            class="bi bi-arrow-counterclockwise me-2 text-warning"
                          ></i>
                          Refund
                        </a>
                      </li>
                      <li>
                        <a
                          class="dropdown-item d-flex align-items-center"
                          @click="goToFeedback(booking.BookingId)"
                        >
                          <i
                            class="bi bi-chat-square-text me-2 text-success"
                          ></i>
                          Feedback
                        </a>
                      </li>
                      <!-- Report Booking option - only for past bookings -->
                      <li v-if="isPastBooking(booking)">
                        <a
                          class="dropdown-item d-flex align-items-center"
                          @click="openReportModal(booking)"
                        >
                          <i
                            class="bi bi-exclamation-triangle me-2 text-danger"
                          ></i>
                          Report Issue
                        </a>
                      </li>
                    </ul>
                  </div>
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
      <div style="margin-bottom: 250px"></div>
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
          <li style="font-weight: bold; font-size: 20px">
            Thời gian hoàn tiền: 3-5 ngày làm việc.
          </li>
        </ul>
        <label>
          <input type="checkbox" v-model="agreedToRefundTerms" />
          Tôi đồng ý với điều khoản hoàn tiền
        </label>
        <div class="modal-actions" style="display: flex; gap: 10px">
          <button
            @click="confirmRefund"
            :disabled="!agreedToRefundTerms"
            class="btn btn-success"
            style="flex: 1"
          >
            Xác nhận
          </button>
          <button
            @click="showRefundModal = false"
            class="btn btn-danger"
            style="flex: 1"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>

    <!-- Report Booking Modal - Google Form Style -->
    <div
      class="modal fade"
      id="reportBookingModal"
      tabindex="-1"
      aria-labelledby="reportBookingModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-light">
            <h5 class="modal-title" id="reportBookingModalLabel">
              <i class="bi bi-exclamation-triangle-fill text-danger me-2"></i>
              Report Booking Issue
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitReport" class="google-form-style">
              <!-- Booking details summary -->
              <div class="mb-4 p-3 bg-light rounded">
                <h6 class="mb-2 text-muted">Booking Details</h6>
                <div class="row g-2" v-if="selectedBooking">
                  <div class="col-md-6">
                    <small class="text-muted d-block">Date:</small>
                    <span>{{ formatDate(selectedBooking.BookingDate) }}</span>
                  </div>
                  <div class="col-md-6">
                    <small class="text-muted d-block">Time:</small>
                    <span
                      >{{ formatTime(selectedBooking.StartTime) }} -
                      {{ formatTime(selectedBooking.EndTime) }}</span
                    >
                  </div>
                  <div class="col-md-6">
                    <small class="text-muted d-block">Field:</small>
                    <span>{{ selectedBooking.FieldId }}</span>
                  </div>
                  <div class="col-md-6">
                    <small class="text-muted d-block">Stadium:</small>
                    <span>{{ selectedBooking.StadiumName }}</span>
                  </div>
                </div>
              </div>

              <!-- Issue Type - Radio buttons like Google Form -->
              <div class="mb-4">
                <label class="form-label fw-bold"
                  >What issue did you experience?
                  <span class="text-danger">*</span></label
                >

                <div class="form-check mb-2">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="issueType"
                    id="issue1"
                    value="Poor field condition"
                    v-model="reportData.reasonType"
                  />
                  <label class="form-check-label" for="issue1">
                    Poor field condition
                  </label>
                </div>

                <div class="form-check mb-2">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="issueType"
                    id="issue2"
                    value="Facility issues (changing rooms, bathrooms, etc.)"
                    v-model="reportData.reasonType"
                  />
                  <label class="form-check-label" for="issue2">
                    Facility issues (changing rooms, bathrooms, etc.)
                  </label>
                </div>

                <div class="form-check mb-2">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="issueType"
                    id="issue3"
                    value="Unprofessional staff behavior"
                    v-model="reportData.reasonType"
                  />
                  <label class="form-check-label" for="issue3">
                    Unprofessional staff behavior
                  </label>
                </div>

                <div class="form-check mb-2">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="issueType"
                    id="issue4"
                    value="Double booking/scheduling conflict"
                    v-model="reportData.reasonType"
                  />
                  <label class="form-check-label" for="issue4">
                    Double booking/scheduling conflict
                  </label>
                </div>

                <div class="form-check mb-2">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="issueType"
                    id="issue5"
                    value="Safety concerns"
                    v-model="reportData.reasonType"
                  />
                  <label class="form-check-label" for="issue5">
                    Safety concerns
                  </label>
                </div>

                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="issueType"
                    id="issue6"
                    value="other"
                    v-model="reportData.reasonType"
                  />
                  <label class="form-check-label" for="issue6"> Other </label>
                </div>

                <!-- Other reason input - only appears when "Other" is selected -->
                <div class="mt-2 ps-4" v-if="reportData.reasonType === 'other'">
                  <input
                    type="text"
                    class="form-control"
                    v-model="reportData.otherReason"
                    placeholder="Please specify your issue"
                    required
                  />
                </div>
              </div>

              <!-- Image Upload -->
              <div class="mb-4">
                <label class="form-label fw-bold d-block"
                  >Upload Image (Optional)</label
                >
                <div class="d-flex align-items-center">
                  <button
                    type="button"
                    class="btn btn-outline-secondary me-2"
                    @click="triggerFileInput"
                  >
                    <i class="bi bi-image me-1"></i> Choose Image
                  </button>
                  <span class="text-muted small" v-if="reportData.image">{{
                    reportData.image.name
                  }}</span>
                  <span class="text-muted small" v-else>No file chosen</span>
                </div>
                <input
                  type="file"
                  ref="fileInput"
                  class="d-none"
                  @change="handleImageUpload"
                  accept="image/*"
                />
                <div class="form-text">
                  Upload an image to help us understand the issue better.
                </div>
              </div>

              <!-- Image preview -->
              <div class="mb-4" v-if="reportData.imagePreview">
                <label class="form-label fw-bold">Image Preview</label>
                <div class="position-relative d-inline-block">
                  <img
                    :src="reportData.imagePreview"
                    alt="Preview"
                    class="img-thumbnail"
                    style="max-height: 200px"
                  />
                  <button
                    type="button"
                    class="btn btn-sm btn-danger position-absolute top-0 end-0 m-1"
                    @click="removeImage"
                  >
                    <i class="bi bi-x"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="submitReport"
              :disabled="!isReportFormValid"
            >
              Submit Report
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div style="margin-bottom: 93px"></div>
</template>

<script>
import { useI18n } from "vue-i18n";
import API from "@/utils/axios";
import CommonHelper from "@/utils/common";
import "@fortawesome/fontawesome-free/css/all.css";
import * as bootstrap from "bootstrap";
import { showMessageBox } from "@/utils/message-box-service";

export default {
  data() {
    return {
      bookings: [],
      loading: true,
      currentPage: 1,
      itemsPerPage: 10,
      searchQuery: "",
      showRefundModal: false,
      agreedToRefundTerms: false,
      bookingId: "",
      selectedBooking: null,
      reportModal: null,

      // Report data
      reportData: {
        bookingId: null,
        reasonType: "",
        otherReason: "",
        description: "",
        image: null,
        imagePreview: null,
      },
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
    isReportFormValid() {
      if (!this.reportData.reasonType) return false;
      if (
        this.reportData.reasonType === "other" &&
        !this.reportData.otherReason
      )
        return false;
      return true;
    },
  },
  methods: {
    t(key) {
      return useI18n().t(key);
    },
    formatDate(dateString) {
      if (!dateString) return "";
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString("vi-VN", options);
    },
    formatTime(timeString) {
      if (!timeString) return "";
      const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: false };
      const time = new Date(timeString).toLocaleTimeString(
        "vi-VN",
        timeOptions
      );
      const dateOptions = { year: "numeric", month: "long", day: "numeric" };
      const date = new Date(timeString).toLocaleDateString(
        "vi-VN",
        dateOptions
      );
      return `${time}, ${date}`;
    },
    formatCurrency(value) {
      return CommonHelper.formatVND(value);
    },
    getStatusBadgeClass(status) {
      switch (status?.toLowerCase()) {
        case "confirmed":
        case "đã thanh toán":
        case "đã xác nhận":
          return "bg-success";
        case "pending":
        case "chờ xác nhận":
        case "đang xử lý":
          return "bg-warning text-dark";
        case "cancelled":
        case "đã hủy":
          return "bg-danger";
        default:
          return "bg-secondary";
      }
    },
    isPastBooking(booking) {
      if (!booking.EndTime) return false;
      const now = new Date();
      const endTime = new Date(booking.EndTime);
      return endTime <= now;
    },
    async fetchBookings() {
      this.loading = true;
      try {
        const userId = CommonHelper.getCurrentUserId();
        const response = await API.get(`Booking/history/${userId}`);
        this.bookings = response.data
          .map((b) => ({
            BookingId: b.bookingId,
            TotalPrice: b.totalPrice,
            BookingDate: b.bookingDate,
            Status: b.status,
            FieldId: b.description,
            StartTime: b.startTime,
            EndTime: b.endTime,
            StadiumName: b.stadiumName,
            IsReport: b.isReport,
          }))
          .sort((a, b) => new Date(b.BookingDate).getTime() - new Date(a.BookingDate).getTime());
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
    openRefundModal(id) {
      this.bookingId = id;
      this.showRefundModal = true;
      this.agreedToRefundTerms = false;
    },
    openReportModal(booking) {
      if (booking.IsReport) {
        showMessageBox({
          title: "",
          description: "You have already reported this booking.",
          type: "info",
          confirmText: "OK",
        });
        return;
      } else {
        this.selectedBooking = booking;
        this.reportData = {
          bookingId: booking.BookingId,
          reasonType: "",
          otherReason: "",
          description: "",
          image: null,
          imagePreview: null,
        };

        // Show the modal
        if (this.reportModal) {
          this.reportModal.show();
        }
      }
    },
    triggerFileInput() {
      // Trigger the hidden file input
      this.$refs.fileInput.click();
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      // Check if file is an image
      if (!file.type.match("image.*")) {
        alert("Please select an image file");
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should not exceed 5MB");
        return;
      }

      this.reportData.image = file;

      // Create image preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.reportData.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage() {
      this.reportData.image = null;
      this.reportData.imagePreview = null;
      // Reset file input
      this.$refs.fileInput.value = "";
    },
    async submitReport() {
      if (!this.isReportFormValid) return;

      try {
        this.loading = true;

        // Create form data for file upload
        const formData = new FormData();
        formData.append("userId", CommonHelper.getCurrentUserId());
        formData.append("bookingId", this.reportData.bookingId);
        formData.append("reasonType", this.reportData.reasonType);

        if (this.reportData.reasonType === "other") {
          formData.append("description", this.reportData.otherReason);
        } else {
          formData.append("description", this.reportData.reasonType);
        }

        if (this.reportData.image) {
          formData.append("image", this.reportData.image);
        }

        // Send report to API
        await API.post("Booking/report-issue", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // Close modal and show success message
        if (this.reportModal) {
          this.reportModal.hide();
        }

        this.fetchBookings();
        showMessageBox({
          title: "Infomation",
          description: "Send successfully!",
          type: "success",
          confirmText: "OK",
        });

        // Reset form
        this.reportData = {
          bookingId: null,
          reasonType: "",
          otherReason: "",
          description: "",
          image: null,
          imagePreview: null,
        };
      } catch (error) {
        console.error("Error submitting report:", error);
        alert("Failed to submit report. Please try again later.");
      } finally {
        this.loading = false;
      }
    },
    async getInvoice(bookingId) {
      try {
        const response = await API.get(`Invoice/download/${bookingId}`, {
          responseType: "blob",
        });

        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `invoice_${bookingId}.pdf`;
        link.click();

        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Failed to download invoice:", error);
      }
    },
    confirmRefund() {
      if (!this.agreedToRefundTerms) return;
      this.goToRefundRequest(this.bookingId);
      this.showRefundModal = false;
      this.agreedToRefundTerms = false;
    },
  },
  mounted() {
    this.fetchBookings();

    // Initialize Bootstrap modal
    this.reportModal = new bootstrap.Modal(
      document.getElementById("reportBookingModal")
    );
  },
};
</script>

<style scoped>
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
  z-index: 1000;
}

.modal-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.modal-content {
  background-color: white !important;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  width: 90%;
  position: relative;
  z-index: 1000;
  animation: fadeIn 0.3s;
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
  text-align: center;
  font-size: 24px;
  color: #333;
}

ul {
  list-style-type: none;
  padding: 0;
  margin-bottom: 20px;
}

ul li {
  margin-bottom: 10px;
  font-size: 16px;
  display: flex;
  align-items: center;
}

ul li i {
  margin-right: 10px;
  color: #28a745;
  font-size: 18px;
}

ul li i.fa-times-circle {
  color: #dc3545;
}

label {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

label input {
  margin-right: 10px;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
}

.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-success:disabled {
  background-color: #c6e1b6;
  cursor: not-allowed;
}

.btn:hover:not(:disabled) {
  opacity: 0.9;
  transform: scale(1.05);
}

/* Additional styles for enhanced table */
.border-bottom {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05) !important;
}

.rounded-pill {
  border-radius: 50rem !important;
}

.text-uppercase {
  text-transform: uppercase !important;
}

.dropdown-menu {
  padding: 0.5rem 0;
  margin: 0.125rem 0 0;
  border-radius: 0.5rem;
}

.dropdown-item {
  padding: 0.5rem 1rem;
  transition: all 0.2s;
}

.dropdown-item:hover {
  background-color: rgba(13, 110, 253, 0.05);
}

.text-primary {
  color: #0d6efd !important;
}

.text-warning {
  color: #ffc107 !important;
}

.text-success {
  color: #28a745 !important;
}

.date-icon {
  transition: all 0.3s ease;
}

tr:hover .date-icon {
  background-color: #e9ecef !important;
}

/* Google Form style */
.google-form-style .form-label.fw-bold {
  color: #202124;
  font-size: 16px;
  margin-bottom: 8px;
}

.google-form-style .form-check {
  padding-left: 1.8rem;
}

.google-form-style .form-check-input {
  width: 18px;
  height: 18px;
  margin-top: 0.2rem;
  margin-left: -1.8rem;
}

.google-form-style .form-check-label {
  font-size: 15px;
}

.google-form-style .form-control:focus {
  border-color: #4285f4;
  box-shadow: 0 0 0 0.2rem rgba(66, 133, 244, 0.25);
}

.google-form-style textarea.form-control {
  border: 1px solid #dadce0;
  border-radius: 4px;
  transition: border 0.2s;
}

.google-form-style textarea.form-control:focus {
  border-color: #4285f4;
}

/* Image preview styles */
.img-thumbnail {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
}
</style>
