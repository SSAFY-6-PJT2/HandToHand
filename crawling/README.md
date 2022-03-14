# NFT 이미지를 위한 우크라이나 풍경 Crawling 

### google-images-download 라이브러리 사용

### 1. 환경설정

```bash
git clone https://github.com/Joeclinton1/google-images-download.git
cd google-images-download
sudo python setup.py install 
(or python setup.py install)
```

### 2. 실행파일 작성

- 실행 파일 google.py 은 google-images-download 밑에 위치 

- chromedriver.exe 폴더 밑에 위치

  https://chromedriver.chromium.org/home

- google.py 실행

  

### 3. downloads 폴더에 저장

```
📦google-images-download
 ┣ 📂downloads // 코드 실행시 폴더 안에 사진 저장
 ┃ ┣ 📂우크라이나 풍경
 ┣ 📂google_images_download
 ┣ 📜crawl.py // 크롤링 연습 파일
 ┣ 📜google.py // 크롤링 파일
 ┣ 📜chromedriver.exe // 대용량을 위해 크롬 드라이버 설치
 ┗ 📜setup.py // install 파일 
```
