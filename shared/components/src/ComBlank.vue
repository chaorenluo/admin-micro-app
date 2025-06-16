<template>
  <div class="com-blank pd16">
    <section class="com-blank-box pd24">
      <a-result :status="status" :title="props.title" :subtitle="subtitle">
        <template v-for="(_, name) in slots" #[name]>
          <slot :name="name" />
        </template>
      </a-result>
      <template v-if="slots.info">
        <div class="com-blank-info pd24 fs-12"><slot name="info" /></div>
      </template>
    </section>
  </div>
</template>

<script setup lang="ts">
const slots = useSlots();
const props = defineProps({
  title: {
    type: String,
    default: '操作成功'
  },
  status: { // 'info' | 'success' | 'warning' | 'error' | '403' | '404' | '500' | null
    type: String || null,
    default: 'success'
  },
  subtitle: {
    type: String,
    default: ''
  }
});
</script>

<style lang="scss" scoped>
.com-blank {
  box-sizing: border-box;
  overflow-y: auto;
  .arco-result {
    padding: 24px;
  }
  &-box {
    box-sizing: border-box;
    background-color: #fff;
  }
  &-info {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    background: $lgray2;
    box-sizing: border-box;
  }
}
</style>
