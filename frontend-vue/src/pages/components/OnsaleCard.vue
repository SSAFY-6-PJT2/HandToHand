<template>
  <section class="card sale-card">
    {{ item }}
    {{ saleInfo }}
    <div v-if="timeLeft">
      <div class="headder">
        <h5>{{ timeLeft }} 후 입찰이 마감됩니다.</h5>
        <hr />
      </div>
      <div class="contents">
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
          <div v-if="userAddress === item.ownerAddress" class="button-box">
            <button
              type="button"
              class="btn btn-danger btn-lg"
              @click="CancelSales"
            >
              판매취소
            </button>
          </div>
          <!-- 구매, 입찰 가능 소유자 -->
          <div v-else class="button-box">
            <!-- Form (입찰 가격) -->
            <button type="button" class="btn btn-success btn-lg" @click="Bid">
              입찰하기
            </button>
            <button
              type="button"
              class="btn btn-primary btn-lg"
              @click="Purchase"
            >
              구매하기
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="headder">
        <h5>입찰이 마감되었습니다.</h5>
        <hr />
      </div>
      <div class="contents">
        <div class="content">
          <p>최고 입찰금액 :</p>
          <p>{{ highestBid.HighestBid }} HTH</p>
        </div>
        <div class="content">
          <p>최고 입찰자 :</p>
          <p>{{ highestBid.HighestBidder }} HTH</p>
        </div>
        <div v-if="highestBid">
          <!-- 최고 입찰자 -->
          <div
            v-if="userAddress === highestBid.HighestBidder"
            class="button-box"
          >
            <button
              type="button"
              class="btn btn-danger btn-lg"
              @click="CancelSales"
            >
              구매 확정
            </button>
          </div>
          <!-- 구매, 입찰 가능 소유자 -->
          <div v-else-if="userAddress === item.ownerAddress" class="button-box">
            <!-- Form (입찰 가격) -->
            <button type="button" class="btn btn-success btn-lg" @click="Bid">
              판매 취소
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import {
  getSaleAddress,
  createSale,
  getTimeLeft,
  getSaleInfo,
  getHighestBid,
  bid,
  purchase,
  confirmItem,
  cancelSales,
} from '../../utils/SaleFactory.js';
import {
  getCurrentId,
  getTokenURI,
  getOwner,
  createNFT,
  NFTTransfer,
  setApproveForAll,
} from '../../utils/NFT.js';
export default {
  name: 'sale-card',
  props: {
    item: Object,
  },
  data() {
    return {
      saleInfo: null,
      highestBid: null,
      timeLeft: null,
      onSale: false,
    };
  },
  computed: {
    ...mapState(['privKey', 'userAddress']),
    ...mapGetters(['isLogin']),
  },
  created() {
    const tokenId = this.item.tokenId;
    getSaleInfo(tokenId).then((res) => (this.saleInfo = res));
    getHighestBid(tokenId)
      .then((res) => {
        this.highestBid = res;
      })
      .catch((err) => {
        this.highestBid = false;
      });
  },
  mounted() {
    this.GetTimeLeft();
  },
  methods: {
    CancelSales() {
      cancelSales(this.userAddress, this.privKey, this.item.tokenId);
    },
    Bid() {
      // 현재시각과 입찰 가능 시간 확인 ->
      bid(this.userAddress, this.privKey, this.item.tokenId, 20).catch((err) =>
        console.log('잘못된 입찰입니다.'),
      );
    },
    Purchase() {
      purchase(this.userAddress, this.privKey, this.item.tokenId);
    },
    GetTimeLeft() {
      setTimeout(() => {
        getTimeLeft(this.item.tokenId)
          .then((res) => {
            this.timeLeft = res;
          })
          .catch((err) => (this.timeLeft = 0));
      }, 1000);
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
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.sale-card {
  border-radius: 5%;
  padding: 10px;
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
