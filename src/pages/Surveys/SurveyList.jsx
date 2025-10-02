// "use client"
// Custom styles
// const styles = {
//   tableHeader: {
//     backgroundColor: 'var(--bs-light)',
//     color: 'var(--bs-gray-700)',
//     fontWeight: 600,
//     fontSize: '0.875rem',
//     cursor: 'pointer',
//   },
//   sortIcon: {
//     fontSize: '0.75rem',
//     marginLeft: '0.5rem',
//   },
//   card: {
//     borderRadius: '0.75rem',
//     border: 'none',
//     boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)',
//   },
//   status: {
//     width: '0.5rem',
//     height: '0.5rem',
//     borderRadius: '50%',
//     display: 'inline-block',
//     marginRight: '0.5rem',
//   },
// }
"use client"
import { useState, useEffect } from "react"
import { Container, Row, Col, Card, Table, Badge, Button, Form, InputGroup, Modal, Spinner, Alert } from "react-bootstrap"
import {
  MdAdd,
  MdEdit,
  MdDelete,
  MdFileDownload,
  MdFileUpload,
  MdSearch,
  MdAssignment,
  MdSort,
  MdArrowDropUp,
  MdArrowDropDown,
  MdErrorOutline,
  MdBarChart,
  MdToggleOn,
  MdShare
} from "react-icons/md"
import Pagination from "../../components/Pagination/Pagination.jsx"
import axiosInstance from "../../api/axiosInstance.js"
import Swal from "sweetalert2"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import "./SurveyList.css"

