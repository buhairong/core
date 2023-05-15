<template>
  <el-select placeholder="请选择">
    <el-option v-if="props.showAllValue" :label="props.allValueLabel" :value="props.allValue">
    </el-option>
    <el-option
      v-for="item in props.options"
      :key="item[props.valueKey]"
      :label="item[props.labelKey]"
      :value="item[props.valueKey]"
    >
    </el-option>
  </el-select>
</template>

<script setup lang="ts">
interface IProps {
  options: any[]
  labelKey?: string
  valueKey?: string
  showAllValue?: boolean
  allValue?: string | number
  allValueLabel?: string
}

const props = withDefaults(defineProps<IProps>(), {
  labelKey: 'label',
  valueKey: 'value',
  showAllValue: true,
  allValueLabel: '全部',
  allValue: ''
})
</script>

<style lang="scss" scoped>
.el-select {
  width: 145px;
  background: #f2f3f5;
  :deep(.el-input__wrapper) {
    background: #f2f3f5;
    .el-input__inner {
      width: 100%;
      height: 32px;
      border-radius: 2px;
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
    .el-input__suffix {
      display: flex;
      align-items: center;
    }
  }
}
</style>
