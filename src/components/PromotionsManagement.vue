<template>
  <div class="promotions-management">
    <h1>Promotions Management</h1>
    <button @click="showAddPromotionForm" class="add-promotion-btn">
      Add Promotion
    </button>

    <div v-if="showForm" class="promotion-form">
      <h3>Add New Promotion</h3>
      <form @submit.prevent="addPromotion">
        <label for="promotion-code">Promotion Code (5 characters):</label>
        <input
          type="text"
          v-model="newPromotion.code"
          id="promotion-code"
          maxlength="5"
          pattern="[A-Za-z0-9]{5}"
          title="Promotion code must be 5 characters, letters or digits only."
          required
        />
        <span v-if="formErrors.code" class="error-message">{{
          formErrors.code
        }}</span>

        <label for="promotion-name">Promotion Name:</label>
        <input
          type="text"
          v-model="newPromotion.name"
          id="promotion-name"
          required
        />
        <span v-if="formErrors.name" class="error-message">{{
          formErrors.name
        }}</span>

        <label for="promotion-description">Description:</label>
        <textarea
          v-model="newPromotion.description"
          id="promotion-description"
          required
        ></textarea>
        <span v-if="formErrors.description" class="error-message">{{
          formErrors.description
        }}</span>

        <label for="promotion-date">Promotion Date:</label>
        <input
          type="date"
          v-model="newPromotion.date"
          id="promotion-date"
          required
        />
        <span v-if="formErrors.date" class="error-message">{{
          formErrors.date
        }}</span>

        <button type="submit" class="submit-btn" :disabled="isFormInvalid">
          Submit
        </button>
      </form>
    </div>

    <table v-if="promotions.length > 0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Promotion Code</th>
          <th>Promotion Name</th>
          <th>Description</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(promotion, index) in promotions" :key="index">
          <td>{{ promotion.id }}</td>
          <td>{{ promotion.code }}</td>
          <td>{{ promotion.name }}</td>
          <td>{{ promotion.description }}</td>
          <td>{{ promotion.date }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "PromotionsManagement",
  data() {
    return {
      promotions: [
        {
          id: 1,
          code: "WINTER",
          name: "Winter Sale",
          description: "Discount on winter clothing",
          date: "2025-01-01",
        },
        {
          id: 2,
          code: "SPRNG5",
          name: "Spring Fest",
          description: "Promotion on spring items",
          date: "2025-03-15",
        },
      ],
      newPromotion: {
        code: "",
        name: "",
        description: "",
        date: "",
      },
      formErrors: {
        code: "",
        name: "",
        description: "",
        date: "",
      },
      showForm: false,
    };
  },
  computed: {
    isFormInvalid() {
      return (
        !this.newPromotion.code ||
        !this.newPromotion.name ||
        !this.newPromotion.description ||
        !this.newPromotion.date ||
        Object.values(this.formErrors).some((error) => error)
      );
    },
  },
  methods: {
    showAddPromotionForm() {
      this.showForm = true;
    },
    validateForm() {
      this.formErrors = {}; // Reset errors

      // Validate Promotion Code
      if (!this.newPromotion.code.match(/[A-Za-z0-9]{5}/)) {
        this.formErrors.code =
          "Promotion code must be 5 characters, letters or digits only.";
      }

      // Validate Name
      if (!this.newPromotion.name) {
        this.formErrors.name = "Promotion name is required.";
      }

      // Validate Description
      if (!this.newPromotion.description) {
        this.formErrors.description = "Description is required.";
      }

      // Validate Date
      if (!this.newPromotion.date) {
        this.formErrors.date = "Promotion date is required.";
      }
    },
    addPromotion() {
      this.validateForm();

      if (Object.keys(this.formErrors).length === 0) {
        const newId = this.promotions.length + 1;
        const newPromotion = { ...this.newPromotion, id: newId };
        this.promotions.push(newPromotion);

        // Reset form
        this.newPromotion = { code: "", name: "", description: "", date: "" };
        this.showForm = false;
        alert("New promotion added!");
      } else {
        alert("Please fix the errors in the form.");
      }
    },
  },
};
</script>

<style scoped>
.promotions-management {
  width: 100%;
  margin-top: -10px;
}

.add-promotion-btn {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.add-promotion-btn:hover {
  background-color: #0056b3;
}

.promotion-form {
  margin-top: 20px;
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 5px;
}

.promotion-form label {
  display: block;
  margin: 10px 0 5px;
}

.promotion-form input,
.promotion-form textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.submit-btn {
  background-color: #28a745;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
}

.submit-btn:hover {
  background-color: #218838;
}

.submit-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

th {
  background-color: #f4f4f4;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: -5px;
}
</style>
