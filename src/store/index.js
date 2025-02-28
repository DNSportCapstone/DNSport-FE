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
  },
  mutations: {
    setIdentity(state, identity) {
      state.identity = identity;
      localStorage.setItem("accessToken", identity.accessToken);
      localStorage.setItem("refreshToken", identity.refreshToken);
    },
    clearIdentity(state) {
      state.identity.accessToken = null;
      state.identity.refreshToken = null;
      state.identity.emailAddress = null;
      state.identity.fullName = null;
      state.identity.roleId = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
    setAccessToken(state, accessToken) {
      state.identity.accessToken = accessToken;
      localStorage.setItem("accessToken", accessToken);
    },
    setRefreshToken(state, refreshToken) {
      state.identity.refreshToken = refreshToken;
      localStorage.setItem("refreshToken", refreshToken);
    },
  },
  actions: {
    async login({ commit }, identity) {
      commit("setIdentity", identity);
    },
    setAccessToken({ commit }, accessToken) {
      commit("setAccessToken", accessToken);
    },

    setRefreshToken({ commit }, refreshToken) {
      commit("setRefreshToken", refreshToken);
    },

    logout({ commit }) {
      commit("clearIdentity");
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
