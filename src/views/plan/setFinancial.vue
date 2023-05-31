<template>
  <div class="wrap">
    <el-form ref="form" :model="params" :rules="rules" label-width="120px">
      <el-form-item label="适用业务">
        <div>常规订阅</div>
      </el-form-item>

      <el-form-item label="适用金融方" prop="companyId">
        <c-select
          v-model="params.companyId"
          :options="merchantList"
          placeholder="请选择金融方"
          filterable
          :showAllValue="false"
          labelKey="companyName"
          valueKey="id"
          :style="inputStyle"
        />
      </el-form-item>

      <el-form-item label="适配地区" prop="cityIdList">
        <c-select
          v-model="params.cityIdList"
          :options="cityList"
          multiple
          filterable
          :showAllValue="false"
          labelKey="city"
          valueKey="id"
          :style="inputStyle"
          @change="changeCity"
        />
      </el-form-item>

      <el-form-item label="商户类型" prop="merchantTypeList">
        <el-checkbox-group v-model="params.merchantTypeList">
          <el-checkbox v-for="item in COMPANY_ROLE_LIST" :key="item.value" :label="item.value">
            {{ item.label }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="车辆要求" class="car-item">
        <el-form-item label="品牌要求" prop="brandList">
          <c-select
            v-model="params.brandList"
            :options="brandList"
            multiple
            filterable
            :showAllValue="false"
            labelKey="brandName"
            valueKey="brandName"
            :style="inputStyle"
          />
        </el-form-item>
        <br />
        <el-form-item label="价格区间" prop="priceSection">
          <c-select
            v-model="params.priceSection"
            :options="PRICE_SECTION_LIST"
            multiple
            :showAllValue="false"
            :style="inputStyle"
          />
        </el-form-item>
        <br />
        <el-form-item label="动力类型" prop="powerTypeList">
          <el-checkbox-group v-model="params.powerTypeList">
            <el-checkbox v-for="item in POWER_TYPE_LIST" :key="item.value" :label="item.value">
              {{ item.label }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form-item>

      <el-form-item label="支持订阅周期"> 36期 </el-form-item>

      <el-form-item label="保证金比例" prop="depositRate">
        <c-input-number
          v-model="params.depositRate"
          placeholder="请输入保证金比例"
          :precision="2"
          :input-style="inputStyle"
        >
        </c-input-number
        >%
      </el-form-item>

      <el-form-item label="期末余值比例" prop="residualValueRate">
        <c-input-number
          v-model="params.residualValueRate"
          placeholder="请输入期末余值比例"
          :precision="2"
          :input-style="inputStyle"
        >
        </c-input-number
        >%
      </el-form-item>

      <el-form-item label="方案名称" prop="schemeName">
        <c-input
          v-model="params.schemeName"
          placeholder="请输入方案名称"
          :input-style="inputStyle"
        />
      </el-form-item>

      <el-form-item label="方案描述">
        <c-text-area
          v-model="params.schemeDesc"
          placeholder="请输入对此方案的描述~最多可输入100个字"
        />
      </el-form-item>
    </el-form>

    <div class="buttom-btn-group">
      <back-button />
      <div class="btn save-btn" @click="save">保存方案</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import type { IFinancialSetParams, IRecord, ICity, IBrand } from '@/types'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import {
  getCity,
  getCarBrand,
  createSubscribeFinancialScheme,
  updateSubscribeFinancialScheme,
  detailSubscribeFinancialScheme
} from '@/api/plan/financial'
import { getMerchantList } from '@/api/merchant/merchant'
import { COMPANY_ROLE_LIST, PRICE_SECTION_LIST, POWER_TYPE_LIST } from '@/utils/constant'

const router = useRouter()
const route = useRoute()

const inputStyle = {
  width: '300px'
}

const params = ref<IFinancialSetParams>({
  id: null,
  brandList: [],
  cityIdList: [],
  cityReqVoList: [],
  companyId: null,
  companyName: '',
  depositRate: null,
  residualValueRate: null,
  merchantTypeList: [],
  powerTypeList: [],
  priceSection: [],
  schemeName: '',
  schemeDesc: '',
  supportPeriodList: [36]
})

const type = (route.query as any).type - 0
if (type === 2) {
  params.value.id = (route.query as any).id - 0
  detailSubscribeFinancialScheme({ id: params.value.id }).then((res) => {
    params.value = {
      ...res,
      cityIdList: res.cityReqVoList.map((city: ICity) => {
        if (city.cityId) {
          return city.cityId
        }
        return 0
      })
    }
  })
}

const form = ref<FormInstance>()

const rules = ref<FormRules>({
  companyId: [{ required: true, message: '请选择金融方', trigger: 'change' }],
  cityIdList: [{ required: true, message: '请选择适配地区', trigger: 'change' }],
  merchantTypeList: [{ required: true, message: '请选择商户类型', trigger: 'change' }],
  brandList: [{ required: true, message: '请选择品牌', trigger: 'change' }],
  priceSection: [{ required: true, message: '请选择价格区间', trigger: 'change' }],
  powerTypeList: [{ required: true, message: '请选择动力类型', trigger: 'change' }],
  depositRate: [{ required: true, message: '请输入保证金比例', trigger: 'blur' }],
  residualValueRate: [{ required: true, message: '请输入期末余值比例', trigger: 'blur' }],
  schemeName: [{ required: true, message: '请输入方案名称', trigger: 'blur' }]
})

const merchantList = ref<IRecord[]>([])

const getMerchantListParams = {
  companyType: 2,
  shopName: '',
  chooseRole: null,
  cityId: null,
  contractStatus: null,
  type: null,
  page: 1,
  size: 1000
}
getMerchantList(getMerchantListParams).then((res) => {
  merchantList.value = res.records
})

const cityList = ref<ICity[]>([])
getCity().then((res) => {
  cityList.value = res.map((city) => {
    city.cityId = city.id
    return city
  })
})

const changeCity = (data: number[]) => {
  params.value.cityReqVoList = cityList.value.filter((city) => data.includes(city.id))
}

const brandList = ref<IBrand[]>([])
getCarBrand().then((res) => {
  brandList.value = res
})

const save = () => {
  if (form.value) {
    form.value.validate((valid) => {
      if (valid) {
        if (type === 1) {
          createSubscribeFinancialScheme(params.value).then(() => {
            ElMessage.success({
              message: `保存成功`,
              duration: 2000
            })
            router.push({
              path: '/product/finance'
            })
          })
        } else {
          updateSubscribeFinancialScheme(params.value).then(() => {
            ElMessage.success({
              message: `保存成功`,
              duration: 2000
            })
            router.push({
              path: '/product/finance'
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
:deep(.el-form-item__content) {
  flex: none;
}
.car-item :deep(.el-form-item__content) {
  flex: none;
  display: block;
}
</style>
