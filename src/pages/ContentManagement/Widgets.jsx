// src\pages\ContentManagement\Widgets.jsx

"use client"

import { useState, useEffect } from "react"
import { 
  Container, Row, Col, Card, Table, Badge, Button, 
  Form, Modal, InputGroup, Spinner 
} from "react-bootstrap"
import { 
  MdAdd, MdEdit, MdDelete, MdSearch, MdRefresh,
  MdWidgets, MdVisibility, MdVisibilityOff 
} from "react-icons/md"
import Pagination from "./components/Pagination/Pagination.jsx"
import TableControls from "./components/TableControls/TableControls.jsx"

const Widgets = ({ darkMode }) => {
  // State for widgets data
  const [widgets, setWidgets] = useState([])
  const [loading, setLoading] = useState(true)
  
  // State for CRUD operations
  const [showModal, setShowModal] = useState(false)
  const [currentWidget, setCurrentWidget] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  
  // State for table controls
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 })

  // Status options for filter
  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'draft', label: 'Draft' }
  ]

  // Fetch widgets data
  useEffect(() => {
    const fetchWidgets = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const dummyWidgets = [
          {
            id: 1,
            name: "Survey Stats",
            description: "Displays survey statistics and completion rates",
            status: "active",
            position: "dashboard",
            visibility: true,
            createdAt: "2024-01-15"
          },
          {
            id: 2,
            name: "Recent Responses",
            description: "Shows most recent survey responses",
            status: "active",
            position: "dashboard",
            visibility: true,
            createdAt: "2024-01-14"
          },
          {
            id: 3,
            name: "Response Map",
            description: "Geographical distribution of responses",
            status: "inactive",
            position: "analytics",
            visibility: false,
            createdAt: "2024-01-10"
          },
          // Add more widgets as needed
        ]
        
        setWidgets(dummyWidgets)
        setPagination(prev => ({ ...prev, total: dummyWidgets.length }))
      } catch (error) {
        console.error("Error fetching widgets:", error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchWidgets()
  }, [])

  // Filter widgets based on search and status
  const filteredWidgets = widgets.filter(widget => {
    const matchesSearch = 
      widget.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      widget.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || widget.status === filterStatus
    return matchesSearch && matchesStatus
  })

  // Paginate widgets
  const paginatedWidgets = filteredWidgets.slice(
    (pagination.page - 1) * pagination.limit,
    pagination.page * pagination.limit
  )

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setCurrentWidget(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (isEditing) {
      // Update existing widget
      setWidgets(widgets.map(w => 
        w.id === currentWidget.id ? currentWidget : w
      ))
    } else {
      // Add new widget
      const newWidget = {
        ...currentWidget,
        id: Date.now(),
        createdAt: new Date().toISOString().split('T')[0]
      }
      setWidgets([...widgets, newWidget])
      setPagination(prev => ({ ...prev, total: prev.total + 1 }))
    }
    
    setShowModal(false)
  }

  // Handle edit action
  const handleEdit = (widget) => {
    setCurrentWidget(widget)
    setIsEditing(true)
    setShowModal(true)
  }

  // Handle delete action
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this widget?")) {
      setWidgets(widgets.filter(w => w.id !== id))
      setPagination(prev => ({ ...prev, total: prev.total - 1 }))
    }
  }

  // Toggle widget visibility
  const toggleVisibility = (id) => {
    setWidgets(widgets.map(w => 
      w.id === id ? { ...w, visibility: !w.visibility } : w
    ))
  }

  // Get status badge variant
  const getStatusBadge = (status) => {
    const variants = {
      active: "success",
      inactive: "danger",
      draft: "warning"
    }
    return variants[status] || "secondary"
  }

  if (loading) {
    return (
      <Container fluid className="py-4 d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    )
  }

  return (
    <Container fluid className={`py-4 ${darkMode ? "bg-dark" : ""}`}>
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className={`h3 mb-1 ${darkMode ? "text-light" : ""}`}>
                <MdWidgets className="me-2" /> Widget Management
              </h1>
              <p className={`text-muted mb-0 ${darkMode ? "text-light" : ""}`}>
                Create and manage dashboard widgets
              </p>
            </div>
            <Button 
              variant="primary" 
              onClick={() => {
                setCurrentWidget({
                  name: "",
                  description: "",
                  status: "active",
                  position: "dashboard",
                  visibility: true
                })
                setIsEditing(false)
                setShowModal(true)
              }}
            >
              <MdAdd className="me-2" /> Add Widget
            </Button>
          </div>
        </Col>
      </Row>

      {/* Table Controls */}
      <TableControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterOptions={statusOptions}
        selectedFilter={filterStatus}
        setSelectedFilter={setFilterStatus}
        onRefresh={() => window.location.reload()}
        darkMode={darkMode}
        placeholder="Search widgets..."
      />

      {/* Widgets Table */}
      <Card className={`border-0 shadow-sm ${darkMode ? "bg-dark" : ""}`}>
        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table hover className={`mb-0 ${darkMode ? "table-dark" : ""}`}>
              <thead className={darkMode ? "table-dark" : "table-light"}>
                <tr>
                  <th className={darkMode ? "text-light" : ""}>Name</th>
                  <th className={darkMode ? "text-light" : ""}>Description</th>
                  <th className={darkMode ? "text-light" : ""}>Status</th>
                  <th className={darkMode ? "text-light" : ""}>Position</th>
                  <th className={darkMode ? "text-light" : ""}>Visibility</th>
                  <th className={darkMode ? "text-light" : ""}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedWidgets.map(widget => (
                  <tr key={widget.id}>
                    <td className={darkMode ? "text-light" : ""}>
                      <div className="fw-medium">{widget.name}</div>
                      <small className={darkMode ? "text-light" : "text-muted"}>
                        Created: {widget.createdAt}
                      </small>
                    </td>
                    <td className={darkMode ? "text-light" : ""}>
                      <div className="text-truncate" style={{ maxWidth: '300px' }}>
                        {widget.description}
                      </div>
                    </td>
                    <td>
                      <Badge bg={getStatusBadge(widget.status)} className="text-capitalize">
                        {widget.status}
                      </Badge>
                    </td>
                    <td className={darkMode ? "text-light" : ""}>
                      <Badge bg="info" className="text-capitalize">
                        {widget.position}
                      </Badge>
                    </td>
                    <td>
                      <Button 
                        variant={widget.visibility ? "outline-success" : "outline-secondary"}
                        size="sm"
                        onClick={() => toggleVisibility(widget.id)}
                      >
                        {widget.visibility ? (
                          <MdVisibility className="me-1" />
                        ) : (
                          <MdVisibilityOff className="me-1" />
                        )}
                        {widget.visibility ? "Visible" : "Hidden"}
                      </Button>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button 
                          variant="outline-primary" 
                          size="sm"
                          onClick={() => handleEdit(widget)}
                        >
                          <MdEdit />
                        </Button>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => handleDelete(widget.id)}
                        >
                          <MdDelete />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="p-3 border-top">
            <Pagination
              current={pagination.page}
              total={filteredWidgets.length}
              limit={pagination.limit}
              onChange={(page) => setPagination(prev => ({ ...prev, page }))}
              darkMode={darkMode}
            />
          </div>
        </Card.Body>
      </Card>

      {/* Add/Edit Widget Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header 
          closeButton 
          className={darkMode ? "bg-dark border-dark text-light" : ""}
        >
          <Modal.Title>
            {isEditing ? "Edit Widget" : "Add New Widget"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={darkMode ? "bg-dark text-light" : ""}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Widget Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={currentWidget?.name || ""}
                onChange={handleInputChange}
                required
                className={darkMode ? "bg-dark border-dark text-light" : ""}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={currentWidget?.description || ""}
                onChange={handleInputChange}
                className={darkMode ? "bg-dark border-dark text-light" : ""}
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={currentWidget?.status || "active"}
                    onChange={handleInputChange}
                    className={darkMode ? "bg-dark border-dark text-light" : ""}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="draft">Draft</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Position</Form.Label>
                  <Form.Select
                    name="position"
                    value={currentWidget?.position || "dashboard"}
                    onChange={handleInputChange}
                    className={darkMode ? "bg-dark border-dark text-light" : ""}
                  >
                    <option value="dashboard">Dashboard</option>
                    <option value="analytics">Analytics</option>
                    <option value="sidebar">Sidebar</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Visible"
                name="visibility"
                checked={currentWidget?.visibility || false}
                onChange={handleInputChange}
                className={darkMode ? "text-light" : ""}
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button 
                variant="secondary" 
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                type="submit"
              >
                {isEditing ? "Update Widget" : "Add Widget"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  )
}

export default Widgets