<template>
  <!-- Section Title -->
  <div class="container section-title" data-aos="fade-up">
    <h2>Booking</h2>
    <div>
      <span>Booking a</span> <span class="description-title">Field</span>
    </div>
  </div>
  <!-- End Section Title -->
  <div class="booking-container">
    <!-- Danh sách sân bên trái -->
    <div class="fields-list">
      <div
        v-for="field in fields"
        :key="field.name"
        class="field-item"
        @click="selectField(field)"
      >
        <img :src="field.image" alt="Field Image" class="field-image" />
        <div class="field-details">
          <h4>{{ field.name }}</h4>
        </div>
      </div>
    </div>

    <!-- Thông tin sân chọn hiển thị bên phải -->
    <div v-if="selectedField" class="field-info-popup">
      <div class="field-info">
        <img
          :src="selectedField.image"
          alt="Selected Field"
          class="field-image"
        />
        <div class="field-details">
          <h4>{{ selectedField.name }}</h4>
          <p>{{ selectedField.description }}</p>
        </div>
      </div>

      <form @submit.prevent="submitBooking">
        <div class="form-group">
          <label for="name">Name</label>
          <input
            type="text"
            id="name"
            v-model="bookingInfo.name"
            placeholder="Enter your name"
            required
          />
        </div>

        <!-- Chọn ngày -->
        <div class="form-group">
          <label for="date">Booking Date</label>
          <input
            type="date"
            id="date"
            v-model="bookingInfo.date"
            required
            @change="updateTimeSlots"
          />
        </div>

        <!-- Timeline hiển thị giờ -->
        <div class="timeline">
          <div
            v-for="slot in allTimeSlots"
            :key="slot.time"
            class="timeline-slot"
            :class="{
              'time-occupied': slot.occupied,
              'time-available': !slot.occupied,
            }"
            @click="selectTimeSlot(slot)"
          >
            <span class="time-label">{{ slot.time }}</span>
          </div>
        </div>

        <div class="form-group">
          <label for="phone">Phone Number</label>
          <input
            type="text"
            id="phone"
            v-model="bookingInfo.phone"
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div class="form-group">
          <label for="time">Booking Time</label>
          <select
            id="time"
            v-model="bookingInfo.time"
            :disabled="!allTimeSlots.some((slot) => !slot.occupied)"
            required
          >
            <option disabled value="">Select a time</option>
            <option v-for="time in availableTimes" :key="time" :value="time">
              {{ time }}
            </option>
          </select>
        </div>

        <button type="submit" class="btn-dns-primary">Confirm Booking</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bookingInfo: {
        name: "",
        phone: "",
        date: "",
        time: "",
      },
      fields: [
        {
          name: "Chuyen Viet Stadium",
          image:
            "https://www.sporta.vn/assets/default_venue_0-dc1f6687f619915230b62712508933a71a6e9529c390237b9766acc0d59539ab.webp",
          description: "A popular stadium in Da Nang.",
        },
        {
          name: "Chuyen Viet Stadium",
          image:
            "https://www.sporta.vn/assets/default_venue_0-dc1f6687f619915230b62712508933a71a6e9529c390237b9766acc0d59539ab.webp",
          description: "A popular stadium in Da Nang.",
        },
        {
          name: "Chuyen Viet Stadium",
          image:
            "https://www.sporta.vn/assets/default_venue_0-dc1f6687f619915230b62712508933a71a6e9529c390237b9766acc0d59539ab.webp",
          description: "A popular stadium in Da Nang.",
        },
        {
          name: "Chuyen Viet Stadium",
          image:
            "https://www.sporta.vn/assets/default_venue_0-dc1f6687f619915230b62712508933a71a6e9529c390237b9766acc0d59539ab.webp",
          description: "A popular stadium in Da Nang.",
        },
        {
          name: "Chuyen Viet Stadium",
          image:
            "https://www.sporta.vn/assets/default_venue_0-dc1f6687f619915230b62712508933a71a6e9529c390237b9766acc0d59539ab.webp",
          description: "A popular stadium in Da Nang.",
        },
      ],
      selectedField: null,
      availableTimes: [
        "09:00 AM",
        "10:00 AM",
        "11:00 AM",
        "01:00 PM",
        "02:00 PM",
      ],
      timeSlots: [],
      allTimeSlots: [],
      bookings: [
        {
          fieldName: "Chuyen Viet Stadium",
          date: "2025-01-17",
          time: "09:00 AM",
        },
        {
          fieldName: "Chuyen Viet Stadium",
          date: "2025-01-17",
          time: "10:00 AM",
        },
      ],
    };
  },
  methods: {
    selectField(field) {
      this.selectedField = field;
      this.bookingInfo.date = ""; // Clear previous date selection
    },
    updateTimeSlots() {
      const selectedDate = this.bookingInfo.date;

      // Create all possible time slots for the current date
      this.allTimeSlots = this.availableTimes.map((time) => ({
        time,
        occupied: this.bookings.some(
          (booking) =>
            booking.fieldName === this.selectedField.name &&
            booking.date === selectedDate &&
            booking.time === time
        ),
      }));
    },
    selectTimeSlot(slot) {
      this.bookingInfo.time = slot.time;
    },
    submitBooking() {
      if (
        this.bookingInfo.name &&
        this.bookingInfo.phone &&
        this.bookingInfo.date &&
        this.bookingInfo.time &&
        this.selectedField
      ) {
        // Add new booking
        this.bookings.push({
          fieldName: this.selectedField.name,
          date: this.bookingInfo.date,
          time: this.bookingInfo.time,
        });
        alert(
          `Booking confirmed for ${this.bookingInfo.name} on ${this.bookingInfo.date} at ${this.bookingInfo.time} in ${this.selectedField.name}.`
        );

        // Reset form
        this.bookingInfo = { name: "", phone: "", date: "", time: "" };
        this.selectedField = null;
        this.allTimeSlots = [];
      } else {
        alert("Please fill in all fields.");
      }
    },
  },
  mounted() {
    this.selectedField = this.fields[0];
  },
};
</script>

<style scoped>
.booking-container {
  display: flex;
  max-width: 1000px;
  max-height: 500ppx;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: #fff;
  gap: 20px;
}

.fields-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 500px;
  /* Chiều cao cố định của danh sách */
  overflow-y: auto;
  /* Cho phép cuộn dọc */
}

.field-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  transition: background 0.3s;
}

.field-item:hover {
  background-color: #f0f0f0;
}

.field-image {
  width: 100px;
  height: 80px;
  object-fit: cover;
  margin-right: 10px;
}

.field-details h4 {
  margin: 0;
}

.field-info-popup {
  flex: 2;
}

.field-info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.field-info .field-image {
  width: 150px;
  height: 100px;
  object-fit: cover;
  margin-right: 10px;
}

.field-details h4 {
  margin: 0;
  margin-bottom: 5px;
}

form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input,
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: var(--accent-color);
  color: var(--contrast-color);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background-color: var(--accent-color-hover);
}

.timeline {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.timeline-slot {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.time-label {
  margin-bottom: 5px;
}

.time-occupied {
  width: 40px;
  height: 40px;
  background-color: #ccc;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: not-allowed;
}

.time-available {
  width: 40px;
  height: 40px;
  background-color: #28a745;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.time-occupied {
  width: 40px;
  height: 40px;
  background-color: #ccc;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: not-allowed;
}
</style>
