<template>
  <div
    _ngcontent-c26=""
    @click="handleClick()"
    :class="[
      'mlp-slot rounded float-left ng-star-inserted',
      isChoose ? 'mlp-slot-avail isChoose' : '',
      isBooked ? 'mlp-slot-unavail' : 'mlp-slot-avail',
    ]"
  >
    <!---->
    <div _ngcontent-c26="" class="ng-star-inserted">
      <div _ngcontent-c26="" class="mlp-line-one">
        {{ time }}
      </div>
      <div _ngcontent-c26="" class="mlp-line-two">
        <span v-if="isBooked" _ngcontent-c26="" class="ng-star-inserted">
          Booked
        </span>
        <span v-else _ngcontent-c26="" class="ng-star-inserted">
          {{ formatCurrency(price) }}
        </span>
      </div>
      <div _ngcontent-c26="" class="mlp-line-three">{{ duration }} min</div>
    </div>
  </div>
</template>
<script>
/* import JS functions */
import CommonHelper from "@/utils/common";
export default {
  name: "SlotElement",
  components: {},
  directives: {},
  extends: {},
  mixins: [],
  props: {
    time: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    isBooked: {
      type: Boolean,
      required: true,
    },
    fieldId: {
      type: Number,
      required: true,
    },
    fieldName: {
      type: String,
      required: true,
    },
  },
  emits: ["eventName"],
  data() {
    return {
      count: 0,
      isChoose: false,
    };
  },
  computed: {
    // 8. Thuộc tính tính toán
    reversedMsg() {
      return this.msg.split("").reverse().join("");
    },
  },
  methods: {
    // 9. Phương thức
    increment() {
      this.count++;
    },
    handleClick() {
      if (this.isBooked) return; // Không cho chọn nếu đã đặt

      this.isChoose = !this.isChoose;

      // Emit sự kiện để truyền slot đã chọn ra ngoài
      this.$emit("slotSelected", {
        time: this.time,
        price: this.price,
        duration: this.duration,
        isChoose: this.isChoose,
        fieldId: this.fieldId,
        fieldName: this.fieldName,
      });
    },
    formatCurrency(value) {
      return CommonHelper.formatVND(value); // Gọi trực tiếp từ component
    },
  },
  watch: {
    // 10. Theo dõi dữ liệu
    msg(newValue, oldValue) {
      console.log(`msg changed from ${oldValue} to ${newValue}`);
    },
  },
  mounted() {
    // 11. Phương thức vòng đời
    console.log("Component mounted");
  },
};
</script>
<style scoped>
.mlp-slot[_ngcontent-c26] {
  text-align: center;
  border: 1px solid #d6d5d5;
  padding: 5px 6px;
  margin: 6px;
  font-size: 80%;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  line-height: 1.4;
  height: 70px;
  width: 100px;
  transition: background-color 0.2s ease-in-out;
}

.mlp-slot-avail[_ngcontent-c26] {
  cursor: pointer;
  background-color: #ccf5d7;
  border: 1px solid #56e07b;
}

.mlp-slot-avail[_ngcontent-c26]:hover {
  background-color: #56e07b;
}

.mlp-slot-avail[_ngcontent-c26] .mlp-line-one[_ngcontent-c26] {
  font-size: 120%;
  letter-spacing: 1.5px;
  font-weight: 600;
}

.mlp-slot-avail[_ngcontent-c26] .mlp-line-one[_ngcontent-c26] {
  font-size: 120%;
  letter-spacing: 1.5px;
  font-weight: 600;
}

.mlp-slot-unavail {
  background-color: #d6d6d6; /* Màu nền xám nhạt */
  border: 1px solid #a0a0a0; /* Viền xám đậm */
  cursor: not-allowed;
  opacity: 0.7; /* Làm mờ một chút */
  pointer-events: none;
}

.mlp-slot-unavail .mlp-line-one {
  font-size: 120%;
  letter-spacing: 1.5px;
  font-weight: 600;
  color: #606060; /* Màu chữ xám đậm */
}

.isChoose {
  background-color: #56e07b !important;
}
</style>
