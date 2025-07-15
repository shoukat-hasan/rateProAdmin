// src\components\Header\Header.jsx
"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { Navbar, Dropdown, Form, InputGroup, Button } from "react-bootstrap"
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
import { capitalize } from "../../utilities/capitalize"

const Header = ({ isMobile, isTablet, darkMode, toggleTheme, toggleSidebar, sidebarOpen, sidebarCollapsed }) => {
  const [searchFocused, setSearchFocused] = useState(false)
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const { logout, user } = useAuth()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
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
        {/* Menu toggle button - now properly controlled */}
        <Button
          variant="link"
          className="me-3 p-1 text-decoration-none"
          onClick={toggleSidebar}
          style={{
            color: darkMode ? "#fff" : "#000",
            minWidth: "40px",
            marginRight: "12px",
          }}
        >
          {sidebarCollapsed || !sidebarOpen ? <MdMenu size={24} /> : <MdClose size={24} />}
        </Button>

        {/* Page title - hidden on mobile when search is active */}
        <Navbar.Brand className="mb-0 h1 d-none d-sm-flex ps-2" style={{ flex: 1, color: darkMode ? "#fff" : "#000" }}>
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
            transition: "all 0.3s ease",
            color: darkMode ? "text-white" : "#000",
          }}
        >
          <InputGroup
            className={`search-input-group ${searchFocused ? "shadow" : ""}`}
            style={{
              boxShadow: searchFocused
                ? darkMode
                  ? "0 0 0 0.2rem rgba(31, 218, 228, 0.25)"
                  : "0 0 0 0.2rem rgba(31, 218, 228, 0.25)"
                : "none",
              borderRadius: "0.375rem",
              color: darkMode ? "text-white" : "#000",
            }}
          >
            <InputGroup.Text
              className={`bg-transparent border-end-0`}
              style={{
                borderColor: darkMode ? "var(--dark-border)" : "var(--light-border)",
                backgroundColor: darkMode ? "var(--dark-bg)" : "var(--light-bg)",
                color: darkMode ? "text-white" : "#000",
              }}
            >
              <MdSearch />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search..."
              className={`border-start-0 search-input`}
              style={{
                backgroundColor: darkMode ? "var(--dark-bg)" : "var(--light-bg)",
                color: darkMode ? "text-white" : "#000",
                borderColor: darkMode ? "var(--dark-border)" : "var(--light-border)",
              }}
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
            style={{ color: darkMode ? "#fff" : "#000" }}
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
            style={{ color: darkMode ? "#fff" : "#000" }}
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
            style={{ color: darkMode ? "#fff" : "#000" }}
          >
            {darkMode ? <MdLightMode size={20} /> : <MdDarkMode size={20} />}
          </Button>

          {/* Notifications dropdown - Fixed alignment */}
          <Dropdown align="end" className="me-2">
            <Dropdown.Toggle
              variant="link"
              className="p-1 text-decoration-none rounded-circle position-relative"
              style={{
                color: darkMode ? "#fff" : "#000",
                border: "none",
                backgroundColor: "transparent",
              }}
            >
              <MdNotifications size={20} />
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: "10px" }}
              >
                3
              </span>
            </Dropdown.Toggle>

            <Dropdown.Menu
              style={{
                width: isMobile ? "100vw" : "320px",
                backgroundColor: darkMode ? "var(--dark-card)" : "var(--light-card)",
                borderColor: darkMode ? "var(--dark-border)" : "var(--light-border)",
                boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.15)",
                marginTop: "0.5rem",
                ...(isMobile && {
                  position: "fixed",
                  top: "var(--header-height)",
                  left: "0",
                  right: "0",
                  margin: "0",
                  borderRadius: "0",
                }),
              }}
            >
              <Dropdown.Header className="d-flex justify-content-between" style={{ color: darkMode ? "#fff" : "#000" }}>
                <span>Notifications</span>
                <span className="badge bg-primary">3</span>
              </Dropdown.Header>

              {/* Stats Section */}
              <div
                className="px-3 py-2"
                style={{
                  backgroundColor: darkMode ? "var(--dark-bg)" : "var(--light-bg)",
                  borderBottom: `1px solid ${darkMode ? "var(--dark-border)" : "var(--light-border)"}`,
                }}
              >
                <div className="row text-center small">
                  <div className="col-6 border-end py-2">
                    <div className="fw-bold">24</div>
                    <div className="text-muted">Total Surveys</div>
                  </div>
                  <div className="col-6 py-2">
                    <div className="fw-bold">1,247</div>
                    <div className="text-muted">Active Responses</div>
                  </div>
                  <div className="col-6 border-end py-2">
                    <div className="fw-bold">78.5%</div>
                    <div className="text-muted">Completion Rate</div>
                  </div>
                  <div className="col-6 py-2">
                    <div className="fw-bold">3.2 min</div>
                    <div className="text-muted">Avg Response Time</div>
                  </div>
                </div>
              </div>

              {/* Notification Items */}
              <div className="p-2" style={{ maxHeight: "300px", overflowY: "auto" }}>
                <div className="d-flex align-items-center px-2 py-1">
                  <h6 className="mb-0 small fw-bold" style={{ color: darkMode ? "#fff" : "#000" }}>
                    Recent Activity
                  </h6>
                </div>

                <Dropdown.Item className="py-2" as={Link} to="/app/communication/notifications" style={{ color: darkMode ? "#fff" : "#000" }}>
                  <div className="d-flex">
                    <div
                      className="rounded-circle bg-success d-flex align-items-center justify-content-center me-3"
                      style={{ width: "32px", height: "32px" }}
                    >
                      <MdNotifications className="text-white" size={16} />
                    </div>
                    <div className="flex-fill">
                      <h6 className="mb-1 small" style={{ color: darkMode ? "#fff" : "#000" }}>
                        New Response
                      </h6>
                      <p className="mb-1 small text-muted">You received a new survey response</p>
                      <small className="text-muted">5 mins ago</small>
                    </div>
                  </div>
                </Dropdown.Item>

                <Dropdown.Item className="py-2" as={Link} to="/app/communication/notifications" style={{ color: darkMode ? "#fff" : "#000" }}>
                  <div className="d-flex">
                    <div
                      className="rounded-circle bg-info d-flex align-items-center justify-content-center me-3"
                      style={{ width: "32px", height: "32px" }}
                    >
                      <MdNotifications className="text-white" size={16} />
                    </div>
                    <div className="flex-fill">
                      <h6 className="mb-1 small" style={{ color: darkMode ? "#fff" : "#000" }}>
                        Survey Completed
                      </h6>
                      <p className="mb-1 small text-muted">Customer survey reached 100 responses</p>
                      <small className="text-muted">1 hour ago</small>
                    </div>
                  </div>
                </Dropdown.Item>

                <Dropdown.Item className="py-2" style={{ color: darkMode ? "#fff" : "#000" }}>
                  <div className="d-flex">
                    <div
                      className="rounded-circle bg-warning d-flex align-items-center justify-content-center me-3"
                      style={{ width: "32px", height: "32px" }}
                    >
                      <MdNotifications className="text-white" size={16} />
                    </div>
                    <div className="flex-fill">
                      <h6 className="mb-1 small" style={{ color: darkMode ? "#fff" : "#000" }}>
                        Low Response Rate
                      </h6>
                      <p className="mb-1 small text-muted">Product feedback survey needs attention</p>
                      <small className="text-muted">2 hours ago</small>
                    </div>
                  </div>
                </Dropdown.Item>
              </div>

              <Dropdown.Divider style={{ backgroundColor: darkMode ? "var(--dark-border)" : "var(--light-border)" }} />
              <Dropdown.Item
                as={Link}
                to="/app/communication/notifications"
                className="text-center"
                style={{ color: darkMode ? "#fff" : "#000" }}
              >
                See All Notifications
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* User profile dropdown */}
          <Dropdown align="end">
            <Dropdown.Toggle
              variant="link"
              className="d-flex align-items-center p-1 text-decoration-none"
              style={{
                color: darkMode ? "#fff" : "#000",
                border: "none",
                backgroundColor: "transparent",
              }}
            >
              <div
                className="rounded-circle bg-light d-flex align-items-center justify-content-center"
                style={{ width: "36px", height: "36px" }}
              >
                <MdPerson className={darkMode ? "text-white" : "text-secondary"} />
              </div>
              <span className="d-none d-lg-inline ms-2">{capitalize(user?.name)}</span>
            </Dropdown.Toggle>

            <Dropdown.Menu
              style={{
                backgroundColor: darkMode ? "var(--dark-card)" : "var(--light-card)",
                borderColor: darkMode ? "var(--dark-border)" : "var(--light-border)",
                marginTop: "0.5rem",
                minWidth: "200px",
              }}
            >
              <Dropdown.Header style={{ color: darkMode ? "#fff" : "#000" }}>
                <h6 className="mb-0">{capitalize(user?.role)}</h6>
                <small className="text-muted">{ user.email }</small>
              </Dropdown.Header>
              <Dropdown.Item
                as={Link}
                to="/app/profile"
                className="d-flex align-items-center"
                style={{ color: darkMode ? "#fff" : "#000" }}
              >
                <MdAccountCircle className="me-2" />
                Profile
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to="/app/settings"
                className="d-flex align-items-center"
                style={{ color: darkMode ? "#fff" : "#000" }}
              >
                <MdSettings className="me-2" />
                Settings
              </Dropdown.Item>
              <Dropdown.Divider style={{ backgroundColor: darkMode ? "var(--dark-border)" : "var(--light-border)" }} />
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