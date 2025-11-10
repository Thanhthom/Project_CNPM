
import { Routes, Route } from "react-router-dom"
import Home from "./pages/home.tsx"
import Movies from "./pages/movies.tsx"
import News from "./pages/news.tsx"
import Price from "./pages/price.tsx"
import Login from "./pages/login.tsx"
import { AuthProvider } from "./context/AuthContext"
import ScrollToTop from "./components/ScrollToTop"

export default function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/news" element={<News />} />
        <Route path="/price" element={<Price />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthProvider>
  )
}
