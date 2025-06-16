// // import "./style.css";
import App from "./App.vue";
import router from "./router/index";
import ArcoVue from 'modules/arco-design';
import ArcoVueIcon from "modules/arco-design/icons";
import microApp from "@micro-zoe/micro-app";
import { createApp } from 'modules/vue';

import '@arco-design/web-vue/es/style/index.css';
import { MicroUtils } from 'modules/@shared/common';

microApp.start({
  'router-mode': 'native',
  prefetchDelay: 1000,
  preFetchApps: MicroUtils.getMicroPreFetch(),
  globalAssets: {
    js: ['http://localhost:7000/assets/__federation_expose_Vue-BHM5Hp9X.js']
  },
  plugins: {
  }
});
const app = createApp(App);

app.use(ArcoVue);
app.use(ArcoVueIcon);
app.use(router);
app.mount("#app");
console.log('main app start', app);
microApp.router.setBaseAppRouter(router);
// 解决子应用使用hash模式地址栏回车无法刷新的问题
window.addEventListener('hashchange', () => {
  window.location.reload();
});

window.$mainRouter = router;
