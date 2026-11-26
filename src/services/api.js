import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Never call refresh/login endpoints through the retry logic
const AUTH_PATHS = [
  "/auth/login",
  "/auth/register",
  "/auth/refresh",
  "/auth/logout",
];

let accessToken = null;
let refreshPromise = null;
let onAuthFailure = () => {};

export const setAccessToken = (token) => {
  accessToken = token;
};

export const setAuthFailureHandler = (handler) => {
  onAuthFailure = handler;
};

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// One refresh at a time. Refresh tokens are single-use, so two parallel
// refresh calls would make the server think the token was stolen.
export function refreshSession() {
  if (!refreshPromise) {
    refreshPromise = axios
      .post(`${API_URL}/auth/refresh`, null, { withCredentials: true })
      .then((res) => {
        accessToken = res.data.accessToken;
        return res.data;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    const canRetry =
      error.response?.status === 401 &&
      original &&
      !original._retry &&
      !AUTH_PATHS.includes(original.url);

    if (canRetry) {
      original._retry = true;
      try {
        await refreshSession();
        original.headers.Authorization = `Bearer ${accessToken}`;
        return api(original);
      } catch {
        accessToken = null;
        onAuthFailure();
      }
    }

    return Promise.reject(error);
  }
);

export function getErrorMessage(error) {
  if (error.response?.data?.message) return error.response.data.message;
  if (error.request) return "Cannot reach the server. Please try again.";
  return "Something went wrong. Please try again.";
}

export default api;