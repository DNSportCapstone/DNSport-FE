<template>
  <div class="admin-page">
    <div class="tabs">
      <ul class="tab-list">
        <li
          v-for="tab in tabs"
          :key="tab.name"
          :class="['tab-item', { active: currentTab === tab.name }]"
          @click="setTab(tab.name)"
        >
          {{ tab.label }}
        </li>
      </ul>
    </div>

    <div class="tab-content">
      <UserTable v-if="currentTab === 'user'" />
      <FieldListPage v-if="currentTab === 'fieldList'" />
      <NewFieldList v-if="currentTab === 'newFieldList'" />
      <ReportManagement v-if="currentTab === 'reports'" />
      <PromotionsManagement v-if="currentTab === 'promotions'" />
      <StatisticsBooking v-if="currentTab === 'statistics'" />
    </div>
  </div>
</template>

<script>
import UserTable from "@/components/UserPage.vue";
import FieldListPage from "@/components/FieldListPage.vue";
import NewFieldList from "@/components/NewFieldList.vue";
import ReportManagement from "@/components/ReportManagement.vue";
import PromotionsManagement from "@/components/PromotionsManagement.vue";
import StatisticsBooking from "@/components/StatisticsBooking.vue";

export default {
  name: "AdminPage",
  components: {
    UserTable,
    FieldListPage,
    NewFieldList,
    ReportManagement,
    PromotionsManagement,
    StatisticsBooking,
  },
  data() {
    return {
      currentTab: "user",
      isAdmin: true, // Cập nhật giá trị này tùy thuộc vào người dùng
      tabs: [
        { name: "user", label: "User" },
        { name: "fieldList", label: "Field List" },
        { name: "newFieldList", label: "New Fields" },
        { name: "reports", label: "Reports" },
        { name: "promotions", label: "Promotions" },
        { name: "statistics", label: "Statistics" },
      ],
    };
  },
  methods: {
    setTab(tabName) {
      this.currentTab = tabName;
    },
  },
};
</script>

<style scoped>
.admin-page {
  display: flex;
  background-color: #f5f5f5;
  padding: 20px;
}

.tabs {
  width: 200px;
  margin-right: 20px;
}

.tab-list {
  list-style-type: none;
  padding: 0;
}

.tab-item {
  padding: 10px;
  cursor: pointer;
  background-color: #e0e0e0;
  margin-bottom: 5px;
  border-radius: 5px;
  text-align: center;
}

.tab-item.active {
  background-color: #007bff;
  color: white;
}

.tab-item:hover {
  background-color: #d6d6d6;
}

.tab-content {
  flex: 1;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
