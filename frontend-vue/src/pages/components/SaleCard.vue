<template>
  <section class="card sale-card">
    <h5 class="headder">2022.04.15 에 입찰이 마감됩니다.</h5>
    <hr />
    <div class="contents">
      <p>현재 입찰가</p>
      <h4>0.22 SSF</h4>
      <div class="button-box">
        <button
          type="button"
          class="btn btn-primary btn-lg"
          data-toggle="modal"
          data-target="#purchaseModal"
        >
          구매하기
        </button>
        <button
          type="button"
          class="btn btn-success btn-lg"
          data-toggle="modal"
          data-target="#bidModal"
        >
          입찰하기
        </button>
        <button
          type="button"
          class="btn btn-warning btn-lg"
          data-toggle="modal"
          data-target="#makeSaleModal"
        >
          판매등록
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'sale-card',
  props: {},
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

.sale-card > .contents > .button-box {
  text-align: center;
}
</style>
