// Import path fix: Updated from '../frontend/src/api/odooApi.js' to './src/api/odooApi.js'
import React, { useEffect, useState } from 'react';
import { getCompanies, updateCompanyStatus, updateCompanyPlan, deleteCompany } from './src/api/odooApi.js';
import { toast } from 'react-hot-toast';

export default function AdminPanel() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const list = await getCompanies();
        setCompanies(Array.isArray(list) ? list : []);
      } catch (e) {
        setErr(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    function onUpdate(e){
      const u = e?.detail?.updated;
      if (u) setCompanies(prev => prev.map(c => c.id === u.id ? u : c));
    }
    function onRemove(e){
      const r = e?.detail?.removed;
      if (r) setCompanies(prev => prev.filter(c => c.id !== r.id));
    }
    window.addEventListener('alfai:updateCompanies', onUpdate);
    window.addEventListener('alfai:removeCompany', onRemove);
    return () => {
      window.removeEventListener('alfai:updateCompanies', onUpdate);
      window.removeEventListener('alfai:removeCompany', onRemove);
    };
  }, []);

  const totalMRR = companies.reduce((sum, c) => sum + (Number(c.mrr) || 0), 0);

  function openManage(company){
    setSelected(company);
    setShowModal(true);
  }

  function navigate(page){
    try {
      if (selected?.subdomain) {
        localStorage.setItem('alfai_company', selected.subdomain);
      }
    } catch {}
    window.dispatchEvent(new CustomEvent('alfai:navigate', { detail: { page } }));
    setShowModal(false);
  }

  async function setActive(){
    try {
      toast.loading('Güncelleniyor...', { id: 'company_status' });
      const updated = await updateCompanyStatus(selected.id, 'active');
      setCompanies(prev => prev.map(c => c.id === updated.id ? updated : c));
      toast.success('Aktif yapıldı', { id: 'company_status' });
    } catch (e) {
      toast.error('Hata: ' + e.message, { id: 'company_status' });
    }
  }

  async function setTrial(){
    try {
      toast.loading('Güncelleniyor...', { id: 'company_status' });
      const updated = await updateCompanyStatus(selected.id, 'trial');
      setCompanies(prev => prev.map(c => c.id === updated.id ? updated : c));
      toast.success('Trial yapıldı', { id: 'company_status' });
    } catch (e) {
      toast.error('Hata: ' + e.message, { id: 'company_status' });
    }
  }

  async function setPlan(plan){
    try {
      toast.loading('Plan değiştiriliyor...', { id: 'company_plan' });
      const updated = await updateCompanyPlan(selected.id, plan);
      setCompanies(prev => prev.map(c => c.id === updated.id ? updated : c));
      toast.success('Plan güncellendi', { id: 'company_plan' });
    } catch (e) {
      toast.error('Hata: ' + e.message, { id: 'company_plan' });
    }
  }

  const filtered = companies.filter(c =>
    [c.name, c.subdomain, c.plan, c.status].join(' ').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 style={{ margin: '0 0 24px 0', fontSize: '28px' }}>🔧 SaaS Admin Panel</h2>
      {err && (
        <div style={{ marginBottom: '16px', color: '#ef4444', fontSize: '14px' }}>{err}</div>
      )}
      {loading && (
        <div style={{ marginBottom: '16px', color: '#6b7280', fontSize: '14px' }}>Yükleniyor...</div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '24px' }}>
        {[
          { label: 'Toplam Şirket', value: companies.length, icon: '🏢', color: '#667eea' },
          { label: 'Aktif', value: companies.filter(c => c.status === 'active').length, icon: '✓', color: '#22c55e' },
          { label: 'Trial', value: companies.filter(c => c.status === 'trial').length, icon: '⏱️', color: '#f59e0b' },
          { label: 'MRR', value: `₺${totalMRR.toLocaleString()}`, icon: '💰', color: '#3b82f6' }
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

      <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <h3 style={{ marginTop: 0 }}>📊 Şirket Listesi</h3>
        <div style={{ marginBottom: '12px', display: 'flex', gap: '10px' }}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Ara: şirket, subdomain, plan, durum"
            style={{ padding: '8px 10px', border: '1px solid #e5e7eb', borderRadius: '8px', minWidth: '280px' }}
          />
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
              <th style={{ padding: '12px', textAlign: 'left', color: '#666', fontWeight: '600' }}>Şirket</th>
              <th style={{ padding: '12px', textAlign: 'left', color: '#666', fontWeight: '600' }}>URL</th>
              <th style={{ padding: '12px', textAlign: 'left', color: '#666', fontWeight: '600' }}>Plan</th>
              <th style={{ padding: '12px', textAlign: 'left', color: '#666', fontWeight: '600' }}>Kullanıcı</th>
              <th style={{ padding: '12px', textAlign: 'left', color: '#666', fontWeight: '600' }}>Durum</th>
              <th style={{ padding: '12px', textAlign: 'left', color: '#666', fontWeight: '600' }}>MRR</th>
              <th style={{ padding: '12px', textAlign: 'left', color: '#666', fontWeight: '600' }}>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(company => (
              <tr key={company.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '16px', fontWeight: '600' }}>{company.name}</td>
                <td style={{ padding: '16px' }}>
                  <a href={`https://${company.subdomain}.alfaierp.com`} target="_blank" rel="noopener noreferrer"
                     style={{ color: '#667eea', textDecoration: 'none' }}>
                    {company.subdomain}.alfaierp.com
                  </a>
                </td>
                <td style={{ padding: '16px' }}>
                  <span style={{
                    padding: '4px 12px', borderRadius: '12px',
                    background: company.plan === 'pro' ? '#eff6ff' : '#f3f4f6',
                    color: company.plan === 'pro' ? '#3b82f6' : '#6b7280',
                    fontSize: '12px', fontWeight: '600'
                  }}>
                    {company.plan.toUpperCase()}
                  </span>
                  <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
                    <button onClick={() => setPlanInline(company.id, 'starter')} style={{ padding: '6px 8px', borderRadius: '6px', border: '1px solid #e5e7eb', background: '#eff6ff', cursor: 'pointer', fontSize: '12px' }}>Starter</button>
                    <button onClick={() => setPlanInline(company.id, 'pro')} style={{ padding: '6px 8px', borderRadius: '6px', border: '1px solid #e5e7eb', background: '#eef2ff', cursor: 'pointer', fontSize: '12px' }}>Pro</button>
                  </div>
                </td>
                <td style={{ padding: '16px' }}>{company.users}</td>
                <td style={{ padding: '16px' }}>
                  <span style={{
                    padding: '4px 12px', borderRadius: '12px',
                    background: company.status === 'active' ? '#d1fae5' : '#fef3c7',
                    color: company.status === 'active' ? '#22c55e' : '#f59e0b',
                    fontSize: '12px', fontWeight: '600'
                  }}>
                    {company.status === 'active' ? '✓ ACTIVE' : '⏱️ TRIAL'}
                  </span>
                  <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
                    <button onClick={() => setStatusInline(company.id, 'active')} style={{ padding: '6px 8px', borderRadius: '6px', border: '1px solid #e5e7eb', background: '#ecfdf5', cursor: 'pointer', fontSize: '12px' }}>Aktif</button>
                    <button onClick={() => setStatusInline(company.id, 'trial')} style={{ padding: '6px 8px', borderRadius: '6px', border: '1px solid #e5e7eb', background: '#fff7ed', cursor: 'pointer', fontSize: '12px' }}>Trial</button>
                  </div>
                </td>
                <td style={{ padding: '16px', fontWeight: '600' }}>₺{company.mrr}</td>
                <td style={{ padding: '16px' }}>
                  <button
                    onClick={() => openManage(company)}
                    style={{
                      padding: '6px 12px', background: '#667eea', color: 'white',
                      border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px'
                    }}
                  >
                    Yönet
                  </button>
                  <button
                    onClick={() => deleteInline(company.id)}
                    style={{
                      marginLeft: '8px', padding: '6px 12px', background: '#ef4444', color: 'white',
                      border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px'
                    }}
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ background: 'white', borderRadius: '12px', padding: '24px', width: '420px', boxShadow: '0 6px 20px rgba(0,0,0,0.2)' }}>
            <h3 style={{ marginTop: 0 }}>Şirket Yönetimi</h3>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
              {selected?.name} • {selected?.subdomain}.alfaierp.com
            </div>
          <div style={{ display: 'grid', gap: '10px' }}>
            <button
              onClick={() => { window.open(`https://${selected?.subdomain}.alfaierp.com`, '_blank'); setShowModal(false); }}
              style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e5e7eb', background: '#f8fafc', cursor: 'pointer' }}
            >🌐 Alt domaini aç</button>
            <button
              onClick={() => navigate('subscription-management')}
              style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e5e7eb', background: '#f8fafc', cursor: 'pointer' }}
            >🎫 Abonelik Yönetimi</button>
            <button
              onClick={() => navigate('billing')}
              style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e5e7eb', background: '#f8fafc', cursor: 'pointer' }}
            >💰 Faturalama</button>
            <button
              onClick={() => navigate('usage-tracking')}
              style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e5e7eb', background: '#f8fafc', cursor: 'pointer' }}
            >📊 Kullanım Takibi</button>
            <div style={{ height: '1px', background: '#e5e7eb', margin: '6px 0' }} />
            <button
              onClick={setActive}
              style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e5e7eb', background: '#ecfdf5', cursor: 'pointer', color: '#065f46' }}
            >✓ Aktif yap</button>
            <button
              onClick={setTrial}
              style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e5e7eb', background: '#fff7ed', cursor: 'pointer', color: '#9a3412' }}
            >⏱️ Trial yap</button>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setPlan('starter')}
                style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #e5e7eb', background: '#eff6ff', cursor: 'pointer', color: '#1d4ed8' }}
              >Starter</button>
              <button
                onClick={() => setPlan('pro')}
                style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #e5e7eb', background: '#eef2ff', cursor: 'pointer', color: '#4338ca' }}
              >Pro</button>
            </div>
          </div>
          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={() => setShowModal(false)} style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #e5e7eb', background: 'white', cursor: 'pointer' }}>Kapat</button>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

async function setStatusInline(id, status) {
  try {
    toast.loading('Güncelleniyor...', { id: 'inline_status' });
    const updated = await updateCompanyStatus(id, status);
    window.dispatchEvent(new CustomEvent('alfai:updateCompanies', { detail: { updated } }));
    toast.success('Durum güncellendi', { id: 'inline_status' });
  } catch (e) {
    toast.error('Hata: ' + e.message, { id: 'inline_status' });
  }
}

async function setPlanInline(id, plan) {
  try {
    toast.loading('Plan değiştiriliyor...', { id: 'inline_plan' });
    const updated = await updateCompanyPlan(id, plan);
    window.dispatchEvent(new CustomEvent('alfai:updateCompanies', { detail: { updated } }));
    toast.success('Plan güncellendi', { id: 'inline_plan' });
  } catch (e) {
    toast.error('Hata: ' + e.message, { id: 'inline_plan' });
  }
}

async function deleteInline(id) {
  try {
    toast.loading('Siliniyor...', { id: 'inline_delete' });
    const removed = await deleteCompany(id);
    window.dispatchEvent(new CustomEvent('alfai:removeCompany', { detail: { removed } }));
    toast.success('Silindi', { id: 'inline_delete' });
  } catch (e) {
    toast.error('Hata: ' + e.message, { id: 'inline_delete' });
  }
}
