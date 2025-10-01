// src/pages/AI/AIManagement.jsx
"use client"

import { useState, useEffect } from "react"
import { Container, Row, Col, Card, Form, Button, Table, Badge, Modal, Spinner } from "react-bootstrap"
import { MdPsychology, MdAutoAwesome, MdTranslate, MdOptimizeDefine, MdInsights } from "react-icons/md"
import axios from "../../api/axios"

const AIManagement = () => {
  const [loading, setLoading] = useState(false)
  const [surveys, setSurveys] = useState([])
  const [activeTab, setActiveTab] = useState('generate')
  const [companyProfile, setCompanyProfile] = useState({
    industry: '',
    size: '',
    goals: '',
    targetAudience: ''
  })
  const [generatedSurvey, setGeneratedSurvey] = useState(null)
  const [selectedSurvey, setSelectedSurvey] = useState('')
  const [analysisResults, setAnalysisResults] = useState(null)

  useEffect(() => {
    fetchSurveys()
  }, [])

  const fetchSurveys = async () => {
    try {
      const response = await axios.get('/api/surveys')
      if (response.data.success) {
        setSurveys(response.data.data || [])
      }
    } catch (error) {
      console.error('Error fetching surveys:', error)
    }
  }

  const generateSurveyFromProfile = async () => {
    try {
      setLoading(true)
      const response = await axios.post('/api/ai/generate-from-profile', {
        companyProfile
      })
      
      if (response.data.success) {
        setGeneratedSurvey(response.data.data)
      }
    } catch (error) {
      console.error('Error generating survey:', error)
      alert('Failed to generate survey')
    } finally {
      setLoading(false)
    }
  }

  const optimizeSurvey = async () => {
    if (!selectedSurvey) return
    
    try {
      setLoading(true)
      const response = await axios.post('/api/ai/optimize', {
        surveyId: selectedSurvey
      })
      
      if (response.data.success) {
        alert('Survey optimized successfully!')
        fetchSurveys()
      }
    } catch (error) {
      console.error('Error optimizing survey:', error)
      alert('Failed to optimize survey')
    } finally {
      setLoading(false)
    }
  }

  const analyzeFeedback = async () => {
    if (!selectedSurvey) return
    
    try {
      setLoading(true)
      const response = await axios.post('/api/ai/analyze-feedback', {
        surveyId: selectedSurvey
      })
      
      if (response.data.success) {
        setAnalysisResults(response.data.data)
      }
    } catch (error) {
      console.error('Error analyzing feedback:', error)
      alert('Failed to analyze feedback')
    } finally {
      setLoading(false)
    }
  }

  const generateInsights = async () => {
    if (!selectedSurvey) return
    
    try {
      setLoading(true)
      const response = await axios.post('/api/ai/generate-insights', {
        surveyId: selectedSurvey
      })
      
      if (response.data.success) {
        alert('Insights generated successfully!')
      }
    } catch (error) {
      console.error('Error generating insights:', error)
      alert('Failed to generate insights')
    } finally {
      setLoading(false)
    }
  }

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setCompanyProfile(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <Container fluid className="p-4">
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Header className="d-flex align-items-center">
              <MdPsychology className="me-2 text-primary" size={24} />
              <h5 className="mb-0">AI Management Center</h5>
            </Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Col>
                  <div className="d-flex gap-2">
                    <Button 
                      variant={activeTab === 'generate' ? 'primary' : 'outline-primary'}
                      onClick={() => setActiveTab('generate')}
                    >
                      <MdAutoAwesome className="me-1" />
                      Generate Survey
                    </Button>
                    <Button 
                      variant={activeTab === 'optimize' ? 'primary' : 'outline-primary'}
                      onClick={() => setActiveTab('optimize')}
                    >
                      <MdOptimizeDefine className="me-1" />
                      Optimize Survey
                    </Button>
                    <Button 
                      variant={activeTab === 'analyze' ? 'primary' : 'outline-primary'}
                      onClick={() => setActiveTab('analyze')}
                    >
                      <MdInsights className="me-1" />
                      Analyze Feedback
                    </Button>
                  </div>
                </Col>
              </Row>

              {activeTab === 'generate' && (
                <Row>
                  <Col md={6}>
                    <Card>
                      <Card.Header>
                        <h6 className="mb-0">Company Profile</h6>
                      </Card.Header>
                      <Card.Body>
                        <Form.Group className="mb-3">
                          <Form.Label>Industry</Form.Label>
                          <Form.Select
                            name="industry"
                            value={companyProfile.industry}
                            onChange={handleProfileChange}
                          >
                            <option value="">Select industry...</option>
                            <option value="technology">Technology</option>
                            <option value="healthcare">Healthcare</option>
                            <option value="retail">Retail</option>
                            <option value="finance">Finance</option>
                            <option value="education">Education</option>
                            <option value="manufacturing">Manufacturing</option>
                            <option value="hospitality">Hospitality</option>
                            <option value="other">Other</option>
                          </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Company Size</Form.Label>
                          <Form.Select
                            name="size"
                            value={companyProfile.size}
                            onChange={handleProfileChange}
                          >
                            <option value="">Select size...</option>
                            <option value="startup">Startup (1-10)</option>
                            <option value="small">Small (11-50)</option>
                            <option value="medium">Medium (51-200)</option>
                            <option value="large">Large (201-1000)</option>
                            <option value="enterprise">Enterprise (1000+)</option>
                          </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Primary Goals</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            name="goals"
                            value={companyProfile.goals}
                            onChange={handleProfileChange}
                            placeholder="e.g., Improve customer satisfaction, increase retention, measure brand perception"
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Target Audience</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={2}
                            name="targetAudience"
                            value={companyProfile.targetAudience}
                            onChange={handleProfileChange}
                            placeholder="e.g., B2B customers, millennials, enterprise clients"
                          />
                        </Form.Group>

                        <Button
                          variant="primary"
                          onClick={generateSurveyFromProfile}
                          disabled={loading}
                          className="w-100"
                        >
                          {loading ? <Spinner size="sm" className="me-2" /> : <MdAutoAwesome className="me-2" />}
                          Generate AI Survey
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={6}>
                    {generatedSurvey && (
                      <Card>
                        <Card.Header>
                          <h6 className="mb-0">Generated Survey</h6>
                        </Card.Header>
                        <Card.Body>
                          <h6>{generatedSurvey.title}</h6>
                          <p className="text-muted">{generatedSurvey.description}</p>
                          
                          <h6 className="mt-3">Questions:</h6>
                          {generatedSurvey.questions?.map((question, index) => (
                            <div key={index} className="mb-2 p-2 bg-light rounded">
                              <strong>{index + 1}. {question.text}</strong>
                              <div className="mt-1">
                                <small className="text-muted">Type: {question.type}</small>
                              </div>
                            </div>
                          ))}

                          <Button variant="success" className="mt-3 w-100">
                            Save as New Survey
                          </Button>
                        </Card.Body>
                      </Card>
                    )}
                  </Col>
                </Row>
              )}

              {activeTab === 'optimize' && (
                <Row>
                  <Col md={6}>
                    <Card>
                      <Card.Header>
                        <h6 className="mb-0">Survey Optimization</h6>
                      </Card.Header>
                      <Card.Body>
                        <Form.Group className="mb-3">
                          <Form.Label>Select Survey to Optimize</Form.Label>
                          <Form.Select
                            value={selectedSurvey}
                            onChange={(e) => setSelectedSurvey(e.target.value)}
                          >
                            <option value="">Choose survey...</option>
                            {surveys.map(survey => (
                              <option key={survey._id} value={survey._id}>
                                {survey.title}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>

                        <Button
                          variant="primary"
                          onClick={optimizeSurvey}
                          disabled={loading || !selectedSurvey}
                          className="w-100"
                        >
                          {loading ? <Spinner size="sm" className="me-2" /> : <MdOptimizeDefine className="me-2" />}
                          Optimize Survey
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              )}

              {activeTab === 'analyze' && (
                <Row>
                  <Col md={6}>
                    <Card>
                      <Card.Header>
                        <h6 className="mb-0">Feedback Analysis</h6>
                      </Card.Header>
                      <Card.Body>
                        <Form.Group className="mb-3">
                          <Form.Label>Select Survey to Analyze</Form.Label>
                          <Form.Select
                            value={selectedSurvey}
                            onChange={(e) => setSelectedSurvey(e.target.value)}
                          >
                            <option value="">Choose survey...</option>
                            {surveys.map(survey => (
                              <option key={survey._id} value={survey._id}>
                                {survey.title}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>

                        <div className="d-flex gap-2">
                          <Button
                            variant="primary"
                            onClick={analyzeFeedback}
                            disabled={loading || !selectedSurvey}
                            className="flex-fill"
                          >
                            {loading ? <Spinner size="sm" className="me-2" /> : <MdInsights className="me-2" />}
                            Analyze Feedback
                          </Button>
                          <Button
                            variant="success"
                            onClick={generateInsights}
                            disabled={loading || !selectedSurvey}
                            className="flex-fill"
                          >
                            Generate Insights
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={6}>
                    {analysisResults && (
                      <Card>
                        <Card.Header>
                          <h6 className="mb-0">Analysis Results</h6>
                        </Card.Header>
                        <Card.Body>
                          <div className="mb-3">
                            <strong>Sentiment Analysis:</strong>
                            <div className="mt-2">
                              <Badge variant="success" className="me-2">
                                Positive: {analysisResults.sentiment?.positive || 0}
                              </Badge>
                              <Badge variant="danger" className="me-2">
                                Negative: {analysisResults.sentiment?.negative || 0}
                              </Badge>
                              <Badge variant="warning">
                                Neutral: {analysisResults.sentiment?.neutral || 0}
                              </Badge>
                            </div>
                          </div>

                          <div className="mb-3">
                            <strong>Key Insights:</strong>
                            <ul className="mt-2">
                              {analysisResults.insights?.map((insight, index) => (
                                <li key={index}>{insight}</li>
                              )) || <li>No insights available</li>}
                            </ul>
                          </div>

                          <div>
                            <strong>Recommendations:</strong>
                            <ul className="mt-2">
                              {analysisResults.recommendations?.map((rec, index) => (
                                <li key={index}>{rec}</li>
                              )) || <li>No recommendations available</li>}
                            </ul>
                          </div>
                        </Card.Body>
                      </Card>
                    )}
                  </Col>
                </Row>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default AIManagement