<template>
  <div class="pagination-wrap" v-if="props.total">
    <el-pagination
      v-model:current-page="page"
      :page-size="props.pageSize"
      layout="total, prev, pager, next"
      :total="total"
      v-bind="$attrs"
    >
    </el-pagination>
  </div>
</template>

<script setup lang="ts">
import { ref, withDefaults } from 'vue'

interface IProps {
  total: number
  pageSize?: number
}

const props = withDefaults(defineProps<IProps>(), {
  pageSize: 10
})

const page = ref(1)
</script>

<style lang="scss" scoped>
.pagination-wrap {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
