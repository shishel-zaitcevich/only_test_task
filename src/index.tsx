import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
