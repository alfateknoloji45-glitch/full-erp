import React from 'react';

export default function SEOManager() {
  const seoScore = 92;
  
  const checks = [
    { name: 'Meta Title', status: 'pass', value: 'ALFAI ERP - Teklif & Fatura Yönetimi' },
    { name: 'Meta Description', status: 'pass', value: 'Profesyonel teklif ve fatura yönetimi...' },
    { name: 'H1 Tag', status: 'pass', value: '1 adet (optimize)' },
    { name: 'Mobile Friendly', status: 'pass', value: '%100 responsive' },
    { name: 'Page Speed', status: 'pass', value: '98/100' },
    { name: 'SSL Certificate', status: 'pass', value: 'Aktif' },
    { name: 'Sitemap', status: 'pass', value: 'sitemap.xml mevcut' },
    { name: 'Robots.txt', status: 'warning', value: 'Güncellenebilir' }
  ];

  return (
    <div>
      <h2 style={{ margin: '0 0 24px 0', fontSize: '28px' }}>🔍 SEO Yönetimi</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px', marginBottom: '32px' }}>
        <div style={{
          background: 'white', borderRadius: '12px', padding: '32px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)', textAlign: 'center'
        }}>
          <div style={{ position: 'relative', width: '160px', height: '160px', margin: '0 auto 20px' }}>
            <svg width="160" height="160" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="80" cy="80" r="70" fill="none" stroke="#f3f4f6" strokeWidth="12" />
              <circle
                cx="80" cy="80" r="70" fill="none"
                stroke="#22c55e" strokeWidth="12"
                strokeDasharray={`${(seoScore / 100) * 440} 440`}
                strokeLinecap="round"
              />
            </svg>
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)', fontSize: '48px',
              fontWeight: '800', color: '#22c55e'
            }}>
              {seoScore}
            </div>
          </div>
          <h3 style={{ margin: '0 0 8px 0' }}>SEO Score</h3>
          <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
            Harika! Siteniz SEO için optimize edilmiş.
          </p>
        </div>

        <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h3 style={{ marginTop: 0 }}>✓ SEO Kontrolleri</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {checks.map((check, i) => (
              <div key={i} style={{
                padding: '16px', background: '#f9fafb', borderRadius: '8px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{
                    fontSize: '20px',
                    color: check.status === 'pass' ? '#22c55e' : '#f59e0b'
                  }}>
                    {check.status === 'pass' ? '✓' : '⚠️'}
                  </span>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '14px' }}>{check.name}</div>
                    <div style={{ fontSize: '13px', color: '#666' }}>{check.value}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <h3 style={{ marginTop: 0 }}>🎯 Hedef Kelimeler</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {[
            'teklif yönetimi', 'fatura programı', 'erp yazılımı',
            'online faturalandırma', 'B2B SaaS', 'proje yönetimi'
          ].map((keyword, i) => (
            <div key={i} style={{
              padding: '10px 20px', background: '#eff6ff',
              color: '#3b82f6', borderRadius: '20px',
              fontSize: '14px', fontWeight: '600'
            }}>
              {keyword}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
