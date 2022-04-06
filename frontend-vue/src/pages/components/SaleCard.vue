<template>
  <section class="card sale-card">
    <div v-if="item.onSaleYn">
      <div class="headder">
        <h5>2022.04.15 에 입찰이 마감됩니다.</h5>
        <hr />
      </div>
      {{ userInfo }}
      {{ item }}
      <div class="contents">
        <div class="content">
          <p>현재 입찰가 :</p>
          <p>{{ saleInfo.highestBid }} HTH</p>
        </div>
        <div class="content">
          <p>즉시 구매가 :</p>
          <p>{{ saleInfo.purchasePrice }} HTH</p>
        </div>
        <div class="button-box">
          <button
            type="button"
            class="btn btn-primary btn-lg"
            data-toggle="modal"
            data-target="#purchaseModal"
          >
            구매하기
          </button>
          <button
            type="button"
            class="btn btn-success btn-lg"
            data-toggle="modal"
            data-target="#bidModal"
          >
            입찰하기
          </button>
          <button
            type="button"
            class="btn btn-warning btn-lg"
            data-toggle="modal"
            data-target="#makeSaleModal"
          >
            판매등록
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      {{ userInfo }}
      {{ item }}
      <div class="headder">
        <h5>입찰 시간이 아닙니다.</h5>
        <hr />
      </div>
    </div>
  </section>
</template>

<script>
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
    userInfo: Array,
    item: Object,
  },
  data() {
    return {
      onSale: false,
      saleInfo: null,
      highestBid: null,
      timeLeft: null,
      tokenOwner: null,
    };
  },
  created() {
    const tokenId = this.item.tokenId;
    getOwner(tokenId).then((res) => (this.tokenOwner = res));
    if (this.item.onSale) {
      this.onSale = true;
      getSaleInfo(tokenId).then((res) => (this.saleInfo = res));
      getHighestBid(tokenId).then((res) => (this.highestBid = res));
      setTimeout(() => {
        getTimeLeft(tokenId).then((res) => (this.timeLeft = res));
      });
    }
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
