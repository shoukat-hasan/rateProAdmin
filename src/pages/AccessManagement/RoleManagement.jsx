// // src\pages\AccessManagement\RoleManagement.jsx

// "use client"

// import { useState, useEffect } from "react"
// import { Container, Row, Col, Card, Table, Badge, Button, Form, Modal } from "react-bootstrap"
// import { MdAdd, MdEdit, MdDelete, MdSave, MdCancel } from "react-icons/md"
// import Pagination from "../../components/Pagination/Pagination.jsx"

// const RoleManagement = () => {
//   const [roles, setRoles] = useState([])
//   const [permissions, setPermissions] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [showModal, setShowModal] = useState(false)
//   const [editingRole, setEditingRole] = useState(null)
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     permissions: [],
//   })
//   const [users, setUsers] = useState([])
//   const [assigningRole, setAssigningRole] = useState(null)
//   const [selectedUserId, setSelectedUserId] = useState(null)
//   const [showAssignModal, setShowAssignModal] = useState(false)
//   const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 })

//   useEffect(() => {
//     // Simulate loading data
//     setTimeout(() => {
//       const loadedRoles = [
//         {
//           id: 1,
//           name: "Super Admin",
//           description: "Full system access with all permissions",
//           permissions: ["read", "write", "delete", "manage_users", "manage_settings", "manage_roles"],
//           userCount: 1,
//           isSystem: true,
//         },
//         {
//           id: 2,
//           name: "Admin",
//           description: "Administrative access to most features",
//           permissions: ["read", "write", "delete", "manage_users"],
//           userCount: 2,
//           isSystem: false,
//         },
//         {
//           id: 3,
//           name: "Editor",
//           description: "Can create and edit content",
//           permissions: ["read", "write"],
//           userCount: 5,
//           isSystem: false,
//         },
//         {
//           id: 4,
//           name: "Viewer",
//           description: "Read-only access to content",
//           permissions: ["read"],
//           userCount: 12,
//           isSystem: false,
//         },
//       ]

//       setRoles(loadedRoles)
//       setPagination((prev) => ({ ...prev, total: loadedRoles.length }))

//       setPermissions([
//         { id: "read", name: "Read", description: "View content and data" },
//         { id: "write", name: "Write", description: "Create and edit content" },
//         { id: "delete", name: "Delete", description: "Delete content and data" },
//         { id: "manage_users", name: "Manage Users", description: "Add, edit, and remove users" },
//         { id: "manage_settings", name: "Manage Settings", description: "Configure system settings" },
//         { id: "manage_roles", name: "Manage Roles", description: "Create and modify user roles" },
//         { id: "view_analytics", name: "View Analytics", description: "Access analytics and reports" },
//         { id: "export_data", name: "Export Data", description: "Export system data" },
//       ])

//       setLoading(false)
//     }, 1000)
//   }, [])

//   useEffect(() => {
//     setUsers([
//       { id: 101, name: "Ali Khan" },
//       { id: 102, name: "Fatima Noor" },
//       { id: 103, name: "Usman Raza" },
//     ])
//   }, [])

//   const handleCreateRole = () => {
//     setEditingRole(null)
//     setFormData({ name: "", description: "", permissions: [] })
//     setShowModal(true)
//   }

//   const handleEditRole = (role) => {
//     setEditingRole(role)
//     setFormData({
//       name: role.name,
//       description: role.description,
//       permissions: role.permissions,
//     })
//     setShowModal(true)
//   }

//   const handleSaveRole = () => {
//     if (editingRole) {
//       // Update existing role
//       setRoles(
//         roles.map((role) =>
//           role.id === editingRole.id
//             ? { ...role, name: formData.name, description: formData.description, permissions: formData.permissions }
//             : role,
//         ),
//       )
//     } else {
//       // Create new role
//       const newRole = {
//         id: Date.now(),
//         name: formData.name,
//         description: formData.description,
//         permissions: formData.permissions,
//         userCount: 0,
//         isSystem: false,
//       }
//       setRoles([...roles, newRole])
//     }
//     setShowModal(false)
//   }

//   const handleDeleteRole = (roleId) => {
//     if (window.confirm("Are you sure you want to delete this role?")) {
//       setRoles(roles.filter((role) => role.id !== roleId))
//     }
//   }

//   const handlePermissionChange = (permissionId, checked) => {
//     if (checked) {
//       setFormData((prev) => ({
//         ...prev,
//         permissions: [...prev.permissions, permissionId],
//       }))
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         permissions: prev.permissions.filter((p) => p !== permissionId),
//       }))
//     }
//   }

//   if (loading) {
//     return (
//       <Container fluid className="py-4">
//         <div className="text-center">
//           <div className="spinner-border text-primary mb-3" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//           <p>Loading roles...</p>
//         </div>
//       </Container>
//     )
//   }

//   const paginatedRoles = roles.slice(
//     (pagination.page - 1) * pagination.limit,
//     pagination.page * pagination.limit
//   )

//   return (
//     <Container fluid className="py-4">
//       {/* Header */}
//       <Row className="mb-4">
//         <Col>
//           <div className="d-flex justify-content-between align-items-center">
//             <div>
//               <h1 className="h3 mb-1">Role Management</h1>
//               <p className="text-muted mb-0">Create and manage user roles and permissions</p>
//             </div>
//             <Button variant="primary" onClick={handleCreateRole}>
//               <MdAdd className="me-2" />
//               Create Role
//             </Button>
//           </div>
//         </Col>
//       </Row>

