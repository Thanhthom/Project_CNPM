// import React, { useEffect, useState } from "react";
// import Header from "../components/Header";
// import MovieSection from "../components/MovieSection";
// import "../App.css";

// export interface Movie {
//   id: number;
//   title: string;
//   posterURL?: string;
//   imageURL?: string;
//   releaseDate?: string;
//   rating?: number;
//   description?: string;
// }

// export default function HomePage() {
//   const [moviesNow, setMoviesNow] = useState<Movie[]>([]);
//   const [moviesSoon, setMoviesSoon] = useState<Movie[]>([]);
//   const [specialMovies, setSpecialMovies] = useState<Movie[]>([]);

//   const API_NOW = "https://api.sampleapis.com/movies/action";
//   const API_SOON = "https://api.sampleapis.com/movies/comedy";
//   const API_SPECIAL = "https://api.sampleapis.com/movies/animation";

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const [nowRes, soonRes, specialRes] = await Promise.all([
//           fetch(API_NOW),
//           fetch(API_SOON),
//           fetch(API_SPECIAL),
//         ]);

//         const [nowData, soonData, specialData] = await Promise.all([
//           nowRes.json(),
//           soonRes.json(),
//           specialRes.json(),
//         ]);

//         setMoviesNow(nowData.slice(0, 6));
//         setMoviesSoon(soonData.slice(0, 6));
//         setSpecialMovies(specialData.slice(0, 6));
//       } catch (error) {
//         console.error("Lỗi tải phim:", error);
//       }
//     };

//     fetchMovies();
//   }, []);

//   return (
//     <div className="page-container">
//       <Header />

//       <div className="banner">
//         <img src="https://i.ibb.co/8b9L5qM/banner.jpg" alt="Banner" />
//       </div>

//       <MovieSection title="🎬 PHIM ĐANG CHIẾU" movies={moviesNow} />
//       <MovieSection title="🍿 PHIM SẮP CHIẾU" movies={moviesSoon} />
//       <MovieSection title="⭐ SUẤT CHIẾU ĐẶC BIỆT" movies={specialMovies} />

//       <footer className="footer">© 2025 CINEMAX. All Rights Reserved.</footer>
//     </div>
//   );
// }


import { useEffect, useState } from "react"
import Header from "../components/Header"
import HeroBanner from "../components/HeroBanner"
import MovieList from "../components/MovieList"
import Footer from "../components/Footer"
import type { Movie } from "../types"
import "./home.css"

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [movies, setMovies] = useState<Movie[]>([])

  useEffect(() => {
    // Giả lập dữ liệu phim để test giao diện
    const mockMovies: Movie[] = [
      {
        id: 1,
        title: "The Avengers: Endgame",
        description: "Epic conclusion to the Infinity Saga",
        duration: 180,
        rating: 9.5,
        posterUrl: "https://via.placeholder.com/300x450/1a365d/ffffff?text=Avengers",
        trailerUrl: "https://www.youtube.com/watch?v=TcMBFSGVi1c",
        status: "playing",
        releaseDate: "2025-11-01"
      },
      {
        id: 2,
        title: "Spider-Man: No Way Home",
        description: "Peter Parker seeks help from Doctor Strange",
        duration: 148,
        rating: 8.9,
        posterUrl: "https://via.placeholder.com/300x450/1a365d/ffffff?text=Spider-Man",
        trailerUrl: "https://www.youtube.com/watch?v=JfVOs4VSpmA",
        status: "playing",
        releaseDate: "2025-11-15"
      },
      {
        id: 3,
        title: "Black Panther: Wakanda Forever",
        description: "The people of Wakanda fight to protect their home",
        duration: 161,
        rating: 8.7,
        posterUrl: "https://via.placeholder.com/300x450/1a365d/ffffff?text=Black+Panther",
        trailerUrl: "https://www.youtube.com/watch?v=_Z3QKkl1WyM",
        status: "upcoming",
        releaseDate: "2025-12-01"
      }
    ]

    setMovies(mockMovies)
    setIsLoading(false)
  }, [])

  const nowShowingMovies = movies.filter((m) => m.status === "playing")
  const upcomingMovies = movies.filter((m) => m.status === "upcoming")

  return (
    <div className="home-container">
      <Header />
      <HeroBanner />
      
      <main className="main-content">
        {isLoading ? (
          <div className="loading">Loading movies...</div>
        ) : (
          <>
            <section className="movie-section">
              <div className="section-header">
                <h2>PHIM ĐANG CHIẾU</h2>
                <button className="view-all">Xem tất cả</button>
              </div>
              <MovieList movies={nowShowingMovies} />
            </section>

            <section className="movie-section">
              <div className="section-header">
                <h2>PHIM SẮP CHIẾU</h2>
                <button className="view-all">Xem tất cả</button>
              </div>
              <MovieList movies={upcomingMovies} />
            </section>
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default Home