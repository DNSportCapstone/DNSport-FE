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
                      <i class="bi bi-person-fill custom-icon"></i>
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
                      <i class="bi bi-bank custom-icon"></i>
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

                <!-- Bank Name (Dropdown) -->
                <div class="mb-4 position-relative">
                  <label for="bank" class="form-label fw-semibold">
                    Tên ngân hàng <span class="text-danger">*</span>
                  </label>
                  <div class="input-group">
                    <span class="input-group-text bg-transparent">
                      <i class="bi bi-building custom-icon"></i>
                    </span>
                    <select
                      id="bank"
                      v-model="refundRequest.bank"
                      class="form-select rounded-end bank-select"
                      required
                      :class="{
                        'is-invalid': !refundRequest.bank && submitted,
                      }"
                    >
                      <option value="" disabled>Chọn ngân hàng</option>
                      <option v-for="bank in banks" :key="bank" :value="bank">
                        {{ bank }}
                      </option>
                    </select>
                    <div class="invalid-feedback">Vui lòng chọn ngân hàng</div>
                  </div>
                </div>

                <!-- Submit Button -->
                <button
                  type="submit"
                  class="btn btn-custom w-100 py-2"
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

              <!-- Success Message (chỉ hiển thị khi thành công) -->
              <transition name="fade">
                <div
                  v-if="message && messageType === 'success'"
                  class="mt-4 alert alert-success"
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

    <!-- Refund Confirmation Modal -->
    <div
      class="modal fade"
      id="refundModal"
      tabindex="-1"
      aria-labelledby="refundModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="refundModalLabel">
              Xác nhận hoàn tiền
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">{{ modalMessage }}</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
              @click="cancelRefund"
            >
              Hủy
            </button>
            <button
              type="button"
              class="btn btn-custom"
              @click="confirmRefund"
              :disabled="isConfirming"
            >
              <span
                v-if="isConfirming"
                class="spinner-grow spinner-grow-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              {{ isConfirming ? "Đang xử lý..." : "Đồng ý" }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Error Modal (dùng cho mọi lỗi) -->
    <div
      class="modal fade"
      id="errorModal"
      tabindex="-1"
      aria-labelledby="errorModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="errorModalLabel">Thông báo lỗi</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">{{ errorMessage }}</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>

    <div style="margin-bottom: 53px"></div>
  </div>
</template>

<script>
import API from "@/utils/axios";
import { Modal } from "bootstrap";