//       {/* Roles Table */}
//       <Card className="border-0 shadow-sm">
//         <Card.Body className="p-0">
//           <div className="table-responsive">
//             <Table hover className="mb-0">
//               <thead className="table-light">
//                 <tr>
//                   <th>Role Name</th>
//                   <th>Description</th>
//                   <th>Permissions</th>
//                   <th>Users</th>
//                   <th>Assign To</th>
//                   <th className="text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {paginatedRoles.map((role) => (
//                   <tr key={role.id}>
//                     <td>
//                       <div className="d-flex align-items-center">
//                         <div>
//                           <div className="fw-medium">{role.name}</div>
//                           {role.isSystem && (
//                             <Badge bg="warning" className="mt-1">
//                               System Role
//                             </Badge>
//                           )}
//                         </div>
//                       </div>
//                     </td>
//                     <td>{role.description}</td>
//                     <td>
//                       <div className="d-flex flex-wrap gap-1">
//                         {role.permissions.slice(0, 3).map((permission) => (
//                           <Badge key={permission} bg="secondary" className="small">
//                             {permission.replace("_", " ")}
//                           </Badge>
//                         ))}
//                         {role.permissions.length > 3 && (
//                           <Badge bg="light" text="dark" className="small">
//                             +{role.permissions.length - 3} more
//                           </Badge>
//                         )}
//                       </div>
//                     </td>
//                     <td>
//                       <Badge bg="primary">{role.userCount}</Badge>
//                     </td>
//                     <td>
//                       <div className="d-flex justify-content-center gap-1">
//                         <Button
//                           variant="outline-success"
//                           size="sm"
//                           onClick={() => {
//                             setAssigningRole(role)
//                             setShowAssignModal(true)
//                           }}
//                         >
//                           Assign To
//                         </Button>
//                       </div>
//                     </td>
//                     <td>
//                       <div className="d-flex justify-content-center gap-1">
//                         <Button
//                           variant="outline-primary"
//                           size="sm"
//                           onClick={() => handleEditRole(role)}
//                           disabled={role.isSystem}
//                         >
//                           <MdEdit />
//                         </Button>
//                         <Button
//                           variant="outline-danger"
//                           size="sm"
//                           onClick={() => handleDeleteRole(role.id)}
//                           disabled={role.isSystem || role.userCount > 0}
//                         >
//                           <MdDelete />
//                         </Button>
//                       </div>
//                     </td>

//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           </div>

//         </Card.Body>
//         <div className="p-3">
//           <Pagination
//             current={pagination.page}
//             total={pagination.total}
//             limit={pagination.limit}
//             onChange={(page) => setPagination((prev) => ({ ...prev, page }))}
//           />
//         </div>
//       </Card>

//       <Modal show={showAssignModal} onHide={() => setShowAssignModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Assign Role: {assigningRole?.name}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form.Group>
//             <Form.Label>Select User</Form.Label>
//             <Form.Select
//               value={selectedUserId || ""}
//               onChange={(e) => setSelectedUserId(Number(e.target.value))}
//             >
//               <option value="">-- Select User --</option>
//               {users.map((user) => (
//                 <option key={user.id} value={user.id}>
//                   {user.name}
//                 </option>
//               ))}
//             </Form.Select>
//           </Form.Group>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowAssignModal(false)}>
//             Cancel
//           </Button>
//           <Button
//             variant="primary"
//             onClick={() => {
//               if (selectedUserId) {
//                 alert(
//                   `Role "${assigningRole.name}" assigned to user ID ${selectedUserId}`
//                 )
//                 setShowAssignModal(false)
//                 setSelectedUserId(null)
//               }
//             }}
//             disabled={!selectedUserId}
//           >
//             Assign
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Create/Edit Role Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
//         <Modal.Header closeButton>
//           <Modal.Title>{editingRole ? "Edit Role" : "Create New Role"}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Row>
//               <Col md={6}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Role Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={formData.name}
//                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                     placeholder="Enter role name"
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Description</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={formData.description}
//                     onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                     placeholder="Enter role description"
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Form.Group className="mb-3">
//               <Form.Label>Permissions</Form.Label>
//               <div className="permission-grid">
//                 {permissions.map((permission) => (
//                   <Card key={permission.id} className="permission-card">
//                     <Card.Body className="p-3">
//                       <Form.Check
//                         type="checkbox"
//                         id={`permission-${permission.id}`}
//                         label={permission.name}
//                         checked={formData.permissions.includes(permission.id)}
//                         onChange={(e) => handlePermissionChange(permission.id, e.target.checked)}
//                         className="mb-2"
//                       />
//                       <small className="text-muted">{permission.description}</small>
//                     </Card.Body>
//                   </Card>
//                 ))}
//               </div>
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             <MdCancel className="me-2" />
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={handleSaveRole}>
//             <MdSave className="me-2" />
//             {editingRole ? "Update Role" : "Create Role"}
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   )
// }

// export default RoleManagement
// import React, { useState, useEffect } from "react";
// import { Container, Row, Col, Card, Table, Badge, Button, Form, Modal } from "react-bootstrap";
// import { MdAdd, MdEdit, MdDelete, MdSave, MdCancel } from "react-icons/md";
// import Pagination from "../../components/Pagination/Pagination.jsx";
// import axiosInstance from "../../api/axiosInstance";
// import Swal from "sweetalert2";
// import { useAuth } from "../../context/AuthContext"; // Import useAuth hook

// const RoleManagement = () => {
//   const { user, loading: authLoading } = useAuth(); // Get user and loading from AuthContext
//   const [roles, setRoles] = useState([]);
//   const [permissions, setPermissions] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [showAssignModal, setShowAssignModal] = useState(false);
//   const [editingRole, setEditingRole] = useState(null);
//   const [assigningRole, setAssigningRole] = useState(null);
//   const [roleName, setRoleName] = useState("");
//   const [rolePermissions, setRolePermissions] = useState([]);
//   const [roleDescription, setRoleDescription] = useState("");
//   const [selectedUserId, setSelectedUserId] = useState("");
//   const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });
//   const [isLoading, setIsLoading] = useState(false); // Local loading state for API calls

//   // Set tenantId from user.tenant._id
//   const tenantId = user?.tenant?._id || null;

