import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App';
import { Provider } from "react-redux";
import { createStore } from "redux";
import musicPlayerReducer from "./store/musicPlayerReducer";
import { composeWithDevTools } from "redux-devtools-extension"

const store = createStore(musicPlayerReducer, composeWithDevTools());

createRoot(document.querySelector('#root')).render(<Provider store={store}><App /></Provider>);