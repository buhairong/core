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

    <el-dialog :title="dialogTitle" v-model="showDialog" width="380px" :before-close="handleClose">
      <el-form ref="form" :model="params" :rules="rules">
        <el-form-item prop="limitMileage">
          <c-input-number v-model="params!.limitMileage" placeholder="请输入限定里程">
          </c-input-number
          >公里
        </el-form-item>

        <el-form-item prop="overMileageFee">
          <c-input-number v-model="params!.overMileageFee" placeholder="请输入超出里程费用">
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
import type { FormInstance, FormRules } from 'element-plus'
import type { ILimitMileageDetail } from '@/types'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { selectLimitMileageRecord, updateLimitMileageRecord } from '@/api/system/limitedMileage'

const list = ref<ILimitMileageDetail[]>()
const params = ref<ILimitMileageDetail | null>(null)
const showDialog = ref(false)
const dialogTitle = ref<string>('')
const form = ref<FormInstance>()
const rules = ref<FormRules>({
  limitMileage: [{ required: true, message: '请输入限定里程', trigger: 'blur' }],
  overMileageFee: [{ required: true, message: '请输入超出里程费用', trigger: 'blur' }]
})

const searchList = () => {
  selectLimitMileageRecord().then((data: ILimitMileageDetail[]) => {
    list.value = data
  })
}

const edit = (row: ILimitMileageDetail) => {
  params.value = row
  dialogTitle.value = `${row.description}限定里程`
  showDialog.value = true
}

const handleClose = () => {
  showDialog.value = false
  //params.value = null
  dialogTitle.value = ''
}

const save = () => {
  if (form.value) {
    form.value.validate((valid) => {
      if (valid) {
        if (params.value) {
          updateLimitMileageRecord(params.value).then(() => {
            ElMessage.success('保存成功')
            handleClose()
            searchList()
          })
        }
      }
    })
  }
}

searchList()
</script>

<style lang="scss" scoped></style>
