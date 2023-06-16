<template>
  <div class="wrap">
    <div class="car-info">
      <el-image
        style="width: 134px; height: 100px"
        :src="props.carInfoRespVo.imageUrl"
        fit="cover"
      ></el-image>
      <div>
        <div class="car-brand">
          {{ props.carInfoRespVo.carBrand }}·{{ props.carInfoRespVo.carType }}
          {{ props.carInfoRespVo.carTypeYear }} {{ props.carInfoRespVo.carTypeYearProduct }}
        </div>
      </div>
    </div>

    <div class="container">
      <div class="left">
        <div class="item">
          <div class="item-title">车况信息:</div>
          <div class="item-content">
            {{ props.carInfoRespVo.newOrOld === 1 ? '全新车' : '二手车' }}
          </div>
        </div>

        <div class="item">
          <div class="item-title">车牌号:</div>
          <div class="item-content">{{ props.carInfoRespVo.carPlateNum || '-' }}</div>
        </div>

        <div class="item">
          <div class="item-title">车架号:</div>
          <div class="item-content">{{ props.carInfoRespVo.carVin || '-' }}</div>
        </div>

        <div class="item">
          <div class="item-title">发动机号:</div>
          <div class="item-content">{{ props.carInfoRespVo.carEngineNum || '-' }}</div>
        </div>

        <div class="item">
          <div class="item-title">实表里程数:</div>
          <div class="item-content">
            {{
              props.carInfoRespVo.mileage || props.carInfoRespVo.mileage === 0
                ? `${props.carInfoRespVo.mileage}公里`
                : '-'
            }}
          </div>
        </div>

        <div class="item">
          <div class="item-title">车辆注册日期:</div>
          <div class="item-content">{{ props.carInfoRespVo.registerDate || '-' }}</div>
        </div>

        <div class="item">
          <div class="item-title">车辆状态:</div>
          <div class="item-content">{{ getCarStatus(props.carInfoRespVo.status) }}</div>
        </div>
      </div>

      <div class="right">
        <div class="item">
          <div class="item-title">
            实时{{ props.carInfoRespVo.carEnergyType === 1 ? '油量' : '电量' }}:
          </div>
          <div class="item-content">{{ getTankSize(props.carInfoRespVo.tankSize) }}</div>
        </div>

        <div class="item">
          <div class="item-title">外观颜色:</div>
          <div class="item-content">{{ props.carInfoRespVo.carColor || '-' }}</div>
        </div>

        <div class="item">
          <div class="item-title">上牌日期:</div>
          <div class="item-content">{{ props.carInfoRespVo.plateDate || '-' }}</div>
        </div>

        <div class="item">
          <div class="item-title">车辆行驶证:</div>
          <div class="item-content">
            <el-image
              v-if="props.carInfoRespVo.travelLicenseUrl"
              style="width: 218px; height: 135px"
              :src="props.carInfoRespVo.travelLicenseUrl"
              fit="cover"
              :preview-src-list="[props.carInfoRespVo.travelLicenseUrl]"
            ></el-image>
            <div v-else>-</div>
          </div>
        </div>

        <div class="item">
          <div class="item-title">车辆增配项:</div>
          <div class="item-content">
            <div
              v-if="
                props.carInfoRespVo.otherConfigList && props.carInfoRespVo.otherConfigList.length
              "
            >
              <div
                v-for="(item, index) in props.carInfoRespVo.otherConfigList"
                :key="index"
                style="margin-bottom: 8px"
              >
                {{ item.detailName }} &nbsp;&nbsp; +￥{{ formatThousandNumber(item.money || 0) }}
              </div>
            </div>
            <div v-else>-</div>
          </div>
        </div>

        <div class="item">
          <div class="item-title">增配总额:</div>
          <div class="item-content">
            {{
              props.carInfoRespVo.otherConfigList && props.carInfoRespVo.otherConfigList.length
                ? `￥${getTotalConfig()}`
                : '-'
            }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ICarInfoRespVo } from '@/types'
import { formatThousandNumber } from '@/utils/util'
import { CAR_STATUS } from '@/utils/constant'

interface IProps {
  carInfoRespVo: ICarInfoRespVo
}

const props = defineProps<IProps>()

const getTotalConfig = () => {
  const total = props.carInfoRespVo.otherConfigList.reduce((sum, cur) => {
    return sum + (cur.money || 0)
  }, 0)

  return formatThousandNumber(total)
}

const getCarStatus = (status: number | null) => {
  let label = '-'
  if (status || status === 0) {
    const findItem = CAR_STATUS.find((item) => item.value === status)
    if (findItem) {
      label = findItem.label
    }
  }

  return label
}

const getTankSize = (tankSize: number | null) => {
  let label = '-'

  if (tankSize || tankSize === 0) {
    return tankSize + (props.carInfoRespVo.carEnergyType === 1 ? '/16' : '%')
  }

  return label
}
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  .car-info {
    display: flex;
    align-items: center;
    .car-brand {
      height: 24px;
      font-family: PingFang-SC-Medium;
      font-size: 16px;
      line-height: 24px;
      color: #1d2129;
    }
    .price {
      margin-top: 4px;
      height: 22px;
      font-family: PingFang-SC-Medium;
      font-size: 14px;
      line-height: 22px;
      color: #86909c;
    }
  }

  .container {
    margin-top: 24px;
    display: flex;
    .left {
      margin-right: 100px;
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
        width: 95px;
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
}
</style>
