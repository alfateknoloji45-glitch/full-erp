import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function EmailCampaigns() {
  const [campaigns] = useState([
    { id: 1, name: 'Hoş Geldiniz Serisi', status: 'active', sent: 245, opened: 189, clicked: 92 },
    { id: 2, name: 'Ürün Tanıtımı', status: 'draft', sent: 0, opened: 0, clicked: 0 },
    { id: 3, name: 'Fiyat Güncellemesi', status: 'scheduled', sent: 0, opened: 0, clicked: 0 }
  ]);

  const createCampaign = () => {
    toast.loading('Yeni kampanya oluşturuluyor...', { id: 'campaign_create' });
    setTimeout(() => {
      toast.success('Kampanya oluşturuldu!', { id: 'campaign_create' });
    }, 1000);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h2 style={{ margin: 0, fontSize: '28px' }}>📧 Email Kampanyaları</h2>
        <button
          onClick={createCampaign}
          style={{
            padding: '12px 24px', background: '#667eea', color: 'white',
            border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600'
          }}
        >
          + Yeni Kampanya
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '24px' }}>
        {[
          { label: 'Toplam Gönderim', value: '245', icon: '📨', color: '#667eea' },
          { label: 'Açılma Oranı', value: '77%', icon: '📬', color: '#22c55e' },
          { label: 'Tıklama Oranı', value: '38%', icon: '👆', color: '#3b82f6' },
          { label: 'Dönüşüm', value: '15%', icon: '💰', color: '#f59e0b' }
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

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {campaigns.map(campaign => (
          <div key={campaign.id} style={{
            background: 'white', borderRadius: '12px', padding: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>{campaign.name}</h3>
              <div style={{
                display: 'inline-block', padding: '4px 12px', borderRadius: '12px',
                background: campaign.status === 'active' ? '#d1fae5' : 
                           campaign.status === 'draft' ? '#f3f4f6' : '#fef3c7',
                color: campaign.status === 'active' ? '#22c55e' :
                       campaign.status === 'draft' ? '#6b7280' : '#f59e0b',
                fontSize: '12px', fontWeight: '600'
              }}>
                {campaign.status === 'active' ? '✓ ACTIVE' :
                 campaign.status === 'draft' ? '📝 DRAFT' : '⏰ SCHEDULED'}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '40px', marginRight: '40px' }}>
              <div>
                <div style={{ fontSize: '13px', color: '#666' }}>Gönderildi</div>
                <div style={{ fontSize: '20px', fontWeight: '700' }}>{campaign.sent}</div>
              </div>
              <div>
                <div style={{ fontSize: '13px', color: '#666' }}>Açıldı</div>
                <div style={{ fontSize: '20px', fontWeight: '700', color: '#22c55e' }}>{campaign.opened}</div>
              </div>
              <div>
                <div style={{ fontSize: '13px', color: '#666' }}>Tıklandı</div>
                <div style={{ fontSize: '20px', fontWeight: '700', color: '#3b82f6' }}>{campaign.clicked}</div>
              </div>
            </div>
            <button style={{
              padding: '10px 20px', background: '#667eea', color: 'white',
              border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600'
            }}>
              Görüntüle
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
