<template>
  <div class="payment-container">
    <h2>Thanh toán VNPAY</h2>

    <label>Số tiền (VND):</label>
    <input v-model="amount" type="number" placeholder="Nhập số tiền" />

    <button @click="handlePayment">Thanh toán</button>

    <div v-if="paymentStatus">
      <p :class="statusClass">{{ paymentMessage }}</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import API from "@/utils/axios";
import router from "@/router";

export default {
  setup() {
    const amount = ref(10000);
    const paymentStatus = ref(null);
    const paymentMessage = ref("");
    const statusClass = ref("");
    const route = useRoute();

    // Gọi API để tạo thanh toán
    const handlePayment = async () => {
      try {
          // API.get(`Booking/history/${userId}`)
        const response = await API.post(`payment/CreatePaymentUrl`, {
          amount: amount.value,
        });
        window.location.href = response.data;
      } catch (error) {
        paymentMessage.value = "Lỗi khi tạo thanh toán!";
        statusClass.value = "error";
      }
    };

    // Kiểm tra trạng thái thanh toán khi quay về từ VNPAY
    onMounted(async () => {
      if (route.query.vnp_ResponseCode) {
        try {
          const response = await API.get(`payment/vnpay-return`, {
            params: route.query,
          });
          if(response.status == 200){
            router.push({ path: "/payment-success" });
          }
        } catch (error) {
          paymentMessage.value = "Thanh toán thất bại!";
          statusClass.value = "error";
        }
      }
    });

    return { amount, handlePayment, paymentStatus, paymentMessage, statusClass };
  },
};
</script>

<style scoped>
.payment-container {
  max-width: 400px;
  margin: auto;
  text-align: center;
}
input {
  width: 100%;
  padding: 8px;
  margin: 10px 0;
}
button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
.success {
  color: green;
}
.error {
  color: red;
}
</style>
