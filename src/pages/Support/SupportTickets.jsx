// src\pages\Support\SupportTickets.jsx

"use client"

import { useState, useEffect } from "react"
import { Container, Row, Col, Card, Table, Badge, Button, Form, InputGroup, Modal, Dropdown } from "react-bootstrap"
import {
  MdSupport,
  MdAdd,
  MdSearch,
  MdFilterList,
  MdMoreVert,
  MdEdit,
  MdDelete,
  MdRefresh,
  MdReply,
  MdAssignment,
  MdPriorityHigh,
  MdPerson,
  MdSchedule,
  MdCheckCircle,
} from "react-icons/md"
import Pagination from "../../components/Pagination/Pagination.jsx"

const SupportTickets = ({ darkMode }) => {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [pagination, setPagination] = useState({ page: 1, limit: 3, total: 0 })

  useEffect(() => {
    setTimeout(() => {
      const allTickets = [
        {
          id: 1,
          ticketNumber: "TKT-2024-001",
          subject: "Unable to access survey dashboard",
          description: "User cannot log into the survey dashboard after password reset",
          status: "Open",
          priority: "High",
          category: "Technical",
          submittedBy: "john.doe@company.com",
          assignedTo: "Support Team",
          createdDate: "2024-01-20 14:30",
          lastUpdated: "2024-01-20 16:45",
          responseTime: "2h 15m",
        },
        {
          id: 2,
          ticketNumber: "TKT-2024-002",
          subject: "Survey responses not saving",
          description: "Survey responses are not being saved when users submit the form",
          status: "In Progress",
          priority: "Critical",
          category: "Bug",
          submittedBy: "jane.smith@company.com",
          assignedTo: "Dev Team",
          createdDate: "2024-01-20 10:15",
          lastUpdated: "2024-01-20 15:30",
          responseTime: "5h 15m",
        },
        {
          id: 3,
          ticketNumber: "TKT-2024-003",
          subject: "Request for custom survey template",
          description: "Need a custom template for employee satisfaction survey",
          status: "Resolved",
          priority: "Medium",
          category: "Feature Request",
          submittedBy: "hr@company.com",
          assignedTo: "Design Team",
          createdDate: "2024-01-19 09:30",
          lastUpdated: "2024-01-20 11:20",
          responseTime: "1d 2h",
        },
        {
          id: 4,
          ticketNumber: "TKT-2024-004",
          subject: "Email notifications not working",
          description: "Survey invitation emails are not being sent to participants",
          status: "Open",
          priority: "High",
          category: "Technical",
          submittedBy: "marketing@company.com",
          assignedTo: "Support Team",
          createdDate: "2024-01-19 16:45",
          lastUpdated: "2024-01-19 17:30",
          responseTime: "45m",
        },
        {
          id: 5,
          ticketNumber: "TKT-2024-005",
          subject: "Data export functionality issue",
          description: "Cannot export survey results to Excel format",
          status: "Closed",
          priority: "Low",
          category: "Bug",
          submittedBy: "analytics@company.com",
          assignedTo: "Dev Team",
          createdDate: "2024-01-18 14:20",
          lastUpdated: "2024-01-19 10:15",
          responseTime: "19h 55m",
        },
        {
          id: 6,
          ticketNumber: "TKT-2024-006",
          subject: "Account access permission request",
          description: "Request for admin access to survey management system",
          status: "Pending",
          priority: "Medium",
          category: "Access Request",
          submittedBy: "manager@company.com",
          assignedTo: "Admin Team",
          createdDate: "2024-01-18 11:30",
          lastUpdated: "2024-01-18 12:45",
          responseTime: "1h 15m",
        },
        {
          id: 7,
          ticketNumber: "TKT-2024-007",
          subject: "Survey link not working on mobile",
          description: "Survey link redirects to error page when accessed from mobile devices",
          status: "In Progress",
          priority: "High",
          category: "Bug",
          submittedBy: "mobile.user@company.com",
          assignedTo: "Dev Team",
          createdDate: "2024-01-17 13:15",
          lastUpdated: "2024-01-18 09:30",
          responseTime: "20h 15m",
        },
        {
          id: 8,
          ticketNumber: "TKT-2024-008",
          subject: "Training request for new features",
          description: "Request for training session on new survey analytics features",
          status: "Scheduled",
          priority: "Low",
          category: "Training",
          submittedBy: "training@company.com",
          assignedTo: "Training Team",
          createdDate: "2024-01-16 10:45",
          lastUpdated: "2024-01-17 14:20",
          responseTime: "1d 3h 35m",
        },
      ]
      setTickets(allTickets)
      setPagination((prev) => ({ ...prev, total: allTickets.length }))
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusBadge = (status) => {
    const variants = {
      Open: "danger",
      "In Progress": "warning",
      Resolved: "success",
      Closed: "secondary",
      Pending: "info",
      Scheduled: "primary",
    }
    return (
      <Badge bg={variants[status] || "secondary"} className="badge-enhanced">
        {status}
      </Badge>
    )
  }

  const getPriorityBadge = (priority) => {
    const variants = {
      Critical: "danger",
      High: "warning",
      Medium: "info",
      Low: "secondary",
    }
    return (
      <Badge bg={variants[priority] || "secondary"} className="badge-enhanced">
        {priority === "Critical" && <MdPriorityHigh className="me-1" size={14} />}
        {priority}
      </Badge>
    )
  }

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter =
      filterStatus === "all" || ticket.status.toLowerCase().replace(" ", "").includes(filterStatus.toLowerCase())
    return matchesSearch && matchesFilter
  })

  const currentTickets = filteredTickets.slice(
    (pagination.page - 1) * pagination.limit,
    pagination.page * pagination.limit,
  )

  const handleDelete = (ticket) => {
    setSelectedTicket(ticket)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    setTickets(tickets.filter((t) => t.id !== selectedTicket.id))
    setShowDeleteModal(false)
    setSelectedTicket(null)
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
    <Container fluid className="support-tickets-container py-4 fade-in">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div className="d-flex align-items-center">
              <MdSupport size={32} className="text-primary me-3" />
              <div>
                <h2 className={`mb-1 ${darkMode ? "text-white" : "text-dark"}`}>Support Tickets</h2>
                <p className="text-muted mb-0">Manage customer support requests and issues</p>
              </div>
            </div>
            <div className="d-flex gap-2 mt-2 mt-md-0">
              <Button variant="outline-primary" size="sm" className="btn-enhanced">
                <MdRefresh className="me-1" />
                Refresh
              </Button>
              <Button variant="primary" size="sm" className="btn-enhanced">
                <MdAdd className="me-1" />
                Create Ticket
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
                  <div className={`text-muted small mb-1 ${darkMode ? "text-light" : ""}`}>Total Tickets</div>
                  <div className={`h4 mb-0 fw-bold ${darkMode ? "text-white" : "text-dark"}`}>{tickets.length}</div>
                </div>
                <MdSupport size={24} style={{ color: "var(--primary-color)" }} />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} lg={3} className="mb-3">
          <Card
            className="stat-card border-0 shadow-sm card-enhanced"
            style={{ borderLeft: "4px solid var(--danger-color)" }}
          >
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <div className={`text-muted small mb-1 ${darkMode ? "text-light" : ""}`}>Open Tickets</div>
                  <div className={`h4 mb-0 fw-bold ${darkMode ? "text-white" : "text-dark"}`}>
                    {tickets.filter((t) => t.status === "Open").length}
                  </div>
                </div>
                <MdAssignment size={24} style={{ color: "var(--danger-color)" }} />
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
                  <div className={`text-muted small mb-1 ${darkMode ? "text-light" : ""}`}>In Progress</div>
                  <div className={`h4 mb-0 fw-bold ${darkMode ? "text-white" : "text-dark"}`}>
                    {tickets.filter((t) => t.status === "In Progress").length}
                  </div>
                </div>
                <MdSchedule size={24} style={{ color: "var(--warning-color)" }} />
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
                  <div className={`text-muted small mb-1 ${darkMode ? "text-light" : ""}`}>Resolved</div>
                  <div className={`h4 mb-0 fw-bold ${darkMode ? "text-white" : "text-dark"}`}>
                    {tickets.filter((t) => t.status === "Resolved").length}
                  </div>
                </div>
                <MdCheckCircle size={24} style={{ color: "var(--success-color)" }} />
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
                      placeholder="Search tickets..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </InputGroup>
                </Col>
                <Col md={3} lg={2} className="mb-2 mb-md-0">
                  <Form.Select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="form-enhanced"
                  >
                    <option value="all">All Status</option>
                    <option value="open">Open</option>
                    <option value="inprogress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                    <option value="pending">Pending</option>
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

      {/* Tickets Table */}
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
                          <MdSupport className="me-2" size={16} />
                          Ticket Details
                        </div>
                      </th>
                      <th className="border-0 py-3">Status</th>
                      <th className="border-0 py-3">Priority</th>
                      <th className="border-0 py-3">
                        <div className="d-flex align-items-center">
                          <MdPerson className="me-2" size={16} />
                          Assigned To
                        </div>
                      </th>
                      <th className="border-0 py-3">Response Time</th>
                      <th className="border-0 py-3">Last Updated</th>
                      <th className="border-0 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTickets.map((ticket) => (
                      <tr key={ticket.id}>
                        <td className="py-3 px-4 border-0">
                          <div>
                            <div className={`fw-medium mb-1 ${darkMode ? "text-white" : "text-dark"}`}>
                              {ticket.ticketNumber}
                            </div>
                            <div className={`mb-1 ${darkMode ? "text-white" : "text-dark"}`}>{ticket.subject}</div>
                            <div className="small text-muted">{ticket.submittedBy}</div>
                          </div>
                        </td>
                        <td className="py-3 border-0">{getStatusBadge(ticket.status)}</td>
                        <td className="py-3 border-0">{getPriorityBadge(ticket.priority)}</td>
                        <td className="py-3 border-0">
                          <span className={darkMode ? "text-white" : "text-dark"}>{ticket.assignedTo}</span>
                        </td>
                        <td className="py-3 border-0">
                          <span className={darkMode ? "text-white" : "text-dark"}>{ticket.responseTime}</span>
                        </td>
                        <td className="py-3 border-0">
                          <span className={darkMode ? "text-white" : "text-dark"}>{ticket.lastUpdated}</span>
                        </td>
                        <td className="py-3 text-center border-0">
                          <Dropdown align="end">
                            <Dropdown.Toggle
                              variant="link"
                              className="p-0 border-0"
                              style={{ color: darkMode ? "var(--dark-text)" : "var(--light-text)" }}
                            >
                              <MdMoreVert />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item className="d-flex align-items-center">
                                <MdReply className="me-2" />
                                Reply
                              </Dropdown.Item>
                              <Dropdown.Item className="d-flex align-items-center">
                                <MdEdit className="me-2" />
                                Edit
                              </Dropdown.Item>
                              <Dropdown.Item className="d-flex align-items-center">
                                <MdAssignment className="me-2" />
                                Assign
                              </Dropdown.Item>
                              <Dropdown.Divider />
                              <Dropdown.Item
                                className="d-flex align-items-center text-danger"
                                onClick={() => handleDelete(ticket)}
                              >
                                <MdDelete className="me-2" />
                                Delete
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              <div className="p-3 border-top">
                <Pagination
                  current={pagination.page}
                  total={filteredTickets.length}
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
          Are you sure you want to delete ticket "{selectedTicket?.ticketNumber}"? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)} className="btn-enhanced">
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete} className="btn-enhanced">
            Delete Ticket
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default SupportTickets
