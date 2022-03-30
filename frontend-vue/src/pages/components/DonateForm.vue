<template>
  <div>
    <!-- 기부 Form -->
    <card class="mr-5" color="black" :width="24" :height="22" noFooterLine>
      <template slot="header">
        <h3 class="card-title title-up">기부하기</h3>
        <div class="d-flex justify-content-between align-items-center">
          <n-button
            v-if="isLogin"
            type="success"
            round
            size="sm"
            class="my-0 mx-4"
            @click="getBalance"
          >
            잔액 조회
          </n-button>
          <p v-if="isLogin" class="my-0 mx-4">
            {{ userBalance ? userBalance : '-' }} SSF
          </p>
        </div>
      </template>
      <template>
        <fg-input
          class="no-border"
          placeholder="보낼 금액(SSF)"
          addon-right-icon="now-ui-icons business_money-coins"
          v-model="amount"
        >
        </fg-input>

        <fg-input
          class="no-border"
          addon-right-icon="now-ui-icons location_world"
          value="우크라이나 정부"
          :disabled="true"
        >
        </fg-input>
      </template>
      <template slot="footer" class="text-center">
        <n-button v-if="isLogin && !isLoading" type="success" round size="lg" @click="donate">
          송금하기
        </n-button>
        <n-button v-if="isLogin && isLoading" type="success" round size="lg" @click="donate">
          <div class="spinner-border spinner-border-sm text-light" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </n-button>
        <n-button
          v-if="!isLogin"
          @click="showModal = true"
          type="warning"
          round
          size="lg"
        >
          지갑 연결하기
        </n-button>
      </template>
    </card>
    <LoginModal :showModal="showModal" @closeModal="showModal = false" />
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { Card, FormGroupInput, Button, Modal } from '@/components';
import LoginModal from '../components/LoginModal.vue';
import { ethGetBalance, ethTransferToAdmin, ethGetTxStatus } from '@/utils/eth.js';

export default {
  components: {
    Card,
    LoginModal,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
  },
  data() {
    return {
      userBalance: null,
      amount: null,
      isValid: false,
      showModal: false,
      isLoading: false
    };
  },
  methods: {
    ...mapActions(['vuexAddDonationHistory']),
    getBalance() {
      ethGetBalance(this.userAddress)
        .then((res) => {
          this.userBalance = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async donate() {
      console.log('donate!');
      this.isLoading = true
      if (
        this.privKey &&
        this.userBalance &&
        this.amount &&
        this.userBalance >= this.amount
      ) {
        const sendResult = await ethTransferToAdmin(this.userAddress, this.privKey, this.amount)
        this.isLoading = false
        console.log(sendResult.data)
        console.log(sendResult.receipt)
        this.vuexAddDonationHistory(sendResult.receipt)
        await ethGetTxStatus(sendResult.receipt.transactionHash)
          .then(res => {
            console.log(res)
          })
      } else {
        if (!this.amount) {
          console.log('보낼 토큰의 양을 입력해주세요.');
        }
      }
    },
  },
  computed: {
    ...mapState(['privKey', 'userAddress']),
    ...mapGetters(['isLogin']),
  },
};
</script>
<style scoped></style>
