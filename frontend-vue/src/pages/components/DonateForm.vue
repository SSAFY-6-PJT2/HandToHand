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
          placeholder="보낼 금액(SSF)"
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
        <n-button v-if="isLogin" type="success" round size="lg"
          >송금하기</n-button
        >
        <n-button
          v-else
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
import { mapGetters } from 'vuex';
import { Card, FormGroupInput, Button, Modal } from '@/components';
import LoginModal from '../components/LoginModal.vue';

export default {
  components: {
    Card,
    LoginModal,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
  },
  data() {
    return {
      userAddress: null,
      userBalance: null,
      privKey: null,
      isWalletConnected: false,
      showModal: false,
    };
  },
  computed: {
    ...mapGetters(['isLogin']),
  },
};
</script>
<style scoped></style>
