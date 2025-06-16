<template>
  <a-layout-sider :width="210" class="main-sidebar flex flex-colunm ">
    <div class="flex align-center space-center com" style="height: 50px;">
      <img src="../assets/8591.png" alt="8591" style="width:128px;">
    </div>
    <a-scrollbar class="pdl5 pdr5 flex1">
      <a-menu
        auto-open
        show-collapse-button
        :level-indent="5"
      >
        <a-sub-menu>
          <template #icon><icon-apps /></template>
          <template #title> 我是主应用 </template>
          <a-menu-item @click="clickMenuItem('main', '/', '首页')">
            home
          </a-menu-item>
          <a-menu-item @click="clickMenuItem('main', '/welcome', 'welcome')">
            子应用激活列表
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu index="micro-abtest">
          <template #icon><icon-apps /></template>
          <template #title> 我是子应用 </template>
          <a-menu-item index="/micro-child/A" @click="clickMenuItem('micro-child', '/micro-child/A', 'A')">
            A页面
          </a-menu-item>
          <a-menu-item index="/micro-child/B" @click="clickMenuItem('micro-child', '/micro-child/B', 'B')">
            B页面
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-scrollbar>
  </a-layout-sider>
</template>

<script setup lang="ts">

const emit = defineEmits(["select"]);

const router = useRouter();
const route = useRoute();

const activeIndex = ref("/");

// 监听路由变化改变left-sidebar的当前菜单
watch(
  () => route.fullPath,
  (to, from) => {
    // console.log("warth", { from, to }, route);
    const newRoute = route;
    const { path, query } = newRoute;
    const hash = (Object.values(query)[0] as string)?.split("#")[1];
    // console.log("路由变化,改变left-sidebar当前菜单", { path, hash });

    setTimeout(() => {
      activeIndex.value = `${path}${!hash || hash === "/" ? "" : hash}`;
    }, 0);
  }
);

const clickMenuItem = (app_name, app_path, name) => {
  // console.log("clickMenuItem", type, v);
  // emit("select", type, v.path);
  const appName = app_name;
  let hash = null;
  let path = app_path;
  // 判断index是否为微应用路径
  if (isMicroPath(app_path)) {
    // console.log("将要访问子应用");
    // 解析出 path,hash
    const { path: _path, hash: _hash } = resolveMicroPath(app_path);
    path = _path;
    hash = _hash;
    // console.log("解析结果:", { path, hash });
  }
  // console.warn("left-sidebar 解析结果:", { appName, path, hash });
  // console.log('1---------', appName, path, hash);
  emit("select", appName, path, hash);
};

/**
 * 点击menu_item触发
 * @param index men_item.index
 * @param indexPath men_item的路径
 */
const select = (index: string, indexPath: string) => {
  // console.log("当前点击的path:", index, indexPath);
  // 因为 child-vite 和 child-react17 子应用是hash路由，所以需要传递hash值
  const appName = indexPath[0].replace(/\d/g, '');
  let hash = null;
  let path = index;
  // 判断index是否为微应用路径
  if (isMicroPath(index)) {
    // console.log("将要访问子应用");
    // 解析出 path,hash
    const { path: _path, hash: _hash } = resolveMicroPath(index);
    path = _path;
    hash = _hash;
    // console.log("解析结果:", { path, hash });
  }
  // console.warn("left-sidebar 解析结果:", { appName, path, hash });
  // console.log('1---------', appName, path, hash);
  emit("select", appName, path, hash);
};

/**
 * 判断是否微应用路径
 * @param {*} path menu_item传入的index
 */
const isMicroPath = (path: string) => {
  // 获得所有的微应用路由地址 : 包含 :page*
  const microKeys = router
    .getRoutes()
    .filter((item) => {
      return item.path.includes(":page*");
    })
    .map((item) => {
      const r = item.path.replace("/", "");
      return r.replace(":page*", "");
    });

  // 如果path中包含了microKeys中任何一个,return true;
  console.log(microKeys, path);
  return microKeys.some((item) => {
    console.log(path.includes(item));
    return path.includes(item);
  });
};
/**
 * 解析路径中的 path hash
 * @param {*} index : 带解析的路径 /app-vite/p1/p2?a=aa&b=bby#hhh
 */
const resolveMicroPath = (index: string) => {
  // 路由中可能带有query参数,可能有后续处理 to do
  const _r = router.resolve(index);
  const { path: _path, query: _query, hash: _hash } = _r;

  const pathArr = index.split("/");
  const path = "/" + pathArr[1];
  const hash = pathArr[2] ? `/${pathArr[2]}` : undefined;
  // const hash = "hash";
  // debugger;
  // console.warn({ path, hash });
  return { path, hash };
};
</script>
