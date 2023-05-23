<template>
  <div>
    <Search :type="type" @search="handlerSearch" />
    <List :type="type" :list="list" @search="handlerSearch" />
    <pagination :total="total" @current-change="handleCurrentChange" />
  </div>
</template>

<script setup lang="ts">
import Search from './components/Search.vue'
import List from './components/List.vue'
import { useSearch } from './use/use'

const type = 2
const { total, list, handlerSearch, handleCurrentChange } = useSearch(type)
</script>

<style lang="scss" scoped></style>
