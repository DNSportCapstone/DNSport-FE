<template>
    <footer id="footer" class="footer dark-background">
        <div class="container copyright text-center mt-4">
            <p>© <span>Copyright</span> <span>{{ currentYear }}</span> <strong class="px-1 sitename">DNS</strong> <span>All Rights Reserved</span></p>
            <div class="credits">
                <!-- All the links in the footer should remain intact. -->
                <!-- You can delete the links only if you've purchased the pro version. -->
                <!-- Licensing information: https://bootstrapmade.com/license/ -->
                <!-- Purchase the pro version with working PHP/AJAX contact form: [buy-url] -->
                <!-- Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a> Distributed By <a href="https://themewagon.com">ThemeWagon</a> -->
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    data() {
        return {
            currentYear: new Date().getFullYear(),
        };
    },
};
</script>

<style scoped>
/* Add your footer-specific styles here */
</style>
