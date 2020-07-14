FROM adoptopenjdk/openjdk13-openj9:jdk-13.0.2_8_openj9-0.18.0-alpine-slim
RUN apk --no-cache add curl
COPY server/build/libs/lidar-ui*.jar /
CMD java ${JAVA_OPTS} -jar lidar-ui*.jar
