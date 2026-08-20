import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CategoryFilter from './components/CategoryFilter';
import RestaurantCard from './components/RestaurantCard';
import RestaurantDetail from './components/RestaurantDetail';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrderTracker from './components/OrderTracker';
import AdminDashboard from './components/AdminDashboard';
import AuthModal from './components/AuthModal';

const API_BASE = 'http://localhost:8080/api';

const DEFAULT_RESTAURANTS = [
  {
    "restaurantId": 1,
    "restaurantName": "Pizza Palace",
    "cuisine": "Italian",
    "phone": "9876500001",
    "address": "12 Olive Garden Lane, Indiranagar, Bengaluru",
    "rating": 4.8,
    "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
  },
  {
    "restaurantId": 2,
    "restaurantName": "Spice Garden",
    "cuisine": "Indian",
    "phone": "9876500002",
    "address": "45 Curry Hill St, Koramangala, Bengaluru",
    "rating": 4.7,
    "image": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80"
  },
  {
    "restaurantId": 3,
    "restaurantName": "Dragon Wok",
    "cuisine": "Chinese",
    "phone": "9876500003",
    "address": "88 Silk Road Ave, MG Road, Bengaluru",
    "rating": 4.6,
    "image": "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80"
  },
  {
    "restaurantId": 4,
    "restaurantName": "Burger Craft",
    "cuisine": "Burgers",
    "phone": "9876500004",
    "address": "77 Main Street, Church Street, Bengaluru",
    "rating": 4.9,
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80"
  },
  {
    "restaurantId": 5,
    "restaurantName": "Green Leaf Bowls",
    "cuisine": "Healthy",
    "phone": "9876500005",
    "address": "102 Wellness Way, HSR Layout, Bengaluru",
    "rating": 4.8,
    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80"
  },
  {
    "restaurantId": 6,
    "restaurantName": "Tokyo Sushi Bar",
    "cuisine": "Japanese",
    "phone": "9876500006",
    "address": "24 Sakura Street, Lavelle Road, Bengaluru",
    "rating": 4.9,
    "image": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80"
  },
  {
    "restaurantId": 7,
    "restaurantName": "Taco Fiesta",
    "cuisine": "Mexican",
    "phone": "9876500007",
    "address": "55 Sombrero Blvd, Koramangala, Bengaluru",
    "rating": 4.7,
    "image": "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80"
  },
  {
    "restaurantId": 8,
    "restaurantName": "Siam Thai Bistro",
    "cuisine": "Thai",
    "phone": "9876500008",
    "address": "19 Orchid Lane, Indiranagar, Bengaluru",
    "rating": 4.8,
    "image": "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=80"
  },
  {
    "restaurantId": 9,
    "restaurantName": "Sweet Dreams Bakery",
    "cuisine": "Desserts",
    "phone": "9876500009",
    "address": "15 Baker Street, Brigade Road, Bengaluru",
    "rating": 4.9,
    "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80"
  },
  {
    "restaurantId": 10,
    "restaurantName": "Smokey BBQ Grill",
    "cuisine": "BBQ",
    "phone": "9876500010",
    "address": "90 Charcoal Ave, Whitefield, Bengaluru",
    "rating": 4.7,
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80"
  },
  {
    "restaurantId": 11,
    "restaurantName": "Mediterranean Olive",
    "cuisine": "Mediterranean",
    "phone": "9876500011",
    "address": "101 UB Plaza, UB City, Bengaluru",
    "rating": 4.8,
    "image": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
  },
  {
    "restaurantId": 12,
    "restaurantName": "Ocean Catch Seafood",
    "cuisine": "Seafood",
    "phone": "9876500012",
    "address": "33 Harbor View Road, Ulsoor, Bengaluru",
    "rating": 4.6,
    "image": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80"
  },
  {
    "restaurantId": 13,
    "restaurantName": "Bombay Street Eats",
    "cuisine": "Street Food",
    "phone": "9876500013",
    "address": "66 Chat Bazaar, Jayanagar, Bengaluru",
    "rating": 4.7,
    "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"
  },
  {
    "restaurantId": 14,
    "restaurantName": "Le Petit Cafe",
    "cuisine": "French",
    "phone": "9876500014",
    "address": "14 Bistro Street, Richmond Town, Bengaluru",
    "rating": 4.8,
    "image": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80"
  },
  {
    "restaurantId": 15,
    "restaurantName": "The Curry House",
    "cuisine": "Indian",
    "phone": "9876500015",
    "address": "78 Temple Road, Malleshwaram, Bengaluru",
    "rating": 4.7,
    "image": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80"
  },
  {
    "restaurantId": 16,
    "restaurantName": "Seoul K-BBQ & Bistro",
    "cuisine": "Korean",
    "phone": "9876500016",
    "address": "22 Gangnam Way, Indiranagar, Bengaluru",
    "rating": 4.9,
    "image": "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=800&q=80"
  },
  {
    "restaurantId": 17,
    "restaurantName": "Saigon Pho House",
    "cuisine": "Vietnamese",
    "phone": "9876500017",
    "address": "44 Mekong Street, Koramangala, Bengaluru",
    "rating": 4.8,
    "image": "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=800&q=80"
  },
  {
    "restaurantId": 18,
    "restaurantName": "Bistro de Paris",
    "cuisine": "French",
    "phone": "9876500018",
    "address": "12 Champs Avenue, Lavelle Road, Bengaluru",
    "rating": 4.9,
    "image": "https://images.unsplash.com/photo-1502301103665-0b95cc738daf?auto=format&fit=crop&w=800&q=80"
  },
  {
    "restaurantId": 19,
    "restaurantName": "Istanbul Kebab House",
    "cuisine": "Turkish",
    "phone": "9876500019",
    "address": "89 Bosphorus Lane, Frazer Town, Bengaluru",
    "rating": 4.7,
    "image": "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=800&q=80"
  },
  {
    "restaurantId": 20,
    "restaurantName": "Santorini Greek Taverna",
    "cuisine": "Greek",
    "phone": "9876500020",
    "address": "50 Aegean Way, HSR Layout, Bengaluru",
    "rating": 4.8,
    "image": "https://images.unsplash.com/photo-1533777857889-4be7c70b31f8?auto=format&fit=crop&w=800&q=80"
  },
  {
    "restaurantId": 21,
    "restaurantName": "Tapia Tapas & Bar",
    "cuisine": "Spanish",
    "phone": "9876500021",
    "address": "67 Plaza Real, Indiranagar, Bengaluru",
    "rating": 4.7,
    "image": "https://images.unsplash.com/photo-1515443961218-a51367888e4b?auto=format&fit=crop&w=800&q=80"
  },
  {
    "restaurantId": 22,
    "restaurantName": "Gelato & Waffle Lab",
    "cuisine": "Ice Cream",
    "phone": "9876500022",
    "address": "11 Creamy Lane, Commercial Street, Bengaluru",
    "rating": 4.9,
    "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80"
  },
  {
    "restaurantId": 23,
    "restaurantName": "Juice & Smoothie Oasis",
    "cuisine": "Juices & Beverages",
    "phone": "9876500023",
    "address": "99 Citrus Grove, Whitefield, Bengaluru",
    "rating": 4.8,
    "image": "https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=800&q=80"
  },
  {
    "restaurantId": 24,
    "restaurantName": "Sunrise Brunch Diner",
    "cuisine": "Breakfast",
    "phone": "9876500024",
    "address": "15 Morning Star Rd, Indiranagar, Bengaluru",
    "rating": 4.7,
    "image": "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=80"
  },
  {
    "restaurantId": 25,
    "restaurantName": "Artisan Pasta Works",
    "cuisine": "Pasta",
    "phone": "9876500025",
    "address": "30 Tuscany Boulevard, Koramangala, Bengaluru",
    "rating": 4.8,
    "image": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80"
  },
  {
    "restaurantId": 26,
    "restaurantName": "Royal Biryani Darbar",
    "cuisine": "Biryani",
    "phone": "9876500026",
    "address": "10 Nizam Palace Rd, Shivaji Nagar, Bengaluru",
    "rating": 4.9,
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80"
  },
  {
    "restaurantId": 27,
    "restaurantName": "Dim Sum & Bao House",
    "cuisine": "Chinese",
    "phone": "9876500027",
    "address": "88 Bamboo Grove, MG Road, Bengaluru",
    "rating": 4.8,
    "image": "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=800&q=80"
  },
  {
    "restaurantId": 28,
    "restaurantName": "Vegan Garden Kitchen",
    "cuisine": "Vegan",
    "phone": "9876500028",
    "address": "72 Bio Sanctuary, Jayanagar, Bengaluru",
    "rating": 4.9,
    "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80"
  }
];

