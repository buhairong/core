<template>
  <div>
    <Search :type="type" @search="handlerSearch" />
    <List :type="type" :list="list" @search="handlerSearch" />
    <pagination :total="total" @current-change="handleCurrentChange" />
  </div>
</template>

<script setup lang="ts">
import Search from './components/PaySearch.vue'
import List from './components/PayList.vue'
import { useSearch } from './use/useFinance'

const type = 1
const { total, list, handlerSearch, handleCurrentChange } = useSearch(type)
</script>

<style lang="scss" scoped></style>
