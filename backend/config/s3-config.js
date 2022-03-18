/**
 * AWS S3를 이용하여 파일을 업로드
 */
require('dotenv').config();
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

console.log(process.env.AWS_ACCESS_KEY_ID);

AWS.config.update({
  accessKeyId: process.env['AWS_ACCESS_KEY_ID'],
  secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY'],
  region: 'ap-northeast-2',
});

/**
 * PJT Ⅱ - Req.1-B1 S3 파일 업로드
 */
const S3 = new AWS.S3();
const upload = multer({
  storage: multerS3({
    s3: S3,
    bucket: process.env['AWS_S3_BUCKET_NAME'],
    acl: 'public-read',
    key: (req, file, callback) => {
      callback(
        null,
        `${Date.now()}${Math.floor(Math.random() * 10000)}.${file.originalname.split('.').pop()}`
      ); // 이름 설정
    },
  }),
});

async function getS3List() {
  return new Promise((resolve, reject) => {
    S3.listObjects(
      {
        Bucket: process.env['AWS_S3_BUCKET_NAME'],
      },
      (err, data) => {
        if (err) {
          console.error(err);
          return reject(err);
        }
        resolve(data.Contents);
      }
    );
  });
}

async function deleteS3Object(fileName) {
  return new Promise((resolve, reject) => {
    S3.deleteObject(
      {
        Bucket: process.env['AWS_S3_BUCKET_NAME'],
        Key: fileName,
      },
      (err, data) => {
        if (err) {
          console.error(err);
          return reject(err);
        }
        console.debug(`${fileName} deleted.`);
        resolve(data);
      }
    );
  });
}

module.exports = { upload, getS3List, deleteS3Object };
