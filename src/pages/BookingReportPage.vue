<template>
  <div class="dashboard-container">
    <div class="container-fluid">
      <!-- Filter Controls with improved UI -->
      <div class="row mb-4">
        <div class="col-12">
          <div class="card shadow-sm border-0 rounded-4">
            <div class="card-body p-4">
              <div class="row g-4">
                <!-- Time Period Quick Filters with improved buttons -->
                <div class="col-md-6">
                  <label class="form-label fw-semibold">
                    <i class="bi bi-calendar-range me-2 text-primary"></i> {{ t("TimePeriod") }}
                  </label>
                  <div class="d-flex flex-wrap gap-2">
                    <button v-for="filter in timeFilters" :key="filter.value" @click="applyQuickFilter(filter.value)"
                      class="btn btn-filter"
                      :class="activeFilter === filter.value ? 'btn-primary' : 'btn-outline-primary'">
                      <i :class="`bi ${filter.icon} me-1`"></i> {{ filter.label }}
                    </button>
                  </div>
                </div>

                <!-- Custom Date Range with improved styling -->
                <div class="col-md-6">
                  <label class="form-label fw-semibold">
                    <i class="bi bi-calendar-week me-2 text-primary"></i>Tùy chọn khoảng thời gian
                  </label>
                  <div class="input-group date-range-picker">
                    <span class="input-group-text bg-light border-end-0">
                      <i class="bi bi-calendar3"></i>
                    </span>
                    <input type="date" class="form-control border-start-0 ps-0" v-model="dateRange.start"
                      @change="applyCustomDateRange">
                    <span class="input-group-text bg-light border-start-0 border-end-0">đến</span>
                    <input type="date" class="form-control border-start-0 ps-0" v-model="dateRange.end"
                      @change="applyCustomDateRange">
                    <button class="btn btn-primary" @click="applyCustomDateRange">
                      <i class="bi bi-search me-1"></i> Lọc
                    </button>
                  </div>
                </div>

                <!-- Grouping Option with improved radio buttons -->
                <div class="col-md-6">
                  <label class="form-label fw-semibold">
                    <i class="bi bi-grid-3x3-gap me-2 text-primary"></i>Nhóm theo
                  </label>
                  <div class="btn-group w-100" role="group">
                    <input type="radio" class="btn-check" name="groupBy" id="groupByDay" value="day" v-model="groupBy"
                      @change="updateGrouping">
                    <label class="btn btn-outline-primary" for="groupByDay">
                      <i class="bi bi-calendar-day me-1"></i> Ngày
                    </label>

                    <input type="radio" class="btn-check" name="groupBy" id="groupByMonth" value="month"
                      v-model="groupBy" @change="updateGrouping">
                    <label class="btn btn-outline-primary" for="groupByMonth">
                      <i class="bi bi-calendar-month me-1"></i> Tháng
                    </label>

                    <input type="radio" class="btn-check" name="groupBy" id="groupByYear" value="year" v-model="groupBy"
                      @change="updateGrouping">
                    <label class="btn btn-outline-primary" for="groupByYear">
                      <i class="bi bi-calendar me-1"></i> Năm
                    </label>
                  </div>
                </div>

                <!-- Court Type Filter with improved select -->
                <div class="col-md-6">
                  <label class="form-label fw-semibold">
                    <i class="bi bi-layers me-2 text-primary"></i>Loại sân
                  </label>
                  <div class="input-group">
                    <span class="input-group-text bg-light border-end-0">
                      <i class="bi bi-filter"></i>
                    </span>
                    <select class="form-select border-start-0 ps-0" v-model="selectedCourtType" @change="applyFilters">
                      <option value="all">Tất cả loại sân</option>
                      <option v-for="type in availableCourtTypes" :key="type" :value="type">
                        {{ type }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Active Filters Display with improved badges -->
              <div class="mt-4" v-if="hasActiveFilters">
                <div class="d-flex align-items-center flex-wrap gap-2">
                  <span class="text-muted me-2">
                    <i class="bi bi-funnel-fill me-1"></i>Bộ lọc đang áp dụng:
                  </span>
                  <div class="d-flex flex-wrap gap-2">
                    <span v-if="activeFilter !== 'all'" class="badge rounded-pill filter-badge">
                      <i class="bi bi-calendar-event me-1"></i>
                      {{ getFilterLabel(activeFilter) }}
                      <button type="button" class="btn-close btn-close-white ms-2"
                        @click="clearFilter('period')"></button>
                    </span>
                    <span v-if="isCustomDateRange" class="badge rounded-pill filter-badge">
                      <i class="bi bi-calendar-range me-1"></i>
                      {{ formatDate(dateRange.start) }} - {{ formatDate(dateRange.end) }}
                      <button type="button" class="btn-close btn-close-white ms-2"
                        @click="clearFilter('dateRange')"></button>
                    </span>
                    <span v-if="selectedCourtType !== 'all'" class="badge rounded-pill filter-badge">
                      <i class="bi bi-layers me-1"></i>
                      Loại sân: {{ selectedCourtType }}
                      <button type="button" class="btn-close btn-close-white ms-2"
                        @click="clearFilter('courtType')"></button>
                    </span>
                    <span v-if="groupBy !== 'day'" class="badge rounded-pill filter-badge">
                      <i class="bi bi-grid-3x3-gap me-1"></i>
                      Nhóm theo: {{ getGroupByLabel(groupBy) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Summary Cards with improved design -->
      <div class="row mb-4">
        <div class="col-md-4 mb-3">
          <div class="card h-100 shadow-sm border-0 rounded-4 stat-card">
            <div class="card-body p-4">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <h6 class="text-muted mb-1">Tổng số đơn đặt</h6>
                  <h2 class="mb-0 fw-bold">{{ filteredBookings.length }}</h2>
                  <small class="text-success" v-if="filteredBookings.length > 0">
                    <i class="bi bi-graph-up-arrow me-1"></i>
                    {{ ((filteredBookings.length / bookingListData.length) * 100).toFixed(0) }}% của tổng đơn
                  </small>
                </div>
                <div class="icon-box bg-primary bg-opacity-10 rounded-circle">
                  <i class="bi bi-calendar-check fs-3 text-primary"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-3">
          <div class="card h-100 shadow-sm border-0 rounded-4 stat-card">
            <div class="card-body p-4">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <h6 class="text-muted mb-1">Số loại sân</h6>
                  <h2 class="mb-0 fw-bold">{{ Object.keys(filteredTypeCount).length }}</h2>
                  <small class="text-primary" v-if="Object.keys(filteredTypeCount).length > 0">
                    <i class="bi bi-check-circle me-1"></i>
                    {{ Object.keys(filteredTypeCount).join(', ') }}
                  </small>
                </div>
                <div class="icon-box bg-success bg-opacity-10 rounded-circle">
                  <i class="bi bi-grid-3x3-gap fs-3 text-success"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-3">
          <div class="card h-100 shadow-sm border-0 rounded-4 stat-card">
            <div class="card-body p-4">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <h6 class="text-muted mb-1">{{ getTimeUnitLabel() }} có đơn</h6>
                  <h2 class="mb-0 fw-bold">{{ Object.keys(groupedByTypeAndPeriod).length }}</h2>
                  <small class="text-danger" v-if="Object.keys(groupedByTypeAndPeriod).length > 0">
                    <i class="bi bi-calendar-date me-1"></i>
                    {{ getTimeUnitLabel() }} gần nhất: {{ formatPeriodLabel(Object.keys(groupedByTypeAndPeriod)[0]) }}
                  </small>
                </div>
                <div class="icon-box bg-danger bg-opacity-10 rounded-circle">
                  <i class="bi bi-calendar-date fs-3 text-danger"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Section with improved cards -->
      <div class="row mb-4">
        <div class="col-lg-6 mb-4">
          <div class="card shadow-sm border-0 rounded-4 h-100">
            <div class="card-header bg-white border-0 pt-4 pb-0 d-flex justify-content-between align-items-center">
              <h5 class="card-title mb-0">
                <i class="bi bi-bar-chart-line me-2 text-primary"></i>
                Số lượng đơn đặt theo {{ getTimeUnitLabel().toLowerCase() }}
              </h5>
            </div>
            <div class="card-body pt-2" style="height: 300px">
              <div v-if="filteredBookings.length === 0"
                class="text-center py-5 h-100 d-flex flex-column justify-content-center">
                <i class="bi bi-bar-chart-line fs-1 text-muted"></i>
                <p class="mt-3 text-muted">Không có dữ liệu để hiển thị</p>
              </div>
              <BarChart v-else :data="bookingsChartData" :options="chartOptions" />
            </div>
          </div>
        </div>
        <div class="col-lg-6 mb-4">
          <div class="card shadow-sm border-0 rounded-4 h-100">
            <div class="card-header bg-white border-0 pt-4 pb-0 d-flex justify-content-between align-items-center">
              <h5 class="card-title mb-0">
                <i class="bi bi-pie-chart me-2 text-primary"></i>
                Số lượng đơn đặt theo thể loại
              </h5>
            </div>
            <div class="card-body pt-2" style="height: 300px">
              <div v-if="filteredBookings.length === 0"
                class="text-center py-5 h-100 d-flex flex-column justify-content-center">
                <i class="bi bi-pie-chart fs-1 text-muted"></i>
                <p class="mt-3 text-muted">Không có dữ liệu để hiển thị</p>
              </div>
              <BarChart v-else :data="typesChartData" :options="chartOptions" />
            </div>
          </div>
        </div>
      </div>

      <!-- Detailed Reports Section with improved accordions -->
      <div class="row">
        <div class="col-lg-6 mb-4">
          <div class="card shadow-sm border-0 rounded-4">
            <div class="card-header bg-white border-0 pt-4 pb-3 d-flex justify-content-between align-items-center">
              <h5 class="card-title mb-0">
                <i class="bi bi-list-columns-reverse me-2 text-primary"></i>
                Thống kê theo {{ getTimeUnitLabel().toLowerCase() }} và loại sân
              </h5>
              <span class="badge bg-primary rounded-pill">{{ filteredBookings.length }} đơn</span>
            </div>
            <div class="card-body p-0">
              <div v-if="filteredBookings.length === 0" class="text-center py-5">
                <i class="bi bi-calendar-x fs-1 text-muted"></i>
                <p class="mt-3 text-muted">Không có dữ liệu để hiển thị</p>
              </div>
              <div v-else class="accordion accordion-flush" id="dayTypeAccordion">
                <div class="accordion-item" v-for="(types, period, index) in groupedByTypeAndPeriod" :key="period">
                  <h2 class="accordion-header" :id="'heading-' + index">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                      :data-bs-target="'#collapse-' + index" aria-expanded="false" :aria-controls="'collapse-' + index">
                      <div class="d-flex justify-content-between align-items-center w-100">
                        <span class="fw-medium">{{ formatPeriodLabel(period) }}</span>
                        <span class="badge bg-primary rounded-pill ms-2">
                          {{Object.values(types).reduce((sum, count) => sum + count, 0)}} đơn
                        </span>
                      </div>
                    </button>
                  </h2>
                  <div :id="'collapse-' + index" class="accordion-collapse collapse"
                    :aria-labelledby="'heading-' + index" data-bs-parent="#dayTypeAccordion">
                    <div class="accordion-body">
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item d-flex justify-content-between align-items-center border-0 py-3"
                          v-for="(count, type) in types" :key="type">
                          <span>
                            <i class="bi bi-circle-fill me-2" :class="getTypeColor(type)"></i>
                            {{ type }}
                          </span>
                          <span class="badge bg-primary rounded-pill">{{ count }} đơn</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-6 mb-4">
          <div class="card shadow-sm border-0 rounded-4">
            <div class="card-header bg-white border-0 pt-4 pb-3">
              <h5 class="card-title mb-0">
                <i class="bi bi-pie-chart-fill me-2 text-primary"></i>
                Tổng số lượng đơn đặt theo loại sân
              </h5>
            </div>
            <div class="card-body p-0">
              <div v-if="filteredBookings.length === 0" class="text-center py-5">
                <i class="bi bi-table fs-1 text-muted"></i>
                <p class="mt-3 text-muted">Không có dữ liệu để hiển thị</p>
              </div>
              <div v-else class="table-responsive">
                <table class="table table-hover mb-0">
                  <thead class="table-light">
                    <tr>
                      <th class="border-0">Loại sân</th>
                      <th class="text-center border-0">Số lượng đơn</th>
                      <th class="text-end border-0">Tỷ lệ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(count, type) in filteredTypeCount" :key="type">
                      <td>
                        <div class="d-flex align-items-center">
                          <span class="type-indicator me-2" :class="getTypeProgressColor(type)"></span>
                          <span class="fw-medium">{{ type }}</span>
                        </div>
                      </td>
                      <td class="text-center">
                        <span class="badge bg-primary rounded-pill">{{ count }} đơn</span>
                      </td>
                      <td class="text-end">
                        <div class="d-flex align-items-center justify-content-end">
                          <span class="me-2 fw-medium">{{ ((count / filteredBookings.length) * 100).toFixed(1)
                          }}%</span>
                          <div class="progress" style="height: 6px; width: 100px">
                            <div class="progress-bar" :class="getTypeProgressColor(type)" role="progressbar"
                              :style="`width: ${(count / filteredBookings.length) * 100}%`"
                              :aria-valuenow="(count / filteredBookings.length) * 100" aria-valuemin="0"
                              aria-valuemax="100"></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Total Bookings Per Period Table with improved design -->
      <div class="row">
        <div class="col-12 mb-4">
          <div class="card shadow-sm border-0 rounded-4">
            <div class="card-header bg-white border-0 pt-4 pb-3 d-flex justify-content-between align-items-center">
              <h5 class="card-title mb-0">
                <i class="bi bi-table me-2 text-primary"></i>
                Tổng số lượng đơn đặt theo {{ getTimeUnitLabel().toLowerCase() }}
              </h5>
              <button class="btn btn-sm btn-outline-primary" @click="exportToExcel">
                <i class="bi bi-download me-1"></i> Xuất Excel
              </button>
            </div>
            <div class="card-body p-0">
              <div v-if="filteredBookings.length === 0" class="text-center py-5">
                <i class="bi bi-calendar-x fs-1 text-muted"></i>
                <p class="mt-3 text-muted">Không có dữ liệu để hiển thị</p>
              </div>
              <div v-else class="table-responsive">
                <table class="table table-striped table-hover mb-0">
                  <thead class="table-light">
                    <tr>
                      <th class="border-0">{{ getTimeUnitLabel() }}</th>
                      <th class="text-center border-0">Số lượng đơn</th>
                      <th class="text-end border-0">Tỷ lệ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in totalBookingsPerPeriod" :key="item.period">
                      <td>
                        <div class="d-flex align-items-center">
                          <span class="period-indicator me-2"></span>
                          <span class="fw-medium">{{ formatPeriodLabel(item.period) }}</span>
                        </div>
                      </td>
                      <td class="text-center">
                        <span class="badge bg-primary rounded-pill">{{ item.total }} đơn</span>
                      </td>
                      <td class="text-end">
                        <div class="d-flex align-items-center justify-content-end">
                          <span class="me-2 fw-medium">{{ ((item.total / filteredBookings.length) * 100).toFixed(1)
                          }}%</span>
                          <div class="progress" style="height: 6px; width: 100px">
                            <div class="progress-bar bg-primary" role="progressbar"
                              :style="`width: ${(item.total / filteredBookings.length) * 100}%`"
                              :aria-valuenow="(item.total / filteredBookings.length) * 100" aria-valuemin="0"
                              aria-valuemax="100"></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
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
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import API from "@/utils/axios";
import * as XLSX from 'xlsx';

// Đăng ký các thành phần Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  components: {
    BarChart: Bar
  },
  data() {
    return {
      // Dữ liệu mẫu về các đơn booking
      bookingListData: [],
      // Mapping màu sắc cho các loại sân
      typeColors: {
        'bóng đá': { text: 'text-success', bg: 'bg-success' },
        'bóng chuyền': { text: 'text-primary', bg: 'bg-primary' },
        'cầu lông': { text: 'text-danger', bg: 'bg-danger' },
        'bóng rổ': { text: 'text-warning', bg: 'bg-warning' }
      },
      // Bộ lọc
      activeFilter: 'all',
      dateRange: {
        start: '',
        end: ''
      },
      isCustomDateRange: false,
      groupBy: 'day',
      selectedCourtType: 'all',
      // Danh sách các bộ lọc thời gian
      timeFilters: [
        { label: 'Hôm nay', value: 'today', icon: 'bi-calendar-day' },
        { label: 'Tuần này', value: 'thisWeek', icon: 'bi-calendar-week' },
        { label: 'Tháng này', value: 'thisMonth', icon: 'bi-calendar-month' },
        { label: 'Năm nay', value: 'thisYear', icon: 'bi-calendar' },
        { label: 'Tất cả', value: 'all', icon: 'bi-calendar-range' }
      ]
    };
  },
  computed: {
    // Danh sách các loại sân có sẵn
    availableCourtTypes() {
      return [...new Set(this.bookingListData.map(booking => booking.type))];
    },

    // Kiểm tra xem có bộ lọc nào đang được áp dụng không
    hasActiveFilters() {
      return this.activeFilter !== 'all' || this.isCustomDateRange || this.selectedCourtType !== 'all' || this.groupBy !== 'day';
    },

    // Dữ liệu đã được lọc
    filteredBookings() {
      let filtered = [...this.bookingListData];

      // Lọc theo khoảng thời gian
      if (this.isCustomDateRange && this.dateRange.start && this.dateRange.end) {
        const startDate = new Date(this.dateRange.start);
        const endDate = new Date(this.dateRange.end);
        endDate.setHours(23, 59, 59, 999); // Đặt thời gian kết thúc là cuối ngày

        filtered = filtered.filter(booking => {
          const bookingDate = new Date(booking.bookingTime);
          return bookingDate >= startDate && bookingDate <= endDate;
        });
      } else if (this.activeFilter !== 'all') {
        const today = new Date();
        //const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        if (this.activeFilter === 'today') {
          filtered = filtered.filter(booking => {
            const bookingDate = new Date(booking.bookingTime);
            return bookingDate.toDateString() === today.toDateString();
          });
        } else if (this.activeFilter === 'thisWeek') {
          const startOfWeek = new Date(today);
          startOfWeek.setDate(today.getDate() - today.getDay()); // Đầu tuần (Chủ nhật)
          startOfWeek.setHours(0, 0, 0, 0);

          const endOfWeek = new Date(startOfWeek);
          endOfWeek.setDate(startOfWeek.getDate() + 6); // Cuối tuần (Thứ 7)
          endOfWeek.setHours(23, 59, 59, 999);

          filtered = filtered.filter(booking => {
            const bookingDate = new Date(booking.bookingTime);
            return bookingDate >= startOfWeek && bookingDate <= endOfWeek;
          });
        } else if (this.activeFilter === 'thisMonth') {
          const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
          const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999);

          filtered = filtered.filter(booking => {
            const bookingDate = new Date(booking.bookingTime);
            return bookingDate >= startOfMonth && bookingDate <= endOfMonth;
          });
        } else if (this.activeFilter === 'thisYear') {
          const startOfYear = new Date(today.getFullYear(), 0, 1);
          const endOfYear = new Date(today.getFullYear(), 11, 31, 23, 59, 59, 999);

          filtered = filtered.filter(booking => {
            const bookingDate = new Date(booking.bookingTime);
            return bookingDate >= startOfYear && bookingDate <= endOfYear;
          });
        }
      }

      // Lọc theo loại sân
      if (this.selectedCourtType !== 'all') {
        filtered = filtered.filter(booking => booking.type === this.selectedCourtType);
      }

      return filtered;
    },

    // Nhóm đơn đặt theo loại sân và khoảng thời gian (ngày/tháng/năm)
    groupedByTypeAndPeriod() {
      return this.filteredBookings.reduce((acc, booking) => {
        const { bookingTime, type } = booking;
        const period = this.getPeriodKey(bookingTime);

        if (!acc[period]) {
          acc[period] = {};
        }

        if (!acc[period][type]) {
          acc[period][type] = 0;
        }

        acc[period][type] += 1;

        return acc;
      }, {});
    },

    // Thống kê tổng số lượng đơn đặt theo khoảng thời gian
    totalBookingsPerPeriod() {
      return Object.keys(this.groupedByTypeAndPeriod)
        .map(period => {
          const total = Object.values(this.groupedByTypeAndPeriod[period]).reduce((sum, count) => sum + count, 0);
          return { period, total };
        })
        .sort((a, b) => {
          // Sắp xếp theo thời gian
          if (this.groupBy === 'day') {
            return new Date(b.period) - new Date(a.period);
          } else if (this.groupBy === 'month') {
            const [yearA, monthA] = a.period.split('-');
            const [yearB, monthB] = b.period.split('-');
            return new Date(yearB, monthB - 1) - new Date(yearA, monthA - 1);
          } else {
            return b.period - a.period;
          }
        });
    },

    // Thống kê số lượng đơn theo loại sân
    filteredTypeCount() {
      return this.filteredBookings.reduce((acc, booking) => {
        const { type } = booking;
        if (!acc[type]) acc[type] = 0;
        acc[type] += 1;
        return acc;
      }, {});
    },

    // Dữ liệu biểu đồ số lượng đơn đặt theo khoảng thời gian
    bookingsChartData() {
      let sortedData = [...this.totalBookingsPerPeriod];

      // Sắp xếp theo thứ tự thời gian tăng dần cho biểu đồ
      if (this.groupBy === 'day') {
        sortedData.sort((a, b) => new Date(a.period) - new Date(b.period));
      } else if (this.groupBy === 'month') {
        sortedData.sort((a, b) => {
          const [yearA, monthA] = a.period.split('-');
          const [yearB, monthB] = b.period.split('-');
          return new Date(yearA, monthA - 1) - new Date(yearB, monthB - 1);
        });
      } else {
        sortedData.sort((a, b) => a.period - b.period);
      }

      const labels = sortedData.map(item => this.formatPeriodLabel(item.period));
      const data = sortedData.map(item => item.total);

      return {
        labels: labels,
        datasets: [
          {
            label: 'Số lượng đơn đặt',
            data: data,
            backgroundColor: 'rgba(13, 110, 253, 0.7)',
            borderColor: 'rgba(13, 110, 253, 1)',
            borderWidth: 1,
            borderRadius: 6,
            maxBarThickness: 40
          }
        ]
      };
    },

    // Dữ liệu biểu đồ số lượng đơn đặt theo thể loại
    typesChartData() {
      const labels = Object.keys(this.filteredTypeCount);
      const data = Object.values(this.filteredTypeCount);
      const backgroundColors = labels.map(type => this.getChartColor(type));

      return {
        labels: labels,
        datasets: [
          {
            label: 'Số lượng đơn đặt',
            data: data,
            backgroundColor: backgroundColors,
            borderRadius: 6,
            maxBarThickness: 40
          }
        ]
      };
    },

    // Các tùy chọn cấu hình cho biểu đồ
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleFont: {
              size: 14,
              weight: 'bold'
            },
            bodyFont: {
              size: 13
            },
            padding: 12,
            cornerRadius: 6,
            displayColors: true,
            usePointStyle: true
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0,
              font: {
                size: 11
              }
            },
            grid: {
              display: true,
              drawBorder: false,
              color: 'rgba(0, 0, 0, 0.05)'
            }
          },
          x: {
            ticks: {
              font: {
                size: 11
              }
            },
            grid: {
              display: false,
              drawBorder: false
            }
          }
        }
      };
    }
  },
  methods: {
    getPeriodKey(dateString) {
      const date = new Date(dateString);
      if (this.groupBy === 'day') {
        return dateString; // Giữ nguyên định dạng YYYY-MM-DD
      } else if (this.groupBy === 'month') {
        return `${date.getFullYear()}-${date.getMonth() + 1}`; // YYYY-MM
      } else {
        return date.getFullYear().toString(); // YYYY
      }
    },

    formatPeriodLabel(period) {
      if (this.groupBy === 'day') {
        return this.formatDate(period);
      } else if (this.groupBy === 'month') {
        const [year, month] = period.split('-');
        const date = new Date(year, month - 1);
        return date.toLocaleDateString('vi-VN', { year: 'numeric', month: 'long' });
      } else {
        return `Năm ${period}`;
      }
    },

    formatDate(dateString) {
      if (!dateString) return '';
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(dateString).toLocaleDateString('vi-VN', options);
    },

    getTypeColor(type) {
      return this.typeColors[type]?.text || 'text-secondary';
    },

    getTypeProgressColor(type) {
      return this.typeColors[type]?.bg || 'bg-secondary';
    },

    getChartColor(type) {
      const colorMap = {
        'Bóng đá': 'rgba(25, 135, 84, 0.7)',
        'Cầu Lông': 'rgba(13, 110, 253, 0.7)',
        'Bóng chuyền': 'rgba(220, 53, 69, 0.7)',
        'Bóng rổ': 'rgba(255, 193, 7, 0.7)',
        'Tennis': 'rgba(25, 193, 7, 0.7)',
        'Pickleball': 'rgba(130, 110, 253, 0.7)',
      };

      return colorMap[type.trim()] || 'rgba(108, 117, 125, 0.7)';
    },

    applyQuickFilter(filter) {
      this.activeFilter = filter;
      this.isCustomDateRange = false;
      this.applyFilters();
    },

    applyCustomDateRange() {
      if (this.dateRange.start && this.dateRange.end) {
        this.activeFilter = 'custom';
        this.isCustomDateRange = true;
        this.applyFilters();
      }
    },

    updateGrouping() {
      this.applyFilters();
    },

    applyFilters() {
    },

    clearFilter(filterType) {
      if (filterType === 'period') {
        this.activeFilter = 'all';
      } else if (filterType === 'dateRange') {
        this.dateRange.start = '';
        this.dateRange.end = '';
        this.isCustomDateRange = false;
      } else if (filterType === 'courtType') {
        this.selectedCourtType = 'all';
      }
      this.applyFilters();
    },

    getFilterLabel(filter) {
      const labels = {
        'today': 'Hôm nay',
        'thisWeek': 'Tuần này',
        'thisMonth': 'Tháng này',
        'thisYear': 'Năm nay',
        'all': 'Tất cả',
        'custom': 'Tùy chỉnh'
      };
      return labels[filter] || filter;
    },

    getGroupByLabel(groupBy) {
      const labels = {
        'day': 'Ngày',
        'month': 'Tháng',
        'year': 'Năm'
      };
      return labels[groupBy] || groupBy;
    },

    getTimeUnitLabel() {
      if (this.groupBy === 'day') {
        return 'Ngày';
      } else if (this.groupBy === 'month') {
        return 'Tháng';
      } else {
        return 'Năm';
      }
    },

    async loadSummaryData() {
      try {
        const response = await API.get(`Admin/booking-report`);
        this.bookingListData = response.data;
      } catch (error) {
        alert("Failed to load booking data.");
      }
    },

    exportToExcel() {
      if (this.totalBookingsPerPeriod.length === 0) {
        return;
      }


      const wsData = [
        ["Thời gian", "Số lượng đơn", "Tỷ lệ (%)"]
      ];

      this.totalBookingsPerPeriod.forEach(item => {
        wsData.push([
          this.formatPeriodLabel(item.period),
          item.total,
          ((item.total / this.filteredBookings.length) * 100).toFixed(1) + "%"
        ]);
      });


      const ws = XLSX.utils.aoa_to_sheet(wsData);


      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Booking_Report");


      XLSX.writeFile(wb, `Booking_Report_${new Date().toISOString().slice(0, 10)}.xlsx`);
    }
  },
  mounted() {
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);
    const formattedThirtyDaysAgo = thirtyDaysAgo.toISOString().split('T')[0];

    this.dateRange.start = formattedThirtyDaysAgo;
    this.dateRange.end = formattedToday;
    this.loadSummaryData();
  }
};
</script>

