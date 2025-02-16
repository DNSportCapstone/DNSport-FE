<template>
  <div
    class="container d-flex justify-content-center align-items-center vh-100"
  >
    <div class="card p-4 shadow-lg" style="width: 350px">
      <h3 class="text-center mb-4">Đăng nhập SSO</h3>
      <GoogleLogin :callback="loginWithGoogle" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default {
  methods: {
    async loginWithGoogle(callback) {
      try {
        const { credential } = callback;
        const response = await axios.post(
          "https://localhost:7247/api/auth/google-login",
          {
            token: credential,
          }
        );
        if (response.status == 200) {
          localStorage.setItem("accessToken", response.data.token);
          var accessTokenDecoded = jwtDecode(response.data.token);
          localStorage.setItem("fullName", accessTokenDecoded.fullName);
          window.location.href = "/";
        }
      } catch (error) {
        console.error("Google SSO failed", error);
      }
    },
  },
};
</script>

<style>
body {
  background-color: #f8f9fa;
}
</style>
