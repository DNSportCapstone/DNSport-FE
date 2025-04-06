<template>
  <div class="section refund-section">
    <!-- Tiêu đề -->
    <div class="container section-title text-center" data-aos="fade-up">
      <h2 class="mb-3">Danh Sách Yêu Cầu Hoàn Tiền</h2>
      <p class="text-muted">Quản lý các yêu cầu hoàn tiền từ khách hàng</p>
    </div>

    <!-- Danh sách refund -->
    <div class="container refund-list-page">
      <div class="table-responsive">
        <table class="table table-striped table-hover" v-if="refunds.length">
          <thead class="table-dark">
            <tr>
              <th scope="col">Người dùng</th>
              <th scope="col">Số tiền</th>
              <th scope="col">Trạng thái</th>
              <th scope="col">Số tài khoản</th>
              <th scope="col">Thời gian</th>
              <th scope="col">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="refund in refunds" :key="refund.refundId">
              <td>{{ refund.userName }}</td>
              <td>{{ formatCurrency(refund.refundAmount) }}</td>
              <td>
                <span :class="getStatusClass(refund.status)">
                  {{ refund.status }}
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
                  {{ refund.isProcessing ? "Đang xử lý..." : "Done" }}
                </button>
                <span v-else class="text-muted"></span>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else class="alert alert-info text-center mt-4">
          Không có yêu cầu hoàn tiền nào được tìm thấy
        </div>
      </div>
    </div>
    <div style="margin-bottom: 205px"></div>
  </div>
</template>

<script>
import API from "@/utils/axios";

export default {
  data() {
    return {
      refunds: [],
    };
  },
  methods: {
    async fetchRefunds() {
      try {
        const response = await API.get("/Refund");
        this.refunds = response.data;
      } catch (error) {
        console.error("Lỗi khi tải danh sách refund:", error);
      }
    },
    async completeRefund(refundId) {
      const refund = this.refunds.find((r) => r.refundId === refundId);
      if (!refund) return;

      refund.isProcessing = true; // Hiển thị spinner trong button

      try {
        await API.put(`Refund/complete/${refundId}`);
        refund.status = "Completed"; // Cập nhật UI ngay lập tức
      } catch (error) {
        console.error("Lỗi khi cập nhật refund:", error);
        alert("Đã xảy ra lỗi, vui lòng thử lại!");
      } finally {
        refund.isProcessing = false; // Ẩn spinner
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
      return new Date(date).toLocaleString("vi-VN");
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
