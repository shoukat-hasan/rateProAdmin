// src\pages\Analytics\TrendAnalysis.jsx

"use client"

import { useState } from "react"
import { Container, Row, Col, Card, Form, Button, ButtonGroup } from "react-bootstrap"
import { Line, Bar } from "react-chartjs-2"

const TrendAnalysis = () => {
  const [timeRange, setTimeRange] = useState("30d")
  const [selectedMetric, setSelectedMetric] = useState("responses")

  const trendData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
    datasets: [
      {
        label: "Survey Responses",
        data: [120, 150, 180, 165, 200, 190],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.1,
      },
      {
        label: "Completion Rate",
        data: [75, 82, 78, 85, 88, 83],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.1,
      },
    ],
  }

  const comparisonData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "2024",
        data: [65, 78, 90, 81, 96, 105],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "2023",
        data: [45, 58, 70, 61, 76, 85],
        backgroundColor: "rgba(255, 206, 86, 0.5)",
        borderColor: "rgba(255, 206, 86, 1)",
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
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h1 className="h3 mb-0">Trend Analysis</h1>
          <p className="text-muted">Analyze survey performance trends over time</p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col lg={6}>
          <Card>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Time Range</Form.Label>
                <Form.Select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                  <option value="1y">Last year</option>
                </Form.Select>
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6}>
          <Card>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Metric</Form.Label>
                <ButtonGroup className="w-100">
                  <Button
                    variant={selectedMetric === "responses" ? "primary" : "outline-primary"}
                    onClick={() => setSelectedMetric("responses")}
                  >
                    Responses
                  </Button>
                  <Button
                    variant={selectedMetric === "completion" ? "primary" : "outline-primary"}
                    onClick={() => setSelectedMetric("completion")}
                  >
                    Completion Rate
                  </Button>
                  <Button
                    variant={selectedMetric === "engagement" ? "primary" : "outline-primary"}
                    onClick={() => setSelectedMetric("engagement")}
                  >
                    Engagement
                  </Button>
                </ButtonGroup>
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Header>
              <Card.Title className="mb-0">Trend Overview</Card.Title>
            </Card.Header>
            <Card.Body>
              <div style={{ height: "400px" }}>
                <Line data={trendData} options={chartOptions} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title className="mb-0">Year-over-Year Comparison</Card.Title>
            </Card.Header>
            <Card.Body>
              <div style={{ height: "350px" }}>
                <Bar data={comparisonData} options={chartOptions} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default TrendAnalysis
