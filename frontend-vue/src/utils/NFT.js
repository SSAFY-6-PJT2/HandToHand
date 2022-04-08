/**
 * @author Daniel
 */
import Web3 from 'web3';
import ABIs from '@/utils/ABI/CONTRACTS_ABI.js';
import sendTransaction from './TxSender';

// Contracts ABIs
const NFT_ABI = ABIs.SSAFY_NFT_ABI;

// Web3
const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.VUE_APP_ETHEREUM_RPC_URL),
);

/*╔═════════════════════════════╗
	║             NFT             ║
	╚═════════════════════════════╝*/

const getCurrentId = async () => {
  const NFTContractInstance = new web3.eth.Contract(
    NFT_ABI,
    process.env.VUE_APP_NFT_CA,
  );

  const currentId = await NFTContractInstance.methods.current().call();

  return currentId;
};

const getTokenURI = async (tokenId) => {
  const NFTContractInstance = new web3.eth.Contract(
    NFT_ABI,
    process.env.VUE_APP_NFT_CA,
  );

  const tokenURI = await NFTContractInstance.methods.tokenURI(tokenId).call();

  return tokenURI;
};

const getOwner = async (tokenId) => {
  const NFTContractInstance = new web3.eth.Contract(
    NFT_ABI,
    process.env.VUE_APP_NFT_CA,
  );

  const owner = await NFTContractInstance.methods.ownerOf(tokenId).call();

  return owner;
};

const createNFT = async (fromAddr, privKey, toAddr, tokenURI) => {
  const NFTContractInstance = new web3.eth.Contract(
    NFT_ABI,
    process.env.VUE_APP_NFT_CA,
    { from: fromAddr },
  );

  const data = NFTContractInstance.methods.create(toAddr, tokenURI);

  const result = await sendTransaction(
    fromAddr,
    privKey,
    process.env.VUE_APP_NFT_CA,
    data,
  );

  return result;
};

const NFTTransfer = async (fromAddr, privKey, toAddr, tokenId) => {
  const NFTContractInstance = new web3.eth.Contract(
    NFT_ABI,
    process.env.VUE_APP_NFT_CA,
    { from: fromAddr },
  );
  // Set Approve
  await setApproveForAll(fromAddr, privKey, process.env.VUE_APP_NFT_CA, true);

  const data = NFTContractInstance.methods.transferFrom(
    fromAddr,
    toAddr,
    tokenId,
  );

  const result = await sendTransaction(
    fromAddr,
    privKey,
    process.env.VUE_APP_NFT_CA,
    data,
  );

  return result;
};

const setApproveForAll = async (fromAddr, privKey, toAddr, approve) => {
  // approve (bool) : 허용할 것인지 아닌지 bool 값
  const NFTContractInstance = new web3.eth.Contract(
    NFT_ABI,
    process.env.VUE_APP_NFT_CA,
    { from: fromAddr },
  );

  const data = NFTContractInstance.methods.setApprovalForAll(toAddr, approve);

  const result = await sendTransaction(
    fromAddr,
    privKey,
    process.env.VUE_APP_NFT_CA,
    data,
  );

  return result;
};

export {
  getCurrentId,
  getTokenURI,
  getOwner,
  createNFT,
  NFTTransfer,
  setApproveForAll,
};
