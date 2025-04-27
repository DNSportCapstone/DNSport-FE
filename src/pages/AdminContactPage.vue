<template>
    <div class="contact-table-container">
      <!-- Top Action Bar -->
      <div class="d-flex justify-content-between align-items-center mb-3">
        <div class="d-flex gap-2">
          <div class="dropdown">
            <button class="btn btn-outline-secondary dropdown-toggle" type="button" id="columnToggleDropdown"
              @click="toggleDropdown('columnToggleDropdown')" aria-expanded="false">
              <i class="bi bi-columns-gap me-1"></i> Columns
            </button>
            <ul class="dropdown-menu" aria-labelledby="columnToggleDropdown" ref="columnDropdownMenu">
              <li v-for="column in columns" :key="column.key">
                <div class="dropdown-item">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" :id="`column-${column.key}`"
                      v-model="column.visible">
                    <label class="form-check-label" :for="`column-${column.key}`">
                      {{ column.label }}
                    </label>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Search Bar -->
        <div class="col-md-4">
          <div class="input-group">
            <span class="input-group-text">
              <i class="bi bi-search"></i>
            </span>
            <input type="text" class="form-control" placeholder="Search contacts..." v-model="searchQuery"
              @input="handleSearch">
            <button v-if="searchQuery" class="btn btn-outline-secondary" type="button" @click="clearSearch">
              <i class="bi bi-x"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Data Table -->
      <div class="table-responsive" :class="{ 'loading': loading }">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th v-for="column in visibleColumns" :key="column.key" @click="sortBy(column.key)"
                class="sortable-header">
                {{ column.label }}
                <i v-if="sortColumn === column.key" :class="[
                  'bi',
                  sortDirection === 'asc' ? 'bi-sort-up' : 'bi-sort-down'
                ]"></i>
                <i v-else class="bi bi-filter text-muted opacity-25"></i>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="contact in paginatedData" :key="contact.id">
              <td v-for="column in visibleColumns" :key="`${contact.id}-${column.key}`">
                <template v-if="column.key === 'status'">
                  <span :class="getStatusBadgeClass(contact.status)">
                    {{ contact.status }}
                  </span>
                </template>
                <template v-else-if="column.key === 'createAt'">
                  {{ formatDate(contact.createAt) }}
                </template>
                <template v-else>
                  {{ contact[column.key] }}
                </template>
              </td>
              <td>
                <div class="dropdown">
                  <button class="btn btn-outline-primary btn-sm dropdown-toggle rounded-pill px-3" type="button"
                    @click="toggleActionDropdown($event)" aria-expanded="false">
                    <i class="bi bi-three-dots-vertical me-1"></i> Actions
                  </button>
                  <ul class="dropdown-menu shadow border-0" ref="actionDropdownMenu">
                    <li>
                      <a class="dropdown-item d-flex align-items-center" @click="handleViewDetails(contact)">
                        <i class="bi bi-eye me-2 text-primary"></i> View Details
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item d-flex align-items-center text-success" @click="handleApprove(contact)">
                        <i class="bi bi-check-circle me-2"></i> Approve
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item d-flex align-items-center text-danger" @click="handleReject(contact)">
                        <i class="bi bi-x-circle me-2"></i> Reject
                      </a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
            <tr v-if="filteredData.length === 0">
              <td :colspan="visibleColumns.length + 1" class="text-center py-4">
                <div class="text-muted">
                  <i class="bi bi-inbox fs-3 d-block mb-2"></i>
                  No contact forms found
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
      <div class="d-flex justify-content-between align-items-center">
        <div>
          Showing {{ startIndex + 1 }} to {{ Math.min(endIndex, filteredData.length) }} of {{ filteredData.length }}
          contacts
        </div>
        <nav aria-label="Table pagination">
          <ul class="pagination mb-0">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <a class="page-link" href="#" @click.prevent="goToPage(currentPage - 1)">Previous</a>
            </li>
            <li v-for="page in displayedPages" :key="typeof page === 'number' ? page : `ellipsis-${page}`" class="page-item"
              :class="{ active: currentPage === page, disabled: page === '...' }">
              <a class="page-link" href="#" @click.prevent="goToPage(page)">{{ page }}</a>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <a class="page-link" href="#" @click.prevent="goToPage(currentPage + 1)">Next</a>
            </li>
          </ul>
        </nav>
      </div>

      <!-- Approve confirmation modal -->
      <div class="modal fade" id="approveConfirmModal" tabindex="-1" aria-labelledby="approveConfirmModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="approveConfirmModalLabel">Confirm Approval</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              Are you sure you want to approve the contact request from <strong>{{ contactToApprove?.fullname }}</strong>?
              <p class="text-success mt-2 mb-0">
                <small>This will mark the contact as approved and notify the lessor team.</small>
              </p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-success" @click="confirmApprove">
                <i class="bi bi-check-circle me-1"></i>Approve Contact
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Reject confirmation modal -->
      <div class="modal fade" id="rejectConfirmModal" tabindex="-1" aria-labelledby="rejectConfirmModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="rejectConfirmModalLabel">Confirm Rejection</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p class="text-danger">Are you sure you want to reject the contact request from <strong>{{ contactToReject?.fullName }}</strong>?</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-danger" @click="confirmReject">
                <i class="bi bi-x-circle me-1"></i>Reject Contact
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- View Details Modal -->
      <div class="modal fade" id="viewDetailsModal" tabindex="-1" aria-labelledby="viewDetailsModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="viewDetailsModalLabel">Contact Details</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" v-if="selectedContact">
              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <h6 class="text-muted">Full Name</h6>
                    <p class="fs-5">{{ selectedContact.fullname }}</p>
                  </div>
                  <div class="mb-3">
                    <h6 class="text-muted">Email</h6>
                    <p>{{ selectedContact.email }}</p>
                  </div>
                  <div class="mb-3">
                    <h6 class="text-muted">Phone Number</h6>
                    <p>{{ selectedContact.phoneNumber }}</p>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <h6 class="text-muted">Status</h6>
                    <span :class="getStatusBadgeClass(selectedContact.status)">
                      {{ selectedContact.status }}
                    </span>
                  </div>
                  <div class="mb-3">
                    <h6 class="text-muted">Submitted On</h6>
                    <p>{{ formatDate(selectedContact.createAt) }}</p>
                  </div>
                  <div class="mb-3" v-if="selectedContact.processedAt">
                    <h6 class="text-muted">Processed On</h6>
                    <p>{{ formatDate(selectedContact.processedAt) }}</p>
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <h6 class="text-muted">Address</h6>
                <p>{{ selectedContact.address }}</p>
              </div>
              <div class="mb-3" v-if="selectedContact.rejectionReason">
                <h6 class="text-muted">Rejection Reason</h6>
                <p class="text-danger">{{ selectedContact.rejectionReason }}</p>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <div v-if="selectedContact && selectedContact.status === 'Pending'">
                <button type="button" class="btn btn-success me-2" @click="handleApprove(selectedContact)">
                  <i class="bi bi-check-circle me-1"></i>Approve
                </button>
                <button type="button" class="btn btn-danger" @click="handleReject(selectedContact)">
                  <i class="bi bi-x-circle me-1"></i>Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </template>

  <script>
  import { useToast } from "vue-toastification";
  import * as XLSX from 'xlsx';
  import API from "@/utils/axios";
  import * as bootstrap from 'bootstrap';

  export default {
    name: 'ContactFormManagement',

    data() {
      return {
        contacts: [],
        loading: false,
        error: null,
        contactToApprove: null,
        contactToReject: null,
        selectedContact: null,
        rejectionReason: '',

        // Modals
        approveModal: null,
        rejectModal: null,
        viewDetailsModal: null,

        // Table configuration
        columns: [
          { key: 'contactId', label: 'ID', visible: true },
          { key: 'fullName', label: 'Full Name', visible: true },
          { key: 'email', label: 'Email', visible: true },
          { key: 'phoneNumber', label: 'Phone Number', visible: true },
          { key: 'address', label: 'Address', visible: true },
          { key: 'createAt', label: 'Submitted On', visible: true },
        ],

        // Search, sorting and pagination
        searchQuery: '',
        sortColumn: 'createAt',
        sortDirection: 'desc',
        itemsPerPage: 10,
        currentPage: 1,

        // For dropdown handling
        activeDropdown: null
      };
    },

    computed: {
      visibleColumns() {
        return this.columns.filter(column => column.visible);
      },

      filteredData() {
        if (!this.searchQuery) return this.contacts;

        const query = this.searchQuery.toLowerCase();
        return this.contacts.filter(contact => {
          return Object.keys(contact).some(key => {
            const value = contact[key];
            return value && value.toString().toLowerCase().includes(query);
          });
        });
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
          // If we have fewer pages than the max, show all
          for (let i = 1; i <= this.totalPages; i++) {
            pages.push(i);
          }
        } else {
          // Always include first page
          pages.push(1);

          // Calculate start and end of visible pages
          let start = Math.max(2, this.currentPage - 1);
          let end = Math.min(this.totalPages - 1, this.currentPage + 1);

          // Adjust if we're at the beginning or end
          if (this.currentPage <= 2) {
            end = Math.min(this.totalPages - 1, maxVisiblePages - 1);
          } else if (this.currentPage >= this.totalPages - 1) {
            start = Math.max(2, this.totalPages - maxVisiblePages + 2);
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
          if (end < this.totalPages - 1) {
            pages.push('...');
          }

          // Always include last page
          if (this.totalPages > 1) {
            pages.push(this.totalPages);
          }
        }

        return pages;
      }
    },

    mounted() {
      // Fetch contacts when component mounts
      this.fetchContacts();

      // Initialize Bootstrap modals
      this.approveModal = new bootstrap.Modal(document.getElementById('approveConfirmModal'));
      this.rejectModal = new bootstrap.Modal(document.getElementById('rejectConfirmModal'));
      this.viewDetailsModal = new bootstrap.Modal(document.getElementById('viewDetailsModal'));

      // Add click event listener to close dropdowns when clicking outside
      document.addEventListener('click', this.closeDropdowns);
    },

    beforeUnmount() {
      // Remove event listener when component is destroyed
      document.removeEventListener('click', this.closeDropdowns);
    },

    methods: {
      // Toast methods
      getToast() {
        return useToast();
      },

      // Formatting methods
      formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }).format(date);
      },

      getStatusBadgeClass(status) {
        if (!status) return 'badge bg-secondary';

        const classes = 'badge ';
        switch (status.trim()) {
          case 'Approved':
            return classes + 'bg-success';
          case 'Rejected':
            return classes + 'bg-danger';
          case 'Pending':
            return classes + 'bg-warning text-dark';
          default:
            return classes + 'bg-secondary';
        }
      },

      // Table sorting and pagination
      sortBy(column) {
        if (this.sortColumn === column) {
          this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
          this.sortColumn = column;
          this.sortDirection = 'asc';
        }

        this.contacts.sort((a, b) => {
          let aValue = a[this.sortColumn];
          let bValue = b[this.sortColumn];

          // Special handling for dates
          if (this.sortColumn === 'createAt' || this.sortColumn === 'processedAt') {
            aValue = new Date(aValue).getTime();
            bValue = new Date(bValue).getTime();
          }

          if (aValue < bValue) return this.sortDirection === 'asc' ? -1 : 1;
          if (aValue > bValue) return this.sortDirection === 'asc' ? 1 : -1;
          return 0;
        });
      },

      goToPage(page) {
        if (page < 1 || page > this.totalPages || page === '...') return;
        this.currentPage = page;
      },

      handleSearch() {
        this.currentPage = 1;
      },

      clearSearch() {
        this.searchQuery = '';
      },

      // Dropdown handling
      toggleDropdown(id) {
        const dropdownMenu = document.getElementById(id).nextElementSibling;
        if (dropdownMenu.classList.contains('show')) {
          dropdownMenu.classList.remove('show');
          this.activeDropdown = null;
        } else {
          // Close any open dropdowns first
          this.closeDropdowns();
          dropdownMenu.classList.add('show');
          this.activeDropdown = id;
        }
      },

      toggleActionDropdown(event) {
        const button = event.currentTarget;
        const dropdownMenu = button.nextElementSibling;

        if (dropdownMenu.classList.contains('show')) {
          dropdownMenu.classList.remove('show');
        } else {
          // Close any open dropdowns first
          this.closeDropdowns();
          dropdownMenu.classList.add('show');
        }
      },

      closeDropdowns(event) {
        // Skip if clicking on a dropdown toggle button
        if (event && event.target && event.target.classList.contains('dropdown-toggle')) {
          return;
        }

        // Close all dropdown menus
        const dropdowns = document.querySelectorAll('.dropdown-menu.show');
        dropdowns.forEach(dropdown => {
          dropdown.classList.remove('show');
        });

        this.activeDropdown = null;
      },

      // Contact actions
      handleApprove(contact) {
        this.contactToApprove = contact;
        this.viewDetailsModal?.hide();
        this.approveModal.show();
      },

      handleReject(contact) {
        this.contactToReject = contact;
        this.rejectionReason = '';
        this.viewDetailsModal?.hide();
        this.rejectModal.show();
      },

      handleViewDetails(contact) {
        this.selectedContact = contact;
        this.viewDetailsModal.show();
      },

      async confirmApprove() {
        try {
            const res = await API.get(`/Lessor/accept-lessor-contact/${this.contactToApprove.contactId}`);
            if(res){
                // Ẩn modal
                this.approveModal.hide();
                // Toast thành công
                this.getToast().success(`Contact from ${this.contactToApprove.fullName} has been approved successfully`);
                this.fetchContacts();
            }
        } catch (error) {
            this.getToast().error(`Failed to approve contact: ${error.message || 'Unknown error'}`);
        } finally {
            this.loading = false;
            this.contactToApprove = null;
        }
    },

      async confirmReject() {
        try {
          const res = await API.get(`/Lessor/reject-lessor-contact/${this.contactToReject.contactId}`);
        if(res){
            // Hide the modal
            this.rejectModal.hide();
            // Show success toast
            this.getToast().success(`Contact from ${this.contactToReject.fullName} has been rejected`);
            this.fetchContacts();
        }



        } catch (error) {
          this.getToast().error(`Failed to reject contact: ${error.message || 'Unknown error'}`);
        } finally {
          this.loading = false;
          this.contactToReject = null;
          this.rejectionReason = '';
        }
      },

      // Excel export
      handleExport() {
        try {
          // Prepare data for Excel export
          const excelData = this.prepareExcelData();

          // Create workbook and worksheet
          const wb = XLSX.utils.book_new();
          const ws = XLSX.utils.json_to_sheet(excelData);

          // Add worksheet to workbook
          XLSX.utils.book_append_sheet(wb, ws, 'Contact Forms');

          // Generate Excel file and trigger download
          XLSX.writeFile(wb, 'contact_forms.xlsx');

          this.getToast().success("Excel export completed successfully!", {
            timeout: 3000,
            position: "top-right",
            closeOnClick: true
          });
        } catch (error) {
          console.error('Error exporting to Excel:', error);
          this.getToast().error(`Failed to export: ${error.message || 'Unknown error'}`);
        }
      },

      prepareExcelData() {
        // Use all contacts for export, not just the paginated ones
        return this.contacts.map(contact => {
          const row = {};

          // Only include visible columns
          this.visibleColumns.forEach(column => {
            let value = contact[column.key];

            // Format specific columns
            if (column.key === 'createAt' || column.key === 'processedAt') {
              value = this.formatDate(value);
            }

            row[column.label] = value || '';
          });

          return row;
        });
      },

      // Data fetching
      async fetchContacts() {
        try {
          this.loading = true;
          this.error = null;

          // Replace with your actual API endpoint
          const response = await API.get('Lessor/get-all-lessor-contact');
          this.contacts = response.data;

          // Sort by created date by default (newest first)
          this.sortBy('createAt');
          this.sortDirection = 'desc';

        } catch (error) {
          console.error('Error fetching contacts:', error);
          this.error = error.message || 'Failed to load contact forms';
          this.getToast().error(`Failed to load contact forms: ${this.error}`);

          // For demo purposes, load sample data if API fails
          this.loadSampleData();
        } finally {
          this.loading = false;
        }
      },

      // Sample data for demo purposes
      loadSampleData() {
        this.contacts = [
          {
            id: 1,
            fullname: 'John Smith',
            email: 'john.smith@example.com',
            phoneNumber: '1234567890',
            address: '123 Main St, Anytown, USA',
            status: 'Pending',
            createdAt: '2023-08-15T09:30:00Z'
          },
          {
            id: 2,
            fullname: 'Jane Doe',
            email: 'jane.doe@example.com',
            phoneNumber: '9876543210',
            address: '456 Oak Ave, Somewhere, USA',
            status: 'Approved',
            createdAt: '2023-08-14T14:45:00Z',
            processedAt: '2023-08-14T16:20:00Z'
          },
          {
            id: 3,
            fullname: 'Robert Johnson',
            email: 'robert.j@example.com',
            phoneNumber: '5551234567',
            address: '789 Pine Rd, Elsewhere, USA',
            status: 'Rejected',
            createdAt: '2023-08-13T11:15:00Z',
            processedAt: '2023-08-13T13:40:00Z',
            rejectionReason: 'Incomplete information provided'
          },
          {
            id: 4,
            fullname: 'Maria Garcia',
            email: 'maria.g@example.com',
            phoneNumber: '7778889999',
            address: '101 Cedar Ln, Nowhere, USA',
            status: 'Pending',
            createdAt: '2023-08-16T08:20:00Z'
          },
          {
            id: 5,
            fullname: 'David Lee',
            email: 'david.lee@example.com',
            phoneNumber: '3334445555',
            address: '202 Maple Dr, Anywhere, USA',
            status: 'Approved',
            createdAt: '2023-08-12T10:10:00Z',
            processedAt: '2023-08-12T11:30:00Z'
          }
        ];
      }
    }
  };
  </script>

  <style scoped>
  @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css");

  .contact-table-container {
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

  /* Modal styles */
  .modal-body {
    padding: 1.5rem;
  }

  .modal-footer {
    padding: 1rem 1.5rem;
    border-top: 1px solid #dee2e6;
  }

  /* Badge styles */
  .badge {
    font-size: 0.85rem;
    padding: 0.35em 0.65em;
  }

  /* Action buttons */
  .dropdown-item {
    cursor: pointer;
  }

  .dropdown-item:hover {
    background-color: #f8f9fa;
  }
  </style>
