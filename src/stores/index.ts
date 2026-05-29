import useUserStore from './auth/user';
import useLayoutStore from './layout/layout';
import useWebSocketStore from './websocket/websocket';

/** 全域狀態管理(Pinia) */
export const store = {
  layoutStore: useLayoutStore,
  userStore: useUserStore,
  webSocketStore: useWebSocketStore
};
