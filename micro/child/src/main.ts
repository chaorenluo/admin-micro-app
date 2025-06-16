import '@arco-design/web-vue/lib/style/index.css';
import { createApp, App as AppInstance } from "modules/vue";
import ArcoVue from 'modules/arco-design';
import ArcoVueIcon from "modules/arco-design/icons";
import {
  createRouter,
  createWebHashHistory,
  Router,
  RouterHistory
} from "modules/vue-router";
import App from "./App.vue";
import routes from "./router";

declare global {
  interface Window {
    eventCenterForAppNameVite: any;
    __MICRO_APP_NAME__: string;
    __MICRO_APP_ENVIRONMENT__: string;
    __MICRO_APP_BASE_APPLICATION__: string;
  }
}

let app: AppInstance | null = null;
let router: Router | null = null;
let history: RouterHistory | null = null;
// 将渲染操作放入 mount 函数
function mount() {
  history = createWebHashHistory();
  router = createRouter({
    history,
    routes
  });

  app = createApp(App);
  app.use(router);
  // app.use(install);
  app.use(ArcoVue);
  app.use(ArcoVueIcon);
  app.mount("#app-child");

  console.log("微应用child-vite渲染了");
}

// 将卸载操作放入 unmount 函数
function unmount() {
  // app?.unmount();
  // history?.destroy();
  // window.microApp.clearDataListener();

  // app = null;
  // router = null;
  // history = null;
  // console.log(`微应用${window.__MICRO_APP_NAME__}卸载了,微应用的 unmount() fired`);
}

// 微前端环境下，注册mount和unmount方法
console.warn("检测微应用环境", window.__MICRO_APP_ENVIRONMENT__);
if (window.__MICRO_APP_ENVIRONMENT__) {
  // @ts-ignore
  // window["micro-app-appname-vite"] = { mount, unmount };
  // 2024年8月21日 by jeff
  window[`micro-app-${window.__MICRO_APP_NAME__}`] = {
    mount: () => {
      nextTick(() => {
        mount();
      });
    },
    unmount
  };
} else {
  console.warn("非微前端环境");
  // 非微前端环境直接渲染
  nextTick(() => {
    mount();
  });
}
