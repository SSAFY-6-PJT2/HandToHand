/**
 * @author Daniel
 */
import Web3 from 'web3';
import ABIs from '@/utils/ABI/CONTRACTS_ABI.js';
import sendTransaction from './TxSender';
import { approve } from '@/utils/Token.js';
import { setApproveForAll } from '@/utils/NFT.js';

// Contract ABIs
const Token_ABI = ABIs.SSAFY_TOKEN_ABI;
const NFT_ABI = ABIs.SSAFY_NFT_ABI;
const SaleFactory_ABI = ABIs.SALE_FACTORY_ABI;
const Sale_ABI = ABIs.SALE_ABI;

// Contract addresses
const Token_CA = process.env.VUE_APP_ERC20_CA;
const NFT_CA = process.env.VUE_APP_NFT_CA;
const SaleFactory_CA = process.env.VUE_APP_SALE_FACTORY_CA;
let Sale_CA;

// Admin account
const admin_address = process.env.VUE_APP_ADMIN_ADDRESS;
const admin_privkey = process.env.VUE_APP_ADMIN_PRIV_KEY;

// Web3
const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.VUE_APP_ETHEREUM_RPC_URL),
);

/*╔═════════════════════════════╗
	║         SALE_FACTORY        ║
	╚═════════════════════════════╝*/

const getSaleAddress = async (tokenId) => {
  const saleFactoryContractInstance = new web3.eth.Contract(
    SaleFactory_ABI,
    SaleFactory_CA,
  );
  const saleAddress = await saleFactoryContractInstance.methods
    .getSaleAddress(tokenId)
    .call();

  return saleAddress;
};

const createSale = async (
  fromAddr,
  privKey,
  itemId,
  minPrice,
  purchasePrice,
  startTime,
  endTime,
) => {
  const saleFactoryContractInstance = new web3.eth.Contract(
    SaleFactory_ABI,
    SaleFactory_CA,
    { from: admin_address },
  );
  // Set Approve
  await setApproveForAll(fromAddr, privKey, SaleFactory_CA, true);

  const data = saleFactoryContractInstance.methods.createSale(
    fromAddr, // seller
    itemId,
    minPrice,
    purchasePrice,
    startTime,
    endTime,
    Token_CA,
    NFT_CA,
  );
  const result = await sendTransaction(
    admin_address,
    admin_privkey,
    SaleFactory_CA,
    data,
  );

  return result;
};

/*╔═════════════════════════════╗
	║            SALE             ║
	╚═════════════════════════════╝*/

// Get functions

const getTimeLeft = async (tokenId) => {
  // Token Id 를 이용한 SALE_CA 호출
  Sale_CA = await getSaleAddress(tokenId);
  const saleContractInstance = new web3.eth.Contract(Sale_ABI, Sale_CA);

  const leftTime = saleContractInstance.methods.getTimeLeft().call();

  return leftTime;
};

const getSaleInfo = async (tokenId) => {
  // Token Id 를 이용한 SALE_CA 호출
  Sale_CA = await getSaleAddress(tokenId);
  const saleContractInstance = new web3.eth.Contract(Sale_ABI, Sale_CA);

  const saleInfo = saleContractInstance.methods.getSaleInfo().call();

  return saleInfo;
};

const getHighestBid = async (tokenId) => {
  // Token Id 를 이용한 SALE_CA 호출
  Sale_CA = await getSaleAddress(tokenId);
  const saleContractInstance = new web3.eth.Contract(Sale_ABI, Sale_CA);

  const highestBid = saleContractInstance.methods.getHighestBid().call();

  return highestBid;
};

// Sale functions

const bid = async (fromAddr, privKey, tokenId, amount) => {
  Sale_CA = await getSaleAddress(tokenId);
  const saleContractInstance = new web3.eth.Contract(Sale_ABI, Sale_CA, {
    from: fromAddr,
  });

  // Bid amount 이전에 따른 Approve
  await approve(fromAddr, privKey, Sale_CA, amount);

  const data = saleContractInstance.methods.bid(amount);

  const result = await sendTransaction(
    fromAddr,
    privKey,
    Sale_CA,
    data,
    tokenId,
  );

  return result;
};

const purchase = async (fromAddr, privKey, tokenId) => {
  Sale_CA = await getSaleAddress(tokenId);
  const saleContractInstance = new web3.eth.Contract(Sale_ABI, Sale_CA, {
    from: fromAddr,
  });

  const saleInfo = await getSaleInfo(tokenId);
  const purchasePrice = saleInfo.BuyNowPrice;

  // Purchase amount 이전에 따른 Approve
  await approve(fromAddr, privKey, Sale_CA, purchasePrice)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  const data = saleContractInstance.methods.purchase();

  const result = await sendTransaction(
    fromAddr,
    privKey,
    Sale_CA,
    data,
    tokenId,
  );

  return result;
};

const confirmItem = async (fromAddr, privKey, tokenId) => {
  Sale_CA = await getSaleAddress(tokenId);
  const saleContractInstance = new web3.eth.Contract(Sale_ABI, Sale_CA, {
    from: fromAddr,
  });

  const data = saleContractInstance.methods.confirmItem();

  const result = await sendTransaction(
    fromAddr,
    privKey,
    Sale_CA,
    data,
    tokenId,
  );

  return result;
};

const cancelSales = async (fromAddr, privKey, tokenId) => {
  Sale_CA = await getSaleAddress(tokenId);
  const saleContractInstance = new web3.eth.Contract(Sale_ABI, Sale_CA, {
    from: fromAddr,
  });

  const data = saleContractInstance.methods.cancelSales();

  const result = await sendTransaction(
    fromAddr,
    privKey,
    Sale_CA,
    data,
    tokenId,
  );

  return result;
};

export {
  getSaleAddress,
  createSale,
  getTimeLeft,
  getSaleInfo,
  getHighestBid,
  bid,
  purchase,
  confirmItem,
  cancelSales,
};
