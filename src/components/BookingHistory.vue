<template>
    <div class="container mt-4">
      <!-- Header with search and filters -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="mb-0 fw-bold text-primary">
          <i class="bi bi-calendar-check me-2"></i>Lịch sử Booking
        </h2>
        <div class="d-flex gap-2">
          <div class="input-group">
            <input type="text" v-model="searchQuery" class="form-control" placeholder="Tìm kiếm...">
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
            <span class="visually-hidden">Đang tải...</span>
          </div>
          <p class="mt-3 text-muted">Đang tải dữ liệu...</p>
        </div>

        <!-- Empty state -->
        <div v-else-if="paginatedBookings.length === 0" class="text-center py-5">
          <i class="bi bi-calendar-x display-1 text-muted"></i>
          <p class="mt-3 text-muted">Không có lịch sử đặt sân nào</p>
        </div>

        <!-- Table with data -->
        <div v-else class="table-responsive">
          <table class="table table-hover mb-0">
            <thead class="table-light">
              <tr>
                <th class="fw-semibold border-0">Ngày đặt</th>
                <th class="fw-semibold border-0">Tình trạng</th>
                <th class="fw-semibold border-0">Tổng tiền</th>
                <th class="fw-semibold border-0">Field ID</th>
                <th class="fw-semibold border-0">Thời gian</th>
                <th class="fw-semibold border-0">Sân vận động</th>
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
            <small class="text-muted">Hiển thị {{ paginatedBookings.length }} trên {{ bookings.length }} kết quả</small>

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
  </template>

  <script setup>
  import API from '@/utils/axios';
  import { ref, onMounted, computed } from 'vue';
  import CommonHelper from "@/assets/scripts/common";

  const bookings = ref([
    { BookingId: 1, TotalPrice: 100, BookingDate: '2025-03-01', Status: 'Confirmed', FieldId: 101, StartTime: '08:00', EndTime: '10:00', StadiumName: 'Sân A' },
    { BookingId: 2, TotalPrice: 120, BookingDate: '2025-03-02', Status: 'Pending', FieldId: 102, StartTime: '10:00', EndTime: '12:00', StadiumName: 'Sân B' },
    { BookingId: 3, TotalPrice: 80, BookingDate: '2025-03-03', Status: 'Cancelled', FieldId: 103, StartTime: '12:00', EndTime: '14:00', StadiumName: 'Sân C' },
    { BookingId: 4, TotalPrice: 200, BookingDate: '2025-03-04', Status: 'Confirmed', FieldId: 104, StartTime: '14:00', EndTime: '16:00', StadiumName: 'Sân D' },
    { BookingId: 5, TotalPrice: 150, BookingDate: '2025-03-05', Status: 'Pending', FieldId: 105, StartTime: '16:00', EndTime: '18:00', StadiumName: 'Sân E' },
    { BookingId: 6, TotalPrice: 100, BookingDate: '2025-03-01', Status: 'Confirmed', FieldId: 101, StartTime: '08:00', EndTime: '10:00', StadiumName: 'Sân A' },
    { BookingId: 7, TotalPrice: 120, BookingDate: '2025-03-02', Status: 'Pending', FieldId: 102, StartTime: '10:00', EndTime: '12:00', StadiumName: 'Sân B' },
    { BookingId: 8, TotalPrice: 80, BookingDate: '2025-03-03', Status: 'Cancelled', FieldId: 103, StartTime: '12:00', EndTime: '14:00', StadiumName: 'Sân C' },
    { BookingId: 9, TotalPrice: 200, BookingDate: '2025-03-04', Status: 'Confirmed', FieldId: 104, StartTime: '14:00', EndTime: '16:00', StadiumName: 'Sân D' },
    { BookingId: 10, TotalPrice: 150, BookingDate: '2025-03-05', Status: 'Pending', FieldId: 105, StartTime: '16:00', EndTime: '18:00', StadiumName: 'Sân E' },
    { BookingId: 11, TotalPrice: 100, BookingDate: '2025-03-01', Status: 'Confirmed', FieldId: 101, StartTime: '08:00', EndTime: '10:00', StadiumName: 'Sân A' },
    { BookingId: 12, TotalPrice: 120, BookingDate: '2025-03-02', Status: 'Pending', FieldId: 102, StartTime: '10:00', EndTime: '12:00', StadiumName: 'Sân B' },
    { BookingId: 13, TotalPrice: 80, BookingDate: '2025-03-03', Status: 'Cancelled', FieldId: 103, StartTime: '12:00', EndTime: '14:00', StadiumName: 'Sân C' },
    { BookingId: 14, TotalPrice: 200, BookingDate: '2025-03-04', Status: 'Confirmed', FieldId: 104, StartTime: '14:00', EndTime: '16:00', StadiumName: 'Sân D' },
    { BookingId: 15, TotalPrice: 150, BookingDate: '2025-03-05', Status: 'Pending', FieldId: 105, StartTime: '16:00', EndTime: '18:00', StadiumName: 'Sân E' }
  ]);

  const loading = ref(true);
  const currentPage = ref(1);
  const itemsPerPage = 10;

  // **Lấy danh sách bookings theo trang**
  var paginatedBookings = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return bookings.value.slice(start, end);
  });

  // **Tính tổng số trang**
  var totalPages = computed(() => Math.ceil(bookings.value.length / itemsPerPage));

  // Format functions
  const formatDate = (dateString) => {
    if (!dateString) return '';

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusBadgeClass = (status) => {
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
  };

  const fetchBookings = async () => {
    loading.value = true;
    try {
      const userId = CommonHelper.getCurrentUserId();
      const response = await API.get(`Booking/history/${userId}`);

      // **Concat dữ liệu API với dữ liệu mẫu**
      bookings.value = bookings.value.concat(response.data.map(b => ({
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
      loading.value = false;
    }
  };



  onMounted(fetchBookings);
  const searchQuery = ref('');

  const filteredBookings = computed(() => {
  if (!searchQuery.value.trim()) return bookings.value;
  return bookings.value.filter(booking =>
    Object.values(booking).some(value =>
      String(value).toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  );
});

// Lấy danh sách bookings theo trang từ danh sách đã lọc
 paginatedBookings = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredBookings.value.slice(start, end);
});

// Cập nhật tổng số trang dựa trên danh sách đã lọc
 totalPages = computed(() => Math.ceil(filteredBookings.value.length / itemsPerPage));


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
