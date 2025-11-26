import React from 'react';
import { Line } from 'react-chartjs-2';

export default function ProductionAnalytics() {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Active Users',
      data: [1200, 1900, 1500, 2100, 1800, 2400, 2200],
      borderColor: '#667eea',
      backgroundColor: 'rgba(102, 126, 234, 0.1)',
      fill: true
    }]
  };

  return (
    <div>
      <h2 style={{ margin: '0 0 24px 0', fontSize: '28px' }}>📊 Production Analytics</h2>
      <div style={{
        background: 'white', borderRadius: '12px', padding: '30px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
      }}>
        <Line data={data} options={{ responsive: true, maintainAspectRatio: false }} height={300} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginTop: '20px' }}>
        {[
          { label: 'Uptime', value: '99.9%' },
          { label: 'Response Time', value: '120ms' },
          { label: 'Error Rate', value: '0.02%' },
          { label: 'Throughput', value: '1.2K/s' }
        ].map((m, i) => (
          <div key={i} style={{
            background: 'white', borderRadius: '12px', padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)', textAlign: 'center'
          }}>
            <div style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>{m.label}</div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#667eea' }}>{m.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
