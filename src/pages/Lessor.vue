<template>
  <div class="revenue-page-container">
    <!-- Revenue Summary -->
    <div class="card mb-3" v-if="ownerAmountData">
      <div class="card-body">
        <h5 class="card-title">Revenue Summary</h5>
        <p class="card-text">
          Total Owner Amount:
          <strong>{{
            formatCurrency(ownerAmountData.totalOwnerAmount)
          }}</strong>
        </p>
        <p class="card-text">
          From {{ ownerAmountData.fieldsCount }} field(s) across
          {{ ownerAmountData.stadiumsCount }} stadium(s).
        </p>
      </div>
    </div>

    <!-- Date Range Filter and Export -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div class="d-flex gap-2">
        <div class="input-group">
          <span class="input-group-text">From</span>
          <input
            type="date"
            class="form-control"
            v-model="dateRange.start"
            @change="fetchRevenueData"
          />
        </div>
        <div class="input-group">
          <span class="input-group-text">To</span>
          <input
            type="date"
            class="form-control"
            v-model="dateRange.end"
            @change="fetchRevenueData"
          />
        </div>
        <button class="btn btn-outline-secondary" @click="handleExport">
          <i class="bi bi-file-excel me-1"></i> Export Excel
        </button>
      </div>
    </div>

    <!-- Revenue Table -->
    <div class="table-responsive" :class="{ loading: loading }">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th class="expand-column"></th>
            <th
              v-for="column in columns"
              :key="column.key"
              @click="sortBy(column.key)"
              class="sortable-header"
            >
              {{ column.label }}
              <i
                v-if="sortColumn === column.key"
                :class="[
                  'bi',
                  sortDirection === 'asc' ? 'bi-sort-up' : 'bi-sort-down',
                ]"
              ></i>
              <i v-else class="bi bi-filter text-muted opacity-25"></i>
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-for="stadium in paginatedData" :key="stadium.stadiumId">
            <tr @click="toggleExpand(stadium.stadiumId)" class="stadium-row">
              <td class="expand-column">
                <i
                  :class="[
                    'bi',
                    stadium.isExpanded ? 'bi-chevron-down' : 'bi-chevron-right',
                  ]"
                ></i>
              </td>
              <td
                v-for="column in columns"
                :key="`${stadium.stadiumId}-${column.key}`"
              >
                <template v-if="column.key === 'ownerAmount'">
                  {{ formatCurrency(stadium.ownerAmount) }}
                </template>
                <template v-else>
                  {{ stadium[column.key] }}
                </template>
              </td>
            </tr>
            <tr v-if="stadium.isExpanded" class="field-row">
              <td :colspan="columns.length + 1">
                <div class="field-table-container">
                  <table class="table table-sm table-bordered">
                    <thead>
                      <tr>
                        <th>Field ID</th>
                        <th>Field Name</th>
                        <th>Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="field in stadium.fields" :key="field.fieldId">
                        <td>{{ field.fieldId }}</td>
                        <td>{{ field.fieldName }}</td>
                        <td>{{ formatCurrency(field.ownerAmount) }}</td>
                      </tr>
                      <tr v-if="!stadium.fields || stadium.fields.length === 0">
                        <td colspan="3" class="text-center">
                          No fields found for this stadium
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </template>
          <tr v-if="filteredData.length === 0">
            <td :colspan="columns.length + 1" class="text-center py-4">
              <div class="text-muted">
                <i class="bi bi-inbox fs-3 d-block mb-2"></i>
                No revenue data found
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="loading" class="loading-spinner">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div
      class="d-flex justify-content-between align-items-center mt-3"
      v-if="filteredData.length > 0"
    >
      <div>
        Showing {{ startIndex + 1 }} to
        {{ Math.min(endIndex, filteredData.length) }} of
        {{ filteredData.length }} stadiums
      </div>
      <nav aria-label="Table pagination">
        <ul class="pagination mb-0">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a
              class="page-link"
              href="#"
              @click.prevent="goToPage(currentPage - 1)"
              >Previous</a
            >
          </li>
          <li
            v-for="page in displayedPages"
            :key="page"
            class="page-item"
            :class="{ active: currentPage === page }"
          >
            <a class="page-link" href="#" @click.prevent="goToPage(page)">{{
              page
            }}</a>
          </li>
          <li
            class="page-item"
            :class="{ disabled: currentPage === totalPages }"
          >
            <a
              class="page-link"
              href="#"
              @click.prevent="goToPage(currentPage + 1)"
              >Next</a
            >
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
import API from "@/utils/axios";
import * as XLSX from "xlsx";
import CommonHelper from "@/utils/common";

