<template>
  <el-form ref="step1form" :model="props.params" :rules="rule" label-width="140px">
    <el-form-item label="角色选择" prop="chooseRole" v-if="type === 1">
      <el-radio-group v-model="params.chooseRole">
        <el-radio v-for="item in COMPANY_ROLE_LIST" :key="item.value" :label="item.value">
          {{ item.label }}
        </el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="资产持有公司" prop="isFinancial" v-if="type === 1">
      <el-radio-group v-model="params.isFinancial">
        <el-radio v-for="item in ASSET_COMPANY_LIST" :key="item.value" :label="item.value">
          {{ item.label }}
        </el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="所在城市" prop="cityId" v-if="type === 1">
      <c-select
        v-model="params.cityId"
        :options="cityList"
        :showAllValue="false"
        filterable
        labelKey="city"
        valueKey="id"
        placeholder="选择城市"
        @change="changeCity"
        :style="inputStyle"
      />
    </el-form-item>

    <el-form-item
      class="el-form-item_required"
      label="销售品牌"
      prop="carBrandIdList"
      v-if="type === 1 && params.chooseRole === 1"
    >
      <c-select
        v-model="params.carBrandIdList"
        :options="brandsList"
        :showAllValue="false"
        filterable
        multiple
        labelKey="brandName"
        valueKey="id"
        placeholder="选择车辆品牌"
        @change="changeCity"
        :style="inputStyle"
      />
    </el-form-item>

    <el-form-item label="企业名称" prop="companyName">
      <c-input
        v-model="params.companyName"
        placeholder="请输入企业名称"
        :input-style="inputStyle"
      />
    </el-form-item>

    <el-form-item label="营业执照" prop="businessLicense">
      <el-upload
        :action="UPLOAD_URL"
        :show-file-list="false"
        :accept="IMG_ACCEPT"
        :before-upload="beforeImgUpload"
        :on-success="(res: IUploadFile) => handleSuccess(1, res)"
      >
        <img v-if="params.businessLicense" :src="params.businessLicense" class="img" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
    </el-form-item>

    <el-form-item label="统一社会信用代码" prop="corporationTaxNumber">
      <c-input
        v-model="params.corporationTaxNumber"
        placeholder="自动识别营业执照、可修改"
        :input-style="inputStyle"
      />
    </el-form-item>

    <el-form-item label="商户名称" prop="shopName">
      <el-autocomplete
        v-model="params.shopName"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入商户名称"
        @select="handleSelect"
        :style="inputStyle"
      ></el-autocomplete>
    </el-form-item>

    <el-form-item label="详细地址">
      <div>
        {{ params.address ? params.address : '根据商户名称自动识别详细地址' }}
      </div>
    </el-form-item>

    <el-form-item label="商户联系电话" prop="contactMobile">
      <c-input
        v-model="params.contactMobile"
        placeholder="请输入商户联系电话"
        :input-style="inputStyle"
      />
    </el-form-item>

    <el-form-item label="商户照片" prop="shopHeadPic" v-if="type == 1">
      <div class="upload-wrap">
        <el-upload
          :action="UPLOAD_URL"
          :show-file-list="false"
          :accept="IMG_ACCEPT"
          :before-upload="beforeImgUpload"
          :on-success="(res: IUploadFile) => handleSuccess(2, res)"
        >
          <img v-if="params.shopHeadPic" :src="params.shopHeadPic" class="img" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
        <div class="upload-tip">门头照片</div>
      </div>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import type { ISetMerchant, IUploadFile, ICity, IBrand } from '@/types'
import { ref, watch } from 'vue'
import { getAllCity } from '@/api/merchant/merchant'
import { getCarBrand } from '@/api/car/car'
import { COMPANY_ROLE_LIST, ASSET_COMPANY_LIST, UPLOAD_URL, IMG_ACCEPT } from '@/utils/constant'
import { useSetStep1 } from '../use/use'

interface IProps {
  params: ISetMerchant
  type: number
}

const props = defineProps<IProps>()
const emits = defineEmits(['change'])

const cityList = ref<ICity[]>([])
const brandsList = ref<IBrand[]>([])
const { inputStyle, params, rule, beforeImgUpload, handleSuccess, querySearchAsync, handleSelect } =
  useSetStep1(props.type, props.params)

watch(
  () => params.value,
  (val: ISetMerchant) => {
    emits('change', val)
  },
  {
    immediate: true,
    deep: true
  }
)

const changeCity = (e: number) => {
  const item = cityList.value.find((item) => item.id === e)
  if (item) {
    params.value.cityName = item.city
  }
}

getAllCity().then((data) => {
  cityList.value = data
})

getCarBrand().then((data) => {
  brandsList.value = data
})
</script>

<style lang="scss" scoped>
.upload-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 178px;
  .upload-tip {
    margin-top: 5px;
    height: 18px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    line-height: 18px;
    color: #4e5969;
  }
}

.el-upload {
  width: 178px;
  height: unset;
  .img {
    width: 178px;
  }
}

.el-autocomplete {
  width: 300px;
  height: 32px;
  :deep(.el-input__inner) {
    border-radius: 2px;
    background: #f2f3f5;
    padding: 0 8px;
    font-family: PingFangSC-Regular;
    box-sizing: border-box;
    border: none;
    font-size: 14px;
    color: #4e5969;
    display: flex;
    align-items: center;
    &::placeholder {
      color: #a4aebb;
    }
  }
}
</style>
