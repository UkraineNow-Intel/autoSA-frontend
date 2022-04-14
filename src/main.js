import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/plugins/router'
import ElementPlus from 'element-plus'
import './index.css'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'

createApp(App).use(createPinia()).use(ElementPlus).use(router).mount('#app')
