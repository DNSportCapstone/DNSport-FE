<template>
  <div style="padding-bottom: 10vh"></div>
  <div class="payment-success-container">
    <div class="success-container">
      <div class="success-circle-border">
        <div class="success-circle">
          <font-awesome-icon class="icon-success" :icon="['fas', 'check']" />
        </div>
      </div>
    </div>
    <h1>Thanh toán thành công!</h1>
    <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>
    <router-link to="/" class="home-button">Quay về trang chủ</router-link>
  </div>
  <div style="margin-bottom: 20vh"></div>
</template>

<style scoped>
.payment-success-container {
  max-width: 750px;
  margin: auto;
  text-align: center;
  padding: 50px 20px;
  background: white;
  animation: fadeIn 0.8s ease-in-out;
}

.success-icon {
  font-size: 60px;
  margin-bottom: 20px;
  color: #4caf50;
  animation: pop 0.5s ease-out;
}

h1 {
  color: #333;
  font-size: 26px;
}

p {
  color: #666;
  font-size: 18px;
  margin: 10px 0 20px;
}

.home-button {
  display: inline-block;
  padding: 12px 20px;
  background: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: bold;
  transition: background 0.3s;
}

.home-button:hover {
  background: #0056b3;
}

/* Hiệu ứng xuất hiện */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Hiệu ứng icon bật lên */
@keyframes pop {
  0% {
    transform: scale(0);
  }

  80% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}

.success-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.success-circle-border {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  border: 4px solid rgba(76, 175, 80, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: border-pulse 1.5s ease-out;
}

.success-circle {
  width: 80px;
  height: 80px;
  background-color: #4caf50;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: scale-in 0.5s cubic-bezier(0.54, 1.5, 0.38, 1.11);
}

.icon-success {
  color: white;
  font-size: 40px;
  animation: check-appear 0.5s ease-in-out 0.2s both;
}

/* Animations */
@keyframes border-pulse {
  0% {
    transform: scale(0);
    opacity: 0;
  }

  50% {
    transform: scale(1.1);
    opacity: 1;
  }

  100% {
    transform: scale(1);
  }
}

@keyframes scale-in {
  0% {
    transform: scale(0);
  }

  70% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes check-appear {
  0% {
    transform: scale(0);
    opacity: 0;
  }

  70% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
