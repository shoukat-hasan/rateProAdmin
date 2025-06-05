// src\pages\Audiences\AudienceSegmentation.jsx

"use client"

import { useState } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Badge,
  Button,
  Form,
  Modal,
  InputGroup,
  Pagination,
  Dropdown,
} from "react-bootstrap"

const ContactManagement = () => {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      company: "Acme Corp",
      segment: "High-Value Customers",
      status: "Active",
      lastActivity: "2024-01-15",
      tags: ["VIP", "Enterprise"],
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@company.com",
      phone: "+1 (555) 987-6543",
      company: "Tech Solutions",
      segment: "New Users",
      status: "Active",
      lastActivity: "2024-01-14",
      tags: ["New"],
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@startup.io",
      phone: "+1 (555) 456-7890",
      company: "Startup Inc",
      segment: "Inactive Users",
      status: "Inactive",
      lastActivity: "2023-12-01",
      tags: ["Startup"],
    },
  ])

  const [showModal, setShowModal] = useState(false)
  const [showImportModal, setShowImportModal] = useState(false)
  const [currentContact, setCurrentContact] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    segment: "",
    tags: [],
  })

  const [searchTerm, setSearchTerm] = useState("")
  const [filterSegment, setFilterSegment] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedContacts, setSelectedContacts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  const segments = ["High-Value Customers", "New Users", "Inactive Users", "Enterprise", "SMB"]

  const getStatusBadge = (status) => {
    const variants = {
      Active: "success",
      Inactive: "secondary",
      Blocked: "danger",
    }
    return <Badge bg={variants[status] || "secondary"}>{status}</Badge>
  }

  const handleCreateContact = () => {
    setCurrentContact({ name: "", email: "", phone: "", company: "", segment: "", tags: [] })
    setShowModal(true)
  }

  const handleSaveContact = () => {
    if (currentContact.name.trim() && currentContact.email.trim()) {
      const newContact = {
        ...currentContact,
        id: Date.now(),
        status: "Active",
        lastActivity: new Date().toISOString().split("T")[0],
      }
      setContacts([...contacts, newContact])
      setShowModal(false)
    }
  }

  const deleteContact = (id) => {
    setContacts(contacts.filter((c) => c.id !== id))
  }

  const handleSelectContact = (id) => {
    setSelectedContacts((prev) => (prev.includes(id) ? prev.filter((contactId) => contactId !== id) : [...prev, id]))
  }

  const handleSelectAll = () => {
    if (selectedContacts.length === filteredContacts.length) {
      setSelectedContacts([])
    } else {
      setSelectedContacts(filteredContacts.map((c) => c.id))
    }
  }

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSegment = filterSegment === "all" || contact.segment === filterSegment
    const matchesStatus = filterStatus === "all" || contact.status.toLowerCase() === filterStatus
    return matchesSearch && matchesSegment && matchesStatus
  })

  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentContacts = filteredContacts.slice(startIndex, startIndex + itemsPerPage)

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="h3 mb-0">Contact Management</h1>
              <p className="text-muted">Manage your survey contacts and audience lists</p>
            </div>
            <div className="d-flex gap-2">
              <Button variant="outline-primary" onClick={() => setShowImportModal(true)}>
                <i className="fas fa-upload me-2"></i>
                Import
              </Button>
              <Button variant="primary" onClick={handleCreateContact}>
                <i className="fas fa-plus me-2"></i>
                Add Contact
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      {/* Filters */}
      <Row className="mb-4">
        <Col lg={4}>
          <InputGroup>
            <InputGroup.Text>
              <i className="fas fa-search"></i>
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col lg={3}>
          <Form.Select value={filterSegment} onChange={(e) => setFilterSegment(e.target.value)}>
            <option value="all">All Segments</option>
            {segments.map((segment) => (
              <option key={segment} value={segment}>
                {segment}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col lg={3}>
          <Form.Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="blocked">Blocked</option>
          </Form.Select>
        </Col>
        <Col lg={2}>
          {selectedContacts.length > 0 && (
            <Dropdown>
              <Dropdown.Toggle variant="outline-secondary" className="w-100">
                Actions ({selectedContacts.length})
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <i className="fas fa-envelope me-2"></i>
                  Send Survey
                </Dropdown.Item>
                <Dropdown.Item>
                  <i className="fas fa-tags me-2"></i>
                  Add Tags
                </Dropdown.Item>
                <Dropdown.Item>
                  <i className="fas fa-layer-group me-2"></i>
                  Add to Segment
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item className="text-danger">
                  <i className="fas fa-trash me-2"></i>
                  Delete Selected
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Col>
      </Row>

      {/* Contacts Table */}
      <Row>
        <Col>
          <Card>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table className="mb-0" hover>
                  <thead className="table-light">
                    <tr>
                      <th>
                        <Form.Check
                          type="checkbox"
                          checked={selectedContacts.length === filteredContacts.length && filteredContacts.length > 0}
                          onChange={handleSelectAll}
                        />
                      </th>
                      <th>Name</th>
                      <th>Email</th>
                      <th className="d-none d-md-table-cell">Phone</th>
                      <th className="d-none d-lg-table-cell">Company</th>
                      <th>Segment</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentContacts.map((contact) => (
                      <tr key={contact.id}>
                        <td>
                          <Form.Check
                            type="checkbox"
                            checked={selectedContacts.includes(contact.id)}
                            onChange={() => handleSelectContact(contact.id)}
                          />
                        </td>
                        <td>
                          <div className="fw-medium">{contact.name}</div>
                          <div className="d-flex gap-1 mt-1">
                            {contact.tags.map((tag) => (
                              <Badge key={tag} bg="secondary" className="small">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td>{contact.email}</td>
                        <td className="d-none d-md-table-cell">{contact.phone}</td>
                        <td className="d-none d-lg-table-cell">{contact.company}</td>
                        <td>
                          <Badge bg="info" className="small">
                            {contact.segment}
                          </Badge>
                        </td>
                        <td>{getStatusBadge(contact.status)}</td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <Button variant="outline-primary" size="sm" title="View">
                              <i className="fas fa-eye"></i>
                            </Button>
                            <Button variant="outline-secondary" size="sm" title="Edit">
                              <i className="fas fa-edit"></i>
                            </Button>
                            <Button variant="outline-info" size="sm" title="Send Survey">
                              <i className="fas fa-envelope"></i>
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              title="Delete"
                              onClick={() => deleteContact(contact.id)}
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
                  Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredContacts.length)} of{" "}
                  {filteredContacts.length} contacts
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

      {/* Add Contact Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter contact name"
                value={currentContact.name}
                onChange={(e) => setCurrentContact({ ...currentContact, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email address"
                value={currentContact.email}
                onChange={(e) => setCurrentContact({ ...currentContact, email: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter phone number"
                value={currentContact.phone}
                onChange={(e) => setCurrentContact({ ...currentContact, phone: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Company</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter company name"
                value={currentContact.company}
                onChange={(e) => setCurrentContact({ ...currentContact, company: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Segment</Form.Label>
              <Form.Select
                value={currentContact.segment}
                onChange={(e) => setCurrentContact({ ...currentContact, segment: e.target.value })}
              >
                <option value="">Select segment</option>
                {segments.map((segment) => (
                  <option key={segment} value={segment}>
                    {segment}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveContact}>
            Add Contact
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Import Modal */}
      <Modal show={showImportModal} onHide={() => setShowImportModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Import Contacts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center mb-4">
            <i className="fas fa-cloud-upload-alt fa-3x text-muted mb-3"></i>
            <p>Upload a CSV file with your contacts</p>
          </div>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>CSV File</Form.Label>
              <Form.Control type="file" accept=".csv" />
              <Form.Text className="text-muted">
                File should include columns: Name, Email, Phone, Company, Segment
              </Form.Text>
            </Form.Group>
            <div className="d-flex gap-2">
              <Button variant="outline-secondary" size="sm">
                <i className="fas fa-download me-2"></i>
                Download Template
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowImportModal(false)}>
            Cancel
          </Button>
          <Button variant="primary">
            <i className="fas fa-upload me-2"></i>
            Import Contacts
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default ContactManagement
