import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    privKey: null,
    userAddress: null,
  },
  getters: {
    isLogin: (state) => {
      return state.userAddress !== null;
    },
  },
  mutations: {
    SET_PRIV_KEY: (state, privKey) => {
      state.privKey = privKey;
    },
    SET_ADDRESS: (state, address) => {
      state.userAddress = address;
    },
  },
  actions: {
    vuexSetPrivKey({ commit }, privKey) {
      commit('SET_PRIV_KEY', privKey);
    },
    vuexSetAddress({ commit }, address) {
      commit('SET_ADDRESS', address);
    },
  },
  modules: {},
  plugins: [createPersistedState()],
});
