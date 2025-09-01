// // src\pages\AccessManagement\AccessManagement.jsx
// "use client"

// import { useState, useEffect, useMemo } from "react"
// import { Link } from "react-router-dom"
// import {
//   Container, Row, Col, Card, Table, Badge, Button,
//   Form, InputGroup
// } from "react-bootstrap"
// import {
//   MdAdd, MdEdit, MdDelete, MdSearch,
//   MdSecurity, MdGroup, MdVpnKey
// } from "react-icons/md"
// import Pagination from "../../components/Pagination/Pagination.jsx"
// import axiosInstance from "../../api/axiosInstance"
// import Swal from "sweetalert2"

// const AccessManagement = () => {
//   // ===== State (kept UI structure the same) =====
//   const [users, setUsers] = useState([])
//   const [roles, setRoles] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });
//   const [permissions, setPermissions] = useState([]);
//   const [permissionCount, setPermissionCount] = useState(0);

//   // Task-to-role assignments (kept as-is per request)
//   const [taskAssignments, setTaskAssignments] = useState([])

//   // ===== Fetch data (roles/permissions management moved out) =====
//   useEffect(() => {
//     let mounted = true
//     const fetchAll = async () => {
//       try {
//         setLoading(true)

//         // Try fetching users from backend
//         let fetchedUsers = []
//         try {
//           const { data } = await axiosInstance.get("/users", { withCredentials: true })
//           // Accept flexible shapes
//           const apiUsers = Array.isArray(data?.users) ? data.users : Array.isArray(data) ? data : []
//           fetchedUsers = apiUsers.map((u, idx) => ({
//             id: u._id || u.id || idx + 1,
//             name: u.name || u.fullName || u.username || "Unknown",
//             email: u.email || "",
//             // Role could be string or object
//             role: typeof u.role === "string" ? u.role : (u.role?.name || u.roleName || "Member"),
//             lastLogin: u.lastLogin || u.lastSeen || "—",
//             status: u.isActive === true ? "Active" : "Inactive",
//           }))
//         } catch (err) {
//           // Fallback to demo data (keeps UI identical behavior)
//         }

//         // Try fetching roles from backend
//         let fetchedRoles = []
//         try {
//           const { data } = await axiosInstance.get("/roles", { withCredentials: true })
//           const apiRoles = Array.isArray(data?.roles) ? data.roles : Array.isArray(data) ? data : []
//           // If backend doesn't provide userCount, compute from fetchedUsers
//           const counts = fetchedUsers.reduce((acc, u) => {
//             const key = u.role || "Unknown"
//             acc[key] = (acc[key] || 0) + 1
//             return acc
//           }, {})

//           fetchedRoles = apiRoles.map((r, idx) => ({
//             id: r._id || r.id || idx + 1,
//             name: r.name || "Unnamed Role",
//             description: r.description || "",
//             permissions: r.permissions || [],
//             userCount: typeof r.userCount === "number" ? r.userCount : (counts[r.name] || 0),
//           }))
//         } catch (err) {
//           // Fallback: derive roles purely from users present
//           const counts = fetchedUsers.reduce((acc, u) => {
//             const key = u.role || "Unknown"
//             acc[key] = (acc[key] || 0) + 1
//             return acc
//           }, {})
//           fetchedRoles = Object.entries(counts).map(([roleName, count], i) => ({
//             id: i + 1,
//             name: roleName,
//             description: "",
//             permissions: [],
//             userCount: count,
//           }))
//         }

//         if (!mounted) return
//         setUsers(fetchedUsers)
//         setRoles(fetchedRoles)
//         setPagination((prev) => ({ ...prev, total: fetchedUsers.length }))
//       } catch (e) {
//         console.error(e)
//         Swal.fire("Error", e?.response?.data?.message || "Failed to load access data", "error")
//       } finally {
//         if (mounted) setLoading(false)
//       }
//     }

//     fetchAll()
//     return () => { mounted = false }
//   }, [])

//   useEffect(() => {
//     const fetchPermissions = async () => {
//       try {
//         const { data } = await axiosInstance.get("/permissions", { withCredentials: true });
//         setPermissions(Array.isArray(data?.permissions) ? data.permissions : []);
//         const apiPermissions = Array.isArray(data?.permissions) ? data.permissions : [];
//         setPermissionCount(apiPermissions.length);
//       } catch (err) {
//         console.error("Permissions fetch error:", err);
//       }
//     };
//     fetchPermissions();
//   }, []);