//   // Fetch roles, permissions, users when tenantId is available and auth is not loading
//   useEffect(() => {
//     if (!authLoading && tenantId && user?.role === "companyAdmin") {
//       setIsLoading(true);
//       Promise.all([fetchRoles(), fetchPermissions(), fetchUsers()]).finally(() => setIsLoading(false));
//     } else if (!authLoading && !tenantId) {
//       Swal.fire("Error", "No tenant found. Please login as companyAdmin.", "error");
//     }
//   }, [authLoading, tenantId, user, pagination.page]);

//   const fetchPermissions = async () => {
//     try {
//       const { data } = await axiosInstance.get("/permissions");
//       setPermissions(Array.isArray(data.permissions) ? data.permissions : []);
//     } catch (err) {
//       console.error("Error fetching permissions:", err);
//       Swal.fire("Error", err.response?.data?.message || "Failed to fetch permissions", "error");
//       setPermissions([]);
//     }
//   };

//   const fetchRoles = async () => {
//     try {
//       const { data } = await axiosInstance.get("/roles", { withCredentials: true });
//       setRoles(Array.isArray(data.roles) ? data.roles : []);
//       setPagination((prev) => ({ ...prev, total: data.total || data.roles.length }));
//     } catch (err) {
//       console.error("Error fetching roles:", err);
//       Swal.fire("Error", err.response?.data?.message || "Failed to fetch roles", "error");
//       setRoles([]);
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       const { data } = await axiosInstance.get("/users?role=member", { withCredentials: true });
//       setUsers(Array.isArray(data.users) ? data.users : []);
//     } catch (err) {
//       console.error("Error fetching users:", err);
//       Swal.fire("Error", err.response?.data?.message || "Failed to fetch users", "error");
//       setUsers([]);
//     }
//   };

//   const handleSaveRole = async () => {
//     try {
//       setIsLoading(true);
//       const payload = {
//         name: roleName,
//         permissions: rolePermissions,
//         description: roleDescription,
//         tenantId, // Required by backend
//       };
//       if (editingRole) {
//         await axiosInstance.put(`/roles/${editingRole._id}`, payload);
//         Swal.fire("Success", "Role updated successfully", "success");
//       } else {
//         await axiosInstance.post("/roles", payload);
//         Swal.fire("Success", "Role added successfully", "success");
//       }
//       fetchRoles();
//       setShowModal(false);
//       resetForm();
//     } catch (error) {
//       console.error("Error saving role:", error);
//       Swal.fire("Error", error.response?.data?.message || "Failed to save role", "error");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDeleteRole = async (id) => {
//     try {
//       const result = await Swal.fire({
//         title: "Are you sure?",
//         text: "You won't be able to revert this!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonText: "Yes, delete it!",
//       });

//       if (result.isConfirmed) {
//         setIsLoading(true);
//         await axiosInstance.delete(`/roles/${id}`);
//         fetchRoles();
//         Swal.fire("Deleted!", "Role has been deleted.", "success");
//       }
//     } catch (error) {
//       console.error("Error deleting role:", error);
//       Swal.fire("Error", error.response?.data?.message || "Failed to delete role", "error");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handlePermissionChange = (permissionId, checked) => {
//     if (checked) {
//       setRolePermissions([...rolePermissions, permissionId]);
//     } else {
//       setRolePermissions(rolePermissions.filter((id) => id !== permissionId));
//     }
//   };

//   const handleEditRole = (role) => {
//     setEditingRole(role);
//     setRoleName(role.name);
//     setRoleDescription(role.description || "");
//     setRolePermissions(role.permissions.map((p) => p._id));
//     setShowModal(true);
//   };

//   const handleAssignRole = async () => {
//     try {
//       setIsLoading(true);
//       await axiosInstance.post(`/roles/assign/${selectedUserId}`, {
//         roleId: assigningRole._id,
//       });
//       Swal.fire("Success", "Role assigned successfully!", "success");
//       setShowAssignModal(false);
//       setAssigningRole(null);
//       setSelectedUserId("");
//       fetchUsers(); // Refresh users to reflect updated roles
//     } catch (error) {
//       console.error("Error assigning role:", error);
//       Swal.fire("Error", error.response?.data?.message || "Failed to assign role", "error");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setEditingRole(null);
//     setRoleName("");
//     setRoleDescription("");
//     setRolePermissions([]);
//   };

//   return (
//     <Container fluid className="py-4">
//       {/* Header */}
//       <Row className="mb-4">
//         <Col>
//           <div className="d-flex justify-content-between align-items-center">
//             <div>
//               <h1 className="h3 mb-1">Role Management</h1>
//               <p className="text-muted mb-0">Create and manage user roles and permissions</p>
//             </div>
//             <Button
//               variant="primary"
//               onClick={() => { resetForm(); setShowModal(true); }}
//               disabled={isLoading || authLoading}
//             >
//               <MdAdd className="me-2" />
//               Create Role
//             </Button>
//           </div>
//         </Col>
//       </Row>

