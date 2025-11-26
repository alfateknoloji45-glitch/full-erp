import React from 'react';

export default function AdvancedAnalytics() {
  const metrics = {
    revenue: { current: 245000, previous: 189000, change: 29.6 },
    customers: { current: 156, previous: 134, change: 16.4 },
    conversion: { current: 12.8, previous: 9.5, change: 34.7 },
    churn: { current: 3.2, previous: 5.1, change: -37.3 }
  };

  return (
    <div>
      <h2 style={{ margin: '0 0 24px 0', fontSize: '28px' }}>📊 İleri Analitik</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
        {[
          { key: 'revenue', label: 'Gelir', value: `₺${metrics.revenue.current.toLocaleString()}`, icon: '💰' },
          { key: 'customers', label: 'Müşteri', value: metrics.customers.current, icon: '👥' },
          { key: 'conversion', label: 'Dönüşüm', value: `%${metrics.conversion.current}`, icon: '📈' },
          { key: 'churn', label: 'Churn', value: `%${metrics.churn.current}`, icon: '📉' }
        ].map((metric) => {
          const data = metrics[metric.key];
          const isPositive = data.change > 0;
          const isGood = metric.key === 'churn' ? !isPositive : isPositive;
          
          return (
            <div key={metric.key} style={{
              background: 'white', borderRadius: '12px', padding: '24px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>{metric.icon}</div>
              <div style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>{metric.label}</div>
              <div style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px', color: '#1f2937' }}>
                {metric.value}
              </div>
              <div style={{
                fontSize: '14px', fontWeight: '600',
                color: isGood ? '#22c55e' : '#ef4444'
              }}>
                {isPositive ? '↗' : '↙'} {Math.abs(data.change).toFixed(1)}%
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '32px' }}>
        <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h3 style={{ marginTop: 0 }}>📈 Revenue Trend (Son 6 Ay)</h3>
          <div style={{ height: '250px', display: 'flex', alignItems: 'end', gap: '12px' }}>
            {[120, 145, 160, 189, 215, 245].map((value, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                  width: '100%', height: `${(value / 245) * 100}%`,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '8px 8px 0 0', marginBottom: '8px'
                }} />
                <div style={{ fontSize: '12px', color: '#666' }}>₺{value}K</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h3 style={{ marginTop: 0 }}>🎯 Hedefler</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { label: 'MRR', current: 245, target: 300, unit: 'K' },
              { label: 'Müşteri', current: 156, target: 200, unit: '' },
              { label: 'Churn', current: 3.2, target: 2.5, unit: '%', reverse: true }
            ].map((goal, i) => {
              const percentage = (goal.current / goal.target) * 100;
              const achieved = goal.reverse ? goal.current <= goal.target : goal.current >= goal.target;
              
              return (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                    <span style={{ fontWeight: '600' }}>{goal.label}</span>
                    <span style={{ color: achieved ? '#22c55e' : '#f59e0b' }}>
                      {goal.current}{goal.unit}/{goal.target}{goal.unit}
                    </span>
                  </div>
                  <div style={{ height: '8px', background: '#f3f4f6', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${Math.min(percentage, 100)}%`,
                      height: '100%',
                      background: achieved ? '#22c55e' : '#f59e0b',
                      transition: 'width 0.3s'
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <h3 style={{ marginTop: 0 }}>💡 AI Önerileri</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { icon: '🚀', text: 'Starter planındaki 15 müşteri Pro\'ya yükseltme potansiyeli taşıyor (+₺7,500 MRR)' },
            { icon: '⚠️', text: 'Son 30 günde 3 müşteri düşük aktivite gösterdi. Müdahale gerekebilir.' },
            { icon: '📈', text: 'Email kampanyaları %34 dönüşüm sağlıyor. Frekansi arttırılabilir.' }
          ].map((insight, i) => (
            <div key={i} style={{
              padding: '16px', background: '#f9fafb', borderRadius: '8px',
              display: 'flex', gap: '12px', alignItems: 'start'
            }}>
              <span style={{ fontSize: '24px' }}>{insight.icon}</span>
              <span style={{ fontSize: '14px', lineHeight: '1.6' }}>{insight.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