export default {
  name: "RevenuePage",
  data() {
    return {
      userId: null,
      toast: useToast(),
      loading: false,
      error: null,

      // Data
      stadiums: [],
      ownerAmountData: null,

      // Table columns
      columns: [
        { key: "stadiumId", label: "ID" },
        { key: "stadiumName", label: "Stadium Name" },
        { key: "ownerAmount", label: "Revenue" },
      ],

      // Sorting
      sortColumn: "stadiumId",
      sortDirection: "asc",
      itemsPerPage: 5,
      currentPage: 1,

      // Date range
      dateRange: {
        start: new Date(new Date().setMonth(new Date().getMonth() - 1))
          .toISOString()
          .split("T")[0],
        end: new Date().toISOString().split("T")[0],
      },
    };
  },
  computed: {
    filteredData() {
      return this.stadiums;
    },
    totalPages() {
      return Math.ceil(this.filteredData.length / this.itemsPerPage);
    },
    startIndex() {
      return (this.currentPage - 1) * this.itemsPerPage;
    },
    endIndex() {
      return this.startIndex + this.itemsPerPage;
    },
    paginatedData() {
      return this.filteredData.slice(this.startIndex, this.endIndex);
    },
    displayedPages() {
      const pages = [];
      const maxVisiblePages = 5;

      if (this.totalPages <= maxVisiblePages) {
        for (let i = 1; i <= this.totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        let start = Math.max(2, this.currentPage - 1);
        let end = Math.min(this.totalPages - 1, this.currentPage + 1);

        if (this.currentPage <= 2) {
          end = Math.min(this.totalPages - 1, maxVisiblePages - 1);
        } else if (this.currentPage >= this.totalPages - 1) {
          start = Math.max(2, this.totalPages - maxVisiblePages + 2);
        }

        if (start > 2) pages.push("...");
        for (let i = start; i <= end; i++) pages.push(i);
        if (end < this.totalPages - 1) pages.push("...");
        pages.push(this.totalPages);
      }

      return pages;
    },
  },
  methods: {
    formatCurrency(amount) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(amount || 0);
    },
    sortBy(column) {
      if (this.sortColumn === column) {
        this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
      } else {
        this.sortColumn = column;
        this.sortDirection = "asc";
      }

      this.stadiums.sort((a, b) => {
        const aValue = a[this.sortColumn] || "";
        const bValue = b[this.sortColumn] || "";
        if (aValue < bValue) return this.sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return this.sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    },
    goToPage(page) {
      if (page < 1 || page > this.totalPages || page === "...") return;
      this.currentPage = page;
    },
    toggleExpand(stadiumId) {
      const stadium = this.stadiums.find((s) => s.stadiumId === stadiumId);
      if (stadium) {
        stadium.isExpanded = !stadium.isExpanded;
      }
    },
    async getUserId() {
      try {
        const userId = await CommonHelper.getCurrentUserId();
        if (!userId) throw new Error("User ID not found");
        return userId;
      } catch (error) {
        console.error("Error loading user ID:", error);
        this.toast.error("Failed to load user ID. Please log in.");
        return null;
      }
    },
    async fetchRevenueData() {
      try {
        this.loading = true;
        this.error = null;

        if (!this.userId) {
          this.userId = await this.getUserId();
          if (!this.userId)
            throw new Error("User ID not found. Please log in.");
        }

        const stadiumResponse = await API.get(`Stadium/user/${this.userId}`);
        const stadiums = stadiumResponse.data || [];

        if (!stadiums.length) {
          this.ownerAmountData = {
            totalOwnerAmount: 0,
            fieldsCount: 0,
            stadiumsCount: 0,
          };
          this.stadiums = [];
          return;
        }

        let totalOwnerAmount = 0;
        const stadiumRevenue = [];

        const startDate = new Date(this.dateRange.start);
        const endDate = new Date(this.dateRange.end);

        for (const stadium of stadiums) {
          const fieldsResponse = await API.get(
            `Field/fields-by-stadium-id/${stadium.stadiumId}`
          );
          const fields = fieldsResponse.data || [];

          let stadiumOwnerAmount = 0;
          const fieldData = [];

          if (fields.length > 0) {
            for (const field of fields) {
              const ownerAmountResponse = await API.get(
                `RevenueTransaction/owner-amount/${field.fieldId}`
              ).catch(() => ({ data: [] }));

              const fieldOwnerAmount = Array.isArray(ownerAmountResponse.data)
                ? ownerAmountResponse.data
                : [];

              const filteredOwnerAmount = fieldOwnerAmount.filter((item) => {
                const date = new Date(item.revenueTransactionDate);
                return date >= startDate && date <= endDate;
              });

              let fieldOwnerAmountSum = 0;
              filteredOwnerAmount.forEach((item) => {
                fieldOwnerAmountSum += item.ownerAmount ?? 0;
              });

              fieldData.push({
                fieldId: field.fieldId,
                fieldName: field.fieldName || `Field ${field.fieldId}`,
                ownerAmount: fieldOwnerAmountSum,
              });

              stadiumOwnerAmount += fieldOwnerAmountSum;
            }
          }

          stadiumRevenue.push({
            ...stadium,
            ownerAmount: stadiumOwnerAmount,
            fields: fieldData,
            isExpanded: false,
          });

          totalOwnerAmount += stadiumOwnerAmount;
        }

        this.stadiums = stadiumRevenue;
        this.ownerAmountData = {
          totalOwnerAmount,
          fieldsCount: stadiumRevenue.reduce(
            (sum, stadium) =>
              sum + (stadium.fields ? stadium.fields.length : 0),
            0
          ),
          stadiumsCount: stadiums.length,
        };
      } catch (error) {
        console.error("Error fetching revenue data:", error);
        this.error =
          error.response?.data?.message ||
          error.message ||
          "Failed to load revenue data";
        this.toast.error(`Failed to load revenue data: ${this.error}`);
        this.ownerAmountData = {
          totalOwnerAmount: 0,
          fieldsCount: 0,
          stadiumsCount: 0,
        };
        this.stadiums = [];
      } finally {
        this.loading = false;
      }
    },
    handleExport() {
      try {
        const excelData = [];
        for (const stadium of this.stadiums) {
          excelData.push({
            ID: stadium.stadiumId,
            "Stadium Name": stadium.stadiumName,
            Revenue: this.formatCurrency(stadium.ownerAmount),
            "Field ID": "",
            "Field Name": "",
            "Field Revenue": "",
          });
          if (stadium.fields && stadium.fields.length > 0) {
            for (const field of stadium.fields) {
              excelData.push({
                ID: "",
                "Stadium Name": "",
                Revenue: "",
                "Field ID": field.fieldId,
                "Field Name": field.fieldName,
                "Field Revenue": this.formatCurrency(field.ownerAmount),
              });
            }
          }
        }

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(excelData);
        XLSX.utils.book_append_sheet(wb, ws, "Revenue");
        XLSX.writeFile(
          wb,
          `revenue_${this.dateRange.start}_to_${this.dateRange.end}.xlsx`
        );
        this.toast.success("Excel export completed successfully!");
      } catch (error) {
        console.error("Error exporting to Excel:", error);
        this.toast.error(
          `Failed to export: ${error.message || "Unknown error"}`
        );
      }
    },
  },
  mounted() {
    this.fetchRevenueData();
  },
};
</script>

<style scoped>
.revenue-page-container {
  margin-top: 20px;
  padding: 0 15px;
}

.sortable-header {
  cursor: pointer;
  user-select: none;
}

.loading-spinner {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}

.table-responsive.loading {
  position: relative;
  opacity: 0.5;
}

.pagination .page-item.disabled .page-link {
  pointer-events: none;
  opacity: 0.5;
}

.card {
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 1.25rem;
  font-weight: 500;
}

.card-text {
  margin-bottom: 0.5rem;
}

.stadium-row {
  cursor: pointer;
}

.stadium-row:hover {
  background-color: #f8f9fa;
}

.field-row {
  background-color: #f1f3f5;
}

.field-table-container {
  margin: 10px;
}

.table-sm th,
.table-sm td {
  padding: 0.25rem 0.5rem;
}

.expand-column {
  width: 30px;
  text-align: center;
}
</style>
