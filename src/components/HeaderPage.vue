<template>
  <header id="header" class="header d-flex align-items-center fixed-top">
    <div
      class="container-fluid container-xl position-relative d-flex align-items-center justify-content-between"
    >
      <a href="/" class="logo d-flex align-items-center">
        <!-- Uncomment the line below if you also wish to use an image logo -->
        <img src="assets/img/logo.png" alt="" />
        <h1 class="sitename">DNS</h1>
      </a>

      <nav id="navmenu" class="navmenu">
        <ul>
          <li>
            <a
              href="#"
              @click="changeMenu('hpl-home')"
              :class="currentHeaderMenu == 'hpl-home' ? 'active' : ''"
              ><router-link to="/">Home</router-link></a
            >
          </li>
          <li>
            <a
              href="#about"
              @click="changeMenu('hpl-about')"
              :class="currentHeaderMenu == 'hpl-about' ? 'active' : ''"
              >Field</a
            >
          </li>

          <!-- <li>
            <a
              href="#gallery"
              @click="changeMenu('hpl-gallery')"
              :class="currentHeaderMenu == 'hpl-gallery' ? 'active' : ''"
              >Review</a
            >
          </li>
          <li>
            <a
              href="#team"
              @click="changeMenu('hpl-team')"
              :class="currentHeaderMenu == 'hpl-team' ? 'active' : ''"
              >Team</a
            >
          </li>
          <li>
            <a
              href="#pricing"
              @click="changeMenu('hpl-pricing')"
              :class="currentHeaderMenu == 'hpl-pricing' ? 'active' : ''"
              >Pricing</a
            >
          </li>
          <li>
            <a
              href="#shop"
              @click="changeMenu('hpl-shop')"
              :class="currentHeaderMenu == 'hpl-shop' ? 'active' : ''"
              ><router-link to="/shop">Shop</router-link></a
            >
          </li>
          <li class="dropdown">
            <a href="#"
              ><span>Dropdown</span>
              <i class="bi bi-chevron-down toggle-dropdown"></i
            ></a>
            <ul>
              <li><a href="#">Dropdown 1</a></li>
              <li class="dropdown">
                <a href="#"
                  ><span>Deep Dropdown</span>
                  <i class="bi bi-chevron-down toggle-dropdown"></i
                ></a>
                <ul>
                  <li><a href="#">Deep Dropdown 1</a></li>
                  <li><a href="#">Deep Dropdown 2</a></li>
                  <li><a href="#">Deep Dropdown 3</a></li>
                  <li><a href="#">Deep Dropdown 4</a></li>
                  <li><a href="#">Deep Dropdown 5</a></li>
                </ul>
              </li>
              <li><a href="#">Dropdown 2</a></li>
              <li><a href="#">Dropdown 3</a></li>
              <li><a href="#">Dropdown 4</a></li>
            </ul>
          </li> -->
          <li><a href="#contact">Contact</a></li>
          <li v-if="isLogin" class="dropdown">
            <a href="#"
              ><font-awesome-icon
                class="pr-5"
                :icon="['far', 'user']"
              /><span>{{ fullName }}</span></a
            >
            <ul>
              <li>
                <a href="/edituser"
                  ><span
                    ><font-awesome-icon
                      class="pr-5"
                      :icon="['fas', 'address-card']"
                    />My Profile</span
                  ></a
                >
              </li>
              <!-- <li class="dropdown">
                <a href="#"
                  ><span>Deep Dropdown</span>
                  <i class="bi bi-chevron-down toggle-dropdown"></i
                ></a>
                <ul>
                  <li><a href="#">Deep Dropdown 1</a></li>
                  <li><a href="#">Deep Dropdown 2</a></li>
                  <li><a href="#">Deep Dropdown 3</a></li>
                  <li><a href="#">Deep Dropdown 4</a></li>
                  <li><a href="#">Deep Dropdown 5</a></li>
                </ul>
              </li>
              <li><a href="#">Dropdown 2</a></li>
              <li><a href="#">Dropdown 3</a></li> -->
              <li>
                <a href="#" @click="handleLogout()"
                  ><span
                    ><font-awesome-icon
                      class="pr-5"
                      :icon="['fas', 'power-off']"
                    />Logout</span
                  ></a
                >
              </li>
            </ul>
          </li>
          <li v-else>
            <button class="btn btn-dns-secondary" @click="handleLogin()">
              Log In
            </button>
          </li>
          <li>
            <ChooseLanguage />
          </li>
        </ul>
        <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>
      </nav>
    </div>
  </header>
</template>

<script>
import CommonHelper from "@/utils/common";
import ChooseLanguage from "@/components/ChooseLanguage.vue";

export default {
  name: "HeaderPage", // 1. Tên component
  components: {
    ChooseLanguage,
  }, // 2. Component con
  directives: {}, // 3. Directive cục bộ
  extends: {}, // 4. Kế thừa
  mixins: [], // 4. Mixins
  props: {
    // 5. Props
  },
  emits: ["eventName"], // 6. Sự kiện phát ra
  data() {
    // 7. Dữ liệu
    return {
      count: 0,
      currentHeaderMenu: "hpl-home",
      currentLang: localStorage.getItem("lang") || "en",
    };
  },
  computed: {
    // 8. Thuộc tính tính toán
    reversedMsg() {
      return this.msg.split("").reverse().join("");
    },
    isLogin() {
      if (
        localStorage.getItem("accessToken") != null ||
        this.$store.getters.accessToken != null
      ) {
        return true;
      } else {
        return false;
      }
    },
    fullName() {
      var { fullName } = this.$store.getters.identity;
      return fullName;
    },
  },
  methods: {
    // 9. Phương thức
    increment() {
      this.count++;
    },
    changeMenu(menu) {
      console.log(CommonHelper.getCurrentUserId());
      this.currentHeaderMenu = menu;
    },
    handleLogout() {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("currentUser");
      window.location.href = "/";
    },
    handleLogin() {
      this.$router.push("/login");
    },
  },
  watch: {
    // 10. Theo dõi dữ liệu
    msg(newValue, oldValue) {
      console.log(`msg changed from ${oldValue} to ${newValue}`);
    },
  },
  mounted() {
    // 11. Phương thức vòng đời
    this.$i18n.locale = this.currentLang;
  },
};
</script>
