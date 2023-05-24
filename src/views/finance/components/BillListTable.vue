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
          <img style="width: 16px; height: 16px" src="@/assets/order/pdf-icon.png" />
          <div class="file-count">{{ scope.row.bankBills.length }}张</div>
          <div class="review-btn" @click="onPreview(scope.row.bankBills)">查看</div>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="操作" width="200" align="center">
      <template #default="scope">
        <div v-if="scope.row.payWay == 2">
          <div class="operator" v-if="scope.row.confirmed === 0">
            <div class="btn" @click="confirmAccountDetailOfBank(scope.row, 1)">确认收款</div>
            <div class="btn reject-btn" @click="openRejectDialog(scope.row)">驳回收款</div>
          </div>
          <div v-else>{{ scope.row.confirmed === 1 ? '已确认' : '已驳回' }}</div>
        </div>
      </template>
    </el-table-column>
  </el-table>

  <el-image-viewer v-if="showImageView" :url-list="bankBills" @close="closeElImage" />

  <el-dialog title="驳回收款" v-model="showRejectDialog" width="480px" :before-close="handleClose">
    <div>
      <div class="dialog-title">确认驳回用户车辆押金收款信息？</div>
      <div class="dialog-tip">拒绝原因<span style="color: #86909c">（必填项）</span></div>
      <c-text-area v-model="remark" placeholder="请输入拒绝原因~最多可输入100个字" />
    </div>

    <template #footer>
      <div class="dialog-btn-wrap" style="margin-top: 40px">
        <div class="btn" @click="handleClose">取消</div>
        <div class="btn save-btn" @click="handleReject">确认</div>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import type { IFinancialDetail, IBillRecord } from '@/types'
import { ref } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { formatThousandNumber } from '@/utils/util'
import { confirmSubscribeAccountDetailOfBank } from '@/api/finance/finance'

interface Number_Key {
  [key: number]: string
}

interface IProps {
  detail: IFinancialDetail
  type: number
  orderId: number
}

const props = defineProps<IProps>()
const emits = defineEmits(['update'])

const payTypeList: Number_Key = {
  1: '微信支付',
  2: '银行转账',
  3: '线下支付'
}

const bankBills = ref<string[]>([])
const showImageView = ref<boolean>(false)
const remark = ref<string>('')
const rejectRow = ref<IBillRecord | null>(null)
const showRejectDialog = ref<boolean>(false)

const onPreview = (list: string[]) => {
  bankBills.value = list
  showImageView.value = true
}

const closeElImage = () => {
  showImageView.value = false
}

const confirmAccountDetailOfBank = (row: IBillRecord, confirmed: number) => {
  ElMessageBox.confirm(`确定要${confirmed === 1 ? '同意' : '驳回'}这笔银行转账吗？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    const data = {
      accountDetailId: row.id,
      businessId: props.orderId,
      type: props.type == 1 ? 2 : 1,
      confirmed,
      remark: remark.value
    }

    confirmSubscribeAccountDetailOfBank(data).then(() => {
      remark.value = ''
      emits('update')
    })
  })
}

const openRejectDialog = (row: IBillRecord) => {
  rejectRow.value = row
  showRejectDialog.value = true
}

const handleClose = () => {
  showRejectDialog.value = false
  rejectRow.value = null
}

const handleReject = () => {
  if (!remark.value.trim()) {
    ElMessage.error('请输入驳回理由')
    return
  }

  confirmAccountDetailOfBank(rejectRow.value as IBillRecord, 2)
  handleClose()
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

.dialog-title {
  height: 22px;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  line-height: 22px;
  color: #3d3d3d;
}
.dialog-tip {
  margin: 12px 0;
  height: 22px;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  line-height: 22px;
  color: #4e5969;
}
</style>
