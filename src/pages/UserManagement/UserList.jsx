// // src\pages\UserManagement\UserList.jsx

// "use client"

// import { useState, useEffect } from "react"
// import { Link } from "react-router-dom"
// import { Container, Row, Col, Table, Badge, Button, InputGroup, Form, Card } from "react-bootstrap"
// import { MdEdit, MdDelete, MdSearch, MdAdd, MdPerson, MdToggleOn, MdToggleOff } from "react-icons/md"
// import Pagination from "../../components/Pagination/Pagination.jsx"
// import axiosInstance from "../../api/axiosInstance.js"

// const UserList = ({ darkMode }) => {
//   const [users, setUsers] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [filters, setFilters] = useState({
//     role: "",
//     status: "",
//   })
//   const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });
//   useEffect(() => {
//     fetchUsers();
//   }, [searchTerm, filters, pagination.page]);

//   const fetchUsers = async () => {
//     setLoading(true);
//     // console.log("📱 [MOBILE DEBUG] token from localStorage:", localStorage.getItem("accessToken"));

//     try {
//       const response = await axiosInstance.get("/users", {
//         params: {
//           page: pagination.page,
//           limit: pagination.limit,
//           search: searchTerm,
//           role: filters.role,
//           active: filters.status === "Active" ? "true" : filters.status === "Inactive" ? "false" : undefined,
//         },
//       });

//       // console.log("🔍 API Response:", response);

//       const { users, total, page: currentPage } = response.data;

//       // Map over users and assign status based on isActive
//       const processedUsers = users.map((user) => ({
//         ...user,
//         status: user.isActive ? "Active" : "Inactive",
//       }));

//       setUsers(processedUsers);
//       setPagination((prev) => ({
//         ...prev,
//         page: currentPage,
//         total: total,
//       }));
//     } catch (error) {

//       console.error("Failed to fetch users", error);
//       console.log("❌ API error on mobile:", error?.response?.status, error?.response?.data);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getRoleVariant = (role) => {
//     switch (role) {
//       case "Admin":
//         return "primary"
//       case "Editor":
//         return "success"
//       case "Viewer":
//         return "secondary"
//       default:
//         return "secondary"
//     }
//   }

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

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target
//     setFilters((prev) => ({ ...prev, [name]: value }))
//   }

//   if (loading) {
//     return <div className="text-center py-4">Loading users...</div>
//   }

//   const handleToggleActive = async (userId, currentStatus) => {
//     try {
//       const response = await axiosInstance.put(`/users/${userId}/toggle-active`, {
//         isActive: !currentStatus,
//       });

//       // Refetch users or optimistically update the state
//       fetchUsers();
//     } catch (error) {
//       console.error("Failed to toggle user status", error);
//     }
//   };

//   return (
//     <Container fluid className="py-4">
//       {/* Header */}
//       <Row className="mb-4">
//         <Col xs={12}>
//           <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
//             <h1 className="h4 mb-0">User Management</h1>
//             <Button as={Link} to="/app/users/form" variant="primary" className="ms-md-auto">
//               <MdAdd className="me-2" />
//               Create User
//             </Button>
//           </div>
//         </Col>
//       </Row>

//       {/* Filters */}
//       <Card className="mb-4">
//         <Card.Body>
//           <Row className="g-3">
//             <Col xs={12} md={4}>
//               <InputGroup>
//                 <InputGroup.Text>
//                   <MdSearch />
//                 </InputGroup.Text>
//                 <Form.Control
//                   type="text"
//                   placeholder="Search users..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </InputGroup>
//             </Col>
//             <Col xs={12} md={4}>
//               <Form.Select name="role" value={filters.role} onChange={handleFilterChange}>
//                 <option value="">All Roles</option>
//                 <option value="admin">Admin</option>
//                 <option value="company">Company</option>
//                 <option value="user">User</option>
//               </Form.Select>
//             </Col>
//             <Col xs={12} md={4}>
//               <Form.Select name="status" value={filters.status} onChange={handleFilterChange}>
//                 <option value="">All Statuses</option>
//                 <option value="active">Active</option>
//                 <option value="inactive">Inactive</option>
//                 <option value="pending">Pending</option>
//               </Form.Select>
//             </Col>
//           </Row>
//         </Card.Body>
//       </Card>

