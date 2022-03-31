<!--
@author Hyeonsooryu
-->

<template>
  <div>
    <div class="page-header page-header-small">
      <parallax
        class="page-header-image"
        style="background-image: url('img/bg6.jpg')"
      >
      </parallax>
      <div class="content-center">
        <div class="container">
          <h1 class="title">NFT Gallery</h1>
          <p style="font-weight: 700">
            기부자들의 NFT를 감상하고, 거래해보세요
          </p>
        </div>
      </div>
    </div>
    <div class="section section-about-us">
      <div class="container">
        <div class="row">
          <div class="ml-auto mr-auto text-center">
            <h2 class="title">NFT 목록</h2>
            <nft-list :items="items"></nft-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Button, FormGroupInput } from '@/components';
import NftList from './components/NftList.vue';
export default {
  name: 'nft-gallery',
  bodyClass: 'landing-page',
  components: {
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
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
<style></style>
