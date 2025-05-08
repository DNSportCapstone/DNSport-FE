<template>
  <div class="field-on-stadium container py-5">
    <h1 class="text-center text-primary mb-5">
      {{ t("field_on_stadium.title") }}
      <span class="text-dark">{{ stadiumName }}</span>
    </h1>

    <div v-if="!isLoaded" class="text-center text-muted">
      <p class="mt-3"></p>
    </div>
    <div v-else>
      <div v-if="fields && fields.length > 0" class="row g-4">
        <!-- Hiển thị danh sách fields -->
        <div
          v-for="field in fields"
          :key="field.fieldId"
          class="col-md-4 col-lg-3"
        >
          <div class="card field-card h-100">
            <img
              :src="field.thumbnail || defaultImage"
              alt="Ảnh sân"
              class="card-img-top"
            />
            <div class="card-body d-flex flex-column">
              <h5 class="card-title text-primary">{{ field.fieldName }}</h5>
              <!-- <p class="card-text text-muted mb-1">
                {{
                  t("field_on_stadium.field.maximum_people", {
                    count: field.maximumPeople,
                  })
                }}
              </p> -->
              <p class="card-text text-muted mb-1">
                {{
                  t("field_on_stadium.field.day_price", {
                    price: formatCurrency(field.dayPrice),
                  })
                }}
              </p>
              <p class="card-text text-muted mb-3">
                {{
                  t("field_on_stadium.field.night_price", {
                    price: formatCurrency(field.nightPrice),
                  })
                }}
              </p>
              <div class="stadium-actions mt-auto">
                <button
                  class="view-details-btn"
                  @click="navigateToFieldDetail(field.fieldId)"
                >
                  {{ t("field_on_stadium.field.view_details") }}
                </button>
                <button class="book-now-btn" @click="bookNow(field.fieldId)">
                  {{ t("field_on_stadium.field.book_now") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center text-muted">
        <i class="bi bi-emoji-frown display-1"></i>
        <p class="mt-3">{{ t("field_on_stadium.no_fields") }}</p>
      </div>
    </div>
  </div>

  <div style="margin-bottom: 54px"></div>
</template>

<script>
import API from "@/utils/axios";
import { useI18n } from "vue-i18n";

export default {
  name: "FieldOnStadium",
  setup() {
    const { t, locale } = useI18n();
    return { t, locale };
  },
  data() {
    return {
      fields: [],
      stadiumName: "",
      isLoaded: false,
      defaultImage:
        "data:image/jpeg;base64,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",
    };
  },
  mounted() {
    this.loadFields();
  },
  methods: {
    formatCurrency(amount, locale = "vi-VN") {
      const formatter = new Intl.NumberFormat(locale, {
        style: "decimal",
        minimumFractionDigits: 0,
      });
      return formatter.format(amount) + " VND";
    },
    async loadFields() {
      try {
        const stadiumId = this.$route.params.stadiumId;
        this.stadiumName =
          this.$route.query.stadiumName ||
          this.t("field_on_stadium.unknown_stadium");

        const response = await API.get(
          `/Field/active-fields-by-stadium-id/${stadiumId}`
        );
        this.fields = response.data;
      } catch (err) {
        console.error("Error loading fields:", err);
      } finally {
        this.isLoaded = true;
      }
    },
    navigateToFieldDetail(fieldId) {
      this.$router.push({
        name: "field-details",
        params: { fieldId: fieldId },
      });
    },
    bookNow(id) {
      this.$router.push({
        name: "booking-schedule",
        params: { fieldId: id },
      });
    },
  },
};
</script>

<style scoped>
/* Container Styles */
.field-on-stadium {
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Title Styles */
h1 {
  font-size: 28px;
  font-weight: bold;
}

/* Card Styles */
.field-card {
  border: none;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.field-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.card-img-top {
  height: 200px;
  object-fit: cover;
}

.card-title {
  font-size: 18px;
  font-weight: bold;
}

.card-text {
  font-size: 14px;
  color: #6c757d;
}

.btn-primary {
  background-color: #007bff;
  border: none;
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #0056b3;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .field-card {
    margin-bottom: 20px;
  }
}
.stadium-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: auto;
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

.view-details-btn:hover {
  background: #e9ecef;
}

.book-now-btn {
  background: #28a745;
  color: white;
}

.book-now-btn:hover {
  background: #218838;
}

.card-title {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}
</style>
