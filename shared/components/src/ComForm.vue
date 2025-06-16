<template>
  <a-form
    ref="formRef"
    v-bind="formProps"
    :model="formModel"
  >
    <a-grid class="w-full" :col-gap="props.gridColGap" v-bind="props.gridProps" :collapsed="collapsed">
      <!-- 表单项区域 -->
      <a-grid-item
        v-for="(item, index) in formItems"
        :key="index"
        v-bind="item.gridItemProps || props.gridItemProps"
        :span="item.span || item.gridItemProps?.span || props.gridItemProps?.span"
      >
        <component :is="item.component" />
      </a-grid-item>
      <!-- 按钮区域 -->
      <a-grid-item
        v-if="props.search"
        v-bind="props.gridItemProps"
        :span="props.gridItemProps?.span"
        :suffix="props.search && props.suffix"
      >
        <a-space wrap>
          <slot name="suffix">
            <a-button type="primary" @click="handleSearch">
              <template #icon><icon-search /></template>
              <template #default>{{ props.searchBtnText }}</template>
            </a-button>
            <a-button @click="handleReset">重置</a-button>
          </slot>
          <a-button
            v-if="props.showFoldBtn"
            class="com-form__fold-btn"
            type="text"
            size="mini"
            @click="collapsed = !collapsed"
          >
            <template #icon>
              <icon-up v-if="!collapsed" />
              <icon-down v-else />
            </template>
            <template #default>{{ collapsed ? '展开' : '收起' }}</template>
          </a-button>
        </a-space>
      </a-grid-item>
    </a-grid>
  </a-form>
</template>
<script lang="ts" setup>
// import { ref, computed, onMounted, useSlots } from 'vue';

interface FormItem {
  component: any;
  span?: number;
  gridItemProps?: any;
}

// Props
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}) // form绑定值
  },
  formProps: {
    type: Object,
    default: () => ({}) // form属性
  },
  gridColGap: {
    type: Number,
    default: 8 // grid栅格间隔
  },
  gridProps: {
    type: Object,
    default: () => ({}) // grid属性
  },
  gridItemProps: { // grid-item属性
    type: Object,
    default: () => ({ span: { xs: 24, sm: 12, md: 8, lg: 8, xl: 6, xxl: 6 } }) // grid-item属性
  },
  defaultCollapsed: {
    type: Boolean,
    default: false // 默认是否收起
  },
  search: {
    type: Boolean,
    default: true // 是否显示查询按钮
  },
  suffix: {
    type: Boolean,
    default: true // 是否是后缀元素
  },
  showFoldBtn: {
    type: Boolean,
    default: true // 是否显示展开/收起按钮
  },
  searchBtnText: {
    type: String,
    default: '搜索' // 查询按钮文本
  }
});

// Emits
const emit = defineEmits(['update:modelValue', 'validate', 'search', 'reset']);

// 获取插槽
const slots = useSlots();

// 状态
const collapsed = ref(props.defaultCollapsed);
const formItems = ref<FormItem[]>([]); // 存储默认 slot 节点

// 表单引用
const formRef = ref(null);

// 表单模型
const formModel = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});
const formProps = computed(() => {
  return {
    layout: 'inline',
    autoLabelWidth: true,
    scrollToFirstError: true,
    ...props.formProps
  };
});

// 获取所有 FormItem 节点
const extractFormItems = (nodes: any[]): FormItem[] => {
  const items: FormItem[] = [];
  const nodeArray = Array.isArray(nodes) ? nodes : [nodes];
  nodeArray.forEach((node) => {
    if (typeof node == 'object' && node.type && node.type?.name == 'FormItem') {
      items.push({
        component: node,
        span: node.props?.span,
        gridItemProps: node.props?.gridItemProps
      });
    } else if (node.children) {
      items.push(...extractFormItems(node.children));
    }
  });
  return items;
};

// 初始化时提取默认 FormItem 节点
onMounted(() => {
  if (slots.default) {
    formItems.value = extractFormItems(slots.default());
  }
});

// 默认按钮事件
const handleSearch = () => {
  emit('search', formModel.value); // 抛出 search 事件
};

const handleReset = () => {
  emit('reset'); // 抛出 reset 事件
};

// 抛出表单引用
defineExpose({
  formRef
});
</script>
<style lang="scss" scoped>
.w-full {
  width: 100%;
}
.com-form__fold-btn {
  padding: 0 5px;
}
</style>
