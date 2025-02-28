import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";
import HomePage from "@/pages/HomePage.vue";
import ShopPage from "@/pages/ShopPage.vue";
import BookingByDatePage from "@/pages/BookingByDatePage.vue";
import CheckoutPage from "@/pages/CheckoutPage.vue";
import CartPage from "@/pages/CartPage.vue";
import BookingList from "@/pages/BookingList.vue";
import LoginSSO from "@/pages/auth/LoginSSO.vue";
import EditUser from "@/components/User/EditUser.vue";
import TestPage from "@/components/TestPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/shop",
      name: "shop",
      component: ShopPage,
    },
    {
      path: "/booking-by-date",
      name: "booking-by-date",
      component: BookingByDatePage,
    },
    {
      path: "/checkout",
      name: "checkout",
      component: CheckoutPage,
    },
    {
      path: "/cart",
      name: "cart",
      component: CartPage,
    },
    {
      path: "/booking-list",
      name: "booking-list",
      component: BookingList,
    },
    {
      path: "/login",
      name: "login-sso",
      component: LoginSSO,
    },
    {
      path: "/edituser",
      name: "edituser",
      component: EditUser,
    },
    {
      path: "/test",
      name: "test-page",
      component: TestPage
    },
  ],
});

export default router;
router.beforeEach((to, from, next) => {
  const publicPages = [
    "/login",
    "/shop",
    "/",
    "/booking-by-date",
    "/checkout",
    "/cart",
    "/booking-cancel",
    "/edituser",
    "/test",
  ];
  // const adminPages = ["/product"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("accessToken");
  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next("/");
  } else {
    next();
  }
});

router.afterEach(() => {
  const accessToken = store.getters.accessToken;
  if (accessToken != null) {
    localStorage.setItem("accessToken", accessToken);
  } else if (localStorage.getItem("accessToken") != null) {
    store.dispatch("setAccessToken", localStorage.getItem("accessToken"));
  }
});
