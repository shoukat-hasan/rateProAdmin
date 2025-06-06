"use client"

import { useState, useEffect } from "react"
import { Container, Row, Col, Card, Form, Button, Table, Badge } from "react-bootstrap"
import { MdTrendingUp, MdTrendingDown, MdBarChart, MdPieChart, MdDownload, MdRefresh } from "react-icons/md"
import Pagination from "../../components/Pagination/Pagination.jsx"

const Analytics = ({ darkMode }) => {
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState("30")
  const [selectedMetric, setSelectedMetric] = useState("responses")
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 })

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setPagination((prev) => ({ ...prev, total: 6 }))
      setLoading(false)
    }, 1000)
  }, [])

  const metrics = [
    {
      title: "Total Responses",
      value: "2,847",
      change: "+12.5%",
      trend: "up",
      icon: MdBarChart,
      color: "primary",
    },
    {
      title: "Completion Rate",
      value: "78.3%",
      change: "+5.2%",
      trend: "up",
      icon: MdTrendingUp,
      color: "success",
    },
    {
      title: "Avg Response Time",
      value: "3.2 min",
      change: "-8.1%",
      trend: "down",
      icon: MdTrendingDown,
      color: "info",
    },
    {
      title: "Survey Engagement",
      value: "85.7%",
      change: "+3.4%",
      trend: "up",
      icon: MdPieChart,
      color: "warning",
    },
  ]

  const topSurveys = [
    {
      name: "Customer Satisfaction Q4",
      responses: 456,
      completion: 89,
      avgRating: 4.2,
      category: "Customer Feedback",
    },
    {
      name: "Product Feedback Survey",
      responses: 234,
      completion: 76,
      avgRating: 3.8,
      category: "Product Development",
    },
    {
      name: "Employee Engagement",
      responses: 189,
      completion: 92,
      avgRating: 4.5,
      category: "HR",
    },
    {
      name: "Market Research Study",
      responses: 167,
      completion: 68,
      avgRating: 3.9,
      category: "Market Research",
    },
    {
      name: "Website Usability Test",
      responses: 143,
      completion: 84,
      avgRating: 4.1,
      category: "UX Research",
    },
    {
      name: "Brand Awareness Survey",
      responses: 98,
      completion: 71,
      avgRating: 3.7,
      category: "Marketing",
    },
  ]

  const responseData = [
    { date: "2024-01-15", responses: 45, completion: 78 },
    { date: "2024-01-16", responses: 52, completion: 82 },
    { date: "2024-01-17", responses: 38, completion: 75 },
    { date: "2024-01-18", responses: 61, completion: 85 },
    { date: "2024-01-19", responses: 47, completion: 79 },
    { date: "2024-01-20", responses: 55, completion: 88 },
  ]

  const currentSurveys = topSurveys.slice((pagination.page - 1) * pagination.limit, pagination.page * pagination.limit)

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
    <Container fluid className="analytics-container py-4 fade-in">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div>
              <h2 className={`mb-1 ${darkMode ? "text-white" : "text-dark"}`}>Analytics</h2>
              <p className="text-muted mb-0">Comprehensive insights and performance metrics</p>
            </div>
            <div className="d-flex gap-2 mt-2 mt-md-0">
              <Form.Select
                size="sm"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                style={{ width: "150px" }}
                className="form-enhanced"
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 3 months</option>
                <option value="365">Last year</option>
              </Form.Select>
              <Button variant="outline-primary" size="sm" className="btn-enhanced">
                <MdRefresh className="me-1" />
                Refresh
              </Button>
              <Button variant="primary" size="sm" className="btn-enhanced">
                <MdDownload className="me-1" />
                Export
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      {/* Metrics Cards */}
      <Row className="mb-4">
        {metrics.map((metric, index) => (
          <Col key={index} xs={12} sm={6} lg={3} className="mb-3">
            <Card
              className="metric-card h-100 border-0 shadow-sm cursor-pointer card-enhanced"
              style={{
                borderLeft: `4px solid var(--${metric.color === "primary" ? "primary" : metric.color}-color)`,
              }}
            >
              <Card.Body className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <div className={`text-muted small mb-1 ${darkMode ? "text-light" : ""}`}>{metric.title}</div>
                  <div className={`h4 mb-1 fw-bold ${darkMode ? "text-white" : "text-dark"}`}>{metric.value}</div>
                  <div
                    className={`small d-flex align-items-center ${metric.trend === "up" ? "text-success" : "text-danger"}`}
                  >
                    {metric.trend === "up" ? <MdTrendingUp className="me-1" /> : <MdTrendingDown className="me-1" />}
                    {metric.change} from last period
                  </div>
                </div>
                <div
                  className="metric-icon rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "48px",
                    height: "48px",
                    backgroundColor: `var(--${metric.color === "primary" ? "primary" : metric.color}-color)`,
                    opacity: 0.1,
                  }}
                >
                  <metric.icon
                    size={24}
                    style={{ color: `var(--${metric.color === "primary" ? "primary" : metric.color}-color)` }}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row>
        {/* Chart Area */}
        <Col lg={8} className="mb-4">
          <Card className="border-0 shadow-sm card-enhanced">
            <Card.Header className="border-0 pb-0">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className={`mb-0 ${darkMode ? "text-white" : "text-dark"}`}>Response Trends</h5>
                <Form.Select
                  size="sm"
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value)}
                  style={{ width: "150px" }}
                  className="form-enhanced"
                >
                  <option value="responses">Responses</option>
                  <option value="completion">Completion Rate</option>
                  <option value="engagement">Engagement</option>
                </Form.Select>
              </div>
            </Card.Header>
            <Card.Body>
              <div
                className="chart-placeholder d-flex align-items-center justify-content-center"
                style={{
                  height: "300px",
                  backgroundColor: darkMode ? "var(--dark-bg)" : "var(--light-bg)",
                  borderRadius: "0.5rem",
                  border: `2px dashed ${darkMode ? "var(--dark-border)" : "var(--light-border)"}`,
                }}
              >
                <div className="text-center">
                  <MdBarChart size={48} className="text-muted mb-2" />
                  <p className="text-muted mb-0">Chart visualization would appear here</p>
                  <small className="text-muted">Integration with Chart.js or similar library</small>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Top Surveys */}
        <Col lg={4} className="mb-4">
          <Card className="border-0 shadow-sm h-100 card-enhanced">
            <Card.Header className="border-0 pb-0">
              <h5 className={`mb-0 ${darkMode ? "text-white" : "text-dark"}`}>Top Performing Surveys</h5>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="list-group list-group-flush">
                {currentSurveys.map((survey, index) => (
                  <div key={index} className="list-group-item border-0 px-3 py-3">
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="flex-grow-1">
                        <h6 className={`mb-1 ${darkMode ? "text-white" : "text-dark"}`}>{survey.name}</h6>
                        <p className="mb-1 small text-muted">{survey.category}</p>
                        <div className="d-flex gap-3 small">
                          <span className={darkMode ? "text-white" : "text-dark"}>{survey.responses} responses</span>
                          <span className={darkMode ? "text-white" : "text-dark"}>{survey.completion}% completion</span>
                        </div>
                      </div>
                      <Badge bg="primary" className="ms-2 badge-enhanced">
                        {survey.avgRating}★
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-top">
                <Pagination
                  current={pagination.page}
                  total={topSurveys.length}
                  limit={pagination.limit}
                  onChange={(page) => setPagination((prev) => ({ ...prev, page }))}
                  darkMode={darkMode}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Activity Table */}
      <Row>
        <Col>
          <Card className="border-0 shadow-sm card-enhanced">
            <Card.Header className="border-0 pb-0">
              <h5 className={`mb-0 ${darkMode ? "text-white" : "text-dark"}`}>Daily Response Activity</h5>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table className="mb-0 table-enhanced" hover>
                  <thead className="table-light">
                    <tr>
                      <th className="border-0 py-3 px-4">Date</th>
                      <th className="border-0 py-3">Responses</th>
                      <th className="border-0 py-3">Completion Rate</th>
                      <th className="border-0 py-3">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {responseData.map((data, index) => (
                      <tr key={index}>
                        <td className="py-3 px-4 border-0">
                          <span className={darkMode ? "text-white" : "text-dark"}>{data.date}</span>
                        </td>
                        <td className="py-3 border-0">
                          <span className={darkMode ? "text-white" : "text-dark"}>{data.responses}</span>
                        </td>
                        <td className="py-3 border-0">
                          <div className="d-flex align-items-center">
                            <div className="progress me-2" style={{ width: "60px", height: "6px" }}>
                              <div className="progress-bar bg-primary" style={{ width: `${data.completion}%` }}></div>
                            </div>
                            <span className={`small ${darkMode ? "text-white" : "text-dark"}`}>{data.completion}%</span>
                          </div>
                        </td>
                        <td className="py-3 border-0">
                          {index > 0 && responseData[index - 1] ? (
                            <span
                              className={
                                data.responses > responseData[index - 1].responses ? "text-success" : "text-danger"
                              }
                            >
                              {data.responses > responseData[index - 1].responses ? (
                                <MdTrendingUp />
                              ) : (
                                <MdTrendingDown />
                              )}
                            </span>
                          ) : (
                            <span className="text-muted">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Analytics
