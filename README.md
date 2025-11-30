# ✈️ Timeout Airline — Booking System
### Spring Boot (Maven) Backend • EPITA Java Project 2025

## 📌 Overview
This project is a **backend booking system** for the fictional airline *Timeout Airline*.  
It is developed as part of the EPITA Java coursework and follows the official project requirements.

The backend is built using:

- **Java 17**
- **Spring Boot**
- **Maven**
- **PostgreSQL**

A modern **React + Three.js / React Three Fiber** frontend will also be developed to create an interactive 3D booking experience inspired by premium airline websites.

---

## 👥 Team Members

### **Sasha Temereva**
**Role:** Frontend & Customer-Facing Backend Logic  
Responsibilities:
- Flight search functionality
- Booking system
- Miles reward program
- API → Frontend integration
- Full 3D React Three Fiber frontend

### **Irina Kiseleva**
**Role:** Database & Core Backend Logic  
Responsibilities:
- Database schema & relations
- CRUD endpoints for:
    - User
    - Clients
    - Employee
    - Plane
    - Airport
    - Flight
- Data validation & referential integrity

---

## 🧩 Features (Backend Requirements)

### ✔ **User Management**
CRUD for User

### ✔ **Plane Management**
CRUD for Plane

### ✔ **Airport Management**
CRUD for Airport

### ✔ **Flight Management**
CRUD for Flight

### ✔ **Client & Employee Management**
Linked to User entity  
CRUD operations

---

### ⭐ **Customer-Facing Features (Sasha’s part)**

### ✈️ **Flight Search API**
Search flights by:
- Departure city
- Destination city
- Departure date

Returns only flights with available seats.

---

### 🧾 **Booking System**
Allows a customer to book a flight by providing:
- First name
- Last name
- Passport number
- Birthdate
- Flight number
- Seat type
- Departure & arrival city/time

Automatically reduces seat availability.

---

### 🎁 **Miles Reward Program**
After each booking:
- Creates a MilesReward entry
- If the client completes **3 flights in the same civil year**,  
  → Generates a **random discount code**

---

## 🛠 Tech Stack

### **Backend**
- Spring Boot
- Spring Web
- Spring Data JPA
- PostgreSQL
- Maven

### **Frontend**
- React
- React Three Fiber
- Three.js
- TailwindCSS

### **Tools**
- IntelliJ IDEA Community Edition
- Git + GitHub

---

## 📁 Project Structure

```text
BookingSystem/
├── src/
│   ├── main/
│   │   ├── java/com/timeout/bookingsystem/
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   ├── repositories/
│   │   │   ├── dto/
│   │   │   └── BookingSystemApplication.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
├── pom.xml
└── README.md
```


---

## 🚀 Running the Project

### 1️⃣ Install dependencies
``` mvn clean install ```

### 2️⃣ Run the Spring Boot application
``` mvn spring-boot:run ```

### 3️⃣ Base URL
```http://localhost:8080/api```


---

## 🗄️ Database Setup
(Will be completed once PostgreSQL schema is finalized.)

Tables include:
- User
- Client
- Employee
- Airport
- Flight
- Book (Reservation)
- MilesReward

---

## 🛫 Roadmap

### **In Progress — Sasha**
- Flight search API
- Booking endpoint
- Miles reward logic
- React + R3F 3D interface for flight selection

### **In Progress — Irina**
- Database schema creation
- Core CRUD endpoints
- Data validation & integrity checks

---

## 📚 License
Developed for academic use at **EPITA**.
