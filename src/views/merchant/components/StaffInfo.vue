<template>
  <el-table
    :data="props.detail.userRespVos"
    :header-cell-style="{ background: '#F2F3F5', color: '#1D2129' }"
  >
    <el-table-column label="姓名" prop="companyUserName"> </el-table-column>
    <el-table-column label="联系方式" prop="mobile"> </el-table-column>
    <el-table-column label="员工角色" prop="roleName"> </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import type { IMerchantDetail } from '@/types'

interface IProps {
  detail: IMerchantDetail
}

const props = defineProps<IProps>()
</script>

<style lang="scss" scoped></style>
