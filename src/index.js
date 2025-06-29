import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // This imports your main App component

const container = document.getElementById('root');

// This checks if the 'root' element exists in index.html before trying to render
if (container) {
  const root = createRoot(container); // Create a React root to manage your app
  root.render(<App />); // Render your main App component into the root
} else {
  console.error('Root element with ID "root" not found in the document. Your React app cannot start.');
}