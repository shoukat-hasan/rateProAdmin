// src\pages\Settings\NotificationSettings.jsx

"use client"

import { useState } from "react"
import { Container, Row, Col, Card, Form, Button, Alert, Badge } from "react-bootstrap"

const NotificationSettings = () => {
  const [saved, setSaved] = useState(false)
  const [settings, setSettings] = useState({
    email: {
      newResponses: true,
      surveyCompleted: true,
      weeklyReports: true,
      systemUpdates: false,
      marketingEmails: false,
      securityAlerts: true,
    },
    push: {
      newResponses: false,
      surveyCompleted: true,
      systemAlerts: true,
      reminders: true,
    },
    sms: {
      enabled: false,
      criticalAlerts: false,
      phoneNumber: "",
    },
    slack: {
      enabled: true,
      webhook: "https://hooks.slack.com/...",
      channel: "#surveys",
      newResponses: true,
      surveyCompleted: true,
    },
  })

  const handleSave = (e) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const updateEmailSetting = (key, value) => {
    setSettings({
      ...settings,
      email: { ...settings.email, [key]: value },
    })
  }

  const updatePushSetting = (key, value) => {
    setSettings({
      ...settings,
      push: { ...settings.push, [key]: value },
    })
  }

  const updateSmsSetting = (key, value) => {
    setSettings({
      ...settings,
      sms: { ...settings.sms, [key]: value },
    })
  }

  const updateSlackSetting = (key, value) => {
    setSettings({
      ...settings,
      slack: { ...settings.slack, [key]: value },
    })
  }

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h1 className="h3 mb-0">Notification Settings</h1>
          <p className="text-muted">Manage how and when you receive notifications</p>
        </Col>
      </Row>

      {saved && (
        <Alert variant="success" className="mb-4">
          <i className="fas fa-check-circle me-2"></i>
          Notification settings saved successfully!
        </Alert>
      )}

      <Form onSubmit={handleSave}>
        <Row>
          <Col lg={6}>
            {/* Email Notifications */}
            <Card className="mb-4">
              <Card.Header>
                <div className="d-flex align-items-center">
                  <i className="fas fa-envelope text-primary me-2"></i>
                  <Card.Title className="mb-0">Email Notifications</Card.Title>
                  <Badge bg="success" className="ms-auto">
                    Active
                  </Badge>
                </div>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="email-new-responses"
                    label="New survey responses"
                    checked={settings.email.newResponses}
                    onChange={(e) => updateEmailSetting("newResponses", e.target.checked)}
                  />
                  <Form.Text className="text-muted">Get notified when someone completes your survey</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="email-survey-completed"
                    label="Survey completion milestones"
                    checked={settings.email.surveyCompleted}
                    onChange={(e) => updateEmailSetting("surveyCompleted", e.target.checked)}
                  />
                  <Form.Text className="text-muted">Notifications for response milestones (100, 500, 1000+)</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="email-weekly-reports"
                    label="Weekly summary reports"
                    checked={settings.email.weeklyReports}
                    onChange={(e) => updateEmailSetting("weeklyReports", e.target.checked)}
                  />
                  <Form.Text className="text-muted">Weekly digest of your survey performance</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="email-system-updates"
                    label="System updates and maintenance"
                    checked={settings.email.systemUpdates}
                    onChange={(e) => updateEmailSetting("systemUpdates", e.target.checked)}
                  />
                  <Form.Text className="text-muted">Important system announcements and scheduled maintenance</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="email-security-alerts"
                    label="Security alerts"
                    checked={settings.email.securityAlerts}
                    onChange={(e) => updateEmailSetting("securityAlerts", e.target.checked)}
                  />
                  <Form.Text className="text-muted">Login attempts and security-related notifications</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="email-marketing"
                    label="Marketing emails"
                    checked={settings.email.marketingEmails}
                    onChange={(e) => updateEmailSetting("marketingEmails", e.target.checked)}
                  />
                  <Form.Text className="text-muted">Product updates, tips, and promotional content</Form.Text>
                </Form.Group>
              </Card.Body>
            </Card>

            {/* Push Notifications */}
            <Card className="mb-4">
              <Card.Header>
                <div className="d-flex align-items-center">
                  <i className="fas fa-bell text-warning me-2"></i>
                  <Card.Title className="mb-0">Push Notifications</Card.Title>
                  <Badge bg="secondary" className="ms-auto">
                    Browser Only
                  </Badge>
                </div>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="push-new-responses"
                    label="New responses"
                    checked={settings.push.newResponses}
                    onChange={(e) => updatePushSetting("newResponses", e.target.checked)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="push-survey-completed"
                    label="Survey milestones"
                    checked={settings.push.surveyCompleted}
                    onChange={(e) => updatePushSetting("surveyCompleted", e.target.checked)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="push-system-alerts"
                    label="System alerts"
                    checked={settings.push.systemAlerts}
                    onChange={(e) => updatePushSetting("systemAlerts", e.target.checked)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="push-reminders"
                    label="Task reminders"
                    checked={settings.push.reminders}
                    onChange={(e) => updatePushSetting("reminders", e.target.checked)}
                  />
                </Form.Group>

                <div className="alert alert-info">
                  <i className="fas fa-info-circle me-2"></i>
                  <small>
                    Push notifications require browser permission. Click "Allow" when prompted to enable notifications.
                  </small>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6}>
            {/* SMS Notifications */}
            <Card className="mb-4">
              <Card.Header>
                <div className="d-flex align-items-center">
                  <i className="fas fa-sms text-success me-2"></i>
                  <Card.Title className="mb-0">SMS Notifications</Card.Title>
                  <Badge bg={settings.sms.enabled ? "success" : "secondary"} className="ms-auto">
                    {settings.sms.enabled ? "Active" : "Disabled"}
                  </Badge>
                </div>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="sms-enabled"
                    label="Enable SMS notifications"
                    checked={settings.sms.enabled}
                    onChange={(e) => updateSmsSetting("enabled", e.target.checked)}
                  />
                </Form.Group>

                {settings.sms.enabled && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={settings.sms.phoneNumber}
                        onChange={(e) => updateSmsSetting("phoneNumber", e.target.value)}
                      />
                      <Form.Text className="text-muted">Include country code</Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Check
                        type="switch"
                        id="sms-critical-alerts"
                        label="Critical alerts only"
                        checked={settings.sms.criticalAlerts}
                        onChange={(e) => updateSmsSetting("criticalAlerts", e.target.checked)}
                      />
                      <Form.Text className="text-muted">Security issues and system outages</Form.Text>
                    </Form.Group>

                    <div className="alert alert-warning">
                      <i className="fas fa-exclamation-triangle me-2"></i>
                      <small>SMS notifications may incur charges based on your mobile plan.</small>
                    </div>
                  </>
                )}
              </Card.Body>
            </Card>

            {/* Slack Integration */}
            <Card className="mb-4">
              <Card.Header>
                <div className="d-flex align-items-center">
                  <i className="fab fa-slack text-info me-2"></i>
                  <Card.Title className="mb-0">Slack Integration</Card.Title>
                  <Badge bg={settings.slack.enabled ? "success" : "secondary"} className="ms-auto">
                    {settings.slack.enabled ? "Connected" : "Disconnected"}
                  </Badge>
                </div>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="slack-enabled"
                    label="Enable Slack notifications"
                    checked={settings.slack.enabled}
                    onChange={(e) => updateSlackSetting("enabled", e.target.checked)}
                  />
                </Form.Group>

                {settings.slack.enabled && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>Webhook URL</Form.Label>
                      <Form.Control
                        type="url"
                        placeholder="https://hooks.slack.com/services/..."
                        value={settings.slack.webhook}
                        onChange={(e) => updateSlackSetting("webhook", e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Channel</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="#surveys"
                        value={settings.slack.channel}
                        onChange={(e) => updateSlackSetting("channel", e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Check
                        type="switch"
                        id="slack-new-responses"
                        label="New responses"
                        checked={settings.slack.newResponses}
                        onChange={(e) => updateSlackSetting("newResponses", e.target.checked)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Check
                        type="switch"
                        id="slack-survey-completed"
                        label="Survey milestones"
                        checked={settings.slack.surveyCompleted}
                        onChange={(e) => updateSlackSetting("surveyCompleted", e.target.checked)}
                      />
                    </Form.Group>

                    <Button variant="outline-primary" size="sm">
                      <i className="fas fa-vial me-2"></i>
                      Test Slack Connection
                    </Button>
                  </>
                )}
              </Card.Body>
            </Card>

            {/* Notification Schedule */}
            <Card className="mb-4">
              <Card.Header>
                <div className="d-flex align-items-center">
                  <i className="fas fa-clock text-secondary me-2"></i>
                  <Card.Title className="mb-0">Notification Schedule</Card.Title>
                </div>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Quiet Hours</Form.Label>
                  <Row>
                    <Col>
                      <Form.Control type="time" defaultValue="22:00" />
                      <Form.Text className="text-muted">From</Form.Text>
                    </Col>
                    <Col>
                      <Form.Control type="time" defaultValue="08:00" />
                      <Form.Text className="text-muted">To</Form.Text>
                    </Col>
                  </Row>
                  <Form.Text className="text-muted">No notifications during these hours</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Timezone</Form.Label>
                  <Form.Select defaultValue="UTC">
                    <option value="UTC">UTC</option>
                    <option value="EST">Eastern Time</option>
                    <option value="PST">Pacific Time</option>
                    <option value="GMT">Greenwich Mean Time</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check type="checkbox" id="weekend-notifications" label="Disable weekend notifications" />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="d-flex justify-content-end gap-2">
              <Button variant="outline-secondary">Reset to Defaults</Button>
              <Button type="submit" variant="primary">
                <i className="fas fa-save me-2"></i>
                Save Settings
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  )
}

export default NotificationSettings
