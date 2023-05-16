<template>
  <div class="wrap" v-loading="syncLoading" element-loading-text="保存中">
    <div>
      <div class="content-title">{{ COMPANY_TYPE[type] }}</div>
      <div class="container">
        <el-steps :active="useSetRes.activeStep" align-center style="width: 500px">
          <el-step v-for="(item, index) in stepList" :key="index" :title="item"> </el-step>
        </el-steps>

        <div style="margin-top: 40px">
          <Step1
            v-show="useSetRes.activeStep === 0"
            ref="step1Ref"
            :detail="useSetRes.setParams"
            :type="type"
            @change="useSetRes.change"
          />

          <Step2
            v-show="useSetRes.activeStep === 1"
            ref="step2Ref"
            :detail="useSetRes.setParams"
            @change="useSetRes.change"
          />

          <Step3
            v-show="useSetRes.activeStep === 2"
            ref="step3Ref"
            :detail="useSetRes.setParams"
            @change="useSetRes.change"
          />
        </div>
      </div>
    </div>
    <div class="buttom-btn-group">
      <div class="btn" @click="useSetRes.back" v-if="useSetRes.activeStep === 0">取消</div>
      <div class="btn" @click="useSetRes.prev" v-else>上一步</div>

      <div class="btn save-btn" @click="useSetRes.save" v-if="useSetRes.activeStep === 2">确认</div>
      <div class="btn save-btn" @click="useSetRes.next" v-else>下一步</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useSet } from './use'
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

// const { setParams, activeStep, back, change, prev, next, save } = useSet(type, companyId, step1Ref, step2Ref, step3Ref)
const useSetRes = ref<any>()
onMounted(() => {
  useSetRes.value = useSet(type, companyId, step1Ref, step2Ref, step3Ref)
})
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
