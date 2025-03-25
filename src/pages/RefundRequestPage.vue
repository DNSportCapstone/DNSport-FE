<template>
  <div class="section">
    <!-- Section Title -->
    <div class="container section-title" data-aos="fade-up">
      <h2>Refund</h2>
      <div>
        <span class="description-title">Refund Request</span>
      </div>
    </div>
    <!-- End Section Title -->

    <!-- Refund Form -->
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-6 col-md-8">
          <div class="card refund-card shadow-lg">
            <div class="card-body p-4">
              <form
                @submit.prevent="submitRefundRequest"
                class="needs-validation"
                novalidate
              >
                <!-- User Name -->
                <div class="mb-4 position-relative">
                  <label for="userName" class="form-label fw-semibold">
                    Họ và tên <span class="text-danger">*</span>
                  </label>
                  <div class="input-group">
                    <span class="input-group-text bg-transparent">
                      <i class="bi bi-person-fill text-primary"></i>
                    </span>
                    <input
                      type="text"
                      id="userName"
                      v-model="refundRequest.userName"
                      class="form-control rounded-end"
                      required
                      placeholder="Nhập họ và tên đầy đủ"
                      :class="{
                        'is-invalid': !refundRequest.userName && submitted,
                      }"
                    />
                    <div class="invalid-feedback">Vui lòng nhập họ và tên</div>
                  </div>
                </div>

                <!-- Bank Account Number -->
                <div class="mb-4 position-relative">
                  <label for="bankAccountNumber" class="form-label fw-semibold">
                    Số tài khoản ngân hàng <span class="text-danger">*</span>
                  </label>
                  <div class="input-group">
                    <span class="input-group-text bg-transparent">
                      <i class="bi bi-bank text-primary"></i>
                    </span>
                    <input
                      type="text"
                      id="bankAccountNumber"
                      v-model="refundRequest.bankAccountNumber"
                      class="form-control rounded-end"
                      required
                      placeholder="Nhập số tài khoản ngân hàng"
                      :class="{
                        'is-invalid':
                          !refundRequest.bankAccountNumber && submitted,
                      }"
                    />
                    <div class="invalid-feedback">
                      Vui lòng nhập số tài khoản ngân hàng
                    </div>
                  </div>
                </div>

                <!-- Submit Button -->
                <button
                  type="submit"
                  class="btn btn-primary w-100 py-2"
                  :disabled="isSubmitting"
                >
                  <span
                    v-if="isSubmitting"
                    class="spinner-grow spinner-grow-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  {{ isSubmitting ? "Đang gửi..." : "Gửi yêu cầu hoàn tiền" }}
                </button>
              </form>

              <!-- Message -->
              <transition name="fade">
                <div
                  v-if="message"
                  class="mt-4 alert"
                  :class="messageClass"
                  role="alert"
                >
                  {{ message }}
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="margin-bottom: 53px"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RefundRequestPage",
  data() {
    return {
      refundRequest: {
        bookingId: "",
        userName: "",
        bankAccountNumber: "",
      },
      isSubmitting: false,
      submitted: false,
      message: "",
      messageClass: "",
    };
  },
  methods: {
    async submitRefundRequest() {
      this.submitted = true;
      if (
        !this.refundRequest.userName ||
        !this.refundRequest.bankAccountNumber
      ) {
        return;
      }

      this.isSubmitting = true;
      this.message = "";

      try {
        const response = await axios.post(
          "https://localhost:44394/api/Refund/request",
          this.refundRequest
        );
        const { message, refundAmount, hoursRemaining, refundPercentage } =
          response.data;
        this.message = `${message}. Thời gian còn lại: ${hoursRemaining} giờ, bạn sẽ được hoàn ${refundPercentage}% số tiền: ${refundAmount} VND`;
        this.messageClass = "alert-success";
        this.refundRequest = { userName: "", bankAccountNumber: "" };
        this.submitted = false;
      } catch (error) {
        this.message =
          error.response?.data?.message || "Đã xảy ra lỗi khi gửi yêu cầu";
        this.messageClass = "alert-danger";
      } finally {
        this.isSubmitting = false;
      }
    },
  },
  mounted() {
    console.log(this.$route.params.bookingId);
    this.refundRequest.bookingId = this.$route.params.bookingId;
  },
};
</script>

<style scoped>
.refund-section {
  padding: 60px 0;
}

.refund-card {
  border-radius: 12px;
  background: #ffffff;
  border: none;
}

.form-label {
  color: #333;
}

.input-group-text {
  background: #f8f9fa;
  border: 1px solid #ced4da;
  border-right: none;
}

.form-control {
  border: 1px solid #ced4da;
  padding: 10px;
  transition: all 0.3s ease;
}

.form-control:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.btn-primary {
  background-color: #007bff;
  border: none;
  padding: 12px;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.btn-primary:hover:not(:disabled) {
  background-color: #0056b3;
  transform: translateY(-2px);
}

.btn-primary:disabled {
  background-color: #6c757d;
  opacity: 0.8;
}

.alert-success {
  background-color: #d4edda;
  color: #155724;
  border-color: #c3e6cb;
}

.alert-danger {
  background-color: #f8d7da;
  color: #721c24;
  border-color: #f5c6cb;
}

/* Animation for message */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
