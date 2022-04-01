<!--
@author Hyeonsooryu
-->

<template>
  <div>
    <div class="page-header clear-filter" filter-color="green">
      <parallax
        class="page-header-image"
        style="background-image: url('img/ukrain2.jpg')"
      >
      </parallax>
      <div class="container">
        <div class="photo-container">
          <img src="img/ryan.jpg" alt="" />
        </div>
        <h3 class="title">{{ username }}</h3>
        <div class="content">
          <div class="social-description">
            <h2>26</h2>
            <p>내가 기부한 SSF</p>
          </div>
          <div class="social-description">
            <h2>26</h2>
            <p>보유 NFT 개수</p>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="d-flex justify-content-center my-5">
        <n-button
          round
          simple
          class="mr-3"
          @click="$router.push('/profile/donation-history')"
        >
          기부 내역
        </n-button>
        <n-button round simple @click="$router.push('/profile/my-nft')">
          내 NFT
        </n-button>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import { Button } from '@/components';

export default {
  name: 'profile',
  bodyClass: 'profile-page',
  components: {
    [Button.name]: Button,
  },
  data() {
    return {
      username: 'user1',
    };
  },
};
</script>
<style></style>