<style>
/* Thêm Bootstrap Icons */
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css");

/* Gradient background cho header */
.bg-gradient-primary {
  background: linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%);
}

/* Styling cho cards */
.card {
  transition: all 0.3s ease;
  border-radius: 1rem;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}

/* Styling cho accordion */
.accordion-button:not(.collapsed) {
  background-color: rgba(13, 110, 253, 0.1);
  color: #0d6efd;
  font-weight: 500;
}

.accordion-button:focus {
  box-shadow: none;
  border-color: rgba(13, 110, 253, 0.25);
}

/* Styling cho tables */
.table th {
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.5px;
}

/* Styling cho icon boxes */
.icon-box {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.stat-card:hover .icon-box {
  transform: scale(1.1);
}

/* Styling cho filter badges */
.filter-badge {
  background-color: #0d6efd;
  padding: 0.5rem 0.75rem;
  font-weight: normal;
}

/* Styling cho buttons */
.btn-filter {
  border-radius: 50rem;
  padding: 0.5rem 1rem;
  transition: all 0.2s ease;
}

.btn-filter:hover {
  transform: translateY(-2px);
}

/* Styling cho date range picker */
.date-range-picker .form-control {
  border-radius: 0.375rem;
}

/* Styling cho type indicators */
.type-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.period-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
  background-color: #0d6efd;
}

/* Dashboard container */
.dashboard-container {
  background-color: #f8f9fa;
  min-height: 100vh;
  padding-bottom: 2rem;
}

.header-section {
  background-color: white;
  padding-top: 1rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .icon-box {
    width: 50px;
    height: 50px;
  }

  .card-body {
    padding: 1rem;
  }

  .btn-filter {
    padding: 0.4rem 0.75rem;
    font-size: 0.875rem;
  }
}
</style>
