<template>
  <div class="new-field-list-container">
    <h1>New Fields Awaiting Approval</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Field Name</th>
          <th>Phone Number</th>
          <th>Field Type</th>
          <th>Address</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(field, index) in fields" :key="index">
          <td>{{ field.id }}</td>
          <td>{{ field.name }}</td>
          <td>{{ field.phone }}</td>
          <td>{{ field.type }}</td>
          <td>{{ field.address }}</td>
          <td>
            <button class="approve-btn" @click="approveField(field)">
              Approve
            </button>
            <button class="reject-btn" @click="rejectField(field)">
              Reject
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "NewFieldList",
  data() {
    return {
      fields: [
        {
          id: 1,
          name: "Stadium A",
          phone: "123-456-7890",
          type: "Sân bóng đá 5",
          address: "123 Main St, City A",
          status: "pending",
        },
        {
          id: 2,
          name: "Badminton Court B",
          phone: "987-654-3210",
          type: "Sân cầu lông",
          address: "456 Elm St, City B",
          status: "pending",
        },
        {
          id: 3,
          name: "Stadium C",
          phone: "555-666-7777",
          type: "Sân bóng đá 7",
          address: "789 Maple St, City C",
          status: "pending",
        },
      ],
    };
  },
  methods: {
    approveField(field) {
      field.status = "approved";
      alert(`Field ${field.name} has been approved.`);
    },
    rejectField(field) {
      field.status = "rejected";
      alert(`Field ${field.name} has been rejected.`);
    },
  },
};
</script>

<style scoped>
.new-field-list-container {
  width: 100%;
  margin-top: -10px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
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

button {
  margin: 5px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  opacity: 0.8;
}

.approve-btn {
  background-color: #28a745;
  color: white;
}

.reject-btn {
  background-color: #dc3545;
  color: white;
}

/* Styles for button hover effect */
button.approve-btn:hover {
  background-color: #218838;
}

button.reject-btn:hover {
  background-color: #c82333;
}
</style>