const DEFAULT_MENU_ITEMS = [
  {
    "menuId": 1,
    "restaurantId": 1,
    "itemName": "Pizza Signature Dish #1",
    "category": "Starters",
    "description": "Delicious authentic italian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 119.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 2,
    "restaurantId": 1,
    "itemName": "Pizza Signature Dish #2",
    "category": "Starters",
    "description": "Delicious authentic italian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 134.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 3,
    "restaurantId": 1,
    "itemName": "Pizza Signature Dish #3",
    "category": "Starters",
    "description": "Delicious authentic italian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 149.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 4,
    "restaurantId": 1,
    "itemName": "Pizza Signature Dish #4",
    "category": "Starters",
    "description": "Delicious authentic italian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 164.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1621996346565-e3d5d6281288?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 5,
    "restaurantId": 1,
    "itemName": "Pizza Signature Dish #5",
    "category": "Starters",
    "description": "Delicious authentic italian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 179.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 6,
    "restaurantId": 1,
    "itemName": "Pizza Signature Dish #6",
    "category": "Main Course",
    "description": "Delicious authentic italian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 194.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 7,
    "restaurantId": 1,
    "itemName": "Pizza Signature Dish #7",
    "category": "Main Course",
    "description": "Delicious authentic italian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 209.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 8,
    "restaurantId": 1,
    "itemName": "Pizza Signature Dish #8",
    "category": "Main Course",
    "description": "Delicious authentic italian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 224.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1531749668029-2db88e4276c7?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 9,
    "restaurantId": 1,
    "itemName": "Pizza Signature Dish #9",
    "category": "Main Course",
    "description": "Delicious authentic italian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 239.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 10,
    "restaurantId": 1,
    "itemName": "Pizza Signature Dish #10",
    "category": "Main Course",
    "description": "Delicious authentic italian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 254.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 11,
    "restaurantId": 1,
    "itemName": "Pizza Signature Dish #11",
    "category": "Main Course",
    "description": "Delicious authentic italian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 269.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 12,
    "restaurantId": 1,
    "itemName": "Pizza Signature Dish #12",
    "category": "Main Course",
    "description": "Delicious authentic italian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 284.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1592417817098-8f3d69115b82?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 13,
    "restaurantId": 1,
    "itemName": "Pizza Signature Dish #13",
    "category": "Specialties",
    "description": "Delicious authentic italian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 299.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 14,
    "restaurantId": 1,
    "itemName": "Pizza Signature Dish #14",
    "category": "Specialties",
    "description": "Delicious authentic italian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 314.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 15,
    "restaurantId": 1,
    "itemName": "Pizza Signature Dish #15",
    "category": "Specialties",
    "description": "Delicious authentic italian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 329.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 16,
    "restaurantId": 1,
    "itemName": "Pizza Signature Dish #16",
    "category": "Specialties",
    "description": "Delicious authentic italian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 344.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 17,
    "restaurantId": 1,
    "itemName": "Pizza Signature Dish #17",
    "category": "Specialties",
    "description": "Delicious authentic italian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 359.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 18,
    "restaurantId": 1,
    "itemName": "Pizza Signature Dish #18",
    "category": "Specialties",
    "description": "Delicious authentic italian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 374.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 19,
    "restaurantId": 1,
    "itemName": "Pizza Signature Dish #19",
    "category": "Sides & Breads",
    "description": "Delicious authentic italian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 389.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 20,
    "restaurantId": 1,
    "itemName": "Pizza Signature Dish #20",
    "category": "Sides & Breads",
    "description": "Delicious authentic italian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 404.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 21,
    "restaurantId": 1,
    "itemName": "Pizza Signature Dish #21",
    "category": "Sides & Breads",
    "description": "Delicious authentic italian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 419.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 22,
    "restaurantId": 1,
    "itemName": "Pizza Signature Dish #22",
    "category": "Sides & Breads",
    "description": "Delicious authentic italian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 434.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 23,
    "restaurantId": 1,
    "itemName": "Pizza Signature Dish #23",
    "category": "Sides & Breads",
    "description": "Delicious authentic italian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 449.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1642821373181-696a54913e93?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 24,
    "restaurantId": 1,
    "itemName": "Pizza Signature Dish #24",
    "category": "Sides & Breads",
    "description": "Delicious authentic italian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 464.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 25,
    "restaurantId": 1,
    "itemName": "Pizza Signature Dish #25",
    "category": "Dessert",
    "description": "Delicious authentic italian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 479.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 26,
    "restaurantId": 1,
    "itemName": "Pizza Signature Dish #26",
    "category": "Dessert",
    "description": "Delicious authentic italian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 494.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 27,
    "restaurantId": 1,
    "itemName": "Pizza Signature Dish #27",
    "category": "Dessert",
    "description": "Delicious authentic italian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 509.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 28,
    "restaurantId": 1,
    "itemName": "Pizza Signature Dish #28",
    "category": "Beverages",
    "description": "Delicious authentic italian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 524.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 29,
    "restaurantId": 1,
    "itemName": "Pizza Signature Dish #29",
    "category": "Beverages",
    "description": "Delicious authentic italian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 539.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 30,
    "restaurantId": 1,
    "itemName": "Pizza Signature Dish #30",
    "category": "Beverages",
    "description": "Delicious authentic italian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 554.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 31,
    "restaurantId": 2,
    "itemName": "Spice Signature Dish #1",
    "category": "Starters",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 124.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 32,
    "restaurantId": 2,
    "itemName": "Spice Signature Dish #2",
    "category": "Starters",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 139.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 33,
    "restaurantId": 2,
    "itemName": "Spice Signature Dish #3",
    "category": "Starters",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 154.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 34,
    "restaurantId": 2,
    "itemName": "Spice Signature Dish #4",
    "category": "Starters",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 169.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 35,
    "restaurantId": 2,
    "itemName": "Spice Signature Dish #5",
    "category": "Starters",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 184.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1571006682890-a7d186c348ec?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 36,
    "restaurantId": 2,
    "itemName": "Spice Signature Dish #6",
    "category": "Main Course",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 199.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 37,
    "restaurantId": 2,
    "itemName": "Spice Signature Dish #7",
    "category": "Main Course",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 214.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 38,
    "restaurantId": 2,
    "itemName": "Spice Signature Dish #8",
    "category": "Main Course",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 229.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 39,
    "restaurantId": 2,
    "itemName": "Spice Signature Dish #9",
    "category": "Main Course",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 244.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 40,
    "restaurantId": 2,
    "itemName": "Spice Signature Dish #10",
    "category": "Main Course",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 259.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 41,
    "restaurantId": 2,
    "itemName": "Spice Signature Dish #11",
    "category": "Main Course",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 274.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 42,
    "restaurantId": 2,
    "itemName": "Spice Signature Dish #12",
    "category": "Main Course",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 289.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 43,
    "restaurantId": 2,
    "itemName": "Spice Signature Dish #13",
    "category": "Specialties",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 304.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 44,
    "restaurantId": 2,
    "itemName": "Spice Signature Dish #14",
    "category": "Specialties",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 319.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 45,
    "restaurantId": 2,
    "itemName": "Spice Signature Dish #15",
    "category": "Specialties",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 334.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 46,
    "restaurantId": 2,
    "itemName": "Spice Signature Dish #16",
    "category": "Specialties",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 349.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 47,
    "restaurantId": 2,
    "itemName": "Spice Signature Dish #17",
    "category": "Specialties",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 364.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 48,
    "restaurantId": 2,
    "itemName": "Spice Signature Dish #18",
    "category": "Specialties",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 379.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 49,
    "restaurantId": 2,
    "itemName": "Spice Signature Dish #19",
    "category": "Sides & Breads",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 394.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 50,
    "restaurantId": 2,
    "itemName": "Spice Signature Dish #20",
    "category": "Sides & Breads",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 409.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 51,
    "restaurantId": 2,
    "itemName": "Spice Signature Dish #21",
    "category": "Sides & Breads",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 424.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 52,
    "restaurantId": 2,
    "itemName": "Spice Signature Dish #22",
    "category": "Sides & Breads",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 439.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 53,
    "restaurantId": 2,
    "itemName": "Spice Signature Dish #23",
    "category": "Sides & Breads",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 454.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 54,
    "restaurantId": 2,
    "itemName": "Spice Signature Dish #24",
    "category": "Sides & Breads",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 469.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 55,
    "restaurantId": 2,
    "itemName": "Spice Signature Dish #25",
    "category": "Dessert",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 484.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 56,
    "restaurantId": 2,
    "itemName": "Spice Signature Dish #26",
    "category": "Dessert",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 499.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 57,
    "restaurantId": 2,
    "itemName": "Spice Signature Dish #27",
    "category": "Dessert",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 514.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 58,
    "restaurantId": 2,
    "itemName": "Spice Signature Dish #28",
    "category": "Beverages",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 529.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 59,
    "restaurantId": 2,
    "itemName": "Spice Signature Dish #29",
    "category": "Beverages",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 544.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 60,
    "restaurantId": 2,
    "itemName": "Spice Signature Dish #30",
    "category": "Beverages",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 559.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 61,
    "restaurantId": 3,
    "itemName": "Dragon Signature Dish #1",
    "category": "Starters",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 129.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1624371414361-e670ef488916?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 62,
    "restaurantId": 3,
    "itemName": "Dragon Signature Dish #2",
    "category": "Starters",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 144.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 63,
    "restaurantId": 3,
    "itemName": "Dragon Signature Dish #3",
    "category": "Starters",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 159.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 64,
    "restaurantId": 3,
    "itemName": "Dragon Signature Dish #4",
    "category": "Starters",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 174.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 65,
    "restaurantId": 3,
    "itemName": "Dragon Signature Dish #5",
    "category": "Starters",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 189.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 66,
    "restaurantId": 3,
    "itemName": "Dragon Signature Dish #6",
    "category": "Main Course",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 204.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 67,
    "restaurantId": 3,
    "itemName": "Dragon Signature Dish #7",
    "category": "Main Course",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 219.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 68,
    "restaurantId": 3,
    "itemName": "Dragon Signature Dish #8",
    "category": "Main Course",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 234.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 69,
    "restaurantId": 3,
    "itemName": "Dragon Signature Dish #9",
    "category": "Main Course",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 249.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 70,
    "restaurantId": 3,
    "itemName": "Dragon Signature Dish #10",
    "category": "Main Course",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 264.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 71,
    "restaurantId": 3,
    "itemName": "Dragon Signature Dish #11",
    "category": "Main Course",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 279.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 72,
    "restaurantId": 3,
    "itemName": "Dragon Signature Dish #12",
    "category": "Main Course",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 294.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 73,
    "restaurantId": 3,
    "itemName": "Dragon Signature Dish #13",
    "category": "Specialties",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 309.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 74,
    "restaurantId": 3,
    "itemName": "Dragon Signature Dish #14",
    "category": "Specialties",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 324.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 75,
    "restaurantId": 3,
    "itemName": "Dragon Signature Dish #15",
    "category": "Specialties",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 339.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 76,
    "restaurantId": 3,
    "itemName": "Dragon Signature Dish #16",
    "category": "Specialties",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 354.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 77,
    "restaurantId": 3,
    "itemName": "Dragon Signature Dish #17",
    "category": "Specialties",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 369.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 78,
    "restaurantId": 3,
    "itemName": "Dragon Signature Dish #18",
    "category": "Specialties",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 384.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 79,
    "restaurantId": 3,
    "itemName": "Dragon Signature Dish #19",
    "category": "Sides & Breads",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 399.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1502301103665-0b95cc738daf?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 80,
    "restaurantId": 3,
    "itemName": "Dragon Signature Dish #20",
    "category": "Sides & Breads",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 414.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1533777857889-4be7c70b31f8?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 81,
    "restaurantId": 3,
    "itemName": "Dragon Signature Dish #21",
    "category": "Sides & Breads",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 429.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1515443961218-a51367888e4b?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 82,
    "restaurantId": 3,
    "itemName": "Dragon Signature Dish #22",
    "category": "Sides & Breads",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 444.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 83,
    "restaurantId": 3,
    "itemName": "Dragon Signature Dish #23",
    "category": "Sides & Breads",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 459.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 84,
    "restaurantId": 3,
    "itemName": "Dragon Signature Dish #24",
    "category": "Sides & Breads",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 474.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 85,
    "restaurantId": 3,
    "itemName": "Dragon Signature Dish #25",
    "category": "Dessert",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 489.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 86,
    "restaurantId": 3,
    "itemName": "Dragon Signature Dish #26",
    "category": "Dessert",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 504.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 87,
    "restaurantId": 3,
    "itemName": "Dragon Signature Dish #27",
    "category": "Dessert",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 519.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1621996346565-e3d5d6281288?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 88,
    "restaurantId": 3,
    "itemName": "Dragon Signature Dish #28",
    "category": "Beverages",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 534.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 89,
    "restaurantId": 3,
    "itemName": "Dragon Signature Dish #29",
    "category": "Beverages",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 549.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 90,
    "restaurantId": 3,
    "itemName": "Dragon Signature Dish #30",
    "category": "Beverages",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 564.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 91,
    "restaurantId": 4,
    "itemName": "Burger Signature Dish #1",
    "category": "Starters",
    "description": "Delicious authentic burgers creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 134.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1531749668029-2db88e4276c7?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 92,
    "restaurantId": 4,
    "itemName": "Burger Signature Dish #2",
    "category": "Starters",
    "description": "Delicious authentic burgers creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 149.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 93,
    "restaurantId": 4,
    "itemName": "Burger Signature Dish #3",
    "category": "Starters",
    "description": "Delicious authentic burgers creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 164.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 94,
    "restaurantId": 4,
    "itemName": "Burger Signature Dish #4",
    "category": "Starters",
    "description": "Delicious authentic burgers creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 179.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 95,
    "restaurantId": 4,
    "itemName": "Burger Signature Dish #5",
    "category": "Starters",
    "description": "Delicious authentic burgers creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 194.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1592417817098-8f3d69115b82?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 96,
    "restaurantId": 4,
    "itemName": "Burger Signature Dish #6",
    "category": "Main Course",
    "description": "Delicious authentic burgers creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 209.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 97,
    "restaurantId": 4,
    "itemName": "Burger Signature Dish #7",
    "category": "Main Course",
    "description": "Delicious authentic burgers creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 224.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 98,
    "restaurantId": 4,
    "itemName": "Burger Signature Dish #8",
    "category": "Main Course",
    "description": "Delicious authentic burgers creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 239.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 99,
    "restaurantId": 4,
    "itemName": "Burger Signature Dish #9",
    "category": "Main Course",
    "description": "Delicious authentic burgers creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 254.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 100,
    "restaurantId": 4,
    "itemName": "Burger Signature Dish #10",
    "category": "Main Course",
    "description": "Delicious authentic burgers creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 269.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 101,
    "restaurantId": 4,
    "itemName": "Burger Signature Dish #11",
    "category": "Main Course",
    "description": "Delicious authentic burgers creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 284.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 102,
    "restaurantId": 4,
    "itemName": "Burger Signature Dish #12",
    "category": "Main Course",
    "description": "Delicious authentic burgers creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 299.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 103,
    "restaurantId": 4,
    "itemName": "Burger Signature Dish #13",
    "category": "Specialties",
    "description": "Delicious authentic burgers creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 314.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 104,
    "restaurantId": 4,
    "itemName": "Burger Signature Dish #14",
    "category": "Specialties",
    "description": "Delicious authentic burgers creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 329.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 105,
    "restaurantId": 4,
    "itemName": "Burger Signature Dish #15",
    "category": "Specialties",
    "description": "Delicious authentic burgers creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 344.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 106,
    "restaurantId": 4,
    "itemName": "Burger Signature Dish #16",
    "category": "Specialties",
    "description": "Delicious authentic burgers creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 359.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1642821373181-696a54913e93?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 107,
    "restaurantId": 4,
    "itemName": "Burger Signature Dish #17",
    "category": "Specialties",
    "description": "Delicious authentic burgers creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 374.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 108,
    "restaurantId": 4,
    "itemName": "Burger Signature Dish #18",
    "category": "Specialties",
    "description": "Delicious authentic burgers creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 389.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 109,
    "restaurantId": 4,
    "itemName": "Burger Signature Dish #19",
    "category": "Sides & Breads",
    "description": "Delicious authentic burgers creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 404.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 110,
    "restaurantId": 4,
    "itemName": "Burger Signature Dish #20",
    "category": "Sides & Breads",
    "description": "Delicious authentic burgers creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 419.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 111,
    "restaurantId": 4,
    "itemName": "Burger Signature Dish #21",
    "category": "Sides & Breads",
    "description": "Delicious authentic burgers creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 434.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 112,
    "restaurantId": 4,
    "itemName": "Burger Signature Dish #22",
    "category": "Sides & Breads",
    "description": "Delicious authentic burgers creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 449.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 113,
    "restaurantId": 4,
    "itemName": "Burger Signature Dish #23",
    "category": "Sides & Breads",
    "description": "Delicious authentic burgers creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 464.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 114,
    "restaurantId": 4,
    "itemName": "Burger Signature Dish #24",
    "category": "Sides & Breads",
    "description": "Delicious authentic burgers creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 479.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 115,
    "restaurantId": 4,
    "itemName": "Burger Signature Dish #25",
    "category": "Dessert",
    "description": "Delicious authentic burgers creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 494.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 116,
    "restaurantId": 4,
    "itemName": "Burger Signature Dish #26",
    "category": "Dessert",
    "description": "Delicious authentic burgers creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 509.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 117,
    "restaurantId": 4,
    "itemName": "Burger Signature Dish #27",
    "category": "Dessert",
    "description": "Delicious authentic burgers creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 524.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 118,
    "restaurantId": 4,
    "itemName": "Burger Signature Dish #28",
    "category": "Beverages",
    "description": "Delicious authentic burgers creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 539.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1571006682890-a7d186c348ec?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 119,
    "restaurantId": 4,
    "itemName": "Burger Signature Dish #29",
    "category": "Beverages",
    "description": "Delicious authentic burgers creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 554.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 120,
    "restaurantId": 4,
    "itemName": "Burger Signature Dish #30",
    "category": "Beverages",
    "description": "Delicious authentic burgers creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 569.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 121,
    "restaurantId": 5,
    "itemName": "Green Signature Dish #1",
    "category": "Starters",
    "description": "Delicious authentic healthy creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 139.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 122,
    "restaurantId": 5,
    "itemName": "Green Signature Dish #2",
    "category": "Starters",
    "description": "Delicious authentic healthy creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 154.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 123,
    "restaurantId": 5,
    "itemName": "Green Signature Dish #3",
    "category": "Starters",
    "description": "Delicious authentic healthy creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 169.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 124,
    "restaurantId": 5,
    "itemName": "Green Signature Dish #4",
    "category": "Starters",
    "description": "Delicious authentic healthy creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 184.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 125,
    "restaurantId": 5,
    "itemName": "Green Signature Dish #5",
    "category": "Starters",
    "description": "Delicious authentic healthy creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 199.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 126,
    "restaurantId": 5,
    "itemName": "Green Signature Dish #6",
    "category": "Main Course",
    "description": "Delicious authentic healthy creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 214.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 127,
    "restaurantId": 5,
    "itemName": "Green Signature Dish #7",
    "category": "Main Course",
    "description": "Delicious authentic healthy creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 229.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 128,
    "restaurantId": 5,
    "itemName": "Green Signature Dish #8",
    "category": "Main Course",
    "description": "Delicious authentic healthy creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 244.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 129,
    "restaurantId": 5,
    "itemName": "Green Signature Dish #9",
    "category": "Main Course",
    "description": "Delicious authentic healthy creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 259.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 130,
    "restaurantId": 5,
    "itemName": "Green Signature Dish #10",
    "category": "Main Course",
    "description": "Delicious authentic healthy creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 274.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 131,
    "restaurantId": 5,
    "itemName": "Green Signature Dish #11",
    "category": "Main Course",
    "description": "Delicious authentic healthy creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 289.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 132,
    "restaurantId": 5,
    "itemName": "Green Signature Dish #12",
    "category": "Main Course",
    "description": "Delicious authentic healthy creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 304.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 133,
    "restaurantId": 5,
    "itemName": "Green Signature Dish #13",
    "category": "Specialties",
    "description": "Delicious authentic healthy creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 319.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 134,
    "restaurantId": 5,
    "itemName": "Green Signature Dish #14",
    "category": "Specialties",
    "description": "Delicious authentic healthy creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 334.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 135,
    "restaurantId": 5,
    "itemName": "Green Signature Dish #15",
    "category": "Specialties",
    "description": "Delicious authentic healthy creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 349.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 136,
    "restaurantId": 5,
    "itemName": "Green Signature Dish #16",
    "category": "Specialties",
    "description": "Delicious authentic healthy creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 364.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 137,
    "restaurantId": 5,
    "itemName": "Green Signature Dish #17",
    "category": "Specialties",
    "description": "Delicious authentic healthy creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 379.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 138,
    "restaurantId": 5,
    "itemName": "Green Signature Dish #18",
    "category": "Specialties",
    "description": "Delicious authentic healthy creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 394.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 139,
    "restaurantId": 5,
    "itemName": "Green Signature Dish #19",
    "category": "Sides & Breads",
    "description": "Delicious authentic healthy creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 409.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 140,
    "restaurantId": 5,
    "itemName": "Green Signature Dish #20",
    "category": "Sides & Breads",
    "description": "Delicious authentic healthy creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 424.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 141,
    "restaurantId": 5,
    "itemName": "Green Signature Dish #21",
    "category": "Sides & Breads",
    "description": "Delicious authentic healthy creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 439.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 142,
    "restaurantId": 5,
    "itemName": "Green Signature Dish #22",
    "category": "Sides & Breads",
    "description": "Delicious authentic healthy creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 454.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 143,
    "restaurantId": 5,
    "itemName": "Green Signature Dish #23",
    "category": "Sides & Breads",
    "description": "Delicious authentic healthy creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 469.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 144,
    "restaurantId": 5,
    "itemName": "Green Signature Dish #24",
    "category": "Sides & Breads",
    "description": "Delicious authentic healthy creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 484.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1624371414361-e670ef488916?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 145,
    "restaurantId": 5,
    "itemName": "Green Signature Dish #25",
    "category": "Dessert",
    "description": "Delicious authentic healthy creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 499.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 146,
    "restaurantId": 5,
    "itemName": "Green Signature Dish #26",
    "category": "Dessert",
    "description": "Delicious authentic healthy creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 514.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 147,
    "restaurantId": 5,
    "itemName": "Green Signature Dish #27",
    "category": "Dessert",
    "description": "Delicious authentic healthy creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 529.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 148,
    "restaurantId": 5,
    "itemName": "Green Signature Dish #28",
    "category": "Beverages",
    "description": "Delicious authentic healthy creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 544.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 149,
    "restaurantId": 5,
    "itemName": "Green Signature Dish #29",
    "category": "Beverages",
    "description": "Delicious authentic healthy creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 559.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 150,
    "restaurantId": 5,
    "itemName": "Green Signature Dish #30",
    "category": "Beverages",
    "description": "Delicious authentic healthy creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 574.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 151,
    "restaurantId": 6,
    "itemName": "Tokyo Signature Dish #1",
    "category": "Starters",
    "description": "Delicious authentic japanese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 144.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 152,
    "restaurantId": 6,
    "itemName": "Tokyo Signature Dish #2",
    "category": "Starters",
    "description": "Delicious authentic japanese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 159.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 153,
    "restaurantId": 6,
    "itemName": "Tokyo Signature Dish #3",
    "category": "Starters",
    "description": "Delicious authentic japanese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 174.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 154,
    "restaurantId": 6,
    "itemName": "Tokyo Signature Dish #4",
    "category": "Starters",
    "description": "Delicious authentic japanese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 189.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 155,
    "restaurantId": 6,
    "itemName": "Tokyo Signature Dish #5",
    "category": "Starters",
    "description": "Delicious authentic japanese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 204.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 156,
    "restaurantId": 6,
    "itemName": "Tokyo Signature Dish #6",
    "category": "Main Course",
    "description": "Delicious authentic japanese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 219.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 157,
    "restaurantId": 6,
    "itemName": "Tokyo Signature Dish #7",
    "category": "Main Course",
    "description": "Delicious authentic japanese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 234.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 158,
    "restaurantId": 6,
    "itemName": "Tokyo Signature Dish #8",
    "category": "Main Course",
    "description": "Delicious authentic japanese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 249.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 159,
    "restaurantId": 6,
    "itemName": "Tokyo Signature Dish #9",
    "category": "Main Course",
    "description": "Delicious authentic japanese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 264.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 160,
    "restaurantId": 6,
    "itemName": "Tokyo Signature Dish #10",
    "category": "Main Course",
    "description": "Delicious authentic japanese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 279.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 161,
    "restaurantId": 6,
    "itemName": "Tokyo Signature Dish #11",
    "category": "Main Course",
    "description": "Delicious authentic japanese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 294.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 162,
    "restaurantId": 6,
    "itemName": "Tokyo Signature Dish #12",
    "category": "Main Course",
    "description": "Delicious authentic japanese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 309.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1502301103665-0b95cc738daf?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 163,
    "restaurantId": 6,
    "itemName": "Tokyo Signature Dish #13",
    "category": "Specialties",
    "description": "Delicious authentic japanese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 324.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1533777857889-4be7c70b31f8?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 164,
    "restaurantId": 6,
    "itemName": "Tokyo Signature Dish #14",
    "category": "Specialties",
    "description": "Delicious authentic japanese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 339.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1515443961218-a51367888e4b?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 165,
    "restaurantId": 6,
    "itemName": "Tokyo Signature Dish #15",
    "category": "Specialties",
    "description": "Delicious authentic japanese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 354.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 166,
    "restaurantId": 6,
    "itemName": "Tokyo Signature Dish #16",
    "category": "Specialties",
    "description": "Delicious authentic japanese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 369.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 167,
    "restaurantId": 6,
    "itemName": "Tokyo Signature Dish #17",
    "category": "Specialties",
    "description": "Delicious authentic japanese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 384.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 168,
    "restaurantId": 6,
    "itemName": "Tokyo Signature Dish #18",
    "category": "Specialties",
    "description": "Delicious authentic japanese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 399.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 169,
    "restaurantId": 6,
    "itemName": "Tokyo Signature Dish #19",
    "category": "Sides & Breads",
    "description": "Delicious authentic japanese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 414.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 170,
    "restaurantId": 6,
    "itemName": "Tokyo Signature Dish #20",
    "category": "Sides & Breads",
    "description": "Delicious authentic japanese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 429.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1621996346565-e3d5d6281288?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 171,
    "restaurantId": 6,
    "itemName": "Tokyo Signature Dish #21",
    "category": "Sides & Breads",
    "description": "Delicious authentic japanese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 444.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 172,
    "restaurantId": 6,
    "itemName": "Tokyo Signature Dish #22",
    "category": "Sides & Breads",
    "description": "Delicious authentic japanese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 459.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 173,
    "restaurantId": 6,
    "itemName": "Tokyo Signature Dish #23",
    "category": "Sides & Breads",
    "description": "Delicious authentic japanese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 474.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 174,
    "restaurantId": 6,
    "itemName": "Tokyo Signature Dish #24",
    "category": "Sides & Breads",
    "description": "Delicious authentic japanese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 489.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1531749668029-2db88e4276c7?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 175,
    "restaurantId": 6,
    "itemName": "Tokyo Signature Dish #25",
    "category": "Dessert",
    "description": "Delicious authentic japanese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 504.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 176,
    "restaurantId": 6,
    "itemName": "Tokyo Signature Dish #26",
    "category": "Dessert",
    "description": "Delicious authentic japanese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 519.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 177,
    "restaurantId": 6,
    "itemName": "Tokyo Signature Dish #27",
    "category": "Dessert",
    "description": "Delicious authentic japanese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 534.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 178,
    "restaurantId": 6,
    "itemName": "Tokyo Signature Dish #28",
    "category": "Beverages",
    "description": "Delicious authentic japanese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 549.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1592417817098-8f3d69115b82?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 179,
    "restaurantId": 6,
    "itemName": "Tokyo Signature Dish #29",
    "category": "Beverages",
    "description": "Delicious authentic japanese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 564.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 180,
    "restaurantId": 6,
    "itemName": "Tokyo Signature Dish #30",
    "category": "Beverages",
    "description": "Delicious authentic japanese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 579.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 181,
    "restaurantId": 7,
    "itemName": "Taco Signature Dish #1",
    "category": "Starters",
    "description": "Delicious authentic mexican creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 149.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 182,
    "restaurantId": 7,
    "itemName": "Taco Signature Dish #2",
    "category": "Starters",
    "description": "Delicious authentic mexican creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 164.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 183,
    "restaurantId": 7,
    "itemName": "Taco Signature Dish #3",
    "category": "Starters",
    "description": "Delicious authentic mexican creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 179.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 184,
    "restaurantId": 7,
    "itemName": "Taco Signature Dish #4",
    "category": "Starters",
    "description": "Delicious authentic mexican creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 194.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 185,
    "restaurantId": 7,
    "itemName": "Taco Signature Dish #5",
    "category": "Starters",
    "description": "Delicious authentic mexican creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 209.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 186,
    "restaurantId": 7,
    "itemName": "Taco Signature Dish #6",
    "category": "Main Course",
    "description": "Delicious authentic mexican creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 224.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 187,
    "restaurantId": 7,
    "itemName": "Taco Signature Dish #7",
    "category": "Main Course",
    "description": "Delicious authentic mexican creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 239.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 188,
    "restaurantId": 7,
    "itemName": "Taco Signature Dish #8",
    "category": "Main Course",
    "description": "Delicious authentic mexican creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 254.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 189,
    "restaurantId": 7,
    "itemName": "Taco Signature Dish #9",
    "category": "Main Course",
    "description": "Delicious authentic mexican creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 269.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1642821373181-696a54913e93?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 190,
    "restaurantId": 7,
    "itemName": "Taco Signature Dish #10",
    "category": "Main Course",
    "description": "Delicious authentic mexican creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 284.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 191,
    "restaurantId": 7,
    "itemName": "Taco Signature Dish #11",
    "category": "Main Course",
    "description": "Delicious authentic mexican creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 299.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 192,
    "restaurantId": 7,
    "itemName": "Taco Signature Dish #12",
    "category": "Main Course",
    "description": "Delicious authentic mexican creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 314.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 193,
    "restaurantId": 7,
    "itemName": "Taco Signature Dish #13",
    "category": "Specialties",
    "description": "Delicious authentic mexican creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 329.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 194,
    "restaurantId": 7,
    "itemName": "Taco Signature Dish #14",
    "category": "Specialties",
    "description": "Delicious authentic mexican creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 344.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 195,
    "restaurantId": 7,
    "itemName": "Taco Signature Dish #15",
    "category": "Specialties",
    "description": "Delicious authentic mexican creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 359.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 196,
    "restaurantId": 7,
    "itemName": "Taco Signature Dish #16",
    "category": "Specialties",
    "description": "Delicious authentic mexican creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 374.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 197,
    "restaurantId": 7,
    "itemName": "Taco Signature Dish #17",
    "category": "Specialties",
    "description": "Delicious authentic mexican creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 389.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 198,
    "restaurantId": 7,
    "itemName": "Taco Signature Dish #18",
    "category": "Specialties",
    "description": "Delicious authentic mexican creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 404.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 199,
    "restaurantId": 7,
    "itemName": "Taco Signature Dish #19",
    "category": "Sides & Breads",
    "description": "Delicious authentic mexican creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 419.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 200,
    "restaurantId": 7,
    "itemName": "Taco Signature Dish #20",
    "category": "Sides & Breads",
    "description": "Delicious authentic mexican creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 434.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 201,
    "restaurantId": 7,
    "itemName": "Taco Signature Dish #21",
    "category": "Sides & Breads",
    "description": "Delicious authentic mexican creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 449.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1571006682890-a7d186c348ec?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 202,
    "restaurantId": 7,
    "itemName": "Taco Signature Dish #22",
    "category": "Sides & Breads",
    "description": "Delicious authentic mexican creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 464.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 203,
    "restaurantId": 7,
    "itemName": "Taco Signature Dish #23",
    "category": "Sides & Breads",
    "description": "Delicious authentic mexican creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 479.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 204,
    "restaurantId": 7,
    "itemName": "Taco Signature Dish #24",
    "category": "Sides & Breads",
    "description": "Delicious authentic mexican creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 494.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 205,
    "restaurantId": 7,
    "itemName": "Taco Signature Dish #25",
    "category": "Dessert",
    "description": "Delicious authentic mexican creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 509.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 206,
    "restaurantId": 7,
    "itemName": "Taco Signature Dish #26",
    "category": "Dessert",
    "description": "Delicious authentic mexican creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 524.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 207,
    "restaurantId": 7,
    "itemName": "Taco Signature Dish #27",
    "category": "Dessert",
    "description": "Delicious authentic mexican creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 539.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 208,
    "restaurantId": 7,
    "itemName": "Taco Signature Dish #28",
    "category": "Beverages",
    "description": "Delicious authentic mexican creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 554.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 209,
    "restaurantId": 7,
    "itemName": "Taco Signature Dish #29",
    "category": "Beverages",
    "description": "Delicious authentic mexican creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 569.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 210,
    "restaurantId": 7,
    "itemName": "Taco Signature Dish #30",
    "category": "Beverages",
    "description": "Delicious authentic mexican creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 584.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 211,
    "restaurantId": 8,
    "itemName": "Siam Signature Dish #1",
    "category": "Starters",
    "description": "Delicious authentic thai creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 154.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 212,
    "restaurantId": 8,
    "itemName": "Siam Signature Dish #2",
    "category": "Starters",
    "description": "Delicious authentic thai creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 169.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 213,
    "restaurantId": 8,
    "itemName": "Siam Signature Dish #3",
    "category": "Starters",
    "description": "Delicious authentic thai creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 184.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 214,
    "restaurantId": 8,
    "itemName": "Siam Signature Dish #4",
    "category": "Starters",
    "description": "Delicious authentic thai creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 199.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 215,
    "restaurantId": 8,
    "itemName": "Siam Signature Dish #5",
    "category": "Starters",
    "description": "Delicious authentic thai creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 214.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 216,
    "restaurantId": 8,
    "itemName": "Siam Signature Dish #6",
    "category": "Main Course",
    "description": "Delicious authentic thai creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 229.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 217,
    "restaurantId": 8,
    "itemName": "Siam Signature Dish #7",
    "category": "Main Course",
    "description": "Delicious authentic thai creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 244.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 218,
    "restaurantId": 8,
    "itemName": "Siam Signature Dish #8",
    "category": "Main Course",
    "description": "Delicious authentic thai creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 259.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 219,
    "restaurantId": 8,
    "itemName": "Siam Signature Dish #9",
    "category": "Main Course",
    "description": "Delicious authentic thai creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 274.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 220,
    "restaurantId": 8,
    "itemName": "Siam Signature Dish #10",
    "category": "Main Course",
    "description": "Delicious authentic thai creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 289.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 221,
    "restaurantId": 8,
    "itemName": "Siam Signature Dish #11",
    "category": "Main Course",
    "description": "Delicious authentic thai creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 304.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 222,
    "restaurantId": 8,
    "itemName": "Siam Signature Dish #12",
    "category": "Main Course",
    "description": "Delicious authentic thai creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 319.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 223,
    "restaurantId": 8,
    "itemName": "Siam Signature Dish #13",
    "category": "Specialties",
    "description": "Delicious authentic thai creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 334.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 224,
    "restaurantId": 8,
    "itemName": "Siam Signature Dish #14",
    "category": "Specialties",
    "description": "Delicious authentic thai creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 349.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 225,
    "restaurantId": 8,
    "itemName": "Siam Signature Dish #15",
    "category": "Specialties",
    "description": "Delicious authentic thai creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 364.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 226,
    "restaurantId": 8,
    "itemName": "Siam Signature Dish #16",
    "category": "Specialties",
    "description": "Delicious authentic thai creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 379.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 227,
    "restaurantId": 8,
    "itemName": "Siam Signature Dish #17",
    "category": "Specialties",
    "description": "Delicious authentic thai creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 394.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1624371414361-e670ef488916?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 228,
    "restaurantId": 8,
    "itemName": "Siam Signature Dish #18",
    "category": "Specialties",
    "description": "Delicious authentic thai creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 409.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 229,
    "restaurantId": 8,
    "itemName": "Siam Signature Dish #19",
    "category": "Sides & Breads",
    "description": "Delicious authentic thai creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 424.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 230,
    "restaurantId": 8,
    "itemName": "Siam Signature Dish #20",
    "category": "Sides & Breads",
    "description": "Delicious authentic thai creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 439.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 231,
    "restaurantId": 8,
    "itemName": "Siam Signature Dish #21",
    "category": "Sides & Breads",
    "description": "Delicious authentic thai creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 454.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 232,
    "restaurantId": 8,
    "itemName": "Siam Signature Dish #22",
    "category": "Sides & Breads",
    "description": "Delicious authentic thai creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 469.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 233,
    "restaurantId": 8,
    "itemName": "Siam Signature Dish #23",
    "category": "Sides & Breads",
    "description": "Delicious authentic thai creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 484.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 234,
    "restaurantId": 8,
    "itemName": "Siam Signature Dish #24",
    "category": "Sides & Breads",
    "description": "Delicious authentic thai creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 499.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 235,
    "restaurantId": 8,
    "itemName": "Siam Signature Dish #25",
    "category": "Dessert",
    "description": "Delicious authentic thai creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 514.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 236,
    "restaurantId": 8,
    "itemName": "Siam Signature Dish #26",
    "category": "Dessert",
    "description": "Delicious authentic thai creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 529.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 237,
    "restaurantId": 8,
    "itemName": "Siam Signature Dish #27",
    "category": "Dessert",
    "description": "Delicious authentic thai creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 544.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 238,
    "restaurantId": 8,
    "itemName": "Siam Signature Dish #28",
    "category": "Beverages",
    "description": "Delicious authentic thai creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 559.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 239,
    "restaurantId": 8,
    "itemName": "Siam Signature Dish #29",
    "category": "Beverages",
    "description": "Delicious authentic thai creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 574.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 240,
    "restaurantId": 8,
    "itemName": "Siam Signature Dish #30",
    "category": "Beverages",
    "description": "Delicious authentic thai creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 589.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 241,
    "restaurantId": 9,
    "itemName": "Sweet Signature Dish #1",
    "category": "Starters",
    "description": "Delicious authentic desserts creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 159.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 242,
    "restaurantId": 9,
    "itemName": "Sweet Signature Dish #2",
    "category": "Starters",
    "description": "Delicious authentic desserts creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 174.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 243,
    "restaurantId": 9,
    "itemName": "Sweet Signature Dish #3",
    "category": "Starters",
    "description": "Delicious authentic desserts creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 189.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 244,
    "restaurantId": 9,
    "itemName": "Sweet Signature Dish #4",
    "category": "Starters",
    "description": "Delicious authentic desserts creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 204.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 245,
    "restaurantId": 9,
    "itemName": "Sweet Signature Dish #5",
    "category": "Starters",
    "description": "Delicious authentic desserts creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 219.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1502301103665-0b95cc738daf?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 246,
    "restaurantId": 9,
    "itemName": "Sweet Signature Dish #6",
    "category": "Main Course",
    "description": "Delicious authentic desserts creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 234.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1533777857889-4be7c70b31f8?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 247,
    "restaurantId": 9,
    "itemName": "Sweet Signature Dish #7",
    "category": "Main Course",
    "description": "Delicious authentic desserts creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 249.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1515443961218-a51367888e4b?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 248,
    "restaurantId": 9,
    "itemName": "Sweet Signature Dish #8",
    "category": "Main Course",
    "description": "Delicious authentic desserts creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 264.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 249,
    "restaurantId": 9,
    "itemName": "Sweet Signature Dish #9",
    "category": "Main Course",
    "description": "Delicious authentic desserts creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 279.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 250,
    "restaurantId": 9,
    "itemName": "Sweet Signature Dish #10",
    "category": "Main Course",
    "description": "Delicious authentic desserts creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 294.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 251,
    "restaurantId": 9,
    "itemName": "Sweet Signature Dish #11",
    "category": "Main Course",
    "description": "Delicious authentic desserts creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 309.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 252,
    "restaurantId": 9,
    "itemName": "Sweet Signature Dish #12",
    "category": "Main Course",
    "description": "Delicious authentic desserts creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 324.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 253,
    "restaurantId": 9,
    "itemName": "Sweet Signature Dish #13",
    "category": "Specialties",
    "description": "Delicious authentic desserts creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 339.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1621996346565-e3d5d6281288?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 254,
    "restaurantId": 9,
    "itemName": "Sweet Signature Dish #14",
    "category": "Specialties",
    "description": "Delicious authentic desserts creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 354.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 255,
    "restaurantId": 9,
    "itemName": "Sweet Signature Dish #15",
    "category": "Specialties",
    "description": "Delicious authentic desserts creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 369.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 256,
    "restaurantId": 9,
    "itemName": "Sweet Signature Dish #16",
    "category": "Specialties",
    "description": "Delicious authentic desserts creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 384.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 257,
    "restaurantId": 9,
    "itemName": "Sweet Signature Dish #17",
    "category": "Specialties",
    "description": "Delicious authentic desserts creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 399.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1531749668029-2db88e4276c7?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 258,
    "restaurantId": 9,
    "itemName": "Sweet Signature Dish #18",
    "category": "Specialties",
    "description": "Delicious authentic desserts creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 414.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 259,
    "restaurantId": 9,
    "itemName": "Sweet Signature Dish #19",
    "category": "Sides & Breads",
    "description": "Delicious authentic desserts creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 429.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 260,
    "restaurantId": 9,
    "itemName": "Sweet Signature Dish #20",
    "category": "Sides & Breads",
    "description": "Delicious authentic desserts creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 444.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 261,
    "restaurantId": 9,
    "itemName": "Sweet Signature Dish #21",
    "category": "Sides & Breads",
    "description": "Delicious authentic desserts creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 459.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1592417817098-8f3d69115b82?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 262,
    "restaurantId": 9,
    "itemName": "Sweet Signature Dish #22",
    "category": "Sides & Breads",
    "description": "Delicious authentic desserts creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 474.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 263,
    "restaurantId": 9,
    "itemName": "Sweet Signature Dish #23",
    "category": "Sides & Breads",
    "description": "Delicious authentic desserts creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 489.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 264,
    "restaurantId": 9,
    "itemName": "Sweet Signature Dish #24",
    "category": "Sides & Breads",
    "description": "Delicious authentic desserts creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 504.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 265,
    "restaurantId": 9,
    "itemName": "Sweet Signature Dish #25",
    "category": "Dessert",
    "description": "Delicious authentic desserts creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 519.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 266,
    "restaurantId": 9,
    "itemName": "Sweet Signature Dish #26",
    "category": "Dessert",
    "description": "Delicious authentic desserts creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 534.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 267,
    "restaurantId": 9,
    "itemName": "Sweet Signature Dish #27",
    "category": "Dessert",
    "description": "Delicious authentic desserts creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 549.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 268,
    "restaurantId": 9,
    "itemName": "Sweet Signature Dish #28",
    "category": "Beverages",
    "description": "Delicious authentic desserts creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 564.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 269,
    "restaurantId": 9,
    "itemName": "Sweet Signature Dish #29",
    "category": "Beverages",
    "description": "Delicious authentic desserts creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 579.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 270,
    "restaurantId": 9,
    "itemName": "Sweet Signature Dish #30",
    "category": "Beverages",
    "description": "Delicious authentic desserts creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 594.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 271,
    "restaurantId": 10,
    "itemName": "Smokey Signature Dish #1",
    "category": "Starters",
    "description": "Delicious authentic bbq creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 164.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 272,
    "restaurantId": 10,
    "itemName": "Smokey Signature Dish #2",
    "category": "Starters",
    "description": "Delicious authentic bbq creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 179.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1642821373181-696a54913e93?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 273,
    "restaurantId": 10,
    "itemName": "Smokey Signature Dish #3",
    "category": "Starters",
    "description": "Delicious authentic bbq creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 194.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 274,
    "restaurantId": 10,
    "itemName": "Smokey Signature Dish #4",
    "category": "Starters",
    "description": "Delicious authentic bbq creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 209.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 275,
    "restaurantId": 10,
    "itemName": "Smokey Signature Dish #5",
    "category": "Starters",
    "description": "Delicious authentic bbq creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 224.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 276,
    "restaurantId": 10,
    "itemName": "Smokey Signature Dish #6",
    "category": "Main Course",
    "description": "Delicious authentic bbq creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 239.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 277,
    "restaurantId": 10,
    "itemName": "Smokey Signature Dish #7",
    "category": "Main Course",
    "description": "Delicious authentic bbq creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 254.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 278,
    "restaurantId": 10,
    "itemName": "Smokey Signature Dish #8",
    "category": "Main Course",
    "description": "Delicious authentic bbq creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 269.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 279,
    "restaurantId": 10,
    "itemName": "Smokey Signature Dish #9",
    "category": "Main Course",
    "description": "Delicious authentic bbq creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 284.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 280,
    "restaurantId": 10,
    "itemName": "Smokey Signature Dish #10",
    "category": "Main Course",
    "description": "Delicious authentic bbq creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 299.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 281,
    "restaurantId": 10,
    "itemName": "Smokey Signature Dish #11",
    "category": "Main Course",
    "description": "Delicious authentic bbq creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 314.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 282,
    "restaurantId": 10,
    "itemName": "Smokey Signature Dish #12",
    "category": "Main Course",
    "description": "Delicious authentic bbq creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 329.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 283,
    "restaurantId": 10,
    "itemName": "Smokey Signature Dish #13",
    "category": "Specialties",
    "description": "Delicious authentic bbq creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 344.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 284,
    "restaurantId": 10,
    "itemName": "Smokey Signature Dish #14",
    "category": "Specialties",
    "description": "Delicious authentic bbq creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 359.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1571006682890-a7d186c348ec?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 285,
    "restaurantId": 10,
    "itemName": "Smokey Signature Dish #15",
    "category": "Specialties",
    "description": "Delicious authentic bbq creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 374.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 286,
    "restaurantId": 10,
    "itemName": "Smokey Signature Dish #16",
    "category": "Specialties",
    "description": "Delicious authentic bbq creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 389.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 287,
    "restaurantId": 10,
    "itemName": "Smokey Signature Dish #17",
    "category": "Specialties",
    "description": "Delicious authentic bbq creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 404.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 288,
    "restaurantId": 10,
    "itemName": "Smokey Signature Dish #18",
    "category": "Specialties",
    "description": "Delicious authentic bbq creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 419.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 289,
    "restaurantId": 10,
    "itemName": "Smokey Signature Dish #19",
    "category": "Sides & Breads",
    "description": "Delicious authentic bbq creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 434.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 290,
    "restaurantId": 10,
    "itemName": "Smokey Signature Dish #20",
    "category": "Sides & Breads",
    "description": "Delicious authentic bbq creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 449.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 291,
    "restaurantId": 10,
    "itemName": "Smokey Signature Dish #21",
    "category": "Sides & Breads",
    "description": "Delicious authentic bbq creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 464.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 292,
    "restaurantId": 10,
    "itemName": "Smokey Signature Dish #22",
    "category": "Sides & Breads",
    "description": "Delicious authentic bbq creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 479.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 293,
    "restaurantId": 10,
    "itemName": "Smokey Signature Dish #23",
    "category": "Sides & Breads",
    "description": "Delicious authentic bbq creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 494.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 294,
    "restaurantId": 10,
    "itemName": "Smokey Signature Dish #24",
    "category": "Sides & Breads",
    "description": "Delicious authentic bbq creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 509.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 295,
    "restaurantId": 10,
    "itemName": "Smokey Signature Dish #25",
    "category": "Dessert",
    "description": "Delicious authentic bbq creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 524.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 296,
    "restaurantId": 10,
    "itemName": "Smokey Signature Dish #26",
    "category": "Dessert",
    "description": "Delicious authentic bbq creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 539.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 297,
    "restaurantId": 10,
    "itemName": "Smokey Signature Dish #27",
    "category": "Dessert",
    "description": "Delicious authentic bbq creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 554.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 298,
    "restaurantId": 10,
    "itemName": "Smokey Signature Dish #28",
    "category": "Beverages",
    "description": "Delicious authentic bbq creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 569.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 299,
    "restaurantId": 10,
    "itemName": "Smokey Signature Dish #29",
    "category": "Beverages",
    "description": "Delicious authentic bbq creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 584.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 300,
    "restaurantId": 10,
    "itemName": "Smokey Signature Dish #30",
    "category": "Beverages",
    "description": "Delicious authentic bbq creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 599.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 301,
    "restaurantId": 11,
    "itemName": "Mediterranean Signature Dish #1",
    "category": "Starters",
    "description": "Delicious authentic mediterranean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 169.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 302,
    "restaurantId": 11,
    "itemName": "Mediterranean Signature Dish #2",
    "category": "Starters",
    "description": "Delicious authentic mediterranean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 184.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 303,
    "restaurantId": 11,
    "itemName": "Mediterranean Signature Dish #3",
    "category": "Starters",
    "description": "Delicious authentic mediterranean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 199.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 304,
    "restaurantId": 11,
    "itemName": "Mediterranean Signature Dish #4",
    "category": "Starters",
    "description": "Delicious authentic mediterranean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 214.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 305,
    "restaurantId": 11,
    "itemName": "Mediterranean Signature Dish #5",
    "category": "Starters",
    "description": "Delicious authentic mediterranean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 229.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 306,
    "restaurantId": 11,
    "itemName": "Mediterranean Signature Dish #6",
    "category": "Main Course",
    "description": "Delicious authentic mediterranean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 244.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 307,
    "restaurantId": 11,
    "itemName": "Mediterranean Signature Dish #7",
    "category": "Main Course",
    "description": "Delicious authentic mediterranean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 259.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 308,
    "restaurantId": 11,
    "itemName": "Mediterranean Signature Dish #8",
    "category": "Main Course",
    "description": "Delicious authentic mediterranean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 274.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 309,
    "restaurantId": 11,
    "itemName": "Mediterranean Signature Dish #9",
    "category": "Main Course",
    "description": "Delicious authentic mediterranean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 289.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 310,
    "restaurantId": 11,
    "itemName": "Mediterranean Signature Dish #10",
    "category": "Main Course",
    "description": "Delicious authentic mediterranean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 304.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1624371414361-e670ef488916?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 311,
    "restaurantId": 11,
    "itemName": "Mediterranean Signature Dish #11",
    "category": "Main Course",
    "description": "Delicious authentic mediterranean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 319.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 312,
    "restaurantId": 11,
    "itemName": "Mediterranean Signature Dish #12",
    "category": "Main Course",
    "description": "Delicious authentic mediterranean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 334.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 313,
    "restaurantId": 11,
    "itemName": "Mediterranean Signature Dish #13",
    "category": "Specialties",
    "description": "Delicious authentic mediterranean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 349.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 314,
    "restaurantId": 11,
    "itemName": "Mediterranean Signature Dish #14",
    "category": "Specialties",
    "description": "Delicious authentic mediterranean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 364.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 315,
    "restaurantId": 11,
    "itemName": "Mediterranean Signature Dish #15",
    "category": "Specialties",
    "description": "Delicious authentic mediterranean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 379.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 316,
    "restaurantId": 11,
    "itemName": "Mediterranean Signature Dish #16",
    "category": "Specialties",
    "description": "Delicious authentic mediterranean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 394.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 317,
    "restaurantId": 11,
    "itemName": "Mediterranean Signature Dish #17",
    "category": "Specialties",
    "description": "Delicious authentic mediterranean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 409.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 318,
    "restaurantId": 11,
    "itemName": "Mediterranean Signature Dish #18",
    "category": "Specialties",
    "description": "Delicious authentic mediterranean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 424.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 319,
    "restaurantId": 11,
    "itemName": "Mediterranean Signature Dish #19",
    "category": "Sides & Breads",
    "description": "Delicious authentic mediterranean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 439.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 320,
    "restaurantId": 11,
    "itemName": "Mediterranean Signature Dish #20",
    "category": "Sides & Breads",
    "description": "Delicious authentic mediterranean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 454.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 321,
    "restaurantId": 11,
    "itemName": "Mediterranean Signature Dish #21",
    "category": "Sides & Breads",
    "description": "Delicious authentic mediterranean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 469.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 322,
    "restaurantId": 11,
    "itemName": "Mediterranean Signature Dish #22",
    "category": "Sides & Breads",
    "description": "Delicious authentic mediterranean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 484.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 323,
    "restaurantId": 11,
    "itemName": "Mediterranean Signature Dish #23",
    "category": "Sides & Breads",
    "description": "Delicious authentic mediterranean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 499.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 324,
    "restaurantId": 11,
    "itemName": "Mediterranean Signature Dish #24",
    "category": "Sides & Breads",
    "description": "Delicious authentic mediterranean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 514.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 325,
    "restaurantId": 11,
    "itemName": "Mediterranean Signature Dish #25",
    "category": "Dessert",
    "description": "Delicious authentic mediterranean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 529.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 326,
    "restaurantId": 11,
    "itemName": "Mediterranean Signature Dish #26",
    "category": "Dessert",
    "description": "Delicious authentic mediterranean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 544.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 327,
    "restaurantId": 11,
    "itemName": "Mediterranean Signature Dish #27",
    "category": "Dessert",
    "description": "Delicious authentic mediterranean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 559.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 328,
    "restaurantId": 11,
    "itemName": "Mediterranean Signature Dish #28",
    "category": "Beverages",
    "description": "Delicious authentic mediterranean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 574.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1502301103665-0b95cc738daf?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 329,
    "restaurantId": 11,
    "itemName": "Mediterranean Signature Dish #29",
    "category": "Beverages",
    "description": "Delicious authentic mediterranean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 589.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1533777857889-4be7c70b31f8?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 330,
    "restaurantId": 11,
    "itemName": "Mediterranean Signature Dish #30",
    "category": "Beverages",
    "description": "Delicious authentic mediterranean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 604.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1515443961218-a51367888e4b?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 331,
    "restaurantId": 12,
    "itemName": "Ocean Signature Dish #1",
    "category": "Starters",
    "description": "Delicious authentic seafood creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 174.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 332,
    "restaurantId": 12,
    "itemName": "Ocean Signature Dish #2",
    "category": "Starters",
    "description": "Delicious authentic seafood creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 189.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 333,
    "restaurantId": 12,
    "itemName": "Ocean Signature Dish #3",
    "category": "Starters",
    "description": "Delicious authentic seafood creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 204.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 334,
    "restaurantId": 12,
    "itemName": "Ocean Signature Dish #4",
    "category": "Starters",
    "description": "Delicious authentic seafood creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 219.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 335,
    "restaurantId": 12,
    "itemName": "Ocean Signature Dish #5",
    "category": "Starters",
    "description": "Delicious authentic seafood creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 234.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 336,
    "restaurantId": 12,
    "itemName": "Ocean Signature Dish #6",
    "category": "Main Course",
    "description": "Delicious authentic seafood creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 249.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1621996346565-e3d5d6281288?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 337,
    "restaurantId": 12,
    "itemName": "Ocean Signature Dish #7",
    "category": "Main Course",
    "description": "Delicious authentic seafood creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 264.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 338,
    "restaurantId": 12,
    "itemName": "Ocean Signature Dish #8",
    "category": "Main Course",
    "description": "Delicious authentic seafood creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 279.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 339,
    "restaurantId": 12,
    "itemName": "Ocean Signature Dish #9",
    "category": "Main Course",
    "description": "Delicious authentic seafood creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 294.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 340,
    "restaurantId": 12,
    "itemName": "Ocean Signature Dish #10",
    "category": "Main Course",
    "description": "Delicious authentic seafood creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 309.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1531749668029-2db88e4276c7?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 341,
    "restaurantId": 12,
    "itemName": "Ocean Signature Dish #11",
    "category": "Main Course",
    "description": "Delicious authentic seafood creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 324.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 342,
    "restaurantId": 12,
    "itemName": "Ocean Signature Dish #12",
    "category": "Main Course",
    "description": "Delicious authentic seafood creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 339.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 343,
    "restaurantId": 12,
    "itemName": "Ocean Signature Dish #13",
    "category": "Specialties",
    "description": "Delicious authentic seafood creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 354.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 344,
    "restaurantId": 12,
    "itemName": "Ocean Signature Dish #14",
    "category": "Specialties",
    "description": "Delicious authentic seafood creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 369.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1592417817098-8f3d69115b82?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 345,
    "restaurantId": 12,
    "itemName": "Ocean Signature Dish #15",
    "category": "Specialties",
    "description": "Delicious authentic seafood creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 384.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 346,
    "restaurantId": 12,
    "itemName": "Ocean Signature Dish #16",
    "category": "Specialties",
    "description": "Delicious authentic seafood creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 399.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 347,
    "restaurantId": 12,
    "itemName": "Ocean Signature Dish #17",
    "category": "Specialties",
    "description": "Delicious authentic seafood creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 414.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 348,
    "restaurantId": 12,
    "itemName": "Ocean Signature Dish #18",
    "category": "Specialties",
    "description": "Delicious authentic seafood creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 429.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 349,
    "restaurantId": 12,
    "itemName": "Ocean Signature Dish #19",
    "category": "Sides & Breads",
    "description": "Delicious authentic seafood creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 444.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 350,
    "restaurantId": 12,
    "itemName": "Ocean Signature Dish #20",
    "category": "Sides & Breads",
    "description": "Delicious authentic seafood creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 459.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 351,
    "restaurantId": 12,
    "itemName": "Ocean Signature Dish #21",
    "category": "Sides & Breads",
    "description": "Delicious authentic seafood creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 474.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 352,
    "restaurantId": 12,
    "itemName": "Ocean Signature Dish #22",
    "category": "Sides & Breads",
    "description": "Delicious authentic seafood creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 489.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 353,
    "restaurantId": 12,
    "itemName": "Ocean Signature Dish #23",
    "category": "Sides & Breads",
    "description": "Delicious authentic seafood creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 504.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 354,
    "restaurantId": 12,
    "itemName": "Ocean Signature Dish #24",
    "category": "Sides & Breads",
    "description": "Delicious authentic seafood creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 519.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 355,
    "restaurantId": 12,
    "itemName": "Ocean Signature Dish #25",
    "category": "Dessert",
    "description": "Delicious authentic seafood creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 534.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1642821373181-696a54913e93?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 356,
    "restaurantId": 12,
    "itemName": "Ocean Signature Dish #26",
    "category": "Dessert",
    "description": "Delicious authentic seafood creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 549.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 357,
    "restaurantId": 12,
    "itemName": "Ocean Signature Dish #27",
    "category": "Dessert",
    "description": "Delicious authentic seafood creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 564.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 358,
    "restaurantId": 12,
    "itemName": "Ocean Signature Dish #28",
    "category": "Beverages",
    "description": "Delicious authentic seafood creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 579.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 359,
    "restaurantId": 12,
    "itemName": "Ocean Signature Dish #29",
    "category": "Beverages",
    "description": "Delicious authentic seafood creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 594.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 360,
    "restaurantId": 12,
    "itemName": "Ocean Signature Dish #30",
    "category": "Beverages",
    "description": "Delicious authentic seafood creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 609.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 361,
    "restaurantId": 13,
    "itemName": "Bombay Signature Dish #1",
    "category": "Starters",
    "description": "Delicious authentic street food creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 179.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 362,
    "restaurantId": 13,
    "itemName": "Bombay Signature Dish #2",
    "category": "Starters",
    "description": "Delicious authentic street food creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 194.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 363,
    "restaurantId": 13,
    "itemName": "Bombay Signature Dish #3",
    "category": "Starters",
    "description": "Delicious authentic street food creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 209.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 364,
    "restaurantId": 13,
    "itemName": "Bombay Signature Dish #4",
    "category": "Starters",
    "description": "Delicious authentic street food creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 224.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 365,
    "restaurantId": 13,
    "itemName": "Bombay Signature Dish #5",
    "category": "Starters",
    "description": "Delicious authentic street food creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 239.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 366,
    "restaurantId": 13,
    "itemName": "Bombay Signature Dish #6",
    "category": "Main Course",
    "description": "Delicious authentic street food creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 254.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 367,
    "restaurantId": 13,
    "itemName": "Bombay Signature Dish #7",
    "category": "Main Course",
    "description": "Delicious authentic street food creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 269.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1571006682890-a7d186c348ec?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 368,
    "restaurantId": 13,
    "itemName": "Bombay Signature Dish #8",
    "category": "Main Course",
    "description": "Delicious authentic street food creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 284.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 369,
    "restaurantId": 13,
    "itemName": "Bombay Signature Dish #9",
    "category": "Main Course",
    "description": "Delicious authentic street food creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 299.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 370,
    "restaurantId": 13,
    "itemName": "Bombay Signature Dish #10",
    "category": "Main Course",
    "description": "Delicious authentic street food creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 314.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 371,
    "restaurantId": 13,
    "itemName": "Bombay Signature Dish #11",
    "category": "Main Course",
    "description": "Delicious authentic street food creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 329.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 372,
    "restaurantId": 13,
    "itemName": "Bombay Signature Dish #12",
    "category": "Main Course",
    "description": "Delicious authentic street food creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 344.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 373,
    "restaurantId": 13,
    "itemName": "Bombay Signature Dish #13",
    "category": "Specialties",
    "description": "Delicious authentic street food creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 359.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 374,
    "restaurantId": 13,
    "itemName": "Bombay Signature Dish #14",
    "category": "Specialties",
    "description": "Delicious authentic street food creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 374.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 375,
    "restaurantId": 13,
    "itemName": "Bombay Signature Dish #15",
    "category": "Specialties",
    "description": "Delicious authentic street food creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 389.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 376,
    "restaurantId": 13,
    "itemName": "Bombay Signature Dish #16",
    "category": "Specialties",
    "description": "Delicious authentic street food creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 404.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 377,
    "restaurantId": 13,
    "itemName": "Bombay Signature Dish #17",
    "category": "Specialties",
    "description": "Delicious authentic street food creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 419.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 378,
    "restaurantId": 13,
    "itemName": "Bombay Signature Dish #18",
    "category": "Specialties",
    "description": "Delicious authentic street food creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 434.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 379,
    "restaurantId": 13,
    "itemName": "Bombay Signature Dish #19",
    "category": "Sides & Breads",
    "description": "Delicious authentic street food creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 449.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 380,
    "restaurantId": 13,
    "itemName": "Bombay Signature Dish #20",
    "category": "Sides & Breads",
    "description": "Delicious authentic street food creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 464.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 381,
    "restaurantId": 13,
    "itemName": "Bombay Signature Dish #21",
    "category": "Sides & Breads",
    "description": "Delicious authentic street food creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 479.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 382,
    "restaurantId": 13,
    "itemName": "Bombay Signature Dish #22",
    "category": "Sides & Breads",
    "description": "Delicious authentic street food creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 494.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 383,
    "restaurantId": 13,
    "itemName": "Bombay Signature Dish #23",
    "category": "Sides & Breads",
    "description": "Delicious authentic street food creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 509.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 384,
    "restaurantId": 13,
    "itemName": "Bombay Signature Dish #24",
    "category": "Sides & Breads",
    "description": "Delicious authentic street food creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 524.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 385,
    "restaurantId": 13,
    "itemName": "Bombay Signature Dish #25",
    "category": "Dessert",
    "description": "Delicious authentic street food creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 539.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 386,
    "restaurantId": 13,
    "itemName": "Bombay Signature Dish #26",
    "category": "Dessert",
    "description": "Delicious authentic street food creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 554.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 387,
    "restaurantId": 13,
    "itemName": "Bombay Signature Dish #27",
    "category": "Dessert",
    "description": "Delicious authentic street food creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 569.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 388,
    "restaurantId": 13,
    "itemName": "Bombay Signature Dish #28",
    "category": "Beverages",
    "description": "Delicious authentic street food creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 584.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 389,
    "restaurantId": 13,
    "itemName": "Bombay Signature Dish #29",
    "category": "Beverages",
    "description": "Delicious authentic street food creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 599.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 390,
    "restaurantId": 13,
    "itemName": "Bombay Signature Dish #30",
    "category": "Beverages",
    "description": "Delicious authentic street food creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 614.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 391,
    "restaurantId": 14,
    "itemName": "Le Signature Dish #1",
    "category": "Starters",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 184.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 392,
    "restaurantId": 14,
    "itemName": "Le Signature Dish #2",
    "category": "Starters",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 199.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 393,
    "restaurantId": 14,
    "itemName": "Le Signature Dish #3",
    "category": "Starters",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 214.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1624371414361-e670ef488916?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 394,
    "restaurantId": 14,
    "itemName": "Le Signature Dish #4",
    "category": "Starters",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 229.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 395,
    "restaurantId": 14,
    "itemName": "Le Signature Dish #5",
    "category": "Starters",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 244.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 396,
    "restaurantId": 14,
    "itemName": "Le Signature Dish #6",
    "category": "Main Course",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 259.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 397,
    "restaurantId": 14,
    "itemName": "Le Signature Dish #7",
    "category": "Main Course",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 274.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 398,
    "restaurantId": 14,
    "itemName": "Le Signature Dish #8",
    "category": "Main Course",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 289.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 399,
    "restaurantId": 14,
    "itemName": "Le Signature Dish #9",
    "category": "Main Course",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 304.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 400,
    "restaurantId": 14,
    "itemName": "Le Signature Dish #10",
    "category": "Main Course",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 319.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 401,
    "restaurantId": 14,
    "itemName": "Le Signature Dish #11",
    "category": "Main Course",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 334.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 402,
    "restaurantId": 14,
    "itemName": "Le Signature Dish #12",
    "category": "Main Course",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 349.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 403,
    "restaurantId": 14,
    "itemName": "Le Signature Dish #13",
    "category": "Specialties",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 364.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 404,
    "restaurantId": 14,
    "itemName": "Le Signature Dish #14",
    "category": "Specialties",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 379.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 405,
    "restaurantId": 14,
    "itemName": "Le Signature Dish #15",
    "category": "Specialties",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 394.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 406,
    "restaurantId": 14,
    "itemName": "Le Signature Dish #16",
    "category": "Specialties",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 409.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 407,
    "restaurantId": 14,
    "itemName": "Le Signature Dish #17",
    "category": "Specialties",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 424.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 408,
    "restaurantId": 14,
    "itemName": "Le Signature Dish #18",
    "category": "Specialties",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 439.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 409,
    "restaurantId": 14,
    "itemName": "Le Signature Dish #19",
    "category": "Sides & Breads",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 454.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 410,
    "restaurantId": 14,
    "itemName": "Le Signature Dish #20",
    "category": "Sides & Breads",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 469.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 411,
    "restaurantId": 14,
    "itemName": "Le Signature Dish #21",
    "category": "Sides & Breads",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 484.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1502301103665-0b95cc738daf?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 412,
    "restaurantId": 14,
    "itemName": "Le Signature Dish #22",
    "category": "Sides & Breads",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 499.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1533777857889-4be7c70b31f8?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 413,
    "restaurantId": 14,
    "itemName": "Le Signature Dish #23",
    "category": "Sides & Breads",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 514.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1515443961218-a51367888e4b?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 414,
    "restaurantId": 14,
    "itemName": "Le Signature Dish #24",
    "category": "Sides & Breads",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 529.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 415,
    "restaurantId": 14,
    "itemName": "Le Signature Dish #25",
    "category": "Dessert",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 544.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 416,
    "restaurantId": 14,
    "itemName": "Le Signature Dish #26",
    "category": "Dessert",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 559.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 417,
    "restaurantId": 14,
    "itemName": "Le Signature Dish #27",
    "category": "Dessert",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 574.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 418,
    "restaurantId": 14,
    "itemName": "Le Signature Dish #28",
    "category": "Beverages",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 589.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 419,
    "restaurantId": 14,
    "itemName": "Le Signature Dish #29",
    "category": "Beverages",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 604.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1621996346565-e3d5d6281288?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 420,
    "restaurantId": 14,
    "itemName": "Le Signature Dish #30",
    "category": "Beverages",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 619.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 421,
    "restaurantId": 15,
    "itemName": "The Signature Dish #1",
    "category": "Starters",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 189.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 422,
    "restaurantId": 15,
    "itemName": "The Signature Dish #2",
    "category": "Starters",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 204.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 423,
    "restaurantId": 15,
    "itemName": "The Signature Dish #3",
    "category": "Starters",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 219.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1531749668029-2db88e4276c7?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 424,
    "restaurantId": 15,
    "itemName": "The Signature Dish #4",
    "category": "Starters",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 234.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 425,
    "restaurantId": 15,
    "itemName": "The Signature Dish #5",
    "category": "Starters",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 249.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 426,
    "restaurantId": 15,
    "itemName": "The Signature Dish #6",
    "category": "Main Course",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 264.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 427,
    "restaurantId": 15,
    "itemName": "The Signature Dish #7",
    "category": "Main Course",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 279.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1592417817098-8f3d69115b82?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 428,
    "restaurantId": 15,
    "itemName": "The Signature Dish #8",
    "category": "Main Course",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 294.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 429,
    "restaurantId": 15,
    "itemName": "The Signature Dish #9",
    "category": "Main Course",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 309.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 430,
    "restaurantId": 15,
    "itemName": "The Signature Dish #10",
    "category": "Main Course",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 324.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 431,
    "restaurantId": 15,
    "itemName": "The Signature Dish #11",
    "category": "Main Course",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 339.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 432,
    "restaurantId": 15,
    "itemName": "The Signature Dish #12",
    "category": "Main Course",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 354.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 433,
    "restaurantId": 15,
    "itemName": "The Signature Dish #13",
    "category": "Specialties",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 369.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 434,
    "restaurantId": 15,
    "itemName": "The Signature Dish #14",
    "category": "Specialties",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 384.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 435,
    "restaurantId": 15,
    "itemName": "The Signature Dish #15",
    "category": "Specialties",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 399.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 436,
    "restaurantId": 15,
    "itemName": "The Signature Dish #16",
    "category": "Specialties",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 414.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 437,
    "restaurantId": 15,
    "itemName": "The Signature Dish #17",
    "category": "Specialties",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 429.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 438,
    "restaurantId": 15,
    "itemName": "The Signature Dish #18",
    "category": "Specialties",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 444.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1642821373181-696a54913e93?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 439,
    "restaurantId": 15,
    "itemName": "The Signature Dish #19",
    "category": "Sides & Breads",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 459.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 440,
    "restaurantId": 15,
    "itemName": "The Signature Dish #20",
    "category": "Sides & Breads",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 474.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 441,
    "restaurantId": 15,
    "itemName": "The Signature Dish #21",
    "category": "Sides & Breads",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 489.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 442,
    "restaurantId": 15,
    "itemName": "The Signature Dish #22",
    "category": "Sides & Breads",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 504.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 443,
    "restaurantId": 15,
    "itemName": "The Signature Dish #23",
    "category": "Sides & Breads",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 519.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 444,
    "restaurantId": 15,
    "itemName": "The Signature Dish #24",
    "category": "Sides & Breads",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 534.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 445,
    "restaurantId": 15,
    "itemName": "The Signature Dish #25",
    "category": "Dessert",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 549.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 446,
    "restaurantId": 15,
    "itemName": "The Signature Dish #26",
    "category": "Dessert",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 564.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 447,
    "restaurantId": 15,
    "itemName": "The Signature Dish #27",
    "category": "Dessert",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 579.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 448,
    "restaurantId": 15,
    "itemName": "The Signature Dish #28",
    "category": "Beverages",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 594.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 449,
    "restaurantId": 15,
    "itemName": "The Signature Dish #29",
    "category": "Beverages",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 609.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 450,
    "restaurantId": 15,
    "itemName": "The Signature Dish #30",
    "category": "Beverages",
    "description": "Delicious authentic indian creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 624.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1571006682890-a7d186c348ec?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 451,
    "restaurantId": 16,
    "itemName": "Seoul Signature Dish #1",
    "category": "Starters",
    "description": "Delicious authentic korean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 194.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 452,
    "restaurantId": 16,
    "itemName": "Seoul Signature Dish #2",
    "category": "Starters",
    "description": "Delicious authentic korean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 209.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 453,
    "restaurantId": 16,
    "itemName": "Seoul Signature Dish #3",
    "category": "Starters",
    "description": "Delicious authentic korean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 224.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 454,
    "restaurantId": 16,
    "itemName": "Seoul Signature Dish #4",
    "category": "Starters",
    "description": "Delicious authentic korean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 239.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 455,
    "restaurantId": 16,
    "itemName": "Seoul Signature Dish #5",
    "category": "Starters",
    "description": "Delicious authentic korean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 254.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 456,
    "restaurantId": 16,
    "itemName": "Seoul Signature Dish #6",
    "category": "Main Course",
    "description": "Delicious authentic korean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 269.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 457,
    "restaurantId": 16,
    "itemName": "Seoul Signature Dish #7",
    "category": "Main Course",
    "description": "Delicious authentic korean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 284.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 458,
    "restaurantId": 16,
    "itemName": "Seoul Signature Dish #8",
    "category": "Main Course",
    "description": "Delicious authentic korean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 299.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 459,
    "restaurantId": 16,
    "itemName": "Seoul Signature Dish #9",
    "category": "Main Course",
    "description": "Delicious authentic korean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 314.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 460,
    "restaurantId": 16,
    "itemName": "Seoul Signature Dish #10",
    "category": "Main Course",
    "description": "Delicious authentic korean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 329.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 461,
    "restaurantId": 16,
    "itemName": "Seoul Signature Dish #11",
    "category": "Main Course",
    "description": "Delicious authentic korean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 344.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 462,
    "restaurantId": 16,
    "itemName": "Seoul Signature Dish #12",
    "category": "Main Course",
    "description": "Delicious authentic korean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 359.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 463,
    "restaurantId": 16,
    "itemName": "Seoul Signature Dish #13",
    "category": "Specialties",
    "description": "Delicious authentic korean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 374.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 464,
    "restaurantId": 16,
    "itemName": "Seoul Signature Dish #14",
    "category": "Specialties",
    "description": "Delicious authentic korean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 389.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 465,
    "restaurantId": 16,
    "itemName": "Seoul Signature Dish #15",
    "category": "Specialties",
    "description": "Delicious authentic korean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 404.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 466,
    "restaurantId": 16,
    "itemName": "Seoul Signature Dish #16",
    "category": "Specialties",
    "description": "Delicious authentic korean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 419.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 467,
    "restaurantId": 16,
    "itemName": "Seoul Signature Dish #17",
    "category": "Specialties",
    "description": "Delicious authentic korean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 434.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 468,
    "restaurantId": 16,
    "itemName": "Seoul Signature Dish #18",
    "category": "Specialties",
    "description": "Delicious authentic korean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 449.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 469,
    "restaurantId": 16,
    "itemName": "Seoul Signature Dish #19",
    "category": "Sides & Breads",
    "description": "Delicious authentic korean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 464.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 470,
    "restaurantId": 16,
    "itemName": "Seoul Signature Dish #20",
    "category": "Sides & Breads",
    "description": "Delicious authentic korean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 479.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 471,
    "restaurantId": 16,
    "itemName": "Seoul Signature Dish #21",
    "category": "Sides & Breads",
    "description": "Delicious authentic korean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 494.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 472,
    "restaurantId": 16,
    "itemName": "Seoul Signature Dish #22",
    "category": "Sides & Breads",
    "description": "Delicious authentic korean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 509.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 473,
    "restaurantId": 16,
    "itemName": "Seoul Signature Dish #23",
    "category": "Sides & Breads",
    "description": "Delicious authentic korean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 524.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 474,
    "restaurantId": 16,
    "itemName": "Seoul Signature Dish #24",
    "category": "Sides & Breads",
    "description": "Delicious authentic korean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 539.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 475,
    "restaurantId": 16,
    "itemName": "Seoul Signature Dish #25",
    "category": "Dessert",
    "description": "Delicious authentic korean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 554.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 476,
    "restaurantId": 16,
    "itemName": "Seoul Signature Dish #26",
    "category": "Dessert",
    "description": "Delicious authentic korean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 569.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1624371414361-e670ef488916?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 477,
    "restaurantId": 16,
    "itemName": "Seoul Signature Dish #27",
    "category": "Dessert",
    "description": "Delicious authentic korean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 584.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 478,
    "restaurantId": 16,
    "itemName": "Seoul Signature Dish #28",
    "category": "Beverages",
    "description": "Delicious authentic korean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 599.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 479,
    "restaurantId": 16,
    "itemName": "Seoul Signature Dish #29",
    "category": "Beverages",
    "description": "Delicious authentic korean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 614.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 480,
    "restaurantId": 16,
    "itemName": "Seoul Signature Dish #30",
    "category": "Beverages",
    "description": "Delicious authentic korean creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 629.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 481,
    "restaurantId": 17,
    "itemName": "Saigon Signature Dish #1",
    "category": "Starters",
    "description": "Delicious authentic vietnamese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 199.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 482,
    "restaurantId": 17,
    "itemName": "Saigon Signature Dish #2",
    "category": "Starters",
    "description": "Delicious authentic vietnamese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 214.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 483,
    "restaurantId": 17,
    "itemName": "Saigon Signature Dish #3",
    "category": "Starters",
    "description": "Delicious authentic vietnamese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 229.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 484,
    "restaurantId": 17,
    "itemName": "Saigon Signature Dish #4",
    "category": "Starters",
    "description": "Delicious authentic vietnamese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 244.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 485,
    "restaurantId": 17,
    "itemName": "Saigon Signature Dish #5",
    "category": "Starters",
    "description": "Delicious authentic vietnamese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 259.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 486,
    "restaurantId": 17,
    "itemName": "Saigon Signature Dish #6",
    "category": "Main Course",
    "description": "Delicious authentic vietnamese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 274.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 487,
    "restaurantId": 17,
    "itemName": "Saigon Signature Dish #7",
    "category": "Main Course",
    "description": "Delicious authentic vietnamese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 289.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 488,
    "restaurantId": 17,
    "itemName": "Saigon Signature Dish #8",
    "category": "Main Course",
    "description": "Delicious authentic vietnamese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 304.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 489,
    "restaurantId": 17,
    "itemName": "Saigon Signature Dish #9",
    "category": "Main Course",
    "description": "Delicious authentic vietnamese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 319.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 490,
    "restaurantId": 17,
    "itemName": "Saigon Signature Dish #10",
    "category": "Main Course",
    "description": "Delicious authentic vietnamese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 334.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 491,
    "restaurantId": 17,
    "itemName": "Saigon Signature Dish #11",
    "category": "Main Course",
    "description": "Delicious authentic vietnamese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 349.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 492,
    "restaurantId": 17,
    "itemName": "Saigon Signature Dish #12",
    "category": "Main Course",
    "description": "Delicious authentic vietnamese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 364.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 493,
    "restaurantId": 17,
    "itemName": "Saigon Signature Dish #13",
    "category": "Specialties",
    "description": "Delicious authentic vietnamese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 379.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 494,
    "restaurantId": 17,
    "itemName": "Saigon Signature Dish #14",
    "category": "Specialties",
    "description": "Delicious authentic vietnamese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 394.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1502301103665-0b95cc738daf?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 495,
    "restaurantId": 17,
    "itemName": "Saigon Signature Dish #15",
    "category": "Specialties",
    "description": "Delicious authentic vietnamese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 409.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1533777857889-4be7c70b31f8?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 496,
    "restaurantId": 17,
    "itemName": "Saigon Signature Dish #16",
    "category": "Specialties",
    "description": "Delicious authentic vietnamese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 424.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1515443961218-a51367888e4b?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 497,
    "restaurantId": 17,
    "itemName": "Saigon Signature Dish #17",
    "category": "Specialties",
    "description": "Delicious authentic vietnamese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 439.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 498,
    "restaurantId": 17,
    "itemName": "Saigon Signature Dish #18",
    "category": "Specialties",
    "description": "Delicious authentic vietnamese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 454.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 499,
    "restaurantId": 17,
    "itemName": "Saigon Signature Dish #19",
    "category": "Sides & Breads",
    "description": "Delicious authentic vietnamese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 469.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 500,
    "restaurantId": 17,
    "itemName": "Saigon Signature Dish #20",
    "category": "Sides & Breads",
    "description": "Delicious authentic vietnamese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 484.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 501,
    "restaurantId": 17,
    "itemName": "Saigon Signature Dish #21",
    "category": "Sides & Breads",
    "description": "Delicious authentic vietnamese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 499.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 502,
    "restaurantId": 17,
    "itemName": "Saigon Signature Dish #22",
    "category": "Sides & Breads",
    "description": "Delicious authentic vietnamese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 514.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1621996346565-e3d5d6281288?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 503,
    "restaurantId": 17,
    "itemName": "Saigon Signature Dish #23",
    "category": "Sides & Breads",
    "description": "Delicious authentic vietnamese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 529.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 504,
    "restaurantId": 17,
    "itemName": "Saigon Signature Dish #24",
    "category": "Sides & Breads",
    "description": "Delicious authentic vietnamese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 544.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 505,
    "restaurantId": 17,
    "itemName": "Saigon Signature Dish #25",
    "category": "Dessert",
    "description": "Delicious authentic vietnamese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 559.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 506,
    "restaurantId": 17,
    "itemName": "Saigon Signature Dish #26",
    "category": "Dessert",
    "description": "Delicious authentic vietnamese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 574.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1531749668029-2db88e4276c7?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 507,
    "restaurantId": 17,
    "itemName": "Saigon Signature Dish #27",
    "category": "Dessert",
    "description": "Delicious authentic vietnamese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 589.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 508,
    "restaurantId": 17,
    "itemName": "Saigon Signature Dish #28",
    "category": "Beverages",
    "description": "Delicious authentic vietnamese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 604.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 509,
    "restaurantId": 17,
    "itemName": "Saigon Signature Dish #29",
    "category": "Beverages",
    "description": "Delicious authentic vietnamese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 619.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 510,
    "restaurantId": 17,
    "itemName": "Saigon Signature Dish #30",
    "category": "Beverages",
    "description": "Delicious authentic vietnamese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 634.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1592417817098-8f3d69115b82?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 511,
    "restaurantId": 18,
    "itemName": "Bistro Signature Dish #1",
    "category": "Starters",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 204.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 512,
    "restaurantId": 18,
    "itemName": "Bistro Signature Dish #2",
    "category": "Starters",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 219.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 513,
    "restaurantId": 18,
    "itemName": "Bistro Signature Dish #3",
    "category": "Starters",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 234.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 514,
    "restaurantId": 18,
    "itemName": "Bistro Signature Dish #4",
    "category": "Starters",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 249.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 515,
    "restaurantId": 18,
    "itemName": "Bistro Signature Dish #5",
    "category": "Starters",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 264.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 516,
    "restaurantId": 18,
    "itemName": "Bistro Signature Dish #6",
    "category": "Main Course",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 279.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 517,
    "restaurantId": 18,
    "itemName": "Bistro Signature Dish #7",
    "category": "Main Course",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 294.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 518,
    "restaurantId": 18,
    "itemName": "Bistro Signature Dish #8",
    "category": "Main Course",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 309.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 519,
    "restaurantId": 18,
    "itemName": "Bistro Signature Dish #9",
    "category": "Main Course",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 324.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 520,
    "restaurantId": 18,
    "itemName": "Bistro Signature Dish #10",
    "category": "Main Course",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 339.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 521,
    "restaurantId": 18,
    "itemName": "Bistro Signature Dish #11",
    "category": "Main Course",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 354.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1642821373181-696a54913e93?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 522,
    "restaurantId": 18,
    "itemName": "Bistro Signature Dish #12",
    "category": "Main Course",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 369.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 523,
    "restaurantId": 18,
    "itemName": "Bistro Signature Dish #13",
    "category": "Specialties",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 384.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 524,
    "restaurantId": 18,
    "itemName": "Bistro Signature Dish #14",
    "category": "Specialties",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 399.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 525,
    "restaurantId": 18,
    "itemName": "Bistro Signature Dish #15",
    "category": "Specialties",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 414.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 526,
    "restaurantId": 18,
    "itemName": "Bistro Signature Dish #16",
    "category": "Specialties",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 429.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 527,
    "restaurantId": 18,
    "itemName": "Bistro Signature Dish #17",
    "category": "Specialties",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 444.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 528,
    "restaurantId": 18,
    "itemName": "Bistro Signature Dish #18",
    "category": "Specialties",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 459.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 529,
    "restaurantId": 18,
    "itemName": "Bistro Signature Dish #19",
    "category": "Sides & Breads",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 474.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 530,
    "restaurantId": 18,
    "itemName": "Bistro Signature Dish #20",
    "category": "Sides & Breads",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 489.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 531,
    "restaurantId": 18,
    "itemName": "Bistro Signature Dish #21",
    "category": "Sides & Breads",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 504.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 532,
    "restaurantId": 18,
    "itemName": "Bistro Signature Dish #22",
    "category": "Sides & Breads",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 519.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 533,
    "restaurantId": 18,
    "itemName": "Bistro Signature Dish #23",
    "category": "Sides & Breads",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 534.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1571006682890-a7d186c348ec?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 534,
    "restaurantId": 18,
    "itemName": "Bistro Signature Dish #24",
    "category": "Sides & Breads",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 549.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 535,
    "restaurantId": 18,
    "itemName": "Bistro Signature Dish #25",
    "category": "Dessert",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 564.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 536,
    "restaurantId": 18,
    "itemName": "Bistro Signature Dish #26",
    "category": "Dessert",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 579.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 537,
    "restaurantId": 18,
    "itemName": "Bistro Signature Dish #27",
    "category": "Dessert",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 594.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 538,
    "restaurantId": 18,
    "itemName": "Bistro Signature Dish #28",
    "category": "Beverages",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 609.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 539,
    "restaurantId": 18,
    "itemName": "Bistro Signature Dish #29",
    "category": "Beverages",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 624.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 540,
    "restaurantId": 18,
    "itemName": "Bistro Signature Dish #30",
    "category": "Beverages",
    "description": "Delicious authentic french creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 639.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 541,
    "restaurantId": 19,
    "itemName": "Istanbul Signature Dish #1",
    "category": "Starters",
    "description": "Delicious authentic turkish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 209.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 542,
    "restaurantId": 19,
    "itemName": "Istanbul Signature Dish #2",
    "category": "Starters",
    "description": "Delicious authentic turkish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 224.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 543,
    "restaurantId": 19,
    "itemName": "Istanbul Signature Dish #3",
    "category": "Starters",
    "description": "Delicious authentic turkish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 239.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 544,
    "restaurantId": 19,
    "itemName": "Istanbul Signature Dish #4",
    "category": "Starters",
    "description": "Delicious authentic turkish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 254.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 545,
    "restaurantId": 19,
    "itemName": "Istanbul Signature Dish #5",
    "category": "Starters",
    "description": "Delicious authentic turkish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 269.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 546,
    "restaurantId": 19,
    "itemName": "Istanbul Signature Dish #6",
    "category": "Main Course",
    "description": "Delicious authentic turkish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 284.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 547,
    "restaurantId": 19,
    "itemName": "Istanbul Signature Dish #7",
    "category": "Main Course",
    "description": "Delicious authentic turkish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 299.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 548,
    "restaurantId": 19,
    "itemName": "Istanbul Signature Dish #8",
    "category": "Main Course",
    "description": "Delicious authentic turkish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 314.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 549,
    "restaurantId": 19,
    "itemName": "Istanbul Signature Dish #9",
    "category": "Main Course",
    "description": "Delicious authentic turkish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 329.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 550,
    "restaurantId": 19,
    "itemName": "Istanbul Signature Dish #10",
    "category": "Main Course",
    "description": "Delicious authentic turkish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 344.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 551,
    "restaurantId": 19,
    "itemName": "Istanbul Signature Dish #11",
    "category": "Main Course",
    "description": "Delicious authentic turkish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 359.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 552,
    "restaurantId": 19,
    "itemName": "Istanbul Signature Dish #12",
    "category": "Main Course",
    "description": "Delicious authentic turkish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 374.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 553,
    "restaurantId": 19,
    "itemName": "Istanbul Signature Dish #13",
    "category": "Specialties",
    "description": "Delicious authentic turkish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 389.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 554,
    "restaurantId": 19,
    "itemName": "Istanbul Signature Dish #14",
    "category": "Specialties",
    "description": "Delicious authentic turkish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 404.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 555,
    "restaurantId": 19,
    "itemName": "Istanbul Signature Dish #15",
    "category": "Specialties",
    "description": "Delicious authentic turkish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 419.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 556,
    "restaurantId": 19,
    "itemName": "Istanbul Signature Dish #16",
    "category": "Specialties",
    "description": "Delicious authentic turkish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 434.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 557,
    "restaurantId": 19,
    "itemName": "Istanbul Signature Dish #17",
    "category": "Specialties",
    "description": "Delicious authentic turkish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 449.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 558,
    "restaurantId": 19,
    "itemName": "Istanbul Signature Dish #18",
    "category": "Specialties",
    "description": "Delicious authentic turkish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 464.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 559,
    "restaurantId": 19,
    "itemName": "Istanbul Signature Dish #19",
    "category": "Sides & Breads",
    "description": "Delicious authentic turkish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 479.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1624371414361-e670ef488916?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 560,
    "restaurantId": 19,
    "itemName": "Istanbul Signature Dish #20",
    "category": "Sides & Breads",
    "description": "Delicious authentic turkish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 494.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 561,
    "restaurantId": 19,
    "itemName": "Istanbul Signature Dish #21",
    "category": "Sides & Breads",
    "description": "Delicious authentic turkish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 509.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 562,
    "restaurantId": 19,
    "itemName": "Istanbul Signature Dish #22",
    "category": "Sides & Breads",
    "description": "Delicious authentic turkish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 524.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 563,
    "restaurantId": 19,
    "itemName": "Istanbul Signature Dish #23",
    "category": "Sides & Breads",
    "description": "Delicious authentic turkish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 539.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 564,
    "restaurantId": 19,
    "itemName": "Istanbul Signature Dish #24",
    "category": "Sides & Breads",
    "description": "Delicious authentic turkish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 554.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 565,
    "restaurantId": 19,
    "itemName": "Istanbul Signature Dish #25",
    "category": "Dessert",
    "description": "Delicious authentic turkish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 569.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 566,
    "restaurantId": 19,
    "itemName": "Istanbul Signature Dish #26",
    "category": "Dessert",
    "description": "Delicious authentic turkish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 584.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 567,
    "restaurantId": 19,
    "itemName": "Istanbul Signature Dish #27",
    "category": "Dessert",
    "description": "Delicious authentic turkish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 599.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 568,
    "restaurantId": 19,
    "itemName": "Istanbul Signature Dish #28",
    "category": "Beverages",
    "description": "Delicious authentic turkish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 614.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 569,
    "restaurantId": 19,
    "itemName": "Istanbul Signature Dish #29",
    "category": "Beverages",
    "description": "Delicious authentic turkish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 629.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 570,
    "restaurantId": 19,
    "itemName": "Istanbul Signature Dish #30",
    "category": "Beverages",
    "description": "Delicious authentic turkish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 644.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 571,
    "restaurantId": 20,
    "itemName": "Santorini Moussaka Casserole",
    "category": "Main Course",
    "description": "Layered eggplant, minced lamb, and potato casserole topped with creamy b\u00e9chamel",
    "price": 349.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 572,
    "restaurantId": 20,
    "itemName": "Greek Souvlaki Chicken Skewers",
    "category": "Main Course",
    "description": "Marinated lemon herb chicken skewers served with tzatziki and pita",
    "price": 299.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 573,
    "restaurantId": 20,
    "itemName": "Authentic Greek Gyro Wrap",
    "category": "Wraps",
    "description": "Seasoned grilled chicken wrapped in warm pita with tzatziki, tomatoes & onions",
    "price": 249.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 574,
    "restaurantId": 20,
    "itemName": "Classic Greek Salad Feta Block",
    "category": "Salads",
    "description": "Vine tomatoes, cucumbers, kalamata olives, red onion, and thick feta cheese block",
    "price": 239.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 575,
    "restaurantId": 20,
    "itemName": "Spanakopita Spinach Pie 4pcs",
    "category": "Starters",
    "description": "Flaky phyllo pastry stuffed with spinach and creamy feta cheese",
    "price": 199.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 576,
    "restaurantId": 20,
    "itemName": "Tzatziki Dip with Warm Pita",
    "category": "Starters",
    "description": "Creamy Greek yogurt garlic cucumber dip served with warm pita triangles",
    "price": 179.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 577,
    "restaurantId": 20,
    "itemName": "Dolmades Stuffed Grape Leaves",
    "category": "Starters",
    "description": "Tender vine leaves stuffed with rice, fresh herbs, and lemon juice",
    "price": 189.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1502301103665-0b95cc738daf?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 578,
    "restaurantId": 20,
    "itemName": "Grilled Halloumi Cheese Slices",
    "category": "Starters",
    "description": "Charred Cypriot halloumi cheese drizzled with wild honey and oregano",
    "price": 219.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1533777857889-4be7c70b31f8?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 579,
    "restaurantId": 20,
    "itemName": "Greek Lamb Chops Rosemary",
    "category": "Specialties",
    "description": "Rosemary garlic marinated lamb chops grilled over open wood fire",
    "price": 499.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1515443961218-a51367888e4b?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 580,
    "restaurantId": 20,
    "itemName": "Greek Lemon Roasted Potatoes",
    "category": "Sides & Breads",
    "description": "Crispy oven baked wedges drenched in lemon butter and oregano",
    "price": 149.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 581,
    "restaurantId": 20,
    "itemName": "Pastitsio Greek Baked Pasta",
    "category": "Main Course",
    "description": "Tubular pasta layered with spiced beef sauce and thick b\u00e9chamel glaze",
    "price": 329.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 582,
    "restaurantId": 20,
    "itemName": "Tyropita Golden Cheese Pastry",
    "category": "Starters",
    "description": "Crispy phyllo dough filled with feta and ricotta cheese blend",
    "price": 189.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 583,
    "restaurantId": 20,
    "itemName": "Hummus & Kalamata Olive Bowl",
    "category": "Starters",
    "description": "Smooth blended chickpea tahini dip topped with virgin olive oil and olives",
    "price": 189.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 584,
    "restaurantId": 20,
    "itemName": "Keftedes Greek Spiced Meatballs",
    "category": "Starters",
    "description": "Crispy pan-fried beef and pork meatballs seasoned with mint and oregano",
    "price": 279.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 585,
    "restaurantId": 20,
    "itemName": "Greek Fried Calamari Rings",
    "category": "Specialties",
    "description": "Golden crumbed squid rings served with lemon garlic dip",
    "price": 299.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1621996346565-e3d5d6281288?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 586,
    "restaurantId": 20,
    "itemName": "Honey Walnut Baklava 2pcs",
    "category": "Dessert",
    "description": "Crispy phyllo layers packed with chopped walnuts and cinnamon honey syrup",
    "price": 169.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 587,
    "restaurantId": 20,
    "itemName": "Galaktoboureko Custard Pie",
    "category": "Dessert",
    "description": "Semolina custard baked in crispy phyllo syrup crust",
    "price": 179.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 588,
    "restaurantId": 20,
    "itemName": "Greek Yogurt Honey & Pistachio",
    "category": "Dessert",
    "description": "Thick strained Greek yogurt drizzled with thyme honey and crushed pistachios",
    "price": 139.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 589,
    "restaurantId": 20,
    "itemName": "Greek Coffee Briki Pot",
    "category": "Beverages",
    "description": "Traditional slow brewed unfiltered Greek dark roast coffee",
    "price": 89.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1531749668029-2db88e4276c7?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 590,
    "restaurantId": 20,
    "itemName": "Ouzo Citrus Sparkler Mocktail",
    "category": "Beverages",
    "description": "Refreshing iced anise citrus soda with mint",
    "price": 99.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 591,
    "restaurantId": 20,
    "itemName": "Aegean Sea Bass Grilled",
    "category": "Specialties",
    "description": "Whole grilled Mediterranean sea bass basted with lemon caper sauce",
    "price": 549.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 592,
    "restaurantId": 20,
    "itemName": "Greek Saganaki Flaming Cheese",
    "category": "Starters",
    "description": "Pan-seared Kasseri cheese flamb\u00e9ed with lemon juice",
    "price": 229.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 593,
    "restaurantId": 20,
    "itemName": "Chicken Kontosouvli Platter",
    "category": "Main Course",
    "description": "Rotisserie spit-roasted marinated chicken thigh chunks",
    "price": 339.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1592417817098-8f3d69115b82?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 594,
    "restaurantId": 20,
    "itemName": "Santorini Tomato Fritters 4pcs",
    "category": "Starters",
    "description": "Crispy fried sun-dried tomato and herb patties",
    "price": 169.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 595,
    "restaurantId": 20,
    "itemName": "Orzo Seafood Salad",
    "category": "Salads",
    "description": "Rice-shaped orzo pasta tossed with calamari, prawns, cherry tomatoes & feta",
    "price": 289.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 596,
    "restaurantId": 20,
    "itemName": "Feta & Honey Phyllo Wrap",
    "category": "Dessert",
    "description": "Baked feta cheese in crisp phyllo drizzled with honey and sesame",
    "price": 199.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 597,
    "restaurantId": 20,
    "itemName": "Greek Orange Cake Portokalopita",
    "category": "Dessert",
    "description": "Moist phyllo orange syrup cake infused with cinnamon",
    "price": 169.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 598,
    "restaurantId": 20,
    "itemName": "Pomegranate Mint Soda",
    "category": "Beverages",
    "description": "Chilled iced pomegranate sparkling water with mint leaves",
    "price": 89.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 599,
    "restaurantId": 20,
    "itemName": "Iced Frappe Coffee Greek",
    "category": "Beverage",
    "description": "Frothy whipped iced Nescaf\u00e9 coffee drink",
    "price": 99.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 600,
    "restaurantId": 20,
    "itemName": "Sparkling Aegean Mineral Water",
    "category": "Beverages",
    "description": "Pure natural carbonated spring water",
    "price": 50.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 601,
    "restaurantId": 21,
    "itemName": "Tapia Signature Dish #1",
    "category": "Starters",
    "description": "Delicious authentic spanish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 219.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 602,
    "restaurantId": 21,
    "itemName": "Tapia Signature Dish #2",
    "category": "Starters",
    "description": "Delicious authentic spanish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 234.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 603,
    "restaurantId": 21,
    "itemName": "Tapia Signature Dish #3",
    "category": "Starters",
    "description": "Delicious authentic spanish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 249.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 604,
    "restaurantId": 21,
    "itemName": "Tapia Signature Dish #4",
    "category": "Starters",
    "description": "Delicious authentic spanish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 264.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1642821373181-696a54913e93?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 605,
    "restaurantId": 21,
    "itemName": "Tapia Signature Dish #5",
    "category": "Starters",
    "description": "Delicious authentic spanish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 279.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 606,
    "restaurantId": 21,
    "itemName": "Tapia Signature Dish #6",
    "category": "Main Course",
    "description": "Delicious authentic spanish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 294.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 607,
    "restaurantId": 21,
    "itemName": "Tapia Signature Dish #7",
    "category": "Main Course",
    "description": "Delicious authentic spanish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 309.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 608,
    "restaurantId": 21,
    "itemName": "Tapia Signature Dish #8",
    "category": "Main Course",
    "description": "Delicious authentic spanish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 324.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 609,
    "restaurantId": 21,
    "itemName": "Tapia Signature Dish #9",
    "category": "Main Course",
    "description": "Delicious authentic spanish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 339.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 610,
    "restaurantId": 21,
    "itemName": "Tapia Signature Dish #10",
    "category": "Main Course",
    "description": "Delicious authentic spanish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 354.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 611,
    "restaurantId": 21,
    "itemName": "Tapia Signature Dish #11",
    "category": "Main Course",
    "description": "Delicious authentic spanish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 369.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 612,
    "restaurantId": 21,
    "itemName": "Tapia Signature Dish #12",
    "category": "Main Course",
    "description": "Delicious authentic spanish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 384.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 613,
    "restaurantId": 21,
    "itemName": "Tapia Signature Dish #13",
    "category": "Specialties",
    "description": "Delicious authentic spanish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 399.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 614,
    "restaurantId": 21,
    "itemName": "Tapia Signature Dish #14",
    "category": "Specialties",
    "description": "Delicious authentic spanish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 414.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 615,
    "restaurantId": 21,
    "itemName": "Tapia Signature Dish #15",
    "category": "Specialties",
    "description": "Delicious authentic spanish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 429.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 616,
    "restaurantId": 21,
    "itemName": "Tapia Signature Dish #16",
    "category": "Specialties",
    "description": "Delicious authentic spanish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 444.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1571006682890-a7d186c348ec?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 617,
    "restaurantId": 21,
    "itemName": "Tapia Signature Dish #17",
    "category": "Specialties",
    "description": "Delicious authentic spanish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 459.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 618,
    "restaurantId": 21,
    "itemName": "Tapia Signature Dish #18",
    "category": "Specialties",
    "description": "Delicious authentic spanish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 474.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 619,
    "restaurantId": 21,
    "itemName": "Tapia Signature Dish #19",
    "category": "Sides & Breads",
    "description": "Delicious authentic spanish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 489.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 620,
    "restaurantId": 21,
    "itemName": "Tapia Signature Dish #20",
    "category": "Sides & Breads",
    "description": "Delicious authentic spanish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 504.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 621,
    "restaurantId": 21,
    "itemName": "Tapia Signature Dish #21",
    "category": "Sides & Breads",
    "description": "Delicious authentic spanish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 519.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 622,
    "restaurantId": 21,
    "itemName": "Tapia Signature Dish #22",
    "category": "Sides & Breads",
    "description": "Delicious authentic spanish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 534.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 623,
    "restaurantId": 21,
    "itemName": "Tapia Signature Dish #23",
    "category": "Sides & Breads",
    "description": "Delicious authentic spanish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 549.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 624,
    "restaurantId": 21,
    "itemName": "Tapia Signature Dish #24",
    "category": "Sides & Breads",
    "description": "Delicious authentic spanish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 564.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 625,
    "restaurantId": 21,
    "itemName": "Tapia Signature Dish #25",
    "category": "Dessert",
    "description": "Delicious authentic spanish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 579.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 626,
    "restaurantId": 21,
    "itemName": "Tapia Signature Dish #26",
    "category": "Dessert",
    "description": "Delicious authentic spanish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 594.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 627,
    "restaurantId": 21,
    "itemName": "Tapia Signature Dish #27",
    "category": "Dessert",
    "description": "Delicious authentic spanish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 609.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 628,
    "restaurantId": 21,
    "itemName": "Tapia Signature Dish #28",
    "category": "Beverages",
    "description": "Delicious authentic spanish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 624.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 629,
    "restaurantId": 21,
    "itemName": "Tapia Signature Dish #29",
    "category": "Beverages",
    "description": "Delicious authentic spanish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 639.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 630,
    "restaurantId": 21,
    "itemName": "Tapia Signature Dish #30",
    "category": "Beverages",
    "description": "Delicious authentic spanish creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 654.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 631,
    "restaurantId": 22,
    "itemName": "Gelato Signature Dish #1",
    "category": "Starters",
    "description": "Delicious authentic ice cream creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 224.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 632,
    "restaurantId": 22,
    "itemName": "Gelato Signature Dish #2",
    "category": "Starters",
    "description": "Delicious authentic ice cream creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 239.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 633,
    "restaurantId": 22,
    "itemName": "Gelato Signature Dish #3",
    "category": "Starters",
    "description": "Delicious authentic ice cream creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 254.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 634,
    "restaurantId": 22,
    "itemName": "Gelato Signature Dish #4",
    "category": "Starters",
    "description": "Delicious authentic ice cream creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 269.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 635,
    "restaurantId": 22,
    "itemName": "Gelato Signature Dish #5",
    "category": "Starters",
    "description": "Delicious authentic ice cream creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 284.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 636,
    "restaurantId": 22,
    "itemName": "Gelato Signature Dish #6",
    "category": "Main Course",
    "description": "Delicious authentic ice cream creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 299.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 637,
    "restaurantId": 22,
    "itemName": "Gelato Signature Dish #7",
    "category": "Main Course",
    "description": "Delicious authentic ice cream creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 314.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 638,
    "restaurantId": 22,
    "itemName": "Gelato Signature Dish #8",
    "category": "Main Course",
    "description": "Delicious authentic ice cream creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 329.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 639,
    "restaurantId": 22,
    "itemName": "Gelato Signature Dish #9",
    "category": "Main Course",
    "description": "Delicious authentic ice cream creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 344.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 640,
    "restaurantId": 22,
    "itemName": "Gelato Signature Dish #10",
    "category": "Main Course",
    "description": "Delicious authentic ice cream creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 359.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 641,
    "restaurantId": 22,
    "itemName": "Gelato Signature Dish #11",
    "category": "Main Course",
    "description": "Delicious authentic ice cream creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 374.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 642,
    "restaurantId": 22,
    "itemName": "Gelato Signature Dish #12",
    "category": "Main Course",
    "description": "Delicious authentic ice cream creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 389.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1624371414361-e670ef488916?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 643,
    "restaurantId": 22,
    "itemName": "Gelato Signature Dish #13",
    "category": "Specialties",
    "description": "Delicious authentic ice cream creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 404.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 644,
    "restaurantId": 22,
    "itemName": "Gelato Signature Dish #14",
    "category": "Specialties",
    "description": "Delicious authentic ice cream creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 419.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 645,
    "restaurantId": 22,
    "itemName": "Gelato Signature Dish #15",
    "category": "Specialties",
    "description": "Delicious authentic ice cream creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 434.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 646,
    "restaurantId": 22,
    "itemName": "Gelato Signature Dish #16",
    "category": "Specialties",
    "description": "Delicious authentic ice cream creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 449.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 647,
    "restaurantId": 22,
    "itemName": "Gelato Signature Dish #17",
    "category": "Specialties",
    "description": "Delicious authentic ice cream creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 464.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 648,
    "restaurantId": 22,
    "itemName": "Gelato Signature Dish #18",
    "category": "Specialties",
    "description": "Delicious authentic ice cream creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 479.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 649,
    "restaurantId": 22,
    "itemName": "Gelato Signature Dish #19",
    "category": "Sides & Breads",
    "description": "Delicious authentic ice cream creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 494.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 650,
    "restaurantId": 22,
    "itemName": "Gelato Signature Dish #20",
    "category": "Sides & Breads",
    "description": "Delicious authentic ice cream creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 509.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 651,
    "restaurantId": 22,
    "itemName": "Gelato Signature Dish #21",
    "category": "Sides & Breads",
    "description": "Delicious authentic ice cream creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 524.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 652,
    "restaurantId": 22,
    "itemName": "Gelato Signature Dish #22",
    "category": "Sides & Breads",
    "description": "Delicious authentic ice cream creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 539.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 653,
    "restaurantId": 22,
    "itemName": "Gelato Signature Dish #23",
    "category": "Sides & Breads",
    "description": "Delicious authentic ice cream creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 554.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 654,
    "restaurantId": 22,
    "itemName": "Gelato Signature Dish #24",
    "category": "Sides & Breads",
    "description": "Delicious authentic ice cream creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 569.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 655,
    "restaurantId": 22,
    "itemName": "Gelato Signature Dish #25",
    "category": "Dessert",
    "description": "Delicious authentic ice cream creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 584.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 656,
    "restaurantId": 22,
    "itemName": "Gelato Signature Dish #26",
    "category": "Dessert",
    "description": "Delicious authentic ice cream creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 599.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 657,
    "restaurantId": 22,
    "itemName": "Gelato Signature Dish #27",
    "category": "Dessert",
    "description": "Delicious authentic ice cream creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 614.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 658,
    "restaurantId": 22,
    "itemName": "Gelato Signature Dish #28",
    "category": "Beverages",
    "description": "Delicious authentic ice cream creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 629.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 659,
    "restaurantId": 22,
    "itemName": "Gelato Signature Dish #29",
    "category": "Beverages",
    "description": "Delicious authentic ice cream creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 644.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 660,
    "restaurantId": 22,
    "itemName": "Gelato Signature Dish #30",
    "category": "Beverages",
    "description": "Delicious authentic ice cream creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 659.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1502301103665-0b95cc738daf?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 661,
    "restaurantId": 23,
    "itemName": "Juice Signature Dish #1",
    "category": "Starters",
    "description": "Delicious authentic juices & beverages creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 229.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1533777857889-4be7c70b31f8?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 662,
    "restaurantId": 23,
    "itemName": "Juice Signature Dish #2",
    "category": "Starters",
    "description": "Delicious authentic juices & beverages creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 244.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1515443961218-a51367888e4b?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 663,
    "restaurantId": 23,
    "itemName": "Juice Signature Dish #3",
    "category": "Starters",
    "description": "Delicious authentic juices & beverages creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 259.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 664,
    "restaurantId": 23,
    "itemName": "Juice Signature Dish #4",
    "category": "Starters",
    "description": "Delicious authentic juices & beverages creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 274.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 665,
    "restaurantId": 23,
    "itemName": "Juice Signature Dish #5",
    "category": "Starters",
    "description": "Delicious authentic juices & beverages creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 289.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 666,
    "restaurantId": 23,
    "itemName": "Juice Signature Dish #6",
    "category": "Main Course",
    "description": "Delicious authentic juices & beverages creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 304.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 667,
    "restaurantId": 23,
    "itemName": "Juice Signature Dish #7",
    "category": "Main Course",
    "description": "Delicious authentic juices & beverages creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 319.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 668,
    "restaurantId": 23,
    "itemName": "Juice Signature Dish #8",
    "category": "Main Course",
    "description": "Delicious authentic juices & beverages creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 334.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1621996346565-e3d5d6281288?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 669,
    "restaurantId": 23,
    "itemName": "Juice Signature Dish #9",
    "category": "Main Course",
    "description": "Delicious authentic juices & beverages creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 349.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 670,
    "restaurantId": 23,
    "itemName": "Juice Signature Dish #10",
    "category": "Main Course",
    "description": "Delicious authentic juices & beverages creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 364.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 671,
    "restaurantId": 23,
    "itemName": "Juice Signature Dish #11",
    "category": "Main Course",
    "description": "Delicious authentic juices & beverages creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 379.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 672,
    "restaurantId": 23,
    "itemName": "Juice Signature Dish #12",
    "category": "Main Course",
    "description": "Delicious authentic juices & beverages creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 394.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1531749668029-2db88e4276c7?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 673,
    "restaurantId": 23,
    "itemName": "Juice Signature Dish #13",
    "category": "Specialties",
    "description": "Delicious authentic juices & beverages creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 409.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 674,
    "restaurantId": 23,
    "itemName": "Juice Signature Dish #14",
    "category": "Specialties",
    "description": "Delicious authentic juices & beverages creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 424.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 675,
    "restaurantId": 23,
    "itemName": "Juice Signature Dish #15",
    "category": "Specialties",
    "description": "Delicious authentic juices & beverages creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 439.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 676,
    "restaurantId": 23,
    "itemName": "Juice Signature Dish #16",
    "category": "Specialties",
    "description": "Delicious authentic juices & beverages creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 454.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1592417817098-8f3d69115b82?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 677,
    "restaurantId": 23,
    "itemName": "Juice Signature Dish #17",
    "category": "Specialties",
    "description": "Delicious authentic juices & beverages creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 469.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 678,
    "restaurantId": 23,
    "itemName": "Juice Signature Dish #18",
    "category": "Specialties",
    "description": "Delicious authentic juices & beverages creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 484.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 679,
    "restaurantId": 23,
    "itemName": "Juice Signature Dish #19",
    "category": "Sides & Breads",
    "description": "Delicious authentic juices & beverages creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 499.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 680,
    "restaurantId": 23,
    "itemName": "Juice Signature Dish #20",
    "category": "Sides & Breads",
    "description": "Delicious authentic juices & beverages creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 514.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 681,
    "restaurantId": 23,
    "itemName": "Juice Signature Dish #21",
    "category": "Sides & Breads",
    "description": "Delicious authentic juices & beverages creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 529.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 682,
    "restaurantId": 23,
    "itemName": "Juice Signature Dish #22",
    "category": "Sides & Breads",
    "description": "Delicious authentic juices & beverages creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 544.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 683,
    "restaurantId": 23,
    "itemName": "Juice Signature Dish #23",
    "category": "Sides & Breads",
    "description": "Delicious authentic juices & beverages creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 559.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 684,
    "restaurantId": 23,
    "itemName": "Juice Signature Dish #24",
    "category": "Sides & Breads",
    "description": "Delicious authentic juices & beverages creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 574.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 685,
    "restaurantId": 23,
    "itemName": "Juice Signature Dish #25",
    "category": "Dessert",
    "description": "Delicious authentic juices & beverages creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 589.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 686,
    "restaurantId": 23,
    "itemName": "Juice Signature Dish #26",
    "category": "Dessert",
    "description": "Delicious authentic juices & beverages creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 604.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 687,
    "restaurantId": 23,
    "itemName": "Juice Signature Dish #27",
    "category": "Dessert",
    "description": "Delicious authentic juices & beverages creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 619.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1642821373181-696a54913e93?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 688,
    "restaurantId": 23,
    "itemName": "Juice Signature Dish #28",
    "category": "Beverages",
    "description": "Delicious authentic juices & beverages creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 634.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 689,
    "restaurantId": 23,
    "itemName": "Juice Signature Dish #29",
    "category": "Beverages",
    "description": "Delicious authentic juices & beverages creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 649.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 690,
    "restaurantId": 23,
    "itemName": "Juice Signature Dish #30",
    "category": "Beverages",
    "description": "Delicious authentic juices & beverages creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 664.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 691,
    "restaurantId": 24,
    "itemName": "Sunrise Signature Dish #1",
    "category": "Starters",
    "description": "Delicious authentic breakfast creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 234.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 692,
    "restaurantId": 24,
    "itemName": "Sunrise Signature Dish #2",
    "category": "Starters",
    "description": "Delicious authentic breakfast creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 249.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 693,
    "restaurantId": 24,
    "itemName": "Sunrise Signature Dish #3",
    "category": "Starters",
    "description": "Delicious authentic breakfast creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 264.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 694,
    "restaurantId": 24,
    "itemName": "Sunrise Signature Dish #4",
    "category": "Starters",
    "description": "Delicious authentic breakfast creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 279.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 695,
    "restaurantId": 24,
    "itemName": "Sunrise Signature Dish #5",
    "category": "Starters",
    "description": "Delicious authentic breakfast creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 294.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 696,
    "restaurantId": 24,
    "itemName": "Sunrise Signature Dish #6",
    "category": "Main Course",
    "description": "Delicious authentic breakfast creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 309.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 697,
    "restaurantId": 24,
    "itemName": "Sunrise Signature Dish #7",
    "category": "Main Course",
    "description": "Delicious authentic breakfast creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 324.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 698,
    "restaurantId": 24,
    "itemName": "Sunrise Signature Dish #8",
    "category": "Main Course",
    "description": "Delicious authentic breakfast creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 339.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 699,
    "restaurantId": 24,
    "itemName": "Sunrise Signature Dish #9",
    "category": "Main Course",
    "description": "Delicious authentic breakfast creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 354.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1571006682890-a7d186c348ec?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 700,
    "restaurantId": 24,
    "itemName": "Sunrise Signature Dish #10",
    "category": "Main Course",
    "description": "Delicious authentic breakfast creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 369.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 701,
    "restaurantId": 24,
    "itemName": "Sunrise Signature Dish #11",
    "category": "Main Course",
    "description": "Delicious authentic breakfast creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 384.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 702,
    "restaurantId": 24,
    "itemName": "Sunrise Signature Dish #12",
    "category": "Main Course",
    "description": "Delicious authentic breakfast creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 399.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 703,
    "restaurantId": 24,
    "itemName": "Sunrise Signature Dish #13",
    "category": "Specialties",
    "description": "Delicious authentic breakfast creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 414.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 704,
    "restaurantId": 24,
    "itemName": "Sunrise Signature Dish #14",
    "category": "Specialties",
    "description": "Delicious authentic breakfast creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 429.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 705,
    "restaurantId": 24,
    "itemName": "Sunrise Signature Dish #15",
    "category": "Specialties",
    "description": "Delicious authentic breakfast creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 444.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 706,
    "restaurantId": 24,
    "itemName": "Sunrise Signature Dish #16",
    "category": "Specialties",
    "description": "Delicious authentic breakfast creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 459.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 707,
    "restaurantId": 24,
    "itemName": "Sunrise Signature Dish #17",
    "category": "Specialties",
    "description": "Delicious authentic breakfast creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 474.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 708,
    "restaurantId": 24,
    "itemName": "Sunrise Signature Dish #18",
    "category": "Specialties",
    "description": "Delicious authentic breakfast creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 489.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 709,
    "restaurantId": 24,
    "itemName": "Sunrise Signature Dish #19",
    "category": "Sides & Breads",
    "description": "Delicious authentic breakfast creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 504.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 710,
    "restaurantId": 24,
    "itemName": "Sunrise Signature Dish #20",
    "category": "Sides & Breads",
    "description": "Delicious authentic breakfast creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 519.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 711,
    "restaurantId": 24,
    "itemName": "Sunrise Signature Dish #21",
    "category": "Sides & Breads",
    "description": "Delicious authentic breakfast creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 534.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 712,
    "restaurantId": 24,
    "itemName": "Sunrise Signature Dish #22",
    "category": "Sides & Breads",
    "description": "Delicious authentic breakfast creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 549.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 713,
    "restaurantId": 24,
    "itemName": "Sunrise Signature Dish #23",
    "category": "Sides & Breads",
    "description": "Delicious authentic breakfast creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 564.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 714,
    "restaurantId": 24,
    "itemName": "Sunrise Signature Dish #24",
    "category": "Sides & Breads",
    "description": "Delicious authentic breakfast creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 579.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 715,
    "restaurantId": 24,
    "itemName": "Sunrise Signature Dish #25",
    "category": "Dessert",
    "description": "Delicious authentic breakfast creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 594.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 716,
    "restaurantId": 24,
    "itemName": "Sunrise Signature Dish #26",
    "category": "Dessert",
    "description": "Delicious authentic breakfast creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 609.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 717,
    "restaurantId": 24,
    "itemName": "Sunrise Signature Dish #27",
    "category": "Dessert",
    "description": "Delicious authentic breakfast creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 624.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 718,
    "restaurantId": 24,
    "itemName": "Sunrise Signature Dish #28",
    "category": "Beverages",
    "description": "Delicious authentic breakfast creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 639.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 719,
    "restaurantId": 24,
    "itemName": "Sunrise Signature Dish #29",
    "category": "Beverages",
    "description": "Delicious authentic breakfast creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 654.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 720,
    "restaurantId": 24,
    "itemName": "Sunrise Signature Dish #30",
    "category": "Beverages",
    "description": "Delicious authentic breakfast creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 669.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 721,
    "restaurantId": 25,
    "itemName": "Artisan Signature Dish #1",
    "category": "Starters",
    "description": "Delicious authentic pasta creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 239.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 722,
    "restaurantId": 25,
    "itemName": "Artisan Signature Dish #2",
    "category": "Starters",
    "description": "Delicious authentic pasta creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 254.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 723,
    "restaurantId": 25,
    "itemName": "Artisan Signature Dish #3",
    "category": "Starters",
    "description": "Delicious authentic pasta creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 269.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 724,
    "restaurantId": 25,
    "itemName": "Artisan Signature Dish #4",
    "category": "Starters",
    "description": "Delicious authentic pasta creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 284.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 725,
    "restaurantId": 25,
    "itemName": "Artisan Signature Dish #5",
    "category": "Starters",
    "description": "Delicious authentic pasta creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 299.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1624371414361-e670ef488916?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 726,
    "restaurantId": 25,
    "itemName": "Artisan Signature Dish #6",
    "category": "Main Course",
    "description": "Delicious authentic pasta creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 314.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 727,
    "restaurantId": 25,
    "itemName": "Artisan Signature Dish #7",
    "category": "Main Course",
    "description": "Delicious authentic pasta creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 329.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 728,
    "restaurantId": 25,
    "itemName": "Artisan Signature Dish #8",
    "category": "Main Course",
    "description": "Delicious authentic pasta creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 344.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 729,
    "restaurantId": 25,
    "itemName": "Artisan Signature Dish #9",
    "category": "Main Course",
    "description": "Delicious authentic pasta creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 359.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 730,
    "restaurantId": 25,
    "itemName": "Artisan Signature Dish #10",
    "category": "Main Course",
    "description": "Delicious authentic pasta creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 374.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 731,
    "restaurantId": 25,
    "itemName": "Artisan Signature Dish #11",
    "category": "Main Course",
    "description": "Delicious authentic pasta creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 389.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 732,
    "restaurantId": 25,
    "itemName": "Artisan Signature Dish #12",
    "category": "Main Course",
    "description": "Delicious authentic pasta creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 404.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 733,
    "restaurantId": 25,
    "itemName": "Artisan Signature Dish #13",
    "category": "Specialties",
    "description": "Delicious authentic pasta creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 419.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 734,
    "restaurantId": 25,
    "itemName": "Artisan Signature Dish #14",
    "category": "Specialties",
    "description": "Delicious authentic pasta creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 434.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 735,
    "restaurantId": 25,
    "itemName": "Artisan Signature Dish #15",
    "category": "Specialties",
    "description": "Delicious authentic pasta creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 449.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 736,
    "restaurantId": 25,
    "itemName": "Artisan Signature Dish #16",
    "category": "Specialties",
    "description": "Delicious authentic pasta creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 464.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 737,
    "restaurantId": 25,
    "itemName": "Artisan Signature Dish #17",
    "category": "Specialties",
    "description": "Delicious authentic pasta creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 479.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 738,
    "restaurantId": 25,
    "itemName": "Artisan Signature Dish #18",
    "category": "Specialties",
    "description": "Delicious authentic pasta creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 494.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 739,
    "restaurantId": 25,
    "itemName": "Artisan Signature Dish #19",
    "category": "Sides & Breads",
    "description": "Delicious authentic pasta creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 509.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 740,
    "restaurantId": 25,
    "itemName": "Artisan Signature Dish #20",
    "category": "Sides & Breads",
    "description": "Delicious authentic pasta creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 524.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 741,
    "restaurantId": 25,
    "itemName": "Artisan Signature Dish #21",
    "category": "Sides & Breads",
    "description": "Delicious authentic pasta creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 539.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 742,
    "restaurantId": 25,
    "itemName": "Artisan Signature Dish #22",
    "category": "Sides & Breads",
    "description": "Delicious authentic pasta creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 554.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 743,
    "restaurantId": 25,
    "itemName": "Artisan Signature Dish #23",
    "category": "Sides & Breads",
    "description": "Delicious authentic pasta creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 569.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1502301103665-0b95cc738daf?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 744,
    "restaurantId": 25,
    "itemName": "Artisan Signature Dish #24",
    "category": "Sides & Breads",
    "description": "Delicious authentic pasta creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 584.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1533777857889-4be7c70b31f8?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 745,
    "restaurantId": 25,
    "itemName": "Artisan Signature Dish #25",
    "category": "Dessert",
    "description": "Delicious authentic pasta creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 599.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1515443961218-a51367888e4b?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 746,
    "restaurantId": 25,
    "itemName": "Artisan Signature Dish #26",
    "category": "Dessert",
    "description": "Delicious authentic pasta creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 614.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 747,
    "restaurantId": 25,
    "itemName": "Artisan Signature Dish #27",
    "category": "Dessert",
    "description": "Delicious authentic pasta creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 629.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 748,
    "restaurantId": 25,
    "itemName": "Artisan Signature Dish #28",
    "category": "Beverages",
    "description": "Delicious authentic pasta creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 644.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 749,
    "restaurantId": 25,
    "itemName": "Artisan Signature Dish #29",
    "category": "Beverages",
    "description": "Delicious authentic pasta creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 659.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 750,
    "restaurantId": 25,
    "itemName": "Artisan Signature Dish #30",
    "category": "Beverages",
    "description": "Delicious authentic pasta creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 674.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 751,
    "restaurantId": 26,
    "itemName": "Royal Signature Dish #1",
    "category": "Starters",
    "description": "Delicious authentic biryani creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 244.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1621996346565-e3d5d6281288?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 752,
    "restaurantId": 26,
    "itemName": "Royal Signature Dish #2",
    "category": "Starters",
    "description": "Delicious authentic biryani creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 259.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 753,
    "restaurantId": 26,
    "itemName": "Royal Signature Dish #3",
    "category": "Starters",
    "description": "Delicious authentic biryani creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 274.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 754,
    "restaurantId": 26,
    "itemName": "Royal Signature Dish #4",
    "category": "Starters",
    "description": "Delicious authentic biryani creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 289.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 755,
    "restaurantId": 26,
    "itemName": "Royal Signature Dish #5",
    "category": "Starters",
    "description": "Delicious authentic biryani creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 304.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1531749668029-2db88e4276c7?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 756,
    "restaurantId": 26,
    "itemName": "Royal Signature Dish #6",
    "category": "Main Course",
    "description": "Delicious authentic biryani creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 319.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 757,
    "restaurantId": 26,
    "itemName": "Royal Signature Dish #7",
    "category": "Main Course",
    "description": "Delicious authentic biryani creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 334.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 758,
    "restaurantId": 26,
    "itemName": "Royal Signature Dish #8",
    "category": "Main Course",
    "description": "Delicious authentic biryani creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 349.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 759,
    "restaurantId": 26,
    "itemName": "Royal Signature Dish #9",
    "category": "Main Course",
    "description": "Delicious authentic biryani creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 364.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1592417817098-8f3d69115b82?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 760,
    "restaurantId": 26,
    "itemName": "Royal Signature Dish #10",
    "category": "Main Course",
    "description": "Delicious authentic biryani creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 379.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 761,
    "restaurantId": 26,
    "itemName": "Royal Signature Dish #11",
    "category": "Main Course",
    "description": "Delicious authentic biryani creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 394.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 762,
    "restaurantId": 26,
    "itemName": "Royal Signature Dish #12",
    "category": "Main Course",
    "description": "Delicious authentic biryani creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 409.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 763,
    "restaurantId": 26,
    "itemName": "Royal Signature Dish #13",
    "category": "Specialties",
    "description": "Delicious authentic biryani creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 424.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 764,
    "restaurantId": 26,
    "itemName": "Royal Signature Dish #14",
    "category": "Specialties",
    "description": "Delicious authentic biryani creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 439.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 765,
    "restaurantId": 26,
    "itemName": "Royal Signature Dish #15",
    "category": "Specialties",
    "description": "Delicious authentic biryani creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 454.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 766,
    "restaurantId": 26,
    "itemName": "Royal Signature Dish #16",
    "category": "Specialties",
    "description": "Delicious authentic biryani creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 469.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 767,
    "restaurantId": 26,
    "itemName": "Royal Signature Dish #17",
    "category": "Specialties",
    "description": "Delicious authentic biryani creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 484.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 768,
    "restaurantId": 26,
    "itemName": "Royal Signature Dish #18",
    "category": "Specialties",
    "description": "Delicious authentic biryani creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 499.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 769,
    "restaurantId": 26,
    "itemName": "Royal Signature Dish #19",
    "category": "Sides & Breads",
    "description": "Delicious authentic biryani creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 514.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 770,
    "restaurantId": 26,
    "itemName": "Royal Signature Dish #20",
    "category": "Sides & Breads",
    "description": "Delicious authentic biryani creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 529.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1642821373181-696a54913e93?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 771,
    "restaurantId": 26,
    "itemName": "Royal Signature Dish #21",
    "category": "Sides & Breads",
    "description": "Delicious authentic biryani creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 544.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 772,
    "restaurantId": 26,
    "itemName": "Royal Signature Dish #22",
    "category": "Sides & Breads",
    "description": "Delicious authentic biryani creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 559.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 773,
    "restaurantId": 26,
    "itemName": "Royal Signature Dish #23",
    "category": "Sides & Breads",
    "description": "Delicious authentic biryani creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 574.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 774,
    "restaurantId": 26,
    "itemName": "Royal Signature Dish #24",
    "category": "Sides & Breads",
    "description": "Delicious authentic biryani creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 589.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 775,
    "restaurantId": 26,
    "itemName": "Royal Signature Dish #25",
    "category": "Dessert",
    "description": "Delicious authentic biryani creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 604.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 776,
    "restaurantId": 26,
    "itemName": "Royal Signature Dish #26",
    "category": "Dessert",
    "description": "Delicious authentic biryani creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 619.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 777,
    "restaurantId": 26,
    "itemName": "Royal Signature Dish #27",
    "category": "Dessert",
    "description": "Delicious authentic biryani creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 634.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 778,
    "restaurantId": 26,
    "itemName": "Royal Signature Dish #28",
    "category": "Beverages",
    "description": "Delicious authentic biryani creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 649.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 779,
    "restaurantId": 26,
    "itemName": "Royal Signature Dish #29",
    "category": "Beverages",
    "description": "Delicious authentic biryani creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 664.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 780,
    "restaurantId": 26,
    "itemName": "Royal Signature Dish #30",
    "category": "Beverages",
    "description": "Delicious authentic biryani creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 679.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 781,
    "restaurantId": 27,
    "itemName": "Dim Signature Dish #1",
    "category": "Starters",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 249.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 782,
    "restaurantId": 27,
    "itemName": "Dim Signature Dish #2",
    "category": "Starters",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 264.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1571006682890-a7d186c348ec?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 783,
    "restaurantId": 27,
    "itemName": "Dim Signature Dish #3",
    "category": "Starters",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 279.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 784,
    "restaurantId": 27,
    "itemName": "Dim Signature Dish #4",
    "category": "Starters",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 294.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 785,
    "restaurantId": 27,
    "itemName": "Dim Signature Dish #5",
    "category": "Starters",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 309.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 786,
    "restaurantId": 27,
    "itemName": "Dim Signature Dish #6",
    "category": "Main Course",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 324.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 787,
    "restaurantId": 27,
    "itemName": "Dim Signature Dish #7",
    "category": "Main Course",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 339.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 788,
    "restaurantId": 27,
    "itemName": "Dim Signature Dish #8",
    "category": "Main Course",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 354.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 789,
    "restaurantId": 27,
    "itemName": "Dim Signature Dish #9",
    "category": "Main Course",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 369.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 790,
    "restaurantId": 27,
    "itemName": "Dim Signature Dish #10",
    "category": "Main Course",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 384.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 791,
    "restaurantId": 27,
    "itemName": "Dim Signature Dish #11",
    "category": "Main Course",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 399.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 792,
    "restaurantId": 27,
    "itemName": "Dim Signature Dish #12",
    "category": "Main Course",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 414.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 793,
    "restaurantId": 27,
    "itemName": "Dim Signature Dish #13",
    "category": "Specialties",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 429.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 794,
    "restaurantId": 27,
    "itemName": "Dim Signature Dish #14",
    "category": "Specialties",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 444.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 795,
    "restaurantId": 27,
    "itemName": "Dim Signature Dish #15",
    "category": "Specialties",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 459.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 796,
    "restaurantId": 27,
    "itemName": "Dim Signature Dish #16",
    "category": "Specialties",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 474.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 797,
    "restaurantId": 27,
    "itemName": "Dim Signature Dish #17",
    "category": "Specialties",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 489.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 798,
    "restaurantId": 27,
    "itemName": "Dim Signature Dish #18",
    "category": "Specialties",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 504.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 799,
    "restaurantId": 27,
    "itemName": "Dim Signature Dish #19",
    "category": "Sides & Breads",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 519.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 800,
    "restaurantId": 27,
    "itemName": "Dim Signature Dish #20",
    "category": "Sides & Breads",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 534.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 801,
    "restaurantId": 27,
    "itemName": "Dim Signature Dish #21",
    "category": "Sides & Breads",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 549.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 802,
    "restaurantId": 27,
    "itemName": "Dim Signature Dish #22",
    "category": "Sides & Breads",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 564.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 803,
    "restaurantId": 27,
    "itemName": "Dim Signature Dish #23",
    "category": "Sides & Breads",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 579.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 804,
    "restaurantId": 27,
    "itemName": "Dim Signature Dish #24",
    "category": "Sides & Breads",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 594.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 805,
    "restaurantId": 27,
    "itemName": "Dim Signature Dish #25",
    "category": "Dessert",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 609.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 806,
    "restaurantId": 27,
    "itemName": "Dim Signature Dish #26",
    "category": "Dessert",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 624.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 807,
    "restaurantId": 27,
    "itemName": "Dim Signature Dish #27",
    "category": "Dessert",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 639.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 808,
    "restaurantId": 27,
    "itemName": "Dim Signature Dish #28",
    "category": "Beverages",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 654.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1624371414361-e670ef488916?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 809,
    "restaurantId": 27,
    "itemName": "Dim Signature Dish #29",
    "category": "Beverages",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 669.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 810,
    "restaurantId": 27,
    "itemName": "Dim Signature Dish #30",
    "category": "Beverages",
    "description": "Delicious authentic chinese creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 684.0,
    "isAvailable": 1,
    "isVeg": 0,
    "image": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 811,
    "restaurantId": 28,
    "itemName": "Vegan Signature Dish #1",
    "category": "Starters",
    "description": "Delicious authentic vegan creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 254.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 812,
    "restaurantId": 28,
    "itemName": "Vegan Signature Dish #2",
    "category": "Starters",
    "description": "Delicious authentic vegan creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 269.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 813,
    "restaurantId": 28,
    "itemName": "Vegan Signature Dish #3",
    "category": "Starters",
    "description": "Delicious authentic vegan creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 284.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 814,
    "restaurantId": 28,
    "itemName": "Vegan Signature Dish #4",
    "category": "Starters",
    "description": "Delicious authentic vegan creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 299.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 815,
    "restaurantId": 28,
    "itemName": "Vegan Signature Dish #5",
    "category": "Starters",
    "description": "Delicious authentic vegan creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 314.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 816,
    "restaurantId": 28,
    "itemName": "Vegan Signature Dish #6",
    "category": "Main Course",
    "description": "Delicious authentic vegan creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 329.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 817,
    "restaurantId": 28,
    "itemName": "Vegan Signature Dish #7",
    "category": "Main Course",
    "description": "Delicious authentic vegan creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 344.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 818,
    "restaurantId": 28,
    "itemName": "Vegan Signature Dish #8",
    "category": "Main Course",
    "description": "Delicious authentic vegan creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 359.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 819,
    "restaurantId": 28,
    "itemName": "Vegan Signature Dish #9",
    "category": "Main Course",
    "description": "Delicious authentic vegan creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 374.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 820,
    "restaurantId": 28,
    "itemName": "Vegan Signature Dish #10",
    "category": "Main Course",
    "description": "Delicious authentic vegan creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 389.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 821,
    "restaurantId": 28,
    "itemName": "Vegan Signature Dish #11",
    "category": "Main Course",
    "description": "Delicious authentic vegan creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 404.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 822,
    "restaurantId": 28,
    "itemName": "Vegan Signature Dish #12",
    "category": "Main Course",
    "description": "Delicious authentic vegan creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 419.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 823,
    "restaurantId": 28,
    "itemName": "Vegan Signature Dish #13",
    "category": "Specialties",
    "description": "Delicious authentic vegan creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 434.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 824,
    "restaurantId": 28,
    "itemName": "Vegan Signature Dish #14",
    "category": "Specialties",
    "description": "Delicious authentic vegan creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 449.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 825,
    "restaurantId": 28,
    "itemName": "Vegan Signature Dish #15",
    "category": "Specialties",
    "description": "Delicious authentic vegan creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 464.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 826,
    "restaurantId": 28,
    "itemName": "Vegan Signature Dish #16",
    "category": "Specialties",
    "description": "Delicious authentic vegan creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 479.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1502301103665-0b95cc738daf?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 827,
    "restaurantId": 28,
    "itemName": "Vegan Signature Dish #17",
    "category": "Specialties",
    "description": "Delicious authentic vegan creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 494.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1533777857889-4be7c70b31f8?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 828,
    "restaurantId": 28,
    "itemName": "Vegan Signature Dish #18",
    "category": "Specialties",
    "description": "Delicious authentic vegan creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 509.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1515443961218-a51367888e4b?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 829,
    "restaurantId": 28,
    "itemName": "Vegan Signature Dish #19",
    "category": "Sides & Breads",
    "description": "Delicious authentic vegan creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 524.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 830,
    "restaurantId": 28,
    "itemName": "Vegan Signature Dish #20",
    "category": "Sides & Breads",
    "description": "Delicious authentic vegan creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 539.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 831,
    "restaurantId": 28,
    "itemName": "Vegan Signature Dish #21",
    "category": "Sides & Breads",
    "description": "Delicious authentic vegan creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 554.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 832,
    "restaurantId": 28,
    "itemName": "Vegan Signature Dish #22",
    "category": "Sides & Breads",
    "description": "Delicious authentic vegan creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 569.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 833,
    "restaurantId": 28,
    "itemName": "Vegan Signature Dish #23",
    "category": "Sides & Breads",
    "description": "Delicious authentic vegan creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 584.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 834,
    "restaurantId": 28,
    "itemName": "Vegan Signature Dish #24",
    "category": "Sides & Breads",
    "description": "Delicious authentic vegan creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 599.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1621996346565-e3d5d6281288?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 835,
    "restaurantId": 28,
    "itemName": "Vegan Signature Dish #25",
    "category": "Dessert",
    "description": "Delicious authentic vegan creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 614.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 836,
    "restaurantId": 28,
    "itemName": "Vegan Signature Dish #26",
    "category": "Dessert",
    "description": "Delicious authentic vegan creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 629.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 837,
    "restaurantId": 28,
    "itemName": "Vegan Signature Dish #27",
    "category": "Dessert",
    "description": "Delicious authentic vegan creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 644.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 838,
    "restaurantId": 28,
    "itemName": "Vegan Signature Dish #28",
    "category": "Beverages",
    "description": "Delicious authentic vegan creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 659.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1531749668029-2db88e4276c7?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 839,
    "restaurantId": 28,
    "itemName": "Vegan Signature Dish #29",
    "category": "Beverages",
    "description": "Delicious authentic vegan creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 674.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80"
  },
  {
    "menuId": 840,
    "restaurantId": 28,
    "itemName": "Vegan Signature Dish #30",
    "category": "Beverages",
    "description": "Delicious authentic vegan creation cooked with fresh hand-picked ingredients and aromatic chef spices",
    "price": 689.0,
    "isAvailable": 1,
    "isVeg": 1,
    "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80"
  }
];

