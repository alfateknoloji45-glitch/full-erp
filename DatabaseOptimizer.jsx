import React from 'react';

export default function DatabaseOptimizer() {
  const stats = [
    { label: 'Query Time', value: '45ms', icon: '⚡' },
    { label: 'Cache Hit Rate', value: '92%', icon: '🎯' },
    { label: 'Connections', value: '24/100', icon: '🔌' },
    { label: 'Index Usage', value: '88%', icon: '📊' }
  ];

  return (
    <div>
      <h2 style={{ margin: '0 0 24px 0', fontSize: '28px' }}>💾 Database Optimizer</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {stats.map((stat, i) => (
          <div key={i} style={{
            background: 'white', borderRadius: '12px', padding: '30px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>{stat.icon}</div>
            <div style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>{stat.label}</div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: '#667eea' }}>{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
