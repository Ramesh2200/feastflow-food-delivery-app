import React, { useState } from 'react';
import { ArrowLeft, Star, Clock, MapPin, Plus, Minus, Leaf } from 'lucide-react';

export default function RestaurantDetail({ restaurant, menuItems, onBack, onAddToCart, cartItems }) {
  const [dietFilter, setDietFilter] = useState('ALL');

  const filteredItems = menuItems.filter(item => {
    if (dietFilter === 'VEG') return item.isVeg === 1 || item.isVeg === true || item.isVeg === '1';
    if (dietFilter === 'NON_VEG') return item.isVeg === 0 || item.isVeg === false || item.isVeg === '0';
    return true;
  });

  const categories = Array.from(new Set(filteredItems.map(item => item.category || 'Main Course')));

  const getItemQuantityInCart = (menuId) => {
    const found = cartItems.find(item => item.menuId === menuId);
    return found ? found.quantity : 0;
  };

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '60px' }}>
      
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="btn-secondary"
        style={{ marginBottom: '20px' }}
      >
        <ArrowLeft size={16} /> Back to Restaurants
      </button>

      {/* Restaurant Header Banner */}
      <div style={{
        position: 'relative',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        height: '240px',
        marginBottom: '28px'
      }}>
        <img 
          src={restaurant.image || restaurant.imagePath || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'} 
          alt={restaurant.restaurantName}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80';
          }}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(11, 15, 23, 0.95) 0%, rgba(11, 15, 23, 0.4) 60%, transparent 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '30px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <span style={{
              background: 'var(--accent-gradient)',
              padding: '4px 12px',
              borderRadius: 'var(--radius-full)',
              color: '#fff',
              fontWeight: '700',
              fontSize: '0.8rem'
            }}>
              {restaurant.cuisine}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-gold)', fontWeight: '700' }}>
              <Star size={16} fill="var(--accent-gold)" />
              <span>{restaurant.rating} Rating</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-green)', fontWeight: '600', fontSize: '0.9rem' }}>
              <Clock size={16} />
              <span>25-30 mins</span>
            </div>
          </div>

          <h1 style={{ fontSize: '2.2rem', fontWeight: '800' }}>{restaurant.restaurantName}</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MapPin size={14} /> {restaurant.address} • Ph: {restaurant.phone}
          </p>
        </div>
      </div>

      {/* Menu Filter Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        marginBottom: '24px',
        background: 'var(--bg-card)',
        padding: '14px 20px',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)'
      }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Menu Items ({filteredItems.length})</h2>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button 
            onClick={() => setDietFilter('ALL')}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              background: dietFilter === 'ALL' ? 'var(--accent-gradient)' : 'rgba(255, 255, 255, 0.05)',
              border: dietFilter === 'ALL' ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
              color: dietFilter === 'ALL' ? '#fff' : 'var(--text-muted)',
              fontWeight: '700',
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            All Items
          </button>

          <button 
            onClick={() => setDietFilter('VEG')}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              background: dietFilter === 'VEG' ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255, 255, 255, 0.05)',
              border: dietFilter === 'VEG' ? '1px solid #10b981' : '1px solid var(--border-color)',
              color: dietFilter === 'VEG' ? '#10b981' : 'var(--text-muted)',
              fontWeight: '700',
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span>
            <span>Pure Veg</span>
          </button>

          <button 
            onClick={() => setDietFilter('NON_VEG')}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              background: dietFilter === 'NON_VEG' ? 'rgba(239, 68, 68, 0.25)' : 'rgba(255, 255, 255, 0.05)',
              border: dietFilter === 'NON_VEG' ? '1px solid #ef4444' : '1px solid var(--border-color)',
              color: dietFilter === 'NON_VEG' ? '#ef4444' : 'var(--text-muted)',
              fontWeight: '700',
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></span>
            <span>Non-Veg</span>
          </button>
        </div>
      </div>

      {/* Categories & Dishes Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {categories.map(cat => {
          const categoryItems = filteredItems.filter(item => (item.category || 'Main Course') === cat);
          if (categoryItems.length === 0) return null;

          return (
            <div key={cat}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '16px', color: 'var(--accent-primary)', letterSpacing: '-0.3px' }}>
                {cat}
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
                gap: '20px'
              }}>
                {categoryItems.map(item => {
                  const qty = getItemQuantityInCart(item.menuId);

                  return (
                    <div 
                      key={item.menuId}
                      className="glass-panel"
                      style={{
                        borderRadius: 'var(--radius-md)',
                        padding: '16px',
                        display: 'flex',
                        gap: '16px',
                        position: 'relative'
                      }}
                    >
                      {/* Item Image */}
                      <div style={{ width: '110px', height: '110px', borderRadius: 'var(--radius-md)', overflow: 'hidden', flexShrink: 0 }}>
                        <img 
                          src={item.image || item.imagePath || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'} 
                          alt={item.itemName}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';
                          }}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>

                      {/* Info & Add Button */}
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                            <span style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '16px',
                              height: '16px',
                              borderRadius: '3px',
                              border: (item.isVeg === 1 || item.isVeg === true || item.isVeg === '1') ? '1px solid #10b981' : '1px solid #ef4444',
                              padding: '2px',
                              flexShrink: 0
                            }}>
                              <span style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                background: (item.isVeg === 1 || item.isVeg === true || item.isVeg === '1') ? '#10b981' : '#ef4444'
                              }}></span>
                            </span>
                            <span style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--text-main)' }}>
                              {item.itemName}
                            </span>
                          </div>

                          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {item.description}
                          </p>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px' }}>
                          <span style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--accent-primary)' }}>
                            ₹{item.price.toFixed(2)}
                          </span>

                          {qty === 0 ? (
                            <button
                              onClick={() => onAddToCart(item, restaurant, 1)}
                              className="btn-primary"
                              style={{ padding: '6px 14px', fontSize: '0.85rem' }}
                            >
                              <Plus size={15} /> Add
                            </button>
                          ) : (
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              background: 'var(--accent-gradient)',
                              padding: '4px 10px',
                              borderRadius: 'var(--radius-md)',
                              color: '#fff',
                              fontWeight: '700'
                            }}>
                              <button 
                                onClick={() => onAddToCart(item, restaurant, -1)}
                                style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex' }}
                              >
                                <Minus size={14} />
                              </button>
                              <span>{qty}</span>
                              <button 
                                onClick={() => onAddToCart(item, restaurant, 1)}
                                style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex' }}
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