//       {/* Loading Indicator */}
//       {isLoading || authLoading ? (
//         <div className="text-center py-4">
//           <div className="spinner-border text-primary" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//         </div>
//       ) : (
//         <>
//           {/* Roles Table */}
//           <Card className="border-0 shadow-sm">
//             <Card.Body className="p-0">
//               <div className="table-responsive">
//                 <Table hover className="mb-0">
//                   <thead className="table-light">
//                     <tr>
//                       <th>Role Name</th>
//                       <th>Description</th>
//                       <th>Permissions</th>
//                       <th>Users</th>
//                       <th>Assign To</th>
//                       <th className="text-center">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {roles.length === 0 && (
//                       <tr>
//                         <td colSpan="6" className="text-center">No roles found</td>
//                       </tr>
//                     )}
//                     {roles.map((role) => (
//                       <tr key={role._id}>
//                         <td>
//                           <div className="d-flex align-items-center">
//                             <div>
//                               <div className="fw-medium">{role.name}</div>
//                               {role.isSystem && (
//                                 <Badge bg="warning" className="mt-1">System Role</Badge>
//                               )}
//                             </div>
//                           </div>
//                         </td>
//                         <td>{role.description || "No description"}</td>
//                         <td>
//                           <div className="d-flex flex-wrap gap-1">
//                             {role.permissions.slice(0, 3).map((p) => (
//                               <Badge key={p._id} bg="secondary" className="small">
//                                 {p.name.replace(":", " ")}
//                               </Badge>
//                             ))}
//                             {role.permissions.length > 3 && (
//                               <Badge bg="light" text="dark" className="small">
//                                 +{role.permissions.length - 3} more
//                               </Badge>
//                             )}
//                           </div>
//                         </td>
//                         <td>
//                           <Badge bg="primary">{role.userCount || 0}</Badge>
//                         </td>
//                         <td>
//                           <div className="d-flex justify-content-center gap-1">
//                             <Button
//                               variant="outline-success"
//                               size="sm"
//                               onClick={() => { setAssigningRole(role); setShowAssignModal(true); }}
//                               disabled={isLoading}
//                             >
//                               Assign To
//                             </Button>
//                           </div>
//                         </td>
//                         <td>
//                           <div className="d-flex justify-content-center gap-1">
//                             <Button
//                               variant="outline-primary"
//                               size="sm"
//                               onClick={() => handleEditRole(role)}
//                               disabled={role.isSystem || isLoading}
//                             >
//                               <MdEdit />
//                             </Button>
//                             <Button
//                               variant="outline-danger"
//                               size="sm"
//                               onClick={() => handleDeleteRole(role._id)}
//                               disabled={role.isSystem || (role.userCount || 0) > 0 || isLoading}
//                             >
//                               <MdDelete />
//                             </Button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//               </div>
//             </Card.Body>
//             <div className="p-3">
//               <Pagination
//                 current={pagination.page}
//                 total={pagination.total}
//                 limit={pagination.limit}
//                 onChange={(page) => {
//                   setPagination((prev) => ({ ...prev, page }));
//                 }}
//               />
//             </div>
//           </Card>

//           {/* Create/Edit Role Modal */}
//           <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
//             <Modal.Header closeButton>
//               <Modal.Title>{editingRole ? "Edit Role" : "Create New Role"}</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               <Form>
//                 <Row>
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label>Role Name</Form.Label>
//                       <Form.Control
//                         type="text"
//                         value={roleName}
//                         onChange={(e) => setRoleName(e.target.value)}
//                         placeholder="Enter role name"
//                         disabled={isLoading}
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label>Description</Form.Label>
//                       <Form.Control
//                         type="text"
//                         value={roleDescription}
//                         onChange={(e) => setRoleDescription(e.target.value)}
//                         placeholder="Enter role description"
//                         disabled={isLoading}
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Permissions</Form.Label>
//                   <div className="permission-grid">
//                     {permissions.map((permission) => (
//                       <Card key={permission._id} className="permission-card mb-2">
//                         <Card.Body className="p-3">
//                           <Form.Check
//                             type="checkbox"
//                             id={`permission-${permission._id}`}
//                             label={permission.name.replace(":", " ")}
//                             checked={rolePermissions.includes(permission._id)}
//                             onChange={(e) => handlePermissionChange(permission._id, e.target.checked)}
//                             disabled={isLoading}
//                           />
//                           <small className="text-muted d-block mt-1">
//                             {permission.description || "No description available"}
//                           </small>
//                         </Card.Body>
//                       </Card>
//                     ))}
//                   </div>
//                 </Form.Group>
//               </Form>
//             </Modal.Body>
//             <Modal.Footer>
//               <Button variant="secondary" onClick={() => setShowModal(false)} disabled={isLoading}>
//                 <MdCancel className="me-2" />
//                 Cancel
//               </Button>
//               <Button variant="primary" onClick={handleSaveRole} disabled={isLoading}>
//                 <MdSave className="me-2" />
//                 {editingRole ? "Update Role" : "Create Role"}
//               </Button>
//             </Modal.Footer>
//           </Modal>

//           {/* Assign Role Modal */}
//           <Modal show={showAssignModal} onHide={() => setShowAssignModal(false)}>
//             <Modal.Header closeButton>
//               <Modal.Title>Assign Role: {assigningRole?.name}</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               <Form.Group>
//                 <Form.Label>Select User</Form.Label>
//                 <Form.Select
//                   value={selectedUserId || ""}
//                   onChange={(e) => setSelectedUserId(e.target.value)}
//                   disabled={isLoading}
//                 >
//                   <option value="">-- Select User --</option>
//                   {users.map((user) => (
//                     <option key={user._id} value={user._id}>
//                       {user.name} ({user.email})
//                     </option>
//                   ))}
//                 </Form.Select>
//               </Form.Group>
//             </Modal.Body>
//             <Modal.Footer>
//               <Button variant="secondary" onClick={() => setShowAssignModal(false)} disabled={isLoading}>
//                 Cancel
//               </Button>
//               <Button variant="success" onClick={handleAssignRole} disabled={!selectedUserId || isLoading}>
//                 Assign
//               </Button>
//             </Modal.Footer>
//           </Modal>
//         </>
//       )}
//     </Container>
//   );
// };

// export default RoleManagement;

// import React, { useState, useEffect, useMemo } from "react";
// import { Container, Row, Col, Card, Table, Badge, Button, Form, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
// import { MdAdd, MdEdit, MdDelete, MdSave, MdCancel } from "react-icons/md";
// import Pagination from "../../components/Pagination/Pagination.jsx";
// import axiosInstance from "../../api/axiosInstance";
// import Swal from "sweetalert2";
// import { useAuth } from "../../context/AuthContext";

// // Predefined roles and their associated permissions
// const rolePermissionMap = {
//   "User Manager": {
//     group: "user",
//     permissions: [
//       "user:create",
//       "user:read",
//       "user:update",
//       "user:delete",
//       "user:toggle",
//       "user:export",
//       "user:notify"
//     ]
//   },
//   "Role Manager": {
//     group: "role",
//     permissions: ["role:create", "role:read", "role:update", "role:delete", "role:assign"]
//   },
//   "Admin": {
//     group: null,
//     permissions: [
//       "user:create",
//       "user:read",
//       "user:update",
//       "user:delete",
//       "user:toggle",
//       "user:export",
//       "user:notify",
//       "role:create",
//       "role:read",
//       "role:update",
//       "role:delete",
//       "role:assign"
//     ]
//   }
// };

