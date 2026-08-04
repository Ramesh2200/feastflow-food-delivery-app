# System Architecture & Diagrams

Comprehensive architectural design documentation for the **FeastFlow** Food Order & Delivery Application.

---

## 1. High-Level Architecture Overview

FeastFlow implements a decoupled **Client-Server Single Page Application (SPA)** pattern.

```mermaid
graph TD
    subgraph Client Tier - React SPA
        UI[React Components & Hooks]
        State[Cart, Auth & Theme State]
        UI --> State
    end

    subgraph API Tier - Java Servlets REST Gateway
        Base[BaseServlet CORS & Headers]
        AuthSvc[AuthServlet]
        RestSvc[RestaurantServlet]
        MenuSvc[MenuServlet]
        OrdSvc[OrderServlet]
        
        Base --> AuthSvc
        Base --> RestSvc
        Base --> MenuSvc
        Base --> OrdSvc
    end

    subgraph Data Access Layer
        UDAO[UserDAO]
        RDAO[RestaurantDAO]
        MDAO[MenuDAO]
        ODAO[OrderDAO]
        
        AuthSvc --> UDAO
        RestSvc --> RDAO
        MenuSvc --> MDAO
        OrdSvc --> ODAO
    end

    subgraph Database Tier
        DB[(MySQL: food_delivery_db)]
        UDAO --> DB
        RDAO --> DB
        MDAO --> DB
        ODAO --> DB
    end

    UI -- HTTP REST JSON (Port 8080) --> Base
```

---

## 2. MVC Design Pattern Architecture

```mermaid
graph LR
    subgraph Model Layer (Java POJOs)
        M1[User]
        M2[Restaurant]
        M3[MenuItem]
        M4[Order]
        M5[OrderItem]
    end

    subgraph View Layer (React SPA + HTML/CSS)
        V1[Explore Page]
        V2[Restaurant Detail]
        V3[Cart Drawer]
        V4[Order Tracker]
        V5[Admin Dashboard]
    end

    subgraph Controller Layer (Java Servlets)
        C1[AuthServlet]
        C2[RestaurantServlet]
        C3[MenuServlet]
        C4[OrderServlet]
    end

    V1 -- REST Requests --> C2
    V2 -- REST Requests --> C3
    V3 -- REST Requests --> C4
    V4 -- REST Requests --> C4
    
    C1 -- JSON Mapping --> M1
    C2 -- JSON Mapping --> M2
    C3 -- JSON Mapping --> M3
    C4 -- JSON Mapping --> M4
```

---

## 3. Detailed Class Diagram

```mermaid
classDiagram
    class User {
        +int userId
        +String fullName
        +String email
        +String password
        +String phone
        +String role
        +String address
        +String city
        +String state
        +String pincode
    }

    class Restaurant {
        +int restaurantId
        +int managerId
        +String restaurantName
        +String cuisine
        +String phone
        +String address
        +double rating
        +String image
        +String status
    }

    class MenuItem {
        +int menuId
        +int restaurantId
        +String itemName
        +String description
        +double price
        +String category
        +String image
        +boolean available
    }

    class Order {
        +int orderId
        +int userId
        +int restaurantId
        +String restaurantName
        +int deliveryAgentId
        +double totalAmount
        +String paymentMethod
        +String orderStatus
        +String deliveryAddress
        +String orderDate
        +List~OrderItem~ items
    }

    class OrderItem {
        +int orderItemId
        +int orderId
        +int menuId
        +String itemName
        +int quantity
        +double price
    }

    class DBConnection {
        +getConnection() Connection
    }

    class UserDAO {
        +authenticate(email, password) User
        +register(User) User
        +getUserById(userId) User
    }

    class RestaurantDAO {
        +getAllRestaurants() List~Restaurant~
        +getRestaurantById(id) Restaurant
    }

    class MenuDAO {
        +getMenuByRestaurantId(restaurantId) List~MenuItem~
        +getAllMenuItems() List~MenuItem~
    }

    class OrderDAO {
        +createOrder(Order) Order
        +getOrdersByUserId(userId) List~Order~
        +getAllOrders() List~Order~
        +updateOrderStatus(orderId, newStatus) boolean
    }

    UserDAO ..> DBConnection
    RestaurantDAO ..> DBConnection
    MenuDAO ..> DBConnection
    OrderDAO ..> DBConnection

    Order "1" *-- "many" OrderItem
    Restaurant "1" *-- "many" MenuItem
```

