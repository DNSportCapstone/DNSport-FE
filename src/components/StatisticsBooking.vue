<template>
  <div class="statistics-booking">
    <h1>Booking Statistics</h1>
    <div class="chart-container">
      <div class="chart-item">
        <h3>Booking Trends</h3>
        <Line :data="bookingTrendsData" :options="chartOptions" :height="300" />
      </div>

      <div class="chart-item">
        <h3>Top Booked Courts</h3>
        <Bar :data="topCourtsData" :options="chartOptions" :height="300" />
      </div>

      <div class="chart-item">
        <h3>Top Renters</h3>
        <Bar :data="topRentersData" :options="chartOptions" :height="300" />
      </div>

      <div class="chart-item">
        <h3>Peak Booking Months</h3>
        <Doughnut
          :data="peakBookingMonthsData"
          :options="doughnutOptions"
          :height="300"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Line, Bar, Doughnut } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement
);

export default {
  name: "StatisticsBooking",
  components: {
    Line,
    Bar,
    Doughnut,
  },
  data() {
    return {
      bookingTrendsData: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Bookings",
            data: [20, 35, 40, 60, 70, 90],
            borderColor: "#42A5F5",
            backgroundColor: "rgba(66, 165, 245, 0.2)",
            borderWidth: 2,
            tension: 0.4,
            fill: true,
          },
        ],
      },

      topCourtsData: {
        labels: ["Court A", "Court B", "Court C"],
        datasets: [
          {
            label: "Number of Bookings",
            data: [150, 200, 180],
            backgroundColor: ["#42A5F5", "#66BB6A", "#FFCA28"],
            borderColor: ["#42A5F5", "#66BB6A", "#FFCA28"],
            borderWidth: 1,
            barPercentage: 0.6,
          },
        ],
      },

      topRentersData: {
        labels: ["John Doe", "Jane Smith", "Mark Lee"],
        datasets: [
          {
            label: "Rentals",
            data: [12, 15, 9],
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            borderColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            borderWidth: 1,
            barPercentage: 0.6,
          },
        ],
      },

      peakBookingMonthsData: {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            label: "Booking Frequency",
            data: [25, 20, 15, 30, 35, 50],
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#FF9F40",
              "#4BC0C0",
              "#F0F0F0",
            ],
            borderWidth: 2,
          },
        ],
      },

      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        interaction: {
          mode: "index",
          intersect: false,
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              drawBorder: false,
              color: "#f0f0f0",
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            position: "top",
            labels: {
              usePointStyle: true,
              padding: 20,
            },
          },
          tooltip: {
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            titleColor: "#333",
            bodyColor: "#666",
            borderColor: "#ddd",
            borderWidth: 1,
            padding: 10,
            displayColors: true,
          },
        },
      },

      doughnutOptions: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        plugins: {
          legend: {
            display: true,
            position: "right",
            labels: {
              usePointStyle: true,
              padding: 20,
            },
          },
          tooltip: {
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            titleColor: "#333",
            bodyColor: "#666",
            borderColor: "#ddd",
            borderWidth: 1,
            padding: 10,
          },
        },
        cutout: "60%",
      },
    };
  },
};
</script>

<style scoped>
.statistics-booking {
  padding: 40px;
  background-color: #f5f5f5;
  font-family: Arial, sans-serif;
  min-height: 100vh;
}

h1 {
  font-size: 28px;
  margin-bottom: 30px;
  color: #333;
  text-align: center;
  font-weight: 600;
}

h3 {
  font-size: 22px;
  margin-bottom: 20px;
  color: #333;
  font-weight: 500;
}

.chart-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  justify-items: center;
  align-items: start;
}

.chart-item {
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 600px;
  text-align: center;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.chart-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .statistics-booking {
    padding: 20px;
  }

  h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }

  .chart-container {
    grid-template-columns: 1fr;
  }

  .chart-item {
    padding: 20px;
    margin-bottom: 20px;
  }

  h3 {
    font-size: 18px;
    margin-bottom: 15px;
  }
}
</style>
