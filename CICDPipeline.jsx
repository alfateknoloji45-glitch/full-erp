import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function CICDPipeline() {
  const [pipelines, setPipelines] = useState([
    { id: 1, name: 'Build & Test', status: 'success', duration: '2m 34s', branch: 'main' },
    { id: 2, name: 'Deploy Staging', status: 'running', duration: '1m 12s', branch: 'develop' },
    { id: 3, name: 'Production Deploy', status: 'pending', duration: '-', branch: 'main' }
  ]);

  const runPipeline = (id) => {
    toast('Pipeline başlatılıyor...');
    setTimeout(() => {
      setPipelines(pipelines.map(p => 
        p.id === id ? { ...p, status: 'running' } : p
      ));
      toast.success('Pipeline çalışıyor!');
    }, 1000);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'success': return '#22c55e';
      case 'running': return '#3b82f6';
      case 'failed': return '#ef4444';
      case 'pending': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'success': return '✓';
      case 'running': return '⏳';
      case 'failed': return '✕';
      case 'pending': return '⏸️';
      default: return '•';
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h2 style={{ margin: 0, fontSize: '28px' }}>🚀 CI/CD Pipeline</h2>
        <button onClick={() => runPipeline(3)} style={{
          padding: '10px 20px', background: '#667eea', color: 'white',
          border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600'
        }}>
          ▶️ Run Pipeline
        </button>
      </div>

      {/* Pipeline Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
        {pipelines.map(pipeline => (
          <div key={pipeline.id} style={{
            background: 'white', borderRadius: '12px', padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            borderLeft: `4px solid ${getStatusColor(pipeline.status)}`
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <span style={{
                    fontSize: '20px',
                    width: '32px', height: '32px',
                    borderRadius: '50%',
                    background: getStatusColor(pipeline.status),
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {getStatusIcon(pipeline.status)}
                  </span>
                  <h3 style={{ margin: 0 }}>{pipeline.name}</h3>
                </div>
                <div style={{ display: 'flex', gap: '20px', fontSize: '13px', color: '#666', paddingLeft: '44px' }}>
                  <span>🌿 {pipeline.branch}</span>
                  <span>⏱️ {pipeline.duration}</span>
                </div>
              </div>
              <div style={{
                padding: '6px 16px',
                background: getStatusColor(pipeline.status) + '20',
                color: getStatusColor(pipeline.status),
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '700',
                textTransform: 'uppercase'
              }}>
                {pipeline.status}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* GitHub Actions Config */}
      <div style={{
        background: 'white', borderRadius: '12px', padding: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
      }}>
        <h3 style={{ marginTop: 0 }}>📄 GitHub Actions Config</h3>
        <pre style={{
          background: '#1f2937', color: '#f9fafb', padding: '20px',
          borderRadius: '8px', overflow: 'auto', fontSize: '12px',
          fontFamily: 'monospace'
        }}>
{`name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install
        run: npm install
      - name: Build
        run: npm run build
      - name: Test
        run: npm test
      - name: Deploy
        run: npm run deploy`}
        </pre>
      </div>
    </div>
  );
}
