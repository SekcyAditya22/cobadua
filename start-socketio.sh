#!/bin/bash

# Start Socket.IO server script
echo "Starting Socket.IO server..."

# Navigate to the socket server directory
cd realtimechatexpress

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Start the server
echo "Starting Socket.IO server on port 3001..."
npm start
