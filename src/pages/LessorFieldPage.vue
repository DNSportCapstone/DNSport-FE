<template>
  <div class="stadium-table-container">
    <!-- Top Action Bar (unchanged) -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div class="d-flex gap-2">
        <button class="btn btn-outline-secondary" @click="handleExport">
          <i class="bi bi-file-excel me-1"></i> Export Excel
        </button>
        <div class="dropdown">
          <button
            class="btn btn-outline-secondary dropdown-toggle"
            type="button"
            id="columnToggleDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="bi bi-columns-gap me-1"></i> Columns
          </button>
          <ul class="dropdown-menu" aria-labelledby="columnToggleDropdown">
            <li v-for="column in columns" :key="column.key">
              <div class="dropdown-item">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :id="`column-${column.key}`"
                    v-model="column.visible"
                  />
                  <label class="form-check-label" :for="`column-${column.key}`">
                    {{ column.label }}
                  </label>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-4">
        <div class="input-group">
          <span class="input-group-text">
            <i class="bi bi-search"></i>
          </span>
          <input
            type="text"
            class="form-control"
            placeholder="Search stadiums..."
            v-model="searchQuery"
            @input="handleSearch"
          />
          <button
            v-if="searchQuery"
            class="btn btn-outline-secondary"
            type="button"
            @click="clearSearch"
          >
            <i class="bi bi-x"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Stadium Data Table -->
    <div class="table-responsive" :class="{ loading: loading }">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th
              v-for="column in visibleColumns"
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="stadium in paginatedData" :key="stadium.stadiumId">
            <td
              v-for="column in visibleColumns"
              :key="`${stadium.stadiumId}-${column.key}`"
            >
              <template v-if="column.key === 'status'">
                <span :class="getStatusBadgeClass(stadium.status)">
                  {{ stadium.status }}
                </span>
              </template>
              <template v-else-if="column.key === 'capacity'">
                {{ formatNumber(stadium.capacity) }}
              </template>
              <template v-else>
                {{ stadium[column.key] }}
              </template>
            </td>
            <td>
              <div class="d-flex gap-1">
                <!-- Enable/Disable Buttons (unchanged) -->
                <button
                  v-if="stadium.status === 'Disable'"
                  class="btn btn-sm btn-outline-success"
                  @click="handleEnable(stadium)"
                >
                  <i class="bi bi-check-circle"></i> Enable
                </button>
                <button
                  v-else
                  class="btn btn-sm btn-outline-warning"
                  @click="handleDisable(stadium)"
                >
                  <i class="bi bi-slash-circle"></i> Disable
                </button>
                <!-- View Fields Button -->
                <button
                  class="btn btn-sm btn-outline-primary"
                  @click="handleViewFields(stadium)"
                >
                  <i class="bi bi-list"></i> View Fields
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="filteredData.length === 0">
            <td :colspan="visibleColumns.length + 1" class="text-center py-4">
              <div class="text-muted">
                <i class="bi bi-inbox fs-3 d-block mb-2"></i>
                No stadiums found
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

    <!-- Fields Table (New Section) -->
    <div v-if="selectedStadium" class="mt-4">
      <h4>Fields for {{ selectedStadium.stadiumName }}</h4>
      <div class="table-responsive" :class="{ loading: fieldsLoading }">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th
                v-for="column in fieldColumns"
                :key="column.key"
                class="sortable-header"
              >
                {{ column.label }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="field in fields" :key="field.fieldId">
              <td
                v-for="column in fieldColumns"
                :key="`${field.fieldId}-${column.key}`"
              >
                {{ field[column.key] }}
              </td>
            </tr>
            <tr v-if="fields.length === 0">
              <td :colspan="fieldColumns.length" class="text-center py-4">
                <div class="text-muted">
                  <i class="bi bi-inbox fs-3 d-block mb-2"></i>
                  No fields found
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="fieldsLoading" class="loading-spinner">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination (unchanged) -->
    <div class="d-flex justify-content-between align-items-center">
      <div>
        Showing {{ startIndex + 1 }} to
        {{ Math.min(endIndex, filteredData.length) }} of
        {{ filteredData.length }}
        stadiums
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

    <!-- Disable confirmation modal (unchanged) -->
    <div
      class="modal fade"
      id="disableConfirmModal"
      tabindex="-1"
      aria-labelledby="disableConfirmModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="disableConfirmModalLabel">
              Confirm Disable
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            Are you sure you want to disable
            <strong>{{ stadiumToDisable?.stadiumName }}</strong
            >?
            <p class="text-warning mt-2 mb-0">
              <small
                >This will make the stadium unavailable for new bookings.</small
              >
            </p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-warning"
              @click="confirmDisable"
            >
              <i class="bi bi-slash-circle me-1"></i>Disable Stadium
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Enable confirmation modal (unchanged) -->
    <div
      class="modal fade"
      id="enableConfirmModal"
      tabindex="-1"
      aria-labelledby="enableConfirmModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="enableConfirmModalLabel">
              Confirm Enable
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            Are you sure you want to enable
            <strong>{{ stadiumToEnable?.stadiumName }}</strong
            >?
            <p class="text-success mt-2 mb-0">
              <small
                >This will make the stadium available for bookings again.</small
              >
            </p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-success"
              @click="confirmEnable"
            >
              <i class="bi bi-check-circle me-1"></i>Enable Stadium
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useToast } from "vue-toastification";
import { Modal } from "bootstrap";
import API from "@/utils/axios";
import * as XLSX from "xlsx";
import CommonHelper from "@/utils/common";

