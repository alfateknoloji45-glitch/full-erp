import React from 'react';

export default function QuoteTemplates() {
  const templates = [
    { id: 1, name: 'Standart Teklif', desc: 'Genel amaçlı teklif şablonu', icon: '📄' },
    { id: 2, name: 'Yazılım Projesi', desc: 'Yazılım geliştirme teklifleri', icon: '💻' },
    { id: 3, name: 'Danışmanlık', desc: 'Danışmanlık hizmeti teklifleri', icon: '👔' },
    { id: 4, name: 'Tasarım', desc: 'Grafik tasarım teklifleri', icon: '🎨' }
  ];

  return (
    <div>
      <h2 style={{ margin: '0 0 24px 0', fontSize: '28px' }}>🎨 Teklif Şablonları</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {templates.map(t => (
          <div key={t.id} style={{
            background: 'white', borderRadius: '12px', padding: '30px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)', textAlign: 'center',
            cursor: 'pointer', transition: 'transform 0.2s'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>{t.icon}</div>
            <h3 style={{ margin: '0 0 10px 0' }}>{t.name}</h3>
            <p style={{ margin: '0 0 20px 0', color: '#666', fontSize: '14px' }}>{t.desc}</p>
            <button style={{
              padding: '10px 24px', background: '#667eea', color: 'white',
              border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600'
            }}>
              Kullan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
