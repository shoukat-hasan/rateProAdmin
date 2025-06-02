// src/pages/Templates/Templates.jsx
"use client"

import { useState } from "react"
import { MdAdd, MdContentCopy, MdDelete, MdEdit, MdSave } from "react-icons/md"

const SurveyTemplates = () => {
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: "Customer Satisfaction (CSAT)",
      description: "Standard customer satisfaction survey",
      questions: [
        {
          text: "How satisfied are you with our product?",
          type: "rating",
          options: ["1", "2", "3", "4", "5"]
        },
        {
          text: "What can we improve?",
          type: "text"
        }
      ]
    },
    {
      id: 2,
      name: "Net Promoter Score (NPS)",
      description: "Standard NPS survey",
      questions: [
        {
          text: "How likely are you to recommend our product to others?",
          type: "nps",
          options: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
        }
      ]
    }
  ])
  const [showForm, setShowForm] = useState(false)
  const [currentTemplate, setCurrentTemplate] = useState({
    name: '',
    description: '',
    questions: []
  })

  const createFromTemplate = (templateId) => {
    // Navigate to survey creation with template data
    console.log('Creating survey from template:', templateId)
  }

  const saveTemplate = (e) => {
    e.preventDefault()
    if (currentTemplate.id) {
      setTemplates(templates.map(t => 
        t.id === currentTemplate.id ? currentTemplate : t
      ))
    } else {
      setTemplates([...templates, {
        ...currentTemplate,
        id: Date.now()
      }])
    }
    setShowForm(false)
    setCurrentTemplate({ name: '', description: '', questions: [] })
  }

  return (
    <div className="templates-page">
      <div className="page-header">
        <h1>Survey Templates</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          <MdAdd /> New Template
        </button>
      </div>

      {showForm && (
        <div className="template-form">
          <h2>{currentTemplate.id ? 'Edit' : 'Create'} Template</h2>
          <form onSubmit={saveTemplate}>
            <div className="form-group">
              <label>Template Name</label>
              <input
                type="text"
                value={currentTemplate.name}
                onChange={(e) => setCurrentTemplate({...currentTemplate, name: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={currentTemplate.description}
                onChange={(e) => setCurrentTemplate({...currentTemplate, description: e.target.value})}
                rows={3}
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                <MdSave /> Save Template
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setShowForm(false)
                  setCurrentTemplate({ name: '', description: '', questions: [] })
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="templates-grid">
        {templates.map(template => (
          <div key={template.id} className="template-card">
            <h3>{template.name}</h3>
            <p>{template.description}</p>
            <div className="questions-preview">
              {template.questions.map((q, i) => (
                <div key={i} className="question-preview">
                  <strong>{q.text}</strong> ({q.type})
                </div>
              ))}
            </div>
            <div className="template-actions">
              <button
                className="btn btn-sm btn-primary"
                onClick={() => createFromTemplate(template.id)}
              >
                <MdContentCopy /> Use Template
              </button>
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => {
                  setCurrentTemplate(template)
                  setShowForm(true)
                }}
              >
                <MdEdit />
              </button>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => setTemplates(templates.filter(t => t.id !== template.id))}
              >
                <MdDelete />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SurveyTemplates