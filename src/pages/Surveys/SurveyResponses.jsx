"use client"

import { useState, useEffect } from "react"
import { Container, Row, Col, Card, Table, Badge, Button, Form, InputGroup } from "react-bootstrap"
import {
  MdAssignment,
  MdSearch,
  MdFilterList,
  MdRefresh,
  MdDownload,
  MdVisibility,
  MdPerson,
  MdSchedule,
  MdTrendingUp,
  MdCheckCircle,
  MdAccessTime,
  MdLocationOn,
  MdDevices,
} from "react-icons/md"
import Pagination from "../../components/Pagination/Pagination.jsx"

const SurveyResponses = ({ darkMode }) => {
  const [responses, setResponses] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 })

  useEffect(() => {
    setTimeout(() => {
      const allResponses = [
        {
          id: 1,
          responseId: "RSP-2024-001",
          surveyName: "Customer Satisfaction Q4",
          respondentEmail: "customer1@email.com",
          respondentName: "John Smith",
          status: "Completed",
          submittedDate: "2024-01-20 14:30",
          completionTime: "5m 23s",
          ipAddress: "192.168.1.100",
          device: "Desktop",
          location: "New York, USA",
          score: 4.5,
        },
        {
          id: 2,
          responseId: "RSP-2024-002",
          surveyName: "Product Feedback Survey",
          respondentEmail: "user2@email.com",
          respondentName: "Jane Doe",
          status: "Partial",
          submittedDate: "2024-01-20 12:15",
          completionTime: "2m 45s",
          ipAddress: "192.168.1.101",
          device: "Mobile",
          location: "California, USA",
          score: 3.8,
        },
        {
          id: 3,
          responseId: "RSP-2024-003",
          surveyName: "Employee Engagement",
          respondentEmail: "employee3@company.com",
          respondentName: "Mike Johnson",
          status: "Completed",
          submittedDate: "2024-01-19 16:45",
          completionTime: "8m 12s",
          ipAddress: "10.0.0.50",
          device: "Tablet",
          location: "Texas, USA",
          score: 4.2,
        },
        {
          id: 4,
          responseId: "RSP-2024-004",
          surveyName: "Market Research Study",
          respondentEmail: "participant4@email.com",
          respondentName: "Sarah Wilson",
          status: "Completed",
          submittedDate: "2024-01-19 10:30",
          completionTime: "6m 55s",
          ipAddress: "192.168.2.25",
          device: "Desktop",
          location: "Florida, USA",
          score: 4.7,
        },
        {
          id: 5,
          responseId: "RSP-2024-005",
          surveyName: "Website Usability Test",
          respondentEmail: "tester5@email.com",
          respondentName: "David Brown",
          status: "Abandoned",
          submittedDate: "2024-01-18 14:20",
          completionTime: "1m 30s",
          ipAddress: "192.168.3.75",
          device: "Mobile",
          location: "Illinois, USA",
          score: 0,
        },
        {
          id: 6,
          responseId: "RSP-2024-006",
          surveyName: "Brand Awareness Survey",
          respondentEmail: "consumer6@email.com",
          respondentName: "Lisa Garcia",
          status: "Completed",
          submittedDate: "2024-01-18 09:15",
          completionTime: "4m 18s",
          ipAddress: "10.1.1.100",
          device: "Desktop",
          location: "Washington, USA",
          score: 3.9,
        },
        {
          id: 7,
          responseId: "RSP-2024-007",
          surveyName: "Training Effectiveness",
          respondentEmail: "trainee7@company.com",
          respondentName: "Tom Anderson",
          status: "Completed",
          submittedDate: "2024-01-17 11:45",
          completionTime: "7m 33s",
          ipAddress: "10.0.0.75",
          device: "Laptop",
          location: "Oregon, USA",
          score: 4.1,
        },
        {
          id: 8,
          responseId: "RSP-2024-008",
          surveyName: "Customer Support Feedback",
          respondentEmail: "customer8@email.com",
          respondentName: "Emily Chen",
          status: "Partial",
          submittedDate: "2024-01-16 15:30",
          completionTime: "3m 22s",
          ipAddress: "192.168.4.50",
          device: "Mobile",
          location: "Nevada, USA",
          score: 3.5,
        },
      ]
      setResponses(allResponses)
      setPagination((prev) => ({ ...prev, total: allResponses.length }))
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusBadge = (status) => {
    const variants = {
      Completed: "success",
      Partial: "warning",
      Abandoned: "danger",
    }
    return (
      <Badge bg={variants[status] || "secondary"} className="badge-enhanced">
        {status}
      </Badge>
    )
  }

  const getDeviceIcon = (device) => {
    return <MdDevices className="me-1" size={14} />
  }

  const filteredResponses = responses.filter((response) => {
    const matchesSearch =
      response.respondentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      response.respondentEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      response.surveyName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || response.status.toLowerCase() === filterStatus.toLowerCase()
    return matchesSearch && matchesFilter
  })

  const currentResponses = filteredResponses.slice(
    (pagination.page - 1) * pagination.limit,
    pagination.page * pagination.limit,
  )

  if (loading) {
    return (
      <div className="loading-container d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <Container fluid className="survey-responses-container py-4 fade-in">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div className="d-flex align-items-center">
              <MdAssignment size={32} className="text-primary me-3" />
              <div>
                <h2 className={`mb-1 ${darkMode ? "text-white" : "text-dark"}`}>Survey Responses</h2>
                <p className="text-muted mb-0">View and analyze survey response data</p>
              </div>
            </div>
            <div className="d-flex gap-2 mt-2 mt-md-0">
              <Button variant="outline-primary" size="sm" className="btn-enhanced">
                <MdRefresh className="me-1" />
                Refresh
              </Button>
              <Button variant="outline-secondary" size="sm" className="btn-enhanced">
                <MdDownload className="me-1" />
                Export
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col xs={12} sm={6} lg={3} className="mb-3">
          <Card
            className="stat-card border-0 shadow-sm card-enhanced"
            style={{ borderLeft: "4px solid var(--primary-color)" }}
          >
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <div className={`text-muted small mb-1 ${darkMode ? "text-light" : ""}`}>Total Responses</div>
                  <div className={`h4 mb-0 fw-bold ${darkMode ? "text-white" : "text-dark"}`}>{responses.length}</div>
                </div>
                <MdAssignment size={24} style={{ color: "var(--primary-color)" }} />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} lg={3} className="mb-3">
          <Card
            className="stat-card border-0 shadow-sm card-enhanced"
            style={{ borderLeft: "4px solid var(--success-color)" }}
          >
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <div className={`text-muted small mb-1 ${darkMode ? "text-light" : ""}`}>Completed</div>
                  <div className={`h4 mb-0 fw-bold ${darkMode ? "text-white" : "text-dark"}`}>
                    {responses.filter((r) => r.status === "Completed").length}
                  </div>
                </div>
                <MdCheckCircle size={24} style={{ color: "var(--success-color)" }} />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} lg={3} className="mb-3">
          <Card
            className="stat-card border-0 shadow-sm card-enhanced"
            style={{ borderLeft: "4px solid var(--warning-color)" }}
          >
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <div className={`text-muted small mb-1 ${darkMode ? "text-light" : ""}`}>Partial</div>
                  <div className={`h4 mb-0 fw-bold ${darkMode ? "text-white" : "text-dark"}`}>
                    {responses.filter((r) => r.status === "Partial").length}
                  </div>
                </div>
                <MdAccessTime size={24} style={{ color: "var(--warning-color)" }} />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} lg={3} className="mb-3">
          <Card
            className="stat-card border-0 shadow-sm card-enhanced"
            style={{ borderLeft: "4px solid var(--info-color)" }}
          >
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <div className={`text-muted small mb-1 ${darkMode ? "text-light" : ""}`}>Avg Score</div>
                  <div className={`h4 mb-0 fw-bold ${darkMode ? "text-white" : "text-dark"}`}>
                    {(
                      responses.filter((r) => r.score > 0).reduce((sum, r) => sum + r.score, 0) /
                      responses.filter((r) => r.score > 0).length
                    ).toFixed(1)}
                  </div>
                </div>
                <MdTrendingUp size={24} style={{ color: "var(--info-color)" }} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Row className="mb-4">
        <Col>
          <Card className="border-0 shadow-sm card-enhanced">
            <Card.Body className="py-3">
              <Row className="align-items-center">
                <Col md={6} lg={4} className="mb-2 mb-md-0">
                  <InputGroup className="form-enhanced">
                    <InputGroup.Text>
                      <MdSearch />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Search responses..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </InputGroup>
                </Col>
                <Col md={3} lg={2} className="mb-2 mb-md-0">
                  <Form.Select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="form-enhanced"
                  >
                    <option value="all">All Status</option>
                    <option value="completed">Completed</option>
                    <option value="partial">Partial</option>
                    <option value="abandoned">Abandoned</option>
                  </Form.Select>
                </Col>
                <Col md={3} lg={2}>
                  <Button variant="outline-secondary" className="w-100 btn-enhanced">
                    <MdFilterList className="me-1" />
                    More Filters
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Responses Table */}
      <Row>
        <Col>
          <Card className="border-0 shadow-sm card-enhanced">
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table className="mb-0 table-enhanced" hover>
                  <thead className="table-light">
                    <tr>
                      <th className="border-0 py-3 px-4">
                        <div className="d-flex align-items-center">
                          <MdAssignment className="me-2" size={16} />
                          Response Details
                        </div>
                      </th>
                      <th className="border-0 py-3">
                        <div className="d-flex align-items-center">
                          <MdPerson className="me-2" size={16} />
                          Respondent
                        </div>
                      </th>
                      <th className="border-0 py-3">Status</th>
                      <th className="border-0 py-3">
                        <div className="d-flex align-items-center">
                          <MdAccessTime className="me-2" size={16} />
                          Completion Time
                        </div>
                      </th>
                      <th className="border-0 py-3">
                        <div className="d-flex align-items-center">
                          <MdDevices className="me-2" size={16} />
                          Device
                        </div>
                      </th>
                      <th className="border-0 py-3">
                        <div className="d-flex align-items-center">
                          <MdSchedule className="me-2" size={16} />
                          Submitted
                        </div>
                      </th>
                      <th className="border-0 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentResponses.map((response) => (
                      <tr key={response.id}>
                        <td className="py-3 px-4 border-0">
                          <div>
                            <div className={`fw-medium mb-1 ${darkMode ? "text-white" : "text-dark"}`}>
                              {response.responseId}
                            </div>
                            <div className="small text-muted">{response.surveyName}</div>
                            {response.score > 0 && (
                              <div className="small">
                                <Badge bg="primary" className="badge-enhanced">
                                  Score: {response.score}/5
                                </Badge>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="py-3 border-0">
                          <div>
                            <div className={`fw-medium mb-1 ${darkMode ? "text-white" : "text-dark"}`}>
                              {response.respondentName}
                            </div>
                            <div className="small text-muted">{response.respondentEmail}</div>
                            <div className="small text-muted d-flex align-items-center">
                              <MdLocationOn size={12} className="me-1" />
                              {response.location}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 border-0">{getStatusBadge(response.status)}</td>
                        <td className="py-3 border-0">
                          <span className={darkMode ? "text-white" : "text-dark"}>{response.completionTime}</span>
                        </td>
                        <td className="py-3 border-0">
                          <div className="d-flex align-items-center">
                            {getDeviceIcon(response.device)}
                            <span className={darkMode ? "text-white" : "text-dark"}>{response.device}</span>
                          </div>
                        </td>
                        <td className="py-3 border-0">
                          <span className={darkMode ? "text-white" : "text-dark"}>{response.submittedDate}</span>
                        </td>
                        <td className="py-3 text-center border-0">
                          <Button variant="outline-primary" size="sm" className="btn-enhanced">
                            <MdVisibility size={14} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              <div className="p-3 border-top">
                <Pagination
                  current={pagination.page}
                  total={filteredResponses.length}
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

export default SurveyResponses
