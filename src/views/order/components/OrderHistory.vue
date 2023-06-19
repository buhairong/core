<template>
  <div class="wrap">
    <div class="title">订单历史</div>
    <div class="container">
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in props.detail"
          :key="index"
          :timestamp="activity.time"
        >
          {{ activity.content }}
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IUserCarSubscribeLog } from '@/types'

interface IProps {
  detail: IUserCarSubscribeLog[]
}

const props = defineProps<IProps>()
</script>

<style lang="scss" scoped>
.wrap {
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
  }
}
</style>
