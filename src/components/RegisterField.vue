<template>
  <div class="register-field-container">
    <h2 class="title">Register New Field</h2>
    <form @submit.prevent="registerField" class="form">
      <div class="form-group row">
        <label>Stadium:</label>
        <div class="select-input-container">
          <select v-model="field.stadiumId" required>
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

      <div class="form-group row">
        <label>Sport:</label>
        <div class="select-input-container">
          <select v-model="field.sportId" required>
            <option value="" disabled>Select a sport</option>
            <option v-for="sport in sports" :key="sport.id" :value="sport.id">
              {{ sport.name }}
            </option>
          </select>
        </div>
      </div>

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

      <div class="form-group">
        <label>Upload Images:</label>
        <input type="file" multiple @change="uploadImages" />
      </div>

      <button type="submit" class="submit-btn">Register</button>
    </form>
  </div>
</template>

<script>
import API from "@/utils/axios";

export default {
  data() {
    return {
      field: {
        stadiumId: null,
        stadiumName: "",
        sportId: null,
        sportName: "",
        description: "",
        dayPrice: 0,
        nightPrice: 0,
        status: "",
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
    updateStadiumName() {
      const selectedStadium = this.stadiums.find(
        (s) => s.id === this.field.stadiumId
      );
      this.field.stadiumName = selectedStadium ? selectedStadium.name : "";
    },
    updateSportName() {
      const selectedSport = this.sports.find(
        (s) => s.id === this.field.sportId
      );
      this.field.sportName = selectedSport ? selectedSport.name : "";
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
      this.field.imageUrls = uploadedUrls;
    },
    async registerField() {
      try {
        const requestBody = {
          stadiumId: this.field.stadiumId,
          sportId: this.field.sportId,
          description: this.field.description,
          dayPrice: this.field.dayPrice,
          nightPrice: this.field.nightPrice,
          status: this.field.status,
          imageUrls: this.field.imageUrls,
        };

        console.log("Request Payload:", requestBody);

        const response = await API.post("/Field/register", requestBody, {
          headers: { "Content-Type": "application/json" },
        });

        alert("Field registered successfully!");
        console.log("Response:", response.data);
      } catch (error) {
        console.error(
          "Error registering field:",
          error.response?.data || error.message
        );
        alert("Failed to register field.");
      }
    },
  },
  mounted() {
    this.fetchStadiums();
  },
};
</script>

<style>
.register-field-container {
  max-width: 500px;
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

.form-group.row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.select-input-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

label {
  font-weight: 600;
  margin-bottom: 5px;
  display: block;
}

input,
select,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  transition: all 0.3s ease;
}

input:focus,
select:focus,
textarea:focus {
  border-color: #28a745;
  outline: none;
  box-shadow: 0px 0px 5px rgba(40, 167, 69, 0.5);
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  background-color: #218838;
  box-shadow: 0px 3px 10px rgba(40, 167, 69, 0.3);
}

/* Responsive chỉnh đẹp hơn trên màn hình nhỏ */
@media (max-width: 600px) {
  .form-group.row {
    flex-direction: column;
  }
}
</style>
