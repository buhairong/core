<template>
  <div class="back-btn" @click="back">
    {{ props.text }}
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

interface IProps {
  text?: string
}

const props = withDefaults(defineProps<IProps>(), {
  text: '返回'
})

const router = useRouter()

const back = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
.back-btn {
  height: 40px;
  border-radius: 2px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  background: #f2f3f5;
  color: #1d2129;
  font-size: 14px;
  cursor: default;
}
</style>
