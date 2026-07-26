import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ mode }) => {
  const rootDir = path.resolve(__dirname, '..');
  const env = loadEnv(mode, rootDir, '');
  const prefix = env.PREFIX ?? 'api';

  return {
    plugins: [react()],
    define: {
      '__APP_PREFIX__': JSON.stringify(prefix)
    },
    server: {
      proxy: {
        [`/${prefix}`]: {
          target: 'http://localhost:3000',
          changeOrigin: true,
          secure: false,
        }
      },
    },
  };
});