import React from 'react';

const CATEGORIES = [
  { id: 'All', label: 'All Cuisines', icon: '🍽️' },
  { id: 'Biryani', label: 'Biryani Special', icon: '🍚' },
  { id: 'Pizza', label: 'Pizza & Crusts', icon: '🍕' },
  { id: 'Pasta', label: 'Pasta & Noodles', icon: '🍝' },
  { id: 'Burgers', label: 'Burgers & Fries', icon: '🍔' },
  { id: 'Indian', label: 'Indian Curries', icon: '🍛' },
  { id: 'Chinese', label: 'Chinese & Wok', icon: '🥢' },
  { id: 'Japanese', label: 'Sushi & Japanese', icon: '🍣' },
  { id: 'Mexican', label: 'Tacos & Burritos', icon: '🌮' },
  { id: 'Thai', label: 'Thai Curries', icon: '🍜' },
  { id: 'Desserts', label: 'Desserts & Cakes', icon: '🍰' },
  { id: 'Ice Cream', label: 'Ice Cream & Waffles', icon: '🍦' },
  { id: 'Juices & Beverages', label: 'Shakes & Juices', icon: '🥤' },
  { id: 'BBQ', label: 'Smokey BBQ', icon: '🍖' },
  { id: 'Mediterranean', label: 'Mediterranean Wraps', icon: '🥙' },
  { id: 'Seafood', label: 'Seafood Catch', icon: '🦞' },
  { id: 'Street Food', label: 'Street Food Chaat', icon: '🍲' },
  { id: 'Korean', label: 'Korean BBQ', icon: '🍱' },
  { id: 'Breakfast', label: 'Breakfast & Brunch', icon: '🍳' },
  { id: 'Healthy', label: 'Healthy Bowls', icon: '🥗' },
  { id: 'Vegan', label: 'Pure Vegan', icon: '🌱' },
  { id: 'French', label: 'French Bakery', icon: '🥐' },
  { id: 'Turkish', label: 'Turkish Kebab', icon: '🍢' },
  { id: 'Greek', label: 'Greek Taverna', icon: '🫒' },
  { id: 'Spanish', label: 'Spanish Tapas', icon: '🥘' }
];

export default function CategoryFilter({ activeCategory, onSelectCategory, dietFilter, onSelectDiet }) {
  return (
    <div style={{ marginBottom: '28px' }}>
      
      {/* Diet Type Quick Filter Row (Veg / Non-Veg / All) */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        marginBottom: '16px',
        background: 'var(--bg-card)',
        padding: '12px 18px',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', fontSize: '0.92rem' }}>
          <span>Dietary Preference:</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* ALL Foods */}
          <button
            onClick={() => onSelectDiet && onSelectDiet('ALL')}
            style={{
              padding: '6px 16px',
              borderRadius: 'var(--radius-full)',
              border: (dietFilter === 'ALL' || !dietFilter) ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
              background: (dietFilter === 'ALL' || !dietFilter) ? 'var(--accent-gradient)' : 'rgba(255, 255, 255, 0.05)',
              color: (dietFilter === 'ALL' || !dietFilter) ? '#fff' : 'var(--text-muted)',
              fontWeight: '700',
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            <span>🍽️ All Foods</span>
          </button>

          {/* VEG ONLY */}
          <button
            onClick={() => onSelectDiet && onSelectDiet('VEG')}
            style={{
              padding: '6px 16px',
              borderRadius: 'var(--radius-full)',
              border: dietFilter === 'VEG' ? '1px solid #10b981' : '1px solid var(--border-color)',
              background: dietFilter === 'VEG' ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255, 255, 255, 0.05)',
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
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
            <span>Pure Veg Only</span>
          </button>

          {/* NON-VEG ONLY */}
          <button
            onClick={() => onSelectDiet && onSelectDiet('NON_VEG')}
            style={{
              padding: '6px 16px',
              borderRadius: 'var(--radius-full)',
              border: dietFilter === 'NON_VEG' ? '1px solid #ef4444' : '1px solid var(--border-color)',
              background: dietFilter === 'NON_VEG' ? 'rgba(239, 68, 68, 0.25)' : 'rgba(255, 255, 255, 0.05)',
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
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444', display: 'inline-block' }}></span>
            <span>Non-Veg Only</span>
          </button>
        </div>
      </div>

      {/* Categories Horizontal ScrollBar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        overflowX: 'auto',
        paddingBottom: '10px',
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

    </div>
  );
}
