<template>
  <div class="wrap">
    <CarInfo class="car-info" :carInfoRespVo="props.detail.carInfoRespVo" />

    <div class="title">车辆证照信息</div>
    <div class="container">
      <div
        class="item delivery-car-pics-item"
        v-for="(item, index) in props.detail.carCertificateImage"
        :key="index"
      >
        <div class="item-title">{{ CAR_CERTIFICATE[item.type] }}:</div>
        <div class="item-content">
          <el-image
            style="width: 100px"
            :src="item.imageUrl"
            :preview-src-list="[item.imageUrl]"
          ></el-image>
        </div>
      </div>
    </div>

    <div class="title">保险信息</div>
    <InsuranceInfo class="insurance-info" :insuranceList="props.detail.insuranceList" />
  </div>
</template>

<script setup lang="ts">
import type { IOrderDetail } from '@/types'
import CarInfo from '@/views/cars/components/CarInfo.vue'
import InsuranceInfo from '@/views/cars/components/InsuranceInfo.vue'
import { CAR_CERTIFICATE } from '@/utils/constant'

interface IProps {
  detail: IOrderDetail
}

const props = defineProps<IProps>()
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
        width: 400px;
        display: flex;
        flex-wrap: wrap;
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        line-height: 21px;
        color: #1d2129;
        .img-wrap {
          width: 102px;
          height: 142px;
          margin-right: 22px;
          margin-bottom: 16px;
        }
      }
    }
    .delivery-car-pics-item {
      width: 100%;
      justify-content: space-between;
      .item-title {
        width: 160px;
      }
    }
  }
}

.car-info,
.insurance-info {
  padding: 0;
}

.insurance-info {
  justify-content: space-around;
}
</style>
