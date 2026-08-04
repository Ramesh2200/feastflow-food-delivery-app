import React, { useState } from 'react';
import { X, MapPin, Phone, CreditCard, QrCode, Banknote, ShieldCheck } from 'lucide-react';

export default function CheckoutModal({ isOpen, onClose, cart, totals, currentUser, onPlaceOrder }) {
  const [address, setAddress] = useState(currentUser?.address || 'Gandhi Nagar, Mangalore');
  const [phone, setPhone] = useState(currentUser?.phone || '9876543210');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderPayload = {
      userId: currentUser?.userId || 2, // Ramesh
      restaurantId: cart.restaurantId,
      deliveryAgentId: 4, // Ajay (Delivery Agent)
      totalAmount: totals.grandTotal,
      orderStatus: 'PLACED',
      paymentMethod: paymentMethod,
      deliveryAddress: address,
      items: cart.items.map(item => ({
        menuId: item.menuId,
        quantity: item.quantity,
        price: item.price
      }))
    };

    await onPlaceOrder(orderPayload);
    setIsSubmitting(false);
  };

  return (
    <div className="modal-overlay">
      <div 
        className="glass-panel animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '520px',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          boxShadow: '0 25px 50px rgba(0,0,0,0.7)',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Modal Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--bg-secondary)'
        }}>
          <div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: '800' }}>Confirm Order Checkout</h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Ordering from {cart.restaurantName}</p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} style={{ padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Delivery Address */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700', fontSize: '0.9rem', marginBottom: '8px', color: 'var(--text-main)' }}>
              <MapPin size={16} color="var(--accent-primary)" /> Delivery Address
            </label>
            <textarea 
              rows={2}
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '10px 14px',
                color: '#fff',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
          </div>

          {/* Contact Phone */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700', fontSize: '0.9rem', marginBottom: '8px', color: 'var(--text-main)' }}>
              <Phone size={16} color="var(--accent-green)" /> Phone Number
            </label>
            <input 
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '10px 14px',
                color: '#fff',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
          </div>

          {/* Payment Method Selector */}
          <div>
            <label style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '10px', display: 'block', color: 'var(--text-main)' }}>
              Select Payment Method
            </label>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[
                { id: 'UPI', label: 'UPI / PhonePe / GPay', icon: <QrCode size={18} /> },
                { id: 'COD', label: 'Cash on Delivery', icon: <Banknote size={18} /> },
                { id: 'CARD', label: 'Credit / Debit Card', icon: <CreditCard size={18} /> },
              ].map(pm => {
                const selected = paymentMethod === pm.id;
                return (
                  <div
                    key={pm.id}
                    onClick={() => setPaymentMethod(pm.id)}
                    style={{
                      border: selected ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
                      background: selected ? 'rgba(255, 94, 54, 0.12)' : 'rgba(255,255,255,0.03)',
                      borderRadius: 'var(--radius-md)',
                      padding: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      color: selected ? 'var(--accent-primary)' : 'var(--text-muted)',
                      fontWeight: selected ? '700' : '500',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {pm.icon}
                    <span style={{ fontSize: '0.85rem' }}>{pm.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Payment Guarantee */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            borderRadius: 'var(--radius-md)',
            padding: '10px 14px',
            color: 'var(--accent-green)',
            fontSize: '0.82rem'
          }}>
            <ShieldCheck size={20} style={{ flexShrink: 0 }} />
            <span>100% Encrypted & Safe Transaction connected to MySQL database</span>
          </div>

          {/* Grand Total & Action */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '16px',
            borderTop: '1px solid var(--border-color)',
            marginTop: '8px'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Amount to Pay</div>
              <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--accent-primary)' }}>
                ₹{totals.grandTotal.toFixed(2)}
              </div>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
              style={{ padding: '12px 24px', fontSize: '0.95rem' }}
            >
              {isSubmitting ? 'Processing Order...' : 'Place Order Now 🚀'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
