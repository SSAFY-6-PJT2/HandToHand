// https://handtohand.s3.ap-northeast-2.amazonaws.com/1.png

import { createNFT } from './NFT.js';

const admin_addr = process.env.VUE_APP_ADMIN_ADDRESS;
const admin_privkey = process.env.VUE_APP_ADMIN_PRIV_KEY;

const base_url = 'https://handtohand.s3.ap-northeast-2.amazonaws.com/';
let token_id;
const url = base_url + String(token_id) + '.png';

const bulkMint = async () => {
  for (token_id = 1; token_id <= 2500; token_id++) {
    await createNFT(admin_addr, admin_privkey, admin_addr, url);
  }
};

bulkMint();
