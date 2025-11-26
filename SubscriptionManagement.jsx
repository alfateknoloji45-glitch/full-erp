import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function SubscriptionManagement() {
  const [subscription, setSubscription] = useState({
    plan: 'Starter',
    status: 'active',
    startDate: '2024-01-15',
    nextBilling: '2024-12-15',
    price: 299,
    autoRenew: true
  });

  const cancelSubscription = () => {
    if (window.confirm('Aboneliğinizi iptal etmek istediğinizden emin misiniz?')) {
      toast('Abonelik iptal ediliyor...');
      setTimeout(() => {
        setSubscription({ ...subscription, status: 'cancelled' });
        toast.success('Abonelik iptal edildi. Mevcut dönem sonuna kadar kullanabilirsiniz.');
      }, 1000);
    }
  };

  const pauseSubscription = () => {
    toast('Abonelik duraklatılıyor...');
    setTimeout(() => {
      setSubscription({ ...subscription, status: 'paused' });
      toast.success('Abonelik duraklatıldı.');
    }, 1000);
  };

  const resumeSubscription = () => {
    toast('Abonelik yeniden başlatılıyor...');
    setTimeout(() => {
      setSubscription({ ...subscription, status: 'active' });
      toast.success('Abonelik aktif edildi!');
    }, 1000);
  };

  const toggleAutoRenew = () => {
    const newState = !subscription.autoRenew;
    setSubscription({ ...subscription, autoRenew: newState });
    toast.success(newState ? 'Otomatik yenileme açıldı' : 'Otomatik yenileme kapatıldı');
  };

  return (
    <div>
      <h2 style={{ margin: '0 0 24px 0', fontSize: '28px' }}>🎫 Abonelik Yönetimi</h2>

      {/* Current Subscription */}
      <div style={{
        background: 'white', borderRadius: '12px', padding: '30px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '24px' }}>
          <div>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '24px' }}>
              {subscription.plan} Plan
            </h3>
            <div style={{
              display: 'inline-block',
              padding: '6px 16px',
              borderRadius: '20px',
              background: subscription.status === 'active' ? '#d1fae5' : 
                          subscription.status === 'paused' ? '#fef3c7' : '#fee2e2',
              color: subscription.status === 'active' ? '#22c55e' :
                     subscription.status === 'paused' ? '#f59e0b' : '#ef4444',
              fontSize: '13px',
              fontWeight: '700'
            }}>
              {subscription.status === 'active' ? '✓ Aktif' :
               subscription.status === 'paused' ? '⏸️ Duraklatıldı' : '✕ İptal'}
            </div>
          </div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#667eea' }}>
            ₺{subscription.price}/ay
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '24px' }}>
          <div>
            <div style={{ fontSize: '13px', color: '#666', marginBottom: '5px' }}>Başlangıç</div>
            <div style={{ fontWeight: '600' }}>{subscription.startDate}</div>
          </div>
          <div>
            <div style={{ fontSize: '13px', color: '#666', marginBottom: '5px' }}>Sonraki Ödeme</div>
            <div style={{ fontWeight: '600' }}>{subscription.nextBilling}</div>
          </div>
          <div>
            <div style={{ fontSize: '13px', color: '#666', marginBottom: '5px' }}>Otomatik Yenileme</div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={subscription.autoRenew}
                onChange={toggleAutoRenew}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              <span style={{ fontWeight: '600' }}>{subscription.autoRenew ? 'Açık' : 'Kapalı'}</span>
            </label>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => toast('Plan değiştirme sayfasına yönlendiriliyorsunuz...')}
            style={{
              flex: 1,
              padding: '12px',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            ⬆️ Plan Yükselt
          </button>
          {subscription.status === 'active' && (
            <>
              <button
                onClick={pauseSubscription}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: '#f59e0b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                ⏸️ Duraklat
              </button>
              <button
                onClick={cancelSubscription}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                ✕ İptal Et
              </button>
            </>
          )}
          {subscription.status === 'paused' && (
            <button
              onClick={resumeSubscription}
              style={{
                flex: 1,
                padding: '12px',
                background: '#22c55e',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              ▶️ Devam Et
            </button>
          )}
        </div>
      </div>

      {/* Features & Limits */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
      }}>
        <h3 style={{ marginTop: 0 }}>📋 Plan Özellikleri</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
          {[
            '50 teklif/ay',
            '3 kullanıcı',
            '5GB depolama',
            'Tüm özellikler',
            'PDF export',
            'Email entegrasyonu',
            'Öncelikli destek',
            'API erişimi'
          ].map((feature, i) => (
            <div key={i} style={{
              padding: '12px',
              background: '#f9fafb',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{ color: '#22c55e', fontSize: '18px' }}>✓</span>
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
