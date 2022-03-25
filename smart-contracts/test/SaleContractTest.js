/**
 *  PJT Ⅲ - Req.1-SC3) 시나리오 테스트
 */
const SsafyToken = artifacts.require("SsafyToken");
const SsafyNFT = artifacts.require("SsafyNFT");
const SaleFactory = artifacts.require("SaleFactory");
const Sale = artifacts.require("Sale");
let ssafyTokenContract, salesFactoryContract, nftContract, salesContract;
let itemId = 0;

contract("Sale Contract Testing", async accounts => {
    const mintAmount = 10000;
    const uri1 = "testURI1";
    const uri2 = "testURI2";

    async function print(title) {
        const seller = accounts[0];
        const bidder1 = accounts[1];
        const bidder2 = accounts[2];
        console.log(`\n--------------------  ${title} --------------------`);
        console.log(`Seller: ${seller} ${await getBalance(seller)}`);
        console.log(`Bidder1: ${bidder1} ${await getBalance(bidder1)}`);
        console.log(`Bidder2: ${bidder2} ${await getBalance(bidder2)}\n`);
    }

    it("Bid and confirm", async () => {
        const seller = accounts[0];
        const bidder1 = accounts[1];
        const bidder2 = accounts[2]; // purchaser
        const uri = "NFTTest"

        // createSale 인자
        let newNFTId;
        let startTime;
        let endTime;
        let currencyAddress;
        let nftAddress;
        let newSaleContract;

        const SsafyTokenContract = await SsafyToken.deployed();
        const SsafyNFTContract = await SsafyNFT.deployed();
        const SaleFactoryContract = await SaleFactory.deployed();

        newNFTId = await SsafyNFTContract.create.call(seller, uri);
        newNFTId = newNFTId.words[0];
        const NFTURI = await SsafyNFTContract.tokenURI.call(newNFTId);
        console.log(seller, newNFTId);
        console.log(NFTURI);
        tokenURI = await SsafyNFTContract.tokenURI.call(newNFTId);
        currencyAddress = await SsafyTokenContract.addressOfContract.call()
        nftAddress = await SsafyNFTContract.addressOfContract.call()

        startTime = new Date();
        startTime = parseInt(startTime.getTime()/1000);
        endTime = startTime + 10;

        const allSales = await SaleFactoryContract.allSales.call();
        console.log(allSales);

        newSaleContract = await SaleFactoryContract.createSale.call(
            newNFTId,
            1,                  // minPrice
            10,                 // purchasePrice
            startTime,
            endTime,
            currencyAddress,
            nftAddress,
            {from: seller}
            )
        console.log(newSaleContract);
        
        // TODO : seller 가 호출하는 상황으로 만들어야 함

        // print("Bid and confirm");
        // TODO
        // 다음을 테스트를 통과해야합니다.
        // assert.equal(bidder2, await getNftOwner(), "Confirm Failed");
        // assert.equal(1000, await getBalance(bidder1), "Refund Failed");
    });

    it("Bid and Purchase", async () => {
        const seller = accounts[0];
        const bidder = accounts[1];
        const purchaser = accounts[2];

        // TODO
        // 다음을 테스트를 통과해야합니다.
        // assert.equal(purchaser, await getNftOwner(), "Not Owned By Purchaser");
        // assert.equal(1000, await getBalance(bidder), "Refund Failed");
        // assert.equal(900, await getBalance(purchaser), "Transfer Failed");
    });

    it("Bid and Cancel", async () => {
        const seller = accounts[0];
        const bidder = accounts[1];

        // TODO
        // 다음을 테스트를 통과해야합니다.
        // assert.equal(seller, await getNftOwner(), "Cancellation Failed");
        // assert.equal(1000, await getBalance(bidder), "Refund Failed");
    });

});
