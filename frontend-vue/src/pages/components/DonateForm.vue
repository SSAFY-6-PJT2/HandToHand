<!--
@author Hyeonsooryu
-->

<template>
  <div>
    <!-- 기부 Form -->
    <card class="mr-5" color="black" :width="24" :height="24" noFooterLine>
      <template slot="header">
        <h3 class="card-title title-up">기부하기</h3>
        <div class="d-flex justify-content-between align-items-center">
          <n-button
            v-if="isLogin"
            type="success"
            round
            size="sm"
            class="my-0 mx-4"
            @click="getUserBalance"
          >
            잔액 조회
          </n-button>
          <p v-if="isLogin" class="my-0 mx-4">
            {{ userBalance ? userBalance : '-' }} HTH
          </p>
        </div>
      </template>
      <template>
        <fg-input
          class="no-border"
          placeholder="보낼 금액(HTH)"
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
        <p v-show="errMsg" class="text-danger mb-0" style="font-size: 14px">
          {{ errMsg }}
        </p>
      </template>
      <template slot="footer" class="text-center">
        <n-button
          v-if="isLogin && !isLoading"
          type="success"
          round
          size="lg"
          @click="donate"
        >
          송금하기
        </n-button>
        <n-button v-if="isLogin && isLoading" type="success" round size="lg">
          <div
            class="spinner-border spinner-border-sm text-light"
            role="status"
          >
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
import { getBalance, tokenTransfer } from '../../utils/Token';
import { getTxStatus } from '../../utils/eth';
import {
  getDonationHistory,
  addDonationHistory,
  updateDonationStatus,
} from '@/api/donationAPI.js';

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
      isLoading: false,
      errMsg: '',
    };
  },
  methods: {
    ...mapActions(['vuexAddDonationHistory']),
    getUserBalance() {
      getBalance(this.userAddress).then((res) => {
        this.userBalance = res;
      });
    },
    async donate() {
      console.log('donate!');
      // 로딩 시작
      this.isLoading = true;
      console.log(+this.amount);
      console.log(typeof +this.amount);
      console.log(+this.userBalance);
      console.log(typeof +this.userBalance);
      console.log(this.userBalance >= this.amount);
      console.log(+this.userBalance >= +this.amount);

      if (
        this.privKey &&
        +this.userBalance &&
        +this.amount &&
        +this.userBalance >= +this.amount
      ) {
        this.errMsg = '';
        // 송금
        const sendResult = await tokenTransfer(
          this.userAddress,
          this.privKey,
          process.env.VUE_APP_ADMIN_ADDRESS,
          this.amount,
        );
        // 기부 내역 저장
        await addDonationHistory(
          this.amount,
          sendResult.receipt.transactionHash,
          this.userAddress,
          (res) => {
            // console.log(res);
          },
          (err) => {
            // console.log(err);
          },
        );
        this.$router.push('/profile/donation-history');
      } else {
        this.isLoading = false;
        if (!this.amount) {
          this.errMsg = '보낼 토큰의 양을 입력해주세요.';
          console.log('보낼 토큰의 양을 입력해주세요.');
        } else if (isNaN(+this.amount)) {
          this.errMsg = '보낼 토큰이 잘못 입력되었습니다.';
        } else if (!(+this.userBalance >= +this.amount)) {
          this.errMsg = '잔액이 부족합니다.';
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
