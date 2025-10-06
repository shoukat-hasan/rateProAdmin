import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Row, Col, Card, Button, Badge, Form,
  InputGroup, Modal, Spinner, Alert,
  OverlayTrigger, Tooltip
} from 'react-bootstrap';
import {
  MdDescription, MdAdd, MdSearch, MdFilterList,
  MdVisibility, MdEdit, MdContentCopy, MdStar,
  MdBusiness, MdSchool, MdLocalHospital, MdHotel,
  MdSports, MdAccountBalance, MdShoppingCart,
  MdLocationCity, MdConstruction, MdDirectionsCar,
  MdComputer, MdCategory
} from 'react-icons/md';
import { FaUsers, FaChartBar, FaClock, FaLanguage } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import Pagination from '../../components/Pagination/Pagination';
import Swal from 'sweetalert2';
import './SurveyTemplates.css';

const SurveyTemplates = ({ darkMode }) => {
  const navigate = useNavigate();
  const { setGlobalLoading } = useAuth();
  
  // State Management
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  
  // Modal States
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  
  // Pagination State
  const [pagination, setPagination] = useState({ page: 1, limit: 12, total: 0 });
  
  // Template Categories - Complete client requirements - Use useMemo to prevent dependency issues
  const categories = React.useMemo(() => [
    {
      id: 'corporate',
      name: 'Corporate / HR',
      icon: MdBusiness,
      color: '#007bff',
      description: 'Employee engagement, satisfaction, and HR processes',
      templates: [
        'Employee Engagement Survey',
        'Employee Satisfaction Survey', 
        'Onboarding Experience Survey',
        'Training Effectiveness Survey',
        'Exit Interview Survey',
        'Diversity & Inclusion Survey',
        'Remote Work Experience Survey',
        'Performance Review Feedback',
        'Manager Effectiveness Survey',
        'Workplace Culture Assessment'
      ]
    },
    {
      id: 'education',
      name: 'Education',
      icon: MdSchool,
      color: '#28a745',
      description: 'Student satisfaction, course evaluation, and academic feedback',
      templates: [
        'Student Satisfaction Survey',
        'Faculty Feedback Survey',
        'Course Evaluation Survey',
        'Online Learning Experience Survey',
        'Parent Satisfaction Survey',
        'Alumni Engagement Survey',
        'Campus Facilities Survey',
        'Library Services Survey',
        'Student Support Services Survey',
        'Academic Program Assessment'
      ]
    },
    {
      id: 'healthcare',
      name: 'Healthcare',
      icon: MdLocalHospital,
      color: '#dc3545',
      description: 'Patient satisfaction, medical services, and healthcare experience',
      templates: [
        'Patient Satisfaction Survey',
        'Doctor Service Feedback Survey',
        'Nurse Care Experience Survey',
        'Appointment Experience Survey',
        'Hospital Facility Survey',
        'Emergency Department Survey',
        'Discharge Process Survey',
        'Telemedicine Experience Survey',
        'Medical Insurance Survey',
        'Pharmacy Services Survey'
      ]
    },
    {
      id: 'hospitality',
      name: 'Hospitality & Tourism',
      icon: MdHotel,
      color: '#ffc107',
      description: 'Guest satisfaction, travel experience, and hospitality services',
      templates: [
        'Hotel Guest Satisfaction Survey',
        'Restaurant Experience Survey',
        'Travel & Tour Feedback Survey',
        'Event Experience Survey',
        'Conference Feedback Survey',
        'Destination Tourism Survey',
        'Flight Experience Survey',
        'Cruise Experience Survey',
        'Resort Amenities Survey',
        'Wedding Venue Survey'
      ]
    },
    {
      id: 'sports',
      name: 'Sports & Entertainment',
      icon: MdSports,
      color: '#17a2b8',
      description: 'Fan experience, events, and entertainment services',
      templates: [
        'Stadium Experience Survey',
        'Fan Satisfaction Survey',
        'Event Entry Experience Survey',
        'Concession Services Survey',
        'Ticket Purchase Experience Survey',
        'Season Ticket Holder Survey',
        'Sports Club Membership Survey',
        'Entertainment Venue Survey',
        'Concert Experience Survey',
        'Sports Broadcast Survey'
      ]
    },
    {
      id: 'banking',
      name: 'Banking & Financial',
      icon: MdAccountBalance,
      color: '#6f42c1',
      description: 'Customer satisfaction, banking services, and financial products',
      templates: [
        'Bank Branch Experience Survey',
        'Digital Banking Survey',
        'Loan Application Survey',
        'Customer Service Survey',
        'ATM Experience Survey',
        'Credit Card Satisfaction Survey',
        'Investment Services Survey',
        'Insurance Claim Survey',
        'Mortgage Experience Survey',
        'Financial Advisory Survey'
      ]
    },
    {
      id: 'retail',
      name: 'Retail & E-Commerce',
      icon: MdShoppingCart,
      color: '#fd7e14',
      description: 'Shopping experience, product feedback, and retail services',
      templates: [
        'In-Store Shopping Survey',
        'Online Shopping Survey',
        'Product Quality Survey',
        'Delivery Experience Survey',
        'Customer Service Survey',
        'Return/Exchange Survey',
        'Store Layout Survey',
        'Checkout Experience Survey',
        'Loyalty Program Survey',
        'Product Recommendation Survey'
      ]
    },
    {
      id: 'government',
      name: 'Government & Public',
      icon: MdLocationCity,
      color: '#20c997',
      description: 'Citizen services, government processes, and public feedback',
      templates: [
        'Citizen Service Survey',
        'Government Website Survey',
        'License Application Survey',
        'Public Transport Survey',
        'Municipal Services Survey',
        'E-Government Survey',
        'Public Safety Survey',
        'Community Development Survey',
        'Tax Services Survey',
        'Public Health Survey'
      ]
    },
    {
      id: 'construction',
      name: 'Construction & Real Estate',
      icon: MdConstruction,
      color: '#6c757d',
      description: 'Property satisfaction, construction feedback, and real estate services',
      templates: [
        'Home Buyer Survey',
        'Tenant Satisfaction Survey',
        'Construction Quality Survey',
        'Property Management Survey',
        'Real Estate Agent Survey',
        'Maintenance Services Survey',
        'Property Viewing Survey',
        'Neighborhood Survey',
        'Facility Management Survey',
        'Contractor Performance Survey'
      ]
    },
    {
      id: 'automotive',
      name: 'Automotive & Transport',
      icon: MdDirectionsCar,
      color: '#e83e8c',
      description: 'Vehicle services, transport experience, and automotive feedback',
      templates: [
        'Car Purchase Survey',
        'Vehicle Service Survey',
        'Car Rental Survey',
        'Public Transport Survey',
        'Parking Services Survey',
        'Driving Experience Survey',
        'Auto Insurance Survey',
        'Dealership Experience Survey',
        'Taxi/Ride Service Survey',
        'Traffic Management Survey'
      ]
    },
    {
      id: 'technology',
      name: 'Technology & Digital',
      icon: MdComputer,
      color: '#495057',
      description: 'Software feedback, IT services, and technology experience',
      templates: [
        'App Usability Survey',
        'Website Experience Survey',
        'IT Support Survey',
        'Software Feedback Survey',
        'Cybersecurity Survey',
        'Product Beta Testing Survey',
        'Technology Training Survey',
        'Digital Transformation Survey',
        'Cloud Services Survey',
        'Mobile App Survey'
      ]
    }
  ], []);



  // Initialize templates on mount
  useEffect(() => {
    const generateAndSetTemplates = () => {
      const generatedTemplates = [];
      let id = 1;
      
      categories.forEach(category => {
        category.templates.forEach(templateName => {
          generatedTemplates.push({
            id: id++,
            name: templateName,
            description: `Professional ${templateName.toLowerCase()} designed for ${category.name.toLowerCase()} sector. Get actionable insights and improve your organization.`,
            category: category.id,
            categoryName: category.name,
            categoryIcon: category.icon,
            categoryColor: category.color,
            questions: Math.floor(Math.random() * 15) + 8,
            estimatedTime: `${Math.floor(Math.random() * 6) + 5} min`,
            popular: Math.random() > 0.7,
            isNew: Math.random() > 0.8,
            isPremium: Math.random() > 0.6,
            rating: (4.2 + Math.random() * 0.8).toFixed(1),
            usageCount: Math.floor(Math.random() * 2000) + 100,
            language: Math.random() > 0.3 ? ['English', 'Arabic'] : ['English'],
            tags: [
              category.name.split(' ')[0].toLowerCase(),
              'feedback',
              'survey',
              templateName.split(' ')[0].toLowerCase()
            ]
          });
        });
      });
      
      return generatedTemplates;
    };
    
    const generatedTemplates = generateAndSetTemplates();
    setTemplates(generatedTemplates);
    setFilteredTemplates(generatedTemplates);
    setLoading(false);
    setPagination(prev => ({ ...prev, total: generatedTemplates.length }));
  }, [categories]);

  // Filter templates when search/category changes
  useEffect(() => {
    let filtered = templates.filter((template) => {
      const matchesSearch =
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || template.category === selectedCategory
      const matchesLanguage = selectedLanguage === "all" || template.language.some(lang => 
        lang.toLowerCase() === selectedLanguage.toLowerCase()
      )
      return matchesSearch && matchesCategory && matchesLanguage
    });

    // Sort filtered results
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.usageCount - a.usageCount);
        break;
      case 'rating':
        filtered.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'alphabetical':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    setFilteredTemplates(filtered);
    setPagination(prev => ({ ...prev, total: filtered.length, page: 1 }));
  }, [templates, searchTerm, selectedCategory, selectedLanguage, sortBy]);

  // Category options for filter dropdown
  const categoryOptions = [
    { value: "all", label: "All Categories" },
    ...categories.map(cat => ({ value: cat.id, label: cat.name }))
  ]

  // Handler Functions
  const handlePreviewTemplate = (template) => {
    setSelectedTemplate(template);
    setShowPreviewModal(true);
  };

  const handleUseTemplate = async (template) => {
    console.log('=== SurveyTemplates: handleUseTemplate called ===');
    console.log('Template data:', template);
    
    try {
      console.log('Setting global loading to true');
      setGlobalLoading(true);
      
      // In production, this would create a new survey from the template
      console.log('Showing confirmation dialog');
      const result = await Swal.fire({
        title: 'Create Survey from Template',
        text: `Create a new survey using "${template.name}" template?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#007bff',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Yes, Create Survey',
        cancelButtonText: 'Cancel'
      });

      console.log('Dialog result:', result);
      
      if (result.isConfirmed) {
        console.log('User confirmed, navigating to survey builder with template data');
        console.log('Navigation state:', { template: template, from: 'templates' });
        
        // Navigate to create survey with template
        navigate('/surveys/create', { 
          state: { 
            template: template,
            from: 'templates' 
          } 
        });
        
        console.log('Navigation completed');
      } else {
        console.log('User cancelled template selection');
      }
    } catch (error) {
      console.error('=== SurveyTemplates: Error using template ===');
      console.error('Error details:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to create survey from template. Please try again.'
      });
    } finally {
      console.log('Setting global loading to false');
      setGlobalLoading(false);
      console.log('=== SurveyTemplates: handleUseTemplate completed ===');
    }
  };

  const handleCreateCustomTemplate = () => {
    navigate('/surveys/templates/create');
  };

  // Get statistics for display
  const getTemplateStats = () => {
    const totalTemplates = templates.length;
    const popularTemplates = templates.filter(t => t.popular).length;
    const newTemplates = templates.filter(t => t.isNew).length;
    const categoriesWithTemplates = categories.filter(cat => 
      templates.some(t => t.category === cat.id)
    ).length;

    return {
      total: totalTemplates,
      popular: popularTemplates,
      new: newTemplates,
      categories: categoriesWithTemplates
    };
  };

  const stats = getTemplateStats();

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
  

  const getCategoryBadge = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    if (!category) return <Badge bg="secondary">Unknown</Badge>;
    
    return (
      <Badge 
        bg="light" 
        text="dark" 
        style={{ 
          backgroundColor: category.color + '20', 
          color: category.color,
          border: `1px solid ${category.color}40`
        }}
      >
        <category.icon className="me-1" size={12} />
        {category.name}
      </Badge>
    );
  }

  return (
    <Container fluid>
      {/* Header Section */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <div className="d-flex align-items-center mb-2">
                <MdDescription className="me-2 text-primary" size={32} />
                <h1 className="h3 mb-0 fw-bold">Survey Templates</h1>
              </div>
              <p className="text-muted mb-2">
                Choose from {stats.total} professional templates across {stats.categories} industries
              </p>
              
              {/* Quick Stats */}
              <div className="d-flex gap-3">
                <Badge bg="primary" className="d-flex align-items-center">
                  <MdStar className="me-1" size={12} />
                  {stats.popular} Popular
                </Badge>
                <Badge bg="success" className="d-flex align-items-center">
                  {stats.new} New
                </Badge>
                <Badge bg="info" className="d-flex align-items-center">
                  <MdCategory className="me-1" size={12} />
                  {stats.categories} Categories
                </Badge>
              </div>
            </div>
            <Button 
              variant="primary" 
              className="d-flex align-items-center"
              onClick={handleCreateCustomTemplate}
            >
              <MdAdd className="me-2" size={16} />
              Create Custom Template
            </Button>
          </div>
        </Col>
      </Row>

      {/* Search and Filters */}
      <Card className="mb-4 border-0 shadow-sm">
        <Card.Body className="py-3">
          <Row className="g-3 align-items-center">
            <Col lg={4}>
              <InputGroup>
                <InputGroup.Text className="bg-light border-end-0">
                  <MdSearch className="text-muted" size={16} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search templates by name, category, or keyword..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-start-0 ps-0"
                />
              </InputGroup>
            </Col>
            <Col lg={3}>
              <div className="d-flex align-items-center">
                <MdFilterList className="me-2 text-muted" size={16} />
                <Form.Select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border-0 bg-light"
                >
                  {categoryOptions.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </Col>
            <Col lg={3}>
              <div className="d-flex align-items-center">
                <FaLanguage className="me-2 text-muted" size={14} />
                <Form.Select 
                  value={selectedLanguage} 
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="border-0 bg-light"
                >
                  <option value="all">All Languages</option>
                  <option value="english">English</option>
                  <option value="arabic">Arabic</option>
                </Form.Select>
              </div>
            </Col>
            <Col lg={2}>
              <div className="d-flex align-items-center">
                <FaChartBar className="me-2 text-muted" size={14} />
                <Form.Select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border-0 bg-light"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                  <option value="alphabetical">A-Z</option>
                </Form.Select>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Results Summary */}
      {searchTerm || selectedCategory !== 'all' || selectedLanguage !== 'all' ? (
        <Row className="mb-3">
          <Col>
            <div className="d-flex align-items-center justify-content-between">
              <p className="mb-0 text-muted">
                Showing {filteredTemplates.length} of {templates.length} templates
                {searchTerm && ` for "${searchTerm}"`}
                {selectedCategory !== 'all' && ` in ${categoryOptions.find(c => c.value === selectedCategory)?.label}`}
              </p>
              {(searchTerm || selectedCategory !== 'all' || selectedLanguage !== 'all') && (
                <Button 
                  variant="outline-secondary" 
                  size="sm"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedLanguage('all');
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </Col>
        </Row>
      ) : null}

      <Row>
        {filteredTemplates
          .slice((pagination.page - 1) * pagination.limit, pagination.page * pagination.limit)
          .map((template) => (
            <Col key={template.id} lg={4} md={6} className="mb-4">
              <Card className="h-100 template-card border-0 shadow-sm">
                <Card.Body className="d-flex flex-column p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="d-flex flex-wrap gap-2">
                      {getCategoryBadge(template.category)}
                      {template.popular && (
                        <Badge bg="danger" className="d-flex align-items-center">
                          <MdStar className="me-1" size={12} />
                          Popular
                        </Badge>
                      )}
                      {template.isNew && (
                        <Badge bg="success" className="d-flex align-items-center">
                          New
                        </Badge>
                      )}
                      {template.isPremium && (
                        <Badge bg="warning" text="dark" className="d-flex align-items-center">
                          Premium
                        </Badge>
                      )}
                    </div>
                  </div>

                  <h5 className="card-title mb-2 fw-semibold">{template.name}</h5>
                  <p className="card-text text-muted flex-grow-1 small">{template.description}</p>

                  <div className="template-stats mb-3">
                    <div className="row g-2 text-muted small">
                      <div className="col-6 d-flex align-items-center">
                        <FaUsers className="me-2" size={12} />
                        <span>{template.usageCount.toLocaleString()} used</span>
                      </div>
                      <div className="col-6 d-flex align-items-center">
                        <FaClock className="me-2" size={12} />
                        <span>{template.estimatedTime}</span>
                      </div>
                      <div className="col-6 d-flex align-items-center">
                        <MdDescription className="me-2" size={12} />
                        <span>{template.questions} questions</span>
                      </div>
                      <div className="col-6 d-flex align-items-center">
                        <MdStar className="me-2" size={12} />
                        <span>{template.rating}/5.0</span>
                      </div>
                    </div>
                  </div>

                  {/* Language Support */}
                  <div className="mb-3">
                    <div className="d-flex align-items-center gap-1 text-muted small">
                      <FaLanguage size={12} />
                      <span>{template.language.join(', ')}</span>
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Use this template to create a new survey</Tooltip>}
                    >
                      <Button 
                        variant="primary" 
                        className="flex-grow-1" 
                        size="sm"
                        onClick={() => handleUseTemplate(template)}
                      >
                        <MdAdd className="me-1" size={16} />
                        Use Template
                      </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Preview template questions</Tooltip>}
                    >
                      <Button 
                        variant="outline-secondary" 
                        size="sm"
                        onClick={() => handlePreviewTemplate(template)}
                      >
                        <MdVisibility size={16} />
                      </Button>
                    </OverlayTrigger>
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

      {/* Loading State */}
      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <div className="mt-3">
            <h5>Loading Templates...</h5>
            <p className="text-muted">Please wait while we fetch the latest templates</p>
          </div>
        </div>
      )}

      {/* No Results */}
      {!loading && filteredTemplates.length === 0 && (
        <Row>
          <Col>
            <div className="text-center py-5">
              <MdSearch size={64} className="text-muted mb-3" />
              <h5>No templates found</h5>
              <p className="text-muted mb-4">
                {searchTerm 
                  ? `No templates match "${searchTerm}". Try different keywords or browse all categories.`
                  : 'No templates available for the selected criteria. Try adjusting your filters.'
                }
              </p>
              <Button 
                variant="outline-primary"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedLanguage('all');
                }}
              >
                <MdFilterList className="me-2" />
                Show All Templates
              </Button>
            </div>
          </Col>
        </Row>
      )}

      {/* Template Preview Modal */}
      <Modal 
        show={showPreviewModal} 
        onHide={() => setShowPreviewModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="d-flex align-items-center">
            <MdVisibility className="me-2" />
            Template Preview
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTemplate && (
            <div>
              <div className="mb-4">
                <div className="d-flex align-items-center mb-3">
                  {getCategoryBadge(selectedTemplate.category)}
                  <h4 className="ms-3 mb-0">{selectedTemplate.name}</h4>
                </div>
                <p className="text-muted">{selectedTemplate.description}</p>
              </div>

              <Row className="mb-4">
                <Col md={3}>
                  <div className="text-center p-3 bg-light rounded">
                    <MdDescription size={24} className="text-primary mb-2" />
                    <div className="fw-semibold">{selectedTemplate.questions}</div>
                    <small className="text-muted">Questions</small>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="text-center p-3 bg-light rounded">
                    <FaClock size={20} className="text-success mb-2" />
                    <div className="fw-semibold">{selectedTemplate.estimatedTime}</div>
                    <small className="text-muted">Duration</small>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="text-center p-3 bg-light rounded">
                    <MdStar size={24} className="text-warning mb-2" />
                    <div className="fw-semibold">{selectedTemplate.rating}/5.0</div>
                    <small className="text-muted">Rating</small>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="text-center p-3 bg-light rounded">
                    <FaUsers size={20} className="text-info mb-2" />
                    <div className="fw-semibold">{selectedTemplate.usageCount.toLocaleString()}</div>
                    <small className="text-muted">Used</small>
                  </div>
                </Col>
              </Row>

              <div className="mb-4">
                <h6 className="mb-3">Sample Questions Preview:</h6>
                <div className="bg-light p-3 rounded">
                  <div className="mb-3">
                    <strong>1. Overall Satisfaction</strong>
                    <p className="mb-0 text-muted small">How would you rate your overall experience?</p>
                  </div>
                  <div className="mb-3">
                    <strong>2. Service Quality</strong>
                    <p className="mb-0 text-muted small">How satisfied are you with the quality of service?</p>
                  </div>
                  <div className="mb-0">
                    <strong>3. Recommendation</strong>
                    <p className="mb-0 text-muted small">How likely are you to recommend us to others?</p>
                  </div>
                  <div className="mt-3 text-center">
                    <small className="text-muted">... and {selectedTemplate.questions - 3} more questions</small>
                  </div>
                </div>
              </div>

              <div>
                <h6 className="mb-2">Available Languages:</h6>
                <div className="d-flex gap-2">
                  {selectedTemplate.language.map((lang, index) => (
                    <Badge key={index} bg="secondary" className="d-flex align-items-center">
                      <FaLanguage className="me-1" size={12} />
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPreviewModal(false)}>
            Close
          </Button>
          <Button 
            variant="primary"
            onClick={() => {
              setShowPreviewModal(false);
              handleUseTemplate(selectedTemplate);
            }}
          >
            <MdAdd className="me-2" />
            Use This Template
          </Button>
        </Modal.Footer>
      </Modal>

    </Container>
  )
}

export default SurveyTemplates
