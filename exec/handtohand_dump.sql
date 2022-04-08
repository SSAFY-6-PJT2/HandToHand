DROP DATABASE handtohand;
CREATE DATABASE handtohand;
USE handtohand;

DROP TABLE IF EXISTS `items`;

CREATE TABLE `items` (
                         `item_seq`	bigint	NOT NULL AUTO_INCREMENT PRIMARY KEY,
                         `item_image_url`	varchar(1000)	NOT NULL,
                         `item_token_id`	varchar(200) NOT	NULL,
                         `item_title`	varchar(100)	NOT NULL,
                         `item_owner_address`	varchar(200) NOT NULL,
                         `item_on_sale_yn`	tinyint	NOT NULL DEFAULT 0,
                         `item_price`	double	NOT NULL DEFAULT 0,
                         `item_like_count`	int	NOT NULL  DEFAULT 0,
                         `fk_donation_seq`	bigint
);

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
                         `user_seq`	bigint	NOT NULL AUTO_INCREMENT PRIMARY KEY,
                         `user_nickname`	varchar(100)	NOT NULL DEFAULT 'unnamed',
                         `user_wallet_address`	varchar(200) NOT NULL
);

DROP TABLE IF EXISTS `sales`;

CREATE TABLE `sales` (
                         `sale_seq`	bigint NOT NULL AUTO_INCREMENT PRIMARY KEY,
                         `sale_contract_address`	varchar(200)	NOT NULL,
                         `sale_yn`	tinyint	NOT NULL DEFAULT 0,
                         `sale_cash_contract_address`	varchar(200) NOT NULL,
                         `sale_seller_address`	varchar(200)	NOT NULL,
                         `sale_buyer_address`	varchar(200) ,
                         `sale_created_at`	timestamp	NOT NULL,
                         `sale_completed_at`	timestamp	,
                         `fk_item_seq`	bigint,
                         `sale_start_time`	int	NULL NOT NULL,
                         `sale_end_time`	int	NULL NOT NULL
);

DROP TABLE IF EXISTS `likes`;

CREATE TABLE `likes` (
                         `likes_seq`	bigint NOT NULL AUTO_INCREMENT PRIMARY KEY,
                         `fk_user_seq`	bigint,
                         `like_token_id`	varchar(200)	NOT NULL
);

DROP TABLE IF EXISTS `donations`;

CREATE TABLE `donations` (
                             `donation_seq`	bigint NOT NULL AUTO_INCREMENT PRIMARY KEY,
                             `donation_amount`	double	NOT NULL,
                             `fk_user_seq`	bigint,
                             `donation_created_at`	timestamp	NOT NULL,
                             `donation_status_type`	varchar(20)	NOT NULL DEFAULT 1,
                             `donation_transaction_hash`	varchar(200)	NOT NULL
);

ALTER TABLE sales
    ADD FOREIGN KEY (fk_item_seq) REFERENCES items(item_seq);

ALTER TABLE likes
    ADD FOREIGN KEY (fk_user_seq) REFERENCES users(user_seq);

ALTER TABLE donations
    ADD FOREIGN KEY (fk_user_seq) REFERENCES users(user_seq);

ALTER TABLE items
    ADD FOREIGN KEY (fk_donation_seq) REFERENCES donations(donation_seq);


INSERT INTO handtohand.users (user_seq, user_nickname, user_wallet_address) VALUES (1, '82surf', '0xA7BDeFC1e1d4CbBD2588c5b0E64a4c10f8947AEB');
INSERT INTO handtohand.users (user_seq, user_nickname, user_wallet_address) VALUES (2, 'StandWithUkraine', '0xf41523A930f3dbC1CcF23b7F30bc814c35597FAe');
INSERT INTO handtohand.users (user_seq, user_nickname, user_wallet_address) VALUES (3, 'SaveUkraine', '0xc7734A83850af15140AAa6dbe506172eA1f8a275');
INSERT INTO handtohand.users (user_seq, user_nickname, user_wallet_address) VALUES (4, 'unnamed', '0x79A96922007a3bC5eC83c922148C0826D05995e6');
INSERT INTO handtohand.users (user_seq, user_nickname, user_wallet_address) VALUES (5, 'unnamed', '0xeA9d68de5Fca055C2F384040Af3e1E27093a9E88');
INSERT INTO handtohand.users (user_seq, user_nickname, user_wallet_address) VALUES (6, 'ThatsMe', '0x2b60B659C4a9D123414cedB593Df2ddEAE56722E');
INSERT INTO handtohand.users (user_seq, user_nickname, user_wallet_address) VALUES (7, 'unnamed', '0xf7C0e797B4b6c25F8FFD8B95E7e68650f0E990da');
INSERT INTO handtohand.users (user_seq, user_nickname, user_wallet_address) VALUES (8, 'unnamed', '0xf51257E734D70132442d9c007c82662253e3A32B');
INSERT INTO handtohand.users (user_seq, user_nickname, user_wallet_address) VALUES (9, 'unnamed', '0xF025328130061e4413Da5FaB3c4e2879f218e5EC');
INSERT INTO handtohand.users (user_seq, user_nickname, user_wallet_address) VALUES (10, 'unnamed', '0x942CE69b749AEe7972e077A67208C0079d1Ee056');
INSERT INTO handtohand.users (user_seq, user_nickname, user_wallet_address) VALUES (11, 'unnamed', '0xF99cbCe1E63c67506E95f3006695CC064816972b');
INSERT INTO handtohand.users (user_seq, user_nickname, user_wallet_address) VALUES (12, 'unnamed', '0xC3052a8E10de6AE797FBFA9ad2BA4E32E5Fe285e');
INSERT INTO handtohand.users (user_seq, user_nickname, user_wallet_address) VALUES (13, 'unnamed', '0x4135f8fD42c98cAb53883863b6b80A7AA806e0E9');


