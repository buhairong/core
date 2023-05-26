<template>
  <div>
    <div class="content-title">筛选</div>

    <div class="search-wrap">
      <div class="search-line">
        <div class="search-item">
          <div class="label">名称</div>
          <c-input
            v-model="search.templateName"
            placeholder="请输入模板名称"
            :input-style="inputStyle"
          />
        </div>

        <search-button class="search-btn" @search="searchList" />
        <reset-button class="reset-btn" @reset="reset" />
      </div>
    </div>

    <div class="create-btn-wrap">
      <create-button text="创建模板" @click="setTemplate(1)" />
    </div>

    <el-table
      :data="list"
      style="width: 100%"
      :header-cell-style="{ background: '#F2F3F5', color: '#1D2129', textAlign: 'left' }"
    >
      <el-table-column type="index" label="编号" width="80"></el-table-column>
      <el-table-column prop="templateName" label="模板名称"> </el-table-column>
      <el-table-column prop="alias" label="模板别名"> </el-table-column>
      <el-table-column label="订阅周期" width="120">
        <template #default="scope">
          <div>
            <div
              v-if="scope.row.subscriptionPeriodArray && scope.row.subscriptionPeriodArray.length"
            >
              新车：{{
                scope.row.subscriptionPeriodArray.map((item: number) => item + '期').join('、')
              }}
            </div>
            <div
              v-if="
                scope.row.subscriptionPeriodArrayOldCar &&
                scope.row.subscriptionPeriodArrayOldCar.length
              "
            >
              二手车：{{
                scope.row.subscriptionPeriodArrayOldCar
                  .map((item: number) => item + '期')
                  .join('、')
              }}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="支付方式">
        <template #default="scope">
          <div>{{ scope.row.payModeArray[0] ? '一次性支付' : '月付' }}</div>
        </template>
      </el-table-column>
      <el-table-column label="期末选择">
        <template #default="scope">
          <div v-if="scope.row.finalSelectArray.includes(-1)">期末可续订</div>
          <div v-if="scope.row.finalSelectArray.includes(0)">期末可买断</div>
          <div v-if="scope.row.finalSelectArray.includes(1)">期末可退回</div>
        </template>
      </el-table-column>
      <el-table-column label="平台抽佣" width="120">
        <template #default="scope">
          <div>
            {{
              scope.row.platformCommissionRate || scope.row.platformCommissionRate === 0
                ? scope.row.platformCommissionRate
                : 0.5
            }}%
          </div>
        </template>
      </el-table-column>
      <el-table-column label="模板状态">
        <template #default="scope">
          <div>{{ scope.row.status == '0' ? '停用' : '启用' }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间"> </el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="scope">
          <div class="table-btn" @click="setTemplate(2, scope.row)">修改模板</div>
          <div
            v-if="scope.row.status === 0"
            class="table-btn"
            @click="toggleTemplate(1, scope.row)"
          >
            启用模板
          </div>
          <div v-else class="table-btn" @click="toggleTemplate(0, scope.row)">停用模板</div>
          <div class="table-btn" @click="goDelete(scope.row)">删除模板</div>
        </template>
      </el-table-column>
    </el-table>

    <pagination :total="total" @current-change="handleCurrentChange" />
  </div>
</template>

<script setup lang="ts">
import type { ITemplateSearch, ITemplateRecord } from '@/types'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import {
  getTemplateList,
  carSubscribeTemplateEnable,
  carSubscribeTemplateDelete
} from '@/api/plan/template'

const router = useRouter()

const inputStyle = {
  width: '200px'
}

const search = ref<ITemplateSearch>({
  templateName: '',
  limit: 10,
  page: 1
})

const list = ref<ITemplateRecord[]>([])
const total = ref<number>(0)

const searchList = () => {
  getTemplateList(search.value).then((res) => {
    list.value = res.records
    total.value = res.total
  })
}

const reset = () => {
  search.value.templateName = ''
}

const handleCurrentChange = (e: number) => {
  search.value.page = e
  searchList
}

const setTemplate = (type: number, row: ITemplateRecord | undefined = {}) => {
  router.push({
    path: '/product/setTemplate',
    query: {
      type,
      ...row
    }
  })
}

const toggleTemplate = (status: number, row: ITemplateRecord) => {
  ElMessageBox.confirm(
    `确定${status === 0 ? '停用' : '启用'}名称为 ${row.templateName} 的模板吗？`,
    '提示',
    {
      confirmButtonText: status === 0 ? '停用' : '启用',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    const data = {
      status,
      templateId: row.id as number
    }
    carSubscribeTemplateEnable(data).then(() => {
      ElMessage.success({
        message: `${status === 0 ? '停用' : '启用'}成功`,
        duration: 2000
      })
      searchList()
    })
  })
}

const goDelete = (row: ITemplateRecord) => {
  ElMessageBox.confirm(`确定删除名称为 ${row.templateName} 的模板吗？`, '提示', {
    confirmButtonText: '确认删除',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    const data = [row.id as number]
    carSubscribeTemplateDelete(data).then(() => {
      ElMessage.success({
        message: `删除成功`,
        duration: 2000
      })
      searchList()
    })
  })
}

searchList()
</script>

<style lang="scss" scoped>
.create-btn-wrap {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
