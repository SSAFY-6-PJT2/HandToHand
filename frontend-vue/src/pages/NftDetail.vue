<!--
@author Daniel
-->

<template>
  <div class="layout">
    <article>
      <div class="flexbox">
        <div class="item">
          <img src="img/NFT/nft1.png" alt="" />
        </div>
        <div class="item">
          <section class="item-abst">
            <h2>Token Name</h2>
            <p>좋아요</p>
          </section>
          <h4 class="mt-0">소유자: UserId</h4>
          <sale-card></sale-card>
        </div>
      </div>
      <div class="flexbox">
        <div class="item">
          <contribute-card></contribute-card>
        </div>
        <div class="item">
          <nftdetail-card></nftdetail-card>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import SaleCard from './components/SaleCard.vue';
import ContributeCard from './components/ContributeCard.vue';
import NftdetailCard from './components/NftdetailCard.vue';
export default {
  name: 'nft-detail',
  components: {
    SaleCard,
    ContributeCard,
    NftdetailCard,
  },
  created() {
    // token_id 를 이용해 NFT 정보 API 호출
  },
  data() {
    return {
      NFTid: this.$route.params.NFTid,
    };
  },
};
</script>

<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  /* width: 500px; */
  justify-content: start;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.item-abst {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
/*  */
.layout {
  max-width: 1000px;
  margin: 0 auto;
  margin-top: 100px;
  padding: 20px;
  display: flex;
  flex-wrap: nowrap;
  gap: 1em;
}
article {
  flex-basis: 680px;
  flex-grow: 1;
  flex-shrink: 1;
}
.flexbox {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  padding: 10px;
  justify-content: space-around;
}
.item {
  min-height: 150px;
  flex-basis: 150px;
  flex-shrink: 1;
  flex-grow: 1;
}
.item > img {
  /* max-width: 100%;
  height: auto; */
  border-radius: 5%;
}
@media screen and (max-width: 1023px) {
  .item {
    flex-basis: 49%;
  }
}
@media screen and (max-width: 767px) {
  .item {
    flex-basis: 100%;
  }
}
</style>
