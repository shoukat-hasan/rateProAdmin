// src\pages\AccessManagement\RoleManagement.jsx
import React, { useState, useEffect, useMemo, useRef } from "react";
import { Container, Row, Col, Card, Table, Badge, Button, Form, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { MdAdd, MdEdit, MdDelete, MdSave, MdCancel } from "react-icons/md";
import Pagination from "../../components/Pagination/Pagination.jsx";
import axiosInstance from "../../api/axiosInstance";
import Swal from "sweetalert2";
import { useAuth } from "../../context/AuthContext";

// Predefined roles and their associated permissions
const rolePermissionMap = {
  "User Manager": {
    group: "user",
    description: "Responsible for managing user accounts",
    permissions: [
      "user:create",
      "user:read",
      "user:update",
      "user:delete",
      "user:toggle",
      "user:export",
      "user:notify",
      "user:mass-upload",
      "user:file-template"
    ]
  },
  "Role Manager": {
    group: "role",
    description: "Handles role creation, updates, deletion, and assigning roles to users.",
    permissions: ["role:create", "role:read", "role:update", "role:delete", "role:assign"]
  },
  "Survey Manager": {
    group: "survey",
    description: "Manages survey creation, scheduling, customization, analytics, and response tracking.",
    permissions: [
      "survey:read",
      "survey:create",
      "survey:templates",
      "survey:schedule",
      "survey:responses:view",
      "survey:analytics:view",
      "survey:customize",
      "survey:share",
      "survey:settings:update",
      "survey:detail:view"
    ]
  },
  "Analytics Viewer": {
    group: "analytics",
    description: "Provides access to view analytics reports, trends, and real-time insights.",
    permissions: [
      "analytics:view",
      "analytics:realtime",
      "analytics:trends",
      "analytics:custom",
      "analytics:responses"
    ]
  },
  "Audience Manager": {
    group: "audience",
    description: "Manages audience segmentation, contacts, and targeted groups.",
    permissions: [
      "audience:view",
      "audience:segment",
      "audience:contacts"
    ]
  },
  "Content Manager": {
    group: "content",
    description: "Responsible for managing website/app content such as features, pricing, testimonials, and widgets.",
    permissions: [
      "content:features",
      "content:pricing",
      "content:testimonials",
      "content:widgets"
    ]
  },
  "Support Agent": {
    group: "support",
    description: "Handles customer support tickets and user queries.",
    permissions: ["support:tickets"]
  }
};

// RoleManagement component for creating, editing, and assigning roles
const RoleManagement = () => {
  const { user, loading: authLoading, hasPermission } = useAuth();
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [assigningRole, setAssigningRole] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  const [rolePermissions, setRolePermissions] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [assignedUserIds, setAssignedUserIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);

  const currentUserRole = user?.role || "";
  const isMember = currentUserRole === "member";

  const memberCanCreate = !isMember || hasPermission("role:create");
  const memberCanUpdate = !isMember || hasPermission("role:update");
  const memberCanDelete = !isMember || hasPermission("role:delete");
  const memberCanAssign = !isMember || hasPermission("role:assign");
  const memberCanRemove = !isMember || hasPermission("role:remove");
  const memberCanRead = !isMember || hasPermission("role:read");

  const tenantId = user?.tenant?._id || null;

  // Memoize rolePermissions to prevent unnecessary re-renders
  const memoizedRolePermissions = useMemo(() => rolePermissions, [rolePermissions]);

  const availablePredefinedRoles = useMemo(() => {
    return Object.keys(rolePermissionMap);
  }, []);

  // Filter permissions based on selected role (for both create and edit)
  const filteredPermissions = useMemo(() => {
    // For both create and edit, use the selectedRole (which is set to editingRole.name if editing)
    if (!selectedRole) return [];
    const roleConfig = rolePermissionMap[selectedRole] || { group: null, permissions: [] };
    return permissions.filter((p) => {
      if (!p || !p.name) return false;
      return roleConfig.group
        ? p.group === roleConfig.group
        : roleConfig.permissions.includes(p.name);
    });
  }, [selectedRole, permissions]);

  // Group permissions for display
  const groupedPermissions = useMemo(() => {
    return filteredPermissions.reduce((acc, p) => {
      const group = p.group || "Other";
      acc[group] = acc[group] || [];
      acc[group].push(p);
      return acc;
    }, {});
  }, [filteredPermissions]);

  // Filter users based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUsers([]);
      setShowDropdown(false);
    } else {
      const filtered = users.filter(
        (user) =>
          user.role !== "companyAdmin" &&
          !assignedUserIds.includes(user._id) &&
          (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredUsers(filtered);
      setShowDropdown(true);
    }
  }, [searchTerm, users, assignedUserIds]);

  // Handle user selection
  const handleSelectUser = (user) => {
    setSelectedUserId(user._id);
    setSearchTerm(`${user.name} (${user.email})`); // Show selected user in input
    setShowDropdown(false); // Close dropdown
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Auto-select first available predefined role when creating
  useEffect(() => {
    if (showModal && !editingRole && availablePredefinedRoles.length > 0 && selectedRole === "") {
      const firstRole = availablePredefinedRoles[0];
      setSelectedRole(firstRole);
      setRoleDescription(rolePermissionMap[firstRole]?.description || ""); // 👈 ab sahi
      setRolePermissions([]); // Ensure no permissions are pre-selected
    }
  }, [showModal, editingRole, availablePredefinedRoles, selectedRole]);

  // Fetch data on mount and when pagination.page changes
  useEffect(() => {
    if (!authLoading && tenantId && (user?.role === "companyAdmin" || hasPermission("role:read"))) {

      let isMounted = true;
      setIsLoading(true);
      Promise.all([fetchRoles(), fetchPermissions(), fetchUsers()])
        .catch((err) => console.error("Error fetching data:", err))
        .finally(() => {
          if (isMounted) setIsLoading(false);
        });
      return () => {
        isMounted = false;
      };
    } else if (!authLoading && !tenantId) {
      Swal.fire("Error", "No tenant found. Please login as companyAdmin.", "error");
    }
  }, [authLoading, tenantId, user, pagination.page]);

  // Fetch roles from backend
  const fetchRoles = async () => {
    try {
      const { data } = await axiosInstance.get("/roles", { withCredentials: true });
      if (!Array.isArray(data.roles)) {
        throw new Error("Invalid roles data format");
      }
      setRoles(data.roles);
      setPagination((prev) => ({ ...prev, total: data.total || data.roles.length }));
    } catch (err) {
      console.error("Error fetching roles:", err);
      Swal.fire("Error", err.response?.data?.message || "Failed to fetch roles", "error");
      setRoles([]);
    }
  };

  // Fetch permissions from backend
  const fetchPermissions = async () => {
    try {
      const { data } = await axiosInstance.get("/permissions", { withCredentials: true });
      if (!Array.isArray(data.permissions)) {
        throw new Error("Invalid permissions data format");
      }
      setPermissions(data.permissions);
    } catch (err) {
      console.error("Error fetching permissions:", err);
      Swal.fire("Error", err.response?.data?.message || "Failed to fetch permissions", "error");
      setPermissions([]);
    }
  };

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      const { data } = await axiosInstance.get("/users?role=member", { withCredentials: true });
      if (!Array.isArray(data.users)) {
        throw new Error("Invalid users data format");
      }
      setUsers(data.users);
    } catch (err) {
      console.error("Error fetching users:", err);
      Swal.fire("Error", err.response?.data?.message || "Failed to fetch users", "error");
      setUsers([]);
    }
  };

  // Validate form inputs
  const validateForm = () => {
    const errors = {};
    if (!selectedRole && !editingRole) {
      errors.selectedRole = "Please select a role";
    }
    if (rolePermissions.length === 0) {
      errors.rolePermissions = "At least one permission is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Save or update a role
  const handleSaveRole = async () => {
    if (!validateForm()) {
      Swal.fire("Error", "Please fill all required fields", "error");
      return;
    }
    if (!tenantId) {
      Swal.fire("Error", "No tenant ID found. Please log in again.", "error");
      return;
    }
    try {
      setIsLoading(true);
      const payload = {
        name: editingRole ? editingRole.name : selectedRole,
        permissions: memoizedRolePermissions,
        description: roleDescription,
        tenantId,
      };
      if (editingRole) {
        await axiosInstance.put(`/roles/${editingRole._id}`, payload, { withCredentials: true });
        Swal.fire("Success", "Role updated successfully", "success");
      } else {
        await axiosInstance.post("/roles", payload, { withCredentials: true });
        Swal.fire("Success", "Role added successfully", "success");
      }
      fetchRoles();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error("Error saving role:", error);
      if (error.response?.status === 401) {
        Swal.fire("Error", "Session expired. Please log in again.", "error");
      } else if (error.response?.status === 403) {
        Swal.fire("Error", error.response?.data?.message || "You are not authorized to create this role", "error");
      } else {
        Swal.fire("Error", error.response?.data?.message || "Failed to save role", "error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a role
  const handleDeleteRole = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        setIsLoading(true);
        await axiosInstance.delete(`/roles/${id}`, { withCredentials: true });
        fetchRoles();
        Swal.fire("Deleted!", "Role has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting role:", error);
      Swal.fire("Error", error.response?.data?.message || "Failed to delete role", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle permission checkbox changes
  const handlePermissionChange = (permissionId, checked) => {
    if (checked) {
      setRolePermissions([...rolePermissions, permissionId]);
    } else {
      setRolePermissions(rolePermissions.filter((id) => id !== permissionId));
    }
  };

  // Edit a role
  const handleEditRole = async (role) => {
    setIsLoading(true);
    let assignedUsers = [];
    try {
      const { data } = await axiosInstance.get(`/roles/${role._id}/users`, { withCredentials: true });
      assignedUsers = data.users || [];
    } catch (err) {
      console.error("Error fetching assigned users for edit:", err);
      console.error("Error fetching assigned users:", {
        message: err.response?.data?.message,
        status: err.response?.status,
        error: err.message,
      });
      Swal.fire("Error", "Failed to fetch assigned users", "error");
    } finally {
      setEditingRole({ ...role, users: assignedUsers });
      setSelectedRole(role.name);
      setRoleDescription(role.description || "");
      setRolePermissions(role.permissions?.map((p) => p._id) || []);
      setIsLoading(false);
      setShowModal(true);
    }
  };

  // Assign a role to a user
  const handleAssignRole = async (userId, roleId) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.post(`/roles/assign/${userId}`, { roleId }, { withCredentials: true });
      Swal.fire("Success", "Role assigned successfully", "success");
      setAssignedUserIds((prev) => [...prev, userId]);
      await fetchRoles(); // Refresh roles to update userCount
    } catch (err) {
      console.error("Error assigning role:", err);
      Swal.fire("Error", err.response?.data?.message || "Failed to assign role", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Unassign a role from a user
  const handleUnassignRole = async (userId, roleId) => {
    try {
      setIsLoading(true);
      await axiosInstance.post(`/roles/remove/${userId}`, { roleId }, { withCredentials: true });
      Swal.fire("Success", "Role unassigned successfully", "success");
      // Update editingRole state
      setEditingRole((prev) => ({
        ...prev,
        users: prev.users.filter((u) => u._id !== userId),
        userCount: (prev.userCount || prev.users.length) - 1
      }));


      // 🔥 FIX: assignedUserIds ko bhi update karo
      setAssignedUserIds((prev) => prev.filter((id) => id !== userId));
      setSearchTerm("");
      setShowDropdown(false);
      await fetchRoles(); // Refresh roles to update userCount
    } catch (err) {
      console.error("Error unassigning role:", err);
      Swal.fire("Error", err.response?.data?.message || "Failed to unassign role", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form fields
  const resetForm = () => {
    setEditingRole(null);
    setSelectedRole("");
    setRoleDescription("");
    setRolePermissions([]);
    setFormErrors({});
  };

  // Handle role selection change
  const handleRoleChange = (e) => {
    const role = e.target.value;
    setSelectedRole(role);
    setRolePermissions([]); // Reset permissions to none selected
    setRoleDescription(rolePermissionMap[role]?.description || "");
  };

  return (
    <Container fluid className="py-4">
      {/* Header */}
      {/* <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="h3 mb-1">Role Management</h1>
              <p className="text-muted mb-0">Create and manage user roles and permissions</p>
            </div>
            <Button
              variant="primary"
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
              disabled={isLoading || authLoading || availablePredefinedRoles.length === 0}
            >
              <MdAdd className="me-2" />
              Create Role
            </Button>
          </div>
        </Col>
      </Row> */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="h3 mb-1">Role Management</h1>
              <p className="text-muted mb-0">Create and manage user roles and permissions</p>
            </div>
            <Button
              variant="primary"
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
              disabled={
                isLoading ||
                authLoading ||
                availablePredefinedRoles.length === 0 ||
                !memberCanCreate // 🔥 create role permission check
              }
            >
              <MdAdd className="me-2" />
              Create Role
            </Button>
          </div>
        </Col>
      </Row>

      {/* Loading Indicator */}
      {isLoading || authLoading ? (
        <div className="text-center py-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading roles...</span>
          </div>
          <p>Loading roles...</p>
        </div>
      ) : (
        <>
          {/* Roles Table */}
          {/* <Card className="border-0 shadow-sm">
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table hover className="mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Role Name</th>
                      <th>Description</th>
                      <th>Permissions</th>
                      <th>Users</th>
                      <th>Assign To</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roles.length === 0 && (
                      <tr>
                        <td colSpan="6" className="text-center">
                          No roles found
                        </td>
                      </tr>
                    )}
                    {roles.map((role) => (
                      <tr key={role._id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div>
                              <div className="fw-medium">{role.name}</div>
                              {role.isSystem && (
                                <Badge bg="warning" className="mt-1">
                                  System Role
                                </Badge>
                              )}
                            </div>
                          </div>
                        </td>
                        <td>
                          {role.description
                            ? role.description.length > 50
                              ? role.description.slice(0, 50) + "..."
                              : role.description
                            : "No description"}
                        </td>
                        <td>
                          <div className="d-flex flex-wrap gap-1">
                            {role.permissions && Array.isArray(role.permissions) && role.permissions.length > 0 ? (
                              <>
                                {role.permissions.slice(0, 3).map((p) =>
                                  p && p._id && p.name ? (
                                    <OverlayTrigger
                                      key={p._id}
                                      placement="top"
                                      overlay={<Tooltip>{p.name.replace(":", " ")}</Tooltip>}
                                    >
                                      <Badge bg="secondary" className="small">
                                        {p.name.replace(":", " ").substring(0, 10) + (p.name.length > 10 ? "..." : "")}
                                      </Badge>
                                    </OverlayTrigger>
                                  ) : null
                                )}
                                {role.permissions.length > 3 && (
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={
                                      <Tooltip>
                                        {role.permissions.slice(3).map((p) => p?.name?.replace(":", " ") || "Unknown").join(", ")}
                                      </Tooltip>
                                    }
                                  >
                                    <Badge bg="light" text="dark" className="small">
                                      +{role.permissions.length - 3} more
                                    </Badge>
                                  </OverlayTrigger>
                                )}
                              </>
                            ) : (
                              <Badge bg="secondary" className="small">
                                No permissions
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td>
                          <Badge bg="primary" className="p-2">{role.userCount || 0}</Badge>
                        </td>
                        <td>
                          <div className="d-flex justify-content-center gap-1">
                            <Button
                              variant="outline-success"
                              size="sm"
                              onClick={async () => {
                                setAssigningRole(role);
                                setIsLoading(true);
                                let assignedIds = [];
                                try {
                                  const { data } = await axiosInstance.get(`/roles/${role._id}/users`, { withCredentials: true });
                                  assignedIds = data.users?.map((u) => u._id) || [];
                                } catch (err) {
                                  console.error("Error fetching assigned users:", err);
                                  Swal.fire("Error", "Failed to fetch assigned users", "error");
                                } finally {
                                  setAssignedUserIds(assignedIds);
                                  setIsLoading(false);
                                  setShowAssignModal(true);
                                }
                              }}
                              disabled={isLoading}
                            >
                              Assign To
                            </Button>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex justify-content-center gap-1">
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() => handleEditRole(role)}
                              disabled={role.isSystem || isLoading}
                            >
                              <MdEdit />
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => handleDeleteRole(role._id)}
                            // disabled={role.isSystem || (role.userCount || 0) > 0 || isLoading}
                            >
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
            <div className="p-3">
              <Pagination
                current={pagination.page}
                total={pagination.total}
                limit={pagination.limit}
                onChange={(page) => {
                  setPagination((prev) => ({ ...prev, page }));
                }}
              />
            </div>
          </Card> */}
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table hover className="mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Role Name</th>
                      <th>Description</th>
                      <th>Permissions</th>
                      <th>Users</th>
                      <th>Assign To</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* 🔥 agar read ki permission nahi to bas ek row show karo */}
                    {!memberCanRead ? (
                      <tr>
                        <td colSpan="6" className="text-center text-danger">
                          No permission to view roles
                        </td>
                      </tr>
                    ) : roles.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center">
                          No roles found
                        </td>
                      </tr>
                    ) : (
                      roles.map((role) => (
                        <tr key={role._id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <div>
                                <div className="fw-medium">{role.name}</div>
                                {role.isSystem && (
                                  <Badge bg="warning" className="mt-1">
                                    System Role
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </td>
                          <td>
                            {role.description
                              ? role.description.length > 50
                                ? role.description.slice(0, 50) + "..."
                                : role.description
                              : "No description"}
                          </td>
                          <td>
                            <div className="d-flex flex-wrap gap-1">
                              {role.permissions && role.permissions.length > 0 ? (
                                <>
                                  {role.permissions.slice(0, 3).map((permission, index) => {
                                    // Agar permission object he to name dikhado
                                    const permName = typeof permission === "string"
                                      ? permission // string aa jaye to directly use karo (ya backend se map karo)
                                      : permission.name;

                                    return (
                                      <Badge key={permission._id || index} bg="secondary" className="small">
                                        {permName.replace(":", " ")}
                                      </Badge>
                                    );
                                  })}
                                  {role.permissions.length > 3 && (
                                    <Badge bg="light" text="dark" className="small">
                                      +{role.permissions.length - 3} more
                                    </Badge>
                                  )}
                                </>
                              ) : (
                                <Badge bg="secondary" className="small">No permissions</Badge>
                              )}
                            </div>
                          </td>
                          <td>
                            <Badge bg="primary" className="p-2">{role.userCount || 0}</Badge>
                          </td>
                          <td>
                            <div className="d-flex justify-content-center gap-1">
                              <Button
                                variant="outline-success"
                                size="sm"
                                onClick={async () => {
                                  setAssigningRole(role);
                                  setIsLoading(true);
                                  let assignedIds = [];
                                  try {
                                    const { data } = await axiosInstance.get(`/roles/${role._id}/users`, { withCredentials: true });
                                    assignedIds = data.users?.map((u) => u._id) || [];
                                  } catch (err) {
                                    console.error("Error fetching assigned users:", err);
                                    Swal.fire("Error", "Failed to fetch assigned users", "error");
                                  } finally {
                                    setAssignedUserIds(assignedIds);
                                    setIsLoading(false);
                                    setShowAssignModal(true);
                                  }
                                }}
                                disabled={isLoading || !memberCanAssign} // 🔥 assign permission check
                              >
                                Assign To
                              </Button>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex justify-content-center gap-1">
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => handleEditRole(role)}
                                disabled={role.isSystem || isLoading || !memberCanUpdate} // 🔥 edit permission check
                              >
                                <MdEdit />
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleDeleteRole(role._id)}
                                disabled={role.isSystem || isLoading || !memberCanDelete} // 🔥 delete permission check
                              >
                                <MdDelete />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>


          {/* Create/Edit Role Modal */}
          <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>{editingRole ? "Edit Role" : "Create New Role"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Role Name</Form.Label>
                      {editingRole ? (
                        <Form.Control
                          type="text"
                          value={selectedRole}
                          disabled
                        />
                      ) : (
                        <Form.Select
                          value={selectedRole}
                          onChange={handleRoleChange}
                          disabled={isLoading}
                          isInvalid={!!formErrors.selectedRole}
                        >
                          <option value="">-- Select Role --</option>
                          {availablePredefinedRoles.map((role) => (
                            <option key={role} value={role}>
                              {role}
                            </option>
                          ))}
                        </Form.Select>
                      )}
                      <Form.Control.Feedback type="invalid">
                        {formErrors.selectedRole}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        type="text"
                        value={roleDescription}
                        onChange={(e) => setRoleDescription(e.target.value)}
                        placeholder="Enter role description"
                        disabled
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Permissions</Form.Label>
                  {formErrors.rolePermissions && (
                    <div className="text-danger mb-2">{formErrors.rolePermissions}</div>
                  )}
                  <div className="permission-grid">
                    {Object.entries(groupedPermissions).length > 0 ? (
                      Object.entries(groupedPermissions).map(([group, perms]) => (
                        <div key={group} className="mb-4 w-100">
                          <h5>{group.charAt(0).toUpperCase() + group.slice(1)} Permissions</h5>
                          <div className="d-flex justify-content-between flex-wrap gap-2 ">
                            {perms.map((permission) =>
                              permission && permission._id && permission.name ? (
                                <Card key={permission._id} className="permission-card mb-2" style={{ width: "15rem" }}>
                                  <Card.Body className="p-3">
                                    <Form.Check
                                      type="checkbox"
                                      id={`permission-${permission._id}`}
                                      label={permission.name.replace(":", " ")}
                                      checked={memoizedRolePermissions.includes(permission._id)}
                                      onChange={(e) => handlePermissionChange(permission._id, e.target.checked)}
                                      disabled={isLoading}
                                    />
                                    <small className="text-muted d-block mt-1">
                                      {permission.description || permission.name.replace(":", " ").toUpperCase()}
                                    </small>
                                  </Card.Body>
                                </Card>
                              ) : null
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted">No permissions available for this role.</p>
                    )}
                  </div>
                </Form.Group>
                {editingRole && (
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Assigned Users</Form.Label>
                    {editingRole.users && editingRole.users.length > 0 ? (
                      <ul className="list-group">
                        {editingRole.users.map((user) => (
                          <li
                            key={user._id}
                            className="list-group-item d-flex justify-content-between align-items-center"
                          >
                            {user.name} ({user.email})
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => handleUnassignRole(user._id, editingRole._id)}
                              disabled={isLoading || !memberCanRemove}
                            >
                              <MdDelete />
                            </Button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted">No users assigned to this role.</p>
                    )}
                  </Form.Group>
                )}
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)} disabled={isLoading}>
                <MdCancel className="me-2" />
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSaveRole} disabled={
                isLoading ||
                (editingRole ? !memberCanUpdate : !memberCanCreate)
              }>
                <MdSave className="me-2" />
                {editingRole ? "Update Role" : "Create Role"}
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Assign Role Modal */}
          <Modal show={showAssignModal} onHide={() => setShowAssignModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Assign Role: {assigningRole?.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Label>Select User</Form.Label>
                {/* <Form.Select
                  value={selectedUserId || ""}
                  onChange={(e) => setSelectedUserId(e.target.value)}
                  disabled={isLoading}
                >
                  <option value="">-- Select User --</option>
                  {users.filter((user) => user.role !== "companyAdmin" &&
                    !assignedUserIds.includes(user._id)).map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.name} ({user.email})
                      </option>
                    ))}
                </Form.Select> */}

                <div className="position-relative" ref={inputRef}>
                  <Form.Control
                    type="text"
                    placeholder="Type to search user..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => {
                      setSearchTerm("");
                      setShowDropdown(true);
                    }} // Clear input and show dropdown on focus
                    disabled={isLoading}
                  />
                  {showDropdown && filteredUsers.length > 0 && (
                    <ul
                      className="list-group position-absolute w-100"
                      style={{
                        zIndex: 1000,
                        maxHeight: "200px",
                        overflowY: "auto",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                      }}
                    >
                      {filteredUsers.map((user) => (
                        <li
                          key={user._id}
                          className="list-group-item list-group-item-action"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleSelectUser(user)}
                        >
                          {user.name} ({user.email})
                        </li>
                      ))}
                    </ul>
                  )}
                  {showDropdown && searchTerm && filteredUsers.length === 0 && (
                    <div
                      className="position-absolute w-100 p-2 bg-white"
                      style={{
                        zIndex: 1000,
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                      }}
                    >
                      No users found
                    </div>
                  )}
                </div>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowAssignModal(false)} disabled={isLoading}>
                Cancel
              </Button>
              <Button
                variant="success"
                onClick={async () => {
                  if (!selectedUserId) return;
                  setIsLoading(true);
                  await handleAssignRole(selectedUserId, assigningRole._id);
                  setShowAssignModal(false);
                  setSelectedUserId("");
                  fetchUsers();
                  setIsLoading(false);
                }}
                disabled={!selectedUserId || isLoading || !memberCanAssign}
              >
                Assign
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </Container>
  );
};

export default RoleManagement;