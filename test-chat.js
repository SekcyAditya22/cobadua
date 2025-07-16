// Chat Testing Script
// Jalankan di browser console untuk test chat functionality

class ChatTester {
    constructor() {
        this.baseUrl = window.location.origin;
        this.csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;
    }

    async testCsrfToken() {
        console.log('🔍 Testing CSRF Token...');
        if (this.csrfToken) {
            console.log('✅ CSRF Token found:', this.csrfToken.substring(0, 10) + '...');
            return true;
        } else {
            console.error('❌ CSRF Token not found');
            return false;
        }
    }

    async testApiEndpoints() {
        console.log('🔍 Testing API Endpoints...');
        
        const endpoints = [
            '/api/chat/session-from-cookie',
            '/broadcasting/auth'
        ];

        for (const endpoint of endpoints) {
            try {
                const response = await fetch(this.baseUrl + endpoint, {
                    method: 'GET',
                    headers: {
                        'X-CSRF-TOKEN': this.csrfToken,
                        'X-Requested-With': 'XMLHttpRequest',
                        'Accept': 'application/json'
                    }
                });
                
                if (response.status === 404 && endpoint.includes('session-from-cookie')) {
                    console.log('✅ ' + endpoint + ' - 404 (expected for no session)');
                } else if (response.status === 403 && endpoint.includes('broadcasting')) {
                    console.log('✅ ' + endpoint + ' - 403 (expected for no auth)');
                } else {
                    console.log('✅ ' + endpoint + ' - Status:', response.status);
                }
            } catch (error) {
                console.error('❌ ' + endpoint + ' - Error:', error);
            }
        }
    }

    async testPusherConnection() {
        console.log('🔍 Testing Pusher Connection...');
        
        if (typeof Pusher === 'undefined') {
            console.error('❌ Pusher not loaded');
            return false;
        }

        try {
            const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY || 'test', {
                cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER || 'mt1',
                forceTLS: true,
                authEndpoint: '/broadcasting/auth',
                auth: {
                    headers: {
                        'X-CSRF-TOKEN': this.csrfToken,
                    }
                }
            });

            pusher.connection.bind('connected', () => {
                console.log('✅ Pusher connected successfully');
                pusher.disconnect();
            });

            pusher.connection.bind('error', (error) => {
                console.error('❌ Pusher connection error:', error);
            });

            return true;
        } catch (error) {
            console.error('❌ Pusher initialization error:', error);
            return false;
        }
    }

    async testChatSession() {
        console.log('🔍 Testing Chat Session Creation...');
        
        try {
            const response = await fetch(this.baseUrl + '/api/chat/start-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': this.csrfToken,
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: 'Test User',
                    email: 'test@example.com',
                    phone: '08123456789'
                })
            });

            const data = await response.json();
            
            if (data.success) {
                console.log('✅ Chat session created:', data.data.session_id);
                return data.data.session_id;
            } else {
                console.error('❌ Failed to create chat session:', data);
                return null;
            }
        } catch (error) {
            console.error('❌ Chat session creation error:', error);
            return null;
        }
    }

    async testSendMessage(sessionId) {
        if (!sessionId) {
            console.error('❌ No session ID provided');
            return false;
        }

        console.log('🔍 Testing Send Message...');
        
        try {
            const response = await fetch(this.baseUrl + '/api/chat/send-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': this.csrfToken,
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    session_id: sessionId,
                    message: 'Test message from console',
                    sender_type: 'guest'
                })
            });

            const data = await response.json();
            
            if (data.success) {
                console.log('✅ Message sent successfully:', data.data);
                return true;
            } else {
                console.error('❌ Failed to send message:', data);
                return false;
            }
        } catch (error) {
            console.error('❌ Send message error:', error);
            return false;
        }
    }

    async runAllTests() {
        console.log('🚀 Starting Chat System Tests...\n');
        
        const results = {
            csrfToken: await this.testCsrfToken(),
            apiEndpoints: await this.testApiEndpoints(),
            pusherConnection: await this.testPusherConnection()
        };

        const sessionId = await this.testChatSession();
        if (sessionId) {
            results.sendMessage = await this.testSendMessage(sessionId);
        }

        console.log('\n📊 Test Results Summary:');
        console.log('CSRF Token:', results.csrfToken ? '✅' : '❌');
        console.log('API Endpoints:', results.apiEndpoints ? '✅' : '❌');
        console.log('Pusher Connection:', results.pusherConnection ? '✅' : '❌');
        console.log('Send Message:', results.sendMessage ? '✅' : '❌');

        const allPassed = Object.values(results).every(result => result === true);
        console.log('\n🎯 Overall Result:', allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED');

        return results;
    }
}

// Auto-run tests
const tester = new ChatTester();
tester.runAllTests();

// Export for manual testing
window.chatTester = tester;
