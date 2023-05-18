<template>
  <el-form ref="step2form" :model="params" :rules="rules" label-width="150px">
    <el-form-item label="超级管理员名称" prop="managerName">
      <c-input
        v-model="params.managerName"
        placeholder="请输入超级管理员名称"
        :input-style="inputStyle"
      />
    </el-form-item>

    <el-form-item label="超级管理员联系方式" prop="managerMobile">
      <c-input
        v-model="params.managerMobile"
        placeholder="请输入超级管理员联系方式"
        :input-style="inputStyle"
      />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import type { ISetMerchant } from '@/types'
import { ref, watch } from 'vue'

interface IProps {
  params: ISetMerchant
}

const props = defineProps<IProps>()
const emits = defineEmits(['change'])

const inputStyle = { width: '300px' }
const params = ref<ISetMerchant>(props.params)
const rules = {
  managerName: [{ required: true, message: '请输入超级管理员名称', trigger: 'blur' }],
  managerMobile: [
    { required: true, message: '请输入超级管理员联系方式', trigger: 'blur' },
    { pattern: /^1[3|4|5|7|8|9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ]
}

watch(
  () => params.value,
  (val: ISetMerchant) => {
    emits('change', val)
  },
  {
    immediate: true,
    deep: true
  }
)
</script>

<style lang="scss" scoped></style>
