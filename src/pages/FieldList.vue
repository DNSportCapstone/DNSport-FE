<template>
  <section id="team" class="team section">
    <div class="container section-title" data-aos="fade-up">
      <h2>Fields</h2>
      <div>
        <span>Check Our</span> <span class="description-title">Fields</span>
      </div>
    </div>

    <div class="container">
      <div class="row gy-5">
        <div
          v-for="field in fields"
          :key="field.id"
          class="col-lg-4 col-md-6"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div class="member">
            <div class="pic">
              <img :src="field.imageUrl" class="img-fluid" alt="Field Image" />
            </div>
            <div class="member-info">
              <h4>{{ field.name }}</h4>
              <span
                :class="
                  field.isOpen ? 'field-status-open' : 'field-status-closed'
                "
              >
                {{ field.isOpen ? "Open" : "Closed" }}
              </span>
              <button
                class="btn btn-dns-primary mt-2"
                @click="bookNow(field.id)"
              >
                Booking Now
              </button>
              <div class="social">
                <a href=""><i class="bi bi-twitter-x"></i></a>
                <a href=""><i class="bi bi-facebook"></i></a>
                <a href=""><i class="bi bi-instagram"></i></a>
                <a href=""><i class="bi bi-linkedin"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      fields: [],
    };
  },
  methods: {
    async fetchFields() {
      try {
        const response = await axios.get(
          "https://localhost:44394/api/Field/get-all-fields"
        );
        this.fields = response.data.map((field) => ({
          id: field.id,
          name: field.name,
          imageUrl: field.imageUrl || "https://via.placeholder.com/300", // Hình mặc định nếu thiếu
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

<style>
.field-status-open {
  color: green;
  font-weight: bold;
}

.field-status-closed {
  color: red;
  font-weight: bold;
}
</style>
