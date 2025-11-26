import React from 'react';

export default function PerformanceProfiler() {
  const scores = [
    { name: 'Performance', score: 92, color: '#22c55e' },
    { name: 'Accessibility', score: 88, color: '#22c55e' },
    { name: 'Best Practices', score: 95, color: '#22c55e' },
    { name: 'SEO', score: 100, color: '#22c55e' }
  ];

  return (
    <div>
      <h2 style={{ margin: '0 0 24px 0', fontSize: '28px' }}>📈 Performance Profiler</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {scores.map(item => (
          <div key={item.name} style={{
            background: 'white', borderRadius: '12px', padding: '30px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)', textAlign: 'center'
          }}>
            <div style={{
              width: '120px', height: '120px', borderRadius: '50%',
              border: `8px solid ${item.color}`, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px', fontSize: '32px', fontWeight: '700',
              color: item.color
            }}>
              {item.score}
            </div>
            <h3 style={{ margin: 0 }}>{item.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
