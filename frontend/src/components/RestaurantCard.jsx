import React from 'react';
import { Star, Clock, MapPin, ChevronRight } from 'lucide-react';

export default function RestaurantCard({ restaurant, onClick }) {
  return (
    <div 
      onClick={() => onClick(restaurant)}
      className="glass-panel glass-panel-hover"
      style={{
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Image Banner Container */}
      <div style={{ position: 'relative', height: '190px', overflow: 'hidden' }}>
        <img 
          src={restaurant.image || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'} 
          alt={restaurant.restaurantName}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
        />
        
        {/* Rating Overlay */}
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'rgba(11, 15, 23, 0.85)',
          backdropFilter: 'blur(8px)',
          padding: '4px 10px',
          borderRadius: 'var(--radius-full)',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          border: '1px solid rgba(245, 158, 11, 0.4)',
          color: 'var(--accent-gold)',
          fontWeight: '700',
          fontSize: '0.85rem'
        }}>
          <Star size={14} fill="var(--accent-gold)" color="var(--accent-gold)" />
          <span>{restaurant.rating}</span>
        </div>

        {/* Cuisine Tag Overlay */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          background: 'var(--accent-gradient)',
          backdropFilter: 'blur(8px)',
          padding: '4px 12px',
          borderRadius: 'var(--radius-full)',
          color: '#fff',
          fontWeight: '700',
          fontSize: '0.78rem',
          letterSpacing: '0.5px',
          textTransform: 'uppercase'
        }}>
          {restaurant.cuisine}
        </div>
      </div>

      {/* Card Content */}
      <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '6px', color: 'var(--text-main)' }}>
            {restaurant.restaurantName}
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '14px' }}>
            <MapPin size={14} color="var(--accent-primary)" />
            <span>{restaurant.address}</span>
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '12px',
          borderTop: '1px solid var(--border-color)',
          fontSize: '0.85rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-green)', fontWeight: '600' }}>
            <Clock size={15} />
            <span>20-30 mins</span>
          </div>

          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '2px',
            color: 'var(--accent-primary)',
            fontWeight: '700',
            fontSize: '0.85rem'
          }}>
            View Menu <ChevronRight size={16} />
          </span>
        </div>
      </div>
    </div>
  );
}
