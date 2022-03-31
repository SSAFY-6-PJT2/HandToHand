<template>
  <div class="row row-cols-sm-1 row-cols-lg-2 row-cols-xl-3">
    <div v-for="item in items" :key="item.token_id" class="col">
      <card class="mt-3 mb-5">
        <img
          slot="image"
          class="cropped"
          :src="item.imageUri"
          alt="Card image cap"
          @click="
            $router.push({
              name: 'nft-detail',
              params: { NFTid: item.token_id },
            })
          "
        />
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h4 class="my-0">{{ item.title }}</h4>
          <div class="d-flex align-items-center">
            <h5 class="card-subtitle text-muted my-0 mr-3">
              {{ item.price }} SSF
            </h5>
            <span
              v-if="item.onSale"
              class="badge badge-success badge-pill my-0"
              style="width: 4rem"
            >
              입찰 중
            </span>
            <span
              v-else
              class="badge badge-default badge-pill my-0"
              style="width: 4rem"
            >
              미판매
            </span>
          </div>
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <h6>기부자:</h6>
          <h6>{{ item.donator_nickname }}</h6>
        </div>
        <div class="d-flex justify-content-between align-items-center mb-2">
          <h6>기부 금액:</h6>
          <h6>{{ item.donated_price }} SSF</h6>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
import { Card } from '@/components';

export default {
  components: {
    Card,
  },
  props: {
    items: Array,
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
