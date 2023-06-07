<template>
  <el-dialog
    title="分配订单"
    v-model="showDistributionDialog"
    width="480px"
    :before-close="handleCloseDistributionDialog"
  >
    <div class="car-info">
      <el-image
        style="width: 108px; height: 80px"
        :src="props.currentOrder.imageUrl"
        fit="cover"
      ></el-image>
      {{ props.currentOrder.carBrand }}·{{ props.currentOrder.carType }}
      {{ props.currentOrder.carTypeYear }} {{ props.currentOrder.carTypeYearProduct }}
    </div>

    <div class="item">
      <div class="item-title">订单编号:</div>
      <div class="item-content">
        {{ props.currentOrder.orderNum }}
      </div>
    </div>

    <div class="item">
      <div class="item-title">用户信息:</div>
      <div class="item-content">
        {{ props.currentOrder.name }}
      </div>
    </div>

    <div class="item">
      <div class="item-title">分 配 至:</div>
      <div class="item-content">
        <c-select
          v-model="carDeliveryId"
          :options="carDeliveryList"
          placeholder="请选择交车点"
          :style="{
            width: '200px'
          }"
          :showAllValue="false"
          labelKey="shopName"
          valueKey="id"
        />
      </div>
    </div>

    <template #footer>
      <div class="dialog-btn-wrap">
        <div class="btn" @click="handleCloseDistributionDialog">取消</div>
        <div class="btn save-btn" @click="saveDistribution">确认分配</div>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import type { IOrderRecord, IDeliveryRecord } from '@/types'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { selectCarDeliveryListOfOrder, bindCarDeliveryToOrder } from '@/api/order/order'

interface IProps {
  show: boolean
  currentOrder: IOrderRecord
}

const props = defineProps<IProps>()
const emits = defineEmits(['close', 'save'])

const showDistributionDialog = ref<boolean>(props.show)
const carDeliveryId = ref<number | null>(props.currentOrder.carDeliveryId)
const carDeliveryList = ref<IDeliveryRecord[]>([])

selectCarDeliveryListOfOrder({
  orderId: props.currentOrder.id
}).then((res) => {
  carDeliveryList.value = res
})

const handleCloseDistributionDialog = () => {
  emits('close')
}

const saveDistribution = () => {
  if (!carDeliveryId.value) {
    ElMessage.error('请选择交车点')
    return
  }

  const data = {
    carDeliveryId: carDeliveryId.value as number,
    orderId: props.currentOrder.id as number
  }

  bindCarDeliveryToOrder(data).then(() => {
    ElMessage.success('保存成功')
    emits('save')
  })
}
</script>

<style lang="scss" scoped>
.car-info {
  display: flex;
  align-items: center;
  font-family: PingFang-SC-Medium;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.9);
  .car-brand {
    height: 22px;
    line-height: 22px;
    font-family: PingFang-SC-Medium;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.9);
  }
  .car-plate {
    margin-top: 8px;
    width: 80px;
    height: 24px;
    border-radius: 2px;
    background: #3446aa;
    font-size: 14px;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.item {
  margin-top: 16px;
  display: flex;
  .item-title {
    margin-right: 8px;
    width: 84px;
    height: 32px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    line-height: 32px;
    color: #4e5969;
    text-align: right;
  }
  .item-content {
    height: 32px;
    font-family: PingFang-SC-Medium;
    font-size: 14px;
    line-height: 32px;
    color: #1d2129;
  }
}
</style>
