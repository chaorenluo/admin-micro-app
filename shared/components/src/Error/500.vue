<template>
  <ErrorPage :code="500" />
</template>

<script setup lang="ts">
import ErrorPage from './Page.vue';

defineOptions({ name: 'Error500' });
</script>
