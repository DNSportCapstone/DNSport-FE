<template>
  <div class="section">
    <!-- Section Title -->
    <div class="container section-title" data-aos="fade-up">
      <h2>Booking</h2>
      <div>
        <span class="description-title">{{ t("PlanYourGameDay") }}</span>
      </div>
    </div>

    <!-- Booking Table View + Recurring Form -->
    <div class="booking-container">
      <div class="booking-by-date right_col layout-full" role="main">
        <ProgressSteps :currentStep="1" :steps="steps" />
        <div class="row">
          <!-- Hình ảnh sân bóng -->
          <div class="col-md-6 mb-4">
            <img
              :src="selectedImage"
              alt="Field"
              class="img-fluid rounded mb-3 product-image"
            />
            <div class="d-flex">
              <img
                v-for="(image, index) in field.images"
                :key="index"
                :src="image"
                :alt="'Thumbnail ' + (index + 1)"
                class="thumbnail rounded"
                :class="{ active: selectedImage === image }"
                @click="changeImage(image, true)"
              />
            </div>
          </div>

          <!-- Thông tin sân bóng -->
          <div class="col-md-6">
            <h2 class="mb-3">{{ field.name }}</h2>
            <p class="text-muted mb-4">{{ field.stadiumName }}</p>
            <div class="mb-3">
              <span class="h4 me-2"
                >{{ CommonHelper.formatVND(field.price) }} /giờ</span
              >
            </div>
            <div class="mt-4">
              <h5>Thông tin sân:</h5>
              <ul>
                <li>{{ field.description }}</li>
                <li>{{ field.address }}</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="x_panel">
            <div class="x_content">
              <div class="row">
                <div class="col-sm-12 col-xs-12">
                  <div id="calendar-view">
                    <div class="card component-calendar">
                      <!-- Header -->
                      <!-- <div class="card-header component-calendar-header">
                        <div class="component-calendar-date text-center">
                          <a
                            class="btn btn-default btn-light simplecalendar-navigation pull-left"
                            href="#"
                          >
                            {{ $t("Today") }}
                          </a>

                          <div class="component-calendar-dateswitcher">
                            <div class="btn-group">
                              <a
                                class="btn btn-light simplecalendar-navigation"
                                href="javascript:;"
                              >
                                <img
                                  src="https://manager.datsan247.com/images/arrow-left.svg"
                                />
                              </a>
                              <span class="simplecalendar-title">{{
                                todayDate
                              }}</span>
                              <a
                                class="btn btn-light simplecalendar-navigation"
                                href="javascript:;"
                              >
                                <img
                                  src="https://manager.datsan247.com/images/arrow-right.svg"
                                />
                              </a>
                            </div>
                          </div>
                          <div
                            class="component-calendar-viewswitcher btn-group pull-right"
                          >
                            <a class="btn btn-secondary">Tuần</a>
                            <a class="btn btn-secondary active">Ngày</a>
                          </div>
                        </div>
                      </div> -->

                      <!-- Calendar Table -->
                      <div class="component-calendar-widget-body day">
                        <div class="simplebar-content">
                          <table
                            class="table table-bordered table-hover simplecalendar simplecalendar-table"
                          >
                            <thead>
                              <tr>
                                <th class="th-booking-fields th-field">
                                  {{ t("Field") }}
                                </th>
                                <th class="th-booking-fields">Slots</th>
                                <th class="th-booking-fields th-action">
                                  {{ t("Action") }}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td colspan="8" style="border: 0; padding: 0">
                                  <table
                                    class="table table-bordered table-hover m-0"
                                  >
                                    <tbody>
                                      <tr
                                        v-for="(field, index) in fields"
                                        :key="index"
                                      >
                                        <td class="td-booking-fields">
                                          <strong>{{ field.fieldName }}</strong>
                                        </td>
                                        <td>
                                          <SlotElement
                                            v-for="(
                                              slot, index
                                            ) in field.bookingSlots"
                                            :key="index"
                                            :time="slot.time"
                                            :price="slot.price"
                                            :duration="slot.duration"
                                            :isBooked="slot.isBooked"
                                            :fieldId="field.fieldId"
                                            :fieldName="field.fieldName"
                                            @slotSelected="handleSlotSelected"
                                          />
                                        </td>
                                        <td class="td-booking-fields">
                                          <button
                                            class="btn btn-dns-primary"
                                            @click="
                                              $router.push(
                                                `/field-details/${field.fieldId}`
                                              )
                                            "
                                          >
                                            {{ t("FieldDetails") }}
                                          </button>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="container mt-4">
          <h5>Đặt lịch định kỳ</h5>
          <form class="row g-3" @submit.prevent="submitRecurringBooking">
            <div class="col-md-3">
              <label class="form-label">Ngày bắt đầu</label>
              <input
                type="date"
                class="form-control"
                v-model="recurring.startDate"
                required
              />
            </div>
            <div class="col-md-2">
              <label class="form-label">Lặp vào</label>
              <select class="form-select" v-model="recurring.weekday">
                <option v-for="(day, i) in weekdays" :key="i" :value="i">
                  {{ day }}
                </option>
              </select>
            </div>

            <div class="col-md-2">
              <label class="form-label">Số tuần lặp</label>
              <input
                type="number"
                class="form-control"
                v-model="recurring.repeatWeeks"
                min="1"
                required
              />
            </div>
            <div class="col-md-3">
              <label class="form-label">Dịch vụ</label>
              <div class="form-check" v-for="s in services" :key="s.id">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :id="'service-' + s.id"
                  :value="s.id"
                  v-model="recurring.serviceIds"
                />
                <label class="form-check-label" :for="'service-' + s.id">
                  {{ s.name }}
                </label>
              </div>
            </div>
            <div class="col-md-1 d-flex align-items-end">
              <h5>
                Tổng tiền:
                <strong>{{ totalPrice.toLocaleString("vi-VN") }}₫</strong>
              </h5>
            </div>

            <div class="col-md-1 d-flex align-items-end">
              <button class="btn btn-primary w-100" type="submit">
                Checkout
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { ref, watchEffect } from "vue";
const { t } = useI18n();
const steps = ref([]);

