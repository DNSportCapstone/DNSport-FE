<template>
  <div class="booking-container">
    <ProgressSteps />
    <div class="booking-by-date right_col layout-full" role="main">
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
                          Hôm nay
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
                              >19 tháng 01 2025</span
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
                        <div class="component-calendar-widget-header">
                          <table
                            class="table table-bordered table-hover simplecalendar-table"
                          >
                            <thead>
                              <tr>
                                <th class="simplecalendar-agenda" width="100px">
                                  Sân
                                </th>
                                <th style="width: 90%">Chủ Nhật 19/01</th>
                              </tr>
                            </thead>
                          </table>
                        </div>
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
                              style="padding-bottom: 17px; margin-right: -17px"
                            >
                              <table
                                class="table table-bordered table-hover simplecalendar simplecalendar-table"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      colspan="8"
                                      style="border: 0; padding: 0"
                                    >
                                      <table
                                        class="table table-bordered table-hover simplecalendar simplecalendar-table"
                                      >
                                        <tbody>
                                          <tr data-agenda="Nguyên Đức 1 Sân 7">
                                            <td
                                              width="100px"
                                              style="
                                                vertical-align: middle;
                                                text-align: center;
                                              "
                                            >
                                              <strong
                                                >Nguyên Đức 1 Sân 7</strong
                                              >
                                            </td>
                                            <td class="2025-01-19">
                                              <a>
                                                <BookingElement
                                                  v-for="(
                                                    slot, index
                                                  ) in bookingSlots"
                                                  :key="index"
                                                  :time="slot.time"
                                                  :price="slot.price"
                                                  :duration="slot.duration"
                                                />
                                              </a>
                                            </td>
                                          </tr>
                                          <tr data-agenda="Nguyên Đức 2 Sân 7">
                                            <td
                                              width="100px"
                                              style="
                                                vertical-align: middle;
                                                text-align: center;
                                              "
                                            >
                                              <strong
                                                >Nguyên Đức 2 Sân 7</strong
                                              >
                                            </td>
                                            <td class="2025-01-19">
                                              <a>
                                                <BookingElement
                                                  v-for="(
                                                    slot, index
                                                  ) in bookingSlots"
                                                  :key="index"
                                                  :time="slot.time"
                                                  :price="slot.price"
                                                  :duration="slot.duration"
                                                />
                                              </a>
                                            </td>
                                          </tr>
                                          <tr data-agenda="Nguyên Đức 3 Sân 7">
                                            <td
                                              width="100px"
                                              style="
                                                vertical-align: middle;
                                                text-align: center;
                                              "
                                            >
                                              <strong
                                                >Nguyên Đức 3 Sân 7</strong
                                              >
                                            </td>
                                            <td class="2025-01-19">
                                              <a>
                                                <BookingElement
                                                  v-for="(
                                                    slot, index
                                                  ) in bookingSlots"
                                                  :key="index"
                                                  :time="slot.time"
                                                  :price="slot.price"
                                                  :duration="slot.duration"
                                                />
                                              </a>
                                            </td>
                                          </tr>
                                          <tr data-agenda="ND1 Sân 5">
                                            <td
                                              width="100px"
                                              style="
                                                vertical-align: middle;
                                                text-align: center;
                                              "
                                            >
                                              <strong>ND1 Sân 5</strong>
                                            </td>
                                            <td class="2025-01-19">
                                              <a>
                                                <BookingElement
                                                  v-for="(
                                                    slot, index
                                                  ) in bookingSlots"
                                                  :key="index"
                                                  :time="slot.time"
                                                  :price="slot.price"
                                                  :duration="slot.duration"
                                                />
                                              </a>
                                            </td>
                                          </tr>
                                          <tr data-agenda="ND1 Sân 5 (2)">
                                            <td
                                              width="100px"
                                              style="
                                                vertical-align: middle;
                                                text-align: center;
                                              "
                                            >
                                              <strong>ND1 Sân 5 (2)</strong>
                                            </td>
                                            <td class="2025-01-19">
                                              <a>
                                                <BookingElement
                                                  v-for="(
                                                    slot, index
                                                  ) in bookingSlots"
                                                  :key="index"
                                                  :time="slot.time"
                                                  :price="slot.price"
                                                  :duration="slot.duration"
                                                />
                                              </a>
                                            </td>
                                          </tr>
                                          <tr data-agenda="ND1 Sân 5 (3)">
                                            <td
                                              width="100px"
                                              style="
                                                vertical-align: middle;
                                                text-align: center;
                                              "
                                            >
                                              <strong>ND1 Sân 5 (3)</strong>
                                            </td>
                                            <td class="2025-01-19">
                                              <a>
                                                <BookingElement
                                                  v-for="(
                                                    slot, index
                                                  ) in bookingSlots"
                                                  :key="index"
                                                  :time="slot.time"
                                                  :price="slot.price"
                                                  :duration="slot.duration"
                                                />
                                              </a>
                                            </td>
                                          </tr>
                                          <tr data-agenda="ND2 Sân 5">
                                            <td
                                              width="100px"
                                              style="
                                                vertical-align: middle;
                                                text-align: center;
                                              "
                                            >
                                              <strong>ND2 Sân 5</strong>
                                            </td>
                                            <td class="2025-01-19">
                                              <a>
                                                <BookingElement
                                                  v-for="(
                                                    slot, index
                                                  ) in bookingSlots"
                                                  :key="index"
                                                  :time="slot.time"
                                                  :price="slot.price"
                                                  :duration="slot.duration"
                                                />
                                              </a>
                                            </td>
                                          </tr>
                                          <tr data-agenda="ND2 Sân 5 (2)">
                                            <td
                                              width="100px"
                                              style="
                                                vertical-align: middle;
                                                text-align: center;
                                              "
                                            >
                                              <strong>ND2 Sân 5 (2)</strong>
                                            </td>
                                            <td class="2025-01-19">
                                              <a
                                                href="https://manager.datsan247.com/vi/all-agenda/299/make-appointment/123167/2025-01-19/1094"
                                                class="slot-item"
                                                data-url="https://manager.datsan247.com/vi/all-agenda/299/make-appointments"
                                                data-slot='{"id":"312a7429-569b-4d50-b6ad-e4c97650e52d","title":"900.000 \u0111","start":1737291600,"end":"2025-01-19 21:30:00","backgroundColor":"#FFFFFF","textColor":"#000000","borderLeft":"#CEDFED","create_appointment":true,"block":false,"slotID":123167,"subdivision_name":"Sau 17h ND2","agenda_name":"ND2 S\u00e2n 5 (2)","max_appointment":1,"type":0,"render":true,"url":"https:\/\/manager.datsan247.com\/vi\/all-agenda\/299\/make-appointment\/123167\/2025-01-19\/1094","priority":1,"day_number":0,"break":false,"price":900000,"flash_sale":null,"subdivision":{"id":1094,"type":0,"minute_per_point":90,"visible_to":0,"color":null,"bg_color":null,"can_booked_until":0,"book_ahead_time":30,"max_appoinment":1,"urgency":0,"grant_user":838,"created_by":838,"updated_by":null,"created_at":"2025-01-07 11:41:23","updated_at":"2025-01-07 11:41:23","deleted_at":null,"temporary":0,"status_id":null,"dummy":0,"client_id":299,"price":900000,"pending":1,"slots_count":224,"translations":[{"id":2190,"subdivision_id":1094,"locale":"en","name":"Sau 17h ND2","address":null,"specific_area":null,"text_for_patient":null,"description":null},{"id":2191,"subdivision_id":1094,"locale":"vi","name":"Sau 17h ND2","address":null,"specific_area":null,"text_for_patient":null,"description":null}],"status":null,"name":"Sau 17h ND2","address":null,"locale":"vi","specific_area":null,"text_for_patient":null,"description":null},"subdivision_id":1094}'
                                              >
                                                <div
                                                  data-agenda="ND2 Sân 5 (2)"
                                                  class="simplecalendar-slot"
                                                  style="
                                                    border-left: 4px solid
                                                      #ffffff;
                                                    background-color: #ffffff;
                                                    color: #000000;
                                                  "
                                                >
                                                  900.000 đ
                                                </div>
                                              </a>
                                            </td>
                                          </tr>
                                          <tr data-agenda="ND2 Sân 5 (3)">
                                            <td
                                              width="100px"
                                              style="
                                                vertical-align: middle;
                                                text-align: center;
                                              "
                                            >
                                              <strong>ND2 Sân 5 (3)</strong>
                                            </td>
                                            <td class="2025-01-19">
                                              <a
                                                href="https://manager.datsan247.com/vi/all-agenda/299/make-appointment/123251/2025-01-19/1094"
                                                class="slot-item"
                                                data-url="https://manager.datsan247.com/vi/all-agenda/299/make-appointments"
                                                data-slot='{"id":"376ea0da-db4a-4779-bcd4-1d9e5546aaa1","title":"900.000 \u0111","start":1737291600,"end":"2025-01-19 21:30:00","backgroundColor":"#FFFFFF","textColor":"#000000","borderLeft":"#CEDFED","create_appointment":true,"block":false,"slotID":123251,"subdivision_name":"Sau 17h ND2","agenda_name":"ND2 S\u00e2n 5 (3)","max_appointment":1,"type":0,"render":true,"url":"https:\/\/manager.datsan247.com\/vi\/all-agenda\/299\/make-appointment\/123251\/2025-01-19\/1094","priority":1,"day_number":0,"break":false,"price":900000,"flash_sale":null,"subdivision":{"id":1094,"type":0,"minute_per_point":90,"visible_to":0,"color":null,"bg_color":null,"can_booked_until":0,"book_ahead_time":30,"max_appoinment":1,"urgency":0,"grant_user":838,"created_by":838,"updated_by":null,"created_at":"2025-01-07 11:41:23","updated_at":"2025-01-07 11:41:23","deleted_at":null,"temporary":0,"status_id":null,"dummy":0,"client_id":299,"price":900000,"pending":1,"slots_count":224,"translations":[{"id":2190,"subdivision_id":1094,"locale":"en","name":"Sau 17h ND2","address":null,"specific_area":null,"text_for_patient":null,"description":null},{"id":2191,"subdivision_id":1094,"locale":"vi","name":"Sau 17h ND2","address":null,"specific_area":null,"text_for_patient":null,"description":null}],"status":null,"name":"Sau 17h ND2","address":null,"locale":"vi","specific_area":null,"text_for_patient":null,"description":null},"subdivision_id":1094}'
                                              >
                                                <div
                                                  data-agenda="ND2 Sân 5 (3)"
                                                  class="simplecalendar-slot"
                                                  style="
                                                    border-left: 4px solid
                                                      #ffffff;
                                                    background-color: #ffffff;
                                                    color: #000000;
                                                  "
                                                >
                                                  900.000 đ
                                                </div>
                                              </a>
                                            </td>
                                          </tr>
                                          <tr data-agenda="ND3 Sân 5">
                                            <td
                                              width="100px"
                                              style="
                                                vertical-align: middle;
                                                text-align: center;
                                              "
                                            >
                                              <strong>ND3 Sân 5</strong>
                                            </td>
                                            <td class="2025-01-19">
                                              <a
                                                href="https://manager.datsan247.com/vi/all-agenda/299/make-appointment/123335/2025-01-19/1094"
                                                class="slot-item"
                                                data-url="https://manager.datsan247.com/vi/all-agenda/299/make-appointments"
                                                data-slot='{"id":"77ea6667-eab1-471b-9e1a-08ee5d42307d","title":"900.000 \u0111","start":1737291600,"end":"2025-01-19 21:30:00","backgroundColor":"#FFFFFF","textColor":"#000000","borderLeft":"#CEDFED","create_appointment":true,"block":false,"slotID":123335,"subdivision_name":"Sau 17h ND2","agenda_name":"ND3 S\u00e2n 5","max_appointment":1,"type":0,"render":true,"url":"https:\/\/manager.datsan247.com\/vi\/all-agenda\/299\/make-appointment\/123335\/2025-01-19\/1094","priority":1,"day_number":0,"break":false,"price":900000,"flash_sale":null,"subdivision":{"id":1094,"type":0,"minute_per_point":90,"visible_to":0,"color":null,"bg_color":null,"can_booked_until":0,"book_ahead_time":30,"max_appoinment":1,"urgency":0,"grant_user":838,"created_by":838,"updated_by":null,"created_at":"2025-01-07 11:41:23","updated_at":"2025-01-07 11:41:23","deleted_at":null,"temporary":0,"status_id":null,"dummy":0,"client_id":299,"price":900000,"pending":1,"slots_count":224,"translations":[{"id":2190,"subdivision_id":1094,"locale":"en","name":"Sau 17h ND2","address":null,"specific_area":null,"text_for_patient":null,"description":null},{"id":2191,"subdivision_id":1094,"locale":"vi","name":"Sau 17h ND2","address":null,"specific_area":null,"text_for_patient":null,"description":null}],"status":null,"name":"Sau 17h ND2","address":null,"locale":"vi","specific_area":null,"text_for_patient":null,"description":null},"subdivision_id":1094}'
                                              >
                                                <div
                                                  data-agenda="ND3 Sân 5"
                                                  class="simplecalendar-slot"
                                                  style="
                                                    border-left: 4px solid
                                                      #ffffff;
                                                    background-color: #ffffff;
                                                    color: #000000;
                                                  "
                                                >
                                                  900.000 đ
                                                </div>
                                              </a>
                                            </td>
                                          </tr>
                                          <tr data-agenda="ND3 Sân 5 (2)">
                                            <td
                                              width="100px"
                                              style="
                                                vertical-align: middle;
                                                text-align: center;
                                              "
                                            >
                                              <strong>ND3 Sân 5 (2)</strong>
                                            </td>
                                            <td class="2025-01-19">
                                              <a
                                                href="https://manager.datsan247.com/vi/all-agenda/299/make-appointment/123419/2025-01-19/1094"
                                                class="slot-item"
                                                data-url="https://manager.datsan247.com/vi/all-agenda/299/make-appointments"
                                                data-slot='{"id":"12212485-15e8-420c-8bb9-7b1de097981b","title":"900.000 \u0111","start":1737291600,"end":"2025-01-19 21:30:00","backgroundColor":"#FFFFFF","textColor":"#000000","borderLeft":"#CEDFED","create_appointment":true,"block":false,"slotID":123419,"subdivision_name":"Sau 17h ND2","agenda_name":"ND3 S\u00e2n 5 (2)","max_appointment":1,"type":0,"render":true,"url":"https:\/\/manager.datsan247.com\/vi\/all-agenda\/299\/make-appointment\/123419\/2025-01-19\/1094","priority":1,"day_number":0,"break":false,"price":900000,"flash_sale":null,"subdivision":{"id":1094,"type":0,"minute_per_point":90,"visible_to":0,"color":null,"bg_color":null,"can_booked_until":0,"book_ahead_time":30,"max_appoinment":1,"urgency":0,"grant_user":838,"created_by":838,"updated_by":null,"created_at":"2025-01-07 11:41:23","updated_at":"2025-01-07 11:41:23","deleted_at":null,"temporary":0,"status_id":null,"dummy":0,"client_id":299,"price":900000,"pending":1,"slots_count":224,"translations":[{"id":2190,"subdivision_id":1094,"locale":"en","name":"Sau 17h ND2","address":null,"specific_area":null,"text_for_patient":null,"description":null},{"id":2191,"subdivision_id":1094,"locale":"vi","name":"Sau 17h ND2","address":null,"specific_area":null,"text_for_patient":null,"description":null}],"status":null,"name":"Sau 17h ND2","address":null,"locale":"vi","specific_area":null,"text_for_patient":null,"description":null},"subdivision_id":1094}'
                                              >
                                                <div
                                                  data-agenda="ND3 Sân 5 (2)"
                                                  class="simplecalendar-slot"
                                                  style="
                                                    border-left: 4px solid
                                                      #ffffff;
                                                    background-color: #ffffff;
                                                    color: #000000;
                                                  "
                                                >
                                                  900.000 đ
                                                </div>
                                              </a>
                                            </td>
                                          </tr>
                                          <tr data-agenda="ND3 Sân 5 (3)">
                                            <td
                                              width="100px"
                                              style="
                                                vertical-align: middle;
                                                text-align: center;
                                              "
                                            >
                                              <strong>ND3 Sân 5 (3)</strong>
                                            </td>
                                            <td class="2025-01-19">
                                              <a
                                                href="https://manager.datsan247.com/vi/all-agenda/299/make-appointment/123503/2025-01-19/1094"
                                                class="slot-item"
                                                data-url="https://manager.datsan247.com/vi/all-agenda/299/make-appointments"
                                                data-slot='{"id":"08fa23de-7c52-40e5-bf49-ada067bd91fd","title":"900.000 \u0111","start":1737291600,"end":"2025-01-19 21:30:00","backgroundColor":"#FFFFFF","textColor":"#000000","borderLeft":"#CEDFED","create_appointment":true,"block":false,"slotID":123503,"subdivision_name":"Sau 17h ND2","agenda_name":"ND3 S\u00e2n 5 (3)","max_appointment":1,"type":0,"render":true,"url":"https:\/\/manager.datsan247.com\/vi\/all-agenda\/299\/make-appointment\/123503\/2025-01-19\/1094","priority":1,"day_number":0,"break":false,"price":900000,"flash_sale":null,"subdivision":{"id":1094,"type":0,"minute_per_point":90,"visible_to":0,"color":null,"bg_color":null,"can_booked_until":0,"book_ahead_time":30,"max_appoinment":1,"urgency":0,"grant_user":838,"created_by":838,"updated_by":null,"created_at":"2025-01-07 11:41:23","updated_at":"2025-01-07 11:41:23","deleted_at":null,"temporary":0,"status_id":null,"dummy":0,"client_id":299,"price":900000,"pending":1,"slots_count":224,"translations":[{"id":2190,"subdivision_id":1094,"locale":"en","name":"Sau 17h ND2","address":null,"specific_area":null,"text_for_patient":null,"description":null},{"id":2191,"subdivision_id":1094,"locale":"vi","name":"Sau 17h ND2","address":null,"specific_area":null,"text_for_patient":null,"description":null}],"status":null,"name":"Sau 17h ND2","address":null,"locale":"vi","specific_area":null,"text_for_patient":null,"description":null},"subdivision_id":1094}'
                                              >
                                                <div
                                                  data-agenda="ND3 Sân 5 (3)"
                                                  class="simplecalendar-slot"
                                                  style="
                                                    border-left: 4px solid
                                                      #ffffff;
                                                    background-color: #ffffff;
                                                    color: #000000;
                                                  "
                                                >
                                                  900.000 đ
                                                </div>
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
        <div class="component-calendar-cart">
          <div class="cart-info">
            <div class="slot-added">
              Đã chọn <span class="count-added">1</span> lịch
            </div>
            <div class="cart-total">
              Tổng tiền: <span class="total-price">270.000</span>đ
            </div>
          </div>
          <div class="cart-action btn-group-lg">
            <a
              class="btn btn-primary mg-bottom-0 booking-appointment"
              href="https://manager.datsan247.com/vi/all-agenda/299/make-appointments?slot[122790]=2025-01-19"
              >Đặt lịch</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BookingElement from "@/components/BookingElement.vue";
import ProgressSteps from "@/components/ProgressSteps.vue";

export default {
  name: "App",
  components: {
    BookingElement,
    ProgressSteps,
  },
  data() {
    return {
      bookingSlots: [],
    };
  },
  methods: {
    generateSlots() {
      const startHour = 8; // Giờ bắt đầu
      const endHour = 22; // Giờ kết thúc
      const duration = 60; // Thời lượng mỗi slot (phút)
      const pricePerSlot = 55000; // Giá mỗi slot (£)

      const slots = [];
      for (let hour = startHour; hour < endHour; hour++) {
        const time = `${hour.toString().padStart(2, "0")}:00`; // Định dạng giờ (HH:mm)
        slots.push({
          time,
          price: this.formatVND(pricePerSlot),
          duration,
        });
      }

      this.bookingSlots = slots;
    },
    formatVND(priceVND) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(priceVND);
    },
  },
  mounted() {
    this.generateSlots(); // Tạo danh sách slot khi component được mount
  },
};
</script>
<style>
.booking-by-date {
  width: 100%;
}
</style>
