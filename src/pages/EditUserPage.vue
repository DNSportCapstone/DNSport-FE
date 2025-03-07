<template>
    <div class="section">
      <div class="section-title">
        <div>
          <span class="description-title">title</span>
        </div>
      </div>
      <div class="container">
        <h2>{{ t('EditProfile') }}</h2>
        <form @submit.prevent="updateProfile">
          <label>{{ t('Name') }}</label>
          <input v-model="user.fullName" type="text" disabled />

          <label>Email:</label>
          <input v-model="user.email" type="text" disabled />

          <label>{{ t('PhoneNumber') }}</label>
          <input v-model="user.phoneNumber" type="tel" required />

          <label>{{ t('Address') }}</label>
          <textarea v-model="user.address" required></textarea>

          <button type="submit">{{ t('SaveChanges') }}</button>
        </form>
      </div>
    </div>
  </template>
<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<!-- Phần logic API và Vue Component -->
<script>
import API from "@/utils/axios";
import CommonHelper from "@/utils/common";

export default {
  data() {
    return {
      user: {
        fullName: "",
        email: "",
        phone: "",
        address: "",
      },
      API_URL: "User",
    };
  },
  mounted() {
    this.loadUserData();
  },
  methods: {
    async loadUserData() {
      try {
        const userId = CommonHelper.getCurrentUserId();
        console.log("userId", userId);
        const response = await API.get(`User?userId=${userId}`);
        this.user = response.data;
        console.log("Dữ liệu đã tải:", this.user);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      }
    },
    async updateProfile() {
      try {
        if (!this.API_URL) {
          console.error("API_URL chưa được gán");
          return;
        }

        const response = await API.put(this.API_URL, this.user);

        if (response.status === 200) {
          alert("Cập nhật thành công!");
        } else {
          throw new Error("Cập nhật thất bại!");
        }
      } catch (error) {
        console.error("Lỗi khi cập nhật:", error);
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f9f9f9;
}
input,
textarea {
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
