<template>
  <div class="table-container">
    <h1>User Management</h1>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Phone Number</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="index">
          <td>{{ user.name }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.role }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "UserTable",
  data() {
    return {
      users: [
        { name: "Alice", phone: "123-456-7890", role: "user" },
        { name: "Bob", phone: "987-654-3210", role: "lesor" },
        { name: "Charlie", phone: "456-789-0123", role: "admin" },
      ],
    };
  },
};
</script>

<style scoped>
.table-container {
  width: 100%;
  margin-top: -10px;
}

h1 {
  margin-bottom: 20px;
  color: #333;
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
}

th {
  background-color: #f4f4f4;
  font-weight: bold;
}

td {
  background-color: #fff;
}

tr:nth-child(even) td {
  background-color: #f9f9f9;
}

tr:hover td {
  background-color: #f1f1f1;
  cursor: pointer;
}
</style>
