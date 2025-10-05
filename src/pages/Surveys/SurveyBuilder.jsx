import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
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
  MdQrCode, MdShare, MdAnalytics, MdBusiness, MdBuild,
  MdSchool, MdLocalHospital, MdHotel, MdSports,
  MdAccountBalance, MdShoppingCart, MdLocationCity,
  MdConstruction, MdDirectionsCar, MdComputer
} from 'react-icons/md';
import {
  FaUsers, FaClock, FaLanguage, FaMagic, FaRocket,
  FaChartBar, FaEye, FaHandPointer, FaLightbulb,
  FaGlobe, FaPalette
} from 'react-icons/fa';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import axiosInstance from '../../api/axiosInstance';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import './SurveyBuilder.css';

const SurveyBuilder = ({ darkMode }) => { // eslint-disable-line no-unused-vars
  const navigate = useNavigate();
  const location = useLocation();
  const { id: surveyId } = useParams();
  const { user, setGlobalLoading } = useAuth();

  // Extract template data if coming from templates page
  const templateData = location.state?.template;
  const fromTemplates = location.state?.from === 'templates';
  const isEditing = !!surveyId;

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
      primaryColor: 'var(--bs-primary)',
      backgroundColor: 'var(--bs-body-bg)',
      textColor: 'var(--bs-body-color)',
      showBranding: true
    },
    translations: {
      en: {},
      ar: {}
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
  const [loading, setLoading] = useState(false);

  // AI Workflow States
  const [surveyMode, setSurveyMode] = useState('user-defined'); // 'user-defined' or 'ai-assisted'
  const [showModeSelector, setShowModeSelector] = useState(true);
  const [aiWorkflowStep, setAIWorkflowStep] = useState(1); // 1: Profile, 2: Review, 3: Customize
  const [aiGeneratedDraft, setAIGeneratedDraft] = useState(null);
  const [aiLoadingStates, setAILoadingStates] = useState({
    generating: false,
    optimizing: false,
    suggesting: false,
    translating: false
  });

  // AI Assistant State
  const [aiPrompt, setAIPrompt] = useState('');
  const [companyProfile, setCompanyProfile] = useState({
    industry: "",
    products: "", // string hi rakho
    targetAudience: "",
    surveyGoal: "",
    questionCount: 8,
    includeNPS: true,
    languages: ['English'],
    tone: 'friendly-professional',
    additionalInstructions: ''
  });




  // Question Types Configuration
  const questionTypes = [
    {
      id: 'rating',
      name: 'Star Rating',
      icon: MdStar,
      color: 'var(--bs-warning)',
      category: 'rating',
      description: 'Rate using stars (1-5)',
      example: '⭐⭐⭐⭐⭐'
    },
    {
      id: 'single_choice',
      name: 'Single Choice',
      icon: MdRadioButtonChecked,
      color: 'var(--bs-primary)',
      category: 'choice',
      description: 'Select one option',
      example: '🔘 ○ ○'
    },
    {
      id: 'multiple_choice',
      name: 'Multiple Choice',
      icon: MdCheckBox,
      color: 'var(--bs-success)',
      category: 'choice',
      description: 'Select multiple options',
      example: '☑️ ☐ ☐'
    },
    {
      id: 'text_short',
      name: 'Short Text',
      icon: MdTextFields,
      color: 'var(--bs-info)',
      category: 'text',
      description: 'Single line text input',
      example: '📝 Short answer'
    },
    {
      id: 'text_long',
      name: 'Long Text',
      icon: MdViewList,
      color: 'var(--bs-secondary)',
      category: 'text',
      description: 'Multi-line text area',
      example: '📝 Detailed response'
    },
    {
      id: 'nps',
      name: 'NPS Score',
      icon: MdLinearScale,
      color: 'var(--bs-pink)',
      category: 'rating',
      description: 'Net Promoter Score (0-10)',
      example: '0️⃣ 1️⃣ ... 🔟'
    },
    {
      id: 'likert',
      name: 'Likert Scale',
      icon: MdLinearScale,
      color: 'var(--bs-orange)',
      category: 'rating',
      description: 'Agreement scale (1-5)',
      example: '1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣'
    },
    {
      id: 'yes_no',
      name: 'Yes/No',
      icon: MdToggleOn,
      color: 'var(--bs-teal)',
      category: 'choice',
      description: 'Simple yes or no',
      example: '✅ ❌'
    },
    {
      id: 'date',
      name: 'Date Picker',
      icon: MdDateRange,
      color: 'var(--bs-purple)',
      category: 'input',
      description: 'Select a date',
      example: '📅 2025-01-01'
    },
    {
      id: 'file_upload',
      name: 'File Upload',
      icon: MdCloudUpload,
      color: 'var(--bs-danger)',
      category: 'media',
      description: 'Upload files/images',
      example: '📂 ⬆️'
    },
    {
      id: 'ranking',
      name: 'Ranking',
      icon: MdDragHandle,
      color: 'var(--bs-dark)',
      category: 'advanced',
      description: 'Drag & drop ranking',
      example: '⬆️ 1️⃣ 2️⃣ 3️⃣ ⬇️'
    },
    {
      id: 'matrix',
      name: 'Matrix/Grid',
      icon: MdGridOn,
      color: 'var(--bs-gray-dark)',
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

  // Load existing survey if editing
  useEffect(() => {
    const loadSurvey = async () => {
      if (surveyId && !templateData) {
        try {
          setLoading(true);
          const response = await axiosInstance.get(`/surveys/${surveyId}`);

          if (response.data && (response.data.survey || response.data.data) && response.status < 400) {
            const surveyData = response.data.survey || response.data.data;

            setSurvey({
              title: surveyData.title || '',
              description: surveyData.description || '',
              category: surveyData.category || '',
              language: surveyData.language || ['English'],
              isPublic: surveyData.settings?.isPublic ?? true,
              allowAnonymous: surveyData.settings?.isAnonymous ?? true,
              collectEmail: false, // Not in backend model
              multipleResponses: false, // Not in backend model
              thankYouMessage: surveyData.thankYouPage?.message || 'Thank you for your valuable feedback!',
              redirectUrl: surveyData.thankYouPage?.redirectUrl || '',
              customCSS: '', // Not in backend model
              branding: {
                logo: surveyData.logo?.url || '',
                primaryColor: surveyData.themeColor || 'var(--bs-primary)',
                backgroundColor: 'var(--bs-body-bg)', // Default
                textColor: 'var(--bs-body-color)', // Default
                showBranding: true // Default
              },
              translations: {
                en: surveyData.translations?.en || { title: surveyData.title, description: surveyData.description },
                ar: surveyData.translations?.ar || {}
              }
            });

            if (surveyData.questions && surveyData.questions.length > 0) {
              // Transform backend questions to frontend format
              const transformedQuestions = surveyData.questions.map((q, index) => ({
                id: q.id || Date.now() + index,
                type: mapQuestionTypeFromBackend(q.type),
                title: q.questionText || '',
                description: q.description || '',
                required: q.required || false,
                options: q.options || [],
                settings: q.settings || {},
                translations: q.translations || {}
              }));
              setQuestions(transformedQuestions);
            }
          }
        } catch (error) {
          console.error('Error loading survey:', error);
          Swal.fire({
            icon: 'error',
            title: 'Loading Failed',
            text: 'Failed to load survey data. You may not have permission or the survey may not exist.'
          }).then(() => {
            navigate('/surveys');
          });
        } finally {
          setLoading(false);
        }
      }
    };

    loadSurvey();
  }, [surveyId, templateData, navigate]);

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
    console.log('🔍 Current companyProfile state:', companyProfile);
    console.log('🔍 Form values check:', {
      industry: companyProfile.industry,
      products: companyProfile.products,
      audience: companyProfile.targetAudience,
      goal: companyProfile.surveyGoal
    });


    if (!aiPrompt.trim() && !companyProfile.industry) {
      Swal.fire({
        icon: 'warning',
        title: 'Input Required',
        text: 'Please provide a survey description or select your company industry.',
      });
      return;
    }

    setAILoadingStates(prev => ({ ...prev, generating: true }));
    setGlobalLoading(true);
    try {
      // Enhanced payload with proper mapping to aiController endpoint
      const requestPayload = {
        industry: companyProfile.industry || 'general',
        products: companyProfile.products
          ? companyProfile.products.split(',').map(p => p.trim())
          : [],
        targetAudience: companyProfile.targetAudience || 'customers',
        goal: companyProfile.surveyGoal || aiPrompt || 'customer feedback',
        questionCount: companyProfile.questionCount || 8,
        includeNPS: companyProfile.includeNPS || true,
        languages: companyProfile.languages || ['English'],
        tone: companyProfile.tone || 'friendly-professional',
        additionalInstructions: companyProfile.additionalInstructions || aiPrompt.trim() || ''
      };

      console.log('🔍 Sending AI Request with payload:', requestPayload);

      // Call our enhanced AI API from aiController endpoint
      const response = await axiosInstance.post('/ai/generate-from-profile', requestPayload);

      if (response.data && (response.data.success || response.data.data || response.status < 400)) {
        const aiData = response.data.data || response.data;
        const aiSurvey = aiData.survey || {};
        const aiQuestions = aiData.questions || [];

        console.log('✅ AI Response received:', { aiSurvey, questionCount: aiQuestions.length });

        // Transform AI response to match our question format
        const transformedQuestions = aiQuestions.map((q, index) => ({
          id: Date.now() + index,
          type: mapAIQuestionType(q.type),
          title: q.title || q.text || `Question ${index + 1}`,
          description: q.description || '',
          required: q.required !== false,
          options: q.options || [],
          settings: q.settings || {},
          // Add bilingual support if available
          translations: q.translations || {}
        }));

        setQuestions(transformedQuestions);

        // Update survey details from AI with better mapping
        setSurvey(prev => ({
          ...prev,
          title: aiSurvey.title || survey.title || `${companyProfile.industry} Customer Survey`,
          description: aiSurvey.description || survey.description || `${companyProfile.surveyGoal} survey for ${companyProfile.industry}`,
          category: companyProfile.industry || prev.category,
          language: aiSurvey.languages || prev.language
        }));

        // Move to review step in AI workflow
        setAIWorkflowStep(2);
        setAIGeneratedDraft(aiData);
        setShowAIModal(false);
        setAIPrompt('');

        Swal.fire({
          icon: 'success',
          title: '✨ AI Survey Generated!',
          html: `
            <div style="text-align: left;">
              <p><strong>Industry:</strong> ${companyProfile.industry}</p>
              <p><strong>Target:</strong> ${companyProfile.targetAudience}</p>
              <p><strong>Generated:</strong> ${transformedQuestions.length} optimized questions</p>
              <p><strong>Includes:</strong> Rating scales, multiple choice, NPS, and feedback sections</p>
            </div>
          `,
          timer: 4000,
          showConfirmButton: false
        });
      } else {
        throw new Error('Invalid AI response format');
      }

    } catch (error) {
      console.error('❌ Error generating AI survey:', error);
      console.log('Error details:', error.response?.data);

      Swal.fire({
        icon: 'error',
        title: 'Generation Failed',
        html: `
          <p>Failed to generate AI survey.</p>
          <small>Error: ${error.response?.data?.message || error.message}</small>
          <br><small>Please try again or check your internet connection.</small>
        `
      });
    } finally {
      setAILoadingStates(prev => ({ ...prev, generating: false }));
      setGlobalLoading(false);
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

  // Helper function to map frontend question types to backend enum values
  const mapQuestionTypeToBackend = (frontendType) => {
    const typeMapping = {
      'rating': 'rating',
      'single_choice': 'radio',
      'multiple_choice': 'checkbox',
      'text_short': 'text',
      'text_long': 'textarea',
      'nps': 'nps',
      'likert': 'likert',
      'yes_no': 'yesno',
      'date': 'date',
      'file_upload': 'text', // Fallback to text for now
      'ranking': 'ranking',
      'matrix': 'matrix'
    };
    return typeMapping[frontendType] || 'text';
  };

  // Helper function to map backend question types to frontend types
  const mapQuestionTypeFromBackend = (backendType) => {
    const typeMapping = {
      'rating': 'rating',
      'radio': 'single_choice',
      'checkbox': 'multiple_choice',
      'text': 'text_short',
      'textarea': 'text_long',
      'nps': 'nps',
      'likert': 'likert',
      'yesno': 'yes_no',
      'date': 'date',
      'ranking': 'ranking',
      'matrix': 'matrix'
    };
    return typeMapping[backendType] || 'text_short';
  };

  // AI Draft Survey Generation (Alternative approach using aiDraftSurvey endpoint)
  const generateAIDraft = async () => {
    try {
      setAILoadingStates(prev => ({ ...prev, generating: true }));

      const response = await axiosInstance.post('/ai/draft', {
        goal: aiPrompt || companyProfile.surveyGoal || 'customer feedback',
        industry: companyProfile.industry || '',
        products: companyProfile.products ? companyProfile.products.split(',').map(p => p.trim()) : [],
        tone: 'friendly',
        language: 'en',
        questionCount: 6,
        surveyType: 'customer-feedback',
        targetAudience: companyProfile.targetAudience || 'customers',
        useTemplates: false,
        includeLogic: true
      });

      const result = response.data;

      if (result.draft) {
        // Handle different draft response formats
        if (Array.isArray(result.draft)) {
          // Simple array format
          const mappedQuestions = result.draft.map((questionText, index) => ({
            id: `q_${Date.now()}_${index}`,
            type: 'text_short',
            title: questionText,
            description: '',
            required: true,
            options: []
          }));
          setQuestions(mappedQuestions);
        } else if (result.draft.questions) {
          // Full object format
          setSurvey(prev => ({
            ...prev,
            title: result.draft.title || prev.title,
            description: result.draft.description || prev.description
          }));

          const mappedQuestions = result.draft.questions.map((q, index) => ({
            id: q.id || `q_${Date.now()}_${index}`,
            type: mapAIQuestionType(q.type),
            title: q.questionText || q.title,
            description: q.description || '',
            required: q.required !== false,
            options: q.options || [],
            settings: { scale: q.scale ? parseInt(q.scale.split('-')[1]) : 5 },
            logic: q.logic || null
          }));
          setQuestions(mappedQuestions);
        }

        setAIWorkflowStep(2);
        setShowAIModal(false);

        Swal.fire({
          icon: 'success',
          title: 'Draft Generated!',
          text: `Created ${questions.length} questions from your requirements.`,
          timer: 3000,
          showConfirmButton: false
        });
      }
    } catch (error) {
      console.error('AI Draft Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Draft Generation Failed',
        text: 'Could not generate survey draft. Please try again.',
        confirmButtonColor: 'var(--bs-primary)'
      });
    } finally {
      setAILoadingStates(prev => ({ ...prev, generating: false }));
    }
  };

  // AI Suggest Next Question (Flow.md feature)
  const suggestNextQuestion = async () => {
    try {
      setAILoadingStates(prev => ({ ...prev, suggesting: true }));

      const context = `Survey: ${survey.title}. Goal: ${companyProfile.surveyGoal}. Existing questions: ${questions.length}`;

      const response = await axiosInstance.post('/ai/suggest-question', {
        surveyId: surveyId,
        context: context,
        questionCount: 3
      });

      const result = response.data;

      if (result.suggestions && Array.isArray(result.suggestions)) {
        // Show suggestions in a modal or popup
        const suggestionTexts = result.suggestions.map(s =>
          typeof s === 'string' ? s : s.questionText || s.title
        ).join('\n\n');

        const { value: selectedSuggestion } = await Swal.fire({
          title: 'AI Question Suggestions',
          input: 'textarea',
          inputLabel: 'Choose or edit a suggestion:',
          inputValue: suggestionTexts.split('\n\n')[0],
          inputPlaceholder: 'Select a suggested question...',
          showCancelButton: true,
          confirmButtonText: 'Add Question',
          cancelButtonText: 'Cancel',
          inputValidator: (value) => {
            if (!value.trim()) {
              return 'Please select or enter a question';
            }
          }
        });

        if (selectedSuggestion) {
          const newQuestion = {
            id: `q_${Date.now()}`,
            type: 'text_short',
            title: selectedSuggestion.trim(),
            description: '',
            required: true,
            options: []
          };

          setQuestions(prev => [...prev, newQuestion]);
          setSelectedQuestion(newQuestion.id);
        }
      }
    } catch (error) {
      console.error('AI Suggestion Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Suggestion Failed',
        text: 'Could not get AI suggestions. Please try again.',
        confirmButtonColor: 'var(--bs-primary)'
      });
    } finally {
      setAILoadingStates(prev => ({ ...prev, suggesting: false }));
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
      setAILoadingStates(prev => ({ ...prev, optimizing: true }));

      // First save the survey to get an ID if it doesn't exist
      let currentSurveyId = surveyId;
      if (!currentSurveyId) {
        await saveSurvey();
        // Note: In a real implementation, you'd get the ID from the save response
        currentSurveyId = 'temp_' + Date.now();
      }

      const response = await axiosInstance.post('/ai/optimize-survey', {
        surveyId: currentSurveyId
      });

      const result = response.data;

      if (result.optimized) {
        // Show optimization suggestions
        const suggestions = result.optimized;
        
        let suggestionText = 'AI Optimization Suggestions:\n\n';
        
        if (suggestions.replaceQuestionIds && suggestions.replaceQuestionIds.length > 0) {
          suggestionText += `Questions to improve: ${suggestions.replaceQuestionIds.length}\n`;
        }
        
        if (suggestions.recommendedLength) {
          suggestionText += `Recommended length: ${suggestions.recommendedLength} questions\n`;
        }
        
        if (suggestions.suggestions && Array.isArray(suggestions.suggestions)) {
          suggestionText += '\nSuggestions:\n' + suggestions.suggestions.join('\n');
        }
        
        const { isConfirmed } = await Swal.fire({
          title: 'Survey Optimization',
          text: suggestionText,
          icon: 'info',
          showCancelButton: true,
          confirmButtonText: 'Apply Suggestions',
          cancelButtonText: 'Keep Current',
          confirmButtonColor: 'var(--bs-primary)'
        });
        
        if (isConfirmed && suggestions.optimizedQuestions) {
          // Apply optimized questions if provided
          const optimizedQuestions = suggestions.optimizedQuestions.map((q, index) => ({
            id: q.id || `q_optimized_${Date.now()}_${index}`,
            type: mapAIQuestionType(q.type),
            title: q.questionText || q.title,
            description: q.description || '',
            required: q.required !== false,
            options: q.options || [],
            settings: { scale: q.scale ? parseInt(q.scale.split('-')[1]) : 5 }
          }));
          
          setQuestions(optimizedQuestions);
          
          Swal.fire({
            icon: 'success',
            title: 'Survey Optimized!',
            text: 'Your survey has been optimized based on AI recommendations.',
            timer: 3000,
            showConfirmButton: false
          });
        }
      }
    } catch (error) {
      console.error('AI Optimization Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Optimization Failed',
        text: 'Could not optimize survey. Please try again.',
        confirmButtonColor: 'var(--bs-primary)'
      });
    } finally {
      setAILoadingStates(prev => ({ ...prev, optimizing: false }));
    }
  };

  // AI Translation Function
  const translateSurvey = async (targetLanguage) => {
    try {
      setAILoadingStates(prev => ({ ...prev, translating: true }));
      
      const textsToTranslate = [
        survey.title,
        survey.description,
        ...questions.map(q => q.title),
        ...questions.map(q => q.description),
        ...questions.flatMap(q => q.options || [])
      ].filter(Boolean).join('\n---\n');
      
      const response = await axiosInstance.post('/ai/translate-survey', {
        text: textsToTranslate,
        from: 'en',
        to: targetLanguage
      });
      
      const result = response.data;
      
      if (result.translated) {
        // Store translation in survey state
        setSurvey(prev => ({
          ...prev,
          translations: {
            ...prev.translations,
            [targetLanguage]: {
              title: result.translated.split('\n---\n')[0] || prev.title,
              description: result.translated.split('\n---\n')[1] || prev.description
            }
          }
        }));
        
        Swal.fire({
          icon: 'success',
          title: 'Translation Complete!',
          text: `Survey translated to ${targetLanguage.toUpperCase()}`,
          timer: 3000,
          showConfirmButton: false
        });
      }
    } catch (error) {
      console.error('Translation Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Translation Failed',
        text: 'Could not translate survey. Please try again.',
        confirmButtonColor: 'var(--bs-primary)'
      });
    } finally {
      setAILoadingStates(prev => ({ ...prev, translating: false }));
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
      confirmButtonColor: 'var(--bs-danger)',
      cancelButtonColor: 'var(--bs-secondary)',
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

      // Prepare survey data in backend format
      const surveyData = {
        title: survey.title,
        description: survey.description,
        category: survey.category,
        themeColor: survey.branding?.primaryColor || 'var(--bs-primary)',
        // Transform questions to backend format
        questions: questions.map((q, index) => ({
          id: q.id?.toString() || (index + 1).toString(),
          questionText: q.title,
          type: mapQuestionTypeToBackend(q.type),
                options: q.options || [],
                required: q.required || false,
                translations: q.translations || {},
          logicRules: q.logicRules || []
        })),
        settings: {
          isPublic: survey.isPublic,
          isAnonymous: survey.allowAnonymous,
          isPasswordProtected: false,
          password: ''
        },
        translations: {
          en: {
            title: survey.title,
            description: survey.description
          },
          ar: survey.translations?.ar || {}
        },
        thankYouPage: {
          message: survey.thankYouMessage || 'Thank you for your feedback!',
          redirectUrl: survey.redirectUrl || '',
          qrCode: {
            enabled: false,
            url: ''
          }
        },
        status: 'draft'
      };

      let response;
      if (isEditing && surveyId) {
        // Update existing survey
        response = await axiosInstance.put(`/surveys/${surveyId}`, surveyData);
      } else {
        // Create new survey
        response = await axiosInstance.post('/surveys/create', surveyData);
      }

      if (response.data && response.data.message && response.status < 400) {
        Swal.fire({
          icon: 'success',
          title: isEditing ? 'Survey Updated!' : 'Survey Saved!',
          text: `Your survey has been ${isEditing ? 'updated' : 'saved'} successfully.`,
          timer: 2000,
          showConfirmButton: false
        });

        // Navigate to survey list after save
        setTimeout(() => {
          navigate('/app/surveys');
        }, 2000);
      } else {
        throw new Error(response.data?.message || 'Failed to save survey');
      }

    } catch (error) {
      console.error('Error saving survey:', error);
      console.log('Full error response:', error.response);
      console.log('Error response data:', error.response?.data);

      Swal.fire({
        icon: 'error',
        title: 'Save Failed',
        text: error.response?.data?.message || error.message || 'Failed to save survey. Please try again.'
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
      confirmButtonColor: 'var(--bs-success)',
      cancelButtonColor: 'var(--bs-secondary)',
      confirmButtonText: 'Yes, Publish'
    });

    if (result.isConfirmed) {
      setSaving(true);
      try {
        // Validate survey
        if (!survey.title.trim()) {
          throw new Error('Survey title is required');
        }
        if (questions.length === 0) {
          throw new Error('At least one question is required');
        }

        // Prepare survey data with published status in backend format
        const surveyData = {
          title: survey.title,
          description: survey.description,
          category: survey.category,
          themeColor: survey.branding?.primaryColor || 'var(--bs-primary)',
          questions: questions.map((q, index) => ({
            id: q.id?.toString() || (index + 1).toString(),
            questionText: q.title,
            type: mapQuestionTypeToBackend(q.type),
            options: q.options || [],
            required: q.required || false,
            translations: q.translations || {},
            logicRules: q.logicRules || []
          })),
          settings: {
            isPublic: survey.isPublic,
            isAnonymous: survey.allowAnonymous,
            isPasswordProtected: false,
            password: ''
          },
          translations: {
            en: {
              title: survey.title,
              description: survey.description
            },
            ar: survey.translations?.ar || {}
          },
          thankYouPage: {
            message: survey.thankYouMessage || 'Thank you for your feedback!',
            redirectUrl: survey.redirectUrl || '',
            qrCode: {
              enabled: false,
              url: ''
            }
          },
          status: 'active' // Set as active when publishing
        };

        let response;
        if (isEditing && surveyId) {
          // Update and publish existing survey
          response = await axiosInstance.put(`/surveys/${surveyId}`, surveyData);
        } else {
          // Create and publish new survey
          response = await axiosInstance.post('/surveys/create', surveyData);
        }

        if (response.data && response.data.message && response.status < 400) {
          Swal.fire({
            icon: 'success',
            title: 'Survey Published!',
            text: 'Your survey is now live and ready to receive responses.',
            timer: 2000,
            showConfirmButton: false
          });

          // Navigate to survey list after publish
          setTimeout(() => {
            navigate('/app/surveys');
          }, 2000);
        } else {
          throw new Error(response.data?.message || 'Failed to publish survey');
        }

      } catch (error) {
        console.error('Error publishing survey:', error);
        Swal.fire({
          icon: 'error',
          title: 'Publish Failed',
          text: error.response?.data?.message || error.message || 'Failed to publish survey. Please try again.'
        });
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

  if (loading) {
    return (
      <Container fluid className="survey-builder">
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
          <div className="text-center">
            <Spinner animation="border" variant="primary" className="mb-3" />
            <h5>Loading Survey...</h5>
            <p className="text-muted">Please wait while we fetch your survey data.</p>
          </div>
        </div>
      </Container>
    );
  }

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

                    {/* Survey Mode Selector */}
                    {showModeSelector && !isEditing && (
                      <div className="bg-light rounded p-3 mb-3">
                        <h6 className="fw-bold mb-3">Choose Creation Method</h6>
                        <Row>
                          <Col md={6}>
                            <Card
                              className={`h-100 cursor-pointer border-2 ${surveyMode === 'user-defined' ? 'border-primary' : 'border-light'}`}
                              onClick={() => {
                                setSurveyMode('user-defined');
                                setShowModeSelector(false);
                              }}
                            >
                              <Card.Body className="text-center">
                                <MdBuild size={48} className="text-primary mb-3" />
                                <h6 className="fw-bold">Manual Creation</h6>
                                <p className="text-muted small">Build your survey step-by-step with full control over every question and setting.</p>
                                <Button
                                  variant={surveyMode === 'user-defined' ? 'primary' : 'outline-primary'}
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSurveyMode('user-defined');
                                    setShowModeSelector(false);
                                  }}
                                >
                                  Start Building
                                </Button>
                              </Card.Body>
                            </Card>
                          </Col>
                          <Col md={6}>
                            <Card
                              className={`h-100 cursor-pointer border-2 ${surveyMode === 'ai-assisted' ? 'border-success' : 'border-light'}`}
                              onClick={() => {
                                setSurveyMode('ai-assisted');
                                setShowAIModal(true);
                                setShowModeSelector(false);
                              }}
                            >
                              <Card.Body className="text-center">
                                <MdSmartToy size={48} className="text-success mb-3" />
                                <h6 className="fw-bold">AI-Powered Creation</h6>
                                <p className="text-muted small">Let AI generate your survey based on your industry, goals, and preferences.</p>
                                <Button
                                  variant={surveyMode === 'ai-assisted' ? 'success' : 'outline-success'}
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSurveyMode('ai-assisted');
                                    setShowAIModal(true);
                                    setShowModeSelector(false);
                                  }}
                                >
                                  Get AI Help
                                </Button>
                              </Card.Body>
                            </Card>
                          </Col>
                        </Row>
                      </div>
                    )}

                    {/* AI Workflow Progress Indicator */}
                    {surveyMode === 'ai-assisted' && !showModeSelector && (
                      <div className="bg-success bg-opacity-10 rounded p-3 mb-3">
                        <h6 className="text-success fw-bold mb-2">
                          <MdSmartToy className="me-2" />
                          AI-Assisted Survey Creation
                        </h6>
                        <div className="d-flex align-items-center">
                          <div className="progress flex-grow-1 me-3" style={{ height: '8px' }}>
                            <div
                              className="progress-bar bg-success"
                              style={{ width: `${(aiWorkflowStep / 3) * 100}%` }}
                            />
                          </div>
                          <small className="text-muted">
                            Step {aiWorkflowStep} of 3: {
                              aiWorkflowStep === 1 ? 'Profile Setup' :
                                aiWorkflowStep === 2 ? 'Review & Edit' :
                                  'Customize & Publish'
                            }
                          </small>
                        </div>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          className="mt-2"
                          onClick={() => {
                            setSurveyMode('user-defined');
                            setAIWorkflowStep(1);
                            setShowModeSelector(true);
                          }}
                        >
                          Switch to Manual Mode
                        </Button>
                      </div>
                    )}

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
                      disabled={aiLoadingStates.generating}
                    >
                      {aiLoadingStates.generating ? (
                        <Spinner size="sm" className="me-2" />
                      ) : (
                        <MdAutoAwesome className="me-2" />
                      )}
                      AI Assistant
                    </Button>

                    {questions.length > 0 && (
                      <>
                        <Button
                          variant="outline-success"
                          onClick={suggestNextQuestion}
                          disabled={aiLoadingStates.suggesting}
                          size="sm"
                        >
                          {aiLoadingStates.suggesting ? (
                            <Spinner size="sm" className="me-2" />
                          ) : (
                            <MdAdd className="me-2" />
                          )}
                          Suggest Question
                        </Button>

                        <Button
                          variant="outline-info"
                          onClick={optimizeSurvey}
                          disabled={aiLoadingStates.optimizing}
                          size="sm"
                        >
                          {aiLoadingStates.optimizing ? (
                            <Spinner size="sm" className="me-2" />
                          ) : (
                            <MdTune className="me-2" />
                          )}
                          Optimize
                        </Button>
                      </>
                    )}

                    {questions.length > 0 && !survey.language.includes('Arabic') && (
                      <OverlayTrigger
                        placement="bottom"
                        overlay={<Tooltip>Add Arabic translations using AI</Tooltip>}
                      >
                        <Button
                          variant="outline-warning"
                          onClick={() => translateSurvey('ar')}
                          disabled={aiLoadingStates.translating}
                          size="sm"
                        >
                          {aiLoadingStates.translating ? (
                            <Spinner size="sm" className="me-2" />
                          ) : (
                            <MdTranslate className="me-2" />
                          )}
                          Translate
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
                      <Form.Label className="fw-semibold">Industry/Category *</Form.Label>
                      <Form.Select
                        value={companyProfile.industry}
                        onChange={(e) => {
                          console.log('Industry selected:', e.target.value);
                          setCompanyProfile({ ...companyProfile, industry: e.target.value });
                        }}
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
                        onChange={(e) => {
                          console.log('Products updated:', e.target.value);
                          setCompanyProfile({ ...companyProfile, products: e.target.value });
                        }}
                        placeholder="e.g., Hotel Rooms, Restaurant, Spa"
                      />
                      <Form.Text className="text-muted">
                        Separate multiple items with commas
                      </Form.Text>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Target Audience *</Form.Label>
                      <Form.Select
                        value={companyProfile.targetAudience}
                        onChange={(e) => {
                          console.log('Audience selected:', e.target.value);
                          setCompanyProfile({ ...companyProfile, targetAudience: e.target.value });
                        }}
                      >
                        <option value="">Select Audience</option>
                        <option value="customers">Customers</option>
                        <option value="guests">Guests/Visitors</option>
                        <option value="employees">Employees</option>
                        <option value="vendors">Vendors/Partners</option>
                        <option value="students">Students</option>
                        <option value="patients">Patients</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Survey Goal *</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        value={companyProfile.surveyGoal}
                        onChange={(e) => {
                          console.log('Goal updated:', e.target.value);
                          setCompanyProfile({ ...companyProfile, surveyGoal: e.target.value });
                        }}
                        placeholder="e.g., Customer Satisfaction"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Advanced AI Configuration */}
                <Accordion className="mb-4">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <MdTune className="me-2" />
                      Advanced AI Settings
                    </Accordion.Header>
                    <Accordion.Body>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Question Count</Form.Label>
                            <Form.Select
                              value={companyProfile.questionCount}
                              onChange={(e) => setCompanyProfile({
                                ...companyProfile,
                                questionCount: parseInt(e.target.value)
                              })}
                            >
                              <option value={5}>5 Questions (Quick)</option>
                              <option value={8}>8 Questions (Standard)</option>
                              <option value={12}>12 Questions (Comprehensive)</option>
                              <option value={15}>15 Questions (Detailed)</option>
                            </Form.Select>
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Survey Tone</Form.Label>
                            <Form.Select
                              value={companyProfile.tone}
                              onChange={(e) => setCompanyProfile({
                                ...companyProfile,
                                tone: e.target.value
                              })}
                            >
                              <option value="friendly-professional">Friendly & Professional</option>
                              <option value="formal">Formal</option>
                              <option value="casual">Casual & Relaxed</option>
                              <option value="neutral">Neutral</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>

                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Languages</Form.Label>
                            <div>
                              {['English', 'Arabic', 'Both'].map(lang => (
                                <Form.Check
                                  key={lang}
                                  type="checkbox"
                                  id={`lang-${lang}`}
                                  label={lang}
                                  checked={companyProfile.languages.includes(lang)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setCompanyProfile({
                                        ...companyProfile,
                                        languages: [...companyProfile.languages, lang]
                                      });
                                    } else {
                                      setCompanyProfile({
                                        ...companyProfile,
                                        languages: companyProfile.languages.filter(l => l !== lang)
                                      });
                                    }
                                  }}
                                />
                              ))}
                            </div>
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Check
                              type="checkbox"
                              id="include-nps"
                              label="Include NPS Question"
                              checked={companyProfile.includeNPS}
                              onChange={(e) => setCompanyProfile({
                                ...companyProfile,
                                includeNPS: e.target.checked
                              })}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Form.Group className="mb-3">
                        <Form.Label>Additional Instructions</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={4}
                          value={companyProfile.additionalInstructions}
                          onChange={(e) => setCompanyProfile({
                            ...companyProfile,
                            additionalInstructions: e.target.value
                          })}
                          placeholder="Specific requirements, question topics to include/exclude, industry-specific needs..."
                        />
                      </Form.Group>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>

                {/* Debug Info */}
                {import.meta.env.DEV && (
                  <Alert variant="info" className="small">
                    <strong>Debug Info:</strong><br />
                    Industry: {companyProfile.industry || 'Not selected'}<br />
                    Products: {companyProfile.products || 'Not specified'}<br />
                    Audience: {companyProfile.targetAudience || 'Not selected'}<br />
                    Goal: {companyProfile.surveyGoal || 'Not specified'}
                  </Alert>
                )}

                <Alert variant="info" className="d-flex align-items-start">
                  <FaLightbulb className="me-2 mt-1" />
                  <div>
                    <strong>AI will generate:</strong>
                    <ul className="mb-0 mt-1">
                      <li>8-12 relevant questions based on your industry</li>
                      <li>Mix of Likert scale, rating, choice, and text questions</li>
                      <li>Hospitality-focused sections (rooms, restaurant, spa, staff)</li>
                      <li>Professional yet friendly tone for guest comfort</li>
                      <li>NPS question for recommendation tracking</li>
                    </ul>
                  </div>
                </Alert>
              </Modal.Body>
              <Modal.Footer className="d-flex justify-content-between">
                <div>
                  {questions.length > 0 && (
                    <Button
                      variant="outline-success"
                      onClick={suggestNextQuestion}
                      disabled={aiLoadingStates.suggesting}
                      size="sm"
                    >
                      {aiLoadingStates.suggesting ? (
                        <>
                          <Spinner size="sm" className="me-2" />
                          Suggesting...
                        </>
                      ) : (
                        <>
                          <MdAdd className="me-2" />
                          Suggest Question
                        </>
                      )}
                    </Button>
                  )}
                </div>

                <div>
                  <Button variant="secondary" onClick={() => setShowAIModal(false)} className="me-2">
                    Cancel
                  </Button>

                  <Button
                    variant="outline-primary"
                    onClick={generateAIDraft}
                    disabled={aiLoadingStates.generating || !companyProfile.industry}
                    className="me-2"
                  >
                    {aiLoadingStates.generating ? (
                      <Spinner size="sm" className="me-2" />
                    ) : (
                      <MdEdit className="me-2" />
                    )}
                    Quick Draft
                  </Button>

                  <Button
                    variant="primary"
                    onClick={() => {
                      console.log('🎯 Generate button clicked with profile:', companyProfile);
                      generateAISurvey();
                    }}
                    disabled={aiLoadingStates.generating || !companyProfile.industry || !companyProfile.targetAudience}
                  >
                    {aiLoadingStates.generating ? (
                      <>
                        <Spinner size="sm" className="me-2" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <MdAutoAwesome className="me-2" />
                        Generate Complete Survey
                      </>
                    )}
                  </Button>
                </div>
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

            {/* Settings Offcanvas */}
            <Offcanvas
              show={showSettingsOffcanvas}
              onHide={() => setShowSettingsOffcanvas(false)}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title className="d-flex align-items-center">
                  <MdSettings className="me-2" />
                  Survey Settings
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Form>
                  <h6 className="mb-3">Response Settings</h6>

                  <Form.Check
                    type="switch"
                    id="public-survey-off"
                    label="Make survey public"
                    checked={survey.isPublic}
                    onChange={(e) => setSurvey({ ...survey, isPublic: e.target.checked })}
                    className="mb-3"
                  />

                  <Form.Check
                    type="switch"
                    id="anonymous-responses-off"
                    label="Allow anonymous responses"
                    checked={survey.allowAnonymous}
                    onChange={(e) => setSurvey({ ...survey, allowAnonymous: e.target.checked })}
                    className="mb-3"
                  />

                  <Form.Check
                    type="switch"
                    id="collect-email-off"
                    label="Collect email addresses"
                    checked={survey.collectEmail}
                    onChange={(e) => setSurvey({ ...survey, collectEmail: e.target.checked })}
                    className="mb-3"
                  />

                  <Form.Check
                    type="switch"
                    id="multiple-responses-off"
                    label="Allow multiple responses from same user"
                    checked={survey.multipleResponses}
                    onChange={(e) => setSurvey({ ...survey, multipleResponses: e.target.checked })}
                    className="mb-4"
                  />

                  <h6 className="mb-3">Branding</h6>

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

                  <Form.Group className="mb-4">
                    <Form.Label>Text Color</Form.Label>
                    <Form.Control
                      type="color"
                      value={survey.branding.textColor}
                      onChange={(e) => setSurvey({
                        ...survey,
                        branding: { ...survey.branding, textColor: e.target.value }
                      })}
                    />
                  </Form.Group>

                  <h6 className="mb-3">Completion</h6>

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
                </Form>
              </Offcanvas.Body>
            </Offcanvas>
          </Container>
    );
};

export default SurveyBuilder;