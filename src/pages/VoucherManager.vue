<template>
  <div class="voucher-table-container">
    <!-- Top Action Bar -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div class="d-flex gap-2">
        <button class="btn btn-outline-secondary" @click="handleExport">
          <i class="bi bi-file-excel me-1"></i> Export Excel
        </button>
        <button class="btn btn-outline-primary" @click="openCreateModal">
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
              <template v-else-if="column.key === 'expiryDate'">
                {{ formatDate(voucher.expiryDate) }}
              </template>
              <template v-else>
                {{ voucher[column.key] }}
              </template>
            </td>
            <td>
              <div class="d-flex gap-1">
                <button
                  class="btn btn-sm btn-outline-primary"
                  @click="openEditModal(voucher)"
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

    <!-- Create Voucher Modal -->
    <div
      class="modal fade"
      id="createVoucherModal"
      tabindex="-1"
      aria-labelledby="createVoucherModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="createVoucherModalLabel">
              Create New Voucher
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleCreateVoucher">
              <div class="mb-3">
                <label for="voucherCode" class="form-label">Voucher Code</label>
                <input
                  type="text"
                  class="form-control"
                  id="voucherCode"
                  v-model="newVoucher.voucherCode"
                  required
                  placeholder="Enter voucher code (e.g., SUMMER25)"
                />
              </div>
              <div class="mb-3">
                <label for="discountPercentage" class="form-label"
                  >Discount Percentage</label
                >
                <input
                  type="number"
                  class="form-control"
                  id="discountPercentage"
                  v-model.number="newVoucher.discountPercentage"
                  min="0"
                  max="100"
                  step="0.01"
                  required
                  placeholder="0.00 to 100.00"
                />
              </div>
              <div class="mb-3">
                <label for="expiryDate" class="form-label">Expiry Date</label>
                <input
                  type="date"
                  class="form-control"
                  id="expiryDate"
                  v-model="newVoucher.expiryDate"
                  required
                />
              </div>
            </form>
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
              class="btn btn-primary"
              @click="handleCreateVoucher"
            >
              <i class="bi bi-plus-circle me-1"></i>Create Voucher
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Voucher Modal -->
    <div
      class="modal fade"
      id="editVoucherModal"
      tabindex="-1"
      aria-labelledby="editVoucherModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editVoucherModalLabel">Edit Voucher</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleUpdateVoucher">
              <div class="mb-3">
                <label for="editVoucherCode" class="form-label"
                  >Voucher Code</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="editVoucherCode"
                  v-model="editVoucher.voucherCode"
                  required
                  placeholder="Enter voucher code"
                />
              </div>
              <div class="mb-3">
                <label for="editDiscountPercentage" class="form-label"
                  >Discount Percentage</label
                >
                <input
                  type="number"
                  class="form-control"
                  id="editDiscountPercentage"
                  v-model.number="editVoucher.discountPercentage"
                  min="0"
                  max="100"
                  step="0.01"
                  required
                  placeholder="0.00 to 100.00"
                />
              </div>
              <div class="mb-3">
                <label for="editExpiryDate" class="form-label"
                  >Expiry Date</label
                >
                <input
                  type="date"
                  class="form-control"
                  id="editExpiryDate"
                  v-model="editVoucher.expiryDate"
                  required
                />
              </div>
            </form>
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
              class="btn btn-primary"
              @click="handleUpdateVoucher"
            >
              <i class="bi bi-pencil me-1"></i>Update Voucher
            </button>
          </div>
        </div>
      </div>
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
        { key: "discountPercentage", label: "Discount (%)", visible: true },
        { key: "expiryDate", label: "Expiry Date", visible: true },
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
      createModal: null,
      editModal: null,
      newVoucher: {
        voucherCode: "",
        discountPercentage: 0,
        expiryDate: "",
      },
      editVoucher: {
        voucherId: null,
        voucherCode: "",
        discountPercentage: 0,
        expiryDate: "",
      },
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
      if (!value && value !== 0) return "0.00%";
      return new Intl.NumberFormat("en-US", {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value / 100);
    },
    formatDate(date) {
      if (!date) return "";
      return new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },
    formatDateForInput(date) {
      if (!date) return "";
      return new Date(date).toISOString().split("T")[0];
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
        const response = await API.get("/vouchers/all");
        this.vouchers = response.data || [];
      } catch (error) {
        console.error("Error fetching vouchers:", error);
        this.error =
          error.response?.data?.message ||
          error.message ||
          "Failed to load vouchers";
        this.toast.error(`Error: ${this.error}`, {
          toastClassName: "custom-toast",
          timeout: 3000,
          position: "top-right",
          closeOnClick: true,
        });
        this.vouchers = [];
      } finally {
        this.loading = false;
      }
    },
    openCreateModal() {
      this.newVoucher = {
        voucherCode: "",
        discountPercentage: 0,
        expiryDate: "",
      };
      this.createModal.show();
    },
    openEditModal(voucher) {
      this.editVoucher = {
        voucherId: voucher.voucherId,
        voucherCode: voucher.voucherCode,
        discountPercentage: voucher.discountPercentage,
        expiryDate: this.formatDateForInput(voucher.expiryDate),
      };
      this.editModal.show();
    },
    async handleCreateVoucher() {
      try {
        this.loading = true;
        const { voucherCode, discountPercentage, expiryDate } = this.newVoucher;

        // Client-side validation
        if (!voucherCode || voucherCode.trim() === "") {
          throw new Error("Voucher code is required");
        }
        if (
          typeof discountPercentage !== "number" ||
          discountPercentage < 0 ||
          discountPercentage > 100
        ) {
          throw new Error("Discount percentage must be between 0 and 100");
        }
        if (!expiryDate || !/^\d{4}-\d{2}-\d{2}$/.test(expiryDate)) {
          throw new Error("Valid expiry date is required (YYYY-MM-DD)");
        }
        const expiry = new Date(expiryDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (expiry < today) {
          throw new Error("Expiry date must be today or in the future");
        }

        const response = await API.post("/vouchers/create", this.newVoucher);
        this.vouchers.push(response.data);
        this.createModal.hide();
        this.toast.success(
          `Voucher ${this.newVoucher.voucherCode} created successfully`,
          {
            toastClassName: "custom-toast",
            timeout: 3000,
            position: "top-right",
            closeOnClick: true,
          }
        );
        await this.fetchVouchers();
      } catch (error) {
        console.error("Error creating voucher:", error);
        console.log("Server response:", error.response?.data);
        this.toast.error(
          `Failed to create voucher: ${
            error.response?.data?.message || error.message || "Unknown error"
          }`,
          {
            toastClassName: "custom-toast",
            timeout: 3000,
            position: "top-right",
            closeOnClick: true,
          }
        );
      } finally {
        this.loading = false;
      }
    },
    async handleUpdateVoucher() {
      try {
        this.loading = true;
        const { voucherCode, discountPercentage, expiryDate } =
          this.editVoucher;

        // Client-side validation
        if (!voucherCode || voucherCode.trim() === "") {
          throw new Error("Voucher code is required");
        }
        if (
          typeof discountPercentage !== "number" ||
          discountPercentage < 0 ||
          discountPercentage > 100
        ) {
          throw new Error("Discount percentage must be between 0 and 100");
        }
        if (!expiryDate || !/^\d{4}-\d{2}-\d{2}$/.test(expiryDate)) {
          throw new Error("Valid expiry date is required (YYYY-MM-DD)");
        }
        const expiry = new Date(expiryDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (expiry < today) {
          throw new Error("Expiry date must be today or in the future");
        }

        await API.put(
          `/vouchers/update/${this.editVoucher.voucherId}`,
          this.editVoucher
        );
        const index = this.vouchers.findIndex(
          (v) => v.voucherId === this.editVoucher.voucherId
        );
        if (index !== -1) {
          this.vouchers[index] = {
            ...this.vouchers[index],
            ...this.editVoucher,
          };
        }
        this.editModal.hide();
        this.toast.success(
          `Voucher ${this.editVoucher.voucherCode} updated successfully`,
          {
            toastClassName: "custom-toast",
            timeout: 3000,
            position: "top-right",
            closeOnClick: true,
          }
        );
      } catch (error) {
        console.error("Error updating voucher:", error);
        console.log("Server response:", error.response?.data);
        this.toast.error(
          `Failed to update voucher: ${
            error.response?.data?.message || error.message || "Unknown error"
          }`,
          {
            toastClassName: "custom-toast",
            timeout: 3000,
            position: "top-right",
            closeOnClick: true,
          }
        );
      } finally {
        this.loading = false;
      }
    },
    handleDeleteVoucher(voucher) {
      this.voucherToDelete = voucher;
      this.deleteModal.show();
    },
    async confirmDelete() {
      try {
        this.loading = true;
        await API.delete(`/vouchers/delete/${this.voucherToDelete.voucherId}`);
        this.vouchers = this.vouchers.filter(
          (voucher) => voucher.voucherId !== this.voucherToDelete.voucherId
        );
        this.deleteModal.hide();
        this.toast.success(
          `Voucher ${this.voucherToDelete.voucherCode} deleted successfully`,
          {
            toastClassName: "custom-toast",
            timeout: 3000,
            position: "top-right",
            closeOnClick: true,
          }
        );
      } catch (error) {
        console.error("Error deleting voucher:", error);
        console.log("Server response:", error.response?.data);
        this.toast.error(
          `Failed to delete voucher: ${
            error.response?.data?.message || error.message || "Unknown error"
          }`,
          {
            toastClassName: "custom-toast",
            timeout: 3000,
            position: "top-right",
            closeOnClick: true,
          }
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
          toastClassName: "custom-toast",
          timeout: 3000,
          position: "top-right",
          closeOnClick: true,
        });
      } catch (error) {
        console.error("Error exporting to Excel:", error);
        this.toast.error(
          `Failed to export: ${error.message || "Unknown error"}`,
          {
            toastClassName: "custom-toast",
            timeout: 3000,
            position: "top-right",
            closeOnClick: true,
          }
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
          } else if (column.key === "expiryDate") {
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
    this.createModal = new Modal(document.getElementById("createVoucherModal"));
    this.editModal = new Modal(document.getElementById("editVoucherModal"));
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

.table-responsive.loading::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.7);
  z-index: 5;
}

.pagination .page-item.disabled .page-link {
  pointer-events: none;
  opacity: 0.5;
}

input[type="checkbox"] {
  margin-left: 10px;
}

.btn-sm {
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
}

.modal-body {
  padding: 1.5rem;
}

.modal-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #dee2e6;
}

.custom-toast {
  font-size: 1.5rem;
  padding: 25px;
  min-width: 450px;
}
</style>
