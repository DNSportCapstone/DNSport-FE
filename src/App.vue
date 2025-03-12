<template>
  <LoadingOverlay />
  <HeaderPage />
  <div class="mt-100">
    <router-view></router-view>
  </div>
  <FooterPage />
</template>

<script>
import HeaderPage from "@/components/HeaderPage.vue";
import FooterPage from "@/components/FooterPage.vue";
import LoadingOverlay from "@/components/LoadingOverlay.vue";

export default {
  name: "App",
  components: {
    HeaderPage,
    FooterPage,
    LoadingOverlay,
  },
};
</script>
