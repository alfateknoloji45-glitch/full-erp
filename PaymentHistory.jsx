import React, { useState } from 'react';

export default function PaymentHistory() {
  const [payments] = useState([
    { id: 1, date: '2024-11-15', amount: 299, method: 'Kredi Kartı', status: 'success', invoice: 'INV-2024-101', card: '****1234' },
    { id: 2, date: '2024-10-15', amount: 299, method: 'Kredi Kartı', status: 'success', invoice: 'INV-2024-100', card: '****1234' },
    { id: 3, date: '2024-09-15', amount: 299, method: 'Kredi Kartı', status: 'success', invoice: 'INV-2024-099', card: '****1234' },
    { id: 4, date: '2024-08-15', amount: 299, method: 'Kredi Kartı', status: 'success', invoice: 'INV-2024-098', card: '****1234' },
    { id: 5, date: '2024-07-15', amount: 299, method: 'Havale', status: 'success', invoice: 'INV-2024-097', card: null },
    { id: 6, date: '2024-06-15', amount: 299, method: 'Kredi Kartı', status: 'failed', invoice: null, card: '****1234' }
  ]);

  const totalPaid = payments.filter(p => p.status === 'success').reduce((sum, p) => sum + p.amount, 0);

  return (
    <div>
      <h2 style={{ margin: '0 0 24px 0', fontSize: '28px' }}>💳 Ödeme Geçmişi</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '24px' }}>
        {[
          { label: 'Toplam Ödeme', value: `₺${totalPaid}`, icon: '💰', color: '#667eea' },
          { label: 'Başarılı', value: payments.filter(p => p.status === 'success').length, icon: '✓', color: '#22c55e' },
          { label: 'Başarısız', value: payments.filter(p => p.status === 'failed').length, icon: '✕', color: '#ef4444' }
        ].map((stat, i) => (
          <div key={i} style={{
            background: 'white', borderRadius: '12px', padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>{stat.icon}</div>
            <div style={{ fontSize: '13px', color: '#666', marginBottom: '5px' }}>{stat.label}</div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: stat.color }}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
      }}>
        <h3 style={{ marginTop: 0, marginBottom: '20px' }}>📋 Tüm İşlemler</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {payments.map(payment => (
            <div key={payment.id} style={{
              padding: '20px',
              background: '#f9fafb',
              borderRadius: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderLeft: `4px solid ${payment.status === 'success' ? '#22c55e' : '#ef4444'}`
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600', marginBottom: '5px' }}>
                  ₺{payment.amount} - {payment.method}
                </div>
                <div style={{ fontSize: '13px', color: '#666' }}>
                  📅 {payment.date}
                  {payment.card && ` • 💳 ${payment.card}`}
                  {payment.invoice && ` • 📄 ${payment.invoice}`}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{
                  padding: '6px 16px',
                  borderRadius: '20px',
                  background: payment.status === 'success' ? '#d1fae5' : '#fee2e2',
                  color: payment.status === 'success' ? '#22c55e' : '#ef4444',
                  fontSize: '13px',
                  fontWeight: '700'
                }}>
                  {payment.status === 'success' ? '✓ Başarılı' : '✕ Başarısız'}
                </div>
                {payment.invoice && (
                  <button style={{
                    padding: '8px 16px',
                    background: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '600'
                  }}>
                    📄 Fatura
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
