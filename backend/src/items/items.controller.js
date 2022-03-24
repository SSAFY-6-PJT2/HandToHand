/**
 * /items APIs
 */
const fs = require('fs');
const util = require('util');
const express = require('express');
const router = express.Router();
// console.log(router);
const ItemsService = require('./items.service');
const { upload, uploadFile, getFileStream } = require('../../config/s3-config');
// const { ConfigurationServicePlaceholders } = require("aws-sdk/lib/config_service_placeholders");
const itemService = new ItemsService();
/**
 * PJT Ⅱ - 과제 1: Req.1-B1 작품 등록 (파일 업로드 포함)test
 */
router.post('/', upload.single('image'), async function (req, res) {
  console.log('req' + req);
  const { statusCode, responseBody } = await itemService.createItems(req);

  if (statusCode === 201) {
    responseBody['imageUrl'] = `${process.env.AWS_CDN_PATH}/${req.file.key}`;
  }

  res.statusCode = statusCode;
  res.send(responseBody);
});

/**
 * PJT Ⅱ - 과제 1: Req.1-B2 작품 정보 업데이트
 */
router.patch('/:itemId', async function (req, res) {
  const itemId = req.params['itemId'];
  console.log(itemId);
  const data = req.body;
  console.log(data);
  const { statusCode, responseBody } = await itemService.updateItemTokenIdAndOwnerAddress(
    itemId,
    data['token_id'],
    data['owner_address']
  );

  res.statusCode = statusCode;
  res.send(responseBody);
});

/**
 * PJT Ⅱ 과제 2:
 * Req.2-B1 작품 목록 조회
 * Req.2-B2 주소가 보유한 작품 목록 조회
 *
 * PJT Ⅲ 과제 4: (판매 중인 작품만 반환하도록 수정합니다.)
 * Req.4-B1 작품 목록 조회
 * Req.4-B2 주소가 보유한 작품 목록 조회
 */
router.get('/', async function (req, res) {
  const { statusCode, responseBody } = await itemService.getItems(req.query['address']);

  res.statusCode = statusCode;
  res.send(responseBody);
});

/*
 * PJT Ⅲ 과제 3:
 * Req.4-B3 최근 등록 작품 조회
 */
router.get('/recent', async function (req, res) {
  const { statusCode, responseBody } = await itemService.getRecentItems();

  res.statusCode = statusCode;
  res.send(responseBody);
});

/**
 * PJT Ⅱ 과제 2:
 * Req.2-B3 작품 상세 조회
 */
router.get('/:tokenId', async function (req, res) {
  const { statusCode, responseBody } = await itemService.getItemByTokenId(req.params['tokenId']);

  res.statusCode = statusCode;
  res.send(responseBody);
});

module.exports = router;
