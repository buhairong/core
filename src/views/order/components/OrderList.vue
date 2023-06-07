<template>
  <div>
    <div class="content-title">筛选</div>

    <div class="search-wrap">
      <div class="search-line">
        <div class="search-item">
          <div class="label">订单编号</div>
          <c-input
            v-model="params.orderNum"
            placeholder="请输入订单编号"
            :input-style="{
              width: '145px'
            }"
          />
        </div>

        <div class="search-item">
          <div class="label">客户信息</div>
          <c-input
            v-model="params.nameOrMobile"
            placeholder="请输入客户姓名或手机号"
            :input-style="{
              width: '200px'
            }"
          />
        </div>

        <div class="search-item">
          <div class="label">下单日期</div>
          <date-range-select
            v-model="dateRange"
            @select="handlerSelectDate"
            :style="{ width: '312px' }"
          />
        </div>

        <search-button class="search-btn" @click="searchList" />
      </div>

      <div class="search-line search-line2">
        <div class="search-item">
          <div class="label">订单状态</div>
          <c-select
            v-model="params.status"
            :options="ORDER_STATUS_LIST"
            placeholder="请选择订单状态"
          />
        </div>

        <div class="search-item">
          <div class="label">车辆款型</div>
          <c-select
            v-model="params.carBrandId"
            :options="brandList"
            :showAllValue="false"
            placeholder="选择品牌"
            style="margin-right: 10px"
            labelKey="brandName"
            valueKey="id"
            @change="changeCarBrand"
          />
          <c-select
            v-model="params.carTypeId"
            :options="typeList"
            :showAllValue="false"
            placeholder="选择车系"
            style="margin-right: 10px"
            labelKey="carType"
            valueKey="id"
            @change="changeCarType"
          />
          <c-select
            v-model="params.carTypeYearId"
            :options="yearList"
            :showAllValue="false"
            placeholder="选择年款"
            style="margin-right: 10px"
            labelKey="year"
            valueKey="id"
            @change="changeCarTypeYear"
          />
          <c-select
            v-model="params.carTypeYearProductId"
            :options="productList"
            :showAllValue="false"
            placeholder="选择型号"
            :selectStyle="{
              width: '198px'
            }"
            labelKey="carTypeYearProduct"
            valueKey="id"
            @change="changeCarProduct"
          />
        </div>

        <reset-button class="search-btn" @click="reset" />
      </div>
    </div>

    <el-table
      :data="list"
      style="width: 100%"
      :header-cell-style="{ background: '#F2F3F5', color: '#1D2129' }"
    >
      <el-table-column prop="orderNum" label="订单编号" align="center"> </el-table-column>

      <el-table-column label="订单来源">
        <template #default="scope">
          <div>
            <div>{{ scope.row.partnerRecommend === 1 ? '合伙人引荐' : '客户自购' }}</div>
            <div v-if="scope.row.partnerRecommend === 1">
              佣金:￥{{ formatThousandNumber(scope.row.distributionBrokerageFree) }}
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="createdTime" label="下单日期" align="center"> </el-table-column>

      <el-table-column label="车辆信息">
        <template #default="scope">
          <div
            v-if="
              scope.row.carPlateNum ||
              scope.row.carVin ||
              scope.row.carEngineNum ||
              scope.row.carColor
            "
          >
            <el-tooltip
              class="item"
              effect="dark"
              :content="`车牌号：${scope.row.carPlateNum || '-'}\n车架号：${
                scope.row.carVin || '-'
              }\n发动机号：${scope.row.carEngineNum || '-'}\n外观颜色：${
                scope.row.carColor || '-'
              }`"
              placement="bottom-start"
            >
              <div>
                {{ scope.row.carBrand }}·{{ scope.row.carType }} <br />
                {{ scope.row.carTypeYear }} <br />
                {{ scope.row.carTypeYearProduct }}
              </div>
            </el-tooltip>
          </div>
          <div v-else>
            <div>{{ scope.row.carBrand }}·{{ scope.row.carType }}</div>
            <div>{{ scope.row.carTypeYear }}</div>
            <div>{{ scope.row.carTypeYearProduct }}</div>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="客户信息">
        <template #default="scope">
          <div>
            <div>{{ scope.row.name }}</div>
            <div>{{ scope.row.mobile }}</div>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="方案信息">
        <template #default="scope">
          <div>
            <div>订阅周期：{{ scope.row.monthTotal }}个月</div>
            <div>期末选择：{{ scope.row.finalSelect }}</div>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="订单金额">
        <template #default="scope">
          <div>
            <div>车辆押金：{{ formatThousandNumber(scope.row.deposit) }}元</div>
            <div>订阅费用：{{ formatThousandNumber(scope.row.totalPayment) }}元</div>
            <div>买断价格：{{ formatThousandNumber(scope.row.buyoutsFee) }}元</div>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="statusStr" label="订单状态" align="center"> </el-table-column>

      <el-table-column label="操作" width="110" align="center">
        <template #default="scope">
          <div class="table-btn" @click="goOrderDetailPage(scope.row)">查看详情</div>
          <div
            v-if="scope.row.status == 3"
            class="table-btn"
            @click="openDistributionDialog(scope.row)"
          >
            分配订单
          </div>
        </template>
      </el-table-column>
    </el-table>

    <pagination :total="total" @current-change="handleCurrentChange" />

    <DistributionDialog
      v-if="showDistributionDialog && currentOrder"
      :show="showDistributionDialog"
      :currentOrder="currentOrder"
      @close="handleCloseDistributionDialog"
      @save="saveDistribution"
    />
  </div>
</template>

<script setup lang="ts">
import type {
  IOrderSearch,
  IOrderRecord,
  IBrand,
  ICarBrandType,
  ICarYear,
  ICarProduct
} from '@/types'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { selectOrderList } from '@/api/order/order'
import { getCarBrand, getCarType, getCarYear, getCarProduct } from '@/api/car/car'
import { ORDER_STATUS_LIST } from '@/utils/constant'
import { formatThousandNumber } from '@/utils/util'
import DistributionDialog from './DistributionDialog.vue'

interface IProps {
  carType: number
}

const props = defineProps<IProps>()

const router = useRouter()
const params = ref<IOrderSearch>({
  newType: null,
  orderNum: '',
  nameOrMobile: '',
  minCreatedTime: '',
  maxCreatedTime: '',
  status: null,
  carBrandId: null,
  carTypeId: null,
  carTypeYearId: null,
  carTypeYearProductId: null,
  limit: 10,
  page: 1
})
params.value.newType = props.carType as number
const list = ref<IOrderRecord[]>([])
const total = ref<number>(0)

const searchList = () => {
  selectOrderList(params.value).then((res) => {
    list.value = res.records
    total.value = res.total
  })
}

searchList()

const reset = () => {
  params.value.orderNum = ''
  params.value.nameOrMobile = ''
  params.value.minCreatedTime = ''
  params.value.maxCreatedTime = ''
  params.value.status = null
  params.value.carBrandId = null
  params.value.carTypeId = null
  params.value.carTypeYearId = null
  params.value.carTypeYearProductId = null
  params.value.page = 1
  searchList()
}

const handleCurrentChange = (e: number) => {
  params.value.page = e
  searchList()
}

const dateRange = ref<string[]>([])

const handlerSelectDate = (data: string[] | null) => {
  if (data) {
    params.value.minCreatedTime = data[0]
    params.value.maxCreatedTime = data[1]
    dateRange.value = data
  } else {
    params.value.minCreatedTime = ''
    params.value.maxCreatedTime = ''
    dateRange.value = []
  }
}

const brandList = ref<IBrand[]>([])
getCarBrand().then((data) => {
  brandList.value = data
})
const changeCarBrand = (e: number) => {
  params.value.carBrandId = e
  getCarTypeList()
}

const typeList = ref<ICarBrandType[]>([])
const getCarTypeList = () => {
  const data = {
    carBrandId: params.value.carBrandId as number
  }

  getCarType(data).then((res) => {
    typeList.value = res
  })
}
const changeCarType = (e: number) => {
  params.value.carTypeId = e
  getCarTypeYear()
}

const yearList = ref<ICarYear[]>([])
const getCarTypeYear = () => {
  const data = {
    carTypeId: params.value.carTypeId as number
  }

  getCarYear(data).then((res) => {
    yearList.value = res
  })
}
const changeCarTypeYear = (e: number) => {
  params.value.carTypeYearId = e
  getCarProductList()
}

const productList = ref<ICarProduct[]>([])
const getCarProductList = () => {
  const data = {
    carTypeYearId: params.value.carTypeYearId as number
  }

  getCarProduct(data).then((res) => {
    productList.value = res
  })
}
const changeCarProduct = (e: number) => {
  params.value.carTypeYearProductId = e
}

const goOrderDetailPage = (row: IOrderRecord) => {
  router.push({
    path: '/order/detail',
    query: {
      orderId: row.id,
      type: row.newType,
      orderStatus: row.status
    }
  })
}

const currentOrder = ref<IOrderRecord | null>(null)
const showDistributionDialog = ref<boolean>(false)
const openDistributionDialog = (row: IOrderRecord) => {
  currentOrder.value = row
  showDistributionDialog.value = true
}

const handleCloseDistributionDialog = () => {
  showDistributionDialog.value = false
  currentOrder.value = null
}

const saveDistribution = () => {
  searchList()
  handleCloseDistributionDialog()
}
</script>

<style lang="scss" scoped></style>