watchEffect(() => {
  steps.value = [t("ChooseFields"), t("Payment")];
});
</script>
<script>
import SlotElement from "@/components/SlotElement.vue";
import ProgressSteps from "@/components/ProgressSteps.vue";
import API from "@/utils/axios";
import CommonHelper from "@/utils/common";
import { showMessageBox } from "@/utils/message-box-service.js";

export default {
  components: { ProgressSteps, SlotElement },
  props: ["fieldId"],
  data() {
    return {
      fields: [],
      multipleBookingModel: [],
      todayDate: "",
      recurring: {
        startDate: "",
        weekday: 0,
        repeatWeeks: 1,
        serviceIds: [],
        fieldId: null,
        selectedSlots: [],
        userId: null,
      },
      weekdays: [
        "Chủ nhật",
        "Thứ 2",
        "Thứ 3",
        "Thứ 4",
        "Thứ 5",
        "Thứ 6",
        "Thứ 7",
      ],
      services: [],
      field: {},
      fetchedField: {},
    };
  },
  computed: {
    totalPrice() {
      let total = 0;
      const repeatWeeks = this.recurring.repeatWeeks || 1;

      for (const field of this.multipleBookingModel) {
        const slotTotal = field.selectedSlots.reduce(
          (sum, slot) => sum + slot.price,
          0
        );

        const serviceTotal = (this.recurring.serviceIds || []).reduce(
          (sum, id) => {
            const service = this.services.find((s) => s.id === id);
            return sum + (service?.price || 0);
          },
          0
        );

        total += (slotTotal + serviceTotal) * repeatWeeks;
      }

      return total;
    },
  },
  methods: {
    async fetchField() {
      const response = await API.get(`field/${5}`);
      const field = response.data;

      const today = this.todayDate.split("T")[0];
      const allSlots = this.generateSlots();
      const bookedSlots = field.bookingFields
        .filter((b) => b.startTime?.split("T")[0] === today)
        .map((b) => this.formatTime(b.startTime));

      const bookingSlots = allSlots.map((slot) => ({
        ...slot,
        isBooked: bookedSlots.includes(slot.time),
      }));

      this.field = {
        name: `Sân ${field.sport.sportName}`,
        stadiumName: field.stadium.stadiumName,
        address: field.stadium.address,
        price: field.dayPrice,
        description: field.description,
        images: field.images.map((img) => img.url),
      };
      this.selectedImage = this.field.images[0];
      this.startSlideshow();

      this.fields = [
        {
          fieldId: field.fieldId,
          fieldName: field.description,
          bookingSlots,
        },
      ];

      this.fetchedField = field;
    },
    handleSlotSelected(slot) {
      const { fieldId, fieldName, isChoose, time } = slot;
      slot.date = this.todayDate;

      let field = this.multipleBookingModel.find((f) => f.fieldId === fieldId);
      if (!field) {
        this.multipleBookingModel.push({
          fieldId,
          fieldName,
          userId: CommonHelper.getCurrentUserId(),
          selectedSlots: [],
          serviceIds: this.recurring.serviceIds,
        });
        field = this.multipleBookingModel.find((f) => f.fieldId === fieldId);
      }

      if (isChoose) {
        field.selectedSlots.push(slot);
      } else {
        field.selectedSlots = field.selectedSlots.filter(
          (s) => s.time !== time
        );
        if (field.selectedSlots.length === 0) {
          this.multipleBookingModel = this.multipleBookingModel.filter(
            (f) => f.fieldId !== fieldId
          );
        }
      }

      this.multipleBookingModel = this.multipleBookingModel.map((field) => ({
        ...field,
        selectedSlots: field.selectedSlots.sort(
          (a, b) =>
            this.convertTimeToMinutes(a.time) -
            this.convertTimeToMinutes(b.time)
        ),
      }));

      this.$store.dispatch(
        "setMultipleBookingModel",
        this.multipleBookingModel
      );
    },
    formatTime(isoString) {
      const date = new Date(isoString);
      return date.toTimeString().slice(0, 5);
    },
    convertTimeToMinutes(time) {
      const [hours, minutes] = time.split(":").map(Number);
      return hours * 60 + minutes;
    },
    generateSlots() {
      const slots = [];
      const startHour = 0;
      const endHour = 23;
      const duration = 60;
      const pricePerSlot = 60000;

      for (let hour = startHour; hour <= endHour; hour++) {
        const time = `${hour.toString().padStart(2, "0")}:00`;
        slots.push({ time, price: pricePerSlot, duration, isBooked: false });
      }
      return slots;
    },
    goToServicePage() {
      this.$router.push({ name: "booking-services" });
    },
    async submitRecurringBooking() {
      this.recurring.fieldId = this.multipleBookingModel[0].fieldId;
      this.recurring.selectedSlots = this.multipleBookingModel[0].selectedSlots;
      this.recurring.userId = this.multipleBookingModel[0].userId;
      await this.createBooking(this.recurring);
    },
    fetchServices() {
      if (this.fetchedField?.services) {
        this.services = this.fetchedField.services.map((s) => ({
          id: s.serviceId,
          name: s.name,
          price: s.price,
        }));
      } else {
        this.services = [
          { id: 1, name: "Nước uống", price: 10000 },
          { id: 2, name: "Trọng tài", price: 50000 },
          { id: 3, name: "Bóng đá", price: 30000 },
        ];
      }
    },
    changeImage(image, manual = false) {
      this.selectedImage = image;
      this.currentIndex = this.field.images.indexOf(image);
      if (manual) {
        this.restartSlideshow();
      }
    },
    nextImage() {
      this.currentIndex = (this.currentIndex + 1) % this.field.images.length;
      this.selectedImage = this.field.images[this.currentIndex];
    },
    startSlideshow() {
      if (this.intervalId) clearInterval(this.intervalId);
      this.intervalId = setInterval(this.nextImage, 3000); // Tự động đổi ảnh sau 3 giây
    },
    restartSlideshow() {
      clearInterval(this.intervalId);
      this.startSlideshow();
    },
    bookField() {
      alert(`Bạn đã đặt sân ${this.field.name} thành công!`);
    },
    async createBooking(request) {
      try {
        const response = await API.post(`booking/recurring`, request);
        if (response.data.isSuccess) {
          this.handlePayment(response.data.bookingId);
        } else {
          showMessageBox({
            title: "Warning",
            description: "Booking failed!",
            type: "warning",
            showCancel: false,
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    async handlePayment(bookingId) {
      try {
        const response = await API.post(
          `payment/payment-url/recurring-booking`,
          {
            bookingId: bookingId,
          }
        );
        window.location.href = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
  async mounted() {
    await this.fetchField();
    this.fetchServices();
  },
  beforeUnmount() {
    clearInterval(this.intervalId);
  },
};
</script>
<style scoped>
.booking-by-date {
  width: 100%;
}
.td-booking-fields {
  vertical-align: middle;
  text-align: center;
  width: 10%;
}
.th-booking-fields {
  vertical-align: middle;
  text-align: center;
}
.th-field {
  width: 10%;
}
.th-action {
  width: 10%;
}
.thumbnail {
  width: 80px;
  height: 60px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}
.thumbnail:hover,
.thumbnail.active {
  border: 2px solid #0dd70d;
}
.product-image {
  width: 100% !important;
}
</style>
