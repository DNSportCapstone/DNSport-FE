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
        <ProgressSteps :currentStep="3" :steps="steps" />
      </div>
    </div>
    <div class="container">
      <div class="wrapper wrapper-content animated fadeInRight">
        <div class="row">
          <div class="col-md-9">
            <div class="ibox">
              <!-- <div class="ibox-title">
                <span class="pull-right"
                  >(<strong>{{ totalItems }}</strong
                  >) items</span
                >
                <h5>Items in your cart</h5>
              </div> -->

              <!-- Lặp qua từng sân trong multipleBookingModel -->
              <div
                class="ibox-content"
                v-for="field in multipleBookingModel"
                :key="field.fieldId"
              >
                <div class="table-responsive">
                  <table class="table booking-table">
                    <tbody>
                      <tr>
                        <td width="90">
                          <div class="field-image"></div>
                        </td>
                        <td class="desc">
                          <h3>
                            <a href="#" class="text-navy">{{
                              field.fieldName
                            }}</a>
                          </h3>
                          <p class="small">
                            Sân tiêu chuẩn với mặt cỏ nhân tạo chất lượng cao
                          </p>

                          <dl class="small m-b-none">
                            <dt>Danh sách Slot</dt>
                            <!-- Lặp qua các slot của sân -->
                            <template
                              v-for="(slot, slotIndex) in field.selectedSlots"
                              :key="slot.time"
                            >
                              <dd>
                                Slot {{ slotIndex + 1 }}: {{ slot.time }} -
                                {{ calculateEndTime(slot.time, slot.duration) }}
                                <a href="#" class="text-muted"
                                  ><i class="fa fa-edit"></i> Sửa</a
                                >
                                |
                                <a href="#" class="text-muted"
                                  ><i class="fa fa-trash"></i> Xóa</a
                                >
                              </dd>
                              <!-- Bảng dịch vụ cho từng slot -->
                              <table class="table service-table">
                                <tr>
                                  <th>Dịch vụ</th>
                                  <th>Giá</th>
                                  <th>Số lượng</th>
                                  <th>Hành động</th>
                                </tr>
                                <!-- Lặp qua các dịch vụ trong slot -->
                                <tr
                                  v-for="service in slot.services"
                                  :key="service.id"
                                >
                                  <td>{{ service.name }}</td>
                                  <td>{{ formatPrice(service.price) }}</td>
                                  <td>
                                    <input
                                      type="number"
                                      v-model="service.quantity"
                                      min="0"
                                      class="form-control service-quantity"
                                    />
                                  </td>
                                  <td>
                                    <a href="#" class="text-muted"
                                      ><i class="fa fa-edit"></i> Sửa</a
                                    >
                                    |
                                    <a href="#" class="text-muted"
                                      ><i class="fa fa-trash"></i> Xóa</a
                                    >
                                  </td>
                                </tr>
                              </table>
                            </template>
                            <a href="#" class="text-muted"
                              ><i class="fa fa-plus"></i> Thêm Slot</a
                            >
                          </dl>

                          <div class="m-t-sm">
                            <a href="#" class="text-muted">
                              <i class="fa fa-calendar"></i> Chọn thời gian khác
                            </a>
                            |
                            <a href="#" class="text-muted">
                              <i class="fa fa-trash"></i> Hủy đặt sân
                            </a>
                          </div>
                        </td>
                        <td>
                          {{ formatPrice(field.selectedSlots[0].price) }} / Slot
                        </td>
                        <td width="65">
                          <input
                            disabled
                            type="text"
                            class="form-control"
                            :value="field.selectedSlots.length"
                          />
                        </td>
                        <td>
                          <h4>{{ formatPrice(calculateFieldTotal(field)) }}</h4>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="ibox-content">
                <button
                  class="btn btn-dns-primary pull-right"
                  @click="createBooking"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>

          <div class="col-md-3">
            <div class="ibox">
              <div class="ibox-title">
                <h5>Cart Summary</h5>
              </div>
              <div class="ibox-content">
                <div class="form-group">
                  <label>Mã giảm giá</label>
                  <div class="input-group">
                    <input
                      v-model="voucherCode"
                      type="text"
                      class="form-control"
                      placeholder="Nhập mã"
                    />
                    <span class="input-group-btn">
                      <button class="btn btn-primary" @click="applyVoucher">
                        Áp dụng
                      </button>
                    </span>
                  </div>
                  <div v-if="voucherError" class="text-danger small mt-1">
                    {{ t(voucherError) }}
                  </div>
                </div>
                <span>Tạm tính</span>
                <h4>{{ formatPrice(calculateCartTotal()) }}</h4>
                <span>Giảm giá</span>
                <h5 class="text-danger">
                  -{{ formatPrice(calculateSalesAfterDiscount()) }}
                </h5>
                <span>Tổng thanh toán</span>
                <h2 class="font-bold">
                  {{ formatPrice(calculateTotalAfterDiscount()) }}
                </h2>
                <hr />
                <span class="text-muted small">
                  *For VietName applicable sales tax will be applied
                </span>
                <div class="m-t-sm">
                  <div class="">
                    <button
                      class="btn btn-dns-primary btn-sm"
                      @click="createBooking"
                    >
                      <i class="fa fa-shopping-cart"></i> Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
import API from "@/utils/axios";
import { showMessageBox } from "@/utils/message-box-service.js";
import CommonHelper from "@/utils/common";

