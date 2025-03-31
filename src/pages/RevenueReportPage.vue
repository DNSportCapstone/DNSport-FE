<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card border-0 shadow mb-4 rounded-4">
          <div class="card-body p-4">
            <div class="d-flex align-items-center justify-content-center mb-4">
              <div class="badge bg-primary bg-opacity-10 p-2 rounded-circle me-3">
                <i class="bi bi-graph-up-arrow text-primary fs-4"></i>
              </div>
              <h2 class="card-title mb-0 fw-bold">Doanh thu báo cáo</h2>
            </div>

            <!-- Thông tin doanh thu chính -->
            <div class="row g-4 mb-4">
              <div class="col-md-4">
                <div class="card h-100 border-0 shadow-sm revenue-card bg-gradient">
                  <div class="card-body text-center p-4">
                    <div class="icon-box bg-primary bg-opacity-10 mx-auto mb-3 pulse-animation">
                      <i class="bi bi-currency-dollar text-primary"></i>
                    </div>
                    <h5 class="card-subtitle text-muted mb-2">Tổng doanh thu</h5>
                    <h3 class="card-title mb-0 fw-bold text-primary currency-value">{{
                      formatCurrency(revenueData.totalRevenue) }}
                    </h3>
                  </div>
                </div>
              </div>

              <div class="col-md-4">
                <div class="card h-100 border-0 shadow-sm revenue-card bg-gradient">
                  <div class="card-body text-center p-4">
                    <div class="icon-box bg-success bg-opacity-10 mx-auto mb-3 pulse-animation">
                      <i class="bi bi-wallet2 text-success"></i>
                    </div>
                    <h5 class="card-subtitle text-muted mb-2">Số tiền trả cho chủ sân</h5>
                    <h3 class="card-title mb-0 fw-bold text-success currency-value">{{
                      formatCurrency(revenueData.totalRevenue * 90
                      / 100) }}</h3>
                  </div>
                </div>
              </div>

              <div class="col-md-4">
                <div class="card h-100 border-0 shadow-sm revenue-card bg-gradient">
                  <div class="card-body text-center p-4">
                    <div class="icon-box bg-info bg-opacity-10 mx-auto mb-3 pulse-animation">
                      <i class="bi bi-percent text-info"></i>
                    </div>
                    <h5 class="card-subtitle text-muted mb-2">Doanh thu hoa hồng</h5>
                    <h3 class="card-title mb-0 fw-bold text-info currency-value">{{
                      formatCurrency(revenueData.totalRevenue * 10 /
                      100) }}</h3>
                  </div>
                </div>
              </div>
            </div>

            <!-- Báo cáo theo thời gian -->
            <div class="card border-0 shadow-sm mb-4 rounded-4 overflow-hidden">
              <div class="card-header bg-white border-bottom-0 pt-4 pb-0">
                <div class="d-flex align-items-center justify-content-between">
                  <div class="d-flex align-items-center">
                    <div class="badge bg-primary bg-opacity-10 p-2 rounded-circle me-3">
                      <i class="bi bi-calendar-range text-primary"></i>
                    </div>
                    <h4 class="mb-0 fw-bold">Báo cáo theo thời gian</h4>
                  </div>
                  <div class="d-flex align-items-center">
                    <div class="input-group date-filter me-3">
                      <select v-model="selectedYear" class="form-select" @change="filterDataByYear">
                        <option v-for="year in availableYears" :key="year" :value="year">{{ year }}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="btn-group w-100 mb-4 period-selector" role="group">
                  <input type="radio" class="btn-check" name="reportPeriod" id="daily" autocomplete="off"
                    :checked="selectedPeriod === 'daily'" @change="selectReportPeriod('daily')">
                  <label class="btn btn-outline-primary rounded-start" for="daily">
                    <i class="bi bi-calendar-day me-1"></i> Hàng ngày
                  </label>

                  <input type="radio" class="btn-check" name="reportPeriod" id="monthly" autocomplete="off"
                    :checked="selectedPeriod === 'monthly'" @change="selectReportPeriod('monthly')">
                  <label class="btn btn-outline-primary" for="monthly">
                    <i class="bi bi-calendar-month me-1"></i> Hàng tháng
                  </label>

                  <input type="radio" class="btn-check" name="reportPeriod" id="yearly" autocomplete="off"
                    :checked="selectedPeriod === 'yearly'" @change="selectReportPeriod('yearly')">
                  <label class="btn btn-outline-primary rounded-end" for="yearly">
                    <i class="bi bi-calendar me-1"></i> Hàng năm
                  </label>
                </div>

                <div v-if="selectedPeriodData.length > 0" class="period-data">
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <h5 class="mb-0 d-flex align-items-center">
                      <span class="badge bg-success p-2 rounded-circle me-2">
                        <i class="bi bi-cash-stack text-white"></i>
                      </span>
                      {{ periodTitle }} Doanh thu
                    </h5>
                    <button @click="toggleDataList" class="btn btn-sm btn-primary rounded-pill">
                      <i :class="isDataListExpanded ? 'bi bi-chevron-up' : 'bi bi-chevron-down'" class="me-1"></i>
                      {{ isDataListExpanded ? 'Thu gọn' : 'Xem chi tiết' }}
                    </button>
                  </div>

                  <div v-if="!isDataListExpanded" class="row g-3 mb-3">
                    <div class="col-md-6">
                      <div class="card border-0 bg-light rounded-4">
                        <div class="card-body py-3">
                          <div class="d-flex justify-content-between align-items-center">
                            <span class="text-muted d-flex align-items-center">
                              <i class="bi bi-list-ol me-2 text-primary"></i>Tổng số mục:
                            </span>
                            <span class="badge bg-primary rounded-pill fs-6 px-3">{{ selectedPeriodData.length }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="card border-0 bg-light rounded-4">
                        <div class="card-body py-3">
                          <div class="d-flex justify-content-between align-items-center">
                            <span class="text-muted d-flex align-items-center">
                              <i class="bi bi-cash me-2 text-success"></i>Tổng doanh thu:
                            </span>
                            <span class="badge bg-success rounded-pill fs-6 px-3 currency-value">{{
                              formatCurrency(totalPeriodRevenue)
                              }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="collapse" :class="{ 'show': isDataListExpanded }">
                    <div class="table-responsive">
                      <table class="table table-hover table-striped">
                        <thead class="table-light">
                          <tr>
                            <th>Thời gian</th>
                            <th class="text-end">Doanh thu</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in selectedPeriodData" :key="item.date.getTime()">
                            <td>
                              <i class="bi bi-calendar-event me-2 text-primary"></i>
                              {{ formatDate(item.date) }}
                            </td>
                            <td class="text-end fw-bold currency-value">{{ formatCurrency(item.revenue) }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Biểu đồ doanh thu -->
            <div class="card border-0 shadow-sm mb-4 rounded-4 overflow-hidden">
              <div class="card-header bg-white border-bottom-0 pt-4 d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center">
                  <div class="badge bg-primary bg-opacity-10 p-2 rounded-circle me-3">
                    <i class="bi bi-bar-chart-line-fill text-primary"></i>
                  </div>
                  <h4 class="mb-0 fw-bold">Biểu đồ xu hướng doanh thu</h4>
                </div>
                <div class="dropdown">
                  <button class="btn btn-sm btn-light rounded-pill dropdown-toggle" type="button"
                    id="chartOptionsDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="bi bi-sliders me-1"></i> Tùy chọn
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end shadow-sm" aria-labelledby="chartOptionsDropdown">
                    <li><a class="dropdown-item" href="#" @click.prevent="toggleChartType"><i
                          :class="isBarChart ? 'bi bi-graph-up' : 'bi bi-bar-chart'" class="me-2"></i>{{ isBarChart ?
                            'Chuyển sang biểu đồ đường' : 'Chuyển sang biểu đồ cột' }}</a></li>
                    <li><a class="dropdown-item" href="#" @click.prevent="downloadChart"><i
                          class="bi bi-download me-2"></i>Tải xuống</a></li>
                  </ul>
                </div>
              </div>
              <div class="card-body p-4">
                <div style="height: 350px" ref="chartContainer">
                  <component :is="chartComponent" :data="chartData" :options="chartOptions" ref="chart" />
                </div>
              </div>
            </div>

            <!-- Thống kê bổ sung -->
            <div class="row g-4">
              <div class="col-md-4">
                <div class="card h-100 border-0 shadow-sm revenue-card bg-gradient">
                  <div class="card-body text-center p-4">
                    <div class="icon-box bg-warning bg-opacity-10 mx-auto mb-3 pulse-animation">
                      <i class="bi bi-file-earmark-text text-warning"></i>
                    </div>
                    <h5 class="card-subtitle text-muted mb-2">Số lượng đơn</h5>
                    <h3 class="card-title mb-0 fw-bold text-warning">{{ revenueData.totalBookings }}</h3>
                    <div class="progress mt-3" style="height: 6px;">
                      <div class="progress-bar bg-warning" role="progressbar"
                        :style="{ width: (revenueData.totalBookings / 100 * 5) + '%' }" aria-valuenow="25"
                        aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-4">
                <div class="card h-100 border-0 shadow-sm revenue-card bg-gradient">
                  <div class="card-body text-center p-4">
                    <div class="icon-box bg-success bg-opacity-10 mx-auto mb-3 pulse-animation">
                      <i class="bi bi-graph-up-arrow text-success"></i>
                    </div>
                    <h5 class="card-subtitle text-muted mb-2">Doanh thu cao nhất</h5>
                    <h3 class="card-title mb-0 fw-bold text-success currency-value">{{ formatCurrency(highestRevenue) }}
                    </h3>
                    <p class="text-muted mt-2 small">
                      <span class="badge bg-light text-dark rounded-pill">
                        <i class="bi bi-calendar-event me-1"></i>{{ formatDate(highestTime) }}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div class="col-md-4">
                <div class="card h-100 border-0 shadow-sm revenue-card bg-gradient">
                  <div class="card-body text-center p-4">
                    <div class="icon-box bg-danger bg-opacity-10 mx-auto mb-3 pulse-animation">
                      <i class="bi bi-graph-down-arrow text-danger"></i>
                    </div>
                    <h5 class="card-subtitle text-muted mb-2">Doanh thu thấp nhất</h5>
                    <h3 class="card-title mb-0 fw-bold text-danger currency-value">{{ formatCurrency(lowestRevenue) }}
                    </h3>
                    <p class="text-muted mt-2 small">
                      <span class="badge bg-light text-dark rounded-pill">
                        <i class="bi bi-calendar-event me-1"></i>{{ formatDate(lowestTime) }}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Bar, Line } from 'vue-chartjs';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import API from "@/utils/axios";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

export default {
  components: {
    Bar,
    Line
  },
  data() {
    return {
      isBarChart: true,
      allRevenueData: [],
      revenueData: {
        totalRevenue: 0,
        totalBookings: 0,
        daily: []
      },
      selectedYear: new Date().getFullYear(),
      availableYears: [],
      selectedPeriod: "daily",
      isDataListExpanded: false,
      chartContainer: null,
      chart: null
    };
  },
  computed: {
    chartComponent() {
      return this.isBarChart ? 'Bar' : 'Line';
    },
    monthlyData() {
      const monthMap = new Map();

      this.revenueData.daily.forEach(item => {
        const monthKey = `${item.date.getFullYear()}-${item.date.getMonth()}`;
        if (!monthMap.has(monthKey)) {
          monthMap.set(monthKey, {
            date: new Date(item.date.getFullYear(), item.date.getMonth(), 1),
            revenue: 0
          });
        }
        monthMap.get(monthKey).revenue += item.revenue;
      });

      return Array.from(monthMap.values()).sort((a, b) => a.date - b.date);
    },
    yearlyData() {
      const yearMap = new Map();

      this.allRevenueData.forEach(item => {
        const yearKey = item.date.getFullYear();
        if (!yearMap.has(yearKey)) {
          yearMap.set(yearKey, {
            date: new Date(yearKey, 0, 1),
            revenue: 0
          });
        }
        yearMap.get(yearKey).revenue += item.revenue;
      });

      return Array.from(yearMap.values()).sort((a, b) => a.date - b.date);
    },
    selectedPeriodData() {
      switch (this.selectedPeriod) {
        case "monthly":
          return this.monthlyData;
        case "yearly":
          return this.yearlyData;
        case "daily":
        default:
          return this.revenueData.daily;
      }
    },
    totalPeriodRevenue() {
      return this.selectedPeriodData.reduce((sum, item) => sum + item.revenue, 0);
    },
    highestRevenue() {
      if (this.selectedPeriodData.length === 0) return 0;
      return Math.max(...this.selectedPeriodData.map(item => item.revenue));
    },
    highestTime() {
      return this.selectedPeriodData.find(item => item.revenue === this.highestRevenue)?.date;
    },
    lowestRevenue() {
      if (this.selectedPeriodData.length === 0) return 0;
      return Math.min(...this.selectedPeriodData.map(item => item.revenue));
    },
    lowestTime() {
      return this.selectedPeriodData.find(item => item.revenue === this.lowestRevenue)?.date;
    },
    periodTitle() {
      switch (this.selectedPeriod) {
        case "monthly":
          return "Hàng tháng";
        case "yearly":
          return "Hàng năm";
        case "daily":
        default:
          return "Hàng ngày";
      }
    },
    chartData() {
      const backgroundColor = this.isBarChart
        ? "rgba(13, 110, 253, 0.7)"
        : "rgba(13, 110, 253, 0.2)";

      const borderColor = "rgba(13, 110, 253, 1)";

      return {
        labels: this.selectedPeriodData.map(item => {
          if (this.selectedPeriod === "yearly") {
            return item.date.getFullYear().toString();
          } else if (this.selectedPeriod === "monthly") {
            return item.date.toLocaleDateString("vi-VN", { month: "short", year: "numeric" });
          } else {
            return item.date.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" });
          }
        }),
        datasets: [
          {
            label: "Doanh thu",
            data: this.selectedPeriodData.map(item => item.revenue),
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: 1,
            borderRadius: this.isBarChart ? 8 : 0,
            maxBarThickness: 50,
            tension: 0.4,
            fill: !this.isBarChart
          }
        ]
      };
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              boxWidth: 12,
              usePointStyle: true,
              pointStyle: 'circle'
            }
          },
          title: {
            display: true,
            text: `Doanh thu ${this.periodTitle}`,
            font: {
              size: 16,
              weight: 'bold'
            },
            padding: {
              top: 10,
              bottom: 20
            }
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
            callbacks: {
              label: function (context) {
                let value = context.raw;
                return 'Doanh thu: ' + new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND"
                }).format(value);
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0,
              callback: function (value) {
                if (value >= 1000000) {
                  return (value / 1000000) + 'M';
                }
                if (value >= 1000) {
                  return (value / 1000) + 'K';
                }
                return value;
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
              },
              maxRotation: 45,
              minRotation: 0
            },
            grid: {
              display: false,
              drawBorder: false
            }
          }
        },
        animation: {
          duration: 1000,
          easing: 'easeOutQuart'
        }
      };
    }
  },
  watch: {
    selectedYear() {
      this.filterDataByYear();
    }
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND"
      }).format(value);
    },
    filterDataByYear() {
      if (this.allRevenueData.length === 0) return;

      const filteredData = this.allRevenueData.filter(item =>
        item.date.getFullYear() === this.selectedYear
      );

      this.revenueData.daily = filteredData;
      this.revenueData.totalRevenue = filteredData.reduce((sum, item) => sum + item.revenue, 0);
      this.revenueData.totalBookings = filteredData.length;
    },
    formatDate(date) {
      if (!date) return "N/A";

      if (this.selectedPeriod === "yearly") {
        return date.getFullYear().toString();
      } else if (this.selectedPeriod === "monthly") {
        return date.toLocaleDateString("vi-VN", {
          month: "long",
          year: "numeric"
        });
      } else {
        return date.toLocaleDateString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric"
        });
      }
    },
    toggleDataList() {
      this.isDataListExpanded = !this.isDataListExpanded;
    },
    selectReportPeriod(period) {
      this.selectedPeriod = period;
      this.isDataListExpanded = false;
    },
    toggleChartType() {
      this.isBarChart = !this.isBarChart;
    },
    downloadChart() {
      if (!this.$refs.chart) return;

      const canvas = this.$refs.chart.$el;
      const link = document.createElement('a');
      link.download = `doanh-thu-${this.selectedPeriod}-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    },
    async loadSummaryData() {
      try {
        try {
          const response = await API.get(`Admin/revenue-report`);
          const data = response.data;

          this.allRevenueData = data.map(item => ({
            date: new Date(item.date),
            revenue: item.revenue
          }));

        } catch (apiError) {
          console.warn("API error, using demo data:", apiError);
          this.allRevenueData = this.generateDemoData();
        }

        const years = [...new Set(this.allRevenueData.map(item => item.date.getFullYear()))];
        this.availableYears = years.sort((a, b) => b - a);

        if (this.availableYears.length > 0) {
          this.selectedYear = this.availableYears[0];
        }

        this.filterDataByYear();

      } catch (error) {
        console.error("Error loading revenue data:", error);
        alert("Failed to load revenue data.");
      }
    },
    generateDemoData() {
      const data = [];
      const today = new Date();
      const currentYear = today.getFullYear();

      // Generate data for current year and previous 2 years
      for (let year = currentYear - 2; year <= currentYear; year++) {
        // Generate 30 days of data for each year
        for (let i = 0; i < 365; i += 12) { // Sparse data for demo
          const date = new Date(year, 0, 1);
          date.setDate(date.getDate() + i);

          // Generate random revenue between 1M and 10M
          const revenue = Math.floor(Math.random() * 9000000) + 1000000;

          data.push({
            date: new Date(date),
            revenue: revenue
          });
        }
      }

      return data;
    }
  },
  mounted() {
    this.loadSummaryData();
  }
};
</script>

<style>
/* Import Bootstrap Icons */
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css");

/* Custom styling */
.revenue-card {
  transition: all 0.3s ease;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.revenue-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12) !important;
}

.icon-box {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.icon-box i {
  font-size: 1.5rem;
}

.revenue-card:hover .icon-box {
  transform: scale(1.1);
}

.card {
  border-radius: 1rem;
  transition: all 0.3s ease;
}

.card-header {
  border-top-left-radius: 1rem !important;
  border-top-right-radius: 1rem !important;
}

.btn-check:checked+.btn-outline-primary {
  background-color: #0d6efd;
  color: white;
}

/* Table styling */
.table th {
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.5px;
}

.table tbody tr {
  transition: all 0.2s ease;
}

.table tbody tr:hover {
  background-color: rgba(13, 110, 253, 0.05) !important;
}

/* Animation */
.pulse-animation {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(13, 110, 253, 0.4);
  }

  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(13, 110, 253, 0);
  }

  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(13, 110, 253, 0);
  }
}

/* Background gradient */
.bg-gradient {
  background: linear-gradient(145deg, #ffffff, #f8f9fa);
}

/* Period selector styling */
.period-selector .btn {
  padding: 0.6rem 1rem;
  transition: all 0.3s ease;
}

.period-selector .btn:hover {
  transform: translateY(-2px);
}

.period-selector .btn-check:checked+.btn {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(13, 110, 253, 0.2);
}

/* Date filter styling */
.date-filter .form-select {
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  border-color: #dee2e6;
  box-shadow: none;
  transition: all 0.2s ease;
}

.date-filter .form-select:focus {
  border-color: #86b7fe;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .icon-box {
    width: 50px;
    height: 50px;
  }

  .icon-box i {
    font-size: 1.25rem;
  }

  .card-body {
    padding: 1rem;
  }

  h3.card-title {
    font-size: 1.25rem;
  }

  .period-selector .btn {
    padding: 0.4rem 0.6rem;
    font-size: 0.9rem;
  }
}

/* Currency styling */
.currency-value {
  font-family: inherit;
  font-feature-settings: "tnum";
  font-variant-numeric: tabular-nums;
}
</style>
