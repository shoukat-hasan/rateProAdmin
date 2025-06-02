//src\pages\Settings\Settings.jsx

"use client"

import { useState } from "react"
import { MdSave } from "react-icons/md"
import "./Settings.css"

const Settings = () => {
  const [generalSettings, setGeneralSettings] = useState({
    companyName: "Acme Inc.",
    email: "admin@acmeinc.com",
    language: "en",
    timezone: "UTC",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    surveyResponses: true,
    weeklyReports: true,
    supportTickets: true,
  })

  const [appearanceSettings, setAppearanceSettings] = useState({
    primaryColor: "#4a6cf7",
    logoUrl: "",
  })

  const handleGeneralChange = (e) => {
    const { name, value } = e.target
    setGeneralSettings((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target
    setNotificationSettings((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  const handleAppearanceChange = (e) => {
    const { name, value } = e.target
    setAppearanceSettings((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would save the settings to the backend
    console.log("Saving settings:", {
      generalSettings,
      notificationSettings,
      appearanceSettings,
    })
    alert("Settings saved successfully!")
  }

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1>Settings</h1>
        <button className="save-btn" onClick={handleSubmit}>
          <MdSave /> Save Changes
        </button>
      </div>

      <div className="settings-container">
        <div className="settings-sidebar">
          <ul>
            <li className="active">General</li>
            <li>Notifications</li>
            <li>Appearance</li>
            <li>Security</li>
            <li>Billing</li>
            <li>API</li>
          </ul>
        </div>

        <div className="settings-content">
          <section className="settings-section">
            <h2>General Settings</h2>
            <div className="form-group">
              <label htmlFor="companyName">Company Name</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={generalSettings.companyName}
                onChange={handleGeneralChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={generalSettings.email}
                onChange={handleGeneralChange}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="language">Language</label>
                <select id="language" name="language" value={generalSettings.language} onChange={handleGeneralChange}>
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="timezone">Timezone</label>
                <select id="timezone" name="timezone" value={generalSettings.timezone} onChange={handleGeneralChange}>
                  <option value="UTC">UTC</option>
                  <option value="EST">Eastern Time (EST)</option>
                  <option value="CST">Central Time (CST)</option>
                  <option value="PST">Pacific Time (PST)</option>
                </select>
              </div>
            </div>
          </section>

          <section className="settings-section">
            <h2>Notification Preferences</h2>
            <div className="form-group checkbox">
              <label>
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={notificationSettings.emailNotifications}
                  onChange={handleNotificationChange}
                />
                Enable Email Notifications
              </label>
            </div>
            <div className="form-group checkbox">
              <label>
                <input
                  type="checkbox"
                  name="surveyResponses"
                  checked={notificationSettings.surveyResponses}
                  onChange={handleNotificationChange}
                />
                Notify on new survey responses
              </label>
            </div>
            <div className="form-group checkbox">
              <label>
                <input
                  type="checkbox"
                  name="weeklyReports"
                  checked={notificationSettings.weeklyReports}
                  onChange={handleNotificationChange}
                />
                Send weekly summary reports
              </label>
            </div>
            <div className="form-group checkbox">
              <label>
                <input
                  type="checkbox"
                  name="supportTickets"
                  checked={notificationSettings.supportTickets}
                  onChange={handleNotificationChange}
                />
                Notify on support ticket updates
              </label>
            </div>
          </section>

          <section className="settings-section">
            <h2>Appearance</h2>
            <div className="form-group">
              <label htmlFor="primaryColor">Primary Color</label>
              <div className="color-picker">
                <input
                  type="color"
                  id="primaryColor"
                  name="primaryColor"
                  value={appearanceSettings.primaryColor}
                  onChange={handleAppearanceChange}
                />
                <span>{appearanceSettings.primaryColor}</span>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="logoUrl">Logo URL</label>
              <input
                type="text"
                id="logoUrl"
                name="logoUrl"
                value={appearanceSettings.logoUrl}
                onChange={handleAppearanceChange}
                placeholder="https://example.com/logo.png"
              />
            </div>
            <div className="form-group">
              <label>Logo Preview</label>
              <div className="logo-preview">
                {appearanceSettings.logoUrl ? (
                  <img src={appearanceSettings.logoUrl || "/placeholder.svg"} alt="Company Logo" />
                ) : (
                  <div className="no-logo">No logo uploaded</div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Settings
