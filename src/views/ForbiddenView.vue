<template>
  <div class="error-page-container">
    <el-card class="error-card" shadow="hover">
      <el-result
        title="403 權限不足"
        :sub-title="`您沒有存取此頁面的權限。系統將在 ${countdown} 秒後自動導向首頁。`"
      >
        <template #icon>
          <el-icon :size="64" color="#E6A23C">
            <WarnTriangleFilled />
          </el-icon>
        </template>

        <template #extra>
          <el-button type="primary" @click="goHome">立即返回首頁</el-button>
        </template>
      </el-result>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { WarnTriangleFilled } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 倒數計時秒數
const countdown = ref(5);
// 用來儲存計時器的 ID，以便後續清除
let timer: ReturnType<typeof setInterval> | null = null;

// 手動或自動返回首頁的共用邏輯
const goHome = () => {
  if (timer) clearInterval(timer); // 離開前務必清除計時器
  router.push('/'); // 導向首頁 (請確保 router 中有 '/' 這個路徑)
};

// 元件掛載時，啟動倒數計時
onMounted(() => {
  timer = setInterval(() => {
    countdown.value--;

    // 當倒數到 0 時，執行導向
    if (countdown.value <= 0) {
      goHome();
    }
  }, 1000);
});

// 💡 核心防護：如果使用者在 5 秒內自己點擊了其他選單離開此頁，必須清除計時器，否則會發生記憶體洩漏 (Memory Leak)
onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});
</script>

<style scoped>
/* 讓整個錯誤畫面置中填滿 */
.error-page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* 如果這個頁面是包在 DefaultLayout 裡，可以改成 height: 100% */
  background-color: #f0f2f5;
}

.error-card {
  width: 100%;
  max-width: 500px;
  border-radius: 8px;
  border: none;
}

/* 微調 Element Plus result 元件的標題大小 */
:deep(.el-result__title p) {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
}

:deep(.el-result__subtitle p) {
  font-size: 14px;
  color: #909399;
}
</style>
