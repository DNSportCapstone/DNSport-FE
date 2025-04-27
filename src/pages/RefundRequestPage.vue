<template>
  <div class="section">
    <!-- Section Title -->
    <div class="container section-title" data-aos="fade-up">
      <h2>{{ t("refund.title") }}</h2>
      <div>
        <span class="description-title">{{ t("refund.request_title") }}</span>
      </div>
    </div>
    <!-- End Section Title -->

    <!-- Refund Form (Hidden if Refund Not Possible) -->
    <div v-if="canRequestRefund" class="container">
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
                    {{ t("refund.form.name") }}
                    <span class="text-danger">*</span>
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
                      :placeholder="t('refund.form.name_placeholder')"
                      :class="{
                        'is-invalid':
                          (!refundRequest.userName ||
                            !/^[a-zA-ZÀ-ỹ\s]+$/u.test(
                              refundRequest.userName
                            )) &&
                          submitted,
                      }"
                    />
                    <div class="invalid-feedback">
                      {{ t("error.invalid_name") }}
                    </div>
                  </div>
                </div>

                <!-- Bank Account Number -->
                <div class="mb-4 position-relative">
                  <label for="bankAccountNumber" class="form-label fw-semibold">
                    {{ t("refund.form.bank_account") }}
                    <span class="text-danger">*</span>
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
                      :placeholder="t('refund.form.bank_account_placeholder')"
                      :class="{
                        'is-invalid':
                          (!refundRequest.bankAccountNumber ||
                            !/^\d{8,16}$/.test(
                              refundRequest.bankAccountNumber
                            )) &&
                          submitted,
                      }"
                    />
                    <div class="invalid-feedback">
                      {{ t("error.invalid_bank_account") }}
                    </div>
                  </div>
                </div>

                <!-- Bank Name (Dropdown) -->
                <div class="mb-4 position-relative">
                  <label for="bank" class="form-label fw-semibold">
                    {{ t("refund.form.bank_name") }}
                    <span class="text-danger">*</span>
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
                      <option value="" disabled>
                        {{ t("refund.form.select_bank") }}
                      </option>
                      <option v-for="bank in banks" :key="bank" :value="bank">
                        {{ bank }}
                      </option>
                    </select>
                    <div class="invalid-feedback">
                      {{ t("error.missing_bank") }}
                    </div>
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
                  {{
                    isSubmitting
                      ? t("refund.form.submitting")
                      : t("refund.form.submit")
                  }}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div style="margin-bottom: 53px"></div>
  </div>
</template>

<script>
import API from "@/utils/axios";
import { showMessageBox } from "@/utils/message-box-service.js";
import { useI18n } from "vue-i18n";

