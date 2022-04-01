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
          <section class="card sale-card">
            <h5 class="headder">2022.04.15 에 입찰이 마감됩니다.</h5>
            <hr />
            <div class="contents">
              <p>현재 입찰가</p>
              <h4>0.22 SSF</h4>
              <div class="button-box">
                <button type="button" class="btn btn-primary btn-lg">
                  구매하기
                </button>
                <button type="button" class="btn btn-success btn-lg">
                  입찰하기
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div class="flexbox">
        <div class="item card detail-card">
          <h5 class="headder">기부정보</h5>
          <hr />
          <div class="contents">
            <div class="content">
              <p>기부자 :</p>
              <p>Daniel</p>
            </div>
            <div class="content">
              <p>기부금액 :</p>
              <p>100 SSF</p>
            </div>
            <div class="content">
              <p>기부 순서 :</p>
              <p>872 번째 기부자</p>
            </div>
          </div>
        </div>
        <div class="item card detail-card">
          <h5 class="headder">NFT 상세정보</h5>
          <hr />
          <div class="contents">
            <div class="content">
              <p>Contract Address :</p>
              <p>0x000000000000000</p>
            </div>
            <div class="content">
              <p>Token ID :</p>
              <p>42</p>
            </div>
            <div class="content">
              <p>Token Standard :</p>
              <p>ERC721</p>
            </div>
            <div class="content">
              <p>Blockchain :</p>
              <p>Ethereum</p>
            </div>
            <div class="content">
              <p>Metadata :</p>
              <p>Centralized</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: 'nft-detail',
  conponents: {},
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
  width: 500px;
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

.sale-card {
  border-radius: 5%;
  padding: 10px;
}

.sale-card > .headder {
  text-align: center;
  margin: 0;
}

.sale-card > .contents > .button-box {
  text-align: center;
}

.detail-card {
  border-radius: 5%;
  padding: 10px;
}

.detail-card > .headder {
  text-align: center;
  margin: 0;
}

.detail-card > .contents {
  align-items: center;
}

.detail-card > .contents > .content {
  display: flex;
  justify-content: space-between;
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
