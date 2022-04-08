<!--
@author Hyeonsooryu
-->

<template>
  <div>
    <nft-loading-modal
      :showModal="showModal"
      :loadingMsg="loadingMsg"
      :loadingIsDone="loadingIsDone"
    />
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
          @click="getNFT(history)"
        >
          NFT 생성하기
        </n-button>
        <small>{{ history.createdDate }}</small>
        <div class="d-flex w-100 justify-content-between">
          <div class="d-flex my-2">
            <h5 class="my-0 mr-2">{{ history.amount }} HTH</h5>
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
import { mapState, mapActions } from 'vuex';
import { getDonationHistory, updateDonationStatus } from '@/api/donationAPI.js';
import { addItem } from '@/api/itemAPI.js';
import { getTxStatus } from '@/utils/eth.js';
import { getCurrentId, getTokenURI, NFTTransfer } from '@/utils/NFT.js';
import { Button } from '@/components';
import NftLoadingModal from './NftLoadingModal.vue';

export default {
  components: {
    [Button.name]: Button,
    NftLoadingModal,
  },
  data() {
    return {
      histories: [],
      showModal: false,
      loadingMsg: null,
      loadingIsDone: false,
    };
  },
  methods: {
    ...mapActions(['vuexUpdateTotalDonation']),
    // 송금 중 상태인 기부 내역이 송금 완료되면 기부 내역을 업데이트하는 함수
    async checkInProgress() {
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
          }, 2000);
        }
      }
    },
    // 전체 기부 내역 업데이트
    async updateDonationHistories() {
      await getDonationHistory(
        this.userAddress,
        (res) => {
          this.histories = res.data;
          let total = 0;
          for (const history of this.histories) {
            total += history.amount;
          }
          this.vuexUpdateTotalDonation(total);
          this.checkInProgress();
        },
        (err) => {
          console.log(err);
        },
      );
    },
    // 기부자에게 NFT를 이전하는 함수
    async getNFT(history) {
      this.showModal = true;
      this.loadingMsg = 'NFT 발급 중입니다..';
      await NFTTransfer(
        process.env.VUE_APP_ADMIN_ADDRESS,
        process.env.VUE_APP_ADMIN_PRIV_KEY,
        this.userAddress,
        history.seq,
      );
      const uri = await getTokenURI(history.seq);
      // 백엔드에 nft 정보 추가
      await addItem(history.seq, uri, this.userAddress, history.seq);
      // 해당 기부 내역의 status 백엔드에 업데이트
      await updateDonationStatus(history.transactionHash, 3);
      // 전체 기부 내역 업데이트
      this.updateDonationHistories();
      this.loadingMsg = 'NFT 발급이 완료되었습니다.';
      this.loadingIsDone = true;
      setTimeout(() => {
        this.showModal = false;
        this.$router.push('/profile/my-nft');
      }, 2000);
    },
  },
  computed: {
    ...mapState(['userAddress']),
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
    await this.updateDonationHistories();
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
