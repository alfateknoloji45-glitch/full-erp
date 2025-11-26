import React, { useState } from 'react';

export default function E2ETesting() {
  const [tests, setTests] = useState([
    { name: 'Login Flow', status: 'passed', duration: '2.3s' },
    { name: 'Create Order', status: 'passed', duration: '4.1s' },
    { name: 'Payment Process', status: 'running', duration: '-' },
    { name: 'Admin Dashboard', status: 'pending', duration: '-' }
  ]);

  return (
    <div>
      <h2 style={{ margin: '0 0 24px 0', fontSize: '28px' }}>🧪 E2E Testing</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {tests.map((test, i) => (
          <div key={i} style={{
            background: 'white', borderRadius: '12px', padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <div>
              <div style={{ fontWeight: '600', marginBottom: '5px' }}>{test.name}</div>
              <div style={{ fontSize: '13px', color: '#666' }}>Duration: {test.duration}</div>
            </div>
            <div style={{
              padding: '6px 16px',
              background: test.status === 'passed' ? '#d1fae5' : test.status === 'running' ? '#dbeafe' : '#f3f4f6',
              color: test.status === 'passed' ? '#22c55e' : test.status === 'running' ? '#3b82f6' : '#6b7280',
              borderRadius: '20px', fontSize: '12px', fontWeight: '700'
            }}>
              {test.status === 'passed' ? '✓' : test.status === 'running' ? '⏳' : '•'} {test.status.toUpperCase()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
