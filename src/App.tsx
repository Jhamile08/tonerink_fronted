import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Spinner, YStack } from 'tamagui'
import { RequireAuth } from './components/RequireAuth'
import { ScrollToHash } from './components/ScrollToHash'
import { Muted } from './components/ui'
import { brand } from './tamagui.config'
import Catalog from './pages/Catalog'
import Home from './pages/Home'

// Login y Admin sólo los usa el equipo de Tonerink, así que no viajan en el
// bundle inicial de la parte pública.
const Login = lazy(() => import('./pages/Login'))
const Admin = lazy(() => import('./pages/Admin'))

function FullPageSpinner() {
  return (
    <YStack minHeight="100vh" alignItems="center" justifyContent="center">
      <Spinner size="large" color={brand.blue} />
    </YStack>
  )
}

function NotFound() {
  return (
    <YStack minHeight="100vh" alignItems="center" justifyContent="center" gap="$3">
      <Muted fontSize={22}>Página no encontrada.</Muted>
      <a href="/">Volver al inicio</a>
    </YStack>
  )
}

export default function App() {
  return (
    <>
      <ScrollToHash />
      <Suspense fallback={<FullPageSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalog />} />
          <Route path="/login" element={<Login />} />
          <Route element={<RequireAuth />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  )
}
