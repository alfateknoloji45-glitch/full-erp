/**
 * ALFAI ERP - Design System & Theme
 * Central color palette and design tokens
 */

export const theme = {
  // Primary Colors
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#667eea', // Main brand color
      600: '#5a67d8',
      700: '#4c51bf',
      800: '#434190',
      900: '#3c366b'
    },
    
    // Secondary (Purple)
    secondary: {
      500: '#764ba2',
      600: '#6b4394',
      700: '#5f3a82'
    },
    
    // Success (Green)
    success: {
      50: '#d1fae5',
      500: '#22c55e',
      700: '#16a34a'
    },
    
    // Warning (Orange/Yellow)
    warning: {
      50: '#fef3c7',
      500: '#f59e0b',
      700: '#d97706'
    },
    
    // Error (Red)
    error: {
      50: '#fee2e2',
      500: '#ef4444',
      700: '#dc2626'
    },
    
    // Info (Blue)
    info: {
      50: '#dbeafe',
      500: '#3b82f6',
      700: '#2563eb'
    },
    
    // Neutral (Gray)
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827'
    }
  },
  
  // Typography
  typography: {
    fontFamily: {
      sans: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      mono: '"SF Mono", Monaco, Consolas, monospace'
    },
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '30px',
      '4xl': '36px',
      '5xl': '48px'
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800
    }
  },
  
  // Spacing
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px'
  },
  
  // Border Radius
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '24px',
    full: '9999px'
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 2px 8px rgba(0, 0, 0, 0.08)',
    lg: '0 4px 12px rgba(0, 0, 0, 0.1)',
    xl: '0 8px 24px rgba(0, 0, 0, 0.15)',
    '2xl': '0 16px 48px rgba(0, 0, 0, 0.2)'
  },
  
  // Transitions
  transitions: {
    fast: '150ms ease-in-out',
    base: '200ms ease-in-out',
    slow: '300ms ease-in-out'
  }
};

// Utility function to get color
export const getColor = (path) => {
  const keys = path.split('.');
  let value = theme.colors;
  for (const key of keys) {
    value = value[key];
  }
  return value;
};

export default theme;
