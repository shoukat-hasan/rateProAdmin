// src/pages/Settings/SMTPConfig.jsx
"use client"

import { useState } from "react"
import { MdSave, MdSend } from "react-icons/md"

const SMTPConfig = () => {
  const [config, setConfig] = useState({
    host: '',
    port: 587,
    username: '',
    password: '',
    fromEmail: '',
    fromName: ''
  })
  const [testEmail, setTestEmail] = useState('')
  const [isTesting, setIsTesting] = useState(false)
  const [testResult, setTestResult] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setConfig(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = (e) => {
    e.preventDefault()
    // Save configuration
    console.log('SMTP config saved:', config)
  }

  const handleTest = async (e) => {
    e.preventDefault()
    setIsTesting(true)
    try {
      // Simulate test email
      await new Promise(resolve => setTimeout(resolve, 1000))
      setTestResult({
        success: true,
        message: 'Test email sent successfully!'
      })
    } catch (error) {
      setTestResult({
        success: false,
        message: 'Failed to send test email: ' + error.message
      })
    } finally {
      setIsTesting(false)
    }
  }

  return (
    <div className="smtp-config">
      <div className="page-header">
        <h1>SMTP Configuration</h1>
      </div>

      <form onSubmit={handleSave}>
        <div className="form-row">
          <div className="form-group">
            <label>SMTP Host</label>
            <input
              type="text"
              name="host"
              value={config.host}
              onChange={handleChange}
              placeholder="smtp.example.com"
              required
            />
          </div>
          <div className="form-group">
            <label>Port</label>
            <input
              type="number"
              name="port"
              value={config.port}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={config.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={config.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>From Email</label>
            <input
              type="email"
              name="fromEmail"
              value={config.fromEmail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>From Name</label>
            <input
              type="text"
              name="fromName"
              value={config.fromName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          <MdSave /> Save Configuration
        </button>
      </form>

      <div className="test-section">
        <h2>Test Email Configuration</h2>
        <form onSubmit={handleTest}>
          <div className="form-group">
            <label>Test Email Address</label>
            <input
              type="email"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              placeholder="recipient@example.com"
              required
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-outline-primary"
            disabled={isTesting}
          >
            <MdSend /> {isTesting ? 'Sending...' : 'Send Test Email'}
          </button>
        </form>

        {testResult && (
          <div className={`test-result ${testResult.success ? 'success' : 'error'}`}>
            {testResult.message}
          </div>
        )}
      </div>
    </div>
  )
}

export default SMTPConfig