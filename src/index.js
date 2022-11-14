import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'antd/dist/antd.css'
import { AuthProvider } from './context/Auth';
import App from './App';
import { SearchProvider } from './context/Search';
import { CartProvider } from './context/Cart';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <AuthProvider>
  <SearchProvider>
  <CartProvider>
  <App />
  </CartProvider>
  </SearchProvider>
  </AuthProvider>

  </React.StrictMode>
);


