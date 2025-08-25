// import { createContext, useContext, useState, useEffect } from "react";
// import axiosInstance from "../api/axiosInstance";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkAuth = async () => {
//       const hasAuthUser = localStorage.getItem("authUser");

//       if (!hasAuthUser) {
//         setUser(null);
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await axiosInstance.get("/auth/me", { withCredentials: true });
//         // console.log("checkAuth: User data fetched", res.data.user);
//         setUser(res.data.user);
//       } catch (err) {
//         console.error("checkAuth error:", err);
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkAuth();
//   }, []);

//   const login = async (email, password) => {
//     try {
//       await axiosInstance.post("/auth/login", { email, password, source: "admin" }, { withCredentials: true });
//       const res = await axiosInstance.get("/auth/me", { withCredentials: true });
//       console.log("login: User data fetched", res.data.user);
//       setUser(res.data.user);
//       localStorage.setItem("authUser", JSON.stringify(res.data.user));
//       return true;
//     } catch (err) {
//       console.error("Login error:", err);
//       return false;
//     }
//   };

//   const hasPermission = (permissionName) => {
//     if (!user) {
//       return false;
//     }
//     for (const role of user.customRoles || []) {  
//       if (
//         role.permissions?.some((p) => {
//           if (typeof p === "string") {
//             return p === permissionName;
//           } else if (typeof p === "object") {
//             return p.name === permissionName;
//           }
//           return false;
//         })
//       ) {
//         return true;
//       }
//     }
//     return false;
//   };
  
//   const logout = async () => {
//     try {
//       await axiosInstance.post("/auth/logout", {}, { withCredentials: true });
//       localStorage.removeItem("authUser");
//       setUser(null);
//     } catch (err) {
//       console.error("Logout error:", err);
//     }
//   };

//   const updateCompanyInfo = (updatedTenant) => {
//     setUser((prev) => {
//       if (!prev) return prev;
//       return {
//         ...prev,
//         tenant: {
//           ...prev.tenant,
//           ...updatedTenant,
//         },
//       };
//     });
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, setUser, updateCompanyInfo, hasPermission, loading }}>
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
      try {
        setLoading(true);
        const res = await axiosInstance.get("/auth/me", { withCredentials: true });
        setUser(res.data.user);
        localStorage.setItem("authUser", "true"); // Only store auth status
      } catch (err) {
        console.error("checkAuth error:", err);
        setUser(null);
        localStorage.removeItem("authUser");
      } finally {
        setLoading(false);
      }
    };

    if (localStorage.getItem("authUser")) {
      checkAuth();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      await axiosInstance.post("/auth/login", { email, password, source: "admin" }, { withCredentials: true });
      const res = await axiosInstance.get("/auth/me", { withCredentials: true });
      setUser(res.data.user);
      localStorage.setItem("authUser", "true"); // Only store auth status
      return true;
    } catch (err) {
      console.error("Login error:", err);
      return false;
    }
  };

  const hasPermission = (permissionName) => {
    if (!user) {
      return false;
    }
    for (const role of user.customRoles || []) {
      if (
        role.permissions?.some((p) => {
          if (typeof p === "string") {
            return p === permissionName;
          } else if (typeof p === "object" && p.name) {
            return p.name === permissionName;
          }
          return false;
        })
      ) {
        return true;
      }
    }
    return false;
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
    <AuthContext.Provider value={{ user, login, logout, setUser, updateCompanyInfo, hasPermission, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);