<template>
  <el-config-provider :locale="zhTw">
    <component :is="currentLayout">
      <router-view />
    </component>
  </el-config-provider>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import zhTw from 'element-plus/es/locale/lang/zh-tw';

// 引入寫好的 Layouts
import DefaultLayout from '@/layouts/defaultLayout/DefaultLayout.vue';
import BlankLayout from '@/layouts/BlankLayout.vue';

const route = useRoute();

// 核心邏輯：根據路由的 meta.layout 決定載入哪個元件，預設為 DefaultLayout
const currentLayout = computed(() => {
  if (route.meta.layout === 'BlankLayout') {
    return BlankLayout;
  }
  return DefaultLayout;
});
</script>

<style>
/* 針對全域的基礎設定 */
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

/* 確保 box-sizing 行為符合直覺 */
*,
*::before,
*::after {
  box-sizing: border-box;
}
</style>
