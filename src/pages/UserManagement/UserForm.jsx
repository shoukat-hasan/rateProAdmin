// src\pages\UserManagement\UserForm.jsx

"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap"
import { MdSave, MdArrowBack } from "react-icons/md"

const UserForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditMode = Boolean(id)

  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "Editor",
    status: "Active",
  })

  const [loading, setLoading] = useState(isEditMode)

  useEffect(() => {
    if (isEditMode) {
      setTimeout(() => {
        setUser({
          name: "John Doe",
          email: "john@example.com",
          role: "Admin",
          status: "Active",
        })
        setLoading(false)
      }, 500)
    }
  }, [id, isEditMode])

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("User saved:", user)
    navigate("/users")
  }

  if (loading) {
    return <div className="text-center py-4">Loading user data...</div>
  }

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <div className="d-flex align-items-center">
            <Button variant="outline-secondary" className="me-3" onClick={() => navigate("/users")}>
              <MdArrowBack />
            </Button>
            <h1 className="h3 mb-0">{isEditMode ? "Edit User" : "Create User"}</h1>
          </div>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col lg={8}>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control type="text" name="name" value={user.name} onChange={handleChange} required />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" name="email" value={user.email} onChange={handleChange} required />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Role</Form.Label>
                      <Form.Select name="role" value={user.role} onChange={handleChange} required>
                        <option value="Admin">Admin</option>
                        <option value="Editor">Editor</option>
                        <option value="Viewer">Viewer</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Status</Form.Label>
                      <Form.Select name="status" value={user.status} onChange={handleChange} required>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Pending">Pending</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-flex justify-content-end gap-2">
                  <Button type="button" variant="secondary" onClick={() => navigate("/users")}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary">
                    <MdSave className="me-2" />
                    {isEditMode ? "Update User" : "Create User"}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default UserForm
