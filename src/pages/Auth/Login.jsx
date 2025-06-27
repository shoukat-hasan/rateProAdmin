// src\pages\Auth\Login.jsx

// "use client"

import { useState } from "react"
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { FaEye, FaEyeSlash } from "react-icons/fa"


const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const { login } = useAuth()

  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   setLoading(true)
  //   setError("")

  //   try {
  //     await new Promise((resolve) => setTimeout(resolve, 500))

  //     const success = login(email, password)
  //     if (success) {
  //       navigate("/app")
  //     } else {
  //       setError("Invalid email or password.")
  //     }
  //   } catch (err) {
  //     setError("An error occurred. Please try again.")
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
  
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
  
      const success = login(email, password)
      if (success) {
        const loggedInUser = JSON.parse(localStorage.getItem("authUser"))
        if (loggedInUser.role === "User") {
          window.location.href = "https://ratepro-sa.com"
        } else {
          navigate("/app")
        }
      } else {
        setError("Invalid email or password.")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4} xl={3}>
          <Card className="shadow">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <h2 className="h4 mb-1">Welcome Back</h2>
                <p className="text-muted">Sign in to your RatePro account</p>
              </div>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3 position-relative">
                  <Form.Label>Password</Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: "absolute",
                        top: "50%",
                        right: "18px",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        color: "#6c757d",
                        fontSize: "1.1rem"
                      }}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check type="checkbox" label="Remember me" />
                </Form.Group>

                <Button type="submit" variant="primary" className="w-100 mb-3" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>

                <div className="text-center">
                  <Link to="/forgot-password" className="text-decoration-none">
                    Forgot your password?
                  </Link>
                </div>
              </Form>
            </Card.Body>
            {/* <Card.Footer className="text-center py-3">
              <span className="text-muted">Don't have an account? </span>
              <Link to="/signup" className="text-decoration-none">
                Sign up
              </Link>
            </Card.Footer> */}
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
