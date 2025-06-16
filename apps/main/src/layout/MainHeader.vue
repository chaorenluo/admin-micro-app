<template>
  <a-row align="center" class="height-inherit pdl10 pdr10 border-bottom" style="height:50px;">
    <a-col :span="24">
      <a-row justify="end">
        <a-row align="center" class="user">
          <!-- 管理员头像 -->
          <a-avatar :size="32">
            <img src="../assets/avatar.webp">
          </a-avatar>
          <span class="ml10 cursor">admin</span>
        </a-row>
      </a-row>
    </a-col>
  </a-row>
</template>
<style lang="scss" scoped>
.border-bottom{
  border-bottom:1px solid $borderColor;
}
</style>
