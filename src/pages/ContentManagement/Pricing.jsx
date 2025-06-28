// src\pages\ContentManagement\Pricing.jsx

"use client"

import { useState, useEffect } from "react"
import {
  Container, Row, Col, Card, Table, Badge, Button,
  Form, Modal, InputGroup, Spinner, Alert
} from "react-bootstrap"
import {
  MdAdd, MdEdit, MdDelete, MdSearch, MdRefresh,
  MdAttachMoney, MdCheck, MdClose
} from "react-icons/md"
import Pagination from "./components/Pagination/Pagination.jsx"
import TableControls from "./components/TableControls/TableControls.jsx"

const Pricing = ({ darkMode }) => {
  // State for pricing plans data
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // State for CRUD operations
  const [showModal, setShowModal] = useState(false)
  const [currentPlan, setCurrentPlan] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  // State for table controls
  const [searchTerm, setSearchTerm] = useState("")
  const [filterTier, setFilterTier] = useState("all")
  const [pagination, setPagination] = useState({ page: 1, limit: 1, total: 0 })

  // Tier options for filter
  const tierOptions = [
    { value: 'basic', label: 'Basic' },
    { value: 'standard', label: 'Standard' },
    { value: 'premium', label: 'Premium' },
    { value: 'enterprise', label: 'Enterprise' }
  ]

  // Fetch pricing plans data
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))

        const dummyPlans = [
          {
            id: 1,
            name: "Starter",
            tier: "basic",
            price: 0,
            currency: "USD",
            interval: "month",
            features: ["100 responses/month", "Basic reports"],
            isActive: true,
            isPopular: false,
            createdAt: "2024-01-15"
          },
          {
            id: 2,
            name: "Professional",
            tier: "standard",
            price: 29,
            currency: "USD",
            interval: "month",
            features: ["1000 responses/month", "Advanced reports", "Email support"],
            isActive: true,
            isPopular: true,
            createdAt: "2024-01-14"
          },
          {
            id: 3,
            name: "Business",
            tier: "premium",
            price: 99,
            currency: "USD",
            interval: "month",
            features: ["Unlimited responses", "All reports", "Priority support", "API access"],
            isActive: true,
            isPopular: false,
            createdAt: "2024-01-10"
          },
          // Add more plans as needed
        ]

        setPlans(dummyPlans)
        setPagination(prev => ({ ...prev, total: dummyPlans.length }))
      } catch (error) {
        setError("Failed to load pricing plans. Please try again later.")
        console.error("Error fetching pricing plans:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPlans()
  }, [])

  // Filter plans based on search and tier
  const filteredPlans = plans.filter(plan => {
    const matchesSearch =
      plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.tier.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTier = filterTier === "all" || plan.tier === filterTier
    return matchesSearch && matchesTier
  })

  // Paginate plans
  const paginatedPlans = filteredPlans.slice(
    (pagination.page - 1) * pagination.limit,
    pagination.page * pagination.limit
  )

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setCurrentPlan(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  // Handle feature input changes
  const handleFeatureChange = (index, value) => {
    const newFeatures = [...currentPlan.features]
    newFeatures[index] = value
    setCurrentPlan(prev => ({
      ...prev,
      features: newFeatures
    }))
  }

  // Add new feature field
  const addFeature = () => {
    setCurrentPlan(prev => ({
      ...prev,
      features: [...prev.features, ""]
    }))
  }

  // Remove feature field
  const removeFeature = (index) => {
    const newFeatures = [...currentPlan.features]
    newFeatures.splice(index, 1)
    setCurrentPlan(prev => ({
      ...prev,
      features: newFeatures
    }))
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    if (isEditing) {
      // Update existing plan
      setPlans(plans.map(p =>
        p.id === currentPlan.id ? currentPlan : p
      ))
    } else {
      // Add new plan
      const newPlan = {
        ...currentPlan,
        id: Date.now(),
        createdAt: new Date().toISOString().split('T')[0]
      }
      setPlans([...plans, newPlan])
      setPagination(prev => ({ ...prev, total: prev.total + 1 }))
    }

    setShowModal(false)
  }

  // Handle edit action
  const handleEdit = (plan) => {
    setCurrentPlan(plan)
    setIsEditing(true)
    setShowModal(true)
  }

  // Handle delete action
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this pricing plan?")) {
      setPlans(plans.filter(p => p.id !== id))
      setPagination(prev => ({ ...prev, total: prev.total - 1 }))
    }
  }

  // Toggle plan status
  const toggleStatus = (id) => {
    setPlans(plans.map(p =>
      p.id === id ? { ...p, isActive: !p.isActive } : p
    ))
  }

  // Toggle popular status
  const togglePopular = (id) => {
    setPlans(plans.map(p =>
      p.id === id ? { ...p, isPopular: !p.isPopular } : p
    ))
  }

  // Format price display
  const formatPrice = (plan) => {
    if (plan.price === 0) return "Free"
    return `${plan.currency}${plan.price}/${plan.interval}`
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
                <MdAttachMoney className="me-2" /> Pricing Management
              </h1>
              <p className={`text-muted mb-0 ${darkMode ? "text-light" : ""}`}>
                Configure your pricing plans and tiers
              </p>
            </div>
            <Button
              variant="primary"
              onClick={() => {
                setCurrentPlan({
                  name: "",
                  tier: "basic",
                  price: 0,
                  currency: "USD",
                  interval: "month",
                  features: [""],
                  isActive: true,
                  isPopular: false
                })
                setIsEditing(false)
                setShowModal(true)
              }}
            >
              <MdAdd className="me-2" /> Add Plan
            </Button>
          </div>
        </Col>
      </Row>

      {/* Table Controls */}
      <TableControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterOptions={tierOptions}
        selectedFilter={filterTier}
        setSelectedFilter={setFilterTier}
        onRefresh={() => window.location.reload()}
        darkMode={darkMode}
        placeholder="Search plans by name or tier..."
      />

      {/* Pricing Plans Table */}
      <Row>
        <Col>
          <Card className={darkMode ? "bg-dark text-light" : ""}>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table striped bordered hover variant={darkMode ? "dark" : ""} className="mb-0">
                  <thead  >
                    <tr>
                      <th style={{ color: "white" }}>Name</th>
                      <th style={{ color: "white" }}>Tier</th>
                      <th style={{ color: "white" }}>Price</th>
                      <th style={{ color: "white" }}>Features</th>
                      <th style={{ color: "white" }}>Status</th>
                      <th style={{ color: "white" }}>Popular</th>
                      <th style={{ color: "white" }}>Created</th>
                      <th style={{ color: "white" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedPlans.length > 0 ? (
                      paginatedPlans.map(plan => (
                        <tr key={plan.id}>
                          <td>{plan.name}</td>
                          <td>
                            <Badge
                              bg={
                                plan.tier === 'basic' ? 'secondary' :
                                  plan.tier === 'standard' ? 'primary' :
                                    plan.tier === 'premium' ? 'warning' : 'success'
                              }
                            >
                              {plan.tier}
                            </Badge>
                          </td>
                          <td>{formatPrice(plan)}</td>
                          <td>
                            <ul className="mb-0">
                              {plan.features.map((feature, i) => (
                                <li key={i}>{feature}</li>
                              ))}
                            </ul>
                          </td>
                          <td>
                            <Form.Check
                              type="switch"
                              id={`active-${plan.id}`}
                              checked={plan.isActive}
                              onChange={() => toggleStatus(plan.id)}
                              label={plan.isActive ? "Active" : "Inactive"}
                            />
                          </td>
                          <td>
                            <Form.Check
                              type="switch"
                              id={`popular-${plan.id}`}
                              checked={plan.isPopular}
                              onChange={() => togglePopular(plan.id)}
                              label={plan.isPopular ? "Yes" : "No"}
                            />
                          </td>
                          <td>{plan.createdAt}</td>
                          <td>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              className="me-2"
                              onClick={() => handleEdit(plan)}
                            >
                              <MdEdit />
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => handleDelete(plan.id)}
                            >
                              <MdDelete />
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center py-4">
                          No pricing plans found
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
                total={filteredPlans.length}
                limit={pagination.limit}
                onChange={(page) => setPagination(prev => ({ ...prev, page }))}
                darkMode={darkMode}
              />
            </Card.Footer>
          </Card>
        </Col>
      </Row>

      {/* Add/Edit Plan Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className={darkMode ? "bg-dark text-light" : ""}>
          <Modal.Title>{isEditing ? "Edit Pricing Plan" : "Add New Pricing Plan"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body className={darkMode ? "bg-dark text-light" : ""}>
            {currentPlan && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Plan Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={currentPlan.name}
                    onChange={handleInputChange}
                    required
                    className={darkMode ? "bg-dark text-light" : ""}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Tier</Form.Label>
                  <Form.Select
                    name="tier"
                    value={currentPlan.tier}
                    onChange={handleInputChange}
                    className={darkMode ? "bg-dark text-light" : ""}
                  >
                    {tierOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Price</Form.Label>
                      <InputGroup>
                        <Form.Select
                          name="currency"
                          value={currentPlan.currency}
                          onChange={handleInputChange}
                          className={darkMode ? "bg-dark text-light" : ""}
                        >
                          <option value="USD">$</option>
                          <option value="EUR">€</option>
                          <option value="GBP">£</option>
                        </Form.Select>
                        <Form.Control
                          type="number"
                          name="price"
                          value={currentPlan.price}
                          onChange={handleInputChange}
                          min="0"
                          className={darkMode ? "bg-dark text-light" : ""}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Billing Interval</Form.Label>
                      <Form.Select
                        name="interval"
                        value={currentPlan.interval}
                        onChange={handleInputChange}
                        className={darkMode ? "bg-dark text-light" : ""}
                      >
                        <option value="month">Monthly</option>
                        <option value="year">Yearly</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <Form.Label>Features</Form.Label>
                    <Button variant="outline-primary" size="sm" onClick={addFeature}>
                      <MdAdd /> Add Feature
                    </Button>
                  </div>
                  {currentPlan.features.map((feature, index) => (
                    <InputGroup key={index} className="mb-2">
                      <Form.Control
                        type="text"
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        className={darkMode ? "bg-dark text-light" : ""}
                      />
                      <Button
                        variant="outline-danger"
                        onClick={() => removeFeature(index)}
                      >
                        <MdClose />
                      </Button>
                    </InputGroup>
                  ))}
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="switch"
                        id="isActive"
                        name="isActive"
                        label="Active Plan"
                        checked={currentPlan.isActive}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="switch"
                        id="isPopular"
                        name="isPopular"
                        label="Mark as Popular"
                        checked={currentPlan.isPopular}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </>
            )}
          </Modal.Body>
          <Modal.Footer className={darkMode ? "bg-dark border-top border-secondary" : ""}>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {isEditing ? "Update Plan" : "Create Plan"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  )
}

export default Pricing