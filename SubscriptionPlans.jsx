import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function SubscriptionPlans() {
  const [currentPlan, setCurrentPlan] = useState('free');

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      period: 'Ücretsiz',
      icon: '🆓',
      color: '#6b7280',
      features: [
        '5 teklif/ay',
        '1 kullanıcı',
        'Temel özellikler',
        'Email destek'
      ],
      limits: {
        quotes: 5,
        users: 1,
        storage: '100MB'
      }
    },
    {
      id: 'starter',
      name: 'Starter',
      price: 299,
      period: '/ay',
      icon: '🚀',
      color: '#3b82f6',
      popular: true,
      features: [
        '50 teklif/ay',
        '3 kullanıcı',
        'Tüm özellikler',
        'Öncelikli destek',
        'PDF export',
        'Email entegrasyonu'
      ],
      limits: {
        quotes: 50,
        users: 3,
        storage: '5GB'
      }
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 799,
      period: '/ay',
      icon: '💎',
      color: '#667eea',
      features: [
        'Sınırsız teklif',
        '10 kullanıcı',
        'Tüm özellikler',
        '7/24 destek',
        'API erişimi',
        'Özel entegrasyonlar',
        'Advanced analytics',
        'White-label'
      ],
      limits: {
        quotes: 'Unlimited',
        users: 10,
        storage: '50GB'
      }
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: null,
      period: 'Özel',
      icon: '🏢',
      color: '#10b981',
      features: [
        'Her şey dahil',
        'Sınırsız kullanıcı',
        'Özel geliştirme',
        'Dedicated support',
        'SLA garantisi',
        'On-premise seçeneği',
        'Training & consulting',
        'Custom features'
      ],
      limits: {
        quotes: 'Unlimited',
        users: 'Unlimited',
        storage: 'Unlimited'
      }
    }
  ];

  const selectPlan = (planId) => {
    if (planId === currentPlan) {
      toast('Zaten bu plandayız');
      return;
    }
    toast('Plan değiştiriliyor...');
    setTimeout(() => {
      setCurrentPlan(planId);
      toast.success(`${plans.find(p => p.id === planId).name} planına yükseltildi!`);
    }, 1500);
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ margin: '0 0 12px 0', fontSize: '32px' }}>💳 Abonelik Planları</h2>
        <p style={{ margin: 0, color: '#666', fontSize: '16px' }}>
          İşinize en uygun planı seçin. İstediğiniz zaman değiştirebilirsiniz.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
        {plans.map(plan => (
          <div key={plan.id} style={{
            background: 'white',
            borderRadius: '16px',
            padding: '30px',
            boxShadow: plan.popular ? '0 8px 24px rgba(102, 126, 234, 0.15)' : '0 2px 8px rgba(0,0,0,0.08)',
            border: plan.popular ? `2px solid ${plan.color}` : '2px solid transparent',
            position: 'relative',
            transform: plan.popular ? 'scale(1.05)' : 'scale(1)',
            transition: 'all 0.3s'
          }}>
            {plan.popular && (
              <div style={{
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: plan.color,
                color: 'white',
                padding: '4px 16px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '700'
              }}>
                ⭐ EN POPÜLER
              </div>
            )}

            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>{plan.icon}</div>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '24px', color: plan.color }}>{plan.name}</h3>
              <div style={{ fontSize: '36px', fontWeight: '700', color: '#1f2937' }}>
                {plan.price !== null ? `₺${plan.price}` : 'Özel'}
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>{plan.period}</div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              {plan.features.map((feature, i) => (
                <div key={i} style={{
                  padding: '8px 0',
                  fontSize: '14px',
                  color: '#374151',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ color: '#22c55e' }}>✓</span>
                  {feature}
                </div>
              ))}
            </div>

            <button
              onClick={() => selectPlan(plan.id)}
              disabled={currentPlan === plan.id}
              style={{
                width: '100%',
                padding: '14px',
                background: currentPlan === plan.id ? '#f3f4f6' : plan.color,
                color: currentPlan === plan.id ? '#6b7280' : 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: currentPlan === plan.id ? 'not-allowed' : 'pointer',
                fontWeight: '700',
                fontSize: '15px'
              }}
            >
              {currentPlan === plan.id ? '✓ Aktif Plan' : plan.price !== null ? 'Başla' : 'İletişime Geç'}
            </button>
          </div>
        ))}
      </div>

      {/* Current Plan Info */}
      <div style={{
        marginTop: '40px',
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
      }}>
        <h3 style={{ marginTop: 0 }}>📊 Mevcut Plan Kullanımı</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {[
            { label: 'Teklifler', used: 3, limit: plans.find(p => p.id === currentPlan)?.limits.quotes },
            { label: 'Kullanıcılar', used: 1, limit: plans.find(p => p.id === currentPlan)?.limits.users },
            { label: 'Storage', used: '45MB', limit: plans.find(p => p.id === currentPlan)?.limits.storage }
          ].map((item, i) => (
            <div key={i}>
              <div style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>{item.label}</div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#667eea' }}>
                {item.used} / {item.limit}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
