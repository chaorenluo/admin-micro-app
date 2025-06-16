<template>
  <draggable
    class="com-drag"
    v-bind="drag_options"
    tag="div"
    :list="props.list"
    :group="{ name: 'g1' }"
    item-key="name"
  >
    <template #item="{ element }">
      <div class="">
        <div class="com-drag-line flex space-between align-center mt5">
          <div>{{ element.name }}</div>
          <a-space>
            <a-button type="primary" size="mini" @click="clickEdit(element)">编辑</a-button>
            <a-button type="primary" size="mini" status="danger" @click="clickDel(element)">删除</a-button>
          </a-space>
        </div>
        <nested-draggable v-if="element.children" class="pdl20" :list="element.children" @click-edit="clickEdit($event)" @click-del="clickDel($event)" />
      </div>
    </template>
  </draggable>
</template>
<script lang="ts" setup>
import draggable from 'modules/vuedraggable';

const props = defineProps({
  list: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['click-edit', 'click-del']);

const drag_options = {
  animation: 200,
  group: "nested",
  disabled: false,
  ghostClass: "com-drag-ghost"
};

const clickEdit = (item: any) => {
  console.log("clickEdit", item);
  emit('click-edit', item);
};
const clickDel = (item: any) => {
  console.log("clickDel", item);
  emit('click-del', item);
};

</script>

<style lang="scss">
.com-drag {
  &-line{
    padding: 5px 10px;
    background-color: $lgray3;
    border: 1px solid $borderColor;
    border-radius: 4px;
  }
  &-ghost {
    background-color: var(--color-fill-2);
  }
}
</style>
