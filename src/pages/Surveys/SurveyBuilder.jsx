import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container, Row, Col, Card, Button, Badge, Form,
  InputGroup, Modal, Spinner, Alert, Tabs, Tab,
  OverlayTrigger, Tooltip, Accordion, ListGroup,
  ProgressBar, Offcanvas
} from 'react-bootstrap';
import {
  MdAdd, MdDelete, MdEdit, MdPreview, MdSave, MdPublish,
  MdDragHandle, MdContentCopy, MdSettings, MdTranslate,
  MdStar, MdRadioButtonChecked, MdCheckBox, MdTextFields,
  MdLinearScale, MdDateRange, MdCloudUpload, MdToggleOn,
  MdViewList, MdGridOn, MdSmartToy, MdAutoAwesome,
  MdTune, MdVisibility, MdCode, MdMobileScreenShare,
  MdQrCode, MdShare, MdAnalytics, MdBusiness,
  MdSchool, MdLocalHospital, MdHotel, MdSports,
  MdAccountBalance, MdShoppingCart, MdLocationCity,
  MdConstruction, MdDirectionsCar, MdComputer
} from 'react-icons/md';
import {
  FaUsers, FaClock, FaLanguage, FaMagic, FaRocket,
  FaChartBar, FaEye, FaHandPointer, FaLightbulb,
  FaGlobe, FaPalette
} from 'react-icons/fa';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axiosInstance from '../../api/axiosInstance';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import './SurveyBuilder.css';

