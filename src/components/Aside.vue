<template>
  <div class="aside">
    <div class="logo-wrap">
      <img class="logo" src="@/assets/logo_txt.png" />
    </div>
    <el-menu :default-active="activeMenuUrl" router class="el-menu-vertical-demo">
      <template v-for="item in asideMenuList" :key="item.id">
        <el-menu-item v-if="!item.thirdMenus || !item.thirdMenus.length" :index="item.url">
          <i class="el-icon-menu"></i>
          <span>{{ item.name }}</span>
        </el-menu-item>
        <el-sub-menu :index="item.url" v-else>
          <template #title>
            <i class="el-icon-menu"></i>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item v-for="item1 in item.thirdMenus" :key="item1.id" :index="item1.url">
            <i class="el-icon-menu"></i>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { findSecondMenus } from '@/api/home'
import type { Menu } from '@/types/home'

const props = defineProps({
  firstMenuId: {
    type: Number,
    required: true
  }
})
const router = useRouter()

let asideMenuList = reactive<Menu[]>([])
const activeMenuUrl = ref('')

watch(
  () => props.firstMenuId,
  (val: number) => {
    if (val) {
      findChildMenus(val)
    }
  }
)

const findChildMenus = (id: number) => {
  const data = {
    systemId: 2,
    id
  }
  findSecondMenus(data).then((res: any) => {
    if (res.code === 0) {
      asideMenuList = res.data
      activeMenuUrl.value = res.data[0].url
    }
  })
}

findChildMenus(props.firstMenuId)
</script>

<style lang="scss" scoped>
.aside {
  width: 200px;
  .logo-wrap {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    .logo {
      width: 126px;
    }
  }
}
</style>
