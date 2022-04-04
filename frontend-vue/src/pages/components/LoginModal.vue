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
      </template>
      <div slot="footer" class="justify-content-center">
        <n-button type="warning" round size="lg" @click="eableWallet">
          지갑 연결하기
        </n-button>
      </div>
    </modal>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { FormGroupInput, Button, Modal } from '@/components';
import { getAddressFrom } from '../../utils/eth.js';

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
    };
  },
  methods: {
    ...mapActions(['vuexSetPrivKey', 'vuexSetAddress']),
    eableWallet() {
      try {
        const address = getAddressFrom(this.privKey);
        this.vuexSetAddress(address);
        this.vuexSetPrivKey(this.privKey);
        this.modals.notice = false;
      } catch (error) {
        console.log(error);
        this.showErr = true;
      }
    },
  },
  computed: {
    ...mapState(['address']),
    ...mapGetters(['isLogin']),
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
