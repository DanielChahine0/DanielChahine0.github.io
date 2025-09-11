/**
 * main.jsx - Application Entry Point
 * This file initializes the React application and renders it to the DOM
 * It sets up StrictMode for development and imports necessary global styles
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import 'highlight.js/styles/github-dark.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
