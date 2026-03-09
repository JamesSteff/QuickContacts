# 📇 QuickContacts

## Project Overview
**QuickContacts** is a full-stack web application designed to manage and organize professional connections. It bridges local user management with cloud-based storage, allowing users to securely login via Google OAuth2 and instantly sync their Google Contacts to a modern dashboard.

## 🛠 Tech Stack
* **Frontend:** React.js
* **Backend:** Spring Boot 3.5.1 (Java 21)
* **Database:** Supabase (PostgreSQL)
* **APIs:** Google OAuth 2.0, Google People API
* **ORM:** Spring Data JPA / Hibernate

## ✨ Key Features
* **Cloud Database Integration:** Powered by Supabase for reliable, accessible storage.
* **Seamless OAuth2 Login:** One-click authentication using Google accounts.
* **Real-time Contact Sync:** Fetches validated Names & Emails from Google People API.
* **Modern Dashboard:** Clean UI displaying total contact counts and detailed listings.

---

## 🚀 Setup & Installation

### 1. Database Configuration
1.  Log in to your **Supabase** dashboard.
2.  Ensure your database project is active and get your connection credentials.

### 2. Backend Setup (Spring Boot)
1.  Navigate to the `backend` folder.
2.  Open `src/main/resources/application.properties` and update your settings:
    ```properties
    spring.datasource.url=jdbc:postgresql://db.exeydhrvqpqcgbwoawpj.supabase.co:5432/postgres
    spring.datasource.username=postgres
    spring.datasource.password=YOUR_DATABASE_PASSWORD
    spring.jpa.hibernate.ddl-auto=update
    ```
3.  **Build the project:**
    ```bash
    mvnw.cmd clean install -DskipTests
    ```
4.  **Run the application:**
    ```bash
    mvnw.cmd spring-boot:run
    ```

### 3. Frontend Setup (React)
1.  Navigate to the `frontend` folder.
2.  **Environment Variables:** Create a `.env` file in the root of your frontend folder:
    ```env
    REACT_APP_SUPABASE_URL=https://[YOUR_PROJECT_ID].supabase.co
    REACT_APP_SUPABASE_ANON_KEY=[YOUR_ANON_KEY]
    ```
3.  **Install & Start:**
    ```bash
    npm install
    npm start
    ```

---

## 🛠 Troubleshooting
* **Database Errors:** Double-check if your database password is correct in the `application.properties` file.
* **Port Conflict:** Ensure port 8080 (Backend) and 3000 (Frontend) are not being used by other applications.

---

