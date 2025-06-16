<template>
  <div class="micro-child">
    <MicroApp app-name="@micro/child" :init-data="routes_data" @mounted="mounted" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import MicroApp from '../components/MicroApp/index.vue';

const routes_data = computed(() => {
  return { msg: '主应用下发数据' };
});
const mounted = () => {
  console.log('mounted');
};

</script>
