import { type App } from 'vue';
import axios from 'axios';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import router from '@/router';
import '../style.css';
import 'element-plus/theme-chalk/base.css'; // 提供基礎 CSS 變數與動畫
import 'element-plus/theme-chalk/el-overlay.css'; // 🚨 解決被遮蓋的關鍵 (提供高 z-index 黑底遮罩)
import 'element-plus/theme-chalk/el-message.css';
import 'element-plus/theme-chalk/el-message-box.css';

/** 註冊套件功能至全域 */
export const registerPlugins = (app: App<Element>) => {
  // 從全域變數讀取剛才載入的設定，並套用至 Axios 全域預設設定
  axios.defaults.baseURL = window.__APP_CONFIG__.API_BASE_URL;
  axios.defaults.timeout = window.__APP_CONFIG__.APP_TIMEOUT;

  app.use(createPinia().use(piniaPluginPersistedstate)).use(router);
  return app;
};
