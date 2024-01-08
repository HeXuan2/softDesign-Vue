import './assets/main.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
//引入iconfont
//1.Symbol方式
import '@/assets/iconfont/iconfont.js'
//2.Font class方式
import '@/assets/iconfont/iconfont.css'


const app = createApp(App)
app.config.globalProperties.$code_success = '20000'
app.config.globalProperties.$code_fail = '20001'



app.use(ElementPlus)
const pinia=createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(createPinia())
app.use(pinia)
app.use(router)
app.mount('#app')
