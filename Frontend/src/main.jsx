import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {LogContextProvider} from './context/LogContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LogContextProvider>
    <App />
    </LogContextProvider>
  </StrictMode>,
)
