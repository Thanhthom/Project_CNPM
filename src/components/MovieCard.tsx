"use client"

import type React from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/useAuth"
import { useState } from "react"
import "./MovieCard.css"
import type { Movie } from "../types"

interface MovieCardProps extends Movie {
  price?: number
}

const MovieCard: React.FC<MovieCardProps> = ({ id, title, posterUrl, rating, price = 120000, trailerUrl }) => {

  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()
  const [showTrailer, setShowTrailer] = useState(false)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)

  const handleBookTicket = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (!isLoggedIn) {
      // show inline prompt asking user to login or register
      setShowLoginPrompt(true)
    } else {
      navigate(`/booking/${id}`)
    }
  }

  const openTrailer = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setShowTrailer(true)
  }

  const closeTrailer = () => setShowTrailer(false)

  const getEmbedUrl = (url?: string) => {
    if (!url) return undefined
    // simple YouTube link -> embed conversion
    try {
      const u = new URL(url)
      if (u.hostname.includes("youtube.com") && u.searchParams.get("v")) {
        return `https://www.youtube.com/embed/${u.searchParams.get("v")}`
      }
      if (u.hostname.includes("youtu.be")) {
        return `https://www.youtube.com/embed/${u.pathname.slice(1)}`
      }
      return url
    } catch {
      return url
    }
  }

  const embedUrl = getEmbedUrl(trailerUrl)

  return (
    <div className="movie-card" onClick={openTrailer} role="button" tabIndex={0}>
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
          <button onClick={openTrailer} className="trailer-button">
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

      {showTrailer && (
        <div className="trailer-modal" onClick={closeTrailer}>
          <div className="trailer-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="trailer-close" onClick={closeTrailer} aria-label="Close trailer">×</button>

            <div style={{ display: "flex", gap: 16 }}>
              <div style={{ flex: 1 }}>
                {embedUrl ? (
                  <div className="trailer-embed">
                    <iframe
                      src={embedUrl}
                      title={`Trailer - ${title}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="trailer-placeholder">Trailer unavailable</div>
                )}
              </div>

              <aside style={{ width: 320, padding: 12, color: "#e6eef8" }}>
                <h3 style={{ marginTop: 0 }}>{title}</h3>
                <p style={{ color: "#cbd5e1", fontSize: 14 }}>{/* description may be long */}</p>
                <ul style={{ listStyle: "none", padding: 0, marginTop: 8, color: "#cbd5e1", fontSize: 13 }}>
                  <li><strong>Thời lượng:</strong> {/* show duration if available */}</li>
                  <li><strong>Ngày khởi chiếu:</strong> { /* releaseDate */ }</li>
                  <li><strong>Đánh giá:</strong> {rating ?? "-"}/10</li>
                </ul>

                <div style={{ marginTop: 16 }}>
                  <button onClick={handleBookTicket} className="book-button">MUA VÉ</button>
                </div>
              </aside>
            </div>
          </div>
        </div>
      )}

      {showLoginPrompt && (
        <div className="login-prompt-modal" onClick={() => setShowLoginPrompt(false)}>
          <div className="login-prompt-content" onClick={(e) => e.stopPropagation()}>
            <h3>Vui lòng đăng nhập để mua vé</h3>
            <p>Bạn cần đăng nhập hoặc đăng ký để tiếp tục mua vé.</p>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button onClick={() => { setShowLoginPrompt(false); navigate('/login') }} className="book-button">Đăng nhập</button>
              <button onClick={() => { setShowLoginPrompt(false); navigate('/register') }} className="trailer-button">Đăng ký</button>
              <button onClick={() => setShowLoginPrompt(false)} style={{ background: "transparent", color: "#cbd5e1", border: "1px solid #333" }}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MovieCard
