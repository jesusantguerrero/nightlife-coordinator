import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './assets/css/index.css';
import App from './App';

const el = document.getElementById('root')

ReactDOM.render((
  <BrowserRouter>
    <App /> 
  </BrowserRouter>
), el);

// registerServiceWorker();
