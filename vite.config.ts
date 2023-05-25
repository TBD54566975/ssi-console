import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
    proxy: {
        '/v1': 'http://localhost:1234',
    },
  },
  build: {
    target: 'esnext',
  },
});
