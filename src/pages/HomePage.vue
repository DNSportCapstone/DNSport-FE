<template>
  <div class="home-page">
    <!-- Hero Section with Carousel -->
    <section class="hero-section">
      <div class="carousel">
        <div
          class="carousel-inner"
          :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
        >
          <div
            class="carousel-item"
            v-for="(slide, index) in slides"
            :key="index"
          >
            <img
              :src="slide.image"
              :alt="slide.alt"
              @error="handleImageError(index)"
            />
            <div class="carousel-caption">
              <h2>{{ slide.title }}</h2>
              <p>{{ slide.subtitle }}</p>
            </div>
          </div>
        </div>
        <button class="carousel-control prev" @click="prevSlide">
          <i class="bi bi-chevron-left"></i>
        </button>
        <button class="carousel-control next" @click="nextSlide">
          <i class="bi bi-chevron-right"></i>
        </button>
        <div class="carousel-indicators">
          <button
            v-for="(slide, index) in slides"
            :key="index"
            :class="{ active: currentSlide === index }"
            @click="goToSlide(index)"
          ></button>
        </div>
      </div>
      <div class="search-overlay">
        <div class="search-container">
          <h1>Find Your Perfect Sports Field</h1>
          <p>Book sports facilities instantly with our easy-to-use platform</p>
          <div class="search-box">
            <input
              type="text"
              placeholder="Search by location or sport type..."
            />
            <button class="search-btn">
              <i class="bi bi-search"></i>
            </button>
          </div>
          <div class="quick-filters">
            <button class="filter-btn">Football</button>
            <button class="filter-btn">Basketball</button>
            <button class="filter-btn">Tennis</button>
            <button class="filter-btn">Badminton</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Sports Section -->
    <section class="featured-sports">
      <div class="container">
        <div class="section-header">
          <h2>Popular Sports</h2>
          <p>Find your favorite sport and start booking</p>
        </div>
        <div class="sports-grid">
          <div class="sport-card">
            <div class="sport-icon">
              <i class="bi bi-trophy"></i>
            </div>
            <h3>Football</h3>
            <p>20+ Fields Available</p>
            <button class="sport-btn">View Fields</button>
          </div>
          <div class="sport-card">
            <div class="sport-icon">
              <i class="bi bi-basketball"></i>
            </div>
            <h3>Basketball</h3>
            <p>15+ Courts Available</p>
            <button class="sport-btn">View Courts</button>
          </div>
          <div class="sport-card">
            <div class="sport-icon">
              <i class="bi bi-circle"></i>
            </div>
            <h3>Tennis</h3>
            <p>10+ Courts Available</p>
            <button class="sport-btn">View Courts</button>
          </div>
          <div class="sport-card">
            <div class="sport-icon">
              <i class="bi bi-circle-half"></i>
            </div>
            <h3>Badminton</h3>
            <p>12+ Courts Available</p>
            <button class="sport-btn">View Courts</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Stadiums Section -->
    <section class="featured-stadiums">
      <div class="container">
        <div class="section-header">
          <h2>Featured Stadiums</h2>
          <p>Discover our top-rated sports facilities</p>
        </div>
        <div class="stadium-grid">
          <div
            v-for="stadium in stadiums"
            :key="stadium.stadiumId"
            class="stadium-card"
          >
            <div class="stadium-image">
              <img :src="stadium.image" :alt="stadium.stadiumName" />
              <div class="stadium-badge">Popular</div>
            </div>
            <div class="stadium-content">
              <h3>{{ stadium.stadiumName }}</h3>
              <p class="location">
                <i class="bi bi-geo-alt"></i> {{ stadium.address }}
              </p>
              <div class="stadium-features">
                <span><i class="bi bi-people"></i> Up to 20 players</span>
                <span><i class="bi bi-clock"></i> 24/7 Available</span>
              </div>
              <div class="stadium-actions">
                <button class="btn-view">View Details</button>
                <button class="btn-book">Book Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="how-it-works">
      <div class="container">
        <div class="section-header">
          <h2>How It Works</h2>
          <p>Book your sports field in three simple steps</p>
        </div>
        <div class="steps-container">
          <div class="step">
            <div class="step-icon">
              <i class="bi bi-search"></i>
            </div>
            <h3>Search</h3>
            <p>Find your preferred sports field by location or sport type</p>
          </div>
          <div class="step">
            <div class="step-icon">
              <i class="bi bi-calendar-check"></i>
            </div>
            <h3>Book</h3>
            <p>Select your preferred date and time slot</p>
          </div>
          <div class="step">
            <div class="step-icon">
              <i class="bi bi-credit-card"></i>
            </div>
            <h3>Pay</h3>
            <p>Complete your booking with secure payment</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Special Offers Section -->
    <section class="special-offers">
      <div class="container">
        <div class="section-header">
          <h2>Special Offers</h2>
          <p>Exclusive deals for sports enthusiasts</p>
        </div>
        <div class="offers-grid">
          <div class="offer-card">
            <div class="offer-badge">20% OFF</div>
            <h3>Early Bird Booking</h3>
            <p>Book morning slots before 10 AM</p>
            <button class="offer-btn">Learn More</button>
          </div>
          <div class="offer-card">
            <div class="offer-badge">15% OFF</div>
            <h3>Weekend Package</h3>
            <p>Special rates for weekend bookings</p>
            <button class="offer-btn">Learn More</button>
          </div>
          <div class="offer-card">
            <div class="offer-badge">25% OFF</div>
            <h3>Group Booking</h3>
            <p>Discounts for group reservations</p>
            <button class="offer-btn">Learn More</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>Ready to Book Your Sports Field?</h2>
          <p>Join thousands of sports enthusiasts who trust our platform</p>
          <button class="cta-button">Get Started Now</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import API from "@/utils/axios";

