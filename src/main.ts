import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueDraggableResizable from 'vue-draggable-resizable'
import "vue-draggable-resizable/style.css";
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component("vue-draggable-resizable", VueDraggableResizable)
app.mount('#app')
