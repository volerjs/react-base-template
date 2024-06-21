import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = document.getElementById('root');
console.log("开始渲染了吗", root);
if (root) { 
    createRoot(root).render(<App />);
}