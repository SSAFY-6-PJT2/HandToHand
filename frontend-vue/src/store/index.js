/**
 * @author Hyeonsooryu
 */

import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    privKey: null,
    userAddress: null,
    nickname: null,
    donationHistory: [],
    totalDonation: 0,
    totalNft: 0,
  },
  getters: {
    isLogin: (state) => {
      return state.userAddress !== null;
    },
    donationTxHashes: (state) => {
      return state.donationHistory.map((v) => v.transactionHash);
    },
  },
  mutations: {
    SET_PRIV_KEY: (state, privKey) => {
      state.privKey = privKey;
    },
    SET_ADDRESS: (state, address) => {
      state.userAddress = address;
    },
    SET_NICKNAME: (state, nickname) => {
      state.nickname = nickname;
    },
    ADD_DONATION_HISTORY: (state, txHash) => {
      state.donationHistory.push(txHash);
    },
    SET_TOTAL_DONATION: (state, amount) => {
      state.totalDonation = amount;
    },
    SET_TOTAL_NFT: (state, numOfNft) => {
      state.totalNft = numOfNft;
    },
  },
  actions: {
    vuexSetPrivKey({ commit }, privKey) {
      commit('SET_PRIV_KEY', privKey);
    },
    vuexSetAddress({ commit }, address) {
      commit('SET_ADDRESS', address);
    },
    vuexSetNickname({ commit }, nickname) {
      commit('SET_NICKNAME', nickname);
    },
    vuexAddDonationHistory({ commit }, txHash) {
      commit('ADD_DONATION_HISTORY', txHash);
    },
    vuexUpdateTotalDonation({ commit }, amount) {
      commit('SET_TOTAL_DONATION', amount);
    },
    vuexUpdateTotalNft({ commit }, numOfNft) {
      commit('SET_TOTAL_NFT', numOfNft);
    },
  },
  modules: {},
  plugins: [createPersistedState()],
});
