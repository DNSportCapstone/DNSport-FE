<script setup>
import API from '@/utils/axios';
import { ref, onMounted } from 'vue';
import CommonHelper from "@/assets/scripts/common";

const user = ref({
  fullName: '',
  email: '',
  phone: '',
  address: ''
});

const API_URL = ref('User');

onMounted(async () => {
  try {
    const userId = CommonHelper.getCurrentUserId();
    const response = await API.get(`User?userId=${userId}`);
    user.value = response.data;
    console.log('Dữ liệu đã tải:', user.value);
  } catch (error) {
    console.error('Lỗi khi tải dữ liệu:', error);
  }
});

// Gửi dữ liệu cập nhật về API
const updateProfile = async () => {
  try {
    if (!API_URL.value) {
      console.error('API_URL chưa được gán');
      return;
    }

    const response = await API.put(API_URL.value, user.value);

    if (response.status === 200) {
      alert('Cập nhật thành công!');
    } else {
      throw new Error('Cập nhật thất bại!');
    }
  } catch (error) {
    console.error('Lỗi khi cập nhật:', error);
  }
};
</script>

<template>
  <div class="container">
    <h2>Chỉnh sửa hồ sơ</h2>
    <form @submit.prevent="updateProfile">
      <label>Tên:</label>
      <input v-model="user.fullName" type="text" required />

      <label>Email:</label>
      <input v-model="user.email" type="text" disabled />

      <label>Số điện thoại:</label>
      <input v-model="user.phoneNumber" type="tel" required />

      <label>Địa chỉ:</label>
      <textarea v-model="user.address" required></textarea>

      <button type="submit">Lưu thay đổi</button>
    </form>
  </div>
</template>

<style scoped>
.container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f9f9f9;
}
input, textarea {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  width: 100%;
  padding: 10px;
  background: blue;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background: darkblue;
}
</style>
