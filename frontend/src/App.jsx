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

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [restaurants, setRestaurants] = useState([]);
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

  const [currentUser, setCurrentUser] = useState({
    userId: 2,
    fullName: 'Ramesh',
    email: 'ramesh@gmail.com',
    role: 'CUSTOMER',
    phone: '9876543210',
    address: 'Gandhi Nagar, Mangalore'
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
      if (res.ok) {
        const data = await res.json();
        setRestaurants(data);
      }
    } catch (err) {
      console.error('Failed to fetch restaurants:', err);
    }
  };

  const fetchMenu = async (restaurantId) => {
    try {
      const res = await fetch(`${API_BASE}/menu?restaurant_id=${restaurantId}`);
      if (res.ok) {
        const data = await res.json();
        setMenuItems(data);
      }
    } catch (err) {
      console.error('Failed to fetch menu:', err);
    }
  };

  const fetchOrders = async () => {
    try {
      const url = currentUser?.role === 'CUSTOMER' 
        ? `${API_BASE}/orders?user_id=${currentUser.userId}`
        : `${API_BASE}/orders`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.error('Failed to fetch orders:', err);
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
      if (res.ok) {
        setIsCheckoutOpen(false);
        handleClearCart();
        await fetchOrders();
        setCurrentView('orders');
      }
    } catch (err) {
      console.error('Failed to place order:', err);
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`${API_BASE}/orders`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_id: orderId, status: newStatus })
      });
      if (res.ok) {
        fetchOrders();
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success) {
        setCurrentUser(data.user);
        setIsAuthOpen(false);
        fetchOrders();
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (err) {
      return { success: false, message: 'Server connection failed' };
    }
  };

  const handleRegister = async (userData) => {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const data = await res.json();
      if (data.success) {
        setCurrentUser(data.user);
        setIsAuthOpen(false);
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (err) {
      return { success: false, message: 'Registration failed' };
    }
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
