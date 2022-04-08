/**
 * @author Daniel
 */
import Web3 from 'web3';
import ABIs from '@/utils/ABI/CONTRACTS_ABI.js';
import sendTransaction from './TxSender';

// Contracts ABIs
const Token_ABI = ABIs.SSAFY_TOKEN_ABI;

// Web3
const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.VUE_APP_ETHEREUM_RPC_URL),
);

/*╔═════════════════════════════╗
	║           TOKEN             ║
	╚═════════════════════════════╝*/

// Get Balance of fromAddr
const getBalance = async (fromAddr) => {
  const contractInstance = new web3.eth.Contract(
    Token_ABI,
    process.env.VUE_APP_ERC20_CA,
  );
  const balance = await contractInstance.methods.balanceOf(fromAddr).call();
  return balance;
};

// Approve
const approve = async (fromAddr, privKey, toAddr, amount) => {
  const tokenContractInstance = new web3.eth.Contract(
    Token_ABI,
    process.env.VUE_APP_ERC20_CA,
    { from: fromAddr },
  );
  const data = tokenContractInstance.methods.approve(toAddr, amount);
  const result = await sendTransaction(
    fromAddr,
    privKey,
    process.env.VUE_APP_ERC20_CA,
    data,
  );

  return result;
};

// Initialize Ssafy Token mint
// Token owner 가 admin 아님 => 함부로 mint 안됨
const tokenMint = async (fromAddr, privKey, amount) => {
  const tokenContractInstance = new web3.eth.Contract(
    Token_ABI,
    process.env.VUE_APP_ERC20_CA,
    { from: fromAddr },
  );
  const data = tokenContractInstance.methods.mint(amount);
  const result = await sendTransaction(
    fromAddr,
    privKey,
    process.env.VUE_APP_ERC20_CA,
    data,
  );

  return result;
};

// tokenTransfer : admin 계정에서 user 에게 token 부여
const tokenTransfer = async (fromAddr, privKey, toAddr, amount) => {
  const tokenContractInstance = new web3.eth.Contract(
    Token_ABI,
    process.env.VUE_APP_ERC20_CA,
    { from: fromAddr },
  );
  const data = tokenContractInstance.methods.transfer(toAddr, amount);
  const receipt = await sendTransaction(
    fromAddr,
    privKey,
    process.env.VUE_APP_ERC20_CA,
    data,
  );

  const response = await data.call();

  const result = {
    receipt: receipt,
    data: response,
  };

  return result;
};

export { getBalance, approve, tokenMint, tokenTransfer };
