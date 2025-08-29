# Use Maven + JDK image to build the app
FROM maven:3.8.5-openjdk-17 AS build

# Set working directory
WORKDIR /app

# Copy pom.xml and source code
COPY crm/pom.xml crm/
COPY crm/src crm/src/

# Build the application and package into jar
RUN mvn -f crm/pom.xml clean package -DskipTests

# Use a smaller base image for runtime
FROM openjdk:21-jdk-slim
WORKDIR /app

# Copy the jar from the build stage
COPY --from=build /app/crm/target/crm-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
