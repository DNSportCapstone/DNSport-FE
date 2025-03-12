import store from "../store";
import { jwtDecode } from "jwt-decode";
import { useI18n } from "vue-i18n";

const CommonHelper = {
  formatVND(number) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(number);
  },

  getCurrentUserId() {
    const accessTokenDecoded = jwtDecode(
      store.getters.accessToken ?? localStorage.getItem("accessToken")
    );
    return accessTokenDecoded.userId;
  },

  convertToDate(isoString) {
    const { locale } = useI18n();
    const date = new Date(isoString);
    return date.toLocaleDateString(locale.value);
  },

  convertToDateTime(isoString) {
    const { locale } = useI18n();
    const date = new Date(isoString);
    return date.toLocaleString(locale.value);
  },
};

export default CommonHelper;
