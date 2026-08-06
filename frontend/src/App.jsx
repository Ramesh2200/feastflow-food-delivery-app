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
    restaurantId: 1,
    restaurantName: 'Trattoria Bella',
    cuisine: 'Italian',
    deliveryTime: 25,
    address: '12 Olive Garden Lane',
    rating: 4.8,
    imagePath: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'
  },
  {
    restaurantId: 2,
    restaurantName: 'Spice Route Express',
    cuisine: 'Indian',
    deliveryTime: 30,
    address: '45 Curry Hill St',
    rating: 4.7,
    imagePath: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80'
  },
  {
    restaurantId: 3,
    restaurantName: 'Dragon Wok House',
    cuisine: 'Asian',
    deliveryTime: 20,
    address: '88 Silk Road Ave',
    rating: 4.6,
    imagePath: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80'
  },
  {
    restaurantId: 4,
    restaurantName: 'Burger Craft & Brewery',
    cuisine: 'Burgers',
    deliveryTime: 20,
    address: '77 Main Street',
    rating: 4.9,
    imagePath: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80'
  },
  {
    restaurantId: 5,
    restaurantName: 'Green Bowl Botanica',
    cuisine: 'Healthy',
    deliveryTime: 15,
    address: '102 Wellness Way',
    rating: 4.5,
    imagePath: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80'
  },
  {
    restaurantId: 6,
    restaurantName: 'Sweet Dreams Bakery',
    cuisine: 'Desserts',
    deliveryTime: 25,
    address: '15 Baker Street',
    rating: 4.8,
    imagePath: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80'
  }
];

