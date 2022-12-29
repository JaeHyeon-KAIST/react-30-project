import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './containers/App';

createRoot(document.querySelector('#root')).render(<App />);