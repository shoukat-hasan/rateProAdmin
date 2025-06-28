// src/pages/ContentManagement/Features.jsx
"use client"

import { useState, useEffect } from "react"
import { 
  Container, Row, Col, Card, Table, Badge, Button, 
  Form, Modal, InputGroup, Spinner, Alert 
} from "react-bootstrap"
import { 
  MdAdd, MdEdit, MdDelete, MdSearch, MdRefresh,
  MdStar, MdStarOutline, MdLabel, MdCategory 
} from "react-icons/md"
import Pagination from "./components/Pagination/Pagination.jsx"
import TableControls from "./components/TableControls/TableControls.jsx"

const Features = ({ darkMode }) => {
  // State for features data
  const [features, setFeatures] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  
  // State for CRUD operations
  const [showModal, setShowModal] = useState(false)
  const [currentFeature, setCurrentFeature] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  
  // State for table controls
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [pagination, setPagination] = useState({ page: 1, limit: 2, total: 0 })

  // Category options for filter
  const categoryOptions = [
    { value: 'survey', label: 'Survey' },
    { value: 'analytics', label: 'Analytics' },
    { value: 'reporting', label: 'Reporting' },
    { value: 'integration', label: 'Integration' }
  ]

  // Fetch features data
  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const dummyFeatures = [
          {
            id: 1,
            title: "Advanced Survey Builder",
            description: "Create complex surveys with multiple question types",
            category: "survey",
            isPremium: true,
            status: "active",
            icon: "poll",
            createdAt: "2024-01-15"
          },
          {
            id: 2,
            title: "Real-time Analytics",
            description: "View response data as it comes in",
            category: "analytics",
            isPremium: true,
            status: "active",
            icon: "analytics",
            createdAt: "2024-01-14"
          },
          {
            id: 3,
            title: "Basic Reporting",
            description: "Generate simple reports and charts",
            category: "reporting",
            isPremium: false,
            status: "active",
            icon: "insert_chart",
            createdAt: "2024-01-10"
          },
          // Add more features as needed
        ]
        
        setFeatures(dummyFeatures)
        setPagination(prev => ({ ...prev, total: dummyFeatures.length }))
      } catch (error) {
        setError("Failed to load features. Please try again later.")
        console.error("Error fetching features:", error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchFeatures()
  }, [])

  // Filter features based on search and category
  const filteredFeatures = features.filter(feature => {
    const matchesSearch = 
      feature.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      feature.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || feature.category === filterCategory
    return matchesSearch && matchesCategory
  })

  // Paginate features
  const paginatedFeatures = filteredFeatures.slice(
    (pagination.page - 1) * pagination.limit,
    pagination.page * pagination.limit
  )

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setCurrentFeature(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (isEditing) {
      // Update existing feature
      setFeatures(features.map(f => 
        f.id === currentFeature.id ? currentFeature : f
      ))
    } else {
      // Add new feature
      const newFeature = {
        ...currentFeature,
        id: Date.now(),
        createdAt: new Date().toISOString().split('T')[0],
        status: "active"
      }
      setFeatures([...features, newFeature])
      setPagination(prev => ({ ...prev, total: prev.total + 1 }))
    }
    
    setShowModal(false)
  }

  // Handle edit action
  const handleEdit = (feature) => {
    setCurrentFeature(feature)
    setIsEditing(true)
    setShowModal(true)
  }

  // Handle delete action
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this feature?")) {
      setFeatures(features.filter(f => f.id !== id))
      setPagination(prev => ({ ...prev, total: prev.total - 1 }))
    }
  }

  // Toggle premium status
  const togglePremium = (id) => {
    setFeatures(features.map(f => 
      f.id === id ? { ...f, isPremium: !f.isPremium } : f
    ))
  }

  // Get status badge variant
  const getStatusBadge = (status) => {
    const variants = {
      active: "success",
      inactive: "secondary",
      coming_soon: "info"
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

  if (error) {
    return (
      <Container fluid className="py-4">
        <Alert variant="danger">{error}</Alert>
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
                <MdCategory className="me-2" /> Feature Management
              </h1>
              <p className={`text-muted mb-0 ${darkMode ? "text-light" : ""}`}>
                Manage your platform features and offerings
              </p>
            </div>
            <Button 
              variant="primary" 
              onClick={() => {
                setCurrentFeature({
                  title: "",
                  description: "",
                  category: "survey",
                  isPremium: false,
                  icon: "poll"
                })
                setIsEditing(false)
                setShowModal(true)
              }}
            >
              <MdAdd className="me-2" /> Add Feature
            </Button>
          </div>
        </Col>
      </Row>

      {/* Table Controls */}
      <TableControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterOptions={categoryOptions}
        selectedFilter={filterCategory}
        setSelectedFilter={setFilterCategory}
        onRefresh={() => window.location.reload()}
        darkMode={darkMode}
        placeholder="Search features..."
      />

      {/* Features Table */}
      <Card className={`border-0 shadow-sm ${darkMode ? "bg-dark" : ""}`}>
        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table hover className={`mb-0 ${darkMode ? "table-dark" : ""}`}>
              <thead className={darkMode ? "table-dark" : "table-light"}>
                <tr>
                  <th className={darkMode ? "text-light" : ""}>Title</th>
                  <th className={darkMode ? "text-light" : ""}>Description</th>
                  <th className={darkMode ? "text-light" : ""}>Category</th>
                  <th className={darkMode ? "text-light" : ""}>Premium</th>
                  <th className={darkMode ? "text-light" : ""}>Status</th>
                  <th className={darkMode ? "text-light" : ""}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedFeatures.map(feature => (
                  <tr key={feature.id}>
                    <td className={darkMode ? "text-light" : ""}>
                      <div className="fw-medium">
                        <MdLabel className="me-2" />
                        {feature.title}
                      </div>
                      <small className={darkMode ? "text-light" : "text-muted"}>
                        Added: {feature.createdAt}
                      </small>
                    </td>
                    <td className={darkMode ? "text-light" : ""}>
                      <div className="text-truncate" style={{ maxWidth: '300px' }}>
                        {feature.description}
                      </div>
                    </td>
                    <td>
                      <Badge bg="info" className="text-capitalize">
                        {feature.category}
                      </Badge>
                    </td>
                    <td>
                      <Button 
                        variant={feature.isPremium ? "outline-warning" : "outline-secondary"}
                        size="sm"
                        onClick={() => togglePremium(feature.id)}
                      >
                        {feature.isPremium ? (
                          <MdStar className="me-1" />
                        ) : (
                          <MdStarOutline className="me-1" />
                        )}
                        {feature.isPremium ? "Premium" : "Standard"}
                      </Button>
                    </td>
                    <td>
                      <Badge bg={getStatusBadge(feature.status)} className="text-capitalize">
                        {feature.status.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button 
                          variant="outline-primary" 
                          size="sm"
                          onClick={() => handleEdit(feature)}
                        >
                          <MdEdit />
                        </Button>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => handleDelete(feature.id)}
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
              total={filteredFeatures.length}
              limit={pagination.limit}
              onChange={(page) => setPagination(prev => ({ ...prev, page }))}
              darkMode={darkMode}
            />
          </div>
        </Card.Body>
      </Card>

      {/* Add/Edit Feature Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header 
          closeButton 
          className={darkMode ? "bg-dark border-dark text-light" : ""}
        >
          <Modal.Title>
            {isEditing ? "Edit Feature" : "Add New Feature"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={darkMode ? "bg-dark text-light" : ""}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Feature Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={currentFeature?.title || ""}
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
                value={currentFeature?.description || ""}
                onChange={handleInputChange}
                className={darkMode ? "bg-dark border-dark text-light" : ""}
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    name="category"
                    value={currentFeature?.category || "survey"}
                    onChange={handleInputChange}
                    className={darkMode ? "bg-dark border-dark text-light" : ""}
                  >
                    {categoryOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Icon</Form.Label>
                  <Form.Select
                    name="icon"
                    value={currentFeature?.icon || "poll"}
                    onChange={handleInputChange}
                    className={darkMode ? "bg-dark border-dark text-light" : ""}
                  >
                    <option value="poll">Poll</option>
                    <option value="analytics">Analytics</option>
                    <option value="insert_chart">Chart</option>
                    <option value="people">People</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Premium Feature"
                name="isPremium"
                checked={currentFeature?.isPremium || false}
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
                {isEditing ? "Update Feature" : "Add Feature"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  )
}

export default Features