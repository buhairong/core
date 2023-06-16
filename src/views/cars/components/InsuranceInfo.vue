<template>
  <div class="wrap">
    <div class="insurance-wrap" v-for="(item, index) in props.insuranceList" :key="index">
      <div class="title">{{ item.insuranceType === 0 ? '交强险' : '商业险' }}</div>
      <div class="container">
        <div class="img-wrap">
          <div class="img">
            <el-image
              style="width: 100%; height: 100%"
              :src="item.insurancePicsList[0].url"
              fit="cover"
              :preview-src-list="getPreviewList(item.insurancePicsList)"
            ></el-image>
            <div class="tag">
              <el-image style="width: 12px; height: 12px" :src="imgIcon"></el-image>
              {{ item.insurancePicsList.length }}
            </div>
          </div>
        </div>

        <div class="item">
          <div class="item-title">投保公司:</div>
          <div class="item-content">
            {{ item.insuranceCompanyName }}
          </div>
        </div>

        <div class="item">
          <div class="item-title">保险单号:</div>
          <div class="item-content">
            {{ item.insuranceNo }}
          </div>
        </div>

        <div class="item" v-if="item.insuranceType === 1">
          <div class="item-title">三者金额:</div>
          <div class="item-content">
            {{ item.amountOfThree ? `￥${formatThousandNumber(item.amountOfThree)}` : '-' }}
          </div>
        </div>

        <div class="item">
          <div class="item-title">有效日期:</div>
          <div class="item-content">
            {{ item.expireDate }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IInsurance, IInsurancePics } from '@/types'
import { formatThousandNumber } from '@/utils/util'
import imgIcon from '@/assets/car/img-icon.png'

interface IProps {
  insuranceList: IInsurance[]
}

const props = defineProps<IProps>()

const getPreviewList = (insurancePicsList: IInsurancePics[]) => {
  const imgList: string[] = []
  insurancePicsList.forEach((item) => {
    imgList.push(item.url)
  })

  return imgList
}
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  justify-content: center;
  .insurance-wrap {
    margin-right: 100px;
    .title {
      margin-bottom: 20px;
      height: 22px;
      font-family: PingFangSC-Regular;
      font-size: 16px;
      line-height: 22px;
      color: #1d2129;
    }

    .container {
      padding-left: 60px;
      .img {
        width: 146px;
        height: 206px;
        margin-bottom: 20px;
        position: relative;
        .tag {
          padding: 0 8px;
          width: 42px;
          height: 18px;
          background: rgba(0, 0, 0, 0.6);
          border-radius: 9px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #ffffff;
          font-size: 11px;
          position: absolute;
          bottom: 10px;
          right: 10px;
        }
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
          font-family: PingFang-SC-Medium;
          font-size: 14px;
          line-height: 21px;
          color: #1d2129;
        }
      }
    }
  }
}
</style>
