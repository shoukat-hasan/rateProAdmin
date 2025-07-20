// src\pages\UserManagement\UserList.jsx

"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Container, Row, Col, Table, Badge, Button, InputGroup, Form, Card } from "react-bootstrap"
import { MdEdit, MdDelete, MdSearch, MdAdd, MdPerson, MdToggleOn, MdToggleOff } from "react-icons/md"
import Pagination from "../../components/Pagination/Pagination.jsx"
import axiosInstance from "../../api/axiosInstance.js"

const UserList = ({ darkMode }) => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    role: "",
    status: "",
  })
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 })

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await axiosInstance.get("/user", {
  //         params: {
  //           page: pagination.page,
  //           limit: pagination.limit,
  //           search: searchTerm,
  //           role: filters.role,
  //           isActive: filters.status,
  //         },
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,  // ya jahan se tu token store kar raha hai
  //         },
  //       });

  //       const { data, pagination: serverPagination } = response.data;

  //       setUsers(data);
  //       setPagination({
  //         page: serverPagination.page,
  //         limit: serverPagination.limit,
  //         total: serverPagination.total
  //       });   

  //     } catch (error) {
  //       console.error("Failed to fetch users", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUsers();
  // }, [searchTerm, filters, pagination.page]);

  useEffect(() => {
    fetchUsers();
  }, [searchTerm, filters, pagination.page]);

  // const fetchUsers = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axiosInstance.get("/users", {
  //       params: {
  //         page: pagination.page,
  //         limit: pagination.limit,
  //         search: searchTerm,
  //         role: filters.role,
  //         active: filters.status === "Active" ? "true" : filters.status === "Inactive" ? "false" : undefined,
  //       },
  //     });

  //     console.log("🔍 API Response:", response);

  //     const { users, total, page: currentPage } = response.data;

  //     setUsers(users);
  //     setPagination((prev) => ({
  //       ...prev,
  //       page: currentPage,
  //       total: total,
  //     }));
  //   } catch (error) {
  //     console.error("Failed to fetch users", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/users", {
        params: {
          page: pagination.page,
          limit: pagination.limit,
          search: searchTerm,
          role: filters.role,
          active: filters.status === "Active" ? "true" : filters.status === "Inactive" ? "false" : undefined,
        },
      });

      console.log("🔍 API Response:", response);

      const { users, total, page: currentPage } = response.data;

      // Map over users and assign status based on isActive
      const processedUsers = users.map((user) => ({
        ...user,
        status: user.isActive ? "Active" : "Inactive",
      }));

      setUsers(processedUsers);
      setPagination((prev) => ({
        ...prev,
        page: currentPage,
        total: total,
      }));
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  const getRoleVariant = (role) => {
    switch (role) {
      case "Admin":
        return "primary"
      case "Editor":
        return "success"
      case "Viewer":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getStatusVariant = (status) => {
    switch (status) {
      case "Active":
        return "success"
      case "Inactive":
        return "danger"
      case "Pending":
        return "warning"
      default:
        return "secondary"
    }
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  if (loading) {
    return <div className="text-center py-4">Loading users...</div>
  }

  const handleToggleActive = async (userId, currentStatus) => {
    try {
      const response = await axiosInstance.put(`/users/${userId}/toggle-active`, {
        isActive: !currentStatus,
      });

      // Refetch users or optimistically update the state
      fetchUsers();
    } catch (error) {
      console.error("Failed to toggle user status", error);
    }
  };

  // const currentUsers = users

  return (
    // <Container fluid className="py-4">
    //   {/* Header */}
    //   <Row className="mb-4">
    //     <Col>
    //       <div className="d-flex justify-content-between align-items-center">
    //         <h1 className="h3 mb-0">User Management</h1>
    //         <Button as={Link} to="/app/users/create" variant="primary">
    //           <MdAdd className="me-2" />
    //           Create User
    //         </Button>
    //       </div>
    //     </Col>
    //   </Row>

    //   {/* Filters */}
    //   <Card className="mb-4">
    //     <Card.Body>
    //       <Row className="g-3">
    //         <Col md={4}>
    //           <InputGroup>
    //             <InputGroup.Text>
    //               <MdSearch />
    //             </InputGroup.Text>
    //             <Form.Control
    //               type="text"
    //               placeholder="Search users..."
    //               value={searchTerm}
    //               onChange={(e) => setSearchTerm(e.target.value)}
    //             />
    //           </InputGroup>
    //         </Col>
    //         <Col md={3}>
    //           <Form.Select name="role" value={filters.role} onChange={handleFilterChange}>
    //             <option value="">All Roles</option>
    //             <option value="Admin">Admin</option>
    //             <option value="Editor">Editor</option>
    //             <option value="Viewer">Viewer</option>
    //           </Form.Select>
    //         </Col>
    //         <Col md={3}>
    //           <Form.Select name="status" value={filters.status} onChange={handleFilterChange}>
    //             <option value="">All Statuses</option>
    //             <option value="Active">Active</option>
    //             <option value="Inactive">Inactive</option>
    //             <option value="Pending">Pending</option>
    //           </Form.Select>
    //         </Col>
    //       </Row>
    //     </Card.Body>
    //   </Card>

    //   {/* Users Table */}
    //   <Card>
    //     <Card.Body className="p-0">
    //       <div className="table-responsive">
    //         <Table hover className="mb-0">
    //           <thead className="table-light">
    //             <tr>
    //               <th>User</th>
    //               <th>Role</th>
    //               <th>Status</th>
    //               <th>Last Login</th>
    //               <th className="text-center">Actions</th>
    //             </tr>
    //           </thead>
    //           <tbody>
    //             {users.map((user) => (
    //               <tr key={user._id}>
    //                 <td>
    //                   <div className="d-flex align-items-center">
    //                     <div
    //                       className="rounded-circle bg-light d-flex align-items-center justify-content-center me-3"
    //                       style={{ width: "40px", height: "40px" }}
    //                     >
    //                       <MdPerson className="text-secondary" />
    //                     </div>
    //                     <div>
    //                       <div className="fw-medium">{user.name}</div>
    //                       <small className="text-muted">{user.email}</small>
    //                     </div>
    //                   </div>
    //                 </td>
    //                 <td>
    //                   <Badge bg={getRoleVariant(user.role)}>{user.role}</Badge>
    //                 </td>
    //                 <td>
    //                   <Badge bg={getStatusVariant(user.status)}>{user.status}</Badge>
    //                 </td>
    //                 <td>{user.lastLogin}</td>
    //                 {/* <td>{new Date(user.lastLogin).toLocaleString()}</td> */}
    //                 <td>
    //                   <div className="d-flex justify-content-center gap-1">
    //                     <Button as={Link} to={`/users/${user.id}/edit`} variant="outline-primary" size="sm">
    //                       <MdEdit />
    //                     </Button>
    //                     <Button variant="outline-danger" size="sm">
    //                       <MdDelete />
    //                     </Button>
    //                   </div>
    //                 </td>
    //               </tr>
    //             ))}
    //           </tbody>
    //         </Table>
    //       </div>
    //     </Card.Body>

    //     {/* 👇 Correctly placed Card.Footer */}
    //     <Card.Footer>
    //       <div className="d-flex justify-content-between align-items-center">
    //         {/* <small className="text-muted">
    //           Showing {(pagination.page - 1) * pagination.limit + 1} to {Math.min(pagination.page * pagination.limit, users.length)} of {users.length} users
    //         </small> */}
    //         <small className="text-muted">
    //           Showing {(pagination.page - 1) * pagination.limit + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} users
    //         </small>
    //         <Pagination
    //           current={pagination.page}
    //           total={pagination.total}
    //           limit={pagination.limit}
    //           onChange={(page) => setPagination((prev) => ({ ...prev, page }))}
    //           darkMode={darkMode}
    //         />
    //       </div>
    //     </Card.Footer>
    //   </Card>
    // </Container>
    <Container fluid className="py-4">
      {/* Header */}
      <Row className="mb-4">
        <Col xs={12}>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
            <h1 className="h4 mb-0">User Management</h1>
            <Button as={Link} to="/app/users/create" variant="primary" className="ms-md-auto">
              <MdAdd className="me-2" />
              Create User
            </Button>
          </div>
        </Col>
      </Row>

      {/* Filters */}
      <Card className="mb-4">
        <Card.Body>
          <Row className="g-3">
            <Col xs={12} md={4}>
              <InputGroup>
                <InputGroup.Text>
                  <MdSearch />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col xs={12} md={4}>
              <Form.Select name="role" value={filters.role} onChange={handleFilterChange}>
                <option value="">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="Editor">Editor</option>
                <option value="Viewer">Viewer</option>
              </Form.Select>
            </Col>
            <Col xs={12} md={4}>
              <Form.Select name="status" value={filters.status} onChange={handleFilterChange}>
                <option value="">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </Form.Select>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Users Table */}
      <Card>
        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table responsive="md" hover className="mb-0 align-middle text-nowrap">
              <thead className="table-light">
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Status</th>
                  {/* <th>Last Login</th> */}
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div
                          className="rounded-circle bg-light d-flex align-items-center justify-content-center me-3"
                          style={{ width: "40px", height: "40px" }}
                        >
                          <MdPerson className="text-secondary" size={24} />
                        </div>
                        <div>
                          <div className="fw-semibold">{user.name}</div>
                          <small className="text-muted">{user.email}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <Badge bg={getRoleVariant(user.role)} className="p-2 text-capitalize">
                        {user.role}
                      </Badge>
                    </td>
                    <td>
                      <Badge bg={getStatusVariant(user.status)} className="p-2">
                        {user.status}
                      </Badge>
                    </td>
                    {/* <td>
                      <small>{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "—"}</small>
                    </td> */}
                    <td>
                      {/* <div className="d-flex justify-content-center gap-2">
                        <Button as={Link} to={`/users/${user.id}/edit`} variant="outline-primary" size="sm">
                          <MdEdit size={16} />
                        </Button>
                        <Button variant="outline-danger" size="sm">
                          <MdDelete size={16} />
                        </Button>
                      </div> */}

                      <div className="d-flex justify-content-center gap-2">
                        <Button as={Link} to={`/users/${user.id}/edit`} variant="outline-primary" size="sm">
                          <MdEdit size={16} />
                        </Button>

                        <Button variant="outline-danger" size="sm">
                          <MdDelete size={16} />
                        </Button>

                        <Button
                          variant={user.isActive ? "outline-success" : "outline-secondary"}
                          size="sm"
                          onClick={() => handleToggleActive(user.id, user.isActive)}
                          title={user.isActive ? "Deactivate User" : "Activate User"}
                        >
                          {user.isActive ? <MdToggleOn size={18} /> : <MdToggleOff size={18} />}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>

        {/* Footer with Pagination */}
        <Card.Footer className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
          <small className="text-muted">
            Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} users
          </small>
          <Pagination
            current={pagination.page}
            total={pagination.total}
            limit={pagination.limit}
            onChange={(page) => setPagination((prev) => ({ ...prev, page }))}
            darkMode={darkMode}
          />
        </Card.Footer>
      </Card>
    </Container>
  )
}

export default UserList
