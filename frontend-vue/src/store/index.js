import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    priveKey: null,
    address: null,
  },
  getters: {
    isLogin: (state) => {
      return state.address !== null;
    },
  },
  mutations: {
    SET_PRIV_KEY: (state, privKey) => {
      state.priveKey = privKey;
    },
    SET_ADDRESS: (state, address) => {
      state.address = address;
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
});
