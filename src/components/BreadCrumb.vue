<template>
  <el-breadcrumb separator="/" v-if="breadcrumb.length">
    <template v-for="(item, index) in breadcrumb" :key="index">
      <el-breadcrumb-item :to="{ path: item.path }" v-if="item.path">{{
        item.name
      }}</el-breadcrumb-item>
      <el-breadcrumb-item v-else>{{ item.name }}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import type { IRouterMeta } from '@/types/router'

const router = useRouter()
const breadcrumb = ref<IRouterMeta[]>([])

watch(
  () => router,
  (val) => {
    const meta: any = val.currentRoute.value.meta
    if (meta && meta.breadCrumb) {
      breadcrumb.value = meta.breadCrumb
    }
  },
  { deep: true, immediate: true }
)
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}
</style>
