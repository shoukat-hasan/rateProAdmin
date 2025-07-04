// src\pages\UserManagement\UserList.jsx

"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Container, Row, Col, Table, Badge, Button, InputGroup, Form, Card } from "react-bootstrap"
import { MdEdit, MdDelete, MdSearch, MdAdd, MdPerson } from "react-icons/md"
import Pagination from "../../components/Pagination/Pagination.jsx"

const UserList = ({ darkMode }) => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    role: "",
    status: "",
  })
  const [pagination, setPagination] = useState({ page: 1, limit: 1, total: 0 })

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      setTimeout(() => {
        const mockUsers = [
          {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            role: "Admin",
            status: "Active",
            lastLogin: "2023-06-15",
          },
          {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            role: "Editor",
            status: "Active",
            lastLogin: "2023-06-14",
          },
          {
            id: 3,
            name: "Bob Johnson",
            email: "bob@example.com",
            role: "Viewer",
            status: "Inactive",
            lastLogin: "2023-06-10",
          },
          {
            id: 4,
            name: "Alice Brown",
            email: "alice@example.com",
            role: "Editor",
            status: "Pending",
            lastLogin: "2023-06-12",
          },
          {
            id: 5,
            name: "Charlie Wilson",
            email: "charlie@example.com",
            role: "Viewer",
            status: "Active",
            lastLogin: "2023-06-13",
          },
        ]
        setUsers(mockUsers)
        setLoading(false)
      }, 500)
    }

    fetchUsers()
  }, [searchTerm, filters])

  const getRoleVariant = (role) => {
    switch (role) {
      case "Admin":
        return "primary"
      case "Editor":
        return "success"
      case "Viewer":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getStatusVariant = (status) => {
    switch (status) {
      case "Active":
        return "success"
      case "Inactive":
        return "danger"
      case "Pending":
        return "warning"
      default:
        return "secondary"
    }
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  if (loading) {
    return <div className="text-center py-4">Loading users...</div>
  }

  const startIndex = (pagination.page - 1) * pagination.limit
  const endIndex = startIndex + pagination.limit
  const currentUsers = users.slice(startIndex, endIndex)

  return (
    <Container fluid className="py-4">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="h3 mb-0">User Management</h1>
            <Button as={Link} to="/app/users/create" variant="primary">
              <MdAdd className="me-2" />
              Create User
            </Button>
          </div>
        </Col>
      </Row>

      {/* Filters */}
      <Card className="mb-4">
        <Card.Body>
          <Row className="g-3">
            <Col md={4}>
              <InputGroup>
                <InputGroup.Text>
                  <MdSearch />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={3}>
              <Form.Select name="role" value={filters.role} onChange={handleFilterChange}>
                <option value="">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="Editor">Editor</option>
                <option value="Viewer">Viewer</option>
              </Form.Select>
            </Col>
            <Col md={3}>
              <Form.Select name="status" value={filters.status} onChange={handleFilterChange}>
                <option value="">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </Form.Select>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Users Table */}
      <Card>
        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table hover className="mb-0">
              <thead className="table-light">
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Last Login</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div
                          className="rounded-circle bg-light d-flex align-items-center justify-content-center me-3"
                          style={{ width: "40px", height: "40px" }}
                        >
                          <MdPerson className="text-secondary" />
                        </div>
                        <div>
                          <div className="fw-medium">{user.name}</div>
                          <small className="text-muted">{user.email}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <Badge bg={getRoleVariant(user.role)}>{user.role}</Badge>
                    </td>
                    <td>
                      <Badge bg={getStatusVariant(user.status)}>{user.status}</Badge>
                    </td>
                    <td>{user.lastLogin}</td>
                    <td>
                      <div className="d-flex justify-content-center gap-1">
                        <Button as={Link} to={`/users/${user.id}/edit`} variant="outline-primary" size="sm">
                          <MdEdit />
                        </Button>
                        <Button variant="outline-danger" size="sm">
                          <MdDelete />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>

        {/* 👇 Correctly placed Card.Footer */}
        <Card.Footer>
          <div className="d-flex justify-content-between align-items-center">
            <small className="text-muted">
              Showing {(pagination.page - 1) * pagination.limit + 1} to {Math.min(pagination.page * pagination.limit, users.length)} of {users.length} users
            </small>
            <Pagination
              current={pagination.page}
              total={users.length}
              limit={pagination.limit}
              onChange={(page) => setPagination((prev) => ({ ...prev, page }))}
              darkMode={darkMode}
            />
          </div>
        </Card.Footer>
      </Card>
    </Container>
  )
}

export default UserList
