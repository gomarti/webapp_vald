import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // ✅ importe le router

createApp(App)
  .use(router) // ✅ ajoute le router à ton app
  .mount('#app');