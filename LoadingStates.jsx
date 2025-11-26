import React from 'react';

/**
 * ALFAI ERP - Loading States
 * Professional loading indicators for all scenarios
 */

// 1. SPINNER LOADER
export const Spinner = ({ size = 'md', color = '#667eea' }) => {
  const sizes = {
    sm: '20px',
    md: '40px',
    lg: '60px'
  };

  return (
    <div style={{
      width: sizes[size],
      height: sizes[size],
      border: `3px solid #f3f4f6`,
      borderTop: `3px solid ${color}`,
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }}>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

// 2. SKELETON LOADER
export const Skeleton = ({ width = '100%', height = '20px', borderRadius = '4px' }) => (
  <div style={{
    width,
    height,
    borderRadius,
    background: 'linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite'
  }}>
    <style>{`
      @keyframes shimmer {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
    `}</style>
  </div>
);

// 3. CARD SKELETON
export const CardSkeleton = () => (
  <div style={{
    background: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
  }}>
    <Skeleton width="60%" height="24px" style={{ marginBottom: '16px' }} />
    <Skeleton width="100%" height="16px" style={{ marginBottom: '8px' }} />
    <Skeleton width="100%" height="16px" style={{ marginBottom: '8px' }} />
    <Skeleton width="80%" height="16px" />
  </div>
);

// 4. TABLE SKELETON
export const TableSkeleton = ({ rows = 5, columns = 4 }) => (
  <div>
    {[...Array(rows)].map((_, i) => (
      <div key={i} style={{
        display: 'flex',
        gap: '16px',
        padding: '16px',
        borderBottom: '1px solid #f3f4f6'
      }}>
        {[...Array(columns)].map((_, j) => (
          <Skeleton key={j} width={`${100 / columns}%`} height="20px" />
        ))}
      </div>
    ))}
  </div>
);

// 5. FULL PAGE LOADER
export const FullPageLoader = ({ message = 'Yükleniyor...' }) => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(255, 255, 255, 0.95)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999
  }}>
    <Spinner size="lg" />
    <div style={{
      marginTop: '24px',
      fontSize: '18px',
      fontWeight: '600',
      color: '#667eea'
    }}>
      {message}
    </div>
  </div>
);

// 6. BUTTON LOADER
export const ButtonLoader = ({ loading, children, ...props }) => (
  <button
    {...props}
    disabled={loading || props.disabled}
    style={{
      ...props.style,
      opacity: loading ? 0.7 : 1,
      cursor: loading ? 'not-allowed' : 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    }}
  >
    {loading && <Spinner size="sm" color="white" />}
    {children}
  </button>
);

// 7. PROGRESS BAR
export const ProgressBar = ({ progress = 0, color = '#667eea' }) => (
  <div style={{
    width: '100%',
    height: '4px',
    background: '#f3f4f6',
    borderRadius: '2px',
    overflow: 'hidden'
  }}>
    <div style={{
      width: `${progress}%`,
      height: '100%',
      background: color,
      transition: 'width 0.3s ease'
    }} />
  </div>
);

// 8. DOTS LOADER
export const DotsLoader = ({ color = '#667eea' }) => (
  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
    {[0, 1, 2].map(i => (
      <div
        key={i}
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: color,
          animation: `bounce 1.4s infinite ease-in-out`,
          animationDelay: `${i * 0.16}s`
        }}
      >
        <style>{`
          @keyframes bounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
          }
        `}</style>
      </div>
    ))}
  </div>
);

// 9. PULSE LOADER
export const PulseLoader = ({ size = '40px', color = '#667eea' }) => (
  <div style={{
    width: size,
    height: size,
    borderRadius: '50%',
    background: color,
    opacity: 0.6,
    animation: 'pulse 1.5s ease-in-out infinite'
  }}>
    <style>{`
      @keyframes pulse {
        0%, 100% { transform: scale(0.8); opacity: 0.5; }
        50% { transform: scale(1); opacity: 1; }
      }
    `}</style>
  </div>
);

// 10. LINEAR PROGRESS (Top of page)
export const LinearProgress = ({ loading }) => {
  if (!loading) return null;
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '3px',
      background: '#f3f4f6',
      zIndex: 9999
    }}>
      <div style={{
        height: '100%',
        background: '#667eea',
        animation: 'progress 1.5s ease-in-out infinite'
      }}>
        <style>{`
          @keyframes progress {
            0% { width: 0%; }
            50% { width: 70%; }
            100% { width: 100%; }
          }
        `}</style>
      </div>
    </div>
  );
};

export default {
  Spinner,
  Skeleton,
  CardSkeleton,
  TableSkeleton,
  FullPageLoader,
  ButtonLoader,
  ProgressBar,
  DotsLoader,
  PulseLoader,
  LinearProgress
};
