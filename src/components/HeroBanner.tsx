"use client"

import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/useAuth"
import { useEffect, useState } from "react"
import { moviesAPI } from "../services/api"
import type { Movie } from "../types"
import "./HeroBanner.css"

const HeroBanner = () => {
  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()
  const [hero, setHero] = useState<Movie | null>(null)

  useEffect(() => {
    const loadHero = async () => {
      try {
        const movies = await moviesAPI.list(1, 6)
        // prefer a 'playing' movie, otherwise first
        const firstPlaying = movies.find((m) => m.status === "playing") || movies[0] || null
        setHero(firstPlaying)
      } catch {
          // leave hero as null if API fails
          setHero(null)
        }


    }

    loadHero()
  }, [])

  const handleBookNow = () => {
    if (!isLoggedIn) {
      navigate("/login")
    } else if (hero) {
      navigate(`/booking/${hero.id}`)
    }
  }

  return (
    <div className="hero-banner">
      {hero && hero.posterUrl ? (
        <img src={hero.posterUrl} alt={hero.title} className="hero-image" />
      ) : (
        <div className="hero-image" style={{ background: "linear-gradient(135deg,#0f1b45,#1a2f5a)" }} />
      )}
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <div className="hero-text">
          <h2 className="hero-title">{hero ? hero.title.toUpperCase() : "NOW SHOWING"}</h2>
          <p className="hero-date">{hero ? new Date(hero.releaseDate).toLocaleDateString() : "COMING SOON"}</p>
          <button onClick={handleBookNow} className="hero-button">
            BOOK NOW
          </button>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner
