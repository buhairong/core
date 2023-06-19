<template>
  <div class="wrap">
    <div class="tabs">
      <div
        v-if="props.detail.billListOfDeposit && props.detail.billListOfDeposit.length"
        class="tab"
        :class="{ active: activeTab === 'billListOfDeposit' }"
        @click="changeTab('billListOfDeposit')"
      >
        车辆押金
      </div>
      <div
        v-if="props.detail.billList && props.detail.billList.length"
        class="tab"
        :class="{ active: activeTab === 'billList' }"
        @click="changeTab('billList')"
      >
        订阅费用
      </div>
    </div>

    <div class="container">
      <div class="pay-info" v-if="activeTab === 'billListOfDeposit'">
        <div class="left">
          <div class="item">
            <div class="item-title">车辆押金:</div>
            <div class="item-content">
              ￥{{ formatThousandNumber(props.detail.costInfo.deposit) }}
            </div>
          </div>
          <div class="item">
            <div class="item-title">共计费用:</div>
            <div class="item-content">
              <div class="totalPay">
                ￥<span class="price">
                  {{
                    formatThousandNumber(
                      props.detail.costInfo.deposit + (props.detail.costInfo.addedDeposit || 0)
                    )
                  }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="item">
            <div class="item-title">加收车辆押金:</div>
            <div class="item-content">
              {{
                detail.costInfo.addedDeposit
                  ? `￥${formatThousandNumber(props.detail.costInfo.addedDeposit)}`
                  : '-'
              }}
            </div>
          </div>
        </div>
      </div>

      <div class="pay-info" v-if="activeTab === 'billList'">
        <div class="left">
          <div class="item">
            <div class="item-title">订阅费用:</div>
            <div class="item-content">
              ￥{{ formatThousandNumber(props.detail.costInfo.totalPayment) }}
            </div>
          </div>
          <div class="item">
            <div class="item-title">保险费用:</div>
            <div class="item-content">
              {{
                props.detail.costInfo.premium
                  ? `￥${formatThousandNumber(props.detail.costInfo.premium)}`
                  : '-'
              }}
            </div>
          </div>
          <div class="item">
            <div class="item-title">共计费用:</div>
            <div class="item-content">
              <div class="totalPay">
                ￥<span class="price">
                  {{
                    formatThousandNumber(
                      props.detail.costInfo.totalPayment +
                        (detail.costInfo.totalPlateNumFee || 0) +
                        (detail.costInfo.premium || 0)
                    )
                  }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="item">
            <div class="item-title">牌照费用:</div>
            <div class="item-content">
              {{
                props.detail.costInfo.totalPlateNumFee
                  ? `￥${formatThousandNumber(props.detail.costInfo.totalPlateNumFee)}`
                  : '-'
              }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-table
      :data="paiedInfoList"
      :header-cell-style="{ background: '#F2F3F5', color: '#1D2129' }"
    >
      <el-table-column label="笔数" align="center" width="60">
        <template #default="scope">
          <div>第{{ scope.$index + 1 }}笔</div>
        </template>
      </el-table-column>

      <el-table-column label="支付金额" align="center" width="90">
        <template #default="scope">
          <div>￥{{ formatThousandNumber(scope.row.total) }}</div>
        </template>
      </el-table-column>

      <el-table-column label="支付方式" align="center" width="80">
        <template #default="scope">
          <div>
            {{ scope.row.payWay === 1 ? '微信支付' : '银行转账' }}
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="createdTime" label="支付时间" align="center" width="150">
      </el-table-column>

      <el-table-column label="交易单号" align="center" width="150">
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
            <el-image style="width: 16px; height: 16px" :src="pdfIcon"></el-image>
            <div class="file-count">{{ scope.row.bankBills.length }}张</div>
            <div class="review-btn" @click="onPreview(scope.row.bankBills)">查看</div>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-image-viewer v-if="showImageView" :url-list="filelist" @close="closeElImage" />
  </div>
</template>

<script setup lang="ts">
import type { IPaiedInfo, IBill } from '@/types'
import { ref } from 'vue'
import { formatThousandNumber } from '@/utils/util'
import pdfIcon from '@/assets/order/pdf-icon.png'

interface IProps {
  detail: IPaiedInfo
}

type IPaiedInfoKey = keyof IPaiedInfo

const props = defineProps<IProps>()
const activeTab = ref<IPaiedInfoKey>('billListOfDeposit')
const paiedInfoList = ref<IBill[]>([])
const showImageView = ref<boolean>(false)
const filelist = ref<string[]>([])

if (props.detail.billListOfDeposit) {
  paiedInfoList.value = props.detail[activeTab.value] as IBill[]
}

const changeTab = (tab: IPaiedInfoKey) => {
  activeTab.value = tab
  paiedInfoList.value = props.detail[tab] as IBill[]
}

const onPreview = (list: string[]) => {
  filelist.value = list
  showImageView.value = true
}

const closeElImage = () => {
  showImageView.value = false
}
</script>

<style lang="scss" scoped>
.wrap {
  .tabs {
    display: flex;
    .tab {
      margin-right: 8px;
      width: 88px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      border-radius: 32px;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      cursor: default;
      &.active {
        background: #f2f3f8;
        color: #3446aa;
      }
    }
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    .pay-info {
      padding: 60px 0;
      display: flex;
      .left {
        width: 300px;
        margin-right: 10px;
      }
      .right {
        width: 300px;
      }
      .item {
        margin-bottom: 16px;
        display: flex;
        .item-title {
          margin-right: 8px;
          height: 21px;
          font-family: PingFang-SC-Medium;
          font-size: 14px;
          line-height: 21px;
          color: #86909c;
        }
        .item-content {
          width: 0;
          flex: 1;
          display: flex;
          flex-wrap: wrap;
          font-family: PingFang-SC-Medium;
          font-size: 14px;
          line-height: 21px;
          color: #1d2129;
        }
        .totalPay {
          color: #f0592e;
          .price {
            font-size: 16px;
          }
        }
      }
    }
  }

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
}
</style>
