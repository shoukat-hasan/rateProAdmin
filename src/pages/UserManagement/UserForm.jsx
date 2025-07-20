// "use client"

// import { useState } from "react"
// import { useParams, useNavigate } from "react-router-dom"
// import { Container, Row, Col, Card, Form, Button } from "react-bootstrap"
// import { MdSave, MdArrowBack } from "react-icons/md"
// import { createUser } from "../../api/createUser"

// const UserForm = () => {
//   const { id } = useParams()
//   const navigate = useNavigate()
//   const isEditMode = Boolean(id)

//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     role: "Editor",
//   })

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setUser((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     try {
//       await createUser({
//         name: user.name,
//         email: user.email,
//         password: "12345678", // default for now
//         role: user.role,
//       })

//       alert("User created successfully!")
//       navigate("/app/users")
//     } catch (error) {
//       console.error("Error creating user:", error)
//       alert("Failed to create user")
//     }
//   }

//   return (
//     <Container fluid className="py-4">
//       <Row className="mb-4 align-items-center">
//         <Col>
//           <div className="d-flex align-items-center">
//             <Button
//               variant="outline-secondary"
//               className="me-3 d-flex align-items-center"
//               onClick={() => navigate("/app/users")}
//             >
//               <MdArrowBack className="me-1" />
//               Back
//             </Button>
//             <h1 className="h3 mb-0">{isEditMode ? "Edit User" : "Create User"}</h1>
//           </div>
//         </Col>
//       </Row>

//       <Row className="justify-content-center">
//         <Col lg={8}>
//           <Card className="shadow-sm border-0">
//             <Card.Body className="p-4">
//               <Form onSubmit={handleSubmit}>
//                 <Row>
//                   <Col md={6}>
//                     <Form.Group className="mb-4">
//                       <Form.Label>Name</Form.Label>
//                       <Form.Control
//                         type="text"
//                         name="name"
//                         value={user.name}
//                         onChange={handleChange}
//                         placeholder="Enter full name"
//                         required
//                       />
//                     </Form.Group>
//                   </Col>

//                   <Col md={6}>
//                     <Form.Group className="mb-4">
//                       <Form.Label>Email</Form.Label>
//                       <Form.Control
//                         type="email"
//                         name="email"
//                         value={user.email}
//                         onChange={handleChange}
//                         placeholder="user@example.com"
//                         required
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 <Row>
//                   <Col md={6}>
//                     <Form.Group className="mb-4">
//                       <Form.Label>Role</Form.Label>
//                       <Form.Select
//                         name="role"
//                         value={user.role}
//                         onChange={handleChange}
//                         required
//                       >
//                         <option value="Admin">Admin</option>
//                         <option value="Editor">Editor</option>
//                         <option value="Viewer">Viewer</option>
//                       </Form.Select>
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 <div className="d-flex justify-content-end gap-2 mt-3">
//                   <Button
//                     type="button"
//                     variant="secondary"
//                     className="d-flex align-items-center"
//                     onClick={() => navigate("/app/users")}
//                   >
//                     Cancel
//                   </Button>
//                   <Button type="submit" variant="primary" className="d-flex align-items-center">
//                     <MdSave className="me-2" />
//                     {isEditMode ? "Update User" : "Create User"}
//                   </Button>
//                 </div>
//               </Form>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   )
// }

// export default UserForm

// "use client"

// import { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { Container, Row, Col, Card, Form, Button } from "react-bootstrap"
// import { MdSave, MdArrowBack } from "react-icons/md"
// import { createUser } from "../../api/createUser"

// const UserForm = () => {
//   const navigate = useNavigate()

//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "",
//     status: "",
//   })

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setUser((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     try {
//       await createUser(user)
//       alert("User created successfully!")
//       navigate("/app/users")
//     } catch (error) {
//       console.error("Error creating user:", error)
//       alert("Failed to create user")
//     }
//   }

//   return (
//     <Container fluid className="py-4">
//       <Row className="mb-4 align-items-center">
//         <Col>
//           <div className="d-flex align-items-center">
//             <Button
//               variant="outline-secondary"
//               className="me-3 d-flex align-items-center"
//               onClick={() => navigate("/app/users")}
//             >
//               <MdArrowBack className="me-1" /> Back
//             </Button>
//             <h1 className="h3 mb-0">Create User</h1>
//           </div>
//         </Col>
//       </Row>

//       <Row className="justify-content-center">
//         <Col lg={8}>
//           <Card className="shadow-sm border-0">
//             <Card.Body className="p-4">
//               <Form onSubmit={handleSubmit}>
//                 <Row>
//                   <Col md={6}>
//                     <Form.Group className="mb-4">
//                       <Form.Label>Name</Form.Label>
//                       <Form.Control
//                         type="text"
//                         name="name"
//                         value={user.name}
//                         onChange={handleChange}
//                         placeholder="Enter full name"
//                         required
//                       />
//                     </Form.Group>
//                   </Col>

//                   <Col md={6}>
//                     <Form.Group className="mb-4">
//                       <Form.Label>Email</Form.Label>
//                       <Form.Control
//                         type="email"
//                         name="email"
//                         value={user.email}
//                         onChange={handleChange}
//                         placeholder="user@example.com"
//                         required
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 <Row>
//                   <Col md={6}>
//                     <Form.Group className="mb-4">
//                       <Form.Label>Password</Form.Label>
//                       <Form.Control
//                         type="password"
//                         name="password"
//                         value={user.password}
//                         onChange={handleChange}
//                         placeholder="Minimum 8 characters"
//                         required
//                       />
//                     </Form.Group>
//                   </Col>

//                   <Col md={6}>
//                     <Form.Group className="mb-4">
//                       <Form.Label>Role</Form.Label>
//                       <Form.Select
//                         name="role"
//                         value={user.role}
//                         onChange={handleChange}
//                         required
//                       >
//                         <option value="" disabled>Select Role</option>
//                         {/* <option value="admin">Admin</option> */}
//                         <option value="company">Company</option>
//                         <option value="user">User</option>
//                       </Form.Select>
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 <Row>
//                   <Col md={6}>
//                     <Form.Group className="mb-4">
//                       <Form.Label>Status</Form.Label>
//                       <Form.Select
//                         name="status"
//                         value={user.status}
//                         onChange={handleChange}
//                         required
//                       >
//                         <option value="" disabled>Select Status</option>
//                         <option value="Active">Active</option>
//                         <option value="Inactive">Inactive</option>
//                         <option value="Pending">Pending</option>
//                       </Form.Select>
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 <div className="d-flex justify-content-end gap-2 mt-3">
//                   <Button
//                     type="button"
//                     variant="secondary"
//                     onClick={() => navigate("/app/users")}
//                   >
//                     Cancel
//                   </Button>
//                   <Button type="submit" variant="primary" className="d-flex align-items-center">
//                     <MdSave className="me-2" /> Create User
//                   </Button>
//                 </div>
//               </Form>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   )
// }

// export default UserForm

"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container, Row, Col, Card, Form, Button, Spinner } from "react-bootstrap"
import Swal from "sweetalert2"
import { MdSave, MdArrowBack, MdVisibility, MdVisibilityOff } from "react-icons/md"
import { createUser } from "../../api/createUser"

const UserForm = () => {
  const navigate = useNavigate()

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    status: "",
  })

  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!user.name.trim()) newErrors.name = "Name is required"
    if (!user.email.trim()) newErrors.email = "Email is required"
    if (!user.password.trim()) newErrors.password = "Password is required"
    if (!user.role) newErrors.role = "Role is required"
    if (!user.status) newErrors.status = "Status is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fill all required fields.",
      })
      return
    }

    setIsSubmitting(true)

    try {
      await createUser(user)

      Swal.fire({
        icon: "success",
        title: "User Created",
        text: "User has been created successfully!",
      }).then(() => navigate("/app/users"))
    } catch (error) {
      console.error("Error creating user:", error)
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: error.response?.data?.message || "Failed to create user",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Container fluid className="py-4">
      <Row className="mb-4 align-items-center">
        <Col>
          <div className="d-flex align-items-center">
            <Button
              variant="outline-secondary"
              className="me-3 d-flex align-items-center"
              onClick={() => navigate("/app/users")}
            >
              <MdArrowBack className="me-1" /> Back
            </Button>
            <h1 className="h3 mb-0">Create User</h1>
          </div>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="shadow-sm border-0">
            <Card.Body className="p-4">
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        autoComplete="name"
                        value={user.name}
                        onChange={handleChange}
                        placeholder="Enter full name"
                      />
                      {errors.name && <div className="text-danger">{errors.name}</div>}
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        autoComplete="email"
                        value={user.email}
                        onChange={handleChange}
                        placeholder="user@example.com"
                      />
                      {errors.email && <div className="text-danger">{errors.email}</div>}
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" style={{ position: "relative" }}>
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        name="password"
                        autoComplete="new-password"
                        value={user.password}
                        onChange={handleChange}
                        placeholder="Minimum 8 characters"
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          position: "absolute",
                          top: "70%",
                          right: "10px",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                          color: "#888",
                          fontSize: "1.1rem"
                        }}
                      >
                        {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                      </span>
                      {errors.password && <div className="text-danger">{errors.password}</div>}
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Role</Form.Label>
                      <Form.Select
                        name="role"
                        value={user.role}
                        onChange={handleChange}
                        autoComplete="off"
                      >
                        <option value="">Select Role</option>
                        <option value="company">Company</option>
                        <option value="user">User</option>
                      </Form.Select>
                      {errors.role && <div className="text-danger">{errors.role}</div>}
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Status</Form.Label>
                      <Form.Select
                        name="status"
                        value={user.status}
                        onChange={handleChange}
                        autoComplete="off"
                      >
                        <option value="">Select Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Pending">Pending</option>
                      </Form.Select>
                      {errors.status && <div className="text-danger">{errors.status}</div>}
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-flex justify-content-end gap-2 mt-3">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => navigate("/app/users")}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>

                  <Button type="submit" variant="primary" className="d-flex align-items-center" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Spinner size="sm" className="me-2" animation="border" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <MdSave className="me-2" />
                        Create User
                      </>
                    )}
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