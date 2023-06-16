<template>
  <div class="wrap">
    <div class="title">方案信息</div>
    <div class="container">
      <div class="left">
        <div class="item">
          <div class="item-title">用车城市:</div>
          <div class="item-content">{{ props.detail.orderInfo.city || '-' }}</div>
        </div>
        <div class="item">
          <div class="item-title">订阅周期:</div>
          <div class="item-content">
            {{ props.detail.orderInfo.subscribeMouth }}/{{ props.detail.orderInfo.monthTotal }}月
            (第{{ props.detail.orderInfo.orderSize }}期)
          </div>
        </div>
        <div class="item">
          <div class="item-title">车辆押金:</div>
          <div class="item-content">¥{{ formatNumber(props.detail.orderInfo.deposit, '', 0) }}</div>
        </div>
        <div class="item">
          <div class="item-title">买断价格:</div>
          <div class="item-content">
            ¥{{ formatNumber(props.detail.orderInfo.buyoutsFee, '', 0) }}
          </div>
        </div>
        <div class="item">
          <div class="item-title">用户限定里程:</div>
          <div class="item-content">
            {{
              props.detail.orderInfo.limitMileage
                ? formatNumber(parseFloat(props.detail.orderInfo.limitMileage), '公里')
                : '-'
            }}
          </div>
        </div>
        <div class="item">
          <div class="item-title">分销佣金:</div>
          <div class="item-content">
            {{ `¥${formatNumber(props.detail.orderInfo.distributionBrokerage, '', 0)}` }}
          </div>
        </div>
        <div class="item">
          <div class="item-title">精选服务:</div>
          <div class="item-content">
            {{
              props.detail.orderInfo.carSubscribeFreeServiceList
                .map((item) => item.serviceName)
                .join('、')
            }}
          </div>
        </div>
      </div>
      <div class="right">
        <div class="item">
          <div class="item-title">牌照选择:</div>
          <div class="item-content">{{ USE_PLATE[props.detail.orderInfo.usePlate] }}</div>
        </div>
        <div class="item">
          <div class="item-title">支付方式:</div>
          <div class="item-content">
            {{ PAYMENT_TYPE[props.detail.orderInfo.paymentType] }}
          </div>
        </div>
        <div class="item">
          <div class="item-title">订阅费用:</div>
          <div class="item-content">
            ¥{{ formatNumber(props.detail.orderInfo.totalPayment, '', 0) }}
            <span style="padding-left: 4px; font-size: 12px; color: #abacb6"
              >（¥{{ formatNumber(props.detail.orderInfo.monthPayment, '', 0) }}/月）</span
            >
          </div>
        </div>
        <div class="item">
          <div class="item-title">期末选择:</div>
          <div class="item-content">{{ props.detail.orderInfo.finalSelect }}</div>
        </div>
        <div class="item">
          <div class="item-title">超出里程另付:</div>
          <div class="item-content">
            {{
              props.detail.orderInfo.overMileageFee
                ? `￥${props.detail.orderInfo.overMileageFee}/公里`
                : '-'
            }}
          </div>
        </div>
        <div class="item">
          <div class="item-title">保障服务:</div>
          <div class="item-content">
            <div class="service-tag" v-if="props.detail.orderInfo.safeguardServiceList.includes(0)">
              7x24小时道路救援
            </div>
            <div class="service-tag" v-if="props.detail.orderInfo.safeguardServiceList.includes(1)">
              免费送车上门
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="title">订单信息</div>
    <div class="container">
      <div class="left">
        <div class="item">
          <div class="item-title">订单编号:</div>
          <div class="item-content">{{ props.detail.orderInfo.orderNum || '-' }}</div>
        </div>
        <div class="item">
          <div class="item-title">提车门店:</div>
          <div class="item-content">
            {{ props.detail.companyRespVo && props.detail.companyRespVo.shopName || '-' }}
            <span
              v-if="props.orderStatus === 3"
              style="padding-left: 5px; color: #3446aa; text-decoration: underline; cursor: pointer"
              @click="openDistributionDialog"
            >
              重新分配
            </span>
          </div>
        </div>
        <div class="item">
          <div class="item-title">订阅开始时间:</div>
          <div class="item-content">{{ props.detail.orderInfo.startDate || '-' }}</div>
        </div>
      </div>
      <div class="right">
        <div class="item">
          <div class="item-title">订单来源:</div>
          <div class="item-content">
            <div v-if="props.detail.orderInfo.orderSource === 0">客户自购</div>
            <div v-else-if="props.detail.companyRespVo">
              {{ COMPANY_TYPE[props.detail.companyRespVo.companyType] }}-{{
                props.detail.companyRespVo.shopName
              }}
            </div>
          </div>
        </div>
        <div class="item">
          <div class="item-title">提车日期:</div>
          <div class="item-content">{{ props.detail.orderInfo.carDeliveryTime || '-' }}</div>
        </div>
        <div class="item">
          <div class="item-title">订阅结束时间:</div>
          <div class="item-content">{{ props.detail.orderInfo.endDate || '-' }}</div>
        </div>
      </div>
    </div>

    <DistributionDialog
      v-if="showDistributionDialog"
      :show="showDistributionDialog"
      :orderId="props.detail.orderInfo.id"
      :imageUrl="props.detail.carInfoRespVo.imageUrl"
      :carBrand="props.detail.carInfoRespVo.carBrand"
      :carType="props.detail.carInfoRespVo.carType"
      :carTypeYear="props.detail.carInfoRespVo.carTypeYear"
      :carTypeYearProduct="props.detail.carInfoRespVo.carTypeYearProduct"
      :orderNum="props.detail.carInfoRespVo.orderNum"
      :name="props.detail.orderInfo.name"
      :carDeliveryId="props.detail.companyRespVo.id"
      @close="handleCloseDistributionDialog"
      @save="saveDistribution"
    />
  </div>
</template>

<script setup lang="ts">
import type { IOrderDetail } from '@/types'
import { ref } from 'vue'
import { formatThousandNumber } from '@/utils/util'
import { USE_PLATE, COMPANY_TYPE, PAYMENT_TYPE } from '@/utils/constant'
import DistributionDialog from './DistributionDialog.vue'

interface IProps {
  detail: IOrderDetail
  orderStatus: number
}

const props = defineProps<IProps>()
const emits = defineEmits(['update'])

const formatNumber = (num: number | null, unit: string, defaultValue: string | number = '-') => {
  if (num || num == 0) {
    return formatThousandNumber(num) + unit
  }
  return defaultValue
}

const showDistributionDialog = ref<boolean>(false)

const openDistributionDialog = () => {
  showDistributionDialog.value = true
}

const handleCloseDistributionDialog = () => {
  showDistributionDialog.value = false
}

const saveDistribution = () => {
  handleCloseDistributionDialog()
  emits('update')
}
</script>

<style lang="scss" scoped>
.wrap {
  padding-left: 100px;
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
        .service-tag {
          padding: 0 4px;
          margin-right: 16px;
          border: 1px solid #e5e6eb;
          border-radius: 2px;
        }
      }
    }
  }
}
</style>
