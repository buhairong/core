<template>
  <el-input
    type="textarea"
    :placeholder="props.placeholder"
    :maxlength="props.maxLength"
    :show-word-limit="props.showWordLimit"
    :rows="props.rows"
    v-bind="$attrs"
  ></el-input>
</template>

<script setup lang="ts">
interface IProps {
  placeholder?: string
  maxLength?: number
  showWordLimit?: boolean
  rows?: number
}

const props = withDefaults(defineProps<IProps>(), {
  placeholder: '请输入',
  maxLength: 100,
  showWordLimit: false,
  rows: 5
})
</script>

<style lang="scss" scoped>
.el-textarea {
  width: 364px;
  :deep(.el-textarea__inner) {
    width: 100%;
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
    resize: none;
    &::placeholder {
      color: #a4aebb;
    }
  }
  :deep(.el-input__count) {
    background: #f2f3f5;
  }
}
</style>
