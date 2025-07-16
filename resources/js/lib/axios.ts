import axios from 'axios';

// Function to get CSRF token
const getCsrfToken = (): string | null => {
    const token = document.head.querySelector('meta[name="csrf-token"]') as HTMLMetaElement;
    return token ? token.content : null;
};

// Set up CSRF token for axios requests
const setupCsrfToken = () => {
    const token = getCsrfToken();
    if (token) {
        axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
        console.log('CSRF token set:', token.substring(0, 10) + '...');
        return token;
    } else {
        console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
        return null;
    }
};

// Initial setup
setupCsrfToken();

// Set default headers
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = 'application/json';

// Set timeout
axios.defaults.timeout = 30000; // 30 seconds

// Add request interceptor to ensure CSRF token is always fresh
axios.interceptors.request.use(
  (config) => {
    // Refresh CSRF token for each request
    const token = getCsrfToken();
    if (token) {
      config.headers['X-CSRF-TOKEN'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for retry logic and CSRF token refresh
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;

    // Handle CSRF token mismatch (419 error)
    if (error.response?.status === 419 && !config._csrfRetry) {
      config._csrfRetry = true;
      console.log('CSRF token mismatch, refreshing token and retrying...');

      // Try to refresh CSRF token
      const newToken = setupCsrfToken();
      if (newToken) {
        config.headers['X-CSRF-TOKEN'] = newToken;
        return axios(config);
      }
    }

    // Retry on network errors or timeouts
    if (
      (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK') &&
      config &&
      !config._retry
    ) {
      config._retry = true;
      console.log('Retrying request:', config.url);

      // Wait 1 second before retry
      await new Promise(resolve => setTimeout(resolve, 1000));

      return axios(config);
    }

    return Promise.reject(error);
  }
);

export default axios;
