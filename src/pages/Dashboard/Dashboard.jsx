"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Container, Row, Col, Card, Nav, Tab, Badge } from "react-bootstrap"
import {
  MdAssignment,
  MdPeople,
  MdInsertChart,
  MdHeadsetMic,
  MdArrowUpward,
  MdArrowDownward,
  MdDashboard,
} from "react-icons/md"
import SurveyList from "../Surveys/SurveyList.jsx"
import RecentResponses from "../../components/RecentResponses/RecentResponses.jsx"

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalSurveys: 0,
    activeSurveys: 0,
    totalResponses: 0,
    averageSatisfaction: 0,
  })

  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalSurveys: 24,
        activeSurveys: 8,
        totalResponses: 1256,
        averageSatisfaction: 4.2,
      })
    }, 500)
  }, [])

  const StatCard = ({ icon, title, value, subtitle, trend, trendValue, color }) => (
    <Card className="h-100 border-0 shadow-sm">
      <Card.Body>
        <Row className="align-items-center">
          <Col xs="auto">
            <div
              className={`rounded-circle d-flex align-items-center justify-content-center text-white`}
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: `var(--${color}-color)`,
              }}
            >
              {icon}
            </div>
          </Col>
          <Col>
            <h6 className="text-muted mb-1">{title}</h6>
            <h3 className="mb-0 fw-bold">{value}</h3>
            <div className="d-flex align-items-center mt-2">
              <span className={`d-flex align-items-center me-2 ${trend === "up" ? "text-success" : "text-danger"}`}>
                {trend === "up" ? <MdArrowUpward size={14} /> : <MdArrowDownward size={14} />}
                {trendValue}
              </span>
              <small className="text-muted">{subtitle}</small>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )

  return (
    <Container fluid className="py-4">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="h3 mb-0">Dashboard</h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item">
                  <Link to="/" className="text-decoration-none d-flex align-items-center">
                    <MdDashboard className="me-1" />
                    Dashboard
                  </Link>
                </li>
              </ol>
            </nav>
          </div>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row className="g-3 mb-4">
        <Col xs={12} sm={6} lg={3}>
          <StatCard
            icon={<MdAssignment size={24} />}
            title="Total Surveys"
            value={stats.totalSurveys}
            subtitle="Active surveys"
            trend="up"
            trendValue={`+${stats.activeSurveys}`}
            color="primary"
          />
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <StatCard
            icon={<MdPeople size={24} />}
            title="Total Responses"
            value={stats.totalResponses.toLocaleString()}
            subtitle="Last 30 days"
            trend="up"
            trendValue="+256"
            color="success"
          />
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <StatCard
            icon={<MdInsertChart size={24} />}
            title="Avg. Satisfaction"
            value={stats.averageSatisfaction}
            subtitle="Out of 5"
            trend="up"
            trendValue="+0.3"
            color="warning"
          />
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <StatCard
            icon={<MdHeadsetMic size={24} />}
            title="Support Tickets"
            value="3"
            subtitle="2 open"
            trend="down"
            trendValue="-2"
            color="info"
          />
        </Col>
      </Row>

      {/* Charts and Tables */}
      <Row className="g-4 mb-4">
        <Col xs={12} lg={8}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-transparent border-0 d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Satisfaction Trends</h5>
              <select className="form-select w-auto">
                <option>Last 30 Days</option>
                <option>Last 60 Days</option>
                <option>Last 90 Days</option>
                <option>This Year</option>
              </select>
            </Card.Header>
            <Card.Body>
              <div className="d-flex align-items-center justify-content-center" style={{ height: "300px" }}>
                <p className="text-muted">Chart will be rendered here</p>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} lg={4}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-transparent border-0 d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Top Performers</h5>
              <Link to="/audiences" className="text-primary text-decoration-none">
                View All
              </Link>
            </Card.Header>
            <Card.Body>
              {[1, 2, 3, 4, 5].map((index) => (
                <div key={index} className="d-flex justify-content-between align-items-center mb-3">
                  <div className="d-flex align-items-center">
                    <div
                      className="rounded-circle bg-light d-flex align-items-center justify-content-center me-3"
                      style={{ width: "40px", height: "40px" }}
                    >
                      <MdPeople className="text-secondary" />
                    </div>
                    <div>
                      <h6 className="mb-0">Respondent {index}</h6>
                      <small className="text-muted">ID: {10000 + index}</small>
                    </div>
                  </div>
                  <span className="fw-bold">{(5 - index * 0.2).toFixed(1)}</span>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Tabbed Content */}
      <Card className="border-0 shadow-sm">
        <Card.Body>
          <Tab.Container defaultActiveKey="recent">
            <Nav variant="tabs" className="mb-4">
              <Nav.Item>
                <Nav.Link eventKey="recent" className="d-flex align-items-center">
                  Recent Surveys
                  <Badge bg="primary" className="ms-2">
                    5
                  </Badge>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="responses" className="d-flex align-items-center">
                  Recent Responses
                  <Badge bg="primary" className="ms-2">
                    10
                  </Badge>
                </Nav.Link>
              </Nav.Item>
            </Nav>

            <Tab.Content>
              <Tab.Pane eventKey="recent">
                <SurveyList limit={5} />
              </Tab.Pane>
              <Tab.Pane eventKey="responses">
                <RecentResponses limit={5} />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Dashboard
