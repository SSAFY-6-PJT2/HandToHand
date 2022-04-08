/**
 *  PJT Ⅲ - Req.1-SC3) 시나리오 테스트
 */
const SsafyToken = artifacts.require("SsafyToken");
const SsafyNFT = artifacts.require("SsafyNFT");
const SaleFactory = artifacts.require("SaleFactory");
const Sale = artifacts.require("Sale");
let ssafyTokenContract, salesFactoryContract, nftContract, salesContract;
let itemId = 0;

contract("Sale Contract Testing", async (accounts) => {
  const mintAmount = 10000;
  const uri1 = "testURI1";
  const uri2 = "testURI2";

  async function print(title) {
    const admin = accounts[0];
    const seller = accounts[1];
    const bidder1 = accounts[2];
    const bidder2 = accounts[3];
    console.log(`\n--------------------  ${title} --------------------`);
    console.log(`Admin: ${admin} ${await getBalance(seller)}`);
    console.log(`Seller: ${seller} ${await getBalance(seller)}`);
    console.log(`Bidder1: ${bidder1} ${await getBalance(bidder1)}`);
    console.log(`Bidder2: ${bidder2} ${await getBalance(bidder2)}\n`);
  }

  it("Bid and confirm", async () => {
    const admin = accounts[0];
    const seller = accounts[1];
    const bidder1 = accounts[2];
    const bidder2 = accounts[3]; // purchaser
    const uri = "NFTTest";

    // createSale 인자
    let newNFTId;
    let startTime;
    let endTime;
    let currencyAddress;
    let nftAddress;

    const SsafyTokenContract = await SsafyToken.deployed();
    const SsafyNFTContract = await SsafyNFT.deployed();
    const SaleFactoryContract = await SaleFactory.deployed();

    // timeout function
    function timeout(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    // 초기 ERC20 토큰 부여
    await SsafyTokenContract.mint(100000, { from: admin });
    await SsafyTokenContract.forceToTransfer(admin, seller, 1000, { from: admin });
    await SsafyTokenContract.forceToTransfer(admin, bidder1, 1000, { from: admin });
    await SsafyTokenContract.forceToTransfer(admin, bidder2, 1000, { from: admin });

    // seller 의 NFT 생성
    await SsafyNFTContract.create(seller, uri, { from: seller });
    newNFTId = await SsafyNFTContract.current();
    newNFTId = newNFTId.words[0];
    currencyAddress = SsafyTokenContract.address;
    nftAddress = SsafyNFTContract.address;
    startTime = new Date();
    startTime = parseInt(startTime.getTime() / 1000);
    endTime = startTime + 10;

    // New Sale 생성
    await SaleFactoryContract.createSale(
      seller,
      newNFTId,
      10, // minPrice
      100, // purchasePrice
      startTime,
      endTime,
      currencyAddress,
      nftAddress,
      { from: admin }
    );
    const allsales = await SaleFactoryContract.allSales();
    const currentSale = allsales[0];

    // seller 가 saleContract 에 nft 이전
    await SsafyNFTContract.transferFrom(seller, currentSale, newNFTId, { from: seller });

    // New Sale Contract 호출
    salesContract = await Sale.at(currentSale);

    // 1초 뒤 bidder1 이 15 token 입찰
    await timeout(1000);
    const bid1_amount = 10;
    // approve 를 contract 안에서 하는것은 불가능? (approve 호출 시 mgs.sender 가 contract 가 되기 때문)
    await SsafyTokenContract.approve(currentSale, bid1_amount, { from: bidder1 });
    await salesContract.bid(bid1_amount, { from: bidder1, gas: 300000 });
    let highestBid = await salesContract.getHighestBid();
    // console.log(highestBid);

    // 1초 뒤 bidder2 이 30 token 입찰
    await timeout(1000);
    const bid2_amount = 15;
    // approve 를 contract 안에서 하는것은 불가능? (approve 호출 시 mgs.sender 가 contract 가 되기 때문)
    await SsafyTokenContract.approve(currentSale, bid2_amount, { from: bidder2 });
    await salesContract.bid(bid2_amount, { from: bidder2, gas: 300000 });
    highestBid = await salesContract.getHighestBid();
    // console.log(highestBid);

    // 10초 뒤 제안자 2 가 confirmItem() 호출
    await timeout(10000);
    await salesContract.confirmItem({ from: bidder2 });

    // 다음을 테스트를 통과해야합니다.
    assert.equal(bidder2, await SsafyNFTContract.ownerOf(newNFTId), "Confirm Failed");
    assert.equal(1000, await SsafyTokenContract.balanceOf(bidder1), "Refund Failed");
  });

  it("Bid and Purchase", async () => {
    const admin = accounts[0];
    const seller = accounts[5];
    const bidder1 = accounts[6];
    const purchaser = accounts[7]; // purchaser
    const uri = "NFTTest";

    // createSale 인자
    let newNFTId;
    let startTime;
    let endTime;
    let minPrice;
    let purchasePrice;
    let currencyAddress;
    let nftAddress;

    const SsafyTokenContract = await SsafyToken.deployed();
    const SsafyNFTContract = await SsafyNFT.deployed();
    const SaleFactoryContract = await SaleFactory.deployed();

    // timeout function
    function timeout(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    // 초기 ERC20 토큰 부여
    await SsafyTokenContract.mint(100000, { from: admin });
    await SsafyTokenContract.forceToTransfer(admin, seller, 1000, { from: admin });
    await SsafyTokenContract.forceToTransfer(admin, bidder1, 1000, { from: admin });
    await SsafyTokenContract.forceToTransfer(admin, purchaser, 1000, { from: admin });

    // seller 의 NFT 생성
    await SsafyNFTContract.create(seller, uri, { from: seller });
    newNFTId = await SsafyNFTContract.current();
    newNFTId = newNFTId.words[0];
    currencyAddress = SsafyTokenContract.address;
    nftAddress = SsafyNFTContract.address;
    startTime = new Date();
    startTime = parseInt(startTime.getTime() / 1000);
    endTime = startTime + 10;
    minPrice = 10;
    purchasePrice = 100;

    // New Sale 생성
    await SaleFactoryContract.createSale(
      seller,
      newNFTId,
      minPrice,
      purchasePrice,
      startTime,
      endTime,
      currencyAddress,
      nftAddress,
      { from: admin }
    );
    const allsales = await SaleFactoryContract.allSales();
    const currentSale = allsales[1];

    // seller 가 saleContract 에 nft 이전
    await SsafyNFTContract.transferFrom(seller, currentSale, newNFTId, { from: seller });

    // New Sale Contract 호출
    salesContract = await Sale.at(currentSale);

    // 1초 뒤 bidder1 이 15 token 입찰
    await timeout(1000);
    const bid1_amount = 10;
    // approve 를 contract 안에서 하는것은 불가능? (approve 호출 시 mgs.sender 가 contract 가 되기 때문)
    await SsafyTokenContract.approve(currentSale, bid1_amount, { from: bidder1 });
    await salesContract.bid(bid1_amount, { from: bidder1, gas: 300000 });
    let highestBid = await salesContract.getHighestBid();
    // console.log(highestBid);

    // 1초 뒤 purchaser 가 즉시 구매
    await timeout(1000);
    await SsafyTokenContract.approve(currentSale, purchasePrice, { from: purchaser });
    await salesContract.purchase({ from: purchaser });

    // 다음을 테스트를 통과해야합니다.
    assert.equal(purchaser, await SsafyNFTContract.ownerOf(newNFTId), "Not Owned By Purchaser");
    assert.equal(1000, await SsafyTokenContract.balanceOf(bidder1), "Refund Failed");
    assert.equal(900, await SsafyTokenContract.balanceOf(purchaser), "Transfer Failed");
  });

  it("Bid and Cancel", async () => {
    const admin = accounts[0];
    const seller = accounts[8];
    const bidder1 = accounts[9];
    const uri = "NFTTest";

    // createSale 인자
    let newNFTId;
    let startTime;
    let endTime;
    let minPrice;
    let purchasePrice;
    let currencyAddress;
    let nftAddress;

    const SsafyTokenContract = await SsafyToken.deployed();
    const SsafyNFTContract = await SsafyNFT.deployed();
    const SaleFactoryContract = await SaleFactory.deployed();

    // timeout function
    function timeout(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    // 초기 ERC20 토큰 부여
    await SsafyTokenContract.mint(100000, { from: admin });
    await SsafyTokenContract.forceToTransfer(admin, seller, 1000, { from: admin });
    await SsafyTokenContract.forceToTransfer(admin, bidder1, 1000, { from: admin });

    // seller 의 NFT 생성
    await SsafyNFTContract.create(seller, uri, { from: seller });
    newNFTId = await SsafyNFTContract.current();
    newNFTId = newNFTId.words[0];
    currencyAddress = SsafyTokenContract.address;
    nftAddress = SsafyNFTContract.address;
    startTime = new Date();
    startTime = parseInt(startTime.getTime() / 1000);
    endTime = startTime + 10;
    minPrice = 10;
    purchasePrice = 100;

    // New Sale 생성
    await SaleFactoryContract.createSale(
      seller,
      newNFTId,
      minPrice,
      purchasePrice,
      startTime,
      endTime,
      currencyAddress,
      nftAddress,
      { from: admin }
    );
    const allsales = await SaleFactoryContract.allSales();
    const currentSale = allsales[2];

    // seller 가 saleContract 에 nft 이전
    await SsafyNFTContract.transferFrom(seller, currentSale, newNFTId, { from: seller });

    // New Sale Contract 호출
    salesContract = await Sale.at(currentSale);

    // 1초 뒤 bidder1 이 15 token 입찰
    await timeout(1000);
    const bid1_amount = 10;
    // approve 를 contract 안에서 하는것은 불가능? (approve 호출 시 mgs.sender 가 contract 가 되기 때문)
    await SsafyTokenContract.approve(currentSale, bid1_amount, { from: bidder1 });
    await salesContract.bid(bid1_amount, { from: bidder1, gas: 300000 });
    let highestBid = await salesContract.getHighestBid();
    // console.log(highestBid);

    // 1초 뒤 seller 가 Sale cancel
    await timeout(1000);
    await salesContract.cancelSales({ from: seller });
  });
});
