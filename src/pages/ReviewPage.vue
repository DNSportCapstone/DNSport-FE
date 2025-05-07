<template>
  <div class="section">
    <!-- Section Title -->
    <div class="container section-title" data-aos="fade-up">
      <h2>{{ t("review.title") }}</h2>
      <div>
        <span class="description-title">{{ t("review.description") }}</span>
      </div>
    </div>
    <!-- End Section Title -->

    <!-- Main Content -->
    <div class="container">
      <div class="review-form-container">
        <div class="review-form-card">
          <!-- Review Form -->
          <div v-if="canRate" class="review-form">
            <div class="form-header">
              <h2>{{ t("review.form.title") }}</h2>
              <p>{{ t("review.form.description") }}</p>
            </div>

            <!-- Star Rating -->
            <div class="rating-section">
              <StarRating @rating-selected="handleRatingSelected" />
            </div>

            <!-- Comment Input -->
            <div class="comment-section">
              <label for="comment">{{ t("review.form.comment_label") }}</label>
              <textarea
                id="comment"
                v-model="newComment"
                :placeholder="t('review.form.comment_placeholder')"
                rows="4"
              ></textarea>
            </div>

            <!-- Submit Button -->
            <button
              class="submit-btn"
              :disabled="rating === 0 && newComment.trim() === ''"
              @click="submitReview"
            >
              <span v-if="isSubmitting" class="spinner"></span>
              {{
                isSubmitting
                  ? t("review.form.submitting")
                  : t("review.form.submit")
              }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div style="margin-bottom: 67px"></div>
</template>

<script>
import StarRating from "@/components/StarRating.vue";
import CommonHelper from "@/utils/common";
import API from "@/utils/axios";
import { useI18n } from "vue-i18n";
import { showMessageBox } from "@/utils/message-box-service.js";

export default {
  components: { StarRating },
  setup() {
    const { t } = useI18n();
    return { t };
  },
  data() {
    return {
      rating: 0,
      newComment: "",
      bookingId: "",
      userId: null,
      isSubmitting: false,
      canRate: false,
    };
  },
  methods: {
    async fetchUserAndBooking() {
      try {
        this.userId = CommonHelper.getCurrentUserId();

        if (!this.userId) {
          throw new Error("User ID not found.");
        }

        await this.checkCanRate();
      } catch (error) {
        console.error("Error fetching user and booking info:", error);
        showMessageBox({
          title: this.t("error.title"),
          description: this.t("review.error.load_failed"),
          type: "error",
          confirmText: this.t("error.close"),
          showCancel: false,
        });
        this.redirectToBookingHistory();
      }
    },

    async checkCanRate() {
      if (!this.bookingId || !this.userId) return;

      try {
        const { data } = await API.get(
          `/rating/can-rate/${this.bookingId}/${this.userId}`
        );

        if (!data.success || !data.result.canRate) {
          showMessageBox({
            title: this.t("error.title"),
            description: this.t(
              `review.error.${this.getErrorKey(data.result.message)}`
            ),
            type: "error",
            confirmText: this.t("error.close"),
            showCancel: false,
          });
          this.redirectToBookingHistory();
          return;
        }

        this.canRate = true;
      } catch (error) {
        console.error("Error checking rating eligibility:", error);
        showMessageBox({
          title: this.t("error.title"),
          description: this.t("review.error.check_failed"),
          type: "error",
          confirmText: this.t("error.close"),
          showCancel: false,
        });
        this.redirectToBookingHistory();
      }
    },

    getErrorKey(message) {
      if (message.includes("Only successful bookings can be rated")) {
        return "only_successful";
      } else if (
        message.includes("You can only rate after the booked time has passed")
      ) {
        return "after_booking";
      } else if (message.includes("You can only rate once per booking")) {
        return "already_rated";
      }
      return "unknown";
    },

    redirectToBookingHistory() {
      this.$router.push("/booking-history");
    },

    handleRatingSelected(rating) {
      this.rating = rating;
    },

    async submitReview() {
      if (!this.rating && this.newComment.trim() === "") {
        showMessageBox({
          title: this.t("error.title"),
          description: this.t("review.error.rating_required"),
          type: "error",
          confirmText: this.t("error.close"),
          showCancel: false,
        });
        return;
      }

      this.isSubmitting = true;
      try {
        await API.post("/rating/add", {
          userId: this.userId,
          bookingId: this.bookingId,
          ratingValue: this.rating,
          comment: this.newComment,
        });

        showMessageBox(
          {
            description: this.t("review.success.submitted"),
            type: "success",
            confirmText: this.t("error.close"),
            showCancel: false,
          },
          () => {
            this.redirectToBookingHistory();
          }
        );
      } catch (error) {
        console.error("Error submitting review:", error);

        if (error.response && error.response.data.message) {
          const errorMsg = error.response.data.message;
          let errorKey = "review.error.submit_failed";

          if (errorMsg.includes("Only successful bookings can be rated")) {
            errorKey = "review.error.only_successful";
          } else if (
            errorMsg.includes(
              "You can only rate after the booked time has passed"
            )
          ) {
            errorKey = "review.error.after_booking";
          } else if (errorMsg.includes("You can only rate once per booking")) {
            errorKey = "review.error.already_rated";
          }

          showMessageBox({
            title: this.t("error.title"),
            description: this.t(errorKey),
            type: "error",
            confirmText: this.t("error.close"),
            showCancel: false,
          });
        } else {
          showMessageBox({
            title: this.t("error.title"),
            description: this.t("review.error.submit_failed"),
            type: "error",
            confirmText: this.t("error.close"),
            showCancel: false,
          });
        }
      } finally {
        this.isSubmitting = false;
      }
    },
  },
  mounted() {
    this.bookingId = this.$route.params.bookingId;
    if (!this.bookingId) {
      showMessageBox({
        title: this.t("error.title"),
        description: this.t("review.error.missing_booking"),
        type: "error",
        confirmText: this.t("error.close"),
        showCancel: false,
      });
      this.redirectToBookingHistory();
      return;
    }
    this.fetchUserAndBooking();
  },
};
</script>

<style scoped>
.review-form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 0 20px;
}

.review-form-card {
  background: white;
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.form-header {
  text-align: center;
  margin-bottom: 30px;
}

.form-header h2 {
  color: #2c3e50;
  font-size: 1.8rem;
  margin-bottom: 10px;
}

.form-header p {
  color: #6c757d;
}

.alert-message {
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.alert-message.error {
  background: #fff3f3;
  color: #dc3545;
}

.alert-message.success {
  background: #f0fff4;
  color: #28a745;
}

.rating-section {
  text-align: center;
  margin-bottom: 30px;
}

.comment-section {
  margin-bottom: 30px;
}

.comment-section label {
  display: block;
  margin-bottom: 10px;
  color: #2c3e50;
  font-weight: 500;
}

.comment-section textarea {
  width: 100%;
  padding: 15px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
  min-height: 120px;
  transition: all 0.3s ease;
}

.comment-section textarea:focus {
  border-color: #28a745;
  box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
  outline: none;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  background: #218838;
}

.submit-btn:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .review-form-card {
    padding: 30px;
  }

  .form-header h2 {
    font-size: 1.5rem;
  }
}
</style>
