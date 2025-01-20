import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import ShopPage from "@/pages/ShopPage.vue";
import BookingByDatePage from "@/pages/BookingByDatePage.vue";
import CheckoutPage from "@/pages/CheckoutPage.vue";

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
  ],
});

export default router;
router.beforeEach((to, from, next) => {
  const publicPages = ["/shop", "/", "/booking-by-date", "/checkout"];
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
