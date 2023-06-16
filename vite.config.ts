import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

// https://vitejs.dev/config/
export default ({ mode }: { mode: any }) => {
  const SERVER_URL: string = loadEnv(mode, process.cwd()).VITE_BASE_URL

  return defineConfig({
    plugins: [vue(), vueJsx(), VueSetupExtend()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      proxy: {
        '/api': {
          target: SERVER_URL,
          rewrite: (path) => path.replace(/^\/api/, ''),
          changeOrigin: true
        }
      }
    }
  })
}
