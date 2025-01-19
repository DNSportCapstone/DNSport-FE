<template>
  <div class="login-container">
    <!-- Tiêu đề trang -->
    <h1>Welcome to DNS</h1>
    <p>Please log in using your Google account</p>
    <img
      class="login-image"
      src="https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/image8-2.jpg?width=595&height=400&name=image8-2.jpg"
      alt="Login Illustration"
    />
    <!-- Nút Google SSO -->
    <div
      id="g_id_onload"
      data-client_id="YOUR_GOOGLE_CLIENT_ID"
      data-login_uri="YOUR_REDIRECT_URI"
      data-auto_prompt="false"
    ></div>
    <div
      class="g_id_signin"
      data-type="standard"
      data-size="large"
      data-theme="outline"
      data-text="signin_with"
      data-shape="rectangular"
      data-logo_alignment="left"
    ></div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  props: {
    msg: String,
  },
  mounted() {
    // Any initialization logic if needed
  },
};
</script>

<style scoped>
/* Căn chỉnh container */
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f9f9f9;
  padding: 20px;
}

/* Tiêu đề và mô tả */
h1 {
  margin-top: 20px;
  font-size: 2rem;
  color: #333;
}

p {
  margin-top: 10px;
  font-size: 1rem;
  color: #555;
}

/* Hình ảnh minh họa */
.login-image {
  margin-top: 30px;
  max-width: 100%;
  height: 80px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Nút Google Sign-In */
.g_id_signin {
  margin-top: 20px;
}
</style>
