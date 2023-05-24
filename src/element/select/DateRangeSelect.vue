<template>
  <el-date-picker
    type="daterange"
    :range-separator="props.rangeSeparator"
    :start-placeholder="props.startPlaceholder"
    :end-placeholder="props.endPlaceholder"
    :format="props.format"
    :value-format="props.valueFormat"
    :style="styleObj"
    v-bind="$attrs"
  >
  </el-date-picker>
</template>

<script setup lang="ts">
interface IProps {
  rangeSeparator?: string
  startPlaceholder?: string
  endPlaceholder?: string
  format?: string
  valueFormat?: string
  styleObj?: Object
}

const defaultStyleObj = {
  width: '255px',
  background: '#f2f3f5'
}

const props = withDefaults(defineProps<IProps>(), {
  rangeSeparator: '-',
  startPlaceholder: '开始日期',
  endPlaceholder: '结束日期',
  format: 'YYYY-MM-DD',
  valueFormat: 'YYYY-MM-DD',
  styleObj: () => ({})
})

const styleObj = {
  ...defaultStyleObj,
  ...props.styleObj
}
</script>

<style lang="scss" scoped></style>
