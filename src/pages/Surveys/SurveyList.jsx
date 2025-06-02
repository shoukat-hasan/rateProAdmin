"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Table, Badge, Button, InputGroup, Form, Row, Col } from "react-bootstrap"
import { MdEdit, MdDelete, MdVisibility, MdAdd, MdSearch, MdFilterList } from "react-icons/md"

const SurveyList = ({ limit }) => {
  const [surveys, setSurveys] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    setTimeout(() => {
      const dummySurveys = [
        {
          id: 1,
          title: "Customer Satisfaction Survey",
          status: "Active",
          responses: 245,
          created: "2023-05-15",
          lastUpdated: "2023-06-01",
        },
        {
          id: 2,
          title: "Product Feedback Survey",
          status: "Active",
          responses: 189,
          created: "2023-05-20",
          lastUpdated: "2023-05-28",
        },
        {
          id: 3,
          title: "Employee Engagement Survey",
          status: "Draft",
          responses: 0,
          created: "2023-06-01",
          lastUpdated: "2023-06-01",
        },
        {
          id: 4,
          title: "Website Usability Survey",
          status: "Active",
          responses: 78,
          created: "2023-05-10",
          lastUpdated: "2023-05-25",
        },
        {
          id: 5,
          title: "Market Research Survey",
          status: "Completed",
          responses: 312,
          created: "2023-04-15",
          lastUpdated: "2023-05-15",
        },
      ]

      setSurveys(limit ? dummySurveys.slice(0, limit) : dummySurveys)
      setLoading(false)
    }, 800)
  }, [limit])

  const getStatusVariant = (status) => {
    switch (status) {
      case "Active":
        return "success"
      case "Draft":
        return "secondary"
      case "Completed":
        return "primary"
      default:
        return "secondary"
    }
  }

  if (loading) {
    return <div className="text-center py-4">Loading surveys...</div>
  }

  return (
    <div>
      {!limit && (
        <>
          {/* Header */}
          <Row className="mb-4">
            <Col>
              <div className="d-flex justify-content-between align-items-center">
                <h1 className="h3 mb-0">Surveys</h1>
                <Button variant="primary">
                  <MdAdd className="me-2" />
                  Create New Survey
                </Button>
              </div>
            </Col>
          </Row>

          {/* Filters */}
          <Row className="mb-4">
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>
                  <MdSearch />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search surveys..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={6} className="d-flex justify-content-end align-items-center gap-2">
              <Button variant="outline-secondary" size="sm">
                <MdFilterList className="me-1" />
                Filter
                <Badge bg="primary" className="ms-2">
                  0
                </Badge>
              </Button>
              <Form.Select size="sm" style={{ width: "auto" }}>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="responses-high">Most Responses</option>
                <option value="responses-low">Least Responses</option>
              </Form.Select>
            </Col>
          </Row>
        </>
      )}

      {/* Table */}
      <div className="table-responsive">
        <Table hover className="mb-0">
          <thead>
            <tr>
              <th>Survey Title</th>
              <th className="text-center">Status</th>
              <th className="text-center">Responses</th>
              <th>Created</th>
              <th>Last Updated</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {surveys.map((survey) => (
              <tr key={survey.id}>
                <td>
                  <Link to={`/surveys/${survey.id}`} className="text-primary text-decoration-none fw-medium">
                    {survey.title}
                  </Link>
                </td>
                <td className="text-center">
                  <Badge bg={getStatusVariant(survey.status)}>{survey.status}</Badge>
                </td>
                <td className="text-center">{survey.responses}</td>
                <td>{survey.created}</td>
                <td>{survey.lastUpdated}</td>
                <td>
                  <div className="d-flex justify-content-center gap-1">
                    <Button variant="outline-primary" size="sm" title="View">
                      <MdVisibility />
                    </Button>
                    <Button variant="outline-secondary" size="sm" title="Edit">
                      <MdEdit />
                    </Button>
                    <Button variant="outline-danger" size="sm" title="Delete">
                      <MdDelete />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default SurveyList
