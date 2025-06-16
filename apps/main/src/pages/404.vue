<template>
  <Error404 @click-back="clickBack" />
</template>

<script setup lang="ts">
import { Error404 } from "modules/@shared/components";

const router = useRouter();

const clickBack = () => {
  console.log('clickBack');
  router.push({ path: '/' });
};
</script>
