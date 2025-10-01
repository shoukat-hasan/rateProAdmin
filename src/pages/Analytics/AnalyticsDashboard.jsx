// src/pages/Analytics/AnalyticsDashboard.jsx
import React, { useState, useEffect } from 'react';
import { 
  Container, Row, Col, Card, Button, Badge, Alert, 
  ProgressBar, Table, Modal, Spinner, Form
} from 'react-bootstrap';
import {
  MdAnalytics, MdTrendingUp, MdTrendingDown, MdWarning,
  MdCheckCircle, MdFlag, MdLocationOn, MdPeople, MdTimer,
  MdSentimentSatisfied, MdSentimentDissatisfied, MdSentimentNeutral,
  MdBarChart, MdPieChart, MdShowChart, MdInsights, MdNotifications,
  MdRefresh, MdDownload, MdFilterList, MdDateRange
} from 'react-icons/md';
import {
  FaChartLine, FaExclamationTriangle, FaThumbsUp, FaThumbsDown,
  FaClock, FaUsers, FaMapMarkerAlt, FaStar, FaHeart
} from 'react-icons/fa';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import axiosInstance from '../../api/axiosInstance';
import './AnalyticsDashboard.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AnalyticsDashboard = () => {
  // Dashboard State
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    executive: {},
    operational: {},
    aiInsights: {},
    trends: {},
    alerts: []
  });
  const [dateRange, setDateRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('satisfaction');
  
  // Modals
  const [showInsightsModal, setShowInsightsModal] = useState(false);
  const [showAlertsModal, setShowAlertsModal] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, [dateRange]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch multiple analytics endpoints
      const [executiveRes, operationalRes, trendsRes, alertsRes] = await Promise.allSettled([
        axiosInstance.get(`/analytics/executive?range=${dateRange}`),
        axiosInstance.get(`/analytics/operational?range=${dateRange}`),
        axiosInstance.get(`/analytics/trends?range=${dateRange}`),
        axiosInstance.get(`/analytics/alerts`)
      ]);

      // Process results with fallbacks for missing endpoints
      const executiveData = executiveRes.status === 'fulfilled' ? executiveRes.value.data : getMockExecutiveData();
      const operationalData = operationalRes.status === 'fulfilled' ? operationalRes.value.data : getMockOperationalData();
      const trendsData = trendsRes.status === 'fulfilled' ? trendsRes.value.data : getMockTrendsData();
      const alertsData = alertsRes.status === 'fulfilled' ? alertsRes.value.data : getMockAlertsData();

      setDashboardData({
        executive: executiveData,
        operational: operationalData,
        trends: trendsData,
        alerts: alertsData.alerts || [],
        aiInsights: await generateAIInsights(executiveData, operationalData)
      });

    } catch (error) {
      console.error('Dashboard data fetch error:', error);
      // Use mock data as fallback
      setDashboardData({
        executive: getMockExecutiveData(),
        operational: getMockOperationalData(), 
        trends: getMockTrendsData(),
        alerts: getMockAlertsData().alerts,
        aiInsights: getMockAIInsights()
      });
    } finally {
      setLoading(false);
    }
  };

  // Mock data generators (for development/fallback)
  const getMockExecutiveData = () => ({
    customerSatisfactionIndex: {
      overall: 4.2,
      trend: 0.3,
      locations: [
        { name: 'Riyadh Office', score: 4.5, responses: 156 },
        { name: 'Jeddah Branch', score: 4.1, responses: 98 },
        { name: 'Dammam Center', score: 3.9, responses: 78 }
      ],
      services: [
        { name: 'Customer Service', score: 4.4, responses: 245 },
        { name: 'Product Quality', score: 4.2, responses: 189 },
        { name: 'Delivery', score: 3.8, responses: 167 }
      ]
    },
    npsScore: {
      current: 42,
      trend: 5,
      promoters: 156,
      detractors: 34,
      passives: 98
    },
    responseRate: {
      current: 68,
      trend: -2,
      total: 1245,
      completed: 847
    }
  });

  const getMockOperationalData = () => ({
    alerts: {
      critical: 3,
      warning: 12,
      info: 8
    },
    slaMetrics: {
      averageResponseTime: '2.4 hours',
      onTimeResolution: 87,
      overdueActions: 15
    },
    topComplaints: [
      { category: 'Service Speed', count: 45, trend: 'up' },
      { category: 'Staff Behavior', count: 32, trend: 'down' },
      { category: 'Product Quality', count: 28, trend: 'stable' },
      { category: 'Pricing', count: 19, trend: 'up' },
      { category: 'Facilities', count: 15, trend: 'down' }
    ],
    topPraises: [
      { category: 'Friendly Staff', count: 89, trend: 'up' },
      { category: 'Quick Service', count: 67, trend: 'stable' },
      { category: 'Clean Environment', count: 54, trend: 'up' },
      { category: 'Good Value', count: 43, trend: 'down' },
      { category: 'Product Quality', count: 38, trend: 'up' }
    ]
  });

  const getMockTrendsData = () => ({
    satisfactionTrend: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      values: [4.1, 4.0, 4.2, 4.3, 4.1, 4.2]
    },
    volumeTrend: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      surveys: [156, 189, 234, 198],
      responses: [142, 167, 201, 178]
    }
  });

  const getMockAlertsData = () => ({
    alerts: [
      {
        id: 1,
        type: 'critical',
        title: 'NPS Drop Detected',
        message: 'Customer satisfaction in Jeddah branch dropped 15% this week',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        action: 'Investigate service quality issues'
      },
      {
        id: 2,
        type: 'warning', 
        title: 'Response Rate Low',
        message: 'Survey completion rate fell below 70% threshold',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
        action: 'Review survey length and incentives'
      },
      {
        id: 3,
        type: 'info',
        title: 'Peak Response Time',
        message: 'Highest survey responses recorded between 2-4 PM',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        action: 'Optimize survey distribution timing'
      }
    ]
  });

  const getMockAIInsights = () => ({
    predictions: [
      {
        metric: 'Customer Satisfaction',
        prediction: 'If current service speed issues continue, NPS may drop by 12% in next month',
        confidence: 85,
        recommendation: 'Implement staff training program for faster service delivery'
      },
      {
        metric: 'Response Rate',
        prediction: 'Survey completion rate likely to improve with shorter questionnaires',
        confidence: 72,
        recommendation: 'Reduce average survey length from 8 to 6 questions'
      }
    ],
    sentimentHeatmap: {
      regions: [
        { name: 'Riyadh', sentiment: 0.7, color: '#28a745' },
        { name: 'Jeddah', sentiment: 0.4, color: '#ffc107' },
        { name: 'Dammam', sentiment: 0.2, color: '#dc3545' }
      ]
    },
    suggestedActions: [
      'Focus on service speed improvement in Jeddah branch',
      'Implement recognition program for friendly staff',
      'Review pricing strategy based on customer feedback'
    ]
  });

  const generateAIInsights = async (executive, operational) => {
    // In production, this would call the AI insights API
    return getMockAIInsights();
  };

  // Chart configurations
  const satisfactionChartData = {
    labels: dashboardData.trends?.satisfactionTrend?.labels || [],
    datasets: [
      {
        label: 'Customer Satisfaction',
        data: dashboardData.trends?.satisfactionTrend?.values || [],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4
      }
    ]
  };

  const npsChartData = {
    labels: ['Promoters', 'Passives', 'Detractors'],
    datasets: [
      {
        data: [
          dashboardData.executive?.npsScore?.promoters || 0,
          dashboardData.executive?.npsScore?.passives || 0,
          dashboardData.executive?.npsScore?.detractors || 0
        ],
        backgroundColor: ['#28a745', '#ffc107', '#dc3545'],
        borderWidth: 2
      }
    ]
  };

  const complaintsChartData = {
    labels: dashboardData.operational?.topComplaints?.map(c => c.category) || [],
    datasets: [
      {
        label: 'Complaints',
        data: dashboardData.operational?.topComplaints?.map(c => c.count) || [],
        backgroundColor: 'rgba(220, 53, 69, 0.8)',
        borderColor: 'rgba(220, 53, 69, 1)',
        borderWidth: 1
      }
    ]
  };

  if (loading) {
    return (
      <Container fluid className="p-4">
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Loading Analytics Dashboard...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid className="analytics-dashboard p-4">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="mb-1">📊 Analytics Dashboard</h2>
              <p className="text-muted mb-0">Real-time insights and AI-powered analytics</p>
            </div>
            <div className="d-flex gap-2">
              <Form.Select 
                value={dateRange} 
                onChange={(e) => setDateRange(e.target.value)}
                style={{ width: '150px' }}
              >
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 3 Months</option>
                <option value="1y">Last Year</option>
              </Form.Select>
              <Button variant="outline-primary" onClick={fetchDashboardData}>
                <MdRefresh className="me-1" />
                Refresh
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      {/* Executive Dashboard - Flow.md Section 8.1 */}
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Header className="bg-primary text-white">
              <MdAnalytics className="me-2" />
              Executive Dashboard
            </Card.Header>
            <Card.Body>
              <Row>
                {/* Customer Satisfaction Index */}
                <Col lg={4} className="mb-3">
                  <div className="stat-card">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6 className="mb-0">Customer Satisfaction Index</h6>
                      <Badge bg={dashboardData.executive?.customerSatisfactionIndex?.trend >= 0 ? 'success' : 'danger'}>
                        {dashboardData.executive?.customerSatisfactionIndex?.trend >= 0 ? <MdTrendingUp /> : <MdTrendingDown />}
                        {Math.abs(dashboardData.executive?.customerSatisfactionIndex?.trend || 0)}%
                      </Badge>
                    </div>
                    <h3 className="text-primary mb-2">
                      {dashboardData.executive?.customerSatisfactionIndex?.overall || 0}/5.0
                    </h3>
                    <div className="location-breakdown">
                      {dashboardData.executive?.customerSatisfactionIndex?.locations?.map((loc, idx) => (
                        <div key={idx} className="d-flex justify-content-between small mb-1">
                          <span>{loc.name}</span>
                          <span className="fw-semibold">{loc.score}/5.0 ({loc.responses})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Col>

                {/* NPS Score */}
                <Col lg={4} className="mb-3">
                  <div className="stat-card">
                    <h6 className="mb-2">Net Promoter Score</h6>
                    <h3 className="text-success mb-2">
                      {dashboardData.executive?.npsScore?.current || 0}
                      <Badge bg="success" className="ms-2 fs-6">
                        +{dashboardData.executive?.npsScore?.trend || 0}
                      </Badge>
                    </h3>
                    <div style={{ height: '150px' }}>
                      <Doughnut data={npsChartData} options={{ maintainAspectRatio: false }} />
                    </div>
                  </div>
                </Col>

                {/* Response Rate */}
                <Col lg={4} className="mb-3">
                  <div className="stat-card">
                    <h6 className="mb-2">Response Rate</h6>
                    <h3 className="text-info mb-2">
                      {dashboardData.executive?.responseRate?.current || 0}%
                    </h3>
                    <ProgressBar 
                      now={dashboardData.executive?.responseRate?.current || 0}
                      variant="info"
                      className="mb-2"
                    />
                    <small className="text-muted">
                      {dashboardData.executive?.responseRate?.completed || 0} of {dashboardData.executive?.responseRate?.total || 0} completed
                    </small>
                  </div>
                </Col>
              </Row>

              {/* Satisfaction Trend Chart */}
              <Row>
                <Col>
                  <h6 className="mb-3">Satisfaction Trend (Month-on-Month)</h6>
                  <div style={{ height: '300px' }}>
                    <Line 
                      data={satisfactionChartData} 
                      options={{ 
                        maintainAspectRatio: false,
                        responsive: true,
                        plugins: {
                          legend: { display: false }
                        }
                      }} 
                    />
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Operational Dashboard - Flow.md Section 8.2 */}
      <Row className="mb-4">
        <Col lg={8}>
          <Card>
            <Card.Header className="bg-warning text-dark">
              <MdNotifications className="me-2" />
              Operational Dashboard - Real-time Alerts
            </Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Col md={4}>
                  <Alert variant="danger" className="text-center">
                    <FaExclamationTriangle size={24} />
                    <h5 className="mb-0">{dashboardData.operational?.alerts?.critical || 0}</h5>
                    <small>Critical Alerts</small>
                  </Alert>
                </Col>
                <Col md={4}>
                  <Alert variant="warning" className="text-center">
                    <MdWarning size={24} />
                    <h5 className="mb-0">{dashboardData.operational?.alerts?.warning || 0}</h5>
                    <small>Warnings</small>
                  </Alert>
                </Col>
                <Col md={4}>
                  <Alert variant="info" className="text-center">
                    <MdCheckCircle size={24} />
                    <h5 className="mb-0">{dashboardData.operational?.slaMetrics?.onTimeResolution || 0}%</h5>
                    <small>SLA Compliance</small>
                  </Alert>
                </Col>
              </Row>

              {/* Top Complaints vs Praises */}
              <Row>
                <Col md={6}>
                  <h6 className="mb-3 text-danger">🔴 Top 5 Complaints</h6>
                  <div className="complaints-list">
                    {dashboardData.operational?.topComplaints?.map((complaint, idx) => (
                      <div key={idx} className="d-flex justify-content-between align-items-center py-2 border-bottom">
                        <span>{complaint.category}</span>
                        <div className="d-flex align-items-center">
                          <Badge bg="danger" className="me-2">{complaint.count}</Badge>
                          {complaint.trend === 'up' ? <MdTrendingUp className="text-danger" /> : 
                           complaint.trend === 'down' ? <MdTrendingDown className="text-success" /> : 
                           <span className="text-muted">—</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </Col>
                <Col md={6}>
                  <h6 className="mb-3 text-success">🟢 Top 5 Praises</h6>
                  <div className="praises-list">
                    {dashboardData.operational?.topPraises?.map((praise, idx) => (
                      <div key={idx} className="d-flex justify-content-between align-items-center py-2 border-bottom">
                        <span>{praise.category}</span>
                        <div className="d-flex align-items-center">
                          <Badge bg="success" className="me-2">{praise.count}</Badge>
                          {praise.trend === 'up' ? <MdTrendingUp className="text-success" /> : 
                           praise.trend === 'down' ? <MdTrendingDown className="text-danger" /> : 
                           <span className="text-muted">—</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card>
            <Card.Header className="bg-success text-white">
              <MdTimer className="me-2" />
              SLA Tracker
            </Card.Header>
            <Card.Body>
              <div className="sla-metrics">
                <div className="mb-3">
                  <div className="d-flex justify-content-between">
                    <span>Average Response Time</span>
                    <strong>{dashboardData.operational?.slaMetrics?.averageResponseTime || 'N/A'}</strong>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="d-flex justify-content-between">
                    <span>On-time Resolution</span>
                    <strong>{dashboardData.operational?.slaMetrics?.onTimeResolution || 0}%</strong>
                  </div>
                  <ProgressBar 
                    now={dashboardData.operational?.slaMetrics?.onTimeResolution || 0}
                    variant="success"
                  />
                </div>
                <div className="mb-3">
                  <Alert variant="danger" className="p-2">
                    <small>
                      <FaClock className="me-2" />
                      {dashboardData.operational?.slaMetrics?.overdueActions || 0} overdue actions
                    </small>
                  </Alert>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* AI Insights Report - Flow.md Section 8.3 */}
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Header className="bg-info text-white">
              <MdInsights className="me-2" />
              AI Insights Report - Predictive Analysis
            </Card.Header>
            <Card.Body>
              <Row>
                <Col lg={8}>
                  <h6 className="mb-3">🔮 Predictive Insights</h6>
                  {dashboardData.aiInsights?.predictions?.map((prediction, idx) => (
                    <Alert key={idx} variant={idx === 0 ? 'warning' : 'info'} className="mb-3">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <strong>{prediction.metric}</strong>
                          <p className="mb-2">{prediction.prediction}</p>
                          <small className="text-muted">
                            💡 {prediction.recommendation}
                          </small>
                        </div>
                        <Badge bg="secondary">
                          {prediction.confidence}% confidence
                        </Badge>
                      </div>
                    </Alert>
                  ))}
                </Col>
                <Col lg={4}>
                  <h6 className="mb-3">🗺️ Sentiment Heatmap</h6>
                  <div className="sentiment-regions">
                    {dashboardData.aiInsights?.sentimentHeatmap?.regions?.map((region, idx) => (
                      <div key={idx} className="d-flex justify-content-between align-items-center py-2">
                        <span>{region.name}</span>
                        <div className="d-flex align-items-center">
                          <div 
                            className="sentiment-indicator me-2"
                            style={{ 
                              backgroundColor: region.color,
                              width: '20px',
                              height: '20px',
                              borderRadius: '50%'
                            }}
                          />
                          <span>{Math.round(region.sentiment * 100)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Alerts */}
      <Row>
        <Col>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <span>
                <MdFlag className="me-2" />
                Recent Alerts & Notifications
              </span>
              <Button 
                variant="outline-primary" 
                size="sm"
                onClick={() => setShowAlertsModal(true)}
              >
                View All
              </Button>
            </Card.Header>
            <Card.Body>
              {dashboardData.alerts?.slice(0, 3).map((alert, idx) => (
                <Alert 
                  key={alert.id} 
                  variant={alert.type === 'critical' ? 'danger' : alert.type === 'warning' ? 'warning' : 'info'}
                  className="d-flex justify-content-between align-items-center"
                >
                  <div>
                    <strong>{alert.title}</strong>
                    <p className="mb-1">{alert.message}</p>
                    <small className="text-muted">
                      {alert.timestamp.toLocaleString()} • {alert.action}
                    </small>
                  </div>
                  <Badge bg={alert.type === 'critical' ? 'danger' : alert.type === 'warning' ? 'warning' : 'info'}>
                    {alert.type.toUpperCase()}
                  </Badge>
                </Alert>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AnalyticsDashboard;