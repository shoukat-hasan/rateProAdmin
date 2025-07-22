import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("authUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  

  // const login = (email, password) => {
  //   const foundUser = demoUsers.find(
  //     (u) => u.email === email && u.password === password
  //   )
  //   if (foundUser) {
  //     setUser(foundUser)
  //     localStorage.setItem("authUser", JSON.stringify(foundUser))
  //     return true
  //   }
  //   return false
  // }

  const login = async (email, password) => {
    try {
      const res = await axiosInstance.post("/auth/login", {
        email,
        password,
        source: "admin", // ya "public"
      });
  
      const user = res.data.user; // full user with avatar
  
      setUser(user);
      localStorage.setItem("authUser", JSON.stringify(user));
      return true;
    } catch (err) {
      console.error("Login error", err);
      return false;
    }
  };

  const logout = () => {
    setUser(null)
    localStorage.removeItem("authUser")
    localStorage.removeItem("accessToken")
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)


