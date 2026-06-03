<template>
  <el-container class="default-layout">
    <LayoutSidebar />

    <el-container direction="vertical">
      <LayoutHeader />

      <el-main class="main-content">
        <slot />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import LayoutHeader from '@/layouts/defaultLayout/LayoutHeader.vue';
import LayoutSidebar from '@/layouts/defaultLayout/LayoutSidebar.vue';
</script>

<style scoped>
.default-layout {
  width: 100%;
  height: 100vh;
}
.is-vertical {
  flex-direction: column;
}
.main-content {
  background-color: #f0f2f5;
  padding: 20px;
  overflow-y: auto; /* 內容過長時，只有這裡會出現捲軸 */
}
</style>
