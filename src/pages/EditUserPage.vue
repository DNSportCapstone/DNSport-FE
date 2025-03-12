<template>
  <div style="margin-top: 150px"></div>
  <div class="wrapper bg-white mt-sm-5">
    <h4 class="pb-4 border-bottom">{{ t("EditProfile") }}</h4>
    <div v-if="showSuccessMessage" class="alert alert-success">
      {{ t("ProfileUpdateSuccess") }}
    </div>
    <div class="py-2">
      <div class="row py-2">
        <div class="col-md-6">
          <label>{{ t("Name") }}</label>
          <input
            v-model="user.fullName"
            type="text"
            class="bg-light form-control"
            disabled
          />
        </div>
        <div class="col-md-6">
          <label>Email</label>
          <input
            v-model="user.email"
            type="email"
            class="bg-light form-control"
            disabled
          />
        </div>
      </div>
      <div class="row py-2">
        <div class="col-md-6 pt-md-0 pt-3">
          <label>{{ t("PhoneNumber") }}</label>
          <input
            v-model="user.phoneNumber"
            type="tel"
            class="bg-light form-control"
            inputmode="numeric"
            maxlength="20"
            @input="
              user.phoneNumber = user.phoneNumber
                .replace(/\D/g, '')
                .slice(0, 20)
            "
          />
        </div>
        <div class="col-md-6 pt-md-0 pt-3">
          <label>{{ t("Address") }}</label>
          <input
            v-model="user.address"
            type="text"
            class="bg-light form-control"
          />
        </div>
      </div>
      <div class="row py-2">
        <div class="col-md-6 pt-md-0 pt-3">
          <label>{{ t("ReceiveNotifications") }}</label>
          <input
            v-model="user.receiveNotification"
            type="checkbox"
            class="form-check-input"
            style="margin-left: 20px"
          />
        </div>
      </div>
      <div class="py-3 pb-4 border-bottom">
        <button class="btn btn-primary mr-3" @click="saveChanges">
          {{ t("SaveChanges") }}
        </button>
      </div>
    </div>
  </div>
  <div style="margin-bottom: 250px"></div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<script>
import API from "@/utils/axios";
import CommonHelper from "@/utils/common";

export default {
  data() {
    return {
      user: {
        fullName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        address: "",
        receiveNotification: false,
      },
      showSuccessMessage: false,
    };
  },
  mounted() {
    this.loadUserData();
  },
  methods: {
    async loadUserData() {
      try {
        const userId = CommonHelper.getCurrentUserId();
        const response = await API.get(`User?userId=${userId}`);
        this.user = { ...response.data };
      } catch (error) {
        console.error("Error loading user data:", error);
        alert("Failed to load user data.");
      }
    },
    async saveChanges() {
      try {
        await API.put("User", this.user);
        this.showSuccessMessage = true;
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 7000);
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Failed to update profile.");
      }
    },
    cancelChanges() {
      this.loadUserData();
    },
    deactivateAccount() {
      if (confirm("Are you sure you want to deactivate your account?")) {
        console.log("Account deactivated");
      }
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: "Poppins", sans-serif;
  background-color: aliceblue;
}
.wrapper {
  padding: 30px 50px;
  border: 1px solid #ddd;
  border-radius: 15px;
  margin: 10px auto;
  max-width: 600px;
}
.form-control {
  border-radius: 10px;
}
.button {
  background-color: #fff;
  color: #198754;
}
.button:hover {
  background-color: #20c997;
  color: #fff;
}
.btn-primary {
  background-color: #198754;
}
.danger {
  background-color: #fff;
  color: #e20404;
  border: 1px solid #ddd;
}
.danger:hover {
  background-color: #e20404;
  color: #fff;
}
.alert {
  background-color: #d4edda;
  color: #155724;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #c3e6cb;
  border-radius: 5px;
  text-align: center;
}
</style>