//   // ===== Static tasks list (kept UI exactly same) =====
//   const taskList = [
//     "Create User",
//     "Delete User",
//     "Create Survey",
//     "Take Survey",
//     "Export Report",
//     "View Analytics",
//     "Manage HR Records",
//     "Approve Leave Request",
//   ]
//   // const handleAssignTask = async (userId, permissionId) => {
//   //   try {
//   //     const { data } = await axiosInstance.post(
//   //       "/permissionassignment/task-assignments",
//   //       { permissionId, userId },
//   //       { withCredentials: true }
//   //     );
//   //     setTaskAssignments((prev) => {
//   //       const exists = prev.find((entry) => entry.permission === permission);
//   //       if (exists) {
//   //         return prev.map((entry) =>
//   //           entry.permission === permission ? { ...entry, userId } : entry
//   //         );
//   //       } else {
//   //         return [...prev, { permission, userId }];
//   //       }
//   //     });
//   //   } catch (err) {
//   //     console.error("Assign task error:", err);
//   //     Swal.fire("Error", "Failed to assign task", "error");
//   //   }
//   // };
//   const handleAssignTask = async (userId, permissionId) => {
//     try {
//       if (!userId || !permissionId) {
//         console.error('Missing userId or permissionId', { userId, permissionId });
//         Swal.fire('Error', 'Please select a user and permission', 'error');
//         return;
//       }

//       console.log('Sending request to assign task:', { userId, permissionId });

//       const { data } = await axiosInstance.post(
//         '/permissionassignment/task-assignments', 
//         { permissionId, userId },
//         { withCredentials: true }
//       );

//       setTaskAssignments((prev) => {
//         const exists = prev.find((entry) => entry.permissionId === permissionId); // Fixed 'permission' to 'permissionId'
//         if (exists) {
//           return prev.map((entry) =>
//             entry.permissionId === permissionId ? { ...entry, userId } : entry
//           );
//         } else {
//           return [...prev, { permissionId, userId }]; // Fixed 'permission' to 'permissionId'
//         }
//       });

//       Swal.fire('Success', 'Task assigned successfully', 'success');
//     } catch (err) {
//       console.error('Assign task error:', err);
//       Swal.fire('Error', err.response?.data?.message || 'Failed to assign task', 'error');
//     }
//   };

//   // ===== Helpers (unchanged UI) =====
//   const getStatusVariant = (status) => {
//     switch (status) {
//       case "Active": return "success"
//       case "Inactive": return "danger"
//       case "Pending": return "warning"
//       default: return "secondary"
//     }
//   }

//   const getRoleVariant = (role) => {
//     switch (role) {
//       case "Admin": return "danger"
//       case "Editor": return "primary"
//       case "Viewer": return "secondary"
//       case "HR Manager": return "info"
//       default: return "dark"
//     }
//   }

//   // ===== Search + Pagination (kept same table & layout) =====
//   const filteredUsers = useMemo(() => {
//     const term = searchTerm.trim().toLowerCase()
//     if (!term) return users
//     return users.filter((u) =>
//       (u.name || "").toLowerCase().includes(term) ||
//       (u.email || "").toLowerCase().includes(term) ||
//       (u.role || "").toLowerCase().includes(term)
//     )
//   }, [users, searchTerm])

//   const paginatedUsers = useMemo(() => {
//     const start = (pagination.page - 1) * pagination.limit
//     const end = pagination.page * pagination.limit
//     return filteredUsers.slice(start, end)
//   }, [filteredUsers, pagination])

//   useEffect(() => {
//     // Update total on search
//     setPagination((prev) => ({ ...prev, total: filteredUsers.length, page: 1 }))
//   }, [filteredUsers.length])

//   if (loading) {
//     return (
//       <Container fluid className="py-4">
//         <div className="text-center">
//           <div className="spinner-border text-primary mb-3" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//           <p>Loading access management...</p>
//         </div>
//       </Container>
//     )
//   }

