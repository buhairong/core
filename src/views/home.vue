<template>
  <el-container class="wrap">
    <Aside :firstMenuId="firstMenuId" v-if="firstMenuId" />
    <el-container class="out-container">
      <Header @change="changeFirstMenu" />
      <el-main class="main">
        <BreadCrumb />
        <router-view v-slot="{ Component }">
          <keep-alive :include="include">
            <component :is="Component" class="content" />
          </keep-alive>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
import Aside from '@/components/Aside.vue'
import BreadCrumb from '@/components/BreadCrumb.vue'

const include: string[] = ['NewCarOrder', 'OldCarOrder']
const firstMenuId = ref<number | null>(null)

const changeFirstMenu = (id: number) => {
  firstMenuId.value = id
}
</script>

<style lang="scss" scoped>
.wrap {
  width: 100vw;
  height: 100vh;
  .out-container {
    display: flex;
    flex-direction: column;
    .main {
      flex: 1;
      display: flex;
      flex-direction: column;
      background-color: #e9eef3;
      .content {
        padding: 20px;
        flex: 1;
        height: 0;
        width: 100%;
        background: #fff;
        overflow: auto;
        position: relative;
      }
    }
  }
}
</style>
