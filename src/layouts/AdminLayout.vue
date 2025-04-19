<template>
    <div class="admin-container" v-if="isAdminRoute">
        <!-- Sidebar -->
        <div class="sidebar" :class="{ 'sidebar-open': isSidebarOpen }">
            <div class="sidebar-header">
                <h3>{{ t("AdminDashboard") }}</h3>
            </div>
            <nav class="sidebar-nav">
                <ul>
                    <a
                        href="/" :class="{ active: currentRoute === '' }" >
                        <i class="bi bi-house"></i>
                        {{ t('Home') }}
                    </a>
                    <li>
                        <router-link :to="{ name: 'revenue-report' }"
                            :class="{ active: currentRoute === 'revenue-report' }" @click="navigateTo">
                            <i class="bi bi-graph-up"></i>
                            {{ t('RevenueReportTitle') }}
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'booking-report' }"
                            :class="{ active: currentRoute === 'booking-report' }" @click="navigateTo">
                            <i class="bi bi-calendar-check"></i>
                            {{ t('BookingReportTitle') }}
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'stadiums' }" :class="{ active: currentRoute === 'stadiums' }"
                            @click="navigateTo">
                            <i class="bi bi-building"></i>
                            {{ t('Stadium') }}
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'users' }" :class="{ active: currentRoute === 'users' }"
                            @click="navigateTo">
                            <i class="bi bi-people"></i>
                            {{ t('Users') }}
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'vouchers' }" :class="{ active: currentRoute === 'vouchers' }"
                            @click="navigateTo">
                            <i class="bi bi-ticket-perforated"></i>
                            {{ t('Vouchers') }}
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'manage-complaints' }"
                            :class="{ active: currentRoute === 'manage-complaints' }" @click="navigateTo">
                            <i class="bi bi-exclamation-triangle"></i>
                            {{ t('ManageComplaints') }}
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'refund-requests' }"
                            :class="{ active: currentRoute === 'refund-requests' }" @click="navigateTo">
                            <i class="bi bi-arrow-counterclockwise"></i>
                            {{ t('RefundRequests') }}
                        </router-link>
                    </li>
                </ul>
            </nav>
        </div>

        <!-- Main Content -->
        <div class="main-content">
            <div class="header">
                <button class="toggle-sidebar" @click="toggleSidebar">
                    <i class="bi bi-list"></i>
                </button>
                <div class="new-page-title">
                    {{ t(getPageTitle()) }}
                </div>
            </div>

            <div class="content-wrapper">
                <router-view></router-view>
            </div>
        </div>
    </div>
    <router-view v-else></router-view>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

export default {
    name: 'AdminLayout',
    setup() {
        const router = useRouter();
        const route = useRoute();
        const { t } = useI18n();
        const isSidebarOpen = ref(true);

        const isAdminRoute = computed(() => {
            return route.path.startsWith('/administration');
        });

        onMounted(() => {
            if (route.path === '/administration') {
                router.push({ name: 'revenue-report' });
            }
        });

        const currentRoute = computed(() => {
            return route.name;
        });

        const navigateTo = () => {
            if (window.innerWidth < 992) {
                isSidebarOpen.value = false;
            }
        };

        const toggleSidebar = () => {
            isSidebarOpen.value = !isSidebarOpen.value;
        };

        const getPageTitle = () => {
            switch (route.name) {
                case 'revenue-report':
                    return 'RevenueReportTitle';
                case 'booking-report':
                    return 'BookingReportTitle';
                case 'stadiums':
                    return 'Stadium';
                case 'users':
                    return 'Users';
                case 'vouchers':
                    return 'Vouchers';
                case 'manage-complaints':
                    return 'ManageComplaints';
                case 'refund-requests':
                    return 'RefundRequests';
                default:
                    return 'AdminDashboard';
            }
        };

        return {
            t,
            navigateTo,
            currentRoute,
            isSidebarOpen,
            toggleSidebar,
            getPageTitle,
            isAdminRoute
        };
    }
};
</script>


<style scoped>
.admin-container {
    display: flex;
    min-height: 100vh;
    background-color: #f8f9fa;
}

/* Sidebar Styles */
.sidebar {
    width: 250px;
    background-color: #343a40;
    color: #fff;
    transition: all 0.3s;
    height: 100vh;
    position: fixed;
    left: 0;
}

.sidebar-header {
    padding: 20px;
    background: #2c3136;
}

.sidebar-header h3 {
    margin: 0;
    font-size: 1.5rem;
}

.sidebar-nav {
    padding: 20px 0;
}

.sidebar-nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.sidebar-nav li {
    margin-bottom: 5px;
}

.sidebar-nav a {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    color: #fff;
    text-decoration: none;
    transition: all 0.3s;
}

.sidebar-nav a:hover,
.sidebar-nav a.active {
    background-color: #2c3136;
}

.sidebar-nav i {
    margin-right: 10px;
}

/* Main Content Styles */
.main-content {
    flex: 1;
    margin-left: 250px;
    transition: all 0.3s;
}

.header {
    background: #fff;
    padding: 15px 30px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
}

.toggle-sidebar {
    display: none;
    background: none;
    border: none;
    font-size: 1.5rem;
    margin-right: 15px;
    cursor: pointer;
}

.new-page-title {
    font-size: 1.5rem;
    margin: 0;
}

.new-page-title {
    color: #333;
    font-weight: bold;
}

.new-page-title {
    padding: 10px;
    background-color: #f8f9fa;
}

.content-wrapper {
    padding: 30px;
}

/* Responsive Design */
@media (max-width: 991.98px) {
    .sidebar {
        margin-left: -250px;
    }

    .sidebar.sidebar-open {
        margin-left: 0;
    }

    .main-content {
        margin-left: 0;
    }

    .toggle-sidebar {
        display: block;
    }
}
</style>
