<template>
  <div class="section">
    <div class="container section-title" data-aos="fade-up">
      <h2>Services</h2>
      <div>
        <span class="description-title">Choose Services</span>
      </div>
    </div>
    <div class="container mt-4">
      <div v-for="field in fields" :key="field.fieldId" class="mb-4">
        <h4 class="field-name">
          Sân: <strong>{{ field.fieldName }}</strong>
        </h4>
        <div
          v-for="slot in field.bookingSlots"
          :key="slot.time"
          class="card p-3 mb-2"
          @click="toggleSlot(field.fieldId, slot.time)"
        >
          <div class="d-flex justify-content-between align-items-center">
            <span class="slot-title">
              Thời gian: {{ slot.time }} - Giá: {{ formatCurrency(slot.price) }}
            </span>
            <span class="service-count"
              >({{ selectedServices[field.fieldId][slot.time].length }})</span
            >
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
                      :value="service.id"
                      v-model="selectedServices[field.fieldId][slot.time]"
                    />
                    {{ service.name }} - {{ formatCurrency(service.price) }}
                  </label>
                </li>
              </ul>
            </div>
            <div
              v-if="selectedServices[field.fieldId][slot.time].length"
              class="mt-2"
            >
              <strong>Dịch vụ đã chọn:</strong>
              <ul>
                <li
                  v-for="serviceId in selectedServices[field.fieldId][
                    slot.time
                  ]"
                  :key="serviceId"
                >
                  {{ getServiceName(serviceId) }} -
                  {{ formatCurrency(getServicePrice(serviceId)) }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <button class="btn btn-primary" @click="confirmSelection">
        Xác nhận
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        {
          fieldId: 1,
          fieldName: "Trung Vuong",
          bookingSlots: this.generateSlots(),
        },
        {
          fieldId: 2,
          fieldName: "Chi Lang",
          bookingSlots: this.generateSlots(),
        },
      ],
      services: [
        { id: 1, name: "Nước uống", price: 10000 },
        { id: 2, name: "Trọng tài", price: 50000 },
        { id: 3, name: "Bóng đá", price: 30000 },
      ],
      selectedServices: {},
      isDropdownOpen: {},
      collapsedSlots: {},
    };
  },
  created() {
    this.initializeSelectedServices();
    document.addEventListener("click", this.closeDropdowns);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.closeDropdowns);
  },
  methods: {
    generateSlots() {
      const slots = [];
      for (let hour = 8; hour <= 22; hour++) {
        slots.push({ time: `${hour}:00`, price: 60000 });
      }
      return slots;
    },
    initializeSelectedServices() {
      this.fields.forEach((field) => {
        this.selectedServices[field.fieldId] = {};
        this.isDropdownOpen[field.fieldId] = {};
        this.collapsedSlots[field.fieldId] = {};
        field.bookingSlots.forEach((slot) => {
          this.selectedServices[field.fieldId][slot.time] = [];
          this.isDropdownOpen[field.fieldId][slot.time] = false;
          this.collapsedSlots[field.fieldId][slot.time] = true;
        });
      });
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
    confirmSelection() {
      console.log("Dịch vụ đã chọn:", this.selectedServices);
    },
    getServiceName(serviceId) {
      const service = this.services.find((s) => s.id === serviceId);
      return service ? service.name : "";
    },
    getServicePrice(serviceId) {
      const service = this.services.find((s) => s.id === serviceId);
      return service ? service.price : 0;
    },
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
  font-size: 1.2em;
  font-weight: bold;
  color: #333;
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
