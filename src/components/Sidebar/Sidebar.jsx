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
  const { user } = useAuth()
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
    { path: "/app", name: "Dashboard", icon: <MdDashboard />, roles: ["admin", "company"], },
    {
      name: "Survey Management",
      icon: <MdAssignment />,
      submenu: true,
      isOpen: surveySubmenuOpen,
      roles: ["admin", "company"],
      toggle: () => toggleSubmenu("survey"),
      submenuItems: [
        { path: "/app/surveys", name: "All Surveys", icon: <MdViewList /> },
        { path: "/app/surveys/create", name: "Create Survey", icon: <MdAddCircleOutline />, roles: ["company"]  },
        { path: "/app/surveys/templates", name: "Survey Templates", icon: <MdTemplate />, roles: ["admin"] },
        { path: "/app/surveys/scheduling", name: "Survey Scheduling", icon: <MdSchedule /> },
        { path: "/app/surveys/:id/responses", name: "Survey Responses", icon: <MdQuestionAnswer />, roles: ["company"] },
        { path: "/app/surveys/analytics", name: "Survey Analytics", icon: <MdAnalytics />, roles: ["company"] },
        { path: "/app/surveys/:id/customize", name: "Customization", icon: <MdCustomize /> },
        { path: "/app/surveys/:id/share", name: "Survey Sharing", icon: <MdShare />, roles: ["company"] },
        { path: "/app/surveys/settings", name: "Survey Settings", icon: <MdSettings />, roles: ["company"] },
        { path: "/app/surveys/detail", name: "Survey Detail", icon: <MdVisibility />, roles: ["company"] },
        // { path: "/app/surveys/takesurvey", name: "Take Survey", icon: <MdAssignment /> },
      ],
    },
    {
      name: "User Management",
      icon: <MdGroup />,
      submenu: true,
      isOpen: userSubmenuOpen,
      toggle: () => toggleSubmenu("user"),
      submenuItems: [
        { path: "/app/users", name: "All Users", icon: <MdPeople /> },
        { path: "/app/users/create", name: "Add User", icon: <MdPersonAdd /> },
        { path: "/app/users/form", name: "User Form", icon: <MdPersonOutline /> },
        { path: "/app/users/role-permissions", name: "Role Permissions", icon: <MdAssignmentInd />, roles: ["admin"] },

      ],
    },
    {
      name: "Access Management",
      icon: <MdSecurity />,
      submenu: true,
      isOpen: accessSubmenuOpen,
      roles: ["admin"],
      toggle: () => toggleSubmenu("access"),
      submenuItems: [
        { path: "/app/access", name: "Overview", icon: <MdSecurity /> },
        { path: "/app/access/roles", name: "Role Management", icon: <MdGroup /> },
        { path: "/app/access/permissions", name: "Permission Management", icon: <MdVpnKey /> },
      ],
    },
    {
      name: "Analytics & Reports",
      icon: <MdInsertChart />,
      submenu: true,
      isOpen: analyticsSubmenuOpen,
      toggle: () => toggleSubmenu("analytics"),
      submenuItems: [
        { path: "/app/analytics", name: "Analytics Overview", icon: <MdInsertChart /> },
        { path: "/app/analytics/real-time", name: "Real-Time Results", icon: <MdRealTimeSync /> },
        { path: "/app/analytics/trends", name: "Trend Analysis", icon: <MdTrendingUp /> },
        { path: "/app/analytics/custom-reports", name: "Custom Reports", icon: <MdBarChart /> },
        { path: "/app/analytics/response-overview", name: "Response Overview", icon: <MdShowChart /> },
      ],
    },
    {
      name: "Audience Management",
      icon: <MdPeople />,
      submenu: true,
      isOpen: audienceSubmenuOpen,
      toggle: () => toggleSubmenu("audience"),
      submenuItems: [
        { path: "/app/audiences", name: "All Audiences", icon: <MdPeople /> },
        { path: "/app/audiences/segmentation", name: "Audience Segmentation", icon: <MdSegment /> },
        { path: "/app/audiences/contact-management", name: "Contact Management", icon: <MdContacts /> },
      ],
    },
    {
      name: "Content Management",
      icon: <MdSettings />,
      submenu: true,
      isOpen: contentmanagement,
      roles: ["admin"],
      toggle: () => toggleSubmenu("content"),
      submenuItems: [
        { path: "/app/features", name: "Features", icon: <MdSettings /> },
        { path: "/app/content/pricing", name: "Pricing", icon: <MdPayment /> },
        { path: "/app/content/testimonials", name: "Testimonials", icon: <MdThumbUp /> },
        { path: "/app/content/widgets", name: "Widgets", icon: <MdMailOutline /> },

      ],
    },
    // {
    //   name: "Communication",
    //   icon: <MdEmail />,
    //   submenu: true,
    //   isOpen: communicationSubmenuOpen,
    //   roles: ["admin"],
    //   toggle: () => toggleSubmenu("communication"),
    //   submenuItems: [
    //     { path: "/app/communication/emails", name: "Email Management", icon: <MdEmail /> },
    //     { path: "/app/communication/templates", name: "Email Templates", icon: <MdDescription /> },
    //     { path: "/app/communication/notifications", name: "Notification Center", icon: <MdNotifications /> },
    //   ],
    // },
    { path: "/app/support", name: "Support Tickets", icon: <MdSupport />, roles: ["admin"] },
    // {
    //   name: "Incentives & Rewards",
    //   icon: <MdCardGiftcard />,
    //   submenu: true,
    //   isOpen: incentivesSubmenuOpen,
    //   roles: ["admin"],
    //   toggle: () => toggleSubmenu("incentives"),
    //   submenuItems: [
    //     { path: "/app/incentives", name: "Reward System", icon: <MdCardGiftcard /> },
    //     { path: "/app/incentives/rewards", name: "Incentive Management", icon: <MdCampaign /> },
    //   ],
    // },
    {
      name: "Settings",
      icon: <MdSettings />,
      submenu: true,
      isOpen: settingsSubmenuOpen,
      toggle: () => toggleSubmenu("settings"),
      submenuItems: [
        { path: "/app/settings", name: "General Settings", icon: <MdSettings />, roles: ["admin", "company"] },
        // { path: "/app/settings/billing-plans", name: "Billing Plans", icon: <MdPayment />, roles: ["admin"] },
        // { path: "/app/settings/custom-thank-you", name: "Custom Thank You", icon: <MdThumbUp />, roles: ["admin"] },
        { path: "/app/settings/email-templates", name: "Email Templates", icon: <MdMailOutline />, roles: ["admin"] },
        { path: "/app/settings/notification-settings", name: "Notification Settings", icon: <MdNotifications />, roles: ["admin"] },
        { path: "/app/settings/smtp-config", name: "SMTP Configuration", icon: <MdEmail />, roles: ["admin"] },
        { path: "/app/settings/custom-thank-you", name: "Thank You Page", icon: <MdThumbUp />, roles: ["admin"] },
        { path: "/app/settings/theme-settings", name: "Theme Settings", icon: <MdColorLens />, roles: ["admin"] },
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
          .filter(item => !item.roles || item.roles.includes(role)) // 👈 role-based filtering
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
                          .filter(subItem =>
                            !subItem.roles || subItem.roles.map(r => r.toLowerCase()).includes(role)
                          ).map((subItem, subIndex) => (
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
                          .filter(subItem => !subItem.roles || subItem.roles.map(r => r.toLowerCase()).includes(role))
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