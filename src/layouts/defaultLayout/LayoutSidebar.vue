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
      <template v-for="item in menuList" :key="item.path">
        <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.path">
          <template #title>
            <el-icon v-if="item.icon">
              <component :is="item.icon" />
            </el-icon>
            <span>{{ item.title }}</span>
          </template>

          <el-menu-item v-for="child in item.children" :key="child.path" :index="child.path">
            <template #title>{{ child.title }}</template>
          </el-menu-item>
        </el-sub-menu>

        <el-menu-item v-else :index="item.path">
          <el-icon v-if="item.icon">
            <!-- 在 Vue 3 中，Element Plus 的圖示都是實體的 Vue Component。因此不能單純用字串插值 {{ item.icon }}，必須透過 Vue 內建的 <component> 標籤搭配 :is 屬性，將引入的元件變數直接動態掛載上去 -->
            <component :is="item.icon" />
          </el-icon>
          <template #title>{{ item.title }}</template>
        </el-menu-item>
      </template>
    </el-menu>
  </el-aside>
</template>

<script setup lang="ts">
import { computed, shallowRef, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useLayoutStore } from '@/stores/layout/layout';
import { storeToRefs } from 'pinia';
// 引入需要用到的圖示
import { Menu, HomeFilled, Setting } from '@element-plus/icons-vue';

const layoutStore = useLayoutStore();
const { isCollapse } = storeToRefs(layoutStore);
const route = useRoute();
const activeMenu = computed(() => route.path);

// 💡 效能小技巧：因為陣列裡包含了 Vue 的元件 (Icon)，強烈建議使用 shallowRef 而不是 ref，
// 這樣可以避免 Vue 去深層劫持 Icon 內部的複雜物件，不僅效能更好，也能消除終端機的警告訊息。
const menuList = shallowRef<MenuItem[]>([]);

// TODO: 定義選單物件的型別介面 (未來與後端 API 溝通的資料結構)
interface MenuItem {
  path: string;
  title: string;
  icon?: any; // Element Plus 的圖示元件
  children?: MenuItem[];
}

// 模擬從後端 API 獲取的選單資料，未來可以替換成真正的 API 呼叫
const mockData = [
  {
    path: '/',
    title: '系統首頁',
    icon: HomeFilled
  },
  {
    path: '/system',
    title: '系統設定',
    icon: Setting,
    children: [
      { path: '/system/users', title: '使用者管理' },
      { path: '/system/roles', title: '角色權限' }
    ]
  },
  {
    path: '/websocket-monitor',
    title: 'WS 監控',
    icon: Menu
  }
];

onMounted(() => {
  // 模擬 API 呼叫，實際開發中請替換成真正的 API 請求
  setTimeout(() => {
    menuList.value = mockData;
  }, 500);
});
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
