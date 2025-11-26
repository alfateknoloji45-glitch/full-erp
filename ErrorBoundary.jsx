import React from 'react';

/**
 * ALFAI ERP - Error Boundary
 * Catch React errors and show fallback UI
 */

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    try {
      const base = (typeof window !== 'undefined' && window.__ALFAI_API__) ? window.__ALFAI_API__ : (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001');
      const tenant = (typeof localStorage !== 'undefined') ? localStorage.getItem('alfai_company') : null;
      const payload = {
        message: String(error?.toString() || 'Error'),
        stack: String(errorInfo?.componentStack || ''),
        severity: 'high',
        tenant: tenant || 'default'
      };
      fetch(`${base}/api/errors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(tenant ? { 'X-Tenant': tenant } : {})
        },
        body: JSON.stringify(payload)
      }).catch(()=>{});
    } catch {}

    this.setState({
      error,
      errorInfo
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Custom error UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f9fafb',
          padding: '20px'
        }}>
          <div style={{
            maxWidth: '600px',
            background: 'white',
            borderRadius: '16px',
            padding: '48px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            {/* Icon */}
            <div style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 24px',
              borderRadius: '50%',
              background: '#fee2e2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '40px'
            }}>
              ⚠️
            </div>

            {/* Title */}
            <h1 style={{
              margin: '0 0 16px 0',
              fontSize: '28px',
              fontWeight: '700',
              color: '#1f2937'
            }}>
              Bir Hata Oluştu
            </h1>

            {/* Description */}
            <p style={{
              margin: '0 0 32px 0',
              fontSize: '16px',
              color: '#6b7280',
              lineHeight: '1.6'
            }}>
              Üzgünüz, beklenmeyen bir hata meydana geldi. Lütfen sayfayı yenileyin veya destek ekibimizle iletişime geçin.
            </p>

            {/* Error Details (Development only) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div style={{
                marginBottom: '24px',
                padding: '16px',
                background: '#fef3c7',
                borderRadius: '8px',
                textAlign: 'left',
                fontSize: '13px',
                fontFamily: 'monospace',
                color: '#92400e',
                maxHeight: '200px',
                overflow: 'auto'
              }}>
                <strong>Error:</strong> {this.state.error.toString()}
                <br /><br />
                <strong>Stack:</strong>
                <pre style={{ margin: '8px 0 0 0', fontSize: '12px' }}>
                  {this.state.errorInfo?.componentStack}
                </pre>
              </div>
            )}

            {/* Actions */}
            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center'
            }}>
              <button
                onClick={this.handleReset}
                style={{
                  padding: '14px 32px',
                  background: '#f3f4f6',
                  color: '#374151',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Tekrar Dene
              </button>
              <button
                onClick={this.handleReload}
                style={{
                  padding: '14px 32px',
                  background: '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Sayfayı Yenile
              </button>
            </div>

            {/* Support Link */}
            <div style={{
              marginTop: '32px',
              paddingTop: '24px',
              borderTop: '1px solid #e5e7eb',
              fontSize: '14px',
              color: '#6b7280'
            }}>
              Sorun devam ediyorsa{' '}
              <a
                href="mailto:support@alfaierp.com"
                style={{ color: '#667eea', textDecoration: 'none', fontWeight: '600' }}
              >
                destek@alfaierp.com
              </a>
              {' '}ile iletişime geçin.
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// HOC wrapper for functional components
export const withErrorBoundary = (Component, fallback) => {
  return (props) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  );
};

export default ErrorBoundary;
