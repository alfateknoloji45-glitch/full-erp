import React from 'react';

export default function UsageTracking() {
  const usage = {
    quotes: { used: 12, limit: 50, percent: 24 },
    users: { used: 2, limit: 3, percent: 67 },
    storage: { used: 1.2, limit: 5, percent: 24, unit: 'GB' },
    apiCalls: { used: 1240, limit: 10000, percent: 12 }
  };

  const getColor = (percent) => {
    if (percent < 50) return '#22c55e';
    if (percent < 80) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div>
      <h2 style={{ margin: '0 0 24px 0', fontSize: '28px' }}>📊 Kullanım Takibi</h2>
      <div style={{ display: 'grid', gap: '20px' }}>
        {[
          { key: 'quotes', label: 'Teklifler', icon: '📝' },
          { key: 'users', label: 'Kullanıcılar', icon: '👥' },
          { key: 'storage', label: 'Depolama', icon: '💾' },
          { key: 'apiCalls', label: 'API Çağrıları', icon: '🔌' }
        ].map(item => {
          const data = usage[item.key];
          const color = getColor(data.percent);
          return (
            <div key={item.key} style={{
              background: 'white', borderRadius: '12px', padding: '24px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '24px' }}>{item.icon}</span>
                  <span style={{ fontWeight: '600' }}>{item.label}</span>
                </div>
                <span style={{ fontSize: '18px', fontWeight: '700', color }}>
                  {data.used}{data.unit || ''} / {data.limit}{data.unit || ''}
                </span>
              </div>
              <div style={{ background: '#f3f4f6', borderRadius: '10px', height: '12px', overflow: 'hidden' }}>
                <div style={{
                  width: `${data.percent}%`,
                  height: '100%',
                  background: color,
                  transition: 'width 0.3s'
                }} />
              </div>
              <div style={{ marginTop: '8px', fontSize: '13px', color: '#666' }}>
                {data.percent}% kullanıldı
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
