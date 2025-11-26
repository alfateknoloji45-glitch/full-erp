import React from 'react';

export default function SwaggerDocs() {
  const endpoints = [
    { method: 'GET', path: '/api/products', desc: 'List all products' },
    { method: 'POST', path: '/api/products', desc: 'Create product' },
    { method: 'GET', path: '/api/orders', desc: 'List orders' },
    { method: 'PUT', path: '/api/orders/:id', desc: 'Update order' },
    { method: 'DELETE', path: '/api/products/:id', desc: 'Delete product' }
  ];

  const getMethodColor = (method) => {
    switch(method) {
      case 'GET': return '#3b82f6';
      case 'POST': return '#22c55e';
      case 'PUT': return '#f59e0b';
      case 'DELETE': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div>
      <h2 style={{ margin: '0 0 24px 0', fontSize: '28px' }}>📝 API Documentation</h2>
      <div style={{
        background: 'white', borderRadius: '12px', padding: '30px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
      }}>
        <h3 style={{ marginTop: 0 }}>Endpoints</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {endpoints.map((ep, i) => (
            <div key={i} style={{
              padding: '15px', background: '#f9fafb', borderRadius: '8px',
              display: 'flex', gap: '15px', alignItems: 'center'
            }}>
              <span style={{
                padding: '4px 12px', borderRadius: '6px',
                background: getMethodColor(ep.method),
                color: 'white', fontSize: '12px', fontWeight: '700',
                minWidth: '60px', textAlign: 'center'
              }}>
                {ep.method}
              </span>
              <code style={{ flex: 1, fontFamily: 'monospace', fontSize: '14px' }}>
                {ep.path}
              </code>
              <span style={{ fontSize: '13px', color: '#666' }}>{ep.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
