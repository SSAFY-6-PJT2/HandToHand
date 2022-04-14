<!--
@author Daniel
-->

<template>
  <div class="layout">
    <article v-if="item">
      <div class="flexbox">
        <div class="item">
          <img :src="item.hash" alt="image cap" />
        </div>
        <div class="item">
          <section class="item-abst mb-2">
            <h2 class="mb-0">{{ item.title }}</h2>
          </section>
          <p v-if="userNickname" class="mt-0">소유자: {{ userNickname }}</p>
          <onsale-card
            v-if="item.onSaleYn"
            :item="item"
            @updateDetail="updateDetail"
          ></onsale-card>
          <offsale-card
            v-else
            :item="item"
            @updateDetail="updateDetail"
          ></offsale-card>
        </div>
      </div>
      <div class="flexbox">
        <div class="item">
          <contribute-card :donor="donor"></contribute-card>
        </div>
        <div class="item">
          <nftdetail-card :item="item"></nftdetail-card>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import OnsaleCard from './components/OnsaleCard.vue';
import OffsaleCard from './components/OffsaleCard.vue';
import ContributeCard from './components/ContributeCard.vue';
import NftdetailCard from './components/NftdetailCard.vue';
import { getItem } from '@/api/itemAPI.js';
import { getNickname } from '@/api/userAPI.js';
export default {
  name: 'nft-detail',
  components: {
    OnsaleCard,
    OffsaleCard,
    ContributeCard,
    NftdetailCard,
  },
  methods: {
    updateDetail() {
      // token_id 를 이용해 NFT 정보 API 호출
      getItem(this.token_id).then((res) => {
        this.itemInfo = res;
        this.donor = res.donor;
        this.item = res.item;
        getNickname(this.item.ownerAddress).then((res) => {
          this.userNickname = res.data;
        });
      });
      if (this.isLogin) {
        this.userInfo = {
          privKey: this.privKey,
          userAddress: this.userAddress,
          isLogin: this.isLogin,
        };
      }
    },
  },
  created() {
    this.updateDetail();
  },
  data() {
    return {
      token_id: this.$route.params.token_id,
      itemInfo: null,
      donor: null,
      item: null,
      userInfo: null,
      userNickname: null,
    };
  },
  computed: {
    ...mapState(['privKey', 'userAddress']),
    ...mapGetters(['isLogin']),
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
  max-width: 1100px;
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
  max-width: 400px;
  height: auto;
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
