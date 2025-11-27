// Import path fix: Updated from '../frontend/src/api/odooApi.js' to './src/api/odooApi.js'
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { checkSubdomainAvailable, createCompany as apiCreateCompany } from './src/api/odooApi.js';

export default function CompanySetup() {
  const [step, setStep] = useState(1);
  const [company, setCompany] = useState({
    name: '',
    subdomain: '',
    email: '',
    phone: '',
    address: '',
    industry: '',
    size: '',
    plan: 'starter'
  });

  const checkSubdomain = async (subdomain) => {
    const available = await checkSubdomainAvailable(subdomain);
    return available;
  };

  const handleSubdomainCheck = async () => {
    if (!company.subdomain) {
      toast.error('Alt domain giriniz');
      return;
    }

    toast.loading('Kontrol ediliyor...', { id: 'sd_check' });
    setTimeout(async () => {
      const available = await checkSubdomain(company.subdomain);
      if (available) {
        toast.success(`${company.subdomain}.alfaierp.com müsait!`, { id: 'sd_check' });
      } else {
        toast.error('Bu alt domain kullanımda. Başka bir isim deneyin.', { id: 'sd_check' });
      }
    }, 1000);
  };

  const nextStep = () => {
    if (step === 1 && (!company.name || !company.subdomain)) {
      toast.error('Şirket adı ve alt domain gerekli!');
      return;
    }
    if (step === 2 && (!company.email || !company.phone)) {
      toast.error('İletişim bilgileri gerekli!');
      return;
    }
    setStep(step + 1);
  };

  const createCompany = async () => {
    try {
      toast.loading('Şirket oluşturuluyor...', { id: 'company_create' });
      const created = await apiCreateCompany(company);
      toast.success('Şirket başarıyla oluşturuldu! Yönlendiriliyorsunuz...', { id: 'company_create' });
      setTimeout(() => {
        window.location.href = `https://${created.subdomain}.alfaierp.com/dashboard`;
      }, 2000);
    } catch (e) {
      toast.error('Oluşturma başarısız: ' + e.message, { id: 'company_create' });
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ margin: '0 0 12px 0', fontSize: '32px' }}>🏢 Şirketinizi Oluşturun</h1>
        <p style={{ margin: 0, color: '#666', fontSize: '16px' }}>
          Birkaç adımda SaaS hesabınız hazır!
        </p>
      </div>

      {/* Progress Steps */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
        {[1, 2, 3, 4].map((s) => (
          <div key={s} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%',
              background: step >= s ? '#667eea' : '#e5e7eb',
              color: step >= s ? 'white' : '#9ca3af',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: '700', fontSize: '18px'
            }}>
              {s}
            </div>
            {s < 4 && (
              <div style={{
                width: '60px', height: '3px',
                background: step > s ? '#667eea' : '#e5e7eb',
                margin: '0 10px'
              }} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div style={{
        background: 'white', borderRadius: '16px', padding: '40px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        {/* Step 1: Company Info */}
        {step === 1 && (
          <div>
            <h2 style={{ marginTop: 0, marginBottom: '24px' }}>1️⃣ Şirket Bilgileri</h2>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Şirket Adı *
              </label>
              <input
                type="text"
                placeholder="ABC Yazılım Ltd."
                value={company.name}
                onChange={(e) => setCompany({ ...company, name: e.target.value })}
                style={{
                  width: '100%', padding: '14px', border: '2px solid #e5e7eb',
                  borderRadius: '8px', fontSize: '15px', boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Alt Domain (Subdomain) *
              </label>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="abc-yazilim"
                    value={company.subdomain}
                    onChange={(e) => setCompany({ ...company, subdomain: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
                    style={{
                      width: '100%', padding: '14px', paddingRight: '160px',
                      border: '2px solid #e5e7eb', borderRadius: '8px',
                      fontSize: '15px', boxSizing: 'border-box'
                    }}
                  />
                  <span style={{
                    position: 'absolute', right: '14px', top: '50%',
                    transform: 'translateY(-50%)', color: '#9ca3af',
                    fontSize: '15px', fontWeight: '500'
                  }}>
                    .alfaierp.com
                  </span>
                </div>
                <button
                  onClick={handleSubdomainCheck}
                  style={{
                    padding: '14px 24px', background: '#667eea', color: 'white',
                    border: 'none', borderRadius: '8px', cursor: 'pointer',
                    fontWeight: '600', whiteSpace: 'nowrap'
                  }}
                >
                  Kontrol Et
                </button>
              </div>
              <div style={{ marginTop: '8px', fontSize: '13px', color: '#666' }}>
                📍 Şirketinizin URL'si: https://{company.subdomain || 'ornek'}.alfaierp.com
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Sektör
              </label>
              <select
                value={company.industry}
                onChange={(e) => setCompany({ ...company, industry: e.target.value })}
                style={{
                  width: '100%', padding: '14px', border: '2px solid #e5e7eb',
                  borderRadius: '8px', fontSize: '15px', boxSizing: 'border-box'
                }}
              >
                <option value="">Seçiniz</option>
                <option value="software">Yazılım & IT</option>
                <option value="consulting">Danışmanlık</option>
                <option value="design">Tasarım & Kreatif</option>
                <option value="construction">İnşaat</option>
                <option value="healthcare">Sağlık</option>
                <option value="retail">Perakende</option>
                <option value="education">Eğitim</option>
                <option value="other">Diğer</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Şirket Büyüklüğü
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                {['1-10', '11-50', '51-200', '200+'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setCompany({ ...company, size })}
                    style={{
                      padding: '12px', border: `2px solid ${company.size === size ? '#667eea' : '#e5e7eb'}`,
                      borderRadius: '8px', background: company.size === size ? '#eff6ff' : 'white',
                      cursor: 'pointer', fontWeight: '600',
                      color: company.size === size ? '#667eea' : '#6b7280'
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Contact */}
        {step === 2 && (
          <div>
            <h2 style={{ marginTop: 0, marginBottom: '24px' }}>2️⃣ İletişim Bilgileri</h2>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                E-posta *
              </label>
              <input
                type="email"
                placeholder="info@abcyazilim.com"
                value={company.email}
                onChange={(e) => setCompany({ ...company, email: e.target.value })}
                style={{
                  width: '100%', padding: '14px', border: '2px solid #e5e7eb',
                  borderRadius: '8px', fontSize: '15px', boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Telefon *
              </label>
              <input
                type="tel"
                placeholder="+90 555 123 4567"
                value={company.phone}
                onChange={(e) => setCompany({ ...company, phone: e.target.value })}
                style={{
                  width: '100%', padding: '14px', border: '2px solid #e5e7eb',
                  borderRadius: '8px', fontSize: '15px', boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Adres
              </label>
              <textarea
                placeholder="İstanbul, Türkiye"
                value={company.address}
                onChange={(e) => setCompany({ ...company, address: e.target.value })}
                style={{
                  width: '100%', padding: '14px', border: '2px solid #e5e7eb',
                  borderRadius: '8px', fontSize: '15px', resize: 'vertical',
                  minHeight: '100px', boxSizing: 'border-box'
                }}
              />
            </div>
          </div>
        )}

        {/* Step 3: Plan Selection */}
        {step === 3 && (
          <div>
            <h2 style={{ marginTop: 0, marginBottom: '24px' }}>3️⃣ Plan Seçimi</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
              {[
                { id: 'starter', name: 'Starter', price: 299, users: 3, quotes: 50 },
                { id: 'pro', name: 'Pro', price: 799, users: 10, quotes: 'Unlimited' }
              ].map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => setCompany({ ...company, plan: plan.id })}
                  style={{
                    padding: '24px', border: `3px solid ${company.plan === plan.id ? '#667eea' : '#e5e7eb'}`,
                    borderRadius: '12px', cursor: 'pointer',
                    background: company.plan === plan.id ? '#eff6ff' : 'white',
                    transition: 'all 0.2s'
                  }}
                >
                  <h3 style={{ margin: '0 0 12px 0', fontSize: '20px' }}>{plan.name}</h3>
                  <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '16px', color: '#667eea' }}>
                    ₺{plan.price}<span style={{ fontSize: '16px', fontWeight: '400' }}>/ay</span>
                  </div>
                  <div style={{ fontSize: '14px', color: '#666' }}>
                    <div style={{ marginBottom: '8px' }}>✓ {plan.quotes} teklif/ay</div>
                    <div style={{ marginBottom: '8px' }}>✓ {plan.users} kullanıcı</div>
                    <div>✓ Tüm özellikler</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: '24px', padding: '16px', background: '#fef3c7',
              borderRadius: '8px', fontSize: '14px', color: '#92400e'
            }}>
              💡 <strong>14 gün ücretsiz deneme!</strong> Kredi kartı gerekmez.
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <div>
            <h2 style={{ marginTop: 0, marginBottom: '24px' }}>4️⃣ Özet & Onay</h2>
            
            <div style={{ background: '#f9fafb', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>Şirket</div>
                <div style={{ fontSize: '18px', fontWeight: '600' }}>{company.name}</div>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>URL</div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#667eea' }}>
                  https://{company.subdomain}.alfaierp.com
                </div>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>Plan</div>
                <div style={{ fontSize: '16px', fontWeight: '600' }}>
                  {company.plan === 'starter' ? 'Starter - ₺299/ay' : 'Pro - ₺799/ay'}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>İletişim</div>
                <div style={{ fontSize: '14px' }}>{company.email} • {company.phone}</div>
              </div>
            </div>

            <label style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '16px', background: '#f9fafb', borderRadius: '8px',
              cursor: 'pointer', marginBottom: '24px'
            }}>
              <input type="checkbox" style={{ width: '18px', height: '18px' }} />
              <span style={{ fontSize: '14px' }}>
                <strong>Kullanım Şartlarını</strong> ve <strong>Gizlilik Politikasını</strong> okudum, kabul ediyorum.
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
                flex: 1, padding: '14px', background: '#f3f4f6', color: '#374151',
                border: 'none', borderRadius: '8px', cursor: 'pointer',
                fontWeight: '600', fontSize: '15px'
              }}
            >
              ← Geri
            </button>
          )}
          <button
            onClick={step === 4 ? createCompany : nextStep}
            style={{
              flex: 1, padding: '14px', background: '#667eea', color: 'white',
              border: 'none', borderRadius: '8px', cursor: 'pointer',
              fontWeight: '600', fontSize: '15px'
            }}
          >
            {step === 4 ? '✓ Şirketi Oluştur' : 'İleri →'}
          </button>
        </div>
      </div>
    </div>
  );
}
