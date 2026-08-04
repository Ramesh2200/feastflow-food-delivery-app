USE food_delivery_app;

-- Truncate tables in correct order
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE order_items;
TRUNCATE TABLE orders;
TRUNCATE TABLE menu;
TRUNCATE TABLE restaurants;
TRUNCATE TABLE users;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. Insert Users
INSERT INTO users (user_id, user_name, email, password, phone, address, role) VALUES
(1, 'System Admin', 'admin@foodie.com', 'admin123', '9876543210', '100 Tech Hub Blvd, Suite 400', 'System Admin'),
(2, 'Marco Rossi', 'marco@trattoria.com', 'pass123', '9876543211', '12 Olive Garden Lane', 'Restaurant Agent'),
(3, 'Priya Sharma', 'priya@spicemarket.com', 'pass123', '9876543212', '45 Curry Hill St', 'Restaurant Agent'),
(4, 'Chen Wei', 'chen@dragonwok.com', 'pass123', '9876543213', '88 Silk Road Ave', 'Restaurant Agent'),
(5, 'David Miller', 'david@burgercraft.com', 'pass123', '9876543214', '77 Main Street', 'Restaurant Agent'),
(6, 'Rahul Verma', 'rahul@customer.com', 'user123', '9123456789', 'Apt 402, Sunshine Heights, MG Road', 'Customer'),
(7, 'Alex Johnson', 'alex@delivery.com', 'driver123', '9988776655', 'Metro Station Hub', 'Delivery Agent');

-- 2. Insert Restaurants
INSERT INTO restaurants (restaurant_id, restaurant_name, cuisine_type, delivery_time, address, admin_user_id, rating, is_active, image_path) VALUES
(1, 'Trattoria Bella', 'Italian', 25, '12 Olive Garden Lane', 2, 4.8, 1, 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'),
(2, 'Spice Route Express', 'Indian', 30, '45 Curry Hill St', 3, 4.7, 1, 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80'),
(3, 'Dragon Wok House', 'Asian', 20, '88 Silk Road Ave', 4, 4.6, 1, 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80'),
(4, 'Burger Craft & Brewery', 'Burgers', 20, '77 Main Street', 5, 4.9, 1, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80'),
(5, 'Green Bowl Botanica', 'Healthy', 15, '102 Wellness Way', 1, 4.5, 1, 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80'),
(6, 'Sweet Dreams Bakery', 'Desserts', 25, '15 Baker Street', 1, 4.8, 1, 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80');

-- 3. Insert Menu Items
INSERT INTO menu (menu_id, restaurant_id, item_name, category, description, price, is_available, is_veg, image_path) VALUES
-- Trattoria Bella (Italian)
(1, 1, 'Truffle Mushroom Pasta', 'Pasta', 'Fresh fettuccine with wild forest mushrooms, black truffle cream, and aged parmesan', 14.99, 1, 1, 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=600&q=80'),
(2, 1, 'Margherita Gourmet Pizza', 'Pizza', 'Wood-fired sourdough with San Marzano tomatoes, buffalo mozzarella, fresh basil', 16.50, 1, 1, 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80'),
(3, 1, 'Classic Tiramisu', 'Dessert', 'Espresso-soaked ladyfingers with whipped mascarpone cream and cocoa dusting', 7.50, 1, 1, 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80'),

-- Spice Route Express (Indian)
(4, 2, 'Butter Chicken Royale', 'Main Course', 'Tender tandoori chicken simmered in rich tomato butter gravy with aromatic spices', 13.99, 1, 0, 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80'),
(5, 2, 'Paneer Tikka Masala', 'Main Course', 'Char-grilled cottage cheese cubes cooked in spicy spiced onion gravy', 12.50, 1, 1, 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80'),
(6, 2, 'Garlic Butter Naan', 'Breads', 'Freshly baked tandoori sourdough flatbread brushed with garlic butter', 3.50, 1, 1, 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=600&q=80'),

-- Dragon Wok House (Asian)
(7, 3, 'Kung Pao Chicken Bowls', 'Main Course', 'Sichuan wok-fried chicken with crunchy peanuts, chili pods, and scallions', 12.99, 1, 0, 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80'),
(8, 3, 'Dim Sum Steamed Basket', 'Appetizers', 'Assorted vegetable & mushroom crystal dumplings served with spicy soy chili oil', 9.50, 1, 1, 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=600&q=80'),
(9, 3, 'Pad Thai Noodles', 'Noodles', 'Classic rice noodles wok-tossed with tofu, bean sprouts, roasted peanuts, and tamarind sauce', 11.99, 1, 1, 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=600&q=80'),

-- Burger Craft & Brewery (Burgers)
(10, 4, 'Smokey Bacon Angus Burger', 'Burgers', 'Prime Angus beef patty, smoked bacon, cheddar, crispy onion rings, BBQ drizzle', 15.99, 1, 0, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80'),
(11, 4, 'Truffle Parmesan Loaded Fries', 'Sides', 'Hand-cut golden fries tossed in truffle oil, fresh rosemary, and grated parmesan', 6.99, 1, 1, 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80'),
(12, 4, 'Crispy Plant-Based Burger', 'Burgers', 'Beyond patty, avocado cream, vegan cheese, arugula, on toasted brioche bun', 14.50, 1, 1, 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=600&q=80'),

-- Green Bowl Botanica (Healthy)
(13, 5, 'Avocado Quinoa Power Bowl', 'Salads', 'Fresh avocado, organic quinoa, edamame, roasted sweet potatoes, lemon tahini dressing', 11.50, 1, 1, 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80'),
(14, 5, 'Acai Berry Smoothie Bowl', 'Smoothies', 'Organic acai blend topped with chia seeds, fresh berries, toasted coconut flakes, almond butter', 9.99, 1, 1, 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=600&q=80'),

-- Sweet Dreams Bakery (Desserts)
(15, 6, 'Belgian Dark Chocolate Lava Cake', 'Desserts', 'Warm molten chocolate center served with Madagascar vanilla bean ice cream', 8.99, 1, 1, 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80'),
(16, 6, 'New York Cheesecake', 'Desserts', 'Rich creamy cheesecake with fresh raspberry coulis', 7.99, 1, 1, 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80');

-- 4. Insert Sample Orders
INSERT INTO orders (order_id, user_id, restaurant_id, total_amount, status, payment_method, delivery_address) VALUES
(101, 6, 1, 38.99, 'Preparing', 'UPI', 'Apt 402, Sunshine Heights, MG Road'),
(102, 6, 2, 29.99, 'Out for Delivery', 'COD', 'Apt 402, Sunshine Heights, MG Road');

INSERT INTO order_items (order_id, menu_id, quantity, item_total) VALUES
(101, 1, 1, 14.99),
(101, 2, 1, 16.50),
(101, 3, 1, 7.50),
(102, 4, 1, 13.99),
(102, 5, 1, 12.50),
(102, 6, 1, 3.50);