const SurveyList = ({ darkMode }) => {
  const navigate = useNavigate();
  const { setGlobalLoading, user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [totalItems, setTotalItems] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedSurvey, setSelectedSurvey] = useState(null)
  const [sortField, setSortField] = useState("-createdAt")
  const [surveys, setSurveys] = useState([])

  const handleEdit = (surveyId) => {
    navigate(`/app/surveys/edit/${surveyId}`);
  };

  const handleAnalytics = (surveyId) => {
    navigate(`/app/surveys/analytics/${surveyId}`);
  };

  const handleDistribution = (surveyId) => {
    navigate(`/app/surveys/distribution/${surveyId}`);
  };

  const handleDelete = (survey) => {
    setSelectedSurvey(survey)
    setShowDeleteModal(true)
  }

  // Fetch surveys with filters and pagination
  const fetchSurveys = async () => {
    try {
      if (!user?.tenant) {
        setError("No tenant associated with your account");
        return;
      }

      setLoading(true);
      setError(null);
      setGlobalLoading(true);

      const params = new URLSearchParams({
        page: currentPage,
        limit: itemsPerPage,
        sort: sortField,
        tenant: user.tenant, // Add tenant ID to query params
      });

      if (searchTerm) params.append('search', searchTerm);
      if (filterStatus !== 'all') params.append('status', filterStatus);

      const response = await axiosInstance.get(`/surveys?${params}`);
      setSurveys(response.data.surveys);
      setTotalItems(response.data.total);
    } catch (err) {
      console.error('Error fetching surveys:', err);
      const errorMessage = err.response?.status === 403
        ? 'You do not have permission to view these surveys. Please contact your administrator.'
        : err.response?.data?.message || 'Failed to load surveys';

      setError(errorMessage);

      Swal.fire({
        icon: 'error',
        title: 'Error Loading Surveys',
        text: errorMessage,
        confirmButtonColor: '#dc3545',
        showConfirmButton: err.response?.status !== 403
      });
    } finally {
      setLoading(false);
      setGlobalLoading(false);
    }
  };

  // Toggle survey status
  const toggleStatus = async (surveyId, currentStatus) => {
    try {
      setGlobalLoading(true);
      const newStatus = currentStatus.toLowerCase() === 'active' ? 'inactive' : 'active';

      await axiosInstance.patch(`/surveys/${surveyId}/status`, {
        status: newStatus
      });

      // Optimistically update UI
      setSurveys(surveys.map(s =>
        s._id === surveyId
          ? { ...s, status: newStatus }
          : s
      ));

      Swal.fire({
        icon: 'success',
        title: 'Status Updated',
        text: `Survey is now ${newStatus}`,
        confirmButtonColor: '#198754',
        timer: 1500
      });
    } catch (err) {
      console.error('Error toggling status:', err);
      Swal.fire({
        icon: 'error',
        title: 'Status Update Failed',
        text: err.response?.data?.message || 'Failed to update survey status',
        confirmButtonColor: '#dc3545'
      });
    } finally {
      setGlobalLoading(false);
    }
  };

  // Delete survey
  const confirmDelete = async () => {
    try {
      setGlobalLoading(true);
      await axiosInstance.delete(`/surveys/${selectedSurvey._id}`);

      // Update local state
      setSurveys(surveys.filter(s => s._id !== selectedSurvey._id));
      setShowDeleteModal(false);
      setSelectedSurvey(null);

      Swal.fire({
        icon: 'success',
        title: 'Survey Deleted',
        text: 'The survey has been successfully deleted',
        confirmButtonColor: '#198754',
        timer: 1500
      });
    } catch (err) {
      console.error('Error deleting survey:', err);
      Swal.fire({
        icon: 'error',
        title: 'Delete Failed',
        text: err.response?.data?.message || 'Failed to delete survey',
        confirmButtonColor: '#dc3545'
      });
    } finally {
      setGlobalLoading(false);
    }
  };

  // Effect to fetch surveys when filters/pagination change
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchSurveys();
    }, searchTerm ? 500 : 0); // Debounce search

    return () => clearTimeout(debounceTimer);
  }, [currentPage, itemsPerPage, searchTerm, filterStatus, sortField]);

  // const totalPages = Math.ceil(filteredSurveys.length / itemsPerPage)
  // const startIndex = (currentPage - 1) * itemsPerPage
  // const currentSurveys = filteredSurveys.slice(startIndex, startIndex + itemsPerPage)

  // const getStatusColor = (status) => {
  //   switch (status.toLowerCase()) {
  //     case 'active':
  //       return 'var(--bs-success)';
  //     case 'draft':
  //       return 'var(--bs-secondary)';
  //     case 'completed':
  //       return 'var(--bs-primary)';
  //     case 'paused':
  //       return 'var(--bs-warning)';
  //     default:
  //       return 'var(--bs-gray)';
  //   }
  // };

  const getSortIcon = (field) => {
    if (sortField === field) return MdArrowDropUp;
    if (sortField === `-${field}`) return MdArrowDropDown;
    return MdSort;
  };


  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <Card className="survey-card">
            <Card.Body className="p-4">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                <div>
                  <h1 className="h3 mb-1 fw-bold">
                    <i className="fas fa-clipboard-list text-primary me-2"></i>
                    Surveys
                  </h1>
                  <p className="text-muted mb-0">Create and manage your feedback surveys</p>
                </div>
                <div className="d-flex gap-2">
                  <Button
                    variant="outline-primary"
                    className="d-flex align-items-center px-3"
                    onClick={() => {
                      Swal.fire({
                        title: 'Import Survey',
                        html: `
                          <input type="file" accept=".json" class="form-control" id="surveyImport">
                        `,
                        showCancelButton: true,
                        confirmButtonText: 'Import',
                        confirmButtonColor: '#0d6efd',
                        cancelButtonColor: '#6c757d'
                      });
                    }}
                  >
                    <i className="fas fa-file-import me-2"></i>
                    Import
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => navigate("/app/surveys/create")}
                    className="d-flex align-items-center px-3"
                  >
                    <i className="fas fa-plus me-2"></i>
                    Create Survey
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <Row className="g-3">
                <Col lg={5}>
                  <InputGroup className="shadow-sm">
                    <InputGroup.Text className="bg-white border-end-0">
                      <i className="fas fa-search text-primary"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Search surveys by title, description..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="border-start-0 ps-0"
                    />
                  </InputGroup>
                </Col>
                <Col lg={3}>
                  <Form.Select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="shadow-sm"
                  >
                    <option value="all">All Statuses</option>
                    <option value="active">Active Surveys</option>
                    <option value="completed">Completed Surveys</option>
                    <option value="draft">Draft Surveys</option>
                    <option value="paused">Paused Surveys</option>
                  </Form.Select>
                </Col>
                <Col lg={4}>
                  <div className="d-flex gap-2">
                    <Button
                      variant="outline-primary"
                      className="flex-grow-1 d-flex align-items-center justify-content-center"
                    >
                      <i className="fas fa-filter me-2"></i>
                      Advanced Filters
                    </Button>
                    <Button
                      variant="outline-primary"
                      className="d-flex align-items-center px-3"
                      onClick={() => {
                        // Bulk export feature
                        Swal.fire({
                          title: 'Export Surveys',
                          text: 'Choose export format',
                          icon: 'info',
                          showDenyButton: true,
                          confirmButtonText: 'Export as PDF',
                          denyButtonText: 'Export as Excel',
                          confirmButtonColor: '#0d6efd',
                          denyButtonColor: '#198754'
                        });
                      }}
                    >
                      <i className="fas fa-download me-2"></i>
                      Export
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="survey-card">
            <Card.Body className="p-4">
              {loading ? (
                <div className="loading-spinner">
                  <div className="text-center">
                    <Spinner animation="border" variant="primary" className="mb-3" />
                    <p className="text-muted">Loading surveys...</p>
                  </div>
                </div>
              ) : error ? (
                <div className="error-state">
                  <MdErrorOutline className="mb-3" size={48} />
                  <p className="mb-3">{error}</p>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={fetchSurveys}
                  >
                    <MdErrorOutline className="me-2" />
                    Try Again
                  </Button>
                </div>
              ) : surveys.length === 0 ? (
                <div className="text-center py-5">
                  <i className="fas fa-clipboard-list text-muted fa-3x mb-3"></i>
                  <p className="text-muted mb-3">No surveys found</p>
                  <Button
                    variant="primary"
                    onClick={() => navigate("/app/surveys/create")}
                    className="px-4"
                  >
                    <i className="fas fa-plus me-2"></i>
                    Create Your First Survey
                  </Button>
                </div>
              ) : (
                <div className="table-responsive">
                  <Table className="survey-table" hover>
                    <thead>
                      <tr>
                        {/* <th onClick={() => setSortField(sortField === 'title' ? '-title' : 'title')} style={{ cursor: 'pointer' }}>
                          Title
                          <MdErrorOutline 
                            icon={sortField === 'title' ? MdArrowDropUp : sortField === '-title' ? MdArrowDropDown : MdSort}
                            className="ms-2"
                          />
                        </th> */}
                        <th onClick={() => setSortField(sortField === 'title' ? '-title' : 'title')} style={{ cursor: 'pointer' }}>
                          Title
                          {(() => {
                            const Icon = getSortIcon("title");
                            return <Icon className="ms-2" />;
                          })()}
                        </th>
                        <th>Description</th>
                        {/* <th onClick={() => setSortField(sortField === 'status' ? '-status' : 'status')} style={{ cursor: 'pointer' }}>
                          Status
                          <MdErrorOutline
                            icon={sortField === 'status' ? MdArrowDropUp : sortField === '-status' ? MdArrowDropDown : MdSort}
                            className="ms-2"
                          />
                        </th>
                        <th onClick={() => setSortField(sortField === 'createdAt' ? '-createdAt' : 'createdAt')} style={{ cursor: 'pointer' }}>
                          Created At
                          <MdErrorOutline
                            icon={sortField === 'createdAt' ? MdArrowDropUp : sortField === '-createdAt' ? MdArrowDropDown : MdSort}
                            className="ms-2"
                          />
                        </th> */}
                        <th onClick={() => setSortField(sortField === 'status' ? '-status' : 'status')} style={{ cursor: 'pointer' }}>
                          Status
                          {(() => {
                            const Icon = getSortIcon("status");
                            return <Icon className="ms-2" />;
                          })()}
                        </th>

                        <th onClick={() => setSortField(sortField === 'createdAt' ? '-createdAt' : 'createdAt')} style={{ cursor: 'pointer' }}>
                          Created At
                          {(() => {
                            const Icon = getSortIcon("createdAt");
                            return <Icon className="ms-2" />;
                          })()}
                        </th>
                        <th className="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {surveys.length > 0 ? (
                        surveys.map((survey) => (
                          <tr key={survey._id}>
                            <td>{survey.title}</td>
                            <td>{survey.description}</td>
                            <td>
                              <span className={`status-badge ${survey.status.toLowerCase()}`}>
                                {survey.status}
                              </span>
                            </td>
                            <td>{new Date(survey.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}</td>
                            <td className="text-end">
                              <Button
                                variant="link"
                                className={`action-btn toggle me-2 ${survey.status.toLowerCase() === 'active' ? 'active' : 'inactive'}`}
                                onClick={() => toggleStatus(survey._id, survey.status)}
                                title={`${survey.status === 'active' ? 'Deactivate' : 'Activate'} Survey`}
                              >
                                <MdToggleOn size={20} />
                              </Button>
                              <Button
                                variant="link"
                                className="action-btn edit me-2"
                                onClick={() => handleEdit(survey._id)}
                                title="Edit Survey"
                              >
                                <MdEdit size={20} />
                              </Button>
                              <Button
                                variant="link"
                                className="action-btn analytics me-2"
                                onClick={() => handleAnalytics(survey._id)}
                                title="View Analytics"
                              >
                                <MdBarChart size={20} />
                              </Button>
                              <Button
                                variant="link"
                                className="action-btn distribution me-2"
                                onClick={() => handleDistribution(survey._id)}
                                title="Distribution & QR Codes"
                              >
                                <MdShare size={20} />
                              </Button>
                              <Button
                                variant="link"
                                className="action-btn delete"
                                onClick={() => handleDelete(survey)}
                                title="Delete Survey"
                              >
                                <MdDelete size={20} />
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5">
                            <div className="empty-state">
                              <MdAssignment className="empty-state-icon" />
                              <h5>No surveys found</h5>
                              <p className="text-muted">Create your first survey to get started</p>
                              <Button
                                variant="primary"
                                onClick={() => navigate('/surveys/create')}
                                className="mt-3"
                              >
                                <MdAdd className="me-2" />
                                Create Survey
                              </Button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card.Body>
            <Card.Footer className="bg-light">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
                <div className="d-flex align-items-center">
                  <small className="text-muted me-3">
                    Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} to{" "}
                    {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} surveys
                  </small>
                  <Form.Select
                    size="sm"
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    style={{ width: 'auto' }}
                  >
                    <option value="10">10 per page</option>
                    <option value="25">25 per page</option>
                    <option value="50">50 per page</option>
                    <option value="100">100 per page</option>
                  </Form.Select>
                </div>
                <div>
                  <Pagination
                    current={currentPage}
                    total={totalItems}
                    limit={itemsPerPage}
                    onChange={(page) => setCurrentPage(page)}
                    darkMode={darkMode}
                  />
                </div>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="text-danger">
            <i className="fas fa-exclamation-triangle me-2"></i>
            Confirm Delete
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-2">
          <p>Are you sure you want to delete the survey "<strong>{selectedSurvey?.title}</strong>"?</p>
          <Alert variant="warning">
            <i className="fas fa-exclamation-circle me-2"></i>
            This action cannot be undone. All survey responses and analytics will be permanently deleted.
          </Alert>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button
            variant="light"
            onClick={() => setShowDeleteModal(false)}
            className="px-4"
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={confirmDelete}
            className="px-4"
          >
            <i className="fas fa-trash me-2"></i>
            Delete Survey
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default SurveyList
