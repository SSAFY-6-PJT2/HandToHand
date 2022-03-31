/**
 * @author Hyeonsooryu
 */

import apiInstance from './index';

const api = apiInstance();

/**
 * 기부 내역 가져오기
 * @param {String} walletAddress   기부 내역을 확인할 유저의 지갑 주소
 * @param {Function} success       요청 성공 시 수행할 콜백 함수
 * @param {Function} fail          요청 실패 시 수행할 콜백 함수
 */
const getDonationHistory = async (walletAddress, success, fail) => {
  await api
    .get('/donations', { headers: { 'wallet-address': walletAddress } })
    .then(success)
    .catch(fail);
};

/**
 * 기부 내역 추가하기
 * @param {*} amount          기부 금액
 * @param {*} txHash          트랜잭션 해시
 * @param {*} adddr           유저 지갑 주소
 * @param {Function} success  요청 성공 시 수행할 콜백 함수
 * @param {Function} fail     요청 실패 시 수행할 콜백 함수
 */
const addDonationHistory = async (amount, txHash, addr, success, fail) => {
  const data = {
    amount: amount,
    transactionHash: txHash,
    walletAddress: addr,
  };
  await api.post('/donations', JSON.stringify(data)).then(success).catch(fail);
};

/**
 * 기부 내역의 상태 업데이트
 * @param {String} txHash       트랜잭션 해시
 * @param {Number} statusNum    기부 내역 상태
 * @param {Function} success    요청 성공 시 수행할 콜백 함수
 * @param {Function} fail       요청 실패 시 수행할 콜백 함수
 */
const updateDonationStatus = (txHash, statusNum, success, fail) => {
  api
    .patch('donations', {
      params: { transactionHash: txHash, type: statusNum },
    })
    .then(success)
    .catch(fail);
};

export { getDonationHistory, addDonationHistory, updateDonationStatus };
