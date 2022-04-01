<template>
  <div>
    <h1>Nft Detail</h1>
    <h2>{{ NFTid }}</h2>
  </div>
</template>

<script>
export default {
  conponents: {},
  created() {
    // token_id 를 이용해 NFT 정보 API 호출
  },
  data() {
    return {
      NFTid: this.$route.params.NFTid,
    };
  },
};
</script>

<style></style>