const SurveyBuilder = ({ darkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setGlobalLoading } = useAuth();

  // Extract template data if coming from templates page
  const templateData = location.state?.template;
  const fromTemplates = location.state?.from === 'templates';

  // Main Survey State
  const [survey, setSurvey] = useState({
    title: templateData?.name || '',
    description: templateData?.description || '',
    category: templateData?.category || '',
    language: ['English'],
    isPublic: true,
    allowAnonymous: true,
    collectEmail: false,
    multipleResponses: false,
    thankYouMessage: 'Thank you for your valuable feedback!',
    redirectUrl: '',
    customCSS: '',
    branding: {
      logo: '',
      primaryColor: '#007bff',
      backgroundColor: '#ffffff',
      textColor: '#333333',
      showBranding: true
    }
  });

  const [questions, setQuestions] = useState([]);
  const [activeTab, setActiveTab] = useState('builder');
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showSettingsOffcanvas, setShowSettingsOffcanvas] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [saving, setSaving] = useState(false);

  // AI Assistant State
  const [aiPrompt, setAIPrompt] = useState('');
  const [companyProfile, setCompanyProfile] = useState({
    industry: templateData?.category || '',
    products: '',
    targetAudience: '',
    surveyGoal: ''
  });

  // Question Types Configuration
  const questionTypes = [
    {
      id: 'rating',
      name: 'Star Rating',
      icon: MdStar,
      color: '#ffc107',
      category: 'rating',
      description: 'Rate using stars (1-5)',
      example: '⭐⭐⭐⭐⭐'
    },
    {
      id: 'single_choice',
      name: 'Single Choice',
      icon: MdRadioButtonChecked,
      color: '#007bff',
      category: 'choice',
      description: 'Select one option',
      example: '🔘 ○ ○'
    },
    {
      id: 'multiple_choice',
      name: 'Multiple Choice',
      icon: MdCheckBox,
      color: '#28a745',
      category: 'choice',
      description: 'Select multiple options',
      example: '☑️ ☐ ☐'
    },
    {
      id: 'text_short',
      name: 'Short Text',
      icon: MdTextFields,
      color: '#17a2b8',
      category: 'text',
      description: 'Single line text input',
      example: '📝 Short answer'
    },
    {
      id: 'text_long',
      name: 'Long Text',
      icon: MdViewList,
      color: '#6c757d',
      category: 'text',
      description: 'Multi-line text area',
      example: '📝 Detailed response'
    },
    {
      id: 'nps',
      name: 'NPS Score',
      icon: MdLinearScale,
      color: '#e83e8c',
      category: 'rating',
      description: 'Net Promoter Score (0-10)',
      example: '0️⃣ 1️⃣ ... 🔟'
    },
    {
      id: 'likert',
      name: 'Likert Scale',
      icon: MdLinearScale,
      color: '#fd7e14',
      category: 'rating',
      description: 'Agreement scale (1-5)',
      example: '1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣'
    },
    {
      id: 'yes_no',
      name: 'Yes/No',
      icon: MdToggleOn,
      color: '#20c997',
      category: 'choice',
      description: 'Simple yes or no',
      example: '✅ ❌'
    },
    {
      id: 'date',
      name: 'Date Picker',
      icon: MdDateRange,
      color: '#6f42c1',
      category: 'input',
      description: 'Select a date',
      example: '📅 2025-01-01'
    },
    {
      id: 'file_upload',
      name: 'File Upload',
      icon: MdCloudUpload,
      color: '#dc3545',
      category: 'media',
      description: 'Upload files/images',
      example: '📂 ⬆️'
    },
    {
      id: 'ranking',
      name: 'Ranking',
      icon: MdDragHandle,
      color: '#495057',
      category: 'advanced',
      description: 'Drag & drop ranking',
      example: '⬆️ 1️⃣ 2️⃣ 3️⃣ ⬇️'
    },
    {
      id: 'matrix',
      name: 'Matrix/Grid',
      icon: MdGridOn,
      color: '#343a40',
      category: 'advanced',
      description: 'Grid of questions',
      example: 'Rows × Columns'
    }
  ];

  // Industry Categories for AI
  const industries = [
    { id: 'corporate', name: 'Corporate / HR', icon: MdBusiness },
    { id: 'education', name: 'Education', icon: MdSchool },
    { id: 'healthcare', name: 'Healthcare', icon: MdLocalHospital },
    { id: 'hospitality', name: 'Hospitality & Tourism', icon: MdHotel },
    { id: 'sports', name: 'Sports & Entertainment', icon: MdSports },
    { id: 'banking', name: 'Banking & Financial', icon: MdAccountBalance },
    { id: 'retail', name: 'Retail & E-Commerce', icon: MdShoppingCart },
    { id: 'government', name: 'Government & Public', icon: MdLocationCity },
    { id: 'construction', name: 'Construction & Real Estate', icon: MdConstruction },
    { id: 'automotive', name: 'Automotive & Transport', icon: MdDirectionsCar },
    { id: 'technology', name: 'Technology & Digital', icon: MdComputer }
  ];

  // Initialize survey from template if available
  useEffect(() => {
    if (templateData && fromTemplates) {
      // Generate initial questions from template
      const initialQuestions = generateQuestionsFromTemplate(templateData);
      setQuestions(initialQuestions);

      // Set company profile from template category
      setCompanyProfile(prev => ({
        ...prev,
        industry: templateData.category,
        surveyGoal: `Create a ${templateData.name.toLowerCase()} for better insights`
      }));
    }
  }, [templateData, fromTemplates]);

  // Generate questions from template
  const generateQuestionsFromTemplate = (template) => {
    const baseQuestions = [
      {
        id: 1,
        type: 'rating',
        title: 'Overall Satisfaction',
        description: 'How would you rate your overall experience?',
        required: true,
        options: [],
        settings: { scale: 5 }
      },
      {
        id: 2,
        type: 'single_choice',
        title: 'Service Quality',
        description: 'How satisfied were you with the service quality?',
        required: true,
        options: ['Excellent', 'Good', 'Fair', 'Poor']
      },
      {
        id: 3,
        type: 'nps',
        title: 'Recommendation',
        description: 'How likely are you to recommend us to others?',
        required: true,
        options: []
      }
    ];

    // Add category-specific questions
    if (template.category === 'corporate') {
      baseQuestions.push({
        id: 4,
        type: 'text_long',
        title: 'Improvement Suggestions',
        description: 'What suggestions do you have for improving our workplace?',
        required: false,
        options: []
      });
    } else if (template.category === 'hospitality') {
      baseQuestions.push({
        id: 4,
        type: 'multiple_choice',
        title: 'Facilities Used',
        description: 'Which facilities did you use during your stay?',
        required: false,
        options: ['Restaurant', 'Spa', 'Pool', 'Gym', 'Business Center']
      });
    }

    return baseQuestions;
  };

  // AI Survey Generation from Company Profile (Flow.md Implementation)
  const generateAISurvey = async () => {
    if (!aiPrompt.trim() && !companyProfile.industry) {
      Swal.fire({
        icon: 'warning',
        title: 'Input Required',
        text: 'Please provide a survey description or select your company industry.',
      });
      return;
    }

    setIsGeneratingAI(true);
    try {
      // Call our enhanced AI API from flow.md implementation
      const response = await axiosInstance.post('/ai/generate-from-profile', {
        companyProfile: {
          industry: companyProfile.industry,
          products: companyProfile.products || [],
          targetAudience: companyProfile.targetAudience || 'customers',
          tone: companyProfile.tone || 'friendly'
        },
        surveyGoal: aiPrompt,
        questionCount: companyProfile.questionCount || 6,
        includeNPS: companyProfile.includeNPS !== false,
        languages: survey.language || ['English', 'Arabic']
      });

      if (response.data.success) {
        const { survey: aiSurvey, questions: aiQuestions } = response.data.data;

        // Transform AI response to match our question format
        const transformedQuestions = aiQuestions.map((q, index) => ({
          id: Date.now() + index,
          type: mapAIQuestionType(q.type),
          title: q.title,
          description: q.description,
          required: q.required !== false,
          options: q.options || [],
          settings: q.settings || {},
          // Add bilingual support if available
          translations: q.translations || {}
        }));

        setQuestions(transformedQuestions);

        // Update survey details from AI
        setSurvey(prev => ({
          ...prev,
          title: aiSurvey.title || aiPrompt || `${companyProfile.industry} Survey`,
          description: aiSurvey.description || `AI-generated survey for ${companyProfile.industry} industry`,
          category: companyProfile.industry || prev.category,
          language: aiSurvey.languages || prev.language
        }));

        setShowAIModal(false);
        setAIPrompt('');

        Swal.fire({
          icon: 'success',
          title: '✨ AI Survey Generated!',
          html: `
            <p>Your survey has been created with AI-powered questions tailored for <strong>${companyProfile.industry}</strong>.</p>
            <p>Generated ${transformedQuestions.length} optimized questions with bilingual support.</p>
          `,
          timer: 3000,
          showConfirmButton: false
        });
      }

    } catch (error) {
      console.error('Error generating AI survey:', error);
      Swal.fire({
        icon: 'error',
        title: 'Generation Failed',
        text: 'Failed to generate AI survey. Please try again.'
      });
    } finally {
      setIsGeneratingAI(false);
    }
  };

  // Helper function to map AI question types to our format
  const mapAIQuestionType = (aiType) => {
    const typeMapping = {
      'rating': 'rating',
      'star_rating': 'rating',
      'likert': 'likert',
      'nps': 'nps',
      'single_choice': 'single_choice',
      'multiple_choice': 'multiple_choice',
      'text_short': 'text_short',
      'text_long': 'text_long',
      'yes_no': 'yes_no',
      'date': 'date',
      'number': 'number',
      'ranking': 'ranking',
      'matrix': 'matrix'
    };
    return typeMapping[aiType] || 'text_short';
  };

  // AI Suggest Next Question (Flow.md feature)
  const suggestNextQuestion = async () => {
    if (questions.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'Add Questions First',
        text: 'Add at least one question before getting AI suggestions.'
      });
      return;
    }

    try {
      setIsGeneratingAI(true);

      const response = await axiosInstance.post('/ai/suggest-logic', {
        existingQuestions: questions.map(q => ({
          type: q.type,
          title: q.title,
          required: q.required
        })),
        surveyGoal: survey.title || aiPrompt,
        industry: companyProfile.industry
      });

      if (response.data.success) {
        const suggestion = response.data.data.suggestion;

        Swal.fire({
          icon: 'info',
          title: '✨ AI Suggestion',
          html: `
            <div style="text-align: left;">
              <h6>Recommended Next Question:</h6>
              <p><strong>${suggestion.title}</strong></p>
              <p>${suggestion.description}</p>
              <small>Type: ${suggestion.type} | Priority: ${suggestion.priority}</small>
            </div>
          `,
          showCancelButton: true,
          confirmButtonText: 'Add This Question',
          cancelButtonText: 'Maybe Later'
        }).then((result) => {
          if (result.isConfirmed) {
            const newQuestion = {
              id: Date.now(),
              type: mapAIQuestionType(suggestion.type),
              title: suggestion.title,
              description: suggestion.description,
              required: suggestion.required || false,
              options: suggestion.options || [],
              settings: suggestion.settings || {}
            };
            setQuestions([...questions, newQuestion]);
          }
        });
      }
    } catch (error) {
      console.error('Error suggesting question:', error);
      Swal.fire({
        icon: 'error',
        title: 'Suggestion Failed',
        text: 'Could not generate AI suggestions. Please try again.'
      });
    } finally {
      setIsGeneratingAI(false);
    }
  };

  // AI Survey Optimization (Flow.md feature)
  const optimizeSurvey = async () => {
    if (questions.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'No Questions Found',
        text: 'Add questions to your survey before optimization.'
      });
      return;
    }

    try {
      setIsGeneratingAI(true);

      // This would call our AI optimization endpoint
      const analysisData = {
        totalQuestions: questions.length,
        questionTypes: questions.reduce((acc, q) => {
          acc[q.type] = (acc[q.type] || 0) + 1;
          return acc;
        }, {}),
        requiredQuestions: questions.filter(q => q.required).length,
        estimatedTime: Math.ceil(questions.length * 0.5) // 30 seconds per question
      };

      const suggestions = [];

      // Survey length optimization
      if (questions.length > 8) {
        suggestions.push({
          type: 'warning',
          title: 'Survey Length',
          message: `Your survey has ${questions.length} questions. Consider reducing to 6-8 for better completion rates.`
        });
      }

      // Question type balance
      const openQuestions = questions.filter(q => q.type.includes('text')).length;
      if (openQuestions > 2) {
        suggestions.push({
          type: 'info',
          title: 'Question Balance',
          message: 'Too many open-ended questions may reduce response rates. Consider converting some to multiple choice.'
        });
      }

      // Required questions check
      if (analysisData.requiredQuestions === questions.length) {
        suggestions.push({
          type: 'warning',
          title: 'Required Questions',
          message: 'All questions are required. Consider making some optional to improve completion rates.'
        });
      }

      if (suggestions.length === 0) {
        suggestions.push({
          type: 'success',
          title: 'Well Optimized!',
          message: 'Your survey structure looks good. Great balance of question types and length.'
        });
      }

      Swal.fire({
        icon: suggestions[0].type === 'success' ? 'success' : 'info',
        title: '🔍 Survey Analysis',
        html: `
          <div style="text-align: left;">
            <div class="mb-3">
              <small><strong>Analysis:</strong></small><br>
              <small>Questions: ${analysisData.totalQuestions} | Required: ${analysisData.requiredQuestions} | Est. Time: ${analysisData.estimatedTime} min</small>
            </div>
            ${suggestions.map(s => `
              <div class="alert alert-${s.type === 'warning' ? 'warning' : s.type === 'success' ? 'success' : 'info'} p-2 mb-2">
                <strong>${s.title}:</strong> ${s.message}
              </div>
            `).join('')}
          </div>
        `,
        width: '500px',
        showConfirmButton: true,
        confirmButtonText: 'Got It!'
      });

    } catch (error) {
      console.error('Error optimizing survey:', error);
      Swal.fire({
        icon: 'error',
        title: 'Analysis Failed',
        text: 'Could not analyze survey. Please try again.'
      });
    } finally {
      setIsGeneratingAI(false);
    }
  };

  // Question Management
  const addQuestion = (type) => {
    const questionType = questionTypes.find(qt => qt.id === type);
    const newQuestion = {
      id: Date.now(),
      type: type,
      title: `New ${questionType.name}`,
      description: '',
      required: false,
      options: type.includes('choice') ? ['Option 1', 'Option 2', 'Option 3'] : [],
      settings: {}
    };

    setQuestions([...questions, newQuestion]);
    setSelectedQuestion(newQuestion);
    setShowQuestionModal(true);
  };

  const updateQuestion = (questionId, updates) => {
    setQuestions(questions.map(q =>
      q.id === questionId ? { ...q, ...updates } : q
    ));
  };

  const deleteQuestion = (questionId) => {
    Swal.fire({
      title: 'Delete Question?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        setQuestions(questions.filter(q => q.id !== questionId));
      }
    });
  };

  const duplicateQuestion = (question) => {
    const duplicated = {
      ...question,
      id: Date.now(),
      title: `${question.title} (Copy)`
    };
    setQuestions([...questions, duplicated]);
  };

  // Drag and Drop Handler
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(questions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setQuestions(items);
  };

  // Save Survey
  const saveSurvey = async () => {
    setSaving(true);
    try {
      // Validate survey
      if (!survey.title.trim()) {
        throw new Error('Survey title is required');
      }
      if (questions.length === 0) {
        throw new Error('At least one question is required');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      Swal.fire({
        icon: 'success',
        title: 'Survey Saved!',
        text: 'Your survey has been saved successfully.',
        timer: 2000,
        showConfirmButton: false
      });

      // Navigate to survey list after save
      setTimeout(() => {
        navigate('/surveys');
      }, 2000);

    } catch (error) {
      console.error('Error saving survey:', error);
      Swal.fire({
        icon: 'error',
        title: 'Save Failed',
        text: error.message || 'Failed to save survey. Please try again.'
      });
    } finally {
      setSaving(false);
    }
  };

  // Publish Survey
  const publishSurvey = async () => {
    const result = await Swal.fire({
      title: 'Publish Survey?',
      text: 'Once published, the survey will be available for responses.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, Publish'
    });

    if (result.isConfirmed) {
      setSaving(true);
      try {
        await saveSurvey();
        // Additional publish logic here
      } finally {
        setSaving(false);
      }
    }
  };

  // Get completion percentage
  const getCompletionPercentage = () => {
    let completed = 0;
    let total = 5; // Basic survey elements

    if (survey.title.trim()) completed++;
    if (survey.description.trim()) completed++;
    if (questions.length > 0) completed++;
    if (questions.some(q => q.required)) completed++;
    if (survey.thankYouMessage.trim()) completed++;

    return Math.round((completed / total) * 100);
  };

  return (
    <Container fluid className="survey-builder">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <div className="d-flex align-items-center mb-2">
                <MdEdit className="me-2 text-primary" size={32} />
                <h1 className="h3 mb-0 fw-bold">Survey Builder</h1>
                {templateData && (
                  <Badge bg="info" className="ms-3">
                    From Template: {templateData.name}
                  </Badge>
                )}
              </div>
              <p className="text-muted mb-2">
                Create professional surveys with AI assistance and advanced question types
              </p>

              {/* Progress Indicator */}
              <div className="d-flex align-items-center gap-3">
                <small className="text-muted">Completion:</small>
                <ProgressBar
                  now={getCompletionPercentage()}
                  style={{ width: '120px', height: '8px' }}
                  variant={getCompletionPercentage() > 80 ? 'success' : 'primary'}
                />
                <small className="fw-semibold">{getCompletionPercentage()}%</small>
              </div>
            </div>

            <div className="d-flex gap-2">
              <Button
                variant="outline-primary"
                onClick={() => setShowAIModal(true)}
                className="d-flex align-items-center"
              >
                <MdAutoAwesome className="me-2" />
                AI Assistant
              </Button>

              {questions.length > 0 && !survey.language.includes('Arabic') && (
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip>Add Arabic translations using AI</Tooltip>}
                >
                  <Button
                    variant="outline-success"
                    onClick={async () => {
                      try {
                        setIsGeneratingAI(true);
                        // Add Arabic to languages
                        setSurvey(prev => ({
                          ...prev,
                          language: [...prev.language, 'Arabic']
                        }));

                        // Show success message
                        Swal.fire({
                          icon: 'success',
                          title: '✨ Arabic Added!',
                          text: 'Arabic language support has been enabled. Questions will be displayed bilingually.',
                          timer: 2000,
                          showConfirmButton: false
                        });
                      } catch (error) {
                        console.error('Translation error:', error);
                      } finally {
                        setIsGeneratingAI(false);
                      }
                    }}
                    disabled={isGeneratingAI}
                    className="d-flex align-items-center"
                  >
                    <MdTranslate className="me-1" />
                    {isGeneratingAI ? <Spinner size="sm" /> : 'Add Arabic'}
                  </Button>
                </OverlayTrigger>
              )}
              <Button
                variant="outline-secondary"
                onClick={() => setShowPreviewModal(true)}
                className="d-flex align-items-center"
              >
                <MdPreview className="me-2" />
                Preview
              </Button>
              <Button
                variant="outline-info"
                onClick={() => setShowSettingsOffcanvas(true)}
                className="d-flex align-items-center"
              >
                <MdSettings className="me-2" />
                Settings
              </Button>
              <Button
                variant="success"
                onClick={saveSurvey}
                disabled={saving}
                className="d-flex align-items-center"
              >
                {saving ? <Spinner size="sm" className="me-2" /> : <MdSave className="me-2" />}
                {saving ? 'Saving...' : 'Save'}
              </Button>
              <Button
                variant="primary"
                onClick={publishSurvey}
                disabled={saving || questions.length === 0}
                className="d-flex align-items-center"
              >
                <MdPublish className="me-2" />
                Publish
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      {/* Main Content */}
      <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-4">
        {/* Survey Builder Tab */}
        <Tab eventKey="builder" title={
          <span className="d-flex align-items-center">
            <MdEdit className="me-2" />
            Builder
          </span>
        }>
          <Row>
            {/* Question Types Sidebar */}
            <Col lg={3}>
              <Card className="sticky-top" style={{ top: '1rem' }}>
                <Card.Header className="d-flex align-items-center">
                  <MdAdd className="me-2" />
                  <strong>Add Questions</strong>
                </Card.Header>
                <Card.Body className="p-0">
                  {/* Question Categories */}
                  <Accordion defaultActiveKey={['0']} alwaysOpen>
                    {['choice', 'rating', 'text', 'input', 'advanced'].map((category, idx) => (
                      <Accordion.Item eventKey={idx.toString()} key={category}>
                        <Accordion.Header>
                          <span className="text-capitalize fw-semibold">{category} Questions</span>
                        </Accordion.Header>
                        <Accordion.Body className="p-2">
                          {questionTypes
                            .filter(qt => qt.category === category)
                            .map(questionType => (
                              <Card
                                key={questionType.id}
                                className="question-type-card mb-2 border-0 cursor-pointer"
                                onClick={() => addQuestion(questionType.id)}
                              >
                                <Card.Body className="p-3">
                                  <div className="d-flex align-items-center mb-2">
                                    <questionType.icon
                                      size={20}
                                      style={{ color: questionType.color }}
                                      className="me-2"
                                    />
                                    <strong className="small">{questionType.name}</strong>
                                  </div>
                                  <p className="text-muted small mb-1">{questionType.description}</p>
                                  <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                                    {questionType.example}
                                  </div>
                                </Card.Body>
                              </Card>
                            ))}
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </Card.Body>
              </Card>
            </Col>

            {/* Survey Content */}
            <Col lg={9}>
              {/* Survey Header */}
              <Card className="mb-4">
                <Card.Header className="d-flex align-items-center">
                  <MdSettings className="me-2" />
                  <strong>Survey Information</strong>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={8}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Survey Title *</Form.Label>
                        <Form.Control
                          type="text"
                          value={survey.title}
                          onChange={(e) => setSurvey({ ...survey, title: e.target.value })}
                          placeholder="Enter survey title..."
                          className="form-control-lg"
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={survey.description}
                          onChange={(e) => setSurvey({ ...survey, description: e.target.value })}
                          placeholder="Describe the purpose of this survey..."
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Category</Form.Label>
                        <Form.Select
                          value={survey.category}
                          onChange={(e) => setSurvey({ ...survey, category: e.target.value })}
                        >
                          <option value="">Select Category</option>
                          {industries.map(industry => (
                            <option key={industry.id} value={industry.id}>
                              {industry.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Languages</Form.Label>
                        <div className="d-flex gap-2 flex-wrap">
                          {['English', 'Arabic'].map(lang => (
                            <Form.Check
                              key={lang}
                              type="checkbox"
                              id={`lang-${lang}`}
                              label={lang}
                              checked={survey.language.includes(lang)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSurvey({ ...survey, language: [...survey.language, lang] });
                                } else {
                                  setSurvey({ ...survey, language: survey.language.filter(l => l !== lang) });
                                }
                              }}
                            />
                          ))}
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              {/* Questions List */}
              <Card>
                <Card.Header className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <MdViewList className="me-2" />
                    <strong>Questions ({questions.length})</strong>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    {questions.length > 0 && (
                      <>
                        <OverlayTrigger
                          placement="top"
                          overlay={<Tooltip>Get AI suggestions for next question</Tooltip>}
                        >
                          <Button
                            variant="outline-info"
                            size="sm"
                            onClick={suggestNextQuestion}
                            disabled={isGeneratingAI}
                            className="d-flex align-items-center"
                          >
                            <MdAutoAwesome className="me-1" />
                            {isGeneratingAI ? <Spinner size="sm" /> : 'Suggest'}
                          </Button>
                        </OverlayTrigger>

                        <OverlayTrigger
                          placement="top"
                          overlay={<Tooltip>Analyze and optimize survey structure</Tooltip>}
                        >
                          <Button
                            variant="outline-warning"
                            size="sm"
                            onClick={optimizeSurvey}
                            disabled={isGeneratingAI}
                            className="d-flex align-items-center"
                          >
                            <MdTune className="me-1" />
                            {isGeneratingAI ? <Spinner size="sm" /> : 'Optimize'}
                          </Button>
                        </OverlayTrigger>
                      </>
                    )}
                    {questions.length > 0 && (
                      <small className="text-muted">Drag to reorder</small>
                    )}
                  </div>
                </Card.Header>
                <Card.Body className="p-0">
                  {questions.length === 0 ? (
                    <div className="text-center py-5">
                      <MdAdd size={48} className="text-muted mb-3" />
                      <h5>No Questions Yet</h5>
                      <p className="text-muted mb-4">
                        Add questions from the sidebar or use AI to generate a complete survey
                      </p>
                      <Button
                        variant="outline-primary"
                        onClick={() => setShowAIModal(true)}
                        className="d-flex align-items-center mx-auto"
                      >
                        <MdAutoAwesome className="me-2" />
                        Generate with AI
                      </Button>
                    </div>
                  ) : (
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                      <Droppable droppableId="questions">
                        {(provided) => (
                          <div {...provided.droppableProps} ref={provided.innerRef}>
                            {questions.map((question, index) => (
                              <Draggable
                                key={question.id}
                                draggableId={question.id.toString()}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}   // yaha rakho
                                    className={`question-item p-3 border-bottom ${snapshot.isDragging ? 'dragging' : ''
                                      }`}
                                  >
                                    <div className="d-flex align-items-start">
                                      {/* handle props yaha pass karo */}
                                      <div
                                        {...provided.dragHandleProps}
                                        className="drag-handle me-3 mt-1"
                                      >
                                        <MdDragHandle className="text-muted" />
                                      </div>

                                      <div className="flex-grow-1">
                                        <div className="d-flex align-items-center mb-2">
                                          <Badge bg="light" text="dark" className="me-2">
                                            Q{index + 1}
                                          </Badge>
                                          {questionTypes.find(qt => qt.id === question.type) && (
                                            <>
                                              {React.createElement(
                                                questionTypes.find(qt => qt.id === question.type).icon,
                                                {
                                                  size: 16,
                                                  className: 'me-2',
                                                  style: {
                                                    color: questionTypes.find(qt => qt.id === question.type).color
                                                  }
                                                }
                                              )}
                                              <small className="text-muted me-3">
                                                {questionTypes.find(qt => qt.id === question.type).name}
                                              </small>
                                            </>
                                          )}
                                          {question.required && (
                                            <Badge bg="danger" className="me-2">Required</Badge>
                                          )}
                                        </div>

                                        <h6 className="mb-1">{question.title}</h6>
                                        {question.description && (
                                          <p className="text-muted small mb-2">{question.description}</p>
                                        )}

                                        {/* Question Preview */}
                                        {question.options.length > 0 && (
                                          <div className="mt-2">
                                            {question.type === 'single_choice' || question.type === 'multiple_choice' ? (
                                              <div className="d-flex gap-2 flex-wrap">
                                                {question.options.slice(0, 3).map((option, idx) => (
                                                  <Badge key={idx} bg="light" text="dark" className="border">
                                                    {option}
                                                  </Badge>
                                                ))}
                                                {question.options.length > 3 && (
                                                  <Badge bg="light" text="muted">
                                                    +{question.options.length - 3} more
                                                  </Badge>
                                                )}
                                              </div>
                                            ) : null}
                                          </div>
                                        )}
                                      </div>

                                      <div className="d-flex gap-1 ms-3">
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={<Tooltip>Edit Question</Tooltip>}
                                        >
                                          <Button
                                            variant="outline-primary"
                                            size="sm"
                                            onClick={() => {
                                              setSelectedQuestion(question);
                                              setShowQuestionModal(true);
                                            }}
                                          >
                                            <MdEdit size={14} />
                                          </Button>
                                        </OverlayTrigger>

                                        <OverlayTrigger
                                          placement="top"
                                          overlay={<Tooltip>Duplicate</Tooltip>}
                                        >
                                          <Button
                                            variant="outline-secondary"
                                            size="sm"
                                            onClick={() => duplicateQuestion(question)}
                                          >
                                            <MdContentCopy size={14} />
                                          </Button>
                                        </OverlayTrigger>

                                        <OverlayTrigger
                                          placement="top"
                                          overlay={<Tooltip>Delete Question</Tooltip>}
                                        >
                                          <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => deleteQuestion(question.id)}
                                          >
                                            <MdDelete size={14} />
                                          </Button>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>

        {/* Design Tab */}
        <Tab eventKey="design" title={
          <span className="d-flex align-items-center">
            <FaPalette className="me-2" />
            Design
          </span>
        }>
          <Card>
            <Card.Header>
              <strong>Survey Appearance</strong>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Primary Color</Form.Label>
                    <Form.Control
                      type="color"
                      value={survey.branding.primaryColor}
                      onChange={(e) => setSurvey({
                        ...survey,
                        branding: { ...survey.branding, primaryColor: e.target.value }
                      })}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Background Color</Form.Label>
                    <Form.Control
                      type="color"
                      value={survey.branding.backgroundColor}
                      onChange={(e) => setSurvey({
                        ...survey,
                        branding: { ...survey.branding, backgroundColor: e.target.value }
                      })}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <div className="survey-preview-mini border rounded p-3" style={{
                    backgroundColor: survey.branding.backgroundColor,
                    color: survey.branding.textColor
                  }}>
                    <h5 style={{ color: survey.branding.primaryColor }}>
                      {survey.title || 'Survey Title'}
                    </h5>
                    <p className="small">{survey.description || 'Survey description...'}</p>
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <div
                        className="rounded-circle"
                        style={{
                          width: '12px',
                          height: '12px',
                          backgroundColor: survey.branding.primaryColor
                        }}
                      ></div>
                      <small>Sample question</small>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Tab>

        {/* Settings Tab */}
        <Tab eventKey="settings" title={
          <span className="d-flex align-items-center">
            <MdTune className="me-2" />
            Settings
          </span>
        }>
          <Row>
            <Col md={6}>
              <Card className="mb-4">
                <Card.Header>Response Settings</Card.Header>
                <Card.Body>
                  <Form.Check
                    type="switch"
                    id="public-survey"
                    label="Make survey public"
                    checked={survey.isPublic}
                    onChange={(e) => setSurvey({ ...survey, isPublic: e.target.checked })}
                    className="mb-3"
                  />

                  <Form.Check
                    type="switch"
                    id="anonymous-responses"
                    label="Allow anonymous responses"
                    checked={survey.allowAnonymous}
                    onChange={(e) => setSurvey({ ...survey, allowAnonymous: e.target.checked })}
                    className="mb-3"
                  />

                  <Form.Check
                    type="switch"
                    id="multiple-responses"
                    label="Allow multiple responses from same user"
                    checked={survey.multipleResponses}
                    onChange={(e) => setSurvey({ ...survey, multipleResponses: e.target.checked })}
                    className="mb-3"
                  />
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="mb-4">
                <Card.Header>Completion Settings</Card.Header>
                <Card.Body>
                  <Form.Group className="mb-3">
                    <Form.Label>Thank You Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={survey.thankYouMessage}
                      onChange={(e) => setSurvey({ ...survey, thankYouMessage: e.target.value })}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Redirect URL (Optional)</Form.Label>
                    <Form.Control
                      type="url"
                      value={survey.redirectUrl}
                      onChange={(e) => setSurvey({ ...survey, redirectUrl: e.target.value })}
                      placeholder="https://example.com"
                    />
                  </Form.Group>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>
      </Tabs>

      {/* AI Assistant Modal */}
      <Modal
        show={showAIModal}
        onHide={() => setShowAIModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="d-flex align-items-center">
            <MdAutoAwesome className="me-2 text-primary" />
            AI Survey Assistant
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Industry/Category</Form.Label>
                <Form.Select
                  value={companyProfile.industry}
                  onChange={(e) => setCompanyProfile({ ...companyProfile, industry: e.target.value })}
                >
                  <option value="">Select Industry</option>
                  {industries.map(industry => (
                    <option key={industry.id} value={industry.id}>
                      {industry.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Products/Services</Form.Label>
                <Form.Control
                  type="text"
                  value={companyProfile.products}
                  onChange={(e) => setCompanyProfile({ ...companyProfile, products: e.target.value })}
                  placeholder="e.g., Coffee, Bakery Items, Catering"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Target Audience</Form.Label>
                <Form.Select
                  value={companyProfile.targetAudience}
                  onChange={(e) => setCompanyProfile({ ...companyProfile, targetAudience: e.target.value })}
                >
                  <option value="">Select Audience</option>
                  <option value="customers">Customers</option>
                  <option value="employees">Employees</option>
                  <option value="vendors">Vendors/Partners</option>
                  <option value="students">Students</option>
                  <option value="patients">Patients</option>
                  <option value="guests">Guests/Visitors</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Survey Goal</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={companyProfile.surveyGoal}
                  onChange={(e) => setCompanyProfile({ ...companyProfile, surveyGoal: e.target.value })}
                  placeholder="e.g., Measure customer satisfaction with our café services"
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">Additional Instructions (Optional)</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={aiPrompt}
              onChange={(e) => setAIPrompt(e.target.value)}
              placeholder="Tell AI what specific aspects you want to focus on, question types to include, or any special requirements..."
            />
          </Form.Group>

          <Alert variant="info" className="d-flex align-items-start">
            <FaLightbulb className="me-2 mt-1" />
            <div>
              <strong>AI will generate:</strong>
              <ul className="mb-0 mt-1">
                <li>5-8 relevant questions based on your industry</li>
                <li>Mix of rating, choice, and open-text questions</li>
                <li>Appropriate question flow with conditional logic</li>
                <li>Bilingual support (English & Arabic)</li>
              </ul>
            </div>
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAIModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={generateAISurvey}
            disabled={isGeneratingAI || !companyProfile.industry}
          >
            {isGeneratingAI ? (
              <>
                <Spinner size="sm" className="me-2" />
                Generating...
              </>
            ) : (
              <>
                <MdAutoAwesome className="me-2" />
                Generate Survey
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Question Edit Modal - Simplified for now */}
      <Modal
        show={showQuestionModal}
        onHide={() => setShowQuestionModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedQuestion && (
            <div>
              <Form.Group className="mb-3">
                <Form.Label>Question Title</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedQuestion.title}
                  onChange={(e) => setSelectedQuestion({ ...selectedQuestion, title: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description (Optional)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={selectedQuestion.description}
                  onChange={(e) => setSelectedQuestion({ ...selectedQuestion, description: e.target.value })}
                />
              </Form.Group>

              <Form.Check
                type="switch"
                id="required-question"
                label="Required Question"
                checked={selectedQuestion.required}
                onChange={(e) => setSelectedQuestion({ ...selectedQuestion, required: e.target.checked })}
              />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowQuestionModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              updateQuestion(selectedQuestion.id, selectedQuestion);
              setShowQuestionModal(false);
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Preview Modal */}
      <Modal
        show={showPreviewModal}
        onHide={() => setShowPreviewModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="d-flex align-items-center">
            <MdPreview className="me-2" />
            Survey Preview
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="survey-preview" style={{
            backgroundColor: survey.branding.backgroundColor,
            color: survey.branding.textColor,
            padding: '2rem',
            borderRadius: '8px'
          }}>
            <h3 style={{ color: survey.branding.primaryColor }}>
              {survey.title || 'Untitled Survey'}
            </h3>
            {survey.description && (
              <p className="mb-4">{survey.description}</p>
            )}

            {questions.map((question, index) => (
              <div key={question.id} className="mb-4">
                <div className="d-flex align-items-center mb-2">
                  <Badge bg="primary" className="me-2">Q{index + 1}</Badge>
                  <strong>{question.title}</strong>
                  {question.required && <span className="text-danger ms-1">*</span>}
                </div>
                {question.description && (
                  <p className="text-muted small mb-2">{question.description}</p>
                )}

                {/* Question Type Preview */}
                {question.type === 'rating' && (
                  <div className="d-flex gap-1">
                    {[1, 2, 3, 4, 5].map(i => (
                      <MdStar key={i} className="text-warning" />
                    ))}
                  </div>
                )}

                {(question.type === 'single_choice' || question.type === 'multiple_choice') && (
                  <div>
                    {question.options.map((option, idx) => (
                      <div key={idx} className="d-flex align-items-center mb-1">
                        <Form.Check
                          type={question.type === 'single_choice' ? 'radio' : 'checkbox'}
                          name={`preview-${question.id}`}
                          label={option}
                          disabled
                        />
                      </div>
                    ))}
                  </div>
                )}

                {question.type.includes('text') && (
                  <Form.Control
                    as={question.type === 'text_long' ? 'textarea' : 'input'}
                    rows={question.type === 'text_long' ? 3 : undefined}
                    placeholder="Your answer here..."
                    disabled
                  />
                )}
              </div>
            ))}

            <div className="text-center mt-4">
              <Button
                style={{ backgroundColor: survey.branding.primaryColor }}
                disabled
              >
                Submit Survey
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default SurveyBuilder;