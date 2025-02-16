<template>
  <!-- Tab slot đã chọn -->
  <div class="selected-slots-tab" :class="{ open: isTabOpen }">
    <div class="tab-header" @click="toggleTab">
      <span class="slot-count">{{ this.slots.length }}</span>
      <span>Slot đã chọn</span>
      <span
        ><font-awesome-icon
          class="tab-close"
          v-show="isTabOpen"
          :icon="['fas', 'xmark']"
      /></span>
    </div>
    <div class="tab-content" v-if="isTabOpen">
      <div
        v-for="(slot, index) in this.slots"
        :key="index"
        class="slot-selected-item"
      >
        {{ slot.time }}
      </div>
      <div v-if="!this.slots.length" class="no-slot">
        Chưa có slot nào được chọn
      </div>
      <div class="component-calendar-cart pt-2">
        <div class="cart-info">
          <div class="slot-added">
            Choosed: <span class="count-added">5</span> Slot(s)
          </div>
          <div class="cart-total">
            Total Price:
            <span>{{ formatCurrency(3000000) }}</span>
          </div>
        </div>
        <div>
          <button class="btn-dns-primary">Booking</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "@/assets/css/choose-slots-tab.css";
/* import JS functions */
import { formatVND } from "@/assets/scripts/common";

export default {
  props: {
    slots: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isTabOpen: false, // Trạng thái tab mở/đóng
    };
  },
  methods: {
    toggleTab() {
      this.isTabOpen = !this.isTabOpen; // Mở hoặc đóng tab
    },
    formatCurrency(number) {
      return formatVND(number);
    },
  },
};
</script>
