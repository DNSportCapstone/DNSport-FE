<template>
  <div class="section">
    <!-- Section Title -->
    <div class="container section-title" data-aos="fade-up">
      <h2>Field</h2>
      <div>
        <span class="description-title">{{ t("FieldDetails") }}</span>
      </div>
    </div>
    <!-- End Section Title -->

    <div class="container">
      <div>
        <button
          class="btn btn-dns-primary btn-lg mb-3 me-2"
          @click="this.$router.push(returnPath)"
        >
          <font-awesome-icon :icon="['fas', 'arrow-left']" /> Back
        </button>
      </div>
      <div class="row">
        <!-- Hình ảnh sân bóng -->
        <div class="col-md-6 mb-4">
          <img
            :src="selectedImage"
            alt="Field"
            class="img-fluid rounded mb-3 product-image"
          />
          <div class="d-flex">
            <img
              v-for="(image, index) in field.images"
              :key="index"
              :src="image"
              :alt="'Thumbnail ' + (index + 1)"
              class="thumbnail rounded"
              :class="{ active: selectedImage === image }"
              @click="changeImage(image, true)"
            />
          </div>
        </div>

        <!-- Thông tin sân bóng -->
        <div class="col-md-6">
          <h2 class="mb-3">{{ field.name }}</h2>
          <p class="text-muted mb-4">{{ field.address }}</p>
          <div class="mb-3">
            <span class="h4 me-2"
              >{{ CommonHelper.formatVND(field.price) }} /giờ</span
            >
          </div>
          <p class="mb-4">{{ field.description }}</p>

          <!-- <button class="btn btn-primary btn-lg mb-3 me-2" @click="bookField">
            <i class="bi bi-cart-plus"></i> Đặt sân ngay
          </button>

          <button class="btn btn-outline-secondary btn-lg mb-3">
            <i class="bi bi-heart"></i> Yêu thích
          </button> -->

          <div class="mt-4">
            <h5>Thông tin sân:</h5>
            <ul>
              <li>Diện tích: 40m x 20m</li>
              <li>Mặt sân: Cỏ nhân tạo cao cấp</li>
              <li>Hệ thống đèn chiếu sáng</li>
              <li>Phòng thay đồ, nhà vệ sinh sạch sẽ</li>
            </ul>
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
import CommonHelper from "@/utils/common";
export default {
  data() {
    return {
      fieldId: 0,
      field: {
        name: "",
        address: "",
        price: 0,
        description: "",
        images: [],
        returnPath: "",
      },
      selectedImage: "", // Ảnh chính hiển thị
      currentIndex: 0, // Chỉ số ảnh hiện tại
      intervalId: null, // ID của interval
    };
  },
  methods: {
    fetchFieldDetails(fieldId, returnPath) {
      // Giả lập dữ liệu, có thể thay bằng API
      this.returnPath = returnPath;
      this.field = {
        name: `Sân Bóng #${fieldId}`,
        address: "Địa chỉ sân",
        price: 200000,
        description: "Sân cỏ nhân tạo chất lượng cao, rộng rãi.",
        images: [
          `https://munichgroup.vn/wp-content/uploads/2024/11/san-bong-chuyen-dep.webp`,
          `https://munichgroup.vn/wp-content/uploads/2024/11/san-bong-chuyen-dep-14.webp`,
          `https://munichgroup.vn/wp-content/uploads/2024/11/san-bong-chuyen-dep-12.webp`,
          `https://munichgroup.vn/wp-content/uploads/2024/11/san-bong-chuyen-dep-16.webp`,
        ],
      };
      this.selectedImage = this.field.images[0]; // Ảnh đầu tiên làm mặc định
      this.startSlideshow();
    },
    changeImage(image, manual = false) {
      this.selectedImage = image;
      this.currentIndex = this.field.images.indexOf(image);
      if (manual) {
        this.restartSlideshow();
      }
    },
    nextImage() {
      this.currentIndex = (this.currentIndex + 1) % this.field.images.length;
      this.selectedImage = this.field.images[this.currentIndex];
    },
    startSlideshow() {
      if (this.intervalId) clearInterval(this.intervalId);
      this.intervalId = setInterval(this.nextImage, 3000); // Tự động đổi ảnh sau 3 giây
    },
    restartSlideshow() {
      clearInterval(this.intervalId);
      this.startSlideshow();
    },
    bookField() {
      alert(`Bạn đã đặt sân ${this.field.name} thành công!`);
    },
  },
  mounted() {
    const { fieldId, returnPath } = this.$route.params;
    this.fetchFieldDetails(fieldId, returnPath);
  },
  beforeUnmount() {
    clearInterval(this.intervalId);
  },
};
</script>

<style>
.thumbnail {
  width: 80px;
  height: 60px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}
.thumbnail:hover,
.thumbnail.active {
  border: 2px solid #0dd70d;
}
.product-image {
  width: 100% !important;
}
</style>
