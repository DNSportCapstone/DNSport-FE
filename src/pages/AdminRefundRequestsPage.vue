<template>
    <div class="cardAdmin">
        <div class="container">
            <!-- Header with Title and Filter Dropdown -->
            <div class="d-flex justify-content-between align-items-center mb-4">
                <div class="d-flex gap-2">
                    <div class="dropdown">
                        <button class="btn btn-outline-primary dropdown-toggle" type="button" id="filterDropdown"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="bi bi-funnel me-1"></i> Filter: {{ currentFilter }}
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end shadow-sm" aria-labelledby="filterDropdown">
                            <li><button class="dropdown-item" @click="setFilter('All')">All Requests</button></li>
                            <li><button class="dropdown-item" @click="setFilter('Completed')">Completed</button></li>
                            <li><button class="dropdown-item" @click="setFilter('Processing')">Processing</button></li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Search and Date Range Filter -->
            <div class="card border-0 shadow-sm rounded-3 mb-4">
                <div class="card-body">
                    <div class="row g-3">
                        <div class="col-md-6">
                            <div class="input-group">
                                <span class="input-group-text bg-light border-end-0">
                                    <i class="bi bi-search text-muted"></i>
                                </span>
                                <input type="text" class="form-control border-start-0 ps-0"
                                    placeholder="Search by booking ID, customer name..." v-model="searchQuery"
                                    @input="handleSearch">
                                <button v-if="searchQuery" class="btn btn-outline-secondary border-start-0"
                                    type="button" @click="clearSearch">
                                    <i class="bi bi-x"></i>
                                </button>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="input-group">
                                <span class="input-group-text bg-light">
                                    <i class="bi bi-calendar-range text-muted"></i>
                                </span>
                                <input type="date" class="form-control" placeholder="From date"
                                    v-model="dateRange.from">
                                <span class="input-group-text bg-light">to</span>
                                <input type="date" class="form-control" placeholder="To date" v-model="dateRange.to">
                            </div>
                        </div>
                        <div class="col-md-2">
                            <button class="btn btn-outline-secondary w-100" @click="resetFilters">
                                <i class="bi bi-arrow-counterclockwise me-1"></i> Reset
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Refund Requests Table Card -->
            <div class="card border-0 shadow-sm rounded-3 overflow-hidden">
                <!-- Loading state -->
                <div v-if="loading" class="text-center py-5">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <p class="mt-3 text-muted">Loading refund requests...</p>
                </div>

                <!-- Empty state -->
                <div v-else-if="filteredRequests.length === 0" class="text-center py-5">
                    <i class="bi bi-inbox display-1 text-muted"></i>
                    <p class="mt-3 text-muted">No refund requests found</p>
                    <p class="text-muted small">Try adjusting your search or filter criteria</p>
                </div>

                <!-- Error state -->
                <div v-else-if="error" class="text-center py-5">
                    <i class="bi bi-exclamation-triangle display-1 text-danger"></i>
                    <p class="mt-3 text-danger">{{ error }}</p>
                    <button class="btn btn-outline-primary mt-2" @click="fetchRefundRequests">
                        <i class="bi bi-arrow-clockwise me-1"></i> Try Again
                    </button>
                </div>

                <!-- Table with data -->
                <div v-else class="table-responsive">
                    <table class="table table-hover mb-0">
                        <thead class="table-light">
                            <tr>
                                <th @click="sortBy('refundId')" class="fw-semibold border-0 sortable-header">
                                    Request ID
                                    <i v-if="sortColumn === 'refundId'" :class="[
                                        'bi',
                                        sortDirection === 'asc' ? 'bi-sort-up' : 'bi-sort-down'
                                    ]"></i>
                                </th>
                                <th @click="sortBy('bookingId')" class="fw-semibold border-0 sortable-header">
                                    Booking ID
                                    <i v-if="sortColumn === 'bookingId'" :class="[
                                        'bi',
                                        sortDirection === 'asc' ? 'bi-sort-up' : 'bi-sort-down'
                                    ]"></i>
                                </th>
                                <th @click="sortBy('userName')" class="fw-semibold border-0 sortable-header">
                                    Customer
                                    <i v-if="sortColumn === 'userName'" :class="[
                                        'bi',
                                        sortDirection === 'asc' ? 'bi-sort-up' : 'bi-sort-down'
                                    ]"></i>
                                </th>
                                <th @click="sortBy('totalAmount')" class="fw-semibold border-0 sortable-header">
                                    Amount
                                    <i v-if="sortColumn === 'totalAmount'" :class="[
                                        'bi',
                                        sortDirection === 'asc' ? 'bi-sort-up' : 'bi-sort-down'
                                    ]"></i>
                                </th>
                                <th @click="sortBy('time')" class="fw-semibold border-0 sortable-header">
                                    Request Date
                                    <i v-if="sortColumn === 'time'" :class="[
                                        'bi',
                                        sortDirection === 'asc' ? 'bi-sort-up' : 'bi-sort-down'
                                    ]"></i>
                                </th>
                                <th @click="sortBy('status')" class="fw-semibold border-0 sortable-header">
                                    Status
                                    <i v-if="sortColumn === 'status'" :class="[
                                        'bi',
                                        sortDirection === 'asc' ? 'bi-sort-up' : 'bi-sort-down'
                                    ]"></i>
                                </th>
                                <th class="fw-semibold border-0 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="request in paginatedRequests" :key="request.refundId" class="align-middle">
                                <td>
                                    <span class="fw-semibold">#{{ request.refundId }}</span>
                                </td>
                                <td>
                                    <a href="#" class="text-decoration-none"
                                        @click.prevent="viewBookingDetails(request.bookingId)">
                                        #{{ request.bookingId }}
                                    </a>
                                </td>
                                <td>
                                    <div class="d-flex align-items-center">
                                        <div class="avatar-circle bg-primary bg-opacity-10 text-primary me-2">
                                            {{ getInitials(request.userName) }}
                                        </div>
                                        <div>
                                            <div class="fw-semibold">{{ request.userName }}</div>
                                            <div class="small text-muted">{{ request.userEmail }}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span class="fw-semibold">{{ formatCurrency(request.totalAmount) }}</span>
                                </td>
                                <td>
                                    <div class="d-flex align-items-center">
                                        <i class="bi bi-calendar-event me-2 text-muted"></i>
                                        <div>
                                            <div>{{ formatDate(request.time) }}</div>
                                            <div class="small text-muted">{{ formatTime(request.time) }}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span :class="getStatusBadgeClass(request.status)">
                                        {{ request.status }}
                                    </span>
                                </td>
                                <td class="text-center">
                                    <div v-if="request.status === 'Processing'">
                                        <button
                                            class="btn btn-sm btn-success"
                                            @click="completeRefund(request.refundId)"
                                            :disabled="request.isProcessing">
                                            <span v-if="request.isProcessing" class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                                            <i v-else class="bi bi-check-circle me-1"></i>
                                            Approve
                                        </button>
                                    </div>
                                    <div v-else>
                                        <span class="text-muted">—</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Pagination footer -->
                <div class="card-footer bg-white py-3 border-0">
                    <div class="d-flex justify-content-between align-items-center">
                        <small class="text-muted">
                            Showing {{ startIndex + 1 }} to {{ Math.min(endIndex, filteredRequests.length) }} of {{
                                filteredRequests.length }} requests
                        </small>
                        <nav aria-label="Pagination">
                            <ul class="pagination pagination-sm mb-0">
                                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                                    <button class="page-link rounded-start" @click="goToPage(currentPage - 1)">
                                        <i class="bi bi-chevron-left"></i> Previous
                                    </button>
                                </li>
                                <li v-for="page in displayedPages" :key="page" class="page-item"
                                    :class="{ active: currentPage === page }">
                                    <button class="page-link" @click="goToPage(page)">
                                        {{ page }}
                                    </button>
                                </li>
                                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                                    <button class="page-link rounded-end" @click="goToPage(currentPage + 1)">
                                        Next <i class="bi bi-chevron-right"></i>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>

        <!-- Booking Details Modal -->
        <div class="modal fade" id="bookingDetailsModal" tabindex="-1" aria-labelledby="bookingDetailsModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content border-0 shadow">
                    <div class="modal-header bg-light">
                        <h5 class="modal-title" id="bookingDetailsModalLabel">
                            <i class="bi bi-calendar-check me-1"></i> Booking Details
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" v-if="selectedBooking">
                        <div class="d-flex align-items-center mb-3">
                            <div class="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                                <i class="bi bi-calendar-check text-primary fs-4"></i>
                            </div>
                            <div>
                                <h5 class="mb-1">Booking #{{ selectedBooking.bookingId }}</h5>
                                <p class="mb-0 text-muted">{{ formatDate(selectedBooking.bookingDate) }}</p>
                            </div>
                        </div>

                        <div class="list-group list-group-flush mb-3">
                            <div class="list-group-item d-flex justify-content-between align-items-center px-0">
                                <span>Customer</span>
                                <span class="fw-semibold">{{ selectedBooking.customerName }}</span>
                            </div>
                            <div class="list-group-item d-flex justify-content-between align-items-center px-0">
                                <span>Service</span>
                                <span class="fw-semibold">{{ selectedBooking.service }}</span>
                            </div>
                            <div class="list-group-item d-flex justify-content-between align-items-center px-0">
                                <span>Amount</span>
                                <span class="fw-semibold">{{ formatCurrency(selectedBooking.amount) }}</span>
                            </div>
                            <div class="list-group-item d-flex justify-content-between align-items-center px-0">
                                <span>Status</span>
                                <span :class="getBookingStatusBadgeClass(selectedBooking.status)">
                                    {{ selectedBooking.status }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                            <i class="bi bi-x-circle me-1"></i> Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Modal } from 'bootstrap';
