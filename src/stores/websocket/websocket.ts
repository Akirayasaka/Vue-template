import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useWebSocket } from '@/composables/useWebSocket';

export const useWebSocketStore = defineStore(
  'websocketStore',
  () => {
    // 最近一次收到的訊息
    const wsResult = ref<unknown>({});

    // 以 useWebSocket 作為唯一底層實作（含自動重連、scope 自動斷線）
    // WebSocket 位址同樣由 runtime 載入的全域設定提供
    const ws = useWebSocket({
      url: window.__APP_CONFIG__?.WS_URL ?? '',
      onMessage: (data) => {
        wsResult.value = data;
      }
    });

    return {
      /** 連線狀態：是否已連線 */
      isConnected: ws.isConnected,
      /** 連線狀態：是否連線中 */
      isConnecting: ws.isConnecting,
      /** 最近一次的錯誤事件 */
      error: ws.error,
      /** 最近一次收到的訊息 */
      wsResult,
      /** 建立連線 */
      connect: ws.connect,
      /** 中斷連線（手動關閉，不會觸發自動重連） */
      disconnect: ws.disconnect,
      /** 傳送訊息 */
      send: ws.send
    };
  },
  // 只保存最近一次訊息，連線狀態不需跨頁面保留
  { persist: { key: 'websocket', storage: sessionStorage, pick: ['wsResult'] } }
);

export default useWebSocketStore;