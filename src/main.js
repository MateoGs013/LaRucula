import { createApp } from 'vue';

import App from './App.vue';
import { bootstrapSiteConfig } from './app/app-config';
import router from './router';
import './styles/main.css';

await bootstrapSiteConfig();

createApp(App).use(router).mount('#app');
