import axios from "axios";


const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("token");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalReq = err.config;

    if (err.response?.status == 401 && !originalReq._retry) {
      originalReq._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/users/refresh-token`,
          { refreshToken }
        );

        const newAccessToken = res.data.token;
        const newRefreshToken = res.data.refreshToken;

        localStorage.setItem("token", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        originalReq.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalReq);

      } catch (error) {
        console.log("Refresh Token Expired: ", error);
        localStorage.clear();
      }
    }

    return Promise.reject(err);
  }
);


export default api;
