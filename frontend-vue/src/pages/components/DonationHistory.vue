<template>
  <div>
    <h3 class="text-center">기부 내역</h3>
    <ul v-if="histories.length" class="list-group mb-5">
      <li
        v-for="history in histories"
        :key="`history-${history.seq}`"
        class="list-group-item mx-5"
      >
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{ history.amount }} SSF</h5>
          <div>
            <small class="mr-3">{{ history.created_at }}</small>
            <span
              v-if="history.status === 0"
              class="badge badge-danger badge-pill"
            >
              송금 실패
            </span>
            <span
              v-if="history.status === 1"
              class="badge badge-warning badge-pill"
            >
              송금 처리 중
            </span>
            <span
              v-if="history.status === 2"
              class="badge badge-success badge-pill"
            >
              송금 완료
            </span>
            <span
              v-if="history.status === 3"
              class="badge badge-default badge-pill"
            >
              NFT 생성 완료
            </span>
          </div>
        </div>
        <p v-if="history.status === 0" class="mb-1">
          송금이 완료되지 않았습니다.
        </p>
        <p v-if="history.status === 1" class="mb-1">송금 처리 중입니다.</p>
        <p v-if="history.status === 2" class="mb-1">
          기부가 완료되었습니다. 리워드 NFT를 생성할 수 있습니다.
        </p>
        <p v-if="history.status === 3" class="mb-1">
          기부와 NFT 발급이 모두 완료되었습니다.
        </p>
      </li>
    </ul>
    <h5 v-else class="text-center my-5">기부 내역이 없습니다.</h5>
  </div>
</template>

<script>
export default {
  data() {
    return {
      histories: [
        {
          seq: 1,
          amount: 100,
          created_at: '2022-03-29',
          status: 0,
        },
        {
          seq: 2,
          amount: 200,
          created_at: '2022-03-29',
          status: 1,
        },
        {
          seq: 3,
          amount: 300,
          created_at: '2022-03-29',
          status: 2,
        },
        {
          seq: 4,
          amount: 400,
          created_at: '2022-03-29',
          status: 3,
        },
      ],
    };
  },
};
</script>

<style></style>
