<template>
  <div class="container mt-4">
    <h4>Progress</h4>

    <!-- Progress Bar -->
    <div class="progress mb-3" style="height: 30px">
      <div class="progress-bar bg-success" :style="{ width: progressWidth }">
        {{ `Step ${currentStep} / ${steps.length}` }}
      </div>
    </div>

    <!-- Step Indicators -->
    <div class="d-flex justify-content-between">
      <div v-for="(step, index) in steps" :key="index" class="step text-center">
        <div
          :class="[
            'btn',
            'rounded-circle',
            currentStep > index ? 'btn-success' : 'btn-secondary',
          ]"
        >
          {{ index + 1 }}
        </div>
        <p>{{ step }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentStep: {
      type: Number,
      required: true,
    },
    steps: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    progressWidth() {
      return `${(this.currentStep / this.steps.length) * 100}%`;
    },
  },
  methods: {},
};
</script>

<style>
.step .btn {
  width: 40px;
  height: 40px;
  font-size: 18px;
}
</style>
