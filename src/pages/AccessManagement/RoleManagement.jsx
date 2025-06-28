// src\pages\AccessManagement\RoleManagement.jsx

"use client"

import { useState, useEffect } from "react"
import { Container, Row, Col, Card, Table, Badge, Button, Form, Modal } from "react-bootstrap"
import { MdAdd, MdEdit, MdDelete, MdSave, MdCancel } from "react-icons/md"
import Pagination from "../../components/Pagination/Pagination.jsx"

const RoleManagement = () => {
  const [roles, setRoles] = useState([])
  const [permissions, setPermissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingRole, setEditingRole] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    permissions: [],
  })
  const [pagination, setPagination] = useState({ page: 1, limit: 2, total: 0 })

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      const loadedRoles = [
        {
          id: 1,
          name: "Super Admin",
          description: "Full system access with all permissions",
          permissions: ["read", "write", "delete", "manage_users", "manage_settings", "manage_roles"],
          userCount: 1,
          isSystem: true,
        },
        {
          id: 2,
          name: "Admin",
          description: "Administrative access to most features",
          permissions: ["read", "write", "delete", "manage_users"],
          userCount: 2,
          isSystem: false,
        },
        {
          id: 3,
          name: "Editor",
          description: "Can create and edit content",
          permissions: ["read", "write"],
          userCount: 5,
          isSystem: false,
        },
        {
          id: 4,
          name: "Viewer",
          description: "Read-only access to content",
          permissions: ["read"],
          userCount: 12,
          isSystem: false,
        },
      ]
  
      setRoles(loadedRoles)
      setPagination((prev) => ({ ...prev, total: loadedRoles.length }))
  
      setPermissions([
        { id: "read", name: "Read", description: "View content and data" },
        { id: "write", name: "Write", description: "Create and edit content" },
        { id: "delete", name: "Delete", description: "Delete content and data" },
        { id: "manage_users", name: "Manage Users", description: "Add, edit, and remove users" },
        { id: "manage_settings", name: "Manage Settings", description: "Configure system settings" },
        { id: "manage_roles", name: "Manage Roles", description: "Create and modify user roles" },
        { id: "view_analytics", name: "View Analytics", description: "Access analytics and reports" },
        { id: "export_data", name: "Export Data", description: "Export system data" },
      ])
  
      setLoading(false)
    }, 1000)
  }, [])
  

  const handleCreateRole = () => {
    setEditingRole(null)
    setFormData({ name: "", description: "", permissions: [] })
    setShowModal(true)
  }

  const handleEditRole = (role) => {
    setEditingRole(role)
    setFormData({
      name: role.name,
      description: role.description,
      permissions: role.permissions,
    })
    setShowModal(true)
  }

  const handleSaveRole = () => {
    if (editingRole) {
      // Update existing role
      setRoles(
        roles.map((role) =>
          role.id === editingRole.id
            ? { ...role, name: formData.name, description: formData.description, permissions: formData.permissions }
            : role,
        ),
      )
    } else {
      // Create new role
      const newRole = {
        id: Date.now(),
        name: formData.name,
        description: formData.description,
        permissions: formData.permissions,
        userCount: 0,
        isSystem: false,
      }
      setRoles([...roles, newRole])
    }
    setShowModal(false)
  }

  const handleDeleteRole = (roleId) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      setRoles(roles.filter((role) => role.id !== roleId))
    }
  }

  const handlePermissionChange = (permissionId, checked) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        permissions: [...prev.permissions, permissionId],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        permissions: prev.permissions.filter((p) => p !== permissionId),
      }))
    }
  }

  if (loading) {
    return (
      <Container fluid className="py-4">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading roles...</p>
        </div>
      </Container>
    )
  }

  const paginatedRoles = roles.slice(
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
              <h1 className="h3 mb-1">Role Management</h1>
              <p className="text-muted mb-0">Create and manage user roles and permissions</p>
            </div>
            <Button variant="primary" onClick={handleCreateRole}>
              <MdAdd className="me-2" />
              Create Role
            </Button>
          </div>
        </Col>
      </Row>

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
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedRoles.map((role) => (
                  <tr key={role.id}>
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
                    <td>{role.description}</td>
                    <td>
                      <div className="d-flex flex-wrap gap-1">
                        {role.permissions.slice(0, 3).map((permission) => (
                          <Badge key={permission} bg="secondary" className="small">
                            {permission.replace("_", " ")}
                          </Badge>
                        ))}
                        {role.permissions.length > 3 && (
                          <Badge bg="light" text="dark" className="small">
                            +{role.permissions.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td>
                      <Badge bg="primary">{role.userCount}</Badge>
                    </td>
                    <td>
                      <div className="d-flex justify-content-center gap-1">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleEditRole(role)}
                          disabled={role.isSystem}
                        >
                          <MdEdit />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDeleteRole(role.id)}
                          disabled={role.isSystem || role.userCount > 0}
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
            onChange={(page) => setPagination((prev) => ({ ...prev, page }))}
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
                  <Form.Control
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter role name"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter role description"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Permissions</Form.Label>
              <div className="permission-grid">
                {permissions.map((permission) => (
                  <Card key={permission.id} className="permission-card">
                    <Card.Body className="p-3">
                      <Form.Check
                        type="checkbox"
                        id={`permission-${permission.id}`}
                        label={permission.name}
                        checked={formData.permissions.includes(permission.id)}
                        onChange={(e) => handlePermissionChange(permission.id, e.target.checked)}
                        className="mb-2"
                      />
                      <small className="text-muted">{permission.description}</small>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            <MdCancel className="me-2" />
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveRole}>
            <MdSave className="me-2" />
            {editingRole ? "Update Role" : "Create Role"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default RoleManagement
