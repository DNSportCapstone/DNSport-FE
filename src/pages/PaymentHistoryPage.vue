<template>
    <div class="section">
      <div class="section-title"></div>
      <div class="container mt-4">
      <!-- Header with search -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="mb-0 fw-bold text-primary">
          <i class="bi bi-credit-card me-2"></i>Transaction History
        </h2>
        <div class="d-flex gap-2">
          <div class="input-group">
            <input type="text" v-model="searchQuery" class="form-control" placeholder="Search transactions..." />
            <button class="btn btn-outline-primary" type="button">
              <i class="bi bi-search"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Main content card -->
      <div class="card border-0 shadow-sm rounded-3 overflow-hidden">
        <!-- Loading state -->
        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-3 text-muted">Loading transactions...</p>
        </div>

        <!-- Empty state -->
        <div v-else-if="paginatedTransactions.length === 0" class="text-center py-5">
          <i class="bi bi-credit-card-2-front display-1 text-muted"></i>
          <p class="mt-3 text-muted">No transaction history found</p>
        </div>

        <!-- Table with data -->
        <div v-else class="table-responsive">
          <table class="table table-hover mb-0 align-middle">
            <thead class="table-light">
              <tr>
                <th class="fw-semibold border-0 text-uppercase">Transaction ID</th>
                <th class="fw-semibold border-0 text-uppercase">Date</th>
                <!-- <th class="fw-semibold border-0 text-uppercase">Status</th> -->
                <th class="fw-semibold border-0 text-uppercase">Amount</th>
                <th class="fw-semibold border-0 text-uppercase">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="transaction in paginatedTransactions" :key="transaction.id" class="align-middle border-bottom">
                <td>
                  <span class="fw-medium">#{{ transaction.logId }}</span>
                </td>
                <td>
                  <div class="d-flex align-items-center">
                    <div
                      class="date-icon bg-light rounded-circle p-2 me-2 d-flex align-items-center justify-content-center"
                      style="width: 40px; height: 40px;">
                      <i class="bi bi-calendar-date text-primary"></i>
                    </div>
                    <span>{{ formatDate(transaction.createdAt) }}</span>
                  </div>
                </td>
                <!-- <td>
                  <span class="badge rounded-pill" :class="getStatusBadgeClass(transaction.status)">
                    {{ transaction.status }}
                  </span>
                </td> -->
                <td :class="getAmountClass(transaction.amount)" class="fw-semibold">
                  {{ formatCurrency(transaction.amount) }}
                </td>
                <td>
                  <div class="d-flex align-items-center">
                    <i class="bi bi-info-circle me-1 text-muted"></i>
                    {{ transaction.errorMessage }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination footer -->
        <div class="card-footer bg-white py-3 border-0">
          <div class="d-flex justify-content-between align-items-center">
            <small class="text-muted">Showing {{ paginatedTransactions.length }} of {{ transactions.length }} results</small>
            <nav aria-label="Page navigation">
              <ul class="pagination pagination-sm mb-0">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                  <button class="page-link rounded-start" @click="currentPage--">
                    <i class="bi bi-chevron-left"></i> Previous
                  </button>
                </li>
                <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: currentPage === page }">
                  <button class="page-link" @click="currentPage = page">
                    {{ page }}
                  </button>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                  <button class="page-link rounded-end" @click="currentPage++">
                    Next <i class="bi bi-chevron-right"></i>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <div style="margin-bottom: 300px;"></div>
    </div>
  </template>

  <script>
import API from '@/utils/axios';
import CommonHelper from '@/utils/common';

  export default {
    name: 'TransactionTable',
    data() {
      return {
        transactions: [],
        loading: true,
        currentPage: 1,
        itemsPerPage: 10,
        searchQuery: ''
      };
    },
    computed: {
      filteredTransactions() {
        if (!this.searchQuery.trim()) return this.transactions;
        return this.transactions.filter((transaction) =>
          Object.values(transaction).some((value) =>
            String(value).toLowerCase().includes(this.searchQuery.toLowerCase())
          )
        );
      },
      paginatedTransactions() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.filteredTransactions.slice(start, end);
      },
      totalPages() {
        return Math.ceil(this.filteredTransactions.length / this.itemsPerPage);
      }
    },
    methods: {
      formatDate(dateString) {
        if (!dateString) return "";
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
      },
      formatCurrency(value) {
        return new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND'
        }).format(value);
      },
      getStatusBadgeClass(status) {
        switch (status?.toLowerCase()) {
          case "completed":
          case "success":
            return "bg-success";
          case "pending":
          case "processing":
            return "bg-warning text-dark";
          case "failed":
          case "declined":
            return "bg-danger";
          case "refunded":
            return "bg-info";
          default:
            return "bg-secondary";
        }
      },
      getTypeIcon(type) {
        switch (type?.toLowerCase()) {
          case "payment":
            return "bi bi-credit-card text-primary";
          case "refund":
            return "bi bi-arrow-counterclockwise text-info";
          case "withdrawal":
            return "bi bi-cash-stack text-warning";
          case "deposit":
            return "bi bi-wallet2 text-success";
          default:
            return "bi bi-arrow-left-right text-secondary";
        }
      },
      getAmountClass(amount) {
        if (amount > 0) return "text-success";
        if (amount < 0) return "text-danger";
        return "";
      },
      async fetchTransactions() {
        // this.loading = true;
        const userId = CommonHelper.getCurrentUserId();
        const response = await API.get(`Booking/payment-histor/${userId}`);
        this.transactions = response.data;
        this.loading = false;

        // Simulate API call with setTimeout
      }
    },
    mounted() {
      this.fetchTransactions();
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
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
  }

  .table-responsive {
    animation: fadeIn 0.3s ease-in-out;
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

  /* Additional styles for enhanced table */
  .border-bottom {
    border-bottom: 1px solid rgba(0, 0, 0, .05) !important;
  }

  .rounded-pill {
    border-radius: 50rem !important;
  }

  .text-uppercase {
    text-transform: uppercase !important;
  }

  .dropdown-menu {
    padding: 0.5rem 0;
    margin: 0.125rem 0 0;
    border-radius: 0.5rem;
  }

  .dropdown-item {
    padding: 0.5rem 1rem;
    transition: all 0.2s;
    cursor: pointer;
  }

  .dropdown-item:hover {
    background-color: rgba(13, 110, 253, 0.05);
  }

  .date-icon {
    transition: all 0.3s ease;
  }

  tr:hover .date-icon {
    background-color: #e9ecef !important;
  }
  </style>
