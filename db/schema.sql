-- Database schema for Food Order & Delivery Application
CREATE DATABASE IF NOT EXISTS food_delivery_app;
USE food_delivery_app;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS menu;
DROP TABLE IF EXISTS restaurants;
DROP TABLE IF EXISTS users;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. Users Table
CREATE TABLE users (
  user_id INT NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  phone VARCHAR(15) DEFAULT NULL,
  address TEXT DEFAULT NULL,
  role ENUM('Customer', 'Restaurant Agent', 'Delivery Agent', 'System Admin') NOT NULL DEFAULT 'Customer',
  created_date TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  last_login_date TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Restaurants Table
CREATE TABLE restaurants (
  restaurant_id INT NOT NULL AUTO_INCREMENT,
  restaurant_name VARCHAR(150) NOT NULL,
  cuisine_type VARCHAR(100) NOT NULL,
  delivery_time INT NOT NULL COMMENT 'Estimated delivery time in minutes',
  address TEXT NOT NULL,
  admin_user_id INT NOT NULL,
  rating DECIMAL(2,1) DEFAULT '4.5',
  is_active TINYINT(1) DEFAULT '1',
  image_path VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (restaurant_id),
  KEY fk_restaurant_admin (admin_user_id),
  CONSTRAINT fk_restaurant_admin FOREIGN KEY (admin_user_id) REFERENCES users (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Menu Table
CREATE TABLE menu (
  menu_id INT NOT NULL AUTO_INCREMENT,
  restaurant_id INT NOT NULL,
  item_name VARCHAR(150) NOT NULL,
  category VARCHAR(50) NOT NULL DEFAULT 'Main Course',
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  is_available TINYINT(1) DEFAULT '1',
  is_veg TINYINT(1) DEFAULT '1',
  image_path VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (menu_id),
  KEY fk_menu_restaurant (restaurant_id),
  CONSTRAINT fk_menu_restaurant FOREIGN KEY (restaurant_id) REFERENCES restaurants (restaurant_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Orders Table
CREATE TABLE orders (
  order_id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  restaurant_id INT NOT NULL,
  order_date TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  total_amount DECIMAL(10,2) NOT NULL,
  status ENUM('Pending', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled') DEFAULT 'Pending',
  payment_method ENUM('COD', 'UPI', 'Debit Card', 'Credit Card') NOT NULL DEFAULT 'COD',
  delivery_address TEXT,
  PRIMARY KEY (order_id),
  KEY fk_order_user (user_id),
  KEY fk_order_restaurant (restaurant_id),
  CONSTRAINT fk_order_restaurant FOREIGN KEY (restaurant_id) REFERENCES restaurants (restaurant_id),
  CONSTRAINT fk_order_user FOREIGN KEY (user_id) REFERENCES users (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Order Items Table
CREATE TABLE order_items (
  order_item_id INT NOT NULL AUTO_INCREMENT,
  order_id INT NOT NULL,
  menu_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT '1',
  item_total DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (order_item_id),
  KEY fk_orderitem_order (order_id),
  KEY fk_orderitem_menu (menu_id),
  CONSTRAINT fk_orderitem_menu FOREIGN KEY (menu_id) REFERENCES menu (menu_id),
  CONSTRAINT fk_orderitem_order FOREIGN KEY (order_id) REFERENCES orders (order_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
