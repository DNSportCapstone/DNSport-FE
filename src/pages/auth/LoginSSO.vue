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
import { jwtDecode } from "jwt-decode";
import API from "@/utils/axios";

export default {
  methods: {
    async loginWithGoogle(callback) {
      try {
        const { credential } = callback;
        const response = await API.post("/auth/google-login", {
          token: credential,
        });

        if (response.status == 200) {
          var accessTokenDecoded = jwtDecode(response.data.accessToken);

          this.$store.dispatch("setAccessToken", response.data.accessToken);

          const refreshToken = await API.post("/auth/refresh-token", {
            accessToken: response.data.accessToken,
          });

          const identity = {
            accessToken: response.data.accessToken,
            emailAddress: accessTokenDecoded.emailAddress,
            userId: accessTokenDecoded.userId,
            fullName: accessTokenDecoded.fullName,
            roleId: accessTokenDecoded.roleId,
            refreshToken: refreshToken.data.refreshToken,
          };

          this.$store.dispatch("login", identity);
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
