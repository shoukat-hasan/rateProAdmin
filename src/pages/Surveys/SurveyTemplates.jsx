// src\pages\Surveys\SurveyTemplates.jsx
// "use client"

import { useState, useEffect } from "react"
import { Container, Row, Col, Card, Button, Badge, Form, InputGroup } from "react-bootstrap"
import Pagination from "../../components/Pagination/Pagination.jsx"

const SurveyTemplates = ({ darkMode }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [pagination, setPagination] = useState({ page: 1, limit: 3, total: 0 })

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "customer", label: "Customer Feedback" },
    { value: "employee", label: "Employee Engagement" },
    { value: "market", label: "Market Research" },
    { value: "product", label: "Product Feedback" },
    { value: "event", label: "Event Feedback" },
  ]

  const templates = [
    {
      id: 1,
      name: "Customer Satisfaction Survey",
      description: "Measure customer satisfaction with your products or services",
      category: "customer",
      questions: 12,
      estimatedTime: "5 min",
      popular: true,
    },
    {
      id: 2,
      name: "Employee Engagement Survey",
      description: "Assess employee satisfaction and engagement levels",
      category: "employee",
      questions: 15,
      estimatedTime: "7 min",
      popular: true,
    },
    {
      id: 3,
      name: "Product Feedback Survey",
      description: "Gather feedback on product features and usability",
      category: "product",
      questions: 10,
      estimatedTime: "4 min",
      popular: false,
    },
    {
      id: 4,
      name: "Market Research Survey",
      description: "Understand market trends and customer preferences",
      category: "market",
      questions: 18,
      estimatedTime: "10 min",
      popular: false,
    },
    {
      id: 5,
      name: "Event Feedback Survey",
      description: "Collect feedback from event attendees",
      category: "event",
      questions: 8,
      estimatedTime: "3 min",
      popular: true,
    },
    {
      id: 6,
      name: "Website Usability Survey",
      description: "Evaluate website user experience and usability",
      category: "product",
      questions: 14,
      estimatedTime: "6 min",
      popular: false,
    },
  ]

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // update total count when filteredTemplates changes
  // useEffect(() => {
  //   setPagination((prev) => ({ ...prev, total: filteredTemplates.length }))
  // }, [filteredTemplates])

  useEffect(() => {
    setPagination((prev) => {
      if (prev.total !== filteredTemplates.length) {
        return { ...prev, total: filteredTemplates.length }
      }
      return prev
    })
  }, [filteredTemplates])
  

  const getCategoryBadge = (category) => {
    const colors = {
      customer: "primary",
      employee: "success",
      market: "info",
      product: "warning",
      event: "secondary",
    }
    return <Badge bg={colors[category] || "secondary"}>{categories.find((c) => c.value === category)?.label}</Badge>
  }

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="h3 mb-0">Survey Templates</h1>
              <p className="text-muted">Choose from pre-built templates to get started quickly</p>
            </div>
            <Button variant="outline-primary">
              <i className="fas fa-plus me-2"></i>
              Create Custom Template
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
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col lg={4}>
          <Form.Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      <Row>
        {filteredTemplates
          .slice((pagination.page - 1) * pagination.limit, pagination.page * pagination.limit)
          .map((template) => (
            <Col key={template.id} lg={4} md={6} className="mb-4">
              <Card className="h-100 template-card">
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      {getCategoryBadge(template.category)}
                      {template.popular && (
                        <Badge bg="danger" className="ms-2">
                          <i className="fas fa-fire me-1"></i>
                          Popular
                        </Badge>
                      )}
                    </div>
                  </div>

                  <h5 className="card-title">{template.name}</h5>
                  <p className="card-text text-muted flex-grow-1">{template.description}</p>

                  <div className="template-stats mb-3">
                    <div className="d-flex justify-content-between text-muted small">
                      <span>
                        <i className="fas fa-question-circle me-1"></i>
                        {template.questions} questions
                      </span>
                      <span>
                        <i className="fas fa-clock me-1"></i>
                        {template.estimatedTime}
                      </span>
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    <Button variant="primary" className="flex-grow-1">
                      <i className="fas fa-rocket me-2"></i>
                      Use Template
                    </Button>
                    <Button variant="outline-secondary">
                      <i className="fas fa-eye"></i>
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        <div className="p-3 border-top">
          <Pagination
            current={pagination.page}
            total={filteredTemplates.length}
            limit={pagination.limit}
            onChange={(page) => setPagination((prev) => ({ ...prev, page }))}
            darkMode={darkMode}
          />
        </div>
      </Row>

      {filteredTemplates.length === 0 && (
        <Row>
          <Col>
            <div className="text-center py-5">
              <i className="fas fa-search fa-3x text-muted mb-3"></i>
              <h5>No templates found</h5>
              <p className="text-muted">Try adjusting your search criteria or browse all categories</p>
            </div>
          </Col>
        </Row>
      )}

    </Container>
  )
}

export default SurveyTemplates
