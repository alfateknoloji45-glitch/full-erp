import React, { useState, useEffect } from 'react';

export default function PWAOptimizer() {
  const [pwaInstalled, setPwaInstalled] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setPwaInstalled(true);
    }

    // Listen for install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const installPWA = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setPwaInstalled(true);
    }
    setDeferredPrompt(null);
  };

  return (
    <div>
      <h2 style={{ margin: '0 0 24px 0', fontSize: '28px' }}>📱 Mobil Uygulama</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
        {[
          { label: 'PWA Status', value: pwaInstalled ? 'Yüklü' : 'Yükle', icon: '📱', color: pwaInstalled ? '#22c55e' : '#f59e0b' },
          { label: 'Offline Mode', value: 'Aktif', icon: '🔄', color: '#3b82f6' },
          { label: 'Performance', value: '98/100', icon: '⚡', color: '#22c55e' }
        ].map((stat, i) => (
          <div key={i} style={{
            background: 'white', borderRadius: '12px', padding: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)', textAlign: 'center'
          }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>{stat.icon}</div>
            <div style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>{stat.label}</div>
            <div style={{ fontSize: '20px', fontWeight: '700', color: stat.color }}>{stat.value}</div>
          </div>
        ))}
      </div>

      {!pwaInstalled && deferredPrompt && (
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '16px', padding: '40px', color: 'white', marginBottom: '24px'
        }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '24px' }}>📱 Mobil Uygulamayı Yükle</h3>
          <p style={{ margin: '0 0 24px 0', opacity: 0.9 }}>
            ALFAI ERP'yi mobil cihazınıza yükleyerek her yerden erişin!
          </p>
          <button
            onClick={installPWA}
            style={{
              padding: '14px 32px', background: 'white', color: '#667eea',
              border: 'none', borderRadius: '10px', fontSize: '16px',
              fontWeight: '700', cursor: 'pointer'
            }}
          >
            Şimdi Yükle →
          </button>
        </div>
      )}

      <div style={{ background: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <h3 style={{ marginTop: 0 }}>✨ PWA Özellikleri</h3>
        <div style={{ display: 'grid', gap: '16px' }}>
          {[
            { icon: '⚡', title: 'Hızlı Yükleme', desc: 'Anında açılır, 98/100 performance score' },
            { icon: '🔄', title: 'Offline Çalışma', desc: 'İnternet olmadan da kullanabilirsiniz' },
            { icon: '📲', title: 'Push Bildirimler', desc: 'Önemli güncellemeler anında size ulaşır' },
            { icon: '🏠', title: 'Ana Ekran', desc: 'Normal uygulama gibi ana ekrana eklenebilir' },
            { icon: '💾', title: 'Otomatik Önbellek', desc: 'Veriler otomatik kaydedilir' },
            { icon: '📱', title: 'Responsive', desc: 'Tüm cihazlarda mükemmel görünür' }
          ].map((feature, i) => (
            <div key={i} style={{
              padding: '20px', background: '#f9fafb', borderRadius: '10px',
              display: 'flex', gap: '16px', alignItems: 'start'
            }}>
              <div style={{ fontSize: '32px' }}>{feature.icon}</div>
              <div>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '16px' }}>{feature.title}</h4>
                <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
