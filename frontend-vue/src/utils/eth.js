import Web3 from 'web3';
import TOKEN_ABI from '@/utils/ABI/TOKEN_ABI.js';
import sendTransaction from './TxSender';

const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.VUE_APP_ETHEREUM_RPC_URL),
);

/**
 * 해당 주소의 지갑 잔액을 반환합니다.
 * @param {String} address 조회할 지갑 주소
 * @returns {Promise}      resolve 시 잔액을 Number로 반환
 */
const ethGetBalance = async (address) => {
  const contractInstance = new web3.eth.Contract(
    TOKEN_ABI.abi,
    process.env.VUE_APP_ERC20_CA,
  );
  const balance = await contractInstance.methods.balanceOf(address).call();
  return +balance;
};

/**
 * SSF 토큰을 어드민 계정으로 송금합니다.
 * @param {String} fromAddr 보내는 지갑 주소
 * @param {String} toAddr   받는 지갑 주소
 * @param {Number} amount   보내는 SSF 토큰 양
 * @returns {Promise}       resolve시 성공 여부를 Boolean으로 반환
 */
const ethTransferToAdmin = async (fromAddr, privKey, amount) => {
  const contractInstance = new web3.eth.Contract(
    TOKEN_ABI.abi,
    process.env.VUE_APP_ERC20_CA,
    { from: fromAddr },
  );

  const data = contractInstance.methods.transfer(
    process.env.VUE_APP_ADMIN_ADDRESS,
    amount,
  );

  const result = await sendTransaction(
    fromAddr,
    privKey,
    process.env.VUE_APP_ERC20_CA,
    data,
  );

  return result;
};

/**
 * 
 * @param {String} txHash // 트랜잭션 해시
 * @returns {String} // 트랜잭션 상태
 */
const ethGetTxStatus = async (txHash) => {
  console.log('run!')
  await web3.eth.getTransactionReceipt(txHash)
    .then(async res => {
      console.log(res)
      if (res.status) {
        console.log('success')
        return 'success'
      } else {
        await web3.eth.getPendingTransactions()
          .then(res => {
            for (let tx of res) {
              if (tx.hash === txHash) {
                console.log('pending')
                return 'pending'
              }
            }
            console.log('fail')
            return 'fail'
          })
          .catch(console.log)
      }
    })
    .catch(console.log)
}

export { ethGetBalance, ethTransferToAdmin, ethGetTxStatus };
