
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Root element not found in the document");
} else {
  try {
    createRoot(rootElement).render(<App />);
    console.log("Application successfully rendered");
  } catch (error) {
    console.error("Failed to render application:", error);
  }
}
