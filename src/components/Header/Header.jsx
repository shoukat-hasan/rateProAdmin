"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Navbar, Nav, Dropdown, Form, InputGroup, Button } from "react-bootstrap"
import {
  MdMenu,
  MdLightMode,
  MdDarkMode,
  MdNotifications,
  MdPerson,
  MdClose,
  MdSearch,
  MdSettings,
  MdExitToApp,
  MdAccountCircle,
} from "react-icons/md"
import LanguageSelector from "../LanguageSelector/LanguageSelector.jsx"

const Header = ({ isMobile, isTablet, darkMode, toggleTheme, toggleSidebar, sidebarOpen }) => {
  const [searchFocused, setSearchFocused] = useState(false)
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = () => {
    navigate("/login")
  }

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className={`px-3 py-2 ${scrolled ? "shadow-sm" : ""}`}
      style={{
        height: "var(--header-height)",
        backgroundColor: darkMode ? "var(--dark-card)" : "var(--light-card)",
        borderBottom: `1px solid ${darkMode ? "var(--dark-border)" : "var(--light-border)"}`,
        transition: "all 0.3s ease",
      }}
    >
      <div className="d-flex align-items-center w-100">
        {/* Menu toggle button - shows close icon when sidebar is open */}
        <Button
          variant="link"
          className="me-3 p-1 text-decoration-none"
          onClick={toggleSidebar}
          style={{  color: darkMode ? "#fff" : "#000", minWidth: "40px" }}
        >
          {sidebarOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
        </Button>

        {/* Page title - hidden on mobile when search is active */}
        <Navbar.Brand className="mb-0 h1 d-none d-sm-flex" style={{ flex: 1, color: darkMode ? "#fff" : "#000" }}>
          Rate Pro Dashboard
        </Navbar.Brand>

        {/* Search bar - full width on mobile when active */}
        <div
          className={`${isMobile || isTablet ? (showMobileSearch ? "d-flex" : "d-none d-md-flex") : "d-flex"}`}
          style={{
            flex: isMobile && showMobileSearch ? 1 : 2,
            maxWidth: isMobile && showMobileSearch ? "none" : "400px",
            marginLeft: "auto",
            marginRight: "1rem",
            transition: "all 0.3s ease"
          }}
        >
          <InputGroup>
            <InputGroup.Text className="bg-transparent border-end-0 text-white">
              <MdSearch />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search..."
              className="border-start-0"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </InputGroup>
        </div>

        {/* Mobile search toggle - hidden when search is active */}
        {(isMobile || isTablet) && !showMobileSearch && (
          <Button
            variant="link"
            className="me-2 p-1 text-decoration-none d-md-none"
            onClick={() => setShowMobileSearch(true)}
            style={{ color: "inherit" }}
          >
            <MdSearch size={24} />
          </Button>
        )}

        {/* Close search button - only on mobile when search is active */}
        {(isMobile || isTablet) && showMobileSearch && (
          <Button
            variant="link"
            className="me-2 p-1 text-decoration-none"
            onClick={() => setShowMobileSearch(false)}
            style={{ color: "inherit" }}
          >
            <MdClose size={24} />
          </Button>
        )}

        {/* Right side controls - hidden on mobile when search is active */}
        <div className={`d-flex align-items-center ${showMobileSearch ? "d-none d-md-flex" : ""}`}>
          {/* Language selector - hidden on small mobile */}
          <div className="me-2 d-none d-sm-block">
            <LanguageSelector />
          </div>

          {/* Theme toggle */}
          <Button
            variant="link"
            className="p-1 me-2 text-decoration-none rounded-circle"
            onClick={toggleTheme}
            title={darkMode ? "Light mode" : "Dark mode"}
            style={{ color: "inherit" }}
          >
            {darkMode ? <MdLightMode size={20} /> : <MdDarkMode size={20} />}
          </Button>

          {/* Notifications dropdown */}
          <Dropdown align="end" className="me-2">
            <Dropdown.Toggle
              variant="link"
              className="p-1 text-decoration-none rounded-circle position-relative"
              style={{ color: "inherit", border: "none" }}
            >
              <MdNotifications size={20} />
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: "10px" }}
              >
                3
              </span>
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ minWidth: "300px" }}>
              <Dropdown.Header className="d-flex justify-content-between">
                <span>Notifications</span>
                <span className="badge bg-primary">3</span>
              </Dropdown.Header>
              <Dropdown.Item className="py-2">
                <div className="d-flex">
                  <div className="rounded-circle bg-success d-flex align-items-center justify-content-center me-3"
                    style={{ width: "32px", height: "32px" }}>
                    <MdNotifications className="text-white" size={16} />
                  </div>
                  <div className="flex-fill">
                    <h6 className="mb-1 small">New Response</h6>
                    <p className="mb-1 small text-muted">You received a new survey response</p>
                    <small className="text-muted">5 mins ago</small>
                  </div>
                </div>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item as={Link} to="/notifications" className="text-center">
                See All Notifications
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* User profile dropdown */}
          <Dropdown align="end">
            <Dropdown.Toggle
              variant="link"
              className="d-flex align-items-center p-1 text-decoration-none"
              style={{ color: "inherit", border: "none" }}
            >
              <div
                className="rounded-circle bg-light d-flex align-items-center justify-content-center"
                style={{ width: "36px", height: "36px" }}
              >
                <MdPerson className="text-secondary" />
              </div>
              <span className="d-none d-lg-inline ms-2">Admin</span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Header>
                <h6 className="mb-0">Admin</h6>
                <small className="text-muted">admin@ratepro.com</small>
              </Dropdown.Header>
              <Dropdown.Item as={Link} to="/profile" className="d-flex align-items-center">
                <MdAccountCircle className="me-2" />
                Profile
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/settings" className="d-flex align-items-center">
                <MdSettings className="me-2" />
                Settings
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout} className="d-flex align-items-center text-danger">
                <MdExitToApp className="me-2" />
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </Navbar>
  )
}

export default Header