<!--
@author Hyeonsooryu
-->

<template>
  <div>
    <h3 class="text-center">기부 내역</h3>
    <ul v-if="histories.length" class="list-group mb-5">
      <li
        v-for="(history, idx) in histories"
        :key="`history-${idx}`"
        class="list-group-item mx-5"
      >
        <n-button
          v-if="history.type === 2"
          class="btn-nft-create"
          type="success"
          round
          @click="getBalance"
        >
          NFT 생성하기
        </n-button>
        <small>{{ history.createdDate }}</small>
        <div class="d-flex w-100 justify-content-between">
          <div class="d-flex my-2">
            <h5 class="my-0 mr-2">{{ history.amount }} SSF</h5>
            <div>
              <span
                v-if="history.type === 0"
                class="badge badge-danger badge-pill my-0"
              >
                송금 실패
              </span>
              <span
                v-if="history.type === 1"
                class="badge badge-warning badge-pill my-0 d-flex align-items-center"
              >
                송금 처리 중
                <div
                  class="spinner-border spinner-border-sm ml-2"
                  role="status"
                >
                  <span class="sr-only">Loading...</span>
                </div>
              </span>
              <span
                v-if="history.type === 2"
                class="badge badge-success badge-pill my-0"
              >
                송금 완료
              </span>
              <span
                v-if="history.type === 3"
                class="badge badge-default badge-pill my-0"
              >
                NFT 생성 완료
              </span>
            </div>
          </div>
        </div>
        <p v-if="history.type === 0" class="mb-1">
          송금이 완료되지 않았습니다.
        </p>
        <p v-if="history.type === 1" class="mb-1">송금 처리 중입니다.</p>
        <p v-if="history.type === 2" class="mb-1">
          기부가 완료되었습니다. 리워드 NFT를 생성할 수 있습니다.
        </p>
        <p v-if="history.type === 3" class="mb-1">
          기부와 NFT 발급이 모두 완료되었습니다.
        </p>
      </li>
    </ul>
    <h5 v-else class="text-center my-5">기부 내역이 없습니다.</h5>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { getDonationHistory, updateDonationStatus } from '@/api/donationAPI.js';
import { getTxStatus } from '@/utils/eth.js';
import {
  getBalanceOf,
  getOwnerOf,
  trasferNftTo,
} from '@/utils/test/nftTest.js';
import { Button } from '@/components';

export default {
  components: {
    [Button.name]: Button,
  },
  data() {
    return {
      histories: [],
    };
  },
  methods: {
    // 트랜잭션 확인을 통해 기부내역 상태 조회 및 변경
    async updateStatus() {
      for (const history of this.histories) {
        if (history.type === 1) {
          setTimeout(() => {
            getTxStatus(history.transactionHash)
              .then((res) => {
                const txStatus = res;
                updateDonationStatus(history.transactionHash, res)
                  .then(() => {
                    history.type = txStatus;
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              })
              .catch((err) => console.log(err));
          }, 3000);
        }
      }
    },
    async getBalance() {
      const userBalance = await getBalanceOf(this.userAddress);
      const adminBalance = await getBalanceOf(
        process.env.VUE_APP_ADMIN_ADDRESS,
      );
      console.log(userBalance);
      console.log(adminBalance);
      const test = await getOwnerOf(9);
      console.log(test);
    },
    async getNFT() {
      await trasferNftTo(this.userAddress, 9);
    },
  },
  computed: {
    ...mapState(['userAddress']),
    ...mapGetters(['donationHashes']),
  },
  watch: {
    histories: {
      deep: true,
      handler(val, oldVal) {
        this.histories = val;
      },
    },
  },
  async mounted() {
    await getDonationHistory(
      this.userAddress,
      (res) => {
        this.histories = res.data;
        this.updateStatus();
      },
      (err) => {
        console.log(err);
      },
    );
  },
};
</script>

<style scoped>
.btn-nft-create {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  height: 40px;
  margin: auto 1rem auto 0;
}
</style>
