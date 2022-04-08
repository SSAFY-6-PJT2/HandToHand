<!--
@author Hyeonsooryu
-->

<template>
  <div>
    <!-- 기부 Form -->
    <card class="mr-5" color="black" :width="24" :height="22" noFooterLine>
      <template slot="header">
        <h3 class="card-title title-up">기부하기</h3>
        <p v-if="isWalletConnected">내 지갑 잔액: {{ this.userBalance }}</p>
      </template>
      <template>
        <fg-input
          class="no-border"
          placeholder="보낼 금액(HTH)"
          addon-right-icon="now-ui-icons business_money-coins"
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
        <n-button v-if="isWalletConnected" type="success" round size="lg"
          >송금하기</n-button
        >
        <n-button v-else @click="enableWallet" type="success" round size="lg"
          >지갑 연결하기</n-button
        >
      </template>
    </card>
    <!-- 메타마스크 설치 안내 모달 -->
    <modal
      :show.sync="modals.notice"
      footer-classes="justify-content-center"
      type="notice"
      :showClose="false"
    >
      <h5 slot="header" class="modal-title text-center text-black">
        메타마스크 설치가 필요합니다.
      </h5>
      <template>
        <p class="text-left text-black" style="line-height: 2.4">
          가상화폐 송금을 위해 메타마스크 설치가 필요합니다.<br />
          아래 버튼을 클릭하면 메타마스크 설치 페이지로 이동합니다.
        </p>
      </template>
      <div slot="footer" class="justify-content-center">
        <a
          class="btn btn-success btn-round"
          href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
          target="_blank"
        >
          메타마스크 설치하기
        </a>
      </div>
    </modal>
  </div>
</template>
<script>
import { Card, FormGroupInput, Button, Modal } from '@/components';
import {
  isMetaMaskInstalled,
  isWalletConnected,
  getAddress,
  ethRequest,
} from '@/utils/metamask.js';

export default {
  components: {
    Card,
    Modal,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
  },
  data() {
    return {
      userAddress: null,
      userBalance: null,
      isMetaMaskInstalled: null,
      isWalletConnected: false,
      modals: {
        classic: false,
        notice: false,
      },
    };
  },
  methods: {
    // 메타마스크 설치 여부 확인
    checkMetaMaskInstalled() {
      this.isMetaMaskInstalled = isMetaMaskInstalled();
      console.log(`메타마스크 설치 여부: ${this.isMetaMaskInstalled}`);
    },
    // 지갑 연결 여부 확인
    checkWalletIsConnected() {
      this.isWalletConnected = isWalletConnected();
      console.log(`지갑 연결 여부: ${this.isWalletConnected}`);
    },
    // 지갑 연결
    enableWallet() {
      // 메타마스크 설치 되어 있으면 지갑 연결 진행
      if (this.isMetaMaskInstalled) {
        ethRequest('eth_requestAccounts')
          .then((res) => {
            this.checkWalletIsConnected();
            // 코인 전환 - 지갑에 접근해서 잔액 조회는 web3 사용해야 할듯
            ethRequest('wallet_switchEthereumChain', [{ chainId: '0x79f5' }]);
            // .then((res) => console.log)
            // .catch((err) => console.log);
            this.userAddress = getAddress();
            //
            ethRequest('eth_getBalance', [this.userAddress, 'latest']).then(
              (res) => {
                this.userBalance = parseInt(res.result, 16);
              },
            );
          })
          .catch((err) => console.log);
      }
      // 메타마스크 설치 안 된 경우 모달로 설치 안내
      else {
        this.modals.mini = true;
      }
    },
    // 송금
  },
  mounted() {
    this.checkMetaMaskInstalled();
    this.checkWalletIsConnected();
    if (this.isWalletConnected) {
    }
  },
};
</script>
<style scoped></style>
