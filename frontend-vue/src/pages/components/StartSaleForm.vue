<template>
  <div>
    <fg-input
      placeholder="최소 입찰 금액 (HTH)"
      addon-left-icon="now-ui-icons business_money-coins"
      v-model="minBidAmount"
    >
    </fg-input>
    <fg-input
      placeholder="즉시 구매 금액 (HTH)"
      addon-left-icon="now-ui-icons objects_spaceship"
      v-model="instantBuyAmount"
    >
    </fg-input>
    <fg-input>
      <el-date-picker
        v-model="dateTime"
        type="datetime"
        placeholder="판매 종료 날짜 및 시각"
        value-format="timestamp"
      >
      </el-date-picker>
    </fg-input>
    <div class="d-flex">
      <n-button class="mr-1" type="success" round block>판매 등록</n-button>
      <n-button class="ml-1" type="warning" round block>판매 취소</n-button>
    </div>
  </div>
</template>

<script>
import { DatePicker } from 'element-ui';
import { FormGroupInput, Button } from '@/components';

export default {
  components: {
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
    [DatePicker.name]: DatePicker,
  },
  data() {
    return {
      minBidAmount: null,
      instantBuyAmount: null,
      dateTime: null,
    };
  },
};
</script>

<style></style>
