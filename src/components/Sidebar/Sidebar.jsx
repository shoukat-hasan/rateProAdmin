// src\components\Sidebar\Sidebar.jsx

"use client"

import { useState, useEffect, useRef } from "react"
import { NavLink } from "react-router-dom"
import { Nav, Collapse, Button } from "react-bootstrap"
import {
  MdDashboard,
  MdAssignment,
  MdAddCircleOutline,
  MdPeople,
  MdInsertChart,
  MdSettings,
  MdWeb,
  MdExpandMore,
  MdExpandLess,
  MdMenu,
  MdClose,
  MdIntegrationInstructions,
  MdComment,
  MdWidgets,
  MdOutlineDashboardCustomize,
  MdSecurity,
  MdGroup,
  MdVpnKey,
  MdEmail,
  MdNotifications,
  MdSupport,
  MdCardGiftcard,
  MdSchedule,
  MdApi,
  MdSegment,
  MdTrendingUp,
  MdSync as MdRealTimeSync, // Corrected import  MdSegment,
  MdDescription as MdTemplate, // Corrected import
} from "react-icons/md"

const Sidebar = ({ darkMode, isOpen, isMobile, isTablet, collapsed, onClose, onToggle  }) => {
  const [contentSubmenuOpen, setContentSubmenuOpen] = useState(false)
  const [surveySubmenuOpen, setSurveySubmenuOpen] = useState(false)
  const [accessSubmenuOpen, setAccessSubmenuOpen] = useState(false)
  const [communicationSubmenuOpen, setCommunicationSubmenuOpen] = useState(false)
  const [analyticsSubmenuOpen, setAnalyticsSubmenuOpen] = useState(false)
  const [audienceSubmenuOpen, setAudienceSubmenuOpen] = useState(false)
  const [incentiveSubmenuOpen, setIncentiveSubmenuOpen] = useState(false)
  const sidebarRef = useRef()

  // Reset submenu states when sidebar collapses
  useEffect(() => {
    if (collapsed) {
      setContentSubmenuOpen(false)
      setSurveySubmenuOpen(false)
      setAccessSubmenuOpen(false)
      setCommunicationSubmenuOpen(false)
      setAnalyticsSubmenuOpen(false)
      setAudienceSubmenuOpen(false)
      setIncentiveSubmenuOpen(false)
    }
  }, [collapsed])


// Handle close button click - now properly handles all screen sizes
  const handleCloseClick = () => {
    if (isMobile || isTablet) {
      onClose?.() // Close on mobile/tablet
    } else {
      onToggle?.() // Toggle collapsed state on desktop/laptop
    }
  }


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) &&  ((isMobile || isTablet) && isOpen || 
         (!isMobile && !isTablet && !collapsed && isOpen))) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isMobile, isTablet, isOpen, onClose, collapsed])

  const toggleContentSubmenu = () => setContentSubmenuOpen(!contentSubmenuOpen)
  const toggleSurveySubmenu = () => setSurveySubmenuOpen(!surveySubmenuOpen)
  const toggleAccessSubmenu = () => setAccessSubmenuOpen(!accessSubmenuOpen)
  const toggleCommunicationSubmenu = () => setCommunicationSubmenuOpen(!communicationSubmenuOpen)
  const toggleAnalyticsSubmenu = () => setAnalyticsSubmenuOpen(!analyticsSubmenuOpen)
  const toggleAudienceSubmenu = () => setAudienceSubmenuOpen(!audienceSubmenuOpen)
  const toggleIncentiveSubmenu = () => setIncentiveSubmenuOpen(!incentiveSubmenuOpen)

  // Update sidebar style to handle all cases
  const sidebarStyle = {
    width: collapsed ? "70px" : "280px",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: isMobile || isTablet ? (isOpen ? 0 : "-280px") : 0,
    zIndex: 1050,
    transition: "all 0.3s ease",
    backgroundColor: darkMode ? "var(--dark-card)" : "var(--light-card)",
    borderRight: `1px solid ${darkMode ? "var(--dark-border)" : "var(--light-border)"}`,
    boxShadow: "var(--shadow-md)",
    overflowY: "auto",
    overflowX: "hidden",
  }

  const navItems = [
    { path: "/", name: "Dashboard", icon: <MdDashboard /> },
    {
      name: "Survey Management",
      icon: <MdAssignment />,
      submenu: true,
      isOpen: surveySubmenuOpen,
      toggle: toggleSurveySubmenu,
      submenuItems: [
        { path: "/surveys", name: "All Surveys", icon: <MdAssignment /> },
        { path: "/surveys/create", name: "Create Survey", icon: <MdAddCircleOutline /> },
        { path: "/surveys/templates", name: "Survey Templates", icon: <MdTemplate /> },
        { path: "/surveys/scheduling", name: "Survey Scheduling", icon: <MdSchedule /> },
      ],
    },
    {
      name: "Audience Management",
      icon: <MdPeople />,
      submenu: true,
      isOpen: audienceSubmenuOpen,
      toggle: toggleAudienceSubmenu,
      submenuItems: [
        { path: "/audiences", name: "All Audiences", icon: <MdPeople /> },
        { path: "/audiences/segmentation", name: "Segmentation", icon: <MdSegment /> },
      ],
    },
    { path: "/users", name: "User Management", icon: <MdGroup /> },
    {
      name: "Access Management",
      icon: <MdSecurity />,
      submenu: true,
      isOpen: accessSubmenuOpen,
      toggle: toggleAccessSubmenu,
      submenuItems: [
        { path: "/access", name: "Overview", icon: <MdSecurity /> },
        { path: "/access/roles", name: "Roles", icon: <MdGroup /> },
        { path: "/access/permissions", name: "Permissions", icon: <MdVpnKey /> },
      ],
    },
    {
      name: "Analytics & Reports",
      icon: <MdInsertChart />,
      submenu: true,
      isOpen: analyticsSubmenuOpen,
      toggle: toggleAnalyticsSubmenu,
      submenuItems: [
        { path: "/analytics", name: "Overview", icon: <MdInsertChart /> },
        { path: "/analytics/real-time", name: "Real-Time Results", icon: <MdRealTimeSync /> },
        { path: "/analytics/trends", name: "Trend Analysis", icon: <MdTrendingUp /> },
      ],
    },
    {
      name: "Communication",
      icon: <MdEmail />,
      submenu: true,
      isOpen: communicationSubmenuOpen,
      toggle: toggleCommunicationSubmenu,
      submenuItems: [
        { path: "/communication/emails", name: "Email Management", icon: <MdEmail /> },
        { path: "/communication/templates", name: "Email Templates", icon: <MdTemplate /> },
        { path: "/communication/notifications", name: "Notifications", icon: <MdNotifications /> },
      ],
    },
    {
      name: "Incentives & Rewards",
      icon: <MdCardGiftcard />,
      submenu: true,
      isOpen: incentiveSubmenuOpen,
      toggle: toggleIncentiveSubmenu,
      submenuItems: [
        { path: "/incentives", name: "Incentive Management", icon: <MdCardGiftcard /> },
        { path: "/incentives/rewards", name: "Reward System", icon: <MdCardGiftcard /> },
      ],
    },
    { path: "/support", name: "Support Tickets", icon: <MdSupport /> },
    { path: "/templates", name: "Templates", icon: <MdOutlineDashboardCustomize /> },
    {
      name: "Content Management",
      icon: <MdWeb />,
      submenu: true,
      isOpen: contentSubmenuOpen,
      toggle: toggleContentSubmenu,
      submenuItems: [
        { path: "/content/integrations", name: "Integrations", icon: <MdIntegrationInstructions /> },
        { path: "/content/api", name: "API Management", icon: <MdApi /> },
        { path: "/content/testimonials", name: "Testimonials", icon: <MdComment /> },
        { path: "/content/widgets", name: "Widgets", icon: <MdWidgets /> },
      ],
    },
    { path: "/settings", name: "Settings", icon: <MdSettings /> },
  ]

  return (
    <div ref={sidebarRef} style={sidebarStyle} className="d-flex flex-column">
         {/* Header */}
      <div className="d-flex justify-content-between align-items-center p-3 border-bottom" 
           style={{ height: "var(--header-height)" }}>
        {!collapsed && <h4 className="mb-0 text-primary fw-bold">Rate Pro</h4>}
        <Button
          variant="link"
          className="p-1 text-decoration-none"
          onClick={handleCloseClick}
          style={{ 
            color: "inherit",
            marginLeft: collapsed ? "0" : "auto" // Ensures proper alignment
          }}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <MdMenu size={24} /> : <MdClose size={24} />}
        </Button>
      </div>

      {/* Navigation */}
      <Nav className="flex-column flex-fill p-2">
        {navItems.map((item, index) => (
          <div key={index} className="mb-1">
            {item.submenu ? (
              <>
                <Button
                  variant="link"
                  className={`w-100 text-start text-decoration-none d-flex align-items-center p-2 rounded ${item.isOpen ? "bg-primary bg-opacity-10" : ""
                    }`}
                  onClick={collapsed ? undefined : item.toggle}
                  style={{
                    color: "inherit",
                    border: "none",
                    backgroundColor: "transparent",
                  }}
                >
                  <span className="me-3" style={{ minWidth: "24px" }}>
                    {item.icon}
                  </span>
                  {!collapsed && (
                    <>
                      <span className="flex-fill">{item.name}</span>
                      <span>{item.isOpen ? <MdExpandLess /> : <MdExpandMore />}</span>
                    </>
                  )}
                </Button>

                {!collapsed && (
                  <Collapse in={item.isOpen}>
                    <div className="ms-4">
                      {item.submenuItems.map((subItem, subIndex) => (
                        <Nav.Link
                          key={subIndex}
                          as={NavLink}
                          to={subItem.path}
                          className="d-flex align-items-center p-2 rounded text-decoration-none"
                          onClick={() => (isMobile || isTablet) && onClose()}
                          style={({ isActive }) => ({
                            backgroundColor: isActive ? "var(--primary-color)" : "transparent",
                            color: isActive ? "white" : "inherit",
                          })}
                        >
                          <span className="me-3" style={{ minWidth: "20px" }}>
                            {subItem.icon}
                          </span>
                          <span>{subItem.name}</span>
                        </Nav.Link>
                      ))}
                    </div>
                  </Collapse>
                )}
              </>
            ) : (
              <Nav.Link
                as={NavLink}
                to={item.path}
                className="d-flex align-items-center p-2 rounded text-decoration-none position-relative"
                onClick={() => (isMobile || isTablet) && onClose()}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "var(--primary-color)" : "transparent",
                  color: isActive ? "white" : "inherit",
                })}
              >
                <span className="me-3" style={{ minWidth: "24px" }}>
                  {item.icon}
                </span>
                {!collapsed && <span>{item.name}</span>}

                {/* Tooltip for collapsed state */}
                {collapsed && (
                  <div
                    className="position-absolute bg-dark text-white px-2 py-1 rounded small"
                    style={{
                      left: "100%",
                      top: "50%",
                      transform: "translateY(-50%)",
                      marginLeft: "10px",
                      whiteSpace: "nowrap",
                      opacity: 0,
                      pointerEvents: "none",
                      transition: "opacity 0.2s",
                      zIndex: 1000,
                    }}
                    onMouseEnter={(e) => (e.target.style.opacity = 1)}
                    onMouseLeave={(e) => (e.target.style.opacity = 0)}
                  >
                    {item.name}
                  </div>
                )}
              </Nav.Link>
            )}
          </div>
        ))}
      </Nav>
    </div>
  )
}

export default Sidebar