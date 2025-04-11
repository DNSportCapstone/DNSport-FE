<template>
  <div class="selected-slots-tab" :class="{ open: isTabOpen }">
    <div class="tab-header" @click="toggleTab">
      <span class="slot-count">{{ totalSlots }}</span>
      <span>Selected Slots</span>
      <span>
        <font-awesome-icon
          class="tab-close"
          v-show="isTabOpen"
          :icon="['fas', 'xmark']"
        />
      </span>
    </div>
    <div class="tab-content" v-if="isTabOpen">
      <div v-for="field in multipleBookingModel" :key="field.fieldId">
        <h3>{{ field.fieldName }}</h3>
        <div
          v-for="(slot, index) in field.selectedSlots"
          :key="index"
          class="slot-selected-item"
        >
          {{ slot.time }}
        </div>
      </div>

      <div v-if="totalSlots === 0" class="no-slot">
        No slots have been selected yet
      </div>

      <div class="component-calendar-cart pt-2">
        <div class="cart-info">
          <div class="slot-added">
            Choosed: <span class="count-added">{{ totalSlots }}</span> Slot(s)
          </div>
          <div class="cart-total">
            Total Price:
            <span>{{ formatCurrency(totalPrice) }}</span>
          </div>
        </div>
        <div>
          <button class="btn-dns-primary" @click="goToServicePage">
            Continue
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "@/assets/css/choose-slots-tab.css";
import CommonHelper from "@/utils/common";

export default {
  props: {
    multipleBookingModel: {
      type: Array,
      required: true,
    },
  },
  computed: {
    totalSlots() {
      return this.multipleBookingModel.reduce(
        (sum, field) => sum + field.selectedSlots.length,
        0
      );
    },
    totalPrice() {
      return this.multipleBookingModel.reduce(
        (sum, field) =>
          sum + field.selectedSlots.reduce((s, slot) => s + slot.price, 0),
        0
      );
    },
  },
  data() {
    return {
      isTabOpen: false,
    };
  },
  methods: {
    toggleTab() {
      this.isTabOpen = !this.isTabOpen;
    },
    formatCurrency(number) {
      return CommonHelper.formatVND(number);
    },
    goToServicePage() {
      this.$emit("goToServicePage");
    },
  },
};
</script>
