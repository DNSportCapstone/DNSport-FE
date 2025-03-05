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
                                      <th style="width: 10%">
                                        {{ t("Field") }}
                                      </th>
                                      <th>Chủ Nhật 19/01</th>
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
                                              <td
                                                style="
                                                  vertical-align: middle;
                                                  text-align: center;
                                                  width: 10%;
                                                "
                                              >
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
                                                  />
                                                </a>
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
  <SlotsChoosen :slots="selectedSlots" />
</template>
<script setup>
import { useI18n } from "vue-i18n";
import { ref, watchEffect } from "vue";
const { t } = useI18n();
const steps = ref([]);

watchEffect(() => {
  steps.value = [t("ChooseFields"), t("ConfirmInformation"), t("Payment")];
});
</script>
<script>
/* import Components */
import SlotElement from "@/components/SlotElement.vue";
import SlotsChoosen from "@/components/SlotsChoosen.vue";
import ProgressSteps from "@/components/ProgressSteps.vue";
/* import JS functions */
import CommonHelper from "@/utils/common";

export default {
  name: "App",
  components: {
    SlotElement,
    SlotsChoosen,
    ProgressSteps,
  },
  data() {
    return {
      bookingSlots: [],
      selectedSlots: [],
      todayDate: CommonHelper.convertToDateTime(new Date().toISOString()),
      fields: [
        {
          fieldId: 1,
          fieldName: "Trung Vuong",
          bookingSlots: [],
        },
        {
          fieldId: 2,
          fieldName: "Chi Lang",
          bookingSlots: [],
        },
      ],
    };
  },
  methods: {
    generateSlots() {
      const startHour = 0; // Giờ bắt đầu
      const endHour = 23; // Giờ kết thúc
      const duration = 60; // Thời lượng mỗi slot (phút)
      const pricePerSlot = 60000; // Giá mỗi slot (£)
      this.fields.forEach((field) => {
        const slots = [];
        for (let hour = startHour; hour <= endHour; hour++) {
          const time = `${hour.toString().padStart(2, "0")}:00`; // Định dạng giờ (HH:mm)
          slots.push({
            time,
            price: pricePerSlot,
            duration,
          });
        }

        field.bookingSlots = slots;
      });
    },
    toggleSlotSelection(slot) {
      console.log(this.selectedSlots);
      if (this.selectedSlots.includes(slot)) {
        this.selectedSlots = this.selectedSlots.filter((s) => s !== slot);
      } else {
        this.selectedSlots.push(slot);
      }
    },
    formatCurrency(number) {
      return CommonHelper.formatVND(number);
    },
  },
  mounted() {
    this.generateSlots();
    this.todayDate = CommonHelper.convertToDate(new Date().toISOString());
  },
};
</script>
<style scoped>
.booking-by-date {
  width: 100%;
}
</style>
