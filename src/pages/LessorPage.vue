<template>
  <div class="admin-container">
    <!-- Mobile Menu Toggle -->
    <div class="mobile-header">
      <button @click="toggleSidebar" class="menu-toggle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
      <div class="logo-mobile">Lessor Dashboard</div>
    </div>

    <!-- Sidebar -->
    <div class="sidebar" :class="{ 'sidebar-open': isSidebarOpen }">
      <div class="sidebar-header">
        <div class="logo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
          <span>Lessor Dashboard</span>
        </div>
        <button @click="toggleSidebar" class="close-sidebar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <ul class="sidebar-menu">
        <li
          @click="navigateTo('revenue')"
          :class="{ active: currentRoute === 'revenue' }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="12" y1="20" x2="12" y2="10"></line>
            <line x1="18" y1="20" x2="18" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="16"></line>
          </svg>
          <span>Revenue Report</span>
        </li>
        <li
          @click="navigateTo('manage-vouchers')"
          :class="{ active: currentRoute === 'manage-vouchers' }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          <span>Vouchers</span>
        </li>
        <li
          @click="navigateTo('manage-feedback')"
          :class="{ active: currentRoute === 'manage-feedback' }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            width="20"
            height="20"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 3.866-3.582 7-8 7-1.294 0-2.515-.244-3.572-.678L3 21l1.678-4.428C3.244 15.515 3 14.294 3 13c0-3.866 3.582-7 8-7s8 3.134 8 7z"
            />
          </svg>
          <span>Feedback</span>
        </li>
      </ul>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <div class="header">
        <div class="header-left">
          <button @click="navigateTo('home')" class="back-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span>Home</span>
          </button>
          <div class="page-title">
            {{ getPageTitle() }}
          </div>
        </div>
      </div>

      <div class="content-wrapper">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const isSidebarOpen = ref(false);

    const currentRoute = computed(() => {
      return route.name;
    });

    const navigateTo = (routeName) => {
      router.push({ name: routeName });
      if (window.innerWidth < 992) {
        isSidebarOpen.value = false;
      }
    };

    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value;
    };

    const logout = () => {
      // Implement logout logic here
      alert("Đăng xuất thành công");
      router.push({ name: "login" });
    };

    const getPageTitle = () => {
      switch (route.name) {
        case "revenue-report":
          return "Báo Cáo Doanh Thu";
      }
    };

    return {
      navigateTo,
      currentRoute,
      isSidebarOpen,
      toggleSidebar,
      logout,
      getPageTitle,
    };
  },
};
</script>

<style scoped>
/* Base Styles */
.admin-container {
  display: flex;
  min-height: 100vh;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f8f9fa;
}

/* Sidebar Styles */
.sidebar {
  width: 280px;
  background: #2c3e50;
  color: #ecf0f1;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  z-index: 1000;
}

.sidebar-header {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  font-size: 18px;
}

.sidebar-user {
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.user-avatar img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.user-name {
  font-weight: 600;
  font-size: 16px;
}

.user-role {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
}

.sidebar-divider {
  padding: 15px 20px 10px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.5);
}

.sidebar-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-menu li {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 20px;
  cursor: pointer;
  transition: all 0.2s;
  border-left: 3px solid transparent;
}

.sidebar-menu li:hover {
  background: rgba(255, 255, 255, 0.1);
}

.sidebar-menu li.active {
  background: rgba(255, 255, 255, 0.1);
  border-left: 3px solid #3498db;
}

.sidebar-menu li svg {
  color: rgba(255, 255, 255, 0.7);
}

.sidebar-menu li.active svg {
  color: #3498db;
}

.logout-item {
  margin-top: auto;
  color: #e74c3c;
}

.close-sidebar {
  display: none;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

/* Main Content Styles */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

.header {
  height: 70px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: #2c3e50;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.back-button:hover {
  background-color: #f1f1f1;
}

.back-button svg {
  color: #3498db;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.action-button {
  background: none;
  border: none;
  position: relative;
  cursor: pointer;
  color: #7f8c8d;
}

.notification-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #e74c3c;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-dropdown {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 8px 15px;
  border-radius: 30px;
  transition: all 0.2s;
}

.user-dropdown:hover {
  background: #f1f1f1;
}

.user-avatar-small {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
}

.user-name-small {
  font-weight: 500;
  color: #2c3e50;
}

.content-wrapper {
  padding: 30px;
  flex: 1;
  overflow-y: auto;
}

/* Mobile Styles */
.mobile-header {
  display: none;
  height: 60px;
  background: #2c3e50;
  padding: 0 20px;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}

.menu-toggle {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

.logo-mobile {
  color: white;
  font-weight: 600;
  margin-left: 20px;
}

/* Responsive Styles */
@media (max-width: 991px) {
  .sidebar {
    position: fixed;
    left: -280px;
    top: 0;
    bottom: 0;
    box-shadow: 5px 0 15px rgba(0, 0, 0, 0.1);
  }

  .sidebar-open {
    left: 0;
  }

  .close-sidebar {
    display: block;
  }

  .mobile-header {
    display: flex;
  }

  .main-content {
    margin-top: 60px;
  }

  .header {
    padding: 0 20px;
  }
}

@media (max-width: 576px) {
  .user-name-small {
    display: none;
  }

  .header {
    padding: 0 15px;
  }

  .content-wrapper {
    padding: 20px 15px;
  }
}
</style>
