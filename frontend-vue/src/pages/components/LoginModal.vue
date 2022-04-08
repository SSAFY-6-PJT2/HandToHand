<!--
@author Hyeonsooryu
-->

<template>
  <div>
    <modal
      :show.sync="modals.notice"
      footer-classes="justify-content-center"
      type="notice"
      :showClose="false"
    >
      <h5 slot="header" class="modal-title text-center text-black">
        지갑 연결이 필요합니다.
      </h5>
      <template>
        <!-- 
          @유현수 개인키: 0x122226fb09f7d1c3d313f02e79f134aa36f0981602c438543fe9bb1105e1104a
        -->
        <p class="text-left text-black" style="line-height: 2.4">
          지갑 연결을 위해 개인키를 입력해주세요.
        </p>
        <fg-input
          class="no-border"
          addon-right-icon="now-ui-icons objects_key-25"
          v-model="privKey"
        ></fg-input>
        <p v-if="showErr" class="text-danger" style="font-size: 14px">
          유효한 개인키를 입력해주세요.
        </p>
        <p v-if="isLoading" class="text-danger" style="font-size: 14px">
          {{ loadingMsg }}
        </p>
      </template>
      <div slot="footer" class="justify-content-center">
        <n-button
          v-if="!isLoading"
          type="warning"
          round
          size="lg"
          @click="eableWallet"
        >
          지갑 연결하기
        </n-button>
        <n-button v-else type="warning" round size="lg">
          <div
            class="spinner-border spinner-border-sm text-light"
            role="status"
          >
            <span class="sr-only">Loading...</span>
          </div>
        </n-button>
      </div>
    </modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { FormGroupInput, Button, Modal } from '@/components';
import { addUser, getNickname } from '../../api/userAPI';
import { getAddressFrom } from '../../utils/eth.js';
import { getBalance, tokenMint, tokenTransfer } from '../../utils/Token.js';

export default {
  components: {
    Modal,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
  },
  props: {
    showModal: Boolean,
  },
  data() {
    return {
      modals: {
        notice: false,
      },
      privKey: null,
      showErr: false,
      isLoading: false,
      loadingMsg: null,
    };
  },
  methods: {
    ...mapActions(['vuexSetPrivKey', 'vuexSetAddress', 'vuexSetNickname']),
    async eableWallet() {
      try {
        this.isLoading = true;
        const address = getAddressFrom(this.privKey);
        this.loadingMsg = '기존 회원인지 확인 중입니다..';
        await addUser(address);
        await this.transferFaucet(address);
        this.vuexSetAddress(address);
        this.vuexSetPrivKey(this.privKey);
        const nickname = await getNickname(address);
        this.vuexSetNickname(nickname.data);
        this.modals.notice = false;
        this.isLoading = false;
      } catch (error) {
        console.log(error);
        this.showErr = true;
        this.isLoading = false;
      }
    },
    async transferFaucet(toAddr) {
      this.loadingMsg = '지갑 잔액 조회 중입니다...';
      await getBalance(toAddr)
        .then(async (res) => {
          if (res === '0') {
            this.loadingMsg = '토큰 생성 중입니다...';
            await tokenMint(
              process.env.VUE_APP_ADMIN_ADDRESS,
              process.env.VUE_APP_ADMIN_PRIV_KEY,
              1000,
            );
            this.loadingMsg = '해당 지갑으로 토큰 지급 중입니다..';
            await tokenTransfer(
              process.env.VUE_APP_ADMIN_ADDRESS,
              process.env.VUE_APP_ADMIN_PRIV_KEY,
              toAddr,
              1000,
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  watch: {
    showModal() {
      this.modals.notice = this.showModal;
    },
    modals: {
      deep: true,
      handler() {
        if (!this.modals.notice) this.$emit('closeModal');
      },
    },
  },
};
</script>

<style></style>
