<template>
  <div>
    <!-- Hero Section with Carousel -->
    <section class="hero-section">
      <div id="heroCarousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide-to="0"
            class="active"
          ></button>
          <button
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide-to="1"
          ></button>
          <button
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide-to="2"
          ></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src="@/assets/hero1.png"
              class="d-block w-100"
              alt="Sports Field 1"
              loading="lazy"
            />
          </div>
          <div class="carousel-item">
            <img
              src="@/assets/hero2.png"
              class="d-block w-100"
              alt="Sports Field 2"
              loading="lazy"
            />
          </div>
          <div class="carousel-item">
            <img
              src="@/assets/hero3.png"
              class="d-block w-100"
              alt="Sports Field 3"
              loading="lazy"
            />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon"></span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon"></span>
        </button>

        <!-- Search Overlay -->
        <div class="hero-overlay">
          <div class="container">
            <h1 class="hero-title">{{ t("home.hero.title") }}</h1>
            <p class="hero-subtitle">{{ t("home.hero.subtitle") }}</p>
            <div class="search-container">
              <div class="search-box">
                <i class="bi bi-search"></i>
                <input
                  type="text"
                  :placeholder="t('home.hero.search_placeholder')"
                />
                <button class="search-btn">
                  {{ t("home.hero.search_button") }}
                </button>
              </div>
              <router-link to="/nearby-stadiums" class="nearby-btn">
                <i class="bi bi-geo-alt"></i>
                {{ t("home.hero.nearby_button") }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="about section">
      <div class="container section-title" data-aos="fade-up">
        <h2>{{ t("home.about.title") }}</h2>
        <div>
          <span>{{ t("home.about.subtitle") }}</span>
        </div>
      </div>

      <div class="container" data-aos="fade-up" data-aos-delay="100">
        <div class="row content align-items-center">
          <div class="col-lg-6" data-aos="fade-up" data-aos-delay="150">
            <h3>{{ t("home.about.main_title") }}</h3>
            <p>{{ t("home.about.description_1") }}</p>
            <p>{{ t("home.about.description_2") }}</p>
          </div>
          <div
            class="col-lg-6 pt-4 pt-lg-0"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div class="feature-boxes">
              <div class="feature-box">
                <i class="bi bi-calendar-check"></i>
                <div class="feature-content">
                  <h4>{{ t("home.about.features.easy_booking.title") }}</h4>
                  <p>{{ t("home.about.features.easy_booking.description") }}</p>
                </div>
              </div>

              <div class="feature-box">
                <i class="bi bi-geo-alt"></i>
                <div class="feature-content">
                  <h4>{{ t("home.about.features.prime_locations.title") }}</h4>
                  <p>
                    {{ t("home.about.features.prime_locations.description") }}
                  </p>
                </div>
              </div>

              <div class="feature-box">
                <i class="bi bi-people"></i>
                <div class="feature-content">
                  <h4>{{ t("home.about.features.community_events.title") }}</h4>
                  <p>
                    {{ t("home.about.features.community_events.description") }}
                  </p>
                </div>
              </div>

              <div class="feature-box">
                <i class="bi bi-shield-check"></i>
                <div class="feature-content">
                  <h4>{{ t("home.about.features.secure_platform.title") }}</h4>
                  <p>
                    {{ t("home.about.features.secure_platform.description") }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="how-it-works section">
      <div class="container section-title" data-aos="fade-up">
        <h2>{{ t("home.how_it_works.title") }}</h2>
        <div>
          <span>{{ t("home.how_it_works.subtitle") }}</span>
        </div>
      </div>
      <div class="container" data-aos="fade" data-aos-delay="100">
        <div class="steps-container">
          <div class="step" data-aos="fade-up" data-aos-delay="200">
            <div class="step-icon">
              <i class="bi bi-search"></i>
            </div>
            <h3>{{ t("home.how_it_works.steps.find.title") }}</h3>
            <p>{{ t("home.how_it_works.steps.find.description") }}</p>
          </div>
          <div class="step" data-aos="fade-up" data-aos-delay="300">
            <div class="step-icon">
              <i class="bi bi-calendar-check"></i>
            </div>
            <h3>{{ t("home.how_it_works.steps.book.title") }}</h3>
            <p>{{ t("home.how_it_works.steps.book.description") }}</p>
          </div>
          <div class="step" data-aos="fade-up" data-aos-delay="400">
            <div class="step-icon">
              <i class="bi bi-trophy"></i>
            </div>
            <h3>{{ t("home.how_it_works.steps.play.title") }}</h3>
            <p>{{ t("home.how_it_works.steps.play.description") }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Stadiums Section -->
    <section class="featured-stadiums section">
      <div class="container section-title" data-aos="fade-up">
        <h2>{{ t("home.stadiums.title") }}</h2>
        <div>
          <span>{{ t("home.stadiums.subtitle") }}</span>
        </div>
      </div>
      <div class="container" data-aos="fade" data-aos-delay="100">
        <div class="stadium-grid">
          <div
            v-for="stadium in stadiums"
            :key="stadium.stadiumId"
            class="stadium-card"
          >
            <div class="stadium-image">
              <img
                :src="stadium.image"
                :alt="stadium.stadiumName"
                loading="lazy"
                @error="onImageError"
              />
            </div>
            <div class="stadium-content">
              <h3>{{ stadium.stadiumName }}</h3>
              <div class="stadium-info">
                <p><i class="bi bi-geo-alt-fill"></i> {{ stadium.address }}</p>
              </div>
              <div class="stadium-actions">
                <button
                  class="view-details-btn"
                  @click="viewFields(stadium.stadiumId, stadium.stadiumName)"
                >
                  {{ t("home.stadiums.view_fields") }}
                </button>
                <button
                  class="book-now-btn"
                  @click="bookingMultiSlots(stadium.stadiumId)"
                >
                  {{ t("home.stadiums.book_now") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact section">
      <div class="container section-title" data-aos="fade-up">
        <h2>{{ t("home.contact.title") }}</h2>
        <div>
          <span>{{ t("home.contact.subtitle") }}</span>
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
                <h3>{{ t("home.contact.address.title") }}</h3>
                <p>{{ t("home.contact.address.value") }}</p>
              </div>
            </div>
            <div
              class="info-item d-flex"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <i class="bi bi-telephone flex-shrink-0"></i>
              <div>
                <h3>{{ t("home.contact.phone.title") }}</h3>
                <p>{{ t("home.contact.phone.value") }}</p>
              </div>
            </div>
            <div
              class="info-item d-flex"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <i class="bi bi-envelope flex-shrink-0"></i>
              <div>
                <h3>{{ t("home.contact.email.title") }}</h3>
                <p>{{ t("home.contact.email.value") }}</p>
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
import API from "@/utils/axios";

export default {
  data() {
    return {
      stadiums: [],
    };
  },
  methods: {
    async fetchStadiums() {
      try {
        const response = await API.get("/Stadium");
        this.stadiums = response.data;
      } catch (error) {
        console.error("Error fetching stadium data:", error);
      }
    },
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    },
    prevSlide() {
      this.currentSlide =
        (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    },
    goToSlide(index) {
      this.currentSlide = index;
    },
    startAutoplay() {
      this.autoplayInterval = setInterval(() => {
        this.nextSlide();
      }, 5000);
    },
    stopAutoplay() {
      if (this.autoplayInterval) {
        clearInterval(this.autoplayInterval);
      }
    },
    handleImageError(index) {
      // Xử lý lỗi khi ảnh không tải được, thay bằng ảnh dự phòng
      console.warn(`Không thể tải ảnh cho slide ${index + 1}`);
      this.slides[index].image =
        "https://via.placeholder.com/1200x600?text=Image+Not+Found"; // Ảnh dự phòng
    },
    bookingMultiSlots(stadiumId) {
      this.$router.push({
        name: "booking-by-date",
        params: { stadiumId: stadiumId },
      });
    },
    viewFields(stadiumId, stadiumName) {
      this.$router.push({
        name: "field-on-stadium",
        params: { stadiumId },
        query: { stadiumName },
      });
    },
    onImageError(event) {
      event.target.src = this.defaultImage;
    },
  },
  async mounted() {
    await this.fetchStadiums();
  },
};
</script>

<style scoped>
/* Hero Section Styles (Giữ nguyên) */
.hero-section {
  position: relative;
  height: 80vh;
  margin-top: -80px; /* Adjust this value based on your header height */
}

.carousel {
  height: 100%;
}

.carousel-item {
  height: 80vh;
}

.carousel-item img {
  object-fit: cover;
  height: 100%;
  width: 100%;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  text-align: center;
  color: white;
  height: 80vh;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.search-container {
  max-width: 800px;
  margin: 0 auto;
}

.search-box {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 50px;
  padding: 8px 20px;
  margin-bottom: 20px;
  gap: 10px;
}

.search-box i {
  color: #666;
  margin-right: 10px;
}

.search-box input {
  flex: 1;
  border: none;
  padding: 10px;
  font-size: 1rem;
}

.search-box input:focus {
  outline: none;
}

.search-btn {
  background: #28a745;
  color: white;
  border: none;
  padding: 10px 30px;
  border-radius: 25px;
  cursor: pointer;
  transition: background 0.3s;
}

.search-btn:hover {
  background: #218838;
}

.location-btn {
  background: none;
  border: none;
  color: #666;
  padding: 8px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.location-btn:hover {
  color: #28a745;
}

.quick-filters {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.filter-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid white;
  padding: 8px 20px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
}

.filter-btn:hover {
  background: white;
  color: #28a745;
}

/* General Section Styles */
.section {
  padding: 80px 0;
}

/* How It Works Styles */
.how-it-works {
  background: #f8f9fa;
}

.steps-container {
  display: flex;
  justify-content: space-around;
  gap: 30px;
  margin-top: 20px;
}

.step {
  text-align: center;
  flex: 1;
  max-width: 300px;
}

.step-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  background: #28a745;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-icon i {
  font-size: 2rem;
  color: white;
}

.step h3 {
  color: #2c3e50;
  margin-bottom: 15px;
}

/* Featured Stadiums Styles */
.stadium-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  padding: 20px;
}

.stadium-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.stadium-card:hover {
  transform: translateY(-5px);
}

.stadium-image {
  position: relative;
  height: 200px;
}

.stadium-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.stadium-content {
  padding: 20px;
}

.stadium-content h3 {
  margin-bottom: 15px;
  color: #2c3e50;
  font-size: 1.2rem;
  font-weight: 600;
}

.stadium-info {
  margin-bottom: 15px;
}

.stadium-info p {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #666;
  margin: 0;
  font-size: 0.9rem;
}

.stadium-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
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

/* Contact Section Styles */
.info-item {
  margin-bottom: 20px;
}

.info-item i {
  font-size: 1.5rem;
  color: #28a745;
  margin-right: 15px;
}

.info-item h3 {
  font-size: 1.2rem;
  color: #2c3e50;
}

.info-item p {
  color: #666;
}

.map-container iframe {
  width: 100%;
  height: 400px;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .steps-container {
    flex-direction: column;
    align-items: center;
  }

  .step {
    max-width: 100%;
  }

  .search-box {
    flex-direction: column;
    padding: 15px;
  }

  .search-box input {
    width: 100%;
    margin: 10px 0;
  }

  .search-btn {
    width: 100%;
  }
}

/* About Section Styles */
.about {
  padding: 80px 0;
}

.about .content {
  padding: 10px 0;
}

.about .content h3 {
  font-weight: 600;
  font-size: 28px;
  color: #2c3e50;
  margin-bottom: 20px;
}

.about .content p {
  margin: 15px 0;
  color: #6c757d;
  font-size: 18px;
  line-height: 1.6;
}

.about .feature-boxes {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  padding: 20px 0;
}

.about .feature-box {
  display: flex;
  align-items: flex-start;
  padding: 25px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.about .feature-box:nth-child(even) {
  transform: translateY(30px);
}

.about .feature-box:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.12);
}

.about .feature-box:nth-child(even):hover {
  transform: translateY(25px);
}

.about .feature-box i {
  font-size: 28px;
  padding: 15px;
  color: #28a745;
  margin-right: 20px;
  background: rgba(40, 167, 69, 0.08);
  border-radius: 8px;
  transition: 0.3s;
}

.about .feature-box:hover i {
  background: #28a745;
  color: #fff;
}

.about .feature-content {
  flex: 1;
}

.about .feature-content h4 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #2c3e50;
}

.about .feature-content p {
  font-size: 15px;
  margin: 0;
  line-height: 1.7;
  color: #6c757d;
}

@media (max-width: 991px) {
  .about {
    padding: 60px 0;
  }

  .about .feature-boxes {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 0;
  }

  .about .feature-box {
    padding: 20px;
  }

  .about .feature-box:nth-child(even) {
    transform: translateY(0);
  }

  .about .feature-box:nth-child(even):hover {
    transform: translateY(-5px);
  }

  .about .feature-box i {
    font-size: 24px;
    padding: 12px;
    margin-right: 15px;
  }

  .about .feature-content h4 {
    font-size: 18px;
  }

  .about .feature-content p {
    font-size: 14px;
  }
}

/* Remove unused CSS */
.stadium-filters,
.filter-tab,
.filter-tab i,
.filter-tab:hover,
.filter-tab.active {
  display: none;
}

/* Update CSS */
.nearby-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.9);
  color: #2c3e50;
  border: none;
  padding: 12px 30px;
  border-radius: 25px;
  font-weight: 600;
  margin: 0 auto 20px;
  max-width: fit-content;
  text-decoration: none;
  transition: all 0.3s;
}

.nearby-btn i {
  font-size: 1.2rem;
}

.nearby-btn:hover {
  background: #28a745;
  color: white;
  transform: translateY(-2px);
}
</style>
