<template>
  <div class="btn">
    <i class="el-icon-plus"></i>
    {{ props.text }}
  </div>
</template>

<script setup lang="ts">
interface IProps {
  text: string
}

const props = defineProps<IProps>()
</script>

<style lang="scss" scoped>
.btn {
  width: 112px;
  height: 32px;
  border-radius: 2px;
  display: flex;
  justify-content: center;
  background: #f0592e;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
  .el-icon-plus {
    margin-right: 8px;
  }
}
</style>
