import React, { createContext, useState, useEffect, type ReactNode } from "react"
import { authAPI } from "../services/api"
import type { User } from "../types"

interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  signup: (email: string, password: string, name: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await authAPI.me()
        setUser(userData)
      } catch {
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    const response = await authAPI.login(email, password)
    setUser(response.user)
  }

  const logout = () => {
    authAPI.logout()
    setUser(null)
  }

  const signup = async (email: string, password: string, name: string) => {
    const response = await authAPI.register(email, password, name)
    setUser(response.user)
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, isLoading, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
