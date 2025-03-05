<template>
  <div
    _ngcontent-c26=""
    @click="handleClick()"
    :class="
      isChoose
        ? 'mlp-slot rounded float-left mlp-slot-avail ng-star-inserted isChoose'
        : 'mlp-slot rounded float-left mlp-slot-avail ng-star-inserted'
    "
  >
    <!---->
    <div _ngcontent-c26="" class="ng-star-inserted">
      <div _ngcontent-c26="" class="mlp-line-one">
        {{ time }}
      </div>
      <div _ngcontent-c26="" class="mlp-line-two">
        <!---->

        <!---->

        <!----><span _ngcontent-c26="" class="ng-star-inserted">
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
      if (this.isChoose) {
        this.isChoose = false;
      } else {
        this.isChoose = true;
      }
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
<style>
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

.isChoose {
  background-color: #56e07b !important;
}
</style>