---

## 4. End-to-End Sequence Diagrams

### 4.1 User Authentication & Email OTP Flow

```mermaid
sequenceDiagram
    autonumber
    actor Customer
    participant Modal as AuthModal (React)
    participant Auth as AuthServlet (Java)
    participant DAO as UserDAO
    participant DB as MySQL (food_delivery_db)

    Customer->>Modal: Input Registration Details (Email, Phone, Pass)
    Customer->>Modal: Click "Send Email OTP"
    Modal->>Auth: POST /api/auth/send-otp {email}
    Auth-->>Modal: 200 OK {otp: "8250"}
    Modal->>Customer: Render Step 2 OTP Verification Screen
    Customer->>Modal: Input 4-Digit OTP Code
    Customer->>Modal: Click "Verify OTP & Complete Account"
    Modal->>Auth: POST /api/auth/verify-otp {email, otp}
    Auth-->>Modal: 200 OK {success: true}
    Modal->>Auth: POST /api/auth/register {userPayload}
    Auth->>DAO: register(User)
    DAO->>DB: INSERT INTO users (...)
    DB-->>DAO: Generated user_id
    DAO-->>Auth: Registered User Object
    Auth-->>Modal: 201 Created {user}
    Modal->>Customer: Close Modal & Authenticate User Session
```

### 4.2 Checkout & Order Placement Flow

```mermaid
sequenceDiagram
    autonumber
    actor Customer
    participant Cart as CartDrawer / CheckoutModal
    participant OSvc as OrderServlet
    participant ODAO as OrderDAO
    participant DB as MySQL

    Customer->>Cart: Add Items to Cart
    Customer->>Cart: Click "Proceed to Checkout"
    Customer->>Cart: Select Payment Method & Click "Place Order"
    Cart->>OSvc: POST /api/orders {userId, restaurantId, items, paymentMethod}
    OSvc->>ODAO: createOrder(Order)
    ODAO->>DB: BEGIN TRANSACTION
    ODAO->>DB: INSERT INTO orders (...)
    DB-->>ODAO: Generated order_id
    loop For each item in cart
        ODAO->>DB: INSERT INTO order_items (order_id, menu_id, quantity, price)
    end
    ODAO->>DB: COMMIT TRANSACTION
    ODAO-->>OSvc: Created Order Object
    OSvc-->>Cart: 201 Created {order}
    Cart-->>Customer: Clear Cart & Redirect to Live Order Tracker
```

### 4.3 Order Status Update Flow (Manager / Admin)

```mermaid
sequenceDiagram
    autonumber
    actor Manager
    participant Dashboard as AdminDashboard (React)
    participant OSvc as OrderServlet
    participant ODAO as OrderDAO
    participant DB as MySQL
    actor Customer

    Manager->>Dashboard: Select Order & Change Status (e.g. OUT_FOR_DELIVERY)
    Dashboard->>OSvc: PUT /api/orders {order_id: 1, status: "OUT_FOR_DELIVERY"}
    OSvc->>ODAO: updateOrderStatus(1, "OUT_FOR_DELIVERY")
    ODAO->>DB: UPDATE orders SET order_status = 'OUT_FOR_DELIVERY' WHERE order_id = 1
    DB-->>ODAO: Rows Affected = 1
    ODAO-->>OSvc: true
    OSvc-->>Dashboard: 200 OK {success: true}
    Customer->>Dashboard: Order Tracker Auto-Refreshes Timeline Progress
```
