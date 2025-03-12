<template>
  <div class="section">
    <!-- Section Title -->
    <div class="container section-title" data-aos="fade-up">
      <h2>Review</h2>
      <div>
        <span class="description-title">Review & Comments</span>
      </div>
    </div>
    <!-- End Section Title -->

    <div class="review-container">
      <!-- Show error messages from API -->
      <div v-if="errorMessage" class="alert-message error">
        {{ errorMessage }}
      </div>

      <!-- If the user has already rated, show a success message -->
      <div v-if="hasRated" class="alert-message success">
        You have already rated this booking.
      </div>

      <!-- If not rated yet, show the rating form -->
      <div v-else>
        <!-- Star Rating -->
        <div class="rating-section">
          <StarRating @rating-selected="handleRatingSelected" />
        </div>

        <!-- Comment Input -->
        <div class="comment-box">
          <textarea
            v-model="newComment"
            placeholder="Write your review..."
          ></textarea>
        </div>

        <!-- Submit Button -->
        <button
          class="submit-btn"
          :disabled="rating === 0 && newComment.trim() === ''"
          @click="submitReview"
        >
          Submit Review
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import StarRating from "@/components/StarRating.vue";
import CommonHelper from "@/utils/common";
import API from "@/utils/axios";

export default {
  components: { StarRating },
  data() {
    return {
      rating: 0,
      newComment: "",
      hasRated: false,
      bookingId: 1,
      userId: null,
      errorMessage: "",
    };
  },
  methods: {
    async fetchUserAndBooking() {
      try {
        // Get userId from CommonHelper instead of calling API
        this.userId = CommonHelper.getCurrentUserId();
        console.log("User ID:", this.userId);

        if (!this.userId) {
          throw new Error("User ID not found.");
        }

        // const bookingResponse = await API.get("/booking/", {
        //   params: { userId: this.userId },
        // });
        // this.bookingId = bookingResponse.data.bookingId;

        //kiểm tra xem đã đánh giá chưa
        await this.checkIfRated();
      } catch (error) {
        console.error("Error fetching user and booking info:", error);
        this.errorMessage = "Failed to load booking and user information.";
      }
    },
    async checkIfRated() {
      if (!this.bookingId || !this.userId) return;

      try {
        const { data } = await API.get(
          `/rating/check/${this.bookingId}/${this.userId}`
        );
        this.hasRated = data.hasRated;
      } catch (error) {
        console.error("Error checking rating:", error);
      }
    },
    handleRatingSelected(rating) {
      this.rating = rating;
    },
    async submitReview() {
      try {
        await API.post("/rating/add", {
          userId: this.userId,
          bookingId: this.bookingId,
          ratingValue: this.rating,
          comment: this.newComment,
        });

        this.hasRated = true;
        alert("Your review has been submitted successfully!");
      } catch (error) {
        console.error("Error submitting review:", error);

        // Handle error messages from API
        if (error.response && error.response.data.message) {
          const errorMsg = error.response.data.message;
          if (errorMsg.includes("Only successful bookings can be rated")) {
            this.errorMessage =
              "You can only rate a booking that has been successfully completed.";
          } else if (
            errorMsg.includes(
              "You can only rate after the booked time has passed"
            )
          ) {
            this.errorMessage =
              "You can only submit a rating after your booking has ended.";
          } else if (errorMsg.includes("You can only rate once per booking")) {
            this.errorMessage = "You have already rated this booking.";
          } else {
            this.errorMessage =
              "An error occurred while submitting your review.";
          }
        } else {
          this.errorMessage = "An error occurred while submitting your review.";
        }
      }
    },
  },
  async created() {
    await this.fetchUserAndBooking();
  },
};
</script>

<style scoped>
.review-container {
  max-width: 500px;
  margin: 30px auto;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.title {
  font-size: 24px;
  color: #333;
  margin-bottom: 15px;
}

.alert-message {
  font-size: 16px;
  font-weight: bold;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
}

.alert-message.error {
  color: red;
  background: #ffe6e6;
}

.alert-message.success {
  color: green;
  background: #e6ffe6;
}

.rating-section {
  margin-bottom: 20px;
}

.comment-box textarea {
  width: 100%;
  height: 80px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  resize: none;
}

.submit-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
  font-size: 16px;
}

.submit-btn:hover {
  background-color: #0056b3;
}

.submit-btn:disabled {
  background-color: #adb5bd;
  cursor: not-allowed;
}
</style>
