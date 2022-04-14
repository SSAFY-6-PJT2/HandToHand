<template>
  <div>
    <sale-loading-modal
      :showModal="showModal"
      :loadingMsg="loadingMsg"
      :loadingIsDone="loadingIsDone"
    />
    <fg-input
      placeholder="최소 입찰 금액 (HTH)"
      addon-left-icon="now-ui-icons business_money-coins"
      v-model="minPrice"
    >
    </fg-input>
    <fg-input
      placeholder="즉시 구매 금액 (HTH)"
      addon-left-icon="now-ui-icons objects_spaceship"
      v-model="purchasePrice"
    >
    </fg-input>
    <fg-input>
      <el-date-picker
        v-model="endTime"
        type="datetime"
        placeholder="판매 종료 날짜 및 시각"
        value-format="timestamp"
      >
      </el-date-picker>
    </fg-input>
    <div class="d-flex">
      <n-button class="mr-1" type="info" round block @click="CreateSale"
        >판매 등록</n-button
      >
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { DatePicker } from 'element-ui';
import { FormGroupInput, Button } from '@/components';
import { createSale } from '../../utils/SaleFactory.js';
import SaleLoadingModal from './SaleLoadingModal.vue';

export default {
  components: {
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
    [DatePicker.name]: DatePicker,
    SaleLoadingModal,
  },
  props: {
    item: Object,
  },
  data() {
    return {
      minPrice: null,
      purchasePrice: null,
      startTime: null,
      endTime: null,

      // Modal
      showModal: false,
      loadingMsg: null,
      loadingIsDone: false,
    };
  },
  methods: {
    CreateSale() {
      this.showModal = true;
      this.loadingMsg = '판매 등록 중입니다..';
      this.startTime = new Date();
      this.startTime = parseInt(this.startTime.getTime() / 1000);
      this.endTime = this.endTime / 1000;
      createSale(
        this.userAddress,
        this.privKey,
        this.item.tokenId,
        this.minPrice,
        this.purchasePrice,
        this.startTime,
        this.endTime,
      )
        .then((res) => {
          this.loadingMsg = '판매 등록을 기록중입니다.';
          this.loadingIsDone = true;
          setTimeout(() => {
            this.loadingMsg = '판매 등록 완료되었습니다.';
            this.showModal = false;
            this.$emit('updateDetail');
          }, 8000);
        })
        .catch((err) => {
          this.loadingMsg = '잘못된 요청입니다.';
          this.loadingIsDone = true;
          setTimeout(() => {
            this.showModal = false;
            this.$emit('updateDetail');
          }, 2000);
        });
    },
  },
  computed: {
    ...mapState(['privKey', 'userAddress']),
    ...mapGetters(['isLogin']),
  },
};
</script>

<style></style>
