// src\pages\Analytics\ResponseOverview.jsx

"use client"

import { useState } from "react"
import { Container, Row, Col, Card, Table, Badge, Button, Form, Pagination } from "react-bootstrap"

const ResponseOverview = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [sortBy, setSortBy] = useState("date")
  const [filterStatus, setFilterStatus] = useState("all")

  const responses = [
    {
      id: 1,
      survey: "Customer Satisfaction Q4",
      respondent: "john@example.com",
      date: "2024-01-15",
      status: "Completed",
      score: 8.5,
    },
    {
      id: 2,
      survey: "Product Feedback Survey",
      respondent: "jane@example.com",
      date: "2024-01-14",
      status: "Partial",
      score: 7.2,
    },
    {
      id: 3,
      survey: "Employee Engagement",
      respondent: "bob@company.com",
      date: "2024-01-13",
      status: "Completed",
      score: 9.1,
    },
    {
      id: 4,
      survey: "Market Research Study",
      respondent: "alice@test.com",
      date: "2024-01-12",
      status: "Completed",
      score: 6.8,
    },
    {
      id: 5,
      survey: "User Experience Survey",
      respondent: "charlie@demo.com",
      date: "2024-01-11",
      status: "Abandoned",
      score: null,
    },
  ]

  const getStatusBadge = (status) => {
    const variants = {
      Completed: "success",
      Partial: "warning",
      Abandoned: "danger",
    }
    return <Badge bg={variants[status] || "secondary"}>{status}</Badge>
  }

  const totalPages = Math.ceil(responses.length / itemsPerPage)

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h1 className="h3 mb-0">Response Overview</h1>
          <p className="text-muted">View and analyze all survey responses</p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col lg={4}>
          <Form.Group>
            <Form.Label>Sort By</Form.Label>
            <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="date">Date</option>
              <option value="survey">Survey</option>
              <option value="status">Status</option>
              <option value="score">Score</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col lg={4}>
          <Form.Group>
            <Form.Label>Filter by Status</Form.Label>
            <Form.Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="all">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="partial">Partial</option>
              <option value="abandoned">Abandoned</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col lg={4} className="d-flex align-items-end">
          <Button variant="primary" className="w-100">
            <i className="fas fa-download me-2"></i>
            Export Data
          </Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title className="mb-0">All Responses</Card.Title>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table className="mb-0" hover>
                  <thead className="table-light">
                    <tr>
                      <th>Survey</th>
                      <th>Respondent</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Score</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {responses.map((response) => (
                      <tr key={response.id}>
                        <td>{response.survey}</td>
                        <td>{response.respondent}</td>
                        <td>{new Date(response.date).toLocaleDateString()}</td>
                        <td>{getStatusBadge(response.status)}</td>
                        <td>{response.score ? response.score.toFixed(1) : "-"}</td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <Button variant="outline-primary" size="sm">
                              <i className="fas fa-eye"></i>
                            </Button>
                            <Button variant="outline-secondary" size="sm">
                              <i className="fas fa-download"></i>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
            <Card.Footer>
              <div className="d-flex justify-content-between align-items-center">
                <small className="text-muted">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(currentPage * itemsPerPage, responses.length)} of {responses.length} entries
                </small>
                <Pagination size="sm" className="mb-0">
                  <Pagination.Prev disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} />
                  {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item
                      key={index + 1}
                      active={index + 1 === currentPage}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  />
                </Pagination>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default ResponseOverview
