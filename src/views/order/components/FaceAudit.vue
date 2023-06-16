<template>
  <div class="face-wrap">
    <div class="title">活体信息</div>
    <div class="container">
      <div
        class="identity"
        v-for="item in props.faceAuditRecord.filter((node) => node.businessNode === businessNode)"
        :key="item.id"
      >
        <div class="left">
          <div class="item">
            <div class="item-title">信息来源:</div>
            <div class="item-content">{{ IDENTITY_RESOURCE[item.resource] }}</div>
          </div>
          <div class="item">
            <div class="item-title">业务节点:</div>
            <div class="item-content">{{ IDENTITY_BUSINESS_NODE[item.businessNode] }}</div>
          </div>
          <div class="item">
            <div class="item-title">认证地址:</div>
            <div class="item-content">{{ item.address || '-' }}</div>
          </div>
          <div class="item">
            <div class="item-title">认证时间:</div>
            <div class="item-content">{{ item.createTime || '-' }}</div>
          </div>
        </div>
        <div class="right">
          <div class="item">
            <div class="item-title">认证照片:</div>
            <div class="item-content">
              <el-image
                style="width: 117px"
                :src="item.imageUrl"
                :preview-src-list="[item.imageUrl]"
              ></el-image>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IFaceAudit } from '@/types'
import { IDENTITY_BUSINESS_NODE, IDENTITY_RESOURCE } from '@/utils/constant'

interface IProps {
  faceAuditRecord: IFaceAudit[]
  businessNode: number
}

const props = defineProps<IProps>()
</script>

<style lang="scss" scoped>
.face-wrap {
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
  }

  .container1 {
    display: flex;
    .item {
      margin-right: 50px;
      .item-content {
        width: auto;
      }
    }
  }

  .identity {
    padding: 32px 0;
    width: 700px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #d8d8d8;
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
  .identity:last-child {
    border-bottom: none;
  }
}

.risk-query {
  padding: 0;
  :deep(.title) {
    margin: 24px 0;
    height: 22px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    line-height: 22px;
    color: #1d2129;
  }
}
</style>
