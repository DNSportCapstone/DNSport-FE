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
                            <li><button class="dropdown-item" @click="setFilter('Pending')">Pending</button></li>
                            <li><button class="dropdown-item" @click="setFilter('Approved')">Approved</button></li>
                            <li><button class="dropdown-item" @click="setFilter('Rejected')">Rejected</button></li>
                            <li><button class="dropdown-item" @click="setFilter('Processed')">Processed</button></li>
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
                                <th @click="sortBy('requestId')" class="fw-semibold border-0 sortable-header">
                                    Request ID
                                    <i v-if="sortColumn === 'requestId'" :class="[
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
                                <th @click="sortBy('customerName')" class="fw-semibold border-0 sortable-header">
                                    Customer
                                    <i v-if="sortColumn === 'customerName'" :class="[
                                        'bi',
                                        sortDirection === 'asc' ? 'bi-sort-up' : 'bi-sort-down'
                                    ]"></i>
                                </th>
                                <th @click="sortBy('amount')" class="fw-semibold border-0 sortable-header">
                                    Amount
                                    <i v-if="sortColumn === 'amount'" :class="[
                                        'bi',
                                        sortDirection === 'asc' ? 'bi-sort-up' : 'bi-sort-down'
                                    ]"></i>
                                </th>
                                <th @click="sortBy('requestDate')" class="fw-semibold border-0 sortable-header">
                                    Request Date
                                    <i v-if="sortColumn === 'requestDate'" :class="[
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
                                <!-- <th class="fw-semibold border-0 text-center">Actions</th> -->
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="request in paginatedRequests" :key="request.requestId" class="align-middle">
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
                                <td>
                                    <div class="d-flex justify-content-center gap-2">
                                        <!-- <button class="btn btn-sm btn-outline-primary"
                                            @click="viewRefundDetails(request)">
                                            <i class="bi bi-eye"></i> View
                                        </button> -->
                                        <div class="dropdown" v-if="request.status === 'Pending'">
                                            <button class="btn btn-sm btn-outline-secondary dropdown-toggle"
                                                type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i class="bi bi-three-dots"></i>
                                            </button>
                                            <ul class="dropdown-menu dropdown-menu-end shadow-sm">
                                                <li>
                                                    <button class="dropdown-item text-success"
                                                        @click="approveRefund(request)">
                                                        <i class="bi bi-check-circle me-1"></i> Approve
                                                    </button>
                                                </li>
                                                <li>
                                                    <button class="dropdown-item text-danger"
                                                        @click="rejectRefund(request)">
                                                        <i class="bi bi-x-circle me-1"></i> Reject
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
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

        <!-- Refund Details Modal -->
        <div class="modal fade" id="refundDetailsModal" tabindex="-1" aria-labelledby="refundDetailsModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content border-0 shadow">
                    <div class="modal-header bg-light">
                        <h5 class="modal-title" id="refundDetailsModalLabel">
                            <i class="bi bi-info-circle me-1"></i> Refund Request Details
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" v-if="selectedRequest">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="card border-0 bg-light mb-3">
                                    <div class="card-body">
                                        <h6 class="card-subtitle mb-2 text-muted">Request Information</h6>
                                        <div class="mb-2">
                                            <strong>Request ID:</strong> #{{ selectedRequest.requestId }}
                                        </div>
                                        <div class="mb-2">
                                            <strong>Status:</strong>
                                            <span :class="getStatusBadgeClass(selectedRequest.status)">
                                                {{ selectedRequest.status }}
                                            </span>
                                        </div>
                                        <div class="mb-2">
                                            <strong>Request Date:</strong> {{ formatDate(selectedRequest.requestDate) }}
                                            {{ formatTime(selectedRequest.requestDate) }}
                                        </div>
                                        <div class="mb-2">
                                            <strong>Refund Amount:</strong> {{ formatCurrency(selectedRequest.amount) }}
                                        </div>
                                        <div class="mb-2">
                                            <strong>Refund Method:</strong> {{ selectedRequest.refundMethod }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="card border-0 bg-light mb-3">
                                    <div class="card-body">
                                        <h6 class="card-subtitle mb-2 text-muted">Customer Information</h6>
                                        <div class="mb-2">
                                            <strong>Name:</strong> {{ selectedRequest.customerName }}
                                        </div>
                                        <div class="mb-2">
                                            <strong>Email:</strong> {{ selectedRequest.customerEmail }}
                                        </div>
                                        <div class="mb-2">
                                            <strong>Phone:</strong> {{ selectedRequest.customerPhone }}
                                        </div>
                                        <div class="mb-2">
                                            <strong>Booking ID:</strong> #{{ selectedRequest.bookingId }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card border-0 bg-light mb-3">
                            <div class="card-body">
                                <h6 class="card-subtitle mb-2 text-muted">Reason for Refund</h6>
                                <p>{{ selectedRequest.reason }}</p>
                            </div>
                        </div>

                        <div v-if="selectedRequest.status !== 'Pending'" class="card border-0 bg-light">
                            <div class="card-body">
                                <h6 class="card-subtitle mb-2 text-muted">Processing Information</h6>
                                <div class="mb-2">
                                    <strong>Processed By:</strong> {{ selectedRequest.processedBy || 'N/A' }}
                                </div>
                                <div class="mb-2">
                                    <strong>Processed Date:</strong> {{ selectedRequest.processedDate ?
                                        formatDate(selectedRequest.processedDate) + ' ' +
                                        formatTime(selectedRequest.processedDate) : 'N/A' }}
                                </div>
                                <div v-if="selectedRequest.notes">
                                    <strong>Notes:</strong> {{ selectedRequest.notes }}
                                </div>
                            </div>
                        </div>

                        <div v-if="selectedRequest.status === 'Pending'" class="mt-4">
                            <div class="form-floating mb-3">
                                <textarea class="form-control" id="notesTextarea" v-model="processingNotes"
                                    style="height: 100px"></textarea>
                                <label for="notesTextarea">Processing Notes (optional)</label>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                            <i class="bi bi-x-circle me-1"></i> Close
                        </button>
                        <div v-if="selectedRequest && selectedRequest.status === 'Pending'" class="ms-auto">
                            <button type="button" class="btn btn-danger me-2" @click="rejectRefund(selectedRequest)">
                                <i class="bi bi-x-circle me-1"></i> Reject
                            </button>
                            <button type="button" class="btn btn-success" @click="approveRefund(selectedRequest)">
                                <i class="bi bi-check-circle me-1"></i> Approve
                            </button>
                        </div>
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

        <!-- Confirmation Modal -->
        <div class="modal fade" id="confirmationModal" tabindex="-1" aria-labelledby="confirmationModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content border-0 shadow">
                    <div class="modal-header"
                        :class="confirmationAction === 'approve' ? 'bg-success text-white' : 'bg-danger text-white'">
                        <h5 class="modal-title" id="confirmationModalLabel">
                            <i
                                :class="confirmationAction === 'approve' ? 'bi bi-check-circle me-1' : 'bi bi-x-circle me-1'"></i>
                            {{ confirmationAction === 'approve' ? 'Approve Refund' : 'Reject Refund' }}
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body" v-if="selectedRequest">
                        <div class="d-flex align-items-center mb-3">
                            <div
                                :class="confirmationAction === 'approve' ? 'bg-success bg-opacity-10 p-3 rounded-circle me-3' : 'bg-danger bg-opacity-10 p-3 rounded-circle me-3'">
                                <i
                                    :class="confirmationAction === 'approve' ? 'bi bi-check-circle text-success fs-4' : 'bi bi-x-circle text-danger fs-4'"></i>
                            </div>
                            <div>
                                <h5 class="mb-1">{{ confirmationAction === 'approve' ? 'Approve Refund Request' :
                                    'Reject Refund Request' }}</h5>
                                <p class="mb-0 text-muted">Request #{{ selectedRequest.requestId }}</p>
                            </div>
                        </div>

                        <div class="alert" :class="confirmationAction === 'approve' ? 'alert-success' : 'alert-danger'">
                            <p class="mb-0">
                                <i
                                    :class="confirmationAction === 'approve' ? 'bi bi-info-circle me-1' : 'bi bi-exclamation-triangle me-1'"></i>
                                {{ confirmationAction === 'approve'
                                    ? `You are about to approve this refund request. The amount of
                                ${formatCurrency(selectedRequest.amount)} will be refunded to the customer.`
                                    : 'You are about to reject this refund request. This action cannot be undone.' }}
                            </p>
                        </div>

                        <div class="form-floating mb-3">
                            <textarea class="form-control" id="confirmationNotes" v-model="processingNotes"
                                style="height: 100px"></textarea>
                            <label for="confirmationNotes">Notes (optional)</label>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                            <i class="bi bi-x-circle me-1"></i> Cancel
                        </button>
                        <button type="button"
                            :class="confirmationAction === 'approve' ? 'btn btn-success' : 'btn btn-danger'"
                            @click="processRefund">
                            <i
                                :class="confirmationAction === 'approve' ? 'bi bi-check-circle me-1' : 'bi bi-x-circle me-1'"></i>
                            {{ confirmationAction === 'approve' ? 'Confirm Approval' : 'Confirm Rejection' }}
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
import API from '@/utils/axios';

export default {
    name: 'RefundRequestManagement',
    setup() {
        // State
        const loading = ref(false);
        const error = ref(null);
        const refundRequests = ref([]);
        const searchQuery = ref('');
        const currentFilter = ref('All');
        const dateRange = ref({
            from: '',
            to: ''
        });
        const sortColumn = ref('requestDate');
        const sortDirection = ref('desc');
        const currentPage = ref(1);
        const itemsPerPage = ref(10);
        const selectedRequest = ref(null);
        const selectedBooking = ref(null);
        const processingNotes = ref('');
        const confirmationAction = ref('');

        // Modal references
        let refundDetailsModal = null;
        let bookingDetailsModal = null;
        let confirmationModal = null;

        // Computed properties
        const filteredRequests = computed(() => {
            let result = [...refundRequests.value];

            // Apply status filter
            if (currentFilter.value !== 'All') {
                result = result.filter(request => request.status === currentFilter.value);
            }

            // Apply search filter
            if (searchQuery.value) {
                const query = searchQuery.value.toLowerCase();
                result = result.filter(request => {
                    return (
                        request.requestId.toString().includes(query) ||
                        request.bookingId.toString().includes(query) ||
                        request.customerName.toLowerCase().includes(query) ||
                        request.customerEmail.toLowerCase().includes(query) ||
                        request.reason.toLowerCase().includes(query)
                    );
                });
            }

            // Apply date range filter
            if (dateRange.value.from) {
                const fromDate = new Date(dateRange.value.from);
                result = result.filter(request => {
                    const requestDate = new Date(request.requestDate);
                    return requestDate >= fromDate;
                });
            }

            if (dateRange.value.to) {
                const toDate = new Date(dateRange.value.to);
                toDate.setHours(23, 59, 59, 999); // End of day
                result = result.filter(request => {
                    const requestDate = new Date(request.requestDate);
                    return requestDate <= toDate;
                });
            }

            // Apply sorting
            result.sort((a, b) => {
                let aValue = a[sortColumn.value];
                let bValue = b[sortColumn.value];

                // Special handling for dates
                if (sortColumn.value === 'requestDate' || sortColumn.value === 'processedDate') {
                    aValue = new Date(aValue || '').getTime();
                    bValue = new Date(bValue || '').getTime();
                }

                if (aValue < bValue) return sortDirection.value === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortDirection.value === 'asc' ? 1 : -1;
                return 0;
            });

            return result;
        });

        // Pagination
        const totalPages = computed(() => {
            return Math.ceil(filteredRequests.value.length / itemsPerPage.value);
        });

        const startIndex = computed(() => {
            return (currentPage.value - 1) * itemsPerPage.value;
        });

        const endIndex = computed(() => {
            return startIndex.value + itemsPerPage.value;
        });

        const paginatedRequests = computed(() => {
            return filteredRequests.value.slice(startIndex.value, endIndex.value);
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
        const fetchRefundRequests = async () => {
            try {
                loading.value = true;
                error.value = null;
                const response = await API.get(`Refund/all-refund`);
                refundRequests.value = response.data;
                console.log(refundRequests.value);

                loading.value = false;

                // In a real application, you would fetch data from your API
                // For this example, we'll use mock data

            } catch (err) {
                console.error('Error fetching refund requests:', err);
                error.value = 'Failed to load refund requests. Please try again.';
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
            dateRange.value = { from: '', to: '' };
            currentFilter.value = 'All';
            currentPage.value = 1;
        };

        const setFilter = (filter) => {
            currentFilter.value = filter;
            currentPage.value = 1;
        };

        const formatDate = (dateString) => {
            if (!dateString) return 'N/A';

            const date = new Date(dateString);
            return new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }).format(date);
        };

        const formatTime = (dateString) => {
            if (!dateString) return '';

            const date = new Date(dateString);
            return new Intl.DateTimeFormat('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            }).format(date);
        };

        const formatCurrency = (amount) => {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            }).format(amount);
        };

        const getStatusBadgeClass = (status) => {
            switch (status) {
                case 'Approved':
                    return 'badge bg-success';
                case 'Pending':
                    return 'badge bg-warning text-dark';
                case 'Rejected':
                    return 'badge bg-danger';
                case 'Processed':
                    return 'badge bg-info';
                default:
                    return 'badge bg-secondary';
            }
        };

        const getBookingStatusBadgeClass = (status) => {
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
        };

        const getInitials = (name) => {
            if (!name) return '';
            return name
                .split(' ')
                .map(part => part.charAt(0))
                .join('')
                .toUpperCase()
                .substring(0, 2);
        };

        const viewRefundDetails = (request) => {
            selectedRequest.value = request;
            processingNotes.value = '';
            console.log(request)
            refundDetailsModal.show();
        };

        const viewBookingDetails = (bookingId) => {
            // In a real application, you would fetch booking details from your API
            // For this example, we'll use mock data
            const booking = generateMockBookingDetails(bookingId);
            selectedBooking.value = booking;
            bookingDetailsModal.show();
        };

        const approveRefund = (request) => {
            selectedRequest.value = request;
            confirmationAction.value = 'approve';
            processingNotes.value = '';

            // Hide any open modals
            if (refundDetailsModal._isShown) {
                refundDetailsModal.hide();
            }

            // Show confirmation modal
            setTimeout(() => {
                confirmationModal.show();
            }, 500);
        };

        const rejectRefund = (request) => {
            selectedRequest.value = request;
            confirmationAction.value = 'reject';
            processingNotes.value = '';

            // Hide any open modals
            if (refundDetailsModal._isShown) {
                refundDetailsModal.hide();
            }

            // Show confirmation modal
            setTimeout(() => {
                confirmationModal.show();
            }, 500);
        };

        const processRefund = async () => {
            try {
                if (!selectedRequest.value) return;

                loading.value = true;

                // In a real application, you would call your API
                // For this example, we'll simulate an API call
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Update the refund request status
                const index = refundRequests.value.findIndex(r => r.requestId === selectedRequest.value.requestId);
                if (index !== -1) {
                    const newStatus = confirmationAction.value === 'approve' ? 'Approved' : 'Rejected';

                    refundRequests.value[index] = {
                        ...refundRequests.value[index],
                        status: newStatus,
                        processedDate: new Date().toISOString(),
                        processedBy: 'Admin User',
                        notes: processingNotes.value
                    };

                    // Show success message
                    alert(`Refund request has been ${newStatus.toLowerCase()} successfully.`);
                }

                // Close the modal
                confirmationModal.hide();
                processingNotes.value = '';

                loading.value = false;
            } catch (err) {
                console.error('Error processing refund:', err);
                alert('Failed to process refund. Please try again.');
                loading.value = false;
            }
        };

        const generateMockBookingDetails = (bookingId) => {
            // In a real application, you would fetch this data from your API
            const bookings = {
                5001: {
                    bookingId: 5001,
                    customerName: 'John Doe',
                    bookingDate: '2025-03-10T14:30:00',
                    service: 'Premium Field Rental',
                    amount: 89.99,
                    status: 'Cancelled'
                },
                5002: {
                    bookingId: 5002,
                    customerName: 'Jane Smith',
                    bookingDate: '2025-03-12T09:15:00',
                    service: 'Deluxe Field Package',
                    amount: 129.50,
                    status: 'Cancelled'
                },
                5003: {
                    bookingId: 5003,
                    customerName: 'Robert Johnson',
                    bookingDate: '2025-03-08T16:00:00',
                    service: 'Standard Field Rental',
                    amount: 75.25,
                    status: 'Completed'
                },
                5004: {
                    bookingId: 5004,
                    customerName: 'Emily Davis',
                    bookingDate: '2025-03-11T10:30:00',
                    service: 'Premium Field Package with Equipment',
                    amount: 150.00,
                    status: 'Cancelled'
                },
                5005: {
                    bookingId: 5005,
                    customerName: 'Michael Wilson',
                    bookingDate: '2025-03-09T13:45:00',
                    service: 'Standard Field Rental with Coaching',
                    amount: 95.75,
                    status: 'Cancelled'
                },
                5006: {
                    bookingId: 5006,
                    customerName: 'Sarah Brown',
                    bookingDate: '2025-03-07T15:00:00',
                    service: 'Deluxe Field Package',
                    amount: 110.25,
                    status: 'Pending'
                },
                5007: {
                    bookingId: 5007,
                    customerName: 'David Miller',
                    bookingDate: '2025-03-06T11:30:00',
                    service: 'Premium Tournament Package',
                    amount: 200.00,
                    status: 'Confirmed'
                },
                5008: {
                    bookingId: 5008,
                    customerName: 'Jennifer Taylor',
                    bookingDate: '2025-03-05T14:15:00',
                    service: 'Standard Field Rental',
                    amount: 85.50,
                    status: 'Pending'
                }
            };

            return bookings[bookingId] || {
                bookingId: bookingId,
                customerName: 'Unknown Customer',
                bookingDate: new Date().toISOString(),
                service: 'Unknown Service',
                amount: 0,
                status: 'Unknown'
            };
        };

        // Initialize modals and fetch data on component mount
        onMounted(() => {
            refundDetailsModal = new Modal(document.getElementById('refundDetailsModal'));
            bookingDetailsModal = new Modal(document.getElementById('bookingDetailsModal'));
            confirmationModal = new Modal(document.getElementById('confirmationModal'));
            fetchRefundRequests();
        });

        return {
            // State
            loading,
            error,
            refundRequests,
            searchQuery,
            currentFilter,
            dateRange,
            sortColumn,
            sortDirection,
            currentPage,
            selectedRequest,
            selectedBooking,
            processingNotes,
            confirmationAction,

            // Computed
            filteredRequests,
            paginatedRequests,
            totalPages,
            startIndex,
            endIndex,
            displayedPages,

            // Methods
            fetchRefundRequests,
            sortBy,
            goToPage,
            handleSearch,
            clearSearch,
            resetFilters,
            setFilter,
            formatDate,
            formatTime,
            formatCurrency,
            getStatusBadgeClass,
            getBookingStatusBadgeClass,
            getInitials,
            viewRefundDetails,
            viewBookingDetails,
            approveRefund,
            rejectRefund,
            processRefund
        };
    }
};
</script>

<style>
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
