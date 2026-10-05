import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { TamaguiProvider } from 'tamagui'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import config from './tamagui.config'
import './styles/global.css'

const container = document.getElementById('root')
if (!container) {
  throw new Error('No se encontró el elemento #root')
}

createRoot(container).render(
  <StrictMode>
    <TamaguiProvider config={config} defaultTheme="light">
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </TamaguiProvider>
  </StrictMode>,
)
