<template>
  <div class="stadium-register-container">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">
          {{ isEditMode ? "Edit Stadium" : "Add New Stadium" }}
        </h5>
        <form @submit.prevent="handleSubmit">
          <!-- Stadium Name -->
          <div class="mb-3">
            <label for="stadiumName" class="form-label">Stadium Name</label>
            <input
              type="text"
              class="form-control"
              id="stadiumName"
              v-model.trim="stadium.stadiumName"
              placeholder="Enter stadium name"
              required
            />
          </div>

          <!-- Address -->
          <div class="mb-3">
            <label for="address" class="form-label">Address</label>
            <input
              type="text"
              class="form-control"
              id="address"
              v-model.trim="stadium.address"
              placeholder="Enter address"
              required
            />
          </div>

          <!-- Upload Image -->
          <div class="mb-3">
            <label for="imageUpload" class="form-label">Upload Image</label>
            <input
              type="file"
              class="form-control"
              id="imageUpload"
              accept="image/*"
              @change="uploadImage"
              :disabled="loading"
            />
            <small class="form-text text-muted" v-if="stadium.image">
              Image uploaded
            </small>
          </div>

          <!-- Preview Image -->
          <div class="mb-3" v-if="stadium.image">
            <label class="form-label">Preview Image</label>
            <img
              :src="stadium.image"
              alt="Uploaded image"
              class="img-thumbnail"
              style="width: 150px; height: 150px; object-fit: cover"
            />
          </div>

          <!-- Submit + Cancel -->
          <div class="d-flex gap-2">
            <button type="submit" class="btn btn-primary" :disabled="loading">
              <i class="bi bi-save me-1"></i>
              {{ isEditMode ? "Update Stadium" : "Add Stadium" }}
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              @click="handleCancel"
              :disabled="loading"
            >
              <i class="bi bi-x-circle me-1"></i>
              Cancel
            </button>
          </div>
        </form>
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
import CommonHelper from "@/utils/common";

export default {
  name: "StadiumRegister",
  data() {
    return {
      loading: false,
      toast: useToast(),
      stadium: {
        userId: null,
        stadiumName: "",
        address: "",
        image: "",
        status: "Pending", // Hardcoded to "Pending" as per requirement
      },
      isEditMode: false,
    };
  },
  async mounted() {
    try {
      const userId = await this.getUserId();
      if (userId) {
        this.stadium.userId = userId;
      } else {
        this.toast.error("You must be logged in to register a stadium.");
        this.$router.push("/login");
      }
    } catch (error) {
      console.error("Error initializing component:", error);
      this.toast.error("Failed to initialize. Please try again.");
      this.$router.push("/login");
    }
  },
  methods: {
    async uploadImage(event) {
      const file = event.target.files[0];
      if (!file) return;

      // Validate file type and size
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      const maxSizeMB = 5; // Max 5MB
      if (!allowedTypes.includes(file.type)) {
        this.toast.error("Only JPEG, PNG, or GIF images are allowed.");
        return;
      }
      if (file.size > maxSizeMB * 1024 * 1024) {
        this.toast.error(`Image size must be less than ${maxSizeMB}MB.`);
        return;
      }

      this.loading = true;

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "stadium-dnsport"); // Corrected from "field-dnsport"

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/defuxegan/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Cloudinary upload failed");
        }

        const data = await response.json();
        this.stadium.image = data.secure_url;
        this.toast.success("Image uploaded successfully!");
      } catch (error) {
        console.error("Error uploading image:", error);
        this.toast.error("Failed to upload image: " + error.message);
      } finally {
        this.loading = false;
      }
    },
    async getUserId() {
      try {
        const userId = await CommonHelper.getCurrentUserId();
        if (!userId) throw new Error("User ID not found");
        return userId;
      } catch (error) {
        console.error("Error loading user ID:", error);
        this.toast.error("Failed to load user ID. Please log in.");
        return null;
      }
    },
    async handleSubmit() {
      // Validate inputs
      if (!this.stadium.stadiumName || this.stadium.stadiumName.length < 3) {
        this.toast.error("Stadium name must be at least 3 characters long.");
        return;
      }
      if (!this.stadium.address || this.stadium.address.length < 5) {
        this.toast.error("Address must be at least 5 characters long.");
        return;
      }
      if (!this.stadium.userId) {
        this.toast.error("User ID is missing. Please log in again.");
        return;
      }

      try {
        this.loading = true;
        await API.post("/Stadium/Stadium", this.stadium); // Corrected endpoint
        this.toast.success("Stadium added successfully!");
        this.$router.push("/stadium-manager");
      } catch (error) {
        console.error("Error saving stadium:", error);
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.title ||
          error.message ||
          "An unexpected error occurred";
        this.toast.error(`Failed to save stadium: ${errorMessage}`);
      } finally {
        this.loading = false;
      }
    },
    handleCancel() {
      if (
        this.stadium.stadiumName ||
        this.stadium.address ||
        this.stadium.image
      ) {
        if (
          confirm(
            "Are you sure you want to cancel? Unsaved changes will be lost."
          )
        ) {
          this.$router.push("/stadium-manager");
        }
      } else {
        this.$router.push("/stadium-manager");
      }
    },
  },
};
</script>

<style scoped>
.stadium-register-container {
  margin-top: 20px;
  max-width: 600px;
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

.loading-spinner {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}
</style>
