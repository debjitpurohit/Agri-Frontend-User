import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react()],
    server: {
      // watch: {
      //   usePolling: true,
      // },
      //host: true, // needed for the Docker Container port mapping to work
      origin: process.env.VITE_SERVER_URL,
      proxy: {
        '^/api/.*': {
          target: process.env.VITE_SERVER_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  });
};
