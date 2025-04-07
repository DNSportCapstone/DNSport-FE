<template>
    <div class="user-table-container">
        <!-- Top Action Bar -->
        <div class="d-flex justify-content-between align-items-center mb-3">
            <div class="d-flex gap-2">
                <button class="btn btn-outline-secondary" @click="handleExport">
                    <i class="bi bi-file-excel me-1"></i> Export Excel
                </button>
                <div class="dropdown">
                    <button class="btn btn-outline-secondary dropdown-toggle" type="button" id="columnToggleDropdown"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="bi bi-columns-gap me-1"></i> Columns
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="columnToggleDropdown">
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
                    <input type="text" class="form-control" placeholder="Search users..." v-model="searchQuery"
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
                    <tr v-for="(user) in paginatedData" :key="user.userId">
                        <td v-for="column in visibleColumns" :key="`${user.userId}-${column.key}`">
                            <template v-if="column.key === 'status'">
                                <span :class="getStatusBadgeClass(user.status)">
                                    {{ user.status }}
                                </span>
                            </template>
                            <template v-else-if="column.key === 'roleId'">
                                <span :class="getRoleBadgeClass(user.roleId)">
                                    {{ getRoleName(user.roleId) }}
                                </span>
                            </template>
                            <template v-else-if="column.key === 'createdAt'">
                                {{ formatDate(user.createdAt) }}
                            </template>
                            <template v-else>
                                {{ user[column.key] }}
                            </template>
                        </td>
                        <td>
                            <div class="d-flex gap-1">
                                <!-- Show Enable button if user is inactive -->
                                <button v-if="user.status !== 'Active'" class="btn btn-sm btn-outline-success"
                                    @click="handleEnable(user)">
                                    <i class="bi bi-check-circle"></i> Enable
                                </button>
                                <!-- Show Disable button if user is active -->
                                <button v-else class="btn btn-sm btn-outline-warning" @click="handleDisable(user)">
                                    <i class="bi bi-slash-circle"></i> Disable
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="filteredData.length === 0">
                        <td :colspan="visibleColumns.length + 1" class="text-center py-4">
                            <div class="text-muted">
                                <i class="bi bi-inbox fs-3 d-block mb-2"></i>
                                No users found
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
                Showing {{ startIndex + 1 }} to {{ Math.min(endIndex, filteredData.length) }} of {{ filteredData.length
                }}
                users
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

        <!-- Disable confirmation modal -->
        <div class="modal fade" id="disableConfirmModal" tabindex="-1" aria-labelledby="disableConfirmModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="disableConfirmModalLabel">Confirm Disable</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to disable user <strong>{{ userToDisable?.email }}</strong>?
                        <p class="text-warning mt-2 mb-0"><small>This will prevent the user from accessing the
                                system.</small>
                        </p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-warning" @click="confirmDisable">
                            <i class="bi bi-slash-circle me-1"></i>Disable User
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Enable confirmation modal -->
        <div class="modal fade" id="enableConfirmModal" tabindex="-1" aria-labelledby="enableConfirmModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="enableConfirmModalLabel">Confirm Enable</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to enable user <strong>{{ userToEnable?.email }}</strong>?
                        <p class="text-success mt-2 mb-0"><small>This will allow the user to access the system
                                again.</small>
                        </p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-success" @click="confirmEnable">
                            <i class="bi bi-check-circle me-1"></i>Enable User
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useToast } from "vue-toastification";
import { Modal } from 'bootstrap';
import API from "@/utils/axios";
import * as XLSX from 'xlsx';

