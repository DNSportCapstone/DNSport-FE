<template>
  <div class="voucher-table-container">
    <!-- Top Action Bar -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div class="d-flex gap-2">
        <button class="btn btn-outline-secondary" @click="handleExport">
          <i class="bi bi-file-excel me-1"></i> Export Excel
        </button>
        <button class="btn btn-outline-primary" @click="handleCreateVoucher">
          <i class="bi bi-plus-circle me-1"></i> Create Voucher
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
            placeholder="Search vouchers..."
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

    <!-- Voucher Data Table -->
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
          <tr v-for="voucher in paginatedData" :key="voucher.voucherId">
            <td
              v-for="column in visibleColumns"
              :key="`${voucher.voucherId}-${column.key}`"
            >
              <template v-if="column.key === 'discountPercentage'">
                {{ formatPercentage(voucher.discountPercentage) }}
              </template>
              <template
                v-if="column.key === 'startDate' || column.key === 'endDate'"
              >
                {{ formatDate(voucher[column.key]) }}
              </template>
              <template v-else-if="column.key === 'status'">
                <span :class="getStatusBadgeClass(voucher.status)">
                  {{ voucher.status }}
                </span>
              </template>
              <template v-else>
                {{ voucher[column.key] }}
              </template>
            </td>
            <td>
              <div class="d-flex gap-1">
                <button
                  class="btn btn-sm btn-outline-primary"
                  @click="handleEditVoucher(voucher)"
                >
                  <i class="bi bi-pencil"></i> Edit
                </button>
                <button
                  class="btn btn-sm btn-outline-danger"
                  @click="handleDeleteVoucher(voucher)"
                >
                  <i class="bi bi-trash"></i> Delete
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="filteredData.length === 0">
            <td :colspan="visibleColumns.length + 1" class="text-center py-4">
              <div class="text-muted">
                <i class="bi bi-inbox fs-3 d-block mb-2"></i>
                No vouchers found
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
        {{ filteredData.length }} vouchers
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

    <!-- Delete Confirmation Modal -->
    <div
      class="modal fade"
      id="deleteConfirmModal"
      tabindex="-1"
      aria-labelledby="deleteConfirmModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteConfirmModalLabel">
              Confirm Delete
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            Are you sure you want to delete voucher
            <strong>{{ voucherToDelete?.voucherCode }}</strong
            >?
            <p class="text-danger mt-2 mb-0">
              <small>This action cannot be undone.</small>
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
            <button type="button" class="btn btn-danger" @click="confirmDelete">
              <i class="bi bi-trash me-1"></i>Delete Voucher
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

export default {
  name: "VoucherManager",
  data() {
    return {
      vouchers: [],
      columns: [
        { key: "voucherId", label: "ID", visible: true },
        { key: "voucherCode", label: "Code", visible: true },
        { key: "description", label: "Description", visible: true },
        { key: "discountPercentage", label: "Discount (%)", visible: true },
        { key: "startDate", label: "Start Date", visible: true },
        { key: "endDate", label: "End Date", visible: true },
        { key: "status", label: "Status", visible: true },
      ],
      searchQuery: "",
      sortColumn: "voucherId",
      sortDirection: "asc",
      itemsPerPage: 5,
      currentPage: 1,
      loading: false,
      error: null,
      voucherToDelete: null,
      deleteModal: null,
      toast: useToast(),
    };
  },
  computed: {
    visibleColumns() {
      return this.columns.filter((column) => column.visible);
    },
    filteredData() {
      if (!this.searchQuery) return this.vouchers;
      const query = this.searchQuery.toLowerCase();
      return this.vouchers.filter((voucher) =>
        Object.values(voucher).some(
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
  },
  methods: {
    formatPercentage(value) {
      return value ? `${value}%` : "0%";
    },
    formatDate(date) {
      if (!date) return "";
      return new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },
    getStatusBadgeClass(status) {
      if (!status) return "badge bg-secondary";
      const classes = "badge ";
      switch (status.trim()) {
        case "Active":
          return classes + "bg-success";
        case "Expired":
          return classes + "bg-danger";
        case "Inactive":
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

      this.vouchers.sort((a, b) => {
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
    handleSearch() {
      this.currentPage = 1;
    },
    clearSearch() {
      this.searchQuery = "";
    },
    async fetchVouchers() {
      try {
        this.loading = true;
        this.error = null;
        const response = await API.get("vouchers/all");
        this.vouchers = response.data || [];
      } catch (error) {
        console.error("Error fetching vouchers:", error);
        this.error =
          error.response?.data?.message ||
          error.message ||
          "Failed to load vouchers";
        this.toast.error(`Failed to load vouchers: ${this.error}`);
        this.vouchers = [];
      } finally {
        this.loading = false;
      }
    },
    handleCreateVoucher() {
      this.$router.push("/create-voucher");
    },
    handleEditVoucher(voucher) {
      this.$router.push({
        path: "/update-voucher",
        query: { voucherId: voucher.voucherId },
      });
    },
    handleDeleteVoucher(voucher) {
      this.voucherToDelete = voucher;
      this.deleteModal.show();
    },
    async confirmDelete() {
      try {
        this.loading = true;
        await API.delete(`vouchers/delete/${this.voucherToDelete.voucherId}`);
        this.vouchers = this.vouchers.filter(
          (voucher) => voucher.voucherId !== this.voucherToDelete.voucherId
        );
        this.deleteModal.hide();
        this.toast.success(
          `Voucher ${this.voucherToDelete.voucherCode} deleted successfully`
        );
      } catch (error) {
        console.error("Error deleting voucher:", error);
        this.toast.error(
          `Failed to delete voucher: ${
            error.response?.data?.message || error.message || "Unknown error"
          }`
        );
      } finally {
        this.loading = false;
        this.voucherToDelete = null;
      }
    },
    handleExport() {
      try {
        const excelData = this.prepareExcelData();
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(excelData);
        XLSX.utils.book_append_sheet(wb, ws, "Vouchers");
        XLSX.writeFile(wb, "vouchers.xlsx");
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
      return this.vouchers.map((voucher) => {
        const row = {};
        this.visibleColumns.forEach((column) => {
          let value = voucher[column.key];
          if (column.key === "discountPercentage" && value) {
            value = this.formatPercentage(value);
          } else if (column.key === "startDate" || column.key === "endDate") {
            value = this.formatDate(value);
          }
          row[column.label] = value || "";
        });
        return row;
      });
    },
  },
  mounted() {
    this.fetchVouchers();
    this.deleteModal = new Modal(document.getElementById("deleteConfirmModal"));
  },
};
</script>

<style scoped>
.voucher-table-container {
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

.badge {
  font-size: 0.875rem;
  padding: 0.35em 0.65em;
}

.btn-sm {
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
}
</style>
