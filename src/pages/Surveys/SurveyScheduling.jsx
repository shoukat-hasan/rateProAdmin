// src\pages\Surveys\SurveyScheduling.jsx

"use client"

import { useState, useEffect } from "react"
import { Container, Row, Col, Card, Form, Button, Table, Badge, Modal } from "react-bootstrap"
import { MdSchedule, MdAdd, MdEdit, MdDelete, MdPlayArrow as MdPlay, MdPause } from "react-icons/md"
import Pagination from "../../components/Pagination/Pagination.jsx"

const SurveyScheduling = () => {
  const [scheduledSurveys, setScheduledSurveys] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingSchedule, setEditingSchedule] = useState(null)
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 })
  const [formData, setFormData] = useState({
    surveyId: "",
    title: "",
    startDate: "",
    endDate: "",
    timezone: "UTC",
    frequency: "once",
    reminderEnabled: true,
    reminderDays: 3,
    maxResponses: "",
    targetAudience: "",
  })

  useEffect(() => {
    // Simulate loading scheduled surveys
    setTimeout(() => {
      setScheduledSurveys([
        {
          id: 1,
          surveyId: "survey-1",
          title: "Customer Satisfaction Survey",
          startDate: "2023-07-01T09:00",
          endDate: "2023-07-31T23:59",
          timezone: "UTC",
          frequency: "once",
          status: "scheduled",
          responses: 0,
          maxResponses: 1000,
          targetAudience: "All Customers",
          reminderEnabled: true,
          reminderDays: 3,
        },
        {
          id: 2,
          surveyId: "survey-2",
          title: "Weekly Team Feedback",
          startDate: "2023-06-15T10:00",
          endDate: "2023-12-31T18:00",
          timezone: "UTC",
          frequency: "weekly",
          status: "active",
          responses: 45,
          maxResponses: 500,
          targetAudience: "Team Members",
          reminderEnabled: true,
          reminderDays: 1,
        },
        {
          id: 3,
          surveyId: "survey-3",
          title: "Product Launch Survey",
          startDate: "2023-05-01T08:00",
          endDate: "2023-05-31T20:00",
          timezone: "UTC",
          frequency: "once",
          status: "completed",
          responses: 234,
          maxResponses: 300,
          targetAudience: "Beta Users",
          reminderEnabled: false,
          reminderDays: 0,
        },
      ])
      setPagination((prev) => ({ ...prev, total: 3 }))
      setLoading(false)
    }, 1000)
  }, [])

  const handleCreateSchedule = () => {
    setEditingSchedule(null)
    setFormData({
      surveyId: "",
      title: "",
      startDate: "",
      endDate: "",
      timezone: "UTC",
      frequency: "once",
      reminderEnabled: true,
      reminderDays: 3,
      maxResponses: "",
      targetAudience: "",
    })
    setShowModal(true)
  }

  const handleEditSchedule = (schedule) => {
    setEditingSchedule(schedule)
    setFormData({
      surveyId: schedule.surveyId,
      title: schedule.title,
      startDate: schedule.startDate,
      endDate: schedule.endDate,
      timezone: schedule.timezone,
      frequency: schedule.frequency,
      reminderEnabled: schedule.reminderEnabled,
      reminderDays: schedule.reminderDays,
      maxResponses: schedule.maxResponses.toString(),
      targetAudience: schedule.targetAudience,
    })
    setShowModal(true)
  }

  const handleSaveSchedule = () => {
    if (editingSchedule) {
      // Update existing schedule
      setScheduledSurveys((surveys) =>
        surveys.map((survey) =>
          survey.id === editingSchedule.id
            ? { ...survey, ...formData, maxResponses: Number.parseInt(formData.maxResponses) || 0 }
            : survey,
        ),
      )
    } else {
      // Create new schedule
      const newSchedule = {
        id: Date.now(),
        ...formData,
        maxResponses: Number.parseInt(formData.maxResponses) || 0,
        status: "scheduled",
        responses: 0,
      }
      setScheduledSurveys((surveys) => [...surveys, newSchedule])
    }
    setShowModal(false)
  }

  const handleDeleteSchedule = (scheduleId) => {
    if (window.confirm("Are you sure you want to delete this scheduled survey?")) {
      setScheduledSurveys((surveys) => surveys.filter((survey) => survey.id !== scheduleId))
    }
  }

  const handleStatusChange = (scheduleId, newStatus) => {
    setScheduledSurveys((surveys) =>
      surveys.map((survey) => (survey.id === scheduleId ? { ...survey, status: newStatus } : survey)),
    )
  }

  const getStatusVariant = (status) => {
    switch (status) {
      case "scheduled":
        return "warning"
      case "active":
        return "success"
      case "paused":
        return "secondary"
      case "completed":
        return "primary"
      case "cancelled":
        return "danger"
      default:
        return "secondary"
    }
  }

  const getStatusActions = (schedule) => {
    switch (schedule.status) {
      case "scheduled":
        return (
          <Button
            variant="outline-success"
            size="sm"
            onClick={() => handleStatusChange(schedule.id, "active")}
            title="Start Now"
          >
            <MdPlay />
          </Button>
        )
      case "active":
        return (
          <Button
            variant="outline-warning"
            size="sm"
            onClick={() => handleStatusChange(schedule.id, "paused")}
            title="Pause"
          >
            <MdPause />
          </Button>
        )
      case "paused":
        return (
          <Button
            variant="outline-success"
            size="sm"
            onClick={() => handleStatusChange(schedule.id, "active")}
            title="Resume"
          >
            <MdPlay />
          </Button>
        )
      default:
        return null
    }
  }

  if (loading) {
    return (
      <Container fluid className="py-4">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading scheduled surveys...</p>
        </div>
      </Container>
    )
  }

  return (
    <Container fluid className="py-4">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="h3 mb-1">Survey Scheduling</h1>
              <p className="text-muted mb-0">Schedule surveys to run at specific times and dates</p>
            </div>
            <Button variant="primary" onClick={handleCreateSchedule}>
              <MdAdd className="me-2" />
              Schedule Survey
            </Button>
          </div>
        </Col>
      </Row>

      {/* Scheduled Surveys Table */}
      <Card className="border-0 shadow-sm">
        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table hover className="mb-0">
              <thead className="table-light">
                <tr>
                  <th>Survey</th>
                  <th>Schedule</th>
                  <th>Frequency</th>
                  <th>Status</th>
                  <th>Progress</th>
                  <th>Target Audience</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {scheduledSurveys.map((schedule) => (
                  <tr key={schedule.id}>
                    <td>
                      <div>
                        <div className="fw-medium">{schedule.title}</div>
                        <small className="text-muted">ID: {schedule.surveyId}</small>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className="small">
                          <strong>Start:</strong> {new Date(schedule.startDate).toLocaleString()}
                        </div>
                        <div className="small">
                          <strong>End:</strong> {new Date(schedule.endDate).toLocaleString()}
                        </div>
                      </div>
                    </td>
                    <td>
                      <Badge bg="secondary">{schedule.frequency}</Badge>
                    </td>
                    <td>
                      <Badge bg={getStatusVariant(schedule.status)}>{schedule.status}</Badge>
                    </td>
                    <td>
                      <div>
                        <div className="small">
                          {schedule.responses} / {schedule.maxResponses || "∞"} responses
                        </div>
                        {schedule.maxResponses && (
                          <div className="progress mt-1" style={{ height: "4px" }}>
                            <div
                              className="progress-bar bg-primary"
                              style={{
                                width: `${Math.min((schedule.responses / schedule.maxResponses) * 100, 100)}%`,
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </td>
                    <td>{schedule.targetAudience}</td>
                    <td>
                      <div className="d-flex justify-content-center gap-1">
                        {getStatusActions(schedule)}
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleEditSchedule(schedule)}
                          title="Edit"
                        >
                          <MdEdit />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDeleteSchedule(schedule.id)}
                          title="Delete"
                        >
                          <MdDelete />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <div className="p-3">
            <Pagination
              current={pagination.page}
              total={pagination.total}
              limit={pagination.limit}
              onChange={(page) => setPagination((prev) => ({ ...prev, page }))}
            />
          </div>
        </Card.Body>
      </Card>

      {/* Schedule Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <MdSchedule className="me-2" />
            {editingSchedule ? "Edit Schedule" : "Schedule Survey"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Survey</Form.Label>
                  <Form.Select
                    value={formData.surveyId}
                    onChange={(e) => setFormData({ ...formData, surveyId: e.target.value })}
                    required
                  >
                    <option value="">Select a survey</option>
                    <option value="survey-1">Customer Satisfaction Survey</option>
                    <option value="survey-2">Product Feedback Survey</option>
                    <option value="survey-3">Employee Engagement Survey</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Schedule title"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Start Date & Time</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>End Date & Time</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Timezone</Form.Label>
                  <Form.Select
                    value={formData.timezone}
                    onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                  >
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">Eastern Time</option>
                    <option value="America/Chicago">Central Time</option>
                    <option value="America/Denver">Mountain Time</option>
                    <option value="America/Los_Angeles">Pacific Time</option>
                    <option value="Europe/London">London</option>
                    <option value="Europe/Paris">Paris</option>
                    <option value="Asia/Tokyo">Tokyo</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Frequency</Form.Label>
                  <Form.Select
                    value={formData.frequency}
                    onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                  >
                    <option value="once">One Time</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Max Responses</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.maxResponses}
                    onChange={(e) => setFormData({ ...formData, maxResponses: e.target.value })}
                    placeholder="Leave empty for unlimited"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Target Audience</Form.Label>
              <Form.Control
                type="text"
                value={formData.targetAudience}
                onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                placeholder="e.g., All Customers, Team Members, Beta Users"
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    label="Enable reminders"
                    checked={formData.reminderEnabled}
                    onChange={(e) => setFormData({ ...formData, reminderEnabled: e.target.checked })}
                  />
                </Form.Group>
              </Col>
              {formData.reminderEnabled && (
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Reminder (days before end)</Form.Label>
                    <Form.Control
                      type="number"
                      min="1"
                      max="30"
                      value={formData.reminderDays}
                      onChange={(e) => setFormData({ ...formData, reminderDays: Number.parseInt(e.target.value) })}
                    />
                  </Form.Group>
                </Col>
              )}
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveSchedule}>
            {editingSchedule ? "Update Schedule" : "Create Schedule"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default SurveyScheduling
