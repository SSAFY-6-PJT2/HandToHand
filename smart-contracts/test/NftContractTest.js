/**
 * PJT Ⅰ - 과제 3 테스트 코드 작성
 * @dev NFT mint, transfer, and compare URI 
 */

const assert = require('assert');

const SsafyNFT = artifacts.require("SsafyNFT");

module.exports = function (deployer) {
    // deployer.deploy(SsafyToken, "SSAFY", "SSF", 0);
    deployer.deploy(SsafyNFT);
}

contract("NftCreator", accounts => {
    console.log(accounts);
    const sender = accounts[1];
    const receiver = accounts[2];
    let owner;
    let tokenId;
    const tokenURI = "test";

    it("Create Test", () => {
        SsafyNFT.deployed()
            .then(instance => {
                tokenId = instance.create(sender, tokenURI);
                owner = sender;
                instance.current()
                    .then(tokenid => console.log(tokenid))
            })
    });

    it("Transfer Test", () => {
        SsafyNFT.deployed()
            .then(instance => {
                assert.notEqual(owner, receiver, "NFT transfer Failed!");
                instance.transferFrom(owner, receiver, tokenId);
                owner = receiver;
            })
    });

    it("Compare tokenURI", () => {
        SsafyNFT.deployed()
            .then(instance => {
                const tokenURIFetched = instance.tokenURI(tokenId);
                // console.log(tokenURIFetched);
                assert.equal(tokenURI, tokenURIFetched, "Wrong Token Id or URI")
            })
    });
});