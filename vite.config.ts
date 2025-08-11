import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
// import componentTagger from './path/to/componentTagger'; // uncomment and adjust if you have it

export default defineConfig(({ mode }) => ({
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: 'index.html',
    },
  },
  server: {
    host: '::',
    port: 8080,
  },
  plugins: [
    react(),
    // mode === 'development' && componentTagger(), // uncomment if you have this plugin
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}));
