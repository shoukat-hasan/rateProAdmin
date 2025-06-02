



// src/pages/ContentManagement/Integrations.jsx
"use client"

import { useState, useEffect } from "react"
import { MdAdd, MdEdit, MdDelete, MdSave } from "react-icons/md"

const Integrations = () => {
  const [integrations, setIntegrations] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    apiKey: '',
    status: 'active'
  })

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setIntegrations([
        { id: 1, name: 'Google Analytics', apiKey: '*****', status: 'active' },
        { id: 2, name: 'Mailchimp', apiKey: '*****', status: 'inactive' }
      ])
      setLoading(false)
    }, 500)
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingId) {
      // Update existing integration
      setIntegrations(prev => prev.map(item => 
        item.id === editingId ? { ...item, ...formData } : item
      ))
    } else {
      // Add new integration
      setIntegrations(prev => [...prev, {
        id: Date.now(),
        ...formData
      }])
    }
    setEditingId(null)
    setFormData({ name: '', apiKey: '', status: 'active' })
  }

  const handleEdit = (integration) => {
    setEditingId(integration.id)
    setFormData({
      name: integration.name,
      apiKey: integration.apiKey,
      status: integration.status
    })
  }

  const handleDelete = (id) => {
    setIntegrations(prev => prev.filter(item => item.id !== id))
  }

  return (
    <div className="content-page">
      <div className="page-header">
        <h1>Integrations</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setEditingId(null)}
        >
          <MdAdd /> Add Integration
        </button>
      </div>

      <div className="content-card">
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="form-row">
            <div className="form-group">
              <label>Integration Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>API Key</label>
              <input
                type="password"
                name="apiKey"
                value={formData.apiKey}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            <MdSave /> {editingId ? 'Update' : 'Save'}
          </button>
        </form>

        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {integrations.map(integration => (
                <tr key={integration.id}>
                  <td>{integration.name}</td>
                  <td>
                    <span className={`badge ${integration.status === 'active' ? 'badge-success' : 'badge-secondary'}`}>
                      {integration.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn btn-sm btn-outline-primary mr-2"
                      onClick={() => handleEdit(integration)}
                    >
                      <MdEdit />
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(integration.id)}
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Integrations