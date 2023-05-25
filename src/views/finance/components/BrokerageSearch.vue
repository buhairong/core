<template>
  <div>
    <div class="content-title">筛选</div>

    <div class="search-wrap">
      <div class="search-line">
        <div class="search-item">
          <div class="label">申请日期</div>
          <date-range-select v-model="createTimeRange" @select="handlerSelectCreateDate" />
        </div>

        <div class="search-item">
          <div class="label">完成日期</div>
          <date-range-select v-model="updateTimeRange" @select="handlerSelectUpdateDate" />
        </div>

        <div class="search-item">
          <div class="label">状态</div>
          <c-select
            v-model="search.status"
            :options="BROKERAGE_RISK_STATUS"
            placeholder="请选择状态"
          />
        </div>

        <search-button class="search-btn" @search="searchList" />
        <reset-button class="reset-btn" @reset="reset" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IBrokerageSearch } from '@/types'
import { ref } from 'vue'
import { defaultBrokerageSearchValue } from '../constant'

interface IProps {
  type: number
}

defineProps<IProps>()
const emits = defineEmits(['search'])

// 提现状态 1批准，0不批准，2待放款
const BROKERAGE_RISK_STATUS = [
  { value: 0, label: '不批准' },
  { value: 1, label: '批准' },
  { value: 2, label: '待放款' }
]
const search = ref<IBrokerageSearch>(defaultBrokerageSearchValue)

const createTimeRange = ref<string[]>([])
const updateTimeRange = ref<string[]>([])

const searchList = () => {
  emits('search', search.value)
}

const reset = () => {
  search.value = defaultBrokerageSearchValue
  createTimeRange.value = []
  updateTimeRange.value = []
  searchList()
}

const handlerSelectCreateDate = (data: string[] | null) => {
  if (data) {
    search.value.minCreateTime = data[0]
    search.value.maxCreateTime = data[1]
    createTimeRange.value = data
  } else {
    search.value.minCreateTime = ''
    search.value.maxCreateTime = ''
    createTimeRange.value = []
  }
}

const handlerSelectUpdateDate = (data: string[] | null) => {
  if (data) {
    search.value.minUpdateTime = data[0]
    search.value.maxUpdateTime = data[1]
    updateTimeRange.value = data
  } else {
    search.value.minUpdateTime = ''
    search.value.maxUpdateTime = ''
    updateTimeRange.value = []
  }
}

searchList()
</script>

<style lang="scss" scoped></style>
