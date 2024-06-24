import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

 const socketInstance = io(SOCKET_URL,{
    autoConnect:false
});

export {socketInstance}