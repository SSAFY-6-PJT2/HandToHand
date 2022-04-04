/**
 * @author Daniel
 */

import apiInstance from './index';

const api = apiInstance();

/**
 * 판매 정보 등록
 * @param {String} item_seq
 * @param {String} seller_address
 * @param {String} sale_contract_address
 * @param {String} cash_contract_address
 */

const addSale = async (
  item_seq,
  seller_address,
  sale_contract_address,
  cash_contract_address,
) => {
  const data = {
    item_seq: item_seq,
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
 * 판매 정보 반환
 * @param {String} item_seq
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
  item_seq,
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
    item_seq: item_seq,
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
    .get(`/sales/${item_seq}`, JSON.stringify(data))
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

/**
 * 구매자 정보 업데이트
 * @param {String} item_seq
 * @param {String} buyer_address
 */

const updateBuyer = async (item_seq, buyer_address) => {
  const data = {
    item_seq: item_seq,
    buyer_address: buyer_address,
  };
  await api
    .patch(`/sales/${item_seq}/`, JSON.stringify(data))
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};
