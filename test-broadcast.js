// Test broadcast functionality
import axios from 'axios';

console.log('Testing broadcast functionality...');

const testBroadcast = async () => {
  try {
    const response = await axios.post('http://localhost:3001/broadcast', {
      channel: 'chat-session.test-session-123',
      event: 'message.sent',
      data: {
        id: 1,
        message: 'Test message from broadcast',
        sender_type: 'admin',
        sender_name: 'Test Admin',
        session_id: 'test-session-123',
        created_at: new Date().toISOString()
      }
    });

    console.log('✅ Broadcast successful:', response.data);
  } catch (error) {
    console.error('❌ Broadcast failed:', error.response?.data || error.message);
  }
};

// Test admin broadcast
const testAdminBroadcast = async () => {
  try {
    const response = await axios.post('http://localhost:3001/broadcast', {
      channel: 'admin-chat',
      event: 'message.sent',
      data: {
        id: 2,
        message: 'Test admin message',
        sender_type: 'guest',
        sender_name: 'Test Guest',
        session_id: 'test-session-456',
        created_at: new Date().toISOString()
      }
    });

    console.log('✅ Admin broadcast successful:', response.data);
  } catch (error) {
    console.error('❌ Admin broadcast failed:', error.response?.data || error.message);
  }
};

// Run tests
await testBroadcast();
await testAdminBroadcast();

console.log('🔚 Broadcast tests completed');
