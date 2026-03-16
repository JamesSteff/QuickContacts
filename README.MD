# 📇 QuickContacts

## 📝 Project Overview
**QuickContacts** is a simple app for storing and managing personal contact information. It provides a straightforward platform for users to keep track of their contacts, categorize them into groups, and access them easily through a secure web interface.

## 🛠 Tech Stack
* **Frontend:** React.js (Create React App)
* **Backend:** Spring Boot 3.5.1 (Java 21)
* **Database:** Supabase (PostgreSQL)
* **Security:** Spring Security with OAuth2 Support
* **ORM:** Spring Data JPA / Hibernate

## ✨ Key Features
* **Simple Contact Storage:** Easily save names, emails, and phone numbers.
* **Group Management:** Organize personal contacts into custom categories or groups.
* **Cloud Persistence:** Powered by Supabase for reliable, 24/7 accessible storage.
* **Favorites System:** Mark important contacts for quick access.
* **Search Functionality:** Quickly find specific contacts in your list.
* **Secure Login:** Protected by Spring Security authentication.

---

## 🚀 Setup & Installation

### 1. Database Configuration (Supabase)
1. Log in to your Supabase dashboard and create a new project.
2. Retrieve your connection string from the Project Settings.
3. Update `src/main/resources/application.properties` with your credentials:

spring.datasource.url=jdbc:postgresql://db.[YOUR_PROJECT_ID].supabase.co:5432/postgres
spring.datasource.username=postgres
spring.datasource.password=[YOUR_DATABASE_PASSWORD]
spring.jpa.hibernate.ddl-auto=update

### 2. Backend Setup (Spring Boot)
1. Navigate to the `backend` folder.
2. Build and run the application:
   - mvnw.cmd clean install
   - mvnw.cmd spring-boot:run

### 3. Frontend Setup (React)
1. Navigate to the `frontend` folder.
2. Create a `.env` file in the root directory:
   - REACT_APP_SUPABASE_URL=https://[YOUR_PROJECT_ID].supabase.co
   - REACT_APP_SUPABASE_ANON_KEY=[YOUR_ANON_KEY]
3. Install dependencies and start the development server:
   - npm install
   - npm start

---

## 🛠 Troubleshooting
* **Database Errors:** Ensure your Supabase password is correct and your IP is allowed in Supabase network settings.
* **Java Version:** Verify that you are using JDK 21 as specified in the pom.xml.
* **Port Conflict:** Ensure port 8080 (Backend) and 3000 (Frontend) are available.

---