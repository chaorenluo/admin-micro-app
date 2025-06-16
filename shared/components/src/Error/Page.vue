<template>
  <div class="error-page">
    <section class="error__container">
      <div class="error__img">
        <component :is="IconMap[props.code]" class="error__icon" />
      </div>

      <div class="error__tip">
        <div class="error__tip--a dblue">抱歉!</div>
        <div class="error__tip--b fc1">当前页面不存在...</div>
        <div class="error__tip--c fc3">请检查您输入的网址是否正确，或点击下面的按钮返回首页</div>
        <a-button type="primary" @click="back">{{ countDownTime }} 返回首页</a-button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue';
import { ref, onMounted, onBeforeUnmount } from "vue";

import Icon403 from './Icon403.vue';
import Icon404 from './Icon404.vue';
import Icon500 from './Icon500.vue';

interface Props {
  code: number
}
defineOptions({ name: 'ErrorPage' });
const emit = defineEmits(['click-back']);

const props = withDefaults(defineProps<Props>(), {
  code: 403
});

const IconMap: Record<number, Component> = {
  403: Icon403,
  404: Icon404,
  500: Icon500
};

const countDownTime = ref(5);
let timer;

onMounted(() => {
  onCountDownTime();
});

onBeforeUnmount(() => {
  clearInterval(timer);
});

// 返回页面
const back = () => {
  // console.log(router, '----------1');
  // router.replace({ path: '/' });
  emit('click-back');
};

// 倒计时
function onCountDownTime() {
  timer = setInterval(() => {
    if (countDownTime.value) {
      countDownTime.value--;
    } else {
      // back()
      clearInterval(timer);
    }
  }, 1000);
}
</script>

<style lang="scss" scoped>
.error-page {
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: var(--color-bg-1);
}
.error {
  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__img {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    overflow: hidden;
  }
  &__icon {
    max-width: 90%;
    height: 50vh;
  }
  &__tip {
    display: flex;
    flex-direction: column;
    align-items: center;
    &--a {
      margin-bottom: 20px;
      font-size: 32px;
      font-weight: bold;
      line-height: 40px;
      opacity: 0;
      animation-name: slideUp;
      animation-duration: .5s;
      animation-fill-mode: forwards;
    }
    &--b {
      margin-bottom: 10px;
      font-size: 20px;
      font-weight: bold;
      line-height: 24px;
      opacity: 0;
      animation-name: slideUp;
      animation-duration: .5s;
      animation-delay: .1s;
      animation-fill-mode: forwards;
    }
    &--c {
      padding: 0 30px;
      margin-bottom: 20px;
      font-size: 13px;
      line-height: 20px;
      text-align: center;
      opacity: 0;
      animation-name: slideUp;
      animation-duration: .5s;
      animation-delay: .2s;
      animation-fill-mode: forwards;
    }
  }
}

@keyframes slideUp {
  0% {
    opacity: 0;
    transform: translateY(60px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
