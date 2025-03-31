<template>
  <div class="section refund-tracking-section">
    <!-- Section Title -->
    <div class="container section-title text-center" data-aos="fade-up">
      <h2 class="mb-3">Theo Dõi Yêu Cầu Hoàn Tiền</h2>
      <p class="text-muted">Xem trạng thái các yêu cầu hoàn tiền của bạn</p>
    </div>

    <!-- Refund Tracking Table -->
    <div class="container refund-tracking-page">
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
    <div style="margin-bottom: 205px"></div>
  </div>
</template>

<script>
import API from "@/utils/axios";
import CommonHelper from "@/utils/common";

export default {
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
.table {
  margin-top: 20px;
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