const DEFAULT_MENU_ITEMS = [
  { menuId: 1, restaurantId: 1, itemName: 'Truffle Mushroom Pasta', category: 'Pasta', description: 'Fresh fettuccine with wild forest mushrooms, black truffle cream, and aged parmesan', price: 14.99, isAvailable: 1, isVeg: 1, imagePath: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=600&q=80' },
  { menuId: 2, restaurantId: 1, itemName: 'Margherita Gourmet Pizza', category: 'Pizza', description: 'Wood-fired sourdough with San Marzano tomatoes, buffalo mozzarella, fresh basil', price: 16.50, isAvailable: 1, isVeg: 1, imagePath: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80' },
  { menuId: 3, restaurantId: 1, itemName: 'Classic Tiramisu', category: 'Dessert', description: 'Espresso-soaked ladyfingers with whipped mascarpone cream and cocoa dusting', price: 7.50, isAvailable: 1, isVeg: 1, imagePath: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80' },
  { menuId: 4, restaurantId: 2, itemName: 'Butter Chicken Royale', category: 'Main Course', description: 'Tender tandoori chicken simmered in rich tomato butter gravy with aromatic spices', price: 13.99, isAvailable: 1, isVeg: 0, imagePath: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80' },
  { menuId: 5, restaurantId: 2, itemName: 'Paneer Tikka Masala', category: 'Main Course', description: 'Char-grilled cottage cheese cubes cooked in spicy spiced onion gravy', price: 12.50, isAvailable: 1, isVeg: 1, imagePath: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80' },
  { menuId: 6, restaurantId: 2, itemName: 'Garlic Butter Naan', category: 'Breads', description: 'Freshly baked tandoori sourdough flatbread brushed with garlic butter', price: 3.50, isAvailable: 1, isVeg: 1, imagePath: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=600&q=80' },
  { menuId: 7, restaurantId: 3, itemName: 'Kung Pao Chicken Bowls', category: 'Main Course', description: 'Sichuan wok-fried chicken with crunchy peanuts, chili pods, and scallions', price: 12.99, isAvailable: 1, isVeg: 0, imagePath: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80' },
  { menuId: 8, restaurantId: 3, itemName: 'Dim Sum Steamed Basket', category: 'Appetizers', description: 'Assorted vegetable & mushroom crystal dumplings served with spicy soy chili oil', price: 9.50, isAvailable: 1, isVeg: 1, imagePath: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=600&q=80' },
  { menuId: 9, restaurantId: 3, itemName: 'Pad Thai Noodles', category: 'Noodles', description: 'Classic rice noodles wok-tossed with tofu, bean sprouts, roasted peanuts, and tamarind sauce', price: 11.99, isAvailable: 1, isVeg: 1, imagePath: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=600&q=80' },
  { menuId: 10, restaurantId: 4, itemName: 'Smokey Bacon Angus Burger', category: 'Burgers', description: 'Prime Angus beef patty, smoked bacon, cheddar, crispy onion rings, BBQ drizzle', price: 15.99, isAvailable: 1, isVeg: 0, imagePath: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80' },
  { menuId: 11, restaurantId: 4, itemName: 'Truffle Parmesan Loaded Fries', category: 'Sides', description: 'Hand-cut golden fries tossed in truffle oil, fresh rosemary, and grated parmesan', price: 6.99, isAvailable: 1, isVeg: 1, imagePath: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80' },
  { menuId: 12, restaurantId: 4, itemName: 'Crispy Plant-Based Burger', category: 'Burgers', description: 'Beyond patty, avocado cream, vegan cheese, arugula, on toasted brioche bun', price: 14.50, isAvailable: 1, isVeg: 1, imagePath: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=600&q=80' },
  { menuId: 13, restaurantId: 5, itemName: 'Avocado Quinoa Power Bowl', category: 'Salads', description: 'Fresh avocado, organic quinoa, edamame, roasted sweet potatoes, lemon tahini dressing', price: 11.50, isAvailable: 1, isVeg: 1, imagePath: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80' },
  { menuId: 14, restaurantId: 5, itemName: 'Acai Berry Smoothie Bowl', category: 'Smoothies', description: 'Organic acai blend topped with chia seeds, fresh berries, toasted coconut flakes, almond butter', price: 9.99, isAvailable: 1, isVeg: 1, imagePath: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=600&q=80' },
  { menuId: 15, restaurantId: 6, itemName: 'Belgian Dark Chocolate Lava Cake', category: 'Desserts', description: 'Warm molten chocolate center served with Madagascar vanilla bean ice cream', price: 8.99, isAvailable: 1, isVeg: 1, imagePath: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80' },
  { menuId: 16, restaurantId: 6, itemName: 'New York Cheesecake', category: 'Desserts', description: 'Rich creamy cheesecake with fresh raspberry coulis', price: 7.99, isAvailable: 1, isVeg: 1, imagePath: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80' }
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
      return saved ? JSON.parse(saved) : {
        userId: 2,
        fullName: 'Ramesh',
        email: 'ramesh@gmail.com',
        role: 'CUSTOMER',
        phone: '9876543210',
        address: 'Gandhi Nagar, Mangalore'
      };
    } catch (e) {
      return {
        userId: 2,
        fullName: 'Ramesh',
        email: 'ramesh@gmail.com',
        role: 'CUSTOMER',
        phone: '9876543210',
        address: 'Gandhi Nagar, Mangalore'
      };
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
    fetchOrders();
  }, []);

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
    try {
      const url = currentUser?.role === 'CUSTOMER' 
        ? `${API_BASE}/orders?user_id=${currentUser.userId}`
        : `${API_BASE}/orders`;
      const res = await fetch(url);
      const contentType = res.headers.get('content-type') || '';
      if (res.ok && contentType.includes('application/json')) {
        const data = await res.json();
        setOrders(data);
      } else {
        const savedOrders = JSON.parse(localStorage.getItem('feastflow_orders')) || DEFAULT_ORDERS;
        setOrders(savedOrders);
      }
    } catch (err) {
      const savedOrders = JSON.parse(localStorage.getItem('feastflow_orders')) || DEFAULT_ORDERS;
      setOrders(savedOrders);
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
    const matchesCategory = activeCategory === 'All' || (r.cuisine && r.cuisine.toLowerCase().includes(activeCategory.toLowerCase()));
    const matchesSearch = searchTerm === '' || 
      (r.restaurantName && r.restaurantName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (r.cuisine && r.cuisine.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const cartCount = cart.items.reduce((sum, i) => sum + i.quantity, 0);

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
      />

    </div>
  );
}
