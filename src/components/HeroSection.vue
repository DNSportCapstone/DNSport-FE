<template>
  <!-- Hero Section -->
  <section id="hero" class="hero section dns-background">
    <img src="assets/img/sports-hero-bg.jpg" alt="" class="hero-bg" />

    <div class="container">
      <div class="row gy-4 justify-content-between">
        <div
          class="col-lg-4 order-lg-last hero-img"
          data-aos="zoom-out"
          data-aos-delay="100"
        >
          <img
            src="assets/img/hero-img-5.png"
            class="img-fluid animated white-bg"
            alt=""
          />
        </div>

        <div
          class="col-lg-6 d-flex flex-column justify-content-center"
          data-aos="fade-in"
        >
          <h1>Book Your Sports Field with <span>DNSport</span></h1>
          <p>Find and book the best sports fields in your area with ease.</p>
          <div class="d-flex">
            <a href="#about" class="btn-get-started">Booking Now</a>
          </div>
        </div>
      </div>
    </div>

    <svg
      class="hero-waves"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 24 150 28 "
      preserveAspectRatio="none"
    >
      <defs>
        <path
          id="wave-path"
          d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
        ></path>
      </defs>
      <g class="wave1">
        <use xlink:href="#wave-path" x="50" y="3"></use>
      </g>
      <g class="wave2">
        <use xlink:href="#wave-path" x="50" y="0"></use>
      </g>
      <g class="wave3">
        <use xlink:href="#wave-path" x="50" y="9"></use>
      </g>
    </svg>
  </section>
</template>
<style scoped>
.white-bg {
  background-color: white;
  padding: 10px; /* Điều chỉnh khoảng cách nền trắng */
  border-radius: 5px; /* Bo tròn các góc nếu cần */
  display: inline-block; /* Đảm bảo nền chỉ bao quanh ảnh */
}
</style>