INSERT INTO handtohand.donations (donation_seq, donation_amount, fk_user_seq, donation_created_at, donation_status_type, donation_transaction_hash) VALUES (1, 100, 1, '2022-04-08 01:14:06', '생성완료', '0x841dbc5330520d5957c288a62ab5f8091dc238f270e6147f72a3e53a1b2f9fe9');
INSERT INTO handtohand.donations (donation_seq, donation_amount, fk_user_seq, donation_created_at, donation_status_type, donation_transaction_hash) VALUES (2, 100, 2, '2022-04-08 01:20:15', '생성완료', '0x775271d37348504dfc34d924a185e7e715d5fb62cdefc2d0d9a99c7dc5ecb59b');
INSERT INTO handtohand.donations (donation_seq, donation_amount, fk_user_seq, donation_created_at, donation_status_type, donation_transaction_hash) VALUES (3, 100, 1, '2022-04-08 01:20:54', '생성완료', '0xb5e19034302e5d868c98f30d40f6978738427f45d82c85354525f1cf79c9e64c');
INSERT INTO handtohand.donations (donation_seq, donation_amount, fk_user_seq, donation_created_at, donation_status_type, donation_transaction_hash) VALUES (4, 100, 2, '2022-04-08 01:21:26', '생성완료', '0x63cd013cb99a229374a5a69615e7e32dcf095c0ef6294e485a8c259d9ff928b1');
INSERT INTO handtohand.donations (donation_seq, donation_amount, fk_user_seq, donation_created_at, donation_status_type, donation_transaction_hash) VALUES (5, 100, 2, '2022-04-08 01:21:51', '생성완료', '0x08076bf3d2282671e9ffdf0e92ab4cc17bffa06e0c336dff81993a47d7d02fc3');
INSERT INTO handtohand.donations (donation_seq, donation_amount, fk_user_seq, donation_created_at, donation_status_type, donation_transaction_hash) VALUES (6, 300, 2, '2022-04-08 01:22:19', '생성완료', '0x518a33f8329a5165a3383de58b510a99730afa4c46c6709635417ed55b07c14f');
INSERT INTO handtohand.donations (donation_seq, donation_amount, fk_user_seq, donation_created_at, donation_status_type, donation_transaction_hash) VALUES (7, 100, 2, '2022-04-08 01:23:31', '생성완료', '0x0f27d62420b6327694038684b00743c6e9679b23202b618a943190cb11df673c');
INSERT INTO handtohand.donations (donation_seq, donation_amount, fk_user_seq, donation_created_at, donation_status_type, donation_transaction_hash) VALUES (8, 300, 2, '2022-04-08 01:23:55', '생성완료', '0x3fda6b31eb235b3e61f20fef65a2cc40887bce9ba96597b17a9716445f646e41');
INSERT INTO handtohand.donations (donation_seq, donation_amount, fk_user_seq, donation_created_at, donation_status_type, donation_transaction_hash) VALUES (9, 9000, 2, '2022-04-08 01:24:22', '생성완료', '0x63411bd2f23267e686e3f9f9eb82fbdbb0aeee735e3593642d4a61b14c84c4d3');
INSERT INTO handtohand.donations (donation_seq, donation_amount, fk_user_seq, donation_created_at, donation_status_type, donation_transaction_hash) VALUES (10, 10000, 2, '2022-04-08 01:24:47', '생성완료', '0x60b4fc65bd1ae52b91ad51e3ebe84304af7b55cf1a08c22b2c6eb561acd1ddb9');
INSERT INTO handtohand.donations (donation_seq, donation_amount, fk_user_seq, donation_created_at, donation_status_type, donation_transaction_hash) VALUES (11, 25000, 2, '2022-04-08 01:25:15', '생성완료', '0xe6d7ac12511079dd6473a55774a91d35eec2281c3c07550df192341cdfd94ca7');
INSERT INTO handtohand.donations (donation_seq, donation_amount, fk_user_seq, donation_created_at, donation_status_type, donation_transaction_hash) VALUES (12, 100, 3, '2022-04-08 10:34:58', '생성완료', '0x2723d1bed849587311fa01e1e5624ca69b11cc1ae12d6a228f6da08881623c8b');
INSERT INTO handtohand.donations (donation_seq, donation_amount, fk_user_seq, donation_created_at, donation_status_type, donation_transaction_hash) VALUES (13, 100, 3, '2022-04-08 10:41:23', '생성완료', '0xf17f0e18cf133a9db5802417a1a786b6c1da801f509e31cbc790302c47c75484');
INSERT INTO handtohand.donations (donation_seq, donation_amount, fk_user_seq, donation_created_at, donation_status_type, donation_transaction_hash) VALUES (14, 100, 3, '2022-04-08 10:42:14', '생성완료', '0xea119bae69a6f6b516a57fe85a17a5ffb8c8cb3e8ecab8c3e33ce22b3288e291');
INSERT INTO handtohand.donations (donation_seq, donation_amount, fk_user_seq, donation_created_at, donation_status_type, donation_transaction_hash) VALUES (15, 18000, 3, '2022-04-08 10:42:42', '생성완료', '0xff7970f54a7403d09df832201052659b826a682dce65699e031c07ddb20a3b13');
INSERT INTO handtohand.donations (donation_seq, donation_amount, fk_user_seq, donation_created_at, donation_status_type, donation_transaction_hash) VALUES (16, 1700, 3, '2022-04-08 10:44:34', '생성완료', '0xe087da2a91dcf1364dedc32e6b5b067507700eed3e89eb178e95feecdf6b2495');
INSERT INTO handtohand.donations (donation_seq, donation_amount, fk_user_seq, donation_created_at, donation_status_type, donation_transaction_hash) VALUES (17, 6000, 3, '2022-04-08 10:46:50', '생성완료', '0x40a974c797d241b4c4731f55ff1013ecee2192b839d095efff30eae927a6d5fd');
INSERT INTO handtohand.donations (donation_seq, donation_amount, fk_user_seq, donation_created_at, donation_status_type, donation_transaction_hash) VALUES (18, 2000, 3, '2022-04-08 10:57:23', '생성완료', '0x5a017449b05d2ffe9229a03fb2b7f685e1dbb446222c1c2b3ecfed4855e05149');
INSERT INTO handtohand.donations (donation_seq, donation_amount, fk_user_seq, donation_created_at, donation_status_type, donation_transaction_hash) VALUES (19, 100, 1, '2022-04-08 01:59:11', '생성완료', '0x456918cdb22dfc24865c8f6db2f7278484320debee46b7eaf8812a8824decae2');
INSERT INTO handtohand.donations (donation_seq, donation_amount, fk_user_seq, donation_created_at, donation_status_type, donation_transaction_hash) VALUES (20, 5000, 2, '2022-04-08 02:22:23', '생성완료', '0x67bb9d828b99cd6bd5b00755d4a7cf1963729f238632b87cad58c69303ca7fa5');
INSERT INTO handtohand.donations (donation_seq, donation_amount, fk_user_seq, donation_created_at, donation_status_type, donation_transaction_hash) VALUES (21, 1000, null, '2022-04-08 02:22:39', '송금완료', '0x895c8833ef014151178299e692f25bdec721f64ae1ec06b6885d914f42488cfe');
INSERT INTO handtohand.donations (donation_seq, donation_amount, fk_user_seq, donation_created_at, donation_status_type, donation_transaction_hash) VALUES (22, 500, 2, '2022-04-08 02:41:07', '생성완료', '0xd9b1bed097939f85f10047d41b5a6f4e521a12f300ce190d22d7d1569ffe83b2');
INSERT INTO handtohand.donations (donation_seq, donation_amount, fk_user_seq, donation_created_at, donation_status_type, donation_transaction_hash) VALUES (23, 100, 1, '2022-04-08 13:54:42', '생성완료', '0xe85a555fd17de9e7263877a235f1428ce87f56daee61fbfdb3b62a90448a125e');
INSERT INTO handtohand.donations (donation_seq, donation_amount, fk_user_seq, donation_created_at, donation_status_type, donation_transaction_hash) VALUES (24, 100, 5, '2022-04-08 04:57:23', '생성완료', '0xf6bfe5208b8a22ab469005cd173d2282fba00dc2237fbff61b5a89c236aedff9');
INSERT INTO handtohand.donations (donation_seq, donation_amount, fk_user_seq, donation_created_at, donation_status_type, donation_transaction_hash) VALUES (25, 100, null, '2022-04-08 05:09:38', '생성완료', '0xf67f1ab1e6c98b5d477009fc09ace544b649fc200aabd056c2fcc8fbcb57482c');
INSERT INTO handtohand.donations (donation_seq, donation_amount, fk_user_seq, donation_created_at, donation_status_type, donation_transaction_hash) VALUES (26, 100, null, '2022-04-08 05:48:38', '생성완료', '0x2825a9f68502fcf901a311fb49f20a8e77d6c1ad100a49b7a62c297fbb2eca11');
INSERT INTO handtohand.donations (donation_seq, donation_amount, fk_user_seq, donation_created_at, donation_status_type, donation_transaction_hash) VALUES (27, 100, null, '2022-04-08 05:51:18', '생성완료', '0xd1202fa6191dc1bde79fb76a6551e9b7bfee1bcc5a06719f691e86a2048e38fd');
INSERT INTO handtohand.donations (donation_seq, donation_amount, fk_user_seq, donation_created_at, donation_status_type, donation_transaction_hash) VALUES (28, 100, 2, '2022-04-08 06:06:23', '생성완료', '0xf8a6a8dfb694d31e80c47111a7878fd24c9c1f9c55edd6b94422b035f7f04ab9');
INSERT INTO handtohand.donations (donation_seq, donation_amount, fk_user_seq, donation_created_at, donation_status_type, donation_transaction_hash) VALUES (29, 100, 6, '2022-04-08 06:08:03', '생성완료', '0xf347cdc6cc9d2109d35e45fe5be38e191534e5c5acf38b35988e91290ff2e8b5');
INSERT INTO handtohand.donations (donation_seq, donation_amount, fk_user_seq, donation_created_at, donation_status_type, donation_transaction_hash) VALUES (30, 1, 6, '2022-04-08 06:38:55', '생성완료', '0x615a91aa3b4fa5fbfbcefebb3d1c94b97356285b4229c651a56bd689d7b6de98');
INSERT INTO handtohand.donations (donation_seq, donation_amount, fk_user_seq, donation_created_at, donation_status_type, donation_transaction_hash) VALUES (31, 100, 13, '2022-04-08 07:05:23', '송금완료', '0xd7abf5f31cd7531ecc45962b8595154ae033926e916688a67d661b39753fc74c');