export default {
  name: "RefundRequestPage",
  setup() {
    const { t } = useI18n();
    return { t };
  },
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
      canRequestRefund: true,
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
      isMounted: false,
    };
  },
  methods: {
    async fetchRefundPreview() {
      try {
        const response = await API.get(
          `/Refund/preview/${this.refundRequest.bookingId}`
        );
        if (!this.isMounted) return;
        if (response.data.error) {
          const errorKey =
            response.data.message ===
            "Không thể yêu cầu refund: Thời gian đã hết"
              ? "error.time_expired"
              : "error.unknown";
          this.errorMessage = this.t(errorKey);
          this.canRequestRefund = false;
          showMessageBox({
            title: this.t("error.title"),
            description: this.errorMessage,
            type: "error",
            confirmText: this.t("error.close"),
            showCancel: false,
          });
          this.redirectToBookingHistory();
          this.refundPreview = null;
          return;
        }
        this.refundPreview = response.data;
        this.message = "";
        this.messageType = "";
        this.errorMessage = "";
        this.canRequestRefund = true;
      } catch (error) {
        const errorMsg =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message;
        const errorKey =
          errorMsg === "Không thể yêu cầu refund: Thời gian đã hết"
            ? "error.time_expired"
            : "error.unknown";
        this.errorMessage = this.t(errorKey);
        this.canRequestRefund = false;
        showMessageBox({
          title: this.t("error.title"),
          description: this.errorMessage,
          type: "error",
          confirmText: this.t("error.close"),
          showCancel: false,
        });
        this.redirectToBookingHistory();
        this.refundPreview = null;
      }
    },
    async submitRefundRequest() {
      this.submitted = true;
      this.message = "";
      this.messageType = "";

      // Check required fields
      if (
        !this.refundRequest.userName ||
        !this.refundRequest.bankAccountNumber ||
        !this.refundRequest.bank
      ) {
        this.errorMessage = this.t("error.missing_fields");
        showMessageBox({
          title: this.t("error.title"),
          description: this.errorMessage,
          type: "error",
          confirmText: this.t("error.close"),
          showCancel: false,
        });
        return;
      }

      // Validate full name (letters and spaces only)
      const nameRegex = /^[a-zA-ZÀ-ỹ\s]+$/u;
      if (!nameRegex.test(this.refundRequest.userName)) {
        this.errorMessage = this.t("error.invalid_name");
        showMessageBox({
          title: this.t("error.title"),
          description: this.errorMessage,
          type: "error",
          confirmText: this.t("error.close"),
          showCancel: false,
        });
        return;
      }

      // Validate bank account number (digits only, 8-16 characters)
      const accountNumberRegex = /^\d{8,16}$/;
      if (!accountNumberRegex.test(this.refundRequest.bankAccountNumber)) {
        this.errorMessage = this.t("error.invalid_bank_account");
        showMessageBox({
          title: this.t("error.title"),
          description: this.errorMessage,
          type: "error",
          confirmText: this.t("error.close"),
          showCancel: false,
        });
        return;
      }

      if (!this.refundRequest.bookingId) {
        this.errorMessage = this.t("error.missing_booking_id");
        this.canRequestRefund = false;
        showMessageBox({
          title: this.t("error.title"),
          description: this.errorMessage,
          type: "error",
          confirmText: this.t("error.close"),
          showCancel: false,
        });
        this.redirectToBookingHistory();
        return;
      }

      this.isSubmitting = true;

      // Fetch refund preview if not already fetched
      if (!this.refundPreview) {
        await this.fetchRefundPreview();
        if (!this.refundPreview) {
          this.isSubmitting = false;
          return;
        }
      }

      // Show confirmation message box with cancel button
      this.modalMessage = this.t("refund.confirm_message", {
        userName: this.refundRequest.userName,
        timeRemaining: this.refundPreview.timeRemaining,
        refundPercentage: this.refundPreview.refundPercentage,
        refundAmount: this.refundPreview.refundAmount,
        bank: this.refundRequest.bank,
      });
      showMessageBox(
        {
          title: this.t("refund.confirm_title"),
          description: this.modalMessage,
          type: "info",
          confirmText: this.isConfirming
            ? this.t("refund.processing")
            : this.t("refund.confirm"),
          cancelText: this.t("refund.cancel"),
          showCancel: true,
          disabled: this.isConfirming,
        },
        async () => {
          await this.confirmRefund();
          this.isSubmitting = false;
        },
        () => {
          this.cancelRefund();
          this.isSubmitting = false;
        }
      );
    },
    async confirmRefund() {
      if (this.isConfirming) return;
      this.isConfirming = true;
      this.message = "";
      this.messageType = "";

      try {
        const response = await API.post("/Refund/request", this.refundRequest);
        if (!this.isMounted) return;
        if (response.data.error) {
          const errorKey =
            response.data.message ===
            "Không thể yêu cầu refund: Thời gian đã hết"
              ? "error.time_expired"
              : "error.unknown";
          this.errorMessage = this.t(errorKey);
          this.canRequestRefund = false;
          showMessageBox({
            title: this.t("error.title"),
            description: this.errorMessage,
            type: "error",
            confirmText: this.t("error.close"),
            showCancel: false,
          });
          this.redirectToBookingHistory();
          return;
        }
        // Show success message box
        this.message = this.t("refund.success_message");
        this.messageType = "success";
        showMessageBox({
          title: this.t("refund.success_title"),
          description: this.message,
          type: "success",
          confirmText: this.t("error.close"),
          showCancel: false,
        });
        this.redirectToBookingHistory();
        this.refundRequest = {
          bookingId: this.refundRequest.bookingId,
          userName: "",
          bankAccountNumber: "",
          bank: "",
        };
        this.refundPreview = null;
        this.submitted = false;
      } catch (error) {
        const errorMsg =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message;
        const errorKey =
          errorMsg === "Không thể yêu cầu refund: Thời gian đã hết"
            ? "error.time_expired"
            : "error.unknown";
        this.errorMessage = this.t(errorKey);
        this.canRequestRefund = false;
        showMessageBox({
          title: this.t("error.title"),
          description: this.errorMessage,
          type: "error",
          confirmText: this.t("error.close"),
          showCancel: false,
        });
        this.redirectToBookingHistory();
      } finally {
        this.isConfirming = false;
      }
    },
    cancelRefund() {
      this.isSubmitting = false;
    },
    redirectToBookingHistory() {
      this.$router.push("/booking-history");
    },
  },
  mounted() {
    this.isMounted = true;
    this.refundRequest.bookingId = this.$route.params.bookingId;

    if (this.refundRequest.bookingId) {
      this.fetchRefundPreview();
    } else {
      this.errorMessage = this.t("error.missing_booking_id");
      this.canRequestRefund = false;
      showMessageBox({
        title: this.t("error.title"),
        description: this.errorMessage,
        type: "error",
        confirmText: this.t("error.close"),
        showCancel: false,
      });
      this.redirectToBookingHistory();
    }
  },
  beforeUnmount() {
    this.isMounted = false;
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
</style>
