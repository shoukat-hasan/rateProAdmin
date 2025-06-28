// src\pages\Communication\EmailTemplates.jsx

"use client"

import { useState, useEffect } from "react"
import { Container, Row, Col, Card, Table, Badge, Button, Form, InputGroup, Modal } from "react-bootstrap"
import {
  MdEmail,
  MdAdd,
  MdSearch,
  MdFilterList,
  MdEdit,
  MdDelete,
  MdContentCopy,
  MdRefresh,
  MdPreview,
  MdDescription,
  MdCategory,
} from "react-icons/md"
import Pagination from "../../components/Pagination/Pagination.jsx"

const EmailTemplates = ({ darkMode }) => {
  const [templates, setTemplates] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [pagination, setPagination] = useState({ page: 1, limit: 3, total: 0 })

  useEffect(() => {
    setTimeout(() => {
      const allTemplates = [
        {
          id: 1,
          name: "Survey Invitation Template",
          category: "Survey Invitations",
          description: "Standard template for inviting users to participate in surveys",
          status: "Active",
          usageCount: 45,
          lastModified: "2024-01-20",
          createdBy: "Admin",
        },
        {
          id: 2,
          name: "Survey Reminder Template",
          category: "Reminders",
          description: "Follow-up template to remind users about pending surveys",
          status: "Active",
          usageCount: 32,
          lastModified: "2024-01-18",
          createdBy: "Marketing Team",
        },
        {
          id: 3,
          name: "Thank You Template",
          category: "Thank You",
          description: "Template to thank users for completing surveys",
          status: "Active",
          usageCount: 78,
          lastModified: "2024-01-15",
          createdBy: "Admin",
        },
        {
          id: 4,
          name: "Survey Results Summary",
          category: "Results",
          description: "Template for sharing survey results with stakeholders",
          status: "Draft",
          usageCount: 12,
          lastModified: "2024-01-12",
          createdBy: "Analytics Team",
        },
        {
          id: 5,
          name: "Welcome Email Template",
          category: "Welcome",
          description: "Welcome new users to the survey platform",
          status: "Active",
          usageCount: 156,
          lastModified: "2024-01-10",
          createdBy: "HR Team",
        },
        {
          id: 6,
          name: "Incentive Notification",
          category: "Incentives",
          description: "Notify users about rewards for survey completion",
          status: "Active",
          usageCount: 89,
          lastModified: "2024-01-08",
          createdBy: "Rewards Team",
        },
        {
          id: 7,
          name: "Survey Completion Certificate",
          category: "Certificates",
          description: "Certificate template for survey completion",
          status: "Inactive",
          usageCount: 23,
          lastModified: "2024-01-05",
          createdBy: "Admin",
        },
        {
          id: 8,
          name: "Monthly Newsletter Template",
          category: "Newsletters",
          description: "Monthly updates and survey highlights",
          status: "Active",
          usageCount: 67,
          lastModified: "2024-01-03",
          createdBy: "Content Team",
        },
      ]
      setTemplates(allTemplates)
      setPagination((prev) => ({ ...prev, total: allTemplates.length }))
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusBadge = (status) => {
    const variants = {
      Active: "success",
      Draft: "warning",
      Inactive: "secondary",
    }
    return (
      <Badge bg={variants[status] || "secondary"} className="badge-enhanced">
        {status}
      </Badge>
    )
  }

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterCategory === "all" || template.category === filterCategory
    return matchesSearch && matchesFilter
  })

  const currentTemplates = filteredTemplates.slice(
    (pagination.page - 1) * pagination.limit,
    pagination.page * pagination.limit,
  )

  const handleDelete = (template) => {
    setSelectedTemplate(template)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    setTemplates(templates.filter((t) => t.id !== selectedTemplate.id))
    setShowDeleteModal(false)
    setSelectedTemplate(null)
  }

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
    <Container fluid className="email-templates-container py-4 fade-in">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div className="d-flex align-items-center">
              <MdDescription size={32} className="text-primary me-3" />
              <div>
                <h2 className={`mb-1 ${darkMode ? "text-white" : "text-dark"}`}>Email Templates</h2>
                <p className="text-muted mb-0">Create and manage email templates for surveys</p>
              </div>
            </div>
            <div className="d-flex gap-2 mt-2 mt-md-0">
              <Button variant="outline-primary" size="sm" className="btn-enhanced">
                <MdRefresh className="me-1" />
                Refresh
              </Button>
              <Button variant="primary" size="sm" className="btn-enhanced">
                <MdAdd className="me-1" />
                Create Template
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
                  <div className={`text-muted small mb-1 ${darkMode ? "text-light" : ""}`}>Total Templates</div>
                  <div className={`h4 mb-0 fw-bold ${darkMode ? "text-white" : "text-dark"}`}>{templates.length}</div>
                </div>
                <MdDescription size={24} style={{ color: "var(--primary-color)" }} />
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
                  <div className={`text-muted small mb-1 ${darkMode ? "text-light" : ""}`}>Active Templates</div>
                  <div className={`h4 mb-0 fw-bold ${darkMode ? "text-white" : "text-dark"}`}>
                    {templates.filter((t) => t.status === "Active").length}
                  </div>
                </div>
                <MdEmail size={24} style={{ color: "var(--success-color)" }} />
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
                  <div className={`text-muted small mb-1 ${darkMode ? "text-light" : ""}`}>Total Usage</div>
                  <div className={`h4 mb-0 fw-bold ${darkMode ? "text-white" : "text-dark"}`}>
                    {templates.reduce((sum, t) => sum + t.usageCount, 0)}
                  </div>
                </div>
                <MdContentCopy size={24} style={{ color: "var(--info-color)" }} />
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
                  <div className={`text-muted small mb-1 ${darkMode ? "text-light" : ""}`}>Categories</div>
                  <div className={`h4 mb-0 fw-bold ${darkMode ? "text-white" : "text-dark"}`}>
                    {new Set(templates.map((t) => t.category)).size}
                  </div>
                </div>
                <MdCategory size={24} style={{ color: "var(--warning-color)" }} />
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
                      placeholder="Search templates..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </InputGroup>
                </Col>
                <Col md={3} lg={2} className="mb-2 mb-md-0">
                  <Form.Select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="form-enhanced"
                  >
                    <option value="all">All Categories</option>
                    <option value="Survey Invitations">Survey Invitations</option>
                    <option value="Reminders">Reminders</option>
                    <option value="Thank You">Thank You</option>
                    <option value="Results">Results</option>
                    <option value="Welcome">Welcome</option>
                    <option value="Incentives">Incentives</option>
                    <option value="Newsletters">Newsletters</option>
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

      {/* Templates Table */}
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
                          <MdDescription className="me-2" size={16} />
                          Template Name
                        </div>
                      </th>
                      <th className="border-0 py-3">
                        <div className="d-flex align-items-center">
                          <MdCategory className="me-2" size={16} />
                          Category
                        </div>
                      </th>
                      <th className="border-0 py-3">Status</th>
                      <th className="border-0 py-3">Usage Count</th>
                      <th className="border-0 py-3">Last Modified</th>
                      <th className="border-0 py-3">Created By</th>
                      <th className="border-0 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTemplates.map((template) => (
                      <tr key={template.id}>
                        <td className="py-3 px-4 border-0">
                          <div>
                            <div className={`fw-medium mb-1 ${darkMode ? "text-white" : "text-dark"}`}>
                              {template.name}
                            </div>
                            <div className="small text-muted">{template.description}</div>
                          </div>
                        </td>
                        <td className="py-3 border-0">
                          <Badge bg="light" text="dark" className="px-2 py-1 badge-enhanced">
                            {template.category}
                          </Badge>
                        </td>
                        <td className="py-3 border-0">{getStatusBadge(template.status)}</td>
                        <td className="py-3 border-0">
                          <span className={darkMode ? "text-white" : "text-dark"}>{template.usageCount}</span>
                        </td>
                        <td className="py-3 border-0">
                          <span className={darkMode ? "text-white" : "text-dark"}>{template.lastModified}</span>
                        </td>
                        <td className="py-3 border-0">
                          <span className={darkMode ? "text-white" : "text-dark"}>{template.createdBy}</span>
                        </td>
                        <td className="py-3 text-center border-0">
                          <div className="btn-group btn-group-sm">
                            <Button variant="outline-primary" size="sm" className="btn-enhanced">
                              <MdPreview size={14} />
                            </Button>
                            <Button variant="outline-secondary" size="sm" className="btn-enhanced">
                              <MdEdit size={14} />
                            </Button>
                            <Button variant="outline-info" size="sm" className="btn-enhanced">
                              <MdContentCopy size={14} />
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              className="btn-enhanced"
                              onClick={() => handleDelete(template)}
                            >
                              <MdDelete size={14} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              <div className="p-3 border-top">
                <Pagination
                  current={pagination.page}
                  total={filteredTemplates.length}
                  limit={pagination.limit}
                  onChange={(page) => setPagination((prev) => ({ ...prev, page }))}
                  darkMode={darkMode}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered className="modal-enhanced">
        <Modal.Header closeButton>
          <Modal.Title className={darkMode ? "text-white" : "text-dark"}>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete "{selectedTemplate?.name}"? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)} className="btn-enhanced">
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete} className="btn-enhanced">
            Delete Template
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default EmailTemplates
