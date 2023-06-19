<template>
  <div>
    <div class="content-tabs">
      <div
        v-for="tab in tabs"
        :key="tab.id"
        class="tab"
        :class="{ active: tab.id == activeTab }"
        @click="changeTab(tab.id)"
      >
        {{ tab.text }}
      </div>
    </div>

    <div class="container">
      <div class="detail-wrap" v-if="detail">
        <div class="comps">
          <OrderInfo
            v-show="activeTab === 1"
            :detail="detail"
            :orderStatus="orderStatus"
            @update="getOrderDetail"
          />

          <CustomerInfo v-show="activeTab === 2" :detail="detail" />

          <CarInfo v-show="activeTab === 3" :detail="detail" />

          <ContractInfo
            v-show="activeTab === 4"
            :detail="detail"
            :orderId="orderId"
            @update="getOrderDetail"
          />

          <PayMentInfo v-show="activeTab === 5" :detail="detail.paiedInfo" />

          <VehicleInfo v-show="activeTab === 6" :detail="detail" />

          <OrderHistory v-show="activeTab === 7" :detail="detail.userCarSubscribeLog" />
        </div>
      </div>
      <back-button />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IOrderDetail } from '@/types'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { selectCarDetailInfo } from '@/api/order/order'
import OrderInfo from './components/OrderInfo.vue'
import CustomerInfo from './components/CustomerInfo.vue'
import CarInfo from './components/CarInfo.vue'
import ContractInfo from './components/ContractInfo.vue'
import PayMentInfo from './components/PayMentInfo.vue'
import VehicleInfo from '@/views/cars/components/VehicleInfo.vue'
import OrderHistory from './components/OrderHistory.vue'

const route = useRoute()
const orderId = (route.query as any).orderId - 0
const orderStatus = (route.query as any).orderStatus - 0

const tabs = [
  { id: 1, text: '订阅信息' },
  { id: 2, text: '用户信息' },
  { id: 3, text: '车辆信息' },
  { id: 4, text: '合同信息' },
  { id: 5, text: '付款信息' },
  { id: 6, text: '交车信息' },
  { id: 7, text: '订单历史' }
]
const activeTab = ref<number>(1)
const changeTab = (tab: number) => {
  activeTab.value = tab
}

const detail = ref<IOrderDetail>()
const getOrderDetail = () => {
  selectCarDetailInfo({ orderId }).then((res) => {
    detail.value = res
    if (
      detail.value.riskQueryList &&
      detail.value.riskQueryList.personalQuery &&
      detail.value.riskQueryList.personalQuery.length
    ) {
      let str = '1'

      let stautsRes = detail.value.riskQueryList.personalQuery.some((item) => item.status === '0')
      if (stautsRes) {
        str = '4'
      }

      stautsRes = detail.value.riskQueryList.personalQuery.some((item) => item.status === '2')
      if (stautsRes) {
        str = '5'
      }

      let ruleResultRes = detail.value.riskQueryList.personalQuery.some(
        (item) => item.ruleResult === '3' || !item.ruleResult
      )
      if (ruleResultRes) {
        str = '3'
      }

      ruleResultRes = detail.value.riskQueryList.personalQuery.some(
        (item) => item.ruleResult === '2'
      )
      if (ruleResultRes) {
        str = '2'
      }

      detail.value.riskQueryList.personalQuery.push({
        apiName: '查询结果',
        queryStatus: str
      })
    }
  })
}
getOrderDetail()
</script>

<style lang="scss" scoped>
.content-tabs {
  position: absolute;
  top: 20px;
  left: 40px;
  z-index: 100;
}
.content {
  display: flex;
  flex-direction: column;
  .container {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .detail-wrap {
      margin: 40px 0;
      flex: 1;
    }
  }
}
</style>
