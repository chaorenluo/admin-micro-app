<template>
  <a-radio-group v-bind="$attrs" class="com-radio">
    <template v-for="item in items" :key="item.value">
      <a-radio :value="item.value" :disabled="item.disabled" v-bind="radioProps">
        <template #radio="{ checked, disabled }">
          <a-space
            align="start"
            class="com-radio-card"
            :class="{ 'com-radio-card-checked': checked, 'com-radio-card-disabled' : disabled }"
          >
            <!-- 自定义勾选图标 -->
            <template v-if="slots.icon">
              <slot v-if="checked" name="icon" />
            </template>
            <!-- 默认勾选样式 -->
            <template v-else-if="showDot">
              <div class="com-radio-card-mask">
                <div class="com-radio-card-mask-dot" />
              </div>
            </template>
            <div>
              <div class="com-radio-card-label">
                <slot name="label" :item="item">{{ item.label }}</slot>
              </div>
              <a-typography-text type="secondary" :disabled="item.disabled" class="block mt5">
                <slot name="description" :item="item">{{ item.description }}</slot>
              </a-typography-text>
            </div>
          </a-space>
        </template>
      </a-radio>
    </template>
    <slot />
  </a-radio-group>
</template>

<script setup>
const slots = useSlots();
const props = defineProps({
  items: {
    type: Array,
    default: () => [ // 默认数据： value label 为标题，description 为描述, disabled 是否禁用
      { value: 1, label: 'Radio Card 1', description: 'This is a text', disabled: false },
      { value: 2, label: 'Radio Card 2', description: 'This is a text' }
    ]
  },
  radioProps: { // a-radio 的属性
    type: Object,
    default: () => ({})
  },
  showDot: { // 是否显示小圆点，可通过slot dotIcon 自定义
    type: Boolean,
    default: true
  }
});

// 计算属性，确保 items 是一个数组
const items = computed(() => {
  return Array.isArray(props.items) ? props.items : [props.items];
});

</script>

<style lang="scss" scoped>
.com-radio {
  &.arco-radio-group-direction-vertical {
    .arco-radio {
      margin-bottom: 12px;
    }
  }
  &-card {
    box-sizing: border-box;
    width: 100%;
    min-width: 250px;
    padding: 10px 16px;
    background-color: #fff;
    border: 1px solid var(--color-border-2);
    border-radius: 4px;
    &-mask {
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 14px;
      height: 14px;
      border: 1px solid var(--color-border-2);
      border-radius: 100%;
      &-dot {
        width: 8px;
        height: 8px;
        border-radius: 100%;
      }
    }
    &-label {
      font-size: 14px;
      font-weight: bold;
      color: var(--color-text-1);
    }
  }
  &-card:hover,
  &-card-checked {
    border-color: rgb(var(--primary-6));
    .com-radio-card-mask {
      border-color: rgb(var(--primary-6));
    }
    .com-radio-card-label {
      color: rgb(var(--primary-6));
    }
  }
  &-card-checked {
    background-color: var(--color-primary-light-1);
    .com-radio-card-mask-dot {
      background-color: rgb(var(--primary-6));
    }
  }
  &-card-disabled {
    background-color: var(--color-neutral-2);
    .com-radio-card-mask {
      border-color: var(--color-neutral-3);
    }
    .com-radio-card-mask-dot {
      background-color: var(--color-fill-2);
    }
    .com-radio-card-label {
      font-weight: normal;
      color: var(--color-text-4);
    }
    &:hover {
      border-color: var(--color-border-2);
      .com-radio-card-mask {
        border-color: var(--color-neutral-3);
      }
      .com-radio-card-label {
        color: var(--color-text-4);
      }
    }
  }
}
</style>
