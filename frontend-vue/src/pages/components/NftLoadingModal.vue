<template>
  <div>
    <modal
      :show.sync="modals.mini"
      class="modal-success"
      :show-close="false"
      header-classes="justify-content-center"
      type="mini"
      staticBackdrop
    >
      <div
        slot="header"
        class="d-flex justify-content-center align-items-center mt-3"
      >
        <div
          v-if="!isDone"
          class="spinner-border text-light"
          role="status"
          style="width: 3rem; height: 3rem"
        >
          <span class="sr-only">Loading...</span>
        </div>
        <i v-else class="now-ui-icons ui-1_check" style="font-size: 3rem"></i>
      </div>
      <p>{{ liveLoadingMsg }}</p>
    </modal>
  </div>
</template>

<script>
import { Modal } from '@/components';

export default {
  components: {
    Modal,
  },
  props: {
    showModal: Boolean,
    loadingMsg: String,
    loadingIsDone: Boolean,
  },
  data() {
    return {
      modals: {
        mini: false,
      },
      liveLoadingMsg: '',
      isDone: false,
    };
  },
  watch: {
    showModal() {
      this.modals.mini = this.showModal;
    },
    loadingMsg() {
      this.liveLoadingMsg = this.loadingMsg;
    },
    loadingIsDone() {
      this.isDone = this.loadingIsDone;
    },
  },
};
</script>
