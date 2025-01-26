import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueDraggableResizable from 'vue-draggable-resizable'
import "vue-draggable-resizable/style.css";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.component("vue-draggable-resizable", VueDraggableResizable)
app.mount('#app')
