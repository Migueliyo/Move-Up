import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProvider } from './auth/AuthProvider';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { AppProvider } from './context/AppContext';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
    <AuthProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </AuthProvider>
);

// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);