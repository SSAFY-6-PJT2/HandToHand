/**
 * @author Daniel
 */

import apiInstance from './index';

const api = apiInstance();

/**
 * 판매 정보 등록
 * @param {String} cashContractAddress
 * @param {String} saleContractAddress
 * @param {String} sellerAddress
 * @param {String} tokenId
 */

const addSale = async (
  cashContractAddress,
  saleContractAddress,
  sellerAddress,
  tokenId,
) => {
  const data = {
    cashContractAddress: cashContractAddress,
    saleContractAddress: saleContractAddress,
    sellerAddress: sellerAddress,
    tokenId: tokenId,
  };
  await api
    .post(`/sales/`, JSON.stringify(data))
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

/**
 * 판매 취소
 * @param {String} token_id
 */

const cancelSale = async (token_id) => {
  await api
    .patch(`/sales/${token_id}`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

/**
 * 판매 정보 상세 조회
 * @param {String} token_id
 */

const getSale = async (token_id) => {
  await api
    .get(`/sales/${token_id}`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

/**
 * 판매 완료
 * @param {String} token_id
 */

const completeSale = async (token_id) => {
  await api
    .patch(`/sales/${token_id}/complete`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

/**
 * 구매자 정보 업데이트
 * @param {String} token_id
 * @param {String} buyer_address
 */

const updateBuyer = async (token_id, buyer_address) => {
  const data = {
    buyer_address: buyer_address,
  };
  await api
    .patch(`/sales/${token_id}/purchase`, JSON.stringify(data))
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export { addSale, getSale, updateBuyer, cancelSale, completeSale };
