import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";
import HomePage from "@/pages/HomePage.vue";
import ShopPage from "@/pages/ShopPage.vue";
import BookingByDatePage from "@/pages/BookingByDatePage.vue";
import CheckoutPage from "@/pages/CheckoutPage.vue";
import CartPage from "@/pages/CartPage.vue";
import BookingList from "@/pages/BookingList.vue";
import LoginSSO from "@/pages/auth/LoginSSO.vue";
import TestPage from "@/components/TestPage.vue";
import ReviewPage from "@/pages/ReviewPage.vue";
import FieldList from "@/pages/FieldList.vue";
import PaymentPage from "@/pages/PaymentPage.vue";
import PaymentSuccessPage from "@/pages/PaymentSuccessPage.vue";

import { jwtDecode } from "jwt-decode";
import BookingHistoryPage from "@/pages/BookingHistoryPage.vue";
import EditUserPage from "@/pages/EditUserPage.vue";
const accessToken =
  store.getters.accessToken || localStorage.getItem("accessToken");
const refreshToken =
  store.getters.refreshToken || localStorage.getItem("refreshToken");
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
      component: EditUserPage,
    },
    {
      path: "/test",
      name: "test-page",
      component: TestPage,
    },
    {
      path: "/review",
      name: "rate",
      component: ReviewPage,
    },
    {
      path: "/field-list",
      name: "field-list",
      component: FieldList,
    },
    {
      path: "/booking-history",
      name: "booking-history",
      component: BookingHistoryPage,
    },
    {
      path: "/payment",
      name: "payment",
      component: PaymentPage,
    },
    {
      path: "/payment-success",
      name: "PaymentSuccess",
      component: PaymentSuccessPage,
    },
  ],
});

export default router;
router.beforeEach((to, from, next) => {
  if (accessToken && refreshToken) {
    const accessTokenDecoded = jwtDecode(accessToken);
    const currentTime = Math.floor(Date.now() / 1000);
    if (accessTokenDecoded.exp < currentTime) {
      store.dispatch("logout");
    }
  }
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
    "/review",
    "/field-list",
    "/payment",
    "/payment-success",
    "/booking-history",
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
  if (accessToken && refreshToken) {
    const accessTokenDecoded = jwtDecode(accessToken);
    const identity = {
      accessToken: accessToken || localStorage.getItem("accessToken"),
      refreshToken: refreshToken,
      userId: accessTokenDecoded.userId,
      emailAddress: accessTokenDecoded.emailAddress,
      fullName: accessTokenDecoded.fullName,
      roleId: accessTokenDecoded.roleId,
    };
    store.dispatch("setIdentity", identity);
  }
});
