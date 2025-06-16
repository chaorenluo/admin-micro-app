<template>
  <a-config-provider>
    <Layout v-if="route_val.meta.layout">
      <a-layout class="main">
        <router-view v-slot="{ Component, route }">
          <transition name="zoom-fade" mode="out-in" appear>
            <component :is="Component" :key="route.path" />
          </transition>
        </router-view>
      </a-layout>
    </Layout>
    <router-view v-else />
  </a-config-provider>
</template>

<script setup>
import '@shared/scss/common/reset.scss';
import '@shared/scss/common/common.scss';
import '@shared/scss/common/animation.scss';

import Layout from "./layout/index.vue";

const route_val = useRoute();

</script>
<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
</style>
