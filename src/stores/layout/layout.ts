import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useLayoutStore = defineStore('layoutStore', () => {
  // 狀態：是否收合側邊欄 (預設為 false，即展開狀態)
  const isCollapse = ref(false);

  // 動作：切換收合狀態
  const toggleCollapse = () => {
    isCollapse.value = !isCollapse.value;
  };

  return {
    /** 狀態：是否收合側邊欄 */
    isCollapse,
    /** 切換收合狀態 */
    toggleCollapse
  };
});

export default useLayoutStore;
