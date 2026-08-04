import React, { useState } from 'react';
import { ShieldCheck, RefreshCw } from 'lucide-react';

export default function AdminDashboard({ orders, onUpdateStatus, onRefresh }) {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filteredOrders = selectedFilter === 'All'
    ? orders
    : orders.filter(o => o.orderStatus === selectedFilter);

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '60px' }}>
      
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(255, 94, 54, 0.15) 100%)',
        border: '1px solid rgba(139, 92, 246, 0.3)',
        borderRadius: 'var(--radius-lg)',
        padding: '28px',
        marginBottom: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--accent-purple)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff'
          }}>
            <ShieldCheck size={26} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '800' }}>Manager & Admin Portal</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Manage live restaurant orders directly from MySQL food_delivery_db</p>
          </div>
        </div>

        <button onClick={onRefresh} className="btn-secondary">
          <RefreshCw size={16} /> Refresh Orders
        </button>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {['All', 'PLACED', 'CONFIRMED', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED'].map(status => {
          const active = selectedFilter === status;
          const count = status === 'All' ? orders.length : orders.filter(o => o.orderStatus === status).length;
          return (
            <button
              key={status}
              onClick={() => setSelectedFilter(status)}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                background: active ? 'var(--accent-purple)' : 'rgba(255,255,255,0.05)',
                border: active ? '1px solid var(--accent-purple)' : '1px solid var(--border-color)',
                color: active ? '#fff' : 'var(--text-muted)',
                fontWeight: active ? '700' : '500',
                fontSize: '0.88rem',
                cursor: 'pointer'
              }}
            >
              {status} ({count})
            </button>
          );
        })}
      </div>

      {/* Orders Table */}
      <div className="glass-panel" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '16px 20px', color: 'var(--text-muted)' }}>Order ID</th>
              <th style={{ padding: '16px 20px', color: 'var(--text-muted)' }}>Restaurant</th>
              <th style={{ padding: '16px 20px', color: 'var(--text-muted)' }}>Delivery Address</th>
              <th style={{ padding: '16px 20px', color: 'var(--text-muted)' }}>Amount</th>
              <th style={{ padding: '16px 20px', color: 'var(--text-muted)' }}>Current Status</th>
              <th style={{ padding: '16px 20px', color: 'var(--text-muted)' }}>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: 'var(--text-dim)' }}>
                  No orders matching criteria.
                </td>
              </tr>
            ) : (
              filteredOrders.map(order => (
                <tr key={order.orderId} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px 20px', fontWeight: '800', color: 'var(--accent-primary)' }}>
                    #{order.orderId}
                  </td>
                  <td style={{ padding: '16px 20px', fontWeight: '600' }}>
                    {order.restaurantName || 'Restaurant'}
                  </td>
                  <td style={{ padding: '16px 20px', color: 'var(--text-muted)', maxWidth: '240px' }}>
                    {order.deliveryAddress}
                  </td>
                  <td style={{ padding: '16px 20px', fontWeight: '700' }}>
                    ₹{order.totalAmount.toFixed(2)}
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.78rem',
                      fontWeight: '700',
                      background: order.orderStatus === 'DELIVERED' 
                        ? 'rgba(16, 185, 129, 0.2)' 
                        : order.orderStatus === 'OUT_FOR_DELIVERY' 
                          ? 'rgba(245, 158, 11, 0.2)' 
                          : 'rgba(255, 94, 54, 0.2)',
                      color: order.orderStatus === 'DELIVERED' 
                        ? 'var(--accent-green)' 
                        : order.orderStatus === 'OUT_FOR_DELIVERY' 
                          ? 'var(--accent-gold)' 
                          : 'var(--accent-primary)'
                    }}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <select
                      value={order.orderStatus}
                      onChange={(e) => onUpdateStatus(order.orderId, e.target.value)}
                      style={{
                        background: 'rgba(0,0,0,0.4)',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-sm)',
                        color: '#fff',
                        padding: '6px 10px',
                        fontSize: '0.85rem',
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="PLACED">PLACED</option>
                      <option value="CONFIRMED">CONFIRMED</option>
                      <option value="PREPARING">PREPARING</option>
                      <option value="OUT_FOR_DELIVERY">OUT_FOR_DELIVERY</option>
                      <option value="DELIVERED">DELIVERED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
