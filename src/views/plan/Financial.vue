<template>
  <div>
    <div class="content-title">筛选</div>

    <div class="search-wrap">
      <div class="search-line">
        <div class="search-item">
          <div class="label">商户类型</div>
          <c-select v-model="search.merchantType" :options="COMPANY_ROLE_LIST" />
        </div>

        <div class="search-item">
          <div class="label">品牌要求</div>
          <c-select
            v-model="search.brand"
            :options="brandArray"
            labelKey="brandName"
            valueKey="brandName"
          />
        </div>

        <div class="search-item">
          <div class="label">动力类型</div>
          <c-select v-model="search.powerType" :options="POWER_TYPE_LIST" />
        </div>

        <search-button class="search-btn" @click="searchList" />
      </div>

      <div class="search-line search-line2">
        <div class="search-item">
          <div class="label">创建日期</div>
          <date-range-select
            v-model="dateRange"
            :style="{ width: '386px' }"
            @select="handlerSelectDate"
          />
        </div>

        <div class="search-item">
          <div class="label">价格区间</div>
          <c-select v-model="search.priceSection" :options="PRICE_SECTION_LIST" />
        </div>

        <reset-button class="search-btn" @click="reset" />
      </div>
    </div>

    <div class="create-btn-wrap">
      <create-button text="创建方案" @click="setFinancial(1)" />
    </div>

    <el-table
      :data="list"
      style="width: 100%"
      :header-cell-style="{ background: '#F2F3F5', color: '#1D2129', textAlign: 'left' }"
    >
      <el-table-column label="方案名称">
        <template #default="scope">
          <div>
            {{ scope.row.schemeName || '-' }}
          </div>
        </template>
      </el-table-column>

      <el-table-column label="商户类型">
        <template #default="scope">
          <div>{{ scope.row.merchantTypeList || '-' }}</div>
        </template>
      </el-table-column>

      <el-table-column label="品牌">
        <template #default="scope">
          <div>{{ scope.row.brandList || '-' }}</div>
        </template>
      </el-table-column>

      <el-table-column label="价格">
        <template #default="scope">
          <div>{{ scope.row.priceSection.join('、') }}</div>
        </template>
      </el-table-column>

      <el-table-column label="动力类型">
        <template #default="scope">
          <div>{{ scope.row.powerTypeList || '-' }}</div>
        </template>
      </el-table-column>

      <el-table-column label="支持订阅周期">
        <template #default="scope">
          <div>{{ scope.row.supportPeriodList || '-' }}</div>
        </template>
      </el-table-column>

      <el-table-column label="适配地区">
        <template #default="scope">
          <div>{{ scope.row.cityList || '-' }}</div>
        </template>
      </el-table-column>

      <el-table-column label="商户应用数">
        <template #default="scope">
          <div>{{ scope.row.merchantUseNum || '-' }}</div>
        </template>
      </el-table-column>

      <el-table-column label="创建时间">
        <template #default="scope">
          <div>{{ scope.row.createTime || '-' }}</div>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="110" align="center">
        <template #default="scope">
          <div class="table-btn" @click="setFinancial(2, scope.row.id)">修改方案</div>
          <div class="table-btn" @click="del(scope.row)">删除方案</div>
        </template>
      </el-table-column>
    </el-table>

    <pagination :total="total" @current-change="handleCurrentChange" />
  </div>
</template>

<script setup lang="ts">
import type { IFinancialSearch, IFinancialRecord, IBrand } from '@/types'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import {
  getCarBrand,
  selectSubscribeFinancialScheme,
  deleteSubscribeFinancialScheme
} from '@/api/plan/financial'
import { COMPANY_ROLE_LIST, POWER_TYPE_LIST, PRICE_SECTION_LIST } from '@/utils/constant'

const router = useRouter()

const search = ref<IFinancialSearch>({
  merchantType: null,
  brand: null,
  powerType: null,
  minTime: '',
  maxTime: '',
  priceSection: null,
  limit: 10,
  page: 1
})
const dateRange = ref<string[]>([])
const list = ref<IFinancialRecord[]>([])
const total = ref<number>(0)
const brandArray = ref<IBrand[]>([])

const handlerSelectDate = (data: string[] | null) => {
  if (data) {
    search.value.minTime = data[0]
    search.value.maxTime = data[1]
    dateRange.value = data
  } else {
    search.value.minTime = ''
    search.value.maxTime = ''
    dateRange.value = []
  }
}

const searchList = () => {
  selectSubscribeFinancialScheme(search.value).then((res) => {
    list.value = res.records
    total.value = res.total
  })
}

const reset = () => {
  search.value.merchantType = null
  search.value.brand = null
  search.value.powerType = null
  search.value.minTime = ''
  search.value.maxTime = ''
  search.value.priceSection = null
  search.value.page = 1
  searchList()
}

const handleCurrentChange = (e: number) => {
  search.value.page = e
  searchList()
}

const setFinancial = (type: number, id: number | null = null) => {
  router.push({
    path: '/product/setFinancial',
    query: {
      id,
      type
    }
  })
}

const del = (row: IFinancialRecord) => {
  ElMessageBox.confirm(`确定删除名称为 ${row.schemeName} 的金融方案吗？`, '提示', {
    confirmButtonText: '确认删除',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    const data = { ids: [row.id as number] }
    deleteSubscribeFinancialScheme(data).then(() => {
      ElMessage.success({
        message: `删除成功`,
        duration: 2000
      })
      searchList()
    })
  })
}

searchList()

getCarBrand().then((res) => {
  brandArray.value = res
})
</script>

<style lang="scss" scoped>
.create-btn-wrap {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
