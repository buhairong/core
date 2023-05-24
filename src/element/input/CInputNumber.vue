<template>
  <el-input-number
    :placeholder="placeholder"
    :min="min"
    :precision="precision"
    :controls="controls"
    v-bind="$attrs"
  >
  </el-input-number>
</template>

<script setup lang="ts">
interface IProps {
  placeholder?: string
  min?: number
  precision?: number
  controls?: boolean
}

withDefaults(defineProps<IProps>(), {
  placeholder: '请输入',
  min: 0,
  precision: 0,
  controls: false
})
</script>

<style lang="scss" scoped>
.el-input-number {
  width: 190px;
  height: 32px;
}
:deep(.el-input) {
  width: 100%;
  height: 100%;
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
</style>
