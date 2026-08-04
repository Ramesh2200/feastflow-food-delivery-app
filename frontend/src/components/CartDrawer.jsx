import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Tag, ShoppingBag, ArrowRight } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cart, updateQuantity, clearCart, onProceedToCheckout }) {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'FEAST10') {
      setDiscountPercent(10);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try FEAST10 for 10% off!');
    }
  };

  const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const deliveryFee = subtotal > 0 ? 40.00 : 0;
  const taxes = subtotal > 0 ? 25.00 : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee + taxes);

  return (
    <div className="modal-overlay" style={{ justifyContent: 'flex-end', padding: 0 }}>
      <div 
        className="animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '440px',
          height: '100vh',
          background: 'var(--bg-secondary)',
          borderLeft: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 40px rgba(0,0,0,0.6)'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--bg-primary)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={22} color="var(--accent-primary)" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: '800' }}>Your Food Cart</h2>
          </div>
          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Content */}
        {cart.items.length === 0 ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px', textAlign: 'center' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(255, 94, 54, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <ShoppingBag size={36} color="var(--accent-primary)" />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '8px' }}>Your cart is empty</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
              Explore restaurants near you and add delicious food items!
            </p>
            <button onClick={onClose} className="btn-primary">
              Browse Menu
            </button>
          </div>
        ) : (
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Restaurant Info */}
            <div style={{
              background: 'rgba(255, 94, 54, 0.08)',
              border: '1px solid rgba(255, 94, 54, 0.2)',
              borderRadius: 'var(--radius-md)',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: '700', textTransform: 'uppercase' }}>Ordering From</div>
                <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>{cart.restaurantName}</div>
              </div>
              <button 
                onClick={clearCart}
                style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: '600' }}
              >
                <Trash2 size={14} /> Clear
              </button>
            </div>

            {/* Cart Items List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {cart.items.map(item => (
                <div 
                  key={item.menuId}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'var(--bg-card)',
                    padding: '14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <div style={{ flex: 1, paddingRight: '12px' }}>
                    <div style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-main)' }}>{item.itemName}</div>
                    <div style={{ color: 'var(--accent-primary)', fontWeight: '700', fontSize: '0.88rem', marginTop: '2px' }}>
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    background: 'rgba(255,255,255,0.06)',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)'
                  }}>
                    <button 
                      onClick={() => updateQuantity(item.menuId, -1)}
                      style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex' }}
                    >
                      <Minus size={14} />
                    </button>
                    <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.menuId, 1)}
                      style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', display: 'flex' }}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Code Box */}
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px dashed var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '14px'
            }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                  <Tag size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                  <input 
                    type="text" 
                    placeholder="Promo code (e.g. FEAST10)" 
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(0,0,0,0.3)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '8px 10px 8px 34px',
                      color: '#fff',
                      fontSize: '0.85rem',
                      outline: 'none'
                    }}
                  />
                </div>
                <button 
                  onClick={handleApplyPromo}
                  className="btn-secondary"
                  style={{ padding: '8px 14px', fontSize: '0.82rem' }}
                >
                  Apply
                </button>
              </div>
              {discountPercent > 0 && (
                <div style={{ color: 'var(--accent-green)', fontSize: '0.8rem', fontWeight: '700', marginTop: '6px' }}>
                  ✓ FEAST10 Applied (10% Discount)
                </div>
              )}
              {promoError && (
                <div style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '6px' }}>
                  {promoError}
                </div>
              )}
            </div>

          </div>
        )}

        {/* Footer Bill & Checkout */}
        {cart.items.length > 0 && (
          <div style={{
            padding: '20px 24px',
            borderTop: '1px solid var(--border-color)',
            background: 'var(--bg-primary)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            {discountAmount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: 'var(--accent-green)', fontWeight: '600' }}>
                <span>Discount (10%)</span>
                <span>-₹{discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              <span>Delivery Fee</span>
              <span>₹{deliveryFee.toFixed(2)}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              <span>Taxes & GST</span>
              <span>₹{taxes.toFixed(2)}</span>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '1.2rem',
              fontWeight: '800',
              color: 'var(--text-main)',
              paddingTop: '10px',
              borderTop: '1px solid var(--border-color)'
            }}>
              <span>Total Pay</span>
              <span style={{ color: 'var(--accent-primary)' }}>₹{grandTotal.toFixed(2)}</span>
            </div>

            <button 
              onClick={() => onProceedToCheckout({ subtotal, discountAmount, deliveryFee, taxes, grandTotal })}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '1rem', marginTop: '8px' }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
