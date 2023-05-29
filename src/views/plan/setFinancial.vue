<template>
  <div class="wrap">
    <el-form ref="form" :model="params" :rules="rules" label-width="150px">
      <el-form-item label="模版名称" prop="templateName">
        <c-input
          v-model="params.templateName"
          placeholder="请设置模版名称"
          :input-style="inputStyle"
        />
      </el-form-item>

      <el-form-item label="模板别名">
        <c-input v-model="params.alias" placeholder="请输入模板别名" :input-style="inputStyle" />
      </el-form-item>

      <el-form-item label="选择车型" prop="newType">
        <el-radio v-model="params.newType" :label="1">全新车</el-radio>
        <el-radio v-model="params.newType" :label="2">二手车</el-radio>
      </el-form-item>

      <el-form-item label="适用金融方案" prop="financialSchemeId">
        <c-select
          v-model="params.financialSchemeId"
          :options="financialSchemeList"
          :showAllValue="false"
          filterable
          labelKey="schemeName"
          valueKey="id"
          placeholder="请选择金融方案"
          :style="inputStyle"
        />
      </el-form-item>

      <el-form-item label="订阅周期"> 36期 </el-form-item>

      <el-form-item label="付款方式"> 一次性付 </el-form-item>

      <el-form-item label="期末选择" prop="finalSelectArray">
        <el-checkbox-group v-model="params.finalSelectArray">
          <el-checkbox label="-1">续订车辆</el-checkbox>
          <el-checkbox label="0">买断车辆</el-checkbox>
          <el-checkbox label="1">无损退车</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="平台抽佣" prop="platformCommissionRate">
        <c-input-number
          v-model="params.platformCommissionRate"
          placeholder="请设置平台抽佣"
          :input-style="inputStyle"
        />%
      </el-form-item>
    </el-form>

    <div class="buttom-btn-group">
      <back-button />
      <div class="btn save-btn" @click="save">保存模板</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import type { ITemplateRecord, financialSchemeRecordForSetTemplate } from '@/types'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import {
  selectFinancialScheme,
  carSubscribeTemplateAdd,
  carSubscribeTemplateUpdate
} from '@/api/plan/template'

const router = useRouter()
const route = useRoute()

const inputStyle = {
  width: '300px'
}

const params = ref<ITemplateRecord>({
  templateName: '',
  alias: '',
  applyService: 3,
  subscriptionPeriodArray: [36],
  payModeArray: [1],
  finalSelectArray: [],
  financialSchemeId: undefined,
  id: undefined,
  newType: undefined,
  platformCommissionRate: undefined
})

const type = (route.query as any).type
params.value.templateId = (route.query as any).id - 0
params.value.templateName = (route.query as any).templateName
params.value.alias = (route.query as any).alias
params.value.financialSchemeId = (route.query as any).financialSchemeId - 0
params.value.newType = (route.query as any).newType - 0
params.value.finalSelectArray = (route.query as any).finalSelectArray
params.value.platformCommissionRate = (route.query as any).platformCommissionRate - 0

const form = ref<FormInstance>()

const rules = ref<FormRules>({
  templateName: [{ required: true, message: '请设置模版名称', trigger: 'blur' }],
  newType: [{ required: true, message: '请选择车型', trigger: 'change' }],
  financialSchemeId: [{ required: true, message: '请选择金融方案', trigger: 'change' }],
  finalSelectArray: [{ required: true, message: '请选择期末方式', trigger: 'change' }],
  platformCommissionRate: [{ required: true, message: '请设置平台抽佣', trigger: 'blur' }]
})

const financialSchemeList = ref<financialSchemeRecordForSetTemplate[]>([])

selectFinancialScheme({ applyService: 3 }).then((res) => {
  financialSchemeList.value = res
})

const save = () => {
  if (form.value) {
    form.value.validate((valid) => {
      if (valid) {
        if (type == 1) {
          carSubscribeTemplateAdd(params.value).then(() => {
            ElMessage.success({
              message: `保存成功`,
              duration: 2000
            })
            router.push({
              path: '/product/productTemplate'
            })
          })
        } else {
          carSubscribeTemplateUpdate(params.value).then(() => {
            ElMessage.success({
              message: `保存成功`,
              duration: 2000
            })
            router.push({
              path: '/product/productTemplate'
            })
          })
        }
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>
