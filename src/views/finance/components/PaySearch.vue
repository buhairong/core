<template>
  <div>
    <div class="content-title">筛选</div>

    <div class="search-wrap">
      <div class="search-line">
        <div class="search-item">
          <div class="label">订单编号</div>
          <c-input
            v-model="search.orderNum"
            placeholder="请输入订单编号"
            :input-style="inputStyle"
          />
        </div>

        <div class="search-item">
          <div class="label">客户信息</div>
          <c-input
            v-model="search.userInfo"
            placeholder="请输入客户姓名或手机号"
            :input-style="inputStyle"
          />
        </div>

        <div class="search-item">
          <div class="label">审核人员</div>
          <c-select
            v-model="search.updateBy"
            :options="selector.auditList"
            placeholder="请选择审核人员"
            labelKey="auditManName"
            valueKey="auditManId"
          />
        </div>

        <search-button class="search-btn" @click="searchList" />
      </div>

      <div class="search-line search-line2">
        <div class="search-item">
          <div class="label">订单状态</div>
          <c-select
            v-model="search.confirmed"
            :options="confirmList"
            placeholder="请选择订单状态"
          />
        </div>

        <div class="search-item">
          <div class="label">车辆信息</div>
          <c-select
            v-model="search.carBrandId"
            :options="selector.brandList"
            placeholder="请选择车辆信息"
            labelKey="carBrand"
            valueKey="brandId"
          />
        </div>

        <div class="search-item">
          <div class="label">审核日期</div>
          <date-range-select v-model="dateRange" @change="handlerSelectDate" />
        </div>

        <reset-button class="search-btn" @click="reset" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IFinanceSearch, IFinancialSelectorRecord } from '@/types'
import { ref } from 'vue'
import { financialSelector } from '@/api/finance/finance'
import { defaultFinanceSearchValue } from '../constant'

interface IProps {
  type: number
}

const props = defineProps<IProps>()
const emits = defineEmits(['search'])

const inputStyle = { width: '200px' }
const confirmList = [
  { label: '待确认', value: 0 },
  { label: '已完成', value: 1 }
]
const search = ref<IFinanceSearch>({
  ...defaultFinanceSearchValue
})
const dateRange = ref<string[]>([])
const selector = ref<IFinancialSelectorRecord>({
  auditList: [],
  brandList: []
})

const getSelector = () => {
  financialSelector({ type: props.type }).then((data: IFinancialSelectorRecord) => {
    selector.value = data
  })
}

const searchList = () => {
  emits('search', search.value)
}

const reset = () => {
  search.value = defaultFinanceSearchValue
  dateRange.value = []
  searchList()
}

const handlerSelectDate = (data: string[] | null) => {
  if (data) {
    search.value.minUpdateTime = data[0]
    search.value.maxUpdateTime = data[1]
    dateRange.value = data
  } else {
    search.value.minUpdateTime = ''
    search.value.maxUpdateTime = ''
    dateRange.value = []
  }
}

searchList()
getSelector()
</script>

<style lang="scss" scoped></style>
