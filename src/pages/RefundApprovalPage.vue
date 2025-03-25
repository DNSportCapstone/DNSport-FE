<!-- src/views/RefundApprovalPage.vue -->
<template>
  <div class="section">
    <!-- Section Title -->
    <div class="container section-title" data-aos="fade-up">
      <h2>Refund</h2>
      <div>
        <span class="description-title">Refund Approval</span>
      </div>
    </div>
    <!-- End Section Title -->

    <div class="refund-approval-page">
      <table v-if="pendingRefunds.length">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Số tiền</th>
            <th>Số tài khoản</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="refund in pendingRefunds" :key="refund.refundId">
            <td>{{ refund.refundId }}</td>
            <td>{{ refund.userName }}</td>
            <td>{{ refund.refundAmount }} VND</td>
            <td>{{ refund.bankAccountNumber }}</td>
            <td>
              <button
                @click="approveRefund(refund.refundId)"
                :disabled="isProcessing"
              >
                Duyệt
              </button>
              <button
                @click="rejectRefund(refund.refundId)"
                :disabled="isProcessing"
              >
                Từ chối
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else class="centered-message">
        Không có yêu cầu refund nào đang chờ duyệt
      </p>
      <div v-if="message" :class="messageClass">{{ message }}</div>
    </div>
  </div>
  <div style="margin-bottom: 305px"></div>
</template>

<script>
import axios from "axios";

export default {
  name: "RefundApprovalPage",
  data() {
    return {
      pendingRefunds: [],
      isProcessing: false,
      message: "",
      messageClass: "",
    };
  },
  async created() {
    await this.fetchPendingRefunds();
  },
  methods: {
    async fetchPendingRefunds() {
      try {
        const response = await axios.get("https://localhost:44394/api/refund");
        this.pendingRefunds = response.data.filter(
          (refund) => refund.status === "Pending"
        );
      } catch (error) {
        this.message =
          error.response?.data?.message || "Lỗi khi lấy danh sách refund";
        this.messageClass = "error";
      }
    },
    async approveRefund(refundId) {
      this.isProcessing = true;
      this.message = "";
      try {
        const response = await axios.put(
          `https://localhost:44394/api/refund/${refundId}/approve`
        );
        this.message = response.data.message;
        this.messageClass = "success";
        await this.fetchPendingRefunds(); // Cập nhật lại danh sách
      } catch (error) {
        this.message = error.response?.data?.message || "Lỗi khi duyệt refund";
        this.messageClass = "error";
      } finally {
        this.isProcessing = false;
      }
    },
    async rejectRefund(refundId) {
      this.isProcessing = true;
      this.message = "";
      try {
        const response = await axios.put(
          `https://localhost:44394/api/refund/${refundId}/reject`
        );
        this.message = response.data.message;
        this.messageClass = "success";
        await this.fetchPendingRefunds(); // Cập nhật lại danh sách
      } catch (error) {
        this.message =
          error.response?.data?.message || "Lỗi khi từ chối refund";
        this.messageClass = "error";
      } finally {
        this.isProcessing = false;
      }
    },
  },
};
</script>

<style scoped>
.refund-approval-page {
  max-width: 800px;
  margin: 20px auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

button {
  background-color: #4caf50;
  color: white;
  padding: 6px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 5px;
}

button:nth-child(2) {
  background-color: #f44336;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.success {
  color: green;
  margin-top: 10px;
}

.error {
  color: red;
  margin-top: 10px;
}
.centered-message {
  text-align: center;
  margin-top: 20px;
}
</style>
