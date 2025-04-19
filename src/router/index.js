import { createRouter, createWebHistory } from "vue-router";
import { jwtDecode } from "jwt-decode";
import store from "@/store";

// Import all pages
import HomePage from "@/pages/HomePage.vue";
import ShopPage from "@/pages/ShopPage.vue";
import BookingByDatePage from "@/pages/BookingByDatePage.vue";
import CheckoutPage from "@/pages/CheckoutPage.vue";
import CartPage from "@/pages/CartPage.vue";
import BookingList from "@/pages/BookingList.vue";
import LoginSSO from "@/pages/auth/LoginSSO.vue";
import ReviewPage from "@/pages/ReviewPage.vue";
import FieldList from "@/pages/FieldList.vue";
import PaymentPage from "@/pages/PaymentPage.vue";
import PaymentSuccessPage from "@/pages/PaymentSuccessPage.vue";
import FieldDetails from "@/pages/user/FieldDetails.vue";
import BookingServices from "@/pages/user/BookingServices.vue";
import NearbyStadiums from "@/pages/NearbyStadiums.vue";
import RefundRequestPage from "@/pages/RefundRequestPage.vue";
import BookingHistoryPage from "@/pages/BookingHistoryPage.vue";
import EditUserPage from "@/pages/EditUserPage.vue";
import MultipleBookingPaymentSuccess from "@/pages/user/multiple-booking/PaymentSuccess.vue";
import RefundListPage from "@/pages/RefundListPage.vue";
import RefundTrackingPage from "@/pages/RefundTrackingPage.vue";
import AdminLayout from '@/layouts/AdminLayout.vue';
import AdministrantionPage from "@/pages/AdministrantionPage.vue";
import RevenueReportPage from "@/pages/RevenueReportPage.vue";
import BookingReportPage from "@/pages/BookingReportPage.vue";
import AdminStadiumPage from "@/pages/AdminStadiumPage.vue";
import AdminManageComplaintsPage from "@/pages/AdminManageComplaintsPage.vue";
import AdminUserPage from "@/pages/AdminUserPage.vue";
import AdminVoucherPage from "@/pages/AdminVoucherPage.vue";
import AdminRefundRequestsPage from "@/pages/AdminRefundRequestsPage.vue";
import PaymentHistoryPage from "@/pages/PaymentHistoryPage.vue";
import TestPage from "@/components/TestPage.vue";
import RegisterField from "@/pages/RegisterField.vue";
import UpdateField from "@/pages/UpdateField.vue";
import LessorPage from "@/pages/LessorPage.vue";
import Lessor from "@/pages/Lessor.vue";
import VoucherManager from "@/pages/VoucherManager.vue";




// Public routes that don't require authentication
const publicRoutes = [
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
    path: "/login",
    name: "login-sso",
    component: LoginSSO,
  },
  {
    path: "/test",
    name: "test-page",
    component: TestPage,
  },
  {
    path: "/field-list",
    name: "field-list",
    component: FieldList,
  },
  {
    path: "/nearby-stadiums",
    name: "nearby-stadiums",
    component: NearbyStadiums,
  },
  {
    path: "/multiple-booking/payment-success",
    name: "multiple-booking-success",
    component: MultipleBookingPaymentSuccess,
  },
];

