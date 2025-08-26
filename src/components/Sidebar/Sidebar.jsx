// src\components\Sidebar\Sidebar.jsx
"use client"

import { useState, useEffect, useRef } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { Nav, Collapse, Button } from "react-bootstrap"
import {
  MdDashboard,
  MdAssignment,
  MdAddCircleOutline,
  MdPeople,
  MdInsertChart,
  MdSettings,
  MdExpandMore,
  MdExpandLess,
  MdMenu,
  MdClose,
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
  MdSync as MdRealTimeSync,
  MdDescription as MdTemplate,
  MdPersonAdd,
  MdManageAccounts,
  MdQuestionAnswer,
  MdAnalytics,
  MdShare,
  MdOutlineSettingsApplications as MdCustomize,
  MdViewList,
  MdDescription,
  MdLogin,
  MdLock,
  MdVisibility,
  MdList,
  MdBarChart,
  MdShowChart,
  MdPayment,
  MdColorLens,
  MdMailOutline,
  MdBusiness,
  MdPersonOutline,
  MdAssignmentInd,
  MdContacts,
  MdThumbUp,
  MdCode,
  MdCampaign,
} from "react-icons/md"
import { useAuth } from "../../context/AuthContext"

const Sidebar = ({ darkMode, isOpen, isMobile, isTablet, collapsed, onClose, onToggle }) => {
  const { user, hasPermission } = useAuth()
  const location = useLocation()
  const [authSubmenuOpen, setAuthSubmenuOpen] = useState(false)
  const [surveySubmenuOpen, setSurveySubmenuOpen] = useState(false)
  const [userSubmenuOpen, setUserSubmenuOpen] = useState(false)
  const [accessSubmenuOpen, setAccessSubmenuOpen] = useState(false)
  const [analyticsSubmenuOpen, setAnalyticsSubmenuOpen] = useState(false)
  const [audienceSubmenuOpen, setAudienceSubmenuOpen] = useState(false)
  const [communicationSubmenuOpen, setCommunicationSubmenuOpen] = useState(false)
  const [settingsSubmenuOpen, setSettingsSubmenuOpen] = useState(false)
  const [incentivesSubmenuOpen, setIncentivesSubmenuOpen] = useState(false)
  const [contentmanagement, setcontentmanagement] = useState(false)

  const role = user?.role?.toLowerCase()

  const [hoveredItem, setHoveredItem] = useState(null)
  const [collapsedDropdownOpen, setCollapsedDropdownOpen] = useState(null)
  const sidebarRef = useRef()

  // Reset submenu states when sidebar collapses
  useEffect(() => {
    if (collapsed) {
      setAuthSubmenuOpen(false)
      setSurveySubmenuOpen(false)
      setUserSubmenuOpen(false)
      setAccessSubmenuOpen(false)
      setCommunicationSubmenuOpen(false)
      setAnalyticsSubmenuOpen(false)
      setAudienceSubmenuOpen(false)
      setSettingsSubmenuOpen(false)
      setIncentivesSubmenuOpen(false)
      setcontentmanagement(false)
      setCollapsedDropdownOpen(null)
    }
  }, [collapsed])

  // Auto-open submenu if current route matches
  useEffect(() => {
    const currentPath = location.pathname

    // Check which submenu should be open based on current path
    if (
      currentPath.startsWith("/login") ||
      currentPath.startsWith("/signup") ||
      currentPath.startsWith("/company-registration") ||
      currentPath.startsWith("/forgot-password") ||
      currentPath.startsWith("/reset-password") ||
      currentPath.startsWith("/enter-email") ||
      currentPath.startsWith("/enter-reset-code")
    ) {
      setAuthSubmenuOpen(true)
      setSurveySubmenuOpen(false)
      setUserSubmenuOpen(false)
      setAccessSubmenuOpen(false)
      setAnalyticsSubmenuOpen(false)
      setAudienceSubmenuOpen(false)
      setCommunicationSubmenuOpen(false)
      setSettingsSubmenuOpen(false)
      setIncentivesSubmenuOpen(false)
      setcontentmanagement(false)
    } else if (currentPath.startsWith("/surveys")) {
      setSurveySubmenuOpen(true)
      setAuthSubmenuOpen(false)
      setUserSubmenuOpen(false)
      setAccessSubmenuOpen(false)
      setAnalyticsSubmenuOpen(false)
      setAudienceSubmenuOpen(false)
      setCommunicationSubmenuOpen(false)
      setSettingsSubmenuOpen(false)
      setIncentivesSubmenuOpen(false)
      setcontentmanagement(false)
    } else if (currentPath.startsWith("/users") || currentPath === "/profile") {
      setUserSubmenuOpen(true)
      setAuthSubmenuOpen(false)
      setSurveySubmenuOpen(false)
      setAccessSubmenuOpen(false)
      setAnalyticsSubmenuOpen(false)
      setAudienceSubmenuOpen(false)
      setCommunicationSubmenuOpen(false)
      setSettingsSubmenuOpen(false)
      setIncentivesSubmenuOpen(false)
      setcontentmanagement(false)
    } else if (currentPath.startsWith("/access")) {
      setAccessSubmenuOpen(true)
      setAuthSubmenuOpen(false)
      setSurveySubmenuOpen(false)
      setUserSubmenuOpen(false)
      setAnalyticsSubmenuOpen(false)
      setAudienceSubmenuOpen(false)
      setCommunicationSubmenuOpen(false)
      setSettingsSubmenuOpen(false)
      setIncentivesSubmenuOpen(false)
      setcontentmanagement(false)
    } else if (currentPath.startsWith("/analytics")) {
      setAnalyticsSubmenuOpen(true)
      setAuthSubmenuOpen(false)
      setSurveySubmenuOpen(false)
      setUserSubmenuOpen(false)
      setAccessSubmenuOpen(false)
      setAudienceSubmenuOpen(false)
      setCommunicationSubmenuOpen(false)
      setSettingsSubmenuOpen(false)
      setIncentivesSubmenuOpen(false)
      setcontentmanagement(false)
    } else if (currentPath.startsWith("/audiences")) {
      setAudienceSubmenuOpen(true)
      setAuthSubmenuOpen(false)
      setSurveySubmenuOpen(false)
      setUserSubmenuOpen(false)
      setAccessSubmenuOpen(false)
      setAnalyticsSubmenuOpen(false)
      setCommunicationSubmenuOpen(false)
      setSettingsSubmenuOpen(false)
      setIncentivesSubmenuOpen(false)
      setcontentmanagement(false)
    } else if (currentPath.startsWith("/communication")) {
      setCommunicationSubmenuOpen(true)
      setAuthSubmenuOpen(false)
      setSurveySubmenuOpen(false)
      setUserSubmenuOpen(false)
      setAccessSubmenuOpen(false)
      setAnalyticsSubmenuOpen(false)
      setAudienceSubmenuOpen(false)
      setSettingsSubmenuOpen(false)
      setIncentivesSubmenuOpen(false)
      setcontentmanagement(false)
    } else if (currentPath.startsWith("/incentives")) {
      setIncentivesSubmenuOpen(true)
      setAuthSubmenuOpen(false)
      setSurveySubmenuOpen(false)
      setUserSubmenuOpen(false)
      setAccessSubmenuOpen(false)
      setAnalyticsSubmenuOpen(false)
      setAudienceSubmenuOpen(false)
      setCommunicationSubmenuOpen(false)
      setSettingsSubmenuOpen(false)
      setcontentmanagement(false)
    } else if (currentPath.startsWith("/settings")) {
      setSettingsSubmenuOpen(true)
      setAuthSubmenuOpen(false)
      setSurveySubmenuOpen(false)
      setUserSubmenuOpen(false)
      setAccessSubmenuOpen(false)
      setAnalyticsSubmenuOpen(false)
      setAudienceSubmenuOpen(false)
      setCommunicationSubmenuOpen(false)
      setIncentivesSubmenuOpen(false)
      setcontentmanagement(false)
    } else {
      // Close all submenus for single pages
      setAuthSubmenuOpen(false)
      setSurveySubmenuOpen(false)
      setUserSubmenuOpen(false)
      setAccessSubmenuOpen(false)
      setAnalyticsSubmenuOpen(false)
      setAudienceSubmenuOpen(false)
      setCommunicationSubmenuOpen(false)
      setSettingsSubmenuOpen(false)
      setIncentivesSubmenuOpen(false)
      setcontentmanagement(false)
    }
  }, [location.pathname])

  const handleCloseClick = () => {
    if (isMobile || isTablet) {
      onClose?.()
    } else {
      onToggle?.()
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        (((isMobile || isTablet) && isOpen) || (!isMobile && !isTablet && !collapsed && isOpen))
      ) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isMobile, isTablet, isOpen, onClose, collapsed])

  const toggleSubmenu = (submenuName) => {
    // Check if the clicked submenu is already open
    let isCurrentlyOpen = false

    switch (submenuName) {
      case "auth":
        isCurrentlyOpen = authSubmenuOpen
        break
      case "survey":
        isCurrentlyOpen = surveySubmenuOpen
        break
      case "user":
        isCurrentlyOpen = userSubmenuOpen
        break
      case "access":
        isCurrentlyOpen = accessSubmenuOpen
        break
      case "analytics":
        isCurrentlyOpen = analyticsSubmenuOpen
        break
      case "audience":
        isCurrentlyOpen = audienceSubmenuOpen
        break
      case "communication":
        isCurrentlyOpen = communicationSubmenuOpen
        break
      case "incentives":
        isCurrentlyOpen = incentivesSubmenuOpen
        break
      case "settings":
        isCurrentlyOpen = settingsSubmenuOpen
        break
      case "content":
        isCurrentlyOpen = contentmanagement
        break
    }

    // Close all submenus first
    setAuthSubmenuOpen(false)
    setSurveySubmenuOpen(false)
    setUserSubmenuOpen(false)
    setAccessSubmenuOpen(false)
    setAnalyticsSubmenuOpen(false)
    setAudienceSubmenuOpen(false)
    setCommunicationSubmenuOpen(false)
    setSettingsSubmenuOpen(false)
    setIncentivesSubmenuOpen(false)
    setcontentmanagement(false)

    // If the clicked submenu was not open, open it
    if (!isCurrentlyOpen) {
      switch (submenuName) {
        case "auth":
          setAuthSubmenuOpen(true)
          break
        case "survey":
          setSurveySubmenuOpen(true)
          break
        case "user":
          setUserSubmenuOpen(true)
          break
        case "access":
          setAccessSubmenuOpen(true)
          break
        case "analytics":
          setAnalyticsSubmenuOpen(true)
          break
        case "audience":
          setAudienceSubmenuOpen(true)
          break
        case "communication":
          setCommunicationSubmenuOpen(true)
          break
        case "incentives":
          setIncentivesSubmenuOpen(true)
          break
        case "settings":
          setSettingsSubmenuOpen(true)
          break
        case "content":
          setcontentmanagement(true)
          break
      }
    }
  }

  const hasAccess = (item, user, hasPermission) => {
    const role = user?.role?.toLowerCase();

    // 🔹 Direct role check
    if (item.roles && item.roles.map(r => r.toLowerCase()).includes(role)) {
      return true;
    }

    // 🔹 Permission based check
    if (item.permissions) {
      if (item.permissions.some(p => hasPermission(p))) {
        return true;
      }
    }

    // 🔹 Submenu items check (agar parent khud match nahi karta)
    if (item.submenuItems && item.submenuItems.length > 0) {
      const anySubItemVisible = item.submenuItems.some(sub =>
        hasAccess(sub, user, hasPermission)
      );
      if (anySubItemVisible) return true;
    }

    return false;
  };

  const handleCollapsedDropdownClick = (itemName) => {
    if (collapsed) {
      setCollapsedDropdownOpen(collapsedDropdownOpen === itemName ? null : itemName)
    }
  }

  const handleCollapsedDropdownHover = (itemName) => {
    if (collapsed) {
      setCollapsedDropdownOpen(itemName)
    }
  }

  const handleCollapsedDropdownLeave = () => {
    if (collapsed) {
      setTimeout(() => {
        setCollapsedDropdownOpen(null)
      }, 300)
    }
  }
  const sidebarStyle = {
    width: collapsed ? "70px" : "280px", height: "100vh", position: "fixed", top: 0,
    left: isMobile || isTablet ? (isOpen ? 0 : "-280px") : 0, zIndex: 1050, transition: "all 0.3s ease",
    backgroundColor: darkMode ? "var(--dark-card)" : "var(--light-card)",
    borderRight: `1px solid ${darkMode ? "var(--dark-border)" : "var(--light-border)"}`,
    boxShadow: "var(--shadow-md)",
    overflowY: "auto",
    overflowX: "hidden",
  }

  const navItems = [
    { path: "/app", name: "Dashboard", icon: <MdDashboard />, roles: ["admin", "companyAdmin", "member"] },
    {
      name: "Survey Management",
      icon: <MdAssignment />,
      submenu: true,
      isOpen: surveySubmenuOpen,
      roles: ["admin", "companyAdmin"],
      toggle: () => toggleSubmenu("survey"),
      permissions: ["survey:create", "survey:read", "survey:update", "survey:delete", "survey:templates", "survey:schedule", "survey:responses:view", "survey:analytics:view",
        "survey:customize", "survey:share", "survey:settings:update", "survey:detail:view"],
      submenuItems: [
        { path: "/app/surveys", name: "All Surveys", icon: <MdViewList />, roles: ["companyAdmin", "admin"], permissions: ["survey:read"] },
        { path: "/app/surveys/create", name: "Create Survey", icon: <MdAddCircleOutline />, roles: ["companyAdmin"], permissions: ["survey:create"] },
        { path: "/app/surveys/templates", name: "Survey Templates", icon: <MdTemplate />, roles: ["admin", "companyAdmin"], permissions: ["survey:templates"] },
        { path: "/app/surveys/scheduling", name: "Survey Scheduling", icon: <MdSchedule />, roles: ["companyAdmin"], permissions: ["survey:schedule"] },
        { path: "/app/surveys/:id/responses", name: "Survey Responses", icon: <MdQuestionAnswer />, roles: ["companyAdmin"], permissions: ["survey:responses:view"] },
        { path: "/app/surveys/analytics", name: "Survey Analytics", icon: <MdAnalytics />, roles: ["companyAdmin"], permissions: ["survey:analytics:view"] },
        { path: "/app/surveys/:id/customize", name: "Customization", icon: <MdCustomize />, roles: ["companyAdmin"], permissions: ["survey:customize"] },
        { path: "/app/surveys/:id/share", name: "Survey Sharing", icon: <MdShare />, roles: ["companyAdmin"], permissions: ["survey:share"] },
        { path: "/app/surveys/settings", name: "Survey Settings", icon: <MdSettings />, roles: ["companyAdmin"], permissions: ["survey:settings:update"] },
        { path: "/app/surveys/detail", name: "Survey Detail", icon: <MdVisibility />, roles: ["companyAdmin"], permissions: ["survey:detail:view"] },
      ],
    },
    {
      name: "User Management",
      icon: <MdGroup />,
      submenu: true,
      isOpen: userSubmenuOpen,
      roles: ["companyAdmin"],
      toggle: () => toggleSubmenu("user"),
      permissions: ["user:create", "user:read", "user:update", "user:delete", "user:toggle", "user:export", "user:notify"],
      submenuItems: [
        { path: "/app/users", name: "All Users", icon: <MdPeople />, roles: ["companyAdmin"], permissions: ["user:create", "user:read", "user:update", "user:delete", "user:toggle", "user:export", "user:notify"], },
        { path: "/app/users/form", name: "Create User", icon: <MdPersonAdd />, roles: ["companyAdmin"], permissions: ["user:create", "user:update"], },
      ],
    },
    { path: "/app/access", name: "Access Management", icon: <MdSecurity />, roles: ["companyAdmin"], },
    { path: "/app/roles", name: "Role Management", icon: <MdGroup />, roles: ["companyAdmin"], permissions: ["role:create", "role:read", "role:update", "role:delete"], },
    {
      name: "Analytics & Reports",
      icon: <MdInsertChart />,
      submenu: true,
      isOpen: analyticsSubmenuOpen,
      toggle: () => toggleSubmenu("analytics"),
      roles: ["companyAdmin"],
      permissions: ["analytics:view", "analytics:realtime", "analytics:trends", "analytics:custom", "analytics:responses"],
      submenuItems: [
        { path: "/app/analytics", name: "Analytics Overview", icon: <MdInsertChart />, roles: ["companyAdmin"] },
        { path: "/app/analytics/real-time", name: "Real-Time Results", icon: <MdRealTimeSync />, roles: ["companyAdmin"] },
        { path: "/app/analytics/trends", name: "Trend Analysis", icon: <MdTrendingUp />, roles: ["companyAdmin"] },
        { path: "/app/analytics/custom-reports", name: "Custom Reports", icon: <MdBarChart />, roles: ["companyAdmin"] },
        { path: "/app/analytics/response-overview", name: "Response Overview", icon: <MdShowChart />, roles: ["companyAdmin"] },
      ],
    },
    {
      name: "Audience Management",
      icon: <MdPeople />,
      submenu: true,
      isOpen: audienceSubmenuOpen, 
      roles: ["companyAdmin"],
      toggle: () => toggleSubmenu("audience"),
      permissions: ["audience:view", "audience:segment", "audience:contacts"],
      submenuItems: [
        { path: "/app/audiences", name: "All Audiences", icon: <MdPeople />, roles: ["companyAdmin"] },
        { path: "/app/audiences/segmentation", name: "Audience Segmentation", icon: <MdSegment />, roles: ["companyAdmin"] },
        { path: "/app/audiences/contact-management", name: "Contact Management", icon: <MdContacts />, roles: ["companyAdmin"] },
      ],
    },
    {
      name: "Content Management",
      icon: <MdSettings />,
      submenu: true,
      isOpen: contentmanagement,
      roles: ["admin"],
      toggle: () => toggleSubmenu("content"),
      permissions: ["content:features", "content:pricing", "content:testimonials", "content:widgets"],
      submenuItems: [
        { path: "/app/features", name: "Features", icon: <MdSettings />, roles: ["admin"] },
        { path: "/app/content/pricing", name: "Pricing", icon: <MdPayment />, roles: ["admin"] },
        { path: "/app/content/testimonials", name: "Testimonials", icon: <MdThumbUp />, roles: ["admin"] },
        { path: "/app/content/widgets", name: "Widgets", icon: <MdMailOutline />, roles: ["admin"] },

      ],
    },
    { path: "/app/support", name: "Support Tickets", icon: <MdSupport />, roles: ["admin"] },
    {
      name: "Settings",
      icon: <MdSettings />,
      submenu: true,
      isOpen: settingsSubmenuOpen,
      roles: ["admin", "companyAdmin"],
      toggle: () => toggleSubmenu("settings"),
      permissions: ["settings:general"],
      submenuItems: [
        { path: "/app/settings", name: "General Settings", icon: <MdSettings />, roles: ["admin", "companyAdmin"], permissions: ["settings:general"], },
        { path: "/app/settings/email-templates", name: "Email Templates", icon: <MdMailOutline />, roles: ["admin"] },
        { path: "/app/settings/notification-settings", name: "Notification Settings", icon: <MdNotifications />, roles: ["admin"] },
        { path: "/app/settings/smtp-config", name: "SMTP Configuration", icon: <MdEmail />, roles: ["admin"] },
        { path: "/app/settings/custom-thank-you", name: "Thank You Page", icon: <MdThumbUp />, roles: ["admin"] },
        { path: "/app/settings/theme-settings", name: "Theme Settings", icon: <MdColorLens />, roles: ["admin", "companyAdmin", "member"],},
      ],
    },
  ]

  const isActiveRoute = (path) => {
    return location.pathname === path
  }

  return (
    <div ref={sidebarRef} style={sidebarStyle} className="d-flex flex-column">
      {/* Header */}
      <div
        className="d-flex justify-content-between align-items-center p-3 border-bottom"
        style={{ height: "var(--header-height)" }}
      >
        {!collapsed && <h4 className="mb-0 text-primary fw-bold">Rate Pro</h4>}
        <Button
          variant="link"
          className="p-1 text-decoration-none"
          onClick={handleCloseClick}
          style={{
            color: "inherit",
            marginLeft: collapsed ? "0" : "auto",
          }}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <MdMenu size={24} /> : <MdClose size={24} />}
        </Button>
      </div>

      {/* Navigation */}
      <Nav className="flex-column flex-fill p-2">
        {navItems
          .filter(item => hasAccess(item, user, hasPermission))
          .map((item, index) => (
            <div key={index} className="mb-1 position-relative">
              {item.submenu ? (
                <>
                  <Button
                    variant="link"
                    className="w-100 text-start text-decoration-none d-flex align-items-center p-2 rounded transition-all"
                    onClick={collapsed ? () => handleCollapsedDropdownClick(item.name) : item.toggle}
                    onMouseEnter={() => {
                      setHoveredItem(item.name)
                      if (collapsed) handleCollapsedDropdownHover(item.name)
                    }}
                    onMouseLeave={() => {
                      setHoveredItem(null)
                      if (collapsed) handleCollapsedDropdownLeave()
                    }}
                    style={{
                      color: hoveredItem === item.name ? "var(--primary-color)" : "inherit",
                      border: "none",
                      backgroundColor: "transparent",
                      transition: "all 0.3s ease",
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

                  {/* Collapsed Dropdown */}
                  {collapsed && collapsedDropdownOpen === item.name && (
                    <div
                      className="position-absolute bg-dark text-white rounded shadow-lg"
                      style={{
                        left: "100%",
                        top: "0",
                        marginLeft: "10px",
                        minWidth: "200px",
                        zIndex: 1000,
                        maxHeight: "400px",
                        overflowY: "auto",
                      }}
                      onMouseEnter={() => setCollapsedDropdownOpen(item.name)}
                      onMouseLeave={() => setCollapsedDropdownOpen(null)}
                    >
                      <div className="p-2">
                        <div className="fw-bold mb-2 text-primary">{item.name}</div>

                        {item.submenuItems
                          .filter(subItem => hasAccess(subItem, user, hasPermission))
                          .map((subItem, subIndex) => (
                            <div
                              key={subIndex}
                              className="d-flex align-items-center p-2 rounded text-decoration-none text-white small"
                              onClick={() => {
                                setCollapsedDropdownOpen(null)
                                if (isMobile || isTablet) onClose()
                              }}
                              style={{
                                backgroundColor: isActiveRoute(subItem.path) ? "var(--primary-color)" : "transparent",
                                color: isActiveRoute(subItem.path) ? "white" : "#e9ecef",
                                cursor: "pointer",
                              }}
                            >
                              <NavLink
                                to={subItem.path}
                                className="d-flex align-items-center text-decoration-none w-100"
                                style={{
                                  color: "inherit",
                                }}
                              >
                                <span className="me-2" style={{ minWidth: "16px" }}>
                                  {subItem.icon}
                                </span>
                                <span>{subItem.name}</span>
                              </NavLink>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Expanded Submenu */}
                  {!collapsed && (
                    <Collapse in={item.isOpen}>
                      <div className="ms-4">
                        {item.submenuItems
                          .filter(subItem => hasAccess(subItem, user, hasPermission))
                          .map((subItem, subIndex) => (
                            <div
                              key={subIndex}
                              className="d-flex align-items-center p-2 rounded text-decoration-none mb-1"
                              style={{
                                backgroundColor: isActiveRoute(subItem.path)
                                  ? "var(--primary-color)"
                                  : "transparent",
                                color: isActiveRoute(subItem.path) ? "white" : "inherit",
                                transition: "all 0.3s ease",
                              }}
                              onMouseEnter={(e) => {
                                if (!isActiveRoute(subItem.path)) {
                                  e.target.style.backgroundColor = "var(--primary-color)"
                                  e.target.style.color = "white"
                                  e.target.style.opacity = "0.8"
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (!isActiveRoute(subItem.path)) {
                                  e.target.style.backgroundColor = "transparent"
                                  e.target.style.color = "inherit"
                                  e.target.style.opacity = "1"
                                }
                              }}
                            >
                              <NavLink
                                to={subItem.path}
                                className="d-flex align-items-center text-decoration-none w-100"
                                onClick={() => (isMobile || isTablet) && onClose()}
                                style={{
                                  color: "inherit",
                                }}
                              >
                                <span className="me-3" style={{ minWidth: "20px" }}>
                                  {subItem.icon}
                                </span>
                                <span>{subItem.name}</span>
                              </NavLink>
                            </div>
                          ))}
                      </div>
                    </Collapse>
                  )}

                </>
              ) : (
                <div
                  className="d-flex align-items-center p-2 rounded text-decoration-none position-relative mb-1"
                  style={{
                    backgroundColor: isActiveRoute(item.path)
                      ? "var(--primary-color)"
                      : hoveredItem === item.name
                        ? "var(--primary-color)"
                        : "transparent",
                    color: isActiveRoute(item.path) || hoveredItem === item.name ? "white" : "inherit",
                    opacity: hoveredItem === item.name && !isActiveRoute(item.path) ? "0.8" : "1",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <NavLink
                    to={item.path}
                    className="d-flex align-items-center text-decoration-none w-100"
                    onClick={() => (isMobile || isTablet) && onClose()}
                    style={{
                      color: "inherit",
                    }}
                  >
                    <span className="me-3" style={{ minWidth: "24px" }}>
                      {item.icon}
                    </span>
                    {!collapsed && <span>{item.name}</span>}
                  </NavLink>

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
                        opacity: hoveredItem === item.name ? 1 : 0,
                        pointerEvents: "none",
                        transition: "opacity 0.2s",
                        zIndex: 1000,
                      }}
                    >
                      {item.name}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
      </Nav>
    </div>
  )
}

export default Sidebar