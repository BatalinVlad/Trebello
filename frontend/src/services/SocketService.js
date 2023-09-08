import io from 'socket.io-client';

const BASE_URL =
  process.env.NODE_ENV === 'production' ? 'https://trebello-production.up.railway.app' : '//localhost:3030';

let socket;

const SocketService = {
  setup,
  terminate,
  on,
  off,
  emit
};

function setup() {
  socket = io.connect(BASE_URL);
}

function terminate() {
  socket = null;
}

function on(eventName, cb) {
  socket.on(eventName, cb);
}

function off(eventName, cb) {
  socket.off(eventName, cb);
}

function emit(eventName, data) {
  socket.emit(eventName, data);
}

export default SocketService;
