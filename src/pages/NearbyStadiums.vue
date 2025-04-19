<template>
  <div class="nearby-stadiums container py-5">
    <h2 class="text-center mb-5">Sân vận động gần bạn</h2>

    <!-- Loading State -->
    <div v-if="loading" class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Đang tải dữ liệu...</span>
      </div>
      <p class="mt-3">Đang tải dữ liệu...</p>
    </div>

    <!-- No Stadiums Found -->
    <div v-else-if="stadiums.length === 0" class="text-center text-muted">
      <i class="bi bi-emoji-frown display-1"></i>
      <p class="mt-3">Không tìm thấy sân vận động nào gần bạn.</p>
    </div>

    <!-- Stadiums List -->
    <div v-else class="row g-4">
      <div
        v-for="stadium in stadiums"
        :key="stadium.stadiumId"
        class="col-md-6 col-lg-4"
      >
        <div class="card stadium-card h-100">
          <img :src="stadium.image" class="card-img-top" alt="Stadium Image" />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title text-primary">{{ stadium.stadiumName }}</h5>
            <p class="card-text text-muted mb-3">{{ stadium.address }}</p>
            <div
              class="distance-info d-flex justify-content-between text-muted mb-3"
            >
              <span>
                <i class="bi bi-signpost"></i> {{ stadium.distance }}
              </span>
              <span> <i class="bi bi-clock"></i> {{ stadium.duration }} </span>
            </div>
            <div class="stadium-actions mt-auto">
              <button class="view-details-btn">View Details</button>
              <button
                class="book-now-btn"
                @click="bookingMultiSlots(stadium.stadiumId)"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="margin-bottom: 320px"></div>
  </div>
</template>

<script>
import API from "@/utils/axios";

export default {
  data() {
    return {
      stadiums: [],
      loading: true,
      userLocation: {
        lat: 16.0544,
        lng: 108.2022,
      },
    };
  },
  methods: {
    async getUserLocation() {
      return new Promise((resolve) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              this.userLocation.lat = position.coords.latitude;
              this.userLocation.lng = position.coords.longitude;
              resolve();
            },
            () => {
              console.warn("Không lấy được vị trí, dùng vị trí mặc định.");
              resolve(); // fallback to Đà Nẵng
            }
          );
        } else {
          console.warn("Trình duyệt không hỗ trợ geolocation.");
          resolve();
        }
      });
    },

    async fetchNearbyStadiums() {
      try {
        const location = `${this.userLocation.lat},${this.userLocation.lng}`;
        const res = await API.get("/GoMaps/nearby-stadiums", {
          params: { userLocation: location },
        });
        this.stadiums = res.data.sort(
          (a, b) => parseFloat(a.distanceValue) - parseFloat(b.distanceValue)
        );
      } catch (err) {
        console.error("Lỗi khi lấy danh sách sân:", err);
      } finally {
        this.loading = false;
      }
    },
    bookingMultiSlots(stadiumId) {
      this.$router.push({
        name: "booking-by-date",
        params: { stadiumId: stadiumId },
      });
    },
  },
  async mounted() {
    await this.getUserLocation();
    await this.fetchNearbyStadiums();
  },
};
</script>

<style scoped>
/* Container Styles */
.nearby-stadiums {
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Card Styles */
.stadium-card {
  border: none;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stadium-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.card-img-top {
  height: 200px;
  object-fit: cover;
}

.card-title {
  font-size: 18px;
  font-weight: bold;
}

.card-text {
  font-size: 14px;
  color: #6c757d;
}

.distance-info {
  font-size: 14px;
  margin-top: 10px;
}

.btn-primary {
  background-color: #007bff;
  border: none;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #0056b3;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .stadium-card {
    margin-bottom: 20px;
  }
}

.stadium-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: auto;
}

.view-details-btn,
.book-now-btn {
  padding: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  font-size: 0.9rem;
}

.view-details-btn {
  background: #f8f9fa;
  color: #2c3e50;
  border: 1px solid #dee2e6;
}

.view-details-btn:hover {
  background: #e9ecef;
}

.book-now-btn {
  background: #28a745;
  color: white;
}

.book-now-btn:hover {
  background: #218838;
}
</style>
