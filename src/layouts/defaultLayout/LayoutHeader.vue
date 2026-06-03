<template>
  <el-header class="header">
    <div class="header-content">
      <div class="left-section">
        <el-icon class="collapse-btn" @click="toggleCollapse">
          <Expand v-if="isCollapse" />
          <Fold v-else />
        </el-icon>
      </div>

      <div class="right-section">
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="user-dropdown-link">
            <el-avatar :size="32" class="avatar">
              <el-icon><User /></el-icon>
            </el-avatar>
            <span class="username">系統管理員</span>
            <el-icon class="el-icon--right"><ArrowDown /></el-icon>
          </span>

          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile" :icon="User">個人資料</el-dropdown-item>
              <el-dropdown-item command="settings" :icon="Setting">系統設定</el-dropdown-item>

              <el-dropdown-item divided command="logout" :icon="SwitchButton" class="text-danger">
                登出系統
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </el-header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import { ArrowDown, User, Setting, SwitchButton, Expand, Fold } from '@element-plus/icons-vue';
import { useLayoutStore } from '@/stores/layout/layout';
import { storeToRefs } from 'pinia';

const router = useRouter();

//#region 實體化 Store 並取出狀態與動作
const layoutStore = useLayoutStore();
const { isCollapse } = storeToRefs(layoutStore);
const { toggleCollapse } = layoutStore;
//#endregion

/** 統一處理下拉選單的點擊事件 */
const handleCommand = async (command: string) => {
  if (command === 'logout') {
    try {
      // 登出前加上二次確認，避免使用者誤觸
      await ElMessageBox.confirm('確定要登出系統嗎？', '登出提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      });

      // TODO: 這裡可以呼叫 Pinia action 清除 token 與使用者資料
      localStorage.removeItem('token');
      sessionStorage.clear();

      ElMessage.success('已成功登出');
      router.push({ name: 'Login' });
    } catch {
      // 使用者點擊取消，不做任何事
    }
  } else if (command === 'profile') {
    console.log('跳轉至個人資料頁面');
    // router.push('/profile')
  } else if (command === 'settings') {
    console.log('跳轉至系統設定頁面');
    // router.push('/settings')
  }
};
</script>

<style scoped>
/* Header 外層容器 */
.header {
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  display: flex;
  align-items: center;
  padding: 0 20px;
}

/* 讓左右兩側內容排開 */
.header-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left-section {
  display: flex;
  align-items: center;
}

/* 控制按鈕樣式 */
.collapse-btn {
  font-size: 20px;
  cursor: pointer;
  margin-right: 20px;
  color: #606266;
  transition: color 0.2s;
}

.collapse-btn:hover {
  color: #409eff;
}

/* 下拉選單觸發區塊樣式 */
.user-dropdown-link {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #303133;
  outline: none; /* 移除點擊時可能出現的藍色外框 */
  transition: color 0.2s;
}

.user-dropdown-link:hover {
  color: #409eff; /* 滑鼠移入時變為 Element 主題藍色 */
}

.avatar {
  margin-right: 8px;
  background-color: #c0c4cc; /* 沒有真實圖片時的預設背景色 */
}

.username {
  font-size: 14px;
  font-weight: 500;
}

/* 讓登出按鈕變紅色，增加視覺警示感 */
.text-danger {
  color: #f56c6c;
}
</style>
