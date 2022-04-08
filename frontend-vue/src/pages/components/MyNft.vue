<!--
@author Hyeonsooryu
-->

<template>
  <div>
    <h3 class="text-center">내 NFT 목록</h3>
    <nft-list v-if="items.length" :items="items"></nft-list>
    <h5 v-else class="text-center my-5">보유한 NFT가 없습니다.</h5>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import NftList from './NftList.vue';
import { getUsersItems } from '../../api/itemAPI';

export default {
  components: {
    NftList,
  },
  data() {
    return {
      items: [],
    };
  },
  methods: {
    ...mapActions(['vuexUpdateTotalNft']),
  },
  computed: {
    ...mapState(['userAddress']),
  },
  mounted() {
    getUsersItems(this.userAddress).then((res) => {
      this.items = res.data;
      this.vuexUpdateTotalNft(res.data.length);
    });
  },
};
</script>

<style scopped>
.cropped {
  width: 100%;
  height: 300px;
  object-fit: cover;
}
</style>