export default {
  name: "RefundRequestPage",
  data() {
    return {
      refundRequest: {
        bookingId: "",
        userName: "",
        bankAccountNumber: "",
        bank: "",
      },
      refundPreview: null,
      isSubmitting: false,
      isConfirming: false,
      submitted: false,
      message: "",
      messageType: "",
      modalMessage: "",
      errorMessage: "",
      refundModal: null,
      errorModal: null,
      banks: [
        "Vietcombank",
        "VietinBank",
        "BIDV",
        "Agribank",
        "Techcombank",
        "TPBank",
        "Sacombank",
        "SAIGONBANK",
        "VIB",
        "HDBank",
        "ACB",
        "ABBANK",
        "MSB",
        "VPBank",
        "Eximbank",
        "SCB",
        "SHB",
        "LienVietPostBank",
        "BacABank",
        "HongLeongBank",
        "NamABank",
        "Woori Bank",
        "Shinhan Bank",
        "OceanBank",
        "BIDC",
        "NCB",
        "VietBank",
        "Indovinabank",
        "MB Bank",
        "OCB",
      ],
    };
  },
  methods: {
    async fetchRefundPreview() {
      try {
        const response = await API.get(
          `/Refund/preview/${this.refundRequest.bookingId}`
        );
        this.refundPreview = response.data;
        this.message = "";
        this.messageType = "";
      } catch (error) {
        console.log("Full error:", error);
        console.log("Response:", error.response);
        console.log("Response data:", error.response?.data);
        const errorMsg =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Đã xảy ra lỗi không xác định";
        this.errorMessage = errorMsg;
        if (this.errorModal) this.errorModal.show();
      }
    },

    async submitRefundRequest() {
      this.submitted = true;
      this.message = "";
      this.messageType = "";

      if (
        !this.refundRequest.userName ||
        !this.refundRequest.bankAccountNumber ||
        !this.refundRequest.bank
      ) {
        this.errorMessage = "Vui lòng điền đầy đủ thông tin.";
        if (this.errorModal) this.errorModal.show();
        return;
      }

      if (!this.refundRequest.bookingId) {
        this.errorMessage = "Không tìm thấy mã booking. Vui lòng kiểm tra lại.";
        if (this.errorModal) this.errorModal.show();
        return;
      }

      this.isSubmitting = true;

      if (!this.refundPreview) {
        await this.fetchRefundPreview();
        if (!this.refundPreview) {
          this.isSubmitting = false;
          return;
        }
      }

      this.modalMessage = `Họ và tên: ${this.refundRequest.userName}. Thời gian còn lại: ${this.refundPreview.timeRemaining}, bạn sẽ được hoàn ${this.refundPreview.refundPercentage}% số tiền: ${this.refundPreview.refundAmount} VND vào ngân hàng ${this.refundRequest.bank}. Bạn có muốn tiếp tục không?`;
      if (this.refundModal) this.refundModal.show();

      this.isSubmitting = false;
    },

    async confirmRefund() {
      this.isConfirming = true;
      this.message = "";
      this.messageType = "";

      try {
        await API.post("/Refund/request", this.refundRequest);
        this.message = `Yêu cầu hoàn tiền đã được gửi thành công. `;
        this.messageType = "success";
        if (this.refundModal) this.refundModal.hide();
        this.refundRequest = {
          bookingId: this.refundRequest.bookingId,
          userName: "",
          bankAccountNumber: "",
          bank: "",
        };
        this.refundPreview = null;
        this.submitted = false;
      } catch (error) {
        console.log("Full error:", error);
        console.log("Response:", error.response);
        console.log("Response data:", error.response?.data);
        const errorMsg =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Đã xảy ra lỗi không xác định";
        this.errorMessage = errorMsg;
        if (this.errorModal) this.errorModal.show();
      } finally {
        this.isConfirming = false;
      }
    },

    cancelRefund() {
      if (this.refundModal) this.refundModal.hide();
      this.isSubmitting = false;
    },

    redirectToBookingHistory() {
      this.$router.push("/booking-history");
    },
  },
  mounted() {
    this.refundRequest.bookingId = this.$route.params.bookingId;
    console.log("Booking ID:", this.refundRequest.bookingId);

    const refundModalElement = document.getElementById("refundModal");
    const errorModalElement = document.getElementById("errorModal");

    if (!refundModalElement) {
      console.error("Refund modal element not found!");
    }
    if (!errorModalElement) {
      console.error("Error modal element not found!");
    }

    this.refundModal = refundModalElement
      ? new Modal(refundModalElement)
      : null;
    this.errorModal = errorModalElement ? new Modal(errorModalElement) : null;

    if (this.errorModal) {
      errorModalElement.addEventListener("hidden.bs.modal", () => {
        this.redirectToBookingHistory();
      });
    }

    if (this.refundRequest.bookingId) {
      this.fetchRefundPreview();
    } else {
      this.errorMessage = "Không tìm thấy mã booking. Vui lòng kiểm tra lại.";
      if (this.errorModal) this.errorModal.show();
    }
  },
  beforeUnmount() {
    if (this.refundModal) this.refundModal.dispose();
    if (this.errorModal) this.errorModal.dispose();
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

.form-control,
.form-select {
  border: 1px solid #ced4da;
  padding: 10px;
  transition: all 0.3s ease;
}

.form-control:focus,
.form-select:focus {
  border-color: #28a745;
  box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
}

.custom-icon {
  color: #28a745;
}

.btn-custom {
  color: #ffffff;
  background-color: #28a745;
  border: none;
  padding: 6px 12px;
  transition: all 0.3s ease;
}

.btn-custom:disabled {
  background-color: #6c757d;
  opacity: 0.8;
}

.alert-success {
  background-color: #d4edda;
  color: #155724;
  border-color: #c3e6cb;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.modal-footer .btn {
  flex: 1;
  margin: 0 5px;
}
</style>