const DEFAULT_ORDERS = [
  {
    orderId: 101,
    restaurantName: 'Trattoria Bella',
    totalAmount: 38.99,
    status: 'Preparing',
    paymentMethod: 'UPI',
    createdAt: 'Today, 7:30 PM',
    deliveryAddress: 'Gandhi Nagar, Mangalore',
    items: [
      { itemName: 'Truffle Mushroom Pasta', quantity: 1, price: 14.99 },
      { itemName: 'Margherita Gourmet Pizza', quantity: 1, price: 16.50 },
      { itemName: 'Classic Tiramisu', quantity: 1, price: 7.50 }
    ]
  },
  {
    orderId: 102,
    restaurantName: 'Spice Route Express',
    totalAmount: 29.99,
    status: 'Out for Delivery',
    paymentMethod: 'COD',
    createdAt: 'Today, 8:15 PM',
    deliveryAddress: 'Gandhi Nagar, Mangalore',
    items: [
      { itemName: 'Butter Chicken Royale', quantity: 1, price: 13.99 },
      { itemName: 'Paneer Tikka Masala', quantity: 1, price: 12.50 },
      { itemName: 'Garlic Butter Naan', quantity: 1, price: 3.50 }
    ]
  }
];

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [restaurants, setRestaurants] = useState(DEFAULT_RESTAURANTS);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [dietFilter, setDietFilter] = useState('ALL');
  const [menuItems, setMenuItems] = useState([]);
  
  const [cart, setCart] = useState({ restaurantId: null, restaurantName: '', items: [] });
  const [checkoutTotals, setCheckoutTotals] = useState(null);
  const [orders, setOrders] = useState([]);

  const [currentView, setCurrentView] = useState('explore');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('feastflow_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [currentUser]);

  // Live real-time polling every 3 seconds for order status updates from MySQL DB
  useEffect(() => {
    const interval = setInterval(() => {
      fetchOrders();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentUser]);

  const fetchRestaurants = async () => {
    try {
      const res = await fetch(`${API_BASE}/restaurants`);
      const contentType = res.headers.get('content-type') || '';
      if (res.ok && contentType.includes('application/json')) {
        const data = await res.json();
        setRestaurants(data && data.length > 0 ? data : DEFAULT_RESTAURANTS);
      } else {
        setRestaurants(DEFAULT_RESTAURANTS);
      }
    } catch (err) {
      setRestaurants(DEFAULT_RESTAURANTS);
    }
  };

  const fetchMenu = async (restaurantId) => {
    try {
      const res = await fetch(`${API_BASE}/menu?restaurant_id=${restaurantId}`);
      const contentType = res.headers.get('content-type') || '';
      if (res.ok && contentType.includes('application/json')) {
        const data = await res.json();
        setMenuItems(data && data.length > 0 ? data : DEFAULT_MENU_ITEMS.filter(m => m.restaurantId === restaurantId));
      } else {
        setMenuItems(DEFAULT_MENU_ITEMS.filter(m => m.restaurantId === restaurantId));
      }
    } catch (err) {
      setMenuItems(DEFAULT_MENU_ITEMS.filter(m => m.restaurantId === restaurantId));
    }
  };

  const fetchOrders = async () => {
    if (!currentUser && currentView !== 'admin') {
      setOrders([]);
      return;
    }

    try {
      const url = (currentUser && currentUser.userId)
        ? `${API_BASE}/orders?user_id=${currentUser.userId}`
        : `${API_BASE}/orders`;
      const res = await fetch(url);
      const contentType = res.headers.get('content-type') || '';
      if (res.ok && contentType.includes('application/json')) {
        const data = await res.json();
        setOrders(data || []);
      } else {
        const savedOrders = JSON.parse(localStorage.getItem('feastflow_orders')) || DEFAULT_ORDERS;
        if (currentUser && currentUser.role === 'CUSTOMER') {
          setOrders(savedOrders.filter(o => (o.userId === currentUser.userId || o.user_id === currentUser.userId)));
        } else {
          setOrders(savedOrders);
        }
      }
    } catch (err) {
      const savedOrders = JSON.parse(localStorage.getItem('feastflow_orders')) || DEFAULT_ORDERS;
      if (currentUser && currentUser.role === 'CUSTOMER') {
        setOrders(savedOrders.filter(o => (o.userId === currentUser.userId || o.user_id === currentUser.userId)));
      } else {
        setOrders(savedOrders);
      }
    }
  };

  const handleSelectRestaurant = (rest) => {
    setSelectedRestaurant(rest);
    fetchMenu(rest.restaurantId);
  };

  const handleAddToCart = (item, rest, delta) => {
    setCart(prevCart => {
      if (prevCart.restaurantId && prevCart.restaurantId !== rest.restaurantId) {
        if (!window.confirm(`Your cart contains items from ${prevCart.restaurantName}. Create a new order from ${rest.restaurantName}?`)) {
          return prevCart;
        }
        return {
          restaurantId: rest.restaurantId,
          restaurantName: rest.restaurantName,
          items: [{ ...item, quantity: 1 }]
        };
      }

      const existingIndex = prevCart.items.findIndex(i => i.menuId === item.menuId);
      let newItems = [...prevCart.items];

      if (existingIndex >= 0) {
        const updatedQty = newItems[existingIndex].quantity + delta;
        if (updatedQty <= 0) {
          newItems.splice(existingIndex, 1);
        } else {
          newItems[existingIndex].quantity = updatedQty;
        }
      } else if (delta > 0) {
        newItems.push({ ...item, quantity: 1 });
      }

      return {
        restaurantId: newItems.length > 0 ? rest.restaurantId : null,
        restaurantName: newItems.length > 0 ? rest.restaurantName : '',
        items: newItems
      };
    });
  };

  const handleUpdateCartQuantity = (menuId, delta) => {
    setCart(prev => {
      const newItems = prev.items.map(item => {
        if (item.menuId === menuId) {
          const qty = item.quantity + delta;
          return qty > 0 ? { ...item, quantity: qty } : null;
        }
        return item;
      }).filter(Boolean);

      return {
        ...prev,
        items: newItems,
        restaurantId: newItems.length > 0 ? prev.restaurantId : null,
        restaurantName: newItems.length > 0 ? prev.restaurantName : ''
      };
    });
  };

  const handleClearCart = () => {
    setCart({ restaurantId: null, restaurantName: '', items: [] });
  };

  const handleProceedToCheckout = (totals) => {
    setCheckoutTotals(totals);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handlePlaceOrder = async (orderPayload) => {
    try {
      const res = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });
      const contentType = res.headers.get('content-type') || '';
      if (res.ok && contentType.includes('application/json')) {
        const data = await res.json();
      }
    } catch (err) {
      console.warn('Backend order API unavailable, saving order locally:', err);
    }

    const newOrder = {
      orderId: Date.now(),
      restaurantName: cart.restaurantName || 'Restaurant',
      totalAmount: checkoutTotals ? checkoutTotals.grandTotal : 25.00,
      status: 'Preparing',
      paymentMethod: orderPayload.paymentMethod || 'UPI',
      createdAt: 'Just Now',
      deliveryAddress: currentUser ? currentUser.address : 'Mangalore',
      items: cart.items.map(i => ({ itemName: i.itemName, quantity: i.quantity, price: i.price }))
    };

    let savedOrders = JSON.parse(localStorage.getItem('feastflow_orders')) || DEFAULT_ORDERS;
    savedOrders.unshift(newOrder);
    localStorage.setItem('feastflow_orders', JSON.stringify(savedOrders));
    setOrders(savedOrders);

    setIsCheckoutOpen(false);
    handleClearCart();
    setCurrentView('orders');
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`${API_BASE}/orders`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_id: orderId, status: newStatus })
      });
      if (res.ok) fetchOrders();
    } catch (err) {
      console.warn('Updating local status fallback:', err);
    }

    let savedOrders = JSON.parse(localStorage.getItem('feastflow_orders')) || DEFAULT_ORDERS;
    savedOrders = savedOrders.map(o => o.orderId === orderId ? { ...o, status: newStatus } : o);
    localStorage.setItem('feastflow_orders', JSON.stringify(savedOrders));
    setOrders(savedOrders);
  };

  const handleLogin = async (email, password) => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const contentType = res.headers.get('content-type') || '';
      if (res.ok && contentType.includes('application/json')) {
        const data = await res.json();
        if (data.success) {
          setCurrentUser(data.user);
          localStorage.setItem('feastflow_user', JSON.stringify(data.user));
          setIsAuthOpen(false);
          fetchOrders();
          return { success: true };
        }
      }
    } catch (err) {
      console.warn('Backend login API unavailable, using local authentication:', err);
    }

    const nameFromEmail = email.split('@')[0].replace(/[^a-zA-Z]/g, ' ');
    const formattedName = (nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1)).trim() || 'User Account';
    const userObj = {
      userId: Date.now(),
      fullName: formattedName,
      email: email,
      role: 'CUSTOMER',
      phone: '9876543210',
      address: 'Gandhi Nagar, Mangalore'
    };
    setCurrentUser(userObj);
    localStorage.setItem('feastflow_user', JSON.stringify(userObj));
    setIsAuthOpen(false);
    return { success: true };
  };

  const handleRegister = async (userData) => {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const contentType = res.headers.get('content-type') || '';
      if (res.ok && contentType.includes('application/json')) {
        const data = await res.json();
        if (data.success) {
          setCurrentUser(data.user);
          localStorage.setItem('feastflow_user', JSON.stringify(data.user));
          setIsAuthOpen(false);
          return { success: true };
        }
      }
    } catch (err) {
      console.warn('Backend registration API unavailable, creating local user account:', err);
    }

    const userObj = {
      userId: Date.now(),
      fullName: userData.fullName || 'New Customer',
      email: userData.email,
      role: 'CUSTOMER',
      phone: userData.phone || '9876543210',
      address: userData.address || 'Mangalore'
    };
    setCurrentUser(userObj);
    localStorage.setItem('feastflow_user', JSON.stringify(userObj));
    setIsAuthOpen(false);
    return { success: true };
  };

  const filteredRestaurants = restaurants.filter(r => {
    const cuisineLower = (r.cuisine || '').toLowerCase();
    const activeLower = activeCategory.toLowerCase();

    const matchesCategory = activeCategory === 'All' || 
      cuisineLower.includes(activeLower) ||
      (activeCategory === 'Biryani' && (cuisineLower.includes('biryani') || cuisineLower.includes('indian'))) ||
      (activeCategory === 'Pizza' && (cuisineLower.includes('pizza') || cuisineLower.includes('italian'))) ||
      (activeCategory === 'Pasta' && (cuisineLower.includes('pasta') || cuisineLower.includes('italian'))) ||
      (activeCategory === 'Burgers' && (cuisineLower.includes('burger') || cuisineLower.includes('fast'))) ||
      (activeCategory === 'Ice Cream' && (cuisineLower.includes('ice cream') || cuisineLower.includes('dessert'))) ||
      (activeCategory === 'Juices & Beverages' && (cuisineLower.includes('juice') || cuisineLower.includes('beverage'))) ||
      (activeCategory === 'Breakfast' && (cuisineLower.includes('breakfast') || cuisineLower.includes('diner'))) ||
      (activeCategory === 'Vegan' && (cuisineLower.includes('vegan') || cuisineLower.includes('healthy')));

    const matchesDiet = dietFilter === 'ALL' || 
      (dietFilter === 'VEG' && (cuisineLower.includes('healthy') || cuisineLower.includes('vegan') || cuisineLower.includes('dessert') || cuisineLower.includes('ice cream') || cuisineLower.includes('juice') || cuisineLower.includes('breakfast') || cuisineLower.includes('street') || cuisineLower.includes('indian'))) ||
      (dietFilter === 'NON_VEG' && !cuisineLower.includes('vegan'));

    const matchesSearch = searchTerm === '' || 
      (r.restaurantName && r.restaurantName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (r.cuisine && r.cuisine.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCategory && matchesDiet && matchesSearch;
  });

  const cartCount = cart.items.reduce((sum, i) => sum + i.quantity, 0);

  const handleGoogleLogin = async (googleUser) => {
    const userObj = {
      userId: Math.floor(100 + Math.random() * 900),
      fullName: googleUser.fullName || 'Google User',
      email: googleUser.email,
      role: 'CUSTOMER',
      picture: googleUser.picture,
      phone: '9876543210',
      address: 'Bengaluru'
    };
    setCurrentUser(userObj);
    localStorage.setItem('feastflow_user', JSON.stringify(userObj));
    setIsAuthOpen(false);
    return { success: true };
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Navigation Header */}
      <Navbar 
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        currentView={currentView}
        setCurrentView={(view) => { setSelectedRestaurant(null); setCurrentView(view); }}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Body */}
      <main className="container" style={{ flex: 1, padding: '24px 20px' }}>
        
        {currentView === 'explore' && (
          <>
            {selectedRestaurant ? (
              <RestaurantDetail 
                restaurant={selectedRestaurant}
                menuItems={menuItems}
                onBack={() => setSelectedRestaurant(null)}
                onAddToCart={handleAddToCart}
                cartItems={cart.items}
              />
            ) : (
              <div className="animate-fade-in">
                <HeroSection onExploreClick={() => {}} />

                <CategoryFilter 
                  activeCategory={activeCategory}
                  onSelectCategory={setActiveCategory}
                  dietFilter={dietFilter}
                  onSelectDiet={setDietFilter}
                />

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.5px' }}>
                    Featured Restaurants ({filteredRestaurants.length})
                  </h2>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                  gap: '24px'
                }}>
                  {filteredRestaurants.map(rest => (
                    <RestaurantCard 
                      key={rest.restaurantId}
                      restaurant={rest}
                      onClick={handleSelectRestaurant}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {currentView === 'orders' && (
          <OrderTracker 
            orders={orders}
            onRefreshOrders={fetchOrders}
          />
        )}

        {currentView === 'admin' && (
          <AdminDashboard 
            orders={orders}
            onUpdateStatus={handleUpdateOrderStatus}
            onRefresh={fetchOrders}
          />
        )}

      </main>

      {/* Modals & Slideouts */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={handleUpdateCartQuantity}
        clearCart={handleClearCart}
        onProceedToCheckout={handleProceedToCheckout}
      />

      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        totals={checkoutTotals || { grandTotal: 0 }}
        currentUser={currentUser}
        onPlaceOrder={handlePlaceOrder}
      />

      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={currentUser}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onLogout={() => { setCurrentUser(null); setIsAuthOpen(false); }}
        onGoogleLogin={handleGoogleLogin}
      />

    </div>
  );
}
