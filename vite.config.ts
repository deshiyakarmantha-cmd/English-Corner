import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(({ command }) => {
  return {
    base: './',
    plugins: [
      {
        name: 'html-entry-transform',
        enforce: 'pre' as const,
        transformIndexHtml(html: string) {
          return html
            .replace(/<script[^>]*src=["']\.\/assets\/index\.js["'][^>]*><\/script>/gi, '<script type="module" src="/src/main.tsx"></script>')
            .replace(/<link[^>]*href=["']\.\/assets\/index\.css["'][^>]*>/gi, '');
        },
      },
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': path.resolve('.'),
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
