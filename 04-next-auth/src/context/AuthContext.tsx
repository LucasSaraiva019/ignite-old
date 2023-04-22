import { api } from "@/services/apiClient";
import router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { ReactNode, createContext, useEffect, useState } from "react";

type User = {
  email: string
  premissions: string[]
  roles: string[]
}
type SignInCredentials = {
  email: string
  password: string
}
type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>
  isAuthenticated: boolean
  user: User
}
type AuthProviderProps = {
  children: ReactNode
}
export const AuthContext = createContext({} as AuthContextData)

export function signOut() {
  destroyCookie(undefined, 'nextauth.token')
  destroyCookie(undefined, 'nextauth.refreshToken')
  router.push('/')
}
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>()
  const isAuthenticated = !!user

  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies()

    if (token) {
      api.get('/me').then(response => {
        const { email, premissions, roles } = response.data

        setUser({ email, premissions, roles })
      }).catch(() => {
        signOut()
      })
    }
  }, [])
  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('sessions', {
        email, password
      })
      const { token, refreshToken, premissions, roles } = response.data

      setCookie(undefined, 'nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      })
      setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      })

      setUser({
        email,
        premissions,
        roles
      })
      api.defaults.headers['Authorization'] = `Bearer ${token}`

      router.push('/dashboard')
    } catch (error) {
      console.log(error)
    }
  }
  return <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
    {children}
  </AuthContext.Provider>
}