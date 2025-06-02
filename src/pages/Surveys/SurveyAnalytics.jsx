"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Container, Row, Col, Card, Form, Button, Badge, Tab, Nav } from "react-bootstrap"
import { MdDownload, MdFilterAlt, MdInsertChart, MdTableChart, MdTrendingUp } from "react-icons/md"

const SurveyAnalytics = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("30days")
  const [analytics, setAnalytics] = useState(null)

  useEffect(() => {
    // Simulate loading analytics data
    setTimeout(() => {
      setAnalytics({
        surveyTitle: "Customer Satisfaction Survey",
        totalResponses: 245,
        completionRate: 87,
        averageTime: "3m 45s",
        responseRate: 65,
        npsScore: 42,
        satisfactionScore: 4.2,
        responsesByDay: [
          { date: "2023-06-01", responses: 12 },
          { date: "2023-06-02", responses: 18 },
          { date: "2023-06-03", responses: 15 },
          { date: "2023-06-04", responses: 22 },
          { date: "2023-06-05", responses: 19 },
          { date: "2023-06-06", responses: 25 },
          { date: "2023-06-07", responses: 21 },
        ],
        questionAnalytics: [
          {
            id: 1,
            question: "How satisfied are you with our product overall?",
            type: "rating",
            responses: 245,
            averageRating: 4.2,
            distribution: [
              { value: 1, count: 5, percentage: 2 },
              { value: 2, count: 12, percentage: 5 },
              { value: 3, count: 49, percentage: 20 },
              { value: 4, count: 98, percentage: 40 },
              { value: 5, count: 81, percentage: 33 },
            ],
          },
          {
            id: 2,
            question: "How likely are you to recommend our product?",
            type: "nps",
            responses: 245,
            npsScore: 42,
            promoters: 45,
            passives: 35,
            detractors: 20,
          },
        ],
        demographics: {
          byLocation: [
            { country: "United States", responses: 98, percentage: 40 },
            { country: "United Kingdom", responses: 49, percentage: 20 },
            { country: "Canada", responses: 37, percentage: 15 },
            { country: "Australia", responses: 25, percentage: 10 },
            { country: "Others", responses: 36, percentage: 15 },
          ],
          byDevice: [
            { device: "Desktop", responses: 147, percentage: 60 },
            { device: "Mobile", responses: 73, percentage: 30 },
            { device: "Tablet", responses: 25, percentage: 10 },
          ],
        },
      })
      setLoading(false)
    }, 1000)
  }, [id, timeRange])

  const exportData = (format) => {
    console.log(`Exporting data in ${format} format...`)
    // Simulate export
    alert(`Analytics data exported as ${format.toUpperCase()}`)
  }

  if (loading) {
    return (
      <Container fluid className="py-4">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading analytics...</p>
        </div>
      </Container>
    )
  }

  return (
    <Container fluid className="py-4">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
            <div>
              <h1 className="h3 mb-1">Survey Analytics</h1>
              <p className="text-muted mb-0">{analytics.surveyTitle}</p>
            </div>
            <div className="d-flex gap-2 mt-3 mt-md-0">
              <Form.Select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} style={{ width: "auto" }}>
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
                <option value="year">Last Year</option>
              </Form.Select>
              <Button variant="outline-primary" onClick={() => exportData("csv")}>
                <MdDownload className="me-2" />
                Export CSV
              </Button>
              <Button variant="outline-secondary" onClick={() => exportData("pdf")}>
                <MdDownload className="me-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      {/* Key Metrics */}
      <Row className="g-3 mb-4">
        <Col xs={12} sm={6} lg={3}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="text-center">
              <div className="text-primary mb-2">
                <MdInsertChart size={32} />
              </div>
              <h3 className="mb-1">{analytics.totalResponses}</h3>
              <p className="text-muted mb-0">Total Responses</p>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="text-center">
              <div className="text-success mb-2">
                <MdTrendingUp size={32} />
              </div>
              <h3 className="mb-1">{analytics.completionRate}%</h3>
              <p className="text-muted mb-0">Completion Rate</p>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="text-center">
              <div className="text-warning mb-2">
                <MdTableChart size={32} />
              </div>
              <h3 className="mb-1">{analytics.npsScore}</h3>
              <p className="text-muted mb-0">NPS Score</p>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="text-center">
              <div className="text-info mb-2">
                <MdFilterAlt size={32} />
              </div>
              <h3 className="mb-1">{analytics.satisfactionScore}</h3>
              <p className="text-muted mb-0">Avg. Satisfaction</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Detailed Analytics */}
      <Tab.Container defaultActiveKey="overview">
        <Card className="border-0 shadow-sm">
          <Card.Header className="bg-transparent">
            <Nav variant="tabs" className="border-0">
              <Nav.Item>
                <Nav.Link eventKey="overview">Overview</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="questions">Question Analysis</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="demographics">Demographics</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="trends">Trends</Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>

          <Card.Body>
            <Tab.Content>
              {/* Overview Tab */}
              <Tab.Pane eventKey="overview">
                <Row>
                  <Col lg={8}>
                    <h5 className="mb-3">Response Trends</h5>
                    <div className="chart-container">
                      <p className="text-muted">Response trends chart will be displayed here</p>
                    </div>
                  </Col>
                  <Col lg={4}>
                    <h5 className="mb-3">Quick Stats</h5>
                    <div className="d-flex justify-content-between mb-3">
                      <span>Average Time:</span>
                      <strong>{analytics.averageTime}</strong>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <span>Response Rate:</span>
                      <strong>{analytics.responseRate}%</strong>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <span>Drop-off Rate:</span>
                      <strong>{100 - analytics.completionRate}%</strong>
                    </div>
                  </Col>
                </Row>
              </Tab.Pane>

              {/* Question Analysis Tab */}
              <Tab.Pane eventKey="questions">
                {analytics.questionAnalytics.map((question, index) => (
                  <Card key={question.id} className="mb-4">
                    <Card.Header>
                      <h6 className="mb-0">
                        Q{index + 1}: {question.question}
                      </h6>
                    </Card.Header>
                    <Card.Body>
                      {question.type === "rating" && (
                        <div>
                          <div className="d-flex justify-content-between mb-3">
                            <span>Average Rating:</span>
                            <Badge bg="primary">{question.averageRating}/5</Badge>
                          </div>
                          <div className="mb-3">
                            <h6>Response Distribution:</h6>
                            {question.distribution.map((item) => (
                              <div key={item.value} className="d-flex align-items-center mb-2">
                                <span className="me-3" style={{ minWidth: "60px" }}>
                                  {item.value} Star{item.value !== 1 ? "s" : ""}:
                                </span>
                                <div className="flex-fill">
                                  <div
                                    className="bg-primary"
                                    style={{
                                      height: "20px",
                                      width: `${item.percentage}%`,
                                      borderRadius: "4px",
                                    }}
                                  />
                                </div>
                                <span className="ms-3">
                                  {item.count} ({item.percentage}%)
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {question.type === "nps" && (
                        <div>
                          <div className="d-flex justify-content-between mb-3">
                            <span>NPS Score:</span>
                            <Badge bg="success">{question.npsScore}</Badge>
                          </div>
                          <Row>
                            <Col md={4}>
                              <div className="text-center">
                                <h4 className="text-success">{question.promoters}%</h4>
                                <p className="text-muted">Promoters (9-10)</p>
                              </div>
                            </Col>
                            <Col md={4}>
                              <div className="text-center">
                                <h4 className="text-warning">{question.passives}%</h4>
                                <p className="text-muted">Passives (7-8)</p>
                              </div>
                            </Col>
                            <Col md={4}>
                              <div className="text-center">
                                <h4 className="text-danger">{question.detractors}%</h4>
                                <p className="text-muted">Detractors (0-6)</p>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                ))}
              </Tab.Pane>

              {/* Demographics Tab */}
              <Tab.Pane eventKey="demographics">
                <Row>
                  <Col lg={6}>
                    <h5 className="mb-3">Responses by Location</h5>
                    <div className="table-responsive">
                      <table className="table table-sm">
                        <thead>
                          <tr>
                            <th>Country</th>
                            <th>Responses</th>
                            <th>Percentage</th>
                          </tr>
                        </thead>
                        <tbody>
                          {analytics.demographics.byLocation.map((item, index) => (
                            <tr key={index}>
                              <td>{item.country}</td>
                              <td>{item.responses}</td>
                              <td>{item.percentage}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Col>
                  <Col lg={6}>
                    <h5 className="mb-3">Responses by Device</h5>
                    <div className="table-responsive">
                      <table className="table table-sm">
                        <thead>
                          <tr>
                            <th>Device</th>
                            <th>Responses</th>
                            <th>Percentage</th>
                          </tr>
                        </thead>
                        <tbody>
                          {analytics.demographics.byDevice.map((item, index) => (
                            <tr key={index}>
                              <td>{item.device}</td>
                              <td>{item.responses}</td>
                              <td>{item.percentage}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Col>
                </Row>
              </Tab.Pane>

              {/* Trends Tab */}
              <Tab.Pane eventKey="trends">
                <h5 className="mb-3">Response Trends Over Time</h5>
                <div className="chart-container mb-4">
                  <p className="text-muted">Time series chart will be displayed here</p>
                </div>
                <Row>
                  <Col md={6}>
                    <h6>Peak Response Times</h6>
                    <ul className="list-unstyled">
                      <li className="mb-2">
                        <strong>Monday 2-4 PM:</strong> 23% of responses
                      </li>
                      <li className="mb-2">
                        <strong>Wednesday 10-12 PM:</strong> 19% of responses
                      </li>
                      <li className="mb-2">
                        <strong>Friday 3-5 PM:</strong> 17% of responses
                      </li>
                    </ul>
                  </Col>
                  <Col md={6}>
                    <h6>Response Quality Trends</h6>
                    <ul className="list-unstyled">
                      <li className="mb-2">
                        <strong>Completion Rate:</strong> ↑ 5% this month
                      </li>
                      <li className="mb-2">
                        <strong>Average Time:</strong> ↓ 30s this month
                      </li>
                      <li className="mb-2">
                        <strong>Satisfaction Score:</strong> ↑ 0.3 this month
                      </li>
                    </ul>
                  </Col>
                </Row>
              </Tab.Pane>
            </Tab.Content>
          </Card.Body>
        </Card>
      </Tab.Container>
    </Container>
  )
}

export default SurveyAnalytics
