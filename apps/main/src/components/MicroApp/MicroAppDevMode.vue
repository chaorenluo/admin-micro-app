<template>
  <a-empty v-show="!props.appName || loading" description="加载中....." />
  <micro-app
    v-if="props.appName && !loading" :name="appNameWrap" inline clear-data :iframe="true" :data="microAppData"
    :url="MicroUtils.getAppUrl(props.appName)" @created="handleCreate"
    @beforemount="handleBeforeMount" @mounted="handleMount" @unmount="handleUnmount" @error="handleError"

    @datachange="handleDataChange"
  />
</template>
<script setup>
import { onBeforeUnmount, ref, nextTick, onMounted } from 'modules/vue';
import { EAppDevSocketType } from 'scripts/types';
import { MicroUtils } from 'modules/@shared/common';
import { Message } from 'modules/arco-design';
import microApp, { getAllApps } from "@micro-zoe/micro-app";

const props = defineProps({
  appName: String,
  initData: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['mounted']);

const appNameWrap = props.appName.replace('@', '').replace('/', '-');

const loading = ref(true);

const microAppData = ref(props.initData);

const handleCreate = () => {
  console.log(`${appNameWrap}创建了`);
};

const handleBeforeMount = () => {
  console.log(`${appNameWrap} 即将被渲染`);
};

const handleMount = () => {
  console.log(`${appNameWrap} 已经渲染完成-----------`, microAppData.value);
  emit('mounted');
};

const handleUnmount = () => {
  console.log(`${appNameWrap} 卸载了`);
};

const handleError = () => {
  console.log(`${appNameWrap} 加载出错了`);
};

const handleDataChange = (e) => {
  Message.success({
    content: `来自子应用 ${appNameWrap}  的数据:${JSON.stringify(e.detail.data)}`
  });
};

const startAppChange = (data) => {
  if (data.data != props.appName) return;
  // // app启动成功
  setTimeout(() => {
    loading.value = false;
  }, 10);
  if (getAllApps().includes(props.appName)) {
    return;
  }
  Message.success({
    content: `${props.appName}子应用启动成功`
  });
};

onMounted(() => {
  if (!props.appName) return null;
  if (getAllApps().includes(props.appName)) {
    loading.value = false;
    return null;
  }
  import.meta.hot.send({ type: EAppDevSocketType.StartApp, data: props.appName });
  import.meta.hot.on(EAppDevSocketType.AppStarted, startAppChange);
});

onBeforeUnmount(() => {
  loading.value = false;
  import.meta.hot.off(EAppDevSocketType.AppStarted, startAppChange);
});

</script>
