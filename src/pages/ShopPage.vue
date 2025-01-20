<template>
    <!-- Team Section -->
    <section id="team" class="team section">

        <!-- Section Title -->
        <div class="container section-title" data-aos="fade-up">
            <h2>Stadiums</h2>
            <div><span>Check Our</span> <span class="description-title">Stadiums</span></div>
        </div><!-- End Section Title -->

        <div class="container">

            <div class="row gy-5">

                <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
                    <div class="member">
                        <div class="pic"><img
                                src="https://www.sporta.vn/assets/default_venue_0-dc1f6687f619915230b62712508933a71a6e9529c390237b9766acc0d59539ab.webp"
                                class="img-fluid" alt=""></div>
                        <div class="member-info">
                            <h4>Chuyen Viet Stadium</h4>
                            <span class="stadium-status-open">Open</span>
                            <button class="btn btn-dns-primary mt-2">Booking Now</button>
                            <div class="social">
                                <a href=""><i class="bi bi-twitter-x"></i></a>
                                <a href=""><i class="bi bi-facebook"></i></a>
                                <a href=""><i class="bi bi-instagram"></i></a>
                                <a href=""><i class="bi bi-linkedin"></i></a>
                            </div>
                        </div>
                    </div>
                </div><!-- End Team Member -->

                <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
                    <div class="member">
                        <div class="pic"><img
                                src="https://d82bjlqmetw03.cloudfront.net/uploads/images/60/large-IMG_0829?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIQW3XISBSHKJGJBQ%2F20250117%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20250117T140847Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=6b0f33c53d7e44630a5f1745cfc58f4695d2c54616e39802422113620ed07293"
                                class="img-fluid" alt=""></div>
                        <div class="member-info">
                            <h4>Trung Nu Vuong Stadium</h4>
                            <span class="stadium-status-closed">Closed</span>
                            <button class="btn btn-dns-primary mt-2">Booking Now</button>
                            <div class="social">
                                <a href=""><i class="bi bi-twitter-x"></i></a>
                                <a href=""><i class="bi bi-facebook"></i></a>
                                <a href=""><i class="bi bi-instagram"></i></a>
                                <a href=""><i class="bi bi-linkedin"></i></a>
                            </div>
                        </div>
                    </div>
                </div><!-- End Team Member -->

                <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
                    <div class="member">
                        <div class="pic"><img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEQnd5MlHQ2uqH7LjGJhnTvrRB3mG53FtnTQ&s"
                                class="img-fluid" alt=""></div>
                        <div class="member-info">
                            <h4>BDC Stadium</h4>
                            <span class="stadium-status-open">Open</span>
                            <div></div>
                            <button class="btn btn-dns-primary mt-2" @click="onClick()">Booking Now</button>
                            <div class="social">
                                <a href=""><i class="bi bi-twitter-x"></i></a>
                                <a href=""><i class="bi bi-facebook"></i></a>
                                <a href=""><i class="bi bi-instagram"></i></a>
                                <a href=""><i class="bi bi-linkedin"></i></a>
                            </div>
                        </div>
                    </div>
                </div><!-- End Team Member -->

            </div>

        </div>

    </section><!-- /Team Section -->
</template>
<script>

export default {
    name: 'App',
    components: {
    },
    methods: {
        onClick() {

        }
    }
}
</script>