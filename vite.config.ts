/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
    proxy: {
        '/v1': {
            target: {
                host: process.env.BASE_URL,
                port: 3001
            }
        }
    },
  },
  build: {
    target: 'ESNext',
  },
  test: {
    environment: 'jsdom',
    globals: true,
    transformMode: { 
        web: [/\.[jt]sx?$/] 
    },
    setupFiles: ['./vitest.setup.ts']
  }
});
