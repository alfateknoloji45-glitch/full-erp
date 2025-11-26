import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function LicenseManager() {
  const [licenses, setLicenses] = useState([
    {
      id: 1,
      key: 'ALFAI-PRO-8K9X-2M4N-7P5Q-9R3S',
      type: 'pro',
      status: 'active',
      activatedAt: '2024-01-15',
      expiresAt: '2025-01-15',
      company: 'ABC Yazılım Ltd.',
      email: 'info@abcyazilim.com',
      users: 8,
      maxUsers: 10,
      features: ['quotes', 'invoices', 'analytics', 'api']
    },
    {
      id: 2,
      key: 'ALFAI-STR-3L6M-8N2P-4Q9R-1T7V',
      type: 'starter',
      status: 'active',
      activatedAt: '2024-06-20',
      expiresAt: '2025-06-20',
      company: 'XYZ Danışmanlık',
      email: 'contact@xyz.com',
      users: 3,
      maxUsers: 3,
      features: ['quotes', 'invoices']
    }
  ]);

  const generateLicenseKey = (type) => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const segments = 6;
    const segmentLength = 4;
    
    let key = `ALFAI-${type.substring(0, 3).toUpperCase()}-`;
    
    for (let i = 0; i < segments; i++) {
      for (let j = 0; j < segmentLength; j++) {
        key += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      if (i < segments - 1) key += '-';
    }
    
    return key;
  };

  const createLicense = () => {
    const newKey = generateLicenseKey('pro');
    toast.success(`Yeni lisans oluşturuldu: ${newKey}`);
  };

  const revokeLicense = (licenseId) => {
    if (window.confirm('Bu lisansı iptal etmek istediğinizden emin misiniz?')) {
      setLicenses(licenses.map(lic => 
        lic.id === licenseId ? { ...lic, status: 'revoked' } : lic
      ));
      toast.success('Lisans iptal edildi');
    }
  };

  const extendLicense = (licenseId) => {
    setLicenses(licenses.map(lic => {
      if (lic.id === licenseId) {
        const currentExpiry = new Date(lic.expiresAt);
        currentExpiry.setFullYear(currentExpiry.getFullYear() + 1);
        return { ...lic, expiresAt: currentExpiry.toISOString().split('T')[0] };
      }
      return lic;
    }));
    toast.success('Lisans 1 yıl uzatıldı');
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return { bg: '#d1fae5', text: '#22c55e' };
      case 'expired': return { bg: '#fee2e2', text: '#ef4444' };
      case 'revoked': return { bg: '#f3f4f6', text: '#6b7280' };
      default: return { bg: '#fef3c7', text: '#f59e0b' };
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'enterprise': return { bg: '#fef3c7', text: '#f59e0b' };
      case 'pro': return { bg: '#eff6ff', text: '#667eea' };
      default: return { bg: '#f0fdf4', text: '#22c55e' };
    }
  };

  const getDaysUntilExpiry = (expiresAt) => {
    const today = new Date();
    const expiry = new Date(expiresAt);
    const diff = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ margin: '0 0 8px 0', fontSize: '28px' }}>🔑 Lisans Yönetimi</h2>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            Sistem lisanslarını oluşturun ve yönetin
          </p>
        </div>
        <button
          onClick={createLicense}
          style={{
            padding: '12px 24px', background: '#667eea', color: 'white',
            border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600'
          }}
        >
          + Yeni Lisans Oluştur
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
        {[
          { label: 'Toplam Lisans', value: licenses.length, icon: '🔑', color: '#667eea' },
          { label: 'Aktif', value: licenses.filter(l => l.status === 'active').length, icon: '✓', color: '#22c55e' },
          { label: 'Yakında Dolacak', value: licenses.filter(l => getDaysUntilExpiry(l.expiresAt) < 30).length, icon: '⚠️', color: '#f59e0b' },
          { label: 'Toplam Kullanıcı', value: licenses.reduce((sum, l) => sum + l.users, 0), icon: '👥', color: '#3b82f6' }
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

      {/* License Generator */}
      <div style={{
        background: 'white', borderRadius: '12px', padding: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: '24px'
      }}>
        <h3 style={{ marginTop: 0 }}>🎯 Hızlı Lisans Oluştur</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {[
            { type: 'starter', name: 'Starter', price: '₺299/ay', users: 3 },
            { type: 'pro', name: 'Pro', price: '₺799/ay', users: 10 },
            { type: 'enterprise', name: 'Enterprise', price: 'Özel', users: 'Sınırsız' }
          ].map((plan, i) => (
            <button
              key={i}
              onClick={() => {
                const key = generateLicenseKey(plan.type);
                toast.success(`${plan.name} lisansı oluşturuldu: ${key}`);
              }}
              style={{
                padding: '20px', background: '#f9fafb', border: '2px solid #e5e7eb',
                borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s',
                ':hover': { borderColor: '#667eea' }
              }}
            >
              <div style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>
                {plan.name}
              </div>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                {plan.price}
              </div>
              <div style={{ fontSize: '13px', color: '#667eea', fontWeight: '600' }}>
                {plan.users} kullanıcı
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* License List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {licenses.map(license => {
          const statusStyle = getStatusColor(license.status);
          const typeStyle = getTypeColor(license.type);
          const daysLeft = getDaysUntilExpiry(license.expiresAt);
          const isExpiringSoon = daysLeft < 30 && daysLeft > 0;
          
          return (
            <div key={license.id} style={{
              background: 'white', borderRadius: '12px', padding: '24px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              borderLeft: `4px solid ${statusStyle.text}`
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <code style={{
                      padding: '8px 16px', background: '#f9fafb', borderRadius: '8px',
                      fontSize: '16px', fontWeight: '600', fontFamily: 'monospace',
                      color: '#667eea'
                    }}>
                      {license.key}
                    </code>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(license.key);
                        toast.success('Lisans anahtarı kopyalandı!');
                      }}
                      style={{
                        padding: '6px 12px', background: '#f3f4f6', border: 'none',
                        borderRadius: '6px', cursor: 'pointer', fontSize: '12px',
                        fontWeight: '600', color: '#374151'
                      }}
                    >
                      📋 Kopyala
                    </button>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
                    <div>
                      <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>Şirket</div>
                      <div style={{ fontWeight: '600', fontSize: '15px' }}>{license.company}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>Email</div>
                      <div style={{ fontSize: '14px' }}>{license.email}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>Kullanıcı</div>
                      <div style={{ fontSize: '14px', fontWeight: '600' }}>
                        {license.users}/{license.maxUsers}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <span style={{
                      padding: '4px 12px', borderRadius: '12px',
                      background: typeStyle.bg, color: typeStyle.text,
                      fontSize: '12px', fontWeight: '700'
                    }}>
                      {license.type.toUpperCase()}
                    </span>
                    <span style={{
                      padding: '4px 12px', borderRadius: '12px',
                      background: statusStyle.bg, color: statusStyle.text,
                      fontSize: '12px', fontWeight: '700'
                    }}>
                      {license.status === 'active' ? '✓ AKTİF' :
                       license.status === 'expired' ? '✕ SÜRESİ DOLDU' : '○ İPTAL'}
                    </span>
                    {isExpiringSoon && (
                      <span style={{
                        padding: '4px 12px', borderRadius: '12px',
                        background: '#fef3c7', color: '#f59e0b',
                        fontSize: '12px', fontWeight: '700'
                      }}>
                        ⚠️ {daysLeft} GÜN KALDI
                      </span>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                  <div style={{ textAlign: 'right', marginBottom: '8px' }}>
                    <div style={{ fontSize: '12px', color: '#666' }}>Aktivasyon</div>
                    <div style={{ fontSize: '13px', fontWeight: '600' }}>{license.activatedAt}</div>
                  </div>
                  <div style={{ textAlign: 'right', marginBottom: '16px' }}>
                    <div style={{ fontSize: '12px', color: '#666' }}>Bitiş</div>
                    <div style={{ fontSize: '13px', fontWeight: '600' }}>{license.expiresAt}</div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {license.status === 'active' && (
                      <>
                        <button
                          onClick={() => extendLicense(license.id)}
                          style={{
                            padding: '8px 16px', background: '#22c55e', color: 'white',
                            border: 'none', borderRadius: '6px', cursor: 'pointer',
                            fontSize: '13px', fontWeight: '600'
                          }}
                        >
                          ⏰ Uzat
                        </button>
                        <button
                          onClick={() => revokeLicense(license.id)}
                          style={{
                            padding: '8px 16px', background: '#ef4444', color: 'white',
                            border: 'none', borderRadius: '6px', cursor: 'pointer',
                            fontSize: '13px', fontWeight: '600'
                          }}
                        >
                          ✕ İptal
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div style={{
                padding: '12px', background: '#f9fafb', borderRadius: '8px',
                fontSize: '13px', display: 'flex', gap: '16px', flexWrap: 'wrap'
              }}>
                <div><strong>Özellikler:</strong></div>
                {license.features.map((feature, i) => (
                  <span key={i} style={{
                    padding: '2px 8px', background: '#eff6ff', color: '#3b82f6',
                    borderRadius: '6px', fontSize: '12px', fontWeight: '600'
                  }}>
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
