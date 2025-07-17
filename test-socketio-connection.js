// Test Socket.IO connection
import { io } from 'socket.io-client';

console.log('Testing Socket.IO connection...');

const socket = io('http://localhost:3001', {
  transports: ['websocket', 'polling'],
  timeout: 10000,
});

socket.on('connect', () => {
  console.log('✅ Connected to Socket.IO server:', socket.id);
  
  // Test joining a session
  socket.emit('join-session', { sessionId: 'test-session-123', userType: 'guest' });
  
  // Test ping
  socket.emit('ping');
});

socket.on('joined-session', (data) => {
  console.log('✅ Successfully joined session:', data);
});

socket.on('pong', (data) => {
  console.log('✅ Received pong:', data);
});

socket.on('connect_error', (error) => {
  console.error('❌ Connection error:', error.message);
});

socket.on('disconnect', (reason) => {
  console.log('🔌 Disconnected:', reason);
});

socket.on('error', (error) => {
  console.error('❌ Socket error:', error);
});

// Test for 10 seconds then disconnect
setTimeout(() => {
  console.log('🔚 Test completed, disconnecting...');
  socket.disconnect();
  process.exit(0);
}, 10000);
