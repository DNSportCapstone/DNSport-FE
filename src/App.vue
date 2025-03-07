<template>
  <HeaderPage />
  <div class="mt-100">
    <router-view></router-view>
  </div>
  <FooterPage />
</template>

<script>
import HeaderPage from "@/components/HeaderPage.vue";
import FooterPage from "@/components/FooterPage.vue";

export default {
  name: "App",
  components: {
    HeaderPage,
    FooterPage,
  },
};
</script>
