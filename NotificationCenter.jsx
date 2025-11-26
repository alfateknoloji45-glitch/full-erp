import React, { useState } from 'react';

export default function NotificationCenter() {
  const [notifications] = useState([
    { id: 1, type: 'success', title: 'Ödeme Alındı', message: 'Ahmet Yılmaz\'dan ₺15,000 ödeme alındı.', time: '5 dk önce', read: false },
    { id: 2, type: 'info', title: 'Yeni Teklif', message: 'QT-2024-125 numaralı teklif oluşturuldu.', time: '1 saat önce', read: false },
    { id: 3, type: 'warning', title: 'Limit Uyarısı', message: 'Aylık teklif limitinin %80\'ine ulaştınız.', time: '3 saat önce', read: true },
    { id: 4, type: 'info', title: 'Fatura Gönderildi', message: 'INV-2024-089 faturası Mehmet Demir\'e gönderildi.', time: 'Dün', read: true }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type) => {
    switch(type) {
      case 'success': return '✓';
      case 'warning': return '⚠️';
      case 'error': return '✕';
      default: return 'ℹ️';
    }
  };

  const getColor = (type) => {
    switch(type) {
      case 'success': return { bg: '#d1fae5', text: '#22c55e' };
      case 'warning': return { bg: '#fef3c7', text: '#f59e0b' };
      case 'error': return { bg: '#fee2e2', text: '#ef4444' };
      default: return { bg: '#dbeafe', text: '#3b82f6' };
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ margin: '0 0 4px 0', fontSize: '28px' }}>🔔 Bildirimler</h2>
          <div style={{ fontSize: '14px', color: '#666' }}>
            {unreadCount} okunmamış bildirim
          </div>
        </div>
        <button style={{
          padding: '10px 20px', background: '#f3f4f6', color: '#374151',
          border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600'
        }}>
          Tümünü Okundu İşaretle
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {notifications.map(notif => {
          const colors = getColor(notif.type);
          return (
            <div key={notif.id} style={{
              background: notif.read ? 'white' : '#f9fafb',
              borderRadius: '12px', padding: '20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              borderLeft: `4px solid ${colors.text}`,
              display: 'flex', gap: '16px', alignItems: 'start'
            }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '50%',
                background: colors.bg, color: colors.text,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '20px', flexShrink: 0
              }}>
                {getIcon(notif.type)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>{notif.title}</h4>
                  <span style={{ fontSize: '13px', color: '#6b7280' }}>{notif.time}</span>
                </div>
                <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>{notif.message}</p>
              </div>
              {!notif.read && (
                <div style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  background: '#667eea', flexShrink: 0, marginTop: '6px'
                }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
