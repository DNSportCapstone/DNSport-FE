<template>
  <div class="section refund-tracking-section">
    <!-- Section Title -->
    <div class="container section-title" data-aos="fade-up">
      <h2>{{ t("refund.tracking_title") }}</h2>
      <div>
        <span class="description-title">{{
          t("refund.tracking_description")
        }}</span>
      </div>
    </div>

    <!-- Refund Tracking Table -->
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-10 col-md-12">
          <div class="card refund-card shadow-lg">
            <div class="card-body p-4">
              <div v-if="isLoading" class="text-center my-5">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Đang tải...</span>
                </div>
              </div>

              <div v-else-if="refunds.length" class="table-responsive">
                <table class="table table-hover table-bordered">
                  <thead class="table-light">
                    <tr>
                      <th scope="col">Số tiền</th>
                      <th scope="col">Số tài khoản</th>
                      <th scope="col">Thời gian yêu cầu</th>
                      <th scope="col">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="refund in refunds" :key="refund.refundId">
                      <td>{{ formatCurrency(refund.refundAmount) }}</td>
                      <td>{{ refund.bankAccountNumber }}</td>
                      <td>{{ formatDate(refund.time) }}</td>
                      <td>
                        <span :class="getStatusClass(refund.status)">
                          {{ refund.status }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div v-else class="alert alert-info text-center mt-4">
                Bạn chưa có yêu cầu hoàn tiền nào
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="margin-bottom: 200px"></div>
  </div>
</template>

<script>
import API from "@/utils/axios";
import CommonHelper from "@/utils/common";
import { useI18n } from "vue-i18n";

export default {
  setup() {
    const { t } = useI18n();
    return { t };
  },
  data() {
    return {
      refunds: [],
      isLoading: false,
      userId: null,
    };
  },
  methods: {
    async fetchRefunds() {
      if (!this.userId) return;

      this.isLoading = true;
      try {
        const response = await API.get(`/Refund?userId=${this.userId}`);
        this.refunds = response.data;
      } catch (error) {
        console.error("Lỗi khi tải danh sách refund:", error);
      } finally {
        this.isLoading = false;
      }
    },
    getStatusClass(status) {
      return {
        "text-warning": status === "Processing",
        "text-success": status === "Completed",
      };
    },
    formatCurrency(amount) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(amount);
    },
    formatDate(date) {
      return date ? new Date(date).toLocaleString("vi-VN") : "Chưa cập nhật";
    },
    async fetchUserId() {
      try {
        this.userId = CommonHelper.getCurrentUserId();
        console.log("User ID:", this.userId);

        if (!this.userId) {
          throw new Error("User ID not found.");
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    },
  },
  async created() {
    await this.fetchUserId();
    if (this.userId) {
      await this.fetchRefunds();
    } else {
      console.error("Không thể lấy userId");
    }
  },
};
</script>

<style scoped>
.refund-tracking-section {
  padding: 60px 0;
}

.refund-card {
  border-radius: 12px;
  background: #ffffff;
  border: none;
}

.table {
  margin-top: 10px;
}

.text-warning {
  color: orange;
}

.text-success {
  color: green;
}

.table-bordered {
  border: 1px solid #dee2e6;
}

.table-bordered th,
.table-bordered td {
  border: 1px solid #dee2e6;
}
</style>
