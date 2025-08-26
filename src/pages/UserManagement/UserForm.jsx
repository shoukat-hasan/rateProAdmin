// src/components/UserForm.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import { MdSave, MdArrowBack, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { updateUser, getUserById, axiosInstance } from "../../api/axiosInstance";
import { createUser } from "../../api/createUser";
import { useAuth } from "../../context/AuthContext";

const UserForm = () => {
  const navigate = useNavigate();
  const { user: currentUser, hasPermission } = useAuth();
  const { id } = useParams(); // id may be undefined in create mode
  const isEditMode = Boolean(id);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    isActive: "",
    tenantName: "", // Changed from companyName
    tenantId: "", // Changed from companyId
    departments: [],
    departmentId: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentUserRole = currentUser?.role || "";
  const memberCanCreate = hasPermission("user:create");
  const memberCanUpdate = hasPermission("user:update");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!user.name.trim()) newErrors.name = "Name is required";
    if (!user.email.trim()) newErrors.email = "Email is required";
    if (!isEditMode && !user.password.trim()) newErrors.password = "Password is required";
    if (!user.role) newErrors.role = "Role is required";
    if (user.isActive === undefined || user.isActive === null)
      newErrors.isActive = "Status is required";
    if (currentUserRole === "admin" && user.role === "companyAdmin" && !user.tenantName.trim())
      newErrors.tenantName = "Tenant Name is required for Company Admin";
    if (
      (currentUserRole === "companyAdmin" || (currentUserRole === "member" && user.role === "member")) &&
      !user.departmentId
    )
      newErrors.departmentId = "Department is required for Member";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchTenantData = async (tenantId) => {
    try {
      const res = await axiosInstance.get(`/tenants/${tenantId}`, { withCredentials: true });
      const tenant = res.data.tenant;
      setUser((prev) => ({
        ...prev,
        tenantId: tenant._id,
        tenantName: tenant.name || "",
        departments: tenant.departments || [],
      }));
    } catch (err) {
      console.error("fetchTenantData error:", err.message);
      Swal.fire("Error", "Failed to load tenant data", "error");
    }
  };

  useEffect(() => {

    const fetchUser = async () => {
      if (!id) return; // Prevent fetching if id is undefined
      try {
        const res = await getUserById(id);
        const userData = res.data.user;

        if (!userData) {
          throw new Error("No user data received from server");
        }

        let tenantName = "";
        let departments = [];
        let tenantId = "";
        let departmentId = "";

        if (userData.tenant && typeof userData.tenant === 'object') {
          tenantName = userData.tenant.name || "";
          tenantId = userData.tenant._id?.toString() || "";
          departments = Array.isArray(userData.tenant.departments)
            ? userData.tenant.departments.map(dept => ({
              _id: dept._id?.toString() || "",
              name: dept.name || "Unknown Department",
            }))
            : [];
          departmentId = userData.department?._id?.toString() || "";
        } else if (userData.role === "companyAdmin" && userData.tenant) {
          const tenantRes = await axiosInstance.get(`/tenants/${userData.tenant}`, { withCredentials: true });
          const tenant = tenantRes.data.tenant;
          tenantName = tenant.name || "";
          tenantId = tenant._id?.toString() || "";
          departments = Array.isArray(tenant.departments)
            ? tenant.departments.map(dept => ({
              _id: dept._id?.toString() || "",
              name: dept.name || "Unknown Department",
            }))
            : [];
        }

        if (!userData.department) {
          console.warn("fetchUser: No department assigned to user", { userId: userData._id });
          Swal.fire("Warning", "No department assigned to this user", "warning");
        }
        if (!departments.length) {
          console.warn("fetchUser: No departments found in tenant", { tenantId });
          Swal.fire("Warning", "No departments available for this tenant", "warning");
        }

        setUser({
          _id: userData._id?.toString() || "",
          name: userData.name || "",
          email: userData.email || "",
          password: "",
          role: userData.role || "",
          isActive: userData.isActive?.toString() || "true",
          tenantId,
          tenantName,
          departments,
          departmentId,
        });
      } catch (err) {
        console.error("Error loading user:", {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
        });
        Swal.fire("Error", err.response?.data?.message || "Failed to load user data", "error");
        navigate("/app/users", { state: { refresh: true }, replace: true });
      }
    };

    if (isEditMode) fetchUser();
  }, [id, navigate, isEditMode]);

  useEffect(() => {
    if (!isEditMode && (currentUserRole === "companyAdmin" || currentUserRole === "member")) {
      let tenantId;
      if (currentUser?.tenant?._id) {
        tenantId = currentUser.tenant._id;
      } else if (typeof currentUser?.tenant === 'string') {
        tenantId = currentUser.tenant;
      }

      if (tenantId) {
        fetchTenantData(tenantId);
      } else {
        console.warn("useEffect: No tenant ID found in currentUser", { currentUser });
        Swal.fire("Error", "No tenant associated with this user", "error");
      }
    }
  }, [isEditMode, currentUserRole, currentUser]);

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

    // 🚫 Restrict member without permission
    if (!isEditMode && currentUserRole === "member" && !memberCanCreate) {
      return Swal.fire("Forbidden", "You don't have permission to create users", "error");
    }
    if (isEditMode && currentUserRole === "member" && !memberCanUpdate) {
      return Swal.fire("Forbidden", "You don't have permission to update users", "error");
    }

    setIsSubmitting(true);

    try {
      if (isEditMode) {
        let payload = {};
        if (user.name !== user.originalName) payload.name = user.name;

        if (user.role !== user.originalRole) {
          if (currentUserRole === "admin") {
            if (!(user.originalRole === "companyAdmin" && user.role === "user")) {
              payload.role = user.role;
            } else {
              console.warn("Cannot demote companyAdmin to user");
            }
          }
        }

        if (currentUserRole === "admin" && user.role === "companyAdmin") {
          if (user.tenantName !== user.originalTenantName) payload.tenantName = user.tenantName;
        }

        if (currentUserRole === "companyAdmin" || (currentUserRole === "member" && user.role === "member")) {
          if (user.departmentId !== user.originalDepartmentId) payload.department = user.departmentId;
        }

        // 🔹 Add this
        if (user.isActive !== user.originalIsActive) {
          payload.isActive = user.isActive;
        }

        // ✅ Agar payload empty he to API call hi na ho
        if (Object.keys(payload).length === 0) {
          Swal.fire({ icon: "info", title: "No changes to update" });
          return;
        }

        await updateUser(id, payload);
        Swal.fire({ icon: "success", title: "User Updated" });
      } else {
        const preparedUser = {
          name: user.name,
          email: user.email,
          password: user.password,
          role: user.role,
          isActive: user.isActive === "true",
        };

        if (currentUserRole === "admin" && user.role === "companyAdmin") {
          preparedUser.tenantName = user.tenantName;
        } else if (currentUserRole === "companyAdmin" || (currentUserRole === "member" && user.role === "member")) {
          preparedUser.tenant = user.tenantId;
          preparedUser.department = user.departmentId;
        }

        await createUser(preparedUser);
        Swal.fire({ icon: "success", title: "User Created" });
      }

      navigate("/app/users", { state: { refresh: true }, replace: true });
    } catch (error) {
      console.error("User submission failed:", {
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
        error,
      });
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
                  {isEditMode && (
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>User ID</Form.Label>
                        <Form.Control type="text" value={user._id || ""} disabled />
                      </Form.Group>
                    </Col>
                  )}
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
                </Row>

                <Row>
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
                            fontSize: "1.1rem",
                          }}
                        >
                          {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                        </span>
                      </div>
                      {errors.password && <div className="text-danger">{errors.password}</div>}
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Role</Form.Label>
                      {/* Role dropdown */}
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
                        {(currentUserRole === "companyAdmin" || memberCanCreate) && (
                          <option value="member">Member</option>
                        )}
                      </Form.Select>
                      {errors.role && <div className="text-danger">{errors.role}</div>}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Status</Form.Label>
                      <Form.Select
                        name="isActive"
                        value={user.isActive}
                        onChange={handleChange}
                        autoComplete="off"
                      >
                        <option value="">Select Status</option>
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                      </Form.Select>
                      {errors.isActive && <div className="text-danger">{errors.isActive}</div>}
                    </Form.Group>
                  </Col>
                </Row>

                {currentUserRole === "admin" && user.role === "companyAdmin" && (
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Tenant Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="tenantName"
                          value={user.tenantName}
                          onChange={handleChange}
                          placeholder="e.g. Acme Corp"
                        />
                        {errors.tenantName && <div className="text-danger">{errors.tenantName}</div>}
                      </Form.Group>
                    </Col>
                  </Row>
                )}

                {(currentUserRole === "companyAdmin" || memberCanCreate) && (
                  <>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Tenant ID</Form.Label>
                          <Form.Control type="text" value={user.tenantId || ""} disabled />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Tenant Name</Form.Label>
                          <Form.Control type="text" value={user.tenantName} disabled />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Department</Form.Label>
                          <Form.Select
                            name="departmentId"
                            value={user.departmentId}
                            onChange={handleChange}
                          >
                            <option value="">Select Department</option>
                            {Array.isArray(user.departments) && user.departments.length > 0 ? (
                              user.departments.map((dept) => (
                                <option key={dept._id} value={dept._id}>
                                  {dept.name}
                                </option>
                              ))
                            ) : (
                              <option disabled>No departments found</option>
                            )}
                          </Form.Select>
                          {errors.departmentId && (
                            <div className="text-danger">{errors.departmentId}</div>
                          )}
                        </Form.Group>
                      </Col>
                    </Row>
                  </>
                )}

                <div className="d-flex justify-content-end gap-2 mt-3">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => navigate("/app/users", { replace: true })}
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
  );
};

export default UserForm;