import API from '@/utils/axios';
import CommonHelper from '@/utils/common';

export default {
    name: 'RefundRequestManagement',
    data() {
        return {
            // State
            loading: false,
            error: null,
            refunds: [],
            searchQuery: '',
            currentFilter: 'All',
            dateRange: {
                from: '',
                to: ''
            },
            sortColumn: 'time',
            sortDirection: 'desc',
            currentPage: 1,
            itemsPerPage: 10,
            selectedBooking: null,
            bookingDetailsModal: null
        };
    },
    computed: {
        // Filtered data based on search, status filter, and date range
        filteredRequests() {
            let result = [...this.refunds];

            // Apply status filter
            if (this.currentFilter !== 'All') {
                result = result.filter(request => request.status === this.currentFilter);
            }

            // Apply search filter
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                result = result.filter(request => {
                    return (
                        request.refundId.toString().includes(query) ||
                        request.bookingId.toString().includes(query) ||
                        request.userName.toLowerCase().includes(query) ||
                        request.userEmail.toLowerCase().includes(query)
                    );
                });
            }

            // Apply date range filter
            if (this.dateRange.from) {
                const fromDate = new Date(this.dateRange.from);
                result = result.filter(request => {
                    const requestDate = new Date(request.time);
                    return requestDate >= fromDate;
                });
            }

            if (this.dateRange.to) {
                const toDate = new Date(this.dateRange.to);
                toDate.setHours(23, 59, 59, 999); // End of day
                result = result.filter(request => {
                    const requestDate = new Date(request.time);
                    return requestDate <= toDate;
                });
            }

            // Apply sorting
            result.sort((a, b) => {
                let aValue = a[this.sortColumn];
                let bValue = b[this.sortColumn];

                // Special handling for dates
                if (this.sortColumn === 'time') {
                    aValue = new Date(aValue || '').getTime();
                    bValue = new Date(bValue || '').getTime();
                }

                if (aValue < bValue) return this.sortDirection === 'asc' ? -1 : 1;
                if (aValue > bValue) return this.sortDirection === 'asc' ? 1 : -1;
                return 0;
            });

            return result;
        },

        // Pagination calculations
        totalPages() {
            return Math.ceil(this.filteredRequests.length / this.itemsPerPage);
        },

        startIndex() {
            return (this.currentPage - 1) * this.itemsPerPage;
        },

        endIndex() {
            return this.startIndex + this.itemsPerPage;
        },

        paginatedRequests() {
            return this.filteredRequests.slice(this.startIndex, this.endIndex);
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
                if (this.totalPages > 1) {
                    pages.push(this.totalPages);
                }
            }

            return pages;
        }
    },
    methods: {
        // Fetch refund requests from API
        async fetchRefundRequests() {
            try {
                this.loading = true;
                this.error = null;
                const response = await API.get('Refund/all-refund');
                this.refunds = response.data.map(refund => ({
                    ...refund,
                    isProcessing: false
                }));
                this.loading = false;
            } catch (err) {
                console.error('Error fetching refund requests:', err);
                this.error = 'Failed to load refund requests. Please try again.';
                this.loading = false;
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
        },

        // Pagination
        goToPage(page) {
            if (page < 1 || page > this.totalPages || page === '...') return;
            this.currentPage = page;
        },

        // Search handling
        handleSearch() {
            this.currentPage = 1;
        },

        clearSearch() {
            this.searchQuery = '';
            this.currentPage = 1;
        },

        // Reset all filters
        resetFilters() {
            this.searchQuery = '';
            this.dateRange = { from: '', to: '' };
            this.currentFilter = 'All';
            this.currentPage = 1;
        },

        // Set status filter
        setFilter(filter) {
            this.currentFilter = filter;
            this.currentPage = 1;
        },

        // Format date
        formatDate(dateString) {
            if (!dateString) return 'N/A';

            const date = new Date(dateString);
            return new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }).format(date);
        },

        // Format time
        formatTime(dateString) {
            if (!dateString) return '';

            const date = new Date(dateString);
            return new Intl.DateTimeFormat('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            }).format(date);
        },

        // Format currency
        formatCurrency(amount) {
            return CommonHelper.formatVND(amount);
        },

        // Get status badge class
        getStatusBadgeClass(status) {
            switch (status) {
                case 'Completed':
                    return 'badge bg-success';
                case 'Processing':
                    return 'badge bg-warning text-dark';
                default:
                    return 'badge bg-secondary';
            }
        },

        // Get booking status badge class
        getBookingStatusBadgeClass(status) {
            switch (status) {
                case 'Confirmed':
                    return 'badge bg-success';
                case 'Pending':
                    return 'badge bg-warning text-dark';
                case 'Cancelled':
                    return 'badge bg-danger';
                case 'Completed':
                    return 'badge bg-primary';
                default:
                    return 'badge bg-secondary';
            }
        },

        // Get initials from name
        getInitials(name) {
            if (!name) return '';
            return name
                .split(' ')
                .map(part => part.charAt(0))
                .join('')
                .toUpperCase()
                .substring(0, 2);
        },

        // View booking details
        viewBookingDetails(bookingId) {
            // In a real application, you would fetch booking details from your API
            // For this example, we'll use mock data
            this.selectedBooking = {
                bookingId: bookingId,
                customerName: 'John Doe',
                bookingDate: new Date().toISOString(),
                service: 'Stadium Rental',
                amount: 1500000,
                status: 'Completed'
            };

            this.bookingDetailsModal.show();
        },

        // Complete refund (approve processing refund)
        async completeRefund(refundId) {
            const refund = this.refunds.find((r) => r.refundId === refundId);
            if (!refund) return;

            refund.isProcessing = true; // Show spinner in button

            try {
                await API.put(`Refund/complete/${refundId}`);
                refund.status = "Completed"; // Update UI immediately
            } catch (error) {
                console.error("Error updating refund:", error);
                alert("Failed to update refund status");
            } finally {
                refund.isProcessing = false; // Hide spinner
            }
        }
    },
    mounted() {
        // Initialize modals
        this.bookingDetailsModal = new Modal(document.getElementById('bookingDetailsModal'));

        // Fetch refund requests when component mounts
        this.fetchRefundRequests();
    }
};
</script>

