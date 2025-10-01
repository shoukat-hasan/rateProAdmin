
// // src\pages\Surveys\CreateSurvey.jsx
"use client"

import { useState } from "react"
import { Container, Row, Col, Card, Form, Button, ListGroup, Badge, Modal, Alert, CardBody } from "react-bootstrap"
import { axiosInstance } from "../../api/axiosInstance.js"
import Swal from "sweetalert2"
import { useAuth } from "../../context/AuthContext.jsx"

const CreateSurvey = () => {
  const { setGlobalLoading } = useAuth();
  const [surveyTitle, setSurveyTitle] = useState("")
  const [surveyDescription, setSurveyDescription] = useState("")
  const [questions, setQuestions] = useState([])
  const [showQuestionModal, setShowQuestionModal] = useState(false)
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState({
    type: "text",
    title: "",
    description: "",
    required: false,
    options: [],
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [logo, setLogo] = useState(null)
  const [themeColor, setThemeColor] = useState("#007bff")
  const [language, setLanguage] = useState("en")
  const [settings, setSettings] = useState({
    isPasswordProtected: false,
    password: "",
    allowAnonymous: true,
    requireLogin: false,
    multipleResponses: false,
    thankYouMessage: "",
    redirectUrl: "",
  })

  // AI Survey Creation states
  const [surveyCategory, setSurveyCategory] = useState("")
  const [surveyGoal, setSurveyGoal] = useState("")
  const [targetAudience, setTargetAudience] = useState("")
  const [questionCount, setQuestionCount] = useState("5")
  const [surveyTone, setSurveyTone] = useState("friendly")

  const questionTypes = [
    // Text-based
    { value: "text", label: "Short Text", icon: "fas fa-font" },
    { value: "textarea", label: "Long Text", icon: "fas fa-align-left" },
    { value: "numeric", label: "Numeric Input", icon: "fas fa-hashtag" },
    { value: "email", label: "Email Input", icon: "fas fa-envelope" },

    // Choice-based
    { value: "radio", label: "Single Choice (Radio)", icon: "fas fa-dot-circle" },
    { value: "checkbox", label: "Multiple Choice (Checkbox)", icon: "fas fa-check-square" },
    { value: "select", label: "Dropdown Select", icon: "fas fa-caret-down" },
    { value: "imageChoice", label: "Image Choice", icon: "fas fa-image" },
    { value: "ranking", label: "Ranking", icon: "fas fa-sort-amount-down-alt" },
    { value: "matrix", label: "Matrix/Grid", icon: "fas fa-th" },

    // Scales
    { value: "likert", label: "Likert Scale", icon: "fas fa-arrows-alt-h" },
    { value: "scale", label: "Numeric Scale", icon: "fas fa-ruler-horizontal" },
    { value: "nps", label: "Net Promoter Score", icon: "fas fa-smile" },
    { value: "rating", label: "Star Rating", icon: "fas fa-star" },

    // Yes/No
    { value: "yesno", label: "Yes / No", icon: "fas fa-toggle-on" },

    // Date & File
    { value: "date", label: "Date Picker", icon: "fas fa-calendar" },
    { value: "time", label: "Time Picker", icon: "fas fa-clock" },
    { value: "datetime", label: "Date & Time", icon: "fas fa-calendar-alt" },
    { value: "fileUpload", label: "File Upload", icon: "fas fa-upload" },
  ];

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

  // AI Functions
  const handleAIDraft = async () => {
    try {
      if (!surveyCategory || !surveyGoal) {
        Swal.fire({
          icon: "warning",
          title: "Missing Information",
          text: "Please select an industry and describe your survey goal",
        });
        return;
      }

      setLoading(true);
      setGlobalLoading(true);
      setMessage("");

      // Create FormData for multipart request
      const formData = new FormData();
      formData.append("category", surveyCategory);
      formData.append("goal", surveyGoal);
      formData.append("targetAudience", targetAudience);
      formData.append("language", language);
      formData.append("tone", surveyTone);
      formData.append("questionCount", questionCount);
      if (logo) formData.append("logo", logo);

      const response = await axiosInstance.post("/ai/draft", formData);

      const draft = response.data.draft;

      // Update survey details with AI generated content
      setSurveyTitle(draft.title);
      setSurveyDescription(draft.description);
      setQuestions(
        draft.questions.map((q) => ({
          ...q,
          id: Date.now() + Math.random(),
          title: q.questionText,
        }))
      );

      Swal.fire({
        icon: "success",
        title: "AI Draft Created! 🎉",
        text: "Your survey draft has been generated. Feel free to review and customize the questions.",
        confirmButtonColor: "#28a745",
      });
    } catch (error) {
      console.error("Error creating AI draft:", error);
      Swal.fire({
        icon: "error",
        title: "AI Draft Failed ❌",
        text: error.response?.data?.message || "Failed to generate survey draft. Please try again.",
        confirmButtonColor: "#dc3545",
      });
    } finally {
      setLoading(false);
      setGlobalLoading(false);
    }
  };

  const handleAISuggestQuestion = async () => {
    try {
      // Validate required fields
      if (!surveyCategory || !surveyGoal || !surveyDescription) {
        Swal.fire({
          icon: "warning",
          title: "Missing Information",
          text: "Please provide industry, survey goal, and some context/description about your survey",
          confirmButtonColor: "#f8bb86",
        });
        return;
      }

      // Validate context length
      if (surveyDescription.length < 20) {
        Swal.fire({
          icon: "warning",
          title: "More Context Needed",
          text: "Please provide more details in the survey description to help AI understand your needs better",
          confirmButtonColor: "#f8bb86",
        });
        return;
      }

      setLoading(true);
      setGlobalLoading(true);
      setMessage("");

      const response = await axiosInstance.post("/ai/suggest", {
        category: surveyCategory,
        goal: surveyGoal,
        audience: targetAudience,
        existingQuestions: questions.map((q) => q.title),
        tone: surveyTone,
        context: surveyDescription,
      });

      if (response.data.suggestions?.length > 0) {
        const suggestion = response.data.suggestions[0];
        setQuestions([
          ...questions,
          {
            id: Date.now() + Math.random(),
            title: suggestion.questionText,
            type: suggestion.type,
            description: suggestion.description || "",
            required: suggestion.required || false,
            options: suggestion.options || [],
          },
        ]);

        Swal.fire({
          icon: "success",
          title: "Question Added! ✅",
          text: "AI has suggested a new question based on your survey goals.",
          confirmButtonColor: "#28a745",
        });
      }
    } catch (error) {
      console.error("Error suggesting question:", error);
      Swal.fire({
        icon: "error",
        title: "Suggestion Failed ❌",
        text: error.response?.data?.message || "Failed to suggest a question. Please try again.",
        confirmButtonColor: "#dc3545",
      });
    } finally {
      setLoading(false);
      setGlobalLoading(false);
    }
  };

  // 🔥 Save Survey to Backend
  const handleSaveSurvey = async () => {
    if (!surveyTitle || questions.length === 0) {
      Swal.fire(
        "⚠️ Validation Error",
        "Please add a title and at least one question.",
        "warning"
      );
      return;
    }

    try {
      setLoading(true);
      setGlobalLoading(true);

      // Create FormData for multipart request
      const formData = new FormData();
      formData.append("title", surveyTitle);
      formData.append("description", surveyDescription);
      formData.append("themeColor", themeColor);
      formData.append("settings", JSON.stringify(settings));
      if (logo) formData.append("logo", logo);

      // Add questions
      formData.append(
        "questions",
        JSON.stringify(
          questions.map((q) => ({
            questionText: q.title,
            type: q.type,
            description: q.description,
            required: q.required,
            options: q.options,
          }))
        )
      );

      const response = await axiosInstance.post("/surveys/create", formData);

      console.log(response);

      Swal.fire({
        icon: "success",
        title: "Survey Created 🎉",
        text: "Your survey has been created successfully!",
        confirmButtonColor: "#28a745",
      });

      // reset form
      setSurveyTitle("");
      setSurveyDescription("");
      setQuestions([]);
      setLogo(null);
      setThemeColor("#007bff");
      setSettings({
        isPasswordProtected: false,
        password: "",
        allowAnonymous: true,
        requireLogin: false,
        multipleResponses: false,
        thankYouMessage: "",
        redirectUrl: "",
      });
    } catch (error) {
      console.error("Error saving survey:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to Create Survey ❌",
        text: error.response?.data?.message || "Something went wrong. Please try again.",
        confirmButtonColor: "#dc3545",
      });
    } finally {
      setLoading(false);
      setGlobalLoading(false);
    }
  };


  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h1 className="h3 mb-0 text-primary fw-bold">
                    <i className="fas fa-clipboard-list me-2"></i>
                    Survey Builder
                  </h1>
                  <p className="text-muted mt-1 mb-0">Create and customize your professional survey</p>
                </div>
                <div className="d-flex gap-3">
                  <Button
                    variant="outline-primary"
                    className="d-flex align-items-center px-3"
                    onClick={() => setShowSettingsModal(true)}
                  >
                    <i className="fas fa-cog me-2"></i>
                    Settings
                  </Button>
                  <Button
                    variant="outline-primary"
                    className="d-flex align-items-center px-3"
                  >
                    <i className="fas fa-eye me-2"></i>
                    Preview
                  </Button>
                  <Button
                    variant="primary"
                    className="d-flex align-items-center px-4"
                    onClick={handleSaveSurvey}
                    disabled={loading}
                  >
                    <i className="fas fa-save me-2"></i>
                    {loading ? "Saving..." : "Save Survey"}
                  </Button>
                </div>
              </div>
              {message && (
                <Alert variant="danger" className="mt-3 mb-0">
                  <i className="fas fa-exclamation-circle me-2"></i>
                  {message}
                </Alert>
              )}
            </Card.Body>
          </Card>

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
                <Row>
                  <Col md={8}>
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
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Logo</Form.Label>
                      <div className="border rounded p-3 text-center">
                        {logo ? (
                          <div className="position-relative">
                            <img
                              src={URL.createObjectURL(logo)}
                              alt="Survey Logo"
                              className="img-fluid mb-2"
                              style={{ maxHeight: "100px" }}
                            />
                            <Button
                              variant="outline-danger"
                              size="sm"
                              className="position-absolute top-0 end-0"
                              onClick={() => setLogo(null)}
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </div>
                        ) : (
                          <div>
                            <i className="fas fa-cloud-upload-alt fa-2x text-muted mb-2"></i>
                            <p className="text-muted small mb-1">Drop your logo here or</p>
                            <Form.Control
                              type="file"
                              accept="image/*"
                              onChange={(e) => setLogo(e.target.files[0])}
                              className="d-none"
                              id="logoUpload"
                            />
                            <label htmlFor="logoUpload" className="btn btn-outline-primary btn-sm">
                              Browse File
                            </label>
                          </div>
                        )}
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Theme Color</Form.Label>
                      <div className="d-flex gap-2">
                        <Form.Control
                          type="color"
                          value={themeColor}
                          onChange={(e) => setThemeColor(e.target.value)}
                          title="Choose theme color"
                        />
                        <Form.Control
                          type="text"
                          value={themeColor}
                          onChange={(e) => setThemeColor(e.target.value)}
                          placeholder="#000000"
                        />
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Language</Form.Label>
                      <Form.Select value={language} onChange={(e) => setLanguage(e.target.value)}>
                        <option value="en">English</option>
                        <option value="ar">Arabic</option>
                        <option value="both">Bilingual (English & Arabic)</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>

          <Card className="shadow-sm border-0">
            <Card.Header className="d-flex justify-content-between align-items-center bg-light">
              <Card.Title className="mb-0 d-flex align-items-center">
                <i className="fas fa-list-alt text-primary me-2"></i>
                Questions
                <Badge bg="primary" className="ms-2 rounded-pill">
                  {questions.length}
                </Badge>
              </Card.Title>
              <Button
                variant="primary"
                size="sm"
                onClick={addQuestion}
                className="d-flex align-items-center px-3 py-2"
              >
                <i className="fas fa-plus me-2"></i>
                Add Question
              </Button>
            </Card.Header>
            <Card.Body className="p-0">
              {questions.length === 0 ? (
                <div className="text-center py-5">
                  <div className="mb-3">
                    <i className="fas fa-clipboard-list fa-3x text-primary opacity-50"></i>
                  </div>
                  <h6 className="fw-medium mb-2">No Questions Added Yet</h6>
                  <p className="text-muted mb-3">Start building your survey by adding questions</p>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={addQuestion}
                    className="px-4"
                  >
                    <i className="fas fa-plus me-2"></i>
                    Add Your First Question
                  </Button>
                </div>
              ) : (
                <ListGroup variant="flush">
                  {questions.map((question, index) => (
                    <ListGroup.Item
                      key={question.id}
                      className="p-4 border-start border-5 border-primary border-opacity-25 hover-shadow"
                    >
                      <div className="d-flex justify-content-between align-items-start">
                        <div className="flex-grow-1">
                          <div className="d-flex align-items-center mb-2">
                            <span className="me-3 text-primary fw-bold">{index + 1}</span>
                            <i className={`${getQuestionTypeIcon(question.type)} me-2 text-primary`}></i>
                            <span className="fw-medium">{question.title}</span>
                            {question.required && (
                              <Badge
                                bg="danger"
                                className="ms-2 rounded-pill bg-opacity-75"
                              >
                                Required
                              </Badge>
                            )}
                          </div>
                          <div className="d-flex align-items-center text-muted mb-2">
                            <i className="fas fa-tag me-2 small"></i>
                            <small>{getQuestionTypeLabel(question.type)}</small>
                          </div>
                          {question.description && (
                            <div className="mt-2 bg-light p-2 rounded-2 border">
                              <small className="text-muted">
                                <i className="fas fa-info-circle me-2"></i>
                                {question.description}
                              </small>
                            </div>
                          )}
                        </div>
                        <div className="btn-group btn-group-sm">
                          <Button
                            variant="light"
                            className="border-primary border-opacity-25 d-flex align-items-center px-3"
                          >
                            <i className="fas fa-edit me-2"></i>
                            Edit
                          </Button>
                          <Button
                            variant="light"
                            className="border-danger border-opacity-25 text-danger d-flex align-items-center px-3"
                            onClick={() => removeQuestion(question.id)}
                          >
                            <i className="fas fa-trash-alt me-2"></i>
                            Delete
                          </Button>
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="mb-4 shadow-sm border-0">
            <Card.Header className="bg-primary bg-opacity-10 border-primary border-opacity-25">
              <Card.Title className="mb-0 d-flex align-items-center">
                <i className="fas fa-magic me-2 text-primary"></i>
                <span>AI Survey Creation</span>
                <span className="ms-2 badge bg-primary bg-opacity-75">Beta ✨</span>
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Alert variant="info" className="mb-4 shadow-sm border-info">
                <Alert.Heading className="h6 d-flex align-items-center">
                  <i className="fas fa-lightbulb text-info me-2"></i>
                  How AI Can Help You
                </Alert.Heading>
                <ul className="mb-0 ps-3">
                  <li className="mb-1">Generate a complete survey draft based on your requirements</li>
                  <li className="mb-1">Suggest relevant questions for your specific context</li>
                  <li className="mb-1">Optimize question flow and clarity</li>
                </ul>
              </Alert>

              <Form className="mb-3">
                <Form.Group className="mb-4">
                  <Form.Label className="fw-medium">
                    Industry/Category <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    value={surveyCategory}
                    onChange={(e) => setSurveyCategory(e.target.value)}
                    className="form-select-lg shadow-sm border-light"
                  >
                    <option value="">Select industry/category</option>
                    <option value="customer_service">👥 Customer Service</option>
                    <option value="product_feedback">📦 Product Feedback</option>
                    <option value="employee">👔 Employee Satisfaction</option>
                    <option value="market_research">📊 Market Research</option>
                    <option value="education">📚 Education</option>
                    <option value="healthcare">🏥 Healthcare</option>
                    <option value="event">🎉 Event Feedback</option>
                  </Form.Select>
                  <Form.Text className="text-muted mt-2">
                    <i className="fas fa-info-circle me-1"></i>
                    Select the industry that best matches your survey's focus
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Survey Goal <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Describe what you want to achieve with this survey (e.g., measure customer satisfaction for our new coffee shop)"
                    value={surveyGoal}
                    onChange={(e) => setSurveyGoal(e.target.value)}
                    className="mb-2"
                  />
                  <Form.Text muted>
                    Be specific about what insights you want to gather
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Survey Context/Description <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Provide context about your business, product, or situation (e.g., We're a new coffee shop in downtown, offering specialty coffee and pastries. We've been open for 3 months and want to understand customer preferences)"
                    value={surveyDescription}
                    onChange={(e) => setSurveyDescription(e.target.value)}
                    className="mb-2"
                  />
                  <Form.Text muted>
                    More context helps AI generate better, more relevant questions
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Target Audience <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Who will take this survey? (e.g., customers aged 18-35 who visited in the last month)"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    className="mb-2"
                  />
                  <Form.Text muted>
                    Define your target respondents as specifically as possible
                  </Form.Text>
                </Form.Group>                <Form.Group className="mb-3">
                  <Form.Label>Number of Questions</Form.Label>
                  <Form.Select
                    value={questionCount}
                    onChange={(e) => setQuestionCount(e.target.value)}
                  >
                    <option value="3">3 Questions (Quick)</option>
                    <option value="5">5 Questions (Short)</option>
                    <option value="8">8 Questions (Standard)</option>
                    <option value="12">12 Questions (Detailed)</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Survey Tone</Form.Label>
                  <Form.Select
                    value={surveyTone}
                    onChange={(e) => setSurveyTone(e.target.value)}
                  >
                    <option value="friendly">Friendly & Casual</option>
                    <option value="professional">Professional & Formal</option>
                    <option value="neutral">Neutral & Balanced</option>
                  </Form.Select>
                </Form.Group>
              </Form>

              <div className="border rounded-3 p-3 bg-light bg-opacity-50 mb-3">
                <div className="d-flex gap-3">
                  <Button
                    variant="primary"
                    className="flex-grow-1 py-2 d-flex align-items-center justify-content-center"
                    onClick={() => handleAIDraft()}
                    disabled={loading || !surveyCategory || !surveyGoal || !surveyDescription}
                  >
                    <i className="fas fa-magic me-2"></i>
                    Generate Full Survey
                    <i className="fas fa-arrow-right ms-2"></i>
                  </Button>
                  <Button
                    variant="outline-primary"
                    className="flex-grow-1 py-2 d-flex align-items-center justify-content-center"
                    onClick={() => handleAISuggestQuestion()}
                    disabled={loading || !surveyCategory || !surveyGoal || !surveyDescription}
                  >
                    <i className="fas fa-lightbulb me-2"></i>
                    Suggest Question
                  </Button>
                </div>
                {(!surveyCategory || !surveyGoal || !surveyDescription) && (
                  <Alert variant="warning" className="mt-3 mb-0 d-flex align-items-center">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    <div>
                      Please provide the following to use AI features:
                      <ul className="mb-0 mt-1">
                        {!surveyCategory && <li>Select an industry</li>}
                        {!surveyGoal && <li>Define your survey goal</li>}
                        {!surveyDescription && <li>Add survey context/description</li>}
                      </ul>
                    </div>
                  </Alert>
                )}
              </div>
            </Card.Body>
          </Card>

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
      <Modal
        show={showQuestionModal}
        onHide={() => setShowQuestionModal(false)}
        size="lg"
        centered
        backdrop="static"
        className="modal-question"
      >
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="d-flex align-items-center">
            <i className="fas fa-plus-circle text-primary me-2"></i>
            Add New Question
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-2">
          <Form>
            <Form.Group className="mb-4">
              <Form.Label className="fw-medium">Question Type</Form.Label>
              <div className="question-type-grid">
                {questionTypes.map((type) => (
                  <Button
                    key={type.value}
                    variant={currentQuestion.type === type.value ? "primary" : "light"}
                    className={`text-start p-3 d-flex align-items-center ${currentQuestion.type === type.value ? "" : "border"
                      }`}
                    onClick={() => setCurrentQuestion({ ...currentQuestion, type: type.value })}
                  >
                    <i className={`${type.icon} me-2 ${currentQuestion.type === type.value ? "" : "text-primary"
                      }`}></i>
                    <span>{type.label}</span>
                  </Button>
                ))}
              </div>
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

      {/* Settings Modal */}
      <Modal
        show={showSettingsModal}
        onHide={() => setShowSettingsModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="d-flex align-items-center">
            <i className="fas fa-cog text-primary me-2"></i>
            Survey Settings
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-2">
          <Form>
            <Form.Group className="mb-4">
              <Form.Label className="fw-medium mb-3">Survey Access</Form.Label>
              <div className="d-flex flex-column gap-2">
                <Form.Check
                  type="switch"
                  id="allowAnonymous"
                  label={
                    <span>
                      <i className="fas fa-user-secret me-2 text-primary"></i>
                      Allow anonymous responses
                    </span>
                  }
                  checked={settings.allowAnonymous}
                  onChange={(e) => setSettings({ ...settings, allowAnonymous: e.target.checked })}
                />
                <Form.Check
                  type="switch"
                  id="requireLogin"
                  label={
                    <span>
                      <i className="fas fa-lock me-2 text-primary"></i>
                      Require login to participate
                    </span>
                  }
                  checked={settings.requireLogin}
                  onChange={(e) => setSettings({ ...settings, requireLogin: e.target.checked })}
                />
                <Form.Check
                  type="switch"
                  id="multipleResponses"
                  label={
                    <span>
                      <i className="fas fa-redo me-2 text-primary"></i>
                      Allow multiple responses per user
                    </span>
                  }
                  checked={settings.multipleResponses}
                  onChange={(e) => setSettings({ ...settings, multipleResponses: e.target.checked })}
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Check
                type="switch"
                id="isPasswordProtected"
                label={
                  <span>
                    <i className="fas fa-key me-2 text-primary"></i>
                    Password protect survey
                  </span>
                }
                checked={settings.isPasswordProtected}
                onChange={(e) => setSettings({ ...settings, isPasswordProtected: e.target.checked })}
                className="mb-3"
              />
              {settings.isPasswordProtected && (
                <Form.Control
                  type="password"
                  placeholder="Enter survey password"
                  value={settings.password}
                  onChange={(e) => setSettings({ ...settings, password: e.target.value })}
                  className="shadow-sm"
                />
              )}
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-medium">
                <i className="fas fa-comment-alt me-2 text-primary"></i>
                Thank You Message
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter message to show after survey completion"
                value={settings.thankYouMessage}
                onChange={(e) => setSettings({ ...settings, thankYouMessage: e.target.value })}
                className="shadow-sm"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">
                <i className="fas fa-external-link-alt me-2 text-primary"></i>
                Redirect URL (Optional)
              </Form.Label>
              <Form.Control
                type="url"
                placeholder="https://example.com"
                value={settings.redirectUrl}
                onChange={(e) => setSettings({ ...settings, redirectUrl: e.target.value })}
                className="shadow-sm"
              />
              <Form.Text className="text-muted mt-2">
                <i className="fas fa-info-circle me-1"></i>
                Redirect users to this URL after survey completion
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button
            variant="light"
            className="px-4"
            onClick={() => setShowSettingsModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            className="px-4"
            onClick={() => setShowSettingsModal(false)}
          >
            Save Settings
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default CreateSurvey