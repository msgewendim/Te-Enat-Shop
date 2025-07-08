import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env["VITE_API_URL"] || 'http://localhost:3000';

export const useSocket = (room: string): { socket: Socket | null, isConnected: boolean } => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const newSocket = io(SOCKET_URL, {
      transports: ['websocket'],
    });

    newSocket.on('connect', () => {
      setIsConnected(true);
      newSocket.emit('joinRoom', room);
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
    });

    setSocket(newSocket);

    return () => {
      newSocket.emit('leaveRoom', room);
      newSocket.disconnect();
    };
  }, [room]);

  return { socket, isConnected };
};
