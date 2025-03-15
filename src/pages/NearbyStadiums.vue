<template>
  <div class="section">
    <!-- Section Title -->
    <div class="container section-title" data-aos="fade-up">
      <h2>{{ t("Nearby Stadiums") }}</h2>
      <div>
        <span class="description-title">{{ t("PlanYourGameDay") }}</span>
      </div>
    </div>
    <!-- End Section Title -->

    <div class="container">
      <div v-if="loading"></div>
      <div v-else-if="stadiums.length === 0">No stadiums found.</div>

      <div v-else class="stadium-grid">
        <div
          v-for="stadium in stadiums"
          :key="stadium.stadiumId"
          class="stadium-card"
        >
          <img :src="stadium.image" alt="Stadium Image" class="stadium-image" />
          <div class="stadium-info">
            <h3>{{ stadium.stadiumName }}</h3>
            <p>{{ stadium.address }}</p>
            <p><strong>Distance:</strong> {{ stadium.distance }}</p>
            <p><strong>Duration:</strong> {{ stadium.duration }}</p>
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
import API from "@/utils/axios";

export default {
  data() {
    return {
      userLocation: "",
      stadiums: [],
      loading: true,
    };
  },
  async mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        this.userLocation = `${lat},${lng}`;

        try {
          const response = await API.get("/GoMaps/nearby-stadiums", {
            params: { userLocation: this.userLocation },
          });

          // Sắp xếp stadiums theo distance tăng dần
          this.stadiums = response.data.sort((a, b) => {
            return a.distance - b.distance;
          });
        } catch (error) {
          console.error("Error fetching nearby stadiums:", error);
        } finally {
          this.loading = false;
        }
      });
    } else {
      alert("Geolocation is not supported by this browser.");
      this.loading = false;
    }
  },
};
</script>

<style scoped>
.stadium-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
}

.stadium-card {
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stadium-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
}

.stadium-info {
  padding: 10px;
  text-align: center;
}

.stadium-info h3 {
  margin-bottom: 10px;
}

.stadium-info p {
  margin-bottom: 5px;
}
</style>
