<template>
  <div>
    <!-- Hero Section -->
    <HeroSection> </HeroSection>

    <!-- About Section -->
    <section id="about" class="about section">
      <div class="container" data-aos="fade-up" data-aos-delay="100">
        <div class="row align-items-xl-center gy-5">
          <div class="col-xl-5 content">
            <h3>About Us</h3>
            <h2>Your Premier Sports Field Booking Platform</h2>
            <p>
              {{ t("AboutUsDescription") }}
            </p>
          </div>
          <div class="col-xl-7">
            <div class="row gy-4 icon-boxes">
              <div class="col-md-6" data-aos="fade-up" data-aos-delay="200">
                <div class="icon-box">
                  <i class="bi bi-calendar-check"></i>
                  <h3>Easy Booking</h3>
                  <p>
                    Book your preferred sports field with just a few clicks.
                  </p>
                </div>
              </div>
              <div class="col-md-6" data-aos="fade-up" data-aos-delay="300">
                <div class="icon-box">
                  <i class="bi bi-geo-alt"></i>
                  <h3>Convenient Locations</h3>
                  <p>Find sports fields in convenient locations near you.</p>
                </div>
              </div>
              <div class="col-md-6" data-aos="fade-up" data-aos-delay="400">
                <div class="icon-box">
                  <i class="bi bi-people"></i>
                  <h3>Community Events</h3>
                  <p>
                    Join community events and meet other sports enthusiasts.
                  </p>
                </div>
              </div>
              <div class="col-md-6" data-aos="fade-up" data-aos-delay="500">
                <div class="icon-box">
                  <i class="bi bi-shield"></i>
                  <h3>Secure Payments</h3>
                  <p>Make secure payments through our platform.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="features section">
      <div class="container">
        <div class="row gy-4">
          <div
            class="col-lg-3 col-md-4"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div class="features-item">
              <i class="bi bi-trophy" style="color: #ffbb2c"></i>
              <h3><a href="" class="stretched-link">Top Facilities</a></h3>
            </div>
          </div>
          <div
            class="col-lg-3 col-md-4"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div class="features-item">
              <i class="bi bi-clock" style="color: #5578ff"></i>
              <h3><a href="" class="stretched-link">Flexible Scheduling</a></h3>
            </div>
          </div>
          <div
            class="col-lg-3 col-md-4"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div class="features-item">
              <i class="bi bi-heart" style="color: #e80368"></i>
              <h3><a href="" class="stretched-link">Customer Support</a></h3>
            </div>
          </div>
          <div
            class="col-lg-3 col-md-4"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div class="features-item">
              <i class="bi bi-star" style="color: #e361ff"></i>
              <h3><a href="" class="stretched-link">User Reviews</a></h3>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section id="stats" class="stats section light-background">
      <div class="container" data-aos="fade-up" data-aos-delay="100">
        <div class="row gy-4">
          <div class="col-lg-3 col-md-6 d-flex flex-column align-items-center">
            <i class="bi bi-emoji-smile"></i>
            <div class="stats-item">
              <span
                data-purecounter-start="0"
                data-purecounter-end="500"
                data-purecounter-duration="1"
                class="purecounter"
              ></span>
              <p>Happy Clients</p>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 d-flex flex-column align-items-center">
            <i class="bi bi-journal-richtext"></i>
            <div class="stats-item">
              <span
                data-purecounter-start="0"
                data-purecounter-end="1000"
                data-purecounter-duration="1"
                class="purecounter"
              ></span>
              <p>Bookings</p>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 d-flex flex-column align-items-center">
            <i class="bi bi-headset"></i>
            <div class="stats-item">
              <span
                data-purecounter-start="0"
                data-purecounter-end="2000"
                data-purecounter-duration="1"
                class="purecounter"
              ></span>
              <p>Hours Of Support</p>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 d-flex flex-column align-items-center">
            <i class="bi bi-people"></i>
            <div class="stats-item">
              <span
                data-purecounter-start="0"
                data-purecounter-end="50"
                data-purecounter-duration="1"
                class="purecounter"
              ></span>
              <p>Sports Fields</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Gallery Section -->
    <section id="gallery" class="gallery section">
      <div class="container section-title" data-aos="fade-up">
        <h2>Stadium</h2>
        <div>
          <span>Our</span> <span class="description-title">Stadium</span>
        </div>
      </div>
      <div class="container" data-aos="fade-up" data-aos-delay="100">
        <div class="row g-0">
          <div>
            <div v-if="stadiums.length" class="stadium-grid">
              <div
                v-for="stadium in stadiums"
                :key="stadium.stadiumId"
                class="stadium-card"
              >
                <img
                  :src="stadium.image"
                  alt="Stadium Image"
                  class="stadium-image"
                  loading="lazy"
                  @error="onImageError"
                />
                <div class="stadium-info">
                  <h3>{{ stadium.stadiumName }}</h3>
                  <p>{{ stadium.address }}</p>
                  <button class="btn btn-dns-primary">View Detail</button>
                  <button
                    class="btn btn-dns-secondary"
                    @click="bookingMultiSlots(stadium.stadiumId)"
                  >
                    Booking Now
                  </button>
                </div>
              </div>
            </div>
            <div v-else>
              <p>Loading...</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact section">
      <div class="container section-title" data-aos="fade-up">
        <h2>Contact</h2>
        <div>
          <span>Get In</span> <span class="description-title">Touch</span>
        </div>
      </div>
      <div class="container" data-aos="fade" data-aos-delay="100">
        <div class="row gy-4">
          <!-- Phần thông tin liên hệ bên trái -->
          <div class="col-lg-4">
            <div
              class="info-item d-flex"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <i class="bi bi-geo-alt flex-shrink-0"></i>
              <div>
                <h3>Address</h3>
                <p>
                  137 Nguyễn Thị Thập street, Liên Chiểu district, Đà Nẵng city.
                </p>
              </div>
            </div>
            <div
              class="info-item d-flex"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <i class="bi bi-telephone flex-shrink-0"></i>
              <div>
                <h3>Call Us</h3>
                <p>+1 234 567 890</p>
              </div>
            </div>
            <div
              class="info-item d-flex"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <i class="bi bi-envelope flex-shrink-0"></i>
              <div>
                <h3>Email Us</h3>
                <p>dnsport2025@gmail.com</p>
              </div>
            </div>
          </div>

          <!-- Phần bản đồ bên phải -->
          <div class="col-lg-8">
            <div class="map-container" data-aos="fade-up" data-aos-delay="200">
              <iframe
                width="100%"
                height="400"
                style="border: 0"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.7925869653195!2d108.25067467600928!3d16.02116673909486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219e3fddf5e3b%3A0x815aebebf1293ae5!2sFPT%20City%20Da%20Nang!5e0!3m2!1sen!2s!4v1709833456789"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<script>
