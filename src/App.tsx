
import { Routes, Route } from "react-router-dom"
import Home from "./pages/home.tsx"
import Movies from "./pages/movies.tsx"
import { AuthProvider } from "./context/AuthContext"

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
      </Routes>
    </AuthProvider>
  )
}
