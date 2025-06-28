// // src\components\Layout\Layout.jsx

// "use client"

// import { useState, useEffect } from "react"
// import { Outlet } from "react-router-dom"
// import { Container } from "react-bootstrap"
// import Sidebar from "../Sidebar/Sidebar.jsx"
// import Header from "../Header/Header.jsx"

// const Layout = ({ darkMode, toggleTheme, onToggle }) => {
//   const [isMobile, setIsMobile] = useState(false)
//   const [isTablet, setIsTablet] = useState(false)
//   const [sidebarOpen, setSidebarOpen] = useState(false)
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === 'Escape' && !sidebarCollapsed) {
//         onToggle?.();
//       }
//     };
//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [sidebarCollapsed, onToggle]);


//   useEffect(() => {
//     const savedState = localStorage.getItem('sidebarCollapsed');
//     if (savedState !== null) {
//       setSidebarCollapsed(JSON.parse(savedState));
//     }

//   }, []);

//   useEffect(() => {
//     localStorage.setItem('sidebarCollapsed', JSON.stringify(sidebarCollapsed));
//   }, [sidebarCollapsed]);

//   // Handle responsive behavior
//   useEffect(() => {
//     const handleResize = () => {
//       const width = window.innerWidth
//       const mobile = width < 768
//       const tablet = width >= 768 && width < 992

//       setIsMobile(mobile)
//       setIsTablet(tablet)

//       if (width < 992) { // 992px is Bootstrap's lg breakpoint
//         setSidebarOpen(false);
//       }

//       // Auto behavior
//       if ( sidebarOpen || mobile || tablet) {
//         setSidebarOpen(false) // Always closed on mobile/tablet
//       } else {
        
//         setSidebarCollapsed(width < 1200) // Collapse on smaller desktop screens
//       }
//       // Collapse state only for desktop
//       if (!mobile && !tablet) {
//         setSidebarCollapsed(true) // Example breakpoint for collapsed
//       }

//     }

//     handleResize()
//     window.addEventListener("resize", handleResize)
//     return () => window.removeEventListener("resize", handleResize)
//   }, [])

//   const toggleSidebar = () => {
//     if (isMobile || isTablet) {
//       setSidebarOpen(prev => !prev)
//     } else {
//       setSidebarCollapsed(prev => !prev)
//     }
//   }

//   const closeSidebar = () => {
//     if (isMobile || isTablet ) {
//       setSidebarOpen(false)
//     } else {
//       setSidebarCollapsed(true) // For desktop, collapse instead of close
//     }
//   }

//   // Calculate content margin based on sidebar state
//   const getContentStyle = () => {
//     if (isMobile || isTablet) {
//       return {
//         transition: "margin-left 0.3s ease, padding 0.3s ease",
//         marginLeft: 0,
//         width: "100%",
//       }
//     } else {
//       return {
//         transition: "margin-left 0.3s ease, padding 0.3s ease",
//         marginLeft: sidebarCollapsed ? "70px" : "280px",
//         width: `calc(100% - ${sidebarCollapsed ? "70px" : "280px"})`,
//       }
//     }
//   }

//   return (
//     <div className={`d-flex min-vh-100 ${darkMode ? "dark" : "light"}`}>
//       <Sidebar
//         isOpen={isMobile || isTablet ? sidebarOpen : true} // Always open on desktop
//         isMobile={isMobile}
//         isTablet={isTablet}
//         collapsed={!isMobile && !isTablet && sidebarCollapsed} // Only collapsed on desktop
//         darkMode={darkMode}
//         onClose={closeSidebar}
//         onToggle={toggleSidebar}

//       />

//       <div className="flex-fill d-flex flex-column" style={getContentStyle()}>
//         <Header
//           darkMode={darkMode}
//           toggleTheme={toggleTheme}
//           isMobile={isMobile}
//           isTablet={isTablet}
//           sidebarOpen={sidebarOpen}
//           sidebarCollapsed={sidebarCollapsed}
//           toggleSidebar={toggleSidebar}
//         />

//         <main className="flex-fill overflow-auto">
//           <Container fluid className="p-3 p-md-4 h-100 mt-5">
//             <Outlet />
//           </Container>
//         </main>
//       </div>

//       {/* Mobile/Tablet overlay */}
//       {(isMobile || isTablet) && sidebarOpen && (
//         <div
//           className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
//           style={{ zIndex: 1040 }}
//           onClick={closeSidebar}
//         />
//       )}
//     </div>
//   )
// }

// export default Layout

// src\components\Layout\Layout.jsx

"use client"

import { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"
import { Container } from "react-bootstrap"
import Sidebar from "../Sidebar/Sidebar.jsx"
import Header from "../Header/Header.jsx"

const Layout = ({ darkMode, toggleTheme, onToggle }) => {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !sidebarCollapsed) {
        onToggle?.()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [sidebarCollapsed, onToggle])

  // Load sidebar collapsed state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarCollapsed')
    if (savedState !== null) {
      setSidebarCollapsed(JSON.parse(savedState))
    }
  }, [])

  // Save sidebar collapsed state to localStorage
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(sidebarCollapsed))
  }, [sidebarCollapsed])

  // Handle responsive behavior safely
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      const mobile = width < 768
      const tablet = width >= 768 && width < 992

      // Only update if values actually change
      setIsMobile((prev) => prev !== mobile ? mobile : prev)
      setIsTablet((prev) => prev !== tablet ? tablet : prev)

      // Sidebar behavior for mobile/tablet
      if (width < 992) {
        setSidebarOpen(false)
      }

      // Sidebar collapse for desktop
      if (!mobile && !tablet) {
        setSidebarCollapsed((prev) => (prev !== (width < 1200) ? (width < 1200) : prev))
      }
    }

    handleResize() // initial run
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleSidebar = () => {
    if (isMobile || isTablet) {
      setSidebarOpen((prev) => !prev)
    } else {
      setSidebarCollapsed((prev) => !prev)
    }
  }

  const closeSidebar = () => {
    if (isMobile || isTablet) {
      setSidebarOpen(false)
    } else {
      setSidebarCollapsed(true)
    }
  }

  const getContentStyle = () => {
    if (isMobile || isTablet) {
      return {
        transition: "margin-left 0.3s ease, padding 0.3s ease",
        marginLeft: 0,
        width: "100%"
      }
    } else {
      return {
        transition: "margin-left 0.3s ease, padding 0.3s ease",
        marginLeft: sidebarCollapsed ? "70px" : "280px",
        width: `calc(100% - ${sidebarCollapsed ? "70px" : "280px"})`
      }
    }
  }

  return (
    <div className={`d-flex min-vh-100 ${darkMode ? "dark" : "light"}`}>
      <Sidebar
        isOpen={isMobile || isTablet ? sidebarOpen : true} // Always open on desktop
        isMobile={isMobile}
        isTablet={isTablet}
        collapsed={!isMobile && !isTablet && sidebarCollapsed} // Only collapsed on desktop
        darkMode={darkMode}
        onClose={closeSidebar}
        onToggle={toggleSidebar}

      />

      <div className="flex-fill d-flex flex-column" style={getContentStyle()}>
        <Header
          darkMode={darkMode}
          toggleTheme={toggleTheme}
          isMobile={isMobile}
          isTablet={isTablet}
          sidebarOpen={sidebarOpen}
          sidebarCollapsed={sidebarCollapsed}
          toggleSidebar={toggleSidebar}
        />

        <main className="flex-fill overflow-auto">
          <Container fluid className="p-3 p-md-4 h-100 mt-5">
            <Outlet />
          </Container>
        </main>
      </div>

      {/* Mobile/Tablet overlay */}
      {(isMobile || isTablet) && sidebarOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
          style={{ zIndex: 1040 }}
          onClick={closeSidebar}
        />
      )}
    </div>
  )
}

export default Layout