import HeroSection from "@/components/HeroSection.vue";
import API from "@/utils/axios";

export default {
  components: {
    HeroSection,
  },
  data() {
    return {
      stadiums: [],
      defaultImage:
        "data:image/jpeg;base64,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",
    };
  },
  async mounted() {
    await this.fetchStadiums();
  },
  methods: {
    async fetchStadiums() {
      try {
        const response = await API.get("/Stadium");
        this.stadiums = response.data;
        console.log("List of stadiums:", this.stadiums);
      } catch (error) {
        console.error("Error fetching stadium data:", error);
      }
    },
    bookingMultiSlots(stadiumId) {
      this.$router.push({
        name: "booking-by-date",
        params: { stadiumId: stadiumId },
      });
    },
    onImageError(event) {
      event.target.src = this.defaultImage;
    },
  },
};
</script>

<style>
.hero-content {
  text-align: center;
  padding: 100px 20px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
}

.search-bar {
  margin-top: 20px;
}

.search-bar input {
  padding: 10px;
  width: 300px;
  border: none;
  border-radius: 5px;
}

.search-bar button {
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.stadium-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.stadium-card {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  transition: transform 0.3s ease;
}

.stadium-card:hover {
  transform: scale(1.05);
}

.stadium-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.stadium-info {
  margin-top: 10px;
}

.btn-primary {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.promo-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.promo-form .form-control {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.promo-form .btn-primary {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
}
</style>
