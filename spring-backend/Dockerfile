#자바 11버전 환경 구성
FROM openjdk:11-jdk

EXPOSE 8081

#빌드 시점에 JAR_FILE 변수에 build/libs/*.jar 표현식을 선언
ARG JAR_FILE=build/libs/handtohand-0.0.1-SNAPSHOT.jar
#위에 선언한 JAR_FILE을 app.jar로 복사
# docker 내의 app.jar로 복사
COPY ${JAR_FILE} app.jar
#jar파일 실행 명령어
ENTRYPOINT ["java","-jar","/app.jar"]