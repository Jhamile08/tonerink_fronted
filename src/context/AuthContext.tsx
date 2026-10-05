import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

const TOKEN_KEY = 'token'
const USER_ID_KEY = 'userId'

type AuthContextValue = {
  token: string | null
  userId: string | null
  signIn: (token: string) => void
  signOut: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

/** Lee el payload de un JWT sin librerías externas. */
function decodeTokenSubject(token: string): string | null {
  try {
    const payload = token.split('.')[1]
    if (!payload) return null
    const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
    const claims = JSON.parse(json) as { sub?: string }
    return claims.sub ?? null
  } catch (error) {
    console.error('Error al decodificar el token:', error)
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY))
  const [userId, setUserId] = useState<string | null>(() => localStorage.getItem(USER_ID_KEY))

  const signIn = useCallback((newToken: string) => {
    const subject = decodeTokenSubject(newToken)
    localStorage.setItem(TOKEN_KEY, newToken)
    if (subject) localStorage.setItem(USER_ID_KEY, subject)
    setToken(newToken)
    setUserId(subject)
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_ID_KEY)
    setToken(null)
    setUserId(null)
  }, [])

  const value = useMemo(
    () => ({ token, userId, signIn, signOut }),
    [token, userId, signIn, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  }
  return context
}
