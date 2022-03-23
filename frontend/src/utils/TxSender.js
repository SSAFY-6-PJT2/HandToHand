import Web3 from 'web3';
import Tx from 'ethereumjs-tx';
import { formControlUnstyledClasses } from '@mui/base';

// Web3
const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.REACT_APP_ETHEREUM_RPC_URL),
);

/**
 * 트랜잭션 전송을 위한 공통 로직
 * 전달받은 개인키로 서명한 트랜잭션을 전송합니다.
 * @param {*} fromAddr 보내는 주소
 * @param {*} privKey 보내는 주소의 개인키
 * @param {*} toAddr 받는 주소
 * @param {*} data 입력 데이터
 * @returns 트랜잭션의 결과
 */
export default async function sendTransaction(fromAddr, privKey, toAddr, data) {
  const gas = await data.estimateGas({ from: fromAddr });

  // 트랜잭션 객체
  const tx = {
    gas: gas,
    to: toAddr,
    data: data.encodeABI(),
  };
  // 서명
  await web3.eth.accounts.signTransaction(tx, privKey).then(async (rawTx) => {
    // 트랜잭션 보내기
    await web3.eth
      .sendSignedTransaction(rawTx.rawTransaction)
      .once('receipt', (receipt) => {
        // 트랜잭션 결과 확인
        console.log(receipt);
      });
  });
  // 함수 반환 값을 result에 저장
  let result = null;
  await data.call().then((res) => {
    result = res;
  });
  return result;
}
