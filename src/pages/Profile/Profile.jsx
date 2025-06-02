

// src\pages\Profile\Profile.jsx
"use client"

import { useState } from "react"

import { MdSave, MdEdit, MdLock } from "react-icons/md"
import "./Profile.css"

const Profile = () => {
  const { currentUser, updateProfile, updatePassword } = useState({})

  const [profileData, setProfileData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    company: currentUser?.company || "",
    phone: currentUser?.phone || "",
    position: currentUser?.position || "",
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [passwordSuccess, setPasswordSuccess] = useState("")

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileData({
      ...profileData,
      [name]: value,
    })
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData({
      ...passwordData,
      [name]: value,
    })
  }

  const handleProfileSubmit = async (e) => {
    e.preventDefault()

    try {
      setError("")
      setSuccess("")
      setLoading(true)

      await updateProfile(profileData)
      setSuccess("Profile updated successfully")
      setEditMode(false)
    } catch (error) {
      setError("Failed to update profile")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return setPasswordError("Passwords do not match")
    }

    try {
      setPasswordError("")
      setPasswordSuccess("")
      setLoading(true)

      await updatePassword(passwordData.newPassword)
      setPasswordSuccess("Password updated successfully")
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (error) {
      setPasswordError("Failed to update password")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="profile-page">
      <div className="page-header">
        <h1>My Profile</h1>
        {!editMode ? (
          <button className="btn btn-primary" onClick={() => setEditMode(true)}>
            <MdEdit /> Edit Profile
          </button>
        ) : (
          <button className="btn btn-secondary" onClick={() => setEditMode(false)}>
            Cancel
          </button>
        )}
      </div>

      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <h2>Personal Information</h2>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={handleProfileSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={profileData.name}
                  onChange={handleProfileChange}
                  disabled={!editMode}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  disabled={!editMode}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="company">Company</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={profileData.company}
                  onChange={handleProfileChange}
                  disabled={!editMode}
                />
              </div>

              <div className="form-group">
                <label htmlFor="position">Position</label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={profileData.position}
                  onChange={handleProfileChange}
                  disabled={!editMode}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={profileData.phone}
                onChange={handleProfileChange}
                disabled={!editMode}
              />
            </div>

            {editMode && (
              <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  <MdSave /> {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            )}
          </form>
        </div>

        <div className="profile-card">
          <div className="profile-header">
            <h2>Change Password</h2>
          </div>

          {passwordError && <div className="alert alert-danger">{passwordError}</div>}
          {passwordSuccess && <div className="alert alert-success">{passwordSuccess}</div>}

          <form onSubmit={handlePasswordSubmit}>
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                required
                minLength="6"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                required
                minLength="6"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                <MdLock /> {loading ? "Updating..." : "Update Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile
