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
                />
                <div class="stadium-info">
                  <h3>{{ stadium.stadiumName }}</h3>
                  <p>{{ stadium.address }}</p>
                  <button class="btn btn-primary">View Detail</button>
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
                <p>123 Sports Avenue, City, Country</p>
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
                <p>info@sportsbooking.com</p>
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
  <!-- Promo Subscription Section -->
  <section id="promo" class="promo section">
    <div class="container section-title">
      <h2>Get Promotions</h2>
      <p>Subscribe to receive the latest promotions and discounts.</p>
    </div>
    <div class="container">
      <form class="promo-form">
        <div class="row gy-4">
          <div class="col-md-6">
            <input
              type="text"
              class="form-control"
              placeholder="Your Name"
              required
            />
          </div>
          <div class="col-md-6">
            <input
              type="email"
              class="form-control"
              placeholder="Your Email"
              required
            />
          </div>
          <div class="col-md-12 text-center">
            <button type="submit" class="btn btn-primary">Subscribe</button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<script>
import axios from "axios";
import HeroSection from "@/components/HeroSection.vue";

export default {
  components: {
    HeroSection,
  },
  data() {
    return {
      stadiums: [],
    };
  },
  async mounted() {
    await this.fetchStadiums();
  },
  methods: {
    async fetchStadiums() {
      try {
        const response = await axios.get("https://localhost:44394/api/Stadium");
        this.stadiums = response.data;
        console.log("List of stadiums:", this.stadiums);
      } catch (error) {
        console.error("Error fetching stadium data:", error);
      }
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
