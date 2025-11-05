"use client"

import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useMovieState } from "../hooks/useMovieState"
import { moviesAPI, showtimesAPI, reservationsAPI } from "../services/api"
import type { Showtime, Seat } from "../types"

const Booking = () => {
  const { movieId } = useParams()
  const navigate = useNavigate()
  const {
    selectedMovie,
    setSelectedMovie,
    showtimesList,
    setShowtimesList,
    seatMap,
    setSeatMap,
    selectedSeats,
    setSelectedSeats,
  } = useMovieState()
  const [selectedShowtime, setSelectedShowtime] = useState<Showtime | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!movieId) return
        const movie = await moviesAPI.details(Number.parseInt(movieId))
        setSelectedMovie(movie)

        const today = new Date().toISOString().split("T")[0]
        const showtimes = await showtimesAPI.list(Number.parseInt(movieId), today)
        setShowtimesList(showtimes)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load booking data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [movieId, setSelectedMovie, setShowtimesList])

  useEffect(() => {
    let pollId: number | undefined

    const fetchSeats = async () => {
      if (!selectedShowtime) return
      try {
        const seats = await showtimesAPI.seats(selectedShowtime.id)
        setSeatMap(seats)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load seats")
      }
    }

    // initial fetch
    fetchSeats()

    // poll every 5 seconds to get live holds merged from Redis/DB
    if (selectedShowtime) {
      pollId = window.setInterval(fetchSeats, 5000)
    }

    return () => {
      if (pollId) clearInterval(pollId)
    }
  }, [selectedShowtime, setSeatMap])

  const toggleSeat = (seat: Seat) => {
    // only allow toggling seats that are explicitly available
    if (seat.status !== "available") return

    setSelectedSeats((prev) => {
      const seatStr = `${seat.row}${seat.number}`
      return prev.includes(seatStr) ? prev.filter((s) => s !== seatStr) : [...prev, seatStr]
    })
  }

  const totalPrice = selectedSeats.length * (selectedShowtime?.price || 0)

  const handleBooking = async () => {
    if (!selectedShowtime || selectedSeats.length === 0) {
      setError("Please select a showtime and at least one seat")
      return
    }

    try {
      setIsLoading(true)
      const reservation = await reservationsAPI.create(selectedShowtime.id, selectedSeats)
      const booking = await reservationsAPI.confirm(reservation.reservationId, "credit_card")
      alert(`Booking confirmed! Booking ID: ${booking.bookingId}`)
      navigate("/")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Booking failed")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <div style={{ textAlign: "center", padding: "48px" }}>Loading...</div>

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
      <main style={{ flex: 1, maxWidth: "1280px", margin: "0 auto", padding: "48px 16px", width: "100%" }}>
        <button
          onClick={() => navigate("/")}
          style={{
            marginBottom: "24px",
            backgroundColor: "#475569",
            color: "white",
            padding: "8px 16px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          ← Back to Home
        </button>

        {error && (
          <div
            style={{
              backgroundColor: "#7f1d1d",
              color: "#fca5a5",
              padding: "16px",
              borderRadius: "8px",
              marginBottom: "16px",
            }}
          >
            {error}
          </div>
        )}

        <div
          style={{
            backgroundColor: "#1e293b",
            borderRadius: "8px",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
            padding: "32px",
          }}
        >
          <h2 style={{ fontSize: "30px", fontWeight: "bold", marginBottom: "8px" }}>{selectedMovie?.title}</h2>
          <p style={{ color: "#9ca3af", marginBottom: "32px" }}>Select your showtime and seats below</p>

          {/* Showtimes Selection */}
          <div style={{ marginBottom: "32px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}>Select Showtime</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "12px" }}>
              {showtimesList.map((showtime) => (
                <button
                  key={showtime.id}
                  onClick={() => setSelectedShowtime(showtime)}
                  style={{
                    padding: "12px",
                    borderRadius: "8px",
                    border: selectedShowtime?.id === showtime.id ? "2px solid #2563eb" : "1px solid #475569",
                    backgroundColor: selectedShowtime?.id === showtime.id ? "#1e40af" : "#334155",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  {new Date(showtime.startTime).toLocaleTimeString()}
                </button>
              ))}
            </div>
          </div>

          {/* Seats Selection */}
          {selectedShowtime && (
            <div style={{ marginBottom: "32px", padding: "24px", backgroundColor: "#334155", borderRadius: "8px" }}>
              <div style={{ textAlign: "center", marginBottom: "24px" }}>
                <p style={{ color: "#9ca3af", marginBottom: "8px" }}>SCREEN</p>
                <div
                  style={{ height: "4px", background: "linear-gradient(to right, transparent, #3b82f6, transparent)" }}
                ></div>
              </div>

              <div
                style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: "8px", marginBottom: "32px" }}
              >
                {seatMap.map((seat) => {
                  const seatStr = `${seat.row}${seat.number}`
                  const isSelected = selectedSeats.includes(seatStr)
                  return (
                    <button
                      key={seatStr}
                      onClick={() => toggleSeat(seat)}
                      disabled={seat.status !== "available"}
                      style={{
                        padding: "8px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: "600",
                        border: "none",
                        backgroundColor:
                          seat.status === "sold"
                            ? "#6b7280"
                            : seat.status === "priority"
                            ? "#f59e0b"
                            : isSelected
                            ? "#2563eb"
                            : "#475569",
                        color: "white",
                        cursor: seat.status === "available" ? "pointer" : "not-allowed",
                        opacity: seat.status === "sold" ? 0.5 : 1,
                      }}
                      title={
                        seat.status === "sold" ? "Sold" : seat.status === "priority" ? "Held by another user" : "Available"
                      }
                    >
                      {seatStr}
                    </button>
                  )
                })}
              </div>

              {/* Legend */}
              <div style={{ display: "flex", gap: "16px", alignItems: "center", marginBottom: "16px" }}>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <div style={{ width: 16, height: 16, background: "#475569", borderRadius: 4 }} />
                  <span style={{ color: "#cbd5e1" }}>Available</span>
                </div>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <div style={{ width: 16, height: 16, background: "#f59e0b", borderRadius: 4 }} />
                  <span style={{ color: "#cbd5e1" }}>Held</span>
                </div>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <div style={{ width: 16, height: 16, background: "#6b7280", borderRadius: 4 }} />
                  <span style={{ color: "#cbd5e1" }}>Sold</span>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: "24px",
                  borderTop: "1px solid #475569",
                }}
              >
                <div>
                  <p style={{ color: "#9ca3af", marginBottom: "8px" }}>Selected Seats: {selectedSeats.length}</p>
                  <p style={{ fontSize: "24px", fontWeight: "bold", color: "#60a5fa" }}>
                    {totalPrice.toLocaleString()}đ
                  </p>
                </div>
                <button
                  onClick={handleBooking}
                  disabled={isLoading}
                  style={{
                    backgroundColor: "#2563eb",
                    color: "white",
                    padding: "12px 32px",
                    borderRadius: "8px",
                    fontWeight: "600",
                    border: "none",
                    cursor: isLoading ? "not-allowed" : "pointer",
                    opacity: isLoading ? 0.6 : 1,
                  }}
                >
                  {isLoading ? "Processing..." : "Confirm Booking"}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Booking
