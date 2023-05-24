<template>
  <div v-if="detail">
    <div class="content1">
      <div class="title">客户信息</div>
      <div class="container">
        <div class="left">
          <div class="item">
            <div class="item-title">客户姓名:</div>
            <div class="item-content">{{ name || '-' }}</div>
          </div>
        </div>
        <div class="right">
          <div class="item">
            <div class="item-title">联系方式:</div>
            <div class="item-content">{{ mobile || '-' }}</div>
          </div>
        </div>
      </div>

      <div class="title">紧急联系人</div>
      <div class="container">
        <div class="left">
          <div class="item">
            <div class="item-title">紧急联系人姓名:</div>
            <div class="item-content">{{ emergencyContactName || '-' }}</div>
          </div>
        </div>
        <div class="right">
          <div class="item">
            <div class="item-title">紧急联系人联系方式:</div>
            <div class="item-content">{{ emergencyContactPhone || '-' }}</div>
          </div>
        </div>
      </div>

      <div class="title">费用明细</div>
      <div class="container" v-if="type === 1">
        <div class="left">
          <div class="item">
            <div class="item-title">提车押金:</div>
            <div class="item-content">
              ￥{{ formatThousandNumber(detail.costInfo.deposit || 0) }}
            </div>
          </div>
          <div class="item">
            <div class="item-title" style="height: 30px; line-height: 30px">共计费用:</div>
            <div class="item-content">
              <div class="totalPay">
                ￥<span class="price">
                  {{
                    formatThousandNumber(
                      (detail.costInfo.deposit || 0) + (detail.costInfo.addedDeposit || 0)
                    )
                  }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="item">
            <div class="item-title">加收提车押金:</div>
            <div class="item-content">
              {{
                detail.costInfo.addedDeposit
                  ? `￥${formatThousandNumber(detail.costInfo.addedDeposit)}`
                  : '-'
              }}
            </div>
          </div>
        </div>
      </div>
      <div class="container" v-if="type === 2">
        <div class="left">
          <div class="item">
            <div class="item-title">订阅费用:</div>
            <div class="item-content">
              ￥{{ formatThousandNumber(detail.costInfo.totalPayment || 0) }}
            </div>
          </div>
          <div class="item">
            <div class="item-title">保险费用:</div>
            <div class="item-content">
              {{
                detail.costInfo.premium ? `￥${formatThousandNumber(detail.costInfo.premium)}` : '-'
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
                      (detail.costInfo.totalPayment || 0) +
                        (detail.costInfo.totalPlateNumFee || 0) +
                        (detail.costInfo.premium || 0) +
                        (detail.costInfo.otherConfigPayment || 0)
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
                detail.costInfo.totalPlateNumFee
                  ? `￥${formatThousandNumber(detail.costInfo.totalPlateNumFee)}`
                  : '-'
              }}
            </div>
          </div>
          <div class="item">
            <div class="item-title">增配项费用:</div>
            <div class="item-content">
              {{
                detail.costInfo.otherConfigPayment
                  ? `￥${formatThousandNumber(detail.costInfo.otherConfigPayment)}`
                  : '-'
              }}
            </div>
          </div>
        </div>
      </div>

      <div class="title" v-if="detail.billList && detail.billList.length">
        账单已分{{ detail.billList.length }}笔支付
      </div>

      <BillListTable :detail="detail" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { formatThousandNumber } from '@/utils/util'
import { useDetail } from '../use/useFinance'
import BillListTable from './BillListTable.vue'

const route = useRoute()

const type = (route.query as any).type - 0
const orderId = (route.query as any).orderId - 0
const name = (route.query as any).name
const mobile = (route.query as any).mobile
const emergencyContactName = (route.query as any).emergencyContactName
const emergencyContactPhone = (route.query as any).emergencyContactPhone

const { detail } = useDetail(type, orderId)
</script>

<style lang="scss" scoped>
.content1 {
  padding: 0 100px;
  .title {
    margin: 24px 0;
    height: 22px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    line-height: 22px;
    color: #1d2129;
  }
  .container {
    padding-left: 50px;
    display: flex;
    .left {
      width: 400px;
      margin-right: 30px;
    }
    .right {
      width: 400px;
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
        width: 130px;
        text-align: right;
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
        height: 30px;
        line-height: 30px;
        color: #f0592e;
        .price {
          font-size: 20px;
        }
      }
    }
  }
}
</style>
