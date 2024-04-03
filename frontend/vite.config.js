import { defineConfig } from 'vite';
import rubyPlugin from 'vite-plugin-ruby';

export default defineConfig({
  plugins: [rubyPlugin()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000', // Assuming Rails runs on port 3000
    },
  }
});
