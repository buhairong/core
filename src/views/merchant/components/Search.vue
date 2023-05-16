<template>
  <div>
    <div class="content-title">筛选</div>
    <div class="search-wrap">
      <div class="search-line">
        <div class="search-item">
          <div class="label">商户名称</div>
          <c-input v-model="search.shopName" placeholder="请输入商户名称" />
        </div>

        <div class="search-item">
          <div class="label">行业分类</div>
          <c-select
            v-model="search.chooseRole"
            :options="COMPANY_ROLE_LIST"
            placeholder="请选择行业分类"
          />
        </div>

        <div class="search-item">
          <div class="label">所在城市</div>
          <c-select
            v-model="search.cityId"
            :options="cityList"
            filterable
            labelKey="city"
            valueKey="id"
            placeholder="请选择所在城市"
          />
        </div>

        <div class="search-item">
          <div class="label">商户状态</div>
          <c-select
            v-model="search.contractStatus"
            :options="MERCHANT_STATUS_LIST"
            placeholder="请选择行业分类"
          />
        </div>

        <search-button @click="searchList" />
        <reset-button class="reset-btn" @click="reset" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ISearch, ICity } from '@/types'
import { ref } from 'vue'
import { getAllCity } from '@/api/merchant/merchant'
import { COMPANY_ROLE_LIST, MERCHANT_STATUS_LIST } from '@/utils/constant'
import { defaultSearchValue } from '../constant'

const emits = defineEmits(['search'])

const search = ref<ISearch>(defaultSearchValue)
const cityList = ref<ICity[]>([])

const getCity = () => {
  getAllCity().then((data: ICity[]) => {
    cityList.value = data
  })
}

const searchList = () => {
  emits('search', search.value)
}

const reset = () => {
  search.value.shopName = ''
  search.value.chooseRole = null
  search.value.cityId = null
  search.value.contractStatus = null
  search.value.type = null
  searchList()
}

searchList()
getCity()
</script>

<style lang="scss" scoped>
.reset-btn {
  margin-left: 20px;
}
</style>
