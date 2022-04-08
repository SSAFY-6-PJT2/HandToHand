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

// Todo : 판매 시작시간, 종료 시간 data 에 추가해서 api 요청
const addSale = async (
  cashContractAddress,
  endTime,
  saleContractAddress,
  sellerAddress,
  startTime,
  tokenId,
) => {
  const data = {
    cashContractAddress: cashContractAddress,
    endTime: endTime,
    saleContractAddress: saleContractAddress,
    sellerAddress: sellerAddress,
    startTime: startTime,
    tokenId: tokenId,
  };
  await api.post(`/sales/`, JSON.stringify(data));
  // .then((res) => console.log(res))
  // .catch((err) => console.log(err));
};

/**
 * 판매 취소
 * @param {String} token_id
 */

const cancelSales = async (token_id) => {
  await api.patch(`/sales/${token_id}`);
  // .then((res) => console.log(res))
  // .catch((err) => console.log(err));
};

/**
 * 판매 정보 상세 조회
 * @param {String} token_id
 */

const getSale = async (token_id) => {
  await api.get(`/sales/${token_id}`);
  // .then((res) => console.log(res))
  // .catch((err) => console.log(err));
};

/**
 * 판매 완료
 * @param {String} token_id
 */

const completeSale = async (token_id) => {
  await api.patch(`/sales/${token_id}/complete`);
  // .then((res) => console.log(res))
  // .catch((err) => console.log(err));
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
  await api.patch(`/sales/${token_id}/purchase`, JSON.stringify(data));
  // .then((res) => console.log(res))
  // .catch((err) => console.log(err));
};

export { addSale, getSale, updateBuyer, cancelSales, completeSale };
