import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import ElementPlus from 'unplugin-element-plus/vite'

export default defineConfig({
  server: {
    proxy: {
      // with options
      '/api': {
        target: 'http://ec2-44-197-226-135.compute-1.amazonaws.com/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/translation': {
        target: 'http://ec2-44-197-226-135.compute-1.amazonaws.com/translation',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/translation/, '')
      }
    }
  },
  plugins: [vue(), ElementPlus()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  }
})