/**
 * ALFAI ERP - React Entry Point
 * 
 * This file is the main entry point for the Vite React application.
 * It mounts the React app, renders the Toaster for notifications, and
 * displays AdminPanel as the initial page.
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import AdminPanel from '../AdminPanel.jsx';

// Mount the React application to the root element
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    {/* Global toast notification container */}
    <Toaster 
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: '#363636',
          color: '#fff',
        },
        success: {
          duration: 3000,
          style: {
            background: '#22c55e',
          },
        },
        error: {
          duration: 4000,
          style: {
            background: '#ef4444',
          },
        },
      }}
    />
    {/* Main application content - AdminPanel is the initial page */}
    <div style={{ 
      minHeight: '100vh', 
      background: '#f3f4f6', 
      padding: '24px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <AdminPanel />
    </div>
  </React.StrictMode>
);
