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
import {
  getItems,
  getUsersItems,
  getItemsOnSale,
  addItem,
  updateNftOwner,
  updateItemLikes,
} from '../api/itemAPI.js';
export default {
  name: 'nft-gallery',
  bodyClass: 'landing-page',
  components: {
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
    NftList,
  },
  created() {
    getItems().then((res) => {
      this.items = res.data;
    });
  },
  data() {
    return {
      items: null,
      itemsOnSale: null,
    };
  },
};
</script>
<style></style>
