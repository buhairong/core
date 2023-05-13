<template>
  <div class="pagination-wrap" v-if="props.total">
    <el-pagination
      v-model:current-page="page"
      :page-size="10"
      layout="total, prev, pager, next"
      :total="total"
      v-bind="$attrs"
    >
    </el-pagination>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface IProps {
  total: number
}

const props = defineProps<IProps>()

const page = ref(1)
</script>

<style lang="scss" scoped>
.pagination-wrap {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
