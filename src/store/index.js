import { createStore } from "vuex";

const store = createStore({
  state: {
    identity: {
      accessToken: localStorage.getItem("accessToken") || null,
      refreshToken: localStorage.getItem("refreshToken") || null,
      userId: null,
      emailAddress: null,
      fullName: null,
      roleId: null,
    },
    isLoading: false,
    chosenServices: [],
    multipleBookingModel: null,
  },
  mutations: {
    SET_IDENTITY(state, identity) {
      state.identity = identity;
      localStorage.setItem("accessToken", identity.accessToken);
      localStorage.setItem("refreshToken", identity.refreshToken);
    },
    CLEAR_IDENTITY(state) {
      state.identity.accessToken = null;
      state.identity.refreshToken = null;
      state.identity.userId = null;
      state.identity.emailAddress = null;
      state.identity.fullName = null;
      state.identity.roleId = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
    SET_ACCESS_TOKEN(state, accessToken) {
      state.identity.accessToken = accessToken;
      localStorage.setItem("accessToken", accessToken);
    },
    SET_REFRESH_TOKEN(state, refreshToken) {
      state.identity.refreshToken = refreshToken;
      localStorage.setItem("refreshToken", refreshToken);
    },
    SET_LOADING(state, status) {
      state.isLoading = status;
    },
    SET_CHOSEN_SERVICES(state, services) {
      state.chosenServices = services;
    },
    UPDATE_SERVICE_QUANTITY(state, { index, quantity }) {
      state.chosenServices[index].quantity = quantity;
    },
    REMOVE_SERVICE(state, index) {
      state.chosenServices.splice(index, 1);
    },
    SET_MULTIPLE_BOOKING_MODEL(state, multipleBookingModel) {
      state.multipleBookingModel = multipleBookingModel;
      localStorage.setItem(
        "multipleBookingModel",
        JSON.stringify(multipleBookingModel)
      );
    },
    CLEAR_MULTIPLE_BOOKING_MODEL(state) {
      state.multipleBookingModel = null;
      localStorage.removeItem("multipleBookingModel");
    },
  },
  actions: {
    async login({ commit }, identity) {
      commit("SET_IDENTITY", identity);
    },
    async setIdentity({ commit }, identity) {
      commit("SET_IDENTITY", identity);
    },
    setAccessToken({ commit }, accessToken) {
      commit("SET_ACCESS_TOKEN", accessToken);
    },

    setRefreshToken({ commit }, refreshToken) {
      commit("SET_REFRESH_TOKEN", refreshToken);
    },

    async logout({ commit }) {
      commit("CLEAR_IDENTITY");
    },
    setLoading({ commit }, status) {
      commit("SET_LOADING", status);
    },
    setChosenServices({ commit }, services) {
      commit("SET_CHOSEN_SERVICES", services);
    },
    updateServiceQuantity({ commit }, payload) {
      commit("UPDATE_SERVICE_QUANTITY", payload);
    },
    removeService({ commit }, index) {
      commit("REMOVE_SERVICE", index);
    },
    setMultipleBookingModel({ commit }, model) {
      commit("SET_MULTIPLE_BOOKING_MODEL", model);
    },
    clearMultipleBookingModel({ commit }) {
      commit("CLEAR_MULTIPLE_BOOKING_MODEL");
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.identity.accessToken,
    accessToken: (state) => state.identity.accessToken,
    refreshToken: (state) => state.identity.refreshToken,
    identity: (state) => state.identity,
    multipleBookingModel: (state) =>
      state.multipleBookingModel ||
      JSON.parse(localStorage.getItem("multipleBookingModel")),
    chosenServices: (state) => state.chosenServices,
  },
});

export default store;
