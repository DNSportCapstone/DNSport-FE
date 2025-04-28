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
              v-for="(image, index) in field.imageUrls"
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
          <h2 class="mb-3">Sân 5 Người</h2>
          <!-- Tên sân có thể thay đổi -->
          <p class="text-muted mb-4">{{ field.description }}</p>
          <div class="mb-3">
            <span class="h4 me-2"
              >{{ CommonHelper.formatVND(field.dayPrice) }} /giờ (Ban
              ngày)</span
            >
          </div>
          <div class="mb-3">
            <span class="h4 me-2"
              >{{ CommonHelper.formatVND(field.nightPrice) }} /giờ (Ban
              đêm)</span
            >
          </div>

          <button class="btn btn-primary btn-lg mb-3 me-2" @click="bookField">
            <i class="bi bi-cart-plus"></i> Đặt sân ngay
          </button>

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

      <!-- Đánh giá và Bình luận -->
      <div class="mt-5">
        <h4>Đánh giá của khách hàng</h4>

        <div v-if="reviews.length">
          <div
            v-for="(review, index) in reviews"
            :key="index"
            class="card mb-3"
          >
            <div class="card-body">
              <h5 class="card-title">{{ review.name }}</h5>
              <p class="card-text">
                <span v-for="n in 5" :key="n">
                  <i
                    class="bi"
                    :class="
                      n <= review.rating
                        ? 'bi-star-fill text-warning'
                        : 'bi-star text-muted'
                    "
                  ></i>
                </span>
              </p>
              <p class="card-text">{{ review.comment }}</p>
            </div>
          </div>
        </div>
        <div v-else>
          <p>Chưa có đánh giá nào. Hãy là người đầu tiên!</p>
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
    bookField() {
      alert(`Bạn đã đặt sân thành công!`);
    },
  },
  async mounted() {
    const { fieldId } = this.$route.params;
    await this.fetchFieldDetails(fieldId);
    this.reviews = [
      {
        name: "Nguyễn Văn A",
        rating: 5,
        comment: "Sân đẹp, cỏ êm, đèn sáng, sẽ quay lại!",
      },
      {
        name: "Trần Thị B",
        rating: 4,
        comment: "Sân ổn, tuy nhiên nhà vệ sinh hơi nhỏ.",
      },
      {
        name: "Lê Văn C",
        rating: 5,
        comment: "Mặt sân cực kỳ chất lượng, nhân viên thân thiện!",
      },
      {
        name: "Phạm Thị D",
        rating: 3,
        comment: "Sân hơi xa trung tâm, bù lại giá hợp lý.",
      },
    ];
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
