import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import ElementPlus from 'unplugin-element-plus/vite'


export default defineConfig(({ command }) => {
  let baseSettings = {
    plugins: [vue(), ElementPlus()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    }
  }
  if (command === 'build') {
    baseSettings['server'] = {
      proxy: {
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
    }
  } else {
    baseSettings['server'] = {
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:8000/api',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
        '/translation': {
          target: 'http://127.0.0.1:8000/translation',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/translation/, '')
        }
      }
    }
  }

  return baseSettings
})
