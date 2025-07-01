// src\pages\Audiences\AudienceSegmentation.jsx

"use client"

import { useState } from "react"
import { Container, Row, Col, Card, Table, Badge, Button, Form, Modal } from "react-bootstrap"
import Pagination from "../../components/Pagination/Pagination.jsx"

const AudienceSegmentation = ({ darkMode }) => {
  const [pagination, setPagination] = useState({ page: 1, limit: 1, total: 0 })
  const [segments, setSegments] = useState([
    {
      id: 1,
      name: "High-Value Customers",
      description: "Customers with high engagement and purchase history",
      criteria: "Purchase > $1000 AND Engagement > 80%",
      size: 1247,
      status: "Active",
      created: "2024-01-10",
    },
    {
      id: 2,
      name: "New Users",
      description: "Users who joined in the last 30 days",
      criteria: "Registration Date > 30 days ago",
      size: 456,
      status: "Active",
      created: "2024-01-08",
    },
    {
      id: 3,
      name: "Inactive Users",
      description: "Users with no activity in the last 90 days",
      criteria: "Last Activity > 90 days ago",
      size: 789,
      status: "Draft",
      created: "2024-01-05",
    },
  ])

  const [showModal, setShowModal] = useState(false)
  const [currentSegment, setCurrentSegment] = useState({
    name: "",
    description: "",
    criteria: "",
  })

  const [filters, setFilters] = useState({
    demographic: "",
    behavior: "",
    engagement: "",
    purchase: "",
  })

  const getStatusBadge = (status) => {
    const variants = {
      Active: "success",
      Draft: "secondary",
      Paused: "warning",
    }
    return <Badge bg={variants[status] || "secondary"}>{status}</Badge>
  }

  const handleCreateSegment = () => {
    setCurrentSegment({ name: "", description: "", criteria: "" })
    setShowModal(true)
  }

  const handleSaveSegment = () => {
    if (currentSegment.name.trim()) {
      const newSegment = {
        ...currentSegment,
        id: Date.now(),
        size: Math.floor(Math.random() * 1000) + 100,
        status: "Draft",
        created: new Date().toISOString().split("T")[0],
      }
      setSegments([...segments, newSegment])
      setShowModal(false)
    }
  }

  const deleteSegment = (id) => {
    setSegments(segments.filter((s) => s.id !== id))
  }

  const indexOfLastItem = pagination.page * pagination.limit
const indexOfFirstItem = indexOfLastItem - pagination.limit
const currentSegments = segments.slice(indexOfFirstItem, indexOfLastItem)


  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="h3 mb-0">Audience Segmentation</h1>
              <p className="text-muted">Create and manage audience segments for targeted surveys</p>
            </div>
            <Button variant="primary" onClick={handleCreateSegment}>
              <i className="fas fa-plus me-2"></i>
              Create Segment
            </Button>
          </div>
        </Col>
      </Row>

      {/* Segment Builder */}
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Header>
              <Card.Title className="mb-0">Quick Segment Builder</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>Demographics</Form.Label>
                    <Form.Select
                      value={filters.demographic}
                      onChange={(e) => setFilters({ ...filters, demographic: e.target.value })}
                    >
                      <option value="">All Demographics</option>
                      <option value="age_18_25">Age 18-25</option>
                      <option value="age_26_35">Age 26-35</option>
                      <option value="age_36_50">Age 36-50</option>
                      <option value="age_50_plus">Age 50+</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>Behavior</Form.Label>
                    <Form.Select
                      value={filters.behavior}
                      onChange={(e) => setFilters({ ...filters, behavior: e.target.value })}
                    >
                      <option value="">All Behaviors</option>
                      <option value="frequent_user">Frequent User</option>
                      <option value="occasional_user">Occasional User</option>
                      <option value="new_user">New User</option>
                      <option value="inactive_user">Inactive User</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>Engagement</Form.Label>
                    <Form.Select
                      value={filters.engagement}
                      onChange={(e) => setFilters({ ...filters, engagement: e.target.value })}
                    >
                      <option value="">All Engagement</option>
                      <option value="high">High Engagement</option>
                      <option value="medium">Medium Engagement</option>
                      <option value="low">Low Engagement</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>Purchase History</Form.Label>
                    <Form.Select
                      value={filters.purchase}
                      onChange={(e) => setFilters({ ...filters, purchase: e.target.value })}
                    >
                      <option value="">All Customers</option>
                      <option value="high_value">High Value ($1000+)</option>
                      <option value="medium_value">Medium Value ($100-$999)</option>
                      <option value="low_value">Low Value ($0-$99)</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <div className="d-flex gap-2">
                <Button variant="outline-primary">
                  <i className="fas fa-search me-2"></i>
                  Preview Segment
                </Button>
                <Button variant="primary">
                  <i className="fas fa-save me-2"></i>
                  Save as Segment
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Segments List */}
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title className="mb-0">Existing Segments</Card.Title>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table className="mb-0" hover>
                  <thead className="table-light">
                    <tr>
                      <th>Segment Name</th>
                      <th>Description</th>
                      <th className="d-none d-lg-table-cell">Criteria</th>
                      <th>Size</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentSegments.map((segment) => (
                      <tr key={segment.id}>
                        <td>
                          <div className="fw-medium">{segment.name}</div>
                          <small className="text-muted">
                            Created: {new Date(segment.created).toLocaleDateString()}
                          </small>
                        </td>
                        <td>
                          <div className="text-truncate" style={{ maxWidth: "200px" }}>
                            {segment.description}
                          </div>
                        </td>
                        <td className="d-none d-lg-table-cell">
                          <code className="small">{segment.criteria}</code>
                        </td>
                        <td>
                          <span className="fw-medium">{segment.size.toLocaleString()}</span>
                          <small className="text-muted d-block">contacts</small>
                        </td>
                        <td>{getStatusBadge(segment.status)}</td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <Button variant="outline-primary" size="sm" title="View Details">
                              <i className="fas fa-eye"></i>
                            </Button>
                            <Button variant="outline-secondary" size="sm" title="Edit">
                              <i className="fas fa-edit"></i>
                            </Button>
                            <Button variant="outline-info" size="sm" title="Export">
                              <i className="fas fa-download"></i>
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              title="Delete"
                              onClick={() => deleteSegment(segment.id)}
                            >
                              <i className="fas fa-trash"></i>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div className="p-3 border-top">
                  <Pagination
                    current={pagination.page}
                    total={segments.length}
                    limit={pagination.limit}
                    onChange={(page) => setPagination((prev) => ({ ...prev, page }))}
                    darkMode={darkMode}
                  />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Create Segment Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create New Segment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Segment Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter segment name"
                value={currentSegment.name}
                onChange={(e) => setCurrentSegment({ ...currentSegment, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Describe this segment"
                value={currentSegment.description}
                onChange={(e) => setCurrentSegment({ ...currentSegment, description: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Criteria</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Define segment criteria (e.g., Age > 25 AND Location = 'US')"
                value={currentSegment.criteria}
                onChange={(e) => setCurrentSegment({ ...currentSegment, criteria: e.target.value })}
              />
              <Form.Text className="text-muted">
                Use logical operators like AND, OR to combine multiple conditions
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveSegment}>
            Create Segment
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default AudienceSegmentation
