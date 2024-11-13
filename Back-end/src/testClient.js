const { io } = require('socket.io-client');

// Connect to the server (replace with your server URL and port if needed)
const socket = io('http://localhost:5000');

socket.on('connect', () => {
  console.log('Connected to the server:', socket.id);

  // Send a test message to the server
  socket.emit('message', 'Hello from test client');

  // Listen for responses from the server
  socket.on('message-received', (data) => {
    console.log('Message from server:', data);
  });
});

socket.on('disconnect', () => {
  console.log('Disconnected from the server');
});
