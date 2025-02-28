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

    <!-- Buttons -->
    <div class="mt-4 text-center">
      <button
        class="btn btn-secondary me-2"
        :disabled="currentStep === 1"
        @click="prevStep"
      >
        Back
      </button>
      <button
        class="btn btn-primary"
        :disabled="currentStep === steps.length"
        @click="nextStep"
      >
        Continue
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentStep: 1,
      steps: ["Choose Fields", "Confirm Information", "Payment"],
    };
  },
  computed: {
    progressWidth() {
      return `${(this.currentStep / this.steps.length) * 100}%`;
    },
  },
  methods: {
    nextStep() {
      if (this.currentStep < this.steps.length) this.currentStep++;
    },
    prevStep() {
      if (this.currentStep > 1) this.currentStep--;
    },
  },
};
</script>

<style>
.step .btn {
  width: 40px;
  height: 40px;
  font-size: 18px;
}
</style>
