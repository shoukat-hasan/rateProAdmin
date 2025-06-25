import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

const demoUsers = [
  { email: "company@ratepro.com", password: "company123", role: "company" },
  { email: "admin@ratepro.com", password: "admin123", role: "admin" },
]

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("authUser")
    return saved ? JSON.parse(saved) : null
  })

  const login = (email, password) => {
    const foundUser = demoUsers.find(
      (u) => u.email === email && u.password === password
    )
    if (foundUser) {
      setUser(foundUser)
      localStorage.setItem("authUser", JSON.stringify(foundUser))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("authUser")
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)


