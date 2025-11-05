import { API } from "../api/endpoints"
import type {
  AuthResponse,
  Movie,
  MovieListResponse,
  Showtime,
  Seat,
  Reservation,
  Booking,
  User,
  BookingHistoryItem,
} from "../types"

// Lấy biến môi trường Vite đúng kiểu
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api"

let authToken: string | null =
  typeof window !== "undefined" ? localStorage.getItem("authToken") : null

const apiCall = async <T,>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  }

  if (authToken) headers["Authorization"] = `Bearer ${authToken}`

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "API Error" }))
    throw new Error(error.message || `API Error: ${response.status}`)
  }

  return response.json()
}

// ======== 🧩 AUTH API ========
export const authAPI = {
  register: async (email: string, password: string, name: string): Promise<AuthResponse> => {
    const response = await apiCall<AuthResponse>(API.AUTH.REGISTER, {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
    });
    authToken = response.token;
    localStorage.setItem("authToken", response.token);
    return response;
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await apiCall<AuthResponse>(API.AUTH.LOGIN, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    authToken = response.token;
    localStorage.setItem("authToken", response.token);
    return response;
  },

  me: async (): Promise<User> => {
    return apiCall<User>(API.AUTH.ME);
  },

  logout: (): void => {
    authToken = null;
    localStorage.removeItem("authToken");
  },
};

// ======== 🎬 MOVIES API ========
export const moviesAPI = {
  list: async (page = 1, limit = 12): Promise<Movie[]> => {
    const response = await apiCall<MovieListResponse>(
      `${API.MOVIES.LIST}?page=${page}&limit=${limit}`
    );
    return response.data;
  },

  details: async (id: number): Promise<Movie> => {
    return apiCall<Movie>(API.MOVIES.DETAILS(id));
  },
};

// ======== ⏰ SHOWTIMES API ========
export const showtimesAPI = {
  list: async (movieId: number, date: string): Promise<Showtime[]> => {
    return apiCall<Showtime[]>(
      `${API.SHOWTIMES.LIST}?movieId=${movieId}&date=${date}`
    );
  },

  seats: async (showtimeId: number): Promise<Seat[]> => {
    return apiCall<Seat[]>(API.SHOWTIMES.SEATS(showtimeId));
  },
};

// ======== 🎟️ RESERVATIONS API ========
export const reservationsAPI = {
  create: async (showtimeId: number, seats: string[]): Promise<Reservation> => {
    return apiCall<Reservation>(API.RESERVATIONS.CREATE, {
      method: "POST",
      body: JSON.stringify({ showtimeId, seats }),
    });
  },

  confirm: async (
    reservationId: string,
    paymentMethod: string
  ): Promise<Booking> => {
    return apiCall<Booking>(API.RESERVATIONS.CONFIRM, {
      method: "POST",
      body: JSON.stringify({ reservationId, paymentMethod }),
    });
  },

  history: async (userId: number): Promise<BookingHistoryItem[]> => {
    return apiCall<BookingHistoryItem[]>(API.RESERVATIONS.HISTORY(userId));
  },

  cancel: async (bookingId: string): Promise<void> => {
    return apiCall<void>(API.RESERVATIONS.CANCEL(bookingId), {
      method: "DELETE",
    });
  },
};
