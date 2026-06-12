import { store } from '@/stores';

let socket: WebSocket;

export const connectSocket = () => {
  // 與 axios 一致，從 runtime 載入的全域設定讀取 WebSocket 連線位址
  const wsUrl = window.__APP_CONFIG__?.WS_URL;
  if (!wsUrl) {
    console.error('未設定 WS_URL，無法建立 WebSocket 連線');
    return;
  }

  const websocketStore = store.webSocketStore();
  socket = new WebSocket(wsUrl);

  //連線(onopen)
  socket.onopen = function () {
    console.log('websocket connected!!');
  };

  //監聽訊息(onmessage)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  socket.onmessage = function (msg: any) {
    websocketStore.fetch(JSON.parse(msg ?? {}));
  };

  //監聽錯誤(onerror)
  socket.onerror = function (err) {
    console.log('error', err);
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sendSocketMessage = (msg: any) => {
  if (socket.readyState === 1) {
    socket.send(JSON.stringify(msg));
  }
};
