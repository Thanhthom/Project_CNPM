"use client"

import type React from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/useAuth"
import "./MovieCard.css"
import type { Movie } from "../types"

interface MovieCardProps extends Movie {
  price?: number
}

const MovieCard: React.FC<MovieCardProps> = ({ id, title, posterUrl, rating, price = 120000 }) => {

  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()

  const handleBookTicket = () => {
    if (!isLoggedIn) {
      navigate("/login")
    } else {
      navigate(`/booking/${id}`)
    }
  }

  const handleWatchTrailer = () => {
    if (!isLoggedIn) {
      navigate("/login")
    } else {
      navigate(`/trailer/${id}`)
    }
  }

  return (
    <div className="movie-card">
      <div className="movie-poster-container">
        {posterUrl ? (
          <img src={posterUrl} alt={title} className="movie-poster" />
        ) : (
          <div className="movie-poster placeholder">
            <span className="placeholder-text">{title.split(" ").slice(0, 2).map((s) => s[0]).join("")}</span>
          </div>
        )}
        <div className="movie-overlay"></div>
        <div className="trailer-button-container">
          <button onClick={handleWatchTrailer} className="trailer-button">
            Watch Trailer
          </button>
        </div>
      </div>

      <div className="movie-info">
        <h3 className="movie-title">{title}</h3>

        <div className="movie-meta">
          {rating && (
            <div className="movie-rating">
              <span className="star">★</span>
              <span className="rating-text">{rating}</span>
            </div>
          )}
        </div>

        <div className="movie-price-section">
          <span className="movie-price">From {price.toLocaleString("en-US")}₫</span>
        </div>

        <button onClick={handleBookTicket} className="book-button">
          BOOK TICKET
        </button>
      </div>
    </div>
  )
}

export default MovieCard
