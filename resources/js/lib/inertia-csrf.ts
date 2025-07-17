import { router } from '@inertiajs/react';

// Function to get CSRF token from meta tag
const getCsrfToken = (): string | null => {
    const token = document.head.querySelector('meta[name="csrf-token"]') as HTMLMetaElement;
    return token ? token.content : null;
};

// Configure Inertia to include CSRF token in all requests
export const setupInertiaCSRF = () => {
    // Add CSRF token to all Inertia requests
    router.on('before', (event) => {
        const token = getCsrfToken();
        if (token) {
            // Ensure headers object exists
            if (!event.detail.visit.headers) {
                event.detail.visit.headers = {};
            }

            // Add CSRF token to headers
            event.detail.visit.headers['X-CSRF-TOKEN'] = token;
            event.detail.visit.headers['X-Requested-With'] = 'XMLHttpRequest';

            console.log('Inertia request with CSRF token:', token.substring(0, 10) + '...');
        } else {
            console.error('CSRF token not found for Inertia request');
        }
    });

    // Handle CSRF token errors with simpler approach
    router.on('error', (event: any) => {
        const errors = event.detail.errors;

        // Check if it's a CSRF token error
        if (errors && (errors.message === 'CSRF token mismatch' ||
                      (event.detail.response && event.detail.response.status === 419))) {
            console.error('CSRF token error detected, refreshing page...');

            // Simple approach: just reload the page to get fresh token
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    });

    console.log('Inertia CSRF protection configured');
};

// Export function to manually refresh CSRF token
export const refreshCSRFToken = async (): Promise<string | null> => {
    try {
        // Make a request to get fresh CSRF token
        const response = await fetch(window.location.href, {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            }
        });
        
        if (response.ok) {
            const text = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');
            const newToken = doc.head.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            
            if (newToken) {
                // Update the current page's CSRF token
                const currentTokenMeta = document.head.querySelector('meta[name="csrf-token"]') as HTMLMetaElement;
                if (currentTokenMeta) {
                    currentTokenMeta.content = newToken;
                }
                
                console.log('CSRF token refreshed:', newToken.substring(0, 10) + '...');
                return newToken;
            }
        }
    } catch (error) {
        console.error('Failed to refresh CSRF token:', error);
    }
    
    return null;
};
