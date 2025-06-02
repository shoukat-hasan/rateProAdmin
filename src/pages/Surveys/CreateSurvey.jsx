"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container, Row, Col, Card, Form, Button, Badge } from "react-bootstrap"
import { MdSave, MdAdd, MdDelete } from "react-icons/md"

const CreateSurvey = () => {
  const [survey, setSurvey] = useState({
    title: "",
    description: "",
    questions: [],
  })

  const [currentQuestion, setCurrentQuestion] = useState({
    text: "",
    type: "multiple_choice",
    options: ["", ""],
    required: false,
  })

  const navigate = useNavigate()

  const addQuestion = () => {
    if (currentQuestion.text.trim()) {
      setSurvey((prev) => ({
        ...prev,
        questions: [...prev.questions, { ...currentQuestion, id: Date.now() }],
      }))
      setCurrentQuestion({
        text: "",
        type: "multiple_choice",
        options: ["", ""],
        required: false,
      })
    }
  }

  const removeQuestion = (id) => {
    setSurvey((prev) => ({
      ...prev,
      questions: prev.questions.filter((q) => q.id !== id),
    }))
  }

  const addOption = () => {
    setCurrentQuestion((prev) => ({
      ...prev,
      options: [...prev.options, ""],
    }))
  }

  const updateOption = (index, value) => {
    setCurrentQuestion((prev) => ({
      ...prev,
      options: prev.options.map((opt, i) => (i === index ? value : opt)),
    }))
  }

  const removeOption = (index) => {
    setCurrentQuestion((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
    }))
  }

  const saveSurvey = () => {
    console.log("Survey saved:", survey)
    navigate("/surveys")
  }

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="h3 mb-0">Create Survey</h1>
            <Button variant="primary" onClick={saveSurvey}>
              <MdSave className="me-2" />
              Save Survey
            </Button>
          </div>
        </Col>
      </Row>

      <Row>
        <Col lg={8}>
          {/* Survey Details */}
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Survey Details</h5>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Survey Title</Form.Label>
                <Form.Control
                  type="text"
                  value={survey.title}
                  onChange={(e) => setSurvey({ ...survey, title: e.target.value })}
                  placeholder="Enter survey title"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={survey.description}
                  onChange={(e) => setSurvey({ ...survey, description: e.target.value })}
                  placeholder="Enter survey description"
                />
              </Form.Group>
            </Card.Body>
          </Card>

          {/* Add Question */}
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Add Question</h5>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Question Text</Form.Label>
                <Form.Control
                  type="text"
                  value={currentQuestion.text}
                  onChange={(e) => setCurrentQuestion({ ...currentQuestion, text: e.target.value })}
                  placeholder="Enter your question"
                />
              </Form.Group>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Question Type</Form.Label>
                    <Form.Select
                      value={currentQuestion.type}
                      onChange={(e) => setCurrentQuestion({ ...currentQuestion, type: e.target.value })}
                    >
                      <option value="multiple_choice">Multiple Choice</option>
                      <option value="checkbox">Checkbox</option>
                      <option value="text">Text</option>
                      <option value="rating">Rating (1-5)</option>
                      <option value="nps">NPS (0-10)</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6} className="d-flex align-items-end">
                  <Form.Check
                    type="checkbox"
                    label="Required"
                    checked={currentQuestion.required}
                    onChange={(e) => setCurrentQuestion({ ...currentQuestion, required: e.target.checked })}
                  />
                </Col>
              </Row>

              {(currentQuestion.type === "multiple_choice" || currentQuestion.type === "checkbox") && (
                <div className="mb-3">
                  <Form.Label>Options</Form.Label>
                  {currentQuestion.options.map((option, index) => (
                    <div key={index} className="d-flex mb-2">
                      <Form.Control
                        type="text"
                        value={option}
                        onChange={(e) => updateOption(index, e.target.value)}
                        placeholder={`Option ${index + 1}`}
                        className="me-2"
                      />
                      {currentQuestion.options.length > 2 && (
                        <Button variant="outline-danger" size="sm" onClick={() => removeOption(index)}>
                          <MdDelete />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button variant="outline-primary" size="sm" onClick={addOption}>
                    <MdAdd className="me-1" />
                    Add Option
                  </Button>
                </div>
              )}

              <Button variant="primary" onClick={addQuestion}>
                <MdAdd className="me-2" />
                Add Question
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          {/* Questions Preview */}
          <Card>
            <Card.Header>
              <h5 className="mb-0">Questions ({survey.questions.length})</h5>
            </Card.Header>
            <Card.Body>
              {survey.questions.length === 0 ? (
                <p className="text-muted text-center py-4">No questions added yet</p>
              ) : (
                survey.questions.map((question, index) => (
                  <div key={question.id} className="border rounded p-3 mb-3">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div className="d-flex align-items-center gap-2">
                        <Badge bg="primary">{index + 1}</Badge>
                        <Badge bg="secondary">{question.type.replace("_", " ")}</Badge>
                        {question.required && <Badge bg="danger">Required</Badge>}
                      </div>
                      <Button variant="outline-danger" size="sm" onClick={() => removeQuestion(question.id)}>
                        <MdDelete />
                      </Button>
                    </div>
                    <h6 className="mb-2">{question.text}</h6>
                    {question.options && question.options.length > 0 && (
                      <ul className="list-unstyled mb-0 small text-muted">
                        {question.options
                          .filter((opt) => opt.trim())
                          .map((option, i) => (
                            <li key={i}>• {option}</li>
                          ))}
                      </ul>
                    )}
                  </div>
                ))
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default CreateSurvey