// // RoleManagement component for creating, editing, and assigning roles
// const RoleManagement = () => {
//   const { user, loading: authLoading } = useAuth();
//   const [roles, setRoles] = useState([]);
//   const [permissions, setPermissions] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [showAssignModal, setShowAssignModal] = useState(false);
//   const [editingRole, setEditingRole] = useState(null);
//   const [assigningRole, setAssigningRole] = useState(null);
//   const [selectedRole, setSelectedRole] = useState("");
//   const [roleDescription, setRoleDescription] = useState("");
//   const [rolePermissions, setRolePermissions] = useState([]);
//   const [selectedUserId, setSelectedUserId] = useState("");
//   const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });
//   const [isLoading, setIsLoading] = useState(false);
//   const [formErrors, setFormErrors] = useState({});

//   const tenantId = user?.tenant?._id || null;

//   // Memoize rolePermissions to prevent unnecessary re-renders
//   const memoizedRolePermissions = useMemo(() => rolePermissions, [rolePermissions]);

//   // Group permissions for display
//   const groupedPermissions = useMemo(() => {
//     return permissions.reduce((acc, p) => {
//       const group = p.group || "Other";
//       acc[group] = acc[group] || [];
//       acc[group].push(p);
//       return acc;
//     }, {});
//   }, [permissions]);

//   // Filter permissions based on selected role
//   const filteredPermissions = useMemo(() => {
//     if (!selectedRole || editingRole) return permissions;
//     const roleConfig = rolePermissionMap[selectedRole] || { group: null, permissions: [] };
//     return permissions.filter((p) => {
//       if (!p || !p.name) return false;
//       return roleConfig.group ? p.group === roleConfig.group : roleConfig.permissions.includes(p.name);
//     });
//   }, [selectedRole, permissions, editingRole]);

//   // Fetch data on mount and when pagination.page changes
//   useEffect(() => {
//     if (!authLoading && tenantId && user?.role === "companyAdmin") {
//       let isMounted = true;
//       setIsLoading(true);
//       Promise.all([fetchRoles(), fetchPermissions(), fetchUsers()])
//         .catch((err) => console.error("Error fetching data:", err))
//         .finally(() => {
//           if (isMounted) setIsLoading(false);
//         });
//       return () => {
//         isMounted = false;
//       };
//     } else if (!authLoading && !tenantId) {
//       Swal.fire("Error", "No tenant found. Please login as companyAdmin.", "error");
//     }
//   }, [authLoading, tenantId, user, pagination.page]);

//   // Fetch roles from backend
//   const fetchRoles = async () => {
//     try {
//       const { data } = await axiosInstance.get("/roles", { withCredentials: true });
//       if (!Array.isArray(data.roles)) {
//         throw new Error("Invalid roles data format");
//       }
//       setRoles(data.roles);
//       setPagination((prev) => ({ ...prev, total: data.total || data.roles.length }));
//     } catch (err) {
//       console.error("Error fetching roles:", err);
//       Swal.fire("Error", err.response?.data?.message || "Failed to fetch roles", "error");
//       setRoles([]);
//     }
//   };

//   // Fetch permissions from backend
//   const fetchPermissions = async () => {
//     try {
//       const { data } = await axiosInstance.get("/permissions", { withCredentials: true });
//       if (!Array.isArray(data.permissions)) {
//         throw new Error("Invalid permissions data format");
//       }
//       setPermissions(data.permissions);
//     } catch (err) {
//       console.error("Error fetching permissions:", err);
//       Swal.fire("Error", err.response?.data?.message || "Failed to fetch permissions", "error");
//       setPermissions([]);
//     }
//   };

//   // Fetch users from backend
//   const fetchUsers = async () => {
//     try {
//       const { data } = await axiosInstance.get("/users?role=member", { withCredentials: true });
//       console.log("Pura response from /users:", data); // Yeh line add karo
//       if (!Array.isArray(data.users)) {
//         throw new Error("Invalid users data format");
//       }
//       setUsers(data.users);
//     } catch (err) {
//       console.error("Error fetching users:", err);
//       Swal.fire("Error", err.response?.data?.message || "Failed to fetch users", "error");
//       setUsers([]);
//     }
//   };

//   // Validate form inputs
//   const validateForm = () => {
//     const errors = {};
//     if (!selectedRole && !editingRole) {
//       errors.selectedRole = "Please select a role";
//     }
//     if (rolePermissions.length === 0) {
//       errors.rolePermissions = "At least one permission is required";
//     }
//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   // Save or update a role
//   const handleSaveRole = async () => {
//     if (!validateForm()) {
//       Swal.fire("Error", "Please fill all required fields", "error");
//       return;
//     }
//     if (!tenantId) {
//       Swal.fire("Error", "No tenant ID found. Please log in again.", "error");
//       return;
//     }
//     try {
//       setIsLoading(true);
//       const payload = {
//         name: editingRole ? editingRole.name : selectedRole,
//         permissions: memoizedRolePermissions,
//         description: roleDescription,
//         tenantId,
//       };
//       if (editingRole) {
//         await axiosInstance.put(`/roles/${editingRole._id}`, payload, { withCredentials: true });
//         Swal.fire("Success", "Role updated successfully", "success");
//       } else {
//         await axiosInstance.post("/roles", payload, { withCredentials: true });
//         Swal.fire("Success", "Role added successfully", "success");
//       }
//       fetchRoles();
//       setShowModal(false);
//       resetForm();
//     } catch (error) {
//       console.error("Error saving role:", error);
//       if (error.response?.status === 401) {
//         Swal.fire("Error", "Session expired. Please log in again.", "error");
//         // window.location.href = "/login";
//       } else if (error.response?.status === 403) {
//         Swal.fire("Error", error.response?.data?.message || "You are not authorized to create this role", "error");
//       } else {
//         Swal.fire("Error", error.response?.data?.message || "Failed to save role", "error");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   // Delete a role
//   const handleDeleteRole = async (id) => {
//     try {
//       const result = await Swal.fire({
//         title: "Are you sure?",
//         text: "You won't be able to revert this!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonText: "Yes, delete it!",
//       });

