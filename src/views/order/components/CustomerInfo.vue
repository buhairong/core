<template>
  <div class="wrap">
    <div class="title">签约主体</div>
    <div class="container container1">
      <div class="item" v-if="props.detail.principal.orderType === 2">
        <div class="item-title">企业名称:</div>
        <div class="item-content">{{ props.detail.principal.companyName }}</div>
      </div>
      <div class="item" v-if="props.detail.principal.orderType === 2">
        <div class="item-title">企业信用代码:</div>
        <div class="item-content">{{ props.detail.principal.corporationTaxNumber }}</div>
      </div>
      <div class="item">
        <div class="item-title">用户姓名:</div>
        <div class="item-content">{{ props.detail.principal.userName }}</div>
      </div>
      <div class="item">
        <div class="item-title">联系电话:</div>
        <div class="item-content">{{ props.detail.principal.mobile }}</div>
      </div>
      <div class="item">
        <div class="item-title">身份信息:</div>
        <div class="item-content">{{ props.detail.principal.userIdNum }}</div>
      </div>
    </div>

    <div class="container container2">
      <div class="left">
        <div class="item">
          <div class="item-title">身份证照片:</div>
          <div class="item-content">
            <div class="img1-wrap">
              <div class="img-box">
                <el-image
                  style="width: 160px"
                  :src="props.detail.idCardAndDriverImageRespVo.idcardUrl"
                  :preview-src-list="[props.detail.idCardAndDriverImageRespVo.idcardUrl]"
                >
                </el-image>
              </div>
              <div class="img-title">身份证人像面</div>
            </div>
            <div class="img1-wrap">
              <div class="img-box">
                <el-image
                  style="width: 160px"
                  :src="props.detail.idCardAndDriverImageRespVo.idcardBackUrl"
                  :preview-src-list="[props.detail.idCardAndDriverImageRespVo.idcardBackUrl]"
                >
                </el-image>
              </div>
              <div class="img-title">身份证国徽面</div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="item">
          <div class="item-title">驾驶证照片:</div>
          <div class="item-content">
            <div class="img1-wrap">
              <div class="img-box">
                <el-image
                  style="width: 160px"
                  :src="props.detail.idCardAndDriverImageRespVo.driverLicenseUrl"
                  :preview-src-list="[props.detail.idCardAndDriverImageRespVo.driverLicenseUrl]"
                >
                </el-image>
              </div>
              <div class="img1-title">驾驶证主页</div>
            </div>
            <div class="img1-wrap">
              <div class="img-box">
                <el-image
                  style="width: 160px"
                  :src="props.detail.idCardAndDriverImageRespVo.driverLicenseSecondSheetUrl"
                  :preview-src-list="[
                    props.detail.idCardAndDriverImageRespVo.driverLicenseSecondSheetUrl
                  ]"
                >
                </el-image>
              </div>
              <div class="img-title">驾驶证副页</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="title">紧急联系人</div>
    <div class="container container1">
      <div class="left">
        <div class="item">
          <div class="item-title">紧急联系人姓名:</div>
          <div class="item-content">{{ props.detail.orderInfo.emergencyContactName || '-' }}</div>
        </div>
      </div>
      <div class="right">
        <div class="item">
          <div class="item-title">紧急联系人联系方式:</div>
          <div class="item-content">{{ props.detail.orderInfo.emergencyContactPhone || '-' }}</div>
        </div>
      </div>
    </div>

    <RiskQuery
      class="risk-query"
      :orderId="detail.orderInfo.id"
      :record="detail.riskQueryList.personalQuery"
      :customType="1"
      operator="review"
    />

    <template v-if="props.detail.certificationList && props.detail.certificationList.length">
      <div class="title">补充材料</div>
      <div class="container">
        <div class="item" v-for="(item, index) in props.detail.certificationList" :key="index">
          <div class="item-title">{{ item.certificationName }}:</div>
          <div class="item-content">
            <div class="img-wrap" v-for="(img, index1) in item.imageList" :key="index1">
              <el-image
                style="width: 100%; height: 100%"
                :src="img"
                fit="cover"
                :preview-src-list="item.imageList"
                :initial-index="index1"
              ></el-image>
            </div>
          </div>
        </div>
      </div>
    </template>

    <FaceAudit :faceAuditRecord="detail.faceAuditRecord" :businessNode="30" />
  </div>
</template>

<script setup lang="ts">
import type { IOrderDetail } from '@/types'
import RiskQuery from '@/views/risk/components/RiskQuery.vue'
import FaceAudit from './FaceAudit.vue'

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

        .img1-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          &:first-child {
            margin-right: 32px;
          }
          .img-box {
            margin-bottom: 12px;
            width: 160px;
            height: 100px;
            overflow: hidden;
            .el-image {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
          .img-title {
            height: 23px;
            font-family: PingFangSC-Regular;
            font-size: 12px;
            line-height: 23px;
            color: #3d3d3d;
          }
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

  .container2 {
    display: flex;
    .item {
      .item-content {
        width: 365px;
        display: flex;
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
