<!--
@author Hyeonsooryu
-->

<template>
  <div>
    <alert v-if="showLoginSuccessAlert" type="success">
      지갑이 연결되었습니다.
    </alert>
    <div class="page-header clear-filter" filter-color="green">
      <parallax
        class="page-header-image"
        style="background-image: url('img/ukrain1.jpg')"
      >
      </parallax>
      <div
        class="container d-flex align-items-center justify-content-between flex-wrap"
      >
        <div class="text-left">
          <h1>우크라이나에 기부하세요</h1>
          <h3>AI가 그린 우크라이나 풍경화 NFT를 드립니다</h3>
        </div>
        <donate-form></donate-form>
      </div>
    </div>
    <about-service />
    <about-team />
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { Alert, Parallax } from '@/components';
import DonateForm from './components/DonateForm.vue';
import AboutService from './components/AboutService.vue';
import AboutTeam from './components/AboutTeam.vue';

export default {
  name: 'index',
  bodyClass: 'index-page',
  components: {
    Alert,
    Parallax,
    DonateForm,
    AboutService,
    AboutTeam,
  },
  data() {
    return {
      showLoginSuccessAlert: false,
    };
  },
  computed: {
    ...mapGetters(['isLogin']),
  },
  watch: {
    isLogin(newData) {
      if (newData) {
        this.showLoginSuccessAlert = true;
        setTimeout(() => {
          this.showLoginSuccessAlert = false;
        }, 3000);
      }
    },
  },
};
</script>
<style></style>
