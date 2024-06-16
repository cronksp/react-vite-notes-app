import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // Copilot - Your console logs might be hitting twice due to React's StrictMode.
  //<React.StrictMode>
    <App />
  //</React.StrictMode>
)
