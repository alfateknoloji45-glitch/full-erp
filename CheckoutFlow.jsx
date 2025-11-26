import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function CheckoutFlow() {
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [formData, setFormData] = useState({
    // Company Info
    companyName: '',
    taxNumber: '',
    taxOffice: '',
    address: '',
    
    // Contact
    fullName: '',
    email: '',
    phone: '',
    
    // Payment
    cardNumber: '',
    cardName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    
    // Billing
    billingAddress: '',
    city: '',
    country: 'TR'
  });

  const plans = {
    starter: {
      name: 'Starter',
      monthlyPrice: 299,
      annualPrice: 2990,
      savings: 20,
      features: ['50 teklif/ay', '3 kullanıcı', 'Email destek', 'PDF export']
    },
    pro: {
      name: 'Pro',
      monthlyPrice: 799,
      annualPrice: 7990,
      savings: 20,
      features: ['Sınırsız teklif', '10 kullanıcı', '7/24 destek', 'API erişimi', 'Advanced analytics']
    },
    enterprise: {
      name: 'Enterprise',
      monthlyPrice: 1999,
      annualPrice: 19990,
      savings: 20,
      features: ['Sınırsız her şey', 'Özel geliştirme', 'Dedicated support', 'SLA garantisi']
    }
  };

  const currentPlan = plans[selectedPlan];
  const price = billingCycle === 'monthly' ? currentPlan.monthlyPrice : currentPlan.annualPrice;
  const kdv = price * 0.20;
  const total = price + kdv;

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const validateStep = () => {
    switch(step) {
      case 1:
        if (!selectedPlan) {
          toast.error('Lütfen bir plan seçin');
          return false;
        }
        return true;
      case 2:
        if (!formData.companyName || !formData.email) {
          toast.error('Zorunlu alanları doldurun');
          return false;
        }
        return true;
      case 3:
        if (!formData.cardNumber || !formData.cvv) {
          toast.error('Ödeme bilgilerini doldurun');
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep()) {
      if (step < 4) {
        setStep(step + 1);
      } else {
        completePurchase();
      }
    }
  };

  const completePurchase = () => {
    toast('Ödeme işleniyor...');
    setTimeout(() => {
      toast.success('Ödeme başarılı! Hesabınız aktif edildi. 🎉');
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 2000);
    }, 2000);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ margin: '0 0 12px 0', fontSize: '36px' }}>🛒 Satın Al</h1>
        <p style={{ margin: 0, color: '#666', fontSize: '16px' }}>
          14 gün ücretsiz deneme. İstediğiniz zaman iptal edebilirsiniz.
        </p>
      </div>

      {/* Progress Steps */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '48px' }}>
        {['Plan Seç', 'Bilgiler', 'Ödeme', 'Onay'].map((label, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%',
              background: step > i ? '#22c55e' : step === i + 1 ? '#667eea' : '#e5e7eb',
              color: step >= i + 1 ? 'white' : '#9ca3af',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: '700', fontSize: '16px'
            }}>
              {step > i ? '✓' : i + 1}
            </div>
            <div style={{
              marginLeft: '12px', marginRight: '32px',
              fontSize: '14px', fontWeight: '600',
              color: step >= i + 1 ? '#1f2937' : '#9ca3af'
            }}>
              {label}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
        {/* Main Content */}
        <div>
          {/* Step 1: Plan Selection */}
          {step === 1 && (
            <div>
              <h2 style={{ marginTop: 0 }}>1️⃣ Plan Seçimi</h2>
              
              {/* Billing Cycle Toggle */}
              <div style={{
                display: 'flex', gap: '12px', padding: '8px',
                background: '#f3f4f6', borderRadius: '12px',
                marginBottom: '24px', width: 'fit-content'
              }}>
                <button
                  onClick={() => setBillingCycle('monthly')}
                  style={{
                    padding: '10px 24px', borderRadius: '8px',
                    background: billingCycle === 'monthly' ? 'white' : 'transparent',
                    border: 'none', cursor: 'pointer', fontWeight: '600',
                    color: billingCycle === 'monthly' ? '#667eea' : '#6b7280'
                  }}
                >
                  Aylık
                </button>
                <button
                  onClick={() => setBillingCycle('annual')}
                  style={{
                    padding: '10px 24px', borderRadius: '8px',
                    background: billingCycle === 'annual' ? 'white' : 'transparent',
                    border: 'none', cursor: 'pointer', fontWeight: '600',
                    color: billingCycle === 'annual' ? '#667eea' : '#6b7280'
                  }}
                >
                  Yıllık <span style={{ color: '#22c55e' }}>(%20 indirim)</span>
                </button>
              </div>

              {/* Plans */}
              <div style={{ display: 'grid', gap: '16px' }}>
                {Object.entries(plans).map(([planId, plan]) => (
                  <div
                    key={planId}
                    onClick={() => setSelectedPlan(planId)}
                    style={{
                      padding: '24px', borderRadius: '12px',
                      border: `3px solid ${selectedPlan === planId ? '#667eea' : '#e5e7eb'}`,
                      background: selectedPlan === planId ? '#eff6ff' : 'white',
                      cursor: 'pointer', transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h3 style={{ margin: '0 0 8px 0', fontSize: '20px' }}>{plan.name}</h3>
                        <div style={{ fontSize: '28px', fontWeight: '800', color: '#667eea', marginBottom: '8px' }}>
                          ₺{billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice}
                          <span style={{ fontSize: '16px', fontWeight: '400', color: '#6b7280' }}>
                            /{billingCycle === 'monthly' ? 'ay' : 'yıl'}
                          </span>
                        </div>
                        <div style={{ fontSize: '13px', color: '#666' }}>
                          {plan.features.join(' • ')}
                        </div>
                      </div>
                      <div style={{
                        width: '24px', height: '24px', borderRadius: '50%',
                        border: `2px solid ${selectedPlan === planId ? '#667eea' : '#e5e7eb'}`,
                        background: selectedPlan === planId ? '#667eea' : 'white',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'white', fontSize: '14px'
                      }}>
                        {selectedPlan === planId && '✓'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Company Info */}
          {step === 2 && (
            <div>
              <h2 style={{ marginTop: 0 }}>2️⃣ Şirket & İletişim Bilgileri</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '14px' }}>
                    Şirket Adı *
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    placeholder="ABC Yazılım Ltd."
                    style={{
                      width: '100%', padding: '12px', border: '2px solid #e5e7eb',
                      borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '14px' }}>
                      Vergi Numarası
                    </label>
                    <input
                      type="text"
                      value={formData.taxNumber}
                      onChange={(e) => handleInputChange('taxNumber', e.target.value)}
                      placeholder="1234567890"
                      style={{
                        width: '100%', padding: '12px', border: '2px solid #e5e7eb',
                        borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '14px' }}>
                      Vergi Dairesi
                    </label>
                    <input
                      type="text"
                      value={formData.taxOffice}
                      onChange={(e) => handleInputChange('taxOffice', e.target.value)}
                      placeholder="Kadıköy"
                      style={{
                        width: '100%', padding: '12px', border: '2px solid #e5e7eb',
                        borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '14px' }}>
                    Ad Soyad *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Ahmet Yılmaz"
                    style={{
                      width: '100%', padding: '12px', border: '2px solid #e5e7eb',
                      borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '14px' }}>
                      E-posta *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="ahmet@abcyazilim.com"
                      style={{
                        width: '100%', padding: '12px', border: '2px solid #e5e7eb',
                        borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '14px' }}>
                      Telefon
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+90 555 123 4567"
                      style={{
                        width: '100%', padding: '12px', border: '2px solid #e5e7eb',
                        borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '14px' }}>
                    Adres
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="İstanbul, Türkiye"
                    style={{
                      width: '100%', padding: '12px', border: '2px solid #e5e7eb',
                      borderRadius: '8px', fontSize: '14px', resize: 'vertical',
                      minHeight: '80px', boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div>
              <h2 style={{ marginTop: 0 }}>3️⃣ Ödeme Bilgileri</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '14px' }}>
                    Kart Numarası *
                  </label>
                  <input
                    type="text"
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    style={{
                      width: '100%', padding: '12px', border: '2px solid #e5e7eb',
                      borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '14px' }}>
                    Kart Üzerindeki İsim *
                  </label>
                  <input
                    type="text"
                    value={formData.cardName}
                    onChange={(e) => handleInputChange('cardName', e.target.value)}
                    placeholder="AHMET YILMAZ"
                    style={{
                      width: '100%', padding: '12px', border: '2px solid #e5e7eb',
                      borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '14px' }}>
                      Ay *
                    </label>
                    <select
                      value={formData.expiryMonth}
                      onChange={(e) => handleInputChange('expiryMonth', e.target.value)}
                      style={{
                        width: '100%', padding: '12px', border: '2px solid #e5e7eb',
                        borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box'
                      }}
                    >
                      <option value="">Ay</option>
                      {[...Array(12)].map((_, i) => (
                        <option key={i} value={String(i + 1).padStart(2, '0')}>
                          {String(i + 1).padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '14px' }}>
                      Yıl *
                    </label>
                    <select
                      value={formData.expiryYear}
                      onChange={(e) => handleInputChange('expiryYear', e.target.value)}
                      style={{
                        width: '100%', padding: '12px', border: '2px solid #e5e7eb',
                        borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box'
                      }}
                    >
                      <option value="">Yıl</option>
                      {[...Array(10)].map((_, i) => {
                        const year = new Date().getFullYear() + i;
                        return <option key={i} value={year}>{year}</option>;
                      })}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '14px' }}>
                      CVV *
                    </label>
                    <input
                      type="text"
                      value={formData.cvv}
                      onChange={(e) => handleInputChange('cvv', e.target.value)}
                      placeholder="123"
                      maxLength="3"
                      style={{
                        width: '100%', padding: '12px', border: '2px solid #e5e7eb',
                        borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                <div style={{
                  padding: '16px', background: '#eff6ff', borderRadius: '8px',
                  fontSize: '13px', color: '#1e40af', display: 'flex',
                  alignItems: 'center', gap: '12px'
                }}>
                  <span style={{ fontSize: '24px' }}>🔒</span>
                  <span>
                    Ödeme bilgileriniz SSL ile şifrelenir ve güvenli bir şekilde işlenir.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <div>
              <h2 style={{ marginTop: 0 }}>4️⃣ Sipariş Özeti</h2>
              
              <div style={{
                background: '#f9fafb', borderRadius: '12px',
                padding: '24px', marginBottom: '24px'
              }}>
                <h3 style={{ marginTop: 0 }}>Şirket Bilgileri</h3>
                <div style={{ fontSize: '14px', lineHeight: '1.8' }}>
                  <div><strong>Şirket:</strong> {formData.companyName}</div>
                  <div><strong>Yetkili:</strong> {formData.fullName}</div>
                  <div><strong>Email:</strong> {formData.email}</div>
                  {formData.phone && <div><strong>Telefon:</strong> {formData.phone}</div>}
                </div>
              </div>

              <div style={{
                padding: '20px', background: '#fef3c7', borderRadius: '8px',
                fontSize: '14px', color: '#92400e', marginBottom: '16px'
              }}>
                💡 <strong>14 gün ücretsiz deneme:</strong> İlk ödeme {new Date(Date.now() + 14*24*60*60*1000).toLocaleDateString('tr-TR')} tarihinde alınacaktır.
              </div>

              <label style={{
                display: 'flex', alignItems: 'start', gap: '12px',
                padding: '16px', background: '#f9fafb', borderRadius: '8px',
                cursor: 'pointer', marginBottom: '16px'
              }}>
                <input type="checkbox" required style={{ marginTop: '4px' }} />
                <span style={{ fontSize: '13px', lineHeight: '1.6' }}>
                  <strong>Kullanım Koşulları</strong> ve <strong>Gizlilik Politikası</strong>'nı okudum, kabul ediyorum. 
                  Otomatik yenileme ile ilgili bilgilendirildim.
                </span>
              </label>
            </div>
          )}

          {/* Navigation Buttons */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                style={{
                  flex: 1, padding: '16px', background: '#f3f4f6',
                  color: '#374151', border: 'none', borderRadius: '10px',
                  cursor: 'pointer', fontWeight: '600', fontSize: '16px'
                }}
              >
                ← Geri
              </button>
            )}
            <button
              onClick={nextStep}
              style={{
                flex: 1, padding: '16px', background: '#667eea',
                color: 'white', border: 'none', borderRadius: '10px',
                cursor: 'pointer', fontWeight: '600', fontSize: '16px'
              }}
            >
              {step === 4 ? '✓ Siparişi Tamamla' : 'İleri →'}
            </button>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div style={{ position: 'sticky', top: '20px', height: 'fit-content' }}>
          <div style={{
            background: 'white', borderRadius: '12px',
            padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <h3 style={{ marginTop: 0 }}>Sipariş Özeti</h3>
            
            <div style={{
              padding: '16px', background: '#f9fafb',
              borderRadius: '8px', marginBottom: '16px'
            }}>
              <div style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>
                {currentPlan.name} Plan
              </div>
              <div style={{ fontSize: '13px', color: '#666' }}>
                {billingCycle === 'monthly' ? 'Aylık' : 'Yıllık'} abonelik
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                marginBottom: '8px', fontSize: '14px'
              }}>
                <span>Plan ücreti</span>
                <span style={{ fontWeight: '600' }}>₺{price.toLocaleString()}</span>
              </div>
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                marginBottom: '8px', fontSize: '14px'
              }}>
                <span>KDV (%20)</span>
                <span style={{ fontWeight: '600' }}>₺{kdv.toLocaleString()}</span>
              </div>
              {billingCycle === 'annual' && (
                <div style={{
                  padding: '8px', background: '#d1fae5',
                  borderRadius: '6px', fontSize: '13px',
                  color: '#22c55e', fontWeight: '600',
                  textAlign: 'center', marginBottom: '8px'
                }}>
                  ✓ Yıllık ödemede %20 tasarruf!
                </div>
              )}
              <div style={{
                borderTop: '2px solid #e5e7eb',
                paddingTop: '12px', marginTop: '12px'
              }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  fontSize: '18px', fontWeight: '800', color: '#667eea'
                }}>
                  <span>Toplam</span>
                  <span>₺{total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div style={{
              padding: '12px', background: '#fef3c7',
              borderRadius: '8px', fontSize: '13px',
              color: '#92400e', textAlign: 'center'
            }}>
              🎉 14 gün ücretsiz deneme!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
