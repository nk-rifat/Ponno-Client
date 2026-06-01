import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  withCredentials: true,
});

// ================================
// Token Management
// ================================

let getTokenFn = null;
let setTokenFn = null;
let refreshPromise = null;

export const registerTokenGetter = (fn) => {
  getTokenFn = fn;
};

export const registerTokenSetter = (fn) => {
  setTokenFn = fn;
};

// ================================
// Request Interceptor
// ================================

api.interceptors.request.use(
  (config) => {
    const token = getTokenFn?.();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// ================================
// Response Interceptor
// ================================

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // No response from server or request was canceled
    if (!error.response || !originalRequest) {
      return Promise.reject(error);
    }

    // Access token expired
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Prevent multiple refresh requests
        if (!refreshPromise) {
          refreshPromise = axios
            .post(
              `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`,
              {},
              { withCredentials: true },
            )
            .then((res) => {
              const newAccessToken = res.data.accessToken;

              // Update AuthContext state
              setTokenFn?.(newAccessToken);

              return newAccessToken;
            })
            .finally(() => {
              refreshPromise = null;
            });
        }

        const newAccessToken = await refreshPromise;

        // Ensure the authorization header is correctly overridden
        if (originalRequest.headers?.set) {
          originalRequest.headers.set(
            "Authorization",
            `Bearer ${newAccessToken}`,
          );
        } else {
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${newAccessToken}`,
          };
        }

        return api(originalRequest);
      } catch (refreshError) {
        // Clear token in AuthContext
        setTokenFn?.(null);

        // Redirect user to login
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
