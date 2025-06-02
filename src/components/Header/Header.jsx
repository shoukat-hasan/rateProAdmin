"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Navbar, Nav, Dropdown, Form, InputGroup, Button } from "react-bootstrap"
import {
  MdMenu,
  MdLightMode,
  MdDarkMode,
  MdNotifications,
  MdPerson,
  MdSearch,
  MdSettings,
  MdExitToApp,
  MdAccountCircle,
} from "react-icons/md"
import LanguageSelector from "../LanguageSelector/LanguageSelector.jsx"

const Header = ({ isMobile, isTablet, darkMode, toggleTheme, toggleSidebar, sidebarOpen, sidebarCollapsed }) => {
  const [searchFocused, setSearchFocused] = useState(false)
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate("/login")
  }

  return (
    <Navbar
      expand="lg"
      className="border-bottom px-3 py-2"
      style={{
        height: "var(--header-height)",
        backgroundColor: darkMode ? "var(--dark-card)" : "var(--light-card)",
        borderColor: darkMode ? "var(--dark-border)" : "var(--light-border)",
      }}
    >
      <div className="d-flex align-items-center flex-fill">
        {/* Menu toggle button - visible on all screen sizes */}
        <Button
          variant="link"
          className="me-3 p-1 text-decoration-none"
          onClick={toggleSidebar}
          style={{ color: "inherit" }}
        >
          <MdMenu size={24} />
        </Button>

        {/* Page title */}
        <Navbar.Brand className="mb-0 h1 d-none d-md-block">Rate Pro Dashboard</Navbar.Brand>

        {/* Mobile search toggle */}
        {(isMobile || isTablet) && (
          <Button
            variant="link"
            className="ms-auto me-2 p-1 text-decoration-none d-md-none"
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            style={{ color: "inherit" }}
          >
            <MdSearch size={24} />
          </Button>
        )}

        {/* Search bar - hidden on mobile unless toggled */}
        <div
          className={`${isMobile || isTablet ? (showMobileSearch ? "d-flex" : "d-none") : "d-flex"} ms-auto me-3`}
          style={{ maxWidth: "300px", width: "100%" }}
        >
          <InputGroup>
            <InputGroup.Text className="bg-transparent border-end-0">
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

        {/* Right side controls */}
        <Nav className="ms-auto d-flex align-items-center">
          {/* Language selector - hidden on small mobile */}
          <div className="me-3 d-none d-sm-block">
            <LanguageSelector />
          </div>

          {/* Theme toggle */}
          <Button
            variant="link"
            className="p-2 me-2 text-decoration-none rounded-circle"
            onClick={toggleTheme}
            title={darkMode ? "Light mode" : "Dark mode"}
            style={{ color: "inherit" }}
          >
            {darkMode ? <MdLightMode size={20} /> : <MdDarkMode size={20} />}
          </Button>

          {/* Notifications */}
          <Dropdown align="end" className="me-2">
            <Dropdown.Toggle
              variant="link"
              className="p-2 text-decoration-none rounded-circle position-relative"
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
                  <div
                    className="rounded-circle bg-success d-flex align-items-center justify-content-center me-3"
                    style={{ width: "32px", height: "32px" }}
                  >
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

          {/* User profile */}
          <Dropdown align="end">
            <Dropdown.Toggle
              variant="link"
              className="d-flex align-items-center p-2 text-decoration-none"
              style={{ color: "inherit", border: "none" }}
            >
              <div
                className="rounded-circle bg-light d-flex align-items-center justify-content-center me-2"
                style={{ width: "36px", height: "36px" }}
              >
                <MdPerson className="text-secondary" />
              </div>
              <span className="d-none d-lg-inline">Admin</span>
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
        </Nav>
      </div>
    </Navbar>
  )
}

export default Header
