<template>
  <div>
    <div class="page-header clear-filter" filter-color="green">
      <parallax class="page-header-image" style="background-image: url('img/ukrain1.jpg')">
      </parallax>
      <div class="container d-flex align-items-center justify-content-between flex-wrap">
        <div class="text-left">
          <h1>우크라이나에 기부하세요</h1>
          <h3>AI가 그린 우크라이나 풍경화 NFT를 드립니다</h3>
        </div>
        <donate-form></donate-form>
      </div>
    </div>
  </div>
</template>
<script>
import { Parallax } from "@/components";
import DonateForm from "./components/DonateForm.vue";

export default {
  name: "index",
  bodyClass: "index-page",
  components: {
    Parallax,
    DonateForm,
  },
};
</script>
<style></style>
