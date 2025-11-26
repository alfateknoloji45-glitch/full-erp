import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function OnboardingWizard() {
  const [step, setStep] = useState(1);
  const [completed, setCompleted] = useState(false);

  const steps = [
    {
      number: 1, title: 'Hoş Geldiniz! 👋',
      description: 'ALFAI ERP\'ye hoş geldiniz! Size hızlı bir tur yapmamıza izin verin.',
      action: 'Başlayalım'
    },
    {
      number: 2, title: 'Şirket Bilgileriniz 🏢',
      description: 'Şirket bilgilerinizi tamamlayarak profesyonel teklifler oluşturun.',
      action: 'Bilgileri Ekle'
    },
    {
      number: 3, title: 'İlk Teklifiniz 📝',
      description: 'İlk profesyonel teklifinizi oluşturmaya hazır mısınız?',
      action: 'Teklif Oluştur'
    },
    {
      number: 4, title: 'Ödeme Ayarları 💳',
      description: 'Ödeme yöntemlerinizi ekleyerek müşterilerden ödeme almaya başlayın.',
      action: 'Ayarları Yap'
    },
    {
      number: 5, title: 'Tamamlandı! 🎉',
      description: 'Harika! Artık ALFAI ERP\'yi tam kapasiteyle kullanmaya hazırsınız!',
      action: 'Dashboard\'a Git'
    }
  ];

  const currentStep = steps[step - 1];

  const navigate = (page) => {
    try {
      window.dispatchEvent(new CustomEvent('alfai:navigate', { detail: { page } }));
    } catch {}
  };

  const handleAction = () => {
    switch(step) {
      case 1:
        toast('Hızlı tura başlıyoruz');
        setStep(step + 1);
        break;
      case 2:
        toast('Şirket kurulumuna gidiliyor');
        navigate('company-setup');
        break;
      case 3:
        toast('İlk teklifinizi oluşturalım');
        navigate('quote');
        break;
      case 4:
        toast('Faturalama ve ödeme ayarlarına gidiliyor');
        navigate('billing');
        break;
      case 5:
        setCompleted(true);
        break;
      default:
        setStep(Math.min(step + 1, steps.length));
    }
  };

  if (completed) {
    return (
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0,0,0,0.5)', display: 'flex',
        alignItems: 'center', justifyContent: 'center', zIndex: 10000
      }}>
        <div style={{
          background: 'white', borderRadius: '20px', padding: '60px',
          maxWidth: '500px', textAlign: 'center'
        }}>
          <div style={{ fontSize: '80px', marginBottom: '24px' }}>🎉</div>
          <h2 style={{ margin: '0 0 16px 0', fontSize: '32px' }}>Tebrikler!</h2>
          <p style={{ margin: '0 0 32px 0', fontSize: '18px', color: '#666' }}>
            Başarıyla kurulumu tamamladınız. Artık işinizi büyütmeye hazırsınız!
          </p>
          <button style={{
            padding: '16px 48px', background: '#667eea', color: 'white',
            border: 'none', borderRadius: '12px', fontSize: '18px',
            fontWeight: '700', cursor: 'pointer'
          }}
          onClick={() => {
            navigate('dashboard');
            setCompleted(false);
          }}
          >
            Dashboard'a Git
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 10000
    }}>
      <div style={{
        background: 'white', borderRadius: '20px', padding: '40px',
        maxWidth: '600px', width: '90%'
      }}>
        {/* Progress */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            {steps.map((s, i) => (
              <div key={i} style={{
                width: '40px', height: '40px', borderRadius: '50%',
                background: step >= s.number ? '#667eea' : '#e5e7eb',
                color: step >= s.number ? 'white' : '#9ca3af',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: '700', fontSize: '16px'
              }}>
                {step > s.number ? '✓' : s.number}
              </div>
            ))}
          </div>
          <div style={{ fontSize: '14px', color: '#666', textAlign: 'center' }}>
            Adım {step} / {steps.length}
          </div>
        </div>

        {/* Content */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ margin: '0 0 16px 0', fontSize: '32px' }}>{currentStep.title}</h2>
          <p style={{ margin: 0, fontSize: '18px', color: '#666', lineHeight: '1.6' }}>
            {currentStep.description}
          </p>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              style={{
                flex: 1, padding: '14px', background: '#f3f4f6',
                color: '#374151', border: 'none', borderRadius: '10px',
                fontSize: '16px', fontWeight: '600', cursor: 'pointer'
              }}
            >
              Geri
            </button>
          )}
          <button
            onClick={handleAction}
            style={{
              flex: 1, padding: '14px', background: '#667eea',
              color: 'white', border: 'none', borderRadius: '10px',
              fontSize: '16px', fontWeight: '600', cursor: 'pointer'
            }}
          >
            {currentStep.action} →
          </button>
        </div>

          <button
            style={{
              marginTop: '16px', width: '100%', padding: '10px',
              background: 'transparent', color: '#6b7280',
              border: 'none', cursor: 'pointer', fontSize: '14px'
            }}
            onClick={() => {
              toast('Onboarding atlandı');
              navigate('dashboard');
            }}
          >
            Şimdilik Atla
          </button>
      </div>
    </div>
  );
}
