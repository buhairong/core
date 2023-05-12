<template>
  <div>查询</div>
</template>

<script setup lang="ts">
import type { ISearch } from '@/types'

interface IProps {
  search: ISearch
}

const props = defineProps<IProps>()
const emits = defineEmits(['search'])

emits('search', props.search)
</script>

<style lang="scss" scoped></style>
