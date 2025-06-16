<template>
  <a-result title="提示">
    <template #subtitle>
      <div>我是子应用A页面</div>
      <div>我是主应用下发数据：{{ JSON.stringify(init_data) }}</div>
    </template>
    <template #extra>
      <a-space>
        <a-button type="primary" @click="router.back()">返回</a-button>
        <a-button type="secondary" @click="sendMainMsg">子应用发送消息给主应用</a-button>
      </a-space>
    </template>
  </a-result>
</template>
<script setup>

const router = useRouter();
const init_data = window.microApp.getData();
const sendMainMsg = () => {
  window.microApp.forceDispatch({ msg: '子应用A页面发送的数据' });
};

</script>
