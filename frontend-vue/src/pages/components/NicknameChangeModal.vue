<!--
@author Hyeonsooryu
-->

<template>
  <div>
    <modal
      :show.sync="modals.notice"
      footer-classes="justify-content-center"
      type="notice"
      :showClose="false"
    >
      <h5 slot="header" class="modal-title text-center text-black">
        닉네임 변경
      </h5>
      <template>
        <p class="text-left text-black" style="line-height: 2.4">
          변경할 닉네임을 입력해주세요.
        </p>
        <fg-input
          class="no-border"
          addon-right-icon="now-ui-icons users_single-02"
          v-model="inputNickname"
        ></fg-input>
        <p v-if="showErr" class="text-danger" style="font-size: 14px">
          닉네임은 영문 대소문자 4자 이상으로 입력해주세요.
        </p>
      </template>
      <div slot="footer" class="justify-content-center">
        <n-button type="success" round size="lg" @click="changeNickname">
          닉네임 변경하기
        </n-button>
      </div>
    </modal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { FormGroupInput, Button, Modal } from '@/components';
import { updateNickname } from '../../api/userAPI';

export default {
  components: {
    Modal,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
  },
  props: {
    showModal: Boolean,
  },
  data() {
    return {
      modals: {
        notice: false,
      },
      inputNickname: '',
      showErr: false,
      isLoading: false,
      loadingMsg: null,
    };
  },
  methods: {
    ...mapActions(['vuexSetNickname']),
    async changeNickname() {
      const regexp = /[0-9a-zA-Z]{4,}/g;
      const isValid = regexp.test(this.inputNickname);
      if (isValid) {
        this.showErr = false;
        await updateNickname(this.inputNickname, this.userAddress);
        this.vuexSetNickname(this.inputNickname);
        this.inputNickname = '';
        this.modals.notice = false;
      } else {
        this.showErr = true;
      }
    },
  },
  computed: {
    ...mapState(['userAddress']),
  },
  watch: {
    showModal() {
      this.modals.notice = this.showModal;
    },
    modals: {
      deep: true,
      handler() {
        if (!this.modals.notice) this.$emit('closeModal');
      },
    },
  },
};
</script>

<style></style>
