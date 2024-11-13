// ioserver.ts

import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

let io: Server;

export function initializeSocketServer(httpServer: HttpServer): Server {
  io = new Server(httpServer, {
    cors: {
      origin: 'http://localhost:3000',
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Handle authentication token if needed
    const token = socket.handshake.auth.token;
    // You can verify the token and associate the socket with the user

    socket.on('user-logged-in', (user) => {
      console.log('User logged in:', user);
      // Perform actions like updating online users list
    });

    socket.on('user-logged-out', () => {
      console.log('User logged out:', socket.id);
      // Perform actions like updating online users list
    });

    socket.on('join-room', (roomId) => {
      socket.join(roomId);
      console.log(`Socket ${socket.id} joined room ${roomId}`);
    });

    socket.on('leave-room', (roomId) => {
      socket.leave(roomId);
      console.log(`Socket ${socket.id} left room ${roomId}`);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  return io;
}

export { io };
