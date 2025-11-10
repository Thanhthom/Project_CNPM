"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/useAuth"
// import Header from "../components/Header"
import Footer from "../components/Footer"
import "./login.css"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSignup, setIsSignup] = useState(false)
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login, signup } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      if (isSignup) {
        await signup(email, password, name)
      } else {
        await login(email, password)
      }
      navigate("/")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-page">
      {/* <Header /> */}
      <main className="login-container">
        <button className="back-home-btn" onClick={() => navigate("/")} title="Quay lại trang chủ">
          ← Quay lại trang chủ
        </button>
        <div className="login-card">
          <h2>{isSignup ? "📝 Sign Up" : "🔐 Login"}</h2>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            {isSignup && (
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={isSignup}
                  placeholder="Enter your full name"
                />
              </div>
            )}

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>

            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? "⏳ Processing..." : isSignup ? "✓ Sign Up" : "✓ Login"}
            </button>
          </form>

          <div className="toggle-section">
            <p>
              {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
              <button className="toggle-btn" onClick={() => setIsSignup(!isSignup)} type="button">
                {isSignup ? "Login here" : "Sign Up here"}
              </button>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Login
