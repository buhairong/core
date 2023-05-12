<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%"
      :header-cell-style="{ background: '#F2F3F5', color: '#1D2129' }"
    >
      <el-table-column label="企业名称">
        <template #default="scope">{{ scope.row.companyName }}</template>
      </el-table-column>

      <el-table-column label="商户名称">
        <template #default="scope">
          <div>{{ scope.row.shopName || '-' }}</div>
        </template>
      </el-table-column>

      <el-table-column label="行业类型">
        <template #default="scope">
          <div>{{ scope.row.companyType }}-{{ scope.row.chooseRole }}</div>
        </template>
      </el-table-column>

      <el-table-column label="超级管理员信息">
        <template #default="scope">
          <div>{{ scope.row.managerName }}</div>
          <div>{{ scope.row.managerMobile }}</div>
        </template>
      </el-table-column>

      <el-table-column v-if="type === 1" label="所在城市">
        <template #default="scope">
          <div>{{ scope.row.cityName }}</div>
        </template>
      </el-table-column>

      <el-table-column v-if="type === 1" label="展示所有车型">
        <template #default="scope">
          <div>
            <el-switch
              v-model="scope.row.showAllBrand"
              :disabled="scope.row.chooseRoleInt == 2 || scope.row.chooseRoleInt == 3"
              :active-value="1"
              :inactive-value="0"
              active-color="#3446AA"
              @change="(e: number) => updateCompanyFinancial(e, scope.row)"
            >
            </el-switch>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="商户状态">
        <template #default="scope">
          <div>{{ MERCHANT_STATUS[scope.row.contractStatus] }}</div>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="110" align="center">
        <template #default="scope">
          <div class="table-btn" @click="goDetailPage(scope.row)">查看详情</div>
          <div class="table-btn" @click="addMerchant(2, scope.row)">编辑商户</div>
          <div class="table-btn" @click="del(scope.row)">删除商户</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import type { IRecord } from '@/types'
import { MERCHANT_STATUS } from '@/utils/constant'

interface IProps {
  type: number
  list: IRecord[]
}

const props = defineProps<IProps>()
const emits = defineEmits(['search'])

const updateCompanyFinancial = (e: number, row: IRecord) => {}
const goDetailPage = (row: IRecord) => {}
const addMerchant = (operator: number, row: IRecord) => {}
const del = (row: IRecord) => {}
</script>

<style lang="scss" scoped></style>
