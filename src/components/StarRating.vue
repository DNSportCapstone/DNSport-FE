<template>
  <div class="star-rating">
    <span
      v-for="star in 5"
      :key="star"
      :class="{ selected: star <= selectedRating }"
      @click="selectRating(star)"
    >
      ★
    </span>
  </div>
</template>

<script>
export default {
  props: {
    disabled: Boolean,
  },
  data() {
    return {
      selectedRating: 0,
    };
  },
  methods: {
    selectRating(star) {
      if (!this.disabled) {
        this.selectedRating = star;
        this.$emit("rating-selected", star);
      }
    },
  },
};
</script>

<style scoped>
.star-rating {
  font-size: 24px;
  cursor: pointer;
}

.selected {
  color: gold;
}
</style>
