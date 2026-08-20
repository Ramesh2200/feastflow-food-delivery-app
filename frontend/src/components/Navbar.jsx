import React from 'react';
import { ShoppingBag, Search, MapPin, User, UtensilsCrossed, ShieldCheck, Truck, Sun, Moon } from 'lucide-react';

export default function Navbar({ 
  currentUser, 
  onOpenAuth, 
  cartCount, 
  onOpenCart, 
  searchTerm, 
  setSearchTerm,
  currentView,
  setCurrentView,
  theme,
  toggleTheme
}) {
  return (
    <header className="glass-panel" style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid var(--border-color)' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
        
        {/* Brand Logo */}
        <div 
          onClick={() => setCurrentView('explore')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'var(--accent-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            boxShadow: '0 4px 15px rgba(255, 94, 54, 0.4)'
          }}>
            <UtensilsCrossed size={22} />
          </div>
          <div>
            <span style={{ fontSize: '1.4rem', fontWeight: '800', letterSpacing: '-0.5px' }}>
              Feast<span style={{ color: 'var(--accent-primary)' }}>Flow</span>
            </span>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '-4px', fontWeight: '600' }}>
              28 RESTAURANTS • 840+ DISHES
            </div>
          </div>
        </div>

        {/* Location Selector & Global Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, maxWidth: '520px', margin: '0 24px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(125,125,125,0.08)',
            padding: '8px 14px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            whiteSpace: 'nowrap'
          }}>
            <MapPin size={16} color="var(--accent-primary)" />
            <span style={{ color: 'var(--text-main)', fontWeight: '600' }}>Bengaluru / Mangalore</span>
          </div>

          <div style={{ position: 'relative', width: '100%' }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
            <input 
              type="text"
              placeholder="Search 28 restaurants or 840+ dishes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(125,125,125,0.06)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '10px 14px 10px 42px',
                color: 'var(--text-main)',
                fontSize: '0.9rem',
                outline: 'none',
                transition: 'all 0.2s ease'
              }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          
          {/* Black & White / Theme Toggle Button */}
          <button 
            onClick={toggleTheme}
            className="btn-secondary"
            title="Toggle Black & White / Dark Mode"
            style={{ padding: '8px 12px' }}
          >
            {theme === 'dark' ? <Sun size={18} color="var(--accent-gold)" /> : <Moon size={18} color="var(--accent-purple)" />}
          </button>

          {/* View Switchers */}
          {currentUser && (currentUser.role === 'ADMIN' || currentUser.role === 'MANAGER' || currentUser.role === 'DELIVERY_AGENT') && (
            <button 
              onClick={() => setCurrentView(currentView === 'admin' ? 'explore' : 'admin')}
              className="btn-secondary"
              style={{ fontSize: '0.85rem' }}
            >
              <ShieldCheck size={16} color="var(--accent-gold)" />
              {currentView === 'admin' ? 'Customer App' : 'Manager Portal'}
            </button>
          )}

          <button 
            onClick={() => setCurrentView('orders')}
            className="btn-secondary"
            style={{ fontSize: '0.85rem' }}
          >
            <Truck size={16} color="var(--accent-green)" />
            Orders
          </button>

          {/* Cart Counter */}
          <button 
            onClick={onOpenCart}
            className="btn-primary"
            style={{ position: 'relative' }}
          >
            <ShoppingBag size={18} />
            <span>Cart</span>
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-6px',
                right: '-6px',
                background: '#fff',
                color: 'var(--accent-primary)',
                fontWeight: '800',
                fontSize: '0.75rem',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
              }}>
                {cartCount}
              </span>
            )}
          </button>

          {/* User Account / Profile */}
          <button 
            onClick={onOpenAuth}
            className="btn-secondary"
            style={{ padding: '8px 14px' }}
          >
            <User size={18} color="var(--accent-primary)" />
            <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>
              {currentUser ? currentUser.fullName : 'Sign In'}
            </span>
          </button>

        </div>

      </div>
    </header>
  );
}
