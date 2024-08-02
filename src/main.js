import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router.js";
import './assets/base.css';  // Importer le fichier CSS global

createApp(App).use(router).mount('#app')
