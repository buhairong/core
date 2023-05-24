<template>
  <el-table
    :data="props.list"
    style="width: 100%"
    :header-cell-style="{ background: '#F2F3F5', color: '#1D2129' }"
  >
    <el-table-column prop="orderNum" label="订单编号" align="center"> </el-table-column>

    <el-table-column label="车辆信息">
      <template #default="scope">
        <div>
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

    <el-table-column :label="type == 1 ? '提车押金' : '订阅费用'">
      <template #default="scope">
        <div v-if="type == 1">
          {{ scope.row.deposit ? `${formatThousandNumber(scope.row.deposit)}元` : '-' }}
        </div>
        <div v-else>
          {{ scope.row.totalPayment ? `${formatThousandNumber(scope.row.totalPayment)}元` : '-' }}
        </div>
      </template>
    </el-table-column>

    <el-table-column label="支付方式">
      <template #default="scope">
        <div>{{ scope.row.payType ? payTypeList[scope.row.payType] : '-' }}</div>
      </template>
    </el-table-column>

    <el-table-column label="订单状态">
      <template #default="scope">
        <div>
          {{
            scope.row.confirmed || scope.row.confirmed == 0 ? confirmList[scope.row.confirmed] : '-'
          }}
        </div>
      </template>
    </el-table-column>

    <el-table-column label="审核人员">
      <template #default="scope">
        <div>{{ scope.row.updateName || '-' }}</div>
      </template>
    </el-table-column>

    <el-table-column label="审核日期">
      <template #default="scope">
        <div>{{ scope.row.updateTime || '-' }}</div>
      </template>
    </el-table-column>

    <el-table-column label="操作" width="110" align="center">
      <template #default="scope">
        <div
          v-if="scope.row.confirmed === 0"
          class="table-btn"
          @click="goFinanceDetailPage(scope.row)"
        >
          确认收款
        </div>
        <div
          v-if="scope.row.confirmed === 1"
          class="table-btn"
          @click="goFinanceDetailPage(scope.row)"
        >
          查看详情
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import type { IFinanceRecord } from '@/types'
import { useRouter } from 'vue-router'
import { formatThousandNumber } from '@/utils/util'

interface Number_Key {
  [key: number]: string
}

interface IProps {
  type: number
  list: IFinanceRecord[]
}

const props = defineProps<IProps>()

const router = useRouter()

const payTypeList: Number_Key = {
  1: '微信支付',
  2: '银行转账',
  3: '混合支付'
}

const confirmList: Number_Key = {
  0: '待确认',
  1: '已完成'
}

const goFinanceDetailPage = (row: IFinanceRecord) => {
  let path = '/finance/depositDetail'

  if (props.type === 2) {
    path = '/finance/subscribeDetail'
  }

  router.push({
    path,
    query: {
      orderId: row.id,
      name: row.name,
      mobile: row.mobile,
      emergencyContactName: row.emergencyContactName,
      emergencyContactPhone: row.emergencyContactPhone,
      type: props.type
    }
  })
}
</script>

<style lang="scss" scoped></style>
