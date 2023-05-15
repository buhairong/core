<template>
  <el-input :maxlength="140" v-bind="$attrs" />
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.el-input {
  width: 134px;
  height: 32px;
  :deep(.el-input__wrapper) {
    padding: 0;
    .el-input__inner {
      width: 100%;
      height: 100%;
      border-radius: 2px;
      background: #f2f3f5;
      padding: 0 8px;
      font-family: PingFangSC-Regular;
      box-sizing: border-box;
      border: none;
      font-size: 14px;
      color: #4e5969;
      display: flex;
      align-items: center;
      &::placeholder {
        color: #a4aebb;
      }
    }
  }
}
</style>
