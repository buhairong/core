<template>
  <div class="wrap">
    <div class="add-plus-btn-wrap">
      <div class="add-plus-btn" @click="openDialog('add')">
        <span class="icon"><i class="el-icon-plus"></i></span>
        添加合同
      </div>
    </div>

    <el-table
      :data="detail.contractList"
      style="width: 100%"
      :header-cell-style="{ background: '#F2F3F5', color: '#1D2129' }"
    >
      <el-table-column label="合同名称" align="center">
        <template #default="scope">
          <div>
            {{ scope.row.contractName || '-' }}
          </div>
        </template>
      </el-table-column>

      <el-table-column label="合同附件" align="center">
        <template #default="scope">
          <div class="files">
            <el-image
              style="width: 16px; height: 16px"
              :src="require('@/assets/order/pdf-icon.png')"
            ></el-image>
            <div class="file-count">{{ scope.row.fileList.length }}张</div>
            <div class="review-btn" @click="onPreview(scope.row.fileList)">查看</div>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template #default="scope">
          <div style="display: flex; justify-content: center">
            <div
              class="table-btn"
              style="margin-right: 16px"
              @click="openDialog('edit', scope.row)"
            >
              修改合同
            </div>
            <div class="table-btn" @click="delRecord(scope.row.id)">删除合同</div>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-image-viewer v-if="showImageView" :url-list="filelist" @close="closeElImage" />

    <FaceAudit
      style="margin-top: 100px"
      :faceAuditRecord="detail.faceAuditRecord"
      :businessNode="10"
    />

    <el-dialog
      v-if="currentAgreement"
      :title="dialogType === 'add' ? '添加合同' : '修改合同'"
      v-model="showDialog"
      width="560px"
    >
      <div class="item">
        <div class="item-label">合同名称：</div>
        <div class="item-content">
          <c-input
            v-model="currentAgreement.contractName"
            placeholder="请输入合同名称"
            :inputStyle="{
              width: '350px'
            }"
          />
        </div>
      </div>

      <div class="item">
        <div class="item-label">合同编号：</div>
        <div class="item-content">
          <c-input
            v-model="currentAgreement.contractLabelNum"
            placeholder="请输入合同名称"
            :inputStyle="{
              width: '350px'
            }"
          />
        </div>
      </div>

      <div class="item">
        <div class="item-label">合同类型：</div>
        <div class="item-content">
          <c-input
            v-model="currentAgreement.contractType"
            placeholder="请输入合同名称"
            :inputStyle="{
              width: '350px'
            }"
          />
        </div>
      </div>

      <div class="item">
        <div class="item-label">签约时间：</div>
        <div class="item-content">
          <c-date-time
            v-model="currentAgreement.signTime"
            placeholder="请选择签约时间"
            :selectStyle="{
              width: '350px'
            }"
          />
        </div>
      </div>

      <div class="item">
        <div class="item-label">有效期限：</div>
        <div class="item-content">
          <date-range-select v-model="dateRange" @select="handlerSelectDate" />
        </div>
      </div>

      <div class="item">
        <div class="item-label">合同附件：</div>
        <div class="item-content">
          <div class="img-list">
            <div class="img-wrap" v-for="(item, index) in currentAgreement.fileList" :key="index">
              <el-image style="width: 100px" :src="item" mode="widthFix"></el-image>
              <div class="del-icon" @click="delImg(index)">
                <i class="el-icon-error" style="font-size: 20px"></i>
              </div>
            </div>

            <el-upload
              multiple
              :action="UPLOAD_URL"
              :show-file-list="false"
              :before-upload="beforeImgUpload"
              :on-success="handleSuccess"
            >
              <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="dialog-btn-wrap">
          <div class="btn" @click="handleCloseDialog">取消</div>
          <div class="btn save-btn" @click="save">确认</div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import type { IOrderDetail, IContract, IContractFile } from '@/types'
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { createOrUpdateContract, deleteContract } from '@/api/order/order'
import { UPLOAD_URL, IMG_LIMIT_SIZE } from '@/utils/constant'
import FaceAudit from './FaceAudit.vue'

interface IProps {
  detail: IOrderDetail
  orderId: number
}

const props = defineProps<IProps>()
const emits = defineEmits(['update'])