export default {
    name: 'UserTable',
    data() {
        return {
            userToDisable: null,
            userToEnable: null,
            disableModal: null,
            enableModal: null,
            toast: useToast(),
            loading: false,
            error: null,

            // User data from API
            users: [],

            columns: [
                { key: 'userId', label: 'ID', visible: true },
                { key: 'email', label: 'Email', visible: true },
                { key: 'roleId', label: 'Role', visible: true },
                { key: 'status', label: 'Status', visible: true },
                { key: 'createdAt', label: 'Created At', visible: true },
            ],

            // Search functionality
            searchQuery: '',

            // Sorting
            sortColumn: 'userId',
            sortDirection: 'asc',

            // Pagination
            itemsPerPage: 5,
            currentPage: 1
        };
    },
    computed: {
        // Visible columns
        visibleColumns() {
            return this.columns.filter(column => column.visible);
        },

        // Filtered data based on search
        filteredData() {
            if (!this.searchQuery) return this.users;

            const query = this.searchQuery.toLowerCase();
            return this.users.filter(user => {
                return Object.keys(user).some(key => {
                    const value = user[key];
                    if (key === 'roleId') {
                        return this.getRoleName(value).toLowerCase().includes(query);
                    }
                    return value && value.toString().toLowerCase().includes(query);
                });
            });
        },

        // Pagination calculations
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

        // Display only a reasonable number of page links
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
                pages.push(this.totalPages);
            }

            return pages;
        }
    },
    methods: {
        // Utility functions
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

        getRoleName(roleId) {
            switch (roleId) {
                case 1:
                    return 'Admin';
                case 2:
                    return 'Lessor';
                case 3:
                    return 'Customer';
                default:
                    return 'Unknown';
            }
        },

        getRoleBadgeClass(roleId) {
            const classes = 'badge ';
            switch (roleId) {
                case 1:
                    return classes + 'bg-danger';
                case 2:
                    return classes + 'bg-primary';
                case 3:
                    return classes + 'bg-info text-dark';
                default:
                    return classes + 'bg-secondary';
            }
        },

        getStatusBadgeClass(status) {
            if (!status) return 'badge bg-secondary';

            const classes = 'badge ';
            switch (status.trim()) {
                case 'Active':
                    return classes + 'bg-success';
                case 'Inactive':
                    return classes + 'bg-warning text-dark';
                case 'Suspended':
                    return classes + 'bg-danger';
                case 'Pending':
                    return classes + 'bg-info text-dark';
                default:
                    return classes + 'bg-secondary';
            }
        },

        // Sorting
        sortBy(column) {
            if (this.sortColumn === column) {
                this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                this.sortColumn = column;
                this.sortDirection = 'asc';
            }

            this.users.sort((a, b) => {
                let aValue = a[this.sortColumn];
                let bValue = b[this.sortColumn];

                // Special handling for dates
                if (this.sortColumn === 'createdAt') {
                    aValue = new Date(aValue).getTime();
                    bValue = new Date(bValue).getTime();
                }

                if (aValue < bValue) return this.sortDirection === 'asc' ? -1 : 1;
                if (aValue > bValue) return this.sortDirection === 'asc' ? 1 : -1;
                return 0;
            });
        },

        // Pagination
        goToPage(page) {
            if (page < 1 || page > this.totalPages || page === '...') return;
            this.currentPage = page;
        },

        // Event handlers
        handleSearch() {
            this.currentPage = 1;
        },

        clearSearch() {
            this.searchQuery = '';
        },

        // Disable user
        handleDisable(user) {
            this.userToDisable = user;
            this.disableModal.show();
        },

        // Enable user
        handleEnable(user) {
            this.userToEnable = user;
            this.enableModal.show();
        },

        // Confirm disable
        async confirmDisable() {
            try {
                this.loading = true;
                console.log(this.userToDisable);

                // Call API to disable the user
                await API.post(`Admin/set-user-status`, {
                    userId: this.userToDisable.userId,
                    status: 'Inactive'
                });

                // Update the local state
                const index = this.users.findIndex(u => u.userId === this.userToDisable.userId);
                if (index !== -1) {
                    this.users[index].status = 'Inactive';
                }

                // Hide the modal
                this.disableModal.hide();

                // Show success toast
                this.toast.success(`User ${this.userToDisable.email} has been disabled successfully`);
                await this.fetchUsers();

            } catch (error) {
                console.error('Error disabling user:', error);
                this.toast.error(`Failed to disable user: ${error.message || 'Unknown error'}`);
            } finally {
                this.loading = false;
                this.userToDisable = null;
            }
        },

        // Confirm enable
        async confirmEnable() {
            try {
                this.loading = true;
                console.log(this.userToEnable);

                // Call API to enable the user
                await API.post(`Admin/set-user-status`, {
                    userId: this.userToEnable.userId,
                    status: 'Active'
                });

                // Update the local state
                const index = this.users.findIndex(u => u.userId === this.userToEnable.userId);
                if (index !== -1) {
                    this.users[index].status = 'Active';
                }

                // Hide the modal
                this.enableModal.hide();

                // Show success toast
                this.toast.success(`User ${this.userToEnable.email} has been enabled successfully`);
                await this.fetchUsers();

            } catch (error) {
                console.error('Error enabling user:', error);
                this.toast.error(`Failed to enable user: ${error.message || 'Unknown error'}`);
            } finally {
                this.loading = false;
                this.userToEnable = null;
            }
        },

        // Export to Excel
        handleExport() {
            try {
                // Prepare data for Excel export
                const excelData = this.prepareExcelData();

                // Create workbook and worksheet
                const wb = XLSX.utils.book_new();
                const ws = XLSX.utils.json_to_sheet(excelData);

                // Add worksheet to workbook
                XLSX.utils.book_append_sheet(wb, ws, 'Users');

                // Generate Excel file and trigger download
                XLSX.writeFile(wb, 'users.xlsx');

                this.toast.success("Excel export completed successfully!", {
                    timeout: 3000,
                    position: "top-right",
                    closeOnClick: true
                });
            } catch (error) {
                console.error('Error exporting to Excel:', error);
                this.toast.error(`Failed to export: ${error.message || 'Unknown error'}`);
            }
        },

        // Prepare data for Excel export
        prepareExcelData() {
            // Use all users for export, not just the paginated ones
            return this.users.map(user => {
                const row = {};

                // Only include visible columns
                this.visibleColumns.forEach(column => {
                    let value = user[column.key];

                    // Format specific columns
                    if (column.key === 'roleId') {
                        value = this.getRoleName(value);
                    } else if (column.key === 'createdAt') {
                        value = this.formatDate(value);
                    }

                    row[column.label] = value || '';
                });

                return row;
            });
        },

        // Fetch users from API
        async fetchUsers() {
            try {
                this.loading = true;
                this.error = null;

                const response = await API.get('User/all');
                this.users = response.data;

                // Sort by default column
                //this.sortBy(this.sortColumn);

            } catch (error) {
                console.error('Error fetching users:', error);
                this.error = error.message || 'Failed to load users';
                this.toast.error(`Failed to load users: ${this.error}`);
                this.users = []; // Clear users on error
            } finally {
                this.loading = false;
            }
        }
    },
    mounted() {
        // Fetch users when component mounts
        this.fetchUsers();

        // Initialize Bootstrap modals
        this.disableModal = new Modal(document.getElementById('disableConfirmModal'));
        this.enableModal = new Modal(document.getElementById('enableConfirmModal'));
    }
};
</script>

<style scoped>
.user-table-container {
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
