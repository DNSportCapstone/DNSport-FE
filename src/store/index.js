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
  },
  getters: {
    isAuthenticated: (state) => !!state.identity.accessToken,
    accessToken: (state) => state.identity.accessToken,
    refreshToken: (state) => state.identity.refreshToken,
    identity: (state) => state.identity,
  },
});

export default store;
