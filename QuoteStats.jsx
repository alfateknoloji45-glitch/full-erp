import React from 'react';

export default function QuoteStats() {
  const stats = [
    { label: 'Toplam Teklif', value: '127', icon: '📋', color: '#667eea' },
    { label: 'Onaylanan', value: '54', icon: '✓', color: '#22c55e' },
    { label: 'Bekleyen', value: '38', icon: '⏳', color: '#f59e0b' },
    { label: 'Toplam Değer', value: '₺1.2M', icon: '💰', color: '#3b82f6' }
  ];

  return (
    <div>
      <h2 style={{ margin: '0 0 24px 0', fontSize: '28px' }}>📊 Teklif İstatistikleri</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {stats.map((stat, i) => (
          <div key={i} style={{
            background: 'white', borderRadius: '12px', padding: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)', textAlign: 'center'
          }}>
            <div style={{ fontSize: '36px', marginBottom: '10px' }}>{stat.icon}</div>
            <div style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>{stat.label}</div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: stat.color }}>{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
