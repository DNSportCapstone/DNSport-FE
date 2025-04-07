<template>
    <div class="violation-report-container">
        <div class="card">
            <div class="card-header bg-white">
                <h4 class="mb-0">Violation Reports</h4>
            </div>
            <div class="card-body">
                <!-- Filters and Search -->
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <div class="d-flex gap-2">
                        <div class="btn-group">
                            <button class="btn btn-outline-secondary" :class="{ 'active': statusFilter === 'all' }"
                                @click="setStatusFilter('all')">
                                All Reports
                            </button>
                            <button class="btn btn-outline-secondary" :class="{ 'active': statusFilter === 'pending' }"
                                @click="setStatusFilter('pending')">
                                Pending
                            </button>
                            <button class="btn btn-outline-secondary" :class="{ 'active': statusFilter === 'handled' }"
                                @click="setStatusFilter('handled')">
                                Handled
                            </button>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="input-group">
                            <span class="input-group-text">
                                <i class="bi bi-search"></i>
                            </span>
                            <input type="text" class="form-control" placeholder="Search reports..."
                                v-model="searchQuery" @input="handleSearch">
                            <button v-if="searchQuery" class="btn btn-outline-secondary" type="button"
                                @click="clearSearch">
                                <i class="bi bi-x"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Reports Table -->
                <div class="table-responsive" :class="{ 'loading': loading }">
                    <table class="table table-hover">
                        <thead class="table-light">
                            <tr>
                                <th @click="sortBy('reportId')" class="sortable-header">
                                    Report ID
                                    <i v-if="sortColumn === 'reportId'" :class="[
                                        'bi',
                                        sortDirection === 'asc' ? 'bi-sort-up' : 'bi-sort-down'
                                    ]"></i>
                                </th>
                                <th @click="sortBy('fieldName')" class="sortable-header">
                                    Field Name
                                    <i v-if="sortColumn === 'fieldName'" :class="[
                                        'bi',
                                        sortDirection === 'asc' ? 'bi-sort-up' : 'bi-sort-down'
                                    ]"></i>
                                </th>
                                <th @click="sortBy('reportedBy')" class="sortable-header">
                                    Reported By
                                    <i v-if="sortColumn === 'reportedBy'" :class="[
                                        'bi',
                                        sortDirection === 'asc' ? 'bi-sort-up' : 'bi-sort-down'
                                    ]"></i>
                                </th>
                                <th @click="sortBy('reason')" class="sortable-header">
                                    Reason
                                    <i v-if="sortColumn === 'reason'" :class="[
                                        'bi',
                                        sortDirection === 'asc' ? 'bi-sort-up' : 'bi-sort-down'
                                    ]"></i>
                                </th>
                                <th @click="sortBy('dateSubmitted')" class="sortable-header">
                                    Date Submitted
                                    <i v-if="sortColumn === 'dateSubmitted'" :class="[
                                        'bi',
                                        sortDirection === 'asc' ? 'bi-sort-up' : 'bi-sort-down'
                                    ]"></i>
                                </th>
                                <th @click="sortBy('status')" class="sortable-header">
                                    Status
                                    <i v-if="sortColumn === 'status'" :class="[
                                        'bi',
                                        sortDirection === 'asc' ? 'bi-sort-up' : 'bi-sort-down'
                                    ]"></i>
                                </th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="report in paginatedReports" :key="report.reportId">
                                <td>#{{ report.reportId }}</td>
                                <td>{{ report.fieldName }}</td>
                                <td>{{ report.reportedBy }}</td>
                                <td>
                                    <span class="text-truncate d-inline-block" style="max-width: 200px;">{{
                                        report.reason }}</span>
                                </td>
                                <td>{{ formatDate(report.dateSubmitted) }}</td>
                                <td>
                                    <span :class="getStatusBadgeClass(report.status)">
                                        {{ report.status }}
                                    </span>
                                </td>
                                <td>
                                    <div class="btn-group">
                                        <button class="btn btn-sm btn-outline-primary"
                                            @click="viewReportDetails(report)">
                                            <i class="bi bi-eye"></i> View
                                        </button>
                                        <button class="btn btn-sm btn-outline-warning"
                                            @click="openSendWarningModal(report)"
                                            :disabled="report.status === 'Handled'">
                                            <i class="bi bi-exclamation-triangle"></i> Warning
                                        </button>
                                        <button class="btn btn-sm btn-outline-success" @click="markAsHandled(report)"
                                            :disabled="report.status === 'Handled'">
                                            <i class="bi bi-check-circle"></i> Mark Handled
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="filteredReports.length === 0">
                                <td colspan="7" class="text-center py-4">
                                    <div class="text-muted">
                                        <i class="bi bi-inbox fs-3 d-block mb-2"></i>
                                        No violation reports found
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
                        Showing {{ startIndex + 1 }} to {{ Math.min(endIndex, filteredReports.length) }} of {{
                        filteredReports.length }}
                        reports
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

        <!-- Field Violation Summary Card -->
        <div class="card mt-4">
            <div class="card-header bg-white">
                <h4 class="mb-0">Field Violation Summary (Current Month)</h4>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead class="table-light">
                            <tr>
                                <th>Field ID</th>
                                <th>Field Name</th>
                                <th>Owner</th>
                                <th>Violation Reports</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="field in fieldSummary" :key="field.fieldId">
                                <td>#{{ field.fieldId }}</td>
                                <td>{{ field.fieldName }}</td>
                                <td>{{ field.ownerName }}</td>
                                <td>
                                    <span class="badge bg-danger">{{ field.violationCount }}</span>
                                </td>
                                <td>
                                    <span :class="field.isActive ? 'badge bg-success' : 'badge bg-secondary'">
                                        {{ field.isActive ? 'Active' : 'Disabled' }}
                                    </span>
                                </td>
                                <td>
                                    <button v-if="field.isActive" class="btn btn-sm btn-danger"
                                        @click="openDisableFieldModal(field)">
                                        <i class="bi bi-slash-circle"></i> Disable Field
                                    </button>
                                    <button v-else class="btn btn-sm btn-success" @click="enableField(field)">
                                        <i class="bi bi-check-circle"></i> Enable Field
                                    </button>
                                </td>
                            </tr>
                            <tr v-if="fieldSummary.length === 0">
                                <td colspan="6" class="text-center py-4">
                                    <div class="text-muted">
                                        <i class="bi bi-inbox fs-3 d-block mb-2"></i>
                                        No field violation data available
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Report Details Modal -->
        <div class="modal fade" id="reportDetailsModal" tabindex="-1" aria-labelledby="reportDetailsModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="reportDetailsModalLabel">Violation Report Details</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" v-if="selectedReport">
                        <div class="row">
                            <div class="col-md-6">
                                <h6 class="text-muted mb-3">Report Information</h6>
                                <div class="mb-3">
                                    <label class="form-label fw-bold">Report ID</label>
                                    <p>#{{ selectedReport.reportId }}</p>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label fw-bold">Field Name</label>
                                    <p>{{ selectedReport.fieldName }}</p>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label fw-bold">Reason</label>
                                    <p>{{ selectedReport.reason }}</p>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label fw-bold">Description</label>
                                    <p>{{ selectedReport.description }}</p>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label fw-bold">Date Submitted</label>
                                    <p>{{ formatDate(selectedReport.dateSubmitted, true) }}</p>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label fw-bold">Status</label>
                                    <p>
                                        <span :class="getStatusBadgeClass(selectedReport.status)">
                                            {{ selectedReport.status }}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <h6 class="text-muted mb-3">Reporter Information</h6>
                                <div class="mb-3">
                                    <label class="form-label fw-bold">Reported By</label>
                                    <p>{{ selectedReport.reportedBy }}</p>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label fw-bold">Email</label>
                                    <p>{{ selectedReport.reporterEmail }}</p>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label fw-bold">Phone</label>
                                    <p>{{ selectedReport.reporterPhone || 'N/A' }}</p>
                                </div>

                                <h6 class="text-muted mb-3 mt-4">Evidence</h6>
                                <div v-if="selectedReport.images && selectedReport.images.length > 0" class="mb-3">
                                    <div class="row g-2">
                                        <div v-for="(image, index) in selectedReport.images" :key="index" class="col-6">
                                            <img :src="image" class="img-fluid rounded cursor-pointer"
                                                @click="openImagePreview(image)" alt="Violation evidence">
                                        </div>
                                    </div>
                                </div>
                                <div v-else class="mb-3">
                                    <p class="text-muted">No images attached</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button v-if="selectedReport && selectedReport.status !== 'Handled'" type="button"
                            class="btn btn-warning" @click="openSendWarningModal(selectedReport)">
                            <i class="bi bi-exclamation-triangle"></i> Send Warning
                        </button>
                        <button v-if="selectedReport && selectedReport.status !== 'Handled'" type="button"
                            class="btn btn-success" @click="markAsHandled(selectedReport)">
                            <i class="bi bi-check-circle"></i> Mark as Handled
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Send Warning Modal -->
        <div class="modal fade" id="sendWarningModal" tabindex="-1" aria-labelledby="sendWarningModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="sendWarningModalLabel">Send Warning to Field Owner</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" v-if="selectedReport">
                        <div class="mb-3">
                            <label class="form-label">Field</label>
                            <input type="text" class="form-control" :value="selectedReport.fieldName" disabled>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Owner</label>
                            <input type="text" class="form-control" :value="selectedReport.fieldOwner" disabled>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Warning Message</label>
                            <textarea class="form-control" rows="4" v-model="warningMessage"
                                placeholder="Enter warning message..."></textarea>
                            <div class="form-text">
                                This message will be sent to the field owner along with the violation details.
                            </div>
                        </div>
                        <div class="form-check mb-3">
                            <input class="form-check-input" type="checkbox" v-model="sendEmail" id="sendEmailCheck">
                            <label class="form-check-label" for="sendEmailCheck">
                                Send email notification to owner
                            </label>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-warning" @click="sendWarning">
                            <i class="bi bi-exclamation-triangle"></i> Send Warning
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Disable Field Modal -->
        <div class="modal fade" id="disableFieldModal" tabindex="-1" aria-labelledby="disableFieldModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="disableFieldModalLabel">Disable Field</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" v-if="selectedField">
                        <div class="alert alert-danger">
                            <i class="bi bi-exclamation-triangle-fill me-2"></i>
                            You are about to disable <strong>{{ selectedField.fieldName }}</strong>. This will make the
                            field unavailable
                            for booking.
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Field Name</label>
                            <input type="text" class="form-control" :value="selectedField.fieldName" disabled>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Owner</label>
                            <input type="text" class="form-control" :value="selectedField.ownerName" disabled>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Violation Count (This Month)</label>
                            <input type="text" class="form-control" :value="selectedField.violationCount" disabled>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Reason for Disabling</label>
                            <textarea class="form-control" rows="3" v-model="disableReason"
                                placeholder="Enter reason for disabling..."></textarea>
                        </div>
                        <div class="form-check mb-3">
                            <input class="form-check-input" type="checkbox" v-model="notifyOwner" id="notifyOwnerCheck"
                                checked>
                            <label class="form-check-label" for="notifyOwnerCheck">
                                Notify field owner
                            </label>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-danger" @click="disableField">
                            <i class="bi bi-slash-circle"></i> Disable Field
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Image Preview Modal -->
        <div class="modal fade" id="imagePreviewModal" tabindex="-1" aria-labelledby="imagePreviewModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="imagePreviewModalLabel">Evidence Image</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-center p-0">
                        <img :src="previewImage" class="img-fluid" alt="Evidence image preview">
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
    name: 'ViolationReportManagement',
    setup() {
        const toast = useToast();
        const loading = ref(false);
        const reports = ref([]);
        const fieldSummary = ref([]);
        const searchQuery = ref('');
        const statusFilter = ref('all');
        const sortColumn = ref('dateSubmitted');
        const sortDirection = ref('desc');
        const currentPage = ref(1);
        const itemsPerPage = ref(10);
        const selectedReport = ref(null);
        const selectedField = ref(null);
        const warningMessage = ref('');
        const disableReason = ref('');
        const sendEmail = ref(true);
        const notifyOwner = ref(true);
        const previewImage = ref('');

        // Modal references
        let reportDetailsModal = null;
        let sendWarningModal = null;
        let disableFieldModal = null;
        let imagePreviewModal = null;

        // Computed properties
        const filteredReports = computed(() => {
            let result = [...reports.value];

            // Apply status filter
            if (statusFilter.value !== 'all') {
                result = result.filter(report =>
                    report.status.toLowerCase() === statusFilter.value.toLowerCase()
                );
            }

            // Apply search filter
            if (searchQuery.value) {
                const query = searchQuery.value.toLowerCase();
                result = result.filter(report => {
                    return (
                        report.reportId.toString().includes(query) ||
                        report.fieldName.toLowerCase().includes(query) ||
                        report.reportedBy.toLowerCase().includes(query) ||
                        report.reason.toLowerCase().includes(query) ||
                        (report.description && report.description.toLowerCase().includes(query))
                    );
                });
            }

            // Apply sorting
            result.sort((a, b) => {
                let aValue = a[sortColumn.value];
                let bValue = b[sortColumn.value];

                // Special handling for dates
                if (sortColumn.value === 'dateSubmitted') {
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
            return Math.ceil(filteredReports.value.length / itemsPerPage.value);
        });

        const startIndex = computed(() => {
            return (currentPage.value - 1) * itemsPerPage.value;
        });

        const endIndex = computed(() => {
            return startIndex.value + itemsPerPage.value;
        });

        const paginatedReports = computed(() => {
            return filteredReports.value.slice(startIndex.value, endIndex.value);
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
        const fetchReports = async () => {
            try {
                loading.value = true;
                // In a real application, you would fetch data from your API
                // For this example, we'll use mock data
                setTimeout(() => {
                    reports.value = generateMockReports();
                    loading.value = false;
                }, 500);
            } catch (error) {
                console.error('Error fetching reports:', error);
                toast.error('Failed to load violation reports');
                loading.value = false;
            }
        };

        const fetchFieldSummary = async () => {
            try {
                // In a real application, you would fetch data from your API
                // For this example, we'll use mock data
                setTimeout(() => {
                    fieldSummary.value = generateMockFieldSummary();
                }, 700);
            } catch (error) {
                console.error('Error fetching field summary:', error);
                toast.error('Failed to load field violation summary');
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

        const setStatusFilter = (status) => {
            statusFilter.value = status;
            currentPage.value = 1;
        };

        const formatDate = (dateString, includeTime = false) => {
            if (!dateString) return 'N/A';

            const date = new Date(dateString);
            const options = {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            };

            if (includeTime) {
                options.hour = '2-digit';
                options.minute = '2-digit';
            }

            return new Intl.DateTimeFormat('en-US', options).format(date);
        };

        const getStatusBadgeClass = (status) => {
            if (!status) return 'badge bg-secondary';

            const classes = 'badge ';
            switch (status.toLowerCase()) {
                case 'pending':
                    return classes + 'bg-warning text-dark';
                case 'handled':
                    return classes + 'bg-success';
                default:
                    return classes + 'bg-secondary';
            }
        };

        const viewReportDetails = (report) => {
            selectedReport.value = report;
            reportDetailsModal.show();
        };

        const openSendWarningModal = (report) => {
            selectedReport.value = report;
            warningMessage.value = `Your field "${report.fieldName}" has received a violation report: ${report.reason}. Please resolve this issue to avoid field suspension.`;

            // If we're coming from the details modal, hide it first
            if (reportDetailsModal._isShown) {
                reportDetailsModal.hide();
            }

            setTimeout(() => {
                sendWarningModal.show();
            }, 500);
        };

        const openDisableFieldModal = (field) => {
            selectedField.value = field;
            disableReason.value = `Due to receiving ${field.violationCount} violation reports this month.`;
            disableFieldModal.show();
        };

        const openImagePreview = (imageUrl) => {
            previewImage.value = imageUrl;
            imagePreviewModal.show();
        };

        const markAsHandled = async (report) => {
            try {
                loading.value = true;

                // In a real application, you would call your API
                // For this example, we'll simulate an API call
                await new Promise(resolve => setTimeout(resolve, 500));

                // Update the report status locally
                const index = reports.value.findIndex(r => r.reportId === report.reportId);
                if (index !== -1) {
                    reports.value[index].status = 'Handled';

                    // If this is the selected report, update it too
                    if (selectedReport.value && selectedReport.value.reportId === report.reportId) {
                        selectedReport.value.status = 'Handled';
                    }
                }

                toast.success(`Report #${report.reportId} has been marked as handled`);

                // If the details modal is open, close it
                if (reportDetailsModal._isShown) {
                    reportDetailsModal.hide();
                }

                loading.value = false;
            } catch (error) {
                console.error('Error marking report as handled:', error);
                toast.error('Failed to update report status');
                loading.value = false;
            }
        };

        const sendWarning = async () => {
            try {
                if (!warningMessage.value.trim()) {
                    toast.error('Please enter a warning message');
                    return;
                }

                loading.value = true;

                // In a real application, you would call your API
                // For this example, we'll simulate an API call
                await new Promise(resolve => setTimeout(resolve, 800));

                toast.success(`Warning sent to the owner of ${selectedReport.value.fieldName}`);

                // Close the modal
                sendWarningModal.hide();

                // Reset form
                warningMessage.value = '';
                sendEmail.value = true;

                loading.value = false;
            } catch (error) {
                console.error('Error sending warning:', error);
                toast.error('Failed to send warning');
                loading.value = false;
            }
        };

        const disableField = async () => {
            try {
                if (!disableReason.value.trim()) {
                    toast.error('Please enter a reason for disabling the field');
                    return;
                }

                loading.value = true;

                // In a real application, you would call your API
                // For this example, we'll simulate an API call
                await new Promise(resolve => setTimeout(resolve, 800));

                // Update the field status locally
                const index = fieldSummary.value.findIndex(f => f.fieldId === selectedField.value.fieldId);
                if (index !== -1) {
                    fieldSummary.value[index].isActive = false;
                }

                toast.success(`Field "${selectedField.value.fieldName}" has been disabled`);

                if (notifyOwner.value) {
                    toast.info(`Notification sent to ${selectedField.value.ownerName}`);
                }

                // Close the modal
                disableFieldModal.hide();

                // Reset form
                disableReason.value = '';
                notifyOwner.value = true;

                loading.value = false;
            } catch (error) {
                console.error('Error disabling field:', error);
                toast.error('Failed to disable field');
                loading.value = false;
            }
        };

        const enableField = async (field) => {
            try {
                loading.value = true;

                // In a real application, you would call your API
                // For this example, we'll simulate an API call
                await new Promise(resolve => setTimeout(resolve, 800));

                // Update the field status locally
                const index = fieldSummary.value.findIndex(f => f.fieldId === field.fieldId);
                if (index !== -1) {
                    fieldSummary.value[index].isActive = true;
                }

                toast.success(`Field "${field.fieldName}" has been enabled`);
                loading.value = false;
            } catch (error) {
                console.error('Error enabling field:', error);
                toast.error('Failed to enable field');
                loading.value = false;
            }
        };

        // Mock data generators
        const generateMockReports = () => {
            const statuses = ['Pending', 'Handled'];
            const reasons = [
                'Field not maintained properly',
                'Facilities not as advertised',
                'Double booking issue',
                'Safety hazard',
                'Unclean facilities',
                'Lighting issues',
                'Equipment missing',
                'Staff was rude',
                'Field dimensions incorrect',
                'Overcharging for services'
            ];

            const mockReports = [];

            for (let i = 1; i <= 25; i++) {
                const dateSubmitted = new Date();
                dateSubmitted.setDate(dateSubmitted.getDate() - Math.floor(Math.random() * 30));

                const images = [];
                const imageCount = Math.floor(Math.random() * 3);
                for (let j = 0; j < imageCount; j++) {
                    images.push(`https://picsum.photos/id/${Math.floor(Math.random() * 100)}/800/600`);
                }

                mockReports.push({
                    reportId: i,
                    fieldId: Math.floor(Math.random() * 10) + 1,
                    fieldName: `Soccer Field ${Math.floor(Math.random() * 10) + 1}`,
                    fieldOwner: `Owner ${Math.floor(Math.random() * 5) + 1}`,
                    reportedBy: `User ${Math.floor(Math.random() * 20) + 1}`,
                    reporterEmail: `user${Math.floor(Math.random() * 20) + 1}@example.com`,
                    reporterPhone: Math.random() > 0.3 ? `+1 555-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}` : null,
                    reason: reasons[Math.floor(Math.random() * reasons.length)],
                    description: `Detailed description of the issue: ${Lorem.generateSentences(3)}`,
                    dateSubmitted: dateSubmitted.toISOString(),
                    status: statuses[Math.floor(Math.random() * statuses.length)],
                    images: images
                });
            }

            return mockReports;
        };

        const generateMockFieldSummary = () => {
            const mockFieldSummary = [];

            for (let i = 1; i <= 8; i++) {
                mockFieldSummary.push({
                    fieldId: i,
                    fieldName: `Soccer Field ${i}`,
                    ownerName: `Owner ${Math.floor(Math.random() * 5) + 1}`,
                    ownerEmail: `owner${Math.floor(Math.random() * 5) + 1}@example.com`,
                    violationCount: Math.floor(Math.random() * 5),
                    isActive: Math.random() > 0.2
                });
            }

            return mockFieldSummary;
        };

        // Lorem ipsum generator for mock data
        const Lorem = {
            words: [
                'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
                'field', 'violation', 'report', 'issue', 'problem', 'maintenance', 'facility',
                'booking', 'customer', 'service', 'quality', 'safety', 'cleanliness', 'equipment',
                'staff', 'management', 'condition', 'expectation', 'advertisement', 'reality'
            ],

            generateSentences(count) {
                let result = '';
                for (let i = 0; i < count; i++) {
                    const wordCount = Math.floor(Math.random() * 10) + 5;
                    let sentence = '';

                    for (let j = 0; j < wordCount; j++) {
                        const word = this.words[Math.floor(Math.random() * this.words.length)];
                        sentence += j === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word;
                        sentence += j < wordCount - 1 ? ' ' : '.';
                    }

                    result += sentence + ' ';
                }

                return result.trim();
            }
        };

        // Initialize modals and fetch data on component mount
        onMounted(() => {
            reportDetailsModal = new Modal(document.getElementById('reportDetailsModal'));
            sendWarningModal = new Modal(document.getElementById('sendWarningModal'));
            disableFieldModal = new Modal(document.getElementById('disableFieldModal'));
            imagePreviewModal = new Modal(document.getElementById('imagePreviewModal'));

            fetchReports();
            fetchFieldSummary();
        });

        return {
            // State
            loading,
            reports,
            fieldSummary,
            searchQuery,
            statusFilter,
            sortColumn,
            sortDirection,
            currentPage,
            selectedReport,
            selectedField,
            warningMessage,
            disableReason,
            sendEmail,
            notifyOwner,
            previewImage,

            // Computed
            filteredReports,
            paginatedReports,
            totalPages,
            startIndex,
            endIndex,
            displayedPages,

            // Methods
            sortBy,
            goToPage,
            handleSearch,
            clearSearch,
            setStatusFilter,
            formatDate,
            getStatusBadgeClass,
            viewReportDetails,
            openSendWarningModal,
            openDisableFieldModal,
            openImagePreview,
            markAsHandled,
            sendWarning,
            disableField,
            enableField
        };
    }
};
</script>

<style scoped>
.violation-report-container {
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

.cursor-pointer {
    cursor: pointer;
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