//       {/* Users Table */}
//       <Card>
//         <Card.Body className="p-0">
//           <div className="table-responsive">
//             <Table responsive="md" hover className="mb-0 align-middle text-nowrap">
//               <thead className="table-light">
//                 <tr>
//                   <th>User</th>
//                   <th>Role</th>
//                   <th>Status</th>
//                   {/* <th>Last Login</th> */}
//                   <th className="text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.map((user) => (
//                   <tr key={user._id}>
//                     <td>
//                       <div className="d-flex align-items-center">
//                         <div
//                           className="rounded-circle bg-light d-flex align-items-center justify-content-center me-3"
//                           style={{ width: "40px", height: "40px" }}
//                         >
//                           <MdPerson className="text-secondary" size={24} />
//                         </div>
//                         <div>
//                           <div className="fw-semibold">{user.name}</div>
//                           <small className="text-muted">{user.email}</small>
//                         </div>
//                       </div>
//                     </td>
//                     <td>
//                       <Badge bg={getRoleVariant(user.role)} className="p-2 text-capitalize">
//                         {user.role}
//                       </Badge>
//                     </td>
//                     <td>
//                       <Badge bg={getStatusVariant(user.status)} className="p-2">
//                         {user.status}
//                       </Badge>
//                     </td>
//                     {/* <td>
//                       <small>{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "—"}</small>
//                     </td> */}
//                     <td>
//                       {/* <div className="d-flex justify-content-center gap-2">
//                         <Button as={Link} to={`/users/${user.id}/edit`} variant="outline-primary" size="sm">
//                           <MdEdit size={16} />
//                         </Button>
//                         <Button variant="outline-danger" size="sm">
//                           <MdDelete size={16} />
//                         </Button>
//                       </div> */}

//                       <div className="d-flex justify-content-center gap-2">
//                         <Button as={Link} to={`/users/${user.id}/edit`} variant="outline-primary" size="sm">
//                           <MdEdit size={16} />
//                         </Button>

//                         <Button variant="outline-danger" size="sm">
//                           <MdDelete size={16} />
//                         </Button>

//                         <Button
//                           variant={user.isActive ? "outline-success" : "outline-secondary"}
//                           size="sm"
//                           onClick={() => handleToggleActive(user.id, user.isActive)}
//                           title={user.isActive ? "Deactivate User" : "Activate User"}
//                         >
//                           {user.isActive ? <MdToggleOn size={18} /> : <MdToggleOff size={18} />}
//                         </Button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           </div>
//         </Card.Body>

//         {/* Footer with Pagination */}
//         <Card.Footer className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
//           <small className="text-muted">
//             Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
//             {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} users
//           </small>
//           <Pagination
//             current={pagination.page}
//             total={pagination.total}
//             limit={pagination.limit}
//             onChange={(page) => setPagination((prev) => ({ ...prev, page }))}
//             darkMode={darkMode}
//           />
//         </Card.Footer>
//       </Card>
//     </Container>
//   )
// }

// export default UserList

// src/pages/UserManagement/UserList.jsx

"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  Container,
  Row,
  Col,
  Table,
  Badge,
  Button,
  InputGroup,
  Form,
  Card,
  Spinner,
} from "react-bootstrap"
import {
  MdEdit,
  MdDelete,
  MdSearch,
  MdAdd,
  MdPerson,
  MdToggleOn,
  MdToggleOff,
  MdPictureAsPdf,
  MdEmail,
} from "react-icons/md"
import Pagination from "../../components/Pagination/Pagination.jsx"
import axiosInstance, { deleteUserById, exportUserPDF, sendUserNotification, toggleUserActiveStatus } from "../../api/axiosInstance.js"
import { capitalize } from "../../utilities/capitalize.jsx"
import EmailModal from "../../components/Modal/EmailModal.jsx";
import { toast } from "react-toastify";
import Swal from "sweetalert2"

