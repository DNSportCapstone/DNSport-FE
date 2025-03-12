<template>
  <!-- Dropdown chọn ngôn ngữ -->
  <div class="dropdown ddl-language">
    <button
      class="btn btn-dns-primary dropdown-toggle"
      type="button"
      id="languageDropdown"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <img :src="currentFlag" alt="flag" class="flag-icon" />
      {{ $t("language") }}
    </button>
    <ul class="dropdown-menu" aria-labelledby="languageDropdown">
      <li class="dropdown-li">
        <a class="dropdown-item" href="#" @click="changeLanguage('en')">
          <img
            src="https://flagcdn.com/w40/gb.png"
            alt="English"
            class="flag-icon"
          />
          EN
        </a>
      </li>
      <li class="dropdown-li">
        <a class="dropdown-item" href="#" @click="changeLanguage('vi')">
          <img
            src="https://flagcdn.com/w40/vn.png"
            alt="Vietnamese"
            class="flag-icon"
          />
          VN
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "ChooseLanguage", // 1. Tên component
  components: {}, // 2. Component con
  directives: {}, // 3. Directive cục bộ
  extends: {}, // 4. Kế thừa
  mixins: [], // 4. Mixins
  props: {
    // 5. Props
  },
  data() {
    // 7. Dữ liệu
    return {
      flags: {
        en: "https://flagcdn.com/w40/gb.png",
        vi: "https://flagcdn.com/w40/vn.png",
      },
      currentLang: localStorage.getItem("lang") || "en",
    };
  },
  computed: {
    currentFlag() {
      return this.flags[this.currentLang];
    },
  },
  methods: {
    changeLanguage(lang) {
      this.currentLang = lang;
      this.$i18n.locale = lang;
      localStorage.setItem("lang", lang);
      this.$router.go(0);
    },
  },
  mounted() {
    this.$i18n.locale = this.currentLang;
  },
};
</script>
<style scoped>
.flag-icon {
  width: 24px;
  height: 16px;
  margin-right: 8px;
}
.btn-dns-primary {
  width: 100%;
}
.dropdown-menu {
  min-width: none;
  width: 5px !important;
}
.dropdown-li {
  min-width: none;
  padding: 0;
  margin: 0;
}
.dropdown-item {
  width: 10px;
}
</style>
