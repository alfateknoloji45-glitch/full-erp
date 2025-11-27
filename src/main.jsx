/**
 * main.jsx - React Entry Point
 * 
 * This file bootstraps the React application:
 * - Mounts the app into the #root DOM element using React 18's createRoot API
 * - Renders the Toaster component for toast notifications (react-hot-toast)
 * - Renders the AdminPanel as the main component
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import AdminPanel from '../AdminPanel.jsx';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Toaster position="top-right" />
    <AdminPanel />
  </React.StrictMode>
);
