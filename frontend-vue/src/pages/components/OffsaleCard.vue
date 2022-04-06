<template>
  <section class="card sale-card">
    <div class="headder">
      <h5>현재 입찰중인 작품이 아닙니다.</h5>
      <hr />
    </div>
    {{ item }}
    <div v-if="isLogin">
      <!-- 사용자가 owner 일경우 -> 판매 등록 가능 -->
      <div v-if="userAddress === item.ownerAddress" class="contents">
        <form></form>
        <div class="content"></div>
        <div class="content"></div>
        <div class="button-box">
          <!-- 현재 판매중이 아닐경우 판매 등록 가능 -->
          <button
            type="button"
            class="btn btn-warning btn-lg"
            data-toggle="modal"
            data-target="#makeSaleModal"
            @click="CreateSale"
          >
            판매등록
          </button>
          <!-- 입찰이 마감되고 입찰자가 없었을 경우 판매 취소를 통한 마감 -->
          <button
            type="button"
            class="btn btn-danger btn-lg"
            data-toggle="modal"
            data-target="#makeSaleModal"
            @click="cancelSales"
          >
            판매취소
          </button>
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
      onSale: false,
      saleInfo: null,
      highestBid: null,
      timeLeft: null,
      tokenOwner: null,

      // Sale create info => Todo : Form 에서 입력으로 변경
      startTime: null,
      endTime: null,
      minPrice: null,
      purchasePrice: null,
    };
  },
  computed: {
    ...mapState(['privKey', 'userAddress']),
    ...mapGetters(['isLogin']),
  },
  created() {
    const tokenId = this.item.tokenId;
    getOwner(tokenId).then((res) => {
      this.tokenOwner = res;
      console.log(res);
    });

    // Testing code
    //seller
    this.startTime = new Date();
    this.startTime = parseInt(this.startTime.getTime() / 1000);
    this.endTime = this.startTime + 6000;
    this.minPrice = 10;
    this.purchasePrice = 30;
  },
  methods: {
    CreateSale() {
      createSale(
        this.userAddress,
        this.privKey,
        this.item.tokenId,
        this.minPrice,
        this.purchasePrice,
        this.startTime,
        this.endTime,
      );
    },
    CancelSales() {
      cancelSales(this.userAddress, this.privKey, this.item.tokenId);
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
