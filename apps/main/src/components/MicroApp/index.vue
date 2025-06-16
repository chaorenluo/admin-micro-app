<template>
  <MicroAppDevMode v-if="envUtils.isDev()" :app-name="props.appName" @mounted="microAppMounted" />
  <MicroAppProdMode v-else :app-name="props.appName" />
</template>
<script setup>
import { envUtils } from 'modules/@shared/common';
import MicroAppDevMode from './MicroAppDevMode.vue';
import MicroAppProdMode from './MicroAppProdMode.vue';

const props = defineProps({
  appName: String
});
const emit = defineEmits(['mounted']);

const microAppMounted = () => {
  emit('mounted');
};

</script>
