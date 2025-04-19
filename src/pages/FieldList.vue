<template>
  <section class="field-list">
    <div class="header-section" data-aos="fade-up">
      <h1>Our Fields</h1>
      <p class="subtitle">Discover and book our premium sports fields</p>
    </div>

    <div class="fields-grid">
      <div
        v-for="field in fields"
        :key="field.id"
        class="field-card"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <div class="field-image">
          <img :src="field.imageUrl" :alt="field.name" />
          <div class="field-status" v-if="field.isOpen">Booking</div>
        </div>

        <div class="field-content">
          <h3>{{ field.name }}</h3>
          <div class="field-details">
            <div class="detail-item">
              <i class="bi bi-geo-alt"></i>
              <span>Location A</span>
            </div>
            <div class="detail-item">
              <i class="bi bi-clock"></i>
              <span>Open 6:00 - 22:00</span>
            </div>
          </div>

          <div class="field-actions">
            <button class="view-details-btn">View Details</button>
            <button class="book-now-btn">Booking</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import API from "@/utils/axios";

export default {
  data() {
    return {
      fields: [],
    };
  },
  methods: {
    async fetchFields() {
      try {
        const response = await API.get("/Field/get-all-fields");
        console.log("Fields:", response.data);
        this.fields = response.data.map((field) => ({
          id: field.id,
          name: field.name,
          imageUrl:
            field.imageUrls[0] ||
            "data:image/jpeg;base64,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", // Hình mặc định nếu thiếu
          isOpen: field.status === "Open",
        }));
      } catch (error) {
        console.error("Error fetching fields:", error);
      }
    },
    bookNow(id) {
      alert(`Booking field with ID: ${id}`);
    },
  },
  mounted() {
    this.fetchFields();
  },
};
</script>

<style scoped>
.field-list {
  padding: 4rem 2rem;
  background-color: #f8f9fa;
}

.header-section {
  text-align: center;
  margin-bottom: 3rem;
}

.header-section h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.subtitle {
  color: #6c757d;
  font-size: 1.1rem;
}

.fields-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.field-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.field-card:hover {
  transform: translateY(-5px);
}

.field-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.field-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.field-status {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: rgba(40, 167, 69, 0.9);
  color: white;
}

.field-content {
  padding: 1.5rem;
}

.field-content h3 {
  margin: 0 0 1rem;
  color: #2c3e50;
  font-size: 1.25rem;
}

.field-details {
  margin-bottom: 1.5rem;
}

.detail-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  color: #6c757d;
}

.detail-item i {
  margin-right: 0.5rem;
}

.field-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.view-details-btn,
.book-now-btn {
  padding: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  font-size: 0.9rem;
}

.view-details-btn {
  background: #f8f9fa;
  color: #2c3e50;
  border: 1px solid #dee2e6;
}

.view-details-btn:hover:not(.disabled) {
  background: #e9ecef;
}

.book-now-btn {
  background: #28a745;
  color: white;
}

.book-now-btn:hover:not(.disabled) {
  background: #218838;
}

.disabled {
  background-color: #6c757d !important;
  cursor: not-allowed;
  opacity: 0.7;
}

@media (max-width: 768px) {
  .field-list {
    padding: 2rem 1rem;
  }

  .header-section h1 {
    font-size: 2rem;
  }

  .fields-grid {
    grid-template-columns: 1fr;
  }
}
</style>
