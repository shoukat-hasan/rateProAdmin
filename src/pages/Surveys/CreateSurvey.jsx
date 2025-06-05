
// src\pages\Surveys\CreateSurvey.jsx
"use client"

import { useState } from "react"
import { Container, Row, Col, Card, Form, Button, ListGroup, Badge, Modal } from "react-bootstrap"

const CreateSurvey = () => {
  const [surveyTitle, setSurveyTitle] = useState("")
  const [surveyDescription, setSurveyDescription] = useState("")
  const [questions, setQuestions] = useState([])
  const [showQuestionModal, setShowQuestionModal] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState({
    type: "text",
    title: "",
    description: "",
    required: false,
    options: [],
  })

  const questionTypes = [
    { value: "text", label: "Text Input", icon: "fas fa-font" },
    { value: "textarea", label: "Long Text", icon: "fas fa-align-left" },
    { value: "radio", label: "Multiple Choice", icon: "fas fa-dot-circle" },
    { value: "checkbox", label: "Checkboxes", icon: "fas fa-check-square" },
    { value: "select", label: "Dropdown", icon: "fas fa-caret-down" },
    { value: "rating", label: "Rating Scale", icon: "fas fa-star" },
    { value: "date", label: "Date", icon: "fas fa-calendar" },
    { value: "email", label: "Email", icon: "fas fa-envelope" },
  ]

  const addQuestion = () => {
    setCurrentQuestion({
      type: "text",
      title: "",
      description: "",
      required: false,
      options: [],
    })
    setShowQuestionModal(true)
  }

  const saveQuestion = () => {
    if (currentQuestion.title.trim()) {
      setQuestions([...questions, { ...currentQuestion, id: Date.now() }])
      setShowQuestionModal(false)
    }
  }

  const removeQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id))
  }

  const addOption = () => {
    setCurrentQuestion({
      ...currentQuestion,
      options: [...currentQuestion.options, ""],
    })
  }

  const updateOption = (index, value) => {
    const newOptions = [...currentQuestion.options]
    newOptions[index] = value
    setCurrentQuestion({
      ...currentQuestion,
      options: newOptions,
    })
  }

  const removeOption = (index) => {
    setCurrentQuestion({
      ...currentQuestion,
      options: currentQuestion.options.filter((_, i) => i !== index),
    })
  }

  const getQuestionTypeIcon = (type) => {
    const questionType = questionTypes.find((qt) => qt.value === type)
    return questionType ? questionType.icon : "fas fa-question"
  }

  const getQuestionTypeLabel = (type) => {
    const questionType = questionTypes.find((qt) => qt.value === type)
    return questionType ? questionType.label : "Unknown"
  }

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="h3 mb-0">Survey Builder</h1>
              <p className="text-muted">Create and customize your survey</p>
            </div>
            <div className="d-flex gap-2">
              <Button variant="outline-secondary">
                <i className="fas fa-eye me-2"></i>
                Preview
              </Button>
              <Button variant="success">
                <i className="fas fa-save me-2"></i>
                Save Survey
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Header>
              <Card.Title className="mb-0">Survey Details</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Survey Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter survey title"
                    value={surveyTitle}
                    onChange={(e) => setSurveyTitle(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter survey description"
                    value={surveyDescription}
                    onChange={(e) => setSurveyDescription(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <Card.Title className="mb-0">Questions ({questions.length})</Card.Title>
              <Button variant="primary" size="sm" onClick={addQuestion}>
                <i className="fas fa-plus me-2"></i>
                Add Question
              </Button>
            </Card.Header>
            <Card.Body className="p-0">
              {questions.length === 0 ? (
                <div className="text-center py-5">
                  <i className="fas fa-question-circle fa-3x text-muted mb-3"></i>
                  <p className="text-muted">No questions added yet. Click "Add Question" to get started.</p>
                </div>
              ) : (
                <ListGroup variant="flush">
                  {questions.map((question, index) => (
                    <ListGroup.Item key={question.id} className="d-flex justify-content-between align-items-start">
                      <div className="flex-grow-1">
                        <div className="d-flex align-items-center mb-2">
                          <i className={`${getQuestionTypeIcon(question.type)} me-2 text-primary`}></i>
                          <span className="fw-medium">{question.title}</span>
                          {question.required && (
                            <Badge bg="danger" className="ms-2">
                              Required
                            </Badge>
                          )}
                        </div>
                        <small className="text-muted">{getQuestionTypeLabel(question.type)}</small>
                        {question.description && (
                          <div className="mt-1">
                            <small className="text-muted">{question.description}</small>
                          </div>
                        )}
                      </div>
                      <div className="btn-group btn-group-sm">
                        <Button variant="outline-secondary" size="sm">
                          <i className="fas fa-edit"></i>
                        </Button>
                        <Button variant="outline-danger" size="sm" onClick={() => removeQuestion(question.id)}>
                          <i className="fas fa-trash"></i>
                        </Button>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card>
            <Card.Header>
              <Card.Title className="mb-0">Question Types</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="d-grid gap-2">
                {questionTypes.map((type) => (
                  <Button
                    key={type.value}
                    variant="outline-primary"
                    size="sm"
                    className="text-start"
                    onClick={() => {
                      setCurrentQuestion({
                        ...currentQuestion,
                        type: type.value,
                      })
                      setShowQuestionModal(true)
                    }}
                  >
                    <i className={`${type.icon} me-2`}></i>
                    {type.label}
                  </Button>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Question Modal */}
      <Modal show={showQuestionModal} onHide={() => setShowQuestionModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Question Type</Form.Label>
              <Form.Select
                value={currentQuestion.type}
                onChange={(e) => setCurrentQuestion({ ...currentQuestion, type: e.target.value })}
              >
                {questionTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Question Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter question title"
                value={currentQuestion.title}
                onChange={(e) => setCurrentQuestion({ ...currentQuestion, title: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description (Optional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Enter question description"
                value={currentQuestion.description}
                onChange={(e) => setCurrentQuestion({ ...currentQuestion, description: e.target.value })}
              />
            </Form.Group>

            {["radio", "checkbox", "select"].includes(currentQuestion.type) && (
              <Form.Group className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <Form.Label className="mb-0">Options</Form.Label>
                  <Button variant="outline-primary" size="sm" onClick={addOption}>
                    <i className="fas fa-plus me-1"></i>
                    Add Option
                  </Button>
                </div>
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="d-flex mb-2">
                    <Form.Control
                      type="text"
                      placeholder={`Option ${index + 1}`}
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                    />
                    <Button variant="outline-danger" size="sm" className="ms-2" onClick={() => removeOption(index)}>
                      <i className="fas fa-trash"></i>
                    </Button>
                  </div>
                ))}
              </Form.Group>
            )}

            <Form.Check
              type="checkbox"
              label="Required question"
              checked={currentQuestion.required}
              onChange={(e) => setCurrentQuestion({ ...currentQuestion, required: e.target.checked })}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowQuestionModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={saveQuestion}>
            Add Question
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default CreateSurvey
