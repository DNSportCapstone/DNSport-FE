<template>
  <div class="section">
    <div class="container section-title" data-aos="fade-up">
      <h2>Services</h2>
      <div>
        <span class="description-title">Choose Services</span>
      </div>
    </div>
    <div class="container">
      <div class="booking-by-date right_col layout-full" role="main">
        <ProgressSteps :currentStep="2" :steps="steps" />
      </div>
    </div>

    <div class="container mt-4">
      <div
        v-for="field in multipleBookingModel"
        :key="field.fieldId"
        class="mb-4"
      >
        <h4 class="field-name">
          Sân: <strong>{{ field.fieldName }}</strong>
        </h4>
        <div
          v-for="slot in field.selectedSlots"
          :key="slot.time"
          class="card p-3 mb-2"
          @click="toggleSlot(field.fieldId, slot.time)"
        >
          <div class="d-flex justify-content-between align-items-center">
            <span class="slot-title">
              Thời gian: {{ slot.time }} - Giá: {{ formatCurrency(slot.price) }}
            </span>
            <span class="service-count">
              ({{ slot.services?.length || 0 }})
            </span>
            <font-awesome-icon
              :icon="
                collapsedSlots[field.fieldId][slot.time]
                  ? ['fas', 'chevron-left']
                  : ['fas', 'chevron-down']
              "
              class="ml-auto"
            />
          </div>
          <div v-if="!collapsedSlots[field.fieldId][slot.time]">
            <div class="position-relative">
              <button
                class="btn btn-dns-primary"
                type="button"
                @click.stop="toggleDropdown(field.fieldId, slot.time)"
              >
                Chọn dịch vụ
              </button>
              <ul
                class="dropdown-menu show position-absolute dropdown-outline btn-dns-secondary"
                v-if="isDropdownOpen[field.fieldId][slot.time]"
                @click.stop
              >
                <li v-for="service in services" :key="service.id">
                  <label class="dropdown-item">
                    <input
                      type="checkbox"
                      :value="service"
                      v-model="slot.services"
                      @click="handleChooseService()"
                    />
                    {{ service.name }} - {{ formatCurrency(service.price) }}
                  </label>
                </li>
              </ul>
            </div>
            <div v-if="slot.services?.length" class="mt-2">
              <strong>Dịch vụ đã chọn:</strong>
              <ul>
                <li v-for="service in slot.services" :key="service.id">
                  {{ service.name }} -
                  {{ formatCurrency(service.price) }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <button class="btn btn-primary" @click="goToCheckout">Continue</button>
    </div>
  </div>
</template>
<script setup>
import { useI18n } from "vue-i18n";
import { ref, watchEffect } from "vue";
const { t } = useI18n();
const steps = ref([]);

watchEffect(() => {
  steps.value = [
    t("ChooseFields"),
    t("ChooseServices"),
    t("ConfirmInformation"),
    t("Payment"),
  ];
});
</script>
<script>
import ProgressSteps from "@/components/ProgressSteps.vue";

export default {
  components: { ProgressSteps },
  data() {
    return {
      multipleBookingModel: [],
      services: [
        { id: 1, name: "Nước uống", price: 10000 },
        { id: 2, name: "Trọng tài", price: 50000 },
        { id: 3, name: "Bóng đá", price: 30000 },
      ],
      isDropdownOpen: {},
      collapsedSlots: {},
    };
  },
  created() {
    document.addEventListener("click", this.closeDropdowns);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.closeDropdowns);
  },
  methods: {
    fetchFields() {
      this.multipleBookingModel = this.$store.getters.multipleBookingModel;
      if (this.multipleBookingModel.length == 0) {
        this.$router.push({
          path: "/booking-by-date",
        });
      }
    },
    initializeSelectedServices() {
      this.isDropdownOpen = {};
      this.collapsedSlots = {};
      if (this.multipleBookingModel) {
        this.multipleBookingModel.forEach((field) => {
          this.isDropdownOpen[field.fieldId] = {};
          this.collapsedSlots[field.fieldId] = {};
          field.selectedSlots.forEach((slot) => {
            slot.services = [];
            this.isDropdownOpen[field.fieldId][slot.time] = false;
            this.collapsedSlots[field.fieldId][slot.time] = true;
          });
        });
      }
    },
    formatCurrency(number) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(number);
    },
    toggleDropdown(fieldId, time) {
      this.isDropdownOpen[fieldId][time] = !this.isDropdownOpen[fieldId][time];
    },
    closeDropdowns() {
      Object.keys(this.isDropdownOpen).forEach((fieldId) => {
        Object.keys(this.isDropdownOpen[fieldId]).forEach((time) => {
          this.isDropdownOpen[fieldId][time] = false;
        });
      });
    },
    toggleSlot(fieldId, time) {
      this.collapsedSlots[fieldId][time] = !this.collapsedSlots[fieldId][time];
    },
    goToCheckout() {
      this.$router.push({
        path: "/checkout",
      });
    },
    handleChooseService() {
      this.$store.dispatch(
        "setMultipleBookingModel",
        this.multipleBookingModel
      );
    },
  },
  async mounted() {
    this.fetchFields();
    this.initializeSelectedServices();
    this.todayDate = new Date().toISOString();
  },
};
</script>

<style scoped>
.container {
  max-width: 1000px;
}
.card {
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
}
.dropdown-menu {
  display: block;
  position: absolute;
  z-index: 1000;
  border: 1px solid #006400;
  background-color: white;
  color: black;
  padding: 10px;
}
.dropdown-border {
  border: 2px solid #006400;
  border-radius: 5px;
}
.slot-title {
  font-weight: bold;
}
.field-name {
  font-size: 30px;
  font-weight: 500;
  line-height: 25px;
  padding: 15px 20px;
  background: color-mix(in srgb, var(--accent-color), transparent 95%);
  color: var(--accent-color);
  border-radius: 20px;
  display: inline-block;
}
.service-count {
  margin-left: 10px;
  font-weight: bold;
}
.field-name {
  font-size: 30px;
  font-weight: 500;
  line-height: 25px;
  padding: 15px 20px;
  background: color-mix(in srgb, var(--accent-color), transparent 95%);
  color: var(--accent-color);
  border-radius: 20px;
  display: inline-block;
}
</style>
