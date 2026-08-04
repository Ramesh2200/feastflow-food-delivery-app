# 🍕 FeastFlow - Food Order & Delivery Application

A full-stack food ordering and delivery application built with **React**, **Java Servlets**, and **MySQL** (`food_delivery_db`).

---

## 📁 Project Directory Structure

```
food-delivery-app/
├── db/
│   ├── food_delivery_db.sql        # Core MySQL database schema & sample data
│   └── food_delivery_db_large.sql  # Expanded database (15 Restaurants x 20 Menu items)
│
├── backend/                        # Java Servlets REST API Backend (Port 8080)
│   ├── pom.xml                     # Maven project configuration (Embedded Tomcat)
│   └── src/main/java/com/foodapp/
│       ├── MainServer.java         # Embedded Tomcat Server launcher
│       ├── config/
│       │   └── DBConnection.java   # MySQL JDBC Connection Provider (root:081506)
│       ├── model/                  # POJO Models (User, Restaurant, MenuItem, Order, OrderItem)
│       ├── dao/                    # Data Access Objects (UserDAO, RestaurantDAO, MenuDAO, OrderDAO)
│       └── servlet/                # Jakarta Servlets (AuthServlet, RestaurantServlet, MenuServlet, OrderServlet, RootServlet)
│
└── frontend/                       # React + Vite Frontend App (Port 5173)
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── main.jsx
        ├── App.jsx                 # Core Application logic & state
        ├── index.css               # Design system & Dark/Light mode CSS variables
        └── components/
            ├── Navbar.jsx          # Header, search, theme toggle, cart counter
            ├── HeroSection.jsx     # Visual promotional banner & stats
            ├── CategoryFilter.jsx  # Horizontal cuisine filter chips
            ├── RestaurantCard.jsx  # Restaurant visual card
            ├── RestaurantDetail.jsx# Restaurant menu view with quantity controls
            ├── CartDrawer.jsx      # Slide-out cart with promo discount code FEAST10
            ├── CheckoutModal.jsx   # Checkout & payment method selection (UPI, COD, Card)
            ├── OrderTracker.jsx    # Real-time order status tracking dashboard
            ├── AdminDashboard.jsx  # Manager portal for order status updates
            └── AuthModal.jsx       # Login & Register modal
```

---

## 🚀 How to Run the Application

### 1. Database Setup (MySQL)
Make sure MySQL is running on `localhost:3306` with username `root` and password `081506`.

Run the database script:
```bash
mysql -u root -p081506 < db/food_delivery_db_large.sql
```

### 2. Run Java Servlets Backend
Navigate to the `backend` folder and compile & launch the server:
```bash
cd backend
mvn clean compile
mvn exec:java
```
> The Java backend will start listening on `http://localhost:8080`.

### 3. Run React Frontend
Navigate to the `frontend` folder and start the Vite dev server:
```bash
cd frontend
npm install
npm run dev -- --port 5173
```
> Open your browser at `http://localhost:5173`.

---

## 🔑 Login Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **Customer** | `ramesh@gmail.com` | `1234` |
| **Manager** | `manager@gmail.com` | `1234` |
| **Delivery Agent** | `delivery@gmail.com` | `1234` |
| **Admin** | `admin@gmail.com` | `admin123` |
