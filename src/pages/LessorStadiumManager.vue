<template>
  <div class="stadium-table-container">
    <!-- Top Action Bar -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div class="d-flex gap-2">
        <button class="btn btn-outline-secondary" @click="handleExport">
          <i class="bi bi-file-excel me-1"></i> Export Excel
        </button>
        <button
          class="btn btn-outline-primary"
          @click="handleAddNewField"
          v-if="selectedStadium"
        >
          <i class="bi bi-plus-circle me-1"></i> Add New Field
        </button>
        <button
          class="btn btn-outline-primary"
          @click="$router.push('/stadiumregister')"
        >
          <i class="bi bi-plus-circle me-1"></i> Register Stadium
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
                <button
                  class="btn btn-sm btn-outline-primary"
                  @click="handleViewFields(stadium)"
                >
                  <i class="bi bi-list"></i> View Fields
                </button>
                <button
                  class="btn btn-sm btn-outline-info"
                  @click="handleRegisterField(stadium)"
                >
                  <i class="bi bi-plus-circle"></i> Register Field
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

    <!-- Fields Table -->
    <div v-if="selectedStadium" class="mt-4">
      <h4>Fields for {{ selectedStadium.stadiumName }}</h4>
      <div class="table-responsive" :class="{ loading: fieldsLoading }">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th
                v-for="column in fieldColumns"
                :key="column.key"
                @click="sortFieldsBy(column.key)"
                class="sortable-header"
              >
                {{ column.label }}
                <i
                  v-if="fieldSortColumn === column.key"
                  :class="[
                    'bi',
                    fieldSortDirection === 'asc'
                      ? 'bi-sort-up'
                      : 'bi-sort-down',
                  ]"
                ></i>
                <i v-else class="bi bi-filter text-muted opacity-25"></i>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="field in paginatedFields" :key="field.fieldId">
              <td
                v-for="column in fieldColumns"
                :key="`${field.fieldId}-${column.key}`"
              >
                <template
                  v-if="
                    column.key === 'dayPrice' || column.key === 'nightPrice'
                  "
                >
                  {{ formatCurrency(field[column.key]) }}
                </template>
                <template v-else-if="column.key === 'status'">
                  <span :class="getStatusBadgeClass(field.status)">
                    {{ field.status }}
                  </span>
                </template>
                <template v-else>
                  {{ field[column.key] }}
                </template>
              </td>
              <td>
                <div class="d-flex gap-1">
                  <button
                    class="btn btn-sm btn-outline-primary"
                    @click="handleEditField(field)"
                  >
                    <i class="bi bi-pencil"></i> Edit
                  </button>
                  <button
                    v-if="field.status === 'Disable'"
                    class="btn btn-sm btn-outline-success"
                    @click="handleToggleFieldStatus(field, 'Active')"
                  >
                    <i class="bi bi-check-circle"></i> Activate
                  </button>
                  <button
                    v-else
                    class="btn btn-sm btn-outline-warning"
                    @click="handleToggleFieldStatus(field, 'Disable')"
                  >
                    <i class="bi bi-slash-circle"></i> Disable
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="filteredFields.length === 0">
              <td :colspan="fieldColumns.length + 1" class="text-center py-4">
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

      <!-- Fields Pagination -->
      <div
        class="d-flex justify-content-between align-items-center mt-3"
        v-if="filteredFields.length > 0"
      >
        <div>
          Showing {{ fieldStartIndex + 1 }} to
          {{ Math.min(fieldEndIndex, filteredFields.length) }} of
          {{ filteredFields.length }} fields
        </div>
        <nav aria-label="Fields pagination">
          <ul class="pagination mb-0">
            <li class="page-item" :class="{ disabled: fieldCurrentPage === 1 }">
              <a
                class="page-link"
                href="#"
                @click.prevent="goToFieldPage(fieldCurrentPage - 1)"
                >Previous</a
              >
            </li>
            <li
              v-for="page in displayedFieldPages"
              :key="page"
              class="page-item"
              :class="{ active: fieldCurrentPage === page }"
            >
              <a
                class="page-link"
                href="#"
                @click.prevent="goToFieldPage(page)"
                >{{ page }}</a
              >
            </li>
            <li
              class="page-item"
              :class="{ disabled: fieldCurrentPage === fieldTotalPages }"
            >
              <a
                class="page-link"
                href="#"
                @click.prevent="goToFieldPage(fieldCurrentPage + 1)"
                >Next</a
              >
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- Stadiums Pagination -->
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
  name: "StadiumTable",
  data() {
    return {
      // State for UI
      userId: null,
      selectedStadium: null,
      toast: useToast(),
      loading: false,
      fieldsLoading: false,
      error: null,

      // Data
      stadiums: [],
      fields: [],

      // Table columns
      columns: [
        { key: "stadiumId", label: "ID", visible: true },
        { key: "stadiumName", label: "Stadium Name", visible: true },
        { key: "address", label: "Location", visible: true },
        { key: "status", label: "Status", visible: true },
        { key: "owner", label: "Owner", visible: false },
      ],
      fieldColumns: [
        { key: "fieldId", label: "Field ID" },
        { key: "description", label: "Field Name" },
        { key: "dayPrice", label: "Day Price" },
        { key: "nightPrice", label: "Night Price" },
        { key: "status", label: "Status" },
      ],

      // Search and sorting for stadiums
      searchQuery: "",
      sortColumn: "stadiumId",
      sortDirection: "asc",
      itemsPerPage: 5,
      currentPage: 1,

      // Search and sorting for fields
      fieldSearchQuery: "",
      fieldSortColumn: "fieldId",
      fieldSortDirection: "asc",
      fieldItemsPerPage: 5,
      fieldCurrentPage: 1,
    };
  },
  computed: {
    visibleColumns() {
      return this.columns.filter((column) => column.visible);
    },
    filteredData() {
      if (!this.searchQuery) return this.stadiums;
      const query = this.searchQuery.toLowerCase();
      return this.stadiums.filter((stadium) =>
        Object.values(stadium).some(
          (value) => value && value.toString().toLowerCase().includes(query)
        )
      );
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
    filteredFields() {
      if (!this.fieldSearchQuery) return this.fields;
      const query = this.fieldSearchQuery.toLowerCase();
      return this.fields.filter((field) =>
        Object.values(field).some(
          (value) => value && value.toString().toLowerCase().includes(query)
        )
      );
    },
    fieldTotalPages() {
      return Math.ceil(this.filteredFields.length / this.fieldItemsPerPage);
    },
    fieldStartIndex() {
      return (this.fieldCurrentPage - 1) * this.fieldItemsPerPage;
    },
    fieldEndIndex() {
      return this.fieldStartIndex + this.fieldItemsPerPage;
    },
    paginatedFields() {
      return this.filteredFields.slice(
        this.fieldStartIndex,
        this.fieldEndIndex
      );
    },
    displayedFieldPages() {
      const pages = [];
      const maxVisiblePages = 5;

      if (this.fieldTotalPages <= maxVisiblePages) {
        for (let i = 1; i <= this.fieldTotalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        let start = Math.max(2, this.fieldCurrentPage - 1);
        let end = Math.min(this.fieldTotalPages - 1, this.fieldCurrentPage + 1);

        if (this.fieldCurrentPage <= 2) {
          end = Math.min(this.fieldTotalPages - 1, maxVisiblePages - 1);
        } else if (this.fieldCurrentPage >= this.fieldTotalPages - 1) {
          start = Math.max(2, this.fieldTotalPages - maxVisiblePages + 2);
        }

        if (start > 2) pages.push("...");
        for (let i = start; i <= end; i++) pages.push(i);
        if (end < this.fieldTotalPages - 1) pages.push("...");
        pages.push(this.fieldTotalPages);
      }

      return pages;
    },
  },
  methods: {
    formatNumber(num) {
      return num ? new Intl.NumberFormat().format(num) : "0";
    },
    formatCurrency(amount) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(amount || 0);
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
        case "Disable":
          return classes + "bg-secondary";
        default:
          return classes + "bg-secondary";
      }
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
    sortFieldsBy(column) {
      if (this.fieldSortColumn === column) {
        this.fieldSortDirection =
          this.fieldSortDirection === "asc" ? "desc" : "asc";
      } else {
        this.fieldSortColumn = column;
        this.fieldSortDirection = "asc";
      }

      this.fields.sort((a, b) => {
        const aValue = a[this.fieldSortColumn] || "";
        const bValue = b[this.fieldSortColumn] || "";
        if (aValue < bValue) return this.fieldSortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return this.fieldSortDirection === "asc" ? 1 : -1;
        return 0;
      });
    },
    goToPage(page) {
      if (page < 1 || page > this.totalPages || page === "...") return;
      this.currentPage = page;
    },
    goToFieldPage(page) {
      if (page < 1 || page > this.fieldTotalPages || page === "...") return;
      this.fieldCurrentPage = page;
    },
    handleSearch() {
      this.currentPage = 1;
    },
    clearSearch() {
      this.searchQuery = "";
    },
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
    async handleViewFields(stadium) {
      this.selectedStadium = stadium;
      this.fieldCurrentPage = 1;
      await this.fetchFields(stadium.stadiumId);
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
    async fetchStadiums() {
      try {
        this.loading = true;
        this.error = null;

        this.userId = await this.getUserId();
        if (!this.userId) {
          throw new Error("User ID not found. Please log in.");
        }

        const response = await API.get(`Stadium/user/${this.userId}`);
        this.stadiums = response.data || [];
      } catch (error) {
        console.error("Error fetching stadiums:", error);
        this.error =
          error.response?.data?.message ||
          error.message ||
          "Failed to load stadiums";
        this.toast.error(`Failed to load stadiums: ${this.error}`);
        this.stadiums = [];
      } finally {
        this.loading = false;
      }
    },
    async fetchFields(stadiumId) {
      try {
        this.fieldsLoading = true;
        this.error = null;

        const response = await API.get(
          `Field/fields-by-stadium-id/${stadiumId}`
        );
        this.fields = response.data || [];
      } catch (error) {
        console.error("Error fetching fields:", error);
        this.error =
          error.response?.data?.message ||
          error.message ||
          "Failed to load fields";
        this.toast.error(`Failed to load fields: ${this.error}`);
        this.fields = [];
      } finally {
        this.fieldsLoading = false;
      }
    },
    async handleToggleFieldStatus(field, newStatus) {
      try {
        this.fieldsLoading = true;

        await API.put("Field/set-status", {
          FieldId: field.fieldId,
          Status: newStatus,
        });

        // Update the field status in the local data
        const fieldIndex = this.fields.findIndex(
          (f) => f.fieldId === field.fieldId
        );
        if (fieldIndex !== -1) {
          this.fields[fieldIndex].status = newStatus;
        }

        this.toast.success(
          `Field ${field.description} has been ${
            newStatus === "Active" ? "activated" : "disabled"
          } successfully`
        );
      } catch (error) {
        console.error("Error toggling field status:", error);
        this.toast.error(
          `Failed to update field status: ${
            error.response?.data?.message || error.message || "Unknown error"
          }`
        );
      } finally {
        this.fieldsLoading = false;
      }
    },
    handleAddNewField() {
      if (!this.selectedStadium) {
        this.toast.error("Please select a stadium first!");
        return;
      }
      this.$router.push({
        path: "/register-field",
        query: { stadiumId: this.selectedStadium.stadiumId },
      });
    },
    handleEditField(field) {
      if (!this.selectedStadium) {
        this.toast.error("No stadium selected!");
        return;
      }
      if (!field.fieldId) {
        this.toast.error("Invalid field ID!");
        return;
      }
      this.$router.push({
        path: "/update-field",
        query: {
          fieldId: field.fieldId,
          stadiumId: this.selectedStadium.stadiumId,
        },
      });
    },
    handleRegisterField(stadium) {
      this.$router.push({
        path: "/register-field",
        query: { stadiumId: stadium.stadiumId },
      });
    },
  },
  mounted() {
    this.fetchStadiums();
  },
};
</script>

<style scoped>
.stadium-table-container {
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

input[type="checkbox"] {
  margin-left: 10px;
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

.badge {
  font-size: 0.875rem;
  padding: 0.35em 0.65em;
}

.btn-sm {
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
}
</style>
