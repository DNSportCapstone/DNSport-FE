<template>
  <div class="home">
    <!-- Header -->
    <header class="home-header">
      <h1>Chào mừng đến với Dịch vụ Thuê Sân Thể Thao tại Đà Nẵng</h1>
      <p>Thuê sân bóng đá, bóng chuyền, cầu lông và nhiều loại sân thể thao khác tại Đà Nẵng.</p>
    </header>

    <!-- Image Section -->
    <section class="home-image">
      <!-- <img src="@/assets/images/sports-field.jpg" alt="Sân thể thao Đà Nẵng" /> -->
    </section>

    <!-- Service Information -->
    <section class="home-info">
      <h2>Dịch vụ của chúng tôi</h2>
      <ul>
        <li>Thuê sân bóng đá cỏ nhân tạo và sân cỏ tự nhiên</li>
        <li>Thuê sân bóng chuyền bãi biển và sân trong nhà</li>
        <li>Thuê sân cầu lông, tennis và các sân thể thao khác</li>
      </ul>
    </section>

    <!-- Contact Information -->
    <section class="home-contact">
      <h2>Liên hệ với chúng tôi</h2>
      <p>Để đặt sân hoặc biết thêm thông tin chi tiết, vui lòng liên hệ qua:</p>
      <ul>
        <li>Email: <a href="mailto:info@dnsports.com">info@dnsports.com</a></li>
        <li>Điện thoại: +84 123 456 789</li>
      </ul>
    </section>

    <!-- Footer -->
    <footer class="home-footer">
      <p>&copy; 2025 DNSports. Tất cả các quyền được bảo lưu.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>

<style scoped>
.home {
  text-align: center;
  font-family: Arial, sans-serif;
}

.home-header {
  background-color: #4CAF50;
  color: white;
  padding: 20px;
  margin-bottom: 30px;
}

.home-header h1 {
  font-size: 36px;
  margin-bottom: 10px;
}

.home-header p {
  font-size: 18px;
}

.home-image img {
  width: 80%;
  max-width: 800px;
  margin-bottom: 30px;
}

.home-info,
.home-contact {
  padding: 20px;
  margin: 20px 0;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.home-info h2,
.home-contact h2 {
  font-size: 24px;
  color: #333;
}

.home-info ul,
.home-contact ul {
  list-style-type: none;
  padding: 0;
}

.home-info li,
.home-contact li {
  font-size: 18px;
  margin: 5px 0;
}

.home-footer {
  background-color: #333;
  color: white;
  padding: 10px;
  margin-top: 50px;
}
</style>
