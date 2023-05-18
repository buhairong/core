<template>
  <div class="wrap">
    <div style="width: 100%">
      <div class="content-tabs">
        <div
          v-for="tab in tabs"
          :key="tab.id"
          class="tab"
          :class="{ active: tab.id === activeTab }"
          @click="changeTab(tab.id)"
        >
          {{ tab.text }}
        </div>
      </div>

      <div class="content-tabs-container" v-if="detail">
        <BasicInfo v-show="activeTab === 1" :detail="detail" :type="type" />

        <StaffInfo v-show="activeTab === 2" :detail="detail" :type="type" />

        <AccountInfo v-show="activeTab === 3" :detail="detail" :type="type" />

        <QualityInfo v-show="activeTab === 4" :detail="detail" :type="type" @update="query" />
      </div>
    </div>
    <back-button />
  </div>
</template>

<script setup lang="ts">
import type { IMerchantDetail } from '@/types'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { getCompanyDetail } from '@/api/merchant/merchant'
import BasicInfo from './components/BasicInfo.vue'
import StaffInfo from './components/StaffInfo.vue'
import AccountInfo from './components/AccountInfo.vue'
import QualityInfo from './components/QualityInfo.vue'

const route = useRoute()

const companyId = (route.query as any).companyId - 0
const type = (route.query as any).type - 0

const detail = ref<IMerchantDetail>()
const activeTab = ref(1)
const tabs = [
  { id: 1, text: '基本信息' },
  { id: 2, text: '员工信息' },
  { id: 3, text: '收款信息' },
  { id: 4, text: '精品/装潢' }
]

const changeTab = (tab: number) => {
  activeTab.value = tab
}

const query = () => {
  const params = {
    companyId
  }

  getCompanyDetail(params).then((data: IMerchantDetail) => {
    detail.value = data
  })
}

query()
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>
