// // src\pages\AccessManagement\AccessManagement.jsx

// "use client"

// import { useState, useEffect } from "react"
// import { Link } from "react-router-dom"
// import { Container, Row, Col, Card, Table, Badge, Button, Form, InputGroup } from "react-bootstrap"
// import { MdAdd, MdEdit, MdDelete, MdSearch, MdSecurity, MdGroup, MdVpnKey } from "react-icons/md"
// import Pagination from "../../components/Pagination/Pagination.jsx"

// const AccessManagement = ({ darkMode }) => {
//   const [users, setUsers] = useState([])
//   const [roles, setRoles] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [pagination, setPagination] = useState({ page: 1, limit: 1, total: 0 })

//   useEffect(() => {
//     // Simulate loading data
//     setTimeout(() => {
//       setUsers([
//         {
//           id: 1,
//           name: "John Doe",
//           email: "john@example.com",
//           role: "Admin",
//           permissions: ["read", "write", "delete", "manage_users"],
//           lastLogin: "2023-06-15",
//           status: "Active",
//         },
//         {
//           id: 2,
//           name: "Jane Smith",
//           email: "jane@example.com",
//           role: "Editor",
//           permissions: ["read", "write"],
//           lastLogin: "2023-06-14",
//           status: "Active",
//         },
//         {
//           id: 3,
//           name: "Bob Johnson",
//           email: "bob@example.com",
//           role: "Viewer",
//           permissions: ["read"],
//           lastLogin: "2023-06-10",
//           status: "Inactive",
//         },
//       ])

//       setRoles([
//         {
//           id: 1,
//           name: "Admin",
//           description: "Full system access",
//           permissions: ["read", "write", "delete", "manage_users", "manage_settings"],
//           userCount: 2,
//         },
//         {
//           id: 2,
//           name: "Editor",
//           description: "Can create and edit content",
//           permissions: ["read", "write"],
//           userCount: 5,
//         },
//         {
//           id: 3,
//           name: "Viewer",
//           description: "Read-only access",
//           permissions: ["read"],
//           userCount: 12,
//         },
//       ])

//       setPagination((prev) => ({ ...prev, total: 3 }))
//       setLoading(false)
//     }, 1000)
//   }, [])

//   const getStatusVariant = (status) => {
//     switch (status) {
//       case "Active":
//         return "success"
//       case "Inactive":
//         return "danger"
//       case "Pending":
//         return "warning"
//       default:
//         return "secondary"
//     }
//   }

//   const getRoleVariant = (role) => {
//     switch (role) {
//       case "Admin":
//         return "danger"
//       case "Editor":
//         return "primary"
//       case "Viewer":
//         return "secondary"
//       default:
//         return "secondary"
//     }
//   }

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

//   const paginatedUsers = users.slice(
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
//               <h1 className="h3 mb-1">Access Management</h1>
//               <p className="text-muted mb-0">Manage user roles and permissions</p>
//             </div>
//             <div className="d-flex gap-2">
//               <Button as={Link} to="/app/access/roles" variant="outline-primary">
//                 <MdGroup className="me-2" />
//                 Manage Roles
//               </Button>
//               <Button as={Link} to="/app/access/permissions" variant="outline-secondary">
//                 <MdVpnKey className="me-2" />
//                 Manage Permissions
//               </Button>
//             </div>
//           </div>
//         </Col>
//       </Row>

//       {/* Quick Stats */}
//       <Row className="g-3 mb-4">
//         <Col xs={12} sm={6} lg={3}>
//           <Card className="h-100 border-0 shadow-sm">
//             <Card.Body className="text-center">
//               <div className="text-primary mb-2">
//                 <MdGroup size={32} />
//               </div>
//               <h3 className="mb-1">{users.length}</h3>
//               <p className="text-muted mb-0">Total Users</p>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col xs={12} sm={6} lg={3}>
//           <Card className="h-100 border-0 shadow-sm">
//             <Card.Body className="text-center">
//               <div className="text-success mb-2">
//                 <MdSecurity size={32} />
//               </div>
//               <h3 className="mb-1">{roles.length}</h3>
//               <p className="text-muted mb-0">Active Roles</p>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col xs={12} sm={6} lg={3}>
//           <Card className="h-100 border-0 shadow-sm">
//             <Card.Body className="text-center">
//               <div className="text-warning mb-2">
//                 <MdVpnKey size={32} />
//               </div>
//               <h3 className="mb-1">15</h3>
//               <p className="text-muted mb-0">Permissions</p>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col xs={12} sm={6} lg={3}>
//           <Card className="h-100 border-0 shadow-sm">
//             <Card.Body className="text-center">
//               <div className="text-info mb-2">
//                 <MdSecurity size={32} />
//               </div>
//               <h3 className="mb-1">{users.filter((u) => u.status === "Active").length}</h3>
//               <p className="text-muted mb-0">Active Users</p>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       <Row>
//         {/* Users Table */}
//         <Col lg={8}>
//           <Card className="mb-4 border-0 shadow-sm">
//             <Card.Header className="bg-transparent d-flex justify-content-between align-items-center">
//               <h5 className="mb-0">User Access</h5>
//               <Button as={Link} to="/app/users/create" variant="primary" size="sm">
//                 <MdAdd className="me-2" />
//                 Add User
//               </Button>
//             </Card.Header>
//             <Card.Body className="p-0">
//               {/* Search */}
//               <div className="p-3 border-bottom">
//                 <InputGroup>
//                   <InputGroup.Text>
//                     <MdSearch />
//                   </InputGroup.Text>
//                   <Form.Control
//                     type="text"
//                     placeholder="Search users..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                 </InputGroup>
//               </div>

