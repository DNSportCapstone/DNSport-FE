<script setup>
import { useI18n } from "vue-i18n";
import { ref, watchEffect } from "vue";

const { t } = useI18n();
const steps = ref([]);

watchEffect(() => {
  steps.value = [t("ChooseFields"), t("ConfirmInformation"), t("Payment")];
});
</script>
<template>
  <div class="section">
    <!-- Section Title -->
    <div class="container section-title" data-aos="fade-up">
      <h2>Booking</h2>
      <div>
        <span class="description-title">{{ t("PlanYourGameDay") }}</span>
      </div>
    </div>
    <!-- End Section Title -->

    <div class="booking-by-date">
      <ProgressSteps :currentStep="1" :steps="steps" />
      <div class="x_panel">
        <div class="x_content">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>{{ t("Field") }}</th>
                <th>{{ todayDate }}</th>
                <th>{{ t("Action") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="field in fields" :key="field.fieldId">
                <td>{{ field.fieldName }}</td>
                <td>
                  <SlotElement
                    v-for="(slot, index) in field.bookingSlots"
                    :key="index"
                    :time="slot.time"
                    :price="slot.price"
                    :duration="slot.duration"
                    :isBooked="slot.isBooked"
                  />
                </td>
                <td>
                  <button
                    class="btn btn-dns-primary"
                    @click="$router.push(`/field-details/${field.fieldId}`)"
                  >
                    {{ t("FieldDetails") }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <SlotsChoosen :slots="selectedSlots" />
  </div>
</template>
<script>
import API from "@/utils/axios";
import ProgressSteps from "@/components/ProgressSteps.vue";
import SlotElement from "@/components/SlotElement.vue";
import SlotsChoosen from "@/components/SlotsChoosen.vue";
// import CommonHelper from "@/utils/common";

export default {
  components: { ProgressSteps, SlotElement, SlotsChoosen },
  data() {
    return {
      fields: [],
      selectedSlots: [],
      todayDate: "",
    };
  },
  methods: {
    async fetchFields() {
      try {
        const response = await API.get(`Field/fields-by-stadium-id/${2}`);
        const today = "2025-02-24"; // Lấy ngày hôm nay (YYYY-MM-DD)
        this.fields = response.data.map((field) => {
          const allSlots = this.generateSlots(); // Tạo danh sách slot

          // **Lấy danh sách slot đã đặt trong ngày hôm nay**
          const bookedSlots = field.bookingFields
            .filter((b) => b.startTime?.split("T")[0] === today)
            .map((b) => this.formatTime(b.startTime));
          console.log(bookedSlots);
          // **Gán trạng thái đã đặt (isBooked)**
          const bookingSlots = allSlots.map((slot) => ({
            ...slot,
            isBooked: bookedSlots.includes(slot.time),
          }));
          console.log(bookingSlots);
          return {
            fieldId: field.fieldId,
            fieldName: field.description,
            bookingSlots, // Chứa cả slot đã đặt & chưa đặt
          };
        });
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sân:", error);
      }
    },
    formatTime(isoString) {
      const date = new Date(isoString);
      return date.toTimeString().slice(0, 5); // Lấy HH:mm
    },

    // **Hàm tạo danh sách slot**
    generateSlots() {
      const slots = [];
      const startHour = 0;
      const endHour = 23;
      const duration = 60;
      const pricePerSlot = 60000;

      for (let hour = startHour; hour <= endHour; hour++) {
        const time = `${hour.toString().padStart(2, "0")}:00`;
        slots.push({
          time,
          price: pricePerSlot,
          duration,
          isBooked: false, // Mặc định là chưa đặt
        });
      }
      return slots;
    },
  },
  async mounted() {
    await this.fetchFields();
    this.todayDate = new Date().toISOString();
  },
};
</script>
