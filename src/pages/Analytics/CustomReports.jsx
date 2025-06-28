
// src\pages\Analytics\CustomReports.jsx
"use client"

import { useEffect, useState } from "react"
import { Container, Row, Col, Card, Form, Button, Table, Badge } from "react-bootstrap"
import Pagination from "../../components/Pagination/Pagination.jsx"

const CustomReports = ({ darkMode }) => {
  const [reportType, setReportType] = useState("summary")
  const [dateRange, setDateRange] = useState("30d")
  const [selectedSurveys, setSelectedSurveys] = useState([])
  const [pagination, setPagination] = useState({ page: 1, limit: 2, total: 0 })

  const surveys = [
    { id: 1, name: "Customer Satisfaction Q4" },
    { id: 2, name: "Product Feedback Survey" },
    { id: 3, name: "Employee Engagement" },
    { id: 4, name: "Market Research Study" },
  ]

  const savedReports = [
    { id: 1, name: "Monthly Summary Report", type: "Summary", lastRun: "2024-01-15", status: "Ready" },
    {
      id: 2,
      name: "Customer Satisfaction Trends",
      type: "Trend Analysis",
      lastRun: "2024-01-14",
      status: "Processing",
    },
    { id: 3, name: "Product Feedback Analysis", type: "Detailed", lastRun: "2024-01-13", status: "Ready" },
  ]

  const handleSurveySelection = (surveyId) => {
    setSelectedSurveys((prev) => (prev.includes(surveyId) ? prev.filter((id) => id !== surveyId) : [...prev, surveyId]))
  }

  const getStatusBadge = (status) => {
    const variants = {
      Ready: "success",
      Processing: "warning",
      Failed: "danger",
    }
    return <Badge bg={variants[status] || "secondary"}>{status}</Badge>
  }

  const currentReports = savedReports.slice(
    (pagination.page - 1) * pagination.limit,
    pagination.page * pagination.limit
  )

  useEffect(() => {
    setPagination((prev) => ({ ...prev, total: savedReports.length }))
  }, [])

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h1 className="h3 mb-0">Custom Reports</h1>
          <p className="text-muted">Create and manage custom survey reports</p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col lg={8}>
          <Card>
            <Card.Header>
              <Card.Title className="mb-0">Create New Report</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Report Type</Form.Label>
                      <Form.Select value={reportType} onChange={(e) => setReportType(e.target.value)}>
                        <option value="summary">Summary Report</option>
                        <option value="detailed">Detailed Analysis</option>
                        <option value="comparison">Comparison Report</option>
                        <option value="trend">Trend Analysis</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Date Range</Form.Label>
                      <Form.Select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
                        <option value="7d">Last 7 days</option>
                        <option value="30d">Last 30 days</option>
                        <option value="90d">Last 90 days</option>
                        <option value="1y">Last year</option>
                        <option value="custom">Custom Range</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Select Surveys</Form.Label>
                  <div className="border rounded p-3" style={{ maxHeight: "200px", overflowY: "auto" }}>
                    {surveys.map((survey) => (
                      <Form.Check
                        key={survey.id}
                        type="checkbox"
                        id={`survey-${survey.id}`}
                        label={survey.name}
                        checked={selectedSurveys.includes(survey.id)}
                        onChange={() => handleSurveySelection(survey.id)}
                        className="mb-2"
                      />
                    ))}
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Report Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter report name" />
                </Form.Group>

                <div className="d-flex gap-2">
                  <Button variant="primary">
                    <i className="fas fa-play me-2"></i>
                    Generate Report
                  </Button>
                  <Button variant="outline-secondary">
                    <i className="fas fa-save me-2"></i>
                    Save Template
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card>
            <Card.Header>
              <Card.Title className="mb-0">Report Templates</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="d-grid gap-2">
                <Button variant="outline-primary" size="sm">
                  <i className="fas fa-chart-bar me-2"></i>
                  Customer Satisfaction
                </Button>
                <Button variant="outline-primary" size="sm">
                  <i className="fas fa-users me-2"></i>
                  Employee Engagement
                </Button>
                <Button variant="outline-primary" size="sm">
                  <i className="fas fa-trending-up me-2"></i>
                  Performance Trends
                </Button>
                <Button variant="outline-primary" size="sm">
                  <i className="fas fa-balance-scale me-2"></i>
                  Comparison Analysis
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title className="mb-0">Saved Reports</Card.Title>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table className="mb-0" hover>
                  <thead className="table-light">
                    <tr>
                      <th>Report Name</th>
                      <th>Type</th>
                      <th>Last Run</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentReports.map((report) => (
                      <tr key={report.id}>
                        <td>{report.name}</td>
                        <td>{report.type}</td>
                        <td>{new Date(report.lastRun).toLocaleDateString()}</td>
                        <td>{getStatusBadge(report.status)}</td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <Button variant="outline-primary" size="sm">
                              <i className="fas fa-play"></i>
                            </Button>
                            <Button variant="outline-secondary" size="sm">
                              <i className="fas fa-download"></i>
                            </Button>
                            <Button variant="outline-danger" size="sm">
                              <i className="fas fa-trash"></i>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              <div className="p-3 border-top">
                <Pagination
                  current={pagination.page}
                  total={savedReports.length}
                  limit={pagination.limit}
                  onChange={(page) => setPagination((prev) => ({ ...prev, page }))}
                  darkMode={darkMode}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default CustomReports