// Protected routes that require authentication
const protectedRoutes = [
  {
    path: "/checkout",
    name: "checkout",
    component: CheckoutPage,
    meta: { requiresAuth: true }
  },
  {
    path: "/cart",
    name: "cart",
    component: CartPage,
    meta: { requiresAuth: true }
  },
  {
    path: "/booking-list",
    name: "booking-list",
    component: BookingList,
    meta: { requiresAuth: true }
  },
  {
    path: "/edit-user",
    name: "edit-user",
    component: EditUserPage,
    meta: { requiresAuth: true }
  },
  {
    path: "/review/:bookingId",
    name: "rate",
    component: ReviewPage,
    meta: { requiresAuth: true }
  },
  {
    path: "/booking-history",
    name: "booking-history",
    component: BookingHistoryPage,
    meta: { requiresAuth: true }
  },
  {
    path: "/payment",
    name: "payment",
    component: PaymentPage,
    meta: { requiresAuth: true }
  },
  {
    path: "/payment-success",
    name: "PaymentSuccess",
    component: PaymentSuccessPage,
    meta: { requiresAuth: true }
  },
  {
    path: "/field-details/:fieldId/:returnPath",
    name: "field-details",
    component: FieldDetails,
    meta: { requiresAuth: true }
  },
  {
    path: "/booking-services",
    name: "booking-services",
    component: BookingServices,
    meta: { requiresAuth: true }
  },
  {
    path: "/refund-request/:bookingId",
    name: "refund-request",
    component: RefundRequestPage,
    meta: { requiresAuth: true }
  },
  {
    path: "/refund-list",
    name: "refund-list",
    component: RefundListPage,
    meta: { requiresAuth: true }
  },
  {
    path: "/refund-tracking",
    name: "refund-tracking",
    component: RefundTrackingPage,
    meta: { requiresAuth: true }
  },
  {
    path: "/booking-by-date/:stadiumId",
    name: "booking-by-date",
    component: BookingByDatePage,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: "/payment-history",
    name: "payment-history",
    component: PaymentHistoryPage,
    meta: { requiresAuth: true }
  },
  {
    path: "/lessor-page",
    name: "lessor-page",
    component: LessorPage,
    children: [
    {
      path: "/revenue",
      name: "revenue",
      component: Lessor,
      meta: { requiresAuth: true, requiresLessor: true }
    },
    {
      path: "/manage-vouchers",
      name: "manage-vouchers",
      component: VoucherManager,
      meta: { requiresAuth: true, requiresLessor: true }
    },
    {
      path: "/update-field",
      name: "updatefield",
      component: UpdateField,
      meta: { requiresAuth: true, requiresLessor: true }
    },
    {
      path: "/register-field",
      name: "registerfield",
      component: RegisterField,
      meta: { requiresAuth: true, requiresLessor: true }
    },
    ],
  }
];

// Admin routes that require admin privileges
const adminRoutes = [
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
      },
      {
        path: "refund-requests",
        name: "refund-requests",
        component: AdminRefundRequestsPage,
        meta: { requiresAuth: true, requiresAdmin: true }
      },
      // {
      //   path: "booking-cancel",
      //   name: "booking-cancel",
      //   component: BookingCancelPage,
      //   meta: { requiresAuth: true, requiresAdmin: true }
      // }
    ]
  }
];

// Combine all routes
const routes = [...publicRoutes, ...protectedRoutes, ...adminRoutes];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard
router.beforeEach(async (to, from, next) => {
  const accessToken = store.getters.accessToken || localStorage.getItem("accessToken");
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);
  const requiresLessor = to.matched.some(record => record.meta.requiresLessor);

  if (requiresAuth) {
    if (!accessToken) {
      localStorage.setItem('redirectPath', to.fullPath);
      return next('/login');
    }

    try {
      const accessTokenDecoded = jwtDecode(accessToken);
      const currentTime = Math.floor(Date.now() / 1000);

      if (accessTokenDecoded.exp < currentTime) {
        await store.dispatch("logout");
        localStorage.setItem('redirectPath', to.fullPath);
        return next('/login');
      }

      const roleId = Number(accessTokenDecoded.roleId);
      if (requiresAdmin &&  roleId !== 1) {
        return next('/');
      }

      if (requiresLessor && (roleId !== 2 && roleId !== 1)) {
        return next('/');
      }

    } catch (error) {
      console.error('Token decode error:', error);
      await store.dispatch("logout");
      return next('/login');
    }
  }

  if (to.path === '/login' && accessToken) {
    return next('/');
  }

  next();
});

// After navigation hook
router.afterEach(() => {
  const accessToken = store.getters.accessToken || localStorage.getItem("accessToken");
  const refreshToken = store.getters.refreshToken || localStorage.getItem("refreshToken");

  if (accessToken && refreshToken) {
    try {
      const accessTokenDecoded = jwtDecode(accessToken);
      const identity = {
        accessToken,
        refreshToken,
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
