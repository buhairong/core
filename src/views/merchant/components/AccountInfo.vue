<template>
  <div class="container">
    <div class="item">
      <div class="item-title">开户名称:</div>
      <div class="item-content">{{ props.detail.company.companyName || '-' }}</div>
    </div>

    <div class="item">
      <div class="item-title">开户银行:</div>
      <div class="item-content">{{ props.detail.company.bankName || '-' }}</div>
    </div>

    <div class="item">
      <div class="item-title">银行账号:</div>
      <div class="item-content">{{ props.detail.company.bankAccount || '-' }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IMerchantDetail } from '@/types'

interface IProps {
  detail: IMerchantDetail
}

const props = defineProps<IProps>()
</script>

<style lang="scss" scoped>
.container {
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
      font-family: PingFang-SC-Medium;
      font-size: 14px;
      line-height: 21px;
      color: #1d2129;
    }
  }
}
</style>
