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
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import type { IRouterMeta } from '@/types/router'

const router = useRouter()
const meta: any = (router.getRoutes()[0] as any).meta
let breadcrumb = reactive<IRouterMeta[]>([])

if (meta && meta.breadCrumb) {
  breadcrumb = reactive(meta.breadCrumb)
}
</script>

<style lang="scss" scoped></style>
