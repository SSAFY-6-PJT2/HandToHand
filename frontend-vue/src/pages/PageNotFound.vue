<template>
  <div>
    <h1>Page Not Found</h1>
    <n-button @click="GetBalance">잔액조회</n-button>
    <n-button @click="TokenMint">토큰생성</n-button>
    <n-button @click="TokenTransfer">토큰이전</n-button>
    <n-button @click="GetcurrentId">현재 토큰</n-button>
    <n-button @click="GetOwner">토큰 주인</n-button>
    <n-button @click="GetTokenURI">토큰 URI</n-button>
    <n-button @click="NFTCreate">토큰 생성</n-button>
    <n-button @click="NFTTransferTo">토큰 이전</n-button>
    <n-button @click="GetSaleAddress">판매 주소 조회</n-button>
    <n-button @click="CreateSale">토큰 판매</n-button>
    <n-button @click="GetSaleInfo">판매 정보 조회</n-button>
    <n-button class="btn-primary" @click="GetTimeLeft">남은 시간 조회</n-button>
    <n-button class="btn-primary" @click="GetHighestBid"
      >최고 입찰 조회</n-button
    >
    <n-button class="btn-primary" @click="Bid">입찰</n-button>
    <n-button class="btn-primary" @click="Purchase">바로구매</n-button>
    <n-button class="btn-primary" @click="ConfirmItem">구매 확인</n-button>
    <n-button class="btn-primary" @click="cancelSales">판매 취소</n-button>
    <n-button class="btn-danger btn-lg" @click="bulkMint">대량민팅</n-button>
    <p>Balance : {{ balance }}</p>
    <p>Current Token Id : {{ currentTokenId }}</p>
    <p>TokenURI : {{ tokenURI }}</p>
    <p>Owner : {{ owner }}</p>
    <p>Sale Address : {{ sales }}</p>
    <p>Sale Info : {{ saleInfo }}</p>
    <p>Time Left : {{ timeLeft }}</p>
    <p>Highest Bid : {{ highestBid }}</p>

    <img
      src="https://handtohand.s3.ap-northeast-2.amazonaws.com/1.png
"
      alt=""
    />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { Button } from '@/components';
import { getBalance, tokenMint, tokenTransfer } from '@/utils/Token.js';
import {
  getCurrentId,
  getTokenURI,
  getOwner,
  createNFT,
  NFTTransfer,
  setApproveForAll,
} from '@/utils/NFT.js';
import {
  getSaleAddress,
  createSale,
  getTimeLeft,
  getSaleInfo,
  getHighestBid,
  bid,
  purchase,
  confirmItem,
  cancelSales,
} from '@/utils/SaleFactory.js';

export default {
  components: {
    [Button.name]: Button,
  },
  data() {
    let startTime = new Date();
    startTime = parseInt(startTime.getTime() / 1000);
    let endTime = startTime + 10;
    return {
      balance: null,
      currentTokenId: null,
      tokenURI: null,
      owner: null,
      sales: null,
      startTime,
      endTime,
      saleInfo: null,
      timeLeft: null,
      highestBid: null,
      adminAddr: '0x4135f8fD42c98cAb53883863b6b80A7AA806e0E9',
      adminPrivkey:
        '0xe20c61798cad4c6edb27c902e3592d9c0f92983239fef77f334a3701e7bad767',
    };
  },
  created: function () {},
  methods: {
    GetBalance() {
      getBalance(this.userAddress)
        .then((res) => {
          this.balance = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    TokenMint() {
      tokenMint(this.userAddress, this.privKey, 1000000)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    TokenTransfer() {
      tokenTransfer(
        process.env.VUE_APP_ADMIN_ADDRESS,
        process.env.VUE_APP_ADMIN_PRIV_KEY,
        '0xc7734A83850af15140AAa6dbe506172eA1f8a275',
        1000000,
      )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    GetcurrentId() {
      getCurrentId()
        .then((res) => (this.currentTokenId = Number(res)))
        .catch((err) => console.log(err));
    },
    GetTokenURI() {
      getTokenURI(this.currentTokenId)
        .then((res) => (this.tokenURI = res))
        .catch((err) => console.log(err));
    },
    GetOwner() {
      getOwner(this.currentTokenId)
        .then((res) => (this.owner = res))
        .catch((err) => console.log(err));
    },
    NFTCreate() {
      createNFT(
        this.adminAddr,
        this.adminPrivkey,
        this.adminAddr,
        'https://handtohand.s3.ap-northeast-2.amazonaws.com/seed79911649320897884.png',
      )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    },
    async NFTTransferTo() {
      await NFTTransfer(
        process.env.VUE_APP_ADMIN_ADDRESS,
        process.env.VUE_APP_ADMIN_PRIV_KEY,
        this.userAddress,
        this.currentTokenId,
      )
        .then((res) => console.log(res))
        .catch((err) => console.log('에러!', err));
    },
    async GetSaleAddress() {
      await getSaleAddress(this.currentTokenId)
        .then((res) => (this.sales = res))
        .catch((err) => console.log(err));
    },
    CreateSale() {
      createSale(
        this.userAddress,
        this.privKey,
        this.currentTokenId,
        10,
        30,
        this.startTime,
        this.endTime,
      )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    },
    GetSaleInfo() {
      getSaleInfo(this.currentTokenId)
        .then((res) => (this.saleInfo = res))
        .catch((err) => console.log(err));
    },
    GetTimeLeft() {
      getTimeLeft(this.currentTokenId)
        .then((res) => (this.timeLeft = res))
        .catch((err) => console.log(err));
    },
    GetHighestBid() {
      getHighestBid(this.currentTokenId)
        .then((res) => (this.highestBid = res))
        .catch((err) => console.log(err));
    },
    Bid() {
      bid(this.userAddress, this.privKey, this.currentTokenId, 15)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    },
    Purchase() {
      purchase(this.userAddress, this.privKey, this.currentTokenId)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    },
    ConfirmItem() {
      confirmItem(this.userAddress, this.privKey, this.currentTokenId)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    },
    cancelSales() {
      cancelSales(this.userAddress, this.privKey, this.currentTokenId)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    },
    async bulkMint() {
      const base_url = 'https://handtohand.s3.ap-northeast-2.amazonaws.com/';
      let token_id;
      for (token_id = 1; token_id <= 2500; token_id++) {
        console.log(token_id);
        const url = base_url + String(token_id) + '.png';
        await createNFT(this.adminAddr, this.adminPrivkey, this.adminAddr, url);
      }
    },
  },
  computed: {
    ...mapState(['privKey', 'userAddress']),
    ...mapGetters(['isLogin']),
  },
};
</script>

<style></style>
