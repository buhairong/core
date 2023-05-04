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
import { reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import type { IRouterMeta } from '@/types/router'

const router = useRouter()
let breadcrumb = reactive<IRouterMeta[]>([])

console.log('router1', router)

watch(
  () => router,
  (val) => {
    console.log('router2', val)
    const meta: any = (val.getRoutes()[0] as any).meta

    if (meta && meta.breadCrumb) {
      breadcrumb = reactive(meta.breadCrumb)
    }
  },
  { deep: true, immediate: true }
)
</script>

<style lang="scss" scoped></style>
