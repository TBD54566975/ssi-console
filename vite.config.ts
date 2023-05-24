import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
    proxy: {
        '/v1': 'http://localhost:8099',
    },
  },
  build: {
    target: 'esnext',
  },
});
