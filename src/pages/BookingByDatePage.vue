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

    <div class="booking-container">
      <div class="booking-by-date right_col layout-full" role="main">
        <ProgressSteps :currentStep="1" :steps="steps" />
        <div class="row">
          <div class="x_panel">
            <div class="x_content">
              <div class="row">
                <div class="col-sm-12 col-xs-12">
                  <div id="calendar-view">
                    <div class="card component-calendar">
                      <div class="card-header component-calendar-header">
                        <div
                          class="component-calendar-date align-middle text-center"
                        >
                          <a
                            data-rel="simplecalendar-today-date"
                            class="btn btn-default btn-light simplecalendar-navigation pull-left"
                            href="#"
                            simple-date="2025-01-19"
                          >
                            {{ $t("Today") }}
                          </a>

                          <div class="component-calendar-dateswitcher">
                            <div class="btn-group" role="group">
                              <a
                                data-rel="simplecalendar-prev-date"
                                class="btn btn-light simplecalendar-navigation"
                                href="javascript:;"
                                simple-date="2025-01-18"
                              >
                                <img
                                  src="https://manager.datsan247.com/images/arrow-left.svg"
                                  alt="bar"
                                />
                              </a>
                              <span
                                class="simplecalendar-title"
                                data-rel="simplecalendar-title"
                                >{{ todayDate }}</span
                              >
                              <a
                                data-rel="simplecalendar-next-date"
                                class="btn btn-light simplecalendar-navigation"
                                href="javascript:;"
                                simple-date="2025-01-20"
                              >
                                <img
                                  src="https://manager.datsan247.com/images/arrow-right.svg"
                                  alt="bar"
                                />
                              </a>
                            </div>
                          </div>
                          <div
                            class="component-calendar-viewswitcher btn-group pull-right"
                            role="group"
                          >
                            <a
                              data-rel="simplecalendar-view-switch"
                              data-view="week"
                              href="#"
                              class="btn btn-secondary"
                              >Tuần</a
                            >
                            <a
                              data-rel="simplecalendar-view-switch"
                              data-view="day"
                              href="#"
                              class="btn btn-secondary active"
                              >Ngày</a
                            >
                          </div>
                        </div>
                      </div>
                      <div
                        class="component-calendar-widget"
                        id="calendar"
                        data-view="day"
                        data-rel="simplecalendar"
                        data-date-url="https://manager.datsan247.com/get-simple-calendar/299"
                        data-start-date="2025-01-19"
                        data-calendar="calendar"
                      >
                        <div class="component-calendar-widget-body day">
                          <div
                            class="component-calendar-widget-content simplebar-vertical-only"
                            data-simplebar="init"
                            data-simplebar-auto-hide="false"
                          >
                            <!-- <div class="simplebar-track vertical" style="visibility: visible;">
                                                    <div class="simplebar-scrollbar visible"
                                                        style="visibility: visible; top: 0px; height: 193px;"></div>
                                                </div>
                                                <div class="simplebar-track horizontal" style="visibility: hidden;">
                                                    <div class="simplebar-scrollbar"></div>
                                                </div> -->
                            <div
                              class="simplebar-scroll-content"
                              style="padding-right: 17px; margin-bottom: -34px"
                            >
                              <div
                                class="simplebar-content"
                                style="
                                  padding-bottom: 17px;
                                  margin-right: -17px;
                                "
                              >
                                <table
                                  class="table table-bordered table-hover simplecalendar simplecalendar-table"
                                >
                                  <thead>
                                    <tr>
                                      <th class="th-booking-fields th-field">
                                        {{ t("Field") }}
                                      </th>
                                      <th class="th-booking-fields">
                                        Chủ Nhật 19/01
                                      </th>
                                      <th class="th-booking-fields th-action">
                                        {{ t("Action") }}
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td
                                        colspan="8"
                                        style="border: 0; padding: 0"
                                      >
                                        <table
                                          class="table table-bordered table-hover simplecalendar simplecalendar-table m-0"
                                        >
                                          <tbody>
                                            <tr
                                              v-for="(field, index) in fields"
                                              :key="index"
                                              :data-agenda="field.fieldName"
                                            >
                                              <td class="td-booking-fields">
                                                <strong>{{
                                                  field.fieldName
                                                }}</strong>
                                              </td>
                                              <td>
                                                <a>
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
                                                    @slotSelected="
                                                      handleSlotSelected
                                                    "
                                                  />
                                                </a>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <SlotsChoosen
    :multipleBookingModel="multipleBookingModel"
    @goToServicePage="goToServicePage"
  />
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
/* import Components */
import SlotElement from "@/components/SlotElement.vue";
import SlotsChoosen from "@/components/SlotsChoosen.vue";
import ProgressSteps from "@/components/ProgressSteps.vue";
/* import JS functions */
import API from "@/utils/axios";
import CommonHelper from "@/utils/common";

export default {
  components: { ProgressSteps, SlotElement, SlotsChoosen },
  props: ["stadiumId"],
  data() {
    return {
      fields: [],
      multipleBookingModel: [],
      todayDate: "",
    };
  },
  methods: {
    async fetchFields() {
      try {
        this.$store.dispatch("clearMultipleBookingModel");
        const response = await API.get(
          `Field/fields-by-stadium-id/${this.stadiumId}`
        );
        this.fields = response.data.map((field) => {
          const allSlots = this.generateSlots();
          const bookedSlots = field.bookingFields
            .filter(
              (b) => b.startTime?.split("T")[0] === this.todayDate.split("T")[0]
            )
            .map((b) => this.formatTime(b.startTime));
          console.log(bookedSlots);
          const bookingSlots = allSlots.map((slot) => ({
            ...slot,
            isBooked: bookedSlots.includes(slot.time),
          }));
          return {
            fieldId: field.fieldId,
            fieldName: field.description,
            bookingSlots,
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
        });
        field = this.multipleBookingModel.find((f) => f.fieldId === fieldId);
      }

      if (isChoose) {
        field.selectedSlots.push(slot);
      } else {
        field.selectedSlots = field.selectedSlots.filter(
          (s) => s.time !== time
        );

        if (field.selectedSlots && field.selectedSlots.length === 0) {
          this.multipleBookingModel = this.multipleBookingModel.filter(
            (f) => f.fieldId !== fieldId
          );
        }
      }

      this.multipleBookingModel.map((field) => ({
        ...field,
        selectedSlots: field.selectedSlots.sort((a, b) => {
          return (
            this.convertTimeToMinutes(a.time) -
            this.convertTimeToMinutes(b.time)
          );
        }),
      }));
      console.log(this.multipleBookingModel);
      this.$store.dispatch(
        "setMultipleBookingModel",
        this.multipleBookingModel
      );
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
        slots.push({
          time,
          price: pricePerSlot,
          duration,
          isBooked: false,
        });
      }
      return slots;
    },
    goToServicePage() {
      this.$router.push({
        name: "booking-services",
      });
    },
  },
  async mounted() {
    await this.fetchFields();
    this.todayDate = new Date();
    this.todayDate.setHours(0, 0, 0, 0);
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
</style>
