export const API = {
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    ME: "/auth/me",
  },
  MOVIES: {
    LIST: "/movies",
    DETAILS: (id: number) => `/movies/${id}`,
  },
  SHOWTIMES: {
    LIST: "/showtimes",
    SEATS: (showtimeId: number) => `/showtimes/${showtimeId}/seats`,
  },
  RESERVATIONS: {
    CREATE: "/reservations",
    CONFIRM: "/reservations/confirm",
    HISTORY: (userId: number) => `/reservations/history/${userId}`,
    CANCEL: (bookingId: string) => `/reservations/${bookingId}`,
  },
}

export default API
