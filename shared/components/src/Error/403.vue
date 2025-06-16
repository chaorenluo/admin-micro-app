<template>
  <ErrorPage :code="403" />
</template>

<script setup lang="ts">
import ErrorPage from './Page.vue';

defineOptions({ name: 'Error403' });
</script>
