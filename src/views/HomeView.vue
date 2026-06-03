<template>
  <div class="dashboard-container">
    <el-row :gutter="20" class="stat-row">
      <el-col :xs="24" :sm="8">
        <el-card shadow="hover" class="stat-card card-primary">
          <div class="card-content">
            <div class="text-section">
              <div class="card-title">待辦表單</div>
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
              <div class="card-title">審核中表單</div>
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
              <div class="card-title">完成表單</div>
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
              <span class="header-title">公告</span>
              <el-button type="primary" link>查看全部</el-button>
            </div>
          </template>

          <el-table :data="recentCases" style="width: 100%" stripe>
            <el-table-column prop="id" label="編號" width="120" />
            <el-table-column prop="title" label="名稱" min-width="200" />
            <el-table-column prop="date" label="建立日期" width="180" />
            <el-table-column prop="status" label="重要度" width="120" align="center">
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

    <el-row :gutter="20" class="calendar-row">
      <el-col :span="24">
        <el-card shadow="hover" v-loading="isCalendarLoading">
          <template #header>
            <div class="card-header">
              <span class="header-title">行事曆</span>
              <el-button type="primary" link>新增行程</el-button>
            </div>
          </template>

          <el-calendar v-model="currentDate">
            <template #date-cell="{ data }">
              <div class="calendar-cell">
                <span :class="{ 'is-today': data.isToday }">
                  {{ data.date.getDate() }}
                </span>

                <div class="event-list">
                  <div
                    v-for="(event, index) in getEventsByDate(data.day)"
                    :key="index"
                    class="event-item"
                    :class="event.type"
                  >
                    {{ event.title }}
                  </div>
                </div>
              </div>
            </template>
          </el-calendar>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Document, Timer, CircleCheck } from '@element-plus/icons-vue';

// 模擬頂部統計數據
const stats = ref({ pending: 124, reviewing: 38, completed: 856 });

// 模擬最近案件列表資料
const recentCases = ref([
  { id: 'CAS-2026-004', title: '採購系統主機升級申請', date: '2026-06-03', status: '高' },
  { id: 'CAS-2026-003', title: 'Q2 跨部門季會預算請款', date: '2026-06-02', status: '中' },
  { id: 'CAS-2026-002', title: '新進員工設備配發', date: '2026-06-01', status: '低' },
  { id: 'CAS-2026-001', title: '辦公室網路異常報修', date: '2026-05-30', status: '高' }
]);

// 根據案件狀態，回傳對應的 el-tag 顏色類型
const getStatusTagType = (status: string) => {
  const map: Record<string, '' | 'success' | 'warning' | 'info' | 'danger'> = {
    高: 'danger', // 紅色
    中: 'warning', // 橘色
    低: 'success' // 綠色
  };
  return map[status] || 'info';
};

//#region 行事曆相關資料與邏輯

// 1. 狀態與資料綁定
const currentDate = ref(new Date());
const isCalendarLoading = ref(false); // 控制載入動畫
const loadedYearMonth = ref(''); // 紀錄目前已載入的「年-月」，防止重複打 API

// 定義行程型別
interface CalendarEvent {
  date: string;
  title: string;
  type: 'primary' | 'success' | 'warning' | 'danger' | 'info';
}
const calendarEvents = ref<CalendarEvent[]>([]);

// 2. 模擬呼叫後端 API 取得該月資料
const fetchMonthlyEvents = async (year: number, month: number) => {
  isCalendarLoading.value = true;
  try {
    // 模擬網路延遲 600 毫秒
    await new Promise((resolve) => setTimeout(resolve, 600));

    // 格式化月份為兩位數，例如 6 變成 '06'
    const mStr = month.toString().padStart(2, '0');

    // 💡 模擬不同月份回傳不同的資料
    if (year === 2026 && month === 6) {
      calendarEvents.value = [
        { date: '2026-06-08', title: '系統主機升級', type: 'danger' },
        { date: '2026-06-15', title: 'Q2 跨部門季會', type: 'warning' },
        { date: '2026-06-19', title: '員工教育訓練', type: 'primary' },
        { date: '2026-06-20', title: '主機資料轉置', type: 'info' },
        { date: '2026-06-20', title: '伺服器例行備份', type: 'info' }
      ];
    } else if (month === 5) {
      calendarEvents.value = [
        { date: `2026-05-10`, title: '五月份財報結算', type: 'warning' },
        { date: `2026-05-25`, title: '端午節連假前宣導', type: 'primary' }
      ];
    } else if (month === 7) {
      calendarEvents.value = [
        { date: `2026-07-01`, title: '下半年目標布達', type: 'success' },
        { date: `2026-07-14`, title: '中元普渡拜拜', type: 'danger' }
      ];
    } else {
      // 其他月份給一筆通用假資料
      calendarEvents.value = [
        { date: `${year}-${mStr}-15`, title: `${month}月例行保養`, type: 'info' }
      ];
    }
  } finally {
    isCalendarLoading.value = false;
  }
};

// 3. 監聽日期變化，決定是否要觸發 API
watch(
  currentDate,
  (newDate) => {
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1; // 💡 注意：JavaScript 的 getMonth() 是 0~11，所以要 +1
    const targetYearMonth = `${year}-${month}`;

    // 只有當「年份」或「月份」真的改變時，才重新打 API
    if (loadedYearMonth.value !== targetYearMonth) {
      loadedYearMonth.value = targetYearMonth;
      fetchMonthlyEvents(year, month);
    }
  },
  { immediate: true } // 💡 核心技巧：immediate = true 會在元件一掛載時，立刻自動執行一次 (取代 onMounted)
);

// 4. 提供給 template 渲染日曆格子的過濾函數
const getEventsByDate = (day: string) => {
  return calendarEvents.value.filter((event) => event.date === day);
};

//#endregion
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

/* --- 新增：行事曆區塊樣式 --- */
.calendar-row {
  margin-top: 20px; /* 與上方的 Table 保持間距 */
}

/* 確保格子內容可以垂直排列 */
.calendar-cell {
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* 今天的日期數字加粗並變色 */
.is-today {
  color: var(--el-color-primary);
  font-weight: bold;
}

/* 行程列表的容器 */
.event-list {
  margin-top: 4px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

/* 單個行程標籤樣式 */
.event-item {
  font-size: 12px;
  padding: 2px 4px;
  border-radius: 2px;
  color: #fff;
  /* 文字過長時顯示點點點 ... */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

/* 根據 type 動態套用 Element Plus 的主題顏色 */
.event-item.primary {
  background-color: var(--el-color-primary);
}
.event-item.warning {
  background-color: var(--el-color-warning);
}
.event-item.danger {
  background-color: var(--el-color-danger);
}
.event-item.info {
  background-color: var(--el-color-info);
}

/* 💡 核心技巧：微調 Element Plus 行事曆預設高度
   預設的格子非常高(85px)，在 Dashboard 中會佔用過多畫面，透過 :deep() 把它變精緻 */
:deep(.el-calendar-table .el-calendar-day) {
  height: 70px;
  padding: 4px 8px;
}
</style>
