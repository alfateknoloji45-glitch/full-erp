import React, { useState } from 'react';

export default function QuoteList() {
  const [quotes] = useState([
    { id: 1, number: 'QT-2024-001', customer: 'Ahmet Yılmaz', total: 15000, status: 'pending', date: '2024-11-20' },
    { id: 2, number: 'QT-2024-002', customer: 'Mehmet Demir', total: 28500, status: 'approved', date: '2024-11-22' },
    { id: 3, number: 'QT-2024-003', customer: 'Ayşe Kaya', total: 12000, status: 'rejected', date: '2024-11-24' },
    { id: 4, number: 'QT-2024-004', customer: 'Fatma Şahin', total: 45000, status: 'sent', date: '2024-11-25' }
  ]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'approved': return { bg: '#d1fae5', text: '#22c55e' };
      case 'rejected': return { bg: '#fee2e2', text: '#ef4444' };
      case 'sent': return { bg: '#dbeafe', text: '#3b82f6' };
      case 'pending': return { bg: '#fef3c7', text: '#f59e0b' };
      default: return { bg: '#f3f4f6', text: '#6b7280' };
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'approved': return '✓ Onaylandı';
      case 'rejected': return '✕ Reddedildi';
      case 'sent': return '📧 Gönderildi';
      case 'pending': return '⏳ Beklemede';
      default: return status;
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h2 style={{ margin: 0, fontSize: '28px' }}>📋 Teklifler</h2>
        <button style={{
          padding: '10px 20px', background: '#667eea', color: 'white',
          border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600'
        }}>
          + Yeni Teklif
        </button>
      </div>

      <div style={{ display: 'grid', gap: '12px' }}>
        {quotes.map(quote => {
          const statusStyle = getStatusColor(quote.status);
          return (
            <div key={quote.id} style={{
              background: 'white', borderRadius: '12px', padding: '20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600', fontSize: '16px', marginBottom: '5px' }}>
                  {quote.number}
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  👤 {quote.customer} • 📅 {quote.date}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ fontSize: '20px', fontWeight: '700', color: '#667eea' }}>
                  ₺{quote.total.toLocaleString()}
                </div>
                <div style={{
                  padding: '6px 16px', borderRadius: '20px',
                  background: statusStyle.bg, color: statusStyle.text,
                  fontSize: '13px', fontWeight: '600', minWidth: '120px', textAlign: 'center'
                }}>
                  {getStatusText(quote.status)}
                </div>
                <button style={{
                  padding: '8px 16px', background: '#f3f4f6', border: 'none',
                  borderRadius: '8px', cursor: 'pointer', fontWeight: '600'
                }}>
                  Görüntüle
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
