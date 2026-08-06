# 🍔 FeastFlow - End-to-End Food Delivery & Order Application

A modern, full-stack **Food Ordering & Gourmet Meal Delivery Platform** built with **React.js (Vite)**, **Tailwind / Custom CSS**, **Java Backend Servlets / REST Endpoints**, **MySQL Database**, and live **Vercel Cloud Deployment**.

> 📘 **Master Flow Diagrams Document**: All end-to-end flow diagrams, software architecture charts, and ERD schemas are consolidated in [`FLOW_DIAGRAMS.md`](file:///Users/chinnesh/Downloads/food-delivery-app%204/FLOW_DIAGRAMS.md).

---

## 🌐 Live Production Deployment

- **Vercel Live URL**: [**`https://feastflow-food-delivery-app-k34c.vercel.app`**](https://feastflow-food-delivery-app-k34c.vercel.app)
- **GitHub Repository**: [https://github.com/Ramesh2200/feastflow-food-delivery-app](https://github.com/Ramesh2200/feastflow-food-delivery-app)

---

## 📌 Executive Summary

**FeastFlow** enables users to discover artisanal kitchens, wood-fired pizzerias, and authentic Asian woks, customize food orders with real-time cart state management, checkout securely, and track delivery status in real-time.

### Key Capabilities
- **Cuisine Browsing & Filter Engine**: Filter 15+ top-rated restaurants and 300+ dishes by cuisine (Italian, Indian, Chinese, Healthy, Desserts).
- **Interactive Shopping Cart Drawer**: Instant item quantity adjustments, add-on customizations, and subtotal calculations.
- **Multi-Step Checkout & Payment**: Integrated delivery address input and payment options (UPI, Card, Cash on Delivery).
- **Live Order Tracking**: Visual progress bar tracking order stages (`Received` $\rightarrow$ `Preparing` $\rightarrow$ `Out for Delivery` $\rightarrow$ `Delivered`).
- **Responsive Dark Aesthetic**: Glassmorphism UI styled with curated vibrant typography and neon orange accents.

---

## 🛠️ Technology Stack

| Layer | Technology / Library | Description |
| :--- | :--- | :--- |
| **Frontend SPA** | React.js 18, Vite 5, Lucide Icons | Single Page Application with fast HMR & modern state management |
| **Styling** | Vanilla CSS3 / Glassmorphism | Custom HSL color variables, dark theme system, and micro-animations |
| **Backend Framework** | Java 17 / Maven | REST API Controllers, servlets, and business logic layer |
| **Database** | MySQL | Relational data persistence layer for users, restaurants, menus, and orders |
| **Cloud Hosting** | Vercel | Production CDN deployment |

---

## 📐 Detailed Software System Architecture

![Detailed Software System Architecture](docs/images/food_full_system_detailed.png)

---

## 🔄 End-to-End Order & Delivery Workflow Process

![End-to-End Order Workflow Process](docs/images/food_order_workflow.png)

---

## 🗄️ Database Schema (ERD)

![Database Schema Diagram](docs/images/food_database_schema.png)

---

## ⚡ Running Locally

### 1. Run Frontend Application
```bash
cd "/Users/chinnesh/Downloads/food-delivery-app 4/frontend"
npm install
npm run dev
```
Open your browser at `http://localhost:5173`.

### 2. Run Backend Application
```bash
cd "/Users/chinnesh/Downloads/food-delivery-app 4/backend"
mvn clean package -DskipTests
mvn exec:java -Dexec.mainClass="com.foodapp.MainServer"
```

---

## 📄 License & Attribution
Developed for FeastFlow Gourmet Food Delivery Platform. All rights reserved.
