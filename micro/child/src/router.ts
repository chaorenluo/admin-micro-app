import Home from './pages/home.vue';

// 匹配views里面所有的.vue文件
const modules = import.meta.glob('./pages/**/*.vue');

/** 加载模块 */
export const loadView = (view?: string) => {
  // console.log(modules, '-----------');
  const routes = [];
  for (const path in modules) {
    const dir = path.split('pages/')[1].split('.vue')[0];
    // console.log(path.split('pages/'), '---------path');
    // console.log(dir);
    if (dir.startsWith('-')) { // 过滤掉以-开头的路由
      continue;
    }

    // let dir_arr = dir.split('/');
    // dir_arr = dir_arr.filter((item) => item !== 'index'); // 过滤index
    // dir = dir_arr.join('/'); // 重新拼接成字符串
    const path_name = dir.replace('/', '-'); // 转为单层路由

    routes.push({
      path: `/${path_name}`,
      name: path_name,
      component: () => modules[path]()
    });
  }
  return routes;
};

const routes = loadView();

export default routes;
