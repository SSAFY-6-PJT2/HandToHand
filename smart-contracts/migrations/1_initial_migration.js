//const Migrations = artifacts.require("Migrations");
const SsafyToken = artifacts.require("SsafyToken");
const SsafyNFT = artifacts.require("SsafyNFT");
const SaleFactory = artifacts.require("SaleFactory");

/**
 * PJT Ⅰ/Ⅲ - 시나리오 테스트
 * @dev
 * 올바른 테스트를 위해
 * PJT Ⅰ - SsafyNFT
 * PJT Ⅲ - SsafyNFT, SsafyToken, SaleFactory
 * 가 배포되어야 합니다.
 */
module.exports = async function (deployer) {
  let NFTAddr = await deployer.deploy(SsafyNFT);
  let TokenAddr = await deployer.deploy(SsafyToken, "HTH", "HTH", 0);
  let NFTAuctionAddr = await deployer.deploy(SaleFactory, SsafyToken.address, SsafyNFT.address);
};
