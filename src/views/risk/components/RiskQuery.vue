<template>
  <div class="wrap">
    <div class="title">{{ customTypeText }}风险查询</div>
    <el-table
      :data="record"
      style="width: 100%"
      border
      :span-method="arraySpanMethod"
      :header-cell-style="{ background: '#F2F3F5', color: '#1D2129' }"
    >
      <el-table-column :label="`${customTypeText}风险查询模型`" align="center">
        <el-table-column prop="apiName" label="查询条件"> </el-table-column>
        <el-table-column label="命中条件">
          <template #default="scope">
            <div v-if="scope.row.status == 1">
              <div>{{ scope.row.ruleName || '-' }}</div>
            </div>
            <div style="color: #ea0000" v-else-if="scope.row.status == 2">查询失败</div>
            <div v-else>
              <img :src="loadImg" alt="" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="结果" width="60">
          <template #default="scope">
            <div
              v-if="scope.$index === record.length - 1"
              :style="{ color: RISK_QUERY_STATUS[scope.row.queryStatus].fontColor }"
            >
              {{ RISK_QUERY_STATUS[scope.row.queryStatus].label }}
            </div>
            <div v-else>
              <div v-if="scope.row.ruleResult == 1">
                <img :src="passImg" alt="" />
              </div>
              <div v-else-if="scope.row.ruleResult == 2">
                <img :src="refuseImg" alt="" />
              </div>
              <div v-else-if="scope.row.ruleResult == 3">
                <div v-if="scope.row.status == 1">
                  <img :src="manualImg" alt="" />
                </div>
                <div v-else-if="scope.row.status == 2">
                  <img :src="queryFailImg" alt="" />
                </div>
                <div v-else>
                  <img :src="loadImg" alt="" />
                </div>
              </div>
              <div v-else>
                <div v-if="scope.row.status == 1">
                  <img :src="manualImg" alt="" />
                </div>
                <div v-else-if="scope.row.status == 2">
                  <img :src="queryFailImg" alt="" />
                </div>
                <div v-else>
                  <img :src="loadImg" alt="" />
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column v-if="operator === 'update'" label="操作" width="80" align="center">
          <template #default="scope">
            <div v-if="scope.row.status && scope.row.status !== 0">
              <el-button
                class="table-btn"
                type="text"
                v-if="scope.row.status == 2"
                @click="updateRiskQuery(scope.row)"
                style="padding-top: 0; padding-bottom: 0"
                >查询</el-button
              >
              <el-tooltip
                class="item"
                effect="dark"
                :content="scope.row.result"
                placement="left"
                v-else
              >
                <el-button
                  class="table-btn"
                  type="text"
                  style="padding-top: 0; padding-bottom: 0; text-align: center; width: 100%"
                  >查看</el-button
                >
              </el-tooltip>
              <el-dropdown
                trigger="click"
                @command="(e: number) => handleCommand(e, scope.row)"
                v-if="scope.row.ruleResult == 3 || !scope.row.ruleResult"
              >
                <el-button class="table-btn" type="text">审核</el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      v-for="item in RISK_STATUS"
                      :key="item.value"
                      :command="item.value"
                    >
                      {{ item.label }}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import type { IQuery } from '@/types'
import { ElMessage } from 'element-plus'
import { updateRiskQueryAgain, updateAuditStatusOfLog } from '@/api/risk/userReview'
import { RISK_QUERY_STATUS, RISK_STATUS } from '@/utils/constant'
import loadImg from '@/assets/risk/loading.png'
import passImg from '@/assets/risk/pass.png'
import refuseImg from '@/assets/risk/refuse.png'
import manualImg from '@/assets/risk/manual.png'
import queryFailImg from '@/assets/risk/query_fail.png'

interface IProps {
  orderId: number
  auditRate?: number
  record: IQuery[]
  customType: number
  operator?: string
}

const props = withDefaults(defineProps<IProps>(), {
  operator: 'update'
})

const emits = defineEmits(['updateRiskQueryAgain'])

const customTypeText = props.customType === 1 ? '个人' : '企业'

const arraySpanMethod = ({ rowIndex, columnIndex }: { rowIndex: Number; columnIndex: Number }) => {
  if (rowIndex === props.record.length - 1) {
    if (columnIndex === 0) {
      return {
        rowspan: 1,
        colspan: 2
      }
    } else if (columnIndex === 2) {
      return {
        rowspan: 1,
        colspan: 2
      }
    } else {
      return {
        rowspan: 0,
        colspan: 0
      }
    }
  }
}

const handleCommand = (ruleResult: number, row: IQuery) => {
  updateAuditStatusOfLog({
    auditRate: props.auditRate as number,
    orderId: props.orderId,
    logId: row.id as number,
    ruleResult,
    orderType: row.orderType as number
  }).then(() => {
    ElMessage.success('保存成功')
    emits('updateRiskQueryAgain')
  })
}

const updateRiskQuery = (row: IQuery) => {
  updateRiskQueryAgain({
    auditRate: props.auditRate as number,
    orderId: props.orderId,
    logId: row.id as number
  }).then(() => {
    ElMessage.success('查询成功')
    emits('updateRiskQueryAgain')
  })
}
</script>

<style lang="scss" scoped>
.wrap {
  margin-bottom: 55px;
}
.title {
  margin-bottom: 30px;
  height: 30px;
  font-family: PingFangSC-Medium;
  font-size: 20px;
  line-height: 30px;
  color: #1d2129;
}

.items-wrap {
  margin: 0 100px;
  .items-line {
    margin-bottom: 18px;
    display: flex;
    .item {
      flex: 1;
      display: flex;
      font-family: PingFangSC-Regular;
      font-size: 15px;
      line-height: 23px;
      margin-right: 10px;
      .item-title {
        width: 128px;
        text-align: right;
        color: #86909c;
      }
      .item-content {
        margin-left: 8px;
        color: #1d2129;
      }
    }
  }
}

:deep(.el-table__row:last-child) {
  .el-table__cell:first-child {
    border-right: none;
  }
}
</style>
