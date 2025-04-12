<template>
  <div
    class="modal fade"
    :class="{ show: visible, 'd-block': visible }"
    tabindex="-1"
    role="dialog"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <font-awesome-icon
            :icon="iconClass"
            class="message-box-icon me-2"
            size="2xl"
          />
          <h5 class="modal-title">{{ title }}</h5>
          <button type="button" class="btn-close" @click="close"></button>
        </div>
        <div class="modal-body">
          <p>{{ description }}</p>
        </div>
        <div class="modal-footer">
          <button
            v-if="showCancel"
            type="button"
            class="btn btn-dns-secondary"
            @click="close"
          >
            Cancel
          </button>
          <button type="button" class="btn btn-dns-primary" @click="confirm">
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";
export default {
  props: {
    visible: Boolean,
    title: String,
    description: String,
    type: String,
    confirmText: {
      type: String,
      default: "Confirm",
    },
    showCancel: Boolean,
  },
  computed: {
    iconClass() {
      const icons = {
        warning: ["fas", "triangle-exclamation"],
        info: ["fas", "circle-info"],
        success: ["fas", "circle-check"],
        error: ["fas", "circle-xmark"],
      };
      return icons[this.type] || null;
    },
  },
  methods: {
    close() {
      this.$emit("update:visible", false);
    },
    confirm() {
      this.$emit("confirm");
      this.close();
    },
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        setTimeout(() => {
          const modal = new Modal(this.$el);
          modal.show();
        }, 10);
      }
    },
  },
};
</script>

<style scoped>
.modal.d-block {
  background: rgba(0, 0, 0, 0.5);
}

.modal-title,
.message-box-icon {
  color: #006400;
}
</style>
