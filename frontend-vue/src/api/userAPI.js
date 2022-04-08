/**
 * @author Hyeonsooryu
 */

import apiInstance from './index';

const api = apiInstance();

const defaultSuccess = (res) => {};
const defaultFail = (err) => {};

/**
 * 회원 추가
 * @param {*} walletAddr      지갑 주소
 * @param {Function} success  요청 성공 시 수행할 콜백 함수
 * @param {Function} fail     요청 실패 시 수행할 콜백 함수
 */
const addUser = async (
  walletAddr,
  success = defaultSuccess,
  fail = defaultFail,
) => {
  const headers = { 'wallet-address': walletAddr };
  await api.post('/users', null, { headers }).then(success).catch(fail);
};

/**
 * 닉네임 수정
 * @param {*} nickname        닉네임
 * @param {*} walletAddr      지갑 주소
 * @param {Function} success  요청 성공 시 수행할 콜백 함수
 * @param {Function} fail     요청 실패 시 수행할 콜백 함수
 */
const updateNickname = async (
  nickname,
  walletAddr,
  success = defaultSuccess,
  fail = defaultFail,
) => {
  const headers = { 'nickname': nickname, 'wallet-address': walletAddr };
  await api
    .patch('/users/nickname', null, { headers })
    .then(success)
    .then(fail);
};

const getNickname = async (walletAddr) => {
  let result = null;
  const headers = { 'wallet-address': walletAddr };
  await api
    .get('/users/nickname', { headers })
    .then((res) => {
      result = res;
    })
    .catch((err) => {
      console.log(err);
    });
  return result;
};

export { addUser, updateNickname, getNickname };
