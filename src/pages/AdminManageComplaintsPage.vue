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
                                <td>#{{ report.denounceId }}</td>
                                <td>{{ report.stadiumName }}</td>
                                <td>{{ report.userName }}</td>
                                <td>
                                    <span class="text-truncate d-inline-block" style="max-width: 200px;">{{
                                        report.description }}</span>
                                </td>
                                <td>{{ formatDate(report.denounceTime) }}</td>
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
                                            :disabled="report.status == 'handled'">
                                            <i class="bi bi-exclamation-triangle"></i> Warning
                                        </button>
                                        <button class="btn btn-sm btn-outline-success" @click="markAsHandled(report)"
                                            :disabled="report.status == 'handled'">
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
                <h4 class="mb-0">Field Violation Summary</h4>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead class="table-light">
                            <tr>
                                <th>Field ID</th>
                                <th>Field Name</th>
                                <th>Stadium Name</th>
                                <th>Owner</th>
                                <th>Total Reports</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="field in fieldSummary" :key="field.fieldId">
                                <td>#{{ field.fieldId }}</td>
                                <td>{{ field.fieldName }}</td>
                                <td>{{ field.stadiumName }}</td>
                                <td>{{ field.ownerName }}</td>
                                <td>
                                    <span class="badge bg-danger">{{ field.violationCount }}</span>
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
                                    <p>#{{ selectedReport.denounceId }}</p>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label fw-bold">Field Name</label>
                                    <p>{{ selectedReport.stadiumName }}</p>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label fw-bold">Description</label>
                                    <p>{{ selectedReport.description }}</p>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label fw-bold">Date Submitted</label>
                                    <p>{{ formatDate(selectedReport.denounceTime, true) }}</p>
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
                                    <p>{{ selectedReport.userName }}</p>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label fw-bold">Email</label>
                                    <p>{{ selectedReport.email }}</p>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label fw-bold">Phone</label>
                                    <p>{{ selectedReport.phoneNumber || 'N/A' }}</p>
                                </div>

                                <h6 class="text-muted mb-3 mt-4">Evidence</h6>
                                <div v-if="selectedReport.imageUrl" class="mb-3">
                                    <img
                                        :src="selectedReport.imageUrl"
                                        class="img-fluid rounded cursor-pointer"
                                        @click="openImagePreview(selectedReport.imageUrl)"
                                        alt="Violation evidence"
                                    />
                                    </div>
                                    <div v-else class="mb-3">
                                    <p class="text-muted">No images attached</p>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button v-if="selectedReport && selectedReport.status != 'handled'" type="button"
                            class="btn btn-warning" @click="openSendWarningModal(selectedReport)">
                            <i class="bi bi-exclamation-triangle"></i> Send Warning
                        </button>
                        <button v-if="selectedReport && selectedReport.status != 'handled'" type="button"
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
                            <label class="form-label">Warning Message</label>
                            <textarea class="form-control" rows="4" v-model="warningMessage"
                                placeholder="Enter warning message..."></textarea>
                            <div class="form-text">
                                This message will be sent to the field owner along with the violation details.
                            </div>
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
import API from '@/utils/axios';

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
                const response = await API.get(`Admin/denounce-report`);
                reports.value = response.data;
                console.log('Fetched reports:', reports.value);
            } catch (error) {
                console.error('Error fetching reports:', error);
                toast.error('Failed to load violation reports');
                loading.value = false;
            }
        };

        const fetchFieldSummary = async () => {
            try {
                const response = await API.get(`Admin/get-feild-report`);
                fieldSummary.value = response.data;
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
            warningMessage.value = `Your field "${report.stadiumName}" has received a violation report: ${report.description}. Please resolve this issue to avoid field suspension.`;

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
                console.log('Marking report as handled:', report.denounceId);
                await API.post(`Admin/set-report-status/${report.denounceId}`, 'handled', {
                    headers: { 'Content-Type': 'application/json' }
                });
                toast.success(`Report ${report.denounceId} has been marked as handled`);

                fetchReports(); // Refresh the reports list

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

                //loading.value = true;
                const data = {
                    message: warningMessage.value,
                    bookingId: selectedReport.value.bookingId,
                };

                await API.post("Admin/warning-lessor", data);


                toast.success(`Warning sent to the owner of ${selectedReport.value.stadiumName}`);

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
                const data = {
                    fieldId: selectedField.value.fieldId,
                    status: 'disable',
                };
                await API.post(`Admin/set-field-status`,data)
                toast.success(`Field "${selectedField.value.fieldName}" has been disabled`);
                fetchFieldSummary();
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
                const data = {
                    fieldId: field.fieldId,
                    status: 'active',
                };
                await API.post(`Admin/set-field-status`,data)

                // Update the field status locally
                const index = fieldSummary.value.findIndex(f => f.fieldId === field.fieldId);
                if (index !== -1) {
                    fieldSummary.value[index].isActive = true;
                }
                fetchFieldSummary();

                toast.success(`Field "${field.fieldName}" has been enabled`);
                loading.value = false;
            } catch (error) {
                console.error('Error enabling field:', error);
                toast.error('Failed to enable field');
                loading.value = false;
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
