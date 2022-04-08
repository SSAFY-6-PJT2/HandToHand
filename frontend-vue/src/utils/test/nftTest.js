/**
 * @author Hyeonsooryu
 */

/*╔═════════════════════════════╗
	║          Deprecated         ║
	╚═════════════════════════════╝*/

import Web3 from 'web3';
import ABI from '@/utils/ABI/CONTRACT_ABI.js';
import sendTransaction from '../TxSender';

const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.VUE_APP_ETHEREUM_RPC_URL),
);

const contract = new web3.eth.Contract(ABI.NFT_ABI, process.env.VUE_APP_NFT_CA);

/**
 * 해당 유저의 토큰 개수를 반환하는 함수
 * @param {String} userAddr   지갑 주소
 * @returns {Number}          토큰 개수
 */
const getBalanceOf = async (userAddr) => {
  return contract.methods.balanceOf(userAddr).call();
};

/**
 * 해당 토큰의 소유자 지갑 주소를 반환하는 함수
 * @param {Number} tokenId     토큰 아이디
 * @returns {String}           소유자 지갑 주소
 */
const getOwnerOf = async (tokenId) => {
  return contract.methods.ownerOf(tokenId).call();
};

/**
 * 기부자에게 NFT를 이전하는 함수
 * @param {*} userAddr
 */
const trasferNftTo = async (userAddr, tokenId) => {
  const sendData = contract.methods.transferFrom(
    process.env.VUE_APP_ADMIN_ADDRESS,
    userAddr,
    tokenId,
  );

  const result = await sendTransaction(
    process.env.VUE_APP_ADMIN_ADDRESS,
    process.env.VUE_APP_ADMIN_PRIV_KEY,
    process.env.VUE_APP_NFT_CA,
    sendData,
  );
};

export { getBalanceOf, getOwnerOf, trasferNftTo };
