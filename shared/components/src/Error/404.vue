<template>
  <ErrorPage :code="404" />
</template>

<script setup lang="ts">
import ErrorPage from './Page.vue';

defineOptions({ name: 'Error404' });
</script>
