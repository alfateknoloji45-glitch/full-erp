import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function ModuleManager() {
  const [modules, setModules] = useState([
    {
      id: 'quotes',
      name: 'Teklif Modülü',
      description: 'Profesyonel teklif oluşturma ve yönetimi',
      icon: '📝',
      enabled: true,
      plans: ['starter', 'pro', 'enterprise'],
      dependencies: [],
      version: '2.5.0'
    },
    {
      id: 'invoices',
      name: 'Fatura Modülü',
      description: 'Otomatik faturalama ve E-Arşiv entegrasyonu',
      icon: '🧾',
      enabled: true,
      plans: ['starter', 'pro', 'enterprise'],
      dependencies: ['quotes'],
      version: '2.5.0'
    },
    {
      id: 'analytics',
      name: 'Gelişmiş Analitik',
      description: 'AI destekli raporlama ve tahminleme',
      icon: '📊',
      enabled: true,
      plans: ['pro', 'enterprise'],
      dependencies: [],
      version: '2.4.0'
    },
    {
      id: 'ai-assistant',
      name: 'AI Asistan',
      description: 'ChatGPT destekli akıllı asistan',
      icon: '🤖',
      enabled: false,
      plans: ['pro', 'enterprise'],
      dependencies: [],
      version: '2.6.0',
      beta: true
    },
    {
      id: 'mobile-app',
      name: 'Mobil Uygulama',
      description: 'iOS ve Android native uygulamalar',
      icon: '📱',
      enabled: false,
      plans: ['enterprise'],
      dependencies: [],
      version: '3.0.0',
      comingSoon: true
    },
    {
      id: 'white-label',
      name: 'White Label',
      description: 'Özel markalaşma ve domain',
      icon: '🎨',
      enabled: false,
      plans: ['enterprise'],
      dependencies: [],
      version: '2.5.0'
    }
  ]);

  const [currentPlan] = useState('pro');

  const toggleModule = (moduleId) => {
    const module = modules.find(m => m.id === moduleId);
    
    if (!module.plans.includes(currentPlan)) {
      toast.error('Bu modül için plan yükseltme gerekli!');
      return;
    }

    if (module.comingSoon) {
      toast('Bu modül yakında kullanıma sunulacak!');
      return;
    }

    // Check dependencies
    if (!module.enabled) {
      const missingDeps = module.dependencies.filter(depId => {
        const dep = modules.find(m => m.id === depId);
        return !dep || !dep.enabled;
      });

      if (missingDeps.length > 0) {
        toast.error('Önce bağımlı modülleri aktif edin!');
        return;
      }
    }

    setModules(modules.map(m => 
      m.id === moduleId ? { ...m, enabled: !m.enabled } : m
    ));

    toast.success(module.enabled ? 'Modül devre dışı bırakıldı' : 'Modül aktif edildi');
  };

  const getPlanBadge = (plans) => {
    if (plans.includes('starter')) return { text: 'TÜM PLANLAR', color: '#22c55e' };
    if (plans.includes('pro')) return { text: 'PRO+', color: '#667eea' };
    return { text: 'ENTERPRISE', color: '#f59e0b' };
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ margin: '0 0 8px 0', fontSize: '28px' }}>🧩 Modül Yönetimi</h2>
        <p style={{ margin: 0, color: '#666', fontSize: '15px' }}>
          İhtiyacınıza göre modülleri aktif/pasif yapın. Plan: <strong>{currentPlan.toUpperCase()}</strong>
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
        {[
          { label: 'Toplam Modül', value: modules.length, icon: '🧩', color: '#667eea' },
          { label: 'Aktif', value: modules.filter(m => m.enabled).length, icon: '✓', color: '#22c55e' },
          { label: 'Pasif', value: modules.filter(m => !m.enabled).length, icon: '○', color: '#6b7280' },
          { label: 'Yakında', value: modules.filter(m => m.comingSoon).length, icon: '🔜', color: '#f59e0b' }
        ].map((stat, i) => (
          <div key={i} style={{
            background: 'white', borderRadius: '12px', padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>{stat.icon}</div>
            <div style={{ fontSize: '13px', color: '#666', marginBottom: '5px' }}>{stat.label}</div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: stat.color }}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Modules Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
        {modules.map(module => {
          const planBadge = getPlanBadge(module.plans);
          const canEnable = module.plans.includes(currentPlan);
          
          return (
            <div key={module.id} style={{
              background: 'white', borderRadius: '12px', padding: '24px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              border: `2px solid ${module.enabled ? '#667eea' : '#e5e7eb'}`,
              opacity: canEnable || module.enabled ? 1 : 0.6
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                <div style={{ fontSize: '48px' }}>{module.icon}</div>
                <label style={{
                  position: 'relative', display: 'inline-block',
                  width: '50px', height: '28px'
                }}>
                  <input
                    type="checkbox"
                    checked={module.enabled}
                    onChange={() => toggleModule(module.id)}
                    disabled={module.comingSoon}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span style={{
                    position: 'absolute', cursor: module.comingSoon ? 'not-allowed' : 'pointer',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: module.enabled ? '#667eea' : '#e5e7eb',
                    borderRadius: '28px', transition: 'background 0.3s'
                  }}>
                    <span style={{
                      position: 'absolute', content: '', height: '20px', width: '20px',
                      left: module.enabled ? '26px' : '4px', bottom: '4px',
                      background: 'white', borderRadius: '50%',
                      transition: 'left 0.3s'
                    }} />
                  </span>
                </label>
              </div>

              <h3 style={{ margin: '0 0 8px 0', fontSize: '20px' }}>
                {module.name}
                {module.beta && (
                  <span style={{
                    marginLeft: '8px', padding: '2px 8px', borderRadius: '8px',
                    background: '#fef3c7', color: '#f59e0b',
                    fontSize: '11px', fontWeight: '700'
                  }}>
                    BETA
                  </span>
                )}
                {module.comingSoon && (
                  <span style={{
                    marginLeft: '8px', padding: '2px 8px', borderRadius: '8px',
                    background: '#dbeafe', color: '#3b82f6',
                    fontSize: '11px', fontWeight: '700'
                  }}>
                    YAKINDA
                  </span>
                )}
              </h3>

              <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#666', lineHeight: '1.5' }}>
                {module.description}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{
                  padding: '4px 12px', borderRadius: '12px',
                  background: planBadge.color + '20', color: planBadge.color,
                  fontSize: '11px', fontWeight: '700'
                }}>
                  {planBadge.text}
                </span>
                <span style={{ fontSize: '13px', color: '#6b7280' }}>
                  v{module.version}
                </span>
              </div>

              {module.dependencies.length > 0 && (
                <div style={{
                  padding: '8px 12px', background: '#f9fafb', borderRadius: '6px',
                  fontSize: '12px', color: '#666'
                }}>
                  <strong>Bağımlılık:</strong> {module.dependencies.map(depId => {
                    const dep = modules.find(m => m.id === depId);
                    return dep?.name;
                  }).join(', ')}
                </div>
              )}

              {!canEnable && !module.enabled && (
                <div style={{
                  marginTop: '12px', padding: '10px', background: '#fef3c7',
                  borderRadius: '8px', fontSize: '12px', color: '#92400e',
                  textAlign: 'center'
                }}>
                  Plan yükseltme gerekli
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
