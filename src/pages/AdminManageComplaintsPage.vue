<template>
    <div class="complaints-management-container p-4">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <div>
                <h2 class="mb-1">Complaints & Feedback Management</h2>
                <p class="text-muted">Manage and track user complaints and feedback</p>
            </div>
            <div class="d-flex gap-2">
                <button class="btn btn-outline-secondary" @click="exportComplaints">
                    <i class="bi bi-download me-1"></i> Export
                </button>
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#reportModal">
                    <i class="bi bi-bar-chart me-1"></i> Reports
                </button>
            </div>
        </div>

        <!-- Stats Cards -->
        <div class="row mb-4">
            <div class="col-md-3 mb-3 mb-md-0">
                <div class="card border-0 shadow-sm h-100">
                    <div class="card-body d-flex align-items-center">
                        <div class="rounded-circle bg-primary bg-opacity-10 p-3 me-3">
                            <i class="bi bi-inbox-fill text-primary fs-4"></i>
                        </div>
                        <div>
                            <h6 class="card-subtitle text-muted mb-1">Total Complaints</h6>
                            <h3 class="card-title mb-0">{{ complaints.length }}</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3 mb-3 mb-md-0">
                <div class="card border-0 shadow-sm h-100">
                    <div class="card-body d-flex align-items-center">
                        <div class="rounded-circle bg-danger bg-opacity-10 p-3 me-3">
                            <i class="bi bi-exclamation-circle-fill text-danger fs-4"></i>
                        </div>
                        <div>
                            <h6 class="card-subtitle text-muted mb-1">Unresolved</h6>
                            <h3 class="card-title mb-0">{{ getComplaintsByStatus('New').length +
                                getComplaintsByStatus('In Progress').length }}</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3 mb-3 mb-md-0">
                <div class="card border-0 shadow-sm h-100">
                    <div class="card-body d-flex align-items-center">
                        <div class="rounded-circle bg-success bg-opacity-10 p-3 me-3">
                            <i class="bi bi-check-circle-fill text-success fs-4"></i>
                        </div>
                        <div>
                            <h6 class="card-subtitle text-muted mb-1">Resolved</h6>
                            <h3 class="card-title mb-0">{{ getComplaintsByStatus('Resolved').length }}</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card border-0 shadow-sm h-100">
                    <div class="card-body d-flex align-items-center">
                        <div class="rounded-circle bg-info bg-opacity-10 p-3 me-3">
                            <i class="bi bi-clock-fill text-info fs-4"></i>
                        </div>
                        <div>
                            <h6 class="card-subtitle text-muted mb-1">Avg. Response Time</h6>
                            <h3 class="card-title mb-0">1.8 days</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Filters and Search -->
        <div class="card border-0 shadow-sm mb-4">
            <div class="card-body">
                <div class="row g-3">
                    <div class="col-md-3">
                        <label for="statusFilter" class="form-label">Status</label>
                        <select id="statusFilter" class="form-select" v-model="filters.status">
                            <option value="">All Statuses</option>
                            <option value="New">New</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </div>
                    <div class="col-md-3">
                        <label for="priorityFilter" class="form-label">Priority</label>
                        <select id="priorityFilter" class="form-select" v-model="filters.priority">
                            <option value="">All Priorities</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Urgent">Urgent</option>
                        </select>
                    </div>
                    <div class="col-md-3">
                        <label for="categoryFilter" class="form-label">Category</label>
                        <select id="categoryFilter" class="form-select" v-model="filters.category">
                            <option value="">All Categories</option>
                            <option value="Technical">Technical</option>
                            <option value="Billing">Billing</option>
                            <option value="Service">Service</option>
                            <option value="Product">Product</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div class="col-md-3">
                        <label for="assigneeFilter" class="form-label">Assignee</label>
                        <select id="assigneeFilter" class="form-select" v-model="filters.assignee">
                            <option value="">All Assignees</option>
                            <option v-for="staff in staffMembers" :key="staff.id" :value="staff.id">
                                {{ staff.name }}
                            </option>
                        </select>
                    </div>
                    <div class="col-md-6">
                        <label for="dateRangeFilter" class="form-label">Date Range</label>
                        <div class="input-group">
                            <input type="date" class="form-control" v-model="filters.dateFrom">
                            <span class="input-group-text">to</span>
                            <input type="date" class="form-control" v-model="filters.dateTo">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <label for="searchFilter" class="form-label">Search</label>
                        <div class="input-group">
                            <span class="input-group-text">
                                <i class="bi bi-search"></i>
                            </span>
                            <input type="text" class="form-control"
                                placeholder="Search by ID, customer name, or keywords..." v-model="filters.search">
                            <button v-if="filters.search" class="btn btn-outline-secondary" type="button"
                                @click="clearSearch">
                                <i class="bi bi-x"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-footer bg-white d-flex justify-content-between">
                <button class="btn btn-outline-secondary" @click="resetFilters">
                    <i class="bi bi-arrow-counterclockwise me-1"></i> Reset Filters
                </button>
                <button class="btn btn-primary" @click="applyFilters">
                    <i class="bi bi-funnel me-1"></i> Apply Filters
                </button>
            </div>
        </div>

        <!-- Complaints Table -->
        <div class="card border-0 shadow-sm">
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover mb-0">
                        <thead class="table-light">
                            <tr>
                                <th @click="sortBy('id')" class="sortable-header">
                                    ID
                                    <i v-if="sortColumn === 'id'" :class="[
                                        'bi',
                                        sortDirection === 'asc' ? 'bi-sort-up' : 'bi-sort-down'
                                    ]"></i>
                                </th>
                                <th @click="sortBy('customerName')" class="sortable-header">
                                    Customer
                                    <i v-if="sortColumn === 'customerName'" :class="[
                                        'bi',
                                        sortDirection === 'asc' ? 'bi-sort-up' : 'bi-sort-down'
                                    ]"></i>
                                </th>
                                <th @click="sortBy('subject')" class="sortable-header">
                                    Subject
                                    <i v-if="sortColumn === 'subject'" :class="[
                                        'bi',
                                        sortDirection === 'asc' ? 'bi-sort-up' : 'bi-sort-down'
                                    ]"></i>
                                </th>
                                <th @click="sortBy('category')" class="sortable-header">
                                    Category
                                    <i v-if="sortColumn === 'category'" :class="[
                                        'bi',
                                        sortDirection === 'asc' ? 'bi-sort-up' : 'bi-sort-down'
                                    ]"></i>
                                </th>
                                <th @click="sortBy('priority')" class="sortable-header">
                                    Priority
                                    <i v-if="sortColumn === 'priority'" :class="[
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
                                <th @click="sortBy('assignee')" class="sortable-header">
                                    Assignee
                                    <i v-if="sortColumn === 'assignee'" :class="[
                                        'bi',
                                        sortDirection === 'asc' ? 'bi-sort-up' : 'bi-sort-down'
                                    ]"></i>
                                </th>
                                <th @click="sortBy('createdAt')" class="sortable-header">
                                    Date
                                    <i v-if="sortColumn === 'createdAt'" :class="[
                                        'bi',
                                        sortDirection === 'asc' ? 'bi-sort-up' : 'bi-sort-down'
                                    ]"></i>
                                </th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="complaint in paginatedComplaints" :key="complaint.id"
                                @click="viewComplaint(complaint)" class="complaint-row">
                                <td><span class="fw-medium">#{{ complaint.id }}</span></td>
                                <td>
                                    <div class="d-flex align-items-center">
                                        <div class="avatar-circle me-2">{{ getInitials(complaint.customerName) }}</div>
                                        <div>
                                            <div class="fw-medium">{{ complaint.customerName }}</div>
                                            <div class="small text-muted">{{ complaint.email }}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{{ complaint.subject }}</td>
                                <td>
                                    <span class="badge rounded-pill text-bg-secondary">{{ complaint.category }}</span>
                                </td>
                                <td>
                                    <span :class="getPriorityBadgeClass(complaint.priority)">
                                        {{ complaint.priority }}
                                    </span>
                                </td>
                                <td>
                                    <span :class="getStatusBadgeClass(complaint.status)">
                                        {{ complaint.status }}
                                    </span>
                                </td>
                                <td>
                                    <div v-if="complaint.assigneeId" class="d-flex align-items-center">
                                        <div class="avatar-circle me-2 bg-info bg-opacity-10 text-info">
                                            {{ getStaffInitials(complaint.assigneeId) }}
                                        </div>
                                        <span>{{ getStaffName(complaint.assigneeId) }}</span>
                                    </div>
                                    <span v-else class="text-muted">Unassigned</span>
                                </td>
                                <td>
                                    <div>{{ formatDate(complaint.createdAt) }}</div>
                                    <div class="small text-muted">{{ getTimeAgo(complaint.createdAt) }}</div>
                                </td>
                                <td>
                                    <div class="d-flex gap-1">
                                        <button class="btn btn-sm btn-outline-primary"
                                            @click.stop="viewComplaint(complaint)">
                                            <i class="bi bi-eye"></i>
                                        </button>
                                        <div class="dropdown">
                                            <button class="btn btn-sm btn-outline-secondary dropdown-toggle"
                                                type="button" data-bs-toggle="dropdown" aria-expanded="false"
                                                @click.stop>
                                                <i class="bi bi-three-dots"></i>
                                            </button>
                                            <ul class="dropdown-menu dropdown-menu-end">
                                                <li><a class="dropdown-item" href="#"
                                                        @click.prevent.stop="assignComplaint(complaint)">
                                                        <i class="bi bi-person-check me-2"></i>Assign</a></li>
                                                <li><a class="dropdown-item" href="#"
                                                        @click.prevent.stop="updateStatus(complaint, 'In Progress')">
                                                        <i class="bi bi-play-circle me-2"></i>Mark In Progress</a></li>
                                                <li><a class="dropdown-item" href="#"
                                                        @click.prevent.stop="updateStatus(complaint, 'Resolved')">
                                                        <i class="bi bi-check-circle me-2"></i>Mark Resolved</a></li>
                                                <li><a class="dropdown-item" href="#"
                                                        @click.prevent.stop="updateStatus(complaint, 'Closed')">
                                                        <i class="bi bi-x-circle me-2"></i>Close Complaint</a></li>
                                                <li>
                                                    <hr class="dropdown-divider">
                                                </li>
                                                <li><a class="dropdown-item text-danger" href="#"
                                                        @click.prevent.stop="deleteComplaint(complaint)">
                                                        <i class="bi bi-trash me-2"></i>Delete</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="filteredComplaints.length === 0">
                                <td colspan="9" class="text-center py-4">
                                    <div class="text-muted">
                                        <i class="bi bi-inbox fs-3 d-block mb-2"></i>
                                        No complaints found
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Pagination -->
            <div class="card-footer bg-white d-flex justify-content-between align-items-center">
                <div>
                    Showing {{ startIndex + 1 }} to {{ Math.min(endIndex, filteredComplaints.length) }} of {{
                        filteredComplaints.length }} complaints
                </div>
                <nav aria-label="Complaints pagination">
                    <ul class="pagination mb-0">
                        <li class="page-item" :class="{ disabled: currentPage === 1 }">
                            <a class="page-link" href="#" @click.prevent="goToPage(currentPage - 1)">Previous</a>
                        </li>
                        <li v-for="page in displayedPages" :key="page" class="page-item"
                            :class="{ active: currentPage === page, disabled: page === '...' }">
                            <a class="page-link" href="#" @click.prevent="goToPage(page)">{{ page }}</a>
                        </li>
                        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                            <a class="page-link" href="#" @click.prevent="goToPage(currentPage + 1)">Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>

        <!-- Complaint Detail Modal -->
        <div class="modal fade" id="complaintDetailModal" tabindex="-1" aria-labelledby="complaintDetailModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="complaintDetailModalLabel">
                            Complaint #{{ selectedComplaint ? selectedComplaint.id : '' }}
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" v-if="selectedComplaint">
                        <div class="row mb-4">
                            <div class="col-md-8">
                                <h4>{{ selectedComplaint.subject }}</h4>
                                <div class="d-flex align-items-center mb-3">
                                    <div class="avatar-circle me-2">{{ getInitials(selectedComplaint.customerName) }}
                                    </div>
                                    <div>
                                        <div class="fw-medium">{{ selectedComplaint.customerName }}</div>
                                        <div class="text-muted">{{ selectedComplaint.email }}</div>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <span class="badge rounded-pill text-bg-secondary me-2">{{
                                        selectedComplaint.category }}</span>
                                    <span :class="getPriorityBadgeClass(selectedComplaint.priority)" class="me-2">
                                        {{ selectedComplaint.priority }}
                                    </span>
                                    <span :class="getStatusBadgeClass(selectedComplaint.status)">
                                        {{ selectedComplaint.status }}
                                    </span>
                                </div>
                                <div class="mb-3">
                                    <strong>Submitted:</strong> {{ formatDate(selectedComplaint.createdAt) }} ({{
                                        getTimeAgo(selectedComplaint.createdAt) }})
                                </div>
                                <div class="mb-3">
                                    <strong>Contact:</strong> {{ selectedComplaint.phone || 'N/A' }}
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="card border-0 bg-light">
                                    <div class="card-body">
                                        <h6 class="card-title">Assigned To</h6>
                                        <div v-if="selectedComplaint.assigneeId" class="d-flex align-items-center mb-3">
                                            <div class="avatar-circle me-2 bg-info bg-opacity-10 text-info">
                                                {{ getStaffInitials(selectedComplaint.assigneeId) }}
                                            </div>
                                            <div>
                                                <div class="fw-medium">{{ getStaffName(selectedComplaint.assigneeId) }}
                                                </div>
                                                <div class="small text-muted">{{
                                                    getStaffRole(selectedComplaint.assigneeId) }}</div>
                                            </div>
                                        </div>
                                        <div v-else class="mb-3 text-muted">
                                            Not assigned yet
                                        </div>
                                        <button class="btn btn-sm btn-outline-primary w-100"
                                            @click="assignComplaint(selectedComplaint)">
                                            <i class="bi bi-person-check me-1"></i> {{ selectedComplaint.assigneeId ?
                                                'Reassign' : 'Assign' }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card border-0 bg-light mb-4">
                            <div class="card-body">
                                <h6 class="card-title">Complaint Details</h6>
                                <p class="card-text">{{ selectedComplaint.description }}</p>
                            </div>
                        </div>

                        <h6 class="mb-3">Communication History</h6>
                        <div class="timeline mb-4">
                            <div v-for="(message, index) in selectedComplaint.messages" :key="index"
                                :class="['timeline-item', message.isStaff ? 'timeline-staff' : 'timeline-customer']">
                                <div class="timeline-badge">
                                    <div class="avatar-circle"
                                        :class="message.isStaff ? 'bg-info bg-opacity-10 text-info' : ''">
                                        {{ message.isStaff ? getStaffInitials(message.staffId) :
                                            getInitials(selectedComplaint.customerName) }}
                                    </div>
                                </div>
                                <div class="timeline-content">
                                    <div class="d-flex justify-content-between align-items-center mb-2">
                                        <div class="fw-medium">
                                            {{ message.isStaff ? getStaffName(message.staffId) :
                                                selectedComplaint.customerName }}
                                            <span class="badge ms-2"
                                                :class="message.isStaff ? 'text-bg-info' : 'text-bg-primary'">
                                                {{ message.isStaff ? 'Staff' : 'Customer' }}
                                            </span>
                                        </div>
                                        <div class="text-muted small">{{ formatDate(message.timestamp) }}</div>
                                    </div>
                                    <div class="message-content">{{ message.content }}</div>
                                </div>
                            </div>
                        </div>

                        <h6 class="mb-3">Add Response</h6>
                        <div class="card border-0 bg-light">
                            <div class="card-body">
                                <div class="mb-3">
                                    <label for="responseMessage" class="form-label">Message</label>
                                    <textarea class="form-control" id="responseMessage" rows="3"
                                        v-model="newResponse"></textarea>
                                </div>
                                <div class="mb-3">
                                    <label for="statusUpdate" class="form-label">Update Status</label>
                                    <select class="form-select" id="statusUpdate" v-model="newStatus">
                                        <option :value="selectedComplaint.status">Keep as {{ selectedComplaint.status }}
                                        </option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Resolved">Resolved</option>
                                        <option value="Closed">Closed</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="submitResponse">
                            <i class="bi bi-send me-1"></i> Send Response
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Assign Modal -->
        <div class="modal fade" id="assignModal" tabindex="-1" aria-labelledby="assignModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="assignModalLabel">Assign Complaint</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="assigneeSelect" class="form-label">Select Staff Member</label>
                            <select class="form-select" id="assigneeSelect" v-model="selectedAssignee">
                                <option value="">Unassigned</option>
                                <option v-for="staff in staffMembers" :key="staff.id" :value="staff.id">
                                    {{ staff.name }} ({{ staff.role }})
                                </option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="assignmentNote" class="form-label">Assignment Note (Optional)</label>
                            <textarea class="form-control" id="assignmentNote" rows="3"
                                v-model="assignmentNote"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" @click="confirmAssignment">
                            <i class="bi bi-person-check me-1"></i> Assign
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Reports Modal -->
        <div class="modal fade" id="reportModal" tabindex="-1" aria-labelledby="reportModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="reportModalLabel">Complaints Reports</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <ul class="nav nav-tabs mb-4" id="reportTabs" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="summary-tab" data-bs-toggle="tab"
                                    data-bs-target="#summary" type="button" role="tab" aria-controls="summary"
                                    aria-selected="true">Summary</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="category-tab" data-bs-toggle="tab"
                                    data-bs-target="#category" type="button" role="tab" aria-controls="category"
                                    aria-selected="false">By Category</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="status-tab" data-bs-toggle="tab" data-bs-target="#status"
                                    type="button" role="tab" aria-controls="status" aria-selected="false">By
                                    Status</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="assignee-tab" data-bs-toggle="tab"
                                    data-bs-target="#assignee" type="button" role="tab" aria-controls="assignee"
                                    aria-selected="false">By Assignee</button>
                            </li>
                        </ul>
                        <div class="tab-content" id="reportTabsContent">
                            <div class="tab-pane fade show active" id="summary" role="tabpanel"
                                aria-labelledby="summary-tab">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="card border-0 bg-light mb-3">
                                            <div class="card-body">
                                                <h6 class="card-title">Complaints Overview</h6>
                                                <table class="table">
                                                    <tbody>
                                                        <tr>
                                                            <td>Total Complaints</td>
                                                            <td class="text-end fw-bold">{{ complaints.length }}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>New Complaints</td>
                                                            <td class="text-end fw-bold">{{
                                                                getComplaintsByStatus('New').length }}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>In Progress</td>
                                                            <td class="text-end fw-bold">{{
                                                                getComplaintsByStatus('InProgress').length }}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Resolved</td>
                                                            <td class="text-end fw-bold">{{
                                                                getComplaintsByStatus('Resolved').length }}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Closed</td>
                                                            <td class="text-end fw-bold">{{
                                                                getComplaintsByStatus('Closed').length }}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="card border-0 bg-light mb-3">
                                            <div class="card-body">
                                                <h6 class="card-title">Response Metrics</h6>
                                                <table class="table">
                                                    <tbody>
                                                        <tr>
                                                            <td>Average Response Time</td>
                                                            <td class="text-end fw-bold">1.8 days</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Average Resolution Time</td>
                                                            <td class="text-end fw-bold">4.2 days</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Complaints Resolved &lt; 24h</td>
                                                            <td class="text-end fw-bold">24%</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Complaints Resolved &lt; 48h</td>
                                                            <td class="text-end fw-bold">56%</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Complaints Resolved &lt; 7d</td>
                                                            <td class="text-end fw-bold">82%</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card border-0 bg-light">
                                    <div class="card-body">
                                        <h6 class="card-title">Complaints Trend (Last 30 Days)</h6>
                                        <div class="chart-placeholder bg-secondary bg-opacity-10 rounded d-flex align-items-center justify-content-center"
                                            style="height: 250px;">
                                            <span class="text-muted">Chart visualization would appear here</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="category" role="tabpanel" aria-labelledby="category-tab">
                                <div class="card border-0 bg-light mb-3">
                                    <div class="card-body">
                                        <h6 class="card-title">Complaints by Category</h6>
                                        <div class="chart-placeholder bg-secondary bg-opacity-10 rounded d-flex align-items-center justify-content-center"
                                            style="height: 250px;">
                                            <span class="text-muted">Chart visualization would appear here</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="table-responsive">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>Category</th>
                                                <th>Count</th>
                                                <th>Percentage</th>
                                                <th>Avg. Resolution Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Technical</td>
                                                <td>42</td>
                                                <td>35%</td>
                                                <td>3.5 days</td>
                                            </tr>
                                            <tr>
                                                <td>Billing</td>
                                                <td>28</td>
                                                <td>23%</td>
                                                <td>2.1 days</td>
                                            </tr>
                                            <tr>
                                                <td>Service</td>
                                                <td>24</td>
                                                <td>20%</td>
                                                <td>4.8 days</td>
                                            </tr>
                                            <tr>
                                                <td>Product</td>
                                                <td>18</td>
                                                <td>15%</td>
                                                <td>5.2 days</td>
                                            </tr>
                                            <tr>
                                                <td>Other</td>
                                                <td>8</td>
                                                <td>7%</td>
                                                <td>3.9 days</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="status" role="tabpanel" aria-labelledby="status-tab">
                                <div class="card border-0 bg-light mb-3">
                                    <div class="card-body">
                                        <h6 class="card-title">Complaints by Status</h6>
                                        <div class="chart-placeholder bg-secondary bg-opacity-10 rounded d-flex align-items-center justify-content-center"
                                            style="height: 250px;">
                                            <span class="text-muted">Chart visualization would appear here</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="table-responsive">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>Status</th>
                                                <th>Count</th>
                                                <th>Percentage</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>New</td>
                                                <td>{{ getComplaintsByStatus('New').length }}</td>
                                                <td>{{ Math.round(getComplaintsByStatus('New').length /
                                                    complaints.length * 100) }}%</td>
                                            </tr>
                                            <tr>
                                                <td>In Progress</td>
                                                <td>{{ getComplaintsByStatus('In Progress').length }}</td>
                                                <td>{{ Math.round(getComplaintsByStatus('In Progress').length /
                                                    complaints.length * 100) }}%</td>
                                            </tr>
                                            <tr>
                                                <td>Resolved</td>
                                                <td>{{ getComplaintsByStatus('Resolved').length }}</td>
                                                <td>{{ Math.round(getComplaintsByStatus('Resolved').length /
                                                    complaints.length * 100) }}%</td>
                                            </tr>
                                            <tr>
                                                <td>Closed</td>
                                                <td>{{ getComplaintsByStatus('Closed').length }}</td>
                                                <td>{{ Math.round(getComplaintsByStatus('Closed').length /
                                                    complaints.length * 100) }}%</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="assignee" role="tabpanel" aria-labelledby="assignee-tab">
                                <div class="card border-0 bg-light mb-3">
                                    <div class="card-body">
                                        <h6 class="card-title">Complaints by Assignee</h6>
                                        <div class="chart-placeholder bg-secondary bg-opacity-10 rounded d-flex align-items-center justify-content-center"
                                            style="height: 250px;">
                                            <span class="text-muted">Chart visualization would appear here</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="table-responsive">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>Assignee</th>
                                                <th>Assigned</th>
                                                <th>Resolved</th>
                                                <th>Avg. Resolution Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="staff in staffMembers" :key="staff.id">
                                                <td>{{ staff.name }}</td>
                                                <td>{{ getComplaintsByAssignee(staff.id).length }}</td>
                                                <td>{{ getResolvedComplaintsByAssignee(staff.id).length }}</td>
                                                <td>{{ getAvgResolutionTime(staff.id) }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">
                            <i class="bi bi-download me-1"></i> Export Report
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Modal } from 'bootstrap';

export default {
    name: 'ComplaintsManagement',
    data() {
        return {
            // Modals
            complaintDetailModal: null,
            assignModal: null,

            // Complaints data
            complaints: [
                {
                    id: 1001,
                    customerName: 'John Smith',
                    email: 'john.smith@example.com',
                    phone: '+1 (555) 123-4567',
                    subject: 'Website login issues',
                    description: 'I have been trying to log in to my account for the past two days but keep getting an error message saying "Invalid credentials" even though I am sure my password is correct. I have tried resetting my password twice but still facing the same issue.',
                    category: 'Technical',
                    priority: 'High',
                    status: 'In Progress',
                    assigneeId: 2,
                    createdAt: new Date('2023-10-15T09:23:45'),
                    messages: [
                        {
                            isStaff: false,
                            content: 'I have been trying to log in to my account for the past two days but keep getting an error message saying "Invalid credentials" even though I am sure my password is correct. I have tried resetting my password twice but still facing the same issue.',
                            timestamp: new Date('2023-10-15T09:23:45')
                        },
                        {
                            isStaff: true,
                            staffId: 2,
                            content: 'Thank you for reporting this issue, Mr. Smith. I will look into this right away. Could you please confirm which browser and device you are using to access the website?',
                            timestamp: new Date('2023-10-15T10:15:22')
                        },
                        {
                            isStaff: false,
                            content: 'I am using Chrome on my Windows laptop. I also tried on my iPhone with Safari and had the same problem.',
                            timestamp: new Date('2023-10-15T11:05:33')
                        },
                        {
                            isStaff: true,
                            staffId: 2,
                            content: 'Thank you for the additional information. I have checked your account and found that there might be an issue with your account settings. I have reset your account status and you should now be able to log in with your current password. Please try again and let me know if you still experience any issues.',
                            timestamp: new Date('2023-10-15T14:22:10')
                        }
                    ]
                },
                {
                    id: 1002,
                    customerName: 'Sarah Johnson',
                    email: 'sarah.j@example.com',
                    phone: '+1 (555) 987-6543',
                    subject: 'Billing discrepancy on recent invoice',
                    description: 'I was charged $59.99 on my last invoice dated Oct 5, 2023, but my plan should be $39.99/month. I believe there has been an error in billing. Please review and adjust my account accordingly.',
                    category: 'Billing',
                    priority: 'Medium',
                    status: 'New',
                    assigneeId: null,
                    createdAt: new Date('2023-10-18T14:05:12'),
                    messages: [
                        {
                            isStaff: false,
                            content: 'I was charged $59.99 on my last invoice dated Oct 5, 2023, but my plan should be $39.99/month. I believe there has been an error in billing. Please review and adjust my account accordingly.',
                            timestamp: new Date('2023-10-18T14:05:12')
                        }
                    ]
                },
                {
                    id: 1003,
                    customerName: 'Michael Chen',
                    email: 'mchen@example.com',
                    phone: '+1 (555) 234-5678',
                    subject: 'Product arrived damaged',
                    description: 'I received my order #45678 yesterday, but the item was damaged during shipping. The package appeared to have been crushed on one side, and the product inside has a large crack. I would like a replacement sent as soon as possible.',
                    category: 'Product',
                    priority: 'High',
                    status: 'Resolved',
                    assigneeId: 3,
                    createdAt: new Date('2023-10-10T11:32:40'),
                    messages: [
                        {
                            isStaff: false,
                            content: 'I received my order #45678 yesterday, but the item was damaged during shipping. The package appeared to have been crushed on one side, and the product inside has a large crack. I would like a replacement sent as soon as possible.',
                            timestamp: new Date('2023-10-10T11:32:40')
                        },
                        {
                            isStaff: true,
                            staffId: 3,
                            content: "I'm very sorry to hear about the damaged product, Mr. Chen. We take great care in packaging our items, but sometimes shipping damage can occur. I've processed a replacement order for you with expedited shipping at no additional cost. You should receive the replacement within 2-3 business days. There's no need to return the damaged item.",
                            timestamp: new Date('2023-10-10T13:45:22')
                        },
                        {
                            isStaff: false,
                            content: 'Thank you for the quick response and resolution. I appreciate the expedited shipping.',
                            timestamp: new Date('2023-10-10T14:12:05')
                        },
                        {
                            isStaff: true,
                            staffId: 3,
                            content: 'Youre welcome, Mr. Chen. Your replacement has been shipped. The tracking number is TX987654321. Please let us know if you need anything else!',
                            timestamp: new Date('2023-10-11T09:30:15')
                        },
                        {
                            isStaff: false,
                            content: 'I received the replacement today and its in perfect condition. Thank you for the excellent service!',
                            timestamp: new Date('2023-10-13T16:05:33')
                        }
                    ]
                },
                {
                    id: 1004,
                    customerName: 'Emily Rodriguez',
                    email: 'emily.r@example.com',
                    phone: '+1 (555) 345-6789',
                    subject: 'Refund not processed after 30 days',
                    description: 'I returned an item on September 15th (return tracking #RT123456) which was received by your warehouse on September 20th according to the tracking information. The return policy states refunds will be processed within 14 days, but it has been over 30 days and I still haven\'t received my refund of $129.99.',
                    category: 'Billing',
                    priority: 'Urgent',
                    status: 'In Progress',
                    assigneeId: 1,
                    createdAt: new Date('2023-10-20T10:15:30'),
                    messages: [
                        {
                            isStaff: false,
                            content: 'I returned an item on September 15th (return tracking #RT123456) which was received by your warehouse on September 20th according to the tracking information. The return policy states refunds will be processed within 14 days, but it has been over 30 days and I still haven\'t received my refund of $129.99.',
                            timestamp: new Date('2023-10-20T10:15:30')
                        },
                        {
                            isStaff: true,
                            staffId: 1,
                            content: "Thank you for bringing this to our attention, Ms. Rodriguez. I apologize for the delay in processing your refund. I've looked into this matter and can confirm that your return was received. There appears to have been an oversight in our system. I've expedited your refund, which should appear in your account within 3-5 business days. As a goodwill gesture for the inconvenience, I've also added a $20 store credit to your account.",
                            timestamp: new Date('2023-10-20T11:05:45')
                        }
                    ]
                },
                {
                    id: 1005,
                    customerName: 'David Wilson',
                    email: 'dwilson@example.com',
                    phone: '+1 (555) 456-7890',
                    subject: 'Poor customer service experience',
                    description: 'I had a very disappointing interaction with a customer service representative named Kevin on October 17th. I called regarding a simple question about my subscription, but the representative was rude, interrupted me multiple times, and ultimately did not resolve my issue. I would like to speak with a manager about this experience.',
                    category: 'Service',
                    priority: 'Medium',
                    status: 'New',
                    assigneeId: null,
                    createdAt: new Date('2023-10-19T15:45:20'),
                    messages: [
                        {
                            isStaff: false,
                            content: 'I had a very disappointing interaction with a customer service representative named Kevin on October 17th. I called regarding a simple question about my subscription, but the representative was rude, interrupted me multiple times, and ultimately did not resolve my issue. I would like to speak with a manager about this experience.',
                            timestamp: new Date('2023-10-19T15:45:20')
                        }
                    ]
                }
            ],

            // Staff members
            staffMembers: [
                { id: 1, name: 'Amanda Lee', role: 'Customer Support Manager', email: 'amanda.l@company.com' },
                { id: 2, name: 'Robert Taylor', role: 'Technical Support Specialist', email: 'robert.t@company.com' },
                { id: 3, name: 'Jessica Brown', role: 'Customer Service Representative', email: 'jessica.b@company.com' },
                { id: 4, name: 'Daniel Kim', role: 'Billing Specialist', email: 'daniel.k@company.com' }
            ],

            // Filters
            filters: {
                status: '',
                priority: '',
                category: '',
                assignee: '',
                dateFrom: '',
                dateTo: '',
                search: ''
            },

            // Sorting
            sortColumn: 'createdAt',
            sortDirection: 'desc',

            // Pagination
            itemsPerPage: 10,
            currentPage: 1,

            // Selected complaint for detail view
            selectedComplaint: null,

            // New response form
            newResponse: '',
            newStatus: '',

            // Assignment
            complaintToAssign: null,
            selectedAssignee: '',
            assignmentNote: ''
        };
    },
    computed: {
        // Filtered complaints based on search and filters
        filteredComplaints() {
            let result = this.complaints;

            // Apply status filter
            if (this.filters.status) {
                result = result.filter(c => c.status === this.filters.status);
            }

            // Apply priority filter
            if (this.filters.priority) {
                result = result.filter(c => c.priority === this.filters.priority);
            }

            // Apply category filter
            if (this.filters.category) {
                result = result.filter(c => c.category === this.filters.category);
            }

            // Apply assignee filter
            if (this.filters.assignee) {
                result = result.filter(c => c.assigneeId === parseInt(this.filters.assignee));
            }

            // Apply date range filter
            if (this.filters.dateFrom) {
                const fromDate = new Date(this.filters.dateFrom);
                result = result.filter(c => c.createdAt >= fromDate);
            }

            if (this.filters.dateTo) {
                const toDate = new Date(this.filters.dateTo);
                toDate.setHours(23, 59, 59, 999); // End of day
                result = result.filter(c => c.createdAt <= toDate);
            }

            // Apply search filter
            if (this.filters.search) {
                const searchLower = this.filters.search.toLowerCase();
                result = result.filter(c => {
                    return c.id.toString().includes(searchLower) ||
                        c.customerName.toLowerCase().includes(searchLower) ||
                        c.email.toLowerCase().includes(searchLower) ||
                        c.subject.toLowerCase().includes(searchLower) ||
                        c.description.toLowerCase().includes(searchLower);
                });
            }

            return result;
        },

        // Pagination calculations
        totalPages() {
            return Math.ceil(this.filteredComplaints.length / this.itemsPerPage);
        },

        startIndex() {
            return (this.currentPage - 1) * this.itemsPerPage;
        },

        endIndex() {
            return this.startIndex + this.itemsPerPage;
        },

        paginatedComplaints() {
            return this.filteredComplaints.slice(this.startIndex, this.endIndex);
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
        formatDate(date) {
            return new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        },

        getTimeAgo(date) {
            const now = new Date();
            const diffMs = now - new Date(date);
            const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
            const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
            const diffMinutes = Math.floor(diffMs / (1000 * 60));

            if (diffDays > 0) {
                return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
            } else if (diffHours > 0) {
                return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
            } else {
                return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
            }
        },

        getInitials(name) {
            if (!name) return 'NA';
            return name.split(' ').map(n => n[0]).join('').toUpperCase();
        },

        getStaffName(staffId) {
            const staff = this.staffMembers.find(s => s.id === staffId);
            return staff ? staff.name : 'Unknown';
        },

        getStaffInitials(staffId) {
            const name = this.getStaffName(staffId);
            return this.getInitials(name);
        },

        getStaffRole(staffId) {
            const staff = this.staffMembers.find(s => s.id === staffId);
            return staff ? staff.role : '';
        },

        getStatusBadgeClass(status) {
            const classes = 'badge rounded-pill ';
            switch (status) {
                case 'New':
                    return classes + 'bg-primary';
                case 'In Progress':
                    return classes + 'bg-warning text-dark';
                case 'Resolved':
                    return classes + 'bg-success';
                case 'Closed':
                    return classes + 'bg-secondary';
                default:
                    return classes + 'bg-light text-dark';
            }
        },

        getPriorityBadgeClass(priority) {
            const classes = 'badge rounded-pill ';
            switch (priority) {
                case 'Low':
                    return classes + 'bg-info';
                case 'Medium':
                    return classes + 'bg-primary';
                case 'High':
                    return classes + 'bg-warning text-dark';
                case 'Urgent':
                    return classes + 'bg-danger';
                default:
                    return classes + 'bg-light text-dark';
            }
        },

        getComplaintsByStatus(status) {
            return this.complaints.filter(c => c.status === status);
        },

        getComplaintsByAssignee(assigneeId) {
            return this.complaints.filter(c => c.assigneeId === assigneeId);
        },

        getResolvedComplaintsByAssignee(assigneeId) {
            return this.complaints.filter(c => c.assigneeId === assigneeId &&
                (c.status === 'Resolved' || c.status === 'Closed'));
        },

        getAvgResolutionTime(assigneeId) {
            // This would normally calculate the actual average resolution time
            // For demo purposes, returning static values
            const times = {
                1: '2.3 days',
                2: '1.8 days',
                3: '3.5 days',
                4: '2.1 days'
            };
            return times[assigneeId] || 'N/A';
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

        // Filter actions
        applyFilters() {
            this.currentPage = 1; // Reset to first page when filtering
        },

        resetFilters() {
            this.filters = {
                status: '',
                priority: '',
                category: '',
                assignee: '',
                dateFrom: '',
                dateTo: '',
                search: ''
            };
            this.currentPage = 1;
        },

        clearSearch() {
            this.filters.search = '';
        },

        // Complaint actions
        viewComplaint(complaint) {
            this.selectedComplaint = complaint;
            this.newStatus = complaint.status;
            this.complaintDetailModal.show();
        },

        updateStatus(complaint, status) {
            const index = this.complaints.findIndex(c => c.id === complaint.id);
            if (index !== -1) {
                this.complaints[index].status = status;

                // Add a system message about the status change
                this.complaints[index].messages.push({
                    isStaff: true,
                    staffId: 1, // Assuming the current admin is ID 1
                    content: `Status changed to "${status}"`,
                    timestamp: new Date()
                });

                alert(`Complaint #${complaint.id} status updated to ${status}`);
            }
        },

        assignComplaint(complaint) {
            this.complaintToAssign = complaint;
            this.selectedAssignee = complaint.assigneeId || '';
            this.assignmentNote = '';
            this.assignModal.show();
        },

        confirmAssignment() {
            if (this.complaintToAssign) {
                const index = this.complaints.findIndex(c => c.id === this.complaintToAssign.id);
                if (index !== -1) {
                    // Update the assignee
                    this.complaints[index].assigneeId = this.selectedAssignee ? parseInt(this.selectedAssignee) : null;

                    // Add a system message about the assignment
                    if (this.selectedAssignee) {
                        const staffName = this.getStaffName(parseInt(this.selectedAssignee));
                        const message = this.assignmentNote
                            ? `Assigned to ${staffName}. Note: ${this.assignmentNote}`
                            : `Assigned to ${staffName}`;

                        this.complaints[index].messages.push({
                            isStaff: true,
                            staffId: 1, // Assuming the current admin is ID 1
                            content: message,
                            timestamp: new Date()
                        });
                    } else {
                        this.complaints[index].messages.push({
                            isStaff: true,
                            staffId: 1,
                            content: 'Complaint unassigned',
                            timestamp: new Date()
                        });
                    }

                    alert(`Complaint #${this.complaintToAssign.id} ${this.selectedAssignee ? 'assigned' : 'unassigned'} successfully`);
                }
            }

            this.assignModal.hide();
        },

        deleteComplaint(complaint) {
            if (confirm(`Are you sure you want to delete complaint #${complaint.id}?`)) {
                this.complaints = this.complaints.filter(c => c.id !== complaint.id);
                alert(`Complaint #${complaint.id} deleted successfully`);
            }
        },

        submitResponse() {
            if (!this.newResponse.trim()) {
                alert('Please enter a response message');
                return;
            }

            if (this.selectedComplaint) {
                const index = this.complaints.findIndex(c => c.id === this.selectedComplaint.id);
                if (index !== -1) {
                    // Add the response message
                    this.complaints[index].messages.push({
                        isStaff: true,
                        staffId: 1, // Assuming the current admin is ID 1
                        content: this.newResponse,
                        timestamp: new Date()
                    });

                    // Update status if changed
                    if (this.newStatus !== this.selectedComplaint.status) {
                        this.complaints[index].status = this.newStatus;

                        // Add a system message about the status change
                        this.complaints[index].messages.push({
                            isStaff: true,
                            staffId: 1,
                            content: `Status changed to "${this.newStatus}"`,
                            timestamp: new Date()
                        });
                    }

                    // Update the selected complaint to reflect changes
                    this.selectedComplaint = this.complaints[index];

                    // Clear the response field
                    this.newResponse = '';

                    alert('Response submitted successfully');
                }
            }
        },

        exportComplaints() {
            alert('Complaints data exported successfully');
        }
    },
    mounted() {
        // Initialize Bootstrap modals
        this.complaintDetailModal = new Modal(document.getElementById('complaintDetailModal'));
        this.assignModal = new Modal(document.getElementById('assignModal'));
    }
};
</script>

<style scoped>
.complaints-management-container {
    background-color: #f8f9fa;
    min-height: 100vh;
}

.sortable-header {
    cursor: pointer;
    user-select: none;
}

.sortable-header:hover {
    background-color: rgba(0, 0, 0, 0.05);
}

.complaint-row {
    cursor: pointer;
}

.complaint-row:hover {
    background-color: rgba(13, 110, 253, 0.05) !important;
}

.avatar-circle {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #e9ecef;
    color: #495057;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 14px;
}

/* Timeline styling */
.timeline {
    position: relative;
    padding-left: 30px;
}

.timeline-item {
    position: relative;
    padding-bottom: 20px;
    padding-left: 20px;
}

.timeline-item:before {
    content: '';
    position: absolute;
    left: -20px;
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: #dee2e6;
}

.timeline-badge {
    position: absolute;
    left: -36px;
    top: 0;
    z-index: 1;
}

.timeline-content {
    padding: 15px;
    background-color: #f8f9fa;
    border-radius: 8px;
    margin-bottom: 15px;
}

.timeline-staff .timeline-content {
    background-color: #e9f5fe;
}

.message-content {
    white-space: pre-line;
}

.chart-placeholder {
    min-height: 250px;
}
</style>
