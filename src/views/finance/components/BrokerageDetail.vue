<template>
  <div class="wrap">
    <div class="title">查看详情</div>

    <div class="top">
      <div class="container">
        <div class="left">
          <div class="item">
            <div class="item-title">收款人：</div>
            <div class="item-content">{{ name }}</div>
          </div>

          <div class="item">
            <div class="item-title">收款人银行卡号：</div>
            <div class="item-content">{{ bankAccountId }}</div>
          </div>

          <div class="item">
            <div class="item-title">反佣金额：</div>
            <div class="item-content">{{ formatThousandNumber(money) }}</div>
          </div>

          <div class="item">
            <div class="item-title">申请时间：</div>
            <div class="item-content">{{ createTime }}</div>
          </div>

          <div class="item">
            <div class="item-title">完成时间：</div>
            <div class="item-content">{{ updateTime || '-' }}</div>
          </div>
        </div>
        <div class="right">
          <div class="item">
            <div class="item-title">银行预留手机号：</div>
            <div class="item-content">{{ bankMobile }}</div>
          </div>

          <div class="item">
            <div class="item-title">身份证号：</div>
            <div class="item-content">{{ idCard }}</div>
          </div>

          <div class="item">
            <div class="item-title">银行：</div>
            <div class="item-content">{{ bankName }}</div>
          </div>

          <div class="item">
            <div class="item-title">状态：</div>
            <div class="item-content">{{ statusStr }}</div>
          </div>

          <div class="item">
            <div class="item-title">备注：</div>
            <div class="item-content">{{ remark || '-' }}</div>
          </div>
        </div>
      </div>

      <back-button />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { formatThousandNumber } from '@/utils/util'

const route = useRoute()

const type = (route.query as any).type - 0
const bankAccountId = (route.query as any).bankAccountId
const bankMobile = (route.query as any).bankMobile
const bankName = (route.query as any).bankName
const createTime = (route.query as any).createTime
const idCard = (route.query as any).idCard
const money = (route.query as any).money - 0
const name = (route.query as any).name
const remark = (route.query as any).remark
const statusStr = (route.query as any).statusStr
const updateTime = (route.query as any).updateTime
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  flex-direction: column;
  .title {
    margin-bottom: 40px;
    height: 22px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    line-height: 22px;
    color: #1d2129;
  }
  .top {
    flex: 1;
    height: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .container {
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
    }
  }
}
</style>
