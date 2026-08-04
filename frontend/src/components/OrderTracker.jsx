import React from 'react';
import { CheckCircle2, Clock, MapPin, Truck, ChefHat, PackageCheck, AlertCircle, Sparkles } from 'lucide-react';

const STATUS_STEPS = [
  { key: 'PLACED', label: 'Order Placed', icon: <PackageCheck size={20} />, description: 'Order received & pending confirmation' },
  { key: 'CONFIRMED', label: 'Confirmed', icon: <Sparkles size={20} />, description: 'Restaurant confirmed order' },
  { key: 'PREPARING', label: 'Preparing', icon: <ChefHat size={20} />, description: 'Chef is cooking your food fresh' },
  { key: 'OUT_FOR_DELIVERY', label: 'On The Way', icon: <Truck size={20} />, description: 'Delivery agent en route' },
  { key: 'DELIVERED', label: 'Delivered', icon: <CheckCircle2 size={20} />, description: 'Order delivered successfully!' }
];

export default function OrderTracker({ orders, onRefreshOrders }) {
  if (!orders || orders.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <div style={{
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          background: 'rgba(255, 94, 54, 0.1)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px'
        }}>
          <Clock size={32} color="var(--accent-primary)" />
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '8px' }}>No Active Orders Found</h2>
        <p style={{ color: 'var(--text-muted)' }}>Place an order from any restaurant to track live status step-by-step!</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingBottom: '60px' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800' }}>Live Order Tracking & History</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Real-time updates directly from MySQL food_delivery_db & Java Servlets backend</p>
        </div>
        <button onClick={onRefreshOrders} className="btn-secondary" style={{ fontSize: '0.85rem' }}>
          🔄 Refresh Status
        </button>
      </div>

      {orders.map(order => {
        const currentStepIndex = STATUS_STEPS.findIndex(s => s.key === order.orderStatus);
        const activeStep = currentStepIndex >= 0 ? currentStepIndex : 0;

        return (
          <div 
            key={order.orderId}
            className="glass-panel"
            style={{ borderRadius: 'var(--radius-lg)', padding: '28px', border: '1px solid var(--border-color)' }}
          >
            {/* Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: '20px',
              borderBottom: '1px solid var(--border-color)',
              marginBottom: '28px',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: '800' }}>Order #{order.orderId}</span>
                  <span style={{
                    background: 'var(--accent-gradient)',
                    padding: '3px 10px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    color: '#fff'
                  }}>
                    {order.restaurantName || 'Restaurant'}
                  </span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '4px' }}>
                  Placed on: {order.orderDate}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Payment ({order.paymentMethod})</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--accent-primary)' }}>
                    ₹{order.totalAmount.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            {/* Stepper Bar */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '8px',
              marginBottom: '32px',
              position: 'relative'
            }}>
              {STATUS_STEPS.map((step, idx) => {
                const isPassed = idx <= activeStep;
                const isCurrent = idx === activeStep;

                return (
                  <div 
                    key={step.key}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      position: 'relative',
                      zIndex: 2
                    }}
                  >
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      background: isCurrent 
                        ? 'var(--accent-gradient)' 
                        : isPassed 
                          ? 'rgba(16, 185, 129, 0.2)' 
                          : 'rgba(255, 255, 255, 0.05)',
                      border: isCurrent 
                        ? '2px solid var(--accent-primary)' 
                        : isPassed 
                          ? '2px solid var(--accent-green)' 
                          : '1px solid var(--border-color)',
                      color: isCurrent ? '#fff' : isPassed ? 'var(--accent-green)' : 'var(--text-dim)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '8px',
                      boxShadow: isCurrent ? '0 0 20px rgba(255, 94, 54, 0.5)' : 'none',
                      transition: 'all 0.3s ease'
                    }}>
                      {step.icon}
                    </div>

                    <div style={{
                      fontWeight: isCurrent ? '800' : '600',
                      fontSize: '0.82rem',
                      color: isCurrent ? 'var(--accent-primary)' : isPassed ? 'var(--text-main)' : 'var(--text-dim)'
                    }}>
                      {step.label}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Delivery Driver Info Box */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: 'var(--accent-gradient)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '800',
                  color: '#fff'
                }}>
                  AJ
                </div>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>Ajay (Delivery Agent • 7777777777)</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={13} color="var(--accent-primary)" /> {order.deliveryAddress}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: 'var(--accent-green)',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: '700',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <Clock size={14} /> ETA: 20 mins
                </div>
              </div>
            </div>

            {/* Items Summary */}
            <div style={{ marginTop: '20px' }}>
              <div style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '10px', color: 'var(--text-muted)' }}>
                Ordered Items:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {order.items && order.items.map(item => (
                  <div 
                    key={item.orderItemId}
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid var(--border-color)',
                      padding: '6px 12px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.85rem'
                    }}
                  >
                    <span style={{ color: 'var(--accent-primary)', fontWeight: '700' }}>{item.quantity}x</span> {item.itemName} (₹{item.price.toFixed(2)})
                  </div>
                ))}
              </div>
            </div>

          </div>
        );
      })}

    </div>
  );
}
