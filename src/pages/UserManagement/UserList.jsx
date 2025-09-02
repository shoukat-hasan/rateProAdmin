// // src\pages\UserManagement\UserList.jsx
"use client"

import { useState, useEffect, useRef } from "react"
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
  Modal,
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
  MdCloudUpload,
} from "react-icons/md"
import Pagination from "../../components/Pagination/Pagination.jsx"
import axiosInstance, { deleteUserById, exportUserPDF, sendUserNotification, toggleUserActiveStatus } from "../../api/axiosInstance.js"
import { capitalize } from "../../utilities/capitalize.jsx"
import EmailModal from "../../components/Modal/EmailModal.jsx"
import { toast } from "react-toastify"
import Swal from "sweetalert2"
import { useAuth } from "../../context/AuthContext.jsx"

const UserList = ({ darkMode }) => {
  const { user: currentUser, hasPermission, globalLoading, setGlobalLoading } = useAuth();
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [currentUserId, setCurrentUserId] = useState(null)
  const [filters, setFilters] = useState({
    role: "",
    status: "",
  })
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 })
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [emailSubject, setEmailSubject] = useState("")
  const [emailMessage, setEmailMessage] = useState("")
  const [selectedEmail, setSelectedEmail] = useState("")
  const [sending, setSending] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState("")
  const [show, setShow] = useState(false);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  // const { loading: authLoading } = useAuth(); 

  const isMember = currentUser?.role === "member";

  const memberCanCreate = !isMember || hasPermission("user:create");
  const memberCanUpdate = !isMember || hasPermission("user:update");
  const memberCanDelete = !isMember || hasPermission("user:delete");
  const memberCanAssign = !isMember || hasPermission("user:assign");
  const memberCanRead = !isMember || hasPermission("user:read");
  const memberCanToggle = !isMember || hasPermission("user:toggle");
  const memberCanExport = !isMember || hasPermission("user:export");
  const memberCanNotify = !isMember || hasPermission("user:notify");
  const memberCanUpload = !isMember || hasPermission("user:mass-upload");
  const memberCanDownload = !isMember || hasPermission("user:file-template");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setDebouncedSearch(searchTerm)
    }, 500)
    return () => clearTimeout(delayDebounce)
  }, [searchTerm])

  useEffect(() => {
    fetchUsers()
  }, [debouncedSearch, filters.role, filters.status, pagination.page])

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("authUser"))
    setCurrentUserId(loggedInUser?._id || null)
  }, [])

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

      const authUser = JSON.parse(localStorage.getItem("authUser"))
      const loggedInUserId = authUser?._id
      const loggedInUserRole = authUser?.role?.toLowerCase();
      const processedUsers = users
        .filter((user) => {
          // Exclude the logged-in user
          if (user._id === loggedInUserId) return false;
          // If logged-in user is a member, exclude admin and companyAdmin roles
          if (loggedInUserRole === "member") {
            return !["admin", "companyAdmin"].includes(user.role);
          }
          return true;
        }).map((user) => ({
          ...user,
          status: user.isActive ? "Active" : "Inactive",
          companyName: user.tenant?.name || "-",
        }))

      setUsers(processedUsers)
      setPagination((prev) => ({ ...prev, page: currentPage, total }))
    } catch (error) {
      console.error("Failed to fetch users", error)
      toast.error(error.response?.data?.message || "Failed to fetch users")
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
    setPagination((prev) => ({ ...prev, page: 1 }))
  }

  const handleDeleteUser = async (userId) => {
    if (userId === currentUserId) {
      Swal.fire({
        icon: "error",
        title: "Action Forbidden",
        text: "You cannot delete your own account!",
      })
      return
    }

    // 🔹 User ko list se find karo
    const targetUser = users.find((u) => u._id === userId)
    const targetUserRole = targetUser?.role || "member" // fallback safe

    const getDeleteMessage = (role) => {
      if (role === "member") {
        return "This user will be deleted!"
      }
      if (role === "companyAdmin") {
        return "This company admin and all associated members will be deleted!"
      }
      return "This user and associated members will be deleted!"
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: getDeleteMessage(targetUserRole), // ✅ ab role available hai
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    })

    if (result.isConfirmed) {
      try {
        const res = await deleteUserById(userId)
        const { deletedUserId, affectedUsers, deletedUserRole } = res.data

        setUsers((prev) =>
          prev.filter(
            (user) => user._id !== deletedUserId && !affectedUsers.includes(user._id)
          )
        )
        setPagination((prev) => ({
          ...prev,
          total: prev.total - (1 + affectedUsers.length),
        }))
        if (users.length === 1 && pagination.page > 1) {
          setPagination((prev) => ({ ...prev, page: prev.page - 1 }))
        }

        // ✅ role based success message
        if (deletedUserRole === "member") {
          toast.success("User deleted successfully")
          Swal.fire("Deleted!", "User has been deleted.", "success")
        } else {
          toast.success(res.data.message || "User and associated members deleted successfully")
          Swal.fire("Deleted!", "User and associated members have been deleted.", "success")
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to delete user")
      }
    }
  }

  const handleToggleActive = async (userId, currentStatus) => {
    try {
      const res = await toggleUserActiveStatus(userId)
      const { updatedUser, affectedUsers } = res.data
      setUsers((prev) =>
        prev.map((user) => {
          if (user._id === updatedUser._id) {
            return {
              ...user,
              isActive: updatedUser.isActive,
              status: updatedUser.isActive ? "Active" : "Inactive",
            }
          }
          const affected = affectedUsers.find((u) => u._id === user._id)
          if (affected) {
            return {
              ...user,
              isActive: affected.isActive,
              status: affected.isActive ? "Active" : "Inactive",
            }
          }
          return user
        })
      )
      toast.success(res.data.message || "User status updated")
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update user status")
    }
  }

  const getRoleVariant = (role) => {
    const map = {
      admin: "primary",
      companyAdmin: "info",
      member: "dark",
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
    setSelectedEmail(email)
    setSelectedUserId(id)
    setShowEmailModal(true)
  }

  const handleSendEmail = async () => {
    if (!emailSubject.trim() || !emailMessage.trim()) {
      Swal.fire("Error", "Please fill out both subject and message.", "error")
      return
    }

    setSending(true)
    try {
      await sendUserNotification(selectedUserId, emailSubject, emailMessage)
      Swal.fire("Success", "Email sent successfully!", "success")
      setShowEmailModal(false)
      setEmailSubject("")
      setEmailMessage("")
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Failed to send email", "error")
    } finally {
      setSending(false)
    }
  }

  const handleExport = async (userId) => {
    try {
      const response = await exportUserPDF(userId)
      const blob = new Blob([response.data], { type: response.headers["content-type"] })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", `user-${userId}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (err) {
      console.error("Export error", err)
      toast.error("Failed to export user PDF")
    }
  }

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setFile(null);
    setShow(false);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async (file) => {
    if (!file) return alert("Please select a file first!");
    const formData = new FormData();
    formData.append("excel", file);

    console.log("📤 Uploading file:", file.name, file.type, file.size);

    try {
      console.log("👉 setGlobalLoading(true) chal raha hai");
      setGlobalLoading(true); // 👈 loader start

      const res = await axiosInstance.post("/users/bulk-upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      console.log("✅ API Response aya:", res.data);
      const { createdUsers = [], errors: rawErrors, message } = res.data;

      const errors = rawErrors || []; // null protection

      const successCount = createdUsers.length;
      const errorCount = errors.length;


      // 🟢 summary HTML
      const summaryHtml = `
        <p><b>${successCount}</b> user(s) created successfully.</p>
        ${successCount > 0 ? "<ul>" + createdUsers.map(u => `<li>${u.email}</li>`).join("") + "</ul>" : ""}

        <p><b>${errorCount}</b> user(s) failed to create.</p>
        ${errorCount > 0 ? "<ul>" + errors.map(e => `<li>${e.email} - ${e.message}</li>`).join("") + "</ul>" : ""}
      `;

      Swal.fire({
        icon: errorCount > 0 ? "warning" : "success",
        title: message || "Bulk user creation processed",
        html: summaryHtml,
        width: 600,
      });

      await fetchUsers(); // 👈 refresh users list
      handleClose();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: err.response?.data?.message || "Something went wrong while importing users.",
      });
      console.error("❌ Upload error:", err.response?.data || err.message);
    } finally {
      console.log("👉 setGlobalLoading(false) chal raha hai");
      setGlobalLoading(false); // 👈 loader stop
    }
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   console.log("📂 File selected:", file?.name);

  //   if (file) handleFileUpload(file);
  // };

  const handleNoPermission = (action = "perform this action") => {
    Swal.fire({
      icon: "error",
      title: "Access Denied",
      text: `You don't have permission to ${action}.`,
    });
  };

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <h1 className="h4 mb-0">User Management</h1>
            <div className="d-flex justify-content-between gap-2">
              {/* {currentUser?.role === "companyAdmin" && (
                <>
                  <a
                    href="/downloads/import-sample.xlsx"
                    download="import-sample.xlsx"
                    className="btn btn-outline-secondary"
                  >
                    📥 Download Sample
                  </a>
                </>
              )} */}
              {(currentUser?.role === "companyAdmin" || memberCanCreate) && (
                <Button as={Link} to="/app/users/form" variant="primary">
                  <MdAdd className="me-2" /> Create User
                </Button>
              )}
              {/* {currentUser?.role === "companyAdmin" && (
                <>
                  <Button
                    variant="primary"
                    onClick={handleButtonClick}
                    disabled={!memberCanUpdate}
                  >
                    <MdCloudUpload className="me-2" /> Import Data
                  </Button>

                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                </>
              )} */}

              {(currentUser?.role === "companyAdmin" || memberCanUpload) && (
                <>
                  <Button
                    variant="primary"
                    onClick={handleShow}
                    disabled={!memberCanUpdate}
                  >
                    <MdCloudUpload className="me-2" /> Import Data
                  </Button>
                </>
              )}

            </div>
          </div>
        </Col>
      </Row>

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
                <option value="companyAdmin">Company Admin</option>
                <option value="member">Member</option>
              </Form.Select>
            </Col>
            <Col md>
              <Form.Select name="status" value={filters.status} onChange={handleFilterChange}>
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Form.Select>
            </Col>
          </Row>
        </Card.Body>
      </Card>

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
                    {currentUser.role === "admin" && <th>Company Name</th>}
                    <th>Status</th>
                    <th>Email Verified</th>
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
                            {user.avatar?.url ? (
                              <img
                                src={user.avatar.url}
                                alt={user.name}
                                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "100%" }}
                              />
                            ) : (
                              <span className="text-uppercase fw-bold text-muted">
                                {user.name?.charAt(0)}
                              </span>
                            )}
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
                      {currentUser.role === "admin" && (
                        <td>{user.tenant?.name || "-"}</td>
                      )}
                      <td>
                        <Badge bg={user.status === "Active" ? "success" : "secondary"} className="px-3 py-2">
                          {user.status}
                        </Badge>
                      </td>
                      <td>
                        <Badge bg={user.isVerified ? "success" : "secondary"} className="px-3 py-2">
                          {user.isVerified ? "Verified" : "Not Verified"}
                        </Badge>
                      </td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center gap-2">
                          <Button as={Link} to={`/app/users/${user._id}/edit`} size="sm" variant="outline-primary" onClick={(e) => {
                            if (!memberCanUpdate) {
                              e.preventDefault();
                              handleNoPermission("update users");
                            }
                          }}>
                            <MdEdit />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() => {
                              if (!memberCanDelete || user._id === currentUserId || user.role === "admin") {
                                handleNoPermission("delete this user");
                              } else {
                                handleDeleteUser(user._id);
                              }
                            }}
                            title={user._id === currentUserId ? "You can't delete your own account" : "Delete user"}
                          >
                            <MdDelete />
                          </Button>
                          <Button
                            variant={user.isActive ? "outline-success" : "outline-secondary"}
                            size="sm"
                            className="me-2"
                            onClick={() => {
                              if (!memberCanToggle || user._id === currentUserId || user.role === "admin") {
                                handleNoPermission("toggle this user");
                              } else {
                                handleToggleActive(user._id, user.isActive);
                              }
                            }}
                          >
                            {user.isActive ? <MdToggleOn size={20} /> : <MdToggleOff size={20} />}
                          </Button>
                          <Button variant="outline-secondary" onClick={() => {
                            if (!memberCanExport) {
                              handleNoPermission("export users");
                            } else {
                              handleExport(user._id);
                            }
                          }}>
                            <MdPictureAsPdf />
                          </Button>
                          <Button
                            variant="outline-info"
                            size="sm"
                            onClick={() => {
                              if (!memberCanNotify) {
                                handleNoPermission("send notifications");
                              } else {
                                handleOpenEmailModal(user._id, user.email);
                              }
                            }}
                            title={`Send email to ${user.email}`}
                          >
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

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Import Contacts</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p className="text-center">Upload a .xlsx or .xls file with your contacts</p>
          <input
            className="w-100 border"
            type="file"
            accept=".xlsx,.xls"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <small className="text-muted">
            File should include columns: Name, Email, Phone, Company, Segment
          </small>
          {(currentUser?.role === "companyAdmin" || memberCanDownload) && (
            <div className="mt-3">
              <a
                href="/downloads/import-sample.xlsx"
                download="import-sample.xlsx"
                className="btn btn-outline-secondary"
              >
                📥 Download Template
              </a>
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={() => handleFileUpload(file)} disabled={!file}>
            Import Contacts
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default UserList;
