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
module.exports = function (deployer) {
  deployer.deploy(SsafyNFT); 
  deployer.deploy(SsafyToken, "SSAFY", "SSF", 0);
  deployer.deploy(SaleFactory, "0xE95C9ebf6f0C9C082528C01d6f8f1bF3E820c783", "0x92A63f501746E0Ff5aE5F0ab7166E99b55B26f5b");
};
