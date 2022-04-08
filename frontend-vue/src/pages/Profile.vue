<!--
@author Hyeonsooryu
-->

<template>
  <div>
    <alert v-show="showNicknameChangeAlert" type="success">
      닉네임 변경이 완료되었습니다.
    </alert>
    <div class="page-header clear-filter" filter-color="green">
      <parallax
        class="page-header-image"
        style="background-image: url('img/ukrain2.jpg')"
      >
      </parallax>
      <div class="container">
        <h3 class="title mt-5 pt-5 mb-0">{{ nickname }}</h3>
        <n-button class="mb-5" size="sm" round simple @click="showModal = true">
          닉네임 변경
        </n-button>
        <nickname-change-modal
          :showModal="showModal"
          @closeModal="showModal = false"
        />
        <div class="content">
          <div class="social-description">
            <h2>{{ totalDonation }}</h2>
            <p>내가 기부한 HTH</p>
          </div>
          <div class="social-description">
            <h2>{{ totalNft }}</h2>
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
import { mapState } from 'vuex';
import { Alert, Button } from '@/components';
import NicknameChangeModal from './components/NicknameChangeModal.vue';
import { getNickname } from '@/api/userAPI.js';

export default {
  name: 'profile',
  bodyClass: 'profile-page',
  components: {
    Alert,
    NicknameChangeModal,
    [Button.name]: Button,
  },
  data() {
    return {
      showModal: false,
      showNicknameChangeAlert: false,
    };
  },
  computed: {
    ...mapState(['userAddress', 'totalDonation', 'totalNft', 'nickname']),
  },
  watch: {
    nickname() {
      this.showNicknameChangeAlert = true;
      setTimeout(() => {
        this.showNicknameChangeAlert = false;
      }, 3000);
    },
  },
  async mounted() {
    const nickname = await getNickname(this.userAddress);
    this.username = nickname.data;
  },
};
</script>

<style></style>
