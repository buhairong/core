<template>
  <div class="container">
    <div class="left">
      <div class="item">
        <div class="item-title">企业名称:</div>
        <div class="item-content">{{ props.detail.company.companyName || '-' }}</div>
      </div>

      <div class="item">
        <div class="item-title">商户名称:</div>
        <div class="item-content">{{ props.detail.company.shopName || '-' }}</div>
      </div>

      <div class="item" v-if="type == 1">
        <div class="item-title">所在城市:</div>
        <div class="item-content">{{ props.detail.company.cityName || '-' }}</div>
      </div>

      <div class="item" v-if="type == 1">
        <div class="item-title">销售品牌:</div>
        <div class="item-content">
          <div
            class="brand-list"
            v-if="
              props.detail.company.carBrandNameList && props.detail.company.carBrandNameList.length
            "
          >
            {{ props.detail.company.carBrandNameList.join('、') }}
          </div>
          <div v-else>-</div>
        </div>
      </div>

      <div class="item">
        <div class="item-title">营业执照:</div>
        <div class="item-content">
          <el-image
            v-if="props.detail.company.businessLicense"
            class="preview-img"
            :src="props.detail.company.businessLicense"
            :preview-src-list="[props.detail.company.businessLicense]"
          >
          </el-image>
          <div v-else>-</div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="item">
        <div class="item-title">统一社会信用代码:</div>
        <div class="item-content">{{ props.detail.company.corporationTaxNumber || '-' }}</div>
      </div>

      <div class="item" v-if="type == 1">
        <div class="item-title">商户角色:</div>
        <div class="item-content">
          {{ COMPANY_TYPE[props.type] }}-{{ COMPANY_ROLE[props.detail.company.chooseRole] }}
        </div>
      </div>

      <div class="item">
        <div class="item-title">详细地址:</div>
        <div class="item-content">{{ props.detail.company.address || '-' }}</div>
      </div>

      <div class="item">
        <div class="item-title">商户联系方式:</div>
        <div class="item-content">{{ props.detail.company.contactMobile || '-' }}</div>
      </div>

      <div class="item" v-if="type == 1">
        <div class="item-title">资产持有公司:</div>
        <div class="item-content">
          {{ ASSET_COMPANY[props.detail.company.isFinancial] }}
        </div>
      </div>

      <div class="item" v-if="type == 1">
        <div class="item-title">商户照片:</div>
        <div class="item-content">
          <el-image
            v-if="props.detail.company.shopHeadPic"
            class="preview-img"
            :src="props.detail.company.shopHeadPic"
            :preview-src-list="[props.detail.company.shopHeadPic]"
          >
          </el-image>
          <div v-else>-</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IMerchantDetail } from '@/types'
import { ASSET_COMPANY, COMPANY_TYPE, COMPANY_ROLE } from '@/utils/constant'

interface IProps {
  detail: IMerchantDetail
  type: number
}

const props = defineProps<IProps>()
</script>

<style lang="scss" scoped>
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
      .preview-img {
        width: 95px;
      }
    }
  }
}
</style>
