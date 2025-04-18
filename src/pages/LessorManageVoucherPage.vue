<script>
import API from "@/utils/axios";

export default {
  data() {
    return {
      vouchers: [],
      form: {
        voucherId: null,
        voucherCode: "",
        discountPercentage: 0,
        expiryDate: "",
        conditions: "",
      },
      formErrors: [], // Error messages for form validation
      showForm: false,
      isEdit: false,
      loading: false, // Loading state for fetching vouchers
    };
  },
  methods: {
    async fetchVouchers() {
      this.loading = true;
      try {
        const res = await API.get("/vouchers/all");
        this.vouchers = res.data;
      } catch (err) {
        console.error("Failed to fetch vouchers:", err);
      } finally {
        this.loading = false;
      }
    },
    formatDate(dateString) {
      return dateString ? dateString.split("T")[0] : "";
    },
    openCreateForm() {
      this.resetForm();
      this.showForm = true;
      this.isEdit = false;
    },
    editVoucher(voucher) {
      this.form = {
        ...voucher,
        expiryDate: this.formatDate(voucher.expiryDate),
      };
      this.showForm = true;
      this.isEdit = true;
    },
    closeForm() {
      this.resetForm();
      this.showForm = false;
    },
    async submitForm() {
      this.formErrors = []; // Clear previous errors
      try {
        const payload = { ...this.form };
        payload.expiryDate = this.formatDate(payload.expiryDate);

        // Check if form is valid
        if (
          !payload.voucherCode ||
          !payload.discountPercentage ||
          !payload.expiryDate ||
          !payload.conditions
        ) {
          this.formErrors.push("All fields are required.");
          return;
        }

        if (this.isEdit) {
          await API.put(`/vouchers/update/${payload.voucherId}`, payload);
        } else {
          await API.post("/vouchers/create", payload);
        }

        this.closeForm();
        this.fetchVouchers();
      } catch (err) {
        console.error(
          "Error submitting form:",
          err.response?.data || err.message
        );
        if (err.response && err.response.data) {
          if (err.response.data.errors) {
            // Show specific validation errors for each field
            Object.keys(err.response.data.errors).forEach((field) => {
              this.formErrors.push(
                `${field}: ${err.response.data.errors[field].join(", ")}`
              );
            });
          } else {
            // General error if there are no specific validation errors
            this.formErrors.push(
              "Error: " + (err.response.data.message || "Unknown error")
            );
          }
        } else {
          // Handle non-API errors
          this.formErrors.push("An unexpected error occurred.");
        }
      }
    },
    async deleteVoucher(id) {
      if (confirm("Are you sure you want to delete this voucher?")) {
        try {
          await API.delete(`/vouchers/delete/${id}`);
          this.fetchVouchers();
        } catch (err) {
          console.error("Failed to delete voucher:", err);
        }
      }
    },
    resetForm() {
      this.form = {
        voucherId: null,
        voucherCode: "",
        discountPercentage: 0,
        expiryDate: "",
        conditions: "",
      };
      this.formErrors = []; // Reset form errors
    },
  },
  mounted() {
    this.fetchVouchers();
  },
};
</script>

<template>
  <div class="voucher-management">
    <h2 class="title">Voucher Management</h2>

    <!-- Add New Voucher Button -->
    <div class="actions">
      <button @click="openCreateForm" class="btn create">
        + Add New Voucher
      </button>
    </div>

    <!-- Voucher List -->
    <div v-if="loading" class="loading">
      <p>Loading...</p>
    </div>
    <div v-else-if="vouchers.length" class="voucher-list">
      <table>
        <thead>
          <tr>
            <th>Voucher Code</th>
            <th>Discount</th>
            <th>Expiry Date</th>
            <th>Conditions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="voucher in vouchers" :key="voucher.voucherId">
            <td>{{ voucher.voucherCode }}</td>
            <td>{{ voucher.discountPercentage }}%</td>
            <td>{{ formatDate(voucher.expiryDate) }}</td>
            <td>{{ voucher.conditions }}</td>
            <td>
              <button @click="editVoucher(voucher)" class="btn edit">
                Edit
              </button>
              <button
                @click="deleteVoucher(voucher.voucherId)"
                class="btn delete"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>No vouchers found.</p>
    </div>

    <!-- Form Modal -->
    <div v-if="showForm" class="form-modal">
      <div class="form-container">
        <h3>{{ isEdit ? "Edit Voucher" : "Create Voucher" }}</h3>
        <form @submit.prevent="submitForm">
          <input
            v-model="form.voucherCode"
            placeholder="Voucher Code"
            required
          />
          <input
            v-model.number="form.discountPercentage"
            type="number"
            min="1"
            max="100"
            placeholder="Discount %"
            required
          />
          <input v-model="form.expiryDate" type="date" required />
          <textarea
            v-model="form.conditions"
            placeholder="Conditions"
            required
          ></textarea>

          <!-- Displaying error messages -->
          <div v-if="formErrors.length" class="error-messages">
            <ul>
              <li v-for="(error, index) in formErrors" :key="index">
                {{ error }}
              </li>
            </ul>
          </div>

          <div class="form-buttons">
            <button type="submit" class="btn submit">Submit</button>
            <button type="button" @click="closeForm" class="btn cancel">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.error-messages {
  color: red;
  margin-bottom: 10px;
}

.loading {
  text-align: center;
  margin-top: 20px;
}
.voucher-management {
  max-width: 900px;
  margin: auto;
  padding: 100px 20px 80px;
  min-height: calc(100vh - 60px);
  box-sizing: border-box;
}

.title {
  text-align: center;
  margin-bottom: 20px;
}

.actions {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.btn {
  padding: 8px 12px;
  margin: 0 4px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn.create {
  background-color: #28a745;
  color: #fff;
}

.btn.edit {
  background-color: #ffc107;
}

.btn.delete {
  background-color: #dc3545;
  color: #fff;
}

.btn.submit {
  background-color: #007bff;
  color: #fff;
}

.btn.cancel {
  background-color: #6c757d;
  color: #fff;
  margin-left: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th,
td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
}

.form-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.form-container {
  background: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 400px;
  z-index: 10000;
}

input,
textarea {
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-buttons {
  display: flex;
  justify-content: flex-end;
}

.error-messages {
  color: red;
  margin-bottom: 10px;
}

.loading {
  text-align: center;
  margin-top: 20px;
}
</style>
