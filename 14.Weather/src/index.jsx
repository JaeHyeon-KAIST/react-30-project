import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import WeatherProvider from './WeatherProvider/WeatherProvider';

createRoot(document.querySelector('#root')).render(<WeatherProvider><App /></WeatherProvider>);