INSERT INTO handtohand.items (item_seq, item_image_url, item_token_id, item_title, item_owner_address, item_on_sale_yn, item_price, item_like_count, fk_donation_seq) VALUES (1, 'https://handtohand.s3.ap-northeast-2.amazonaws.com/1.png', '1', 'HandToHand#1', '0xA7BDeFC1e1d4CbBD2588c5b0E64a4c10f8947AEB', 0, 0, 0, 1);
INSERT INTO handtohand.items (item_seq, item_image_url, item_token_id, item_title, item_owner_address, item_on_sale_yn, item_price, item_like_count, fk_donation_seq) VALUES (2, 'https://handtohand.s3.ap-northeast-2.amazonaws.com/2.png', '2', 'HandToHand#2', '0xf41523A930f3dbC1CcF23b7F30bc814c35597FAe', 0, 0, 0, 2);
INSERT INTO handtohand.items (item_seq, item_image_url, item_token_id, item_title, item_owner_address, item_on_sale_yn, item_price, item_like_count, fk_donation_seq) VALUES (3, 'https://handtohand.s3.ap-northeast-2.amazonaws.com/4.png', '4', 'HandToHand#3', '0xf41523A930f3dbC1CcF23b7F30bc814c35597FAe', 0, 0, 0, 4);
INSERT INTO handtohand.items (item_seq, item_image_url, item_token_id, item_title, item_owner_address, item_on_sale_yn, item_price, item_like_count, fk_donation_seq) VALUES (4, 'https://handtohand.s3.ap-northeast-2.amazonaws.com/3.png', '3', 'HandToHand#4', '0xA7BDeFC1e1d4CbBD2588c5b0E64a4c10f8947AEB', 0, 0, 0, 3);
INSERT INTO handtohand.items (item_seq, item_image_url, item_token_id, item_title, item_owner_address, item_on_sale_yn, item_price, item_like_count, fk_donation_seq) VALUES (5, 'https://handtohand.s3.ap-northeast-2.amazonaws.com/5.png', '5', 'HandToHand#5', '0xf41523A930f3dbC1CcF23b7F30bc814c35597FAe', 0, 0, 0, 5);
INSERT INTO handtohand.items (item_seq, item_image_url, item_token_id, item_title, item_owner_address, item_on_sale_yn, item_price, item_like_count, fk_donation_seq) VALUES (6, 'https://handtohand.s3.ap-northeast-2.amazonaws.com/6.png', '6', 'HandToHand#6', '0xf41523A930f3dbC1CcF23b7F30bc814c35597FAe', 0, 0, 0, 6);
INSERT INTO handtohand.items (item_seq, item_image_url, item_token_id, item_title, item_owner_address, item_on_sale_yn, item_price, item_like_count, fk_donation_seq) VALUES (7, 'https://handtohand.s3.ap-northeast-2.amazonaws.com/7.png', '7', 'HandToHand#7', '0xf41523A930f3dbC1CcF23b7F30bc814c35597FAe', 0, 0, 0, 7);
INSERT INTO handtohand.items (item_seq, item_image_url, item_token_id, item_title, item_owner_address, item_on_sale_yn, item_price, item_like_count, fk_donation_seq) VALUES (8, 'https://handtohand.s3.ap-northeast-2.amazonaws.com/8.png', '8', 'HandToHand#8', '0xA7BDeFC1e1d4CbBD2588c5b0E64a4c10f8947AEB', 0, 0, 0, 8);
INSERT INTO handtohand.items (item_seq, item_image_url, item_token_id, item_title, item_owner_address, item_on_sale_yn, item_price, item_like_count, fk_donation_seq) VALUES (9, 'https://handtohand.s3.ap-northeast-2.amazonaws.com/9.png', '9', 'HandToHand#9', '0xf41523A930f3dbC1CcF23b7F30bc814c35597FAe', 0, 0, 0, 9);
INSERT INTO handtohand.items (item_seq, item_image_url, item_token_id, item_title, item_owner_address, item_on_sale_yn, item_price, item_like_count, fk_donation_seq) VALUES (10, 'https://handtohand.s3.ap-northeast-2.amazonaws.com/10.png', '10', 'HandToHand#10', '0xf41523A930f3dbC1CcF23b7F30bc814c35597FAe', 0, 0, 0, 10);
INSERT INTO handtohand.items (item_seq, item_image_url, item_token_id, item_title, item_owner_address, item_on_sale_yn, item_price, item_like_count, fk_donation_seq) VALUES (11, 'https://handtohand.s3.ap-northeast-2.amazonaws.com/11.png', '11', 'HandToHand#11', '0xf41523A930f3dbC1CcF23b7F30bc814c35597FAe', 1, 0, 0, 11);
INSERT INTO handtohand.items (item_seq, item_image_url, item_token_id, item_title, item_owner_address, item_on_sale_yn, item_price, item_like_count, fk_donation_seq) VALUES (12, 'https://handtohand.s3.ap-northeast-2.amazonaws.com/12.png', '12', 'HandToHand#12', '0xc7734A83850af15140AAa6dbe506172eA1f8a275', 1, 0, 0, 12);
INSERT INTO handtohand.items (item_seq, item_image_url, item_token_id, item_title, item_owner_address, item_on_sale_yn, item_price, item_like_count, fk_donation_seq) VALUES (13, 'https://handtohand.s3.ap-northeast-2.amazonaws.com/13.png', '13', 'HandToHand#13', '0xA7BDeFC1e1d4CbBD2588c5b0E64a4c10f8947AEB', 0, 0, 0, 13);
INSERT INTO handtohand.items (item_seq, item_image_url, item_token_id, item_title, item_owner_address, item_on_sale_yn, item_price, item_like_count, fk_donation_seq) VALUES (14, 'https://handtohand.s3.ap-northeast-2.amazonaws.com/14.png', '14', 'HandToHand#14', '0xc7734A83850af15140AAa6dbe506172eA1f8a275', 0, 0, 0, 14);
INSERT INTO handtohand.items (item_seq, item_image_url, item_token_id, item_title, item_owner_address, item_on_sale_yn, item_price, item_like_count, fk_donation_seq) VALUES (15, 'https://handtohand.s3.ap-northeast-2.amazonaws.com/15.png', '15', 'HandToHand#15', '0xeA9d68de5Fca055C2F384040Af3e1E27093a9E88', 0, 0, 0, 15);
INSERT INTO handtohand.items (item_seq, item_image_url, item_token_id, item_title, item_owner_address, item_on_sale_yn, item_price, item_like_count, fk_donation_seq) VALUES (16, 'https://handtohand.s3.ap-northeast-2.amazonaws.com/16.png', '16', 'HandToHand#16', '0xc7734A83850af15140AAa6dbe506172eA1f8a275', 1, 0, 0, 16);
INSERT INTO handtohand.items (item_seq, item_image_url, item_token_id, item_title, item_owner_address, item_on_sale_yn, item_price, item_like_count, fk_donation_seq) VALUES (17, 'https://handtohand.s3.ap-northeast-2.amazonaws.com/17.png', '17', 'HandToHand#17', '0xc7734A83850af15140AAa6dbe506172eA1f8a275', 0, 0, 0, 17);
INSERT INTO handtohand.items (item_seq, item_image_url, item_token_id, item_title, item_owner_address, item_on_sale_yn, item_price, item_like_count, fk_donation_seq) VALUES (18, 'https://handtohand.s3.ap-northeast-2.amazonaws.com/18.png', '18', 'HandToHand#18', '0xc7734A83850af15140AAa6dbe506172eA1f8a275', 0, 0, 0, 18);
INSERT INTO handtohand.items (item_seq, item_image_url, item_token_id, item_title, item_owner_address, item_on_sale_yn, item_price, item_like_count, fk_donation_seq) VALUES (19, 'https://handtohand.s3.ap-northeast-2.amazonaws.com/19.png', '19', 'HandToHand#19', '0xA7BDeFC1e1d4CbBD2588c5b0E64a4c10f8947AEB', 0, 0, 0, 19);
INSERT INTO handtohand.items (item_seq, item_image_url, item_token_id, item_title, item_owner_address, item_on_sale_yn, item_price, item_like_count, fk_donation_seq) VALUES (20, 'https://handtohand.s3.ap-northeast-2.amazonaws.com/20.png', '20', 'HandToHand#20', '0xf41523A930f3dbC1CcF23b7F30bc814c35597FAe', 0, 0, 0, 20);
INSERT INTO handtohand.items (item_seq, item_image_url, item_token_id, item_title, item_owner_address, item_on_sale_yn, item_price, item_like_count, fk_donation_seq) VALUES (21, 'https://handtohand.s3.ap-northeast-2.amazonaws.com/22.png', '22', 'HandToHand#21', '0xf41523A930f3dbC1CcF23b7F30bc814c35597FAe', 0, 0, 0, 22);
INSERT INTO handtohand.items (item_seq, item_image_url, item_token_id, item_title, item_owner_address, item_on_sale_yn, item_price, item_like_count, fk_donation_seq) VALUES (22, 'https://handtohand.s3.ap-northeast-2.amazonaws.com/23.png', '23', 'HandToHand#22', '0xA7BDeFC1e1d4CbBD2588c5b0E64a4c10f8947AEB', 1, 0, 0, 23);
INSERT INTO handtohand.items (item_seq, item_image_url, item_token_id, item_title, item_owner_address, item_on_sale_yn, item_price, item_like_count, fk_donation_seq) VALUES (23, 'https://handtohand.s3.ap-northeast-2.amazonaws.com/24.png', '24', 'HandToHand#23', '0xeA9d68de5Fca055C2F384040Af3e1E27093a9E88', 1, 0, 0, 24);
INSERT INTO handtohand.items (item_seq, item_image_url, item_token_id, item_title, item_owner_address, item_on_sale_yn, item_price, item_like_count, fk_donation_seq) VALUES (24, 'https://handtohand.s3.ap-northeast-2.amazonaws.com/25.png', '25', 'HandToHand#24', '0x4135f8fD42c98cAb53883863b6b80A7AA806e0E9', 0, 0, 0, 25);
INSERT INTO handtohand.items (item_seq, item_image_url, item_token_id, item_title, item_owner_address, item_on_sale_yn, item_price, item_like_count, fk_donation_seq) VALUES (25, 'https://handtohand.s3.ap-northeast-2.amazonaws.com/26.png', '26', 'HandToHand#25', '0x4135f8fD42c98cAb53883863b6b80A7AA806e0E9', 0, 0, 0, 26);
INSERT INTO handtohand.items (item_seq, item_image_url, item_token_id, item_title, item_owner_address, item_on_sale_yn, item_price, item_like_count, fk_donation_seq) VALUES (26, 'https://handtohand.s3.ap-northeast-2.amazonaws.com/28.png', '28', 'HandToHand#26', '0xf41523A930f3dbC1CcF23b7F30bc814c35597FAe', 0, 0, 0, 28);
INSERT INTO handtohand.items (item_seq, item_image_url, item_token_id, item_title, item_owner_address, item_on_sale_yn, item_price, item_like_count, fk_donation_seq) VALUES (27, 'https://handtohand.s3.ap-northeast-2.amazonaws.com/29.png', '29', 'HandToHand#27', '0x2b60B659C4a9D123414cedB593Df2ddEAE56722E', 0, 0, 0, 29);
INSERT INTO handtohand.items (item_seq, item_image_url, item_token_id, item_title, item_owner_address, item_on_sale_yn, item_price, item_like_count, fk_donation_seq) VALUES (28, 'https://handtohand.s3.ap-northeast-2.amazonaws.com/27.png', '27', 'HandToHand#28', '0x4135f8fD42c98cAb53883863b6b80A7AA806e0E9', 0, 0, 0, 27);
INSERT INTO handtohand.items (item_seq, item_image_url, item_token_id, item_title, item_owner_address, item_on_sale_yn, item_price, item_like_count, fk_donation_seq) VALUES (29, 'https://handtohand.s3.ap-northeast-2.amazonaws.com/30.png', '30', 'HandToHand#29', '0x2b60B659C4a9D123414cedB593Df2ddEAE56722E', 0, 0, 0, 30);


