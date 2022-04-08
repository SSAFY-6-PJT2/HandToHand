/**
 * @author Hyeonsooryu
 */

/*╔═════════════════════════════╗
	║        Ethereum Net         ║
	╚═════════════════════════════╝*/

import Web3 from 'web3';

const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.VUE_APP_ETHEREUM_RPC_URL),
);

/**
 * 개인키로부터 주소를 추출합니다.
 * @param {String} privKey 개인키
 * @returns 주소
 */
const getAddressFrom = (privKey) => {
  if (privKey.length === 66 && privKey.startsWith('0x')) {
    const pubKey = web3.eth.accounts.privateKeyToAccount(privKey);
    return pubKey.address;
  } else {
    throw '유효한 개인키를 입력해주세요.';
  }
};

/**
 * 트랜잭션의 상태를 반환합니다.
 * @param {String} txHash    트랜잭션 해시
 * @returns {Number}         트랜잭션 상태 / 0:실패 / 1:처리중 / 2:성공
 */
const getTxStatus = async (txHash) => {
  let result = null;
  await web3.eth
    .getTransactionReceipt(txHash)
    .then(async (res) => {
      if (res.status) {
        console.log('success');
        result = 2;
      } else {
        await web3.eth
          .getPendingTransactions()
          .then((res) => {
            for (let tx of res) {
              if (tx.hash === txHash) {
                console.log('pending');
                result = 1;
              }
            }
            console.log('fail');
            result = 0;
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));

  return result ? result : new Error('예외: 알 수 없는 오류');
};

export { getAddressFrom, getTxStatus };