//   return (
//     <Container fluid className="py-4">
//       {/* Header */}
//       <Row className="mb-4">
//         <Col>
//           <div className="d-flex justify-content-between align-items-center">
//             <div>
//               <h1 className="h3 mb-1">Access Management</h1>
//               <p className="text-muted mb-0">Manage user roles and permissions</p>
//             </div>
//             <div className="d-flex gap-2">
//               <Button as={Link} to="/app/roles" variant="outline-primary">
//                 <MdGroup className="me-2" /> Manage Roles
//               </Button>
//             </div>
//           </div>
//         </Col>
//       </Row>

//       {/* Quick Stats (UI unchanged; permissions count kept static) */}
//       <Row className="g-3 mb-4">
//         <Col sm={6} lg={3}>
//           <Card className="h-100 border-0 shadow-sm text-center">
//             <Card.Body>
//               <div className="text-primary mb-2"><MdGroup size={32} /></div>
//               <h3>{users.length}</h3>
//               <p className="text-muted mb-0">Total Users</p>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col sm={6} lg={3}>
//           <Card className="h-100 border-0 shadow-sm text-center">
//             <Card.Body>
//               <div className="text-success mb-2"><MdSecurity size={32} /></div>
//               <h3>{roles.length}</h3>
//               <p className="text-muted mb-0">Active Roles</p>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col sm={6} lg={3}>
//           <Card className="h-100 border-0 shadow-sm text-center">
//             <Card.Body>
//               <div className="text-warning mb-2"><MdVpnKey size={32} /></div>
//               <h3>{permissionCount}</h3>
//               <p className="text-muted mb-0">Permissions</p>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col sm={6} lg={3}>
//           <Card className="h-100 border-0 shadow-sm text-center">
//             <Card.Body>
//               <div className="text-info mb-2"><MdSecurity size={32} /></div>
//               <h3>{users.filter((u) => u.status === "Active").length}</h3>
//               <p className="text-muted mb-0">Active Users</p>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* Users Table (UI unchanged) */}
//       <Row>
//         <Col lg={8}>
//           <Card className="mb-4 border-0 shadow-sm">
//             <Card.Header className="bg-transparent d-flex justify-content-between align-items-center">
//               <h5 className="mb-0">User Access</h5>
//               <Button as={Link} to="/app/users/form" variant="primary" size="sm">
//                 <MdAdd className="me-2" /> Add User
//               </Button>
//             </Card.Header>
//             <Card.Body className="p-0">
//               <div className="p-3 border-bottom">
//                 <InputGroup>
//                   <InputGroup.Text><MdSearch /></InputGroup.Text>
//                   <Form.Control
//                     type="text"
//                     placeholder="Search users..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                 </InputGroup>
//               </div>
//               <div className="table-responsive">
//                 <Table hover className="mb-0">
//                   <thead className="table-light">
//                     <tr>
//                       <th>User</th>
//                       <th>Role</th>
//                       <th>Status</th>
//                       <th>Last Login</th>
//                       <th className="text-center">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {paginatedUsers.map((user) => (
//                       <tr key={user.id}>
//                         <td>
//                           <div>
//                             <div className="fw-medium">{user.name}</div>
//                             <small className="text-muted">{user.email}</small>
//                           </div>
//                         </td>
//                         <td><Badge bg={getRoleVariant(user.role)}>{user.role}</Badge></td>
//                         <td><Badge bg={getStatusVariant(user.status)}>{user.status}</Badge></td>
//                         <td>{user.lastLogin}</td>
//                         <td>
//                           <div className="d-flex justify-content-center gap-1">
//                             <Button as={Link} to={`/app/users/${user.id}/edit`} variant="outline-primary" size="sm">
//                               <MdEdit />
//                             </Button>
//                             <Button variant="outline-danger" size="sm"><MdDelete /></Button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//               </div>
//               <div className="p-3">
//                 <Pagination
//                   current={pagination.page}
//                   total={pagination.total}
//                   limit={pagination.limit}
//                   onChange={(page) => setPagination((prev) => ({ ...prev, page }))}
//                 />
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>

