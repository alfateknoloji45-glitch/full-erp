import React, { useState } from 'react';

export default function BuildOptimizer() {
  const [metrics, setMetrics] = useState({
    bundleSize: '2.4 MB',
    buildTime: '34s',
    chunks: 12,
    optimized: false
  });

  const optimize = () => {
    setTimeout(() => {
      setMetrics({
        bundleSize: '1.2 MB',
        buildTime: '18s',
        chunks: 8,
        optimized: true
      });
    }, 2000);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h2 style={{ margin: 0, fontSize: '28px' }}>📦 Build Optimizer</h2>
        <button onClick={optimize} disabled={metrics.optimized} style={{
          padding: '10px 20px', background: metrics.optimized ? '#22c55e' : '#667eea',
          color: 'white', border: 'none', borderRadius: '8px',
          cursor: metrics.optimized ? 'not-allowed' : 'pointer', fontWeight: '600'
        }}>
          {metrics.optimized ? '✓ Optimized' : '⚡ Optimize'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        {[
          { label: 'Bundle Size', value: metrics.bundleSize, icon: '📦' },
          { label: 'Build Time', value: metrics.buildTime, icon: '⏱️' },
          { label: 'Chunks', value: metrics.chunks, icon: '📊' },
          { label: 'Status', value: metrics.optimized ? 'Optimized' : 'Normal', icon: '🎯' }
        ].map((metric, i) => (
          <div key={i} style={{
            background: 'white', borderRadius: '12px', padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>{metric.icon}</div>
            <div style={{ fontSize: '13px', color: '#666', marginBottom: '5px' }}>{metric.label}</div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#667eea' }}>{metric.value}</div>
          </div>
        ))}
      </div>

      <div style={{
        background: 'white', borderRadius: '12px', padding: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
      }}>
        <h3 style={{ marginTop: 0 }}>⚙️ Optimization Settings</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {['Tree Shaking', 'Code Splitting', 'Minification', 'Compression'].map(opt => (
            <label key={opt} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '12px', background: '#f9fafb', borderRadius: '8px'
            }}>
              <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px' }} />
              <span style={{ fontWeight: '600' }}>{opt}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
