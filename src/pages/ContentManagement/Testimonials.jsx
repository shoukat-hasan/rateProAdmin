// src\pages\ContentManagement\Testimonials.jsx

"use client"

import { useState, useEffect } from "react"
import {
  Container, Row, Col, Card, Table, Badge, Button,
  Form, Modal, InputGroup, Spinner, Alert, Image
} from "react-bootstrap"
import {
  MdAdd, MdEdit, MdDelete, MdSearch, MdRefresh,
  MdStar, MdOutlinePerson, MdCheck, MdClose
} from "react-icons/md"
import Pagination from "./components/Pagination/Pagination.jsx"
import TableControls from "./components/TableControls/TableControls.jsx"

const Testimonial = ({ darkMode }) => {
  // State for testimonials data
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // State for CRUD operations
  const [showModal, setShowModal] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  // State for table controls
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRating, setFilterRating] = useState("all")
  const [pagination, setPagination] = useState({ page: 1, limit: 1, total: 0 })

  // Rating options for filter
  const ratingOptions = [
    { value: '5', label: '5 Stars' },
    { value: '4', label: '4 Stars' },
    { value: '3', label: '3 Stars' },
    { value: '2', label: '2 Stars' },
    { value: '1', label: '1 Star' }
  ]

  // Fetch testimonials data
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))

        const dummyTestimonials = [
          {
            id: 1,
            name: "John Doe",
            role: "CEO, TechCorp",
            content: "This product transformed our business operations completely!",
            rating: 5,
            avatar: "",
            isApproved: true,
            createdAt: "2024-01-15"
          },
          {
            id: 2,
            name: "Jane Smith",
            role: "Marketing Director",
            content: "Excellent customer support and reliable service.",
            rating: 4,
            avatar: "",
            isApproved: true,
            createdAt: "2024-01-14"
          },
          {
            id: 3,
            name: "Robert Johnson",
            role: "Small Business Owner",
            content: "Good value for money, but could use some improvements.",
            rating: 3,
            avatar: "",
            isApproved: false,
            createdAt: "2024-01-10"
          },
        ]

        setTestimonials(dummyTestimonials)
        setPagination(prev => ({ ...prev, total: dummyTestimonials.length }))
      } catch (error) {
        setError("Failed to load testimonials. Please try again later.")
        console.error("Error fetching testimonials:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  // Filter testimonials based on search and rating
  const filteredTestimonials = testimonials.filter(testimonial => {
    const matchesSearch =
      testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRating = filterRating === "all" || testimonial.rating.toString() === filterRating
    return matchesSearch && matchesRating
  })

  // Paginate testimonials
  const paginatedTestimonials = filteredTestimonials.slice(
    (pagination.page - 1) * pagination.limit,
    pagination.page * pagination.limit
  )

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setCurrentTestimonial(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    if (isEditing) {
      // Update existing testimonial
      setTestimonials(testimonials.map(t =>
        t.id === currentTestimonial.id ? currentTestimonial : t
      ))
    } else {
      // Add new testimonial
      const newTestimonial = {
        ...currentTestimonial,
        id: Date.now(),
        createdAt: new Date().toISOString().split('T')[0]
      }
      setTestimonials([...testimonials, newTestimonial])
      setPagination(prev => ({ ...prev, total: prev.total + 1 }))
    }

    setShowModal(false)
  }

  // Handle edit action
  const handleEdit = (testimonial) => {
    setCurrentTestimonial(testimonial)
    setIsEditing(true)
    setShowModal(true)
  }

  // Handle delete action
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      setTestimonials(testimonials.filter(t => t.id !== id))
      setPagination(prev => ({ ...prev, total: prev.total - 1 }))
    }
  }

  // Toggle approval status
  const toggleApproval = (id) => {
    setTestimonials(testimonials.map(t =>
      t.id === id ? { ...t, isApproved: !t.isApproved } : t
    ))
  }

  // Render star rating
  const renderStars = (rating) => {
    return (
      <div className="d-flex">
        {[...Array(5)].map((_, i) => (
          <MdStar
            key={i}
            color={i < rating ? "#ffc107" : "#e4e5e9"}
            size={20}
          />
        ))}
      </div>
    )
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
                <MdOutlinePerson className="me-2" /> Testimonial Management
              </h1>
              <p className={`text-muted mb-0 ${darkMode ? "text-light" : ""}`}>
                Manage customer testimonials and reviews
              </p>
            </div>
            <Button
              variant="primary"
              onClick={() => {
                setCurrentTestimonial({
                  name: "",
                  role: "",
                  content: "",
                  rating: 5,
                  avatar: "",
                  isApproved: true
                })
                setIsEditing(false)
                setShowModal(true)
              }}
            >
              <MdAdd className="me-2" /> Add Testimonial
            </Button>
          </div>
        </Col>
      </Row>

      {/* Table Controls */}
      <TableControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterOptions={ratingOptions}
        selectedFilter={filterRating}
        setSelectedFilter={setFilterRating}
        onRefresh={() => window.location.reload()}
        darkMode={darkMode}
        placeholder="Search testimonials by name or content..."
      />

      {/* Testimonials Table */}
      <Row>
        <Col>
          <Card className={darkMode ? "bg-dark text-light" : ""}>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table striped bordered hover variant={darkMode ? "dark" : ""} className="mb-0">
                  <thead>
                    <tr>
                      <th style={{ color: "white" }} >Avatar</th>
                      <th style={{ color: "white" }} >Name</th>
                      <th style={{ color: "white" }} >Role</th>
                      <th style={{ color: "white" }} >Content</th>
                      <th style={{ color: "white" }} >Rating</th>
                      <th style={{ color: "white" }} >Status</th>
                      <th style={{ color: "white" }} >Created</th>
                      <th style={{ color: "white" }} >Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedTestimonials.length > 0 ? (
                      paginatedTestimonials.map(testimonial => (
                        <tr key={testimonial.id}>
                          <td>
                            {testimonial.avatar ? (
                              <Image
                                src={testimonial.avatar}
                                roundedCircle
                                width={40}
                                height={40}
                                alt={testimonial.name}
                              />
                            ) : (
                              <div className="bg-secondary rounded-circle d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}>
                                <MdOutlinePerson size={20} color="white" />
                              </div>
                            )}
                          </td>
                          <td>{testimonial.name}</td>
                          <td>{testimonial.role}</td>
                          <td>
                            <div className="text-truncate" style={{ maxWidth: '200px' }}>
                              {testimonial.content}
                            </div>
                          </td>
                          <td>{renderStars(testimonial.rating)}</td>
                          <td>
                            <Badge bg={testimonial.isApproved ? "success" : "warning"}>
                              {testimonial.isApproved ? "Approved" : "Pending"}
                            </Badge>
                          </td>
                          <td>{testimonial.createdAt}</td>
                          <td>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              className="me-2"
                              onClick={() => handleEdit(testimonial)}
                            >
                              <MdEdit />
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => handleDelete(testimonial.id)}
                            >
                              <MdDelete />
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center py-4">
                          No testimonials found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
            <Card.Footer className={`${darkMode ? "bg-dark border-top border-secondary" : ""}`}>
              <Pagination
                current={pagination.page}
                total={filteredTestimonials.length}
                limit={pagination.limit}
                onChange={(page) => setPagination((prev) => ({ ...prev, page }))}
                darkMode={darkMode}
              />
            </Card.Footer>
          </Card>
        </Col>
      </Row>

      {/* Add/Edit Testimonial Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className={darkMode ? "bg-dark text-light" : ""}>
          <Modal.Title>{isEditing ? "Edit Testimonial" : "Add New Testimonial"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body className={darkMode ? "bg-dark text-light" : ""}>
            {currentTestimonial && (
              <>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={currentTestimonial.name}
                        onChange={handleInputChange}
                        required
                        className={darkMode ? "bg-dark text-light" : ""}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Role/Position</Form.Label>
                      <Form.Control
                        type="text"
                        name="role"
                        value={currentTestimonial.role}
                        onChange={handleInputChange}
                        className={darkMode ? "bg-dark text-light" : ""}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Testimonial Content</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="content"
                    value={currentTestimonial.content}
                    onChange={handleInputChange}
                    required
                    className={darkMode ? "bg-dark text-light" : ""}
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Rating</Form.Label>
                      <Form.Select
                        name="rating"
                        value={currentTestimonial.rating}
                        onChange={handleInputChange}
                        className={darkMode ? "bg-dark text-light" : ""}
                      >
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="2">2 Stars</option>
                        <option value="1">1 Star</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Avatar URL</Form.Label>
                      <Form.Control
                        type="text"
                        name="avatar"
                        value={currentTestimonial.avatar}
                        onChange={handleInputChange}
                        placeholder="Optional image URL"
                        className={darkMode ? "bg-dark text-light" : ""}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="isApproved"
                    name="isApproved"
                    label="Approved"
                    checked={currentTestimonial.isApproved}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </>
            )}
          </Modal.Body>
          <Modal.Footer className={darkMode ? "bg-dark border-top border-secondary" : ""}>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {isEditing ? "Update Testimonial" : "Add Testimonial"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  )
}

export default Testimonial