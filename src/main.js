import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/plugins/router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './index.css'

createApp(App).use(ElementPlus).use(router).mount('#app')