//               {/* Table */}
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
//                         <td>
//                           <Badge bg={getRoleVariant(user.role)}>{user.role}</Badge>
//                         </td>
//                         <td>
//                           <Badge bg={getStatusVariant(user.status)}>{user.status}</Badge>
//                         </td>
//                         <td>{user.lastLogin}</td>
//                         <td>
//                           <div className="d-flex justify-content-center gap-1">
//                             <Button as={Link} to={`/app/users/${user.id}/edit`} variant="outline-primary" size="sm">
//                               <MdEdit />
//                             </Button>
//                             <Button variant="outline-danger" size="sm">
//                               <MdDelete />
//                             </Button>
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

//         {/* Roles Overview */}
//         <Col lg={4}>
//           <Card className="border-0 shadow-sm">
//             <Card.Header className="bg-transparent d-flex justify-content-between align-items-center">
//               <h5 className="mb-0">Roles Overview</h5>
//               <Button as={Link} to="/app/access/roles" variant="outline-primary" size="sm">
//                 View All
//               </Button>
//             </Card.Header>
//             <Card.Body>
//               {roles.map((role) => (
//                 <div key={role.id} className="d-flex justify-content-between align-items-center mb-3">
//                   <div>
//                     <h6 className="mb-1">{role.name}</h6>
//                     <small className="text-muted">{role.description}</small>
//                   </div>
//                   <div className="text-end">
//                     <Badge bg="secondary">{role.userCount} users</Badge>
//                   </div>
//                 </div>
//               ))}
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   )
// }

// export default AccessManagement
"use client"

import { useState, useEffect } from "react"
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

const AccessManagement = () => {
  const [users, setUsers] = useState([])
  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [pagination, setPagination] = useState({ page: 1, limit: 1, total: 0 })

  // Temporary: Task-to-role assignments
  const [taskAssignments, setTaskAssignments] = useState([])

  useEffect(() => {
    setTimeout(() => {
      setUsers([
        {
          id: 1, name: "John Doe", email: "john@example.com", role: "Admin",
          permissions: ["read", "write", "delete", "manage_users"],
          lastLogin: "2023-06-15", status: "Active"
        },
        {
          id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor",
          permissions: ["read", "write"],
          lastLogin: "2023-06-14", status: "Active"
        },
        {
          id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Viewer",
          permissions: ["read"],
          lastLogin: "2023-06-10", status: "Inactive"
        },
      ])

      setRoles([
        { id: 1, name: "Admin", description: "Full system access", permissions: ["read", "write"], userCount: 2 },
        { id: 2, name: "Editor", description: "Can create/edit content", permissions: ["read", "write"], userCount: 5 },
        { id: 3, name: "Viewer", description: "Read-only access", permissions: ["read"], userCount: 12 },
        { id: 4, name: "HR Manager", description: "Manages employee records", permissions: ["read", "write"], userCount: 1 },
      ])

      setPagination((prev) => ({ ...prev, total: 3 }))
      setLoading(false)
    }, 1000)
  }, [])

  const taskList = [
    "Create User",
    "Delete User",
    "Create Survey",
    "Take Survey",
    "Export Report",
    "View Analytics",
    "Manage HR Records",
    "Approve Leave Request",
  ]

  const handleAssignTask = (task, role) => {
    setTaskAssignments((prev) => {
      const exists = prev.find((entry) => entry.task === task)
      if (exists) {
        return prev.map((entry) =>
          entry.task === task ? { ...entry, role } : entry
        )
      } else {
        return [...prev, { task, role }]
      }
    })
  }

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

  const paginatedUsers = users.slice(
    (pagination.page - 1) * pagination.limit,
    pagination.page * pagination.limit
  )

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
              <Button as={Link} to="/app/access/roles" variant="outline-primary">
                <MdGroup className="me-2" /> Manage Roles
              </Button>
              <Button as={Link} to="/app/access/permissions" variant="outline-secondary">
                <MdVpnKey className="me-2" /> Manage Permissions
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
              <h3>15</h3>
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
              <Button as={Link} to="/app/users/create" variant="primary" size="sm">
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
                        <td>{user.lastLogin}</td>
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
              <Button as={Link} to="/app/access/roles" variant="outline-primary" size="sm">View All</Button>
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
          <h5 className="mb-3">Assign System Tasks to Roles</h5>
          <Row className="g-3">
            {taskList.map((task, index) => (
              <Col md={6} lg={4} key={index}>
                <Card className="border-0 shadow-sm">
                  <Card.Body>
                    <Form.Check
                      type="checkbox"
                      id={`task-${index}`}
                      label={task}
                      checked={taskAssignments.some((a) => a.task === task)}
                      onChange={(e) => {
                        if (!e.target.checked) {
                          setTaskAssignments((prev) =>
                            prev.filter((a) => a.task !== task)
                          )
                        }
                      }}
                    />
                    <Form.Group className="mt-2">
                      <Form.Select
                        value={taskAssignments.find((a) => a.task === task)?.role || ""}
                        onChange={(e) => handleAssignTask(task, e.target.value)}
                      >
                        <option value="">-- Assign to Role --</option>
                        {roles.map((role) => (
                          <option key={role.id} value={role.name}>{role.name}</option>
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
                      <th>Task</th>
                      <th>Assigned Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {taskAssignments.map((entry, idx) => (
                      <tr key={idx}>
                        <td>{entry.task}</td>
                        <td><Badge bg={getRoleVariant(entry.role)}>{entry.role}</Badge></td>
                      </tr>
                    ))}
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