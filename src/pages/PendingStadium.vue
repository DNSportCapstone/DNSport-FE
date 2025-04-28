<template>
  <div class="pending-stadiums-container">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Manage Pending Stadiums</h5>
        <div v-if="pendingStadiums.length === 0" class="alert alert-info">
          No pending stadiums to review.
        </div>
        <div v-else>
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Stadium Name</th>
                <th>Address</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="stadium in pendingStadiums" :key="stadium.stadiumId">
                <td>{{ stadium.stadiumName }}</td>
                <td>{{ stadium.address }}</td>
                <td>
                  <img
                    :src="stadium.image"
                    alt="Stadium image"
                    class="img-thumbnail"
                    style="width: 100px; height: 100px; object-fit: cover"
                  />
                </td>
                <td>
                  <button
                    class="btn btn-success btn-sm me-2"
                    @click="approveStadium(stadium.stadiumId)"
                    :disabled="loading"
                  >
                    <i class="bi bi-check-circle me-1"></i> Approve
                  </button>
                  <button
                    class="btn btn-danger btn-sm"
                    @click="rejectStadium(stadium.stadiumId)"
                    :disabled="loading"
                  >
                    <i class="bi bi-x-circle me-1"></i> Reject
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Loading Spinner -->
    <div v-if="loading" class="loading-spinner">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
import API from "@/utils/axios";

export default {
  name: "PendingStadium",
  data() {
    return {
      loading: false,
      toast: useToast(),
      pendingStadiums: [],
    };
  },
  async mounted() {
    await this.fetchPendingStadiums();
  },
  methods: {
    async fetchPendingStadiums() {
      this.loading = true;
      try {
        const response = await API.get("/Admin/pending");
        this.pendingStadiums = response.data;
      } catch (error) {
        console.error("Error fetching pending stadiums:", error);
        this.toast.error("Failed to load pending stadiums. Please try again.");
      } finally {
        this.loading = false;
      }
    },
    async approveStadium(stadiumId) {
      await this.updateStadiumStatus(stadiumId, "Active");
    },
    async rejectStadium(stadiumId) {
      if (confirm("Are you sure you want to reject this stadium?")) {
        await this.updateStadiumStatus(stadiumId, "Rejected");
      }
    },
    async updateStadiumStatus(stadiumId, newStatus) {
      this.loading = true;
      try {
        await API.put("/Admin/update-status", {
          stadiumId,
          newStatus,
        });
        this.toast.success(`Stadium ${newStatus.toLowerCase()} successfully!`);
        await this.fetchPendingStadiums();
      } catch (error) {
        console.error(`Error updating stadium status to ${newStatus}:`, error);
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.title ||
          error.message ||
          "An unexpected error occurred";
        this.toast.error(`Failed to update stadium status: ${errorMessage}`);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.pending-stadiums-container {
  margin-top: 20px;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 15px;
}

.card {
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 1.25rem;
  font-weight: 500;
}

.table {
  margin-top: 20px;
}

.table th,
.table td {
  vertical-align: middle;
}

.loading-spinner {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}
</style>
