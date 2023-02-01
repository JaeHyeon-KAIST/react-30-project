import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux'
import { legacy_createStore } from 'redux';
import rootReducer from './store';
import { composeWithDevTools } from 'redux-devtools-extension';
import './index.css'

createRoot(document.querySelector('#root')).render(<Provider store={legacy_createStore(rootReducer, composeWithDevTools())}><App /></Provider>);