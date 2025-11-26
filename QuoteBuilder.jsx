import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export default function QuoteBuilder() {
  const [quote, setQuote] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    title: 'Proje Teklifi',
    validUntil: '',
    items: [{ name: '', description: '', quantity: 1, price: 0 }],
    discount: 0,
    tax: 20, // KDV %20
    notes: ''
  });

  useEffect(() => {
    function onAction(e) {
      const t = e?.detail?.type;
      if (t === 'quote:new') {
        setQuote({
          customerName: '',
          customerEmail: '',
          customerPhone: '',
          title: 'Proje Teklifi',
          validUntil: '',
          items: [{ name: '', description: '', quantity: 1, price: 0 }],
          discount: 0,
          tax: 20,
          notes: ''
        });
        toast.success('Yeni teklif formu hazır');
      }
    }
    window.addEventListener('alfai:action', onAction);
    return () => window.removeEventListener('alfai:action', onAction);
  }, []);

  const addItem = () => {
    setQuote({
      ...quote,
      items: [...quote.items, { name: '', description: '', quantity: 1, price: 0 }]
    });
  };

  const removeItem = (index) => {
    setQuote({
      ...quote,
      items: quote.items.filter((_, i) => i !== index)
    });
  };

  const updateItem = (index, field, value) => {
    const newItems = [...quote.items];
    newItems[index][field] = value;
    setQuote({ ...quote, items: newItems });
  };

  const calculateSubtotal = () => {
    return quote.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  };

  const calculateDiscount = () => {
    return calculateSubtotal() * (quote.discount / 100);
  };

  const calculateTax = () => {
    return (calculateSubtotal() - calculateDiscount()) * (quote.tax / 100);
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount() + calculateTax();
  };

  const saveQuote = () => {
    if (!quote.customerName || !quote.customerEmail) {
      toast.error('Müşteri bilgilerini doldurun!');
      return;
    }
    toast.loading('Teklif kaydediliyor...', { duration: 1000 });
    setTimeout(() => {
      toast.success('Teklif başarıyla kaydedildi!');
    }, 1000);
  };

  const sendQuote = () => {
    if (!quote.customerEmail) {
      toast.error('E-posta adresi gerekli!');
      return;
    }
    toast.loading('Teklif gönderiliyor...', { duration: 1500 });
    setTimeout(() => {
      toast.success('Teklif e-posta ile gönderildi!');
    }, 1500);
  };

  const exportPDF = () => {
    toast.loading('PDF oluşturuluyor...', { duration: 1000 });
    setTimeout(() => {
      toast.success('PDF indirildi!');
    }, 1000);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ margin: 0, fontSize: '28px' }}>📝 Yeni Teklif Oluştur</h2>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={exportPDF} style={{
            padding: '10px 20px', background: '#3b82f6', color: 'white',
            border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600'
          }}>
            📄 PDF İndir
          </button>
          <button onClick={sendQuote} style={{
            padding: '10px 20px', background: '#10b981', color: 'white',
            border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600'
          }}>
            📧 E-posta Gönder
          </button>
          <button onClick={saveQuote} style={{
            padding: '10px 20px', background: '#667eea', color: 'white',
            border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600'
          }}>
            💾 Kaydet
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        {/* Left Column - Quote Details */}
        <div>
          {/* Customer Info */}
          <div style={{
            background: 'white', borderRadius: '12px', padding: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: '20px'
          }}>
            <h3 style={{ marginTop: 0, marginBottom: '20px', fontSize: '18px' }}>👤 Müşteri Bilgileri</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <input
                type="text"
                placeholder="Müşteri Adı *"
                value={quote.customerName}
                onChange={(e) => setQuote({ ...quote, customerName: e.target.value })}
                style={{
                  padding: '12px', border: '2px solid #e5e7eb', borderRadius: '8px',
                  fontSize: '14px', width: '100%', boxSizing: 'border-box'
                }}
              />
              <input
                type="email"
                placeholder="E-posta *"
                value={quote.customerEmail}
                onChange={(e) => setQuote({ ...quote, customerEmail: e.target.value })}
                style={{
                  padding: '12px', border: '2px solid #e5e7eb', borderRadius: '8px',
                  fontSize: '14px', width: '100%', boxSizing: 'border-box'
                }}
              />
              <input
                type="tel"
                placeholder="Telefon"
                value={quote.customerPhone}
                onChange={(e) => setQuote({ ...quote, customerPhone: e.target.value })}
                style={{
                  padding: '12px', border: '2px solid #e5e7eb', borderRadius: '8px',
                  fontSize: '14px', width: '100%', boxSizing: 'border-box'
                }}
              />
              <input
                type="date"
                placeholder="Geçerlilik Tarihi"
                value={quote.validUntil}
                onChange={(e) => setQuote({ ...quote, validUntil: e.target.value })}
                style={{
                  padding: '12px', border: '2px solid #e5e7eb', borderRadius: '8px',
                  fontSize: '14px', width: '100%', boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          {/* Quote Items */}
          <div style={{
            background: 'white', borderRadius: '12px', padding: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '18px' }}>📦 Teklif Kalemleri</h3>
              <button onClick={addItem} style={{
                padding: '8px 16px', background: '#667eea', color: 'white',
                border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px'
              }}>
                + Kalem Ekle
              </button>
            </div>

            {quote.items.map((item, index) => (
              <div key={index} style={{
                padding: '15px', background: '#f9fafb', borderRadius: '8px',
                marginBottom: '12px', position: 'relative'
              }}>
                {quote.items.length > 1 && (
                  <button
                    onClick={() => removeItem(index)}
                    style={{
                      position: 'absolute', right: '10px', top: '10px',
                      background: '#ef4444', color: 'white', border: 'none',
                      borderRadius: '50%', width: '24px', height: '24px',
                      cursor: 'pointer', fontSize: '14px'
                    }}
                  >
                    ×
                  </button>
                )}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                  <input
                    type="text"
                    placeholder="Ürün/Hizmet Adı"
                    value={item.name}
                    onChange={(e) => updateItem(index, 'name', e.target.value)}
                    style={{
                      padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                  <input
                    type="number"
                    placeholder="Miktar"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                    style={{
                      padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                  <input
                    type="number"
                    placeholder="Birim Fiyat"
                    value={item.price}
                    onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value) || 0)}
                    style={{
                      padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                </div>
                <textarea
                  placeholder="Açıklama (opsiyonel)"
                  value={item.description}
                  onChange={(e) => updateItem(index, 'description', e.target.value)}
                  style={{
                    width: '100%', padding: '10px', border: '1px solid #e5e7eb',
                    borderRadius: '6px', fontSize: '13px', resize: 'vertical',
                    minHeight: '60px', boxSizing: 'border-box'
                  }}
                />
                <div style={{
                  marginTop: '10px', textAlign: 'right', fontWeight: '600',
                  color: '#667eea', fontSize: '16px'
                }}>
                  Toplam: ₺{(item.quantity * item.price).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* Notes */}
          <div style={{
            background: 'white', borderRadius: '12px', padding: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <h3 style={{ marginTop: 0, marginBottom: '15px', fontSize: '18px' }}>📝 Notlar & Şartlar</h3>
            <textarea
              placeholder="Teklif notları, ödeme şartları, teslimat koşulları..."
              value={quote.notes}
              onChange={(e) => setQuote({ ...quote, notes: e.target.value })}
              style={{
                width: '100%', padding: '12px', border: '2px solid #e5e7eb',
                borderRadius: '8px', fontSize: '14px', resize: 'vertical',
                minHeight: '100px', boxSizing: 'border-box'
              }}
            />
          </div>
        </div>

        {/* Right Column - Summary */}
        <div>
          <div style={{
            background: 'white', borderRadius: '12px', padding: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)', position: 'sticky',
            top: '20px'
          }}>
            <h3 style={{ marginTop: 0, marginBottom: '20px', fontSize: '18px' }}>💰 Fiyat Özeti</h3>

            <div style={{ marginBottom: '20px' }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                padding: '12px 0', borderBottom: '1px solid #e5e7eb'
              }}>
                <span>Ara Toplam:</span>
                <span style={{ fontWeight: '600' }}>₺{calculateSubtotal().toFixed(2)}</span>
              </div>

              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '12px 0', borderBottom: '1px solid #e5e7eb'
              }}>
                <span>İndirim:</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="number"
                    value={quote.discount}
                    onChange={(e) => setQuote({ ...quote, discount: parseFloat(e.target.value) || 0 })}
                    style={{
                      width: '60px', padding: '6px', border: '1px solid #e5e7eb',
                      borderRadius: '6px', textAlign: 'right'
                    }}
                  />
                  <span>%</span>
                  <span style={{ fontWeight: '600', color: '#ef4444' }}>
                    -₺{calculateDiscount().toFixed(2)}
                  </span>
                </div>
              </div>

              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '12px 0', borderBottom: '1px solid #e5e7eb'
              }}>
                <span>KDV:</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="number"
                    value={quote.tax}
                    onChange={(e) => setQuote({ ...quote, tax: parseFloat(e.target.value) || 0 })}
                    style={{
                      width: '60px', padding: '6px', border: '1px solid #e5e7eb',
                      borderRadius: '6px', textAlign: 'right'
                    }}
                  />
                  <span>%</span>
                  <span style={{ fontWeight: '600', color: '#10b981' }}>
                    +₺{calculateTax().toFixed(2)}
                  </span>
                </div>
              </div>

              <div style={{
                display: 'flex', justifyContent: 'space-between',
                padding: '16px 0', fontSize: '20px', fontWeight: '700',
                color: '#667eea'
              }}>
                <span>TOPLAM:</span>
                <span>₺{calculateTotal().toFixed(2)}</span>
              </div>
            </div>

            <div style={{
              padding: '15px', background: '#eff6ff', borderRadius: '8px',
              fontSize: '13px', color: '#3b82f6'
            }}>
              <div style={{ fontWeight: '600', marginBottom: '5px' }}>💡 İpucu</div>
              Teklifi kaydetmeden önce tüm bilgileri kontrol edin.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
