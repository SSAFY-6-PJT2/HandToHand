<!--
@author Hyeonsooryu
-->

<template>
  <navbar
    position="fixed"
    type="success"
    :transparent="transparent"
    :color-on-scroll="colorOnScroll"
    menu-classes="ml-auto"
  >
    <template>
      <router-link v-popover:popover1 class="navbar-brand" to="/">
        Hand to Hand
      </router-link>
    </template>
    <template slot="navbar-menu">
      <li class="nav-item">
        <router-link to="/nft-gallery" class="nav-link">
          <i class="now-ui-icons media-1_album"></i>
          <p>NFT 갤러리</p>
        </router-link>
      </li>
      <li class="nav-item">
        <n-button
          v-if="isLogin"
          type="success"
          round
          class="my-0 ml-4"
          @click="$router.push('/profile/donation-history')"
        >
          마이페이지
        </n-button>
        <n-button
          v-else
          @click="showModal = true"
          type="warning"
          round
          class="my-0"
        >
          지갑 연결하기
        </n-button>
      </li>
    </template>
    <LoginModal :showModal="showModal" @closeModal="showModal = false" />
  </navbar>
</template>

<script>
import { mapGetters } from 'vuex';
import { Navbar, Button } from '@/components';
import LoginModal from '../pages/components/LoginModal.vue';
import { Popover } from 'element-ui';
export default {
  name: 'main-navbar',
  props: {
    transparent: Boolean,
    colorOnScroll: Number,
  },
  components: {
    Navbar,
    LoginModal,
    [Popover.name]: Popover,
    [Button.name]: Button,
  },
  data() {
    return {
      showModal: false,
    };
  },
  computed: {
    ...mapGetters(['isLogin']),
  },
};
</script>

<style scoped></style>