const UserList = ({ darkMode }) => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [currentUserId, setCurrentUserId] = useState(null);
  const [filters, setFilters] = useState({
    role: "",
    status: "",
  })
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 })
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setDebouncedSearch(searchTerm)
    }, 500) // 0.5s delay
    return () => clearTimeout(delayDebounce)
  }, [searchTerm])

  useEffect(() => {
    fetchUsers()
  }, [debouncedSearch, filters, pagination.page])

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("authUser"));
    setCurrentUserId(loggedInUser?._id || null);
  }, []);

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get("/users", {
        params: {
          page: pagination.page,
          limit: pagination.limit,
          search: debouncedSearch,
          role: filters.role,
          active:
            filters.status === "active"
              ? "true"
              : filters.status === "inactive"
                ? "false"
                : undefined,
        },
      })

      const { users, total, page: currentPage } = response.data

      const processedUsers = users.map((user) => ({
        ...user,
        status: user.isActive ? "Active" : "Inactive",
      }))

      setUsers(processedUsers)
      setPagination((prev) => ({ ...prev, page: currentPage, total }))
    } catch (error) {
      console.error("Failed to fetch users", error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  // const handleDeleteUser = async (userId) => {
  //   const result = await Swal.fire({
  //     title: "Are you sure?",
  //     text: "This user will be marked as deleted!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#d33",
  //     cancelButtonColor: "#3085d6",
  //     confirmButtonText: "Yes, delete it!",
  //   });

  //   if (result.isConfirmed) {
  //     try {
  //       const res = await deleteUserById(userId);

  //       setUsers((prev) => prev.filter((user) => user._id !== userId));

  //       toast.success(res.data.message || "User deleted successfully");

  //       // Optional: show sweetalert success
  //       Swal.fire("Deleted!", "User has been deleted.", "success");
  //     } catch (error) {
  //       toast.error(
  //         error.response?.data?.message || "Failed to delete user"
  //       );
  //     }
  //   }
  // };

  const handleDeleteUser = async (userId) => {
    const currentUserId = JSON.parse(localStorage.getItem("authUser"))?._id;

    console.log(currentUserId)

    if (userId === currentUserId) {
      Swal.fire({
        icon: "error",
        title: "Action Forbidden",
        text: "You cannot delete your own account!",
      });
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be marked as deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await deleteUserById(userId);

        setUsers((prev) => prev.filter((user) => user._id !== userId));

        toast.success(res.data.message || "User deleted successfully");

        Swal.fire("Deleted!", "User has been deleted.", "success");
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to delete user"
        );
      }
    }
  };

  const handleToggleActive = async (userId, currentStatus) => {
    try {
      const res = await toggleUserActiveStatus(userId);

      setUsers((prev) =>
        prev.map((user) =>
          user._id === userId // <-- Fixed here
            ? {
              ...user,
              isActive: !currentStatus,
              status: !currentStatus ? "Active" : "Inactive",
            }
            : user
        )
      );

      toast.success(res.data.message || "User status updated");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update user status"
      );
    }
  };

  const getRoleVariant = (role) => {
    const map = {
      Admin: "primary",
      Company: "info",
      User: "dark",
    }
    return map[role] || "secondary"
  }

  const getStatusVariant = (status) => {
    const map = {
      Active: "success",
      Inactive: "danger",
      Pending: "warning",
    }
    return map[status] || "secondary"
  }

  const handleOpenEmailModal = (id, email) => {
    setSelectedEmail(email);
    setSelectedUserId(id);
    setShowEmailModal(true);
  };

  const handleSendEmail = async () => {
    if (!emailSubject.trim() || !emailMessage.trim()) {
      Swal.fire("Error", "Please fill out both subject and message.", "error");
      return;
    }

    setSending(true);

    try {
      await sendUserNotification(selectedUserId, emailSubject, emailMessage); // You should have `selectedUserId` in state

      Swal.fire("Success", "Email sent successfully!", "success");

      setShowEmailModal(false);
      setEmailSubject("");
      setEmailMessage("");
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Failed to send email", "error");
    } finally {
      setSending(false);
    }
  };


  const handleExport = async (userId) => {
    try {
      const response = await exportUserPDF(userId);

      const blob = new Blob([response.data], { type: response.headers["content-type"] });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `user-${userId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Export error", err);
    }
  };




  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <h1 className="h4 mb-0">User Management</h1>
            <Button as={Link} to="/app/users/form" variant="primary">
              <MdAdd className="me-2" /> Create User
            </Button>
          </div>
        </Col>
      </Row>

      {/* Filters */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Row className="g-3">
            <Col md>
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
            <Col md>
              <Form.Select name="role" value={filters.role} onChange={handleFilterChange}>
                <option value="">All Roles</option>
                {/* <option value="admin">Admin</option> */}
                <option value="company">Company</option>
                <option value="user">User</option>
              </Form.Select>
            </Col>
            <Col md>
              <Form.Select name="status" value={filters.status} onChange={handleFilterChange}>
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                {/* <option value="pending">Pending</option> */}
              </Form.Select>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Table */}
      <Card className="shadow-sm">
        <Card.Body className="p-0">
          {loading ? (
            <div className="text-center p-4">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <div className="table-responsive">
              <Table hover className="mb-0 text-nowrap align-middle">
                <thead className="bg-light text-dark text-uppercase">
                  <tr>
                    <th>User</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-top">
                      <td>
                        <div className="d-flex align-items-center">
                          <div
                            className="rounded-circle bg-light d-flex align-items-center justify-content-center me-3"
                            style={{ width: 42, height: 42 }}
                          >
                            <MdPerson size={22} className="text-muted" />
                          </div>
                          <div>
                            <div className="fw-semibold text-truncate" style={{ maxWidth: 150 }}>{user.name}</div>
                            <small className="text-muted text-truncate d-block" style={{ maxWidth: 200 }}>{user.email}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <Badge bg={getRoleVariant(user.role)} className="px-3 py-2">
                          {capitalize(user.role)}
                        </Badge>
                      </td>
                      <td>
                        <Badge bg={user.status === "Active" ? "success" : "secondary"} className="px-3 py-2">
                          {user.status}
                        </Badge>
                      </td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center gap-2">
                          <Button as={Link} to={`/app/users/${user._id}/edit`} size="sm" variant="outline-primary">
                            <MdEdit />
                          </Button>
                          <Button size="sm" variant="outline-danger" onClick={() => handleDeleteUser(user._id)} disabled={user._id === currentUserId || user.role === "admin"}
                            title={user._id === currentUserId ? "You can't delete your own account" : "Delete user"}>
                            <MdDelete />
                          </Button>
                          <Button
                            variant={user.isActive ? "outline-success" : "outline-secondary"}
                            size="sm"
                            className="me-2"
                            disabled={user._id === currentUserId || user.role === "admin"}
                            onClick={() => handleToggleActive(user._id, user.isActive)}
                          >
                            {user.isActive ? <MdToggleOn size={20} /> : <MdToggleOff size={20} />}
                          </Button>
                          <Button variant="outline-secondary" onClick={() => handleExport(user._id)}>
                            <MdPictureAsPdf className="" />
                          </Button>
                          <Button
                            variant="outline-info"
                            size="sm"
                            onClick={() => handleOpenEmailModal(user._id, user.email)}
                            title={`Send email to ${user.email}`}>
                            <MdEmail />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>

        <Card.Footer className="d-flex flex-column flex-md-row justify-content-between align-items-center px-3 py-2">
          <small className="text-muted">
            Showing {(pagination.page - 1) * pagination.limit + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} users
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
      <EmailModal
        show={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        onSend={handleSendEmail}
        subject={emailSubject}
        setSubject={setEmailSubject}
        message={emailMessage}
        setMessage={setEmailMessage}
        recipientEmail={selectedEmail}
        sending={sending}
      />
    </Container>
  )
}

export default UserList