//       if (result.isConfirmed) {
//         setIsLoading(true);
//         await axiosInstance.delete(`/roles/${id}`, { withCredentials: true });
//         fetchRoles();
//         Swal.fire("Deleted!", "Role has been deleted.", "success");
//       }
//     } catch (error) {
//       console.error("Error deleting role:", error);
//       Swal.fire("Error", error.response?.data?.message || "Failed to delete role", "error");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Handle permission checkbox changes
//   const handlePermissionChange = (permissionId, checked) => {
//     if (checked) {
//       setRolePermissions([...rolePermissions, permissionId]);
//     } else {
//       setRolePermissions(rolePermissions.filter((id) => id !== permissionId));
//     }
//   };

//   // Edit a role
//   const handleEditRole = (role) => {
//     setEditingRole(role);
//     setSelectedRole(role.name);
//     setRoleDescription(role.description || "");
//     setRolePermissions(role.permissions?.map((p) => p._id) || []);
//     setShowModal(true);
//   };

//   // Assign a role to a user
//   // const handleAssignRole = async () => {
//   //   try {
//   //     setIsLoading(true);
//   //     const user = users.find((u) => u._id === selectedUserId);
//   //     if (user && user.role === assigningRole.name) {
//   //       Swal.fire("Warning", "User already has this role", "warning");
//   //       return;
//   //     }
//   //     await axiosInstance.post(
//   //       `/roles/assign/${selectedUserId}`,
//   //       { roleId: assigningRole._id },
//   //       { withCredentials: true }
//   //     );
//   //     Swal.fire("Success", "Role assigned successfully!", "success");
//   //     setShowAssignModal(false);
//   //     setAssigningRole(null);
//   //     setSelectedUserId("");
//   //     fetchUsers();
//   //   } catch (error) {
//   //     console.error("Error assigning role:", error);
//   //     Swal.fire("Error", error.response?.data?.message || "Failed to assign role", "error");
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };

//   const handleAssignRole = async (userId, roleId) => {
//     try {
//       console.log("Assigning role:", { userId, roleId, userIdType: typeof userId, roleIdType: typeof roleId });
//       const response = await axiosInstance.post(`/roles/assign/${userId}`, { roleId }, { withCredentials: true });
//       console.log("Role assigned:", response.data);
//       Swal.fire("Success", "Role assigned successfully", "success");
//     } catch (err) {
//       console.error("Error assigning role:", err);
//       Swal.fire("Error", err.response?.data?.message || "Failed to assign role", "error");
//     }
//   };

//   // Reset form fields
//   const resetForm = () => {
//     setEditingRole(null);
//     setSelectedRole("");
//     setRoleDescription("");
//     setRolePermissions([]);
//     setFormErrors({});
//   };

//   // Handle role selection change
//   const handleRoleChange = (e) => {
//     const role = e.target.value;
//     setSelectedRole(role);
//     const defaultPermissions = permissions
//       .filter((p) => {
//         const roleConfig = rolePermissionMap[role] || { group: null, permissions: [] };
//         return roleConfig.group ? p.group === roleConfig.group : roleConfig.permissions.includes(p.name);
//       })
//       .map((p) => p._id);
//     setRolePermissions(defaultPermissions);
//   };

//   return (
//     <Container fluid className="py-4">
//       {/* Header */}
//       <Row className="mb-4">
//         <Col>
//           <div className="d-flex justify-content-between align-items-center">
//             <div>
//               <h1 className="h3 mb-1">Role Management</h1>
//               <p className="text-muted mb-0">Create and manage user roles and permissions</p>
//             </div>
//             <Button
//               variant="primary"
//               onClick={() => {
//                 resetForm();
//                 setShowModal(true);
//               }}
//               disabled={isLoading || authLoading}
//             >
//               <MdAdd className="me-2" />
//               Create Role
//             </Button>
//           </div>
//         </Col>
//       </Row>

