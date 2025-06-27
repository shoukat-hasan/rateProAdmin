// src\pages\Auth\ResetPassword.jsx
// "use client"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaEye, FaEyeSlash } from "react-icons/fa"

const ResetPassword = () => {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password.length < 6) {
      setError("Password must be at least 6 characters long")
      return
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }
    setError("")
    navigate("/login")
  }

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.heading}>Reset Password</h2>
        <p style={styles.text}>Create your new password below.</p>
        <div className="position-relative">
          <input
            style={styles.input}
            type={showPassword ? "text" : "password"}
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              top: "50%",
              right: "18px",
              transform: "translateY(-50%)",
              cursor: "pointer",
              color: "#6c757d",
              fontSize: "1.1rem"
            }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <div className="position-relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={styles.input}
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              top: "50%",
              right: "18px",
              transform: "translateY(-50%)",
              cursor: "pointer",
              color: "#6c757d",
              fontSize: "1.1rem"
            }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>Reset Password</button>
      </form>
    </div>
  )
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "#f4f4f4",
    padding: 20,
  },
  form: {
    background: "#fff",
    padding: 30,
    borderRadius: 10,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: 400,
  },
  heading: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "bold",
  },
  text: {
    fontSize: 14,
    marginBottom: 20,
    color: "#666",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    border: "1px solid #ccc",
    fontSize: 14,
  },
  button: {
    width: "100%",
    padding: 10,
    border: "none",
    borderRadius: 5,
    backgroundColor: "#007bff",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: 13,
    marginBottom: 10,
  },
}

export default ResetPassword
