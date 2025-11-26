import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function InvoiceSystem() {
  const [invoices] = useState([
    { 
      id: 1, 
      number: 'INV-2024-001', 
      customer: 'Ahmet Yılmaz', 
      total: 15000, 
      status: 'paid',
      dueDate: '2024-12-01',
      paidDate: '2024-11-25',
      quoteNumber: 'QT-2024-001'
    },
    { 
      id: 2, 
      number: 'INV-2024-002', 
      customer: 'Mehmet Demir', 
      total: 28500, 
      status: 'pending',
      dueDate: '2024-12-15',
      quoteNumber: 'QT-2024-002'
    },
    { 
      id: 3, 
      number: 'INV-2024-003', 
      customer: 'Ayşe Kaya', 
      total: 12000, 
      status: 'overdue',
      dueDate: '2024-11-20',
      quoteNumber: 'QT-2024-003'
    }
  ]);

  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const getStatusColor = (status) => {
    switch(status) {
      case 'paid': return { bg: '#d1fae5', text: '#22c55e' };
      case 'pending': return { bg: '#fef3c7', text: '#f59e0b' };
      case 'overdue': return { bg: '#fee2e2', text: '#ef4444' };
      case 'cancelled': return { bg: '#f3f4f6', text: '#6b7280' };
      default: return { bg: '#f3f4f6', text: '#6b7280' };
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'paid': return '✓ Ödendi';
      case 'pending': return '⏳ Bekliyor';
      case 'overdue': return '⚠️ Gecikmiş';
      case 'cancelled': return '✕ İptal';
      default: return status;
    }
  };

  const sendInvoice = (invoice) => {
    toast('Fatura gönderiliyor...');
    setTimeout(() => {
      toast.success(`Fatura ${invoice.number} e-posta ile gönderildi!`);
    }, 1000);
  };

  const downloadPDF = (invoice) => {
    toast('PDF indiriliyor...');
    setTimeout(() => {
      toast.success(`Fatura ${invoice.number} indirildi!`);
    }, 800);
  };

  const markAsPaid = (invoice) => {
    toast('Ödeme kaydediliyor...');
    setTimeout(() => {
      toast.success(`Fatura ${invoice.number} ödendi olarak işaretlendi!`);
    }, 1000);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ margin: 0, fontSize: '28px' }}>🧾 Faturalar</h2>
        <button style={{
          padding: '10px 20px', background: '#667eea', color: 'white',
          border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600'
        }}>
          + Yeni Fatura
        </button>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginBottom: '24px' }}>
        {[
          { label: 'Toplam Fatura', value: '₺55,500', icon: '🧾', color: '#667eea' },
          { label: 'Ödenen', value: '₺15,000', icon: '✓', color: '#22c55e' },
          { label: 'Bekleyen', value: '₺28,500', icon: '⏳', color: '#f59e0b' },
          { label: 'Gecikmiş', value: '₺12,000', icon: '⚠️', color: '#ef4444' }
        ].map((item, i) => (
          <div key={i} style={{
            background: 'white', borderRadius: '12px', padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>{item.icon}</div>
            <div style={{ fontSize: '13px', color: '#666', marginBottom: '5px' }}>{item.label}</div>
            <div style={{ fontSize: '20px', fontWeight: '700', color: item.color }}>{item.value}</div>
          </div>
        ))}
      </div>

      {/* Invoice List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {invoices.map(invoice => {
          const statusStyle = getStatusColor(invoice.status);
          return (
            <div key={invoice.id} style={{
              background: 'white', borderRadius: '12px', padding: '20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              borderLeft: `4px solid ${statusStyle.text}`
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <h3 style={{ margin: 0, fontSize: '18px' }}>{invoice.number}</h3>
                    <div style={{
                      padding: '4px 12px', borderRadius: '12px',
                      background: statusStyle.bg, color: statusStyle.text,
                      fontSize: '12px', fontWeight: '600'
                    }}>
                      {getStatusText(invoice.status)}
                    </div>
                  </div>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>
                    👤 {invoice.customer}
                  </div>
                  <div style={{ fontSize: '13px', color: '#666' }}>
                    📝 Teklif: {invoice.quoteNumber} • 📅 Vade: {invoice.dueDate}
                    {invoice.paidDate && ` • ✓ Ödeme: ${invoice.paidDate}`}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ fontSize: '24px', fontWeight: '700', color: '#667eea' }}>
                    ₺{invoice.total.toLocaleString()}
                  </div>
                  
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => downloadPDF(invoice)}
                      style={{
                        padding: '8px 16px', background: '#3b82f6', color: 'white',
                        border: 'none', borderRadius: '8px', cursor: 'pointer',
                        fontSize: '13px', fontWeight: '600'
                      }}
                    >
                      📄 PDF
                    </button>
                    <button
                      onClick={() => sendInvoice(invoice)}
                      style={{
                        padding: '8px 16px', background: '#10b981', color: 'white',
                        border: 'none', borderRadius: '8px', cursor: 'pointer',
                        fontSize: '13px', fontWeight: '600'
                      }}
                    >
                      📧 Gönder
                    </button>
                    {invoice.status === 'pending' && (
                      <button
                        onClick={() => markAsPaid(invoice)}
                        style={{
                          padding: '8px 16px', background: '#22c55e', color: 'white',
                          border: 'none', borderRadius: '8px', cursor: 'pointer',
                          fontSize: '13px', fontWeight: '600'
                        }}
                      >
                        ✓ Ödendi
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quote to Invoice Converter */}
      <div style={{
        background: 'white', borderRadius: '12px', padding: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginTop: '24px'
      }}>
        <h3 style={{ marginTop: 0, marginBottom: '15px' }}>🔄 Teklifi Faturaya Çevir</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Teklif Numarası (örn: QT-2024-004)"
            style={{
              flex: 1, padding: '12px', border: '2px solid #e5e7eb',
              borderRadius: '8px', fontSize: '14px'
            }}
          />
          <button style={{
            padding: '12px 24px', background: '#667eea', color: 'white',
            border: 'none', borderRadius: '8px', cursor: 'pointer',
            fontWeight: '600', whiteSpace: 'nowrap'
          }}>
            🔄 Faturaya Çevir
          </button>
        </div>
        <div style={{
          marginTop: '15px', padding: '12px', background: '#eff6ff',
          borderRadius: '8px', fontSize: '13px', color: '#3b82f6'
        }}>
          💡 Onaylanmış teklifler otomatik olarak faturaya dönüştürülebilir.
        </div>
      </div>
    </div>
  );
}
