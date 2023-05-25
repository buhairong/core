<template>
  <div>
    <Search :type="type" @search="handlerSearch" />
    <List :type="type" :list="list" @search="handlerSearch" />
    <pagination :total="total" @current-change="handleCurrentChange" />
  </div>
</template>

<script setup lang="ts">
import Search from './components/BrokerageSearch.vue'
import List from './components/BrokerageList.vue'
import { useSearch } from './use/useBrokerage'

const type = 2
const { total, list, handlerSearch, handleCurrentChange } = useSearch(type)
</script>

<style lang="scss" scoped></style>
