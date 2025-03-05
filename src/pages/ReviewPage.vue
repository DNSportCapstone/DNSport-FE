<template>
  <div class="review-container">
    <h2 class="title">Review & Comments</h2>

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
</template>

<script>
import axios from "axios";
import StarRating from "@/components/StarRating.vue";

export default {
  components: { StarRating },
  data() {
    return {
      rating: 0,
      newComment: "",
      hasRated: false,
      bookingId: 1, // Replace with actual BookingId
      userId: 5, // Replace with actual UserId
      errorMessage: "", // Store error messages
    };
  },
  methods: {
    async checkIfRated() {
      try {
        const { data } = await axios.get(
          `https://localhost:44394/api/rating/check/${this.bookingId}/${this.userId}`
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
        await axios.post("https://localhost:44394/api/rating/add", {
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
    await this.checkIfRated();
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
