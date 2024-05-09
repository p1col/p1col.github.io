import { createApp } from 'vue';
import App from './App.vue';
import './style.css';
import './theme/index.scss';
import { router } from './router/index';

const app = createApp(App);
app.use(router);
app.mount('#app');
console.info('app挂载后');
