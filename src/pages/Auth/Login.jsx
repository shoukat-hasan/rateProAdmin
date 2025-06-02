"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setError("")
      setLoading(true)
      // Mock login
      await new Promise((resolve) => setTimeout(resolve, 1000))
      navigate("/")
    } catch (error) {
      setError("Failed to log in. Please check your credentials.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card className="shadow-lg border-0">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <h1 className="h3 text-primary fw-bold mb-2">Rate Pro</h1>
                <p className="text-muted">Sign in to your account</p>
              </div>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <div className="d-flex justify-content-end mb-3">
                  <Link to="/forgot-password" className="text-primary text-decoration-none small">
                    Forgot Password?
                  </Link>
                </div>

                <Button type="submit" variant="primary" className="w-100 mb-3" disabled={loading}>
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </Form>

              <div className="text-center">
                <p className="mb-0">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-primary text-decoration-none">
                    Sign up
                  </Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
