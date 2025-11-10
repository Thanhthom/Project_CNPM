// import { useState } from "react"
// import { Link } from "react-router-dom"
// import "./Header.css"

// const Header = () => {
//   const [searchTerm, setSearchTerm] = useState("")

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (searchTerm.trim() === "") return
//     setSearchTerm("")
//   }

//   return (
//     <div className="header-wrapper">
//       <header className="header">
//         <Link to="/" className="logo">
//           🎥 CINEMAX
//         </Link>

//         <nav className="nav">
//           <Link to="/" className="active">Trang chủ</Link>
//           <Link to="/movies">Phim Rạp</Link>
//           <Link to="/showtimes">Lịch chiếu</Link>
//           <Link to="/news">Tin mới</Link>
//         </nav>

//         <form className="search-form" onSubmit={handleSearch}>
//           <input
//             type="text"
//             placeholder="Tìm phim..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <button type="submit">🔍</button>
//         </form>

//         <div className="auth-buttons">
//           <Link to="/login" className="login-btn">Đăng nhập</Link>
//           <Link to="/register" className="signup-btn">Đăng ký</Link>
//         </div>
//       </header>
//     </div>
//   )
// }

// export default Header;


import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import "./Header.css"

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const location = useLocation()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim() === "") return
    console.log("Tìm kiếm:", searchTerm)
    setSearchTerm("")
  }

  return (
    <>
      {/* khoảng trắng phía trên */}
      {/* <div className="header-top-space"></div> */}

      {/* header chính */}
      <header className="header">
        <Link to="/" className="logo">
          🎥 CINEMAX
        </Link>

        <nav className="nav">
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            Trang chủ
          </Link>
          <Link to="/movies" className={location.pathname === "/movies" ? "active" : ""}>
            Phim Rạp
          </Link>
          <Link to="/price" className={location.pathname === "/price" ? "active" : ""}>
            Giá vé
          </Link>
          <Link to="/news" className={location.pathname === "/news" ? "active" : ""}>
            Tin mới
          </Link>
        </nav>

        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Tìm phim..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">🔍</button>
        </form>

        <div className="auth-buttons">
          <Link to="/login" className="login-btn">
            Đăng nhập/ Đăng ký
          </Link>
        </div>
      </header>
    </>
  )
}

export default Header

