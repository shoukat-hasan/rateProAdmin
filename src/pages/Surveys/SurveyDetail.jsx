"use client"



import { useParams } from "react-router-dom"
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap"
import { MdEdit, MdShare, MdAnalytics } from "react-icons/md"

const SurveyDetail = () => {
  const { id } = useParams()

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="h3 mb-1">Customer Satisfaction Survey</h1>
              <div className="d-flex align-items-center gap-2">
                <Badge bg="success">Active</Badge>
                <span className="text-muted">Survey ID: {id}</span>
              </div>
            </div>
            <div className="d-flex gap-2">
              <Button variant="outline-primary">
                <MdEdit className="me-2" />
                Edit
              </Button>
              <Button variant="outline-secondary">
                <MdShare className="me-2" />
                Share
              </Button>
              <Button variant="primary">
                <MdAnalytics className="me-2" />
                Analytics
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col lg={8}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Survey Preview</h5>
            </Card.Header>
            <Card.Body>
              <p className="text-muted mb-4">Help us improve our service by sharing your feedback.</p>

              <div className="mb-4">
                <h6>1. How satisfied are you with our product?</h6>
                <div className="d-flex gap-2 mt-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Button key={rating} variant="outline-primary" size="sm">
                      {rating}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h6>2. What can we improve?</h6>
                <Form.Control as="textarea" rows={3} placeholder="Your feedback..." disabled />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="mb-4">
            <Card.Header>
              <h6 className="mb-0">Survey Statistics</h6>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <span>Total Responses:</span>
                <strong>245</strong>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Completion Rate:</span>
                <strong>87%</strong>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Average Rating:</span>
                <strong>4.2/5</strong>
              </div>
              <div className="d-flex justify-content-between">
                <span>Created:</span>
                <strong>May 15, 2023</strong>
              </div>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <h6 className="mb-0">Quick Actions</h6>
            </Card.Header>
            <Card.Body className="d-grid gap-2">
              <Button variant="outline-primary" size="sm">
                View Responses
              </Button>
              <Button variant="outline-secondary" size="sm">
                Download Data
              </Button>
              <Button variant="outline-info" size="sm">
                Share Survey
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default SurveyDetail
