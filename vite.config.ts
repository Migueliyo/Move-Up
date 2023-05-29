/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';

export default defineConfig({
  optimizeDeps: {
    exclude: [`@ionic/pwa-elements/loader`],
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  }
});

