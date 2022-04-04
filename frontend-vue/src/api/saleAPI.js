/**
 * @author Daniel
 */

import apiInstance from './index';

const api = apiInstance();

/**
 * 판매 정보 등록
 * @param {String} token_id
 * @param {String} seller_address
 * @param {String} sale_contract_address
 * @param {String} cash_contract_address
 */

const addSale = async (
  token_id,
  seller_address,
  sale_contract_address,
  cash_contract_address,
) => {
  const data = {
    item_seq: token_id,
    seller_address: seller_address,
    sale_contract_address: sale_contract_address,
    cash_contract_address: cash_contract_address,
  };
  await api
    .post(`/sales`, JSON.stringify(data))
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

/**
 * 판매 정보 상세 조회
 * @param {String} token_id
 * @param {String} buyer_address
 * @param {String} cash_contract_address
 * @param {String} sale_contract_address
 * @param {String} seller_address
 * @param {String} created_at
 * @param {String} completed_at
 * @param {String} sale_id
 * @param {String} sale_yn
 */

const getSale = async (
  token_id,
  buyer_address,
  cash_contract_address,
  sale_contract_address,
  seller_address,
  created_at,
  completed_at,
  sale_id,
  sale_yn,
) => {
  const data = {
    item_seq: token_id,
    buyer_address: buyer_address,
    cash_contract_address: cash_contract_address,
    sale_contract_address: sale_contract_address,
    seller_address: seller_address,
    created_at: created_at,
    completed_at: completed_at,
    sale_id: sale_id,
    sale_yn: sale_yn,
  };
  await api
    .get(`/sales/${token_id}`, JSON.stringify(data))
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
    item_seq: token_id,
    buyer_address: buyer_address,
  };
  await api
    .patch(`/sales/${token_id}/purchase`, JSON.stringify(data))
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

/**
 * 판매 취소
 * @param {String} token_id
 * @param {String} sale_seq
 */

const cancelSale = async (token_id, sale_seq) => {
  const data = {
    item_seq: token_id,
    sale_seq: sale_seq,
  };
  await api
    .patch(`/sales/${sale_seq}/`, JSON.stringify(data))
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

/**
 * 판매 완료
 * @param {String} token_id
 * @param {String} buyer_address
 */

const completeSale = async (token_id, buyer_address) => {
  const data = {
    item_seq: token_id,
    buyer_address: buyer_address,
  };
  await api
    .patch(`/sales/${token_id}/complete`, JSON.stringify(data))
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export { addSale, getSale, updateBuyer, cancelSale, completeSale };