export default {
  name: "check-out",
  components: { ProgressSteps },
  data() {
    return {
      multipleBookingModel: [],
      voucherCode: "",
      voucherDiscount: 0,
      voucherError: "",
      voucherId: 0,
    };
  },
  computed: {
    totalItems() {
      return this.multipleBookingModel.reduce(
        (total, field) => total + field.selectedSlots.length,
        0
      );
    },
  },
  methods: {
    fetchData() {
      this.multipleBookingModel = this.$store.getters.multipleBookingModel;
      if (this.multipleBookingModel.length == 0) {
        this.$router.push({
          path: "/booking-by-date",
        });
      }

      this.multipleBookingModel.forEach((field) => {
        field.selectedSlots.forEach((slot) => {
          slot.services.forEach((service) => {
            if (!service.quantity) service.quantity = 1;
          });
        });
      });
    },
    calculateEndTime(startTime, duration) {
      const [hours, minutes] = startTime.split(":").map(Number);
      const endMinutes = (hours * 60 + minutes + duration) % (24 * 60);
      const endHours = Math.floor(endMinutes / 60);
      const endMins = endMinutes % 60;
      return `${endHours.toString().padStart(2, "0")}:${endMins
        .toString()
        .padStart(2, "0")}`;
    },
    formatPrice(price) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(price);
    },
    calculateFieldTotal(field) {
      return field.selectedSlots.reduce((total, slot) => {
        const servicesTotal = slot.services.reduce(
          (sum, service) => sum + service.price * (service.quantity || 1),
          0
        );
        return total + slot.price + servicesTotal;
      }, 0);
    },
    calculateCartTotal() {
      return this.multipleBookingModel.reduce(
        (total, field) => total + this.calculateFieldTotal(field),
        0
      );
    },
    async createBooking() {
      try {
        const response = await API.post(`booking/multiple`, {
          fields: this.multipleBookingModel,
          voucherId: this.voucherId,
        });
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
          `payment/payos-create-payment/multiple-booking`,
          {
            amount: this.calculateTotalAfterDiscount(),
            bookingId: bookingId,
          }
        );
        window.location.href = response.data.paymentUrl;
      } catch (error) {
        console.error(error);
      }
    },
    async applyVoucher() {
      this.voucherError = "";
      try {
        const res = await API.post("vouchers/apply", {
          userId: CommonHelper.getCurrentUserId(),
          voucherCode: this.voucherCode,
        });

        if (!res.data.isError) {
          this.voucherDiscount = res.data.discountPercentage;
          this.voucherId = res.data.voucherId;
          showMessageBox({
            title: "Information",
            description: `Apply code successfully! <strong>${res.data.discountPercentage}%</strong> off`,
            type: "info",
            showCancel: false,
          });
        } else {
          this.voucherDiscount = 0;
          this.voucherError = res.data.message;
        }
      } catch (err) {
        this.voucherError = "There is an error when applying the voucher code.";
        console.error(err);
      }
    },
    calculateTotalAfterDiscount() {
      if (this.voucherDiscount != 0) {
        console.log(this.voucherDiscount);
        return this.calculateCartTotal() * (1 - this.voucherDiscount / 100);
      } else {
        return this.calculateCartTotal();
      }
    },
    calculateSalesAfterDiscount() {
      if (this.voucherDiscount != 0) {
        return (this.calculateCartTotal() * this.voucherDiscount) / 100;
      } else {
        return 0;
      }
    },
  },
  created() {
    this.fetchData();
  },
};
</script>
<style>
h3 {
  font-size: 16px;
}
.text-navy {
  color: #1ab394;
}
.cart-product-imitation {
  text-align: center;
  padding-top: 30px;
  height: 80px;
  width: 80px;
  background-color: #f8f8f9;
}
.product-imitation.xl {
  padding: 120px 0;
}
.product-desc {
  padding: 20px;
  position: relative;
}
.ecommerce .tag-list {
  padding: 0;
}
.ecommerce .fa-star {
  color: #d1dade;
}
.ecommerce .fa-star.active {
  color: #f8ac59;
}
.ecommerce .note-editor {
  border: 1px solid #e7eaec;
}
table.shoping-cart-table {
  margin-bottom: 0;
}
table.shoping-cart-table tr td {
  border: none;
  text-align: right;
}
table.shoping-cart-table tr td.desc,
table.shoping-cart-table tr td:first-child {
  text-align: left;
}
table.shoping-cart-table tr td:last-child {
  width: 80px;
}
.ibox {
  clear: both;
  margin-bottom: 25px;
  margin-top: 0;
  padding: 0;
}
.ibox.collapsed .ibox-content {
  display: none;
}
.ibox:after,
.ibox:before {
  display: table;
}
.ibox-title {
  -moz-border-bottom-colors: none;
  -moz-border-left-colors: none;
  -moz-border-right-colors: none;
  -moz-border-top-colors: none;
  background-color: #ffffff;
  border-color: #e7eaec;
  border-image: none;
  border-style: solid solid none;
  border-width: 3px 0 0;
  color: inherit;
  margin-bottom: 0;
  padding: 14px 15px 7px;
  min-height: 48px;
}
.ibox-content {
  background-color: #ffffff;
  color: inherit;
  padding: 15px 20px 20px 20px;
  border-color: #e7eaec;
  border-image: none;
  border-style: solid solid none;
  border-width: 1px 0;
}
.ibox-footer {
  color: inherit;
  border-top: 1px solid #e7eaec;
  font-size: 90%;
  background: #ffffff;
  padding: 10px 15px;
}
.service-quantity {
  width: 65px;
}
</style>
