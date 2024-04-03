import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import legacyPlugin from '@vitejs/plugin-legacy';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  build: {
    outDir: './build',
  },
  plugins: [
    vue(),
    legacyPlugin({
      modernPolyfills: true,
    }),
  ],
});
