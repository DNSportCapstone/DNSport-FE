<template>
  <LoadingOverlay />
  <template v-if="!isAdminRoute">
    <HeaderPage />
    <div class="mt-100">
      <router-view></router-view>
    </div>
    <AISuggestion />
    <FooterPage />
  </template>
  <template v-else>
    <router-view></router-view>
  </template>
</template>

<script>
import HeaderPage from "@/components/HeaderPage.vue";
import FooterPage from "@/components/FooterPage.vue";
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import AISuggestion from "@/components/AISuggestion.vue";

export default {
  name: "App",
  components: {
    HeaderPage,
    FooterPage,
    LoadingOverlay,
    AISuggestion,
  },
  computed: {
    isAdminRoute() {
      return this.$route.path.startsWith("/administration");
    },
  },
};
</script>
