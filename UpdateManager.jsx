import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function UpdateManager() {
  const [currentVersion] = useState('2.5.3');
  const [updates] = useState([
    {
      version: '2.6.0',
      type: 'major',
      status: 'available',
      releaseDate: '2024-12-01',
      size: '45MB',
      features: [
        'Yeni AI asistan entegrasyonu',
        'Geliştirilmiş raporlama',
        'Performans iyileştirmeleri',
        '15+ bug fix'
      ],
      breaking: false
    },
    {
      version: '2.5.4',
      type: 'patch',
      status: 'available',
      releaseDate: '2024-11-28',
      size: '12MB',
      features: [
        'Güvenlik yaması',
        'Fatura PDF düzeltmesi',
        'Email gönderim hatası düzeltildi'
      ],
      breaking: false,
      security: true
    }
  ]);

  const [autoUpdate, setAutoUpdate] = useState(true);
  const [updateSchedule, setUpdateSchedule] = useState('night');

  const checkForUpdates = () => {
    toast('Güncellemeler kontrol ediliyor...');
    setTimeout(() => {
      toast.success('Yeni güncellemeler mevcut!');
    }, 1500);
  };

  const installUpdate = (version) => {
    toast(`${version} yükleniyor...`);
    setTimeout(() => {
      toast.success('Güncelleme başarıyla yüklendi! Yeniden başlatılıyor...');
    }, 2000);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ margin: '0 0 8px 0', fontSize: '28px' }}>🔄 Güncelleme Yönetimi</h2>
          <div style={{ fontSize: '14px', color: '#666' }}>
            Mevcut Sürüm: <strong>v{currentVersion}</strong>
          </div>
        </div>
        <button
          onClick={checkForUpdates}
          style={{
            padding: '12px 24px', background: '#667eea', color: 'white',
            border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600'
          }}
        >
          🔍 Güncellemeleri Kontrol Et
        </button>
      </div>

      {/* System Status */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
        {[
          { label: 'Sistem Durumu', value: 'Güncel', icon: '✓', color: '#22c55e' },
          { label: 'Son Kontrol', value: '5 dk önce', icon: '🔍', color: '#3b82f6' },
          { label: 'Otomatik Güncelleme', value: autoUpdate ? 'Açık' : 'Kapalı', icon: '🔄', color: autoUpdate ? '#22c55e' : '#f59e0b' },
          { label: 'Bekleyen', value: updates.length, icon: '📦', color: '#667eea' }
        ].map((stat, i) => (
          <div key={i} style={{
            background: 'white', borderRadius: '12px', padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>{stat.icon}</div>
            <div style={{ fontSize: '13px', color: '#666', marginBottom: '5px' }}>{stat.label}</div>
            <div style={{ fontSize: '20px', fontWeight: '700', color: stat.color }}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Update Settings */}
      <div style={{
        background: 'white', borderRadius: '12px', padding: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: '24px'
      }}>
        <h3 style={{ marginTop: 0 }}>⚙️ Güncelleme Ayarları</h3>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '16px', background: '#f9fafb', borderRadius: '8px',
            cursor: 'pointer'
          }}>
            <input
              type="checkbox"
              checked={autoUpdate}
              onChange={(e) => setAutoUpdate(e.target.checked)}
              style={{ width: '20px', height: '20px', cursor: 'pointer' }}
            />
            <div>
              <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                Otomatik Güncelleme
              </div>
              <div style={{ fontSize: '13px', color: '#666' }}>
                Yeni sürümler otomatik olarak yüklensin
              </div>
            </div>
          </label>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            Güncelleme Zamanı
          </label>
          <select
            value={updateSchedule}
            onChange={(e) => setUpdateSchedule(e.target.value)}
            style={{
              width: '100%', padding: '12px', border: '2px solid #e5e7eb',
              borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box'
            }}
          >
            <option value="immediate">Hemen yükle</option>
            <option value="night">Gece (02:00-04:00)</option>
            <option value="weekend">Hafta sonu</option>
            <option value="manual">Manuel onay</option>
          </select>
        </div>
      </div>

      {/* Available Updates */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {updates.map((update, i) => (
          <div key={i} style={{
            background: 'white', borderRadius: '12px', padding: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            borderLeft: `4px solid ${update.security ? '#ef4444' : update.type === 'major' ? '#667eea' : '#22c55e'}`
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <h3 style={{ margin: 0, fontSize: '24px' }}>v{update.version}</h3>
                  <span style={{
                    padding: '4px 12px', borderRadius: '12px',
                    background: update.type === 'major' ? '#eff6ff' :
                               update.type === 'minor' ? '#f0fdf4' : '#fef3c7',
                    color: update.type === 'major' ? '#3b82f6' :
                           update.type === 'minor' ? '#22c55e' : '#f59e0b',
                    fontSize: '12px', fontWeight: '700'
                  }}>
                    {update.type === 'major' ? 'MAJOR' :
                     update.type === 'minor' ? 'MINOR' : 'PATCH'}
                  </span>
                  {update.security && (
                    <span style={{
                      padding: '4px 12px', borderRadius: '12px',
                      background: '#fee2e2', color: '#ef4444',
                      fontSize: '12px', fontWeight: '700'
                    }}>
                      🔒 GÜVENLİK
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '13px', color: '#666' }}>
                  📅 {update.releaseDate} • 💾 {update.size}
                </div>
              </div>
              <button
                onClick={() => installUpdate(update.version)}
                style={{
                  padding: '12px 32px',
                  background: update.security ? '#ef4444' : '#667eea',
                  color: 'white', border: 'none', borderRadius: '8px',
                  cursor: 'pointer', fontWeight: '600', fontSize: '15px'
                }}
              >
                {update.security ? '⚡ Hemen Yükle' : '📥 Yükle'}
              </button>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>✨ Yenilikler:</h4>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                {update.features.map((feature, j) => (
                  <li key={j} style={{ marginBottom: '8px', fontSize: '14px', color: '#374151' }}>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {update.breaking && (
              <div style={{
                padding: '12px', background: '#fef3c7', borderRadius: '8px',
                fontSize: '13px', color: '#92400e'
              }}>
                ⚠️ <strong>Dikkat:</strong> Bu güncelleme breaking changes içermektedir. 
                Güncellemeden önce dokümantasyonu inceleyin.
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Update History */}
      <div style={{
        background: 'white', borderRadius: '12px', padding: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginTop: '24px'
      }}>
        <h3 style={{ marginTop: 0 }}>📜 Güncelleme Geçmişi</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { version: '2.5.3', date: '2024-11-20', status: 'installed' },
            { version: '2.5.2', date: '2024-11-10', status: 'installed' },
            { version: '2.5.0', date: '2024-10-25', status: 'installed' }
          ].map((history, i) => (
            <div key={i} style={{
              padding: '16px', background: '#f9fafb', borderRadius: '8px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
              <div>
                <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                  v{history.version}
                </div>
                <div style={{ fontSize: '13px', color: '#666' }}>
                  {history.date}
                </div>
              </div>
              <span style={{
                padding: '4px 12px', borderRadius: '12px',
                background: '#d1fae5', color: '#22c55e',
                fontSize: '12px', fontWeight: '600'
              }}>
                ✓ Yüklü
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
