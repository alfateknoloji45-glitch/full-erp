import React from 'react';

export default function SecurityHardening() {
  const checks = [
    { name: 'HTTPS Enabled', status: true },
    { name: 'SQL Injection Protection', status: true },
    { name: 'XSS Prevention', status: true },
    { name: 'CSRF Tokens', status: true },
    { name: 'Rate Limiting', status: false },
    { name: 'Input Validation', status: true }
  ];

  return (
    <div>
      <h2 style={{ margin: '0 0 24px 0', fontSize: '28px' }}>🔒 Security Hardening</h2>
      <div style={{
        background: 'white', borderRadius: '12px', padding: '30px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {checks.map((check, i) => (
            <div key={i} style={{
              padding: '15px', background: '#f9fafb', borderRadius: '8px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
              <span style={{ fontWeight: '600' }}>{check.name}</span>
              <span style={{
                padding: '4px 12px', borderRadius: '12px',
                background: check.status ? '#d1fae5' : '#fee2e2',
                color: check.status ? '#22c55e' : '#ef4444',
                fontSize: '12px', fontWeight: '700'
              }}>
                {check.status ? '✓ ACTIVE' : '✕ INACTIVE'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
