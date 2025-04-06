<template>
  <div class="update-field-container">
    <h2 class="title">Update Field</h2>
    <form @submit.prevent="updateField" class="form">
      <div class="form-group row">
        <label>Stadium:</label>
        <div class="select-input-container">
          <select
            v-model="selectedStadiumId"
            @change="fetchFieldsByStadium"
            required
          >
            <option value="" disabled>Select a stadium</option>
            <option
              v-for="stadium in stadiums"
              :key="stadium.id"
              :value="stadium.id"
            >
              {{ stadium.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="form-group row" v-if="fields.length">
        <label>Field:</label>
        <div class="select-input-container">
          <select
            v-model="selectedFieldId"
            @change="fetchFieldDetails"
            required
          >
            <option value="" disabled>Select a field</option>
            <option
              v-for="field in fields"
              :key="field.fieldId"
              :value="field.fieldId"
            >
              {{ field.description }}
            </option>
          </select>
        </div>
      </div>

      <div v-if="field && field.fieldId">
        <div class="form-group">
          <label>Description:</label>
          <input v-model="field.description" type="text" required />
        </div>

        <div class="form-group">
          <label>Day Price:</label>
          <input v-model.number="field.dayPrice" type="number" required />
        </div>

        <div class="form-group">
          <label>Night Price:</label>
          <input v-model.number="field.nightPrice" type="number" required />
        </div>

        <div class="form-group">
          <label>Status:</label>
          <input v-model="field.status" type="text" required />
        </div>

        <div
          class="form-group"
          v-if="field.imageUrls && field.imageUrls.length"
        >
          <label>Current Images:</label>
          <div class="image-preview">
            <img
              v-for="(url, index) in field.imageUrls"
              :key="index"
              :src="url"
              alt="Field Image"
            />
          </div>
        </div>

        <div class="form-group">
          <label>Upload New Images:</label>
          <input type="file" multiple @change="uploadImages" />
        </div>

        <button type="submit" class="submit-btn">Update</button>
      </div>
    </form>
  </div>
</template>

<script>
import API from "@/utils/axios";

export default {
  data() {
    return {
      selectedStadiumId: null,
      selectedFieldId: null,
      field: {},
      stadiums: [],
      fields: [],
    };
  },
  methods: {
    async fetchStadiums() {
      try {
        const response = await API.get("/Stadium");
        this.stadiums = response.data.map((s) => ({
          id: s.stadiumId,
          name: s.stadiumName,
        }));
      } catch (error) {
        console.error("Error fetching stadiums:", error);
      }
    },
    async fetchFieldsByStadium() {
      if (!this.selectedStadiumId) return;
      try {
        const response = await API.get(
          `/Field/fields-by-stadium-id/${this.selectedStadiumId}`
        );
        this.fields = response.data;
        this.selectedFieldId = null;
        this.field = {};
      } catch (error) {
        console.error("Error fetching fields:", error);
      }
    },
    async fetchFieldDetails() {
      if (!this.selectedFieldId) return;
      try {
        const response = await API.get(`/Field/${this.selectedFieldId}`);
        this.field = response.data;
      } catch (error) {
        console.error("Error fetching field details:", error);
      }
    },
    async uploadImages(event) {
      const files = event.target.files;
      const uploadedUrls = [];

      for (let file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "field-dnsport");

        try {
          const response = await API.post(
            "https://api.cloudinary.com/v1_1/defuxegan/image/upload",
            formData
          );
          uploadedUrls.push(response.data.secure_url);
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
      if (uploadedUrls.length > 0) {
        this.field.imageUrls = uploadedUrls;
      }
    },
    async updateField() {
      if (!this.field || !this.field.fieldId) {
        console.error("Invalid field data!");
        return;
      }
      try {
        await API.put(
          "/Field/update",
          { ...this.field, imageUrls: this.field.imageUrls || [] },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        alert("Field updated successfully!");
      } catch (error) {
        console.error("Error updating field:", error);
        alert("Failed to update field.");
      }
    },
  },
  mounted() {
    this.fetchStadiums();
  },
};
</script>

<style>
.update-field-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  font-weight: 600;
  margin-bottom: 5px;
  display: block;
}

input,
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
}

.image-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.image-preview img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 18px;
}

.submit-btn:hover {
  background-color: #0056b3;
}
</style>
