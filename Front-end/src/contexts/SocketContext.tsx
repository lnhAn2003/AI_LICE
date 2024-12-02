import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import Cookies from 'js-cookie';

interface SocketContextType {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocketContext must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const token = Cookies.get('token');
    const socketIo = io('http://localhost:5000', {
      withCredentials: true,
      auth: {
        token,
      },
    });

    setSocket(socketIo);

    socketIo.on('connect', () => {
      console.log('Connected to Socket.IO server:', socketIo.id);
    });

    socketIo.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
    });

    return () => {
      socketIo.disconnect();
    };
  }, []);

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};
