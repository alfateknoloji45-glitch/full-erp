import React, { useState } from 'react';

export default function BillingSystem() {
  const [billings] = useState([
    { id: 1, date: '2024-11-01', amount: 299, plan: 'Starter', status: 'paid', invoice: 'INV-2024-101' },
    { id: 2, date: '2024-10-01', amount: 299, plan: 'Starter', status: 'paid', invoice: 'INV-2024-100' },
    { id: 3, date: '2024-09-01', amount: 299, plan: 'Starter', status: 'paid', invoice: 'INV-2024-099' },
    { id: 4, date: '2024-12-01', amount: 299, plan: 'Starter', status: 'pending', invoice: 'INV-2024-102' }
  ]);

  return (
    <div>
      <h2 style={{ margin: '0 0 24px 0', fontSize: '28px' }}>💰 Faturalama</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '24px' }}>
        {[
          { label: 'Bu Ay', value: '₺299', icon: '📅' },
          { label: 'Yıllık Toplam', value: '₺3,588', icon: '📊' },
          { label: 'Sonraki Ödeme', value: '1 Ara 2024', icon: '⏰' }
        ].map((item, i) => (
          <div key={i} style={{
            background: 'white', borderRadius: '12px', padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>{item.icon}</div>
            <div style={{ fontSize: '13px', color: '#666', marginBottom: '5px' }}>{item.label}</div>
            <div style={{ fontSize: '20px', fontWeight: '700', color: '#667eea' }}>{item.value}</div>
          </div>
        ))}
      </div>

      <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <h3 style={{ marginTop: 0 }}>📋 Fatura Geçmişi</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
              <th style={{ padding: '12px', textAlign: 'left', color: '#666', fontWeight: '600' }}>Tarih</th>
              <th style={{ padding: '12px', textAlign: 'left', color: '#666', fontWeight: '600' }}>Plan</th>
              <th style={{ padding: '12px', textAlign: 'left', color: '#666', fontWeight: '600' }}>Tutar</th>
              <th style={{ padding: '12px', textAlign: 'left', color: '#666', fontWeight: '600' }}>Durum</th>
              <th style={{ padding: '12px', textAlign: 'left', color: '#666', fontWeight: '600' }}>Fatura</th>
            </tr>
          </thead>
          <tbody>
            {billings.map(billing => (
              <tr key={billing.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '16px' }}>{billing.date}</td>
                <td style={{ padding: '16px' }}>{billing.plan}</td>
                <td style={{ padding: '16px', fontWeight: '600' }}>₺{billing.amount}</td>
                <td style={{ padding: '16px' }}>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '12px',
                    background: billing.status === 'paid' ? '#d1fae5' : '#fef3c7',
                    color: billing.status === 'paid' ? '#22c55e' : '#f59e0b',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {billing.status === 'paid' ? '✓ Ödendi' : '⏳ Bekliyor'}
                  </span>
                </td>
                <td style={{ padding: '16px' }}>
                  <button style={{
                    padding: '6px 12px',
                    background: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '13px'
                  }}>
                    📄 İndir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
