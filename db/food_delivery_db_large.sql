-- =====================================================
-- FOOD DELIVERY DATABASE - EXPANDED (15 RESTAURANTS x 20 MENU ITEMS)
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
('Admin','admin@gmail.com','admin123','9999999999','ADMIN','MG Road','Bengaluru','Karnataka','560001'),
('Ramesh','ramesh@gmail.com','1234','9876543210','CUSTOMER','Gandhi Nagar','Mangalore','Karnataka','575001'),
('Rahul','manager@gmail.com','1234','8888888888','MANAGER','Indiranagar','Bengaluru','Karnataka','560038'),
('Ajay','delivery@gmail.com','1234','7777777777','DELIVERY_AGENT','Whitefield','Bengaluru','Karnataka','560066');

-- 15 RESTAURANTS
INSERT INTO restaurants (restaurant_id, manager_id, restaurant_name, cuisine, phone, address, rating, image, status) VALUES
(1, 3, 'Pizza Palace', 'Italian', '9876500001', 'Indiranagar, Bengaluru', 4.8, 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80', 'OPEN'),
(2, 3, 'Spice Garden', 'Indian', '9876500002', 'Koramangala, Bengaluru', 4.7, 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80', 'OPEN'),
(3, 3, 'Dragon Wok', 'Chinese', '9876500003', 'MG Road, Bengaluru', 4.6, 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80', 'OPEN'),
(4, 3, 'Burger Craft', 'Burgers', '9876500004', 'Church Street, Bengaluru', 4.9, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80', 'OPEN'),
(5, 3, 'Green Leaf Bowls', 'Healthy', '9876500005', 'HSR Layout, Bengaluru', 4.8, 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80', 'OPEN'),
(6, 3, 'Tokyo Sushi Bar', 'Japanese', '9876500006', 'Lavelle Road, Bengaluru', 4.9, 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80', 'OPEN'),
(7, 3, 'Taco Fiesta', 'Mexican', '9876500007', 'Koramangala, Bengaluru', 4.7, 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80', 'OPEN'),
(8, 3, 'Siam Thai Bistro', 'Thai', '9876500008', 'Indiranagar, Bengaluru', 4.8, 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=80', 'OPEN'),
(9, 3, 'Sweet Dreams Bakery', 'Desserts', '9876500009', 'Brigade Road, Bengaluru', 4.9, 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80', 'OPEN'),
(10, 3, 'Smokey BBQ Grill', 'BBQ', '9876500010', 'Whitefield, Bengaluru', 4.7, 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80', 'OPEN'),
(11, 3, 'Mediterranean Olive', 'Mediterranean', '9876500011', 'UB City, Bengaluru', 4.8, 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80', 'OPEN'),
(12, 3, 'Ocean Catch Seafood', 'Seafood', '9876500012', 'Ulsoor, Bengaluru', 4.6, 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80', 'OPEN'),
(13, 3, 'Bombay Street Eats', 'Street Food', '9876500013', 'Jayanagar, Bengaluru', 4.7, 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80', 'OPEN'),
(14, 3, 'Le Petit Cafe', 'Continental', '9876500014', 'Richmond Town, Bengaluru', 4.8, 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80', 'OPEN'),
(15, 3, 'The Curry House', 'Indian', '9876500015', 'Malleshwaram, Bengaluru', 4.7, 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80', 'OPEN');

-- 20 MENU ITEMS PER RESTAURANT (300 items total)

-- Restaurant 1: Pizza Palace (Italian)
INSERT INTO menu (restaurant_id, item_name, description, price, category, image, available) VALUES
(1, 'Margherita Gourmet Pizza', 'Fresh San Marzano tomatoes, buffalo mozzarella, and sweet basil leaves', 299, 'Pizza', 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80', TRUE),
(1, 'Veg Supreme Pizza', 'Loaded with bell peppers, black olives, onions, sweetcorn, and mushrooms', 399, 'Pizza', 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=600&q=80', TRUE),
(1, 'Pepperoni Feast Pizza', 'Double layer of spicy Italian pepperoni with melted mozzarella cheese', 499, 'Pizza', 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80', TRUE),
(1, 'Truffle Mushroom Fettuccine', 'Handmade fettuccine in rich black truffle cream sauce with parmesan', 349, 'Pasta', 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=600&q=80', TRUE),
(1, 'Penne Arrabbiata', 'Fiery garlic, red chili, and tomato sauce tossed with al dente penne', 279, 'Pasta', 'https://images.unsplash.com/photo-1621996346565-e3d5d6281288?auto=format&fit=crop&w=600&q=80', TRUE),
(1, 'Creamy Alfredo Pasta', 'Smooth white garlic butter cream sauce with fresh herbs and parsley', 299, 'Pasta', 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80', TRUE),
(1, 'Cheesy Garlic Breadsticks', 'Warm garlic butter sourdough topped with melted mozzarella and oregano', 149, 'Starters', 'https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?auto=format&fit=crop&w=600&q=80', TRUE),
(1, 'Bruschetta Pomodoro', 'Toasted Italian bread rubbed with garlic, topped with diced tomatoes and olive oil', 179, 'Starters', 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=600&q=80', TRUE),
(1, 'Crispy Fried Mozzarella Sticks', 'Golden crumbed mozzarella sticks served with spicy marinara dip', 199, 'Starters', 'https://images.unsplash.com/photo-1531749668029-2db88e4276c7?auto=format&fit=crop&w=600&q=80', TRUE),
(1, 'Four Cheese Quattro Formaggi', 'Blend of mozzarella, gorgonzola, parmesan, and ricotta cheeses', 459, 'Pizza', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80', TRUE),
(1, 'BBQ Chicken Pizza', 'Smokey BBQ sauce chicken breast, red onions, and fresh cilantro', 449, 'Pizza', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80', TRUE),
(1, 'Classic Caesar Salad', 'Crisp romaine lettuce, sourdough croutons, shaved parmesan, Caesar dressing', 229, 'Salads', 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=600&q=80', TRUE),
(1, 'Caprese Salad Bowl', 'Fresh mozzarella slices, vine tomatoes, basil pesto, and balsamic glaze', 249, 'Salads', 'https://images.unsplash.com/photo-1592417817098-8f3d69115b82?auto=format&fit=crop&w=600&q=80', TRUE),
(1, 'Classic Italian Tiramisu', 'Espresso-infused ladyfingers with whipped mascarpone and cocoa', 199, 'Dessert', 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80', TRUE),
(1, 'Panna Cotta Raspberry', 'Silky vanilla bean panna cotta with fresh raspberry coulis glaze', 179, 'Dessert', 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80', TRUE),
(1, 'Sparkling Italian Lemonade', 'Fresh squeezed Sicilian lemon soda with mint', 89, 'Beverage', 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80', TRUE),
(1, 'Iced Espresso Frappe', 'Cold brewed espresso blended with creamy milk and cocoa powder', 119, 'Beverage', 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80', TRUE),
(1, 'Chilled Coke Can 330ml', 'Chilled carbonated soft drink', 50, 'Beverage', 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80', TRUE),
(1, 'Minestrone Vegetable Soup', 'Classic Italian hearty garden vegetable and pasta broth', 159, 'Soups', 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80', TRUE),
(1, 'Creamy Tomato Basil Soup', 'Rich roasted tomato soup served with herb garlic croutons', 149, 'Soups', 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80', TRUE);

-- Restaurant 2: Spice Garden (Indian)
INSERT INTO menu (restaurant_id, item_name, description, price, category, image, available) VALUES
(2, 'Butter Chicken Royale', 'Rich velvety tomato butter gravy with tandoori chicken pieces', 349, 'Main Course', 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80', TRUE),
(2, 'Paneer Tikka Masala', 'Char-grilled cottage cheese cubes in aromatic spicy onion gravy', 299, 'Main Course', 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80', TRUE),
(2, 'Hyderabadi Chicken Biryani', 'Fragrant basmati rice layered with spiced chicken and saffrony herbs', 329, 'Biryani', 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80', TRUE),
(2, 'Veg Dum Biryani', 'Aromatic long grain basmati cooked with garden vegetables & fried onions', 259, 'Biryani', 'https://images.unsplash.com/photo-1642821373181-696a54913e93?auto=format&fit=crop&w=600&q=80', TRUE),
(2, 'Masala Dosa Deluxe', 'Crispy golden rice crepe stuffed with tempered potato masala & chutneys', 120, 'Breakfast', 'https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=600&q=80', TRUE),
(2, 'Dal Makhani Slow Cooked', 'Black lentils simmered overnight with butter, cream, and green cardamom', 229, 'Main Course', 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80', TRUE),
(2, 'Garlic Butter Naan', 'Freshly baked tandoori sourdough flatbread with garlic butter', 45, 'Breads', 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=600&q=80', TRUE),
(2, 'Butter Roti Tandoori', 'Whole wheat tandoor baked bread brushed with ghee', 30, 'Breads', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80', TRUE),
(2, 'Chicken Tikka Dry Starter', 'Succulent boneless chicken marinated in yogurt & red chili spices', 279, 'Starters', 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80', TRUE),
(2, 'Hara Bhara Kebab 6pcs', 'Spinach, green peas, and potato patties pan fried to perfection', 199, 'Starters', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80', TRUE),
(2, 'Kadai Paneer Gravy', 'Cottage cheese wok cooked with bell peppers, coriander, and kadai spices', 289, 'Main Course', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80', TRUE),
(2, 'Mutton Rogan Josh', 'Kashmiri style tender mutton curry flavored with alkanet root & fennel', 429, 'Main Course', 'https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=600&q=80', TRUE),
(2, 'Jeera Rice Basmati', 'Aromatic steamed basmati rice tempered with cumin seeds and ghee', 149, 'Rice', 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=600&q=80', TRUE),
(2, 'Gulab Jamun 2pcs', 'Warm soft milk dumpling soaked in fragrant cardamom rose syrup', 90, 'Dessert', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80', TRUE),
(2, 'Rasmalai Saffron 2pcs', 'Soft cottage cheese patties immersed in saffron scented milk', 110, 'Dessert', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80', TRUE),
(2, 'Mango Lassi Chilled', 'Traditional thick yogurt beverage blended with sweet Alphonso mango pulp', 89, 'Beverage', 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=600&q=80', TRUE),
(2, 'Masala Sweet Lassi', 'Refreshing churned yogurt drink topped with malai and cardamom', 79, 'Beverage', 'https://images.unsplash.com/photo-1571006682890-a7d186c348ec?auto=format&fit=crop&w=600&q=80', TRUE),
(2, 'Masala Chai Pot', 'Aromatic spiced Indian milk tea infused with ginger & cardamom', 49, 'Beverage', 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80', TRUE),
(2, 'Samosa Chat Crunchy 2pcs', 'Crushed samosas topped with chickpeas curry, sweet tamarind & mint chutney', 99, 'Starters', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80', TRUE),
(2, 'Pani Puri 8pcs Shot', 'Crispy hollow puris served with spicy tangy mint water & potato filling', 79, 'Starters', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80', TRUE);

-- Restaurant 3: Dragon Wok (Chinese)
INSERT INTO menu (restaurant_id, item_name, description, price, category, image, available) VALUES
(3, 'Veg Hakka Noodles', 'Wok tossed rice noodles with shredded bell peppers, cabbage, and soy', 180, 'Noodles', 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=600&q=80', TRUE),
(3, 'Sichuan Fried Rice', 'Spicy wok fried rice with scallions, garlic, and red chili oil', 190, 'Rice', 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80', TRUE),
(3, 'Kung Pao Chicken', 'Tender wok chicken cooked with peanuts, chili pods, and scallions', 299, 'Main Course', 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80', TRUE),
(3, 'Chili Paneer Dry', 'Crispy cottage cheese cubes tossed in spicy soy chili garlic sauce', 249, 'Starters', 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80', TRUE),
(3, 'Veg Manchurian Gravy', 'Golden fried veg dumplings in rich tangy coriander Manchurian sauce', 229, 'Main Course', 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80', TRUE),
(3, 'Dim Sum Basket 6pcs', 'Steamed crystal dumplings with mushroom & vegetable filling', 199, 'Starters', 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=600&q=80', TRUE),
(3, 'Chicken Spring Rolls 4pcs', 'Crispy golden rolls packed with chicken, glass noodles, and vegetables', 189, 'Starters', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80', TRUE),
(3, 'Hot & Sour Veg Soup', 'Spicy and tangy thick Asian soup with mushrooms and tofu', 129, 'Soups', 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80', TRUE),
(3, 'Sweet Corn Chicken Soup', 'Creamy sweetcorn broth with tender shredded chicken egg drop', 139, 'Soups', 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80', TRUE),
(3, 'Crispy Chili Honey Potatoes', 'Finger potatoes tossed in sweet honey chili sesame sauce', 179, 'Starters', 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80', TRUE),
(3, 'Singapuri Rice Noodles', 'Curry spice infused vermicelli rice noodles with peppers & sprouts', 219, 'Noodles', 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=600&q=80', TRUE),
(3, 'Chicken Fried Rice', 'Classic wok fried basmati rice with shredded chicken & scrambled egg', 229, 'Rice', 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80', TRUE),
(3, 'Mapo Tofu Spicy', 'Sichuan spiced soft tofu stew with chili bean paste & scallions', 239, 'Main Course', 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80', TRUE),
(3, 'Black Pepper Beef Sizzler', 'Sliced tender beef stir-fried with black pepper sauce on sizzler plate', 359, 'Main Course', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80', TRUE),
(3, 'Crispy Fried Wonton 6pcs', 'Golden fried dumplings served with sweet chili plum dip', 169, 'Starters', 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=600&q=80', TRUE),
(3, 'Date Pancakes Ice Cream', 'Warm fried honey date pancakes topped with vanilla bean ice cream', 159, 'Dessert', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80', TRUE),
(3, 'Fried Ice Cream Flamed', 'Crispy coated ice cream ball drizzled with chocolate syrup', 179, 'Dessert', 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80', TRUE),
(3, 'Jasmine Green Tea Pot', 'Fragrant Chinese floral green tea pot', 79, 'Beverage', 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80', TRUE),
(3, 'Tsingtao Sparkling Soda', 'Chilled Asian fruit soda', 89, 'Beverage', 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80', TRUE),
(3, 'Iced Peach Boba Tea', 'Refreshing iced peach black tea with tapioca pearls', 129, 'Beverage', 'https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&w=600&q=80', TRUE);

-- Restaurant 4: Burger Craft (Burgers)
INSERT INTO menu (restaurant_id, item_name, description, price, category, image, available) VALUES
(4, 'Smokey Bacon Angus Burger', 'Prime Angus beef patty, smoked bacon, cheddar cheese, BBQ sauce', 299, 'Burgers', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80', TRUE),
(4, 'Crispy Plant-Based Burger', 'Beyond meat patty, avocado cream, lettuce, vegan cheese on brioche', 279, 'Burgers', 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=600&q=80', TRUE),
(4, 'Triple Cheese Smash Burger', 'Three smashed beef patties, American cheese, caramelized onions, sauce', 349, 'Burgers', 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80', TRUE),
(4, 'Spicy Buffalo Chicken Burger', 'Crispy fried chicken breast drenched in spicy buffalo sauce with slaw', 259, 'Burgers', 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=600&q=80', TRUE),
(4, 'Truffle Parmesan Loaded Fries', 'Hand-cut golden fries tossed in truffle oil and grated parmesan', 149, 'Sides', 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80', TRUE),
(4, 'Crispy Onion Rings Basket', 'Beer-battered thick cut onion rings with chipotle dip', 129, 'Sides', 'https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=600&q=80', TRUE),
(4, 'Cheesy Jalapeno Poppers 6pcs', 'Crispy breaded jalapeno peppers stuffed with cream cheese', 169, 'Sides', 'https://images.unsplash.com/photo-1531749668029-2db88e4276c7?auto=format&fit=crop&w=600&q=80', TRUE),
(4, 'BBQ Chicken Wings 8pcs', 'Juicy fried chicken wings coated in sweet smokey BBQ glaze', 249, 'Starters', 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=600&q=80', TRUE),
(4, 'Double Mushroom Swiss Burger', 'Grilled portobello mushrooms, Swiss cheese, and truffle mayo', 289, 'Burgers', 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=600&q=80', TRUE),
(4, 'Pulled Pork Slider Trio', 'Slow smoked pulled pork sliders with apple cider coleslaw', 319, 'Burgers', 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80', TRUE),
(4, 'Chili Cheese Fries Bowl', 'Fries smothered in beef chili, melted cheddar, and jalapenos', 189, 'Sides', 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80', TRUE),
(4, 'Classic Salted Fries', 'Golden crispy salted French fries', 99, 'Sides', 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=600&q=80', TRUE),
(4, 'Thick Belgian Chocolate Milkshake', 'Creamy chocolate ice cream blended with dark cocoa and whipped cream', 159, 'Shakes', 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80', TRUE),
(4, 'Strawberry Cheesecake Shake', 'Real strawberries blended with cream cheese and graham cracker crumble', 169, 'Shakes', 'https://images.unsplash.com/photo-1553787499-6f9133860278?auto=format&fit=crop&w=600&q=80', TRUE),
(4, 'Oreo Cookies & Cream Milkshake', 'Vanilla ice cream crushed with Oreo cookies and chocolate drizzle', 159, 'Shakes', 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80', TRUE),
(4, 'Warm Fudgy Brownie Sundae', 'Hot chocolate brownie topped with vanilla ice cream & hot fudge', 149, 'Dessert', 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80', TRUE),
(4, 'Salted Caramel Waffle', 'Belgian waffle drenched in salted caramel sauce and pecans', 169, 'Dessert', 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=600&q=80', TRUE),
(4, 'Craft Root Beer Float', 'Sparkling root beer topped with a scoop of vanilla bean ice cream', 119, 'Beverage', 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80', TRUE),
(4, 'Iced Lemon Mint Tea', 'Brewed black tea infused with lemon juice and fresh mint', 79, 'Beverage', 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80', TRUE),
(4, 'Cold Coffee Float', 'Chilled espresso milk shake topped with vanilla scoop', 129, 'Beverage', 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80', TRUE);

-- Restaurant 5 to 15: Add menu items (20 per restaurant)
-- 5. Green Leaf Bowls (Healthy)
INSERT INTO menu (restaurant_id, item_name, description, price, category, image, available) VALUES
(5, 'Avocado Quinoa Power Bowl', 'Organic quinoa, avocado slices, edamame, sweet potato, tahini dressing', 249, 'Salads', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80', TRUE),
(5, 'Acai Berry Protein Bowl', 'Pure organic acai topped with berries, chia, coconut flakes, almond butter', 229, 'Smoothie Bowls', 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=600&q=80', TRUE),
(5, 'Mediterranean Falafel Bowl', 'Crispy baked falafels, hummus, tabbouleh salad, tzatziki & pita chips', 239, 'Bowls', 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80', TRUE),
(5, 'Grilled Tofu & Grain Salad', 'Char-grilled tofu, farro, roasted beets, arugula, lemon vinaigrette', 219, 'Salads', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80', TRUE),
(5, 'Green Goddess Detox Juice', 'Pressed spinach, green apple, cucumber, celery, and ginger juice', 119, 'Beverage', 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=600&q=80', TRUE),
(5, 'Roasted Beetroot Hummus Dip', 'Creamy beet hummus served with warm whole wheat pita triangles', 149, 'Starters', 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80', TRUE),
(5, 'Salmon Avocado Salad', 'Pan roasted salmon fillet, mixed greens, avocado, cherry tomatoes', 329, 'Salads', 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80', TRUE),
(5, 'Keto Chicken Salad Bowl', 'Grilled herb chicken breast, hard boiled eggs, avocado, blue cheese', 279, 'Bowls', 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80', TRUE),
(5, 'Wild Mushroom Rice Bowl', 'Sautéed forest mushrooms, brown rice, kale, toasted sesame oil', 239, 'Bowls', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80', TRUE),
(5, 'Berry Antioxidant Smoothie', 'Blended blueberries, raspberries, Greek yogurt, and flaxseed', 139, 'Beverage', 'https://images.unsplash.com/photo-1553787499-6f9133860278?auto=format&fit=crop&w=600&q=80', TRUE),
(5, 'Turmeric Golden Milk Latte', 'Warm almond milk steamed with turmeric, cinnamon, and raw honey', 99, 'Beverage', 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80', TRUE),
(5, 'Matcha Green Tea Latte', 'Organic ceremonial grade Japanese matcha whisked with oat milk', 129, 'Beverage', 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80', TRUE),
(5, 'Zucchini Noodle Pesto Bowl', 'Spiralized zucchini zoodles tossed in pumpkin seed basil pesto', 199, 'Bowls', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80', TRUE),
(5, 'Baked Sweet Potato Fries', 'Oven baked rosemary sweet potato wedges with vegan garlic aioli', 129, 'Sides', 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80', TRUE),
(5, 'Chia Seed Fruit Pudding', 'Coconut milk chia pudding layered with fresh mango & passionfruit', 139, 'Dessert', 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80', TRUE),
(5, 'Dark Chocolate Avocado Mousse', 'Rich velvety mousse made from ripe avocados and 70% dark cocoa', 149, 'Dessert', 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80', TRUE),
(5, 'Quinoa Energy Bites 4pcs', 'Rolled oats, dates, peanut butter, and dark chocolate chips balls', 99, 'Dessert', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80', TRUE),
(5, 'Cold Pressed Watermelon Juice', '100% pure fresh watermelon juice with lime', 89, 'Beverage', 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=600&q=80', TRUE),
(5, 'Spiced Celery Tonic', 'Fresh celery juice pressed with green apple and sea salt', 99, 'Beverage', 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=600&q=80', TRUE),
(5, 'Organic Kombucha Ginger', 'Fermented sparkling probiotic tea with ginger twist', 119, 'Beverage', 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80', TRUE);

-- 6. Tokyo Sushi Bar (Japanese)
INSERT INTO menu (restaurant_id, item_name, description, price, category, image, available) VALUES
(6, 'Salmon Nigiri 4pcs', 'Fresh Atlantic salmon slices pressed over seasoned sushi rice', 349, 'Sushi', 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80', TRUE),
(6, 'California Maki Roll 8pcs', 'Crabstick, avocado, cucumber roll rolled in toasted sesame seeds', 299, 'Sushi', 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=600&q=80', TRUE),
(6, 'Spicy Tuna Dragon Roll', 'Fresh yellowfin tuna, spicy mayo, topped with avocado slices & unagi sauce', 399, 'Sushi', 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80', TRUE),
(6, 'Vegetable Tempura Roll 8pcs', 'Crispy tempura fried asparagus, sweet potato, and avocado inside roll', 279, 'Sushi', 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=600&q=80', TRUE),
(6, 'Chicken Katsu Curry Bowl', 'Crispy panko breaded chicken cutlet over rice with savory Japanese curry', 319, 'Ramen & Bowls', 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80', TRUE),
(6, 'Tonkotsu Pork Ramen', 'Rich 12-hour pork bone broth, thin wheat noodles, chashu pork, egg', 369, 'Ramen & Bowls', 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80', TRUE),
(6, 'Spicy Miso Veg Ramen', 'Fermented soybean broth, wavy noodles, wood ear mushrooms, corn & tofu', 299, 'Ramen & Bowls', 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80', TRUE),
(6, 'Crispy Ebi Shrimp Tempura 5pcs', 'Lightly battered jumbo tiger prawns served with dashi dipping sauce', 329, 'Starters', 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80', TRUE),
(6, 'Steamed Edamame Sea Salt', 'Young soybeans steamed in pod and sprinkled with flaky sea salt', 149, 'Starters', 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80', TRUE),
(6, 'Pan Fried Pork Gyoza 6pcs', 'Japanese dumplings with juicy pork and scallion filling', 229, 'Starters', 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=600&q=80', TRUE),
(6, 'Sashimi Platter 9pcs', 'Chef selected raw cuts of salmon, tuna, and yellowtail', 549, 'Sashimi', 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80', TRUE),
(6, 'Teriyaki Chicken Skewers 4pcs', 'Grilled chicken thigh skewers glazed in sweet house teriyaki sauce', 249, 'Starters', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80', TRUE),
(6, 'Beef Yakiniku Rice Bowl', 'Thinly sliced tender beef stir-fried with sweet onion and Yakiniku glaze', 339, 'Ramen & Bowls', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80', TRUE),
(6, 'Miso Soup Traditional', 'Warm dashi broth with white miso, silken tofu, and wakame seaweed', 119, 'Soups', 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80', TRUE),
(6, 'Seaweed Wakame Salad', 'Marinated sesame green seaweed salad with cucumber ribbons', 169, 'Salads', 'https://images.unsplash.com/photo-1592417817098-8f3d69115b82?auto=format&fit=crop&w=600&q=80', TRUE),
(6, 'Matcha Green Tea Ice Cream 2 scoops', 'Authentic Japanese matcha green tea gelato', 149, 'Dessert', 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80', TRUE),
(6, 'Mochi Ice Cream 3 Trio', 'Chewy rice dough filled with mango, green tea, and strawberry ice cream', 179, 'Dessert', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80', TRUE),
(6, 'Japanese Ramune Soda Original', 'Fun glass marble pop bottle Japanese lemon soda', 99, 'Beverage', 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80', TRUE),
(6, 'Iced Yuzu Green Tea', 'Citrus yuzu juice infused chilled green tea', 89, 'Beverage', 'https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&w=600&q=80', TRUE),
(6, 'Asahi Zero Non-Alcoholic Beer', 'Crisp Japanese dry malt beverage', 129, 'Beverage', 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80', TRUE);

-- 7. Taco Fiesta (Mexican)
INSERT INTO menu (restaurant_id, item_name, description, price, category, image, available) VALUES
(7, 'Street Tacos Birria 3pcs', 'Slow cooked shredded beef tacos with melted cheese and consommé dip', 299, 'Tacos', 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80', TRUE),
(7, 'Baja Crispy Fish Tacos 3pcs', 'Beer-battered fish fillets in corn tortillas with chipotle slaw & lime', 279, 'Tacos', 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=600&q=80', TRUE),
(7, 'Grilled Chicken Burrito Supreme', 'Flour tortilla stuffed with spiced chicken, cilantro rice, beans & salsa', 259, 'Burritos', 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=600&q=80', TRUE),
(7, 'Cheesy Chicken Quesadilla', 'Large toasted tortilla packed with fajita chicken and melted cheese', 249, 'Quesadillas', 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=600&q=80', TRUE),
(7, 'Ultimate Loaded Nachos Bowl', 'Crispy corn tortilla chips topped with cheese sauce, jalapenos & pico de gallo', 219, 'Starters', 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=600&q=80', TRUE),
(7, 'Fresh Guacamole & Chips', 'Hand mashed Hass avocados with lime, cilantro, and warm tortilla chips', 179, 'Starters', 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80', TRUE),
(7, 'Veggie Bean Burrito Bowl', 'Black beans, corn salsa, guacamole, brown rice, and sour cream', 229, 'Burritos', 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=600&q=80', TRUE),
(7, 'Carne Asada Steak Tacos 3pcs', 'Marinated grilled steak slices topped with diced onion & cilantro', 319, 'Tacos', 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80', TRUE),
(7, 'Pork Carnitas Burrito', 'Slow braised pulled pork wrapped with pinto beans & green salsa', 269, 'Burritos', 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=600&q=80', TRUE),
(7, 'Mushroom & Spinach Quesadilla', 'Sautéed wild mushrooms and baby spinach with Monterey Jack cheese', 219, 'Quesadillas', 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=600&q=80', TRUE),
(7, 'Mexican Street Corn Elote', 'Charred corn on the cob brushed with mayo, cotija cheese & chili powder', 129, 'Sides', 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=600&q=80', TRUE),
(7, 'Fiesta Fajita Chicken Skillet', 'Sizzling bell peppers and onions served with warm tortillas and salsa', 299, 'Main Course', 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80', TRUE),
(7, 'Chipotle Chicken Salad Bowl', 'Adobo grilled chicken breast over chopped romaine, corn & avocado', 249, 'Salads', 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80', TRUE),
(7, 'Mexican Rice & Refried Beans', 'Seasoned tomato rice served alongside creamy refried pinto beans', 119, 'Sides', 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=600&q=80', TRUE),
(7, 'Cinnamon Sugar Churros 4pcs', 'Crispy golden churros dusted in cinnamon sugar with chocolate dip', 149, 'Dessert', 'https://images.unsplash.com/photo-1624371414361-e670ef488916?auto=format&fit=crop&w=600&q=80', TRUE),
(7, 'Tres Leches Sponge Cake', 'Moist traditional cake soaked in three sweet milks', 169, 'Dessert', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80', TRUE),
(7, 'Horchata Sweet Cinnamon Milk', 'Cold house-made rice milk spiced with cinnamon and vanilla', 89, 'Beverage', 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80', TRUE),
(7, 'Jarritos Mexican Soda Mango', 'Authentic fruit flavored glass bottle soda', 99, 'Beverage', 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80', TRUE),
(7, 'Fresh Hibiscus Agua Fresca', 'Chilled sweet iced hibiscus flower tea', 79, 'Beverage', 'https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&w=600&q=80', TRUE),
(7, 'Virgin Lime Margarita Mocktail', 'Fresh lime juice, agave nectar, and salted rim soda', 99, 'Beverage', 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80', TRUE);

-- 8 to 15 Restaurants: Siam Thai, Sweet Dreams, Smokey BBQ, Mediterranean, Ocean Catch, Bombay Street, Le Petit, Curry House
INSERT INTO menu (restaurant_id, item_name, description, price, category, image, available) VALUES
-- 8. Siam Thai Bistro
(8, 'Pad Thai Rice Noodles', 'Stir fried rice noodles with tofu, bean sprouts, peanuts & tamarind sauce', 259, 'Noodles', 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=600&q=80', TRUE),
(8, 'Thai Green Curry Chicken', 'Aromatic coconut green curry with chicken, bamboo shoots & eggplant', 299, 'Curries', 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=600&q=80', TRUE),
(8, 'Tom Yum Spicy Shrimp Soup', 'Hot & sour lemongrass soup infused with kaffir lime leaves & prawns', 199, 'Soups', 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80', TRUE),
(8, 'Mango Sticky Rice Sweet', 'Sweet coconut glutinous rice served with ripe sweet mango slices', 169, 'Dessert', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80', TRUE),
(8, 'Thai Red Duck Curry', 'Roast duck slices simmered in rich coconut red curry sauce', 349, 'Curries', 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=600&q=80', TRUE),
(8, 'Pineapple Fried Rice', 'Fragrant jasmine rice wok tossed with cashew nuts, raisins & pineapple', 239, 'Rice', 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80', TRUE),
(8, 'Thai Basil Chicken Kra Pao', 'Spicy minced chicken stir fried with Holy basil served over rice', 279, 'Main Course', 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80', TRUE),
(8, 'Crispy Thai Spring Rolls 4pcs', 'Golden fried vegetable rolls with sweet plum dipping sauce', 169, 'Starters', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80', TRUE),
(8, 'Som Tum Green Papaya Salad', 'Shredded un-ripe papaya pounded with chili, peanuts, lime & palm sugar', 189, 'Salads', 'https://images.unsplash.com/photo-1592417817098-8f3d69115b82?auto=format&fit=crop&w=600&q=80', TRUE),
(8, 'Satay Chicken Skewers 4pcs', 'Grilled marinated chicken skewers with peanut dipping sauce', 229, 'Starters', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80', TRUE),
(8, 'Panang Beef Curry Thick', 'Creamy rich Panang coconut curry with tender sliced beef', 339, 'Curries', 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=600&q=80', TRUE),
(8, 'Crispy Tilapia Tamarind Fish', 'Whole fried fish drizzled with tangy chili tamarind glaze', 399, 'Main Course', 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80', TRUE),
(8, 'Steamed Jasmine Rice Bowl', 'Fragrant Thai Hom Mali white rice', 79, 'Rice', 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=600&q=80', TRUE),
(8, 'Coconut Galangal Chicken Soup', 'Creamy Tom Kha Gai coconut soup with galangal root', 189, 'Soups', 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80', TRUE),
(8, 'Fried Banana Fritters Honey', 'Crispy sesame battered bananas drizzled with wild honey', 139, 'Dessert', 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=600&q=80', TRUE),
(8, 'Thai Iced Milk Tea', 'Brewed orange Thai tea sweetened with condensed milk', 99, 'Beverage', 'https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&w=600&q=80', TRUE),
(8, 'Thai Iced Green Tea', 'Chilled aromatic green tea milk beverage', 99, 'Beverage', 'https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&w=600&q=80', TRUE),
(8, 'Fresh Coconut Water', 'Natural hydrating tender coconut water', 79, 'Beverage', 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80', TRUE),
(8, 'Lemongrass Pandan Cooler', 'Chilled infusion of lemongrass and sweet pandan leaf', 89, 'Beverage', 'https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&w=600&q=80', TRUE),
(8, 'Chilled Chang Soda 330ml', 'Sparkling Asian soda', 69, 'Beverage', 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80', TRUE),

-- 9. Sweet Dreams Bakery (Desserts)
(9, 'Belgian Dark Chocolate Lava Cake', 'Warm chocolate cake with molten chocolate core & vanilla ice cream', 199, 'Cakes', 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80', TRUE),
(9, 'New York Baked Cheesecake Slice', 'Rich dense cheesecake with fresh raspberry coulis glaze', 189, 'Cheesecakes', 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80', TRUE),
(9, 'Red Velvet Cream Cheese Cake', 'Soft red velvet sponge layered with smooth cream cheese frosting', 179, 'Cakes', 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=600&q=80', TRUE),
(9, 'French Macarons Box 6pcs', 'Assorted almond flour macarons: pistachio, salted caramel, rose, chocolate', 299, 'Pastries', 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=600&q=80', TRUE),
(9, 'Warm Apple Cinnamon Pie Slice', 'Spiced baked apples inside flaky lattice pie crust', 159, 'Pies', 'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?auto=format&fit=crop&w=600&q=80', TRUE),
(9, 'Triple Chocolate Donut Box 4pcs', 'Glazed donuts topped with Belgian chocolate curls', 169, 'Donuts', 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80', TRUE),
(9, 'Fresh Strawberry Tartlet', 'Butter pastry shell filled with vanilla custard and fresh strawberries', 149, 'Tarts', 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=600&q=80', TRUE),
(9, 'Fudgy Walnut Brownie', 'Chewy dark chocolate brownie loaded with roasted walnuts', 119, 'Brownies', 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80', TRUE),
(9, 'Blueberry Swirl Cheesecake', 'Creamy cheesecake swirled with sweet wild blueberry preserve', 189, 'Cheesecakes', 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80', TRUE),
(9, 'Nutella Banana Waffle Supreme', 'Golden Belgian waffle smothered in warm Nutella and fresh banana slices', 199, 'Waffles', 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=600&q=80', TRUE),
(9, 'Salted Caramel Eclair 2pcs', 'Choux pastry filled with praline cream & drizzled in caramel', 149, 'Pastries', 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=600&q=80', TRUE),
(9, 'Lemon Meringue Pie Slice', 'Zesty lemon curd topped with toasted fluffy meringue peaks', 159, 'Pies', 'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?auto=format&fit=crop&w=600&q=80', TRUE),
(9, 'Butter Croissant Flaky', 'Traditional French butter croissant baked fresh daily', 89, 'Pastries', 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80', TRUE),
(9, 'Almond Chocolate Croissant', 'Butter croissant filled with dark chocolate and topped with sliced almonds', 119, 'Pastries', 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80', TRUE),
(9, 'Vanilla Bean Gelato Tub', 'Pure Madagascar vanilla bean artisanal ice cream 300ml', 179, 'Ice Cream', 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80', TRUE),
(9, 'Iced Caramel Macchiato', 'Cold espresso layered with steamed milk and vanilla caramel drizzle', 149, 'Beverage', 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80', TRUE),
(9, 'Dark Chocolate Mocha Iced', 'Espresso blended with rich cocoa milk over ice', 139, 'Beverage', 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80', TRUE),
(9, 'Hot Creamy Hot Chocolate', 'Steamed whole milk blended with melted 70% dark Belgian chocolate', 129, 'Beverage', 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=600&q=80', TRUE),
(9, 'Sparkling Berry Hibiscus Cooler', 'Sparkling iced hibiscus infusion with real berries', 99, 'Beverage', 'https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&w=600&q=80', TRUE),
(9, 'Chilled Mineral Water Glass', 'Pure spring mineral water', 40, 'Beverage', 'https://images.unsplash.com/photo-1548839140-29a749e1cf4e?auto=format&fit=crop&w=600&q=80', TRUE),

-- 10. Smokey BBQ Grill (BBQ)
(10, 'Slow Smoked Pork Ribs Full Rack', 'Tender pork ribs smoked 8 hours over hickory wood with BBQ glaze', 699, 'BBQ', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80', TRUE),
(10, 'Texas Beef Brisket Platter', 'Smoked prime beef brisket slices served with pickles & cornbread', 599, 'BBQ', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80', TRUE),
(10, 'BBQ Grilled Half Chicken', 'Char-grilled half chicken basted in honey mustard BBQ sauce', 389, 'BBQ', 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=600&q=80', TRUE),
(10, 'Smokey Pulled Pork Sandwich', 'Shredded hickory smoked pork shoulder piled high on brioche bun', 289, 'Burgers', 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80', TRUE),
(10, 'Grilled Lamb Chops 4pcs', 'Rosemary garlic marinated lamb chops grilled over open wood fire', 499, 'BBQ', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80', TRUE),
(10, 'Cheesy Loaded Mac & Cheese', 'Elbow macaroni in four cheese sauce topped with crispy bacon crumble', 179, 'Sides', 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=600&q=80', TRUE),
(10, 'Southern Cornbread Skillet', 'Warm baked sweet cornbread served with honey butter', 119, 'Sides', 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=600&q=80', TRUE),
(10, 'Classic Creamy Coleslaw Bowl', 'Shredded cabbage and carrots in tangy apple cider dressing', 89, 'Sides', 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80', TRUE),
(10, 'BBQ Baked Beans Cup', 'Slow simmered navy beans with brown sugar, bacon and molasses', 99, 'Sides', 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=600&q=80', TRUE),
(10, 'Crispy Fried Chicken Tender 5pcs', 'Golden fried buttermilk chicken strips served with ranch dip', 249, 'Starters', 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=600&q=80', TRUE),
(10, 'Grilled Ribeye Steak 250g', 'USDA prime ribeye steak grilled to medium rare with garlic butter', 799, 'BBQ', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80', TRUE),
(10, 'Smokey Bacon Cheeseburger', 'Angus patty topped with double bacon, cheddar and BBQ sauce', 319, 'Burgers', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80', TRUE),
(10, 'Charred Corn on the Cob', 'Wood grilled sweetcorn brushed with herb butter & sea salt', 99, 'Sides', 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=600&q=80', TRUE),
(10, 'Seasoned Potato Wedges', 'Crispy thick cut potato wedges with Cajun spice seasoning', 139, 'Sides', 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80', TRUE),
(10, 'Grilled Veggie Skewer Platter', 'Marinated bell peppers, zucchini, mushrooms, and onions grilled', 199, 'Starters', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80', TRUE),
(10, 'Pecan Pie Slice', 'Southern style roasted pecan pie with vanilla ice cream', 179, 'Dessert', 'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?auto=format&fit=crop&w=600&q=80', TRUE),
(10, 'Banana Pudding Parfait', 'Vanilla pudding layered with fresh bananas and Nilla wafers', 149, 'Dessert', 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80', TRUE),
(10, 'Sweet Iced Southern Tea', 'Classic brewed chilled sweet tea with lemon', 79, 'Beverage', 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80', TRUE),
(10, 'Lemon Lime Fizzy Soda', 'Refreshing chilled citrus soda', 50, 'Beverage', 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80', TRUE),
(10, 'Cold Craft Root Beer', 'Chilled spiced sarsaparilla draft soda', 89, 'Beverage', 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80', TRUE),

-- 11. Mediterranean Olive (11 to 15)
(11, 'Greek Gyro Chicken Wrap', 'Seasoned grilled chicken wrapped in warm pita with tzatziki & tomatoes', 249, 'Wraps', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80', TRUE),
(11, 'Authentic Hummus Dip & Pita', 'Creamy chickpea tahini dip served with extra virgin olive oil & warm pita', 179, 'Starters', 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80', TRUE),
(11, 'Crispy Falafel Platter 6pcs', 'Golden chickpea patties served with tahini sauce & Mediterranean salad', 229, 'Starters', 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80', TRUE),
(11, 'Classic Greek Salad', 'Vine tomatoes, cucumbers, kalamata olives, red onion, & thick feta cheese block', 239, 'Salads', 'https://images.unsplash.com/photo-1592417817098-8f3d69115b82?auto=format&fit=crop&w=600&q=80', TRUE),
(11, 'Chicken Souvlaki Skewers 3pcs', 'Marinated lemon herb chicken skewers served with rice pilaf', 299, 'Main Course', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80', TRUE),
(11, 'Lamb Moussaka Baked Casserole', 'Layered eggplant, minced lamb, and potato casserole with béchamel', 349, 'Main Course', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80', TRUE),
(11, 'Stuffed Grape Leaves Dolmades', 'Tender vine leaves stuffed with rice, herbs, and lemon juice', 189, 'Starters', 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80', TRUE),
(11, 'Tabbouleh Fresh Parsley Salad', 'Finely chopped parsley, mint, tomatoes, bulgur wheat with lemon juice', 199, 'Salads', 'https://images.unsplash.com/photo-1592417817098-8f3d69115b82?auto=format&fit=crop&w=600&q=80', TRUE),
(11, 'Grilled Halloumi Cheese Slices', 'Charred Cypriot halloumi cheese drizzled with honey & oregano', 219, 'Starters', 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=600&q=80', TRUE),
(11, 'Seafood Paella Rice Skillet', 'Spanish saffron rice cooked with shrimp, mussels, squid & bell peppers', 449, 'Main Course', 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80', TRUE),
(11, 'Shakshuka Poached Eggs Bowl', 'Eggs poached in spicy tomato, pepper & cumin sauce with pita bread', 229, 'Main Course', 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80', TRUE),
(11, 'Baba Ganoush Eggplant Dip', 'Smokey roasted eggplant dip with tahini, garlic & olive oil', 189, 'Starters', 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80', TRUE),
(11, 'Beef Shawarma Plate', 'Thinly carved spiced beef shawarma served with garlic sauce & rice', 329, 'Main Course', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80', TRUE),
(11, 'Spanakopita Spinach Pie', 'Flaky phyllo pastry stuffed with spinach and creamy feta cheese', 199, 'Starters', 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80', TRUE),
(11, 'Pita Bread Basket 3pcs', 'Warm fluffy whole wheat pita breads', 59, 'Breads', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80', TRUE),
(11, 'Honey Pistachio Baklava 2pcs', 'Crispy phyllo layers packed with pistachios and drenched in honey syrup', 169, 'Dessert', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80', TRUE),
(11, 'Greek Honey Yogurt Bowl', 'Thick strained Greek yogurt topped with wild honey and crushed walnuts', 139, 'Dessert', 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80', TRUE),
(11, 'Fresh Mint Lemonade', 'Chilled crushed ice lemonade with fresh mint leaves', 89, 'Beverage', 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80', TRUE),
(11, 'Pomegranate Iced Tea', 'Brewed black tea mixed with fresh pomegranate juice', 99, 'Beverage', 'https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&w=600&q=80', TRUE),
(11, 'Turkish Black Coffee Pot', 'Unfiltered rich dark Turkish coffee brewed in copper pot', 79, 'Beverage', 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80', TRUE),

-- 12. Ocean Catch Seafood
(12, 'Butter Garlic Grilled Prawns 8pcs', 'Jumbo prawns grilled with garlic butter and lemon herbs', 449, 'Starters', 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80', TRUE),
(12, 'Crispy Golden Calamari Rings', 'Crumbed fried squid rings served with tartar sauce dip', 299, 'Starters', 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80', TRUE),
(12, 'Grilled Salmon Steak 200g', 'Pan seared Atlantic salmon fillet with lemon dill butter sauce', 499, 'Main Course', 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80', TRUE),
(12, 'Beer Battered Fish & Chips', 'Crispy white fish fillets served with golden fries & malt vinegar', 329, 'Main Course', 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=600&q=80', TRUE),
(12, 'Creamy Clam Chowder Soup', 'New England style creamy potato and clam broth served in sourdough bowl', 229, 'Soups', 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80', TRUE),
(12, 'Lobster Roll Deluxe', 'Chilled sweet lobster meat in herb mayo served on toasted brioche bun', 599, 'Main Course', 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80', TRUE),
(12, 'Crab Cakes With Remoulade 2pcs', 'Pan-seared jumbo lump crab meat cakes served with spicy remoulade', 379, 'Starters', 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80', TRUE),
(12, 'Seafood Fettuccine Alfredo', 'Shrimp, scallops, and squid in garlic parmesan cream sauce', 389, 'Pasta', 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=600&q=80', TRUE),
(12, 'Fish Curry Goan Style', 'Catch of the day cooked in coconut spice curry with kokum', 349, 'Main Course', 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80', TRUE),
(12, 'Spicy Prawn Biryani', 'Fragrant basmati rice cooked with spiced jumbo prawns', 379, 'Rice', 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80', TRUE),
(12, 'Grilled Octopus Skewer 2pcs', 'Charcoal grilled octopus tentacles brushed with olive oil and oregano', 429, 'Starters', 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80', TRUE),
(12, 'Steamed Blue Mussels Pot', 'Fresh blue mussels steamed in garlic white wine sauce', 399, 'Starters', 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80', TRUE),
(12, 'Shrimp Taco Duo', 'Grilled prawns in warm tortillas with avocado salsa & lime', 289, 'Starters', 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=600&q=80', TRUE),
(12, 'Fishermans Basket Combo', 'Crispy prawns, fish fillets, calamari & scallops with fries', 499, 'Main Course', 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80', TRUE),
(12, 'Garlic Butter Herb Rice', 'Steamed rice cooked with butter, garlic, and fresh parsley', 129, 'Rice', 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=600&q=80', TRUE),
(12, 'Key Lime Pie Slice', 'Tart tangy lime filling inside graham cracker pie crust', 169, 'Dessert', 'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?auto=format&fit=crop&w=600&q=80', TRUE),
(12, 'Warm Apple Berry Crumble', 'Baked apples and blackberries topped with toasted oat crumble', 159, 'Dessert', 'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?auto=format&fit=crop&w=600&q=80', TRUE),
(12, 'Fresh Lemon Mint Cooler', 'Chilled sparkling lemon juice with fresh mint', 79, 'Beverage', 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80', TRUE),
(12, 'Iced Cranberry Spritzer', 'Cold cranberry juice with sparkling soda & lime slice', 89, 'Beverage', 'https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&w=600&q=80', TRUE),
(12, 'Chilled Soft Drink Can 330ml', 'Chilled carbonated beverage', 50, 'Beverage', 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80', TRUE),

-- 13. Bombay Street Eats
(13, 'Pav Bhaji Butter Loaded', 'Spiced mashed vegetable curry served with two hot butter toasted pavs', 149, 'Street Food', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80', TRUE),
(13, 'Vada Pav Bombay Special 2pcs', 'Spiced fried potato dumpling inside soft bread bun with spicy garlic chutney', 89, 'Street Food', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80', TRUE),
(13, 'Crispy Samosa Chat Bowl', 'Crushed samosas topped with spicy chickpea curry, chutneys & sev', 119, 'Street Food', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80', TRUE),
(13, 'Pani Puri Tangy 10pcs', 'Hollow crisp puris filled with spiced potatoes and spicy mint tamarind water', 79, 'Street Food', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80', TRUE),
(13, 'Bhel Puri Crunchy Bowl', 'Puffed rice, crisp sev, onions, tomatoes tossed in sweet & tangy chutneys', 89, 'Street Food', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80', TRUE),
(13, 'Sev Puri 6pcs', 'Flat crisp puris topped with potato, sweet yogurt, chutneys and fine sev', 99, 'Street Food', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80', TRUE),
(13, 'Bombay Veg Cheese Grill Sandwich', 'Triple layer toasted sandwich stuffed with potato, cheese, veggies & chutney', 139, 'Sandwiches', 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80', TRUE),
(13, 'Chole Bhature 2 Large Bhatures', 'Spicy Punjabi chickpea curry served with puffy deep-fried bread', 179, 'Main Course', 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80', TRUE),
(13, 'Dahi Puri Sweet Yogurt 6pcs', 'Puris filled with potato, chilled sweetened yogurt, tamarind and coriander', 109, 'Street Food', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80', TRUE),
(13, 'Kathi Roll Paneer Tikka', 'Flaky paratha roll stuffed with spiced paneer tikka, onions & green chutney', 159, 'Wraps', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80', TRUE),
(13, 'Chicken Egg Kathi Roll', 'Street style paratha roll packed with egg layer and spiced chicken tikka', 179, 'Wraps', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80', TRUE),
(13, 'Ragda Pattice 2pcs', 'Pan-fried potato patties topped with warm white pea curry and chutneys', 119, 'Street Food', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80', TRUE),
(13, 'Aloo Tikki Chat', 'Crispy spiced potato cutlets smothered in spiced yogurt and tamarind', 109, 'Street Food', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80', TRUE),
(13, 'Misal Pav Spicy Pune Style', 'Spicy sprouted moth bean curry topped with farsan & soft pavs', 139, 'Street Food', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80', TRUE),
(13, 'Kanda Bhajji Onion Fritters 6pcs', 'Crispy deep-fried onion fritters served with green chili', 89, 'Street Food', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80', TRUE),
(13, 'Crispy Jalebi Rabri 4pcs', 'Hot spiral jalebis dipped in saffron syrup served with thick rabri', 129, 'Dessert', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80', TRUE),
(13, 'Kulfi Falooda Royal', 'Traditional pistachio kulfi served over falooda noodles & rose syrup', 139, 'Dessert', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80', TRUE),
(13, 'Cutting Cutting Chai Cup', 'Strong spiced Bombay cutting tea brewed with lemongrass and cardamom', 30, 'Beverage', 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80', TRUE),
(13, 'Thick Rose Badam Milk', 'Chilled milk flavoured with rose syrup and ground almonds', 79, 'Beverage', 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=600&q=80', TRUE),
(13, 'Masala Soda Nimbu Fizzy', 'Spiced tangy lemon black salt soda', 50, 'Beverage', 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80', TRUE),

-- 14. Le Petit Cafe
(14, 'French Onion Soup Bowl', 'Rich caramelized onion beef broth topped with toasted baguette & gruyere', 199, 'Soups', 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80', TRUE),
(14, 'Croque Monsieur Toast', 'Toasted sourdough ham sandwich covered in broiled béchamel & cheese', 249, 'Sandwiches', 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80', TRUE),
(14, 'Steak Frites 200g', 'Seared ribeye steak served with herb garlic butter and crispy fries', 499, 'Main Course', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80', TRUE),
(14, 'Quiche Lorraine Bacon & Cheese', 'Flaky pastry pie filled with savory custard, bacon lardons, and gruyere', 219, 'Pastries', 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80', TRUE),
(14, 'Coq Au Vin Red Wine Stew', 'Tender braised chicken legs in red wine sauce with pearl onions & bacon', 389, 'Main Course', 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80', TRUE),
(14, 'Beef Bourguignon Braised', 'Slow cooked beef chunks simmered in Burgundy wine with carrots & herbs', 449, 'Main Course', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80', TRUE),
(14, 'Escargots à la Bourguignonne 6pcs', 'Burgundy snails baked in garlic parsley herb butter', 399, 'Starters', 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=600&q=80', TRUE),
(14, 'Warm Goat Cheese Salad', 'Warm baked goat cheese crostini over mixed baby greens & walnuts', 239, 'Salads', 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=600&q=80', TRUE),
(14, 'Ratatouille Herb Stew', 'Provencal stewed vegetables cooked with tomatoes, garlic, & olive oil', 229, 'Main Course', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80', TRUE),
(14, 'Crispy Duck Confit Leg', 'Slow cooked duck leg with crispy skin served with roasted potatoes', 499, 'Main Course', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80', TRUE),
(14, 'Pan Seared Sea Bass Fillet', 'Sea bass fillet over sautéed spinach and lemon beurre blanc sauce', 459, 'Main Course', 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80', TRUE),
(14, 'Avocado Smoked Salmon Toast', 'Artisanal sourdough topped with smashed avocado & cold smoked salmon', 279, 'Sandwiches', 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80', TRUE),
(14, 'Truflled French Fries Bowl', 'Skin-on fries tossed in white truffle oil & parsley', 149, 'Sides', 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80', TRUE),
(14, 'Warm Sourdough Baguette & Butter', 'Freshly baked French sourdough bread with Normandy butter', 99, 'Breads', 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80', TRUE),
(14, 'Classic Crème Brûlée', 'Rich vanilla custard topped with hard cracked caramelized sugar shell', 179, 'Dessert', 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80', TRUE),
(14, 'Chocolate Soufflé Warm', 'Fluffy dark chocolate soufflé served with vanilla bean cream', 199, 'Dessert', 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80', TRUE),
(14, 'French Crepe Suzette', 'Thin crepes flambéed with orange butter sauce & Grand Marnier', 189, 'Dessert', 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=600&q=80', TRUE),
(14, 'Double Shot Espresso', 'Concentrated dark roast French coffee shot', 79, 'Beverage', 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80', TRUE),
(14, 'Flat White Velvet Coffee', 'Steamed microfoam milk poured over double ristretto espresso', 129, 'Beverage', 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80', TRUE),
(14, 'Perrier Sparkling Water 330ml', 'Natural French sparkling mineral water', 119, 'Beverage', 'https://images.unsplash.com/photo-1548839140-29a749e1cf4e?auto=format&fit=crop&w=600&q=80', TRUE),

-- 15. The Curry House
(15, 'Authentic Korma Chicken', 'Tender chicken braised in creamy almond and cashew spice gravy', 329, 'Main Course', 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80', TRUE),
(15, 'Paneer Butter Masala Creamy', 'Cottage cheese cooked in rich sweet tomato butter gravy', 289, 'Main Course', 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80', TRUE),
(15, 'Slow Cooked Dal Tadka', 'Yellow lentils tempered with ghee, cumin seeds, garlic & dried red chilies', 199, 'Main Course', 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80', TRUE),
(15, 'Special Mutton Dum Biryani', 'Marinated mutton cooked on dum with long basmati rice & saffron', 389, 'Biryani', 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80', TRUE),
(15, 'Tandoori Chicken Full', 'Whole chicken marinated in yogurt, Kashmiri red chili & spices cooked in tandoor', 449, 'Starters', 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80', TRUE),
(15, 'Malai Paneer Tikka 6pcs', 'Soft cottage cheese marinated in cream, green cardamom & cashew paste', 279, 'Starters', 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80', TRUE),
(15, 'Amritsari Kulcha Stuffed', 'Tandoor baked bread stuffed with spiced potato and paneer served with chole', 169, 'Breads', 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=600&q=80', TRUE),
(15, 'Cheese Garlic Naan', 'Tandoori sourdough naan stuffed with processed cheese & garlic butter', 69, 'Breads', 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=600&q=80', TRUE),
(15, 'Fish Tikka Mustard 6pcs', 'Surmai fish cubes marinated in yellow mustard & lemon spices cooked in charcoal', 349, 'Starters', 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80', TRUE),
(15, 'Palak Paneer Gravy', 'Fresh spinach puree cooked with cottage cheese cubes & garlic tempering', 269, 'Main Course', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80', TRUE),
(15, 'Bhuna Gosht Lamb', 'Tender lamb slow cooked in rich onion tomato thick bhuna gravy', 419, 'Main Course', 'https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=600&q=80', TRUE),
(15, 'Egg Curry Spiced 2 Eggs', 'Hard boiled eggs simmered in spicy South Indian onion tomato gravy', 189, 'Main Course', 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80', TRUE),
(15, 'Basmati Peas Pulao', 'Fluffy basmati rice cooked with sweet green peas & whole spices', 159, 'Rice', 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=600&q=80', TRUE),
(15, 'Boondi Raita Chilled', 'Crispy gram flour boondi in tempered seasoned yogurt', 79, 'Sides', 'https://images.unsplash.com/photo-1571006682890-a7d186c348ec?auto=format&fit=crop&w=600&q=80', TRUE),
(15, 'Cucumber Mint Onion Salad', 'Sliced fresh cucumbers, red onions, tomatoes with lemon dressing', 69, 'Sides', 'https://images.unsplash.com/photo-1592417817098-8f3d69115b82?auto=format&fit=crop&w=600&q=80', TRUE),
(15, 'Shahi Tukda Royal', 'Fried bread slice soaked in saffron syrup topped with thick rabri & nuts', 129, 'Dessert', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80', TRUE),
(15, 'Moong Dal Halwa Desi Ghee', 'Rich traditional lentils halwa slow cooked in pure desi ghee', 139, 'Dessert', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80', TRUE),
(15, 'Kesar Pista Kulfi Stick', 'Authentic frozen saffrony pistachio milk ice cream on stick', 89, 'Dessert', 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80', TRUE),
(15, 'Thick Mango Mastani Shake', 'Rich mango shake topped with ice cream, nuts and cherries', 129, 'Beverage', 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=600&q=80', TRUE),
(15, 'Spiced Masala Buttermilk Chass', 'Cold churned yogurt spiced with roasted cumin, green chili & coriander', 59, 'Beverage', 'https://images.unsplash.com/photo-1571006682890-a7d186c348ec?auto=format&fit=crop&w=600&q=80', TRUE);

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
