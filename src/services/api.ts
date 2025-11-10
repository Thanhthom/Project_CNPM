import { API } from "../api/endpoints"
import type {
  AuthResponse,
  Movie,
  Showtime,
  Reservation,
  Booking,
  User,
  BookingHistoryItem,
} from "../types"

// Lấy biến môi trường Vite đúng kiểu
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"

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
    const error = await response.json().catch(() => ({ errorMessage: "API Error" }))
    throw new Error(error.errorMessage || error.message || `API Error: ${response.status}`)
  }

  const data = await response.json()
  
  // Xử lý response format từ backend
  if (!data.isSuccess) {
    throw new Error(data.errorMessage || "API Error")
  }

  return data.data
}

// ======== 🧩 AUTH API ========
export const authAPI = {
  register: async (email: string, password: string, name: string): Promise<AuthResponse> => {
    const response = await apiCall<{
      token: string
      user: User
    }>(API.AUTH.REGISTER, {
      method: "POST",
      body: JSON.stringify({ 
        email, 
        password, 
        fullName: name,
        userName: email.split("@")[0] // Generate username from email
      }),
    });
    authToken = response.token;
    localStorage.setItem("authToken", response.token);
    return {
      token: response.token,
      user: response.user
    };
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await apiCall<{
      token: string
      user: User
    }>(API.AUTH.LOGIN, {
      method: "POST",
      body: JSON.stringify({ 
        userName: email,
        password
      }),
    });
    authToken = response.token;
    localStorage.setItem("authToken", response.token);
    return {
      token: response.token,
      user: response.user
    };
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
  list: async (): Promise<Movie[]> => {
    try {
      const response = await apiCall<Movie[]>(API.MOVIES.LIST);
      return Array.isArray(response) ? response : [];
    } catch (error) {
      console.error("Error fetching movies:", error);
      return [];
    }
  },

  nowShowing: async (): Promise<Movie[]> => {
    try {
      const response = await apiCall<Movie[]>(API.MOVIES.NOW_SHOWING);
      return Array.isArray(response) ? response : [];
    } catch (error) {
      console.error("Error fetching now showing movies:", error);
      return [];
    }
  },

  comingSoon: async (): Promise<Movie[]> => {
    try {
      const response = await apiCall<Movie[]>(API.MOVIES.COMING_SOON);
      return Array.isArray(response) ? response : [];
    } catch (error) {
      console.error("Error fetching coming soon movies:", error);
      return [];
    }
  },

  search: async (keyword: string): Promise<Movie[]> => {
    try {
      const response = await apiCall<Movie[]>(
        `${API.MOVIES.SEARCH}?keyword=${encodeURIComponent(keyword)}`
      );
      return Array.isArray(response) ? response : [];
    } catch (error) {
      console.error("Error searching movies:", error);
      return [];
    }
  },

  details: async (id: number): Promise<Movie | null> => {
    try {
      return await apiCall<Movie>(API.MOVIES.DETAILS(id));
    } catch (error) {
      console.error("Error fetching movie details:", error);
      return null;
    }
  },

  bySlug: async (slug: string): Promise<Movie | null> => {
    try {
      return await apiCall<Movie>(API.MOVIES.SLUG(slug));
    } catch (error) {
      console.error("Error fetching movie by slug:", error);
      return null;
    }
  },
};

// ======== ⏰ SHOWTIMES API ========
export const showtimesAPI = {
  list: async (movieId?: number, date?: string): Promise<Showtime[]> => {
    let endpoint = API.SHOWTIMES.LIST;
    const params = new URLSearchParams();
    if (movieId) params.append("movieId", movieId.toString());
    if (date) params.append("date", date);
    if (params.toString()) {
      endpoint += `?${params.toString()}`;
    }
    try {
      const response = await apiCall<Showtime[]>(endpoint);
      return Array.isArray(response) ? response : [];
    } catch (error) {
      console.error("Error fetching showtimes:", error);
      return [];
    }
  },

  details: async (id: number): Promise<Showtime | null> => {
    try {
      return await apiCall<Showtime>(API.SHOWTIMES.DETAILS(id));
    } catch (error) {
      console.error("Error fetching showtime details:", error);
      return null;
    }
  },
};

// ======== 🎟️ RESERVATIONS API ========
export const reservationsAPI = {
  create: async (showtimeId: number, seats: string[]): Promise<Reservation | null> => {
    try {
      return await apiCall<Reservation>(API.RESERVATIONS.CREATE, {
        method: "POST",
        body: JSON.stringify({ showtimeId, seats }),
      });
    } catch (error) {
      console.error("Error creating reservation:", error);
      return null;
    }
  },

  confirm: async (
    reservationId: string,
    paymentMethod: string
  ): Promise<Booking | null> => {
    try {
      return await apiCall<Booking>(API.RESERVATIONS.CONFIRM, {
        method: "POST",
        body: JSON.stringify({ reservationId, paymentMethod }),
      });
    } catch (error) {
      console.error("Error confirming reservation:", error);
      return null;
    }
  },

  history: async (): Promise<BookingHistoryItem[]> => {
    try {
      const response = await apiCall<BookingHistoryItem[]>(API.RESERVATIONS.HISTORY);
      return Array.isArray(response) ? response : [];
    } catch (error) {
      console.error("Error fetching booking history:", error);
      return [];
    }
  },

  cancel: async (bookingId: string): Promise<boolean> => {
    try {
      await apiCall<void>(API.RESERVATIONS.CANCEL(bookingId), {
        method: "DELETE",
      });
      return true;
    } catch (error) {
      console.error("Error cancelling reservation:", error);
      return false;
    }
  },
};