export default {
  data() {
    return {
      stadiums: [],
      currentSlide: 0,
      autoplayInterval: null,
      slides: [
        {
          image: require("@/assets/hero1.png"), // Đảm bảo file tồn tại trong src/assets/
          alt: "Sports Field 1",
          title: "Premium Sports Facilities",
          subtitle: "Book your favorite sports field today",
        },
        {
          image: require("@/assets/hero2.png"),
          alt: "Sports Field 2",
          title: "Professional Courts",
          subtitle: "Experience top-notch sports venues",
        },
        {
          image: require("@/assets/hero3.png"),
          alt: "Sports Field 3",
          title: "24/7 Booking Available",
          subtitle: "Book anytime, anywhere",
        },
      ],
    };
  },
  async mounted() {
    await this.fetchStadiums();
    this.startAutoplay();
  },
  beforeUnmount() {
    this.stopAutoplay();
  },
  methods: {
    async fetchStadiums() {
      try {
        const response = await API.get("/Stadium");
        this.stadiums = response.data || []; // Đảm bảo dữ liệu trả về là mảng
        console.log("List of stadiums:", this.stadiums);
      } catch (error) {
        console.error("Error fetching stadium data:", error);
        this.stadiums = []; // Đặt mặc định là mảng rỗng nếu có lỗi
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
  },
};
</script>

<style>
/* Global Styles */
:root {
  --primary-color: #28a745;
  --primary-dark: #218838;
  --primary-light: #34ce57;
  --primary-bg: rgba(40, 167, 69, 0.1);
  --text-dark: #2c3e50;
  --text-light: #6c757d;
  --white: #ffffff;
  --gray-100: #f8f9fa;
  --gray-200: #e9ecef;
  --gray-300: #dee2e6;
}

.home-page {
  overflow-x: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-header {
  text-align: center;
  margin-bottom: 50px;
}

.section-header h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 15px;
}

.section-header p {
  font-size: 1.1rem;
  color: var(--text-light);
}

/* Hero Section */
.hero-section {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.carousel {
  position: relative;
  width: 100%;
  height: 100%;
}

.carousel-inner {
  display: flex;
  transition: transform 0.5s ease-in-out;
  height: 100%;
  z-index: 0;
}

.carousel-item {
  min-width: 100%;
  /* position: relative; */
}

.carousel-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* display: block !important; */
}

.carousel-caption {
  position: absolute;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: white;
  z-index: 2;
}

.carousel-caption h2 {
  font-size: 3rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.carousel-caption p {
  font-size: 1.5rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.3);
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 3;
}

.carousel-control:hover {
  background: rgba(255, 255, 255, 0.5);
}

.carousel-control.prev {
  left: 20px;
}

.carousel-control.next {
  right: 20px;
}

.carousel-indicators {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 3;
}

.carousel-indicators button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid white;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}

.carousel-indicators button.active {
  background: white;
  transform: scale(1.2);
}

.search-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.search-container {
  text-align: center;
  color: white;
  max-width: 800px;
  padding: 0 20px;
}

.search-container h1 {
  font-size: 3.5rem;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.search-container p {
  font-size: 1.2rem;
  margin-bottom: 40px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.search-box {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  max-width: 600px;
  margin: 0 auto 20px;
}

.search-box input {
  flex: 1;
  padding: 15px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.search-btn {
  padding: 15px 30px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.search-btn:hover {
  background: #0056b3;
}

.quick-filters {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 20px;
}

.filter-btn {
  padding: 8px 20px;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 20px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

/* Featured Sports Section */
.featured-sports {
  padding: 80px 0;
  background: var(--white);
}

.sports-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.sport-card {
  background: var(--white);
  padding: 30px;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.sport-card:hover {
  transform: translateY(-5px);
}

.sport-icon {
  width: 80px;
  height: 80px;
  background: var(--primary-bg);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.sport-icon i {
  font-size: 2rem;
  color: var(--primary-color);
}

.sport-card h3 {
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: var(--text-dark);
}

.sport-card p {
  color: var(--text-light);
  margin-bottom: 20px;
}

.sport-btn {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 10px 25px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.sport-btn:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
}

/* Featured Stadiums Section */
.featured-stadiums {
  padding: 80px 0;
  background: var(--gray-100);
}

.stadium-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.stadium-card {
  background: var(--white);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.stadium-card:hover {
  transform: translateY(-10px);
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

.stadium-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  background: var(--primary-color);
  color: var(--white);
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
}

.stadium-content {
  padding: 20px;
}

.stadium-content h3 {
  font-size: 1.4rem;
  margin-bottom: 10px;
  color: var(--text-dark);
}

.location {
  color: var(--text-light);
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.stadium-features {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  color: var(--text-light);
  font-size: 0.9rem;
}

.stadium-actions {
  display: flex;
  gap: 10px;
}

.btn-view,
.btn-book {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
}

.btn-view {
  background: var(--gray-100);
  color: var(--text-dark);
}

.btn-book {
  background: var(--primary-color);
  color: var(--white);
}

.btn-view:hover {
  background: var(--gray-200);
}

.btn-book:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
}

/* How It Works Section */
.how-it-works {
  padding: 80px 0;
  background: var(--white);
}

.steps-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  text-align: center;
}

.step {
  padding: 30px;
}

.step-icon {
  width: 80px;
  height: 80px;
  background: var(--primary-bg);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.step-icon i {
  font-size: 2rem;
  color: var(--primary-color);
}

.step h3 {
  font-size: 1.3rem;
  margin-bottom: 15px;
  color: var(--text-dark);
}

.step p {
  color: var(--text-light);
}

/* Special Offers Section */
.special-offers {
  padding: 80px 0;
  background: var(--gray-100);
}

.offers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.offer-card {
  background: var(--white);
  padding: 30px;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.offer-badge {
  position: absolute;
  top: 20px;
  right: -30px;
  background: var(--primary-color);
  color: white;
  padding: 5px 30px;
  transform: rotate(45deg);
  font-weight: 600;
}

.offer-card h3 {
  font-size: 1.4rem;
  margin: 20px 0 10px;
  color: var(--text-dark);
}

.offer-card p {
  color: var(--text-light);
  margin-bottom: 20px;
}

.offer-btn {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 10px 25px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.offer-btn:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
}

/* CTA Section */
.cta-section {
  padding: 80px 0;
  background: linear-gradient(rgba(40, 167, 69, 0.9), rgba(40, 167, 69, 0.9));
  background-size: cover;
  background-position: center;
  color: var(--white);
  text-align: center;
}

.cta-content {
  max-width: 600px;
  margin: 0 auto;
}

.cta-content h2 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.cta-content p {
  font-size: 1.1rem;
  margin-bottom: 30px;
}

.cta-button {
  padding: 15px 40px;
  background: var(--white);
  color: var(--primary-color);
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cta-button:hover {
  transform: translateY(-3px);
  background: var(--gray-100);
}

/* Responsive Design */
@media (max-width: 768px) {
  .carousel-caption h2 {
    font-size: 2rem;
  }

  .carousel-caption p {
    font-size: 1.2rem;
  }

  .section-header h2 {
    font-size: 2rem;
  }

  .stadium-actions {
    flex-direction: column;
  }

  .steps-container,
  .sports-grid,
  .offers-grid {
    grid-template-columns: 1fr;
  }

  .carousel-control {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }

  .search-container h1 {
    font-size: 2.5rem;
  }

  .search-box {
    flex-direction: column;
  }

  .search-btn {
    width: 100%;
  }
}
</style>
