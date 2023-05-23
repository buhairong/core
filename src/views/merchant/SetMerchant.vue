<template>
  <div class="wrap" v-loading="syncLoading" element-loading-text="保存中">
    <div>
      <div class="content-title">{{ COMPANY_TYPE[type] }}</div>
      <div class="container">
        <el-steps :active="activeStep" align-center style="width: 500px">
          <el-step v-for="(item, index) in stepList" :key="index" :title="item"> </el-step>
        </el-steps>

        <div style="margin-top: 40px" v-if="setParams">
          <Step1
            v-show="activeStep === 0"
            ref="step1Ref"
            :params="setParams"
            :type="type"
            @change="change"
          />

          <Step2 v-show="activeStep === 1" ref="step2Ref" :params="setParams" @change="change" />

          <Step3 v-show="activeStep === 2" ref="step3Ref" :params="setParams" @change="change" />
        </div>
      </div>
    </div>
    <div class="buttom-btn-group">
      <div class="btn" @click="back" v-if="activeStep === 0">取消</div>
      <div class="btn" @click="prev" v-else>上一步</div>

      <div class="btn save-btn" @click="save" v-if="activeStep === 2">确认</div>
      <div class="btn save-btn" @click="next" v-else>下一步</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useSet } from './use/use'
import { COMPANY_TYPE } from '@/utils/constant'
import Step1 from './components/Step1.vue'
import Step2 from './components/Step2.vue'
import Step3 from './components/Step3.vue'

const route = useRoute()

const type = (route.query as any).type - 0
let companyId: number | undefined

if (route.query.companyId) {
  companyId = (route.query as any).companyId - 0
}

const stepList = ['商户信息', '超级管理员信息', '收款信息']
const syncLoading = ref(false)
const step1Ref = ref<InstanceType<typeof Step1> | null>(null)
const step2Ref = ref<InstanceType<typeof Step2> | null>(null)
const step3Ref = ref<InstanceType<typeof Step3> | null>(null)

const { setParams, activeStep, back, change, prev, addCarDealer, addFinancialService } = useSet(
  type,
  companyId
)

const next = () => {
  if (activeStep.value === 0) {
    ;(step1Ref.value!.$refs as any).step1form.validate((valid: any) => {
      if (valid) {
        ++activeStep.value
      } else {
        ElMessage.error('请检查输入项')
      }
    })
  } else if (activeStep.value === 1) {
    ;(step2Ref.value!.$refs as any).step2form.validate((valid: any) => {
      if (valid) {
        ++activeStep.value
      } else {
        ElMessage.error('请检查输入项')
      }
    })
  }
}

const save = () => {
  ;(step3Ref.value!.$refs as any).step3form.validate((valid: any) => {
    if (valid) {
      if (type === 1) {
        addCarDealer()
      } else {
        addFinancialService()
      }
    } else {
      ElMessage.error('请检查输入项')
    }
  })
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
