<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100 p-6">
    <div
      class="w-full max-w-4xl p-6 shadow-lg bg-white rounded-lg border border-gray-300"
    >
      <h2 class="text-2xl font-bold mb-4 text-center text-gray-800">
        Danh Sách Sân Đã Đặt
      </h2>
      <table class="w-full border-collapse border border-gray-300">
        <thead>
          <tr class="bg-gray-200">
            <th class="border p-2">Sân</th>
            <th class="border p-2">Ngày</th>
            <th class="border p-2">Thời gian</th>
            <th class="border p-2">Giá</th>
            <th class="border p-2">Trạng thái</th>
            <th class="border p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(booking, index) in bookings"
            :key="index"
            class="text-center"
          >
            <td class="border p-2">{{ booking.field }}</td>
            <td class="border p-2">{{ booking.date }}</td>
            <td class="border p-2">{{ booking.time }}</td>
            <td class="border p-2">{{ booking.price }} VND</td>
            <td class="border p-2">{{ booking.status }}</td>
            <td class="border p-2">
              <button
                class="btn btn-primary mr-2"
                @click="showChangeSlotPopup(booking)"
              >
                Đổi
              </button>
              <button class="btn btn-danger" @click="showCancelPopup(booking)">
                Hủy
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="modal fade" id="cancelModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Xác nhận hủy đặt sân</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p>🏟 <b>Sân:</b> {{ selectedBooking.field }}</p>
            <p>
              📅 <b>Thời gian:</b> {{ selectedBooking.date }} -
              {{ selectedBooking.time }}
            </p>
            <select v-model="reason" class="form-select">
              <option value="" disabled selected>Chọn lý do hủy...</option>
              <option value="Bận đột xuất">Bận đột xuất</option>
              <option value="Thời tiết xấu">Thời tiết xấu</option>
              <option value="Khác...">Khác...</option>
            </select>
            <textarea
              v-if="reason === 'Khác...'"
              v-model="customReason"
              class="form-control mt-2"
              placeholder="Nhập lý do khác..."
            ></textarea>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="handleCancel">
              Xác nhận
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="changeSlotModal"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Đổi Lịch Đặt Sân</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p>🏟 <b>Sân:</b> {{ selectedBooking.field }}</p>
            <input v-model="newDate" type="date" class="form-control mt-2" />
            <input v-model="newTime" type="time" class="form-control mt-2" />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              @click="handleChangeSlot"
            >
              Xác nhận
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";

export default {
  data() {
    return {
      bookings: [
        {
          field: "Sân A",
          date: "2025-02-12",
          time: "18:00",
          price: "300.000",
          status: "Đã thanh toán",
        },
        {
          field: "Sân B",
          date: "2025-02-12",
          time: "20:00",
          price: "250.000",
          status: "Đã thanh toán",
        },
        {
          field: "Sân C",
          date: "2025-02-12",
          time: "17:00",
          price: "280.000",
          status: "Đã thanh toán",
        },
      ],
      reason: "",
      customReason: "",
      selectedBooking: {},
      newDate: "",
      newTime: "",
      cancelModal: null,
      changeSlotModal: null,
    };
  },
  mounted() {
    this.cancelModal = new Modal(document.getElementById("cancelModal"));
    this.changeSlotModal = new Modal(
      document.getElementById("changeSlotModal")
    );
  },
  methods: {
    showCancelPopup(booking) {
      this.selectedBooking = booking;
      this.reason = "";
      this.cancelModal.show();
    },
    handleCancel() {
      alert(`Yêu cầu hủy đặt sân ${this.selectedBooking.field} đã được gửi!`);
      this.cancelModal.hide();
    },
    showChangeSlotPopup(booking) {
      this.selectedBooking = booking;
      this.newDate = booking.date;
      this.newTime = booking.time;
      this.changeSlotModal.show();
    },
    handleChangeSlot() {
      alert(
        `Đã đổi lịch sân ${this.selectedBooking.field} sang ${this.newDate} - ${this.newTime}!`
      );
      this.changeSlotModal.hide();
    },
  },
};
</script>

<style>
body {
  font-family: "Poppins", sans-serif;
  background-color: #f8f9fa;
}
</style>
