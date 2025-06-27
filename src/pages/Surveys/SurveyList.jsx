// src\pages\Surveys\SurveyList.jsx

"use client"

import { useState } from "react"
import { Container, Row, Col, Card, Table, Badge, Button, Form, InputGroup, Modal } from "react-bootstrap"
import Pagination from "../../components/Pagination/Pagination.jsx"

const SurveyList = ({ darkMode }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(3)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedSurvey, setSelectedSurvey] = useState(null)
  // const [pagination, setPagination] = useState({ page: 1, limit: 3, total: 0 })

  const [surveys, setSurveys] = useState([
    {
      id: 1,
      name: "Customer Satisfaction Q4",
      status: "Active",
      responses: 156,
      created: "2024-01-10",
      lastModified: "2024-01-15",
    },
    {
      id: 2,
      name: "Product Feedback Survey",
      status: "Active",
      responses: 89,
      created: "2024-01-08",
      lastModified: "2024-01-14",
    },
    {
      id: 3,
      name: "Employee Engagement",
      status: "Completed",
      responses: 234,
      created: "2024-01-05",
      lastModified: "2024-01-13",
    },
    {
      id: 4,
      name: "Market Research Study",
      status: "Draft",
      responses: 0,
      created: "2024-01-03",
      lastModified: "2024-01-12",
    },
    {
      id: 5,
      name: "User Experience Survey",
      status: "Active",
      responses: 178,
      created: "2024-01-01",
      lastModified: "2024-01-11",
    },
  ])

  const getStatusBadge = (status) => {
    const variants = {
      Active: "success",
      Completed: "primary",
      Draft: "secondary",
      Paused: "warning",
      Archived: "dark",
    }
    return <Badge bg={variants[status] || "secondary"}>{status}</Badge>
  }

  const handleDelete = (survey) => {
    setSelectedSurvey(survey)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    setSurveys(surveys.filter((s) => s.id !== selectedSurvey.id))
    setShowDeleteModal(false)
    setSelectedSurvey(null)
  }

  const filteredSurveys = surveys.filter((survey) => {
    const matchesSearch = survey.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || survey.status.toLowerCase() === filterStatus
    return matchesSearch && matchesFilter
  })

  // const totalPages = Math.ceil(filteredSurveys.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentSurveys = filteredSurveys.slice(startIndex, startIndex + itemsPerPage)

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="h3 mb-0">Surveys</h1>
              <p className="text-muted">Manage all your surveys</p>
            </div>
            <Button variant="primary" href="/surveys/builder">
              <i className="fas fa-plus me-2"></i>
              Create Survey
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col lg={6}>
          <InputGroup>
            <InputGroup.Text>
              <i className="fas fa-search"></i>
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search surveys..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col lg={3}>
          <Form.Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="draft">Draft</option>
            <option value="paused">Paused</option>
          </Form.Select>
        </Col>
        <Col lg={3}>
          <Button variant="outline-secondary" className="w-100">
            <i className="fas fa-filter me-2"></i>
            More Filters
          </Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table className="mb-0" hover>
                  <thead className="table-light">
                    <tr>
                      <th>Survey Name</th>
                      <th>Status</th>
                      <th>Responses</th>
                      <th className="d-none d-md-table-cell">Created</th>
                      <th className="d-none d-lg-table-cell">Last Modified</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentSurveys.map((survey) => (
                      <tr key={survey.id}>
                        <td>
                          <div className="fw-medium">{survey.name}</div>
                          <small className="text-muted d-md-none">
                            Created: {new Date(survey.created).toLocaleDateString()}
                          </small>
                        </td>
                        <td>{getStatusBadge(survey.status)}</td>
                        <td>
                          <span className="fw-medium">{survey.responses}</span>
                        </td>
                        <td className="d-none d-md-table-cell">{new Date(survey.created).toLocaleDateString()}</td>
                        <td className="d-none d-lg-table-cell">{new Date(survey.lastModified).toLocaleDateString()}</td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <Button variant="outline-primary" size="sm" title="View">
                              <i className="fas fa-eye"></i>
                            </Button>
                            <Button variant="outline-secondary" size="sm" title="Edit">
                              <i className="fas fa-edit"></i>
                            </Button>
                            <Button variant="outline-info" size="sm" title="Analytics">
                              <i className="fas fa-chart-bar"></i>
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              title="Delete"
                              onClick={() => handleDelete(survey)}
                            >
                              <i className="fas fa-trash"></i>
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
                  Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredSurveys.length)} of{" "}
                  {filteredSurveys.length} surveys
                </small>
                <div className="p-3 border-top">
                  <Pagination
                    current={currentPage}
                    total={filteredSurveys.length}
                    limit={itemsPerPage}
                    onChange={(page) => setCurrentPage(page)}
                    darkMode={darkMode}
                  />
                </div>
                {/* <Pagination size="sm" className="mb-0">
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
                </Pagination> */}
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the survey "{selectedSurvey?.name}"? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete Survey
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default SurveyList
