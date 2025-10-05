"use client"

import { useState } from "react"
import { Container, Row, Col, Card, Form, Button, Tab, Tabs, Alert, Badge } from "react-bootstrap"
import { MdSettings, MdSecurity, MdNotifications, MdPalette, MdSave, MdRefresh } from "react-icons/md"

const Settings = ({ darkMode, toggleTheme }) => {
  const [activeTab, setActiveTab] = useState("general")
  const [showAlert, setShowAlert] = useState(false)
  const [settings, setSettings] = useState({
    siteName: "Rate Pro",
    siteDescription: "Professional Survey Management Platform",
    timezone: "UTC-5",
    language: "en",
    dateFormat: "MM/DD/YYYY",
    currency: "USD",
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    systemAlerts: true,
    darkMode: darkMode,
    primaryColor: "var(--bs-primary)",
    autoSave: true,
    sessionTimeout: "30",
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSave = () => {
    if (settings.darkMode !== darkMode) {
      toggleTheme()
    }
    setShowAlert(true)
    setTimeout(() => setShowAlert(false), 3000)
  }

  return (
    <Container fluid className="settings-container mt-5" >
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className={`mb-1 ${darkMode ? "text-white" : "text-dark"}`}>Settings</h2>
              <p className="text-muted mb-0">Configure your application preferences</p>
            </div>
            <div className="d-flex gap-2">
              <Button variant="outline-secondary" size="sm">
                <MdRefresh className="me-1" />
                Reset
              </Button>
              <Button variant="primary" size="sm" onClick={handleSave}>
                <MdSave className="me-1" />
                Save Changes
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      {/* Alert */}
      {showAlert && (
        <Row className="mb-3">
          <Col>
            <Alert variant="success" className="d-flex align-items-center">
              <MdSave className="me-2" />
              Settings saved successfully!
            </Alert>
          </Col>
        </Row>
      )}

      <Row>
        <Col>
          <Card
            className="settings-card border-0 shadow-sm"
            style={{
              backgroundColor: darkMode ? "var(--dark-card)" : "var(--light-card)",
            }}
          >
            <Card.Body>
              <Tabs
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k)}
                className="settings-tabs mb-4"
                style={{
                  borderBottom: `1px solid ${darkMode ? "var(--dark-border)" : "var(--light-border)"}`,
                }}
              >
                {/* General Settings */}
                <Tab
                  eventKey="general"
                  title={
                    <span className={darkMode ? "text-white" : "text-dark"}>
                      <MdSettings className="me-2" />
                      General
                    </span>
                  }
                >
                  <Row>
                    <Col lg={8}>
                      <Form>
                        <Row>
                          <Col md={6} className="mb-3">
                            <Form.Group>
                              <Form.Label className={darkMode ? "text-white" : "text-dark"}>Site Name</Form.Label>
                              <Form.Control
                                type="text"
                                name="siteName"
                                value={settings.siteName}
                                onChange={handleInputChange}
                                style={{
                                  backgroundColor: darkMode ? "var(--dark-bg)" : "var(--light-bg)",
                                  borderColor: darkMode ? "var(--dark-border)" : "var(--light-border)",
                                  color: darkMode ? "var(--dark-text)" : "var(--light-text)",
                                }}
                              />
                            </Form.Group>
                          </Col>
                          <Col md={6} className="mb-3">
                            <Form.Group>
                              <Form.Label className={darkMode ? "text-white" : "text-dark"}>Timezone</Form.Label>
                              <Form.Select
                                name="timezone"
                                value={settings.timezone}
                                onChange={handleInputChange}
                                style={{
                                  backgroundColor: darkMode ? "var(--dark-bg)" : "var(--light-bg)",
                                  borderColor: darkMode ? "var(--dark-border)" : "var(--light-border)",
                                  color: darkMode ? "var(--dark-text)" : "var(--light-text)",
                                }}
                              >
                                <option value="UTC-12">UTC-12 (Baker Island)</option>
                                <option value="UTC-8">UTC-8 (Pacific Time)</option>
                                <option value="UTC-5">UTC-5 (Eastern Time)</option>
                                <option value="UTC+0">UTC+0 (Greenwich Mean Time)</option>
                                <option value="UTC+5:30">UTC+5:30 (India Standard Time)</option>
                                <option value="UTC+8">UTC+8 (China Standard Time)</option>
                              </Form.Select>
                            </Form.Group>
                          </Col>
                        </Row>
                        <Form.Group className="mb-3">
                          <Form.Label className={darkMode ? "text-white" : "text-dark"}>Site Description</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            name="siteDescription"
                            value={settings.siteDescription}
                            onChange={handleInputChange}
                            style={{
                              backgroundColor: darkMode ? "var(--dark-bg)" : "var(--light-bg)",
                              borderColor: darkMode ? "var(--dark-border)" : "var(--light-border)",
                              color: darkMode ? "var(--dark-text)" : "var(--light-text)",
                            }}
                          />
                        </Form.Group>
                        <Row>
                          <Col md={4} className="mb-3">
                            <Form.Group>
                              <Form.Label className={darkMode ? "text-white" : "text-dark"}>Language</Form.Label>
                              <Form.Select
                                name="language"
                                value={settings.language}
                                onChange={handleInputChange}
                                style={{
                                  backgroundColor: darkMode ? "var(--dark-bg)" : "var(--light-bg)",
                                  borderColor: darkMode ? "var(--dark-border)" : "var(--light-border)",
                                  color: darkMode ? "var(--dark-text)" : "var(--light-text)",
                                }}
                              >
                                <option value="en">English</option>
                                <option value="es">Español</option>
                                <option value="fr">Français</option>
                                <option value="de">Deutsch</option>
                              </Form.Select>
                            </Form.Group>
                          </Col>
                          <Col md={4} className="mb-3">
                            <Form.Group>
                              <Form.Label className={darkMode ? "text-white" : "text-dark"}>Date Format</Form.Label>
                              <Form.Select
                                name="dateFormat"
                                value={settings.dateFormat}
                                onChange={handleInputChange}
                                style={{
                                  backgroundColor: darkMode ? "var(--dark-bg)" : "var(--light-bg)",
                                  borderColor: darkMode ? "var(--dark-border)" : "var(--light-border)",
                                  color: darkMode ? "var(--dark-text)" : "var(--light-text)",
                                }}
                              >
                                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                              </Form.Select>
                            </Form.Group>
                          </Col>
                          <Col md={4} className="mb-3">
                            <Form.Group>
                              <Form.Label className={darkMode ? "text-white" : "text-dark"}>Currency</Form.Label>
                              <Form.Select
                                name="currency"
                                value={settings.currency}
                                onChange={handleInputChange}
                                style={{
                                  backgroundColor: darkMode ? "var(--dark-bg)" : "var(--light-bg)",
                                  borderColor: darkMode ? "var(--dark-border)" : "var(--light-border)",
                                  color: darkMode ? "var(--dark-text)" : "var(--light-text)",
                                }}
                              >
                                <option value="USD">USD ($)</option>
                                <option value="EUR">EUR (€)</option>
                                <option value="GBP">GBP (£)</option>
                                <option value="JPY">JPY (¥)</option>
                              </Form.Select>
                            </Form.Group>
                          </Col>
                        </Row>
                      </Form>
                    </Col>
                  </Row>
                </Tab>

                {/* Appearance Settings */}
                <Tab
                  eventKey="appearance"
                  title={
                    <span className={darkMode ? "text-white" : "text-dark"}>
                      <MdPalette className="me-2" />
                      Appearance
                    </span>
                  }
                >
                  <Row>
                    <Col lg={6}>
                      <Form>
                        <Form.Group className="mb-4">
                          <Form.Label className={darkMode ? "text-white" : "text-dark"}>Theme Mode</Form.Label>
                          <div className="mt-2">
                            <Form.Check
                              type="switch"
                              id="darkModeSwitch"
                              name="darkMode"
                              checked={settings.darkMode}
                              onChange={handleInputChange}
                              label={
                                <span className={darkMode ? "text-white" : "text-dark"}>
                                  Dark Mode{" "}
                                  {settings.darkMode && (
                                    <Badge bg="primary" className="ms-2">
                                      Active
                                    </Badge>
                                  )}
                                </span>
                              }
                            />
                          </div>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label className={darkMode ? "text-white" : "text-dark"}>Primary Color</Form.Label>
                          <div className="d-flex align-items-center gap-3">
                            <Form.Control
                              type="color"
                              name="primaryColor"
                              value={settings.primaryColor}
                              onChange={handleInputChange}
                              style={{ width: "60px", height: "40px" }}
                            />
                            <Form.Control
                              type="text"
                              name="primaryColor"
                              value={settings.primaryColor}
                              onChange={handleInputChange}
                              style={{
                                backgroundColor: darkMode ? "var(--dark-bg)" : "var(--light-bg)",
                                borderColor: darkMode ? "var(--dark-border)" : "var(--light-border)",
                                color: darkMode ? "var(--dark-text)" : "var(--light-text)",
                                maxWidth: "120px",
                              }}
                            />
                          </div>
                        </Form.Group>
                      </Form>
                    </Col>
                  </Row>
                </Tab>

                {/* Notifications Settings */}
                <Tab
                  eventKey="notifications"
                  title={
                    <span className={darkMode ? "text-white" : "text-dark"}>
                      <MdNotifications className="me-2" />
                      Notifications
                    </span>
                  }
                >
                  <Row>
                    <Col lg={6}>
                      <Form>
                        <h5 className={`mb-3 ${darkMode ? "text-white" : "text-dark"}`}>Email Notifications</h5>
                        <Form.Group className="mb-3">
                          <Form.Check
                            type="switch"
                            id="emailNotifications"
                            name="emailNotifications"
                            checked={settings.emailNotifications}
                            onChange={handleInputChange}
                            label={
                              <span className={darkMode ? "text-white" : "text-dark"}>Enable Email Notifications</span>
                            }
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Check
                            type="switch"
                            id="weeklyReports"
                            name="weeklyReports"
                            checked={settings.weeklyReports}
                            onChange={handleInputChange}
                            label={<span className={darkMode ? "text-white" : "text-dark"}>Weekly Reports</span>}
                          />
                        </Form.Group>
                        <Form.Group className="mb-4">
                          <Form.Check
                            type="switch"
                            id="systemAlerts"
                            name="systemAlerts"
                            checked={settings.systemAlerts}
                            onChange={handleInputChange}
                            label={<span className={darkMode ? "text-white" : "text-dark"}>System Alerts</span>}
                          />
                        </Form.Group>

                        <h5 className={`mb-3 ${darkMode ? "text-white" : "text-dark"}`}>Push Notifications</h5>
                        <Form.Group className="mb-3">
                          <Form.Check
                            type="switch"
                            id="pushNotifications"
                            name="pushNotifications"
                            checked={settings.pushNotifications}
                            onChange={handleInputChange}
                            label={
                              <span className={darkMode ? "text-white" : "text-dark"}>Enable Push Notifications</span>
                            }
                          />
                        </Form.Group>
                      </Form>
                    </Col>
                  </Row>
                </Tab>

                {/* Security Settings */}
                <Tab
                  eventKey="security"
                  title={
                    <span className={darkMode ? "text-white" : "text-dark"}>
                      <MdSecurity className="me-2" />
                      Security
                    </span>
                  }
                >
                  <Row>
                    <Col lg={6}>
                      <Form>
                        <Form.Group className="mb-3">
                          <Form.Label className={darkMode ? "text-white" : "text-dark"}>
                            Session Timeout (minutes)
                          </Form.Label>
                          <Form.Select
                            name="sessionTimeout"
                            value={settings.sessionTimeout}
                            onChange={handleInputChange}
                            style={{
                              backgroundColor: darkMode ? "var(--dark-bg)" : "var(--light-bg)",
                              borderColor: darkMode ? "var(--dark-border)" : "var(--light-border)",
                              color: darkMode ? "var(--dark-text)" : "var(--light-text)",
                            }}
                          >
                            <option value="15">15 minutes</option>
                            <option value="30">30 minutes</option>
                            <option value="60">1 hour</option>
                            <option value="120">2 hours</option>
                            <option value="0">Never</option>
                          </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Check
                            type="switch"
                            id="autoSave"
                            name="autoSave"
                            checked={settings.autoSave}
                            onChange={handleInputChange}
                            label={<span className={darkMode ? "text-white" : "text-dark"}>Auto-save changes</span>}
                          />
                        </Form.Group>
                      </Form>
                    </Col>
                  </Row>
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Settings
