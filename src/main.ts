import { createApp } from 'vue';
import App from './App.vue';
import './style.css';
import { isFeishu, loadScript } from './assets/js/utils';

const app = createApp(App);
console.info('插播飞书sdk');
const isThird = true;
if (isThird && isFeishu()) {
  const sdkUrl =
    'https://lf1-cdn-tos.bytegoofy.com/goofy/ee/lark/h5jssdk/lark/js_sdk/h5-js-sdk-1.5.11.js';
  loadScript(sdkUrl, () => {
    console.info('飞书sdk加载完成');
  });
}

app.mount('#app');
console.info('app挂载后');
