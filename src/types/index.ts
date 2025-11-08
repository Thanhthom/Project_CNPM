// ===== User =====
export interface User {
  id: number
  name: string
  email: string
  role: "user" | "admin"
}

export interface AuthResponse {
  token: string
  user: User
}

// ===== Movie =====
export interface Movie {
  id: number
  title: string
  description: string
  duration: number // phút
  rating: number
  posterUrl: string
  trailerUrl: string
  status: "playing" | "upcoming" | "special"
  releaseDate: string // ISO
  price?: number // Added price field
}

export interface MovieListResponse {
  data: Movie[]
  meta: {
    page: number
    limit: number
    total: number
  }
}

// ===== Showtime =====
export interface Showtime {
  id: number
  movieId: number
  cinemaId: number
  screenId: number
  startTime: string
  price: number
}

export interface Seat {
  row: string
  number: number
  status: "available" | "sold" | "priority"
}

// ===== Reservation / Booking =====
export interface Reservation {
  reservationId: string
  lockedSeats: string[]
  expiresAt: string
}

export interface Booking {
  bookingId: string
  tickets: {
    seat: string
    qrCode: string
  }[]
  totalPrice: number
}

export interface BookingHistoryItem {
  bookingId: string
  movieTitle: string
  showtime: string
  seats: string[]
  status: "confirmed" | "cancelled"
  totalPrice: number
}

// ===== Admin Report =====
export interface SalesReport {
  totalRevenue: number
  totalTickets: number
  byMovie: {
    movieId: number
    title: string
    tickets: number
    revenue: number
  }[]
}