export default {
  name: "StadiumTable",
  data() {
    return {
      userId: null, // Store logged-in user's ID
      stadiumToDisable: null,
      stadiumToEnable: null,
      selectedStadium: null, // Track selected stadium for fields
      disableModal: null,
      enableModal: null,
      toast: useToast(),
      loading: false,
      fieldsLoading: false, // Separate loading state for fields
      error: null,

      stadiums: [],
      fields: [],
      columns: [
        { key: "stadiumId", label: "ID", visible: true },
        { key: "stadiumName", label: "Stadium Name", visible: true },
        { key: "address", label: "Location", visible: true },
        { key: "status", label: "Status", visible: true },
        { key: "owner", label: "Owner", visible: false },
      ],

      // Field columns (new)
      fieldColumns: [
        { key: "fieldId", label: "Field ID" },
        { key: "description", label: "Field Name" },
        { key: "dayPrice", label: "Day Price" },
        { key: "nightPrice", label: "Night Price" },
        { key: "status", label: "Status" },
      ],

      // Search functionality (unchanged)
      searchQuery: "",

      // Sorting (unchanged)
      sortColumn: "stadiumId",
      sortDirection: "asc",

      // Pagination (unchanged)
      itemsPerPage: 5,
      currentPage: 1,
    };
  },
  computed: {
    // Visible columns (unchanged)
    visibleColumns() {
      return this.columns.filter((column) => column.visible);
    },

    // Filtered data based on search (unchanged)
    filteredData() {
      if (!this.searchQuery) return this.stadiums;

      const query = this.searchQuery.toLowerCase();
      return this.stadiums.filter((stadium) => {
        return Object.keys(stadium).some((key) => {
          const value = stadium[key];
          return value && value.toString().toLowerCase().includes(query);
        });
      });
    },

    // Pagination calculations (unchanged)
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
        for (let i = 1; i <= this.totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        let start = Math.max(2, this.currentPage - 1);
        let end = Math.min(this.totalPages - 1, this.currentPage + 1);

        if (this.currentPage <= 2) {
          end = Math.min(this.totalPages - 1, maxVisiblePages - 1);
        } else if (this.currentPage >= this.totalPages - 1) {
          start = Math.max(2, this.totalPages - maxVisiblePages + 2);
        }

        if (start > 2) {
          pages.push("...");
        }

        for (let i = start; i <= end; i++) {
          pages.push(i);
        }

        if (end < this.totalPages - 1) {
          pages.push("...");
        }

        pages.push(this.totalPages);
      }

      return pages;
    },
  },
  methods: {
    // Utility functions (unchanged)
    formatNumber(num) {
      return new Intl.NumberFormat().format(num);
    },

    getStatusBadgeClass(status) {
      if (!status) return "badge bg-secondary";

      const classes = "badge ";
      switch (status.trim()) {
        case "Active":
          return classes + "bg-success";
        case "Under Renovation":
          return classes + "bg-warning text-dark";
        case "Scheduled for Demolition":
          return classes + "bg-danger";
        case "Disabled":
          return classes + "bg-secondary";
        default:
          return classes + "bg-secondary";
      }
    },

    // Sorting (unchanged)
    sortBy(column) {
      if (this.sortColumn === column) {
        this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
      } else {
        this.sortColumn = column;
        this.sortDirection = "asc";
      }

      this.stadiums.sort((a, b) => {
        const aValue = a[this.sortColumn];
        const bValue = b[this.sortColumn];

        if (aValue < bValue) return this.sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return this.sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    },

    // Pagination (unchanged)
    goToPage(page) {
      if (page < 1 || page > this.totalPages || page === "...") return;
      this.currentPage = page;
    },

    // Event handlers (unchanged)
    handleSearch() {
      this.currentPage = 1;
    },

    clearSearch() {
      this.searchQuery = "";
    },

    // Disable stadium (unchanged)
    handleDisable(stadium) {
      this.stadiumToDisable = stadium;
      this.disableModal.show();
    },

    // Enable stadium (unchanged)
    handleEnable(stadium) {
      this.stadiumToEnable = stadium;
      this.enableModal.show();
    },

    // Confirm disable (unchanged)
    async confirmDisable() {
      try {
        await API.post(
          `Admin/disable-or-enable-stadium/${this.stadiumToDisable.stadiumId}`,
          JSON.stringify("Disable"),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const index = this.stadiums.findIndex(
          (s) => s.stadiumId === this.stadiumToDisable.stadiumId
        );
        if (index !== -1) {
          this.stadiums[index].status = "Disabled";
        }

        this.disableModal.hide();
        this.toast.success(
          `${this.stadiumToDisable.stadiumName} has been disabled successfully`
        );
        await this.fetchStadiums();
      } catch (error) {
        console.error("Error disabling stadium:", error);
        this.toast.error(
          `Failed to disable stadium: ${error.message || "Unknown error"}`
        );
      } finally {
        this.loading = false;
        this.stadiumToDisable = null;
      }
    },

    // Confirm enable (unchanged)
    async confirmEnable() {
      try {
        await API.post(
          `Admin/disable-or-enable-stadium/${this.stadiumToEnable.stadiumId}`,
          JSON.stringify("Active"),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const index = this.stadiums.findIndex(
          (s) => s.stadiumId === this.stadiumToEnable.stadiumId
        );
        if (index !== -1) {
          this.stadiums[index].status = "Active";
        }

        this.enableModal.hide();
        this.toast.success(
          `${this.stadiumToEnable.stadiumName} has been enabled successfully`
        );
        await this.fetchStadiums();
      } catch (error) {
        console.error("Error enabling stadium:", error);
        this.toast.error(
          `Failed to enable stadium: ${error.message || "Unknown error"}`
        );
      } finally {
        this.loading = false;
        this.stadiumToEnable = null;
      }
    },

    // Export to Excel (unchanged)
    handleExport() {
      try {
        const excelData = this.prepareExcelData();
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(excelData);
        XLSX.utils.book_append_sheet(wb, ws, "Stadiums");
        XLSX.writeFile(wb, "stadiums.xlsx");
        this.toast.success("Excel export completed successfully!", {
          timeout: 3000,
          position: "top-right",
          closeOnClick: true,
        });
      } catch (error) {
        console.error("Error exporting to Excel:", error);
        this.toast.error(
          `Failed to export: ${error.message || "Unknown error"}`
        );
      }
    },

    prepareExcelData() {
      return this.stadiums.map((stadium) => {
        const row = {};
        this.visibleColumns.forEach((column) => {
          let value = stadium[column.key];
          if (column.key === "capacity" && value) {
            value = this.formatNumber(value);
          }
          row[column.label] = value || "";
        });
        return row;
      });
    },

    // New method to handle viewing fields
    async handleViewFields(stadium) {
      this.selectedStadium = stadium;
      await this.fetchFields(stadium.stadiumId);
    },

    async getUserId() {
      try {
        const userId = await CommonHelper.getCurrentUserId(); // Chắc chắn rằng hàm này trả về giá trị userId
        return userId;
      } catch (error) {
        console.error("Error loading user ID:", error);
        this.toast.error("Failed to load user ID.");
        return null;
      }
    },

    // Fetch stadiums
    async fetchStadiums() {
      try {
        this.loading = true;
        this.error = null;

        // Đợi lấy userId
        this.userId = await this.getUserId();
        if (!this.userId) {
          throw new Error("User ID not found. Please log in.");
        }

        // Fetch stadiums cho userId
        const response = await API.get(`Stadium/user/${this.userId}`);
        this.stadiums = response.data;
      } catch (error) {
        console.error("Error fetching stadiums:", error);
        this.error = error.message || "Failed to load stadiums";
        this.toast.error(`Failed to load stadiums: ${this.error}`);
        this.stadiums = [];
      } finally {
        this.loading = false;
      }
    },

    // Fetch fields for a specific stadium
    async fetchFields(stadiumId) {
      try {
        this.fieldsLoading = true;
        this.error = null;

        const response = await API.get(
          `Field/fields-by-stadium-id/${stadiumId}`
        );
        this.fields = response.data;
      } catch (error) {
        console.error("Error fetching fields:", error);
        this.error = error.message || "Failed to load fields";
        this.toast.error(`Failed to load fields: ${this.error}`);
        this.fields = [];
      } finally {
        this.fieldsLoading = false;
      }
    },
  },
  mounted() {
    // Fetch stadiums when component mounts
    this.fetchStadiums();

    // Initialize Bootstrap modals
    this.disableModal = new Modal(
      document.getElementById("disableConfirmModal")
    );
    this.enableModal = new Modal(document.getElementById("enableConfirmModal"));
  },
};
</script>
