
import MovieCard from "./MovieCard"
import type { Movie } from "../types"
import "./MovieSection.css"

interface Props {
  title: string
  movies: Movie[]
}

export default function MovieSection({ title, movies }: Props) {
  return (
    <section className="movie-section">
      <h2>{title}</h2>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
    </section>
  )
}