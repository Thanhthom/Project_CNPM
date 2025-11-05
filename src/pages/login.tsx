"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/useAuth"
import Header from "../components/Header"
import Footer from "../components/Footer"

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
    <div
      style={{
        backgroundColor: "#0f172a",
        minHeight: "100vh",
        color: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 16px" }}>
        <div
          style={{
            backgroundColor: "#1e293b",
            borderRadius: "8px",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
            padding: "32px",
            width: "100%",
            maxWidth: "448px",
          }}
        >
          <h2 style={{ fontSize: "30px", fontWeight: "bold", marginBottom: "32px", textAlign: "center" }}>
            {isSignup ? "Sign Up" : "Login"}
          </h2>

          {error && (
            <div
              style={{
                backgroundColor: "#7f1d1d",
                color: "#fca5a5",
                padding: "12px",
                borderRadius: "6px",
                marginBottom: "16px",
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {isSignup && (
              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "8px" }}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "8px 16px",
                    backgroundColor: "#334155",
                    border: "1px solid #475569",
                    borderRadius: "8px",
                    color: "white",
                  }}
                  placeholder="Enter your name"
                />
              </div>
            )}

            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "8px" }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "8px 16px",
                  backgroundColor: "#334155",
                  border: "1px solid #475569",
                  borderRadius: "8px",
                  color: "white",
                }}
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "8px" }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "8px 16px",
                  backgroundColor: "#334155",
                  border: "1px solid #475569",
                  borderRadius: "8px",
                  color: "white",
                }}
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: "100%",
                backgroundColor: "#2563eb",
                color: "white",
                fontWeight: "600",
                padding: "12px",
                borderRadius: "8px",
                border: "none",
                cursor: isLoading ? "not-allowed" : "pointer",
                opacity: isLoading ? 0.6 : 1,
              }}
            >
              {isLoading ? "Loading..." : isSignup ? "Sign Up" : "Login"}
            </button>
          </form>

          <div style={{ marginTop: "24px", textAlign: "center" }}>
            <p style={{ color: "#9ca3af" }}>
              {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={() => setIsSignup(!isSignup)}
                style={{
                  color: "#60a5fa",
                  fontWeight: "600",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {isSignup ? "Login" : "Sign Up"}
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
