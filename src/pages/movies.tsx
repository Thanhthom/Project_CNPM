import Header from "../components/Header"
import Footer from "../components/Footer"
import MovieList from "../components/MovieList"
import type { Movie } from "../types"
import "./movies.css"

const Movies = () => {
  // Mock data to render the grid similar to the screenshot
  const mockMovies: Movie[] = [
    {
      id: 1,
      title: "Cuộc Chiến Vũ Trụ",
      description: "Hành động, phiêu lưu",
      duration: 130,
      rating: 8.3,
      posterUrl: "https://via.placeholder.com/300x450/0b2545/ffffff?text=Movie+1",
      trailerUrl: "",
      status: "playing",
      releaseDate: "2025-10-21",
      price: 120000,
    },
    {
      id: 2,
      title: "Sứ Mệnh Cuối",
      description: "Kịch tính, cảm động",
      duration: 115,
      rating: 7.9,
      posterUrl: "https://via.placeholder.com/300x450/0b2545/ffffff?text=Movie+2",
      trailerUrl: "",
      status: "playing",
      releaseDate: "2025-10-18",
      price: 100000,
    },
    {
      id: 3,
      title: "Huyền Thoại Trở Lại",
      description: "Phiêu lưu, gia đình",
      duration: 125,
      rating: 8.1,
      posterUrl: "https://via.placeholder.com/300x450/0b2545/ffffff?text=Movie+3",
      trailerUrl: "",
      status: "playing",
      releaseDate: "2025-11-01",
      price: 110000,
    },
    {
      id: 4,
      title: "Tương Lai Xanh",
      description: "Viễn tưởng",
      duration: 140,
      rating: 8.6,
      posterUrl: "https://via.placeholder.com/300x450/0b2545/ffffff?text=Movie+4",
      trailerUrl: "",
      status: "upcoming",
      releaseDate: "2025-12-05",
      price: 130000,
    },
    {
      id: 5,
      title: "Bí Mật Thành Phố",
      description: "Hồi hộp",
      duration: 102,
      rating: 7.4,
      posterUrl: "https://via.placeholder.com/300x450/0b2545/ffffff?text=Movie+5",
      trailerUrl: "",
      status: "playing",
      releaseDate: "2025-10-30",
      price: 90000,
    },
    {
      id: 6,
      title: "Ngày Mới",
      description: "Tình cảm",
      duration: 118,
      rating: 7.8,
      posterUrl: "https://via.placeholder.com/300x450/0b2545/ffffff?text=Movie+6",
      trailerUrl: "",
      status: "upcoming",
      releaseDate: "2025-11-20",
      price: 95000,
    },
  ]

  const nowShowing = mockMovies.filter((m) => m.status === "playing")
  const upcoming = mockMovies.filter((m) => m.status === "upcoming")
  const specialShowings = mockMovies.filter((m) => m.status === "special")

  return (
    <div className="movies-page">
      <Header />

      <main className="movies-container">
        <section className="movies-section">
          <div className="section-header">
            <h2>PHIM ĐANG CHIẾU</h2>
          </div>
          <MovieList movies={nowShowing} />
        </section>

        <section className="movies-section">
          <div className="section-header">
            <h2>PHIM SẮP CHIẾU</h2>
          </div>
          <MovieList movies={upcoming} />
        </section>
        
        <section className="movies-section">
          <div className="section-header">
            <h2>SUẤT CHIẾU ĐẶC BIỆT</h2>
          </div>
          <MovieList movies={specialShowings} />
        </section>

      </main>

      <Footer />
    </div>
  )
}

export default Movies
