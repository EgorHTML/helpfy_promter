import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import { resolve } from 'path'
import { viteSingleFile } from 'vite-plugin-singlefile'
import basicSsl from '@vitejs/plugin-basic-ssl'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    plugins: [
      vue(),
      viteSingleFile(),
      eslintPlugin({
        failOnError: false,
        failOnWarning: false,
      }),
      basicSsl(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    base: process.env.VITE_PUBLIC_PATH,
    server: {
      host: '127.0.0.1',
      strictPort: true,
      port: process.env.PORT ?? 8080,
      open: false,
      https: true,
    },
    build: {
      chunkSizeWarningLimit: 100000000,
      outDir: process.env.VITE_OUTPUT_DIR,
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
        },
        output: {
          chunkFileNames: 'js/chunk-vendors.js',
          entryFileNames: 'js/app.js',
        },
      },
    },
  }
})
