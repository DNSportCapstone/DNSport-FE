<template>
  <div class="section refund-section">
    <!-- Tiêu đề -->
    <div class="container section-title text-center" data-aos="fade-up">
      <h2 class="mb-3">{{ t("refund_list.title") }}</h2>
      <p class="text-muted">{{ t("refund_list.description") }}</p>
    </div>

    <!-- Danh sách refund -->
    <div class="container refund-list-page">
      <div class="table-responsive">
        <table class="table table-striped table-hover" v-if="refunds.length">
          <thead class="table-dark">
            <tr>
              <th scope="col">{{ t("refund_list.table.user") }}</th>
              <th scope="col">{{ t("refund_list.table.amount") }}</th>
              <th scope="col">{{ t("refund_list.table.status") }}</th>
              <th scope="col">{{ t("refund_list.table.bank_account") }}</th>
              <th scope="col">{{ t("refund_list.table.time") }}</th>
              <th scope="col">{{ t("refund_list.table.action") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="refund in refunds" :key="refund.refundId">
              <td>{{ refund.userName }}</td>
              <td>{{ formatCurrency(refund.refundAmount) }}</td>
              <td>
                <span :class="getStatusClass(refund.status)">
                  {{ t(`refund_list.status.${refund.status}`) }}
                </span>
              </td>
              <td>{{ refund.bankAccountNumber }}</td>
              <td>{{ formatDate(refund.time) }}</td>
              <td>
                <button
                  v-if="refund.status === 'Processing'"
                  class="btn btn-success btn-sm"
                  @click="completeRefund(refund.refundId)"
                  :disabled="refund.isProcessing"
                >
                  <span
                    v-if="refund.isProcessing"
                    class="spinner-border spinner-border-sm me-1"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  {{
                    refund.isProcessing
                      ? t("refund_list.processing")
                      : t("refund_list.done")
                  }}
                </button>
                <span v-else class="text-muted"></span>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else class="alert alert-info text-center mt-4">
          {{ t("refund_list.no_refunds") }}
        </div>
      </div>
    </div>
    <div style="margin-bottom: 205px"></div>
  </div>
</template>

<script>
import API from "@/utils/axios";
import { useI18n } from "vue-i18n";

export default {
  setup() {
    const { t, locale } = useI18n();
    return { t, locale };
  },
  data() {
    return {
      refunds: [],
    };
  },
  methods: {
    async fetchRefunds() {
      try {
        const response = await API.get("/Refund");
        this.refunds = response.data.map((refund) => ({
          ...refund,
          isProcessing: false, // Add isProcessing flag for each refund
        }));
      } catch (error) {
        console.error("Error fetching refunds:", error);
        alert(this.t("refund_list.error.fetch_failed"));
      }
    },
    async completeRefund(refundId) {
      const refund = this.refunds.find((r) => r.refundId === refundId);
      if (!refund) return;

      refund.isProcessing = true; // Show spinner in button

      try {
        await API.put(`Refund/complete/${refundId}`);
        refund.status = "Completed"; // Update UI immediately
      } catch (error) {
        console.error("Error updating refund:", error);
        alert(this.t("refund_list.error.update_failed"));
      } finally {
        refund.isProcessing = false; // Hide spinner
      }
    },
    getStatusClass(status) {
      return {
        "text-warning": status === "Processing",
        "text-success": status === "Completed",
      };
    },
    formatCurrency(amount) {
      const currencyLocale = this.locale.value === "vi" ? "vi-VN" : "en-US";
      const currency = this.locale.value === "vi" ? "VND" : "USD";
      return new Intl.NumberFormat(currencyLocale, {
        style: "currency",
        currency: currency,
      }).format(amount);
    },
    formatDate(date) {
      const dateLocale = this.locale.value === "vi" ? "vi-VN" : "en-US";
      return new Date(date).toLocaleString(dateLocale);
    },
  },
  mounted() {
    this.fetchRefunds();
  },
};
</script>

<style scoped>
.text-warning {
  color: orange;
}
.text-success {
  color: green;
}
</style>
