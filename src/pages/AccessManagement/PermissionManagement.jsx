// src\pages\AccessManagement\PermissionManagement.jsx
"use client"

import { useState, useEffect } from "react"
import { Container, Row, Col, Card, Table, Badge, Button, Form, Modal } from "react-bootstrap"
import { MdAdd, MdEdit, MdDelete, MdSave, MdCancel, MdSecurity } from "react-icons/md"

const PermissionManagement = () => {
  const [permissions, setPermissions] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingPermission, setEditingPermission] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    isSystem: false,
  })

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setCategories([
        { id: "content", name: "Content Management", color: "primary" },
        { id: "users", name: "User Management", color: "success" },
        { id: "system", name: "System Administration", color: "danger" },
        { id: "analytics", name: "Analytics & Reports", color: "info" },
      ])

      setPermissions([
        {
          id: 1,
          name: "read",
          displayName: "Read Content",
          description: "View and read all content and data",
          category: "content",
          isSystem: true,
          usedInRoles: 4,
        },
        {
          id: 2,
          name: "write",
          displayName: "Write Content",
          description: "Create and edit content",
          category: "content",
          isSystem: true,
          usedInRoles: 3,
        },
        {
          id: 3,
          name: "delete",
          displayName: "Delete Content",
          description: "Delete content and data",
          category: "content",
          isSystem: true,
          usedInRoles: 2,
        },
        {
          id: 4,
          name: "manage_users",
          displayName: "Manage Users",
          description: "Add, edit, and remove users",
          category: "users",
          isSystem: true,
          usedInRoles: 2,
        },
        {
          id: 5,
          name: "manage_settings",
          displayName: "Manage Settings",
          description: "Configure system settings",
          category: "system",
          isSystem: true,
          usedInRoles: 1,
        },
        {
          id: 6,
          name: "view_analytics",
          displayName: "View Analytics",
          description: "Access analytics and reports",
          category: "analytics",
          isSystem: false,
          usedInRoles: 3,
        },
        {
          id: 7,
          name: "export_data",
          displayName: "Export Data",
          description: "Export system data in various formats",
          category: "analytics",
          isSystem: false,
          usedInRoles: 2,
        },
        {
          id: 8,
          name: "manage_roles",
          displayName: "Manage Roles",
          description: "Create and modify user roles",
          category: "system",
          isSystem: true,
          usedInRoles: 1,
        },
      ])

      setLoading(false)
    }, 1000)
  }, [])

  const handleCreatePermission = () => {
    setEditingPermission(null)
    setFormData({ name: "", description: "", category: "", isSystem: false })
    setShowModal(true)
  }

  const handleEditPermission = (permission) => {
    setEditingPermission(permission)
    setFormData({
      name: permission.displayName,
      description: permission.description,
      category: permission.category,
      isSystem: permission.isSystem,
    })
    setShowModal(true)
  }

  const handleSavePermission = () => {
    if (editingPermission) {
      // Update existing permission
      setPermissions(
        permissions.map((permission) =>
          permission.id === editingPermission.id
            ? {
                ...permission,
                displayName: formData.name,
                description: formData.description,
                category: formData.category,
              }
            : permission,
        ),
      )
    } else {
      // Create new permission
      const newPermission = {
        id: Date.now(),
        name: formData.name.toLowerCase().replace(/\s+/g, "_"),
        displayName: formData.name,
        description: formData.description,
        category: formData.category,
        isSystem: false,
        usedInRoles: 0,
      }
      setPermissions([...permissions, newPermission])
    }
    setShowModal(false)
  }

  const handleDeletePermission = (permissionId) => {
    if (window.confirm("Are you sure you want to delete this permission?")) {
      setPermissions(permissions.filter((permission) => permission.id !== permissionId))
    }
  }

  const getCategoryInfo = (categoryId) => {
    return categories.find((cat) => cat.id === categoryId) || { name: "Unknown", color: "secondary" }
  }

  const getPermissionsByCategory = (categoryId) => {
    return permissions.filter((permission) => permission.category === categoryId)
  }

  if (loading) {
    return (
      <Container fluid className="py-4">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading permissions...</p>
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
              <h1 className="h3 mb-1">Permission Management</h1>
              <p className="text-muted mb-0">Manage system permissions and access controls</p>
            </div>
            <Button variant="primary" onClick={handleCreatePermission}>
              <MdAdd className="me-2" />
              Create Permission
            </Button>
          </div>
        </Col>
      </Row>

      {/* Permission Categories */}
      <Row className="g-4 mb-4">
        {categories.map((category) => (
          <Col key={category.id} xs={12} sm={6} lg={3}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="text-center">
                <div className={`text-${category.color} mb-2`}>
                  <MdSecurity size={32} />
                </div>
                <h5 className="mb-1">{category.name}</h5>
                <p className="text-muted mb-2">{getPermissionsByCategory(category.id).length} permissions</p>
                <Badge bg={category.color}>{category.id}</Badge>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Permissions by Category */}
      {categories.map((category) => {
        const categoryPermissions = getPermissionsByCategory(category.id)
        if (categoryPermissions.length === 0) return null

        return (
          <Card key={category.id} className="mb-4 border-0 shadow-sm">
            <Card.Header className="bg-transparent">
              <div className="d-flex align-items-center">
                <Badge bg={category.color} className="me-2">
                  {category.name}
                </Badge>
                <span className="text-muted">({categoryPermissions.length} permissions)</span>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table hover className="mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Permission</th>
                      <th>Description</th>
                      <th>Used in Roles</th>
                      <th>Type</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryPermissions.map((permission) => (
                      <tr key={permission.id}>
                        <td>
                          <div>
                            <div className="fw-medium">{permission.displayName}</div>
                            <small className="text-muted font-monospace">{permission.name}</small>
                          </div>
                        </td>
                        <td>{permission.description}</td>
                        <td>
                          <Badge bg="primary">{permission.usedInRoles} roles</Badge>
                        </td>
                        <td>
                          {permission.isSystem ? (
                            <Badge bg="warning">System</Badge>
                          ) : (
                            <Badge bg="secondary">Custom</Badge>
                          )}
                        </td>
                        <td>
                          <div className="d-flex justify-content-center gap-1">
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() => handleEditPermission(permission)}
                              disabled={permission.isSystem}
                            >
                              <MdEdit />
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => handleDeletePermission(permission.id)}
                              disabled={permission.isSystem || permission.usedInRoles > 0}
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
          </Card>
        )
      })}

      {/* Create/Edit Permission Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingPermission ? "Edit Permission" : "Create New Permission"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Permission Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter permission name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter permission description"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            <MdCancel className="me-2" />
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSavePermission}>
            <MdSave className="me-2" />
            {editingPermission ? "Update Permission" : "Create Permission"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default PermissionManagement
