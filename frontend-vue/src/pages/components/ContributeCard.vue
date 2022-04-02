<template>
  <section class="card detail-card">
    <h5 class="headder">기부정보</h5>
    <hr />
    <div class="contents">
      <div class="content">
        <p>기부자 :</p>
        <p>Daniel</p>
      </div>
      <div class="content">
        <p>기부금액 :</p>
        <p>100 SSF</p>
      </div>
      <div class="content">
        <p>기부 순서 :</p>
        <p>872 번째 기부자</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
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
}
</style>
