export const API = {
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    ME: "/auth/profile",
  },
  MOVIES: {
    LIST: "/movies",
    NOW_SHOWING: "/movies/now-showing",
    COMING_SOON: "/movies/coming-soon",
    SEARCH: "/movies/search",
    DETAILS: (id: number) => `/movies/${id}`,
    SLUG: (slug: string) => `/movies/slug/${slug}`,
  },
  THEATERS: {
    LIST: "/theaters",
    ACTIVE: "/theaters/active",
    CITY: "/theaters/city",
    DETAILS: (id: number) => `/theaters/${id}`,
  },
  ROOM_TYPES: {
    LIST: "/room-types",
    STATISTICS: "/room-types/statistics",
    DETAILS: (id: number) => `/room-types/${id}`,
  },
  SHOWTIMES: {
    LIST: "/showtimes",
    DETAILS: (id: number) => `/showtimes/${id}`,
  },
  RESERVATIONS: {
    CREATE: "/reservations",
    CONFIRM: "/reservations/confirm",
    HISTORY: "/reservations/user",
    DETAILS: (id: string) => `/reservations/${id}`,
    CANCEL: (id: string) => `/reservations/${id}`,
  },
}

export default API