<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css");

/* Custom styles */
.table th {
    font-weight: 600;
    color: #495057;
    text-transform: uppercase;
    font-size: 0.8rem;
    letter-spacing: 0.5px;
}

.table td {
    padding: 1rem 0.75rem;
    vertical-align: middle;
}

.card {
    border-radius: 0.75rem;
    transition: all 0.2s ease;
}

.pagination .page-link {
    border-radius: 0;
    margin: 0;
    color: #6c757d;
    border-color: #dee2e6;
    transition: all 0.2s ease;
}

.pagination .page-item.active .page-link {
    background-color: #0d6efd;
    border-color: #0d6efd;
    color: white;
}

.pagination .page-link:hover {
    background-color: #f8f9fa;
    color: #0d6efd;
}

.pagination .page-item.active .page-link:hover {
    background-color: #0d6efd;
    color: white;
}

.badge {
    padding: 0.5em 0.8em;
    font-weight: 500;
    border-radius: 0.25rem;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    font-size: 0.7rem;
}

.table-hover tbody tr:hover {
    background-color: rgba(13, 110, 253, 0.03);
    cursor: pointer;
}

.sortable-header {
    cursor: pointer;
    user-select: none;
}

.sortable-header:hover {
    background-color: rgba(0, 0, 0, 0.03);
}

/* Avatar circle */
.avatar-circle {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 0.9rem;
}

/* Custom scrollbar */
.table-responsive::-webkit-scrollbar {
    height: 8px;
}

.table-responsive::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
}

.table-responsive::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 4px;
}

.table-responsive::-webkit-scrollbar-thumb:hover {
    background: #999;
}

/* Animation effects */
@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.table-responsive {
    animation: fadeIn 0.3s ease-in-out;
}

/* Modal enhancements */
.modal-content {
    border: none;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.modal-header {
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.modal-footer {
    border-top: 1px solid rgba(0, 0, 0, 0.05);
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .d-flex.justify-content-between {
        flex-direction: column;
        gap: 1rem;
    }

    .pagination {
        margin-top: 0.5rem;
    }

    .table th,
    .table td {
        font-size: 0.9rem;
    }

    .date-range-inputs {
        flex-direction: column;
    }
}
</style>