INSERT INTO handtohand.sales (sale_seq, sale_contract_address, sale_yn, sale_cash_contract_address, sale_seller_address, sale_buyer_address, sale_created_at, sale_completed_at, fk_item_seq, sale_start_time, sale_end_time) VALUES (1, '0x1326b6D5891ccBd0ad3C2241A6eC65FBF9261773', 0, '0x6C0272539Fd8b09EA23B8D94bbBfd96a17F6e736', '0xf41523A930f3dbC1CcF23b7F30bc814c35597FAe', 'notYet', '2022-04-08 01:25:50', '2022-04-08 01:26:42', 5, 1649381138, 1649602800);
INSERT INTO handtohand.sales (sale_seq, sale_contract_address, sale_yn, sale_cash_contract_address, sale_seller_address, sale_buyer_address, sale_created_at, sale_completed_at, fk_item_seq, sale_start_time, sale_end_time) VALUES (2, '0x2116fFAB21256A79bAB4d8295459B8E177728b9B', 0, '0x6C0272539Fd8b09EA23B8D94bbBfd96a17F6e736', '0xf41523A930f3dbC1CcF23b7F30bc814c35597FAe', null, '2022-04-08 01:28:02', '2022-04-08 02:44:51', 6, 1649381269, 1650294000);
INSERT INTO handtohand.sales (sale_seq, sale_contract_address, sale_yn, sale_cash_contract_address, sale_seller_address, sale_buyer_address, sale_created_at, sale_completed_at, fk_item_seq, sale_start_time, sale_end_time) VALUES (3, '0x083d05c38ab1A92d8e58B309351aF0e508D529Bc', 0, '0x6C0272539Fd8b09EA23B8D94bbBfd96a17F6e736', '0xc7734A83850af15140AAa6dbe506172eA1f8a275', 'notYet', '2022-04-08 10:35:27', '2022-04-08 10:37:47', 12, 1649381716, 1651158000);
INSERT INTO handtohand.sales (sale_seq, sale_contract_address, sale_yn, sale_cash_contract_address, sale_seller_address, sale_buyer_address, sale_created_at, sale_completed_at, fk_item_seq, sale_start_time, sale_end_time) VALUES (4, '0x47249D69735B49E04B3c4F8D0A6682ac63D8E4C2', 1, '0x6C0272539Fd8b09EA23B8D94bbBfd96a17F6e736', '0xc7734A83850af15140AAa6dbe506172eA1f8a275', 'notYet', '2022-04-08 10:37:35', '2022-04-08 10:37:35', 12, 1649381842, 1650985200);
INSERT INTO handtohand.sales (sale_seq, sale_contract_address, sale_yn, sale_cash_contract_address, sale_seller_address, sale_buyer_address, sale_created_at, sale_completed_at, fk_item_seq, sale_start_time, sale_end_time) VALUES (5, '0xEF6C9AeB8E25aA350cB925129B287D4E9b6c72f0', 1, '0x6C0272539Fd8b09EA23B8D94bbBfd96a17F6e736', '0xc7734A83850af15140AAa6dbe506172eA1f8a275', 'notYet', '2022-04-08 10:40:42', '2022-04-08 10:40:42', 12, 1649382032, 1651244400);
INSERT INTO handtohand.sales (sale_seq, sale_contract_address, sale_yn, sale_cash_contract_address, sale_seller_address, sale_buyer_address, sale_created_at, sale_completed_at, fk_item_seq, sale_start_time, sale_end_time) VALUES (6, '0x169C14d8c0a8C65b1FAafEdFa085afC9e07F040A', 0, '0x6C0272539Fd8b09EA23B8D94bbBfd96a17F6e736', '0xc7734A83850af15140AAa6dbe506172eA1f8a275', null, '2022-04-08 10:41:58', '2022-04-08 13:57:47', 13, 1649382108, 1650639600);
INSERT INTO handtohand.sales (sale_seq, sale_contract_address, sale_yn, sale_cash_contract_address, sale_seller_address, sale_buyer_address, sale_created_at, sale_completed_at, fk_item_seq, sale_start_time, sale_end_time) VALUES (7, '0xa937A693d5190A6323BCB7C97720A9dFd6a41263', 0, '0x6C0272539Fd8b09EA23B8D94bbBfd96a17F6e736', '0xc7734A83850af15140AAa6dbe506172eA1f8a275', null, '2022-04-08 10:44:14', '2022-04-08 04:59:55', 15, 1649382242, 1651244400);
INSERT INTO handtohand.sales (sale_seq, sale_contract_address, sale_yn, sale_cash_contract_address, sale_seller_address, sale_buyer_address, sale_created_at, sale_completed_at, fk_item_seq, sale_start_time, sale_end_time) VALUES (8, '0xcd197bC0e553E644946533fE4AafFF32A0a3e6D9', 1, '0x6C0272539Fd8b09EA23B8D94bbBfd96a17F6e736', '0xc7734A83850af15140AAa6dbe506172eA1f8a275', 'notYet', '2022-04-08 10:45:14', '2022-04-08 10:45:14', 16, 1649382302, 1649689200);
INSERT INTO handtohand.sales (sale_seq, sale_contract_address, sale_yn, sale_cash_contract_address, sale_seller_address, sale_buyer_address, sale_created_at, sale_completed_at, fk_item_seq, sale_start_time, sale_end_time) VALUES (9, '0x415ba678D5Ee7729471dE1f48F69F61Efc5BD39A', 0, '0x6C0272539Fd8b09EA23B8D94bbBfd96a17F6e736', '0xc7734A83850af15140AAa6dbe506172eA1f8a275', 'notYet', '2022-04-08 10:58:23', '2022-04-08 11:27:30', 18, 1649383090, 1650034800);
INSERT INTO handtohand.sales (sale_seq, sale_contract_address, sale_yn, sale_cash_contract_address, sale_seller_address, sale_buyer_address, sale_created_at, sale_completed_at, fk_item_seq, sale_start_time, sale_end_time) VALUES (10, '0xE4549971DC6444215eC4E79F3921Fc3e3eDDFD2F', 0, '0x6C0272539Fd8b09EA23B8D94bbBfd96a17F6e736', '0xf41523A930f3dbC1CcF23b7F30bc814c35597FAe', 'notYet', '2022-04-08 02:22:54', '2022-04-08 02:23:51', 20, 1649384562, 1650034800);
INSERT INTO handtohand.sales (sale_seq, sale_contract_address, sale_yn, sale_cash_contract_address, sale_seller_address, sale_buyer_address, sale_created_at, sale_completed_at, fk_item_seq, sale_start_time, sale_end_time) VALUES (11, '0xdb475d798DA0756055288411B31Ffbeea2be3F0e', 0, '0x6C0272539Fd8b09EA23B8D94bbBfd96a17F6e736', '0xf41523A930f3dbC1CcF23b7F30bc814c35597FAe', null, '2022-04-08 02:24:35', '2022-04-08 13:45:39', 8, 1649384665, 1650639600);
INSERT INTO handtohand.sales (sale_seq, sale_contract_address, sale_yn, sale_cash_contract_address, sale_seller_address, sale_buyer_address, sale_created_at, sale_completed_at, fk_item_seq, sale_start_time, sale_end_time) VALUES (12, '0xf9cf641183833063C85e8B927a5D3FBb2b7156a4', 1, '0x6C0272539Fd8b09EA23B8D94bbBfd96a17F6e736', '0xf41523A930f3dbC1CcF23b7F30bc814c35597FAe', 'notYet', '2022-04-08 02:41:42', '2022-04-08 02:41:42', 11, 1649385690, 1649516400);
INSERT INTO handtohand.sales (sale_seq, sale_contract_address, sale_yn, sale_cash_contract_address, sale_seller_address, sale_buyer_address, sale_created_at, sale_completed_at, fk_item_seq, sale_start_time, sale_end_time) VALUES (13, '0x67FFAbf710E69c2091eb2eCc3bc8A6bA0A4b3f72', 1, '0x6C0272539Fd8b09EA23B8D94bbBfd96a17F6e736', '0xA7BDeFC1e1d4CbBD2588c5b0E64a4c10f8947AEB', 'notYet', '2022-04-08 13:56:14', '2022-04-08 13:56:14', 22, 1649393763, 1649948400);
INSERT INTO handtohand.sales (sale_seq, sale_contract_address, sale_yn, sale_cash_contract_address, sale_seller_address, sale_buyer_address, sale_created_at, sale_completed_at, fk_item_seq, sale_start_time, sale_end_time) VALUES (14, '0xedeCF0D3E101660142FBB0eD41cbD666f8335AA8', 1, '0x6C0272539Fd8b09EA23B8D94bbBfd96a17F6e736', '0xeA9d68de5Fca055C2F384040Af3e1E27093a9E88', 'notYet', '2022-04-08 04:58:35', '2022-04-08 04:58:35', 23, 1649393905, 1649948400);

