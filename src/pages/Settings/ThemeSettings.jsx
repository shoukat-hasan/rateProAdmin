// src/pages/Settings/ThemeSettings.jsx
"use client"

import { useState } from "react"
import { MdColorLens, MdUpload, MdSave } from "react-icons/md"

const ThemeSettings = () => {
  const [theme, setTheme] = useState({
    primaryColor: '#4a6cf7',
    secondaryColor: '#6c757d',
    logo: null,
    logoPreview: ''
  })

  const handleColorChange = (e) => {
    const { name, value } = e.target
    setTheme(prev => ({ ...prev, [name]: value }))
  }

  const handleLogoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setTheme(prev => ({
          ...prev,
          logo: file,
          logoPreview: reader.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const saveTheme = (e) => {
    e.preventDefault()
    // Save theme settings
    console.log('Theme saved:', theme)
  }

  return (
    <div className="theme-settings">
      <div className="page-header">
        <h1>Theme Customization</h1>
      </div>

      <form onSubmit={saveTheme}>
        <div className="form-row">
          <div className="form-group">
            <label>Primary Color</label>
            <div className="color-picker">
              <input
                type="color"
                name="primaryColor"
                value={theme.primaryColor}
                onChange={handleColorChange}
              />
              <span>{theme.primaryColor}</span>
            </div>
          </div>
          <div className="form-group">
            <label>Secondary Color</label>
            <div className="color-picker">
              <input
                type="color"
                name="secondaryColor"
                value={theme.secondaryColor}
                onChange={handleColorChange}
              />
              <span>{theme.secondaryColor}</span>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Logo</label>
          <div className="logo-upload">
            {theme.logoPreview ? (
              <img src={theme.logoPreview} alt="Logo Preview" className="logo-preview" />
            ) : (
              <div className="logo-placeholder">
                <MdColorLens />
              </div>
            )}
            <label className="upload-btn">
              <MdUpload /> Upload Logo
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                style={{ display: 'none' }}
              />
            </label>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          <MdSave /> Save Theme
        </button>
      </form>
    </div>
  )
}

export default ThemeSettings