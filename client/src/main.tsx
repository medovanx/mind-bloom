import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // Assuming App.tsx is in the same directory
import { AuthProvider } from './context/AuthContext';  // Import the AuthProvider

// Ensure you have an element with ID 'root' in your index.html
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
