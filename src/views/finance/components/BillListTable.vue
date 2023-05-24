<template>
  <el-table
    :data="props.detail.billList"
    style="width: 100%"
    :header-cell-style="{ background: '#F2F3F5', color: '#1D2129' }"
  >
    <el-table-column label="笔数" align="center">
      <template #default="scope">
        <div>第{{ scope.$index + 1 }}笔</div>
      </template>
    </el-table-column>

    <el-table-column label="支付金额" align="center">
      <template #default="scope">
        <div>{{ scope.row.total ? `${formatThousandNumber(scope.row.total)}元` : '-' }}</div>
      </template>
    </el-table-column>

    <el-table-column label="支付方式" align="center">
      <template #default="scope">
        <div>{{ scope.row.payWay ? payTypeList[scope.row.payWay] : '-' }}</div>
      </template>
    </el-table-column>

    <el-table-column label="支付时间" align="center">
      <template #default="scope">
        <div>{{ scope.row.createdTime || '-' }}</div>
      </template>
    </el-table-column>

    <el-table-column label="交易单号" align="center">
      <template #default="scope">
        <div>
          {{ scope.row.wxOrderNum || '无' }}
        </div>
      </template>
    </el-table-column>

    <el-table-column label="转账凭证" align="center" width="140">
      <template #default="scope">
        <div v-if="scope.row.bankBills.length === 0">无</div>
        <div class="files" v-else>
          <el-image style="width: 16px; height: 16px" src="@/assets/order/pdf-icon.png"></el-image>
          <div class="file-count">{{ scope.row.bankBills.length }}张</div>
          <div class="review-btn" @click="onPreview(scope.$index)">查看</div>
          <el-image
            v-if="currentIndex === scope.$index"
            class="hideImgDiv"
            ref="previewRef"
            :src="scope.row.bankBills[0]"
            :preview-src-list="scope.row.bankBills"
          >
          </el-image>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="操作" width="200" align="center">
      <template #default="scope">
        <div v-if="scope.row.payWay == 2">
          <div class="operator" v-if="scope.row.confirmed == 0">
            <div class="btn" @click="confirmSubscribeAccountDetailOfBank(scope.row, 1)">
              确认收款
            </div>
            <div class="btn reject-btn" @click="openRejectDialog(scope.row)">驳回收款</div>
          </div>
          <div v-else>{{ scope.row.confirmed == 1 ? '已确认' : '已驳回' }}</div>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import type { IFinancialDetail } from '@/types'
import { nextTick, ref } from 'vue'
import { formatThousandNumber } from '@/utils/util'

interface Number_Key {
  [key: number]: string
}

interface IProps {
  detail: IFinancialDetail
}

const props = defineProps<IProps>()

const payTypeList: Number_Key = {
  1: '微信支付',
  2: '银行转账',
  3: '线下支付'
}

const currentIndex = ref<number>(-1)
const previewRef = ref()

const onPreview = (index: number) => {
  currentIndex.value = index
  nextTick(() => {
    previewRef.value.clickHandler()
  })
}
</script>

<style lang="scss" scoped>
.files {
  display: flex;
  justify-content: center;
  align-items: center;
  .file-count {
    padding-left: 8px;
    padding-right: 16px;
  }
  .review-btn {
    color: #3446aa;
    cursor: pointer;
  }
}
.hideImgDiv {
  :deep(.el-image__inner) {
    display: none;
  }
}

.operator {
  display: flex;
  .btn {
    width: 84px;
    height: 32px;
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #3446aa;
    font-size: 14px;
    color: #ffffff;
  }
  .reject-btn {
    background: #ea0000;
    margin-left: 6px;
  }
}
</style>
