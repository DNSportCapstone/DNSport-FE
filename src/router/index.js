import { createRouter, createWebHistory } from "vue-router";
import { jwtDecode } from "jwt-decode";
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
import FieldDetails from "@/pages/user/FieldDetails.vue";
import BookingServices from "@/pages/user/BookingServices.vue";
import NearbyStadiums from "@/pages/NearbyStadiums.vue";

import BookingHistoryPage from "@/pages/BookingHistoryPage.vue";
import EditUserPage from "@/pages/EditUserPage.vue";
import AdministrantionPage from "@/pages/AdministrantionPage.vue";
import RevenueReportPage from "@/pages/RevenueReportPage.vue";
import BookingReportPage from "@/pages/BookingReportPage.vue";
import AdminStadiumPage from "@/pages/AdminStadiumPage.vue";
import AdminManageComplaintsPage from "@/pages/AdminManageComplaintsPage.vue";
import AdminUserPage from "@/pages/AdminUserPage.vue";
import AdminVoucherPage from "@/pages/AdminVoucherPage.vue";
import AdminLayout from '@/layouts/AdminLayout.vue';

const routes = [
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
    path: "/edit-user",
    name: "edit-user",
    component: EditUserPage,
    meta: { requiresAuth: true }
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
  {
    path: "/field-details/:fieldId/:returnPath",
    name: "field-details",
    component: FieldDetails,
  },
  {
    path: "/booking-services",
    name: "booking-services",
    component: BookingServices,
  },
  {
    path: "/nearby-stadiums",
    name: "nearby-stadiums",
    component: NearbyStadiums,
  },
  {
    path: "/administration",
    component: AdminLayout,
    children: [
      {
        path: "",
        name: "administration",
        component: AdministrantionPage,
        meta: { requiresAuth: true, requiresAdmin: true }
      },
      {
        path: "revenue-report",
        name: "revenue-report",
        component: RevenueReportPage,
        meta: { requiresAuth: true, requiresAdmin: true }
      },
      {
        path: "booking-report",
        name: "booking-report",
        component: BookingReportPage,
        meta: { requiresAuth: true, requiresAdmin: true }
      },
      {
        path: "stadiums",
        name: "stadiums",
        component: AdminStadiumPage,
        meta: { requiresAuth: true, requiresAdmin: true }
      },
      {
        path: "users",
        name: "users",
        component: AdminUserPage,
        meta: { requiresAuth: true, requiresAdmin: true }
      },
      {
        path: "vouchers",
        name: "vouchers",
        component: AdminVoucherPage,
        meta: { requiresAuth: true, requiresAdmin: true }
      },
      {
        path: "manage-complaints",
        name: "manage-complaints",
        component: AdminManageComplaintsPage,
        meta: { requiresAuth: true, requiresAdmin: true }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const accessToken = store.getters.accessToken || localStorage.getItem("accessToken");

  // Check if route requires auth
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);

  // If route requires authentication
  if (requiresAuth) {
    if (!accessToken) {
      localStorage.setItem('redirectPath', to.fullPath);
      return next('/login');
    }

    // Check token expiration
    try {
      const accessTokenDecoded = jwtDecode(accessToken);
      console.log('Router Guard - Decoded Token:', accessTokenDecoded);
      const currentTime = Math.floor(Date.now() / 1000);

      if (accessTokenDecoded.exp < currentTime) {
        await store.dispatch("logout");
        localStorage.setItem('redirectPath', to.fullPath);
        return next('/login');
      }

      // Check admin permission - convert roleId to number for comparison
      if (requiresAdmin && Number(accessTokenDecoded.roleId) !== 1) {
        console.log('Access Denied - User roleId:', accessTokenDecoded.roleId);
        return next('/'); // Redirect non-admins to home
      }
    } catch (error) {
      console.error('Token decode error:', error);
      await store.dispatch("logout");
      return next('/login');
    }
  }

  // Prevent authenticated users from accessing login page
  if (to.path === '/login' && accessToken) {
    return next('/');
  }

  next();
});

router.afterEach(() => {
  const accessToken = store.getters.accessToken || localStorage.getItem("accessToken");
  const refreshToken = store.getters.refreshToken || localStorage.getItem("refreshToken");

  if (accessToken && refreshToken) {
    try {
      const accessTokenDecoded = jwtDecode(accessToken);
      const identity = {
        accessToken: accessToken,
        refreshToken: refreshToken,
        userId: accessTokenDecoded.userId,
        emailAddress: accessTokenDecoded.emailAddress,
        fullName: accessTokenDecoded.fullName,
        roleId: accessTokenDecoded.roleId,
      };
      store.dispatch("setIdentity", identity);
    } catch (error) {
      console.error('Error decoding token in afterEach:', error);
    }
  }
});

export default router;
