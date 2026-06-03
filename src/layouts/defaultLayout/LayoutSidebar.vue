<template>
  <el-aside :width="isCollapse ? '64px' : '200px'" class="sidebar-container">
    <div class="logo-container">
      <span v-if="!isCollapse" class="logo-text">系統管理後台</span>
      <span v-else class="logo-text-mini">後台</span>
    </div>

    <el-menu
      :default-active="activeMenu"
      :collapse="isCollapse"
      :collapse-transition="false"
      class="sidebar-menu"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
      router
    >
      <el-menu-item index="/">
        <el-icon><HomeFilled /></el-icon>
        <template #title>系統首頁</template>
      </el-menu-item>

      <el-sub-menu index="/system">
        <template #title>
          <el-icon><Setting /></el-icon>
          <span>系統設定</span>
        </template>
        <el-menu-item index="/system/users">使用者管理</el-menu-item>
        <el-menu-item index="/system/roles">角色權限</el-menu-item>
      </el-sub-menu>

      <el-menu-item index="/websocket-monitor">
        <el-icon><Menu /></el-icon>
        <template #title>WS 監控</template>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useLayoutStore } from '@/stores/layout/layout';
import { storeToRefs } from 'pinia';
import { Menu, HomeFilled, Setting } from '@element-plus/icons-vue';

const layoutStore = useLayoutStore();
// 使用 storeToRefs 保持解構後的響應式
const { isCollapse } = storeToRefs(layoutStore);

// 取得當前路由，讓選單能自動高亮目前所在的頁面
const route = useRoute();
const activeMenu = computed(() => route.path);
</script>

<style scoped>
/* 側邊欄外層容器：加上過渡動畫 (transition) 讓寬度變化更滑順 */
.sidebar-container {
  background-color: #304156;
  transition: width 0.3s ease-in-out;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.logo-container {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2b3649;
  color: #fff;
  overflow: hidden;
}

.logo-text {
  font-size: 18px;
  font-weight: bold;
  white-space: nowrap;
}

.logo-text-mini {
  font-size: 14px;
  font-weight: bold;
}

/* 消除 el-menu 預設的右側邊框，避免視覺突兀 */
.sidebar-menu {
  border-right: none;
  flex: 1;
  overflow-y: auto;
}

/* 針對滾動條進行美化 (選用) */
.sidebar-menu::-webkit-scrollbar {
  width: 6px;
}
.sidebar-menu::-webkit-scrollbar-thumb {
  background: #2b3649;
  border-radius: 3px;
}
</style>
