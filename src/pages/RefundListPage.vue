<template>
  <div class="section">
    <!-- Section Title -->
    <div class="container section-title" data-aos="fade-up">
      <h2>Refund</h2>
      <div>
        <span class="description-title">Refund List</span>
      </div>
    </div>
    <!-- End Section Title -->

    <div class="refund-list-page">
      <table v-if="refunds.length">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Số tiền</th>
            <th>Trạng thái</th>
            <th>Số tài khoản</th>
            <th>Thời gian</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="refund in refunds" :key="refund.refundId">
            <td>{{ refund.refundId }}</td>
            <td>{{ refund.userName }}</td>
            <td>{{ refund.refundAmount }} VND</td>
            <td>{{ refund.status }}</td>
            <td>{{ refund.bankAccountNumber }}</td>
            <td>{{ formatDate(refund.time) }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else>Không có refund nào được tìm thấy</p>
    </div>
  </div>
  <div style="margin-bottom: 205px"></div>
</template>

<script>
import axios from "axios";

export default {
  name: "RefundListPage",
  data() {
    return {
      refunds: [],
    };
  },
  async created() {
    try {
      const response = await axios.get("https://localhost:44394/api/refund");
      this.refunds = response.data;
    } catch (error) {
      console.error(
        "Lỗi khi lấy danh sách refund:",
        error.response?.data?.message || error.message
      );
    }
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleString();
    },
  },
};
</script>

<style scoped>
.refund-list-page {
  max-width: 1000px;
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
</style>
