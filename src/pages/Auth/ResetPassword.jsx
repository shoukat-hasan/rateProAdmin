// // src\pages\Auth\ResetPassword.jsx
// // "use client"
// import { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { FaEye, FaEyeSlash } from "react-icons/fa"

// const ResetPassword = () => {
//   const [password, setPassword] = useState("")
//   const [confirmPassword, setConfirmPassword] = useState("")
//   const [showPassword, setShowPassword] = useState(false)
//   const [error, setError] = useState("")
//   const navigate = useNavigate()

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     if (password.length < 6) {
//       setError("Password must be at least 6 characters long")
//       return
//     }
//     if (password !== confirmPassword) {
//       setError("Passwords do not match")
//       return
//     }
//     setError("")
//     navigate("/login")
//   }

//   return (
//     <div style={styles.container}>
//       <form style={styles.form} onSubmit={handleSubmit}>
//         <h2 style={styles.heading}>Reset Password</h2>
//         <p style={styles.text}>Create your new password below.</p>
//         <div className="position-relative">
//           <input
//             style={styles.input}
//             type={showPassword ? "text" : "password"}
//             placeholder="New password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <span
//             onClick={() => setShowPassword(!showPassword)}
//             style={{
//               position: "absolute",
//               top: "50%",
//               right: "18px",
//               transform: "translateY(-50%)",
//               cursor: "pointer",
//               color: "#6c757d",
//               fontSize: "1.1rem"
//             }}
//           >
//             {showPassword ? <FaEyeSlash /> : <FaEye />}
//           </span>
//         </div>
//         <div className="position-relative">
//           <input
//             type={showPassword ? "text" : "password"}
//             placeholder="Confirm new password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             style={styles.input}
//             required
//           />
//           <span
//             onClick={() => setShowPassword(!showPassword)}
//             style={{
//               position: "absolute",
//               top: "50%",
//               right: "18px",
//               transform: "translateY(-50%)",
//               cursor: "pointer",
//               color: "#6c757d",
//               fontSize: "1.1rem"
//             }}
//           >
//             {showPassword ? <FaEyeSlash /> : <FaEye />}
//           </span>
//         </div>
//         {error && <p style={styles.error}>{error}</p>}
//         <button type="submit" style={styles.button}>Reset Password</button>
//       </form>
//     </div>
//   )
// }

// const styles = {
//   container: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     minHeight: "100vh",
//     background: "#f4f4f4",
//     padding: 20,
//   },
//   form: {
//     background: "#fff",
//     padding: 30,
//     borderRadius: 10,
//     boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//     width: "100%",
//     maxWidth: 400,
//   },
//   heading: {
//     fontSize: 24,
//     marginBottom: 10,
//     fontWeight: "bold",
//   },
//   text: {
//     fontSize: 14,
//     marginBottom: 20,
//     color: "#666",
//   },
//   input: {
//     width: "100%",
//     padding: 10,
//     marginBottom: 10,
//     borderRadius: 5,
//     border: "1px solid #ccc",
//     fontSize: 14,
//   },
//   button: {
//     width: "100%",
//     padding: 10,
//     border: "none",
//     borderRadius: 5,
//     backgroundColor: "#007bff",
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: 16,
//     cursor: "pointer",
//   },
//   error: {
//     color: "red",
//     fontSize: 13,
//     marginBottom: 10,
//   },
// }

// export default ResetPassword
"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import axiosInstance from "../../api/axiosInstance"

const ResetPassword = () => {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password.length < 6) {
      setError("Password must be at least 6 characters long")
      return
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    try {
      setError("")

      console.log({
        email: localStorage.getItem("resetEmail"),
        otp: localStorage.getItem("resetOTP"),
        newPassword: password
      });
      

      // API request
      const res = await axiosInstance.put("/auth/resetpassword", {
        email: localStorage.getItem("resetEmail"),
        otp: localStorage.getItem("resetOTP"),  // ab yeh null nahi hoga
        newPassword: password
      })      

      localStorage.removeItem("resetEmail")
      localStorage.removeItem("isResetVerified")
      localStorage.removeItem("resetOTP")

      // Success message ya redirect
      alert("Password reset successful!")
      navigate("/login")
    } catch (error) {
      setError(error.response?.data.message || "Failed to reset password")
    }
  }

  // Prevent direct access
  useEffect(() => {
    const email = localStorage.getItem("resetEmail")
    const verified = localStorage.getItem("isResetVerified")

    if (!email || verified !== "true") {
      navigate("/forgot-password")
    }
  }, [navigate])


  return (
    <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-4 px-3">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={10} md={8} lg={5} xl={4}>
          <Card className="shadow border-0">
            <Card.Body className="p-4 p-sm-5">
              <div className="text-center mb-4">
                <h2 className="h4 fw-bold mb-1">Reset Password</h2>
                <p className="text-muted mb-0">Create your new password below.</p>
              </div>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3 position-relative">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="New password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="py-2"
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
                      fontSize: "1.1rem",
                    }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </Form.Group>

                <Form.Group className="mb-3 position-relative">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="py-2"
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
                      fontSize: "1.1rem",
                    }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </Form.Group>

                <Button type="submit" variant="primary" className="w-100 fw-medium py-2">
                  Reset Password
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default ResetPassword