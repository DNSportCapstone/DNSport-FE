import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import ShopPage from "@/pages/ShopPage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import AdminPage from "@/pages/AdminPage.vue";

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
      path: "/login",
      name: "login",
      component: LoginPage,
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminPage,
    },
  ],
});

export default router;
router.beforeEach((to, from, next) => {
  const publicPages = ["/shop", "/", "/login", "/admin"];
  //const adminPages = ["/admin"];
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
