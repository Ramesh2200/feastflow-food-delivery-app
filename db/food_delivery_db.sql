-- =====================================================
-- FOOD DELIVERY DATABASE
-- =====================================================

DROP DATABASE IF EXISTS food_delivery_db;
CREATE DATABASE food_delivery_db;
USE food_delivery_db;

-- USERS
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(15),
    role ENUM('ADMIN','CUSTOMER','MANAGER','DELIVERY_AGENT') NOT NULL,
    address TEXT,
    city VARCHAR(50),
    state VARCHAR(50),
    pincode VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- RESTAURANTS
CREATE TABLE restaurants (
    restaurant_id INT AUTO_INCREMENT PRIMARY KEY,
    manager_id INT,
    restaurant_name VARCHAR(100) NOT NULL,
    cuisine VARCHAR(50),
    phone VARCHAR(15),
    address TEXT,
    rating DECIMAL(2,1) DEFAULT 4.5,
    image VARCHAR(255),
    status ENUM('OPEN','CLOSED') DEFAULT 'OPEN',

    FOREIGN KEY (manager_id) REFERENCES users(user_id)
);

-- MENU
CREATE TABLE menu (
    menu_id INT AUTO_INCREMENT PRIMARY KEY,
    restaurant_id INT,
    item_name VARCHAR(100),
    description TEXT,
    price DECIMAL(10,2),
    category VARCHAR(50),
    image VARCHAR(255),
    available BOOLEAN DEFAULT TRUE,

    FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id)
);

-- CART
CREATE TABLE cart (
    cart_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    menu_id INT,
    quantity INT DEFAULT 1,

    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (menu_id) REFERENCES menu(menu_id)
);

-- ORDERS
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    restaurant_id INT,
    delivery_agent_id INT,
    total_amount DECIMAL(10,2),
    payment_method ENUM('COD','UPI','CARD'),
    order_status ENUM(
        'PLACED',
        'CONFIRMED',
        'PREPARING',
        'OUT_FOR_DELIVERY',
        'DELIVERED',
        'CANCELLED'
    ) DEFAULT 'PLACED',
    delivery_address TEXT,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id),
    FOREIGN KEY (delivery_agent_id) REFERENCES users(user_id)
);

-- ORDER ITEMS
CREATE TABLE order_items (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    menu_id INT,
    quantity INT,
    price DECIMAL(10,2),

    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (menu_id) REFERENCES menu(menu_id)
);

-- PAYMENTS
CREATE TABLE payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    payment_method ENUM('COD','UPI','CARD'),
    payment_status ENUM('PENDING','SUCCESS','FAILED'),
    transaction_id VARCHAR(100),
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

-- REVIEWS
CREATE TABLE reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    restaurant_id INT,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comments TEXT,
    review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id)
);

-- SAMPLE USERS
INSERT INTO users
(full_name,email,password,phone,role,address,city,state,pincode)
VALUES
('Admin','admin@gmail.com','admin123','9999999999','ADMIN',
'MG Road','Bengaluru','Karnataka','560001'),

('Ramesh','ramesh@gmail.com','1234','9876543210','CUSTOMER',
'Gandhi Nagar','Mangalore','Karnataka','575001'),

('Rahul','manager@gmail.com','1234','8888888888','MANAGER',
'Indiranagar','Bengaluru','Karnataka','560038'),

('Ajay','delivery@gmail.com','1234','7777777777','DELIVERY_AGENT',
'Whitefield','Bengaluru','Karnataka','560066');

-- SAMPLE RESTAURANTS
INSERT INTO restaurants
(manager_id,restaurant_name,cuisine,phone,address,image)
VALUES
(3,'Pizza Palace','Italian','9876500001','Bengaluru','https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'),
(3,'Spice Garden','Indian','9876500002','Bengaluru','https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80'),
(3,'Dragon Wok','Chinese','9876500003','Bengaluru','https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80');

-- SAMPLE MENU
INSERT INTO menu
(restaurant_id,item_name,description,price,category,image)
VALUES
(1,'Margherita Pizza','Cheese Pizza with San Marzano tomato sauce & fresh basil',299,'Pizza','https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80'),
(1,'Veg Supreme Pizza','Loaded Veg Pizza with mushrooms, olives & bell peppers',399,'Pizza','https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=600&q=80'),
(2,'Butter Chicken','Rich tomato butter gravy with succulent chicken chunks',349,'Main Course','https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80'),
(2,'Masala Dosa','Crispy rice crepe filled with spiced potato masala',120,'Breakfast','https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=600&q=80'),
(3,'Veg Noodles','Wok-tossed Hakka noodles with crunchy vegetables',180,'Noodles','https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=600&q=80'),
(3,'Fried Rice','Classic Sichuan fried rice with scallions & soy',190,'Rice','https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80'),
(1,'Coke','Chilled carbonated soft drink 500ml',50,'Beverage','https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80'),
(2,'Gulab Jamun','Soft milk-solid dumplings soaked in rose syrup',90,'Dessert','https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80');

-- SAMPLE CART
INSERT INTO cart(user_id,menu_id,quantity) VALUES (2,1,2), (2,7,1);

-- SAMPLE ORDER
INSERT INTO orders(user_id,restaurant_id,delivery_agent_id,total_amount,payment_method,delivery_address)
VALUES (2,1,4,648,'UPI','Gandhi Nagar, Mangalore');

-- SAMPLE ORDER ITEMS
INSERT INTO order_items(order_id,menu_id,quantity,price) VALUES (1,1,2,299), (1,7,1,50);

-- SAMPLE PAYMENT
INSERT INTO payments(order_id,payment_method,payment_status,transaction_id) VALUES (1,'UPI','SUCCESS','TXN100001');

-- SAMPLE REVIEW
INSERT INTO reviews(user_id,restaurant_id,rating,comments) VALUES (2,1,5,'Excellent food and fast delivery.');
