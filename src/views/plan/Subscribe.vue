<template>
  <div>
    <div class="content-title">筛选</div>

    <div class="search-wrap">
      <div class="search-line">
        <div class="search-item">
          <div class="label">方案名称</div>
          <c-input v-model="params.schemeName" placeholder="请输入方案名称" />
        </div>

        <div class="search-item">
          <div class="label">车型名称</div>
          <c-input v-model="params.carTypeYearProduct" placeholder="请输入车型名称" />
        </div>

        <search-button class="search-btn" @search="searchList" />

        <reset-button class="search-btn reset-btn" @reset="reset" />
      </div>
    </div>

    <div class="create-btn-wrap">
      <div class="tabs">
        <div
          v-for="tab in CAR_NEW_STATUS"
          :key="tab.value"
          class="tab"
          :class="{ 'active-tab': params.carType === tab.value }"
          @click="changeTab(tab.value)"
        >
          {{ tab.label }}
        </div>
      </div>

      <create-button text="创建方案" @click="set(1)" />
    </div>

    <el-table
      :data="list"
      style="width: 100%"
      :header-cell-style="{ background: '#F2F3F5', color: '#1D2129' }"
    >
      <el-table-column label="方案名称">
        <template #default="scope">
          <div>
            {{ scope.row.productSchemeName || '-' }}
            <el-icon :size="16" style="vertical-align: middle" @click="setSubScribeName(scope.row)">
              <Edit />
            </el-icon>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="方案车型">
        <template #default="scope">
          <div>{{ scope.row.carType.carBrand }}·{{ scope.row.carType.carType }}</div>
          <div>{{ scope.row.carType.carTypeYear }}</div>
          <div>{{ scope.row.carType.carTypeYearProduct }}</div>
        </template>
      </el-table-column>

      <el-table-column label="订阅周期">
        <template #default="scope">
          <div>{{ scope.row.monthTotal }}期</div>
        </template>
      </el-table-column>

      <el-table-column label="车辆押金">
        <template #default="scope">
          <div>{{ formatThousandNumber(scope.row.deposit) }}元</div>
        </template>
      </el-table-column>

      <el-table-column label="订阅费用">
        <template #default="scope">
          <div>{{ formatThousandNumber(scope.row.totalPayment) }}/一次性付</div>
        </template>
      </el-table-column>

      <el-table-column>
        <template #header>
          <div style="display: flex">
            分销佣金
            <el-popover
              :width="200"
              trigger="hover"
              content="分销佣金是平台合伙人或其他商户帮您引荐客户，最终成交后您所给予的奖励。您设置分销佣金后，平台其他商户及海量的合伙人将会一起帮您推广，具体金额您可自由设置，金额越高合伙人和商户会越有动力。"
            >
              <template #reference>
                <span style="padding-left: 2px; display: flex; align-items: center">
                  <el-icon :size="16">
                    <Warning />
                  </el-icon>
                </span>
              </template>
            </el-popover>
          </div>
        </template>
        <template #default="scope">
          <div>￥{{ formatThousandNumber(scope.row.distributionBrokerage) }}</div>
        </template>
      </el-table-column>

      <el-table-column label="金融方案">
        <template #default="scope">
          <div>{{ scope.row.financeSchemeName || '-' }}</div>
        </template>
      </el-table-column>

      <el-table-column v-if="params.carType === 2" label="订阅方案来源">
        <template #default="scope">
          <div>{{ scope.row.merchantName || '-' }}</div>
        </template>
      </el-table-column>

      <el-table-column label="方案创建时间">
        <template #default="scope">
          <div>{{ scope.row.createdTime || '-' }}</div>
        </template>
      </el-table-column>

      <el-table-column v-if="params.carType === 2" label="方案状态">
        <template #default="scope">
          <div>{{ OLD_CAR_CHECK_STATUS[scope.row.finalCheckStatus] }}</div>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="110" align="center">
        <template #default="scope">
          <div class="table-btn" @click="goDetailPage(scope.row.id, scope.row.carType.id)">
            查看详情
          </div>
          <div class="table-btn" @click="set(2, scope.row.id, scope.row.carType.id)">修改方案</div>
          <div class="table-btn" @click="del(scope.row)">删除方案</div>
        </template>
      </el-table-column>
    </el-table>

    <pagination :total="total" @current-change="handleCurrentChange" />
  </div>
</template>

<script setup lang="ts">
import type { ISubscribeSearch, ISubscribeRecord } from '@/types'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import {
  selectList,
  deleteCarSubscribeByCity,
  deleteCityCarSubscribe,
  updateCarSubscribeName
} from '@/api/plan/subscribe'
import { CAR_NEW_STATUS, OLD_CAR_CHECK_STATUS } from '@/utils/constant'
import { formatThousandNumber } from '@/utils/util'

const router = useRouter()
const params = ref<ISubscribeSearch>({
  carType: 1,
  schemeName: '',
  carTypeYearProduct: '',
  pageNo: 1,
  pageSize: 10
})

const list = ref<ISubscribeRecord[]>([])
const total = ref<number>(0)

const searchList = () => {
  selectList(params.value).then((res) => {
    list.value = res.records
    total.value = res.total
  })
}

const reset = () => {
  params.value.schemeName = ''
  params.value.carTypeYearProduct = ''
  params.value.pageNo = 1
  searchList()
}

const handleCurrentChange = (e: number) => {
  params.value.pageNo = e
  searchList()
}

searchList()

const changeTab = (tab: number) => {
  params.value.carType = tab
  params.value.pageNo = 1
  searchList()
}

const setSubScribeName = (row: ISubscribeRecord) => {
  ElMessageBox.prompt('请输入方案名称', '修改方案名称', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputValidator: (value) => {
      if (!value || !value.trim()) {
        return false
      }
      return true
    },
    inputErrorMessage: '请输入方案名称'
  }).then(({ value }) => {
    const data = {
      newType: params.value.carType as number,
      subscribeName: value,
      id: (params.value.carType == 1 ? row.carType.id : row.id) as number
    }

    updateCarSubscribeName(data).then(() => {
      ElMessage.success('保存成功')
      searchList()
    })
  })
}

const set = (operator: number, subscribeId?: number, carTypeYearProductId?: number) => {
  router.push({
    path: '/product/setSubscribe',
    query: {
      subscribeId,
      carTypeYearProductId,
      carType: params.value.carType,
      operator
    }
  })
}

const goDetailPage = (subscribeId: number, carTypeYearProductId: number) => {
  router.push({
    path: '/product/SubscribeDetail',
    query: {
      subscribeId,
      carTypeYearProductId,
      carType: params.value.carType
    }
  })
}

const del = (row: ISubscribeRecord) => {
  ElMessageBox.confirm(`确定要删除这个方案吗？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    const data = {
      id: row.id as number,
      carTypeYearProductId: row.carType.id as number,
      newType: params.value.carType as number
    }

    if (params.value.carType == 1) {
      deleteCarSubscribeByCity(data).then(() => {
        ElMessage.success('删除成功')
        searchList()
      })
    } else {
      deleteCityCarSubscribe(data).then(() => {
        ElMessage.success('删除成功')
        searchList()
      })
    }
  })
}
</script>

<style lang="scss" scoped>
.create-btn-wrap {
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
