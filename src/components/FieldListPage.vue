<template>
  <div class="field-list-page">
    <h1>Field List</h1>
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
        <tr v-for="field in fields" :key="field.id">
          <td>{{ field.id }}</td>
          <td>{{ field.name }}</td>
          <td>{{ field.phone }}</td>
          <td>{{ field.type }}</td>
          <td>{{ field.address }}</td>
          <td>
            <button @click="editField(field)">Edit</button>
            <button @click="deleteField(field.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "FieldListPage",
  data() {
    return {
      fields: [
        {
          id: 1,
          name: "Stadium A",
          phone: "123-456-7890",
          type: "Sân bóng đá 5",
          address: "123 Main St, City A",
        },
        {
          id: 2,
          name: "Badminton Court B",
          phone: "987-654-3210",
          type: "Sân cầu lông",
          address: "456 Elm St, City B",
        },
        {
          id: 3,
          name: "Stadium C",
          phone: "555-666-7777",
          type: "Sân bóng đá 7",
          address: "789 Maple St, City C",
        },
      ],
    };
  },
  methods: {
    editField(field) {
      alert(`Edit field with ID: ${field.id}`);
      // You can implement the logic for editing the field here
    },
    deleteField(id) {
      const fieldIndex = this.fields.findIndex((field) => field.id === id);
      if (fieldIndex !== -1) {
        this.fields.splice(fieldIndex, 1);
        alert(`Field with ID: ${id} has been deleted`);
      }
    },
  },
};
</script>

<style scoped>
.field-list-page {
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
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

button:nth-child(2) {
  background-color: red;
}

button:nth-child(2):hover {
  background-color: darkred;
}
</style>
