# Use an official OpenJDK runtime as the base image
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the compiled JAR file to the container
COPY target/portfolio-tracker-0.0.1-SNAPSHOT.jar app.jar

# Expose the port your backend listens on (Render uses PORT as an environment variable)
EXPOSE 8080

# Use environment variable PORT for Render compatibility
ENV PORT=8080

# Command to run the application
CMD ["java", "-jar", "app.jar"]
