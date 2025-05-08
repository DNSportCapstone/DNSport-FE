<template>
  <div class="section">
    <!-- Section Title -->
    <div class="container section-title" data-aos="fade-up">
      <h2>{{ t("FieldDetails") }}</h2>
      <div>
        <span class="description-title">{{ t("FieldDetails") }}</span>
      </div>
    </div>

    <div class="fd-main container-fluid">
      <div class="row fd-main-row">
        <!-- Image Gallery -->
        <div class="col-lg-6 col-12 fd-gallery-col">
          <div class="fd-gallery-card">
            <img :src="selectedImage" alt="Field" class="fd-main-image" />
            <div class="fd-thumbnails">
              <img
                v-for="(image, index) in field.imageUrls"
                :key="index"
                :src="image"
                :alt="'Thumbnail ' + (index + 1)"
                class="fd-thumbnail"
                :class="{ active: selectedImage === image }"
                @click="changeImage(image, true)"
              />
            </div>
          </div>
        </div>

        <!-- Field Info Card -->
        <div class="col-lg-6 col-12 fd-info-col">
          <div class="fd-info-card">
            <h2 class="fd-info-title">
              {{ field.fieldName }}
            </h2>
            <div class="fd-pricing">
              <div class="fd-price-item">
                <i class="bi bi-sun-fill text-warning"></i>
                <span
                  >{{ CommonHelper.formatVND(field.dayPrice) }}
                  <span class="fd-price-unit">/giờ (Ban ngày)</span></span
                >
              </div>
              <div class="fd-price-item">
                <i class="bi bi-moon-fill text-primary"></i>
                <span
                  >{{ CommonHelper.formatVND(field.nightPrice) }}
                  <span class="fd-price-unit">/giờ (Ban đêm)</span></span
                >
              </div>
            </div>
            <button class="fd-book-btn" @click="bookNow(field.fieldId)">
              Đặt sân ngay
            </button>
            <div class="fd-features">
              <h5>Thông tin sân</h5>
              <p>{{ field.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Reviews -->
      <section class="fd-reviews-section">
        <h3 class="fd-reviews-title">
          <i class="bi bi-chat-dots"></i> Đánh giá khách hàng
        </h3>
        <div v-if="reviews.length" class="fd-reviews-list">
          <div
            v-for="(review, index) in reviews"
            :key="index"
            class="fd-review-row"
          >
            <div class="fd-review-row-header">
              <span class="fd-review-name">{{ review.fullName }}</span>
              <span class="fd-review-date">{{ formatDate(review.time) }}</span>
            </div>
            <div class="fd-review-rating">
              <span v-for="n in 5" :key="n">
                <i
                  class="bi"
                  :class="
                    n <= review.ratingValue
                      ? 'bi-star-fill text-warning'
                      : 'bi-star text-muted'
                  "
                ></i>
              </span>
            </div>
            <div class="fd-review-comment">{{ review.comment }}</div>
          </div>
        </div>
        <div v-else class="fd-no-reviews">
          <p>Chưa có đánh giá nào. Hãy là người đầu tiên!</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<script>
import CommonHelper from "@/utils/common";
import API from "@/utils/axios";

export default {
  data() {
    return {
      field: {
        description: "", // Mô tả sân bóng
        dayPrice: 0, // Giá sân ban ngày
        nightPrice: 0, // Giá sân ban đêm
        imageUrls: [], // Danh sách ảnh
      },
      selectedImage: "", // Ảnh chính hiển thị
      currentIndex: 0, // Chỉ số ảnh hiện tại
      intervalId: null, // ID của interval
      reviews: [], // danh sách review
    };
  },
  methods: {
    async fetchFieldReview(fieldId) {
      // Gọi API để lấy chi tiết sân
      var response = await API.get(`/rating/comments/${fieldId}`);
      console.log(response.data);
      this.reviews = response.data;
    },
    async fetchFieldDetails(fieldId) {
      // Gọi API để lấy chi tiết sân
      var response = await API.get(`/Field/${fieldId}`);
      console.log(response.data);
      this.field = response.data;
      this.selectedImage = this.field.imageUrls[0]; // Ảnh đầu tiên làm mặc định
      this.startSlideshow();
    },
    changeImage(image, manual = false) {
      this.selectedImage = image;
      this.currentIndex = this.field.imageUrls.indexOf(image);
      if (manual) {
        this.restartSlideshow();
      }
    },
    nextImage() {
      this.currentIndex = (this.currentIndex + 1) % this.field.imageUrls.length;
      this.selectedImage = this.field.imageUrls[this.currentIndex];
    },
    startSlideshow() {
      if (this.intervalId) clearInterval(this.intervalId);
      this.intervalId = setInterval(this.nextImage, 3000); // Tự động đổi ảnh sau 3 giây
    },
    restartSlideshow() {
      clearInterval(this.intervalId);
      this.startSlideshow();
    },
    bookNow(id) {
      this.$router.push({
        name: "booking-schedule",
        params: { fieldId: id },
      });
    },
    formatDate(dateString) {
      if (!dateString) return "";
      const date = new Date(dateString);
      const pad = (n) => n.toString().padStart(2, "0");
      return `${pad(date.getDate())}/${pad(
        date.getMonth() + 1
      )}/${date.getFullYear()} ${pad(date.getHours())}:${pad(
        date.getMinutes()
      )}`;
    },
  },
  async mounted() {
    const { fieldId } = this.$route.params;
    await this.fetchFieldDetails(fieldId);
    await this.fetchFieldReview(fieldId);
  },

  beforeUnmount() {
    clearInterval(this.intervalId);
  },
};
</script>

<style>
.field-details-page {
  min-height: 100vh;
  background: linear-gradient(120deg, #f8f9fa 60%, #e6f7ee 100%);
}

.fd-header {
  background: #fff;
  border-bottom: 2px solid #0dd70d22;
  padding: 32px 0 16px 0;
  margin-bottom: 16px;
}
.fd-header-content {
  display: flex;
  align-items: center;
  gap: 18px;
  max-width: 1200px;
  margin: 0 auto;
}
.fd-header-icon {
  font-size: 2.5rem;
  color: #0dd70d;
}
.fd-title {
  font-size: 2.2rem;
  font-weight: 800;
  color: #1a237e;
  margin-bottom: 0.2rem;
  letter-spacing: 1px;
}
.fd-subtitle {
  font-size: 1.1rem;
  color: #0dd70d;
  font-weight: 600;
}

.fd-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 12px;
}
.fd-main-row {
  margin-bottom: 32px;
  align-items: stretch;
}
.fd-gallery-col {
  display: flex;
  align-items: center;
  justify-content: center;
}
.fd-gallery-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px 0 rgba(44, 62, 80, 0.08);
  padding: 18px 18px 12px 18px;
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.fd-main-image {
  width: 100%;
  height: 320px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px 0 rgba(13, 215, 13, 0.08);
  transition: transform 0.3s;
}
.fd-main-image:hover {
  transform: scale(1.03);
}
.fd-thumbnails {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  width: 100%;
  padding-bottom: 4px;
}
.fd-thumbnail {
  width: 70px;
  height: 50px;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: border 0.2s, transform 0.2s;
}
.fd-thumbnail.active,
.fd-thumbnail:hover {
  border: 2px solid #0dd70d;
  transform: translateY(-2px) scale(1.04);
}

.fd-info-col {
  display: flex;
  align-items: center;
  justify-content: center;
}
.fd-info-card {
  background: #fff;
  border-radius: 20px;
  border: 1.5px solid #0dd70d33;
  box-shadow: 0 6px 24px 0 rgba(13, 215, 13, 0.08),
    0 1.5px 4px 0 rgba(44, 62, 80, 0.04);
  padding: 32px 28px 24px 28px;
  width: 100%;
  max-width: 420px;
  transition: box-shadow 0.3s, border 0.3s;
}
.fd-info-title {
  font-size: 1.7rem;
  font-weight: 700;
  color: #1a237e;
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  text-align: center;
}
.fd-info-icon {
  color: #0dd70d;
  font-size: 1.5rem;
}
.fd-pricing {
  margin-bottom: 18px;
}
.fd-price-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.15rem;
  margin-bottom: 6px;
  color: #222;
}
.fd-price-unit {
  color: #888;
  font-size: 0.98rem;
}
.fd-book-btn {
  width: 100%;
  background: #28a745;
  color: #fff;
  font-size: 1.15rem;
  font-weight: 700;
  border: none;
  border-radius: 10px;
  padding: 12px 0;
  margin-bottom: 18px;
  margin-top: 8px;
  box-shadow: 0 2px 8px 0 rgba(13, 215, 13, 0.08);
  transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
  cursor: pointer;
}
.fd-book-btn:hover {
  background: #218838;
  color: #fff;
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 4px 16px 0 rgba(13, 215, 13, 0.13);
}
.fd-features {
  margin-top: 10px;
}
.fd-features h5 {
  font-size: 1.1rem;
  color: #1a237e;
  font-weight: 700;
  margin-bottom: 8px;
}
.fd-features ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.fd-features li {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #222;
  margin-bottom: 6px;
  font-size: 1rem;
}
.fd-features i {
  color: #0dd70d;
  font-size: 1.1rem;
}

/* Reviews */
.fd-reviews-section {
  margin-top: 32px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px 0 rgba(44, 62, 80, 0.06);
  padding: 28px 18px 18px 18px;
}
.fd-reviews-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1a237e;
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.fd-reviews-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 12px;
}
.fd-review-row {
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 10px;
}
.fd-review-row:last-child {
  border-bottom: none;
}
.fd-review-row-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  font-weight: 600;
  color: #1a237e;
}
.fd-review-date {
  font-size: 0.95rem;
  color: #888;
  font-weight: 400;
}
.fd-review-rating {
  margin: 2px 0 2px 0;
}
.fd-review-comment {
  color: #222;
  font-size: 1rem;
  margin-top: 2px;
}
.fd-no-reviews {
  text-align: center;
  color: #888;
  font-size: 1.05rem;
  padding: 18px 0 6px 0;
}

@media (max-width: 991px) {
  .fd-main-row {
    flex-direction: column;
    gap: 24px;
  }
  .fd-gallery-card,
  .fd-info-card {
    max-width: 100%;
  }
}
@media (max-width: 600px) {
  .fd-header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  .fd-title {
    font-size: 1.3rem;
  }
  .fd-main-image {
    height: 180px;
  }
  .fd-info-card {
    padding: 18px 8px 12px 8px;
  }
  .fd-reviews-section {
    padding: 14px 4px 8px 4px;
  }
}
</style>
