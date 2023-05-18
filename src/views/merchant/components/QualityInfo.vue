<template>
  <el-table
    :data="props.detail.decorateList"
    :header-cell-style="{ background: '#F2F3F5', color: '#1D2129' }"
  >
    <el-table-column label="精品/装潢名称" prop="decorateName"> </el-table-column>
    <el-table-column label="设置员工" prop="createName"> </el-table-column>
    <el-table-column label="操作" width="110" align="center">
      <template #default="scope">
        <div class="table-btn" @click="del(scope.row)">删除</div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import type { IMerchantDetail, IDecorate } from '@/types'
import { ElMessage, ElMessageBox } from 'element-plus'
import { deleteDecorate } from '@/api/merchant/merchant'

interface IProps {
  detail: IMerchantDetail
}

const props = defineProps<IProps>()
const emits = defineEmits(['update'])

const del = (row: IDecorate) => {
  ElMessageBox.confirm(`确定要删除 ${row.decorateName} 吗？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    const data = {
      id: row.id
    }

    deleteDecorate(data).then(() => {
      ElMessage.success('删除成功')
      emits('update')
    })
  })
}
</script>

<style lang="scss" scoped></style>
