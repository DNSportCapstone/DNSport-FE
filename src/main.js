import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vue3GoogleLogin from "vue3-google-login";
import store from "./store";
import i18n from "./locales";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
/* import specific icons */
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

/* import custom css */
import "@/assets/css/common.css";
import "@/assets/css/header.css";
import "@/assets/css/shop.css";
import "@/assets/css/booking.css";
import "@/assets/css/checkout.css";

library.add(fas);
library.add(far);
library.add(fab);

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(vue3GoogleLogin, {
  clientId:
    "986690553182-iu46essfat950aivttt815jpnbr0cku5.apps.googleusercontent.com",
});
app.use(i18n);
app.use(router);
app.use(store);
app.mount("#app");
