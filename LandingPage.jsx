import React, { useState } from 'react';
// Updated import path to use the new src/api/odooApi.js module
import { signup } from './src/api/odooApi.js';
import { toast } from 'react-hot-toast';

export default function LandingPage() {
  const [email, setEmail] = useState('');

  const handleSignup = async () => {
    if (!email) return;
    try {
      toast.loading('Kaydediliyor...', { id: 'signup' });
      const res = await signup(email);
      if (res?.ok) {
        if (res?.token) localStorage.setItem('alfai_token', res.token);
        localStorage.setItem('alfai_logged', '1');
        toast.success('Kayıt başarılı', { id: 'signup' });
        window.location.href = '/';
      } else {
        toast.error('Kayıt başarısız', { id: 'signup' });
      }
    } catch (e) {
      toast.error('Hata: ' + e.message, { id: 'signup' });
    }
  };

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white', padding: '80px 20px', textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '56px', fontWeight: '800', margin: '0 0 24px 0',
            lineHeight: '1.2'
          }}>
            Teklif & Fatura Yönetimi<br/>Artık Çok Kolay! 🚀
          </h1>
          <p style={{
            fontSize: '24px', opacity: 0.95,
            maxWidth: '800px', margin: '0 auto 40px'
          }}>
            Profesyonel teklifler oluşturun, faturaları otomatikleştirin, işinizi büyütün.
            Dakikalar içinde başlayın! 💎
          </p>
          
          <div style={{
            display: 'flex', gap: '12px', justifyContent: 'center',
            maxWidth: '600px', margin: '0 auto 40px'
          }}>
            <input
              type="email"
              placeholder="E-posta adresiniz"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                flex: 1, padding: '18px 24px', fontSize: '16px',
                border: 'none', borderRadius: '12px'
              }}
            />
            <button
              onClick={handleSignup}
              style={{
                padding: '18px 48px', background: '#10b981', color: 'white',
                border: 'none', borderRadius: '12px', fontSize: '18px',
                fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap'
              }}
            >
              Ücretsiz Başla
            </button>
          </div>
          
          <div style={{ fontSize: '16px', opacity: 0.9 }}>
            ✓ 14 gün ücretsiz deneme &nbsp;&nbsp; ✓ Kredi kartı gerekmez &nbsp;&nbsp; ✓ 2 dakikada kurulum
          </div>
        </div>
      </div>

      {/* Social Proof */}
      <div style={{ padding: '40px 20px', background: '#f9fafb', textAlign: 'center' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '20px', fontWeight: '600' }}>
            2,500+ ŞİRKET GÜVENİYOR
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '60px', flexWrap: 'wrap' }}>
            {['🏢 ABC Yazılım', '💼 XYZ Danışmanlık', '🎨 Design Studio', '🏗️ İnşaat A.Ş.', '💻 Tech Corp'].map((company, i) => (
              <div key={i} style={{ fontSize: '18px', color: '#6b7280', fontWeight: '600' }}>
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: '42px', marginBottom: '60px' }}>
          🎯 Neden ALFAI ERP?
        </h2>
        
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '40px'
        }}>
          {[
            {
              icon: '📝', title: 'Profesyonel Teklifler',
              desc: 'Dakikalar içinde etkileyici teklifler oluşturun. Şablonlar, özelleştirme, PDF export.'
            },
            {
              icon: '🧾', title: 'Otomatik Faturalandırma',
              desc: 'Tekliften faturaya tek tıkla. E-Arşiv entegrasyonu, otomatik gönderim, takip.'
            },
            {
              icon: '💳', title: 'Kolay Ödeme',
              desc: 'Stripe, PayPal, iyzico. Online ödeme alın, abonelikleri yönetin.'
            },
            {
              icon: '📊', title: 'Güçlü Raporlar',
              desc: 'Gelir, gider, karlılık. Tüm işinizi tek ekranda görün. Gerçek zamanlı dashboard.'
            },
            {
              icon: '🤖', title: 'AI Destekli',
              desc: 'Akıllı öneriler, otomatik kategorizasyon, tahmine dayalı analitik.'
            },
            {
              icon: '🔒', title: 'Güvenli & Uyumlu',
              desc: 'KVKK uyumlu, SSL şifreli, günlük yedekleme. Verileriniz güvende.'
            }
          ].map((feature, i) => (
            <div key={i} style={{
              background: 'white', padding: '40px', borderRadius: '16px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>{feature.icon}</div>
              <h3 style={{ fontSize: '24px', marginBottom: '12px', margin: '0 0 12px 0' }}>
                {feature.title}
              </h3>
              <p style={{ fontSize: '16px', color: '#6b7280', lineHeight: '1.6', margin: 0 }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div style={{ padding: '80px 20px', background: '#f9fafb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '42px', marginBottom: '60px' }}>
            💰 Basit & Şeffaf Fiyatlandırma
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {[
              {
                name: 'Starter', price: 299, color: '#3b82f6',
                features: ['50 teklif/ay', '3 kullanıcı', 'Email destek', 'PDF export', 'Tüm özellikler']
              },
              {
                name: 'Pro', price: 799, color: '#667eea', popular: true,
                features: ['Sınırsız teklif', '10 kullanıcı', '7/24 destek', 'API erişimi', 'Advanced analytics', 'White-label']
              },
              {
                name: 'Enterprise', price: null, color: '#10b981',
                features: ['Sınırsız her şey', 'Özel geliştirme', 'Dedicated support', 'SLA garantisi', 'On-premise', 'Training']
              }
            ].map((plan, i) => (
              <div key={i} style={{
                background: 'white', borderRadius: '16px', padding: '40px',
                boxShadow: plan.popular ? '0 8px 24px rgba(102, 126, 234, 0.2)' : '0 4px 12px rgba(0,0,0,0.08)',
                border: plan.popular ? '3px solid #667eea' : 'none',
                position: 'relative',
                transform: plan.popular ? 'scale(1.05)' : 'scale(1)'
              }}>
                {plan.popular && (
                  <div style={{
                    position: 'absolute', top: '-15px', left: '50%',
                    transform: 'translateX(-50%)', background: '#667eea',
                    color: 'white', padding: '6px 20px', borderRadius: '20px',
                    fontSize: '13px', fontWeight: '700'
                  }}>
                    ⭐ EN POPÜLER
                  </div>
                )}
                
                <h3 style={{ fontSize: '28px', margin: '0 0 20px 0', color: plan.color }}>
                  {plan.name}
                </h3>
                <div style={{ marginBottom: '30px' }}>
                  <span style={{ fontSize: '48px', fontWeight: '800', color: '#1f2937' }}>
                    {plan.price ? `₺${plan.price}` : 'Özel'}
                  </span>
                  {plan.price && <span style={{ fontSize: '18px', color: '#6b7280' }}>/ay</span>}
                </div>
                
                <div style={{ marginBottom: '30px' }}>
                  {plan.features.map((f, j) => (
                    <div key={j} style={{
                      padding: '12px 0', borderBottom: '1px solid #f3f4f6',
                      fontSize: '15px', color: '#374151'
                    }}>
                      ✓ {f}
                    </div>
                  ))}
                </div>
                
                <button style={{
                  width: '100%', padding: '16px', background: plan.color,
                  color: 'white', border: 'none', borderRadius: '12px',
                  fontSize: '16px', fontWeight: '700', cursor: 'pointer'
                }}>
                  {plan.price ? 'Hemen Başla' : 'İletişime Geç'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: '42px', marginBottom: '60px' }}>
          💬 Müşterilerimiz Ne Diyor?
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
          {[
            {
              name: 'Ahmet Yılmaz', role: 'CEO, ABC Yazılım',
              text: 'ALFAI ERP ile teklif sürecimiz 10 kat hızlandı. Artık müşterilerimize dakikalar içinde profesyonel teklifler gönderebiliyoruz. Harika! 🚀'
            },
            {
              name: 'Ayşe Demir', role: 'Founder, XYZ Danışmanlık',
              text: 'Faturalama otomasyonu sayesinde ayda 20 saat zamandan kazandık. Sistem çok sezgisel ve kolay. Kesinlikle tavsiye ederim! 💎'
            },
            {
              name: 'Mehmet Kaya', role: 'CFO, Design Studio',
              text: 'Raporlar muhteşem! İşimizin her detayını görebiliyoruz. Veriye dayalı kararlar almamızı sağladı. Gelir %40 arttı! 📈'
            }
          ].map((testimonial, i) => (
            <div key={i} style={{
              background: 'white', padding: '40px', borderRadius: '16px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
            }}>
              <div style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '20px', color: '#374151' }}>
                "{testimonial.text}"
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{
                  width: '50px', height: '50px', borderRadius: '50%',
                  background: '#667eea', color: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '20px', fontWeight: '700'
                }}>
                  {testimonial.name[0]}
                </div>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '16px' }}>{testimonial.name}</div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white', padding: '80px 20px', textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '42px', margin: '0 0 24px 0' }}>
            Bugün Başlayın! 🚀
          </h2>
          <p style={{ fontSize: '20px', margin: '0 0 40px 0', opacity: 0.95 }}>
            14 gün ücretsiz deneyin. Kredi kartı gerekmez. 2 dakikada kurulum.
          </p>
          <button style={{
            padding: '20px 60px', background: 'white', color: '#667eea',
            border: 'none', borderRadius: '12px', fontSize: '20px',
            fontWeight: '700', cursor: 'pointer', boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
          }}>
            Ücretsiz Hesap Oluştur →
          </button>
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: '40px 20px', background: '#1f2937', color: 'white', textAlign: 'center' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '20px', fontSize: '24px', fontWeight: '700' }}>
            ALFAI ERP
          </div>
          <div style={{ fontSize: '14px', opacity: 0.7 }}>
            © 2024 ALFAI ERP. Tüm hakları saklıdır.
          </div>
        </div>
      </div>
    </div>
  );
}
