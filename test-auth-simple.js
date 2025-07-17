// Simple Authentication Test
// Paste this in browser console to test authentication

console.log('🔍 Testing Authentication...');

// 1. Check CSRF Token
const token = document.querySelector('meta[name="csrf-token"]')?.content;
console.log('CSRF Token:', token ? '✅ Found: ' + token.substring(0, 10) + '...' : '❌ Not found');

// 2. Check Session Cookie
const sessionCookie = document.cookie.split(';').find(c => c.includes('session'));
console.log('Session Cookie:', sessionCookie ? '✅ Found' : '❌ Not found');

// 3. Test CSRF Token Validation
async function testCSRFValidation() {
    try {
        // First, get a fresh page to ensure session is established
        const getResponse = await fetch('/login', {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        });

        console.log('GET /login Status:', getResponse.status);

        // Now test POST with CSRF token
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': token,
                'X-Requested-With': 'XMLHttpRequest',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email: 'test@example.com',
                password: 'wrongpassword'
            })
        });

        console.log('POST /login Status:', response.status);

        if (response.status === 419) {
            console.error('❌ CSRF Token Error - Token invalid or expired');
            console.log('💡 Try: Clear browser cache, restart server, check session storage');
        } else if (response.status === 422) {
            console.log('✅ CSRF Token OK - Validation error (expected)');
        } else {
            console.log('✅ Request processed - Status:', response.status);
        }

        const responseText = await response.text();
        console.log('Response (first 200 chars):', responseText.substring(0, 200));

    } catch (error) {
        console.error('❌ CSRF validation test failed:', error);
    }
}

// 4. Test Session Storage
async function testSessionStorage() {
    try {
        // Check if session files exist (for file driver)
        console.log('Session Driver: file (check storage/framework/sessions/ on server)');
        console.log('All Cookies:', document.cookie.split(';').map(c => c.trim()));

    } catch (error) {
        console.error('❌ Session storage test failed:', error);
    }
}

// Run all tests
if (token) {
    console.log('\n🧪 Running Tests...\n');
    testCSRFValidation();
    testSessionStorage();
} else {
    console.error('❌ Cannot run tests - CSRF token not found');
    console.log('💡 Try refreshing the page or check if meta tag exists');
}

// Export functions for manual testing
window.testCSRF = testCSRFValidation;
window.testSession = testSessionStorage;
