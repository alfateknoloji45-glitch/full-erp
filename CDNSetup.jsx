import React from 'react';

export default function CDNSetup() {
  const providers = [
    { name: 'CloudFlare', status: 'active', traffic: '85%' },
    { name: 'Fastly', status: 'standby', traffic: '10%' },
    { name: 'AWS CloudFront', status: 'standby', traffic: '5%' }
  ];

  return (
    <div>
      <h2 style={{ margin: '0 0 24px 0', fontSize: '28px' }}>🌍 CDN Setup</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {providers.map(p => (
          <div key={p.name} style={{
            background: 'white', borderRadius: '12px', padding: '30px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)', textAlign: 'center'
          }}>
            <h3 style={{ marginTop: 0 }}>{p.name}</h3>
            <div style={{
              fontSize: '32px', fontWeight: '700', color: '#667eea',
              marginBottom: '10px'
            }}>
              {p.traffic}
            </div>
            <div style={{
              padding: '6px 16px', borderRadius: '20px',
              background: p.status === 'active' ? '#d1fae5' : '#f3f4f6',
              color: p.status === 'active' ? '#22c55e' : '#6b7280',
              fontSize: '12px', fontWeight: '700', display: 'inline-block'
            }}>
              {p.status.toUpperCase()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
