import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxying API requests to avoid CORS issues during development
      '/api': {
        target: 'https://min-api.cryptocompare.com/data',
        changeOrigin: true, // this is important for handling CORS
        rewrite: (path) => path.replace(/^\/api/, '') // rewrite '/api' to '' in the proxied request URL
      },
    },
  },
});