//         {/* Roles Overview (counts per role; UI unchanged) */}
//         <Col lg={4}>
//           <Card className="border-0 shadow-sm">
//             <Card.Header className="bg-transparent d-flex justify-content-between align-items-center">
//               <h5 className="mb-0">Roles Overview</h5>
//               <Button as={Link} to="/app/access/roles" variant="outline-primary" size="sm">View All</Button>
//             </Card.Header>
//             <Card.Body>
//               {roles.map((role) => (
//                 <div key={role.id} className="d-flex justify-content-between align-items-center mb-3">
//                   <div>
//                     <h6 className="mb-1">{role.name}</h6>
//                     <small className="text-muted">{role.description}</small>
//                   </div>
//                   <Badge bg="secondary">{role.userCount} users</Badge>
//                 </div>
//               ))}
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* Task Assignment Cards (kept identical) */}
//       <Row className="mt-4">
//         <Col>
//           {/* <h5 className="mb-3">Assign System Tasks to Roles</h5>
//           <Row className="g-3">
//             {taskList.map((task, index) => (
//               <Col md={6} lg={4} key={index}>
//                 <Card className="border-0 shadow-sm">
//                   <Card.Body>
//                     <Form.Check
//                       type="checkbox"
//                       id={`task-${index}`}
//                       label={task}
//                       checked={taskAssignments.some((a) => a.task === task)}
//                       onChange={(e) => {
//                         if (!e.target.checked) {
//                           setTaskAssignments((prev) =>
//                             prev.filter((a) => a.task !== task)
//                           )
//                         }
//                       }}
//                     />
//                     <Form.Group className="mt-2">
//                       <Form.Select
//                         value={taskAssignments.find((a) => a.task === task)?.role || ""}
//                         onChange={(e) => handleAssignTask(task, e.target.value)}
//                       >
//                         <option value="">-- Assign to Role --</option>
//                         {roles.map((role) => (
//                           <option key={role.id} value={role.name}>{role.name}</option>
//                         ))}
//                       </Form.Select>
//                     </Form.Group>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))}
//           </Row> */}
//           <h5 className="mb-3">Assign System Tasks to Users</h5>
//           <Row className="g-3">
//             {permissions.map((perm, index) => (
//               <Col md={6} lg={4} key={perm.name}>
//                 <Card className="border-0 shadow-sm">
//                   <Card.Body>
//                     <Form.Check
//                       type="checkbox"
//                       id={`perm-${index}`}
//                       label={`${perm.description}`}
//                       checked={taskAssignments.some((a) => a.permission === perm.name)}
//                       onChange={(e) => {
//                         if (!e.target.checked) {
//                           setTaskAssignments((prev) =>
//                             prev.filter((a) => a.permission !== perm.name)
//                           )
//                           // delete assignment API call
//                           axiosInstance.delete(`/task-assignments/${perm.name}`, { withCredentials: true });
//                         }
//                       }}
//                     />
//                     <Form.Group className="mt-2">
//                       <Form.Select
//                         value={taskAssignments.find((a) => a.permission === perm.name)?.userId || ""}
//                         onChange={(e) => handleAssignTask(perm.name, e.target.value)}
//                       >
//                         <option value="">-- Assign to User --</option>
//                         {users
//                           .filter((u) => u.role !== "companyAdmin")
//                           .map((u) => (
//                             <option key={u.id} value={u.id}>{u.name}</option>
//                           ))}
//                       </Form.Select>
//                     </Form.Group>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//         </Col>
//       </Row>

//       {/* Task Assignment Table (kept identical) */}
//       <Row className="mt-5">
//         <Col>
//           <h5 className="mb-3">Task Assignments Overview</h5>
//           <Card className="border-0 shadow-sm">
//             <Card.Body className="p-0">
//               <div className="table-responsive">
//                 <Table hover className="mb-0">
//                   <thead className="table-light">
//                     <tr>
//                       <th>Permission</th>
//                       <th>Assigned User</th>
//                       <th className="text-center">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {taskAssignments.map((entry, idx) => {
//                       const user = users.find((u) => u.id === entry.userId);
//                       return (
//                         <tr key={idx}>
//                           <td>{entry.permission}</td>
//                           <td><Badge bg="primary">{user?.name || "Unknown"}</Badge></td>
//                           <td className="text-center">
//                             <Button
//                               variant="outline-danger"
//                               size="sm"
//                               onClick={async () => {
//                                 await axiosInstance.delete(`/task-assignments/${entry._id}`, { withCredentials: true });
//                                 setTaskAssignments((prev) => prev.filter((a) => a._id !== entry._id));
//                               }}
//                             >
//                               <MdDelete />
//                             </Button>
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </Table>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   )
// }

// export default AccessManagement

// src/pages/AccessManagement/AccessManagement.jsx
"use client"

