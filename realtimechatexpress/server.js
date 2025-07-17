const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

// Configure CORS for Socket.IO
const io = socketIo(server, {
  cors: {
    origin: [
      "http://localhost:5173", // Vite dev server
      "https://metanetaccess.peachy.icu", // Production domain
      "http://localhost:8000", // Laravel dev server
    ],
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://metanetaccess.peachy.icu",
    "http://localhost:8000",
  ],
  credentials: true
}));
app.use(express.json());

// Store active connections
const activeConnections = new Map();
const sessionRooms = new Map(); // sessionId -> Set of socketIds
const adminSockets = new Set(); // Set of admin socket IDs

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    connections: activeConnections.size,
    sessions: sessionRooms.size,
    admins: adminSockets.size
  });
});

// Endpoint to broadcast message from Laravel
app.post('/broadcast', (req, res) => {
  try {
    const { channel, event, data } = req.body;
    
    console.log('Broadcasting message:', { channel, event, data });
    
    if (channel.startsWith('chat-session.')) {
      const sessionId = channel.replace('chat-session.', '');
      
      // Broadcast to specific session room
      io.to(`session-${sessionId}`).emit(event, data);
      
      // Also broadcast to admin room
      io.to('admin-room').emit(event, data);
      
      console.log(`Message broadcasted to session-${sessionId} and admin-room`);
    } else if (channel === 'admin-chat') {
      // Broadcast only to admin room
      io.to('admin-room').emit(event, data);
      console.log('Message broadcasted to admin-room');
    }
    
    res.json({ success: true, message: 'Message broadcasted' });
  } catch (error) {
    console.error('Broadcast error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  activeConnections.set(socket.id, {
    connectedAt: new Date(),
    type: null,
    sessionId: null
  });

  // Handle guest joining a chat session
  socket.on('join-session', (data) => {
    try {
      const { sessionId, userType = 'guest' } = data;
      console.log(`${userType} joining session:`, sessionId);
      
      const roomName = `session-${sessionId}`;
      socket.join(roomName);
      
      // Update connection info
      const connectionInfo = activeConnections.get(socket.id);
      if (connectionInfo) {
        connectionInfo.type = userType;
        connectionInfo.sessionId = sessionId;
      }
      
      // Track session rooms
      if (!sessionRooms.has(sessionId)) {
        sessionRooms.set(sessionId, new Set());
      }
      sessionRooms.get(sessionId).add(socket.id);
      
      socket.emit('joined-session', { sessionId, roomName });
      console.log(`${userType} ${socket.id} joined ${roomName}`);
    } catch (error) {
      console.error('Error joining session:', error);
      socket.emit('error', { message: 'Failed to join session' });
    }
  });

  // Handle admin joining admin room
  socket.on('join-admin', () => {
    try {
      console.log('Admin joining admin room:', socket.id);
      socket.join('admin-room');
      adminSockets.add(socket.id);
      
      // Update connection info
      const connectionInfo = activeConnections.get(socket.id);
      if (connectionInfo) {
        connectionInfo.type = 'admin';
      }
      
      socket.emit('joined-admin', { room: 'admin-room' });
      console.log(`Admin ${socket.id} joined admin-room`);
    } catch (error) {
      console.error('Error joining admin room:', error);
      socket.emit('error', { message: 'Failed to join admin room' });
    }
  });

  // Handle leaving session
  socket.on('leave-session', (data) => {
    try {
      const { sessionId } = data;
      const roomName = `session-${sessionId}`;
      socket.leave(roomName);
      
      // Remove from session tracking
      if (sessionRooms.has(sessionId)) {
        sessionRooms.get(sessionId).delete(socket.id);
        if (sessionRooms.get(sessionId).size === 0) {
          sessionRooms.delete(sessionId);
        }
      }
      
      console.log(`Socket ${socket.id} left ${roomName}`);
    } catch (error) {
      console.error('Error leaving session:', error);
    }
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    
    // Clean up tracking
    const connectionInfo = activeConnections.get(socket.id);
    if (connectionInfo && connectionInfo.sessionId) {
      const sessionId = connectionInfo.sessionId;
      if (sessionRooms.has(sessionId)) {
        sessionRooms.get(sessionId).delete(socket.id);
        if (sessionRooms.get(sessionId).size === 0) {
          sessionRooms.delete(sessionId);
        }
      }
    }
    
    adminSockets.delete(socket.id);
    activeConnections.delete(socket.id);
  });

  // Handle ping for connection testing
  socket.on('ping', () => {
    socket.emit('pong', { timestamp: new Date().toISOString() });
  });
});

const PORT = process.env.SOCKET_PORT || 3001;
server.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
  console.log('CORS origins:', [
    "http://localhost:5173",
    "https://metanetaccess.peachy.icu", 
    "http://localhost:8000"
  ]);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
