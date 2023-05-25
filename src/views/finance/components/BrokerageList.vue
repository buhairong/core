<template>
  <div>
    <el-table
      :data="props.list"
      style="width: 100%"
      :header-cell-style="{ background: '#F2F3F5', color: '#1D2129' }"
    >
      <el-table-column label="返佣金额">
        <template #default="scope">
          <div>
            <div>{{ formatThousandNumber(scope.row.money) }}元</div>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="收款人信息">
        <template #default="scope">
          <div>
            <div>{{ scope.row.name }}</div>
            <div>{{ scope.row.idCard }}</div>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="收款人银行卡号" prop="bankAccountId"> </el-table-column>

      <el-table-column label="银行" prop="bankName"> </el-table-column>

      <el-table-column label="申请时间" prop="createTime"> </el-table-column>

      <el-table-column label="状态">
        <template #default="scope">
          <div :class="{ 'error-status': scope.row.status === 0 }">{{ scope.row.statusStr }}</div>
        </template>
      </el-table-column>

      <el-table-column label="完成时间">
        <template #default="scope">
          <div>
            <div>{{ scope.row.updateTime || '-' }}</div>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="110" align="center">
        <template #default="scope">
          <div v-if="scope.row.status === 2" class="table-btn" @click="agree(scope.row.id)">
            完成放款
          </div>
          <div v-if="scope.row.status === 2" class="table-btn" @click="reject(scope.row.id)">
            信息有误
          </div>
          <div class="table-btn" @click="goDetailPage(scope.row)">查看详情</div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="转账信息有误"
      v-model="showRejectDialog"
      width="480px"
      :before-close="handleClose"
    >
      <div>
        <div class="dialog-tip">备注说明</div>
        <c-text-area v-model="remark" placeholder="请输入备注说明~最多可输入100个字" />
      </div>

      <template #footer>
        <div class="dialog-btn-wrap" style="margin-top: 40px">
          <div class="btn" @click="handleClose">取消</div>
          <div class="btn save-btn" @click="handleReject">确认</div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import type { IBrokerageRecord } from '@/types'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import { updateStatusOfBrokerage } from '@/api/finance/finance'
import { formatThousandNumber } from '@/utils/util'

interface IProps {
  type: number
  list: IBrokerageRecord[]
}

const props = defineProps<IProps>()
const emits = defineEmits(['search'])

const router = useRouter()
const remark = ref<string>('')
const showRejectDialog = ref<boolean>(false)
const rejectId = ref<number | null>(null)

const agree = (id: number) => {
  ElMessageBox.confirm(`确认完成这笔放款吗？`, '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  }).then(() => {
    updateStatus(1, id)
  })
}

const reject = (id: number) => {
  showRejectDialog.value = true
  rejectId.value = id
}

const handleClose = () => {
  showRejectDialog.value = false
  rejectId.value = null
}

const handleReject = () => {
  if (!remark.value.trim()) {
    ElMessage.error('请输入备注说明')
    return
  }

  if (rejectId.value) {
    updateStatus(0, rejectId.value)
  }

  handleClose()
}

const updateStatus = (status: number, id: number) => {
  const data = {
    status,
    id,
    remark: remark.value
  }
  updateStatusOfBrokerage(data).then(() => {
    ElMessage.success('保存成功')
    emits('search')
  })
}

const goDetailPage = (row: IBrokerageRecord) => {
  router.push({
    path: '/finance/brokerageDetail',
    query: {
      type: props.type,
      ...row
    }
  })
}
</script>

<style lang="scss" scoped>
.error-status {
  color: #ea0000;
}
.wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  .dialog-tip {
    margin-top: 20px;
    margin-bottom: 5px;
    height: 22px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    line-height: 22px;
    color: #4e5969;
  }
}
</style>