//       {/* Loading Indicator */}
//       {isLoading || authLoading ? (
//         <div className="text-center py-4">
//           <div className="spinner-border text-primary" role="status">
//             <span className="visually-hidden">Loading roles...</span>
//           </div>
//           <p>Loading roles...</p>
//         </div>
//       ) : (
//         <>
//           {/* Roles Table */}
//           <Card className="border-0 shadow-sm">
//             <Card.Body className="p-0">
//               <div className="table-responsive">
//                 <Table hover className="mb-0">
//                   <thead className="table-light">
//                     <tr>
//                       <th>Role Name</th>
//                       <th>Description</th>
//                       <th>Permissions</th>
//                       <th>Users</th>
//                       <th>Assign To</th>
//                       <th className="text-center">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {roles.length === 0 && (
//                       <tr>
//                         <td colSpan="6" className="text-center">
//                           No roles found
//                         </td>
//                       </tr>
//                     )}
//                     {roles.map((role) => (
//                       <tr key={role._id}>
//                         <td>
//                           <div className="d-flex align-items-center">
//                             <div>
//                               <div className="fw-medium">{role.name}</div>
//                               {role.isSystem && (
//                                 <Badge bg="warning" className="mt-1">
//                                   System Role
//                                 </Badge>
//                               )}
//                             </div>
//                           </div>
//                         </td>
//                         <td>{role.description || "No description"}</td>
//                         <td>
//                           <div className="d-flex flex-wrap gap-1">
//                             {role.permissions && Array.isArray(role.permissions) && role.permissions.length > 0 ? (
//                               <>
//                                 {role.permissions.slice(0, 3).map((p) =>
//                                   p && p._id && p.name ? (
//                                     <OverlayTrigger
//                                       key={p._id}
//                                       placement="top"
//                                       overlay={<Tooltip>{p.name.replace(":", " ")}</Tooltip>}
//                                     >
//                                       <Badge bg="secondary" className="small">
//                                         {p.name.replace(":", " ").substring(0, 10) + (p.name.length > 10 ? "..." : "")}
//                                       </Badge>
//                                     </OverlayTrigger>
//                                   ) : null
//                                 )}
//                                 {role.permissions.length > 3 && (
//                                   <OverlayTrigger
//                                     placement="top"
//                                     overlay={
//                                       <Tooltip>
//                                         {role.permissions.slice(3).map((p) => p?.name?.replace(":", " ") || "Unknown").join(", ")}
//                                       </Tooltip>
//                                     }
//                                   >
//                                     <Badge bg="light" text="dark" className="small">
//                                       +{role.permissions.length - 3} more
//                                     </Badge>
//                                   </OverlayTrigger>
//                                 )}
//                               </>
//                             ) : (
//                               <Badge bg="secondary" className="small">
//                                 No permissions
//                               </Badge>
//                             )}
//                           </div>
//                         </td>
//                         <td>
//                           <Badge bg="primary">{role.userCount || 0}</Badge>
//                         </td>
//                         <td>
//                           <div className="d-flex justify-content-center gap-1">
//                             <Button
//                               variant="outline-success"
//                               size="sm"
//                               onClick={() => {
//                                 setAssigningRole(role);
//                                 setShowAssignModal(true);
//                               }}
//                               disabled={isLoading}
//                             >
//                               Assign To
//                             </Button>
//                           </div>
//                         </td>
//                         <td>
//                           <div className="d-flex justify-content-center gap-1">
//                             <Button
//                               variant="outline-primary"
//                               size="sm"
//                               onClick={() => handleEditRole(role)}
//                               disabled={role.isSystem || isLoading}
//                             >
//                               <MdEdit />
//                             </Button>
//                             <Button
//                               variant="outline-danger"
//                               size="sm"
//                               onClick={() => handleDeleteRole(role._id)}
//                               disabled={role.isSystem || (role.userCount || 0) > 0 || isLoading}
//                             >
//                               <MdDelete />
//                             </Button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//               </div>
//             </Card.Body>
//             <div className="p-3">
//               <Pagination
//                 current={pagination.page}
//                 total={pagination.total}
//                 limit={pagination.limit}
//                 onChange={(page) => {
//                   setPagination((prev) => ({ ...prev, page }));
//                 }}
//               />
//             </div>
//           </Card>

//           {/* Create/Edit Role Modal */}
//           <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
//             <Modal.Header closeButton>
//               <Modal.Title>{editingRole ? "Edit Role" : "Create New Role"}</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               <Form>
//                 <Row>
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label>Role Name</Form.Label>
//                       {editingRole ? (
//                         <Form.Control
//                           type="text"
//                           value={selectedRole}
//                           disabled
//                         />
//                       ) : (
//                         <Form.Select
//                           value={selectedRole}
//                           onChange={handleRoleChange}
//                           disabled={isLoading}
//                           isInvalid={!!formErrors.selectedRole}
//                         >
//                           <option value="">-- Select Role --</option>
//                           {Object.keys(rolePermissionMap).map((role) => (
//                             <option key={role} value={role}>
//                               {role}
//                             </option>
//                           ))}
//                         </Form.Select>
//                       )}
//                       <Form.Control.Feedback type="invalid">
//                         {formErrors.selectedRole}
//                       </Form.Control.Feedback>
//                     </Form.Group>
//                   </Col>
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label>Description</Form.Label>
//                       <Form.Control
//                         type="text"
//                         value={roleDescription}
//                         onChange={(e) => setRoleDescription(e.target.value)}
//                         placeholder="Enter role description"
//                         disabled={isLoading}
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Permissions</Form.Label>
//                   {formErrors.rolePermissions && (
//                     <div className="text-danger mb-2">{formErrors.rolePermissions}</div>
//                   )}
//                   <div className="permission-grid">
//                     {Object.entries(groupedPermissions).length > 0 ? (
//                       Object.entries(groupedPermissions).map(([group, perms]) => (
//                         <div key={group} className="mb-4">
//                           <h5>{group.charAt(0).toUpperCase() + group.slice(1)} Permissions</h5>
//                           <div className="d-flex flex-wrap gap-2">
//                             {perms.map((permission) =>
//                               permission && permission._id && permission.name ? (
//                                 <Card key={permission._id} className="permission-card mb-2" style={{ width: "18rem" }}>
//                                   <Card.Body className="p-3">
//                                     <Form.Check
//                                       type="checkbox"
//                                       id={`permission-${permission._id}`}
//                                       label={permission.name.replace(":", " ")}
//                                       checked={memoizedRolePermissions.includes(permission._id)}
//                                       onChange={(e) => handlePermissionChange(permission._id, e.target.checked)}
//                                       disabled={isLoading}
//                                     />
//                                     <small className="text-muted d-block mt-1">
//                                       {permission.description || permission.name.replace(":", " ").toUpperCase()}
//                                     </small>
//                                   </Card.Body>
//                                 </Card>
//                               ) : null
//                             )}
//                           </div>
//                         </div>
//                       ))
//                     ) : (
//                       <p className="text-muted">No permissions available. Please contact admin.</p>
//                     )}
//                   </div>
//                 </Form.Group>
//               </Form>
//             </Modal.Body>
//             <Modal.Footer>
//               <Button variant="secondary" onClick={() => setShowModal(false)} disabled={isLoading}>
//                 <MdCancel className="me-2" />
//                 Cancel
//               </Button>
//               <Button variant="primary" onClick={handleSaveRole} disabled={isLoading}>
//                 <MdSave className="me-2" />
//                 {editingRole ? "Update Role" : "Create Role"}
//               </Button>
//             </Modal.Footer>
//           </Modal>

