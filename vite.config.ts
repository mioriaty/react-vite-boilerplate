import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';
// import eslint from 'vite-plugin-eslint';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), chunkSplitPlugin()],
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
    },
  },
  build: {
    chunkSizeWarningLimit: 1600,
  },
});
