<template>
  <div class="report-management-container">
    <h1>Report Management</h1>
    <table>
      <thead>
        <tr>
          <th>Sender</th>
          <th>Reported Person</th>
          <th>Reason</th>
          <th>Details</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(report, index) in reports" :key="index">
          <td>{{ report.sender }}</td>
          <td>{{ report.reportedPerson }}</td>
          <td>{{ report.reason }}</td>
          <td>{{ report.details }}</td>
          <td>
            <button class="approve-btn" @click="approveReport(report)">
              Approve
            </button>
            <button class="reject-btn" @click="rejectReport(report)">
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
  name: "ReportManagement",
  data() {
    return {
      reports: [
        {
          sender: "John Doe",
          reportedPerson: "Alice Smith",
          reason: "Violation of rules",
          details: "Alice was caught cheating during a match.",
          status: "pending",
        },
        {
          sender: "Bob Johnson",
          reportedPerson: "Charlie Brown",
          reason: "Misbehavior",
          details: "Charlie was rude to other players and staff.",
          status: "pending",
        },
        {
          sender: "Mary Lee",
          reportedPerson: "David White",
          reason: "Fraudulent activity",
          details: "David was caught using fake IDs for booking.",
          status: "pending",
        },
      ],
    };
  },
  methods: {
    approveReport(report) {
      report.status = "approved";
      alert(`Report about ${report.reportedPerson} has been approved.`);
    },
    rejectReport(report) {
      report.status = "rejected";
      alert(`Report about ${report.reportedPerson} has been rejected.`);
    },
  },
};
</script>

<style scoped>
.report-management-container {
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