import { useState, useEffect, useMemo } from "react"
import { Link } from "react-router-dom"
import {
  Container, Row, Col, Card, Table, Badge, Button,
  Form, InputGroup
} from "react-bootstrap"
import {
  MdAdd, MdEdit, MdDelete, MdSearch,
  MdSecurity, MdGroup, MdVpnKey
} from "react-icons/md"
import Pagination from "../../components/Pagination/Pagination.jsx"
import axiosInstance from "../../api/axiosInstance"
import Swal from "sweetalert2"
import { formatLocalDateTime } from "../../utilities/dateUtils.js";

const AccessManagement = () => {
  const [users, setUsers] = useState([])
  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 })
  const [permissions, setPermissions] = useState([])
  const [permissionCount, setPermissionCount] = useState(0)
  const [taskAssignments, setTaskAssignments] = useState([])

  // Fetch data
  useEffect(() => {
    let mounted = true
    const fetchAll = async () => {
      try {
        setLoading(true)

        // Fetch users
        let fetchedUsers = []
        try {
          const { data } = await axiosInstance.get("/users", { withCredentials: true })
          const apiUsers = Array.isArray(data?.users) ? data.users : Array.isArray(data) ? data : []
          fetchedUsers = apiUsers.map((u, idx) => ({
            id: u._id || u.id || idx + 1,
            name: u.name || u.fullName || u.username || "Unknown",
            email: u.email || "",
            role: typeof u.role === "string" ? u.role : (u.role?.name || u.roleName || "Member"),
            lastLogin: u.lastLogin || u.lastSeen || "—",
            status: u.isActive === true ? "Active" : "Inactive",
          }))
        } catch (err) {
          console.error("Users fetch error:", err)
        }

        // Fetch roles
        let fetchedRoles = []
        try {
          const { data } = await axiosInstance.get("/roles", { withCredentials: true })
          const apiRoles = Array.isArray(data?.roles) ? data.roles : Array.isArray(data) ? data : []
          const counts = fetchedUsers.reduce((acc, u) => {
            const key = u.role || "Unknown"
            acc[key] = (acc[key] || 0) + 1
            return acc
          }, {})
          fetchedRoles = apiRoles.map((r, idx) => ({
            id: r._id || r.id || idx + 1,
            name: r.name || "Unnamed Role",
            description: r.description || "",
            permissions: r.permissions || [],
            userCount: typeof r.userCount === "number" ? r.userCount : (counts[r.name] || 0),
          }))
        } catch (err) {
          console.error("Roles fetch error:", err)
          const counts = fetchedUsers.reduce((acc, u) => {
            const key = u.role || "Unknown"
            acc[key] = (acc[key] || 0) + 1
            return acc
          }, {})
          fetchedRoles = Object.entries(counts).map(([roleName, count], i) => ({
            id: i + 1,
            name: roleName,
            description: "",
            permissions: [],
            userCount: count,
          }))
        }

        // Fetch permissions
        try {
          const { data } = await axiosInstance.get("/permissions", { withCredentials: true })
          const apiPermissions = Array.isArray(data?.permissions) ? data.permissions : []
          setPermissions(apiPermissions)
          setPermissionCount(apiPermissions.length)
        } catch (err) {
          console.error("Permissions fetch error:", err)
        }

        // Fetch task assignments
        try {
          const { data } = await axiosInstance.get("/task-assignments", { withCredentials: true })
          const assignments = Array.isArray(data?.assignments) ? data.assignments : []
          setTaskAssignments(assignments.map(a => ({
            _id: a._id,
            permissionId: a.permissionId._id,
            permission: a.permissionId.name,
            userId: a.userId._id,
            userName: a.userId.name
          })))
        } catch (err) {
          console.error("Task assignments fetch error:", err)
        }

        if (!mounted) return
        setUsers(fetchedUsers)
        setRoles(fetchedRoles)
        setPagination((prev) => ({ ...prev, total: fetchedUsers.length }))
      } catch (e) {
        console.error("Fetch error:", e)
        Swal.fire("Error", e?.response?.data?.message || "Failed to load access data", "error")
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchAll()
    return () => { mounted = false }
  }, [])

  // src/pages/AccessManagement/AccessManagement.jsx (only relevant parts shown)
  const handleAssignTask = async (permissionId, userId) => {
    try {
      if (!userId || !permissionId) {
        console.error('Missing userId or permissionId', { userId, permissionId });
        Swal.fire('Error', 'Please select a user and permission', 'error');
        return;
      }

      console.log('Sending request to assign task:', { userId, permissionId });

      const { data } = await axiosInstance.post(
        '/task-assignments',
        { permissionId, userId },
        { withCredentials: true }
      );

      setTaskAssignments((prev) => {
        const exists = prev.find((entry) => entry.permissionId === data.assignment.permissionId._id);
        if (exists) {
          return prev.map((entry) =>
            entry.permissionId === data.assignment.permissionId._id
              ? { ...entry, userId: data.assignment.userId._id, userName: data.assignment.userId.name }
              : entry
          );
        } else {
          return [...prev, {
            _id: data.assignment._id,
            permissionId: data.assignment.permissionId._id,
            permission: data.assignment.permissionId.name,
            userId: data.assignment.userId._id,
            userName: data.assignment.userId.name
          }];
        }
      });

      Swal.fire('Success', 'Task assigned successfully', 'success');
    } catch (err) {
      console.error('Assign task error:', err.response?.data || err);
      Swal.fire('Error', err.response?.data?.message || 'Failed to assign task', 'error');
    }
  };

  const handleRemoveTask = async (assignmentId) => {
    try {
      if (!assignmentId) {
        console.error('Missing assignmentId', { assignmentId });
        Swal.fire('Error', 'Invalid assignment ID', 'error');
        return;
      }

      await axiosInstance.delete(`/task-assignments/${assignmentId}`, { withCredentials: true });
      setTaskAssignments((prev) => prev.filter((a) => a._id !== assignmentId));
      Swal.fire('Success', 'Task removed successfully', 'success');
    } catch (err) {
      console.error('Remove task error:', err.response?.data || err);
      Swal.fire('Error', err.response?.data?.message || 'Failed to remove task', 'error');
    }
  };

  // Helpers
  const getStatusVariant = (status) => {
    switch (status) {
      case "Active": return "success"
      case "Inactive": return "danger"
      case "Pending": return "warning"
      default: return "secondary"
    }
  }

  const getRoleVariant = (role) => {
    switch (role) {
      case "Admin": return "danger"
      case "Editor": return "primary"
      case "Viewer": return "secondary"
      case "HR Manager": return "info"
      default: return "dark"
    }
  }

  // Search + Pagination
  const filteredUsers = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    if (!term) return users
    return users.filter((u) =>
      (u.name || "").toLowerCase().includes(term) ||
      (u.email || "").toLowerCase().includes(term) ||
      (u.role || "").toLowerCase().includes(term)
    )
  }, [users, searchTerm])

  const paginatedUsers = useMemo(() => {
    const start = (pagination.page - 1) * pagination.limit
    const end = pagination.page * pagination.limit
    return filteredUsers.slice(start, end)
  }, [filteredUsers, pagination])

  useEffect(() => {
    setPagination((prev) => ({ ...prev, total: filteredUsers.length, page: 1 }))
  }, [filteredUsers.length])

  if (loading) {
    return (
      <Container fluid className="py-4">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading access management...</p>
        </div>
      </Container>
    )
  }

  return (
    <Container fluid className="py-4">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="h3 mb-1">Access Management</h1>
              <p className="text-muted mb-0">Manage user roles and permissions</p>
            </div>
            <div className="d-flex gap-2">
              <Button as={Link} to="/app/roles" variant="outline-primary">
                <MdGroup className="me-2" /> Manage Roles
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      {/* Quick Stats */}
      <Row className="g-3 mb-4">
        <Col sm={6} lg={3}>
          <Card className="h-100 border-0 shadow-sm text-center">
            <Card.Body>
              <div className="text-primary mb-2"><MdGroup size={32} /></div>
              <h3>{users.length}</h3>
              <p className="text-muted mb-0">Total Users</p>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={6} lg={3}>
          <Card className="h-100 border-0 shadow-sm text-center">
            <Card.Body>
              <div className="text-success mb-2"><MdSecurity size={32} /></div>
              <h3>{roles.length}</h3>
              <p className="text-muted mb-0">Active Roles</p>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={6} lg={3}>
          <Card className="h-100 border-0 shadow-sm text-center">
            <Card.Body>
              <div className="text-warning mb-2"><MdVpnKey size={32} /></div>
              <h3>{permissionCount}</h3>
              <p className="text-muted mb-0">Permissions</p>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={6} lg={3}>
          <Card className="h-100 border-0 shadow-sm text-center">
            <Card.Body>
              <div className="text-info mb-2"><MdSecurity size={32} /></div>
              <h3>{users.filter((u) => u.status === "Active").length}</h3>
              <p className="text-muted mb-0">Active Users</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Users Table */}
      <Row>
        <Col lg={8}>
          <Card className="mb-4 border-0 shadow-sm">
            <Card.Header className="bg-transparent d-flex justify-content-between align-items-center">
              <h5 className="mb-0">User Access</h5>
              <Button as={Link} to="/app/users/form" variant="primary" size="sm">
                <MdAdd className="me-2" /> Add User
              </Button>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="p-3 border-bottom">
                <InputGroup>
                  <InputGroup.Text><MdSearch /></InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </div>
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
                    {paginatedUsers.map((user) => (
                      <tr key={user.id}>
                        <td>
                          <div>
                            <div className="fw-medium">{user.name}</div>
                            <small className="text-muted">{user.email}</small>
                          </div>
                        </td>
                        <td><Badge bg={getRoleVariant(user.role)}>{user.role}</Badge></td>
                        <td><Badge bg={getStatusVariant(user.status)}>{user.status}</Badge></td>
                        <td>{formatLocalDateTime(user.lastLogin)}</td>
                        <td>
                          <div className="d-flex justify-content-center gap-1">
                            <Button as={Link} to={`/app/users/${user.id}/edit`} variant="outline-primary" size="sm">
                              <MdEdit />
                            </Button>
                            <Button variant="outline-danger" size="sm"><MdDelete /></Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              <div className="p-3">
                <Pagination
                  current={pagination.page}
                  total={pagination.total}
                  limit={pagination.limit}
                  onChange={(page) => setPagination((prev) => ({ ...prev, page }))}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Roles Overview */}
        <Col lg={4}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-transparent d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Roles Overview</h5>
              <Button as={Link} to="/app/roles" variant="outline-primary" size="sm">View All</Button>
            </Card.Header>
            <Card.Body>
              {roles.map((role) => (
                <div key={role.id} className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h6 className="mb-1">{role.name}</h6>
                    <small className="text-muted">{role.description}</small>
                  </div>
                  <Badge bg="secondary">{role.userCount} users</Badge>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Task Assignment Cards */}
      <Row className="mt-4">
        <Col>
          <h5 className="mb-3">Assign System Tasks to Users</h5>
          <Row className="g-3">
            {permissions.map((perm, index) => (
              <Col md={6} lg={4} key={perm._id}>
                <Card className="border-0 shadow-sm">
                  <Card.Body>
                    <Form.Check
                      type="checkbox"
                      id={`perm-${index}`}
                      label={perm.description || perm.name}
                      checked={taskAssignments.some((a) => a.permissionId === perm._id)}
                      onChange={(e) => {
                        if (!e.target.checked) {
                          const assignment = taskAssignments.find((a) => a.permissionId === perm._id)
                          if (assignment) {
                            handleRemoveTask(assignment._id)
                          }
                        }
                      }}
                    />
                    <Form.Group className="mt-2">
                      <Form.Select
                        value={taskAssignments.find((a) => a.permissionId === perm._id)?.userId || ""}
                        onChange={(e) => handleAssignTask(perm._id, e.target.value)}
                      >
                        <option value="">-- Assign to User --</option>
                        {users
                          .filter((u) => u.role !== "companyAdmin")
                          .map((u) => (
                            <option key={u.id} value={u.id}>{u.name}</option>
                          ))}
                      </Form.Select>
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* Task Assignment Table */}
      <Row className="mt-5">
        <Col>
          <h5 className="mb-3">Task Assignments Overview</h5>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table hover className="mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Permission</th>
                      <th>Assigned User</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {taskAssignments.map((entry) => {
                      const permission = permissions.find((p) => p._id === entry.permissionId)
                      return (
                        <tr key={entry._id}>
                          <td>{permission?.description || permission?.name || entry.permission}</td>
                          <td><Badge bg="primary">{entry.userName || "Unknown"}</Badge></td>
                          <td className="text-center">
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => handleRemoveTask(entry._id)}
                            >
                              <MdDelete />
                            </Button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default AccessManagement