// Authentication Debug Script
// Jalankan di browser console untuk debug masalah authentication

class AuthDebugger {
    constructor() {
        this.baseUrl = window.location.origin;
    }

    async debugCSRFToken() {
        console.log('🔍 Debugging CSRF Token...');
        
        // Check meta tag
        const metaToken = document.querySelector('meta[name="csrf-token"]')?.content;
        console.log('Meta CSRF Token:', metaToken ? metaToken.substring(0, 10) + '...' : 'NOT FOUND');
        
        // Check if token is in Inertia props
        const inertiaProps = window.page?.props;
        console.log('Inertia Props CSRF Token:', inertiaProps?.csrf_token ? inertiaProps.csrf_token.substring(0, 10) + '...' : 'NOT FOUND');
        
        // Test token validity
        if (metaToken) {
            try {
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': metaToken,
                        'X-Requested-With': 'XMLHttpRequest',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        email: 'test@test.com',
                        password: 'test'
                    })
                });
                
                console.log('CSRF Token Test Response Status:', response.status);
                
                if (response.status === 419) {
                    console.error('❌ CSRF Token is invalid or expired');
                } else if (response.status === 422) {
                    console.log('✅ CSRF Token is valid (validation error expected)');
                } else {
                    console.log('✅ CSRF Token appears to be working');
                }
            } catch (error) {
                console.error('❌ Error testing CSRF token:', error);
            }
        }
    }

    async debugSession() {
        console.log('🔍 Debugging Session...');
        
        // Check cookies
        const cookies = document.cookie.split(';').reduce((acc, cookie) => {
            const [key, value] = cookie.trim().split('=');
            acc[key] = value;
            return acc;
        }, {});
        
        console.log('Session Cookies:', Object.keys(cookies).filter(key => 
            key.includes('session') || key.includes('laravel') || key.includes('XSRF')
        ));
        
        // Test session endpoint
        try {
            const response = await fetch('/login', {
                method: 'GET',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json'
                }
            });
            
            console.log('Session Test Response Status:', response.status);
            console.log('Session Test Response Headers:', Object.fromEntries(response.headers.entries()));
        } catch (error) {
            console.error('❌ Error testing session:', error);
        }
    }

    async debugInertiaRequest() {
        console.log('🔍 Debugging Inertia Request...');
        
        // Check if Inertia is loaded
        if (typeof window.Inertia !== 'undefined' || typeof window.router !== 'undefined') {
            console.log('✅ Inertia is loaded');
            
            // Check Inertia version
            console.log('Inertia Version:', window.Inertia?.version || 'Unknown');
        } else {
            console.error('❌ Inertia not found');
        }
        
        // Test manual Inertia request
        try {
            const { router } = await import('@inertiajs/react');
            
            console.log('Testing Inertia POST request...');
            
            // This will trigger the same request as login form
            router.post('/login', {
                email: 'test@test.com',
                password: 'test'
            }, {
                onError: (errors) => {
                    console.log('Inertia Request Errors:', errors);
                    if (errors.message === 'CSRF token mismatch') {
                        console.error('❌ CSRF token mismatch in Inertia request');
                    } else {
                        console.log('✅ CSRF token working (validation errors expected)');
                    }
                },
                onSuccess: () => {
                    console.log('✅ Inertia request successful');
                }
            });
        } catch (error) {
            console.error('❌ Error testing Inertia request:', error);
        }
    }

    async debugHeaders() {
        console.log('🔍 Debugging Request Headers...');
        
        const testUrl = '/login';
        const token = document.querySelector('meta[name="csrf-token"]')?.content;
        
        const headers = {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': 'application/json'
        };
        
        if (token) {
            headers['X-CSRF-TOKEN'] = token;
        }
        
        console.log('Request Headers:', headers);
        
        try {
            const response = await fetch(testUrl, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    email: 'test@test.com',
                    password: 'test'
                })
            });
            
            console.log('Response Status:', response.status);
            console.log('Response Headers:', Object.fromEntries(response.headers.entries()));
            
            const responseText = await response.text();
            console.log('Response Body (first 200 chars):', responseText.substring(0, 200));
            
        } catch (error) {
            console.error('❌ Error in header test:', error);
        }
    }

    async runAllTests() {
        console.log('🚀 Starting Authentication Debug Tests...\n');
        
        await this.debugCSRFToken();
        console.log('\n');
        
        await this.debugSession();
        console.log('\n');
        
        await this.debugInertiaRequest();
        console.log('\n');
        
        await this.debugHeaders();
        
        console.log('\n🎯 Debug tests completed. Check the logs above for issues.');
    }
}

// Auto-run tests
const debugger = new AuthDebugger();
debugger.runAllTests();

// Export for manual testing
window.authDebugger = debugger;
