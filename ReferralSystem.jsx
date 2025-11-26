import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function ReferralSystem() {
  const [referralCode] = useState('ABC-XYZ-123');
  const [referrals] = useState([
    { id: 1, name: 'Mehmet Yılmaz', email: 'm***@example.com', status: 'converted', reward: 100, date: '2024-11-15' },
    { id: 2, name: 'Ayşe Demir', email: 'a***@example.com', status: 'signed_up', reward: 0, date: '2024-11-20' },
    { id: 3, name: 'Ahmet Kaya', email: 'a***@example.com', status: 'pending', reward: 0, date: '2024-11-25' }
  ]);

  const copyLink = () => {
    navigator.clipboard.writeText(`https://alfaierp.com/ref/${referralCode}`);
    toast.success('Link kopyalandı! 🎉');
  };

  const shareEmail = () => {
    window.location.href = `mailto:?subject=ALFAI ERP ile Tanış&body=Merhaba! ALFAI ERP'yi denemen için seni davet ediyorum: https://alfaierp.com/ref/${referralCode}`;
  };

  return (
    <div>
      <h2 style={{ margin: '0 0 24px 0', fontSize: '28px' }}>🎁 Referans Programı</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
        {[
          { label: 'Toplam Referans', value: '12', icon: '👥', color: '#667eea' },
          { label: 'Dönüşüm', value: '5', icon: '✓', color: '#22c55e' },
          { label: 'Kazanılan', value: '₺500', icon: '💰', color: '#f59e0b' },
          { label: 'Bekleyen', value: '₺700', icon: '⏳', color: '#3b82f6' }
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
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '16px', padding: '40px', color: 'white', marginBottom: '32px'
      }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '24px' }}>📢 Arkadaşını Davet Et, Kazan!</h3>
        <p style={{ margin: '0 0 24px 0', fontSize: '16px', opacity: 0.9 }}>
          Her başarılı referans için ₺100 kazan! Arkadaşın da ilk ay %25 indirim alsın! 🎉
        </p>
        
        <div style={{
          background: 'rgba(255,255,255,0.2)', borderRadius: '12px',
          padding: '20px', marginBottom: '20px'
        }}>
          <div style={{ fontSize: '13px', marginBottom: '8px', opacity: 0.9 }}>Senin Referans Linkin:</div>
          <div style={{
            background: 'white', color: '#667eea', padding: '12px 16px',
            borderRadius: '8px', fontSize: '16px', fontWeight: '600',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <span>https://alfaierp.com/ref/{referralCode}</span>
            <button
              onClick={copyLink}
              style={{
                padding: '8px 16px', background: '#667eea', color: 'white',
                border: 'none', borderRadius: '6px', cursor: 'pointer',
                fontWeight: '600', fontSize: '14px'
              }}
            >
              📋 Kopyala
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={shareEmail}
            style={{
              flex: 1, padding: '14px', background: 'white', color: '#667eea',
              border: 'none', borderRadius: '8px', cursor: 'pointer',
              fontWeight: '600', fontSize: '15px'
            }}
          >
            📧 Email ile Paylaş
          </button>
          <button
            style={{
              flex: 1, padding: '14px', background: 'white', color: '#667eea',
              border: 'none', borderRadius: '8px', cursor: 'pointer',
              fontWeight: '600', fontSize: '15px'
            }}
          >
            📱 WhatsApp ile Paylaş
          </button>
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <h3 style={{ marginTop: 0 }}>📊 Referanslarım</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#666' }}>İsim</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#666' }}>Email</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#666' }}>Tarih</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#666' }}>Durum</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#666' }}>Kazanç</th>
            </tr>
          </thead>
          <tbody>
            {referrals.map(ref => (
              <tr key={ref.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '16px' }}>{ref.name}</td>
                <td style={{ padding: '16px' }}>{ref.email}</td>
                <td style={{ padding: '16px' }}>{ref.date}</td>
                <td style={{ padding: '16px' }}>
                  <span style={{
                    padding: '4px 12px', borderRadius: '12px',
                    background: ref.status === 'converted' ? '#d1fae5' :
                               ref.status === 'signed_up' ? '#dbeafe' : '#fef3c7',
                    color: ref.status === 'converted' ? '#22c55e' :
                           ref.status === 'signed_up' ? '#3b82f6' : '#f59e0b',
                    fontSize: '12px', fontWeight: '600'
                  }}>
                    {ref.status === 'converted' ? '✓ Dönüştü' :
                     ref.status === 'signed_up' ? '📝 Kayıt Oldu' : '⏳ Bekliyor'}
                  </span>
                </td>
                <td style={{ padding: '16px', fontWeight: '700', color: ref.reward > 0 ? '#22c55e' : '#6b7280' }}>
                  {ref.reward > 0 ? `₺${ref.reward}` : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
