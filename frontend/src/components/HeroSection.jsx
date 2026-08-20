import React from 'react';
import { Flame, Clock, Star, Sparkles, Utensils } from 'lucide-react';

export default function HeroSection({ onExploreClick }) {
  return (
    <div style={{
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '24px',
      margin: '24px 0 32px 0',
      background: 'linear-gradient(135deg, rgba(255, 94, 54, 0.15) 0%, rgba(139, 92, 246, 0.1) 100%)',
      border: '1px solid rgba(255, 94, 54, 0.25)',
      padding: '48px 40px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
    }}>
      <div style={{ maxWidth: '640px', position: 'relative', zIndex: 2 }}>
        
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(255, 94, 54, 0.2)',
          border: '1px solid var(--accent-primary)',
          padding: '6px 14px',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.8rem',
          fontWeight: '700',
          color: 'var(--accent-primary)',
          marginBottom: '16px'
        }}>
          <Sparkles size={14} />
          <span>INSTANT DELIVERIES NEAR YOU • FREE DELIVERY ON FIRST ORDER</span>
        </div>

        <h1 style={{
          fontSize: '2.8rem',
          fontWeight: '800',
          lineHeight: '1.15',
          letterSpacing: '-1px',
          marginBottom: '16px'
        }}>
          Craving Delicious Gourmet Meals Delivered <span style={{
            background: 'var(--accent-gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Ultra Fast?</span>
        </h1>

        <p style={{
          fontSize: '1.05rem',
          color: 'var(--text-muted)',
          marginBottom: '28px',
          maxWidth: '520px'
        }}>
          Discover top-rated artisanal kitchens, wood-fired pizzerias, authentic Asian woks & sweet bakeries near you.
        </p>

        {/* Highlight Stats */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '28px', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={18} color="var(--accent-green)" />
            </div>
            <div>
              <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>20-30 Mins</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Avg Delivery</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Star size={18} color="var(--accent-gold)" />
            </div>
            <div>
              <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>4.8 / 5.0</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>User Rating</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255, 94, 54, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Flame size={18} color="var(--accent-primary)" />
            </div>
            <div>
              <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>100% Hot</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Fresh Guarantee</div>
            </div>
          </div>
        </div>

      </div>

      {/* Decorative Food Visual Image background overlay */}
      <div style={{
        position: 'absolute',
        right: '-40px',
        top: '-40px',
        bottom: '-40px',
        width: '450px',
        backgroundImage: 'url("/images/pizza_hero.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: '0.35',
        maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%)',
        WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%)',
        pointerEvents: 'none'
      }} />
    </div>
  );
}
