<template>
  <div class="voucher-management-container">
    <!-- Header with Title and Create Button -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="mb-0">Voucher Management</h2>
      <button class="btn btn-primary" @click="openCreateVoucherModal()">
        <i class="bi bi-plus-circle me-2"></i> Create New Voucher
      </button>
    </div>

    <!-- Filters and Search -->
    <div class="card mb-4">
      <div class="card-body">
        <div class="row g-3">
          <div class="col-md-10">
            <div class="input-group">
              <span class="input-group-text">
                <i class="bi bi-search"></i>
              </span>
              <input type="text" class="form-control" placeholder="Search voucher code..." v-model="searchQuery"
                @input="handleSearch">
              <button v-if="searchQuery" class="btn btn-outline-secondary" type="button" @click="clearSearch">
                <i class="bi bi-x"></i>
              </button>
            </div>
          </div>
          <div class="col-md-2">
            <button class="btn btn-outline-secondary w-100" @click="resetFilters">
              Reset Filters
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Vouchers Table -->
    <div class="card">
      <div class="card-body">
        <div class="table-responsive" :class="{ 'loading': loading }">
          <table class="table table-hover">
            <thead class="table-light">
              <tr>
                <th @click="sortBy('voucherId')" class="sortable-header">
                  ID
                  <i v-if="sortColumn === 'voucherId'" :class="[
                    'bi',
                    sortDirection === 'asc' ? 'bi-sort-up' : 'bi-sort-down'
                  ]"></i>
                </th>
                <th @click="sortBy('voucherCode')" class="sortable-header">
                  Voucher Code
                  <i v-if="sortColumn === 'voucherCode'" :class="[
                    'bi',
                    sortDirection === 'asc' ? 'bi-sort-up' : 'bi-sort-down'
                  ]"></i>
                </th>
                <th @click="sortBy('discountPercentage')" class="sortable-header">
                  Discount (%)
                  <i v-if="sortColumn === 'discountPercentage'" :class="[
                    'bi',
                    sortDirection === 'asc' ? 'bi-sort-up' : 'bi-sort-down'
                  ]"></i>
                </th>
                <th @click="sortBy('expireDate')" class="sortable-header">
                  Expire Date
                  <i v-if="sortColumn === 'expireDate'" :class="[
                    'bi',
                    sortDirection === 'asc' ? 'bi-sort-up' : 'bi-sort-down'
                  ]"></i>
                </th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="voucher in paginatedVouchers" :key="voucher.voucherId" :class="getRowClass(voucher)">
                <td>{{ voucher.voucherId }}</td>
                <td><strong>{{ voucher.voucherCode }}</strong></td>
                <td>{{ voucher.discountPercentage }}%</td>
                <td>{{ formatDate(voucher.expireDate) }}</td>
                <td>
                  <span :class="getStatusBadgeClass(isExpired(voucher.expireDate))">
                    {{ isExpired(voucher.expireDate) ? 'Expired' : 'Active' }}
                  </span>
                </td>
                <td>
                  <div class="btn-group">
                    <button class="btn btn-sm btn-outline-primary" @click="openEditVoucherModal(voucher)">
                      <i class="bi bi-pencil"></i> Edit
                    </button>
                    <button class="btn btn-sm btn-outline-danger" @click="confirmDeleteVoucher(voucher)">
                      <i class="bi bi-trash"></i> Delete
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="filteredVouchers.length === 0">
                <td colspan="6" class="text-center py-4">
                  <div class="text-muted">
                    <i class="bi bi-ticket-perforated fs-3 d-block mb-2"></i>
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
        <div class="d-flex justify-content-between align-items-center mt-3">
          <div>
            Showing {{ startIndex + 1 }} to {{ Math.min(endIndex, filteredVouchers.length) }} of {{
              filteredVouchers.length }}
            vouchers
          </div>
          <nav aria-label="Table pagination">
            <ul class="pagination mb-0">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <a class="page-link" href="#" @click.prevent="goToPage(currentPage - 1)">Previous</a>
              </li>
              <li v-for="page in displayedPages" :key="page" class="page-item"
                :class="{ active: currentPage === page }">
                <a class="page-link" href="#" @click.prevent="goToPage(page)">{{ page }}</a>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <a class="page-link" href="#" @click.prevent="goToPage(currentPage + 1)">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>

    <!-- Create/Edit Voucher Modal -->
    <div class="modal fade" id="voucherModal" tabindex="-1" aria-labelledby="voucherModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="voucherModalLabel">
              {{ isEditMode ? 'Edit Voucher' : 'Create New Voucher' }}
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveVoucher">
              <div class="mb-3">
                <label for="voucherCode" class="form-label">Voucher Code*</label>
                <input type="text" class="form-control" id="voucherCode" v-model="voucherForm.voucherCode" required
                  placeholder="e.g., SUMMER10">
                <div class="form-text">Must be unique. Use uppercase letters and numbers.</div>
              </div>

              <div class="mb-3">
                <label for="discountPercentage" class="form-label">Discount Percentage*</label>
                <div class="input-group">
                  <input type="number" class="form-control" id="discountPercentage"
                    v-model="voucherForm.discountPercentage" required min="1" max="100">
                  <span class="input-group-text">%</span>
                </div>
                <div class="form-text">Enter a value between 1 and 100</div>
              </div>

              <div class="mb-3">
                <label for="expireDate" class="form-label">Expire Date*</label>
                <input type="date" class="form-control" id="expireDate" v-model="voucherForm.expireDate" required
                  :min="minDate">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" @click="saveVoucher">
              {{ isEditMode ? 'Update Voucher' : 'Create Voucher' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteModalLabel">Confirm Delete</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" v-if="voucherToDelete">
            <p>Are you sure you want to delete the voucher <strong>{{ voucherToDelete.voucherCode
            }}</strong>?</p>
            <p class="text-danger">This action cannot be undone.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-danger" @click="deleteVoucher">
              <i class="bi bi-trash me-1"></i> Delete Voucher
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { Modal } from 'bootstrap';
import { useToast } from 'vue-toastification';

export default {
  name: 'VoucherManagement',
  setup() {
    const toast = useToast();
    const loading = ref(false);
    const vouchers = ref([]);
    const searchQuery = ref('');
    const sortColumn = ref('voucherId');
    const sortDirection = ref('desc');
    const currentPage = ref(1);
    const itemsPerPage = ref(10);
    const isEditMode = ref(false);
    const voucherToDelete = ref(null);

    // Form data
    const voucherForm = ref({
      voucherId: null,
      voucherCode: '',
      discountPercentage: 10,
      expireDate: ''
    });

    // Modal references
    let voucherModal = null;
    let deleteModal = null;

    // Computed properties
    const minDate = computed(() => {
      const today = new Date();
      return today.toISOString().split('T')[0];
    });

    const filteredVouchers = computed(() => {
      let result = [...vouchers.value];

      // Apply search filter
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        result = result.filter(voucher => {
          return voucher.voucherCode.toLowerCase().includes(query);
        });
      }

      // Apply sorting
      result.sort((a, b) => {
        let aValue = a[sortColumn.value];
        let bValue = b[sortColumn.value];

        // Special handling for dates
        if (sortColumn.value === 'expireDate') {
          aValue = new Date(aValue).getTime();
          bValue = new Date(bValue).getTime();
        }

        if (aValue < bValue) return sortDirection.value === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection.value === 'asc' ? 1 : -1;
        return 0;
      });

      return result;
    });

    // Pagination
    const totalPages = computed(() => {
      return Math.ceil(filteredVouchers.value.length / itemsPerPage.value);
    });

    const startIndex = computed(() => {
      return (currentPage.value - 1) * itemsPerPage.value;
    });

    const endIndex = computed(() => {
      return startIndex.value + itemsPerPage.value;
    });

    const paginatedVouchers = computed(() => {
      return filteredVouchers.value.slice(startIndex.value, endIndex.value);
    });

    const displayedPages = computed(() => {
      const pages = [];
      const maxVisiblePages = 5;

      if (totalPages.value <= maxVisiblePages) {
        // If we have fewer pages than the max, show all
        for (let i = 1; i <= totalPages.value; i++) {
          pages.push(i);
        }
      } else {
        // Always include first page
        pages.push(1);

        // Calculate start and end of visible pages
        let start = Math.max(2, currentPage.value - 1);
        let end = Math.min(totalPages.value - 1, currentPage.value + 1);

        // Adjust if we're at the beginning or end
        if (currentPage.value <= 2) {
          end = Math.min(totalPages.value - 1, maxVisiblePages - 1);
        } else if (currentPage.value >= totalPages.value - 1) {
          start = Math.max(2, totalPages.value - maxVisiblePages + 2);
        }

        // Add ellipsis if needed
        if (start > 2) {
          pages.push('...');
        }

        // Add middle pages
        for (let i = start; i <= end; i++) {
          pages.push(i);
        }

        // Add ellipsis if needed
        if (end < totalPages.value - 1) {
          pages.push('...');
        }

        // Always include last page
        if (totalPages.value > 1) {
          pages.push(totalPages.value);
        }
      }

      return pages;
    });

    // Methods
    const fetchVouchers = async () => {
      try {
        loading.value = true;
        // In a real application, you would fetch data from your API
        // For this example, we'll use mock data
        setTimeout(() => {
          vouchers.value = generateMockVouchers();
          loading.value = false;
        }, 500);
      } catch (error) {
        console.error('Error fetching vouchers:', error);
        toast.error('Failed to load vouchers');
        loading.value = false;
      }
    };

    const sortBy = (column) => {
      if (sortColumn.value === column) {
        sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
      } else {
        sortColumn.value = column;
        sortDirection.value = 'asc';
      }
    };

    const goToPage = (page) => {
      if (page < 1 || page > totalPages.value || page === '...') return;
      currentPage.value = page;
    };

    const handleSearch = () => {
      currentPage.value = 1;
    };

    const clearSearch = () => {
      searchQuery.value = '';
      currentPage.value = 1;
    };

    const resetFilters = () => {
      searchQuery.value = '';
      currentPage.value = 1;
    };

    const formatDate = (dateString) => {
      if (!dateString) return 'N/A';

      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }).format(date);
    };

    const isExpired = (dateString) => {
      if (!dateString) return false;

      const today = new Date();
      const expireDate = new Date(dateString);
      return today > expireDate;
    };

    const getStatusBadgeClass = (isExpired) => {
      return isExpired ? 'badge bg-danger' : 'badge bg-success';
    };

    const getRowClass = (voucher) => {
      return isExpired(voucher.expireDate) ? 'table-danger' : '';
    };

    const openCreateVoucherModal = () => {
      isEditMode.value = false;
      resetVoucherForm();
      voucherModal.show();
    };

    const openEditVoucherModal = (voucher) => {
      isEditMode.value = true;

      // Clone the voucher to avoid direct mutation
      voucherForm.value = {
        voucherId: voucher.voucherId,
        voucherCode: voucher.voucherCode,
        discountPercentage: voucher.discountPercentage,
        expireDate: voucher.expireDate
      };

      voucherModal.show();
    };

    const confirmDeleteVoucher = (voucher) => {
      voucherToDelete.value = voucher;
      deleteModal.show();
    };

    const resetVoucherForm = () => {
      voucherForm.value = {
        voucherId: null,
        voucherCode: '',
        discountPercentage: 10,
        expireDate: minDate.value
      };
    };

    const saveVoucher = async () => {
      try {
        // Validate form
        if (!voucherForm.value.voucherCode ||
          !voucherForm.value.discountPercentage ||
          !voucherForm.value.expireDate) {
          toast.error('Please fill in all required fields');
          return;
        }

        loading.value = true;

        // In a real application, you would call your API
        // For this example, we'll simulate an API call
        await new Promise(resolve => setTimeout(resolve, 800));

        if (isEditMode.value) {
          // Update existing voucher
          const index = vouchers.value.findIndex(v => v.voucherId === voucherForm.value.voucherId);
          if (index !== -1) {
            // Update the voucher
            vouchers.value[index] = { ...voucherForm.value };
            toast.success(`Voucher ${voucherForm.value.voucherCode} has been updated`);
          }
        } else {
          // Create new voucher
          // Check if voucher code already exists
          const existingVoucher = vouchers.value.find(v =>
            v.voucherCode.toLowerCase() === voucherForm.value.voucherCode.toLowerCase()
          );

          if (existingVoucher) {
            toast.error('Voucher code already exists. Please use a different code.');
            loading.value = false;
            return;
          }

          // Add new voucher
          const newVoucher = {
            ...voucherForm.value,
            voucherId: Date.now() // Generate a unique ID
          };

          vouchers.value.push(newVoucher);
          toast.success(`Voucher ${newVoucher.voucherCode} has been created`);
        }

        // Close the modal
        voucherModal.hide();

        // Reset form
        resetVoucherForm();

        loading.value = false;
      } catch (error) {
        console.error('Error saving voucher:', error);
        toast.error('Failed to save voucher');
        loading.value = false;
      }
    };

    const deleteVoucher = async () => {
      try {
        if (!voucherToDelete.value) return;

        loading.value = true;

        // In a real application, you would call your API
        // For this example, we'll simulate an API call
        await new Promise(resolve => setTimeout(resolve, 800));

        // Remove the voucher from the list
        vouchers.value = vouchers.value.filter(v => v.voucherId !== voucherToDelete.value.voucherId);

        toast.success(`Voucher ${voucherToDelete.value.voucherCode} has been deleted`);

        // Close the modal
        deleteModal.hide();
        voucherToDelete.value = null;

        loading.value = false;
      } catch (error) {
        console.error('Error deleting voucher:', error);
        toast.error('Failed to delete voucher');
        loading.value = false;
      }
    };

    // Mock data generator
    const generateMockVouchers = () => {
      return [
        {
          voucherId: 1,
          voucherCode: 'SUMMER10',
          discountPercentage: 10,
          expireDate: '2025-06-30'
        },
        {
          voucherId: 2,
          voucherCode: 'WELCOME20',
          discountPercentage: 20,
          expireDate: '2025-05-15'
        },
        {
          voucherId: 3,
          voucherCode: 'SPECIAL15',
          discountPercentage: 15,
          expireDate: '2024-12-31'
        },
        {
          voucherId: 4,
          voucherCode: 'NEWYEAR25',
          discountPercentage: 25,
          expireDate: '2025-01-31'
        },
        {
          voucherId: 5,
          voucherCode: 'HOLIDAY5',
          discountPercentage: 5,
          expireDate: '2024-11-30'
        }
      ];
    };

    // Initialize modals and fetch data on component mount
    onMounted(() => {
      voucherModal = new Modal(document.getElementById('voucherModal'));
      deleteModal = new Modal(document.getElementById('deleteModal'));
      fetchVouchers();
    });

    return {
      // State
      loading,
      vouchers,
      searchQuery,
      sortColumn,
      sortDirection,
      currentPage,
      voucherForm,
      isEditMode,
      voucherToDelete,
      minDate,

      // Computed
      filteredVouchers,
      paginatedVouchers,
      totalPages,
      startIndex,
      endIndex,
      displayedPages,

      // Methods
      sortBy,
      goToPage,
      handleSearch,
      clearSearch,
      resetFilters,
      formatDate,
      isExpired,
      getStatusBadgeClass,
      getRowClass,
      openCreateVoucherModal,
      openEditVoucherModal,
      confirmDeleteVoucher,
      saveVoucher,
      deleteVoucher
    };
  }
};
</script>

<style scoped>
.voucher-management-container {
  padding: 1rem;
}

.sortable-header {
  cursor: pointer;
  user-select: none;
}

.sortable-header:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

/* Add some spacing for the icons */
.bi {
  margin-left: 0.25rem;
}

/* Make sure the table doesn't break on small screens */
.table-responsive {
  min-height: 300px;
  position: relative;
}

/* Add loading overlay */
.table-responsive.loading {
  position: relative;
}

.loading-spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
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

/* Add any custom styles you need */
.modal-body {
  padding: 1.5rem;
}

.modal-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #dee2e6;
}
</style>