//           {/* Assign Role Modal */}
//           <Modal show={showAssignModal} onHide={() => setShowAssignModal(false)}>
//             <Modal.Header closeButton>
//               <Modal.Title>Assign Role: {assigningRole?.name}</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               <Form.Group>
//                 <Form.Label>Select User</Form.Label>
//                 <Form.Select
//                   value={selectedUserId || ""}
//                   onChange={(e) => setSelectedUserId(e.target.value)}
//                   disabled={isLoading}
//                 >
//                   <option value="">-- Select User --</option>
//                   {users.map((user) => (
//                     <option key={user._id} value={user._id}>
//                       {user.name} ({user.email})
//                     </option>
//                   ))}
//                 </Form.Select>
//               </Form.Group>
//             </Modal.Body>
//             <Modal.Footer>
//               <Button variant="secondary" onClick={() => setShowAssignModal(false)} disabled={isLoading}>
//                 Cancel
//               </Button>
//               <Button variant="success" onClick={handleAssignRole} disabled={!selectedUserId || isLoading}>
//                 Assign
//               </Button>
//             </Modal.Footer>
//           </Modal>
//         </>
//       )}
//     </Container>
//   );
// };

// export default RoleManagement;

import React, { useState, useEffect, useMemo } from "react";
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
    permissions: [
      "user:create",
      "user:read",
      "user:update",
      "user:delete",
      "user:toggle",
      "user:export",
      "user:notify"
    ]
  },
  "Role Manager": {
    group: "role",
    permissions: ["role:create", "role:read", "role:update", "role:delete", "role:assign"]
  },
  "Admin": {
    group: null,
    permissions: [
      "user:create",
      "user:read",
      "user:update",
      "user:delete",
      "user:toggle",
      "user:export",
      "user:notify",
      "role:create",
      "role:read",
      "role:update",
      "role:delete",
      "role:assign"
    ]
  },
  "Editor": {
    group: null,
    permissions: [
      "user:create",
      "user:update",
      "role:update"
    ]
  },
  "Viewer": {
    group: null,
    permissions: [
      "user:read",
      "role:read"
    ]
  }
};

// RoleManagement component for creating, editing, and assigning roles
const RoleManagement = () => {
  const { user, loading: authLoading } = useAuth();
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

  const tenantId = user?.tenant?._id || null;

  // Memoize rolePermissions to prevent unnecessary re-renders
  const memoizedRolePermissions = useMemo(() => rolePermissions, [rolePermissions]);

  // Available predefined roles that haven't been created yet
  const availablePredefinedRoles = useMemo(() => {
    return Object.keys(rolePermissionMap).filter(
      (role) => !roles.some((r) => r.name === role)
    );
  }, [roles]);

  // Filter permissions based on selected role
  const filteredPermissions = useMemo(() => {
    if (editingRole) return permissions; // Show all permissions when editing
    if (!selectedRole) return [];
    const roleConfig = rolePermissionMap[selectedRole] || { group: null, permissions: [] };
    return permissions.filter((p) => {
      if (!p || !p.name) return false;
      return roleConfig.group
        ? p.group === roleConfig.group
        : roleConfig.permissions.includes(p.name);
    });
  }, [selectedRole, permissions, editingRole]);

  // Group permissions for display
  const groupedPermissions = useMemo(() => {
    const permsToGroup = editingRole ? permissions : filteredPermissions;
    return permsToGroup.reduce((acc, p) => {
      const group = p.group || "Other";
      acc[group] = acc[group] || [];
      acc[group].push(p);
      return acc;
    }, {});
  }, [filteredPermissions, permissions, editingRole]);

  // Auto-select first available predefined role when creating
  useEffect(() => {
    if (showModal && !editingRole && availablePredefinedRoles.length > 0 && selectedRole === "") {
      setSelectedRole(availablePredefinedRoles[0]);
      setRolePermissions([]); // Ensure no permissions are pre-selected
    }
  }, [showModal, editingRole, availablePredefinedRoles, selectedRole]);

  // Fetch data on mount and when pagination.page changes
  useEffect(() => {
    if (!authLoading && tenantId && user?.role === "companyAdmin") {
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
  const handleEditRole = (role) => {
    setEditingRole(role);
    setSelectedRole(role.name);
    setRoleDescription(role.description || "");
    setRolePermissions(role.permissions?.map((p) => p._id) || []);
    setShowModal(true);
  };

  // Assign a role to a user
  const handleAssignRole = async (userId, roleId) => {
    try {
      // console.log("Assigning role:", { userId, roleId, userIdType: typeof userId, roleIdType: typeof roleId });
      const response = await axiosInstance.post(`/roles/assign/${userId}`, { roleId }, { withCredentials: true });
      // console.log("Role assigned:", response.data);
      Swal.fire("Success", "Role assigned successfully", "success");
    } catch (err) {
      console.error("Error assigning role:", err);
      Swal.fire("Error", err.response?.data?.message || "Failed to assign role", "error");
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
  };

  return (
    <Container fluid className="py-4">
      {/* Header */}
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
              disabled={isLoading || authLoading || availablePredefinedRoles.length === 0}
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
                        <td>{role.description || "No description"}</td>
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
                          <Badge bg="primary">{role.userCount || 0}</Badge>
                        </td>
                        <td>
                          <div className="d-flex justify-content-center gap-1">
                            <Button
                              variant="outline-success"
                              size="sm"
                              onClick={() => {
                                setAssigningRole(role);
                                setShowAssignModal(true);
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
                              disabled={role.isSystem || (role.userCount || 0) > 0 || isLoading}
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
                        disabled={isLoading}
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
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)} disabled={isLoading}>
                <MdCancel className="me-2" />
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSaveRole} disabled={isLoading}>
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
                <Form.Select
                  value={selectedUserId || ""}
                  onChange={(e) => setSelectedUserId(e.target.value)}
                  disabled={isLoading}
                >
                  <option value="">-- Select User --</option>
                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name} ({user.email})
                    </option>
                  ))}
                </Form.Select>
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
                disabled={!selectedUserId || isLoading}
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