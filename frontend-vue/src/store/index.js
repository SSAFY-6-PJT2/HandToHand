import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    privKey: null,
    userAddress: null,
    donationHistory: []
  },
  getters: {
    isLogin: (state) => {
      return state.userAddress !== null;
    },
    donationTxHashes: (state) => {
      return state.donationHistory.map(v => v.transactionHash)
    }
  },
  mutations: {
    SET_PRIV_KEY: (state, privKey) => {
      state.privKey = privKey;
    },
    SET_ADDRESS: (state, address) => {
      state.userAddress = address;
    },
    ADD_DONATION_HISTORY: (state, txHash) => {
      state.donationHistory.push(txHash)
    }
  },
  actions: {
    vuexSetPrivKey({ commit }, privKey) {
      commit('SET_PRIV_KEY', privKey);
    },
    vuexSetAddress({ commit }, address) {
      commit('SET_ADDRESS', address);
    },
    vuexAddDonationHistory({ commit }, txHash) {
      commit('ADD_DONATION_HISTORY', txHash)
    }
  },
  modules: {},
  plugins: [createPersistedState()],
});
