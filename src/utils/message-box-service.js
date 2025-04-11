import { createApp, h } from "vue";
import MessageBox from "@/components/MessageBox.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export function showMessageBox(
  { title = "Information", description, type = "info", showCancel = false },
  callback = null
) {
  const container = document.createElement("div");
  document.body.appendChild(container);

  const app = createApp({
    data() {
      return { visible: true };
    },
    methods: {
      confirm() {
        callback(true);
        this.close();
      },
      close() {
        callback(false);
        this.visible = false;
        setTimeout(() => {
          app.unmount();
          document.body.removeChild(container);
        }, 300);
      },
    },
    render() {
      return h(MessageBox, {
        visible: this.visible,
        title,
        description,
        type,
        showCancel,
        "onUpdate:visible": (v) => (this.visible = v),
        onConfirm: callback != null ? this.confirm : null,
      });
    },
  });

  app.component("font-awesome-icon", FontAwesomeIcon);

  app.mount(container);
}
