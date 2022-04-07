<template>
  <section class="card detail-card">
    <h5 class="headder">NFT 상세정보</h5>
    <hr />
    <div class="contents mx-3 my-4">
      <div class="content">
        <p>Token ID :</p>
        <p>{{ item.tokenId }}</p>
      </div>
      <div class="content">
        <p>Titile :</p>
        <p>{{ item.title }}</p>
      </div>
      <div class="content">
        <p>Owner :</p>
        <p class="address">{{ item.ownerAddress }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    item: Object,
  },
};
</script>

<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  /* width: 500px; */
  justify-content: start;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.detail-card {
  border-radius: 5%;
  padding: 10px;
}

.detail-card > .headder {
  text-align: center;
  margin: 0;
}

.detail-card > .contents {
  align-items: center;
}

.detail-card > .contents > .content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.detail-card > .contents > .content > .address {
  font-size: 14px;
}
</style>
