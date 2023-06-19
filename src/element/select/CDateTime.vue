<template>
  <el-date-picker
    type="datetime"
    :format="props.valueFormat"
    :value-format="props.valueFormat"
    :placeholder="props.placeholder"
  >
  </el-date-picker>
</template>

<script setup lang="ts">
interface IProps {
  placeholder?: string
  valueFormat?: string
  styleObj?: Object
}

const props = withDefaults(defineProps<IProps>(), {
  placeholder: '选择时间',
  valueFormat: 'YYYY-MM-DD HH:mm'
})
</script>

<style lang="scss">
.el-input__wrapper {
  width: 200px;
  background: #f2f3f5;
}
</style>
