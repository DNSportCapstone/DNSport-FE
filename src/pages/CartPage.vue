<template>
  <div class="app-container">
    <!-- Danh sách các slot sân -->
    <div class="slot-list">
      <h3>Danh sách các sân</h3>
      <div
        v-for="(slot, index) in slots"
        :key="index"
        class="slot-item"
        @click="toggleSlot(slot)"
        :class="{ selected: selectedSlots.includes(slot) }"
      >
        {{ slot }}
      </div>
    </div>

    <!-- Tab slot đã chọn -->
    <div
      class="selected-slots-tab"
      :class="{ open: isTabOpen }"
      style="z-index: 9999"
    >
      <div class="tab-header" @click="toggleTab">
        <span>{{ isTabOpen ? "Đóng" : "Slot đã chọn" }}</span>
        <span v-if="selectedSlots.length" class="slot-count">{{
          selectedSlots.length
        }}</span>
      </div>
      <div class="tab-content" v-if="isTabOpen">
        <div
          v-for="(slot, index) in selectedSlots"
          :key="index"
          class="slot-selected-item"
        >
          {{ slot }}
        </div>
        <div v-if="!selectedSlots.length" class="no-slot">
          Chưa có slot nào được chọn
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slots: ["Sân 1 - 8:00 AM", "Sân 2 - 9:00 AM", "Sân 3 - 10:00 AM"], // Danh sách các slot
      selectedSlots: [], // Slot đã chọn
      isTabOpen: false, // Trạng thái tab mở/đóng
    };
  },
  methods: {
    toggleSlot(slot) {
      // Thêm hoặc xóa slot khỏi danh sách đã chọn
      if (this.selectedSlots.includes(slot)) {
        this.selectedSlots = this.selectedSlots.filter((s) => s !== slot);
      } else {
        this.selectedSlots.push(slot);
      }
    },
    toggleTab() {
      this.isTabOpen = !this.isTabOpen; // Mở hoặc đóng tab
    },
  },
};
</script>

<style scoped>
/* Layout chính */
.app-container {
  display: flex;
  padding: 20px;
}

/* Danh sách slot */
.slot-list {
  width: 70%;
}

.slot-item {
  padding: 10px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.slot-item.selected {
  background-color: #4caf50;
  color: white;
}

/* Tab slot đã chọn */
.selected-slots-tab {
  position: fixed;
  bottom: 60px;
  right: 20px;
  width: 300px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, opacity 0.3s ease;
  opacity: 0.95;
}

.selected-slots-tab.open {
  transform: translateY(0);
}

.selected-slots-tab .tab-header {
  padding: 10px;
  background: #4caf50;
  color: white;
  text-align: center;
  cursor: pointer;
  font-weight: bold;
  position: relative;
}

.selected-slots-tab .tab-header .slot-count {
  position: absolute;
  top: 5px;
  right: 10px;
  background: red;
  color: white;
  border-radius: 50%;
  padding: 5px 8px;
  font-size: 12px;
  font-weight: bold;
}

.selected-slots-tab .tab-content {
  max-height: 200px;
  overflow-y: auto;
  padding: 10px;
}

.slot-selected-item {
  padding: 5px;
  margin-bottom: 5px;
  border-bottom: 1px solid #ddd;
}

.no-slot {
  text-align: center;
  color: #888;
  font-style: italic;
}

/* Thu nhỏ tab khi đóng */
.selected-slots-tab:not(.open) {
  transform: translateY(80%);
  opacity: 0.8;
  cursor: pointer;
}
</style>
