/**
 * @author Daniel
 */

import { updateNftOwner } from '../api/itemAPI.js';
import {
  addSale,
  cancelSales,
  completeSale,
  updateBuyer,
} from '../api/saleAPI.js';
import { getSaleAddress } from './SaleFactory.js';

const callApiList = [
  'transferFrom', // NFT 이전 => ownerAddr, tokenId 필요
  'createSale', // 판매 생성
  'purchase', // 즉시 구매
  'confirmItem', // 구매 확인
  'cancelSales', // 판매 취소
];

const CallAPI = async (apiName, args, fromAddr, tokenId = null) => {
  if (apiName == 'transferFrom') {
    /**
     * NFT 소유자 업데이트
     * @param {*} newOwnerAddr
     * @param {*} tokenId
     */
    const newOwnerAddr = args[1];
    const token_id = +args[2];
    updateNftOwner(newOwnerAddr, token_id);
  } else if (apiName == 'createSale') {
    /**
     * 판매 정보 등록
     * @param {String} cashContractAddress
     * @param {String} saleContractAddress
     * @param {String} sellerAddress
     * @param {String} tokenId
     */
    // Todo : 판매 시작시간 판매 종료 시간 추가
    const token_id = args[1];
    const cashContractAddress = args[6];
    const saleContractAddress = await getSaleAddress(token_id);
    const sellerAddress = args[0];
    const startTime = args[4];
    const endTime = args[5];
    await addSale(
      cashContractAddress,
      endTime,
      saleContractAddress,
      sellerAddress,
      startTime,
      token_id,
    );
  } else if (apiName == 'bid') {
    /**
     * 구매자 정보 업데이트
     * @param {String} token_id
     * @param {String} buyer_address
     */
    const token_id = tokenId;
    const buyer_address = fromAddr;
    await updateBuyer(token_id, buyer_address);
  } else if (apiName == 'purchase') {
    /**
     * NFT 소유자 업데이트
     * @param {*} newOwnerAddr
     * @param {*} tokenId
     */
    const newOwnerAddr = fromAddr;
    const token_id = tokenId;
    await updateNftOwner(newOwnerAddr, token_id);
    /**
     * 구매자 정보 업데이트
     * @param {String} token_id
     * @param {String} buyer_address
     */
    const buyer_address = fromAddr;
    await updateBuyer(token_id, buyer_address);
    /**
     * 판매 완료
     * @param {String} token_id
     */
    await completeSale(token_id);
  } else if (apiName == 'confirmItem') {
    /**
     * NFT 소유자 업데이트
     * @param {*} newOwnerAddr
     * @param {*} tokenId
     */
    const newOwnerAddr = fromAddr;
    const token_id = tokenId;
    await updateNftOwner(newOwnerAddr, token_id);
    /**
     * 구매자 정보 업데이트
     * @param {String} token_id
     * @param {String} buyer_address
     */
    const buyer_address = fromAddr;
    await updateBuyer(token_id, buyer_address);
    /**
     * 판매 완료
     * @param {String} token_id
     */
    await completeSale(token_id);
  } else if (apiName == 'cancelSales') {
    /**
     * 판매 취소
     * @param {String} token_id
     */
    const token_id = tokenId;
    await cancelSales(token_id);
  }
};

export default CallAPI;
