import React, { useState } from 'react';

export default function HelpCenter() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Tümü', icon: '📚', count: 45 },
    { id: 'getting-started', name: 'Başlangıç', icon: '🚀', count: 12 },
    { id: 'quotes', name: 'Teklifler', icon: '📝', count: 8 },
    { id: 'invoices', name: 'Faturalar', icon: '🧾', count: 10 },
    { id: 'billing', name: 'Faturalama', icon: '💳', count: 7 },
    { id: 'integrations', name: 'Entegrasyonlar', icon: '🔗', count: 8 }
  ];

  const articles = [
    {
      id: 1, category: 'getting-started',
      title: 'ALFAI ERP\'ye Nasıl Başlarım?',
      desc: 'İlk adımlar, hesap oluşturma ve temel ayarlar hakkında detaylı rehber.',
      views: 1240, helpful: 95
    },
    {
      id: 2, category: 'quotes',
      title: 'Profesyonel Teklif Nasıl Oluşturulur?',
      desc: 'Teklif şablonları, özelleştirme ve PDF export işlemleri.',
      views: 890, helpful: 92
    },
    {
      id: 3, category: 'invoices',
      title: 'Teklifi Faturaya Nasıl Çeviririm?',
      desc: 'Tek tıkla teklif-fatura dönüşümü ve otomatik gönderim.',
      views: 760, helpful: 98
    },
    {
      id: 4, category: 'billing',
      title: 'Abonelik Planımı Nasıl Değiştirebilirim?',
      desc: 'Plan yükseltme, düşürme ve iptal işlemleri rehberi.',
      views: 620, helpful: 87
    }
  ];

  const filteredArticles = articles.filter(article => 
    (selectedCategory === 'all' || article.category === selectedCategory) &&
    (article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     article.desc.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ margin: '0 0 16px 0', fontSize: '42px' }}>📚 Yardım Merkezi</h1>
        <p style={{ margin: '0 0 32px 0', fontSize: '18px', color: '#666' }}>
          Size nasıl yardımcı olabiliriz?
        </p>
        
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <input
            type="text"
            placeholder="Ne aramak istiyorsunuz?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%', padding: '18px 24px', fontSize: '16px',
              border: '2px solid #e5e7eb', borderRadius: '12px',
              boxSizing: 'border-box'
            }}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', marginBottom: '40px' }}>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            style={{
              padding: '20px', background: selectedCategory === cat.id ? '#eff6ff' : 'white',
              border: `2px solid ${selectedCategory === cat.id ? '#667eea' : '#e5e7eb'}`,
              borderRadius: '12px', cursor: 'pointer',
              transition: 'all 0.2s', textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>{cat.icon}</div>
            <div style={{ fontWeight: '600', marginBottom: '4px' }}>{cat.name}</div>
            <div style={{ fontSize: '13px', color: '#666' }}>{cat.count} makale</div>
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredArticles.map(article => (
          <div key={article.id} style={{
            background: 'white', borderRadius: '12px', padding: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            cursor: 'pointer', transition: 'all 0.2s'
          }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '20px' }}>{article.title}</h3>
            <p style={{ margin: '0 0 16px 0', color: '#666', fontSize: '15px' }}>{article.desc}</p>
            <div style={{ display: 'flex', gap: '24px', fontSize: '13px', color: '#6b7280' }}>
              <span>👁️ {article.views} görüntülenme</span>
              <span>👍 %{article.helpful} faydalı</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: '60px', padding: '40px', background: '#f9fafb',
        borderRadius: '16px', textAlign: 'center'
      }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '24px' }}>Aradığını bulamadın mı?</h3>
        <p style={{ margin: '0 0 24px 0', color: '#666' }}>
          Destek ekibimiz her zaman yardımcı olmaya hazır! 💬
        </p>
        <button style={{
          padding: '14px 32px', background: '#667eea', color: 'white',
          border: 'none', borderRadius: '10px', fontSize: '16px',
          fontWeight: '600', cursor: 'pointer'
        }}>
          Destek Ekibiyle İletişime Geç
        </button>
      </div>
    </div>
  );
}
