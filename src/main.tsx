
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log('Starting application...');

const rootElement = document.getElementById("root");
console.log('Root element found:', rootElement);

if (rootElement) {
  const root = createRoot(rootElement);
  console.log('React root created');
  
  try {
    root.render(<App />);
    console.log('App rendered successfully');
  } catch (error) {
    console.error('Error rendering App:', error);
  }
} else {
  console.error('Root element not found!');
}
