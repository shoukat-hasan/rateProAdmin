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

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Container, Row, Col, Card, Form, Button, Spinner } from "react-bootstrap"
import Swal from "sweetalert2"
import { MdSave, MdArrowBack, MdVisibility, MdVisibilityOff } from "react-icons/md"
import { createUser } from "../../api/createUser"
import { getCompanyById, getUserById, updateUser } from "../../api/axiosInstance"

const UserForm = () => {
  const navigate = useNavigate()

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    isActive: "",
    companyName: "",
    departmentName: "",
  })

  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const currentUser = JSON.parse(localStorage.getItem("authUser"));
  const currentUserRole = currentUser?.role || "";

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const validateForm = () => {
    const newErrors = {};

    if (!user.name.trim()) newErrors.name = "Name is required";
    if (!user.email.trim()) newErrors.email = "Email is required";
    if (!isEditMode && !user.password.trim()) newErrors.password = "Password is required";
    if (!user.role) newErrors.role = "Role is required";
    if (user.isActive === undefined || user.isActive === null)
      newErrors.isActive = "Status is required";


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // useEffect(() => {
  //   if (id) {
  //     getUserById(id)
  //       .then(async (res) => {
  //         const userData = res.data.user;
  //         console.log("User Loaded:", userData);

  //         let companyName = "";

  //         // 🔁 Fetch company name if company ID is present
  //         if (userData.company) {
  //           try {
  //             const companyRes = await getCompanyById(userData.company);
  //             companyName = companyRes.data.name;
  //             console.log(companyName)
  //           } catch (err) {
  //             console.error("Failed to load company:", err);
  //           }
  //         }

  //         setUser({
  //           name: userData.name,
  //           email: userData.email,
  //           password: "",
  //           role: userData.role,
  //           isActive: userData.isActive.toString(),
  //           companyName: userData.company?.name || "",
  //           departments: userData.company?.companyProfile?.departments || [],
  //         });
  //       })
  //       .catch((err) => {
  //         console.error("Error loading user:", err);
  //         Swal.fire("Error", "Failed to load user data", "error");
  //         navigate("/app/users");
  //       });
  //   }
  // }, [id]);



  //   const handleSubmit = async (e) => {
  //     e.preventDefault()

  //     if (!validateForm()) {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Validation Error",
  //         text: "Please fill all required fields.",
  //       })
  //       return
  //     }

  //     setIsSubmitting(true)

  //     try {
  //       if (isEditMode) {
  //         const { password, ...userWithoutPassword } = user
  //         await updateUser(id, userWithoutPassword)
  //         Swal.fire({ icon: "success", title: "User Updated" })
  //       } else {
  //         const preparedUser = {
  //           ...user,
  //           isActive: user.isActive === "true",
  //         };
  //         console.log("🔍 Creating user with data:", preparedUser);
  //         await createUser(preparedUser);
  //         Swal.fire({ icon: "success", title: "User Created" });
  //       }
  //     }

  //       navigate("/app/users")
  //   } catch (error) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Failed",
  //       text: error.response?.data?.message || "Failed to submit user data",
  //     })
  //   } finally {
  //     setIsSubmitting(false)
  //   }
  // }

  useEffect(() => {
    const fetchUserAndCompany = async () => {
      try {
        const res = await getUserById(id);
        const userData = res.data.user;
        console.log("User Loaded:", userData);
  
        let companyName = "";
        let departments = [];
  
        // ✅ If user has company and companyProfile populated
        if (userData.company && userData.company.companyProfile) {
          companyName = userData.company.name || "";
          departments = userData.company.companyProfile.departments || [];
        }
  
        // 🔁 Fallback: If only company ID is stored and no full object
        else if (userData.company && typeof userData.company === "string") {
          try {
            const companyRes = await getCompanyById(userData.company);
            companyName = companyRes.data.name || "";
            departments = companyRes.data?.companyProfile?.departments || [];
          } catch (err) {
            console.error("Failed to fetch company by ID", err);
          }
        }
  
        setUser({
          name: userData.name,
          email: userData.email,
          password: "",
          role: userData.role,
          isActive: userData.isActive.toString(),
          companyName,
          departments,
        });
  
        // 🔄 Set selected department if available
        setSelectedDepartment(userData.department || "");
      } catch (err) {
        console.error("Error loading user:", err);
        Swal.fire("Error", "Failed to load user data", "error");
        navigate("/app/users");
      }
    };
  
    if (id) {
      fetchUserAndCompany();
    }
  }, [id]);

  useEffect(() => {
    // Sirf create mode me chale
    if (!id && (currentUserRole === "companyAdmin" || currentUserRole === "member")) {
      const companyName = currentUser?.companyProfile?.name || "";
      const departments = currentUser?.companyProfile?.departments || [];
  
      setUser((prev) => ({
        ...prev,
        companyName,
        departments,
      }));
    }
  }, [id]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fill all required fields.",
      });
      return;
    }

    setIsSubmitting(true);

    const preparedUser = {
      ...user,
      companyName: "ABC Company",
      department: "Management",
    };
    console.log("Submitted user:", preparedUser);
    try {
      if (isEditMode) {
        const { password, ...userWithoutPassword } = preparedUser;
        await updateUser(id, userWithoutPassword);
        Swal.fire({ icon: "success", title: "User Updated" });
      } else {
        await createUser(preparedUser);
        Swal.fire({ icon: "success", title: "User Created" });
      }

      navigate("/app/users");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: error.response?.data?.message || "Failed to submit user data",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <h1 className="h3 mb-0">{isEditMode ? "Edit User" : "Create User"}</h1>
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
                        placeholder={isEditMode ? user.email : "user@example.com"}
                        disabled={isEditMode}
                      />
                      {errors.email && <div className="text-danger">{errors.email}</div>}
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <div style={{ position: "relative" }}>
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          name="password"
                          autoComplete="new-password"
                          value={user.password}
                          onChange={handleChange}
                          placeholder={isEditMode ? "Password unchanged" : "Minimum 8 characters"}
                          disabled={isEditMode}
                        />
                        <span
                          onClick={() => setShowPassword(!showPassword)}
                          style={{
                            position: "absolute",
                            top: "50%",
                            right: "10px",
                            transform: "translateY(-50%)",
                            cursor: isEditMode ? "not-allowed" : "pointer",
                            color: "#888",
                            fontSize: "1.1rem"
                          }}
                        >
                          {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                        </span>
                      </div>
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

                        {currentUserRole === "admin" && (
                          <>
                            <option value="companyAdmin">Company Admin</option>
                            <option value="user">User</option>
                          </>
                        )}

                        {currentUserRole === "companyAdmin" && <option value="member">Member</option>}

                        {currentUserRole === "member" && memberCanCreate && <option value="member">Member</option>}
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
                        name="isActive"
                        value={user.isActive?.toString() || ""}
                        onChange={(e) =>
                          setUser({ ...user, isActive: e.target.value === "true" })
                        }
                        autoComplete="off"
                      >
                        <option value="">Select Status</option>
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                      </Form.Select>
                      {errors.status && <div className="text-danger">{errors.status}</div>}

                    </Form.Group>
                  </Col>
                </Row>

                {currentUserRole === "companyAdmin" && (
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Company Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="companyName"
                          value={user.companyName}
                          onChange={handleChange}
                          placeholder="e.g. Acme Corp"
                          disabled
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Department Name</Form.Label>
                        <Form.Select>
                          {Array.isArray(user.departments) && user.departments.length > 0 ? (
                            user.departments.map((dept, index) => (
                              <option key={index} value={dept}>{dept}</option>
                            ))
                          ) : (
                            <option disabled>No departments found</option>
                          )}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                )}

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
                        Submitting...
                      </>
                    ) : (
                      <>
                        <MdSave className="me-2" />
                        {isEditMode ? "Update User" : "Create User"}
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