<template>
  <div class="login-container">
    <el-card class="login-card" shadow="hover">
      <div class="login-header">
        <h2>系統管理後台</h2>
        <p class="subtitle">請選擇您的登入方式</p>
      </div>

      <div class="switch-container">
        <span class="mode-label" :class="{ 'is-active': !isSsoMode }">本地登入</span>
        <el-switch
          v-model="isSsoMode"
          inline-prompt
          style="--el-switch-on-color: #409eff; --el-switch-off-color: #909399"
        />
        <span class="mode-label" :class="{ 'is-active': isSsoMode }">SSO 登入</span>
      </div>

      <div class="login-body">
        <div v-if="isSsoMode" class="sso-mode">
          <el-button
            type="primary"
            size="large"
            class="full-width-btn"
            :loading="isLoading"
            @click="handleSsoLogin"
          >
            使用企業 SSO 登入
          </el-button>
        </div>

        <div v-else class="local-mode">
          <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large">
            <el-form-item prop="username">
              <el-input
                v-model="loginForm.username"
                placeholder="請輸入帳號"
                clearable
                @keyup.enter="handleLocalLogin"
              >
                <template #prefix>
                  <el-icon><User /></el-icon>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item prop="password">
              <el-input
                v-model="loginForm.password"
                type="password"
                placeholder="請輸入密碼"
                show-password
                clearable
                @keyup.enter="handleLocalLogin"
              >
                <template #prefix>
                  <el-icon><Lock /></el-icon>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item>
              <el-button
                type="primary"
                class="full-width-btn"
                :loading="isLoading"
                @click="handleLocalLogin"
              >
                登入
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import { User, Lock } from '@element-plus/icons-vue';

const router = useRouter();

// UI 狀態控制
const isSsoMode = ref(true); // 預設為 true (SSO 模式)
const isLoading = ref(false);

// 表單相關參考與資料
const loginFormRef = ref<FormInstance>();
const loginForm = reactive({
  username: '',
  password: ''
});

// 定義本地登入的驗證規則
const loginRules = reactive<FormRules>({
  username: [{ required: true, message: '請輸入帳號', trigger: 'blur' }],
  password: [
    { required: true, message: '請輸入密碼', trigger: 'blur' },
    { min: 6, message: '密碼長度至少需 6 個字元', trigger: 'blur' }
  ]
});

// 處理 SSO 登入
const handleSsoLogin = async () => {
  isLoading.value = true;
  try {
    // 模擬跳轉至 SSO 伺服器 (如 Keycloak) 的等待時間
    await new Promise((resolve) => setTimeout(resolve, 800));

    // 實際開發中，這裡通常是 window.location.href = '您的 SSO 認證網址'
    ElMessage.info('正在導向 SSO 登入頁面...');
    console.log('Redirecting to SSO...');
    setTimeout(() => {
      router.push({ name: 'Home' });
    }, 3000);
  } finally {
    isLoading.value = false;
  }
};

// 處理本地登入
const handleLocalLogin = async () => {
  // 1. 確保表單實體存在
  if (!loginFormRef.value) return;

  // 2. 觸發 Element Plus 內建的表單驗證
  await loginFormRef.value.validate(async (valid) => {
    if (valid) {
      // 驗證通過：帳號密碼都有輸入
      isLoading.value = true;
      try {
        // 模擬呼叫後端 API
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // TODO: 在這裡呼叫 API，並將 Token 存入 localStorage 或 Pinia Store
        localStorage.setItem('token', 'fake-jwt-token');

        ElMessage.success('登入成功');
        router.push({ name: 'Home' }); // 導向首頁
      } catch (error) {
        ElMessage.error('登入失敗，請檢查帳號密碼');
      } finally {
        isLoading.value = false;
      }
    } else {
      // 驗證失敗：攔截登入動作
      console.log('表單驗證未通過');
    }
  });
};
</script>

<style scoped>
/* 背景與置中容器 */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #2d3a4b; /* 常見的後台深色背景 */
  background-image: radial-gradient(circle at center, #3b4d61 0%, #2d3a4b 100%);
}

/* 登入卡片 */
.login-card {
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
  border: none;
  padding: 10px;
}

/* 標題區域 */
.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-header h2 {
  margin: 0;
  font-size: 24px;
  color: #303133;
}

.subtitle {
  margin-top: 8px;
  font-size: 14px;
  color: #909399;
}

/* 切換按鈕區域 */
.switch-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-bottom: 30px;
  padding: 10px;
  background-color: #f5f7fa;
  border-radius: 6px;
}

.mode-label {
  font-size: 14px;
  color: #c0c4cc;
  transition: color 0.3s;
  font-weight: 500;
}

.mode-label.is-active {
  color: #409eff;
}

/* 按鈕樣式 */
.full-width-btn {
  width: 100%;
  font-size: 16px;
  font-weight: bold;
}

/* SSO 模式微調 */
.sso-mode {
  padding: 20px 0;
}
</style>
