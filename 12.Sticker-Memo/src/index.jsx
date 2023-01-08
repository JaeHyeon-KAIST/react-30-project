import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import MemoStore from "./store/memoStore";

createRoot(document.querySelector('#root')).render(<App store={new MemoStore()} />);