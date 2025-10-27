FROM maven:3.9.9-eclipse-temurin-21 AS build

#set working directory
WORKDIR /app

#Copy the pom.xml install dependencie
COPY pom.xml .
RUN mvn dependency:go-offline

COPY src ./src
RUN mvn clean package -DskipTests

FROM openjdk:21-jdk-slim

WORKDIR /app

COPY --from=build /app/target/frammy-0.0.1-SNAPSHOT.jar .

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/frammy-0.0.1-SNAPSHOT.jar"]