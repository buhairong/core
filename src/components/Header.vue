<template>
  <el-header class="header">
    <el-tabs class="top-menu" v-model="activeMenu" @tab-change="handleChangeMenu">
      <el-tab-pane
        v-for="item in firstMenuList"
        :key="item.id"
        :label="item.name"
        :name="item.id"
      ></el-tab-pane>
    </el-tabs>
    <div class="userinfo">
      <div class="username">Serati Ma</div>
      <el-dropdown @command="handleCommand">
        <el-image
          class="avtor-img"
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        ></el-image>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="quit">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { findFirstMenus } from '@/api/home'
import type { Menu } from '@/types/home'

const emits = defineEmits(['change'])
const router = useRouter()

let firstMenuList = reactive<Menu[]>([])
const activeMenu = ref<number | null>(null)

// 获取顶部导航菜单
const getFindFirstMenus = () => {
  const data = {
    // 系统编号（1 商户后台，2 核心后台）
    systemId: 2
  }
  findFirstMenus(data).then((res: any) => {
    if (res.code == 0) {
      firstMenuList = res.data
      activeMenu.value = firstMenuList[0].id
      handleChangeMenu()
    }
  })
}

// 切换tab页签获取对应的左侧二级导航菜单
const handleChangeMenu = () => {
  emits('change', activeMenu.value)
}

const handleCommand = (command: string | number | object) => {
  if (command === 'quit') {
    quitlogin()
  }
}

const quitlogin = () => {
  window.localStorage.clear()
  window.sessionStorage.clear()
  router.push({
    path: '/login'
  })
}

getFindFirstMenus()
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-tabs {
    margin-top: 15px;
  }
  .el-tabs :deep(.el-tabs__nav-wrap::after) {
    background-color: transparent;
  }
  .userinfo {
    display: flex;
    align-items: center;
    .username {
      padding-right: 10px;
      font-family: Roboto-Regular;
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.85);
    }
    .avtor-img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }
  }
}
</style>
