// src\pages\Dashboard\Dashboard.jsx

"use client"

import { useState } from "react"
import { Container, Row, Col, Card, Button, Table, Badge, ProgressBar } from "react-bootstrap"
import { Line, Bar, Doughnut } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement)

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalSurveys: 24,
    activeResponses: 1247,
    completionRate: 78.5,
    avgResponseTime: "3.2 min",
  })

  const [recentSurveys, setRecentSurveys] = useState([
    { id: 1, name: "Customer Satisfaction Q4", responses: 156, status: "Active", completion: 85 },
    { id: 2, name: "Product Feedback Survey", responses: 89, status: "Active", completion: 67 },
    { id: 3, name: "Employee Engagement", responses: 234, status: "Completed", completion: 100 },
    { id: 4, name: "Market Research Study", responses: 45, status: "Draft", completion: 0 },
    { id: 5, name: "User Experience Survey", responses: 178, status: "Active", completion: 92 },
  ])

  // Chart data
  const responseData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Responses",
        data: [65, 78, 90, 81, 96, 105],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.1,
      },
    ],
  }

  const surveyTypeData = {
    labels: ["Customer Satisfaction", "Product Feedback", "Employee Engagement", "Market Research", "Other"],
    datasets: [
      {
        data: [30, 25, 20, 15, 10],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  }

  const completionData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Completion Rate %",
        data: [75, 82, 78, 85],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
  }

  const getStatusBadge = (status) => {
    const variants = {
      Active: "success",
      Completed: "primary",
      Draft: "secondary",
      Paused: "warning",
    }
    return <Badge bg={variants[status] || "secondary"}>{status}</Badge>
  }

  return (
    <Container fluid className="dashboard-container">
      <Row className="mb-4">
        <Col>
          <h1 className="h3 mb-0">Dashboard</h1>
          <p className="text-muted">Welcome back! Here's what's happening with your surveys.</p>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col xl={3} lg={6} md={6} sm={6} className="mb-3">
          <Card className="stats-card h-100">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="stats-icon bg-primary">
                  <i className="fas fa-poll"></i>
                </div>
                <div className="ms-3">
                  <div className="stats-number">{stats.totalSurveys}</div>
                  <div className="stats-label">Total Surveys</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={3} lg={6} md={6} sm={6} className="mb-3">
          <Card className="stats-card h-100">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="stats-icon bg-success">
                  <i className="fas fa-users"></i>
                </div>
                <div className="ms-3">
                  <div className="stats-number">{stats.activeResponses.toLocaleString()}</div>
                  <div className="stats-label">Active Responses</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={3} lg={6} md={6} sm={6} className="mb-3">
          <Card className="stats-card h-100">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="stats-icon bg-info">
                  <i className="fas fa-chart-line"></i>
                </div>
                <div className="ms-3">
                  <div className="stats-number">{stats.completionRate}%</div>
                  <div className="stats-label">Completion Rate</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={3} lg={6} md={6} sm={6} className="mb-3">
          <Card className="stats-card h-100">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="stats-icon bg-warning">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="ms-3">
                  <div className="stats-number">{stats.avgResponseTime}</div>
                  <div className="stats-label">Avg Response Time</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Charts Row */}
      <Row className="mb-4">
        <Col lg={8} className="mb-3">
          <Card className="h-100">
            <Card.Header>
              <Card.Title className="mb-0">Response Trends</Card.Title>
            </Card.Header>
            <Card.Body>
              <div style={{ height: "300px" }}>
                <Line data={responseData} options={chartOptions} />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4} className="mb-3">
          <Card className="h-100">
            <Card.Header>
              <Card.Title className="mb-0">Survey Types</Card.Title>
            </Card.Header>
            <Card.Body>
              <div style={{ height: "300px" }}>
                <Doughnut data={surveyTypeData} options={chartOptions} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Surveys and Completion Rates */}
      <Row>
        <Col lg={8} className="mb-3">
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <Card.Title className="mb-0">Recent Surveys</Card.Title>
              <Button variant="outline-primary" size="sm">
                View All
              </Button>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table className="mb-0" hover>
                  <thead className="table-light">
                    <tr>
                      <th>Survey Name</th>
                      <th className="d-none d-md-table-cell">Responses</th>
                      <th>Status</th>
                      <th className="d-none d-lg-table-cell">Completion</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentSurveys.map((survey) => (
                      <tr key={survey.id}>
                        <td>
                          <div className="fw-medium">{survey.name}</div>
                          <small className="text-muted d-md-none">{survey.responses} responses</small>
                        </td>
                        <td className="d-none d-md-table-cell">{survey.responses}</td>
                        <td>{getStatusBadge(survey.status)}</td>
                        <td className="d-none d-lg-table-cell">
                          <div className="d-flex align-items-center">
                            <ProgressBar
                              now={survey.completion}
                              style={{ width: "80px", height: "6px" }}
                              className="me-2"
                            />
                            <small>{survey.completion}%</small>
                          </div>
                        </td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <Button variant="outline-primary" size="sm">
                              <i className="fas fa-eye"></i>
                            </Button>
                            <Button variant="outline-secondary" size="sm">
                              <i className="fas fa-edit"></i>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4} className="mb-3">
          <Card className="h-100">
            <Card.Header>
              <Card.Title className="mb-0">Weekly Completion Rates</Card.Title>
            </Card.Header>
            <Card.Body>
              <div style={{ height: "250px" }}>
                <Bar data={completionData} options={chartOptions} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Dashboard
