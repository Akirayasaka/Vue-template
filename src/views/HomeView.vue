<template>
  <div class="dashboard-container">
    <el-row :gutter="20" class="stat-row">
      <el-col :xs="24" :sm="8">
        <el-card shadow="hover" class="stat-card card-primary">
          <div class="card-content">
            <div class="text-section">
              <div class="card-title">待辦案件</div>
              <div class="card-value text-primary">
                {{ stats.pending }}
              </div>
            </div>
            <div class="icon-section bg-primary-light">
              <el-icon class="text-primary"><Document /></el-icon>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="8">
        <el-card shadow="hover" class="stat-card card-warning">
          <div class="card-content">
            <div class="text-section">
              <div class="card-title">審核中案件</div>
              <div class="card-value text-warning">
                {{ stats.reviewing }}
              </div>
            </div>
            <div class="icon-section bg-warning-light">
              <el-icon class="text-warning"><Timer /></el-icon>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="8">
        <el-card shadow="hover" class="stat-card card-success">
          <div class="card-content">
            <div class="text-section">
              <div class="card-title">完成案件</div>
              <div class="card-value text-success">
                {{ stats.completed }}
              </div>
            </div>
            <div class="icon-section bg-success-light">
              <el-icon class="text-success"><CircleCheck /></el-icon>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="recent-row">
      <el-col :span="24">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span class="header-title">最近處理案件</span>
              <el-button type="primary" link>查看全部</el-button>
            </div>
          </template>

          <el-table :data="recentCases" style="width: 100%" stripe>
            <el-table-column prop="id" label="案件編號" width="120" />
            <el-table-column prop="title" label="案件名稱" min-width="200" />
            <el-table-column prop="date" label="建立日期" width="180" />
            <el-table-column prop="status" label="狀態" width="120" align="center">
              <template #default="{ row }">
                <el-tag :type="getStatusTagType(row.status)" effect="light">
                  {{ row.status }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120" align="center">
              <template #default>
                <el-button link type="primary" size="small">檢視詳情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Document, Timer, CircleCheck } from '@element-plus/icons-vue';

// 模擬頂部統計數據
// 實戰中，這裡通常會在 onMounted 時去打 API 獲取真實資料
const stats = ref({
  pending: 124,
  reviewing: 38,
  completed: 856
});

// 模擬最近案件列表資料
const recentCases = ref([
  { id: 'CAS-2026-001', title: '採購系統主機升級申請', date: '2026-06-03', status: '待辦' },
  { id: 'CAS-2026-002', title: 'Q2 跨部門季會預算請款', date: '2026-06-02', status: '審核中' },
  { id: 'CAS-2026-003', title: '新進員工設備配發', date: '2026-06-01', status: '待辦' },
  { id: 'CAS-2026-004', title: '辦公室網路異常報修', date: '2026-05-30', status: '已完成' }
]);

// 根據案件狀態，回傳對應的 el-tag 顏色類型
const getStatusTagType = (status: string) => {
  const map: Record<string, '' | 'success' | 'warning' | 'info' | 'danger'> = {
    待辦: '', // 預設藍色
    審核中: 'warning', // 橘色
    已完成: 'success' // 綠色
  };
  return map[status] || 'info';
};
</script>

<style scoped>
/* 頁面主容器：稍微加上內邊距 */
.dashboard-container {
  padding: 10px;
}

/* 統計卡片列的間距 */
.stat-row {
  margin-bottom: 20px;
}

/* 單個統計卡片 */
.stat-card {
  /* 💡 核心技巧：預設給一個透明邊框，避免 hover 時多出 1px 導致畫面抖動 */
  border: 1px solid transparent;
  border-radius: 8px;
  transition: all 0.3s ease; /* 讓邊框顏色與陰影的變化更滑順 */
}

/* 💡 針對不同狀態的 Hover 邊框顏色 (直接讀取 Element Plus 的全域變數) */
.stat-card.card-primary:hover {
  border-color: var(--el-color-primary);
}

.stat-card.card-warning:hover {
  border-color: var(--el-color-warning);
}

.stat-card.card-success:hover {
  border-color: var(--el-color-success);
}

/* 卡片內部排版：左右切分 */
.card-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 5px;
}

/* 左側文字區塊 */
.text-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card-title {
  font-size: 14px;
  color: #909399; /* 次要文字顏色 */
  font-weight: 500;
}

.card-value {
  font-size: 32px;
  font-weight: bold;
  line-height: 1;
}

/* 右側圖示區塊 */
.icon-section {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
}

/* --- Element Plus 語意化顏色設定 --- */
/* 主要藍色 (待辦) */
.text-primary {
  color: #409eff;
}
.bg-primary-light {
  background-color: #ecf5ff;
}

/* 警告橘色 (審核中) */
.text-warning {
  color: #e6a23c;
}
.bg-warning-light {
  background-color: #fdf6ec;
}

/* 成功綠色 (已完成) */
.text-success {
  color: #67c23a;
}
.bg-success-light {
  background-color: #f0f9eb;
}

/* --- 下方表格卡片樣式 --- */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-title {
  font-size: 16px;
  font-weight: bold;
  color: #303133;
}
</style>
