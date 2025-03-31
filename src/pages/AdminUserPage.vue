<template>
    <div class="data-table-container">
        <!-- Top Action Bar -->
        <div class="d-flex justify-content-between align-items-center mb-3">
            <div class="d-flex gap-2">
                <button class="btn btn-primary" @click="handleAdd">
                    <i class="bi bi-plus-circle me-1"></i> Add New
                </button>
                <button class="btn btn-outline-secondary" @click="handleExport">
                    <i class="bi bi-download me-1"></i> Export
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
                    <input type="text" class="form-control" placeholder="Search..." v-model="searchQuery"
                        @input="handleSearch">
                    <button v-if="searchQuery" class="btn btn-outline-secondary" type="button" @click="clearSearch">
                        <i class="bi bi-x"></i>
                    </button>
                </div>
            </div>
        </div>

        <!-- Data Table -->
        <div class="table-responsive">
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
                    <tr v-for="(item, index) in paginatedData" :key="index">
                        <td v-for="column in visibleColumns" :key="`${index}-${column.key}`">
                            {{ item[column.key] }}
                        </td>
                        <td>
                            <div class="d-flex gap-1">
                                <button class="btn btn-sm btn-outline-primary" @click="handleEdit(item)">
                                    <i class="bi bi-pencil"></i>
                                </button>
                                <button class="btn btn-sm btn-outline-danger" @click="handleDelete(item)">
                                    <i class="bi bi-trash"></i>
                                </button>
                                <div class="dropdown">
                                    <button class="btn btn-sm btn-outline-secondary dropdown-toggle" type="button"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        More
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="#" @click.prevent="handleView(item)">View
                                                Details</a></li>
                                        <li><a class="dropdown-item" href="#"
                                                @click.prevent="handleDuplicate(item)">Duplicate</a></li>
                                        <li>
                                            <hr class="dropdown-divider">
                                        </li>
                                        <li><a class="dropdown-item text-danger" href="#"
                                                @click.prevent="handleDelete(item)">Delete</a></li>
                                    </ul>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="filteredData.length === 0">
                        <td :colspan="visibleColumns.length + 1" class="text-center py-4">
                            <div class="text-muted">
                                <i class="bi bi-inbox fs-3 d-block mb-2"></i>
                                No data found
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div class="d-flex justify-content-between align-items-center">
            <div>
                Showing {{ startIndex + 1 }} to {{ Math.min(endIndex, filteredData.length) }} of {{ filteredData.length
                }} entries
            </div>
            <nav aria-label="Table pagination">
                <ul class="pagination mb-0">
                    <li class="page-item" :class="{ disabled: currentPage === 1 }">
                        <a class="page-link" href="#" @click.prevent="goToPage(currentPage - 1)">Previous</a>
                    </li>
                    <li v-for="page in totalPages" :key="page" class="page-item"
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
</template>

<script>
export default {
    name: 'DataTable',
    data() {
        return {
            // Sample data - replace with your actual data source
            tableData: [
                { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', role: 'Admin', lastLogin: '2023-10-15' },
                { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive', role: 'User', lastLogin: '2023-09-22' },
                { id: 3, name: 'Robert Johnson', email: 'robert@example.com', status: 'Active', role: 'Editor', lastLogin: '2023-10-10' },
                { id: 4, name: 'Emily Davis', email: 'emily@example.com', status: 'Pending', role: 'User', lastLogin: '2023-08-05' },
                { id: 5, name: 'Michael Brown', email: 'michael@example.com', status: 'Active', role: 'Admin', lastLogin: '2023-10-14' },
                { id: 6, name: 'Sarah Wilson', email: 'sarah@example.com', status: 'Active', role: 'User', lastLogin: '2023-09-30' },
                { id: 7, name: 'David Thompson', email: 'david@example.com', status: 'Inactive', role: 'Editor', lastLogin: '2023-07-22' },
                { id: 8, name: 'Lisa Anderson', email: 'lisa@example.com', status: 'Active', role: 'User', lastLogin: '2023-10-01' },
                { id: 9, name: 'James Martin', email: 'james@example.com', status: 'Pending', role: 'User', lastLogin: '2023-09-15' },
                { id: 10, name: 'Jennifer Garcia', email: 'jennifer@example.com', status: 'Active', role: 'Admin', lastLogin: '2023-10-12' },
                { id: 11, name: 'Thomas Rodriguez', email: 'thomas@example.com', status: 'Active', role: 'Editor', lastLogin: '2023-09-28' },
                { id: 12, name: 'Patricia Lewis', email: 'patricia@example.com', status: 'Inactive', role: 'User', lastLogin: '2023-08-17' },
            ],

            // Column definitions
            columns: [
                { key: 'id', label: 'ID', visible: true },
                { key: 'name', label: 'Name', visible: true },
                { key: 'email', label: 'Email', visible: true },
                { key: 'status', label: 'Status', visible: true },
                { key: 'role', label: 'Role', visible: true },
                { key: 'lastLogin', label: 'Last Login', visible: true },
            ],

            // Search functionality
            searchQuery: '',

            // Sorting
            sortColumn: 'id',
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
            if (!this.searchQuery) return this.tableData;

            const query = this.searchQuery.toLowerCase();
            return this.tableData.filter(item => {
                return Object.keys(item).some(key => {
                    const value = item[key];
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
        }
    },
    methods: {
        // Sorting
        sortBy(column) {
            if (this.sortColumn === column) {
                this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                this.sortColumn = column;
                this.sortDirection = 'asc';
            }

            this.tableData.sort((a, b) => {
                const aValue = a[this.sortColumn];
                const bValue = b[this.sortColumn];

                if (aValue < bValue) return this.sortDirection === 'asc' ? -1 : 1;
                if (aValue > bValue) return this.sortDirection === 'asc' ? 1 : -1;
                return 0;
            });
        },

        // Pagination navigation
        goToPage(page) {
            if (page < 1 || page > this.totalPages) return;
            this.currentPage = page;
        },

        // Event handlers
        handleSearch() {
            this.currentPage = 1; // Reset to first page when searching
        },

        clearSearch() {
            this.searchQuery = '';
        },

        handleAdd() {
            alert('Add new item');
            // Implement your add logic here
        },

        handleEdit(item) {
            alert(`Edit item with ID: ${item.id}`);
            // Implement your edit logic here
        },

        handleDelete(item) {
            if (confirm(`Are you sure you want to delete ${item.name}?`)) {
                // Implement your delete logic here
                this.tableData = this.tableData.filter(i => i.id !== item.id);
            }
        },

        handleExport() {
            alert('Export data');
            // Implement your export logic here
        },

        handleView(item) {
            alert(`View details for ${item.name}`);
            // Implement your view logic here
        },

        handleDuplicate(item) {
            const newItem = { ...item, id: Math.max(...this.tableData.map(i => i.id)) + 1 };
            this.tableData.push(newItem);
            alert(`Duplicated ${item.name}`);
        }
    },
    mounted() {
        // If you're using Bootstrap JS directly, you might need to initialize dropdowns
        // This is not needed if you're using bootstrap-vue
    }
};
</script>

<style scoped>
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
</style>
