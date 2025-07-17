@echo off
echo Starting Socket.IO server...

REM Navigate to the socket server directory
cd realtimechatexpress

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
)

REM Start the server
echo Starting Socket.IO server on port 3001...
npm start

pause
