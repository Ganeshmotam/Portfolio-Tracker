# **Portfolio-Tracker**

Portfolio-Tracker is a **full-stack application** designed to help users track stocks and perform CRUD operations. The project combines a **frontend** for user interaction and a **backend** for business logic and database handling.

---

## **Features**
- Track and manage stock portfolios.
- Perform CRUD (Create, Read, Update, Delete) operations.
- Backend powered by **Spring Boot** with a MySQL database.
- Frontend powered by **React.js** (or whichever framework you're using).
- Easily configurable database connection.

---

## **Getting Started**

Follow these steps to set up and run the application:

### **Frontend Setup**
1. Navigate to the frontend folder.
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Start the frontend server:
   ```bash
   npm start
   ```

### **Backend Setup**
1. Ensure **Java** and **Maven** are installed on your system.
2. Navigate to the backend folder.
3. Start the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```

---

## **Database Configuration**

The application uses **MySQL** as its database. Update the connection details in the `application.properties` file before running the backend.

### **Database Configuration (application.properties)**:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/portfolio_db
spring.datasource.username=root
spring.datasource.password=YourPasswordHere
spring.jpa.hibernate.ddl-auto=none
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
server.port=8080
```

### **Steps to Set Up MySQL**:
1. Install MySQL on your system.
2. Create a database named `portfolio_db`:
   ```sql
   CREATE DATABASE portfolio_db;
   ```
3. Update the `spring.datasource.username` and `spring.datasource.password` fields with your MySQL credentials.

---

## **Prerequisites**

Make sure the following are installed on your system:

- **Node.js** (for frontend)
- **Java** (JDK 11 or higher for backend)
- **Maven** (build tool for backend)
- **MySQL** (database)

---

## **Application Ports**

- Frontend: `http://localhost:3000` (default React.js port)
- Backend: `http://localhost:8080`

---

## **Usage**

1. Start the backend server.
2. Start the frontend server.
3. Access the application in your browser via `http://localhost:3000`.

---

## **Contributing**

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with a detailed explanation of your changes.

---

## **License**

This project is licensed under the MIT License. See the `LICENSE` file for more details.

---

## **Contact**

If you have any questions or issues, feel free to reach out:

- **Email**: [motamganesh580@gmail.com](mailto:motamganesh580@gmail.com)

