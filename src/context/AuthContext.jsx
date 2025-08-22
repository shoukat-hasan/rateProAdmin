// import { createContext, useContext, useState, useEffect } from "react"
// import axiosInstance from "../api/axiosInstance";

// const AuthContext = createContext()

// export const AuthProvider = ({ children }) => {
//   // const [user, setUser] = useState(() => {
//   //   const storedUser = localStorage.getItem("authUser");
//   //   return storedUser ? JSON.parse(storedUser) : null;
//   // });

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const res = await axiosInstance.get("/auth/me", { withCredentials: true });
//         setUser(res.data.user);
//       } catch (err) {
//         setUser(null); // Not logged in
//       }
//     };

//     checkAuth();
//   }, []);



//   // const login = (email, password) => {
//   //   const foundUser = demoUsers.find(
//   //     (u) => u.email === email && u.password === password
//   //   )
//   //   if (foundUser) {
//   //     setUser(foundUser)
//   //     localStorage.setItem("authUser", JSON.stringify(foundUser))
//   //     return true
//   //   }
//   //   return false
//   // }

//   // const login = async (email, password) => {
//   //   try {
//   //     const res = await axiosInstance.post("/auth/login", {
//   //       email,
//   //       password,
//   //       source: "admin", // ya "public"
//   //     });

//   //     const user = res.data.user; // full user with avatar

//   //     setUser(user);
//   //     localStorage.setItem("authUser", JSON.stringify(user));
//   //     return true;
//   //   } catch (err) {
//   //     console.error("Login error", err);
//   //     return false;
//   //   }
//   // };

//   const login = async (email, password) => {
//     try {
//       await axiosInstance.post("/auth/login", { email, password, source: "admin" }, { withCredentials: true });

//       // Ab cookie set hogayi, ab user fetch karo
//       const res = await axiosInstance.get("/auth/me", { withCredentials: true });
//       setUser(res.data.user);
//       return true;
//     } catch (err) {
//       console.error("Login error", err);
//       return false;
//     }
//   };

//   // const logout = () => {
//   //   setUser(null)
//   //   localStorage.removeItem("authUser")
//   //   localStorage.removeItem("accessToken")
//   // }

//   const logout = async () => {
//     await axiosInstance.post("/auth/logout", {}, { withCredentials: true });
//     setUser(null);
//   };


//   return (
//     <AuthContext.Provider value={{ user, login, logout, setUser }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export const useAuth = () => useContext(AuthContext)
// import { createContext, useContext, useState, useEffect } from "react";
// import axiosInstance from "../api/axiosInstance";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkAuth = async () => {
//       const hasAuthUser = localStorage.getItem("authUser");

//       // If no token or no authUser found, skip the request
//       if (!hasAuthUser) {
//         setUser(null);
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await axiosInstance.get("/auth/me", { withCredentials: true });
//         setUser(res.data.user);
//       } catch (err) {
//         setUser(null); // Not logged in
//       } finally {
//         setLoading(false); // ✅ important
//       }
//     };

//     checkAuth();
//   }, []);

//   const login = async (email, password) => {
//     try {
//       await axiosInstance.post("/auth/login", { email, password, source: "admin" }, { withCredentials: true });
//       const res = await axiosInstance.get("/auth/me", { withCredentials: true });
//       setUser(res.data.user);
//       return true;
//     } catch (err) {
//       console.error("Login error", err);
//       return false;
//     }
//   };

//   const logout = async () => {
//     await axiosInstance.post("/auth/logout", {}, { withCredentials: true });
//     localStorage.removeItem("authUser");
//     setUser(null);
//   };

//   const updateCompanyInfo = (updatedTenant) => {
//     setUser((prev) => {
//       if (!prev) return prev;
//       return {
//         ...prev,
//         tenant: {
//           ...prev.tenant,
//           ...updatedTenant
//         }
//       };
//     });
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, setUser, updateCompanyInfo, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const hasAuthUser = localStorage.getItem("authUser");

      if (!hasAuthUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const res = await axiosInstance.get("/auth/me", { withCredentials: true });
        // console.log("checkAuth: User data fetched", res.data.user);
        setUser(res.data.user);
      } catch (err) {
        console.error("checkAuth error:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      await axiosInstance.post("/auth/login", { email, password, source: "admin" }, { withCredentials: true });
      const res = await axiosInstance.get("/auth/me", { withCredentials: true });
      console.log("login: User data fetched", res.data.user);
      setUser(res.data.user);
      localStorage.setItem("authUser", JSON.stringify(res.data.user));
      return true;
    } catch (err) {
      console.error("Login error:", err);
      return false;
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout", {}, { withCredentials: true });
      localStorage.removeItem("authUser");
      setUser(null);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const updateCompanyInfo = (updatedTenant) => {
    setUser((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        tenant: {
          ...prev.tenant,
          ...updatedTenant,
        },
      };
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser, updateCompanyInfo, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);