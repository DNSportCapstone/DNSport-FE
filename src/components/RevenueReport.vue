<template>
  <div class="revenue-report">
    <h2>Doanh thu báo cáo</h2>

    <!-- Thông tin doanh thu chính -->
    <div class="overview">
      <div class="card">
        <div class="card-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        </div>
        <h3>Tổng doanh thu</h3>
        <p>{{ formatCurrency(totalRevenue) }}</p>
      </div>
      <div class="card">
        <div class="card-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>
        </div>
        <h3>Số lượng đơn</h3>
        <p>{{ totalBookings }}</p>
      </div>
      <div class="card">
        <div class="card-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
        </div>
        <h3>Doanh thu trung bình</h3>
        <p>{{ formatCurrency(averageRevenue) }}</p>
      </div>
    </div>

    <!-- Báo cáo theo thời gian -->
    <div class="report-time">
      <h3>Báo cáo theo thời gian</h3>
      <div class="time-selectors">
        <button @click="selectReportPeriod('daily')" :class="{ active: selectedPeriod === 'daily' }">Hàng ngày</button>
        <button @click="selectReportPeriod('monthly')" :class="{ active: selectedPeriod === 'monthly' }">Hàng tháng</button>
        <button @click="selectReportPeriod('yearly')" :class="{ active: selectedPeriod === 'yearly' }">Hàng năm</button>
      </div>

      <div v-if="selectedPeriodData" class="period-data">
        <div class="data-header">
          <h4>{{ selectedPeriod }} Doanh thu</h4>
          <button @click="toggleDataList" class="toggle-button">
            <span v-if="!isDataListExpanded">Xem chi tiết</span>
            <span v-else>Thu gọn</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              :class="{ 'rotate-180': isDataListExpanded }"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>

        <transition name="slide">
          <ul v-if="isDataListExpanded" class="data-list">
            <li v-for="item in selectedPeriodData" :key="item.date">
              <span class="date">{{ item.date }}</span>
              <span class="revenue">{{ formatCurrency(item.revenue) }}</span>
            </li>
          </ul>
        </transition>

        <div v-if="!isDataListExpanded" class="data-summary">
          <div class="summary-item">
            <span>Tổng số mục:</span>
            <span class="summary-value">{{ selectedPeriodData.length }}</span>
          </div>
          <div class="summary-item">
            <span>Tổng doanh thu:</span>
            <span class="summary-value">{{ formatCurrency(totalPeriodRevenue) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Biểu đồ doanh thu -->
    <div class="chart-container">
      <h3>Biểu đồ xu hướng doanh thu</h3>
      <BarChart :data="chartData" />
      <div class="overview">
        <div class="card">
          <div class="highest-revenue">
            <div class="card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
            </div>
            <h3>Doanh thu cao nhất</h3>
            <p>{{ formatCurrency(highestRevenue) }} (Thời gian: {{ highestTime }})</p>
          </div>
        </div>
        <div class="card">
          <div class="card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>
          </div>
          <h3>Số lượng đơn</h3>
          <p>{{ totalBookings }}</p>
        </div>
        <div class="card">
          <div class="highest-revenue">
            <div class="card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
            </div>
            <h3>Doanh thu thấp nhất</h3>
            <p>{{ formatCurrency(lowestRevenue) }} (Thời gian: {{ lowestTime }})</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { Bar } from "vue-chartjs";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default {
  components: {
    BarChart: Bar
  },
  setup() {
    // Dữ liệu mẫu
    const revenueData = {
      totalRevenue: 15000000,
      totalBookings: 500,
      daily: [
        { date: "2025-03-01", revenue: 500000 },
        { date: "2025-03-02", revenue: 600000 },
        { date: "2025-03-03", revenue: 400000 },
        { date: "2025-03-04", revenue: 550000 },
        { date: "2025-03-05", revenue: 650000 },
        { date: "2025-03-06", revenue: 700000 },
        { date: "2025-03-07", revenue: 750000 },
        { date: "2025-03-08", revenue: 800000 },
        { date: "2025-03-09", revenue: 850000 },
        { date: "2025-03-10", revenue: 900000 },
        { date: "2025-03-11", revenue: 950000 },
        { date: "2025-03-12", revenue: 1000000 },
        { date: "2025-03-13", revenue: 1050000 },
        { date: "2025-03-14", revenue: 1100000 },
        { date: "2025-03-15", revenue: 1150000 },
      ],
      monthly: [
        { date: "2025-01", revenue: 8000000 },
        { date: "2025-02", revenue: 9500000 },
        { date: "2025-03", revenue: 10000000 },
        { date: "2025-04", revenue: 12000000 },
        { date: "2025-05", revenue: 13000000 },
        { date: "2025-06", revenue: 14000000 },
        { date: "2025-07", revenue: 15000000 },
        { date: "2025-08", revenue: 16000000 },
        { date: "2025-09", revenue: 17000000 },
        { date: "2025-10", revenue: 18000000 },
        { date: "2025-11", revenue: 19000000 },
        { date: "2025-12", revenue: 20000000 },
      ],
      yearly: [
        { date: "2023", revenue: 120000000 },
        { date: "2024", revenue: 140000000 },
        { date: "2025", revenue: 150000000 },
        { date: "2026", revenue: 160000000 },
        { date: "2027", revenue: 170000000 },
      ],
    };

    // Tính toán doanh thu trung bình
    const averageRevenue = computed(() => {
      return revenueData.totalRevenue / revenueData.totalBookings;
    });

    // State for collapsible data list
    const isDataListExpanded = ref(false);

    // Toggle data list visibility
    const toggleDataList = () => {
      isDataListExpanded.value = !isDataListExpanded.value;
    };

    // Chọn loại báo cáo
    const selectedPeriod = ref("daily");
    const selectedPeriodData = ref(revenueData.daily);
    const highestRevenue = ref(Math.max(...revenueData.daily.map(item => item.revenue)));
    const highestTime = ref(revenueData.daily.find(item => item.revenue === highestRevenue.value).date);
    const lowestRevenue = ref(Math.min(...revenueData.daily.map(item => item.revenue)));
    const lowestTime = ref(revenueData.daily.find(item => item.revenue === lowestRevenue.value).date);

    // Calculate total revenue for the selected period
    const totalPeriodRevenue = computed(() => {
      return selectedPeriodData.value.reduce((sum, item) => sum + item.revenue, 0);
    });

    // Hàm chuyển đổi báo cáo
    const selectReportPeriod = (period) => {
      selectedPeriod.value = period;
      selectedPeriodData.value = revenueData[period];
      highestRevenue.value = Math.max(...revenueData[period].map(item => item.revenue));
      highestTime.value = revenueData[period].find(item => item.revenue === highestRevenue.value).date;
      lowestRevenue.value = Math.min(...revenueData[period].map(item => item.revenue));
      lowestTime.value = revenueData[period].find(item => item.revenue === lowestRevenue.value).date;
      // Reset expanded state when changing periods
      isDataListExpanded.value = false;
    };

    // Cấu hình biểu đồ
    const chartData = computed(() => {
      return {
        labels: selectedPeriodData.value.map(item => item.date),
        datasets: [
          {
            label: "Doanh thu",
            data: selectedPeriodData.value.map(item => item.revenue),
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      };
    });

    return {
      totalRevenue: revenueData.totalRevenue,
      totalBookings: revenueData.totalBookings,
      averageRevenue,
      selectedPeriodData,
      selectedPeriod,
      selectReportPeriod,
      chartData,
      highestRevenue,
      highestTime,
      lowestRevenue,
      lowestTime,
      isDataListExpanded,
      toggleDataList,
      totalPeriodRevenue
    };
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
    },
  },
};
</script>

<style scoped>
.revenue-report {
  padding: 30px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

h2 {
  text-align: center;
  font-size: 28px;
  color: #2c3e50;
  margin-bottom: 30px;
  font-weight: 600;
}

h3 {
  font-size: 18px;
  color: #4a5568;
  margin-bottom: 15px;
  font-weight: 500;
}

h4 {
  font-size: 16px;
  color: #4a5568;
  margin: 15px 0;
  font-weight: 500;
}

.overview {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  gap: 20px;
}

.card {
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 32%;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.card-icon {
  background-color: #ebf8ff;
  color: #3182ce;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
}

.card:nth-child(2) .card-icon {
  background-color: #e6fffa;
  color: #38b2ac;
}

.card:nth-child(3) .card-icon {
  background-color: #faf5ff;
  color: #805ad5;
}

.card h3 {
  margin-bottom: 10px;
  font-size: 16px;
  color: #718096;
}

.card p {
  font-size: 24px;
  font-weight: 700;
  color: #2d3748;
  margin: 0;
}

.report-time {
  background-color: white;
  padding: 25px;
  border-radius: 10px;
  margin-bottom: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.time-selectors {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.time-selectors button {
  padding: 10px 20px;
  border: none;
  background-color: #edf2f7;
  color: #4a5568;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.time-selectors button:hover {
  background-color: #e2e8f0;
}

.time-selectors button.active {
  background-color: #4299e1;
  color: white;
}

.period-data {
  background-color: #f7fafc;
  padding: 15px;
  border-radius: 8px;
}

.data-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.toggle-button {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 16px;
  background-color: #4299e1;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.toggle-button:hover {
  background-color: #3182ce;
}

.toggle-button svg {
  transition: transform 0.3s ease;
}

.toggle-button svg.rotate-180 {
  transform: rotate(180deg);
}

.data-list {
  list-style: none;
  padding: 0;
  margin: 0;
  border-top: 1px solid #e2e8f0;
  padding-top: 15px;
}

.data-list li {
  display: flex;
  justify-content: space-between;
  padding: 12px 15px;
  border-bottom: 1px solid #edf2f7;
  transition: background-color 0.2s;
}

.data-list li:last-child {
  border-bottom: none;
}

.data-list li:hover {
  background-color: #edf2f7;
}

.date {
  font-weight: 500;
  color: #4a5568;
}

.revenue {
  font-weight: 600;
  color: #38a169;
}

.data-summary {
  padding: 15px;
  background-color: #edf2f7;
  border-radius: 8px;
  margin-top: 10px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.summary-item:last-child {
  margin-bottom: 0;
}

.summary-value {
  font-weight: 600;
  color: #38a169;
}

.chart-container {
  background-color: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-top: 30px;
}

.highest-revenue {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;
  flex-direction: column;
  align-items: center;
}

/* Animation for collapsible content */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
  max-height: 500px;
  overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
}

@media (max-width: 768px) {
  .overview {
    flex-direction: column;
  }

  .card {
    width: 100%;
    margin-bottom: 15px;
  }

  .time-selectors {
    flex-wrap: wrap;
  }

  .time-selectors button {
    flex: 1;
    min-width: 100px;
  }
}
</style>
