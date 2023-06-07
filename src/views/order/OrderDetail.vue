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
      <div class="detail-wrap">aaa</div>
      <back-button />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

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

const detail = ref(null)
</script>

<style lang="scss" scoped>
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
