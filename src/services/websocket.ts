import { store } from '@/stores';

const wsUrl = import.meta.env.VITE_BaseURL;
let socket: WebSocket;

export const connectSocket = () => {
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
