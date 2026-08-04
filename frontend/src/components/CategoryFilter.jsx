import React from 'react';

const CATEGORIES = [
  { id: 'All', label: 'All Cuisines', icon: '🍽️' },
  { id: 'Italian', label: 'Italian', icon: '🍕' },
  { id: 'Indian', label: 'Indian', icon: '🍛' },
  { id: 'Chinese', label: 'Chinese', icon: '🥢' },
  { id: 'Burgers', label: 'Burgers', icon: '🍔' },
  { id: 'Healthy', label: 'Healthy', icon: '🥗' },
  { id: 'Japanese', label: 'Japanese', icon: '🍣' },
  { id: 'Mexican', label: 'Mexican', icon: '🌮' },
  { id: 'Thai', label: 'Thai', icon: '🍜' },
  { id: 'Desserts', label: 'Desserts', icon: '🍰' },
  { id: 'BBQ', label: 'BBQ & Grill', icon: '🍖' },
  { id: 'Mediterranean', label: 'Mediterranean', icon: '🥙' },
  { id: 'Seafood', label: 'Seafood', icon: '🦞' },
  { id: 'Street Food', label: 'Street Food', icon: '🍲' },
];

export default function CategoryFilter({ activeCategory, onSelectCategory }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      overflowX: 'auto',
      paddingBottom: '10px',
      marginBottom: '28px',
      scrollbarWidth: 'thin'
    }}>
      {CATEGORIES.map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: 'var(--radius-full)',
              background: isActive 
                ? 'var(--accent-gradient)' 
                : 'rgba(125, 125, 125, 0.08)',
              border: isActive 
                ? '1px solid var(--accent-primary)' 
                : '1px solid var(--border-color)',
              color: isActive ? '#fff' : 'var(--text-muted)',
              fontWeight: isActive ? '700' : '500',
              fontSize: '0.88rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease',
              boxShadow: isActive ? '0 4px 15px rgba(255, 94, 54, 0.35)' : 'none'
            }}
          >
            <span style={{ fontSize: '1.1rem' }}>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
}
