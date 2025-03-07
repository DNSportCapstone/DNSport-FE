<template>
  <div class="section">
      <div class="section-title">
        <div>
          <span class="description-title">title</span>
        </div>
      </div>
  <div class="container mt-4">
    <!-- Header with search and filters -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="mb-0 fw-bold text-primary">
        <i class="bi bi-calendar-check me-2"></i>{{ t("BookingHistory") }}
      </h2>
      <div class="d-flex gap-2">
        <div class="input-group">
          <input type="text" v-model="searchQuery" class="form-control" placeholder='' />
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
      <div v-else-if="paginatedBookings.length === 0" class="text-center py-5">
        <i class="bi bi-calendar-x display-1 text-muted"></i>
        <p class="mt-3 text-muted">{{ t("NoBookingHistory") }}</p>
      </div>

      <!-- Table with data -->
      <div v-else class="table-responsive">
        <table class="table table-hover mb-0">
          <thead class="table-light">
            <tr>
              <th class="fw-semibold border-0">{{ t('BookingDate') }}</th>
              <th class="fw-semibold border-0">{{ t('Status') }}</th>
              <th class="fw-semibold border-0">{{ t('TotalAmount') }}</th>
              <th class="fw-semibold border-0">{{ t('Field') }}</th>
              <th class="fw-semibold border-0">{{ t('Time') }}</th>
              <th class="fw-semibold border-0">{{ t('Stadium')}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="booking in paginatedBookings" :key="booking.BookingId" class="align-middle">
              <td>{{ formatDate(booking.BookingDate) }}</td>
              <td>
                <span class="badge" :class="getStatusBadgeClass(booking.Status)">
                  {{ booking.Status }}
                </span>
              </td>
              <td class="fw-semibold">{{ formatCurrency(booking.TotalPrice) }}</td>
              <td>{{ booking.FieldId }}</td>
              <td>
                <div class="d-flex align-items-center">
                  <i class="bi bi-clock me-1 text-muted"></i>
                  {{ booking.StartTime }} - {{ booking.EndTime }}
                </div>
              </td>
              <td>{{ booking.StadiumName }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination footer -->
      <div class="card-footer bg-white py-3 border-0">
        <div class="d-flex justify-content-between align-items-center">
          <small class="text-muted">{{ t('Show') }} {{ paginatedBookings.length }} {{ t('On') }} {{ bookings.length }} {{ t('Result') }}</small>

          <nav aria-label="Điều hướng trang">
            <ul class="pagination pagination-sm mb-0">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <button class="page-link rounded-start" @click="currentPage--">
                  <i class="bi bi-chevron-left"></i> Trước
                </button>
              </li>
              <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: currentPage === page }">
                <button class="page-link" @click="currentPage = page">{{ page }}</button>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
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
</div>
</template>

<script setup>
  import { useI18n } from "vue-i18n";
  const { t } = useI18n();
</script>

<script>
import API from '@/utils/axios';
import CommonHelper from "@/utils/common";

export default {
  data() {
    return {
      bookings: [
        { BookingId: 1, TotalPrice: 100, BookingDate: '2025-03-01', Status: 'Confirmed', FieldId: 101, StartTime: '08:00', EndTime: '10:00', StadiumName: 'Sân A' },
        { BookingId: 2, TotalPrice: 120, BookingDate: '2025-03-02', Status: 'Pending', FieldId: 102, StartTime: '10:00', EndTime: '12:00', StadiumName: 'Sân B' },
        { BookingId: 3, TotalPrice: 80, BookingDate: '2025-03-03', Status: 'Cancelled', FieldId: 103, StartTime: '12:00', EndTime: '14:00', StadiumName: 'Sân C' },
        { BookingId: 4, TotalPrice: 200, BookingDate: '2025-03-04', Status: 'Confirmed', FieldId: 104, StartTime: '14:00', EndTime: '16:00', StadiumName: 'Sân D' },
        { BookingId: 5, TotalPrice: 150, BookingDate: '2025-03-05', Status: 'Pending', FieldId: 105, StartTime: '16:00', EndTime: '18:00', StadiumName: 'Sân E' },
        { BookingId: 1, TotalPrice: 100, BookingDate: '2025-03-01', Status: 'Confirmed', FieldId: 101, StartTime: '08:00', EndTime: '10:00', StadiumName: 'Sân A' },
        { BookingId: 2, TotalPrice: 120, BookingDate: '2025-03-02', Status: 'Pending', FieldId: 102, StartTime: '10:00', EndTime: '12:00', StadiumName: 'Sân B' },
        { BookingId: 3, TotalPrice: 80, BookingDate: '2025-03-03', Status: 'Cancelled', FieldId: 103, StartTime: '12:00', EndTime: '14:00', StadiumName: 'Sân C' },
        { BookingId: 4, TotalPrice: 200, BookingDate: '2025-03-04', Status: 'Confirmed', FieldId: 104, StartTime: '14:00', EndTime: '16:00', StadiumName: 'Sân D' },
        { BookingId: 5, TotalPrice: 150, BookingDate: '2025-03-05', Status: 'Pending', FieldId: 105, StartTime: '16:00', EndTime: '18:00', StadiumName: 'Sân E' },
        { BookingId: 1, TotalPrice: 100, BookingDate: '2025-03-01', Status: 'Confirmed', FieldId: 101, StartTime: '08:00', EndTime: '10:00', StadiumName: 'Sân A' },
        { BookingId: 2, TotalPrice: 120, BookingDate: '2025-03-02', Status: 'Pending', FieldId: 102, StartTime: '10:00', EndTime: '12:00', StadiumName: 'Sân B' },
        { BookingId: 3, TotalPrice: 80, BookingDate: '2025-03-03', Status: 'Cancelled', FieldId: 103, StartTime: '12:00', EndTime: '14:00', StadiumName: 'Sân C' },
        { BookingId: 4, TotalPrice: 200, BookingDate: '2025-03-04', Status: 'Confirmed', FieldId: 104, StartTime: '14:00', EndTime: '16:00', StadiumName: 'Sân D' },
        { BookingId: 5, TotalPrice: 150, BookingDate: '2025-03-05', Status: 'Pending', FieldId: 105, StartTime: '16:00', EndTime: '18:00', StadiumName: 'Sân E' }
      ],
      loading: true,
      currentPage: 1,
      itemsPerPage: 10,
      searchQuery: ''
    };
  },
  computed: {
    filteredBookings() {
      if (!this.searchQuery.trim()) return this.bookings;
      return this.bookings.filter(booking =>
        Object.values(booking).some(value =>
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
    }
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return '';
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('vi-VN', options);
    },
    formatCurrency(value) {
      return CommonHelper.formatVND(value);
    },
    getStatusBadgeClass(status) {
      switch (status?.toLowerCase()) {
        case 'confirmed':
        case 'đã thanh toán':
        case 'đã xác nhận':
          return 'bg-success';
        case 'pending':
        case 'chờ xác nhận':
        case 'đang xử lý':
          return 'bg-warning text-dark';
        case 'cancelled':
        case 'đã hủy':
          return 'bg-danger';
        default:
          return 'bg-secondary';
      }
    },
    async fetchBookings() {
      this.loading = true;
      try {
        const userId = CommonHelper.getCurrentUserId();
        const response = await API.get(`Booking/history/${userId}`);
        this.bookings = this.bookings.concat(response.data.map(b => ({
          BookingId: b.BookingId,
          TotalPrice: b.TotalPrice,
          BookingDate: b.BookingDate,
          Status: b.Status,
          FieldId: b.FieldId,
          StartTime: b.StartTime,
          EndTime: b.EndTime,
          StadiumName: b.StadiumName
        })));
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
      } finally {
        this.loading = false;
      }
    }
  },
  mounted() {
    this.fetchBookings();
  }
};
</script>


<style>
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

  .table th, .table td {
    font-size: 0.9rem;
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
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
</style>
