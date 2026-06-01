import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          animation: ['framer-motion', 'gsap', 'lottie-react'],
          i18n: ['i18next', 'react-i18next'],
          forms: ['react-hook-form'],
        },
      },
    },
  },
});
