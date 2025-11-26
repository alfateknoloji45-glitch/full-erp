import React, { useEffect, useState } from 'react';

export default function ErrorTracking() {
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    const base = (typeof window !== 'undefined' && window.__ALFAI_API__) ? window.__ALFAI_API__ : (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001');
    const tenant = (typeof localStorage !== 'undefined') ? localStorage.getItem('alfai_company') : null;
    fetch(`${base}/api/errors?limit=100`, {
      headers: tenant ? { 'X-Tenant': tenant } : {}
    })
      .then(r => r.json())
      .then(d => { if (mounted) { setErrors(d?.errors || []); } })
      .catch((e) => { if (mounted) { setErr(e.message || 'Hata'); } })
      .finally(() => { if (mounted) { setLoading(false); } });
    return () => { mounted = false; };
  }, []);

  const getSeverityColor = (severity) => {
    return severity === 'high' ? '#ef4444' : severity === 'medium' ? '#f59e0b' : '#3b82f6';
  };

  return (
    <div>
      <h2 style={{ margin: '0 0 24px 0', fontSize: '28px' }}>📊 Error Tracking</h2>
      {loading && (
        <div style={{ marginBottom: '12px', color: '#6b7280' }}>Yükleniyor...</div>
      )}
      {err && (
        <div style={{ marginBottom: '12px', color: '#ef4444' }}>{err}</div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '24px' }}>
        <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <div style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>Total Errors</div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#667eea' }}>{errors.length}</div>
        </div>
        <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <div style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>Affected Users</div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#ef4444' }}>—</div>
        </div>
        <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <div style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>Last 24h</div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#22c55e' }}>—</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {errors.map(error => (
          <div key={error.id} style={{
            background: 'white', borderRadius: '12px', padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            borderLeft: `4px solid ${getSeverityColor(error.severity || 'low')}`
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600', marginBottom: '8px' }}>{error.message}</div>
                <div style={{ fontSize: '13px', color: '#666' }}>
                  {new Date(error.timestamp || Date.now()).toLocaleString()} • {error.tenant || 'default'}
                </div>
              </div>
              <div style={{
                padding: '4px 12px', borderRadius: '12px',
                background: getSeverityColor(error.severity || 'low') + '20',
                color: getSeverityColor(error.severity || 'low'),
                fontSize: '11px', fontWeight: '700'
              }}>
                {(error.severity || 'low').toUpperCase()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
