# Use Maven with Java 21
FROM maven:3.9.4-eclipse-temurin-21 AS build

WORKDIR /app

COPY crm/pom.xml crm/
COPY crm/src crm/src/

RUN mvn -f crm/pom.xml clean package -DskipTests

# Runtime image for Java 21
FROM eclipse-temurin:21-jre
WORKDIR /app

COPY --from=build /CRM_Backend/crm/target/crm-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
