<template>
  <div class="wrap" v-if="detail">
    <div>
      <div class="title">基本信息</div>
      <div class="container">
        <div class="left">
          <div class="item">
            <div class="item-title">企业名称:</div>
            <div class="item-content">{{ detail.company.companyName || '-' }}</div>
          </div>

          <div class="item">
            <div class="item-title">商户名称:</div>
            <div class="item-content">{{ detail.company.shopName || '-' }}</div>
          </div>

          <div class="item" v-if="type == 1">
            <div class="item-title">所在城市:</div>
            <div class="item-content">{{ detail.company.cityName || '-' }}</div>
          </div>

          <div class="item" v-if="type === 1">
            <div class="item-title">销售品牌:</div>
            <div class="item-content">
              <div
                class="brand-list"
                v-if="detail.company.carBrandNameList && detail.company.carBrandNameList.length"
              >
                {{ detail.company.carBrandNameList.join('、') }}
              </div>
              <div v-else>-</div>
            </div>
          </div>

          <div class="item">
            <div class="item-title">营业执照:</div>
            <div class="item-content">
              <el-image
                v-if="detail.company.businessLicense"
                class="preview-img"
                :src="detail.company.businessLicense"
                :preview-src-list="[detail.company.businessLicense]"
              >
              </el-image>
              <div v-else>-</div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="item">
            <div class="item-title">统一社会信用代码:</div>
            <div class="item-content">{{ detail.company.corporationTaxNumber || '-' }}</div>
          </div>

          <div class="item" v-if="type == 1">
            <div class="item-title">商户角色:</div>
            <div class="item-content">
              {{ COMPANY_TYPE[type] }}-{{ COMPANY_ROLE[detail.company.chooseRole] }}
            </div>
          </div>

          <div class="item">
            <div class="item-title">详细地址:</div>
            <div class="item-content">{{ detail.company.address || '-' }}</div>
          </div>

          <div class="item">
            <div class="item-title">商户联系方式:</div>
            <div class="item-content">{{ detail.company.contactMobile || '-' }}</div>
          </div>

          <div class="item" v-if="type == 1">
            <div class="item-title">资产持有公司:</div>
            <div class="item-content">
              {{ ASSET_COMPANY[detail.company.isFinancial] }}
            </div>
          </div>

          <div class="item" v-if="type == 1">
            <div class="item-title">商户照片:</div>
            <div class="item-content">
              <el-image
                v-if="detail.company.shopHeadPic"
                class="preview-img"
                :src="detail.company.shopHeadPic"
                :preview-src-list="[detail.company.shopHeadPic]"
              >
              </el-image>
              <div v-else>-</div>
            </div>
          </div>
        </div>
      </div>

      <div class="title">管理员信息</div>
      <div class="container">
        <div class="left">
          <div class="item">
            <div class="item-title">超级管理员名称:</div>
            <div class="item-content">{{ detail.managerName || '-' }}</div>
          </div>
        </div>
        <div class="right">
          <div class="item">
            <div class="item-title">管理员联系方式:</div>
            <div class="item-content">{{ detail.managerMobile || '-' }}</div>
          </div>
        </div>
      </div>

      <div class="title">收款信息</div>
      <div class="container">
        <div class="left">
          <div class="item">
            <div class="item-title">开户名称:</div>
            <div class="item-content">{{ detail.company.companyName || '-' }}</div>
          </div>

          <div class="item">
            <div class="item-title">开户银行:</div>
            <div class="item-content">{{ detail.company.bankName || '-' }}</div>
          </div>
        </div>
        <div class="right">
          <div class="item">
            <div class="item-title">银行账号:</div>
            <div class="item-content">{{ detail.company.bankAccount || '-' }}</div>
          </div>
        </div>
      </div>
    </div>
    <back-button />
  </div>
</template>

<script setup lang="ts">
import type { IMerchantDetail } from '@/types'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { getCompanyDetail } from '@/api/merchant/merchant'
import { COMPANY_TYPE, COMPANY_ROLE, ASSET_COMPANY } from '@/utils/constant'

const route = useRoute()

const companyId = (route.query as any).companyId - 0
const type = (route.query as any).type - 0

const detail = ref<IMerchantDetail>()

const params = {
  companyId
}

getCompanyDetail(params).then((data: IMerchantDetail) => {
  detail.value = data
})
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  .title {
    margin: 24px 0;
  }
  .container {
    padding-left: 50px;
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
}
</style>
