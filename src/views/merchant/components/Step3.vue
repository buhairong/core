<template>
  <el-form ref="step3form" :model="params" :rules="rules" label-width="140px">
    <el-form-item label="开户名称">
      <div>{{ params.companyName }}</div>
    </el-form-item>

    <el-form-item label="银行账号" prop="bankAccount">
      <c-input
        v-model="params.bankAccount"
        placeholder="请输入开户行帐号"
        :input-style="inputStyle"
      />
    </el-form-item>

    <el-form-item label="开户银行" prop="bankName">
      <c-input v-model="params.bankName" placeholder="请输入开户银行" :input-style="inputStyle" />
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
  bankAccount: [{ required: true, message: '请输入开户行帐号', trigger: 'blur' }],
  bankName: [{ required: true, message: '请输入开户银行', trigger: 'blur' }]
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
