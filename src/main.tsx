
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Only apply HTTPS redirect in production and not on localhost or preview URLs
const shouldRedirectToHttps = () => {
  const hostname = window.location.hostname;
  const isLocalhost = hostname.includes('localhost') || hostname === '127.0.0.1';
  const isPreviewUrl = hostname.includes('vercel.app');
  
  return window.location.protocol === 'http:' && !isLocalhost && !isPreviewUrl;
};

// Apply HTTPS redirect if needed
if (shouldRedirectToHttps()) {
  window.location.href = window.location.href.replace('http:', 'https:');
}

// Global error handler
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
});

// Global promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Root element not found in the document");
} else {
  try {
    console.log("Attempting to render application...");
    createRoot(rootElement).render(<App />);
    console.log("Application successfully rendered");
  } catch (error) {
    console.error("Failed to render application:", error);
    // Attempt to render a fallback error UI
    try {
      rootElement.innerHTML = `
        <div style="padding: 20px; text-align: center; font-family: sans-serif;">
          <h1>Something went wrong</h1>
          <p>There was an error loading the application. Please check the console for more details.</p>
        </div>
      `;
    } catch (fallbackError) {
      console.error("Failed to render fallback UI:", fallbackError);
    }
  }
}