const showDialog = ref<boolean>(false)
const dialogType = ref<string>()
const currentAgreement = ref<IContract>({
  contractName: '',
  contractLabelNum: '',
  contractType: '',
  signTime: '',
  startTime: '',
  endTime: '',
  fileList: []
})
const dateRange = ref<string[]>([])
const showImageView = ref<boolean>(false)
const filelist = ref<string[]>([])

const onPreview = (list: IContractFile[]) => {
  filelist.value = list.map((item) => item.contractFileUrl)
  showImageView.value = true
}

const openDialog = (type: string, item?: IContract) => {
  if (type === 'edit' && item) {
    currentAgreement.value = {
      ...item,
      fileList:
        item.fileList && item.fileList.map((item) => (item as IContractFile).contractFileUrl)
    }

    dateRange.value = [item.startTime as string, item.endTime as string]
  }

  dialogType.value = type
  showDialog.value = true
}

const handleCloseDialog = () => {
  showDialog.value = false
  currentAgreement.value = {
    contractName: '',
    contractLabelNum: '',
    contractType: '',
    signTime: '',
    startTime: '',
    endTime: '',
    fileList: []
  }
  dateRange.value = []
}

const handlerSelectDate = (data: string[]) => {
  if (currentAgreement.value) {
    currentAgreement.value.startTime = data[0] || ''
    currentAgreement.value.endTime = data[1] || ''
  }
  dateRange.value = data || []
}

const beforeImgUpload = (file: File) => {
  const size = file.size / 1024 / 1024

  if (size > IMG_LIMIT_SIZE) {
    ElMessage.error(`上传文件大小不能超过${IMG_LIMIT_SIZE}MB!`)
    return false
  }

  return true
}

const handleSuccess = (res: any) => {
  if (currentAgreement.value) {
    ;(currentAgreement.value.fileList as string[]).push(res.src)
  }
}

const delImg = (index: number) => {
  ElMessageBox.confirm(`确定要删除这张合同附件吗？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    if (currentAgreement.value) {
      ;(currentAgreement.value.fileList as string[]).splice(index, 1)
    }
  })
}

const save = () => {
  if (!currentAgreement.value.contractName) {
    ElMessage.error('请输入合同名称')
    return
  }

  if (!currentAgreement.value.contractLabelNum) {
    ElMessage.error('请输入合同编号')
    return
  }

  if (!currentAgreement.value.contractType) {
    ElMessage.error('请输入合同类型')
    return
  }

  if (!currentAgreement.value.signTime) {
    ElMessage.error('请选择签约时间')
    return
  }

  if (!currentAgreement.value.startTime) {
    ElMessage.error('请选择有效期限')
    return
  }

  if (currentAgreement.value.fileList && currentAgreement.value.fileList.length === 0) {
    ElMessage.error('请上传合同附件')
    return
  }

  const data = {
    orderId: props.orderId,
    ...currentAgreement.value
  }

  createOrUpdateContract(data).then(() => {
    ElMessage.success('保存成功')
    emits('update')
    handleCloseDialog()
  })
}

const delRecord = (contractId: number) => {
  ElMessageBox.confirm(`确定要删除“用户订阅合同”？删除后该合同信息无法恢复`, '删除合同', {
    confirmButtonText: '确认删除',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    const data = {
      contractId
    }

    deleteContract(data).then(() => {
      ElMessage.success('删除成功')
      emits('update')
    })
  })
}

const closeElImage = () => {
  showImageView.value = false
}
</script>

<style lang="scss" scoped>
.wrap {
  padding: 0 80px;
  .add-plus-btn-wrap {
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-end;
  }

  .files {
    display: flex;
    justify-content: center;
    align-items: center;
    .file-count {
      padding-left: 8px;
      padding-right: 16px;
    }
    .review-btn {
      color: #3446aa;
      cursor: pointer;
    }
  }
  .hideImgDiv {
    :deep(.el-image__inner) {
      display: none;
    }
  }

  .item {
    margin-top: 16px;
    display: flex;
    .item-label {
      margin-right: 16px;
      height: 32px;
      line-height: 32px;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #1d2129;
    }
    .item-content {
      width: 0;
      flex: 1;
      .img-list {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        ::v-deep .el-upload {
          width: 100px;
          height: 100px;
        }
      }
    }
  }

  .img-wrap {
    margin-right: 8px;
    margin-bottom: 16px;
    position: relative;
    .del-icon {
      position: absolute;
      top: 10px;
      right: 10px;
    }
  }
}
</style>
