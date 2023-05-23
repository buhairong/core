<template>
  <div>
    <div class="content-title">设置限定里程</div>

    <el-table
      :data="list"
      style="width: 100%"
      :header-cell-style="{ background: '#F2F3F5', color: '#1D2129' }"
    >
      <el-table-column label="价格区间">
        <template #default="scope">
          <div>{{ scope.row.description || '-' }}</div>
        </template>
      </el-table-column>

      <el-table-column label="限定里程数">
        <template #default="scope">
          <div>{{ scope.row.limitMileage }}公里</div>
        </template>
      </el-table-column>

      <el-table-column label="超出里程费用">
        <template #default="scope">
          <div>{{ scope.row.overMileageFee }}元/公里</div>
        </template>
      </el-table-column>

      <el-table-column label="最后修改时间">
        <template #default="scope">
          <div>{{ scope.row.updateTime }}</div>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="110" align="center">
        <template #default="scope">
          <div class="table-btn" @click="edit(scope.row)">编辑</div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="`${params!.description}限定里程`"
      v-model="showDialog"
      width="380px"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="params" :rules="rules">
        <el-form-item prop="limitMileage">
          <c-input-number v-model="params.limitMileage" placeholder="请输入限定里程">
          </c-input-number
          >公里
        </el-form-item>

        <el-form-item prop="overMileageFee">
          <c-input-number v-model="params.overMileageFee" placeholder="请输入超出里程费用">
          </c-input-number
          >元
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="dialog-btn-wrap">
          <div class="btn" @click="handleClose">取消</div>
          <div class="btn save-btn" @click="save">保存</div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import type { ELForm } from 'element-plus'
import type { ILimitMileageDetail } from '@/types'
import { selectLimitMileageRecord, updateLimitMileageRecord } from '@/api/system/limitedMileage'
import { ref } from 'vue'

const list = ref<ILimitMileageDetail[]>()
const params = ref<ILimitMileageDetail>()
const showDialog = ref<boolean>(false)
const form = ref<ELForm>(null)

const searchList = () => {
  selectLimitMileageRecord().then((data: ILimitMileageDetail[]) => {
    list.value = data
  })
}

const edit = (row: ILimitMileageDetail) => {
  params.value = row
  showDialog.value = true
}

const handleClose = () => {
  showDialog.value = false
  params.value = {}
}

searchList()
</script>

<style lang="scss" scoped></style>
