// src\pages\Profile\Profile.jsx

"use client"

import { useState } from "react"
import { Container, Row, Col, Card, Form, Button, Tab, Tabs, Alert, Badge } from "react-bootstrap"
import { MdPerson, MdSecurity, MdNotifications, MdEdit, MdSave, MdCancel } from "react-icons/md"

const Profile = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@ratepro.com",
    phone: "+1 (555) 123-4567",
    department: "Administration",
    role: "Super Admin",
    bio: "Experienced administrator with 5+ years in survey management and data analysis.",
    timezone: "UTC-5 (Eastern Time)",
    language: "English",
  })

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    surveyAlerts: true,
    weeklyReports: true,
    systemUpdates: false,
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target
    setNotifications((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSave = () => {
    setIsEditing(false)
    setShowAlert(true)
    setTimeout(() => setShowAlert(false), 3000)
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset form data if needed
  }

  return (
    <Container fluid className="profile-container py-4">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className={`mb-1 ${darkMode ? "text-white" : "text-dark"}`}>Profile Settings</h2>
              <p className="text-muted mb-0">Manage your account settings and preferences</p>
            </div>
            <div className="d-flex gap-2">
              {/* {isEditing ? (
                <>
                  <Button variant="outline-secondary" size="sm" onClick={handleCancel}>
                    <MdCancel className="me-1" />
                    Cancel
                  </Button>
                  <Button variant="primary" size="sm" onClick={handleSave}>
                    <MdSave className="me-1" />
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button variant="primary" size="sm" onClick={() => setIsEditing(true)}>
                  <MdEdit className="me-1" />
                  Edit Profile
                </Button>
              )} */}

              {activeTab === "profile" && (
                isEditing ? (
                  <>
                    <button onClick={handleCancel} className="btn btn-outline-secondary btn-sm">
                      <MdCancel className="me-1" /> Cancel
                    </button>
                    <button onClick={handleSave} className="btn btn-primary btn-sm">
                      <MdSave className="me-1" /> Save
                    </button>
                  </>
                ) : (
                  <button onClick={() => setIsEditing(true)} className="btn btn-primary btn-sm">
                    <MdEdit className="me-1" /> Edit Profile
                  </button>
                )
              )}
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
              Profile updated successfully!
            </Alert>
          </Col>
        </Row>
      )}

      <Row>
        {/* Profile Card */}
        <Col lg={4} className="mb-4">
          <Card
            className="profile-card border-0 shadow-sm h-100"
            style={{
              backgroundColor: darkMode ? "var(--dark-card)" : "var(--light-card)",
            }}
          >
            <Card.Body className="text-center">
              <div
                className="profile-avatar mx-auto mb-3 rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: "120px",
                  height: "120px",
                  backgroundColor: "var(--primary-color)",
                  color: "#fff",
                  fontSize: "3rem",
                }}
              >
                <MdPerson />
              </div>
              <h4 className={`mb-1 ${darkMode ? "text-white" : "text-dark"}`}>
                {formData.firstName} {formData.lastName}
              </h4>
              <p className="text-muted mb-2">{formData.email}</p>
              <Badge bg="primary" className="mb-3">
                {formData.role}
              </Badge>
              <p className={`small ${darkMode ? "text-light" : "text-muted"}`}>{formData.bio}</p>
              <div className="profile-stats mt-4">
                <Row>
                  <Col xs={4}>
                    <div className={`fw-bold ${darkMode ? "text-white" : "text-dark"}`}>24</div>
                    <div className="small text-muted">Surveys</div>
                  </Col>
                  <Col xs={4}>
                    <div className={`fw-bold ${darkMode ? "text-white" : "text-dark"}`}>1.2K</div>
                    <div className="small text-muted">Responses</div>
                  </Col>
                  <Col xs={4}>
                    <div className={`fw-bold ${darkMode ? "text-white" : "text-dark"}`}>78%</div>
                    <div className="small text-muted">Completion</div>
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Settings Tabs */}
        <Col lg={8}>
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
                className="profile-tabs mb-4"
                style={{
                  borderBottom: `1px solid ${darkMode ? "var(--dark-border)" : "var(--light-border)"}`,
                }}
              >
                {/* Personal Information Tab */}
                <Tab
                  eventKey="profile"
                  title={
                    <span className={darkMode ? "text-white" : "text-dark"}>
                      <MdPerson className="me-2" />
                      Personal Info
                    </span>
                  }
                >
                  <Form>
                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label className={darkMode ? "text-white" : "text-dark"}>First Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            disabled={!isEditing}
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
                          <Form.Label className={darkMode ? "text-white" : "text-dark"}>Last Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            style={{
                              backgroundColor: darkMode ? "var(--dark-bg)" : "var(--light-bg)",
                              borderColor: darkMode ? "var(--dark-border)" : "var(--light-border)",
                              color: darkMode ? "var(--dark-text)" : "var(--light-text)",
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label className={darkMode ? "text-white" : "text-dark"}>Email Address</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            disabled={!isEditing}
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
                          <Form.Label className={darkMode ? "text-white" : "text-dark"}>Phone Number</Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            style={{
                              backgroundColor: darkMode ? "var(--dark-bg)" : "var(--light-bg)",
                              borderColor: darkMode ? "var(--dark-border)" : "var(--light-border)",
                              color: darkMode ? "var(--dark-text)" : "var(--light-text)",
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label className={darkMode ? "text-white" : "text-dark"}>Department</Form.Label>
                          <Form.Control
                            type="text"
                            name="department"
                            value={formData.department}
                            onChange={handleInputChange}
                            disabled={!isEditing}
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
                          <Form.Label className={darkMode ? "text-white" : "text-dark"}>Role</Form.Label>
                          <Form.Control
                            type="text"
                            name="role"
                            value={formData.role}
                            disabled
                            style={{
                              backgroundColor: darkMode ? "var(--dark-hover)" : "var(--light-hover)",
                              borderColor: darkMode ? "var(--dark-border)" : "var(--light-border)",
                              color: darkMode ? "var(--dark-text)" : "var(--light-text)",
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group className="mb-3">
                      <Form.Label className={darkMode ? "text-white" : "text-dark"}>Bio</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        style={{
                          backgroundColor: darkMode ? "var(--dark-bg)" : "var(--light-bg)",
                          borderColor: darkMode ? "var(--dark-border)" : "var(--light-border)",
                          color: darkMode ? "var(--dark-text)" : "var(--light-text)",
                        }}
                      />
                    </Form.Group>
                  </Form>
                </Tab>

                {/* Security Tab */}
                <Tab
                  eventKey="security"
                  title={
                    <span className={darkMode ? "text-white" : "text-dark"}>
                      <MdSecurity className="me-2" />
                      Security
                    </span>
                  }
                >
                  <div className="security-section">
                    <h5 className={`mb-3 ${darkMode ? "text-white" : "text-dark"}`}>Change Password</h5>
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label className={darkMode ? "text-white" : "text-dark"}>Current Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Enter current password"
                          style={{
                            backgroundColor: darkMode ? "var(--dark-bg)" : "var(--light-bg)",
                            borderColor: darkMode ? "var(--dark-border)" : "var(--light-border)",
                            color: darkMode ? "var(--dark-text)" : "var(--light-text)",
                          }}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label className={darkMode ? "text-white" : "text-dark"}>New Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Enter new password"
                          style={{
                            backgroundColor: darkMode ? "var(--dark-bg)" : "var(--light-bg)",
                            borderColor: darkMode ? "var(--dark-border)" : "var(--light-border)",
                            color: darkMode ? "var(--dark-text)" : "var(--light-text)",
                          }}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label className={darkMode ? "text-white" : "text-dark"}>Confirm New Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Confirm new password"
                          style={{
                            backgroundColor: darkMode ? "var(--dark-bg)" : "var(--light-bg)",
                            borderColor: darkMode ? "var(--dark-border)" : "var(--light-border)",
                            color: darkMode ? "var(--dark-text)" : "var(--light-text)",
                          }}
                        />
                      </Form.Group>
                      <Button variant="primary">Update Password</Button>
                    </Form>
                  </div>
                </Tab>

                {/* Notifications Tab */}
                <Tab
                  eventKey="notifications"
                  title={
                    <span className={darkMode ? "text-white" : "text-dark"}>
                      <MdNotifications className="me-2" />
                      Notifications
                    </span>
                  }
                >
                  <div className="notifications-section">
                    <h5 className={`mb-3 ${darkMode ? "text-white" : "text-dark"}`}>Notification Preferences</h5>
                    <Form>
                      {Object.entries(notifications).map(([key, value]) => (
                        <Form.Group key={key} className="mb-3">
                          <Form.Check
                            type="switch"
                            id={key}
                            name={key}
                            checked={value}
                            onChange={handleNotificationChange}
                            label={
                              <span className={darkMode ? "text-white" : "text-dark"}>
                                {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                              </span>
                            }
                            style={{
                              color: darkMode ? "var(--dark-text)" : "var(--light-text)",
                            }}
                          />
                        </Form.Group>
                      ))}
                      <Button variant="primary">Save Preferences</Button>
                    </Form>
                  </div>
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Profile