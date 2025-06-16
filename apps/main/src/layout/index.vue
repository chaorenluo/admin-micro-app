<template>
  <a-layout class="common-layout">
    <LeftSidebar @select="handleSelect" />
    <a-layout>
      <a-layout-header>
        <MainHeader />
      </a-layout-header>
      <slot />
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import microApp, { getActiveApps } from "@micro-zoe/micro-app";

import LeftSidebar from "./LeftSidebar.vue";
import MainHeader from "./MainHeader.vue";

const router = useRouter();
const sidebarData = {
  // 子应用sidebar通过pushState控制主应用跳转
  pushState: (appName: string, path: string, hash: string) => {
    if (appName != 'main' && appName) {
      if (hash) {
        path += `/#${hash}`;
      } else {
        path += "/";
      }
    }
    if (!getActiveApps().includes(appName)) {
      router.push(path);
    } else {
      microApp.router.push({ name: appName, path: `/v2${path}` });
    }
  }
};

const handleSelect = (appName: string, path: string, hash: string) => {
  console.log("emit fired", { appName, path, hash });
  sidebarData.pushState(appName, path, hash);
};
</script>

<style lang="scss">
.common-layout {
  height: 100%;
  & > .el-container {
    height: 100%;
  }
}
</style>
