<template>
  <div>
    <h3 class="text-center">내 NFT 목록</h3>
    <nft-list :items="items"></nft-list>
  </div>
</template>

<script>
import NftList from './NftList.vue';

export default {
  components: {
    NftList,
  },
  data() {
    return {
      items: [
        {
          token_id: 1,
          imageUri: 'img/NFT/nft1.png',
          title: 'NFT Title',
          price: 300,
          donator_nickname: '82surf',
          donated_price: 300,
          onSale: true,
        },
        {
          token_id: 2,
          imageUri: 'img/NFT/nft2.png',
          title: 'NFT Title',
          price: 300,
          donator_nickname: '82surf',
          donated_price: 300,
          onSale: false,
        },
        {
          token_id: 3,
          imageUri: 'img/NFT/nft3.png',
          title: 'NFT Title',
          price: 300,
          donator_nickname: '82surf',
          donated_price: 300,
          onSale: true,
        },
        {
          token_id: 4,
          imageUri: 'img/NFT/nft4.png',
          title: 'NFT Title',
          price: 300,
          donator_nickname: '82surf',
          donated_price: 300,
          onSale: false,
        },
        {
          token_id: 5,
          imageUri: 'img/NFT/nft5.png',
          title: 'NFT Title',
          price: 300,
          donator_nickname: '82surf',
          donated_price: 300,
          onSale: true,
        },
        {
          token_id: 6,
          imageUri: 'img/NFT/nft6.png',
          title: 'NFT Title',
          price: 300,
          donator_nickname: '82surf',
          donated_price: 300,
          onSale: false,
        },
      ],
    };
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
