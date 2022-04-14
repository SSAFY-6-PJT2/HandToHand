<template>
  <section class="card sale-card">
    <div class="headder">
      <h5>현재 판매중인 작품이 아닙니다.</h5>
      <hr />
    </div>
    <div v-if="isLogin">
      <!-- 사용자가 owner 일경우 -> 판매 등록 가능 -->
      <div v-if="userAddress === item.ownerAddress" class="contents">
        <start-sale-form :item="item" @updateDetail="$emit('updateDetail')" />
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import StartSaleForm from './StartSaleForm.vue';
export default {
  name: 'sale-card',
  components: {
    StartSaleForm,
  },
  props: {
    item: Object,
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
  width: 500px;
  justify-content: start;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.sale-card {
  border-radius: 5%;
  padding: 10px;
}

.sale-card > .headder {
  text-align: center;
  margin: 0;
}

.sale-card > .contents {
  align-items: center;
}
</style>
