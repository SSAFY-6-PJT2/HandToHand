/**
 * @author Hyeonsooryu
 */

const eth = window.ethereum;

/**
 * @returns {Boolean} 메타마스크 설치 여부
 */
const isMetaMaskInstalled = () => {
  return eth.isMetaMask;
};

/**
 * @returns {Boolean} 지갑 연결 여부
 */
const isWalletConnected = () => {
  return eth.isConnected();
};

/**
 * @returns {String} 연결된 지갑 주소
 */
const getAddress = () => {
  return eth.selectedAddress;
};

/**
 * 이더리움 RPC 요청을 수행하는 함수
 * 이더라움 RPC 메서드와 파라미터는 아래 링크를 확인해주세요.
 * https://docs.metamask.io/guide/rpc-api.html#table-of-contents
 *
 * @param {String} method 이더리움 RPC 메서드
 * @param {Array} params 파라미터
 * @returns {Promise} Promise 객체
 */
const ethRequest = (method, params) => {
  return eth.request({ method: method, params: params });
};

export { isMetaMaskInstalled, isWalletConnected, getAddress, ethRequest };
