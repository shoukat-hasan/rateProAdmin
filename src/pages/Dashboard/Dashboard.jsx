// src\pages\Dashboard\Dashboard.jsx
"use client"

import { useState, useEffect } from "react"
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
  Filler,
} from "chart.js"
import {
  MdDashboard,
  MdPoll,
  MdPeople,
  MdTrendingUp,
  MdAccessTime,
  MdVisibility,
  MdEdit,
  MdMoreVert,
  MdRefresh,
  MdDownload,
  MdAdd,
  MdBarChart,
  MdShowChart,
  MdPieChart,
} from "react-icons/md"
import Pagination from "../../components/Pagination/Pagination.jsx"
import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { useAuth } from "../../context/AuthContext.jsx"

// Register Chart.js components including Filler
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
)

const Dashboard = ({ darkMode, limit = 5 }) => {
  const [stats, setStats] = useState({
    totalSurveys: 24,
    activeResponses: 1247,
    completionRate: 78.5,
    avgResponseTime: "3.2 min",
  })

  const [recentSurveys, setRecentSurveys] = useState([])
  const [pagination, setPagination] = useState({ page: 1, limit: 5, total: 0 })
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();
  const [responses, setResponses] = useState([]);
  const { user } = useAuth();

  const createNewSurvey = () => {
    navigate("/app/surveys/create");
  };

  const ViewTrendsAnalytics = () => {
    navigate("/app/analytics/trends");
  };

  const ViewRecentSurveys = () => {
    navigate("/app/surveys/responses");
  };

  useEffect(() => {
    if (
      user &&
      (user.role === "companyAdmin") &&
      !user.companyProfileUpdated
    ) {
      Swal.fire({
        title: "⚠️ Company Profile Update Required",
        text: "To unlock the full features of the platform, please complete your company profile. Without updating it, you may not be able to access all functionalities.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Update Profile",
        cancelButtonText: "Maybe Later",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/app/profile?tab=company")
        }
      })
    }
  }, [user, navigate])


  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setRecentSurveys([
        { id: 1, name: "Customer Satisfaction Q4", responses: 156, status: "Active", completion: 85 },
        { id: 2, name: "Product Feedback Survey", responses: 89, status: "Active", completion: 67 },
        { id: 3, name: "Employee Engagement", responses: 234, status: "Completed", completion: 100 },
        { id: 4, name: "Market Research Study", responses: 45, status: "Draft", completion: 0 },
        { id: 5, name: "User Experience Survey", responses: 178, status: "Active", completion: 92 },
        { id: 6, name: "Brand Awareness Survey", responses: 67, status: "Active", completion: 45 },
        { id: 7, name: "Website Usability Test", responses: 123, status: "Completed", completion: 100 },
        { id: 8, name: "Training Effectiveness", responses: 89, status: "Active", completion: 73 },
        { id: 9, name: "Customer Support Feedback", responses: 156, status: "Active", completion: 88 },
        { id: 10, name: "Product Launch Survey", responses: 234, status: "Draft", completion: 15 },
      ])
      setPagination((prev) => ({ ...prev, total: 10 }))
      setLoading(false)
    }, 1000)
  }, [])

  // Chart data with dark mode support and proper filler configuration
  const responseData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Responses",
        data: [65, 78, 90, 81, 96, 105],
        borderColor: "rgb(var(--bs-primary-rgb))",
        backgroundColor: "rgba(var(--bs-primary-rgb), 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  }

  const surveyTypeData = {
    labels: ["Customer Satisfaction", "Product Feedback", "Employee Engagement", "Market Research", "Other"],
    datasets: [
      {
        data: [30, 25, 20, 15, 10],
        backgroundColor: [
          "rgba(31, 218, 228, 0.8)",
          "rgba(40, 167, 69, 0.8)",
          "rgba(255, 193, 7, 0.8)",
          "rgba(220, 53, 69, 0.8)",
          "rgba(108, 117, 125, 0.8)",
        ],
        borderColor: [
          "rgb(31, 218, 228)",
          "rgb(40, 167, 69)",
          "rgb(255, 193, 7)",
          "rgb(220, 53, 69)",
          "rgb(108, 117, 125)",
        ],
        borderWidth: 2,
      },
    ],
  }

  const completionData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Completion Rate %",
        data: [75, 82, 78, 85],
        backgroundColor: "rgba(var(--bs-primary-rgb), 0.6)",
        borderColor: "rgba(var(--bs-primary-rgb), 1)",
        borderWidth: 2,
        borderRadius: 4,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: darkMode ? "#e9ecef" : "#212529",
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: darkMode ? "#2a2e35" : "#ffffff",
        titleColor: darkMode ? "#e9ecef" : "#212529",
        bodyColor: darkMode ? "#e9ecef" : "#212529",
        borderColor: darkMode ? "#343a40" : "#dee2e6",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: {
          color: darkMode ? "#e9ecef" : "#212529",
        },
        grid: {
          color: darkMode ? "#343a40" : "#dee2e6",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: darkMode ? "#e9ecef" : "#212529",
        },
        grid: {
          color: darkMode ? "#343a40" : "#dee2e6",
        },
      },
    },
  }

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: darkMode ? "#e9ecef" : "#212529",
          usePointStyle: true,
          padding: 15,
        },
      },
      tooltip: {
        backgroundColor: darkMode ? "#2a2e35" : "#ffffff",
        titleColor: darkMode ? "#e9ecef" : "#212529",
        bodyColor: darkMode ? "#e9ecef" : "#212529",
        borderColor: darkMode ? "#343a40" : "#dee2e6",
        borderWidth: 1,
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
    return (
      <Badge bg={variants[status] || "secondary"} className="badge-enhanced">
        {status}
      </Badge>
    )
  }

  const currentSurveys = recentSurveys.slice(
    (pagination.page - 1) * pagination.limit,
    pagination.page * pagination.limit,
  )

  useEffect(() => {
    setTimeout(() => {
      const dummyResponses = [
        {
          id: 1,
          surveyId: 1,
          surveyTitle: "Customer Satisfaction Survey",
          respondent: "John Doe",
          email: "john.doe@example.com",
          submittedAt: "2023-06-01 14:32",
          satisfaction: 4.5,
        },
        {
          id: 2,
          surveyId: 1,
          surveyTitle: "Customer Satisfaction Survey",
          respondent: "Jane Smith",
          email: "jane.smith@example.com",
          submittedAt: "2023-06-01 13:15",
          satisfaction: 3.8,
        },
        {
          id: 3,
          surveyId: 2,
          surveyTitle: "Product Feedback Survey",
          respondent: "Robert Johnson",
          email: "robert.j@example.com",
          submittedAt: "2023-06-01 11:45",
          satisfaction: 4.2,
        },
        {
          id: 4,
          surveyId: 4,
          surveyTitle: "Website Usability Survey",
          respondent: "Emily Davis",
          email: "emily.d@example.com",
          submittedAt: "2023-05-31 16:20",
          satisfaction: 4.0,
        },
        {
          id: 5,
          surveyId: 1,
          surveyTitle: "Customer Satisfaction Survey",
          respondent: "Michael Wilson",
          email: "michael.w@example.com",
          submittedAt: "2023-05-31 15:10",
          satisfaction: 4.7,
        },
      ]

      setResponses(dummyResponses.slice(0, limit))
      setLoading(false)
    }, 800)
  }, [limit])

  const getSatisfactionVariant = (score) => {
    if (score >= 4.5) return "success"
    if (score >= 3.5) return "primary"
    if (score >= 2.5) return "warning"
    return "danger"
  }

  if (loading) {
    return (
      <Container fluid className="dashboard-container py-4">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className={darkMode ? "text-white" : "text-dark"}>Loading dashboard...</p>
        </div>
      </Container>
    )
  }

  return (
    <Container fluid className="dashboard-container py-4 fade-in">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div className="d-flex align-items-center">
              <MdDashboard size={32} className="text-primary me-3" />
              <div>
                <h1 className={`h3 mb-0 ${darkMode ? "text-white" : "text-dark"}`}>Dashboard</h1>
                <p className="text-muted mb-0">Welcome back! Here's what's happening with your surveys.</p>
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
              <Button variant="primary" onClick={createNewSurvey} size="sm" className="btn-enhanced">
                <MdAdd className="me-1" />
                New Survey
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col xl={3} lg={6} md={6} sm={6} className="mb-3">
          <Card className="stats-card h-100 card-enhanced">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div
                  className="stats-icon bg-primary rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{ width: "48px", height: "48px" }}
                >
                  <MdPoll className="text-white" size={24} />
                </div>
                <div className="ms-3">
                  <div className={`stats-number h4 mb-0 fw-bold ${darkMode ? "text-white" : "text-dark"}`}>
                    {stats.totalSurveys}
                  </div>
                  <div className="stats-label text-muted">Total Surveys</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={3} lg={6} md={6} sm={6} className="mb-3">
          <Card className="stats-card h-100 card-enhanced">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div
                  className="stats-icon bg-success rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{ width: "48px", height: "48px" }}
                >
                  <MdPeople className="text-white" size={24} />
                </div>
                <div className="ms-3">
                  <div className={`stats-number h4 mb-0 fw-bold ${darkMode ? "text-white" : "text-dark"}`}>
                    {stats.activeResponses.toLocaleString()}
                  </div>
                  <div className="stats-label text-muted">Active Responses</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={3} lg={6} md={6} sm={6} className="mb-3">
          <Card className="stats-card h-100 card-enhanced">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div
                  className="stats-icon bg-info rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{ width: "48px", height: "48px" }}
                >
                  <MdTrendingUp className="text-white" size={24} />
                </div>
                <div className="ms-3">
                  <div className={`stats-number h4 mb-0 fw-bold ${darkMode ? "text-white" : "text-dark"}`}>
                    {stats.completionRate}%
                  </div>
                  <div className="stats-label text-muted">Completion Rate</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={3} lg={6} md={6} sm={6} className="mb-3">
          <Card className="stats-card h-100 card-enhanced">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div
                  className="stats-icon bg-warning rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{ width: "48px", height: "48px" }}
                >
                  <MdAccessTime className="text-white" size={24} />
                </div>
                <div className="ms-3">
                  <div className={`stats-number h4 mb-0 fw-bold ${darkMode ? "text-white" : "text-dark"}`}>
                    {stats.avgResponseTime}
                  </div>
                  <div className="stats-label text-muted">Avg Response Time</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Charts Row */}
      <Row className="mb-4">
        <Col lg={8} className="mb-3">
          <Card className="h-100 card-enhanced">
            <Card.Header className="border-0 d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <MdShowChart className="text-primary me-2" size={20} />
                <Card.Title className={`mb-0 ${darkMode ? "text-white" : "text-dark"}`}>Response Trends</Card.Title>
              </div>
              <Button variant="outline-primary" onClick={ViewTrendsAnalytics} size="sm" className="btn-enhanced">
                <MdBarChart className="me-1" />
                View Details
              </Button>
            </Card.Header>
            <Card.Body>
              <div style={{ height: "300px" }}>
                <Line data={responseData} options={chartOptions} />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4} className="mb-3">
          <Card className="h-100 card-enhanced">
            <Card.Header className="border-0 d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <MdPieChart className="text-primary me-2" size={20} />
                <Card.Title className={`mb-0 ${darkMode ? "text-white" : "text-dark"}`}>Survey Types</Card.Title>
              </div>
            </Card.Header>
            <Card.Body>
              <div style={{ height: "300px" }}>
                <Doughnut data={surveyTypeData} options={doughnutOptions} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Surveys and Completion Rates */}
      <Row>
        <Col lg={8} className="mb-3">
          <Card className="card-enhanced">
            <Card.Header className="d-flex justify-content-between align-items-center border-0">
              <div className="d-flex align-items-center">
                <MdPoll className="text-primary me-2" size={20} />
                <Card.Title className={`mb-0 ${darkMode ? "text-white" : "text-dark"}`}>Recent Surveys Response</Card.Title>
              </div>
              <Button variant="outline-primary" onClick={ViewRecentSurveys} size="sm" className="btn-enhanced">
                <MdVisibility className="me-1" />
                View All
              </Button>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table className="mb-0 table-enhanced" hover>
                  <thead className="table-light">
                    <tr>
                      <th className="border-0 py-3 px-4">
                        <div className="d-flex align-items-center">
                          <MdPoll className="me-2" size={16} />
                          Survey Name
                        </div>
                      </th>
                      <th className="border-0 py-3 d-none d-md-table-cell">
                        <div className="d-flex align-items-center">
                          <MdPeople className="me-2" size={16} />
                          Respondent
                        </div>
                      </th>
                      <th className="border-0 py-3">Satisfaction</th>
                      <th className="border-0 py-3 d-none d-lg-table-cell">
                        <div className="d-flex align-items-center">
                          <MdTrendingUp className="me-2" size={16} />
                          Actions
                        </div>
                      </th>
                      <th className="border-0 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {responses.map((response) => (
                      <tr key={response.id}>
                        <td>
                          <Link to={`/surveys/${response.surveyId}`} className="text-primary text-decoration-none fw-medium">
                            {response.surveyTitle}
                          </Link>
                        </td>
                        <td>
                          <div>
                            <div className="fw-medium">{response.respondent}</div>
                            <small className="text-muted">{response.email}</small>
                          </div>
                        </td>
                        <td>{response.submittedAt}</td>
                        <td className="text-center">
                          <Badge bg={getSatisfactionVariant(response.satisfaction)}>{response.satisfaction.toFixed(1)}</Badge>
                        </td>
                        <td className="text-center">
                          <button className="btn btn-sm btn-outline-primary" title="View Response">
                            <MdVisibility />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {/* {currentSurveys.map((survey) => (
                      <tr key={survey.id}>
                        <td className="border-0 py-3 px-4">
                          <div className={`fw-medium ${darkMode ? "text-white" : "text-dark"}`}>{survey.name}</div>
                          <small className="text-muted d-md-none">{survey.responses} responses</small>
                        </td>
                        <td className="border-0 py-3 d-none d-md-table-cell">
                          <span className={darkMode ? "text-white" : "text-dark"}>{survey.responses}</span>
                        </td>
                        <td className="border-0 py-3">{getStatusBadge(survey.status)}</td>
                        <td className="border-0 py-3 d-none d-lg-table-cell">
                          <div className="d-flex align-items-center">
                            <ProgressBar
                              now={survey.completion}
                              style={{ width: "80px", height: "6px" }}
                              className="me-2"
                            />
                            <small className={darkMode ? "text-white" : "text-dark"}>{survey.completion}%</small>
                          </div>
                        </td>
                        <td className="border-0 py-3">
                          <div className="btn-group btn-group-sm">
                            <Button variant="outline-primary" size="sm" className="btn-enhanced">
                              <MdVisibility size={14} />
                            </Button>
                            <Button variant="outline-secondary" size="sm" className="btn-enhanced">
                              <MdEdit size={14} />
                            </Button>
                            <Button variant="outline-secondary" size="sm" className="btn-enhanced">
                              <MdMoreVert size={14} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))} */}
                  </tbody>
                </Table>
              </div>
              <div className="p-3 border-top">
                <Pagination
                  current={pagination.page}
                  total={pagination.total}
                  limit={pagination.limit}
                  onChange={(page) => setPagination((prev) => ({ ...prev, page }))}
                  darkMode={darkMode}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4} className="mb-3">
          <Card className="h-100 card-enhanced">
            <Card.Header className="border-0 d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <MdBarChart className="text-primary me-2" size={20} />
                <Card.Title className={`mb-0 ${darkMode ? "text-white" : "text-dark"}`}>
                  Weekly Completion Rates
                </Card.Title>
              </div>
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
