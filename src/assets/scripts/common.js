import store from "../../store";
import { jwtDecode } from "jwt-decode";

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
};

export default CommonHelper;
