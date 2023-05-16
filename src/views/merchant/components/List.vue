<template>
  <div>
    <div class="create-btn-wrap">
      <create-button text="添加商户" @click="addMerchant(1)" />
    </div>
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
              @change="(e: number) => updateCompanyFinancial(e, scope.row.id)"
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
          <div class="table-btn" @click="goDetailPage(scope.row.id)">查看详情</div>
          <div class="table-btn" @click="addMerchant(2, scope.row.id)">编辑商户</div>
          <div class="table-btn" @click="del(scope.row.id)">删除商户</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import type { IRecord } from '@/types'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { deleteMerchant, openOrCloseCarType } from '@/api/merchant/merchant'
import { MERCHANT_STATUS } from '@/utils/constant'

interface IProps {
  type: number
  list: IRecord[]
}

const props = defineProps<IProps>()
const emits = defineEmits(['search'])

const router = useRouter()

const updateCompanyFinancial = (e: number, companyId: number) => {
  const params = {
    companyId,
    showAllBrand: e
  }

  openOrCloseCarType(params).then(() => {
    ElMessage.success('保存成功')
    emits('search')
  })
}

const goDetailPage = (companyId: number) => {
  router.push({
    path: '/businessManagement/detail',
    query: {
      companyId,
      type: props.type
    }
  })
}

const addMerchant = (operator: number, companyId?: number) => {
  router.push({
    path: '/businessManagement/addMerchant',
    query: {
      type: props.type,
      operator,
      companyId
    }
  })
}

const del = (id: number) => {
  ElMessageBox.confirm(`确定要删除这个商户吗？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    const data = [id]

    deleteMerchant(data).then(() => {
      ElMessage.success('删除成功')
      emits('search')
    })
  })
}
</script>

<style lang="scss" scoped>
.create-btn-wrap {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
