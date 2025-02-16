import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import ShopPage from "@/pages/ShopPage.vue";
import BookingByDatePage from "@/pages/BookingByDatePage.vue";
import CheckoutPage from "@/pages/CheckoutPage.vue";
import CartPage from "@/pages/CartPage.vue";
import BookingList from "@/pages/BookingList.vue";
import LoginSSO from "@/pages/auth/LoginSSO.vue";

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
