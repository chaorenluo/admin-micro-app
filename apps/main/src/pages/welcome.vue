<template>
  <div class="flex-center">
    <a-card :style="{ width: '560px' }" title="已激活的子应用">
      <div v-if="appList.length>0">
        <a-list>
          <a-list-item v-for="v in appList" :key="v">
            <span>{{ v }}子应用已激活</span>
          </a-list-item>
        </a-list>
      </div>
      <a-empty v-else />
    </a-card>
  </div>
</template>

<script setup lang="ts">

import microApp from "@micro-zoe/micro-app";

// 获得所有已激活app
const appList = microApp.getAllApps(); // [子应用name, 子应用name, ...]

const sendMsg = (v) => {
  console.log(v);
  microApp.setData(v, { type: '新的数据' });
};

</script>
<style lang="scss">
.flex-center{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

</style>
