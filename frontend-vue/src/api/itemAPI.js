/**
 * @author Hyeonsooryu
 */

import apiInstance from './index';

const api = apiInstance();

const defaultSuccess = (res) => {};
const defaultFail = (err) => {};

/*╔═════════════════════════════╗
	║    NFT 작품 정보 CRUD API    ║
	╚═════════════════════════════╝*/

/**
 * 등록된 모든 작품 조회
 * @param {Function} success  요청 성공 시 수행할 콜백 함수
 * @param {Function} fail     요청 실패 시 수행할 콜백 함수
 * @returns {Promise}
 */
const getItems = async () => {
  let result = null;
  await api
    .get('/items')
    .then((res) => {
      result = res;
    })
    .catch((err) => {});
  return result;
};

/**
 * 해당 유저의 작품 조회
 * @param {*} userAddr
 * @param {Function} success  요청 성공 시 수행할 콜백 함수
 * @param {Function} fail     요청 실패 시 수행할 콜백 함수
 */
const getUsersItems = async (userAddr) => {
  let result = null;
  await api
    .get(`/items/${userAddr}`)
    .then((res) => {
      result = res;
    })
    .catch((err) => {});
  return result;
};

/**
 * 판매 중인 작품 조회
 * @param {Function} success  요청 성공 시 수행할 콜백 함수
 * @param {Function} fail     요청 실패 시 수행할 콜백 함수
 */
const getItemsOnSale = (success = defaultSuccess, fail = defaultFail) => {
  api.get('/items/onSale').then(success).catch(fail);
};

/**
 * NFT 등록
 * @param {*} tokenUri
 * @param {*} ownerAddr
 * @param {*} tokenId
 * @param {Function} success  요청 성공 시 수행할 콜백 함수
 * @param {Function} fail     요청 실패 시 수행할 콜백 함수
 */
const addItem = async (
  donationSeq,
  tokenUri,
  ownerAddr,
  tokenId,
  success = defaultSuccess,
  fail = defaultFail,
) => {
  const data = {
    donationSeq: donationSeq,
    imageUrl: tokenUri,
    ownerAddress: ownerAddr,
    tokenId: tokenId,
  };

  await api.post('/items/add', JSON.stringify(data)).then(success).catch(fail);
};

/**
 * NFT 소유자 업데이트
 * @param {*} newOwnerAddr
 * @param {*} tokenId
 * @param {Function} success  요청 성공 시 수행할 콜백 함수
 * @param {Function} fail     요청 실패 시 수행할 콜백 함수
 */
const updateNftOwner = (
  newOwnerAddr,
  tokenId,
  success = defaultSuccess,
  fail = defaultFail,
) => {
  const data = {
    ownerAddress: newOwnerAddr,
    tokenId: tokenId,
  };

  api.patch('/items/update', JSON.stringify(data)).then(success).catch(fail);
};

/**
 * 좋아요 업데이트
 * @param {Function} success  요청 성공 시 수행할 콜백 함수
 * @param {Function} fail     요청 실패 시 수행할 콜백 함수
 */
const updateItemLikes = (success = defaultSuccess, fail = defaultFail) => {
  api.patch('/items').then(success).catch(fail);
};

/**
 * 작품 상세 조회
 * @param {Function} token_id
 * @param {Function} success  요청 성공 시 수행할 콜백 함수
 * @param {Function} fail     요청 실패 시 수행할 콜백 함수
 * @returns {Promise}
 */
const getItem = async (
  token_id,
  success = defaultSuccess,
  fail = defaultFail,
) => {
  let result = null;
  await api
    .get(`/items/details/${token_id}`)
    .then((res) => {
      result = res.data;
    })
    .catch(fail);
  return result;
};

export {
  getItems,
  getUsersItems,
  getItemsOnSale,
  addItem,
  updateNftOwner,
  updateItemLikes,
  getItem,
};
