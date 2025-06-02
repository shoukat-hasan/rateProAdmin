// src/pages/Settings/NotificationSettings.jsx
"use client"

import { useState } from "react"
import { MdNotifications, MdEmail, MdSms } from "react-icons/md"

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    reminders: {
      enabled: true,
      daysBefore: 1,
      template: 'reminder'
    },
    lowRatingAlerts: {
      enabled: true,
      threshold: 3,
      emailTemplate: 'low_rating'
    }
  })

  const handleToggle = (field) => {
    setSettings(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  const handleNestedChange = (parent, field, value) => {
    setSettings(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }))
  }

  const saveSettings = (e) => {
    e.preventDefault()
    // Save notification settings
    console.log('Notification settings saved:', settings)
  }

  return (
    <div className="notification-settings">
      <div className="page-header">
        <h1>
          <MdNotifications /> Notification Settings
        </h1>
      </div>

      <form onSubmit={saveSettings}>
        <div className="settings-section">
          <h2>Notification Channels</h2>
          <div className="form-group toggle-group">
            <label>
              <MdEmail /> Email Notifications
            </label>
            <div className="toggle-switch">
              <input
                type="checkbox"
                id="emailNotifications"
                checked={settings.emailNotifications}
                onChange={() => handleToggle('emailNotifications')}
              />
              <label htmlFor="emailNotifications" className="toggle-label"></label>
            </div>
          </div>
          <div className="form-group toggle-group">
            <label>
              <MdSms /> SMS Notifications
            </label>
            <div className="toggle-switch">
              <input
                type="checkbox"
                id="smsNotifications"
                checked={settings.smsNotifications}
                onChange={() => handleToggle('smsNotifications')}
              />
              <label htmlFor="smsNotifications" className="toggle-label"></label>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h2>Reminders</h2>
          <div className="form-group toggle-group">
            <label>Enable Reminders</label>
            <div className="toggle-switch">
              <input
                type="checkbox"
                id="remindersEnabled"
                checked={settings.reminders.enabled}
                onChange={() => handleNestedChange('reminders', 'enabled', !settings.reminders.enabled)}
              />
              <label htmlFor="remindersEnabled" className="toggle-label"></label>
            </div>
          </div>
          {settings.reminders.enabled && (
            <>
              <div className="form-group">
                <label>Days Before Survey</label>
                <input
                  type="number"
                  min="1"
                  max="7"
                  value={settings.reminders.daysBefore}
                  onChange={(e) => handleNestedChange('reminders', 'daysBefore', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Template</label>
                <select
                  value={settings.reminders.template}
                  onChange={(e) => handleNestedChange('reminders', 'template', e.target.value)}
                >
                  <option value="reminder">Standard Reminder</option>
                  <option value="reminder2">Follow-up Reminder</option>
                </select>
              </div>
            </>
          )}
        </div>

        <div className="settings-section">
          <h2>Low Rating Alerts</h2>
          <div className="form-group toggle-group">
            <label>Enable Alerts</label>
            <div className="toggle-switch">
              <input
                type="checkbox"
                id="lowRatingAlerts"
                checked={settings.lowRatingAlerts.enabled}
                onChange={() => handleNestedChange('lowRatingAlerts', 'enabled', !settings.lowRatingAlerts.enabled)}
              />
              <label htmlFor="lowRatingAlerts" className="toggle-label"></label>
            </div>
          </div>
          {settings.lowRatingAlerts.enabled && (
            <>
              <div className="form-group">
                <label>Rating Threshold</label>
                <select
                  value={settings.lowRatingAlerts.threshold}
                  onChange={(e) => handleNestedChange('lowRatingAlerts', 'threshold', e.target.value)}
                >
                  <option value="1">1 Star</option>
                  <option value="2">2 Stars</option>
                  <option value="3">3 Stars</option>
                </select>
              </div>
              <div className="form-group">
                <label>Email Template</label>
                <select
                  value={settings.lowRatingAlerts.emailTemplate}
                  onChange={(e) => handleNestedChange('lowRatingAlerts', 'emailTemplate', e.target.value)}
                >
                  <option value="low_rating">Standard Alert</option>
                  <option value="low_rating2">Follow-up Alert</option>
                </select>
              </div>
            </>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Save Settings
        </button>
      </form>
    </div>
  )
}

export default NotificationSettings