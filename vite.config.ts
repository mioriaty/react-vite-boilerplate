/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';
import svgrPlugin from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
  plugins: [react(), tsconfigPaths(), chunkSplitPlugin(), svgrPlugin(), splitVendorChunkPlugin()],
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, './src/'),
      components: path.resolve(__dirname, './src/components/'),
      container: path.resolve(__dirname, './src/container/'),
      hocs: path.resolve(__dirname, './src/hocs/'),
      utils: path.resolve(__dirname, './src/utils/'),
      hooks: path.resolve(__dirname, './src/hooks/'),
      store: path.resolve(__dirname, './src/store/'),
      routes: path.resolve(__dirname, './src/routes/'),
      httpHandler: path.resolve(__dirname, './src/httpHandler/'),
      services: path.resolve(__dirname, './src/services/'),
      providers: path.resolve(__dirname, './src/providers/'),
      pages: path.resolve(__dirname, './src/pages/'),
    },
  },
  build: {
    chunkSizeWarningLimit: 1600,
    minify: mode === 'development' ? false : 'terser',
    sourcemap: command === 'serve' ? 'inline' : false,
    rollupOptions: {
      output: {
        indent: false,
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
  },
}));
