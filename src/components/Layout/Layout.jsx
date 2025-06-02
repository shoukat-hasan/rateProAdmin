"use client"

import { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"
import { Container } from "react-bootstrap"
import Sidebar from "../Sidebar/Sidebar.jsx"
import Header from "../Header/Header.jsx"

const Layout = ({ darkMode, toggleTheme }) => {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      const mobile = width < 768
      const tablet = width >= 768 && width < 992

      setIsMobile(mobile)
      setIsTablet(tablet)

      // Auto-open sidebar on larger screens, close on mobile
      if (mobile) {
        setSidebarOpen(false)
      } else if (tablet) {
        setSidebarOpen(false)
        setSidebarCollapsed(true)
      } else {
        setSidebarOpen(true)
        setSidebarCollapsed(false)
      }
    }

    handleResize()
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
    }
  }

  // Calculate content margin based on sidebar state
  const getContentStyle = () => {
    if (isMobile || isTablet) {
      return {
        transition: "margin-left 0.3s ease, padding 0.3s ease",
        marginLeft: 0,
        width: "100%",
      }
    } else {
      return {
        transition: "margin-left 0.3s ease, padding 0.3s ease",
        marginLeft: sidebarCollapsed ? "70px" : "280px",
        width: `calc(100% - ${sidebarCollapsed ? "70px" : "280px"})`,
      }
    }
  }

  return (
    <div className={`d-flex min-vh-100 ${darkMode ? "dark" : "light"}`}>
      <Sidebar
        isOpen={sidebarOpen}
        isMobile={isMobile}
        isTablet={isTablet}
        collapsed={!isMobile && sidebarCollapsed}
        darkMode={darkMode}
        onClose={closeSidebar}
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
          <Container fluid className="p-3 p-md-4 h-100">
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
