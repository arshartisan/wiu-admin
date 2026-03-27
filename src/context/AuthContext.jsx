import React, { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

const ADMIN_USER = {
  username: 'admin',
  password: 'admin123',
  name: 'Admin User',
  email: 'admin@giftflow.com',
  role: 'Administrator',
  initials: 'AU',
  phone: '+1 (555) 123-4567',
  joinedDate: '2024-01-15',
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('giftflow_auth')
    return stored ? JSON.parse(stored) : null
  })

  const login = useCallback((username, password) => {
    if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
      const { password: _, ...userData } = ADMIN_USER
      setUser(userData)
      localStorage.setItem('giftflow_auth', JSON.stringify(userData))
      return { success: true }
    }
    return { success: false, error: 'Invalid username or password' }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('giftflow_auth')
  }, [])

  const isAuthenticated = Boolean(user)

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}
