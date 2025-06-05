// src\pages\Surveys\SurveySettings.jsx

"use client"

import { useState } from "react"
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap"

const SurveySettings = () => {
  const [settings, setSettings] = useState({
    surveyName: "Customer Satisfaction Q4",
    description: "Quarterly customer satisfaction survey",
    isActive: true,
    allowAnonymous: true,
    requireLogin: false,
    multipleResponses: false,
    showProgressBar: true,
    randomizeQuestions: false,
    autoSave: true,
    thankYouMessage: "Thank you for your participation!",
    redirectUrl: "",
    emailNotifications: true,
    responseLimit: "",
    startDate: "",
    endDate: "",
  })

  const [saved, setSaved] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSave = (e) => {
    e.preventDefault()
    // Simulate save
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h1 className="h3 mb-0">Survey Settings</h1>
          <p className="text-muted">Configure your survey preferences and behavior</p>
        </Col>
      </Row>

      {saved && (
        <Alert variant="success" className="mb-4">
          <i className="fas fa-check-circle me-2"></i>
          Settings saved successfully!
        </Alert>
      )}

      <Form onSubmit={handleSave}>
        <Row>
          <Col lg={8}>
            <Card className="mb-4">
              <Card.Header>
                <Card.Title className="mb-0">Basic Settings</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Survey Name</Form.Label>
                  <Form.Control type="text" name="surveyName" value={settings.surveyName} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={settings.description}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Thank You Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="thankYouMessage"
                    value={settings.thankYouMessage}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Redirect URL (Optional)</Form.Label>
                  <Form.Control
                    type="url"
                    name="redirectUrl"
                    placeholder="https://example.com"
                    value={settings.redirectUrl}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Header>
                <Card.Title className="mb-0">Access Control</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form.Check
                  type="switch"
                  id="isActive"
                  name="isActive"
                  label="Survey is active"
                  checked={settings.isActive}
                  onChange={handleChange}
                  className="mb-3"
                />

                <Form.Check
                  type="switch"
                  id="allowAnonymous"
                  name="allowAnonymous"
                  label="Allow anonymous responses"
                  checked={settings.allowAnonymous}
                  onChange={handleChange}
                  className="mb-3"
                />

                <Form.Check
                  type="switch"
                  id="requireLogin"
                  name="requireLogin"
                  label="Require login to participate"
                  checked={settings.requireLogin}
                  onChange={handleChange}
                  className="mb-3"
                />

                <Form.Check
                  type="switch"
                  id="multipleResponses"
                  name="multipleResponses"
                  label="Allow multiple responses per user"
                  checked={settings.multipleResponses}
                  onChange={handleChange}
                  className="mb-3"
                />

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Start Date (Optional)</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        name="startDate"
                        value={settings.startDate}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>End Date (Optional)</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        name="endDate"
                        value={settings.endDate}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Response Limit (Optional)</Form.Label>
                  <Form.Control
                    type="number"
                    name="responseLimit"
                    placeholder="Leave empty for unlimited"
                    value={settings.responseLimit}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Header>
                <Card.Title className="mb-0">Display Options</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form.Check
                  type="switch"
                  id="showProgressBar"
                  name="showProgressBar"
                  label="Show progress bar"
                  checked={settings.showProgressBar}
                  onChange={handleChange}
                  className="mb-3"
                />

                <Form.Check
                  type="switch"
                  id="randomizeQuestions"
                  name="randomizeQuestions"
                  label="Randomize question order"
                  checked={settings.randomizeQuestions}
                  onChange={handleChange}
                  className="mb-3"
                />

                <Form.Check
                  type="switch"
                  id="autoSave"
                  name="autoSave"
                  label="Auto-save responses"
                  checked={settings.autoSave}
                  onChange={handleChange}
                  className="mb-3"
                />
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="mb-4">
              <Card.Header>
                <Card.Title className="mb-0">Notifications</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form.Check
                  type="switch"
                  id="emailNotifications"
                  name="emailNotifications"
                  label="Email notifications for new responses"
                  checked={settings.emailNotifications}
                  onChange={handleChange}
                  className="mb-3"
                />

                <Form.Group className="mb-3">
                  <Form.Label>Notification Email</Form.Label>
                  <Form.Control type="email" placeholder="admin@company.com" disabled={!settings.emailNotifications} />
                </Form.Group>
              </Card.Body>
            </Card>

            <Card>
              <Card.Header>
                <Card.Title className="mb-0">Actions</Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="d-grid gap-2">
                  <Button variant="primary" type="submit">
                    <i className="fas fa-save me-2"></i>
                    Save Settings
                  </Button>
                  <Button variant="outline-secondary">
                    <i className="fas fa-eye me-2"></i>
                    Preview Survey
                  </Button>
                  <Button variant="outline-info">
                    <i className="fas fa-share me-2"></i>
                    Share Survey
                  </Button>
                  <Button variant="outline-danger">
                    <i className="fas fa-archive me-2"></i>
                    Archive Survey
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Form>
    </Container>
  )
}

export default SurveySettings
