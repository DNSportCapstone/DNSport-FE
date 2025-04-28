<template>
  <div class="Update-field-container">
    <!-- Card chứa form -->
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">
          {{ isEditMode ? "Edit Field" : "Add New Field" }}
        </h5>
        <form @submit.prevent="handleSubmit">
          <!-- Stadium -->
          <div class="mb-3">
            <label for="stadiumId" class="form-label">Stadium</label>
            <select
              class="form-select"
              id="stadiumId"
              v-model="field.stadiumId"
              :disabled="isStadiumLocked"
              required
            >
              <option value="" disabled>Select a stadium</option>
              <option
                v-for="stadium in paginatedStadiums"
                :key="stadium.id"
                :value="stadium.id"
              >
                {{ stadium.name }}
              </option>
            </select>
          </div>

          <!-- Search Stadiums -->
          <div class="mb-3" v-if="!isStadiumLocked">
            <div class="input-group">
              <span class="input-group-text">
                <i class="bi bi-search"></i>
              </span>
              <input
                type="text"
                class="form-control"
                placeholder="Search stadiums..."
                v-model="stadiumSearchQuery"
                @input="handleStadiumSearch"
              />
              <button
                v-if="stadiumSearchQuery"
                class="btn btn-outline-secondary"
                type="button"
                @click="clearStadiumSearch"
              >
                <i class="bi bi-x"></i>
              </button>
            </div>
          </div>

          <!-- Sport -->
          <div class="mb-3">
            <label for="sportId" class="form-label">Sport</label>
            <select
              class="form-select"
              id="sportId"
              v-model="field.sportId"
              required
            >
              <option value="" disabled>Select a sport</option>
              <option v-for="sport in sports" :key="sport.id" :value="sport.id">
                {{ sport.name }}
              </option>
            </select>
          </div>

          <!-- Description -->
          <div class="mb-3">
            <label for="description" class="form-label">Field Name</label>
            <input
              type="text"
              class="form-control"
              id="description"
              v-model="field.description"
              placeholder="Enter field name"
              required
            />
          </div>

          <!-- Day Price -->
          <div class="mb-3">
            <label for="dayPrice" class="form-label">Day Price (VND)</label>
            <input
              type="number"
              class="form-control"
              id="dayPrice"
              v-model.number="field.dayPrice"
              placeholder="Enter day price"
              min="0"
              required
            />
          </div>

          <!-- Night Price -->
          <div class="mb-3">
            <label for="nightPrice" class="form-label">Night Price (VND)</label>
            <input
              type="number"
              class="form-control"
              id="nightPrice"
              v-model.number="field.nightPrice"
              placeholder="Enter night price"
              min="0"
              required
            />
          </div>

          <!-- Status -->
          <div class="mb-3">
            <label for="status" class="form-label">Status</label>
            <select
              class="form-select"
              id="status"
              v-model="field.status"
              required
            >
              <option value="Active">Active</option>
              <option value="Disabled">Disabled</option>
            </select>
          </div>

          <!-- Upload Images -->
          <div class="mb-3">
            <label for="imageUpload" class="form-label">Upload Images</label>
            <input
              type="file"
              class="form-control"
              id="imageUpload"
              multiple
              accept="image/*"
              @change="uploadImages"
            />
            <small class="form-text text-muted" v-if="field.imageUrls.length">
              {{ field.imageUrls.length }} image(s) uploaded
            </small>
          </div>

          <!-- Nút Submit và Cancel -->
          <div class="d-flex gap-2">
            <button type="submit" class="btn btn-primary" :disabled="loading">
              <i class="bi bi-save me-1"></i>
              {{ isEditMode ? "Update Field" : "Add Field" }}
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

    <!-- Stadiums Pagination -->
    <div
      class="d-flex justify-content-between align-items-center mt-3"
      v-if="!isStadiumLocked && filteredStadiums.length > stadiumItemsPerPage"
    >
      <div>
        Showing {{ stadiumStartIndex + 1 }} to
        {{ Math.min(stadiumEndIndex, filteredStadiums.length) }} of
        {{ filteredStadiums.length }} stadiums
      </div>
      <nav aria-label="Stadiums pagination">
        <ul class="pagination mb-0">
          <li class="page-item" :class="{ disabled: stadiumCurrentPage === 1 }">
            <a
              class="page-link"
              href="#"
              @click.prevent="goToStadiumPage(stadiumCurrentPage - 1)"
              >Previous</a
            >
          </li>
          <li
            v-for="page in displayedStadiumPages"
            :key="page"
            class="page-item"
            :class="{ active: stadiumCurrentPage === page }"
          >
            <a
              class="page-link"
              href="#"
              @click.prevent="goToStadiumPage(page)"
              >{{ page }}</a
            >
          </li>
          <li
            class="page-item"
            :class="{ disabled: stadiumCurrentPage === stadiumTotalPages }"
          >
            <a
              class="page-link"
              href="#"
              @click.prevent="goToStadiumPage(stadiumCurrentPage + 1)"
              >Next</a
            >
          </li>
        </ul>
      </nav>
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
  name: "FieldRegister",
  data() {
    return {
      loading: false,
      toast: useToast(),
      field: {
        fieldId: null,
        stadiumId: null,
        sportId: null,
        description: "",
        dayPrice: 0,
        nightPrice: 0,
        status: "Active",
        imageUrls: [],
      },
      stadiums: [],
      sports: [
        { id: 1, name: "Bóng đá" },
        { id: 2, name: "Cầu lông" },
        { id: 3, name: "Bóng chuyền" },
        { id: 4, name: "Bóng rổ" },
        { id: 5, name: "Tennis" },
        { id: 6, name: "Pickleball" },
      ],
      isEditMode: false,
      isStadiumLocked: false,
      stadiumSearchQuery: "",
      stadiumItemsPerPage: 5,
      stadiumCurrentPage: 1,
    };
  },
  computed: {
    filteredStadiums() {
      if (!this.stadiumSearchQuery) return this.stadiums;
      const query = this.stadiumSearchQuery.toLowerCase();
      return this.stadiums.filter((stadium) =>
        stadium.name.toLowerCase().includes(query)
      );
    },
    stadiumTotalPages() {
      return Math.ceil(this.filteredStadiums.length / this.stadiumItemsPerPage);
    },
    stadiumStartIndex() {
      return (this.stadiumCurrentPage - 1) * this.stadiumItemsPerPage;
    },
    stadiumEndIndex() {
      return this.stadiumStartIndex + this.stadiumItemsPerPage;
    },
    paginatedStadiums() {
      return this.filteredStadiums.slice(
        this.stadiumStartIndex,
        this.stadiumEndIndex
      );
    },
    displayedStadiumPages() {
      const pages = [];
      const maxVisiblePages = 5;

      if (this.stadiumTotalPages <= maxVisiblePages) {
        for (let i = 1; i <= this.stadiumTotalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        let start = Math.max(2, this.stadiumCurrentPage - 1);
        let end = Math.min(
          this.stadiumTotalPages - 1,
          this.stadiumCurrentPage + 1
        );

        if (this.stadiumCurrentPage <= 2) {
          end = Math.min(this.stadiumTotalPages - 1, maxVisiblePages - 1);
        } else if (this.stadiumCurrentPage >= this.stadiumTotalPages - 1) {
          start = Math.max(2, this.stadiumTotalPages - maxVisiblePages + 2);
        }

        if (start > 2) pages.push("...");
        for (let i = start; i <= end; i++) pages.push(i);
        if (end < this.stadiumTotalPages - 1) pages.push("...");
        pages.push(this.stadiumTotalPages);
      }

      return pages;
    },
  },
  methods: {
    async initializeForm() {
      const { fieldId, stadiumId } = this.$route.query;

      if (stadiumId) {
        this.field.stadiumId = stadiumId;
        this.isStadiumLocked = true;
      }

      await this.fetchStadiums();

      if (fieldId) {
        this.isEditMode = true;
        this.field.fieldId = fieldId;
        await this.fetchFieldData(fieldId);
      }
    },
    async fetchStadiums() {
      try {
        this.loading = true;
        const response = await API.get("/Stadium");
        this.stadiums = response.data.map((s) => ({
          id: s.stadiumId,
          name: s.stadiumName,
        }));
      } catch (error) {
        console.error("Error fetching stadiums:", error);
        this.toast.error(
          `Failed to load stadiums: ${
            error.response?.data?.message || error.message || "Unknown error"
          }`
        );
      } finally {
        this.loading = false;
      }
    },
    async fetchFieldData(fieldId) {
      try {
        this.loading = true;
        const response = await API.get(`Field/${fieldId}`);
        const field = response.data;
        this.field = {
          fieldId: field.fieldId,
          stadiumId: field.stadiumId,
          sportId: field.sportId || null,
          description: field.description || "",
          dayPrice: field.dayPrice || 0,
          nightPrice: field.nightPrice || 0,
          status: field.status || "Active",
          imageUrls: field.imageUrls || [],
        };
      } catch (error) {
        console.error("Error fetching field:", error);
        this.toast.error(
          `Failed to load field: ${
            error.response?.data?.message || error.message || "Unknown error"
          }`
        );
        this.$router.push("/stadium-manager");
      } finally {
        this.loading = false;
      }
    },
    async uploadImages(event) {
      const files = event.target.files;
      if (!files.length) return;

      this.loading = true;
      const newUrls = [];

      for (let file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "field-dnsport");

        try {
          const response = await fetch(
            "https://api.cloudinary.com/v1_1/defuxegan/image/upload",
            {
              method: "POST",
              body: formData,
            }
          );

          const data = await response.json();
          newUrls.push(data.secure_url);
          this.toast.success(`Image ${file.name} uploaded successfully`);
        } catch (error) {
          console.error("Error uploading image:", error);
          this.toast.error(`Failed to upload image ${file.name}`);
        }
      }

      this.loading = false;
    },
    async handleSubmit() {
      try {
        this.loading = true;

        const payload = {
          fieldId: this.isEditMode ? this.field.fieldId : undefined, // Optional
          stadiumId: this.field.stadiumId,
          sportId: this.field.sportId,
          description: this.field.description,
          dayPrice: this.field.dayPrice,
          nightPrice: this.field.nightPrice,
          status: this.field.status,
          imageUrls: this.field.imageUrls,
        };

        if (this.isEditMode) {
          // Gọi đúng endpoint PUT update
          await API.put("/Field/update", payload);
          this.toast.success("Field updated successfully!");
        } else {
          // Gọi đúng endpoint POST register
          await API.post("/Field/register", payload);
          this.toast.success("Field added successfully!");
        }

        this.$router.push("/stadium-manager");
      } catch (error) {
        console.error("Error saving field:", error);
        this.toast.error(
          `Failed to save field: ${
            error.response?.data?.message || error.message || "Unknown error"
          }`
        );
      } finally {
        this.loading = false;
      }
    },

    handleCancel() {
      this.$router.push("/stadium-manager");
    },
    handleStadiumSearch() {
      this.stadiumCurrentPage = 1;
    },
    clearStadiumSearch() {
      this.stadiumSearchQuery = "";
    },
    goToStadiumPage(page) {
      if (page < 1 || page > this.stadiumTotalPages || page === "...") return;
      this.stadiumCurrentPage = page;
    },
  },
  mounted() {
    this.initializeForm();
  },
};
</script>

<style scoped>
.field-register-container {
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

.form-label {
  font-weight: 500;
}

.loading-spinner {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}

.btn {
  border-radius: 6px;
}

.pagination .page-item.disabled .page-link {
  pointer-events: none;
  opacity: 0.5;
}
</style>
