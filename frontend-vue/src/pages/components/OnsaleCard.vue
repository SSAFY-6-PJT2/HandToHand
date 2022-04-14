<template>
  <section class="card">
    <sale-loading-modal
      :showModal="showModal"
      :loadingMsg="loadingMsg"
      :loadingIsDone="loadingIsDone"
    />
    <div v-if="timeLeft" class="sale-card">
      <div class="headder">
        <h5>{{ hour }}시간 {{ min }}분 {{ sec }}초 후 입찰이 마감됩니다.</h5>
        <hr />
      </div>
      <div class="contents">
        <div class="content">
          <p>최소 입찰가 :</p>
          <p>{{ saleInfo.MinPrice }} HTH</p>
        </div>
        <div class="content">
          <p>현재 입찰가 :</p>
          <p>{{ saleInfo.HighestBid }} HTH</p>
        </div>
        <div class="content">
          <p>즉시 구매가 :</p>
          <p>{{ saleInfo.BuyNowPrice }} HTH</p>
        </div>
        <!-- 로그인 사용자 -->
        <div v-if="isLogin">
          <!-- 토큰 소유자 -->
          <div
            v-if="userAddress === item.ownerAddress"
            class="button-box d-flex"
          >
            <n-button
              class="mr-1"
              type="danger"
              round
              block
              @click="CancelSales"
              >판매취소</n-button
            >
          </div>
          <!-- 구매, 입찰 가능 소유자 -->
          <div v-else class="button-box">
            <!-- Form (입찰 가격) -->
            <fg-input
              placeholder="입찰 금액 (HTH)"
              addon-left-icon="now-ui-icons business_money-coins"
              v-model="bidAmount"
            >
            </fg-input>
            <div class="d-flex">
              <n-button class="mr-1" type="success" round block @click="Bid"
                >입찰</n-button
              >
              <n-button
                class="mr-1"
                type="primary"
                round
                block
                @click="Purchase"
                >즉시구매</n-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="sale-card">
      <div class="headder">
        <h5>입찰이 마감되었습니다.</h5>
        <hr />
      </div>
      <div class="contents">
        <div v-if="highestBid[1] !== '0'">
          <div class="content">
            <p>최고 입찰금액 :</p>
            <p>{{ highestBid[1] }} HTH</p>
          </div>
          <div class="content">
            <p>최고 입찰자 :</p>
            <p>{{ highestBid[0] }}</p>
          </div>
          <!-- 최고 입찰자 -->
          <div v-if="userAddress === highestBid[0]" class="button-box d-flex">
            <n-button
              class="mr-1"
              type="success"
              round
              block
              @click="ConfirmItem"
              >구매확정</n-button
            >
          </div>
        </div>
        <!-- NFT 소유자 -> 판매 취소 가능 -->
        <div
          v-else-if="userAddress === item.ownerAddress"
          class="button-box d-flex"
        >
          <n-button class="mr-1" type="danger" round block @click="CancelSales"
            >판매취소</n-button
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { FormGroupInput, Button } from '@/components';
import {
  getTimeLeft,
  getSaleInfo,
  getHighestBid,
  bid,
  purchase,
  confirmItem,
  cancelSales,
} from '../../utils/SaleFactory.js';
import SaleLoadingModal from './SaleLoadingModal.vue';

export default {
  name: 'sale-card',
  props: {
    item: Object,
  },
  components: {
    [FormGroupInput.name]: FormGroupInput,
    [Button.name]: Button,
    SaleLoadingModal,
  },
  data() {
    return {
      saleInfo: null,
      highestBid: null,
      onSale: false,
      bidAmount: null,

      // Time Left
      timeLeft: null,
      hour: 0,
      min: 0,
      sec: 0,

      // Modal
      showModal: false,
      loadingMsg: null,
      loadingIsDone: false,
    };
  },
  computed: {
    ...mapState(['privKey', 'userAddress']),
    ...mapGetters(['isLogin']),
  },
  created() {
    this.updateOnsaleCard();
  },
  mounted() {
    // this.GetTimeLeft();
  },
  methods: {
    updateOnsaleCard() {
      const tokenId = this.item.tokenId;
      getSaleInfo(tokenId).then((res) => (this.saleInfo = res));
      getHighestBid(tokenId)
        .then((res) => {
          this.highestBid = res;
        })
        .catch((err) => {
          this.highestBid = false;
        });
      getTimeLeft(this.item.tokenId)
        .then((res) => {
          this.timeLeft = res;
          this.GetTimeLeft();
        })
        .catch((err) => (this.timeLeft = 0));
    },
    CancelSales() {
      this.showModal = true;
      this.loadingMsg = '판매 취소 중입니다..';
      cancelSales(this.userAddress, this.privKey, this.item.tokenId)
        .then((res) => {
          this.loadingMsg = '판매 취소를 기록중입니다.';
          this.loadingIsDone = true;
          setTimeout(() => {
            this.loadingMsg = '판매 취소 완료되었습니다.';
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
    Bid() {
      this.showModal = true;
      this.loadingMsg = '입찰 중입니다..';
      // 현재시각과 입찰 가능 시간 확인 ->
      bid(this.userAddress, this.privKey, this.item.tokenId, this.bidAmount)
        .then((res) => {
          this.loadingMsg = '입찰을 기록중입니다.';
          this.loadingIsDone = true;
          setTimeout(() => {
            this.loadingMsg = '입찰 완료되었습니다.';
            this.showModal = false;
            this.$emit('updateDetail');
            this.updateOnsaleCard();
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
    Purchase() {
      this.showModal = true;
      this.loadingMsg = '구매 중입니다..';
      purchase(this.userAddress, this.privKey, this.item.tokenId)
        .then((res) => {
          this.loadingMsg = '구매를 기록중입니다.';
          this.loadingIsDone = true;
          setTimeout(() => {
            this.loadingMsg = '구매 완료되었습니다.';
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
    GetTimeLeft() {
      const timer = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft -= 1;
          this.hour = parseInt(this.timeLeft / 3600);
          this.min = parseInt((this.timeLeft - this.hour * 3600) / 60);
          this.sec = this.timeLeft - this.hour * 3600 - this.min * 60;
        } else {
          clearInterval(timer);
          // this.$router.go();
        }
      }, 1000);
    },
    ConfirmItem() {
      this.showModal = true;
      this.loadingMsg = '구매 확정 중입니다..';
      confirmItem(this.userAddress, this.privKey, this.item.tokenId)
        .then((res) => {
          this.loadingMsg = '구매를 기록중입니다.';
          this.loadingIsDone = true;
          setTimeout(() => {
            this.loadingMsg = '구매 확정 완료되었습니다.';
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
};
</script>

<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 500px;
  justify-content: start;
  border-radius: 5%;
  padding: 10px;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.sale-card {
  /* border-radius: 5%;
  padding: 10px; */
}

.sale-card > .headder {
  text-align: center;
  margin: 0;
}

.sale-card > .contents {
  align-items: center;
}

.sale-card > .contents > .content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.sale-card > .contents > .button-box {
  text-align: center;
}
</style>
