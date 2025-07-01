// src/pages/Audiences/Audiences.jsx
"use client"

import { useState } from "react"
import { MdAdd, MdEdit, MdDelete, MdImportExport, MdFilterAlt, MdSave, MdClose } from "react-icons/md"
import Pagination from "../../components/Pagination/Pagination.jsx"

const Audiences = ({ darkMode }) => {
  const [audiences, setAudiences] = useState([
    { id: 1, name: "Premium Customers", count: 245, filters: [{ field: "rating", operator: ">=", value: "4" }] },
    { id: 2, name: "US Customers", count: 189, filters: [{ field: "country", operator: "=", value: "US" }] }
  ])
  const [showForm, setShowForm] = useState(false)
  const [currentAudience, setCurrentAudience] = useState({
    name: '',
    filters: []
  })
  const [importModal, setImportModal] = useState(false)
  const [file, setFile] = useState(null)
  const [pagination, setPagination] = useState({ page: 1, limit: 1, total: 0 })


  const addFilter = () => {
    setCurrentAudience(prev => ({
      ...prev,
      filters: [...prev.filters, { field: '', operator: '=', value: '' }]
    }))
  }

  const handleFilterChange = (index, key, value) => {
    const newFilters = [...currentAudience.filters]
    newFilters[index][key] = value
    setCurrentAudience(prev => ({ ...prev, filters: newFilters }))
  }

  const removeFilter = (index) => {
    const newFilters = [...currentAudience.filters]
    newFilters.splice(index, 1)
    setCurrentAudience(prev => ({ ...prev, filters: newFilters }))
  }

  const saveAudience = (e) => {
    e.preventDefault()
    if (currentAudience.id) {
      setAudiences(audiences.map(a =>
        a.id === currentAudience.id ? currentAudience : a
      ))
    } else {
      setAudiences([...audiences, {
        ...currentAudience,
        id: Date.now(),
        count: 0
      }])
    }
    setShowForm(false)
    setCurrentAudience({ name: '', filters: [] })
  }

  const handleImport = (e) => {
    e.preventDefault()
    // Process file import
    console.log('Importing file:', file)
    setImportModal(false)
    setFile(null)
  }

  const indexOfLastItem = pagination.page * pagination.limit
const indexOfFirstItem = indexOfLastItem - pagination.limit
const currentAudiences = audiences.slice(indexOfFirstItem, indexOfLastItem)


  return (
    <div className="audiences-page">
      <div className="page-header">
        <h1>Audience Management</h1>
        <div className="actions">
          <a className="btn btn-primary" onClick={() => setShowForm(true)}>
            <MdAdd /> Create Audience
          </a>
          <a className="btn btn-outline-primary" onClick={() => setImportModal(true)}>
            <MdImportExport /> Import
          </a>
        </div>
      </div>

      {showForm && (
        <div className="audience-form">
          <h2>{currentAudience.id ? 'Edit' : 'Create'} Audience</h2>
          <form onSubmit={saveAudience}>
            <div className="form-group">
              <label>Audience Name</label>
              <input
                type="text"
                value={currentAudience.name}
                onChange={(e) => setCurrentAudience({ ...currentAudience, name: e.target.value })}
                required
              />
            </div>

            <div className="filters-section">
              <h3>Filters</h3>
              {currentAudience.filters.map((filter, index) => (
                <div key={index} className="filter-row">
                  <select
                    value={filter.field}
                    onChange={(e) => handleFilterChange(index, 'field', e.target.value)}
                    required
                  >
                    <option value="">Select Field</option>
                    <option value="country">Country</option>
                    <option value="rating">Rating</option>
                    <option value="age">Age</option>
                    <option value="gender">Gender</option>
                  </select>
                  <select
                    value={filter.operator}
                    onChange={(e) => handleFilterChange(index, 'operator', e.target.value)}
                    required
                  >
                    <option value="=">Equals</option>
                    <option value="!=">Not Equals</option>
                    <option value=">">Greater Than</option>
                    <option value="<">Less Than</option>
                    <option value=">=">Greater Than or Equal</option>
                    <option value="<=">Less Than or Equal</option>
                    <option value="contains">Contains</option>
                  </select>
                  <input
                    type="text"
                    value={filter.value}
                    onChange={(e) => handleFilterChange(index, 'value', e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => removeFilter(index)}
                  >
                    <MdClose />
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={addFilter}
              >
                <MdFilterAlt /> Add Filter
              </button>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                <MdSave /> Save Audience
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setShowForm(false)
                  setCurrentAudience({ name: '', filters: [] })
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {importModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Import Audience</h2>
            <form onSubmit={handleImport}>
              <div className="form-group">
                <label>CSV File</label>
                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => setFile(e.target.files[0])}
                  required
                />
                <p className="help-text">
                  CSV should contain columns: email, name, and any additional demographic data
                </p>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  <MdImportExport /> Import
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setImportModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="audiences-list">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Members</th>
              <th>Filters</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentAudiences.map(audience => (
              <tr key={audience.id}>
                <td>{audience.name}</td>
                <td>{audience.count}</td>
                <td>
                  {audience.filters.map((filter, i) => (
                    <span key={i} className="filter-badge">
                      {filter.field} {filter.operator} {filter.value}
                    </span>
                  ))}
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-primary mr-2"
                    onClick={() => {
                      setCurrentAudience(audience)
                      setShowForm(true)
                    }}
                  >
                    <MdEdit />
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => setAudiences(audiences.filter(a => a.id !== audience.id))}
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-3 border-top">
          <Pagination
            current={pagination.page}
            total={audiences.length}
            limit={pagination.limit}
            onChange={(page) => setPagination((prev) => ({ ...prev, page }))}
            darkMode={darkMode}
          />
        </div>
      </div>
    </div>
  )
}

export default Audiences