<template>
  <div class="xxx">
    <micro-app
      :name="appNameWrap" :iframe="true" inline clear-data :data="microAppData"
      :url="MicroUtils.getAppUrl(props.appName)" @created="handleCreate" @beforemount="handleBeforeMount"
      @mounted="handleMount" @unmount="handleUnmount" @error="handleError"
      @datachange="handleDataChange"
    />
  </div>
</template>
<script setup>
import { ref, onMounted } from 'modules/vue';
import { MicroUtils } from 'modules/@shared/common';
import { Message } from 'modules/arco-design';
import microApp from "@micro-zoe/micro-app";

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

// const microAppData = ref({ msg: "来自基座的数据" });
const microAppData = ref(props.initData);

const onError = (err) => {
  Message.error({
    content: `${props.appName}子应用加载失败`
  });
  console.log(err);
};

const handleCreate = () => {
  console.log(`${appNameWrap}创建了`);
};

const handleBeforeMount = () => {
  console.log(`${appNameWrap} 即将被渲染`);
};

const handleMount = () => {
  emit('mounted');
};

const handleUnmount = () => {
  // console.log(`${appNameWrap} 卸载了`);
};

const handleError = () => {
  console.log(`${appNameWrap} 加载出错了`);
};

const handleDataChange = (e) => {
  console.log(`来自子应用 ${appNameWrap}  的数据:`, e.detail.data);
};

</script>
