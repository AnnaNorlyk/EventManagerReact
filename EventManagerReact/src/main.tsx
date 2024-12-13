import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; 
import './View/Styles/index.css'; 
import './View/Styles/App.css'; 
import './View/Styles/Events.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
