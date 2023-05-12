<template>
  <div>
    <Search :type="type" :search="search" @search="handlerSearch" />
    <List :type="type" :list="list" @search="handlerSearch" />
    <pagination :total="total" :pageSize="5" @handleCurrentChange="handleCurrentChange" />
  </div>
</template>

<script setup lang="ts">
import Search from './components/Search.vue'
import List from './components/List.vue'
import { useSearch } from './use'

const type = 1
const { search, total, list, handlerSearch, handleCurrentChange } = useSearch(type)
</script>

<style lang="scss" scoped></style>
