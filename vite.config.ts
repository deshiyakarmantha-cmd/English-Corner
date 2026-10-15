import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(({ command }) => {
  return {
    base: '/English-Corner/',
    plugins: [
      react(),
      tailwindcss(),
      // AI Studio preview සඳහා පමණක් මෙම entry resolver එක ක්‍රියාත්මක වන සේ සකසා ඇත
      ...(command === 'serve' ? [{
        name: 'vite-entry-resolver',
        transformIndexHtml: {
          order: 'pre',
          handler(html) {
            return html;
          }
        }
      }] : []),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      rollupOptions: {
        output: {
          entryFileNames: 'assets/[name].js',
          chunkFileNames: 'assets/[name].js',
          assetFileNames: 'assets/[name].[ext]',
        },
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
