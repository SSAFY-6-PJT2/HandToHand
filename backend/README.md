### 👁‍🗨환경설정

1. `npm i` 모듈 설치
2. `.env` 설정 파일 생성
   ```
   📦backend
   ┣ 📜.env
   ┣ 📜.gitignore
   ┣ 📜.project
   ┣ 📜app.js
   ┣ 📜gradlew
   ┣ 📜gradlew.bat
   ┣ 📜package-lock.json
   ┣ 📜package.json
   ┗ 📜README.md
   ```
3. `.env` 파일 작성 - S3, DB 정보

   ```
   AWS_S3_BUCKET_NAME=
   AWS_ACCESS_KEY_ID=
   AWS_SECRET_ACCESS_KEY=

   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=password
   DB_SCHEMA=nftdb

   PORT=5000
   ```

### 실행

`npm start`
